import axios from 'axios';

export const fetchYouTubePlaylistVideos = async (playlistId) => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  let videos = [];
  let nextPageToken = '';

  try {
    do {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems`,
        {
          params: {
            part: 'snippet',
            maxResults: 50,
            playlistId: playlistId,
            key: apiKey,
            pageToken: nextPageToken
          }
        }
      );

      const items = res.data.items;

      items.forEach((item) => {
        const videoId = item.snippet.resourceId.videoId;
        videos.push({
          title: item.snippet.title,
          videoId,
          url: `https://www.youtube.com/watch?v=${videoId}`,
          thumbnail: item.snippet.thumbnails.medium.url,
        });
      });

      nextPageToken = res.data.nextPageToken;
    } while (nextPageToken);

    return videos;
  } catch (err) {
    console.error("YouTube API Error:", err.message);
    throw err;
  }
};

// export default fetchYouTubePlaylistVideos;
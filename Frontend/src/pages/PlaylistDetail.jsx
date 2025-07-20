import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';
import { Play, BookOpen } from 'lucide-react';
import {useNavigate} from 'react-router-dom';

const PlaylistDetail = () => {
  const { id } = useParams(); // 👈 get playlist id from URL
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = React.useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/api/playlists/${id}`)
      .then(res => res.json())
      .then(data => {
        setPlaylist(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <p className="text-gray-600 dark:text-gray-300">Loading playlist...</p>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <p className="text-gray-600 dark:text-gray-300">Playlist not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Sidebar />
      <main className="ml-64 mt-16 p-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {playlist.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Watch all videos in this playlist and improve your skills!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {playlist.videos && playlist.videos.length > 0 ? (
              playlist.videos.map((video, index) => (
                <motion.div
                  key={video.videoId || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <img
                      src={video.thumbnail || 'https://placehold.co/400x200?text=No+Image'}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {video.title}
                      </h3>
                      <div className="flex justify-between items-center mt-3">
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            setSelectedVideo(video);
                            setTimeout(() => {
                                videoRef.current?.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                        }} // 👈 select the video
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Watch
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 ml-2"
                          onClick={() => navigate(`/quiz/${video.videoId}?title=${encodeURIComponent(video.title)}`)}
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          Take Quiz
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
                No videos available in this playlist.
              </div>
            )}
          </div>

          {/* 👇 Show selected video here */}
          {selectedVideo && (
            <div className="mt-8" ref={videoRef}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Now Playing: {selectedVideo.title}
              </h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  width="100%"
                  height="500"
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PlaylistDetail;


// this code is the testing code (also this code fetch with both if id not work then fetch video using url of video)

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import Navbar from '../components/Navbar';
// import Sidebar from '../components/Sidebar';
// import Card from '../components/Card';
// import Button from '../components/Button';
// import { Play, BookOpen } from 'lucide-react';

// const PlaylistDetail = () => {
//   const { id } = useParams(); 
//   const [playlist, setPlaylist] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedVideo, setSelectedVideo] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:3000/api/playlists/${id}`)
//       .then(res => res.json())
//       .then(data => {
//         setPlaylist(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, [id]);

//   const getVideoId = (video) => {
//     if (video.videoId) return video.videoId;
//     const match = video.url.match(/[?&]v=([^&]+)/);
//     return match ? match[1] : null;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
//         <p className="text-gray-600 dark:text-gray-300">Loading playlist...</p>
//       </div>
//     );
//   }

//   if (!playlist) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
//         <p className="text-gray-600 dark:text-gray-300">Playlist not found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <Navbar />
//       <Sidebar />
//       <main className="ml-64 mt-16 p-8">
//         <div className="max-w-5xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-8"
//           >
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//               {playlist.title}
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400">
//               Watch all videos in this playlist and improve your skills!
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {playlist.videos && playlist.videos.length > 0 ? (
//               playlist.videos.map((video, index) => (
//                 <motion.div
//                   key={video._id || index}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   <Card>
//                     <img
//                       src={video.thumbnail || 'https://placehold.co/400x200?text=No+Image'}
//                       alt={video.title}
//                       className="w-full h-48 object-cover"
//                     />
//                     <div className="p-4">
//                       <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                         {video.title}
//                       </h3>
//                       <div className="flex justify-between items-center mt-3">
//                         <Button
//                           size="sm"
//                           className="flex-1"
//                           onClick={() => {
//                             console.log(selectedVideo);
//                             console.log("Clicked:", video);
//                             const vid = getVideoId(video);
//                             console.log("video.videoId:", video.videoId);
//                             console.log("getVideoId(video):", vid);
//                             if (vid) {
//                               setSelectedVideo({ ...video, videoId: vid });
//                             } else {
//                               alert("Invalid video URL or ID");
//                             }
//                             console.log("Selected Video:", selectedVideo);
//                           }}
//                         >
//                           <Play className="w-4 h-4 mr-2" />
//                           Watch
//                         </Button>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           className="flex-1 ml-2"
//                           disabled
//                         >
//                           <BookOpen className="w-4 h-4 mr-2" />
//                           Take Quiz
//                         </Button>
//                       </div>
//                     </div>
//                   </Card>
//                 </motion.div>
//               ))
//             ) : (
//               <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
//                 No videos available in this playlist.
//               </div>
//             )}
//           </div>

//           {selectedVideo && (
//             <div className="mt-8">
//               <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//                 Now Playing: {selectedVideo.title}
//               </h2>
//               <div className="aspect-w-16 aspect-h-9">
//                 <iframe
//                   width="100%"
//                   height="500"
//                   src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
//                   title={selectedVideo.title}
//                   frameBorder="0"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PlaylistDetail;



// this code open video on new tab ouotside application means on youtube

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import Navbar from '../components/Navbar';
// import Sidebar from '../components/Sidebar';
// import Card from '../components/Card';
// import Button from '../components/Button';
// import { Play, Clock, BookOpen } from 'lucide-react';

// const PlaylistDetail = () => {
//   const { id } = useParams(); // 👈 get playlist id from URL
//   const [playlist, setPlaylist] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`http://localhost:3000/api/playlists/${id}`)
//       .then(res => res.json())
//       .then(data => {
//         setPlaylist(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
//         <p className="text-gray-600 dark:text-gray-300">Loading playlist...</p>
//       </div>
//     );
//   }

//   if (!playlist) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
//         <p className="text-gray-600 dark:text-gray-300">Playlist not found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <Navbar />
//       <Sidebar />
//       <main className="ml-64 mt-16 p-8">
//         <div className="max-w-5xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-8"
//           >
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//               {playlist.title}
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400">
//               Watch all videos in this playlist and improve your skills!
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {playlist.videos && playlist.videos.length > 0 ? (
//               playlist.videos.map((video, index) => (
//                 <motion.div
//                   key={video.videoId || index}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <Card>
//                     <img
//                       src={video.thumbnail || 'https://placehold.co/400x200?text=No+Image'}
//                       alt={video.title}
//                       className="w-full h-48 object-cover"
//                     />
//                     <div className="p-4">
//                       <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                         {video.title}
//                       </h3>
//                       <div className="flex justify-between items-center mt-3">
//                         <Button
//                           size="sm"
//                           className="flex-1"
//                           onClick={() => window.open(video.url, '_blank')}
//                         >
//                           <Play className="w-4 h-4 mr-2" />
//                           Watch
//                         </Button>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           className="flex-1 ml-2"
//                           disabled
//                         >
//                           <BookOpen className="w-4 h-4 mr-2" />
//                           Take Quiz
//                         </Button>
//                       </div>
//                     </div>
//                   </Card>
//                 </motion.div>
//               ))
//             ) : (
//               <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
//                 No videos available in this playlist.
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PlaylistDetail;

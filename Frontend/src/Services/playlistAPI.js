// import axios from 'axios';

// // const API_BASE = 'http://localhost:3000/api/playlist'; // or your deployed backend URL

// // Get playlists by category
// export const getPlaylistsByCategory = async (category) => {
//   const res = await axios.get(`${API_BASE}/${category}`);
//   return res.data; // returns array of playlists
// };
// import axios from 'axios';

// const API_BASE = 'http://localhost:3000/api';

// export const getPlaylistsByYear = async (year) => {
//   const res = await axios.get(`${API_BASE}/playlists/year/${year}`);
//   return res.data;
// };

// export const getPlaylistsByYearAndSubject = async (year, subject) => {
//   const res = await axios.get(`${API_BASE}/playlists/byYearAndSubject`, {
//     params: { year, subject },
//   });
//   return res.data;
// };

// export const getSinglePlaylist = async (id) => {
//   const res = await axios.get(`${API_BASE}/playlists/${id}`);
//   return res.data;
// };

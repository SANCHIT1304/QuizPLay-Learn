//chatgpt code

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import Sidebar from '../components/Sidebar';
// import { getPlaylistsByYearAndSubject } from '../services/playlistAPI';

// const SubjectDetail = () => {
//   const { year, subject } = useParams();
//   const [videos, setVideos] = useState([]);

//   const formattedYear = year.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
//   const formattedSubject = subject.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

//   useEffect(() => {
//     async function fetchVideos() {
//       try {
//         const playlists = await getPlaylistsByYearAndSubject(formattedYear, formattedSubject);
//         if (playlists.length > 0) {
//           setVideos(playlists[0].videos); // assuming one playlist per subject per year
//         }
//       } catch (err) {
//         console.error("Failed to fetch videos:", err);
//       }
//     }

//     fetchVideos();
//   }, [formattedYear, formattedSubject]);

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <Navbar />
//       <Sidebar />
//       <main className="ml-64 mt-16 p-8">
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
//           {formattedSubject} - {formattedYear}
//         </h1>

//         {videos.length === 0 ? (
//           <p className="text-gray-600 dark:text-gray-400">No videos available.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {videos.map((video, index) => (
//               <div key={index} className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
//                 <img src={video.thumbnail} alt={video.title} className="w-full rounded mb-2" />
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{video.title}</h3>
//                 <a
//                   href={video.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 hover:underline mt-2 inline-block"
//                 >
//                   Watch Video
//                 </a>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default SubjectDetail;


// copilot code

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';
import {useNavigate} from 'react-router-dom';
import { Play, BookOpen, Clock, Users, Star } from 'lucide-react';

const SubjectDetail = () => {
  const { year, subject } = useParams();
  const navigate = useNavigate();

  const subjectTitle = subject.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const yearTitle = year.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/playlists/year/${yearTitle}/subject/${subjectTitle}`)
      .then(res => res.json())
      .then(setPlaylists);
  }, [yearTitle, subjectTitle]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Sidebar />
      <main className="ml-64 mt-16 p-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>{yearTitle}</span>
              <span>/</span>
              <span>{subjectTitle}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {subjectTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive learning materials and quizzes for {subjectTitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.length === 0 && (
              <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
                No playlists found for this subject.
              </div>
            )}
            {playlists.map((playlist, index) => (
              <motion.div
                key={playlist._id || playlist.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <div className="relative">
                    <img 
                      src={playlist.thumbnail || 'https://placehold.co/400x200?text=No+Image'} 
                      alt={playlist.title}
                      className="w-full h-48 object-cover"
                    />
                    {/* <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button
                        className="bg-white text-gray-900 hover:bg-gray-100"
                        onClick={() => navigate('/playlists/${playlist._id}')}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Watch Now
                      </Button>
                    </div> */}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {playlist.title}
                    </h3>
                    {/* Optional: Show instructor if available */}
                    {playlist.instructor && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        By {playlist.instructor}
                      </p>
                    )}
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {playlist.duration || 'N/A'}
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {playlist.videos ? (Array.isArray(playlist.videos) ? playlist.videos.length : playlist.videos) : 0} videos
                      </div>
                    </div>
                    
                    {/* Optional: Show rating and enrolled if available */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {playlist.rating || '4.8'}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Users className="w-4 h-4 mr-1" />
                        {(playlist.enrolled && playlist.enrolled.toLocaleString()) || '1,000'} enrolled
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => navigate(`/playlists/${playlist._id}`)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Playlist
                      </Button>
                      {/* <Button variant="outline" size="sm" className="flex-1" disabled>
                        <BookOpen className="w-4 h-4 mr-2" />
                        Take Quiz
                      </Button> */}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubjectDetail;


//
// bolt.new code

// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import Navbar from '../components/Navbar';
// import Sidebar from '../components/Sidebar';
// import Card from '../components/Card';
// import Button from '../components/Button';
// import { useState, useEffect } from 'react';
// import { Play, BookOpen, Clock, Users, Star } from 'lucide-react';

// const SubjectDetail = () => {
//   const { year, subject } = useParams();
  
//   const subjectTitle = subject.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
//   const yearTitle = year.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());


//   // Mock playlist data
//   const playlists = [
//     {
//       id: 1,
//       title: 'Introduction to ' + subjectTitle,
//       thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400',
//       duration: '2h 30m',
//       videos: 12,
//       instructor: 'Dr. Sarah Johnson',
//       rating: 4.8,
//       enrolled: 1240
//     },
//     {
//       id: 2,
//       title: 'Advanced ' + subjectTitle + ' Concepts',
//       thumbnail: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400',
//       duration: '3h 15m',
//       videos: 18,
//       instructor: 'Prof. Michael Chen',
//       rating: 4.9,
//       enrolled: 980
//     },
//     {
//       id: 3,
//       title: subjectTitle + ' Practical Applications',
//       thumbnail: 'https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&w=400',
//       duration: '2h 45m',
//       videos: 15,
//       instructor: 'Dr. Emily Rodriguez',
//       rating: 4.7,
//       enrolled: 1560
//     },
//     {
//       id: 4,
//       title: subjectTitle + ' Problem Solving',
//       thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
//       duration: '4h 20m',
//       videos: 22,
//       instructor: 'Prof. David Wilson',
//       rating: 4.8,
//       enrolled: 1100
//     },
//     {
//       id: 5,
//       title: subjectTitle + ' Case Studies',
//       thumbnail: 'https://images.pexels.com/photos/4050305/pexels-photo-4050305.jpeg?auto=compress&cs=tinysrgb&w=400',
//       duration: '3h 50m',
//       videos: 20,
//       instructor: 'Dr. Amanda Brown',
//       rating: 4.6,
//       enrolled: 890
//     },
//     {
//       id: 6,
//       title: subjectTitle + ' Exam Preparation',
//       thumbnail: 'https://images.pexels.com/photos/4050300/pexels-photo-4050300.jpeg?auto=compress&cs=tinysrgb&w=400',
//       duration: '2h 10m',
//       videos: 10,
//       instructor: 'Prof. James Taylor',
//       rating: 4.9,
//       enrolled: 2100
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <Navbar />
//       <Sidebar />
      
//       <main className="ml-64 mt-16 p-8">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-8"
//           >
//             <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
//               <span>{yearTitle}</span>
//               <span>/</span>
//               <span>{subjectTitle}</span>
//             </div>
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//               {subjectTitle}
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400">
//               Comprehensive learning materials and quizzes for {subjectTitle}
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {playlists.map((playlist, index) => (
//               <motion.div
//                 key={playlist.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <Card className="overflow-hidden">
//                   <div className="relative">
//                     <img 
//                       src={playlist.thumbnail} 
//                       alt={playlist.title}
//                       className="w-full h-48 object-cover"
//                     />
//                     <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
//                       <Button className="bg-white text-gray-900 hover:bg-gray-100">
//                         <Play className="w-4 h-4 mr-2" />
//                         Watch Now
//                       </Button>
//                     </div>
//                   </div>
                  
//                   <div className="p-6">
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//                       {playlist.title}
//                     </h3>
//                     <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
//                       By {playlist.instructor}
//                     </p>
                    
//                     <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
//                       <div className="flex items-center">
//                         <Clock className="w-4 h-4 mr-1" />
//                         {playlist.duration}
//                       </div>
//                       <div className="flex items-center">
//                         <BookOpen className="w-4 h-4 mr-1" />
//                         {playlist.videos} videos
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="flex items-center">
//                         <Star className="w-4 h-4 text-yellow-500 mr-1" />
//                         <span className="text-sm text-gray-600 dark:text-gray-400">
//                           {playlist.rating}
//                         </span>
//                       </div>
//                       <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
//                         <Users className="w-4 h-4 mr-1" />
//                         {playlist.enrolled.toLocaleString()} enrolled
//                       </div>
//                     </div>
                    
//                     <div className="flex space-x-2">
//                       <Button size="sm" className="flex-1">
//                         <Play className="w-4 h-4 mr-2" />
//                         Watch
//                       </Button>
//                       <Button variant="outline" size="sm" className="flex-1">
//                         <BookOpen className="w-4 h-4 mr-2" />
//                         Take Quiz
//                       </Button>
//                     </div>
//                   </div>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default SubjectDetail;
import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { Play, BookOpen, Clock, Users, Star, Target } from 'lucide-react';

const PlacementTopic = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  
  const topicTitle = topic.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).replace(/And/g, '&');
  const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
      fetch(`http://localhost:3000/api/playlists/placement/subject/${topicTitle}`)
        .then(res => res.json())
        .then(setPlaylists);
    }, [topicTitle]);
  // Mock playlist data for placement topics
  // const playlists = [
  //   {
  //     id: 1,
  //     title: topicTitle + ' Fundamentals',
  //     thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400',
  //     duration: '3h 45m',
  //     videos: 20,
  //     instructor: 'Tech Expert',
  //     rating: 4.9,
  //     enrolled: 2500,
  //     difficulty: 'Beginner'
  //   },
  //   {
  //     id: 2,
  //     title: topicTitle + ' Interview Questions',
  //     thumbnail: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400',
  //     duration: '5h 20m',
  //     videos: 35,
  //     instructor: 'Industry Professional',
  //     rating: 4.8,
  //     enrolled: 1800,
  //     difficulty: 'Intermediate'
  //   },
  //   {
  //     id: 3,
  //     title: topicTitle + ' Advanced Concepts',
  //     thumbnail: 'https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&w=400',
  //     duration: '4h 15m',
  //     videos: 28,
  //     instructor: 'Senior Developer',
  //     rating: 4.7,
  //     enrolled: 1200,
  //     difficulty: 'Advanced'
  //   },
  //   {
  //     id: 4,
  //     title: topicTitle + ' Practice Problems',
  //     thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
  //     duration: '6h 30m',
  //     videos: 45,
  //     instructor: 'Coding Mentor',
  //     rating: 4.9,
  //     enrolled: 3200,
  //     difficulty: 'All Levels'
  //   },
  //   {
  //     id: 5,
  //     title: topicTitle + ' Company-Specific Prep',
  //     thumbnail: 'https://images.pexels.com/photos/4050305/pexels-photo-4050305.jpeg?auto=compress&cs=tinysrgb&w=400',
  //     duration: '3h 20m',
  //     videos: 22,
  //     instructor: 'Ex-FAANG Engineer',
  //     rating: 4.8,
  //     enrolled: 1950,
  //     difficulty: 'Intermediate'
  //   },
  //   {
  //     id: 6,
  //     title: topicTitle + ' Mock Interviews',
  //     thumbnail: 'https://images.pexels.com/photos/4050300/pexels-photo-4050300.jpeg?auto=compress&cs=tinysrgb&w=400',
  //     duration: '2h 45m',
  //     videos: 15,
  //     instructor: 'Interview Coach',
  //     rating: 4.9,
  //     enrolled: 2800,
  //     difficulty: 'All Levels'
  //   }
  // ];

  // const getDifficultyColor = (difficulty) => {
  //   switch (difficulty) {
  //     case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
  //     case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
  //     case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
  //     default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
  //   }
  // };

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
              <span>Placement Prep</span>
              <span>/</span>
              <span>{topicTitle}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <Target className="w-8 h-8 mr-3 text-green-600" />
              {topicTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Master {topicTitle.toLowerCase()} with comprehensive preparation materials and practice problems
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
                    {/* <div className="absolute top-4 right-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(playlist.difficulty)}`}>
                        {playlist.difficulty}
                      </span>
                    </div> */}
                    {/* <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button
                        className="bg-white text-gray-900 hover:bg-gray-100"
                        onClick={() => window.open(playlist.url, '_blank')}
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

export default PlacementTopic;
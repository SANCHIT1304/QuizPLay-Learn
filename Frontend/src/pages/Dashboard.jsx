import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Briefcase, Code, GraduationCap, Database, Cpu, Calculator, Globe, Smartphone, GitBranch, Brain, MessageSquare } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const yearData = [
    { year: '1st Year', subjects: 8, icon: '1', color: 'from-blue-500 to-blue-600' },
    { year: '2nd Year', subjects: 10, icon: '2', color: 'from-green-500 to-green-600' },
    { year: '3rd Year', subjects: 9, icon: '3', color: 'from-purple-500 to-purple-600' },
    { year: '4th Year', subjects: 4, icon: '4', color: 'from-orange-500 to-orange-600' }
  ];

  const placementTopics = [
    { name: 'Data Structures & Algorithms', icon: Database, color: 'bg-blue-500' },
    { name: 'SQL & Database', icon: Database, color: 'bg-green-500' },
    { name: 'Aptitude & Reasoning', icon: Calculator, color: 'bg-purple-500' },
    { name: 'Java Programming', icon: Code, color: 'bg-red-500' },
    { name: 'Python Programming', icon: Code, color: 'bg-yellow-500' },
    { name: 'System Design', icon: Cpu, color: 'bg-indigo-500' },
    { name: 'C++ Programming', icon: Code, color: 'bg-pink-500' },
    // { name: 'Soft Skills', icon: MessageSquare, color: 'bg-teal-500' }
  ];

  const skillTracks = [
    { name: 'Web Development', icon: Globe, color: 'bg-blue-500', progress: 60 },
    { name: 'App Development', icon: Smartphone, color: 'bg-green-500', progress: 30 },
    { name: 'Git & GitHub', icon: GitBranch, color: 'bg-gray-700', progress: 80 },
    { name: 'Machine Learning', icon: Brain, color: 'bg-purple-500', progress: 45 },
    { name: 'Block Chain', icon: Globe, color: 'bg-purple-500', progress: 45 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Sidebar />
      
      <main className="ml-64 mt-16 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome {user.name}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Continue your learning journey and achieve your goals
            </p>
          </motion.div>

          {/* All Subjects Section */}
          <section id="all-subjects" className="mb-12">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center"
            >
              <BookOpen className="w-8 h-8 mr-3 text-blue-600" />
              All Subjects
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {yearData.map((year, index) => (
                <motion.div
                  key={year.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    onClick={() => navigate(`/subjects/${year.year.toLowerCase().replace(' ', '-')}`)}
                    className="p-6 cursor-pointer"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${year.color} rounded-xl flex items-center justify-center mb-4`}>
                      <span className="text-white font-bold text-lg">{year.icon}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {year.year}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {year.subjects} subjects available
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Placement Prep Section */}
          <section id="placement-prep" className="mb-12">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center"
            >
              <Briefcase className="w-8 h-8 mr-3 text-green-600" />
              Placement Preparation
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {placementTopics.map((topic, index) => {
                const Icon = topic.icon;
                return (
                  <motion.div
                    key={topic.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      onClick={() => navigate(`/dashboard/placement/${topic.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`)}
                      className="p-6 cursor-pointer"
                    >
                      <div className={`w-12 h-12 ${topic.color} rounded-xl flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {topic.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Master essential concepts
                      </p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Skill Tracks Section */}
          <section id="skill-tracks" className="mb-12">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center"
            >
              <Code className="w-8 h-8 mr-3 text-purple-600" />
              Skill Tracks
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skillTracks.map((track, index) => {
                const Icon = track.icon;
                return (
                  <motion.div
                    key={track.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      onClick={() => navigate(`/dashboard/skills/${track.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`)}
                      className="p-6 cursor-pointer"
                    >
                      <div className={`w-12 h-12 ${track.color} rounded-xl flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {track.name}
                      </h3>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{track.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${track.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Build practical skills
                      </p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
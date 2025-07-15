import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';
import { User, Mail, GraduationCap, Trophy, Target, BookOpen, Edit3, Camera } from 'lucide-react';

const Profile = () => {


  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user); //iska chlna ya na chlna se to kuch na hora

  // useEffect(() => {
  //   if(user) setEditedUser(user);
  // }, [user]);


  const handleSave = () => {
    // In a real app, this would update the user data
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const stats = [
    { label: 'Quizzes Completed', value: 23, icon: BookOpen, color: 'text-blue-600' },
    { label: 'Total Tokens', value: user.tokens, icon: Trophy, color: 'text-yellow-600' },
    { label: 'Current Streak', value: `${user.streak} days`, icon: Target, color: 'text-orange-600' },
    { label: 'Subjects Studied', value: 8, icon: GraduationCap, color: 'text-purple-600' }
  ];

  const recentActivity = [
    { subject: 'Data Structures', action: 'Completed Quiz', score: '85%', date: '2 hours ago' },
    { subject: 'Algorithms', action: 'Watched Video', score: null, date: '1 day ago' },
    { subject: 'Database Management', action: 'Completed Quiz', score: '92%', date: '2 days ago' },
    { subject: 'Operating Systems', action: 'Started Course', score: null, date: '3 days ago' },
    { subject: 'Computer Networks', action: 'Completed Quiz', score: '78%', date: '5 days ago' }
  ];

  const achievements = [
    { title: 'First Quiz', description: 'Completed your first quiz', date: '2 weeks ago', icon: '🎯' },
    { title: 'Streak Master', description: 'Maintained a 7-day streak', date: '1 week ago', icon: '🔥' },
    { title: 'Knowledge Seeker', description: 'Completed 20 quizzes', date: '3 days ago', icon: '📚' },
    { title: 'Token Collector', description: 'Earned 100 tokens', date: '1 day ago', icon: '🪙' }
  ];

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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your profile and track your learning progress
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-1">
              <Card className="p-6">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                    />
                    <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {user.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">{user.year}</p>
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={editedUser.name}
                        onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={editedUser.email}
                        onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Year
                      </label>
                      <select
                        value={editedUser.year}
                        onChange={(e) => setEditedUser({...editedUser, year: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                      </select>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={handleSave} className="flex-1">
                        Save
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleCancel} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{user.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{user.year}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setIsEditing(true)}
                      className="w-full"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                )}
              </Card>
            </div>

            {/* Stats and Activity */}
            <div className="lg:col-span-2 space-y-8">
              {/* Stats */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Learning Stats
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="p-4">
                          <div className="flex items-center space-x-3">
                            <Icon className={`w-8 h-8 ${stat.color}`} />
                            <div>
                              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {stat.value}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {stat.label}
                              </p>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Activity
                </h3>
                <Card className="p-6">
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {activity.subject}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {activity.action}
                          </p>
                        </div>
                        <div className="text-right">
                          {activity.score && (
                            <p className="text-sm font-medium text-green-600 dark:text-green-400">
                              {activity.score}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {activity.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Achievements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{achievement.icon}</span>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {achievement.title}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {achievement.description}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {achievement.date}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
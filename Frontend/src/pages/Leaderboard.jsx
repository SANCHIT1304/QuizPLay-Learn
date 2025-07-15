import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';
import { Trophy, Medal, Award, Crown, Filter, Users } from 'lucide-react';

const Leaderboard = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('global');

  const leaderboardData = [
    {
      rank: 1,
      name: 'Alex Johnson',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      tokens: 2450,
      quizzes: 89,
      streak: 15,
      year: '3rd Year',
      isCurrentUser: false
    },
    {
      rank: 2,
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      tokens: 2380,
      quizzes: 82,
      streak: 12,
      year: '2nd Year',
      isCurrentUser: false
    },
    {
      rank: 3,
      name: 'Michael Rodriguez',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
      tokens: 2290,
      quizzes: 78,
      streak: 18,
      year: '4th Year',
      isCurrentUser: false
    },
    {
      rank: 4,
      name: 'Emily Davis',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
      tokens: 2150,
      quizzes: 71,
      streak: 9,
      year: '3rd Year',
      isCurrentUser: false
    },
    {
      rank: 5,
      name: 'David Wilson',
      avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150',
      tokens: 1980,
      quizzes: 65,
      streak: 7,
      year: '2nd Year',
      isCurrentUser: false
    },
    {
      rank: 6,
      name: 'Jessica Brown',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      tokens: 1850,
      quizzes: 58,
      streak: 11,
      year: '1st Year',
      isCurrentUser: false
    },
    {
      rank: 7,
      name: 'Ryan Taylor',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      tokens: 1720,
      quizzes: 52,
      streak: 5,
      year: '4th Year',
      isCurrentUser: false
    },
    {
      rank: 8,
      name: 'Amanda Garcia',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      tokens: 1650,
      quizzes: 49,
      streak: 8,
      year: '3rd Year',
      isCurrentUser: false
    },
    {
      rank: 9,
      name: 'Kevin Martinez',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
      tokens: 1580,
      quizzes: 45,
      streak: 6,
      year: '2nd Year',
      isCurrentUser: false
    },
    {
      rank: 10,
      name: user.name,
      avatar: user.avatar,
      tokens: user.tokens,
      quizzes: 24,
      streak: user.streak,
      year: user.year,
      isCurrentUser: true
    }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600 dark:text-gray-400">#{rank}</span>;
    }
  };

  const getRankBadge = (rank) => {
    if (rank <= 3) {
      const colors = {
        1: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
        2: 'bg-gradient-to-r from-gray-300 to-gray-500',
        3: 'bg-gradient-to-r from-amber-400 to-amber-600'
      };
      return colors[rank];
    }
    return 'bg-gray-200 dark:bg-gray-700';
  };

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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <Trophy className="w-8 h-8 mr-3 text-yellow-600" />
              Leaderboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              See how you rank against other learners
            </p>
          </motion.div>

          {/* Filters */}
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-white">Filter by:</span>
                <div className="flex space-x-2">
                  <Button
                    variant={filter === 'global' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('global')}
                  >
                    Global
                  </Button>
                  <Button
                    variant={filter === 'year' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('year')}
                  >
                    My Year
                  </Button>
                  <Button
                    variant={filter === 'subject' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('subject')}
                  >
                    By Subject
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <Users className="w-5 h-5" />
                <span className="text-sm">1,247 active learners</span>
              </div>
            </div>
          </Card>

          {/* Top 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {leaderboardData.slice(0, 3).map((player, index) => (
              <motion.div
                key={player.rank}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${index === 0 ? 'md:order-2' : index === 1 ? 'md:order-1' : 'md:order-3'}`}
              >
                <Card className={`p-6 text-center ${player.rank === 1 ? 'ring-2 ring-yellow-500' : ''}`}>
                  <div className={`w-16 h-16 ${getRankBadge(player.rank)} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {getRankIcon(player.rank)}
                  </div>
                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="w-16 h-16 rounded-full object-cover mx-auto mb-3"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {player.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {player.year}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Tokens:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{player.tokens}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Quizzes:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{player.quizzes}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Streak:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{player.streak} days</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Full Leaderboard */}
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Full Rankings
              </h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {leaderboardData.map((player, index) => (
                <motion.div
                  key={player.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                    player.isCurrentUser ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10">
                        {player.rank <= 3 ? getRankIcon(player.rank) : (
                          <span className="text-lg font-bold text-gray-600 dark:text-gray-400">
                            #{player.rank}
                          </span>
                        )}
                      </div>
                      <img
                        src={player.avatar}
                        alt={player.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {player.name}
                          {player.isCurrentUser && (
                            <span className="ml-2 text-sm text-blue-600 dark:text-blue-400">(You)</span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {player.year}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-8 text-sm">
                      <div className="text-center">
                        <p className="font-medium text-gray-900 dark:text-white">{player.tokens}</p>
                        <p className="text-gray-600 dark:text-gray-400">Tokens</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-gray-900 dark:text-white">{player.quizzes}</p>
                        <p className="text-gray-600 dark:text-gray-400">Quizzes</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-gray-900 dark:text-white">{player.streak}</p>
                        <p className="text-gray-600 dark:text-gray-400">Streak</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
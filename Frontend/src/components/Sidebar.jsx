import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Briefcase, Code, Trophy, BarChart3, User } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/dashboard') {
      navigate('/dashboard');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const sidebarItems = [
    { 
      id: 'all-subjects', 
      icon: BookOpen, 
      label: 'All Subjects', 
      action: () => scrollToSection('all-subjects') 
    },
    { 
      id: 'placement-prep', 
      icon: Briefcase, 
      label: 'Placement Prep', 
      action: () => scrollToSection('placement-prep') 
    },
    { 
      id: 'skill-tracks', 
      icon: Code, 
      label: 'Skill Tracks', 
      action: () => scrollToSection('skill-tracks') 
    },
    { 
      id: 'rewards', 
      icon: Trophy, 
      label: 'Rewards', 
      to: '/rewards' 
    },
    { 
      id: 'leaderboard', 
      icon: BarChart3, 
      label: 'Leaderboard', 
      to: '/leaderboard' 
    },
    { 
      id: 'profile', 
      icon: User, 
      label: 'Profile', 
      to: '/profile' 
    }
  ];

  return (
    <motion.aside 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="fixed top-16 left-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 z-40"
    >
      <div className="p-6">
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            
            if (item.to) {
              return (
                <Link
                  key={item.id}
                  to={item.to}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-r-2 border-blue-600' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            }

            return (
              <button
                key={item.id}
                onClick={item.action}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 w-full text-left"
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
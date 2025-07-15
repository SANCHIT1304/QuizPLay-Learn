// chatgpt code

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import Navbar from '../components/Navbar';
// import Sidebar from '../components/Sidebar';
// import Card from '../components/Card';
// import { Database, Cpu, Calculator, Globe, Code, BookOpen, Layers, Zap } from 'lucide-react';
// import { getPlaylistsByYear } from '../services/playlistAPI';

// const subjectMeta = {
//   'Programming Fundamentals': { icon: Code, color: 'bg-blue-500', playlists: 12 },
//   'Mathematics': { icon: Calculator, color: 'bg-green-500', playlists: 8 },
//   'Physics': { icon: Zap, color: 'bg-purple-500', playlists: 10 },
//   'Chemistry': { icon: Layers, color: 'bg-red-500', playlists: 9 },
//   'English': { icon: BookOpen, color: 'bg-yellow-500', playlists: 6 },
//   'Engineering Drawing': { icon: Cpu, color: 'bg-indigo-500', playlists: 7 },
//   'Basic Electronics': { icon: Cpu, color: 'bg-pink-500', playlists: 8 },
//   'Workshop Practice': { icon: Layers, color: 'bg-teal-500', playlists: 5 },
//   'Data Structures': { icon: Database, color: 'bg-blue-500', playlists: 15 },
//   'Computer Organization': { icon: Cpu, color: 'bg-green-500', playlists: 12 },
//   'Discrete Mathematics': { icon: Calculator, color: 'bg-purple-500', playlists: 10 },
//   'Digital Logic': { icon: Cpu, color: 'bg-red-500', playlists: 8 },
//   'Object Oriented Programming': { icon: Code, color: 'bg-yellow-500', playlists: 14 },
//   'Probability & Statistics': { icon: Calculator, color: 'bg-indigo-500', playlists: 9 },
//   'Computer Networks': { icon: Globe, color: 'bg-pink-500', playlists: 11 },
//   'Web Technologies': { icon: Globe, color: 'bg-teal-500', playlists: 13 },
//   'Algorithms': { icon: Database, color: 'bg-blue-500', playlists: 18 },
//   'Database Management': { icon: Database, color: 'bg-green-500', playlists: 16 },
//   'Operating Systems': { icon: Cpu, color: 'bg-purple-500', playlists: 14 },
//   'Software Engineering': { icon: Code, color: 'bg-red-500', playlists: 12 },
//   'Computer Graphics': { icon: Layers, color: 'bg-yellow-500', playlists: 10 },
//   'Compiler Design': { icon: Code, color: 'bg-indigo-500', playlists: 11 },
//   'Artificial Intelligence': { icon: Zap, color: 'bg-pink-500', playlists: 15 },
//   'Machine Learning': { icon: Zap, color: 'bg-teal-500', playlists: 17 },
//   'Distributed Systems': { icon: Globe, color: 'bg-blue-500', playlists: 14 },
//   'Information Security': { icon: Layers, color: 'bg-green-500', playlists: 12 },
//   'Cloud Computing': { icon: Globe, color: 'bg-purple-500', playlists: 16 },
//   'Big Data Analytics': { icon: Database, color: 'bg-red-500', playlists: 13 },
//   'Mobile App Development': { icon: Code, color: 'bg-yellow-500', playlists: 15 },
//   'Blockchain Technology': { icon: Layers, color: 'bg-indigo-500', playlists: 10 },
//   'Project Management': { icon: BookOpen, color: 'bg-pink-500', playlists: 8 },
//   'Research Methodology': { icon: BookOpen, color: 'bg-teal-500', playlists: 7 }
// };

// const SubjectsByYear = () => {
//   const { year } = useParams();
//   const navigate = useNavigate();
//   const yearTitle = year.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
//   const [subjects, setSubjects] = useState([]);

//   // useEffect(() => {
//   //   fetch(`http://localhost:3000/api/playlists/year/${year}`)
//   //     .then(res => res.json())
//   //     .then(data => {
//   //       // Extract unique subjects
//   //       const uniqueSubjects = [...new Set(data.map(p => p.subject))];
//   //       setSubjects(uniqueSubjects);
//   //     });
//   // }, [year]);

  
// useEffect(() => {
//   async function fetchSubjects() {
//     try {
//       const playlists = await getPlaylistsByYear(yearTitle); // e.g., "1st Year"
//       const uniqueSubjects = [...new Set(playlists.map(p => p.subject))];
//       setSubjects(uniqueSubjects);
//     } catch (err) {
//       console.error("Failed to fetch subjects:", err);
//     }
//   }

//   fetchSubjects();
// }, [yearTitle]);


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
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//               {yearTitle} Subjects
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400">
//               Explore all subjects available for {yearTitle}
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {subjects.map((subject, index) => {
//               const meta = subjectMeta[subject] || {};
//               const Icon = meta.icon || BookOpen;
//               const color = meta.color || "bg-gray-400";
//               const playlistsCount = meta.playlists || "";
//               return (
//                 <motion.div
//                   key={subject}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <Card 
//                     onClick={() => navigate(`/subjects/${year}/${subject.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`)}
//                     className="p-6 cursor-pointer"
//                   >
//                     <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}>
//                       <Icon className="w-6 h-6 text-white" />
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//                       {subject}
//                     </h3>
//                     <p className="text-gray-600 dark:text-gray-400 text-sm">
//                       {playlistsCount ? `${playlistsCount} playlists available` : 'Click to explore'}
//                     </p>
//                     <div className="mt-4 flex items-center justify-between">
//                       <span className="text-xs text-gray-500 dark:text-gray-400">
//                         Click to explore
//                       </span>
//                       <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                     </div>
//                   </Card>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default SubjectsByYear;

// copilot code and bolt.new code

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import { useState, useEffect } from 'react';
import { Database, Cpu, Calculator, Globe, Code, BookOpen, Layers, Zap, Layers2 } from 'lucide-react';

const SubjectsByYear = () => {
  const { year } = useParams();
  const navigate = useNavigate();

  const subjectData = {
    '1st-year': [
      { name: 'Programming Fundamentals', icon: Code, color: 'bg-blue-500', playlists: 12 },
      { name: 'Mathematics-1', icon: Calculator, color: 'bg-green-500', playlists: 8 },
      { name: 'Physics', icon: Zap, color: 'bg-purple-500', playlists: 10 },
      { name: 'Chemistry', icon: Layers, color: 'bg-red-500', playlists: 9 },
      // { name: 'English', icon: BookOpen, color: 'bg-yellow-500', playlists: 6 },
      { name: 'Mathematics-2', icon: Calculator, color: 'bg-green-500', playlists: 8 },
      { name: 'Fundamentals of Electrical Engineering', icon: Cpu, color: 'bg-indigo-500', playlists: 7 },
      { name: 'Basic Electronics', icon: Cpu, color: 'bg-pink-500', playlists: 8 },
      { name: 'Fundamentals of Mechanics', icon: BookOpen, color: 'bg-teal-500', playlists: 5 }
    ],
    '2nd-year': [
      { name: 'Data Structure', icon: Database, color: 'bg-blue-500', playlists: 15 },
      { name: 'Computer Organization and Architecture', icon: BookOpen, color: 'bg-green-500', playlists: 12 },
      { name: 'Discrete Mathematics', icon: Calculator, color: 'bg-purple-500', playlists: 10 },
      { name: 'Sensor & Instrumentation', icon: Zap, color: 'bg-red-500', playlists: 8 },
      // { name: 'Technical Communication', icon: Layers2, color: 'bg-red-500', playlists: 8 },
      { name: 'Object Oriented Programming', icon: Code, color: 'bg-yellow-500', playlists: 14 },
      { name: 'Python Programming', icon: Code, color: 'bg-yellow-500', playlists: 14 },
      { name: 'Mathematics-4', icon: Calculator, color: 'bg-indigo-500', playlists: 9 },
      { name: 'Cyber Security', icon: Globe, color: 'bg-pink-500', playlists: 11 },
      { name: 'Theory of Automata and Formal Languages', icon: BookOpen, color: 'bg-green-500', playlists: 12 },
      { name: 'Operating System', icon: Globe, color: 'bg-teal-500', playlists: 13 },
      // { name: 'Universal Human Values', icon: Layers2, color: 'bg-red-500', playlists: 8 },
    ],
    '3rd-year': [
      { name: 'Design and Analysis of Algorithms', icon: Database, color: 'bg-blue-500', playlists: 18 },
      { name: 'Database Management System', icon: Database, color: 'bg-green-500', playlists: 16 },
      { name: 'Machine Learning Techniques', icon: Cpu, color: 'bg-purple-500', playlists: 14 },
      { name: 'Software Engineering', icon: Code, color: 'bg-red-500', playlists: 12 },
      { name: 'Software Project Management', icon: Layers, color: 'bg-yellow-500', playlists: 10 },
      { name: 'Computer Networks', icon: Globe, color: 'bg-teal-500', playlists: 17 },
      { name: 'Compiler Design', icon: Code, color: 'bg-indigo-500', playlists: 11 },
      // { name: 'Computer Graphics', icon: Layers2, color: 'bg-pink-500', playlists: 15 },
      { name: 'Big Data', icon: Database, color: 'bg-green-500', playlists: 16 },
      { name: 'Web Technology', icon: Globe, color: 'bg-teal-500', playlists: 17 }
    ],
    '4th-year': [
      { name: 'Distributed Systems', icon: Globe, color: 'bg-blue-500', playlists: 14 },
      { name: 'Information Security', icon: Layers, color: 'bg-green-500', playlists: 12 },
      { name: 'Cloud Computing', icon: Globe, color: 'bg-purple-500', playlists: 16 },
      // { name: 'Mobile App Development', icon: Code, color: 'bg-yellow-500', playlists: 15 },
      // { name: 'Blockchain Technology', icon: Layers, color: 'bg-indigo-500', playlists: 10 },
      { name: 'Research Methodology', icon: BookOpen, color: 'bg-teal-500', playlists: 7 }
    ]
  };

  const subjects = subjectData[year] || [];
  const yearTitle = year.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

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
              {yearTitle} Subjects
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Explore all subjects available for {yearTitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {subjects.map((subject, index) => {
              const Icon = subject.icon;
              return (
                <motion.div
                  key={subject.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    onClick={() => navigate(`/subjects/${year}/${subject.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`)}
                    className="p-6 cursor-pointer"
                  >
                    <div className={`w-12 h-12 ${subject.color} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {subject.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {subject.playlists} playlists available
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Click to explore
                      </span>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubjectsByYear;
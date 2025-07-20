import React, { useEffect, useState } from 'react';
import { fetchAchievements, fetchRewards, redeemReward } from '../api/api';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';
import toast from 'react-hot-toast';

const Rewards = () => {
  const { user, userAuthentication } = useAuth();
  const [achievements, setAchievements] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [achievementsData, rewardsData] = await Promise.all([
        fetchAchievements(),
        fetchRewards()
      ]);
      setAchievements(achievementsData.achievements || []);
      setRewards(rewardsData || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = async (rewardId, cost) => {
    if (!user) return toast.error("Please log in");
    if (user.tokens < cost) {
      toast.error("Not enough tokens");
      return;
    }

    try {
      await redeemReward(rewardId);
      toast.success("🎉 Reward redeemed!");
      userAuthentication(); // refresh user tokens
      loadData();           // refresh achievements/rewards
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-800 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Sidebar />

      <main className="ml-64 mt-16 p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          🎖️ Rewards & Achievements
        </h1>

        {/* Token Balance */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl text-gray-800 dark:text-gray-200">
            Your Tokens: <span className="font-bold">{user.tokens}</span>
          </h2>
        </Card>

        {/* Achievements */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">🏆 Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.length === 0 ? (
              <p className="text-gray-700 dark:text-gray-300">No achievements yet.</p>
            ) : (
              achievements.map((ach, idx) => (
                <Card key={idx} className="p-4 text-center">
                  <div className="text-4xl mb-2">{ach.icon || '⭐'}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{ach.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{ach.description}</p>
                </Card>
              ))
            )}
          </div>
        </section>

        {/* Redeemable Rewards */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">🎁 Redeemable Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rewards.length === 0 ? (
              <p className="text-gray-700 dark:text-gray-300">No rewards available.</p>
            ) : (
              rewards.map((reward) => (
                <Card key={reward._id} className="p-4 text-center">
                  <div className="text-4xl mb-2">{reward.icon || '🎁'}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{reward.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{reward.description}</p>
                  <p className="text-gray-800 dark:text-gray-200">
                    Cost: <strong>{reward.cost}</strong> tokens
                  </p>
                  <Button
                    disabled={user.tokens < reward.cost}
                    onClick={() => handleRedeem(reward._id, reward.cost)}
                    className="mt-2"
                  >
                    Redeem
                  </Button>
                </Card>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Rewards;



// previous code

// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { useAuth } from '../contexts/AuthContext';
// import Navbar from '../components/Navbar';
// import Sidebar from '../components/Sidebar';
// import Card from '../components/Card';
// import Button from '../components/Button';
// import { Trophy, Star, Gift, Coins, Lock, CheckCircle } from 'lucide-react';
// import toast from 'react-hot-toast';

// const Rewards = () => {
//   const { user, userAuthentication } = useAuth();
//   const [rewards, setRewards] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchRewards = async () => {
//     try {
//       const res = await fetch('http://localhost:3000/api/rewards');
//       const data = await res.json();
//       setRewards(data);
//     } catch (err) {
//       console.error(err);
//       toast.error('Failed to fetch rewards');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRewards();
//   }, []);

//   const handleRedeem = async (rewardId, cost) => {
//     if (!user) return toast.error('Please log in first');

//     if (user.tokens < cost) {
//       toast.error('Not enough tokens');
//       return;
//     }

//     try {
//       const res = await fetch('http://localhost:3000/api/redeem', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userId: user._id, rewardId }),
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err.error || 'Failed to redeem reward');
//       }

//       toast.success('🎉 Reward redeemed!');
//       userAuthentication(); // refresh user data
//       fetchRewards(); // refresh rewards (if owned state changes)
//     } catch (err) {
//       console.error(err);
//       toast.error(err.message);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
//         <p className="text-gray-600 dark:text-gray-300">Loading rewards...</p>
//       </div>
//     );
//   }

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
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
//               <Trophy className="w-8 h-8 mr-3 text-yellow-600" />
//               Rewards
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400">
//               Redeem your tokens for badges, perks, and achievements
//             </p>
//           </motion.div>

//           {/* Token Balance */}
//           <Card className="p-6 mb-8">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
//                   <Coins className="w-8 h-8 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//                     {user.tokens} Tokens
//                   </h2>
//                   <p className="text-gray-600 dark:text-gray-400">
//                     Your current token balance
//                   </p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   Earn more tokens by completing quizzes!
//                 </p>
//               </div>
//             </div>
//           </Card>

//           {/* Rewards */}
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
//               <Star className="w-6 h-6 mr-2 text-blue-600" />
//               Rewards & Perks
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {rewards.map((reward, index) => (
//                 <motion.div
//                   key={reward._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   <Card
//                     className={`p-6 ${reward.owned ? 'ring-2 ring-green-500' : ''}`}
//                   >
//                     <div className="text-center">
//                       <div className="text-4xl mb-3">{reward.icon}</div>
//                       <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//                         {reward.title}
//                       </h3>
//                       <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
//                         {reward.description}
//                       </p>

//                       <div className="flex items-center justify-center space-x-2 mb-4">
//                         <Coins className="w-4 h-4 text-yellow-600" />
//                         <span className="text-sm font-medium text-gray-900 dark:text-white">
//                           {reward.cost} tokens
//                         </span>
//                       </div>

//                       {reward.owned ? (
//                         <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
//                           <CheckCircle className="w-5 h-5" />
//                           <span className="font-medium">Owned</span>
//                         </div>
//                       ) : user.tokens >= reward.cost ? (
//                         <Button
//                           size="sm"
//                           className="w-full"
//                           onClick={() => handleRedeem(reward._id, reward.cost)}
//                         >
//                           <Gift className="w-4 h-4 mr-2" />
//                           Redeem
//                         </Button>
//                       ) : (
//                         <div className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400">
//                           <Lock className="w-4 h-4" />
//                           <span className="text-sm">Not enough tokens</span>
//                         </div>
//                       )}
//                     </div>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Rewards;


// bolt.new code

// import React from 'react';
// import { motion } from 'framer-motion';
// import { useAuth } from '../contexts/AuthContext';
// import Navbar from '../components/Navbar';
// import Sidebar from '../components/Sidebar';
// import Card from '../components/Card';
// import Button from '../components/Button';
// import { Trophy, Star, Gift, Coins, Lock, CheckCircle } from 'lucide-react';

// const Rewards = () => {
//   const { user } = useAuth();

//   const rewards = [
//     {
//       id: 1,
//       title: 'Study Streak Badge',
//       description: 'Maintain a 7-day study streak',
//       cost: 50,
//       icon: '🔥',
//       unlocked: user.tokens >= 50,
//       owned: true
//     },
//     {
//       id: 2,
//       title: 'Quiz Master Badge',
//       description: 'Complete 25 quizzes with 80%+ score',
//       cost: 100,
//       icon: '🎯',
//       unlocked: user.tokens >= 100,
//       owned: false
//     },
//     {
//       id: 3,
//       title: 'Knowledge Champion',
//       description: 'Top 10 on the leaderboard',
//       cost: 200,
//       icon: '👑',
//       unlocked: user.tokens >= 200,
//       owned: false
//     },
//     {
//       id: 4,
//       title: 'Learning Enthusiast',
//       description: 'Watch 100 educational videos',
//       cost: 75,
//       icon: '📚',
//       unlocked: user.tokens >= 75,
//       owned: false
//     },
//     {
//       id: 5,
//       title: 'Subject Explorer',
//       description: 'Complete quizzes in 5 different subjects',
//       cost: 150,
//       icon: '🌟',
//       unlocked: user.tokens >= 150,
//       owned: false
//     },
//     {
//       id: 6,
//       title: 'Elite Performer',
//       description: 'Score 95%+ on 10 consecutive quizzes',
//       cost: 300,
//       icon: '🏆',
//       unlocked: user.tokens >= 300,
//       owned: false
//     }
//   ];

//   const perks = [
//     {
//       id: 1,
//       title: 'Bonus Tokens',
//       description: 'Get 20 bonus tokens',
//       cost: 50,
//       icon: '🪙',
//       unlocked: user.tokens >= 50
//     },
//     {
//       id: 2,
//       title: 'Streak Freeze',
//       description: 'Protect your streak for 3 days',
//       cost: 100,
//       icon: '❄️',
//       unlocked: user.tokens >= 100
//     },
//     {
//       id: 3,
//       title: 'Hint Unlocks',
//       description: 'Get 5 quiz hints',
//       cost: 75,
//       icon: '💡',
//       unlocked: user.tokens >= 75
//     },
//     {
//       id: 4,
//       title: 'Extra Attempts',
//       description: '3 extra quiz attempts',
//       cost: 60,
//       icon: '🎲',
//       unlocked: user.tokens >= 60
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
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
//               <Trophy className="w-8 h-8 mr-3 text-yellow-600" />
//               Rewards
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400">
//               Redeem your tokens for badges, perks, and achievements
//             </p>
//           </motion.div>

//           {/* Token Balance */}
//           <Card className="p-6 mb-8">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
//                   <Coins className="w-8 h-8 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//                     {user.tokens} Tokens
//                   </h2>
//                   <p className="text-gray-600 dark:text-gray-400">
//                     Your current token balance
//                   </p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   Earn more tokens by completing quizzes!
//                 </p>
//               </div>
//             </div>
//           </Card>

//           {/* Badges */}
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
//               <Star className="w-6 h-6 mr-2 text-blue-600" />
//               Badges & Achievements
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {rewards.map((reward, index) => (
//                 <motion.div
//                   key={reward.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <Card className={`p-6 ${reward.owned ? 'ring-2 ring-green-500' : ''}`}>
//                     <div className="text-center">
//                       <div className="text-4xl mb-3">{reward.icon}</div>
//                       <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//                         {reward.title}
//                       </h3>
//                       <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
//                         {reward.description}
//                       </p>
                      
//                       <div className="flex items-center justify-center space-x-2 mb-4">
//                         <Coins className="w-4 h-4 text-yellow-600" />
//                         <span className="text-sm font-medium text-gray-900 dark:text-white">
//                           {reward.cost} tokens
//                         </span>
//                       </div>

//                       {reward.owned ? (
//                         <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
//                           <CheckCircle className="w-5 h-5" />
//                           <span className="font-medium">Owned</span>
//                         </div>
//                       ) : reward.unlocked ? (
//                         <Button size="sm" className="w-full">
//                           <Gift className="w-4 h-4 mr-2" />
//                           Redeem
//                         </Button>
//                       ) : (
//                         <div className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400">
//                           <Lock className="w-4 h-4" />
//                           <span className="text-sm">Not enough tokens</span>
//                         </div>
//                       )}
//                     </div>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           {/* Perks */}
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
//               <Gift className="w-6 h-6 mr-2 text-purple-600" />
//               Learning Perks
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {perks.map((perk, index) => (
//                 <motion.div
//                   key={perk.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <Card className="p-6">
//                     <div className="text-center">
//                       <div className="text-3xl mb-3">{perk.icon}</div>
//                       <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//                         {perk.title}
//                       </h3>
//                       <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
//                         {perk.description}
//                       </p>
                      
//                       <div className="flex items-center justify-center space-x-2 mb-4">
//                         <Coins className="w-4 h-4 text-yellow-600" />
//                         <span className="text-sm font-medium text-gray-900 dark:text-white">
//                           {perk.cost} tokens
//                         </span>
//                       </div>

//                       {perk.unlocked ? (
//                         <Button size="sm" className="w-full">
//                           <Gift className="w-4 h-4  mr-2" />
//                           Redeem
//                         </Button>
//                       ) : (
//                         <div className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400">
//                           <Lock className="w-4 h-4" />
//                           <span className="text-sm">Locked</span>
//                         </div>
//                       )}
//                     </div>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Rewards;
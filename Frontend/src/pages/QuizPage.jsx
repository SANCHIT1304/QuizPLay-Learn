import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import { toast } from 'react-hot-toast';

const QuizPage = () => {
  const { videoId } = useParams();
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const { user, userAuthentication } = useAuth();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [prevUserData, setPrevUserData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/quiz?videoId=${videoId}`)
      .then((res) => res.json())
      .then((data) => {
        const parsedQuiz = parseQuizText(data.quiz);
        setQuizData(parsedQuiz);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [videoId]);

  // Watch for user changes and show toast notifications
  useEffect(() => {
    if (submitted && prevUserData && user) {
      const tokensDiff = (user.tokens || 0) - (prevUserData.tokens || 0);
      const streakDiff = (user.streak || 0) - (prevUserData.streak || 0);

      if (streakDiff > 0) {
        toast.success(`🔥 Your streak increased to ${user.streak}!`, {
          icon: '🔥',
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#fff',
          },
        });
      }
      
      // Clear previous user data after showing notifications
      setPrevUserData(null);
    }
  }, [user, prevUserData, submitted]);

  const parseQuizText = (text) => {
    const questions = [];
    const parts = text.split(/\n\n/);
    parts.forEach((block) => {
      const qMatch = block.match(/^(\d+)\.\s*(.*?)\n/);
      if (!qMatch) return;
      const idx = parseInt(qMatch[1]);
      const questionText = qMatch[2];
      const options = {};
      const optMatches = [...block.matchAll(/([A-D])\. (.*)/g)];
      optMatches.forEach((m) => {
        options[m[1]] = m[2];
      });
      const ansMatch = block.match(/Answer:\s*([A-D])/);
      const answer = ansMatch ? ansMatch[1] : null;
      questions.push({
        index: idx,
        question: questionText,
        options,
        answer,
      });
    });
    return questions;
  };

  const handleSelect = (qIndex, option) => {
    if (submitted) return;
    setAnswers({ ...answers, [qIndex]: option });
  };

  const handleSubmit = async () => {
    let correct = 0;
    quizData.forEach((q) => {
      if (answers[q.index] === q.answer) correct++;
    });
    const bonusTokens = correct === 10 ? 5 : 0;
    const totalTokens = correct + bonusTokens;

    setScore(correct);
    setBonus(bonusTokens);
    setSubmitted(true);

    if (!user) {
      console.error("User not logged in — cannot submit quiz");
      toast.error("Please log in to submit the quiz");
      return;
    }

    const subject = `Quiz for Video: ${title || videoId}`;

    // Store current user data before making changes
    setPrevUserData({
      tokens: user.tokens || 0,
      streak: user.streak || 0
    });

    try {
      // Submit quiz results
      const response = await fetch("http://localhost:3000/api/submit-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          subject,
          score: correct,
          tokensEarned: totalTokens,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit quiz');
      }

      console.log("Quiz result saved ✅", data);

      // Show tokens earned toast immediately
      if (totalTokens > 0) {
        toast.success(`🎉 You earned ${totalTokens} tokens!`, {
          icon: '🪙',
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#fff',
          },
        });
      }

      // Re-authenticate to get updated user data using your existing auth context
      await userAuthentication();
      // The useEffect will handle showing the streak toast when user data updates

    } catch (err) {
      console.error("Failed to save quiz result ❌", err);
      toast.error(`❌ Failed to submit quiz: ${err.message}`);
      setPrevUserData(null); // Clear previous data on error
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <p className="text-gray-600 dark:text-gray-300">Loading quiz...</p>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <p className="text-gray-600 dark:text-gray-300">Failed to load quiz.</p>
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
              Quiz
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Answer the following questions.
            </p>
          </motion.div>

          {quizData.map((q) => (
            <Card key={q.index} className="mb-6">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {q.index}. {q.question}
                </h3>
                <div className="space-y-2">
                  {Object.entries(q.options).map(([opt, text]) => (
                    <label
                      key={opt}
                      className={`block px-4 py-2 rounded cursor-pointer border transition-colors
                        ${
                          submitted
                            ? answers[q.index] === opt && opt === q.answer
                              ? "bg-green-200 border-green-500 dark:bg-green-800 dark:border-green-600"
                              : answers[q.index] === opt && opt !== q.answer
                              ? "bg-red-200 border-red-500 dark:bg-red-800 dark:border-red-600"
                              : opt === q.answer
                              ? "bg-green-100 dark:bg-green-900"
                              : "border-gray-200 dark:border-gray-700"
                            : answers[q.index] === opt
                            ? "bg-blue-100 border-blue-500 dark:bg-blue-900 dark:border-blue-600"
                            : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                    >
                      <input
                        type="radio"
                        name={`question-${q.index}`}
                        value={opt}
                        checked={answers[q.index] === opt}
                        onChange={() => handleSelect(q.index, opt)}
                        disabled={submitted}
                        className="mr-2"
                      />
                      <span className="text-gray-900 dark:text-white">
                        {opt}. {text}
                      </span>
                    </label>
                  ))}
                </div>
                {submitted && (
                  <p className="mt-2 text-sm text-green-600 dark:text-green-400 font-medium">
                    Correct Answer: {q.answer}
                  </p>
                )}
              </div>
            </Card>
          ))}

          {!submitted ? (
            <div className="flex justify-center">
              <Button 
                onClick={handleSubmit} 
                className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                disabled={Object.keys(answers).length !== quizData.length}
              >
                Submit Quiz
              </Button>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-6 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-lg border border-green-200 dark:border-green-700"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Quiz Completed! 🎉
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                  You scored <span className="font-bold text-green-600">{score}</span> out of <span className="font-bold">{quizData.length}</span> correct
                </p>
                <div className="flex justify-center items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>Base tokens: {score}</span>
                  {bonus > 0 && (
                    <>
                      <span>•</span>
                      <span className="text-yellow-600 dark:text-yellow-400 font-medium">
                        Perfect score bonus: +{bonus}
                      </span>
                    </>
                  )}
                  <span>•</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    Total: {score + bonus} tokens
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default QuizPage;
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { motion } from "framer-motion";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import Card from "../components/Card";
// import Button from "../components/Button";
// import { useAuth } from "../contexts/AuthContext"; // 🆕 added
// import { toast } from 'react-hot-toast';

// const QuizPage = () => {
//   const { videoId } = useParams();
//   const { user, userAuthentication } = useAuth(); // 🆕 get user from AuthContext
//   const [quizData, setQuizData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [answers, setAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [score, setScore] = useState(0);
//   const [bonus, setBonus] = useState(0);
//   const [oldUser, setOldUser] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:3000/api/quiz?videoId=${videoId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         const parsedQuiz = parseQuizText(data.quiz);
//         setQuizData(parsedQuiz);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, [videoId]);

//   const parseQuizText = (text) => {
//     const questions = [];
//     const parts = text.split(/\n\n/);
//     parts.forEach((block) => {
//       const qMatch = block.match(/^(\d+)\.\s*(.*?)\n/);
//       if (!qMatch) return;
//       const idx = parseInt(qMatch[1]);
//       const questionText = qMatch[2];
//       const options = {};
//       const optMatches = [...block.matchAll(/([A-D])\. (.*)/g)];
//       optMatches.forEach((m) => {
//         options[m[1]] = m[2];
//       });
//       const ansMatch = block.match(/Answer:\s*([A-D])/);
//       const answer = ansMatch ? ansMatch[1] : null;
//       questions.push({
//         index: idx,
//         question: questionText,
//         options,
//         answer,
//       });
//     });
//     return questions;
//   };

//   const handleSelect = (qIndex, option) => {
//     if (submitted) return;
//     setAnswers({ ...answers, [qIndex]: option });
//   };

//   const handleSubmit = () => {
//     let correct = 0;
//     quizData.forEach((q) => {
//       if (answers[q.index] === q.answer) correct++;
//     });
//     const bonusTokens = correct === 10 ? 5 : 0;
//     const totalTokens = correct + bonusTokens;

//     setScore(correct);
//     setBonus(bonusTokens);
//     setSubmitted(true);

//     if (!user) {
//       console.error("User not logged in — cannot submit quiz");
//       return;
//     }

//     const subject = `Quiz for Video: ${videoId}`;

//     const prevUser = { ...oldUser }; // change don here user to oldUser
//     setOldUser(prevUser);

//     fetch("http://localhost:3000/api/submit-quiz", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         userId: user._id, // 🆕 use user._id from context
//         subject,
//         score: correct,
//         tokensEarned: totalTokens,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Quiz result saved ✅", data);
//         userAuthentication().then(() => {
//           const updatedUser = { ...user };
//           if (!prevUser || !updatedUser) return;
//           const tokensDiff = updatedUser.tokens - prevUser.tokens;
//           const streakDiff = updatedUser.streak - prevUser.streak;
//           if (tokensDiff > 0) {
//             toast.success(`🎉 You earned ${tokensDiff} tokens!`, {
//               icon: '🪙',
//               duration: 4000,
//               style: {
//                 background: '#1f2937',
//                 color: '#fff',
//               },
//             });
//           }
//           if (streakDiff > 0) {
//             toast.success(`🔥 Your streak increased to ${updatedUser.streak}!`, {
//               icon: '🔥',
//               duration: 4000,
//               style: {
//                 background: '#1f2937',
//                 color: '#fff',
//               },
//             });
//           }
//         });
//       })
//       .catch((err) => {
//         console.error("Failed to save quiz result ❌", err);
//         toast.error("❌ Failed to submit quiz.");
//       });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
//         <p className="text-gray-600 dark:text-gray-300">Loading quiz...</p>
//       </div>
//     );
//   }

//   if (!quizData) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
//         <p className="text-gray-600 dark:text-gray-300">Failed to load quiz.</p>
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
//               Quiz
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400">
//               Answer the following questions.
//             </p>
//           </motion.div>

//           {quizData.map((q) => (
//             <Card key={q.index} className="mb-6">
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//                   {q.index}. {q.question}
//                 </h3>
//                 <div className="space-y-2">
//                   {Object.entries(q.options).map(([opt, text]) => (
//                     <label
//                       key={opt}
//                       className={`block px-4 py-2 rounded cursor-pointer border
//                         ${
//                           submitted
//                             ? answers[q.index] === opt && opt === q.answer
//                               ? "bg-green-200 border-green-500"
//                               : answers[q.index] === opt && opt !== q.answer
//                               ? "bg-red-200 border-red-500"
//                               : opt === q.answer
//                               ? "bg-green-100"
//                               : ""
//                             : answers[q.index] === opt
//                             ? "bg-blue-100"
//                             : ""
//                         }`}
//                     >
//                       <input
//                         type="radio"
//                         name={`question-${q.index}`}
//                         value={opt}
//                         checked={answers[q.index] === opt}
//                         onChange={() => handleSelect(q.index, opt)}
//                         disabled={submitted}
//                         className="mr-2"
//                       />
//                       {opt}. {text}
//                     </label>
//                   ))}
//                 </div>
//                 {submitted && (
//                   <p className="mt-2 text-sm text-gray-600">
//                     Correct Answer: {q.answer}
//                   </p>
//                 )}
//               </div>
//             </Card>
//           ))}

//           {!submitted ? (
//             <Button onClick={handleSubmit} className="mt-4">
//               Submit Quiz
//             </Button>
//           ) : (
//             <div className="mt-4 p-4 bg-green-100 rounded">
//               <p className="text-lg font-bold">
//                 You scored {score} / 10 correct.
//               </p>
//               <p className="text-md">
//                 Tokens Earned: {score} + Bonus: {bonus} ={" "}
//                 <span className="font-semibold">{score + bonus}</span>
//               </p>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default QuizPage;



// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { motion } from "framer-motion";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import Card from "../components/Card";
// import Button from "../components/Button";

// const QuizPage = () => {
//   const { videoId } = useParams();
//   const [quizData, setQuizData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [answers, setAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [score, setScore] = useState(0);
//   const [bonus, setBonus] = useState(0);

//   useEffect(() => {
//     fetch(`http://localhost:3000/api/quiz?videoId=${videoId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         const parsedQuiz = parseQuizText(data.quiz);
//         setQuizData(parsedQuiz);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, [videoId]);

//   const parseQuizText = (text) => {
//     const questions = [];
//     const parts = text.split(/\n\n/);
//     parts.forEach((block) => {
//       const qMatch = block.match(/^(\d+)\.\s*(.*?)\n/);
//       if (!qMatch) return;
//       const idx = parseInt(qMatch[1]);
//       const questionText = qMatch[2];
//       const options = {};
//       const optMatches = [...block.matchAll(/([A-D])\. (.*)/g)];
//       optMatches.forEach((m) => {
//         options[m[1]] = m[2];
//       });
//       const ansMatch = block.match(/Answer:\s*([A-D])/);
//       const answer = ansMatch ? ansMatch[1] : null;
//       questions.push({
//         index: idx,
//         question: questionText,
//         options,
//         answer,
//       });
//     });
//     return questions;
//   };

//   const handleSelect = (qIndex, option) => {
//     if (submitted) return;
//     setAnswers({ ...answers, [qIndex]: option });
//   };

//   const handleSubmit = () => {
//     let correct = 0;
//     quizData.forEach((q) => {
//       if (answers[q.index] === q.answer) correct++;
//     });
//     setScore(correct);
//     setBonus(correct === 10 ? 5 : 0);
//     setSubmitted(true);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
//         <p className="text-gray-600 dark:text-gray-300">Loading quiz...</p>
//       </div>
//     );
//   }

//   if (!quizData) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
//         <p className="text-gray-600 dark:text-gray-300">Failed to load quiz.</p>
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
//               Quiz
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400">
//               Answer the following questions.
//             </p>
//           </motion.div>

//           {quizData.map((q) => (
//             <Card key={q.index} className="mb-6">
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//                   {q.index}. {q.question}
//                 </h3>
//                 <div className="space-y-2">
//                   {Object.entries(q.options).map(([opt, text]) => (
//                     <label
//                       key={opt}
//                       className={`block px-4 py-2 rounded cursor-pointer border
//                         ${
//                           submitted
//                             ? answers[q.index] === opt && opt === q.answer
//                               ? "bg-green-200 border-green-500"
//                               : answers[q.index] === opt && opt !== q.answer
//                               ? "bg-red-200 border-red-500"
//                               : opt === q.answer
//                               ? "bg-green-100"
//                               : ""
//                             : answers[q.index] === opt
//                             ? "bg-blue-100"
//                             : ""
//                         }`}
//                     >
//                       <input
//                         type="radio"
//                         name={`question-${q.index}`}
//                         value={opt}
//                         checked={answers[q.index] === opt}
//                         onChange={() => handleSelect(q.index, opt)}
//                         disabled={submitted}
//                         className="mr-2"
//                       />
//                       {opt}. {text}
//                     </label>
//                   ))}
//                 </div>
//                 {submitted && (
//                   <p className="mt-2 text-sm text-gray-600">
//                     Correct Answer: {q.answer}
//                   </p>
//                 )}
//               </div>
//             </Card>
//           ))}

//           {!submitted ? (
//             <Button onClick={handleSubmit} className="mt-4">
//               Submit Quiz
//             </Button>
//           ) : (
//             <div className="mt-4 p-4 bg-green-100 rounded">
//               <p className="text-lg font-bold">
//                 You scored {score} / 10 correct.
//               </p>
//               <p className="text-md">
//                 Tokens Earned: {score} + Bonus: {bonus} ={" "}
//                 <span className="font-semibold">{score + bonus}</span>
//               </p>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default QuizPage;

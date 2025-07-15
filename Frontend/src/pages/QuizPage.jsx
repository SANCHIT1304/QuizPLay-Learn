import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Button from "../components/Button";

const QuizPage = () => {
  const { videoId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [bonus, setBonus] = useState(0);

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

  const handleSubmit = () => {
    let correct = 0;
    quizData.forEach((q) => {
      if (answers[q.index] === q.answer) correct++;
    });
    setScore(correct);
    setBonus(correct === 10 ? 5 : 0);
    setSubmitted(true);
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
                      className={`block px-4 py-2 rounded cursor-pointer border
                        ${
                          submitted
                            ? answers[q.index] === opt && opt === q.answer
                              ? "bg-green-200 border-green-500"
                              : answers[q.index] === opt && opt !== q.answer
                              ? "bg-red-200 border-red-500"
                              : opt === q.answer
                              ? "bg-green-100"
                              : ""
                            : answers[q.index] === opt
                            ? "bg-blue-100"
                            : ""
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
                      {opt}. {text}
                    </label>
                  ))}
                </div>
                {submitted && (
                  <p className="mt-2 text-sm text-gray-600">
                    Correct Answer: {q.answer}
                  </p>
                )}
              </div>
            </Card>
          ))}

          {!submitted ? (
            <Button onClick={handleSubmit} className="mt-4">
              Submit Quiz
            </Button>
          ) : (
            <div className="mt-4 p-4 bg-green-100 rounded">
              <p className="text-lg font-bold">
                You scored {score} / 10 correct.
              </p>
              <p className="text-md">
                Tokens Earned: {score} + Bonus: {bonus} ={" "}
                <span className="font-semibold">{score + bonus}</span>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default QuizPage;

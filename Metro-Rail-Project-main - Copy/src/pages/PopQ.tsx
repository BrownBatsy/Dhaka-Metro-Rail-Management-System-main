import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const PopQ: React.FC = () => {
  const { t } = useTranslation();

  // Fetch questions in the current language
  const questions = t("quiz.questions", { returnObjects: true }) as Question[];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleAnswer = (option: string) => {
    if (option === questions[currentIndex].answer) {
      setScore(prev => prev + 1);
    }

    const next = currentIndex + 1;
    if (next < questions.length) {
      setCurrentIndex(next);
    } else {
      setIsFinished(true);
    }
  };

  const handleSubmit = async () => {
    const numericScore = Number(score);
    const numericTotal = Number(questions.length);
    const token = localStorage.getItem("token");
    if (!token) {
      alert(t("quiz.authAlert"));
      return;
    }
    console.log("Token:", token);

    setSubmitting(true);
    try {
      // Modified URL to match what the backend expects
      const res = await fetch("/api/quiz-results/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          score: numericScore, 
          total: numericTotal 
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      const data = await res.json();
      alert(t("quiz.scoreMessage", { score: data.score, total: data.total }));
    } catch (err) {
      console.error(err);
      alert(t("quiz.errorMessage"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      {!isFinished ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {t("quiz.questionCount", { current: currentIndex + 1, total: questions.length })}
          </h2>
          <p className="mb-6 text-lg">{questions[currentIndex].question}</p>
          <ul className="space-y-2">
            {questions[currentIndex].options.map((opt, idx) => (
              <li
                key={idx}
                onClick={() => handleAnswer(opt)}
                className="cursor-pointer border p-3 rounded hover:bg-gray-100"
              >
                {opt}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">{t("quiz.completed")}</h2>
          <p className="text-lg">
            {t("quiz.finalScore", { score, total: questions.length })}
          </p>
          <Button onClick={handleSubmit} disabled={submitting} className="w-full">
            {submitting ? t("quiz.submiting") : t("quiz.submitScore")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PopQ;
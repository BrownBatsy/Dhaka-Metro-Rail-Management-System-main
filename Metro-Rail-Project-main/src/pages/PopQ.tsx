import { useState } from "react";
import { quizQuestions } from "../quizData";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const PopQ = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleNext = () => {
    if (selectedOption === quizQuestions[currentQ].correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setSelectedOption("");
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("User not authenticated.");
      return;
    }
  
    try {
      const res = await fetch("http://localhost:8000/api/quiz-results/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          score: score,
          total: quizQuestions.length,
        }),
      });
  
      if (!res.ok) throw new Error("Failed to submit");
  
      const data = await res.json();
      alert(`Score submitted! You got ${data.score}/${data.total}.`);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong submitting your score.");
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Card className="shadow-lg border-2 border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-center">
            {showResult ? "Quiz Completed!" : `Question ${currentQ + 1} of ${quizQuestions.length}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!showResult ? (
            <div className="space-y-6">
              <div className="text-md font-medium">{quizQuestions[currentQ].question}</div>
              <div className="space-y-3">
                {quizQuestions[currentQ].options.map((opt, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer ${
                      selectedOption === opt ? "border-metro-green bg-metro-green/10" : "hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="option"
                      value={opt}
                      checked={selectedOption === opt}
                      onChange={() => setSelectedOption(opt)}
                      className="accent-metro-green"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
              <Button
                disabled={!selectedOption}
                onClick={handleNext}
                className="w-full"
              >
                {currentQ === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <p className="text-xl font-semibold">Your Score: {score} / {quizQuestions.length}</p>
              <Button onClick={handleSubmit} className="w-full">Submit Score</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PopQ;

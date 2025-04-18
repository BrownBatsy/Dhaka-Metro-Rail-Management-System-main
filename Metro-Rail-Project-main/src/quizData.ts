export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Rome", "Madrid", "Berlin"],
    correctAnswer: "Paris"
  },

  {
    question: "Who proposed the double hidden blade?",
    options: ["Ezio", "Altair", "Edward", "Connor"],
    correctAnswer: "Altair"
  }
  // Add more questions...
];

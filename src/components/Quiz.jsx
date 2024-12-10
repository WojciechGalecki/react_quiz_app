import { useCallback, useState } from "react";

import QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

const QUESTION_TIMEOUT = 10000;

export default function Quiz() {
  const [answers, setAnswers] = useState([]);

  const activeQuestionIndex = answers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setAnswers((prevAnswers) => {
      return [...prevAnswers, selectedAnswer];
    });
  });

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Quiz completed" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex} //force to recreate Component
          timeout={QUESTION_TIMEOUT}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

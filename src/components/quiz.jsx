import React, { useEffect, useState } from "react";
import "./quiz.css";
import ReactStars from "react-rating-stars-component";
import questions from "../questions.json";
import ProgressBar from "./ProgressBar";
import MultiProgressBar from "./MultiProgressBar";

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [marks, setMarks] = useState(0);
  const [level, setLevel] = useState(0);
  const [end, setEnd] = useState(false);
  const [correctIndex, setCorrectIndex] = useState();
  const [score, setScore] = useState();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [userInput, setUserInput] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState();
  const [maxScore, setMaxScore] = useState();
  const [minScore, setMinScore] = useState();

  let allOptions = [questions[index].correct_answer];
  questions[index].incorrect_answers.map((item) => {
    return allOptions.push(item);
  });
  allOptions.sort();

  useEffect(() => {}, [index]);

  useEffect(() => {
    if (userInput === questions[index].correct_answer) {
      setCorrectIndex(selectedIndex);
    }
    setScore(((marks / 5 / index) * 100).toFixed(2));
    setMaxScore((((marks / 5 + (questions.length - index))/20)*100).toFixed(2) );//10 + 5
    setMinScore(marks / 5 + 0);
  }, [userInput, correctIndex, selectedIndex, marks, currentAnswer, index]);

  const renderStars = () => {
    switch (questions[index].difficulty) {
      case "easy":
        return <ReactStars count={1} size={15} activeColor="gray" />;
      case "medium":
        return <ReactStars count={2} size={15} activeColor="gray" />;
      case "hard":
        return <ReactStars count={3} size={15} activeColor="gray" />;
      default:
        return null;
    }
  };
  const goToNext = () => {
    if (index == questions.length - 1) {
      return setEnd(true);
    }
    if (userInput) {
      setIndex(index + 1);
      setSelectedIndex();
      setCorrectIndex();
    }
    if (userInput == questions[index].correct_answer) {
      setMarks(marks + 5);
    } else {
      setMarks(marks);
    }
  };

  let list = [
    {
      label: "",
      value: score,
    },
    {
      label: "",
      value: maxScore,
    },
    {
      label: "",
      value: minScore,
    },
  ];

  const color = ["black", "rgb(90 90 90)", "grey"];

  return (
    <>
      {!end ? (
        <>
          <div
            className="question-bar"
            style={{ width: `${index * 5}%` }}
          ></div>

          <div>
            <p style={{ fontSize: "30px", fontWeight: 700, lineHeight: "2px" }}>
              Question {index + 1} of 20{" "}
            </p>
            <p style={{ fontSize: "15px", lineHeight: "2px" }}>
              Entertainment : Board Games
            </p>
            {questions[index].difficulty == "easy" ? (
              <ReactStars count={1} size={15} activeColor="gray" />
            ) : questions[index].difficulty == "medium" ? (
              <ReactStars count={2} size={15} activeColor="gray" />
            ) : (
              <ReactStars count={3} size={15} activeColor="gray" />
            )}

            <p style={{ fontSize: "20px", fontWeight: 500, height: "auto" }}>
              {/* {questions[index].question.replace("%20"," ")} */}
              {decodeURI(questions[index].question).replace("%3F", "?")}
            </p>
            <br />
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  flexWrap: "wrap",
                  height: "150px",
                }}
              >
                {allOptions.map((item, index) => {
                  const isActive =
                    correctIndex !== null && correctIndex === index;

                  return (
                    <div
                      onClick={() => {
                        !selectedIndex && setUserInput(item);
                        !selectedIndex && setSelectedIndex(index);
                      }}
                      className={isActive ? "active" : "non-active"}
                      key={index}
                    >
                      <span>{decodeURI(item)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {selectedIndex != null && (
              <>
                <div className="center">
                  {correctIndex === selectedIndex ? (
                    <p>Correct Answer</p>
                  ) : (
                    <p>Wrong Answer</p>
                  )}
                  <button
                    onClick={() => {
                      goToNext();
                    }}
                    className="nextBtn"
                  >
                    NEXT
                  </button>
                </div>
              </>
            )}
            <div className="quiz-bottom-score">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h5>Score: {score}%</h5>
                <h5>Max Score: {maxScore}% </h5>
              </div>
              <MultiProgressBar>
                {list.map((item, key) => (
                  <ProgressBar
                    value={item.value}
                    label={item.label}
                    color={color[key]}
                  />
                ))}
              </MultiProgressBar>
            </div>
          </div>
        </>
      ) : (
        <div>
          <h3>QUIZ ENDED</h3>
          <h3>Correct Answer : {marks / 5}/20</h3>
          <h3>Final Score : {((marks / 5 / index) * 100).toFixed(2)}%</h3>
        </div>
      )}
    </>
  );
}

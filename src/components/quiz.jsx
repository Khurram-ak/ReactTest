import React, { useEffect, useState } from "react";
import "./quiz.css";
import ReactStars from "react-rating-stars-component";
import questions from "../questions.json";
import ProgressBar from "./ProgressBar";
import MultiProgressBar from "./MultiProgressBar";

export default function Quiz() {

  const [index, setIndex] = useState(0);
  const [marks, setMarks] = useState(0);
  const [end, setEnd] = useState(false);
  const [correctIndex, setCorrectIndex] = useState();
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [userInput, setUserInput] = useState(null);
  const [maxScore, setMaxScore] = useState();
  const [minScore, setMinScore] = useState();

  let allOptions;
  allOptions = [questions[index].correct_answer, ...questions[index].incorrect_answers];
  allOptions.sort();

  useEffect(() => {

    if (userInput === questions[index].correct_answer) {
      setCorrectIndex(selectedIndex);
    }
     
    index ==0 ?setScore(0): setScore(((marks / 5 / index) * 100).toFixed(2));
    setMaxScore((((marks / 5 + (questions.length - index)) / 20) * 100).toFixed(2));//10 + 5
    setMinScore((((marks / 5) / questions.length) * 100).toFixed(2));


  }, [userInput, correctIndex, selectedIndex, marks, index,allOptions]);

  const goToNext = () => {
    if (index === questions.length - 1) {
      setEnd(true);
    } else if (userInput) {
      setIndex(index + 1);
      setSelectedIndex(null);
      setCorrectIndex(null);
      setMarks(userInput === questions[index].correct_answer ? marks + 5 : marks);
    }
  };

  return (
    <>
      {!end ? (
        <>
          <div className="question-bar" style={{ width: `${index * 5}%` }}></div>

          <div>
            <p style={{ fontSize: "30px", fontWeight: 700, lineHeight: "2px" }}>
              Question {index + 1} of 20{" "}
            </p>
            <p style={{ fontSize: "15px", lineHeight: "2px" }}>Entertainment: Board Games</p>
            <ReactStars count={questions[index].difficulty === "easy" ? 1 : questions[index].difficulty === "medium" ? 2 : 3} size={15} activeColor="gray" />
            <p style={{ fontSize: "20px", fontWeight: 500, height: "auto" }}>
              {decodeURI(questions[index].question).replace("%3F", "?").replace("%2C", ",")}
            </p>
            <br />
            <div>
              <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", height: "150px" }}>
                {allOptions?.map((item, index) => {
                 return <>
                 <div
                    onClick={() =>  {!selectedIndex && setUserInput(item);
                      !selectedIndex && setSelectedIndex(index);}}
                    className={correctIndex !== null && correctIndex === index ? "active" : "non-active"}
                    key={index}
                  >
                    <span>{decodeURI(item).replace("%2", "$")}</span>
                  </div>
                 </>

                }
                )}
              </div>
            </div>

            {selectedIndex != null && (
              <>
                <div className="center">
                  <p style={{ fontWeight: "700", fontSize: "18px" }}>{correctIndex === selectedIndex ? "Correct Answer" : "Wrong Answer"}</p>
                  <button onClick={goToNext} className="nextBtn">Next Question</button>
                </div>
              </>
            )}
            <div className="quiz-bottom-score">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h5>Score: {score} %</h5>
                <h5>Max Score: {maxScore}%</h5>
              </div>
              <MultiProgressBar>
                {[{ label: "", value: score }, { label: "", value: maxScore }, { label: "", value: minScore }].map((item, key) => (
                  <ProgressBar key={key} value={item.value} label={item.label} color={["black", "rgb(90 90 90)", "grey"][key]} />
                ))}
              </MultiProgressBar>
            </div>
          </div>
        </>
      ) : (
        <div>
          <h3>QUIZ ENDED</h3>
          <h3>Correct Answer: {marks / 5}/20</h3>
          <h3>Final Score: {((marks / 5 / index) * 100).toFixed(2)}%</h3>
        </div>
      )}
    </>
  );
}

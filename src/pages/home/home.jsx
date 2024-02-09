import React, { useEffect } from "react";
import "./home.css";
import Quiz from "../../components/quiz";

export default function Home() {
    
    return (
    <div className="main">
      <div className="quiz-section">
        <Quiz />
      </div>
    </div>
  );
}

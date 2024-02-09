import React from "react";

export default function ProgressBar(props) {
  return (
    <div
      className={"progress-bar" }
      role="progressbar"
      style={{backgroundColor:props.color, width: props.value + "%", height: 10 + "px" }}
      aria-valuenow={props.value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {" "}
      {props.label}{" "}
    </div>
  );
}

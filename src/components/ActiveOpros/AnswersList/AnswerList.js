import React from "react";
import classes from "./AnswerList.css";
import AnwserItem from "./AnswerItem/AnswerItem";

const AnswerList = (props) => (
  <ul className={classes.AnswerList}>
    {props.answers.map((answer, index) => {
      return (
        <AnwserItem
          key={index}
          answer={answer}
          onAnswerClick={props.onAnswerClick}
          state={props.state ? props.state[answer.id] : null}
        />
      );
    })}
  </ul>
);

export default AnswerList;
import React from "react";
import classes from "./ActiveOpros.css";
import AnswerList from "./AnswersList/AnswerList";

const ActiveOpros = (props) => (
  <div className={classes.ActiveOpros}>
    <p className={classes.Question}>
      <span>
        <strong>{props.answerNumber}.</strong> &nbsp;
        {props.question}
      </span>
      <small>
        {props.answerNumber} z {props.oproslength}
      </small>
    </p>

    <AnswerList
      answers={props.answers}
      onAnswerClick={props.onAnswerClick}
      state={props.state}
    />
  </div>
);

export default ActiveOpros;

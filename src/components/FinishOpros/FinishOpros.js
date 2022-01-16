import React from "react";
import classes from "./FinishOpros.css";
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";

const FinishOpros = (props) => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === "success") {
      total++;
    }
    return total;
  }, 0);

  return (
    <div className={classes.FinishOpros}>
      <ul>
        {props.opros.map((oprosItem, index) => {
          const cls = [
            "fa",
            props.results[oprosItem.id] === "error" ? "fa-times" : "fa-check",
            classes[props.results[oprosItem.id]],
          ];

          return (
            <li key={index}>
              <strong>{index + 1}</strong>.&nbsp;
              {oprosItem.question}
              <i className={cls.join(" ")} />
            </li>
          );
        })}
      </ul>
      <p>
        Правильно {successCount} z {props.opros.length}
      </p>
      <div>
        <Button onClick={props.onRetry} type="primary">
          Репид
        </Button>
        <Link to="/">
          <Button type="success">Go to opros list</Button>
        </Link>
      </div>
    </div>
  );
};

export default FinishOpros;

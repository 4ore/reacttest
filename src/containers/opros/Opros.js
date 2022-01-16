import React, { Component } from "react";
import classes from "./Opros.css";
import ActiveOpros from "../../components/ActiveOpros/ActiveOpros";
import FinishOpros from "../../components/FinishOpros/FinishOpros";

class Opros extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    opros: [
      {
        question: "Какая погода в ужгороде?",
        rightAnswerId: 2,
        id: 1,
        answers: [
          { text: "Дождь", id: 1 },
          { text: "Солнце", id: 2 },
          { text: "Снег", id: 3 },
          { text: "Пасмурно", id: 4 },
        ],
      },
      {
        question: "Какая речка течет в Ужгороде?",
        rightAnswerId: 3,
        id: 2,
        answers: [
          { text: "Латориця", id: 1 },
          { text: "Тиса", id: 2 },
          { text: "Уж", id: 3 },
          { text: "Дунай", id: 4 },
        ],
      },
    ],
  };

  onAnswerClickHandler = (answerId) => {
    /*if (this.state.answerState) {
      const key = Object.keys(this.state.asnwerState)[0];
      if (this.state.answerState[key] === "success") {
        return;
      }
    }*/

    const question = this.state.opros[this.state.activeQuestion];
    const results = this.state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }
      this.setState({
        answerState: { [answerId]: "success" },
        results: results,
      });

      const timeout = window.setTimeout(() => {
        if (this.isOprosFinished()) {
          this.setState({
            isFinished: true,
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = "error";
      this.setState({
        answerState: { [answerId]: "error" },
        results: results,
      });
    }
    console.log(this.state.answerState);
  };

  isOprosFinished() {
    return this.state.activeQuestion + 1 === this.state.opros.length;
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {},
    });
  };

  render() {
    return (
      <div className={classes.Opros}>
        <div className={classes.OprosWrapper}>
          <h1>Opros</h1>
          {this.state.isFinished ? (
            <FinishOpros
              results={this.state.results}
              opros={this.state.opros}
              onRetry={this.retryHandler}
            />
          ) : (
            <ActiveOpros
              answers={this.state.opros[this.state.activeQuestion].answers}
              question={this.state.opros[this.state.activeQuestion].question}
              onAnswerClick={this.onAnswerClickHandler}
              oproslength={this.state.opros.length}
              answerNumber={this.state.activeQuestion + 1}
              state={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Opros;

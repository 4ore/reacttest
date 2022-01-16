import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from "./OprosList.css";

export default class OprosList extends Component {
  renderOpros() {
    return [1, 2, 3].map((opros, index) => {
      return (
        <li key={index}>
          <NavLink to={"/opros/" + opros}>Test {opros}</NavLink>
        </li>
      );
    });
  }

  render() {
    return (
      <div className={classes.OprosList}>
        <div>
          <h1>OprosList</h1>

          <ul>{this.renderOpros()}</ul>
        </div>
      </div>
    );
  }
}

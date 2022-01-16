import React, { Component } from "react";
import classes from "./OprosCreator.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import {
  createControl,
  validate,
  validateForm,
} from "../../form/formFramework";

function createOptionControl(number) {
  return createControl(
    {
      label: `otvet nomer ${number}`,
      errorMessage: "vorpos ne mojet but pustoy",
      id: number,
    },
    { required: true }
  );
}

function createFormsControl() {
  return {
    question: createControl(
      {
        label: "vvedite vopros",
        errorMessage: "vorpos ne mojet but pustoy",
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
}
export default class OprosCreator extends Component {
  state = {
    opros: [],
    isFormValid: false,
    formControls: createFormsControl(),
    rightAnswerId: 1,
  };

  submitHandler = (event) => {
    event.preventDegfault();
  };

  addQuestionHandler = (event) => {
    event.preventDegfault();

    const opros = this.state.opros.concat();
    const index = opros.length + 1;
    const {
      question,
      option1,
      option2,
      option3,
      option4,
    } = this.state.formControls;
    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    };

    opros.push(questionItem);
    this.setState({
      opros,
      isFormValid: false,
      formControls: createFormsControl(),
      rightAnswerId: 1,
    });
  };
  createOprosHandler = async (event) => {
    event.preventDegfault();
  };
  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  };
  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <React.Fragment key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={(event) =>
              this.changeHandler(event.target.value, controlName)
            }
          />
          {index === 0 ? <hr /> : null}
        </React.Fragment>
      );
    });
  }
  selectChangeHandler = (event) => {
    this.setState({ rightAnswerId: +event.target.value });
  };
  render() {
    const select = (
      <Select
        label="Choose true otvet"
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 },
        ]}
      />
    );

    return (
      <div className={classes.OprosCreator}>
        <div>
          <h1>OprosCreator</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderControls()}

            {select}
            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Add question
            </Button>
            <Button
              type="successs"
              onClick={this.createOprosHandler}
              disabled={!this.state.opros.length === 0}
            >
              Create Opros
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

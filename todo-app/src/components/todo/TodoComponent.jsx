import { Form, Formik, Field, ErrorMessage } from "formik";
import moment from "moment";
import React, { PureComponent } from "react";
import AuthenticationService from "./AuthenticationService";
import TodoDataService from "../../api/todo/TodoDataService";

class TodoComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      id: 1,
      description: "Learn Forms Now",
      targetDate: moment(new Date()).format("YYYY-MM-DD"),
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    let username = AuthenticationService.getLoggedInUserName();
    TodoDataService.retrieveTodos(username, this.state.id).then((response) =>
      this.setState({
        description: response.data.description,
        targetDate: response.data.targetDate,
      })
    );
  }

  validate(values) {
    let errors = {};
    if (!values.description) {
      errors.description = "Enter a Description";
    } else if (values.description.length < 5) {
      errors.description = "Enter atleast 5 Characters in Description";
    }

    if (!moment(values.targetDate).isValid()) {
      errors.targetDate = "Enter a valid Target Date";
    }

    return errors;
  }

  onSubmit(values) {
    console.log(values);
    let username = AuthenticationService.getLoggedInUserName();
    TodoDataService.updateTodo(username, this.state.id, {
      id: this.state.id,
      description: values.description,
      targetDate: values.targetDate,
    });
  }

  render() {
    let { description, targetDate } = this.state;
    // let targetDate = this.state.targetDate;
    return (
      <div>
        <h1>Todo</h1>
        <div className="container">
          <Formik
            initialValues={{ description, targetDate }}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validate}
          >
            {(props) => (
              <Form>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="alert alert-warning"
                ></ErrorMessage>
                <ErrorMessage
                  name="targetDate"
                  component="div"
                  className="alert alert-warning"
                ></ErrorMessage>

                <fieldset className="form-group">
                  <label htmlFor="">Description</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="description"
                  />
                </fieldset>

                <fieldset className="form-group">
                  <label htmlFor="">Target Date</label>
                  <Field
                    className="form-control"
                    type="date"
                    name="targetDate"
                  />
                </fieldset>
                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default TodoComponent;

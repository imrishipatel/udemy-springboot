import React, { PureComponent } from "react";
import TodoDataService from "../../api/todo/TodoDataService";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";

class ListTodosComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      message: null,
      deleteStatus: false,
    };

    this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
    this.updateTodoClicked = this.updateTodoClicked.bind(this);
    this.refreshTodos = this.refreshTodos.bind(this);
  }

  componentDidMount() {
    this.refreshTodos();
    console.log(this.state);
  }

  refreshTodos() {
    let username = AuthenticationService.getLoggedInUserName();
    TodoDataService.retrieveAllTodos(username).then((response) => {
      //console.log(response);
      this.setState({ todos: response.data });
    });
  }

  deleteTodoClicked(id) {
    let username = AuthenticationService.getLoggedInUserName();
    // console.log(id + " " + username);
    TodoDataService.deleteTodo(username, id).then((response) => {
      this.setState({ message: `Delete of todo ${id} Successful` });
      this.refreshTodos();
    });
  }

  updateTodoClicked(id) {
    console.log("update " + id);
    this.props.navigate(`/todos/${id}`);
    // let username = AuthenticationService.getLoggedInUserName();
    // console.log(id + " " + username);
    // TodoDataService.deleteTodo(username, id).then((response) => {
    //   this.setState({ message: `Delete of todo ${id} successful` });
    //   this.refreshTodos();
    // });
  }

  render() {
    return (
      <div>
        <h1>List Todos</h1>
        {this.state.deleteStatus && (
          <div className="alert alert-success">{this.state.message}</div>
        )}
        <div className="container">
          <table className="table">
            <thead key="thead">
              <tr>
                <th>Description</th>
                <th>Is Completed?</th>
                <th>Target Date</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody key="tbody">
              {this.state.todos.map((todo) => (
                <tr key={todo.id}>
                  {/* <td>{todo.id}</td> */}
                  <td>{todo.description}</td>
                  <td>{todo.done.toString()}</td>
                  <td>{todo.targetDate.toString()}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => this.updateTodoClicked(todo.id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => this.deleteTodoClicked(todo.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

// newly added v6
function WithNavigate(props) {
  let navigate = useNavigate();
  return <ListTodosComponent {...props} navigate={navigate} />;
}

export default WithNavigate;

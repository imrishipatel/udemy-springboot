import React, { PureComponent } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  Link,
} from "react-router-dom";
import { Component } from "react/cjs/react.production.min";
import AuthenticationService from "./AuthenticationService.js";
import ListTodosComponent from "./ListTodosComponent.jsx";
import LoginComponent from "./LoginComponent.jsx";
import HeaderComponent from "./HeaderComponent.jsx";
import FooterComponent from "./FooterComponent.jsx";
import ErrorComponent from "./ErrorComponent.jsx";
import WelcomeComponent from "./WelcomeComponent.jsx";
import LogoutComponent from "./LogoutComponent.jsx";
import AuthenticatedRoute from "./AuthenticatedRoute.jsx";
import TodoComponent from "./TodoComponent.jsx";
// import "./../bootstrap.css";

class TodoApp extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="TodoAapp">
        <HeaderComponent />

        <hr />
        <Router>
          <Routes>
            <Route path="/" element={<LoginComponent />}></Route>
            <Route path="/login" element={<LoginComponent />}></Route>
            {/* <AuthenticatedRoute /> */}
            <Route path="/welcome/:name" element={<WelcomeComponent />}></Route>
            <Route path="/todos/:id" element={<TodoComponent />}></Route>
            <Route path="/todos" element={<ListTodosComponent />}></Route>
            <Route path="/logout" element={<LogoutComponent />}></Route>

            <Route element={<ErrorComponent />}></Route>
          </Routes>
        </Router>
        <hr />
        <FooterComponent />
        {/* <LoginComponent />
        <WelcomeComponent /> */}
      </div>
    );
  }
}

export default TodoApp;

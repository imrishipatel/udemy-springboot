import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

import HelloWorldService from "../../api/todo/HelloWorldService";

class WelcomeComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      welcomeMessage: "",
      error: false,
    };
    this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
    this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  render() {
    // let { name } = useParams();
    return (
      <>
        <h1>Welcome!</h1>
        <div className="container">
          Hey rishipatel! You can manage your Todos{" "}
          <Link to="/todos">here.</Link>
        </div>{" "}
        <div className="container">
          {this.state.error && (
            <div className="alert alert-warning">
              {this.state.welcomeMessage}
            </div>
          )}
        </div>
        <div className="container">
          Click here to get a customized welcome message.
          <button
            onClick={this.retrieveWelcomeMessage}
            className="btn btn-success"
          >
            Get Welcome Message
          </button>
        </div>
        <div className="container">{this.state.welcomeMessage}</div>
      </>
    );
  }

  retrieveWelcomeMessage() {
    // HelloWorldService.executeHelloWorldService().then((response) =>
    //   this.handleSuccessfulResponse(response)
    // );

    //     HelloWorldService.executeHelloWorldBeanService().then((response) =>
    //       this.handleSuccessfulResponse(response)
    //     );
    //   }

    HelloWorldService.helloWorldPathVariableService()
      .then((response) => this.handleSuccessfulResponse(response))
      .catch((error) => this.handleError(error));
  }

  handleSuccessfulResponse(response) {
    this.setState({ welcomeMessage: response.data.message });
    console.log(this.state.welcomeMessage);
  }

  handleError(error) {
    let errorMessage = "";

    if (error.message) {
      errorMessage += error.message;
    }

    if (error.response && error.response.data) {
      errorMessage += error.response.data.message;
    }

    this.setState({
      welcomeMessage: error.response.data.message,
      error: !this.state.error,
    });

    console.log(error.response);
  }
}

export default WelcomeComponent;

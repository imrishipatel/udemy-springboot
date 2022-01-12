import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

import HelloWorldService from "../../api/todo/HelloWorldService";

class WelcomeComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      welcomeMessage: "",
    };
    this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
    this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
  }

  render() {
    // let { name } = useParams();
    return (
      <>
        <h1>Welcome!</h1>
        <div className="container">
          Hey rishipatel! You can manage your Todos{" "}
          <Link to="/todos">here.</Link>
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
    HelloWorldService.executeHelloWorldService().then((response) =>
      this.handleSuccessfulResponse(response)
    );

    // HelloWorldService.executeHelloWorldService().then((response) =>
    //   this.handleSuccessfulResponse(response)
    // );
  }

  handleSuccessfulResponse(response) {
    this.setState({ welcomeMessage: response.data });
    console.log(this.state.welcomeMessage);
  }
}

export default WelcomeComponent;

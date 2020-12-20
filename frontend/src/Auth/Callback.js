import React, { Component } from "react";

class Callback extends Component {
  componentDidMount = () => {
    // Handle authentication if expected values are in the url.
    // Check if values are in the callback url.
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.props.auth.handleAuthentication();
    } else {
      throw new Error(`Invalid callback URL!`);
    }
  };
  render() {
    return (
      <div class="spinner-grow" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    );
  }
}

export default Callback;

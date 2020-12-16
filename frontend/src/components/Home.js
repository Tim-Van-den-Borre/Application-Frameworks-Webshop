import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    // Check if the user is authenticated
    const { isAuthenticated, login } = this.props.auth;
    return (
      <div>
        <p>Home</p>
        {isAuthenticated() ? (
          <Link to="/profile">Profile</Link>
        ) : (
          <button onClick={login}>Login</button>
        )}
      </div>
    );
  }
}

export default Home;

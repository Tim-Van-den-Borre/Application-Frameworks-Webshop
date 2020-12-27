import React, { Component } from "react";
import "./App.css";
import { Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Auth from "./Auth/Auth";
import Callback from "./Auth/Callback";

class App extends Component {
  constructor(props) {
    super(props);

    // Authentication
    this.auth = new Auth(this.props.history);

    // Check if the localStorage has the item (place the items in the cart). If not create an empty cart and set an empty item in the localstorage.
    if (JSON.parse(localStorage.getItem("CartItems"))) {
      this.state = {
        Cart: JSON.parse(localStorage.getItem("CartItems")),
      };
    } else {
      this.state = {
        Cart: [],
      };
      localStorage.setItem("CartItems", "[]");
    }
  }

  render = () => {
    return (
      <>
        {/* Import the navbar component and pass the state using props(contains the cart). */}
        <Navbar auth={this.auth} cartdata={this.state.Cart} />
        <div className="body">
          {/* Route to the home component. Pass the authentication history & the state using props. */}
          <Route
            path="/"
            exact
            render={(props) => (
              <Home auth={this.auth} {...props} cartdata={this.state.Cart} />
            )}
          />

          {/* Route to the callback. The callback will handle the authentication using values from the url. The authentication will set the session and redirect to the homepage. */}
          <Route
            path="/callback"
            render={(props) => <Callback auth={this.auth} {...props} />}
          />

          {/* Route to the profile component. If the user is authenticated we pass the auth values and props to the Profile component. */}
          <Route
            path="/profile"
            render={(props) =>
              this.auth.isAuthenticated() ? (
                <Profile auth={this.auth} {...props} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
        </div>
      </>
    );
  };
}

export default App;

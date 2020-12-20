import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    const { isAuthenticated, login, logout } = this.props.auth;
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="./">
            Webshop
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/">Home</Link>
              </li>
            </ul>
            {isAuthenticated() ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/cart">Cart</Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <Link onClick={logout}>Log out</Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/cart">Cart</Link>
                </li>
                <li className="nav-item">
                  <Link onClick={login}>Log in</Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;

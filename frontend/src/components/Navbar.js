import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      error: "",
      Cart: [],
    };
  }

  // Get the user profile if the user is authenticated (unique username needed for submitting order).
  componentDidMount = () => {
    this.getProfileInfo();
  };

  getProfileInfo = () => {
    if (this.props.auth.isAuthenticated()) {
      this.props.auth.getProfile((profile, error) =>
        this.setState({ profile, error })
      );
    }
  };

  // Get all the cart items.
  getCartItems = () => {
    this.setState({ Cart: this.props.cartdata });
  };

  // Remove an item from the cart.
  removeItemFromCart = (index) => {
    this.setState({
      Cart: this.props.cartdata.splice(index, 1),
    });
    localStorage.setItem("CartItems", JSON.stringify(this.props.cartdata));
  };

  // Save the order.
  submitOrder = (count, username) => {
    let products = "";

    for (let product of this.props.cartdata) {
      products += product.description + " €" + product.price + ". ";
    }

    fetch(
      `http://localhost:8080/api/orders?username=${username}&products=${products}&total=${count.toFixed(
        2
      )}`,
      {
        method: "POST",
        accept: "application/json",
      }
    )
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(`Could not post order.`);
      })
      .catch((error) => console.log(`Error: ${error}`));

    localStorage.setItem("CartItems", "[]");
    window.location.reload();
  };

  render() {
    const { isAuthenticated, login, logout } = this.props.auth;
    const { profile } = this.state;
    if (!profile) {
      this.getProfileInfo();
    }
    this.count = 0;
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
            Tim's Webshop
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" style={{ color: "white" }} href="/">
                  Product catalogue
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/"
                  data-toggle="modal"
                  data-target="#staticBackdrop"
                  onClick={() => this.getCartItems()}
                  style={{ color: "white" }}
                >
                  Cart
                </a>
              </li>
              <div
                className="modal fade"
                id="staticBackdrop"
                data-backdrop="static"
                data-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title" id="staticBackdropLabel">
                        Cart
                      </h4>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      {this.props.cartdata.map((product, index) => {
                        return (
                          <div className="row" key={index}>
                            <div className="col-10">
                              <p>
                                {product.description} - €{product.price}
                              </p>
                            </div>
                            <div className="col-2">
                              <button
                                onClick={() => this.removeItemFromCart(index)}
                                type="button"
                                className="btn btn-danger btn-sm"
                              >
                                Remove
                              </button>
                              <p className="hidden">
                                Subtotal:
                                {(this.count += product.price).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      <br />
                      {this.count !== 0 ? (
                        <div className="row">
                          <div className="col-12">
                            <p>Total: €{this.count.toFixed(2)}</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p>Your cart is empty!</p>
                        </>
                      )}
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      {isAuthenticated() ? (
                        <button
                          onClick={() =>
                            this.submitOrder(this.count, profile.nickname)
                          }
                          type="button"
                          className="btn btn-primary btn-sm"
                        >
                          Submit my order
                        </button>
                      ) : (
                        <button className="btn btn-primary btn-sm">
                          <Link
                            style={{ color: "white" }}
                            to=""
                            onClick={login}
                            auth={this.props.auth}
                          >
                            Please Log in / Sign up
                          </Link>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {isAuthenticated() ? (
                <li className="nav-item">
                  <a
                    className="nav-link"
                    style={{ color: "white" }}
                    href="/profile"
                  >
                    Profile
                  </a>
                </li>
              ) : (
                <></>
              )}
              {isAuthenticated() ? (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    style={{ color: "white" }}
                    to=""
                    onClick={logout}
                    auth={this.props.auth}
                  >
                    Log out
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    style={{ color: "white" }}
                    to=""
                    onClick={login}
                    auth={this.props.auth}
                  >
                    Log in / Sign up
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;

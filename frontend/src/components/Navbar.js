import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Cart: [],
    };
  }

  // Get all the cart items from the props.
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

  closeCart = () => {
    window.location.reload();
  };

  render() {
    const { isAuthenticated, login, logout } = this.props.auth;
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
                          <div className="right col-12">
                            <p>Total: {this.count.toFixed(2)}</p>
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
                        onClick={this.closeCart}
                      >
                        Close
                      </button>
                      {isAuthenticated() ? (
                        <div>
                          {this.count !== 0 ? (
                            <a
                              className="btn btn-primary btn-sm"
                              style={{ color: "white" }}
                              href="/checkout"
                            >
                              Proceed to checkout
                            </a>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              href="/checkout"
                              disabled
                            >
                              Proceed to checkout
                            </button>
                          )}
                        </div>
                      ) : (
                        <button className="btn btn-primary btn-sm">
                          <Link
                            style={{ color: "white" }}
                            to=""
                            onClick={login}
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

import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Cart: [],
      Count: 0,
      profile: null,
      error: "",
    };
    if (this.props.auth.isAuthenticated()) {
      // Get the username.
      this.props.auth.getProfile((profile, error) =>
        this.setState({ profile, error })
      );
    }
  }

  handleCart = () => {
    this.setState({ Cart: this.props.cartdata });
    localStorage.setItem("CartItems", JSON.stringify(this.props.cartdata));
  };

  removeItemFromCart = (index) => {
    this.setState({
      Cart: this.props.cartdata.splice(index, 1),
    });
    localStorage.setItem("CartItems", JSON.stringify(this.props.cartdata));
  };

  saveOrder = () => {
    let products = "Products: ";

    for (let product of this.props.cartdata) {
      products +=
        product.name + " " + product.description + " €" + product.price + ". ";
    }
    console.log(products);
    fetch(
      `http://localhost:8080/api/orders?username=${this.state.profile.nickname}&products=${products}`,
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
    console.log(this.props.cartdata);
    localStorage.removeItem("CartItems");
    window.location.reload();
  };

  render = () => {
    const { isAuthenticated, login, logout } = this.props.auth;
    this.count = 0;
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

            <ul className="navbar-nav ml-auto">
              <li>
                <a
                  href="/"
                  onClick={this.handleCart}
                  data-toggle="modal"
                  data-target="#staticBackdrop"
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
                      <h5 className="modal-title" id="staticBackdropLabel">
                        Cart
                      </h5>
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
                      <ul className="list-group">
                        {this.props.cartdata.map((product, index) => {
                          return (
                            <div key={index}>
                              <li className="list-group-item">
                                <p>
                                  {product.name} - {product.description} - €
                                  {product.price}
                                </p>

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
                              </li>
                            </div>
                          );
                        })}
                      </ul>
                      <hr />
                      <p>Total: {this.count.toFixed(2)}</p>
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
                          onClick={this.saveOrder}
                          type="button"
                          className="btn btn-primary btn-sm"
                        >
                          Submit order
                        </button>
                      ) : (
                        <Link to="" onClick={login}>
                          Log in / Sign up
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {isAuthenticated() ? (
                <li className="nav-item">
                  <Link to="/profile">Profile</Link>
                </li>
              ) : (
                <></>
              )}
              {isAuthenticated() ? (
                <li className="nav-item">
                  <Link to="" onClick={logout}>
                    Log out
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link to="" onClick={login}>
                    Log in / Sign up
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </>
    );
  };
}

export default Navbar;

import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Cart: [],
    };
  }

  handleCart = () => {
    this.setState({ Cart: this.props.cartdata });
  };

  render = () => {
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
                            <li className="list-group-item" key={index}>
                              {product.name} - {product.description} - €
                              {product.price}
                              <button
                                onClick={() =>
                                  this.setState({
                                    Cart: this.props.cartdata.splice(index, 1),
                                  })
                                }
                                type="button"
                                className="btn btn-danger btn-sm"
                              >
                                Remove
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" className="btn btn-primary btn-sm">
                        Submit order
                      </button>
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

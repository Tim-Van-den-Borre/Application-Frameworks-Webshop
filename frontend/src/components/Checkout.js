import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class checkout extends Component {
  state = {
    profile: null,
    error: "",
    Orders: [],
    Payment: "Mastercard",
  };

  // Load user profile data and add the profile to the state.
  componentDidMount = () => {
    this.props.auth.getProfile((profile, error) =>
      this.setState({ profile, error })
    );
    this.getCartItems();
  };

  // Get all the cart items.
  getCartItems = () => {
    this.setState({ Cart: JSON.parse(localStorage.getItem("CartItems")) });
  };

  changePayment = (event) => {
    this.setState({ Payment: event.target.value });
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
      )}&payment=${this.state.Payment}`,
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
    const { profile } = this.state;
    if (!profile) return null;
    this.count = 0;

    if (localStorage.getItem("CartItems") === "[]") {
      return <Redirect to="/" />;
    }

    return (
      <div id="checkout">
        <div>
          <div className="form-group">
            <label for="username">User: {profile.nickname}</label>
            <br />
            <label for="emailaddress">Email address: {profile.email}</label>
          </div>
          <div className="form-group" onChange={this.changePayment}>
            <label for="selectpayment">Payment Method:</label>
            <select className="form-control" id="selectpayment">
              <option value="Mastercard">Mastercard</option>
              <option value="American Express">American Express</option>
              <option value="VISA">VISA</option>
            </select>
          </div>
          <div className="form-group">
            <label for="exampleFormControlSelect2">Products:</label>
            <br />
            {this.props.cartdata.map((product, index) => {
              return (
                <div className="row" key={index}>
                  <div className="col-10">
                    <p>
                      {product.description} - €{product.price}
                    </p>
                  </div>
                  <div className="col-2">
                    <p className="hidden">
                      Subtotal:
                      {(this.count += product.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="form-group">
            <div className="right col-12">
              <p>Total: ${this.count.toFixed(2)}</p>
            </div>
          </div>
          <div className="form-group">
            <div className="right col-12">
              <button
                onClick={() => this.submitOrder(this.count, profile.nickname)}
                type="button"
                className="btn btn-primary btn-sm"
              >
                Submit my order
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default checkout;

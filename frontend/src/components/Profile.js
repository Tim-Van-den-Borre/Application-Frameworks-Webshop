import React, { Component } from "react";

class Profile extends Component {
  state = {
    profile: null,
    error: "",
    orders: [],
  };

  // Load user profile data and add the profile to the state.
  componentDidMount = () => {
    this.props.auth.getProfile((profile, error) =>
      this.setState({ profile, error })
    );
  };

  // Show the orders from the user.
  showOrdersByUsername = (username) => {
    fetch(`http://localhost:8080/api/productorders?username=${username}`)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(`Could not fetch orders.`);
      })
      .then((response) => this.setState({ orders: response }))
      .catch((error) => console.log(`Error: ${error}`));
  };

  render = () => {
    // Variable for profile (easy access in the render)
    const { profile } = this.state;
    if (!profile) return null;
    return (
      <>
        <div className="media">
          <img
            style={{ maxHeight: 60, minHeight: 60 }}
            src={profile.picture}
            className="mr-3"
            alt="profile pic"
          />
          <div className="media-body">
            <h5 className="mt-0">Welcome {profile.nickname}</h5>
            <p>Email address: {profile.email}</p>
          </div>
        </div>
        <hr />
        <div className="Orders">
          <p>Your order history:</p>
          {this.showOrdersByUsername(profile.nickname)}
          {this.state.orders.map((order, index) => {
            return (
              <div key={index}>
                <li className="list-group-item">
                  <p>
                    Product(s): <br />
                    {order.products}
                  </p>
                  <p>Total Amount: {order.total}</p>
                  <p>Payment method: {order.paymentmethod}</p>
                  <p>Order date: {order.date}</p>
                </li>
                <br />
              </div>
            );
          })}
        </div>
      </>
    );
  };
}

export default Profile;

/*
  Implement auth0. Login. Sign up. Consulted 16/12/2020.
  https://app.pluralsight.com/library/courses/react-auth0-authentication-security/table-of-contents
*/

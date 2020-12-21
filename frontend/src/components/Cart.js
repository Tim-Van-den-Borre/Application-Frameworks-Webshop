import React, { Component } from "react";

class Cart extends Component {
  state = {
    Cart: JSON.parse(localStorage.getItem("items")),
  };

  render = () => {
    return (
      <>
        <h4>Your cart</h4>
        <ul className="list-unstyled">
          {this.state.Cart.map((product, index) => {
            return (
              <li className="media" key={index}>
                <img
                  style={{ maxWidth: 150, maxHeight: 150 }}
                  src={product.image}
                  className="mr-3"
                  alt="Product img"
                />
                <div className="media-body">
                  <h5 className="mt-0 mb-1">{product.name}</h5>
                  <p>{product.description}</p>
                  <p>€{product.price}</p>
                </div>
                <div className="media-footer">
                  <button
                    onClick={() =>
                      this.setState({
                        Cart: this.state.Cart.splice(index, 1),
                      })
                    }
                  ></button>
                </div>
              </li>
            );
          })}
        </ul>
      </>
    );
  };
}

export default Cart;

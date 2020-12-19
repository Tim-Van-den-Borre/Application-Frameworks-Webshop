import React, { Component } from "react";

class Cart extends Component {
  state = {
    Cart: [],
  };

  render() {
    return (
      <>
        <h4>Your cart</h4>
        <ul class="list-unstyled">
          {this.state.Cart.map((product, index) => {
            return (
              <li class="media" key={product.id}>
                <img
                  style={{ maxWidth: 150, maxHeight: 150 }}
                  src={product.image}
                  class="mr-3"
                  alt="Product img"
                />
                <div class="media-body">
                  <h5 class="mt-0 mb-1">{product.name}</h5>
                  <p>{product.description}</p>
                  <p>{product.price}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default Cart;

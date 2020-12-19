import React, { Component } from "react";
import Filter from "./Filter";

class Home extends Component {
  state = {
    Products: [],
    Cart: [],
  };

  // Get all the products. Accepts application/json by default.
  componentDidMount = () => {
    fetch(`http://localhost:8080/api/products`)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(`Could not fetch products.`);
      })
      .then((response) => this.setState({ Products: response }))
      .catch((error) => console.log(`Error: ${error}`));
  };

  // Get all the products filtered by category. Accepts application/json by default.
  filteredProducts = (category) => {
    if (category === "None") this.componentDidMount();
    fetch(`http://localhost:8080/api/products?category=${category}`)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(`Could not fetch categories.`);
      })
      .then((response) => this.setState({ Products: response }))
      .catch((error) => console.log(`Error: ${error}`));
  };

  render() {
    return (
      <>
        <div>
          <div className="row" id="filter">
            <Filter onSubmit={this.filteredProducts} />
          </div>
          <div className="row" id="products">
            {this.state.Products.map((product, index) => {
              return (
                <div className="card" key={product.id}>
                  <img className="card-img-top" src={product.image} alt="" />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text" id="description">
                      {product.description}
                    </p>
                    <p className="card-text" id="price">
                      €{product.price}
                    </p>
                    <p className="card-text" id="amount">
                      Beschrikbaar: {product.amount}
                    </p>
                    <button
                      onClick={() =>
                        this.setState({ Cart: this.state.Cart.concat(product) })
                      }
                      type="button"
                      className="btn btn-info btn-sm"
                    >
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        className="bi bi-plus"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                        />
                      </svg>
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        className="bi bi-cart4"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Home;

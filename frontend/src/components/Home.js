import React, { Component } from "react";
import Filter from "./Filter";

class Home extends Component {
  state = {
    Products: [],
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

  saveToCart = (product) => {
    this.props.cartdata.push(product);
    console.log(this.props.cartdata);
  };

  render = () => {
    return (
      <>
        <div>
          <div className="row" id="filter">
            <Filter onSubmit={this.filteredProducts} />
          </div>
          <div className="row" id="products">
            {this.state.Products.map((product) => {
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
                  </div>
                  <div className="card-footer">
                    <button
                      onClick={() => this.saveToCart(product)}
                      type="button"
                      className="btn btn-info btn-sm"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };
}

export default Home;

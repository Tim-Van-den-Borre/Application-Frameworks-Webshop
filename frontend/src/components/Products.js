import React, { Component } from 'react'
import Filter from './Filter'
import Navbar from "./Navbar";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Products: [],
            Cart: []
        };
    }

    componentDidMount = () => {
        fetch("http://localhost:8080/api/products", {
            method: "GET",
            headers: {
                "accept": "application/json",
            }
        })
            .then((response) => {
                if (response.ok){
                    return response.json();
                }
                console.log("error: " + response);
            })
            .then((json) => {
                console.log("Products:" + json)
                this.setState({Products: json});
            })
            .catch((error) => {
                console.log("error: " + error);
            })
    }

    filteredProducts = (category) => {
        if (category === 'None') this.componentDidMount()
        fetch(`http://localhost:8080/api/products?category=${category}`, {
            method: "GET",
            headers: {
                "accept": "application/json",
            }
        })
            .then((response) => {
                if (response.ok) return response.json()
                console.log("error: " + response);
            })
            .then((json) => {
                console.log("Products: " + json);
                this.setState({ Products: json });
            })
            .catch((error) => {
                console.log("error: " + error);
            })
    }

    render = () => {
        return (
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
                                        <p className="card-text" id="description">{product.description}</p>
                                        <p className="card-text" id="price">€{product.price}</p>
                                        <button onClick={() => this.setState({ Cart: this.state.Cart.concat(product.name)})} type="button" className="btn btn-info btn-sm">Add to cart</button>
                                    </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Products

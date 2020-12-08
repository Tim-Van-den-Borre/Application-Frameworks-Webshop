import React, { Component } from 'react'
import Filter from './Filter'

class Products extends Component {
    state = {
        Products: []
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
            <div className="mt-4">
                <h2>Products</h2>
                <div className="row" id="filter">
                    <Filter onSubmit={this.filteredProducts} />
                </div>
                <div className="row" id="products">
                    {this.state.Products.map((product, index) => {
                        return (
                            <div className="col-md-4" key={product.id}>
                                <div className="card">
                                    <img src="#" className="card-img-top" alt="image" />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">{product.description}</p>
                                        <p className="card-text">{product.price}</p>
                                        <a href="#" className="btn btn-primary btn-sm">Add to cart</a>
                                    </div>
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

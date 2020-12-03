import React, {Component} from 'react';
import Filter from "./Filter";

class Products extends Component{
    state = {
        Products: []
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/products", {
            method: "GET",
            headers: {
                'accept': 'application/json',
            }
        }).then(response => {
            if(response.ok){
                return response.json()
            }
            console.log("Error: ", response);
        }).then(json => {
            console.log("Products: ", json);
            this.setState({Products: json})
        }).catch(error => {
            console.log("Error: ", error);
        })
    };

    filterProducts(category) {

    }

    render() {
        return(
            <div className="container">
                <div className="Filter">
                    <Filter onSubmit={this.filterProducts()} />
                </div>
                <div className="row">
                    {
                        this.state.Products.map((product, index) => {
                            return <div className="col-md-4">
                                <div className="card" key={product.id}>

                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">Description:<br /> {product.description}</p>
                                        <p className="card-text">Price: {product.price}</p>
                                        <a href="#" className="btn btn-primary btn-sm">Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}
export default Products
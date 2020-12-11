import React, {Component} from 'react';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="Products.js">Webshop</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="Products.js">Producten</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="modal" data-target="#staticBackdrop">Winkelwagen</a>
                        </li>
                        <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="staticBackdropLabel">Winkelwagen</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <ul className="list-group">
                                            {this.props.cartdata.map((product, index) => {
                                                return (
                                                    <ul className="list-group-item" key={product.id}>
                                                        {product.name} - {product.description} - €{product.price}
                                                        <button onClick={() => this.setState({ Cart: this.props.cartdata.pop(product.id)})} type="button" className="btn btn-danger btn-sm">
                                                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-shield-fill-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" d="M8 .5c-.662 0-1.77.249-2.813.525a61.11 61.11 0 0 0-2.772.815 1.454 1.454 0 0 0-1.003 1.184c-.573 4.197.756 7.307 2.368 9.365a11.192 11.192 0 0 0 2.417 2.3c.371.256.715.451 1.007.586.27.124.558.225.796.225s.527-.101.796-.225c.292-.135.636-.33 1.007-.586a11.191 11.191 0 0 0 2.418-2.3c1.611-2.058 2.94-5.168 2.367-9.365a1.454 1.454 0 0 0-1.003-1.184 61.09 61.09 0 0 0-2.772-.815C9.77.749 8.663.5 8 .5zM6.854 6.146a.5.5 0 1 0-.708.708L7.293 8 6.146 9.146a.5.5 0 1 0 .708.708L8 8.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 8l1.147-1.146a.5.5 0 0 0-.708-.708L8 7.293 6.854 6.146z"/>
                                                            </svg>
                                                        </button>
                                                    </ul>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal">Sluit</button>
                                        <button type="button" className="btn btn-primary btn-sm">Plaats Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
            </nav>
        );
    }
}
export default Navbar
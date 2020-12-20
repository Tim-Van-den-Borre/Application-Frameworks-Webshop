import React, { Component } from "react";

class Filter extends Component {
  state = {
    Categories: [],
  };

  // Get all the categories. Accepts application/json by default.
  componentDidMount = () => {
    fetch(`http://localhost:8080/api/categories`)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(`Could not fetch categories.`);
      })
      .then((response) => this.setState({ Categories: response }))
      .catch((error) => console.log(`Error: ${error}`));
  };

  // Send the chosen category to the 'Home' (products) component to get the products by category.
  submitHandler = (event) => {
    this.props.onSubmit(event.target.value);
  };

  render() {
    return (
      <>
        <div className="form-group">
          <select
            className="form-control"
            id="filter"
            onChange={this.submitHandler}
            name={"category"}
          >
            <option>None</option>
            {this.state.Categories.map((category) => {
              return (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
      </>
    );
  }
}
export default Filter;

import React, {Component} from 'react';

class Filter extends Component{
    state = {
        Categories: []
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/categories", {
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
            console.log("Categories: ", json);
            this.setState({Categories: json})
        }).catch(error => {
            console.log("Error: ", error);
        })
    };

    render() {
        return(
            <div className="form-group">
                <label htmlFor="filter">Filter by category</label>
                <select className="form-control" id="filter">
                    {
                        this.state.Categories.map((category, index) => {
                            return <option onClick={this.submitHandler} key={category.id} value={category.name}>{category.name}</option>
                        })
                    }
                </select>
            </div>
        )
    }
}
export default Filter
import React, {Component} from 'react';

class Filter extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Categories: []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/categories", {
            method: "GET",
            headers: {
                "accept": "application/json",
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

    submitHandler = (value) => {
        console.log(value);
        this.props.onSubmit(value)
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        console.log("Name: " + name + " Value: " + value);
        this.submitHandler(value);
    }

    render() {
        return(
            <div className="form-group">
                <label htmlFor="filter">Filter by category</label>
                <select className="form-control" id="filter" onChange={this.handleInputChange} name={"category"}>
                    <option>None</option>
                    {
                        this.state.Categories.map((category, index) => {
                            return <option key={category.id} value={category.name}>{category.name}</option>
                        })
                    }
                </select>
            </div>
        )
    }
}
export default Filter
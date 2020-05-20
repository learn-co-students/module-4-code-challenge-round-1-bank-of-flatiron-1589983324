import React, { Component } from "react";

class AddTransactionForm extends Component {

  state = {
    date: "",
    description: "",
    category: "",
    amount: ""
  }

  handleChange = (event) => {
    console.log(event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick = (event) => {
    event.preventDefault()
    this.props.makeTransaction( this.state )
  }

  render() {
    return (
      <div className="ui segment">
        <form className="ui form">
          <div className="inline fields">
            <input type="date" name="date" onChange={ this.handleChange } />
            <input type="text" name="description" placeholder="Description" onChange={ this.handleChange } />
            <input type="text" name="category" placeholder="Category" onChange={ this.handleChange } />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              step="0.01"
              onChange={ this.handleChange }
            />
          </div>
          <button className="ui button" type="submit" onClick={ this.handleClick } >
            Add Transaction
          </button>
        </form>
      </div>
    );
  }
}

export default AddTransactionForm;

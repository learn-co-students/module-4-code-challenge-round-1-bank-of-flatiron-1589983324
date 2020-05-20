import React, { Component } from "react";

class AddTransactionForm extends Component {
  state = {
    date: "",
    description: "",
    category: "",
    amount: 0
  }

  handleChange = (event) => {
    let name = event.target.name
    let value = event.target.value 

    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let { date, description, category, amount } = this.state
    
    fetch("http://localhost:6001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        date, description, category, amount
      })
    })
    .then(r => r.json())
    .then((newTransaction) => 
      this.props.addTransaction(newTransaction)  
    )
  }

  render() {

    return (
      <div className="ui segment">
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="inline fields">
            <input type="date" name="date" onChange = {this.handleChange} />
            <input type="text" name="description" placeholder="Description" onChange = {this.handleChange}/>
            <input type="text" name="category" placeholder="Category" onChange = {this.handleChange}/>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              step="0.01"
              onChange = {this.handleChange}
            />
          </div>
          <button className="ui button" type="submit">
            Add Transaction
          </button>
        </form>
      </div>
    );
  }
}

export default AddTransactionForm;

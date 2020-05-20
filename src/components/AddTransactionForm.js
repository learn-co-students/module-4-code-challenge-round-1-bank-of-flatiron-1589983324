import React, { Component } from "react";

class AddTransactionForm extends Component {
constructor() {
  super()
  this.state = this.getInitialState()
}

getInitialState = () => ({
  date: '',
  description: '',
  category: '',
  amount: 0.00
})


handleInputs = (evt) => {
  this.setState({
    [evt.target.name]: evt.target.value
  })
}

handleSubmit = (evt) => {
  evt.preventDefault()
  console.log(evt)
  fetch('http://localhost:6001/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      date: this.state.date,
      description: this.state.description,
      category: this.state.category,
      amount: this.state.amount
    })
  })
  .then(resp => resp.json())
  .then(transObj => this.props.addTransaction(transObj))
  this.setState(this.getInitialState())
}


  render() {
    return (
      <div className="ui segment">
        <form className="ui form"
              onSubmit={this.handleSubmit} >
          <div className="inline fields">
            <input type="date" 
              name="date"
              onChange={this.handleInputs}
              value={this.state.date}
              />
            <input type="text" 
                name="description" placeholder="Description" 
                onChange={this.handleInputs} 
                value={this.state.description } />
            <input type="text" 
                name="category" placeholder="Category" 
                onChange={this.handleInputs}
                value={this.state.category} />
            <input
              type="number"
              name="amount" placeholder="Amount" step="0.01"
              onChange={this.handleInputs }
              value={this.state.amount}
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

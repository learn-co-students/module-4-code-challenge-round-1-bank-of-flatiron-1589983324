import React, { Component } from "react";

class AddTransactionForm extends Component {

  state = {
    date: "",
    description: "",
    category: "",
    amount: ""
  }


  // Just like the Harry Potter one we had to set two states?
  // The states should be set after submitting
  handleFormInput = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    this.props.addNewTransaction(this.state)
  }

  render() {
    return (
      <div className="ui segment">
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="inline fields">
            
            <input type="date" name="date" 
            value={this.state.date} 
            onChange={this.handleFormInput}/>

            <input type="text" name="description" placeholder="Description" 
            value={this.state.description} 
            onChange={this.handleFormInput}/>

            <input type="text" name="category" placeholder="Category" 
            value={this.state.category} 
            onChange={this.handleFormInput}/>

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              step="0.01" 
              value={this.state.amount} onChange={this.handleFormInput}
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

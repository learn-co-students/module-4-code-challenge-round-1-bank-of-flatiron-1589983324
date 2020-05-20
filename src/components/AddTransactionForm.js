import React, { Component } from "react";

class AddTransactionForm extends Component {
  state = {
    date: "",
    description: "",
    category: "",
    amount: ""
  }

  handleUpdate = (e) => {
    let {name, value} = e.target
    this.setState({[name]: value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.newTrans(this.state)
  }

  render() {
    return (
      <div className="ui segment">
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="inline fields">
            <input type="date" name="date" value={this.state.date} onChange={this.handleUpdate}/>
            <input type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleUpdate}/>
            <input type="text" name="category" placeholder="Category" value={this.state.category} onChange={this.handleUpdate}/>
            <input
              type="number"
              name="amount"
              value={this.state.amount}
              onChange={this.handleUpdate}
              placeholder="Amount"
              step="0.01"
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

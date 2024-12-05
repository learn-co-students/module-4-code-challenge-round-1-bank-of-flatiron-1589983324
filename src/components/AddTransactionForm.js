import React, { Component } from "react";

class AddTransactionForm extends Component {

  state = {
    
    date: "",
    description: "",
    category: "",
    amount: "", 
}

//controlled component

 handleInput = (evt) => {

    this.setState({
      [evt.target.name]: evt.target.value
    })

 }

 handleSubmit = (evt) => {
   evt.preventDefault()

   this.props.addList(this.state)

 }
  render() {
    console.log(this.state)
    return (
      <div className="ui segment">
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="inline fields">
            <input type="date" name="date" onChange={this.handleInput} value={this.state.date}/>
            <input type="text" name="description" placeholder="Description" onChange={this.handleInput} value ={this.state.description} />
            <input type="text" name="category" placeholder="Category" onChange={this.handleInput} value = {this.state.category}/>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              step="0.01"
              value={this.state.amount}
              onChange={this.handleInput}
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

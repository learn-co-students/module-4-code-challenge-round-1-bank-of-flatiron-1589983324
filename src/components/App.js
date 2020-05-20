import React, { Component } from "react";
import AccountContainer from "./AccountContainer";
import "../stylesheets/App.css";

class App extends Component {

  state = {
    transactions: [],
    searchTerm: ""
  }

  componentDidMount() {
    fetch("http://localhost:6001/transactions")
      .then(r => r.json())
      .then(arrayTransaction => {
        // This should change the state?
        this.setState({transactions: arrayTransaction})
      })
  }

  transactionsSearchTerm = (newTerm) => {
    this.setState({
      searchTerm: newTerm
    })
  }

  transactionsFilter = () => {
    let filterArray = this.state.transactions.filter((transactionSearch) => {
      return transactionSearch.description.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    })
    return filterArray
  }

  // Post request for submitting new transaction
  addNewTransaction = (newTransaction) => {
    fetch("http://localhost:6001/transactions", {
      method: "POST",
      headers: {
        'Content-Type': "Application/json"
      },
      body: JSON.stringify(newTransaction)
    })
    .then(r => r.json())
    .then((createdTransaction) => {

      let formInput = [...this.state.transactions, createdTransaction]
      this.setState({
        transactions: formInput
      })
    })
  }

  deleteTransaction = (deleteThis) => {
    fetch(`http://localhost:6001/transaction/${this.transaction.id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': "Application/json"
      },
      body: JSON.stringify(deleteThis)
    })
    .then(r => r.json())
    .then((removeTransaction) => {

    })
  }

  render() {

    return (
      <div className="ui raised segment">
        <div className="ui segment violet inverted">
          <h2>The Royal Bank of Flatiron</h2>
        </div>
        <AccountContainer
        arrayTransaction={this.transactionsFilter()}
        addNewTransaction={this.addNewTransaction}
        searchTerm={this.state.searchTerm}
        transactionsSearchTerm={this.transactionsSearchTerm}
        />
      </div>
    );
  }
}

export default App;

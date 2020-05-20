import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {

  state = {
    transactions: [],
    searchTerm: ""
  }

  componentDidMount = () => {
    fetch("http://localhost:6001/transactions")
    .then(r => r.json())
    .then(transactions => {
      this.setState({
        transactions: transactions
      })
    })
  }

  makeTransaction = (transaction) => {
    console.log("Attempting To Post...")

    fetch("http://localhost:6001/transactions", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(transaction)
    })
    .then(r => r.json())
    .then(transaction => {
      console.log("Transaction Posted! ", transaction)
      this.setState((prevState) => ({
        transactions: [...prevState.transactions, transaction]
      }))
    })
  }

  setSearchTerm = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
    this.transactionsFiltered()
  }

  transactionsFiltered = () => {
    const searchTerm = this.state.searchTerm
    const filteredTransactions = this.state.transactions.filter(t => t.description.toUpperCase().includes(searchTerm.toUpperCase()))
    return filteredTransactions.sort(function(a, b) {
      var descriptionA = a.description.toUpperCase()
      var descriptionB = b.description.toUpperCase()
      if (descriptionA < descriptionB) {
        return -1
      }
      if (descriptionA > descriptionB) {
        return 1
      }
      return 0
    })
  }

  deleteTransaction = (transaction) => {
    console.log("DELETE", transaction)
    fetch(`http://localhost:6001/transactions/${transaction.id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(
      console.log("Deleted Transaction")
    )
    const deleted = this.state.transactions.filter((t => t.id !== transaction.id))
    this.setState({
      transactions: deleted
    })
  }


  render() {
    return (
      <div>
        <Search handleSearchTerm={ this.setSearchTerm } />
        <AddTransactionForm makeTransaction={ this.makeTransaction } />
        <TransactionsList transactions={ this.transactionsFiltered() } handleDoubleClick= { this.deleteTransaction }/>
      </div>
    );
  }
}

export default AccountContainer;

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
  }

  transactionsFiltered = () => {
    const searchTerm = this.state.searchTerm
    const filteredTransactions = this.state.transactions.filter(t => t.description.includes(searchTerm))
    return filteredTransactions
  }

  render() {
    return (
      <div>
        <Search handleSearchTerm={ this.setSearchTerm } />
        <AddTransactionForm makeTransaction={ this.makeTransaction } />
        <TransactionsList transactions={ this.transactionsFiltered() } />
      </div>
    );
  }
}

export default AccountContainer;

import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {
  state = {
    transactions: [],
    searchTerm: ""
  }

  componentDidMount() {
    fetch("http://localhost:6001/transactions")
    .then(r => r.json())
    .then((newTransactionsArr) => {
      this.setState({
        transactions: newTransactionsArr
      })
    })
  }

  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  pickTransactions = () => {
    let { transactions, searchTerm } = this.state

    let newArr = transactions.filter((transaction) =>
      transaction.description.includes(searchTerm)
    )
    return newArr
  }

  addTransaction = newTransaction => {
    let copyArr = this.state.transactions

    this.setState({
      transactions: [...copyArr, newTransaction]
    })
  }

  deleteTransaction = oldTransaction => {
    let { transactions } = this.state
    let copyArr = transactions.filter((transaction) =>
      transaction !== oldTransaction
    )

    this.setState({
      transactions: copyArr
    })
  }

  render() {
    console.log(this.state.searchTerm)

    return (
      <div>
        <Search searchTerm = { this.state.searchTerm } handleChange = {this.handleChange} />
        <AddTransactionForm addTransaction = {this.addTransaction} />
        <TransactionsList transactions = {this.pickTransactions()} deleteTransaction = { this.deleteTransaction } />
      </div>
    );
  }
}

export default AccountContainer;

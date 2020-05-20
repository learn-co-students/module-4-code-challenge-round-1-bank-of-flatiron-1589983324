import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {
  state = {
    transactions: [],
    searchTerm: "",
    selectValue: "all"
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

  handleSelectChange = (event) => {
    this.setState({
      selectValue: event.target.value
    })
  }

  render() {

    return (
      <div>
        <Search searchTerm = { this.state.searchTerm } handleChange = {this.handleChange} />
        <AddTransactionForm addTransaction = {this.addTransaction} />
        <select value = { this.state.selectValue } onChange = {this.handleSelectChange}>
          <option value="all">All</option>
          <option value="category">Category A-Z</option>
          <option value="description">Description A-Z</option>
        </select>
        <TransactionsList transactions = {this.pickTransactions()} deleteTransaction = { this.deleteTransaction } />
      </div>
    );
  }
}

export default AccountContainer;

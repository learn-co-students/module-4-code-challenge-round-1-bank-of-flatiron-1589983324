import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {
  state = {
    transactions: [],
    searchTerm: "",
    selectValue: "default"
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
    let { transactions, searchTerm, selectValue } = this.state
    let newArr = transactions

    newArr = transactions.filter((transaction) =>
      transaction.description.includes(searchTerm)
    )

    if (selectValue === "default") {
      newArr = transactions
    } else if (selectValue === "category") {
      newArr = transactions.sort(this.categorySort)
      console.log("Sorted by category")
    } else if (selectValue === "description") {
      newArr = transactions.sort(this.descriptionSort)
      console.log("Sorted by description")
    }
    return newArr
  }

  categorySort = (a,b) => {
    let valueA = a.category.toLowerCase()
    let valueB = b.category.toLowerCase()
    if (valueA < valueB) {
      return -1
    }
    if (valueA > valueB) {
      return 1
    }
    return 0
  }


  descriptionSort = (a,b) => {
    let valueA = a.description.toLowerCase()
    let valueB = b.description.toLowerCase()
    if (valueA < valueB) {
      return -1
    }
    if (valueA > valueB) {
      return 1
    }
    return 0
  }
  
  addTransaction = newTransaction => {
    let copyArr = this.state.transactions

    this.setState({
      transactions: [...copyArr, newTransaction]
    })
  }

  deleteTransaction = (id) => {
    let { transactions } = this.state
    let copyArr = transactions.filter((transaction) =>
      transaction.id !== id
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
        <label>Sort: </label>
        <select value = { this.state.selectValue } onChange = {this.handleSelectChange}>
          <option value="default">Default</option>
          <option value="category">Category A-Z</option>
          <option value="description">Description A-Z</option>
        </select>
        <TransactionsList transactions = {this.pickTransactions()} deleteTransaction = { this.deleteTransaction } />
      </div>
    );
  }
}

export default AccountContainer;

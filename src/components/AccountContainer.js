import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {

  constructor() {
    // initializes with empty bank statement array
    super()
    this.state = {
      bankStatement: [],
      searchTerm: ''
    }
  }

  componentDidMount() {
    // fetch goes here, only runs once!!
    // fetch pushes transactions to empty bank statement array

  fetch('http://localhost:6001/transactions')
  .then(resp => resp.json())
  .then(transactionsObj => {
    this.setState({
      bankStatement: transactionsObj
    })
  })
  }

  addTransaction = (transObj) => {
    this.setState({
      bankStatement: [...this.state.bankStatement, transObj]
    })
  }

  handleSearch = (evt) => {
    this.setState({ 
      searchTerm: evt.target.value 
    })
  }

  whichTransactionsToRender = () => {
    let filteredTransactions = this.state.bankStatement
    return filteredTransactions.filter(transactions => transactions.description.includes(this.state.searchTerm))
  }


  render() {

    return (
      <div>
        <Search 
          handleSearch={this.handleSearch} />
        <AddTransactionForm 
          addTransaction={this.addTransaction}
           />
        <TransactionsList
          bankStatement={this.whichTransactionsToRender()}
           />
      </div>
    );
  }
}

export default AccountContainer;

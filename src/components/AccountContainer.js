import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {

  state = {
    allTransactions: [],
    searchTerm: ""
  }

  handleSearchTerm = (termFromChild) => {
    this.setState({
      searchTerm: termFromChild
    })
  }

  decideWhatArrayToRender = () => {
    let copyOfAllTransactions = this.state.allTransactions.filter((transaction) => {
      return transaction.description.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    })
    return copyOfAllTransactions
  }

  componentDidMount(){
    fetch(`http://localhost:6001/transactions`)
      .then(response => response.json())
      .then((fetchedTransactions) => {
        this.setState({
          allTransactions: fetchedTransactions
        })
      })
  }

  addNewTransaction = (newTransaction) => {
    fetch(`http://localhost:6001/transactions`, {
      method: "POST",
      headers: {
        'Content-type': 'Application/json'
      },
      body: JSON.stringify(newTransaction)
    })
      .then(response => response.json())
      .then((newlyAddedTransaction) => {
        let updatedTransactionsList = [...this.state.allTransactions, newlyAddedTransaction]
        this.setState({
          allTransactions: updatedTransactionsList
        })
      })
  }

  render() {
    console.log(this.state)
    let sortedTransactions = this.decideWhatArrayToRender()
    console.log(sortedTransactions, "SORTED TRANSACTIONS")
    return (
      <div>
        <Search 
          searchTerm={this.state.searchTerm}
          handleSearchTerm={this.handleSearchTerm}
        />
        <AddTransactionForm 
          addNewTransaction={this.addNewTransaction}
        />
        <TransactionsList 
          transactions={this.decideWhatArrayToRender()}
        />
      </div>
    );
  }
}

export default AccountContainer;

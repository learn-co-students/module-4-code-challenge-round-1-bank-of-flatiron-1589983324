import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {

  state = {
    transList: [],
    searchTerm: ""
  }

  componentDidMount() {
    this.getTransactions()
  }

  getTransactions = () => {
    fetch('http://localhost:6001/transactions')
      .then(r => r.json())
      .then(transactions => {this.setState({transList: transactions})})
  }

  addTransaction = (newTrans) => {
    fetch('http://localhost:6001/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newTrans)
    })
      .then(r => r.json())
      .then(transaction => {
        let newList = [...this.state.transList, transaction]
        this.setState({transList: newList})
      })
  }

  updateSearchState = (searchTerm) => {
    let {name, value} = searchTerm
    this.setState({[name]: value})
  }

  filterSearch = () => {
    let {searchTerm,transList} = this.state
    let showList = [...transList]
    return showList.filter(trans => trans.description.includes(searchTerm))
  }

  render() {
    return (
      <div>
        <Search searchTerm={this.state.searchTerm} searchUpdate={this.updateSearchState} />
        <AddTransactionForm newTrans={this.addTransaction} />
        <TransactionsList transList={this.filterSearch()} />
      </div>
    );
  }
}

export default AccountContainer;

import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {

  state = {
    transList: [],
    searchTerm: "",
    sort: false,
    sortParam: ""
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

  updateSortState = (target) => {
    let newSortParam = target.innerText.toLowerCase()
    let newSort = {...this.state}
    newSort.sort = !newSort.sort
    newSort.sortParam = newSortParam
    this.setState(newSort)
  }

  sortTransactions = (transactions) => {
    let {sort, sortParam} = this.state
    if (sort) {
      return transactions.sort((a, b) => a[sortParam].localeCompare(b[sortParam]))
    } else {
      return transactions
    }
  }

  deleteTransaction = (e) => {
    let removeId = e.target.value
    fetch(`http://localhost:6001/transactions/${removeId}`, {
      method: 'DELETE'
    })
      .then(r => r.json())
      .then(emptyObj => {
        let newTransList = [...this.state.transList]
        let removeIndex = newTransList.findIndex(trans => trans.id === removeId)
        newTransList.splice(removeIndex, 1)
        this.setState({transList: newTransList})
      })
  }

  render() {
    return (
      <div>
        <Search searchTerm={this.state.searchTerm} searchUpdate={this.updateSearchState} />
        <AddTransactionForm newTrans={this.addTransaction} />
        <TransactionsList transList={this.sortTransactions(this.filterSearch())} sortUpdate={this.updateSortState} remove={this.deleteTransaction}/>
      </div>
    );
  }
}

export default AccountContainer;

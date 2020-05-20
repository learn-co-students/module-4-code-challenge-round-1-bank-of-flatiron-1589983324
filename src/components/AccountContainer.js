import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {

  state = {
    transList: [],
    search: ""
  }

  componentDidMount(){
    fetch('http://localhost:6001/transactions').then(r=>r.json())
    .then((transactions)=> {
        this.setState({
          transList: transactions
        })
    })

  }

  handleSubmit = (newTrans) => {
    fetch(`http://localhost:6001/transactions`, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        date: newTrans.date,
        description: newTrans.description,
        category: newTrans.category,
        amount: newTrans.amount
      })
    }).then(r=>r.json()).then((madeTrans)=> {
      let copyTransList = [...this.state.transList, madeTrans]
      this.setState({
        transList: copyTransList
      })
    })
  }

  handleSearch = (searchStr) => {
    // console.log("from AC", searchStr)
    this.setState({
      search: searchStr
    })
  }


  render() {
    let {search, transList} = this.state

    let filteredTrans = transList.filter((trans) => {
      return trans.description.toLowerCase().includes(search.toLowerCase())
    })

    // console.log(filteredTrans)

    return (
      <div>
        <Search handleSearch={this.handleSearch}/>
        <AddTransactionForm handleSubmit={this.handleSubmit}/>
        <TransactionsList transList={filteredTrans}/>
      </div>
    );
  }
}

export default AccountContainer;

import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
// import Sort from "./Sort"

class AccountContainer extends Component {

  state = {
    transList: [],
    search: "",
    sort: "All"
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
  
  // filterTrans = (finalTransList) => {
  //   let {search} = this.state
  //   finalTransList.filter((trans) => {
  //     return trans.description.toLowerCase().includes(search.toLowerCase())
  //   })
  //   // console.log(finalTransList)
  // }

  // handleStateSort = (sortStr) => {
  //   console.log("from AC", sortStr)
  //   this.setState({
  //     sort: sortStr
  //   })
  // }

  // handleSort = () => {
  //   if (this.state.sort === "All") {
  //     console.log(this.state)
  //     return [...this.state.transList]
  //   }
  //   if (this.state.sort === "Description") {
  //     return [...this.state.transList].sort((a,b)=>{
  //       return a.description.localeCompare(b.description)
  //   })
  //   }
  //   if (this.state.sort === "Category") {
  //     return [...this.state.transList].sort((a,b)=>{
  //       return a.category.localeCompare(b.category)
  //   })
  //   }
  // }

  handleDelete = (transObjToDelete) => {
    // console.log("from Ac", transObjToDelete)
    fetch(`http://localhost:6001/transactions/${transObjToDelete.id}`, {
        method: "DELETE"
      }).then(r=>r.json()).then((deletedObj)=>{
        let copyTransList = this.state.transList.filter((trans)=> {
          return trans.id !== transObjToDelete.id
        })
        this.setState({
          transList: copyTransList
        })
    })
  }


  render() {

    let {search, transList} = this.state
    let filteredTrans = transList.filter((trans) => {
      return trans.description.toLowerCase().includes(search.toLowerCase())
    })

    return (
      <div>
        <Search handleSearch={this.handleSearch}/>
        <AddTransactionForm handleSubmit={this.handleSubmit}/>
        {/* <Sort handleStateSort={this.handleStateSort}/> */}
        <TransactionsList 
        // transList={this.filterTrans(this.handleSort())} 
        transList={filteredTrans}
        handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default AccountContainer;

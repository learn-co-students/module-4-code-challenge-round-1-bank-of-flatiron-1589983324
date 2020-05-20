import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {
  state = {
    transactions: [],
    searchTerm: ""

  }

  //Get Transactions
  componentDidMount(){
    fetch("http://localhost:6001/transactions")
    .then(r => r.json())
    .then(responseObj => {
      console.log(responseObj)
       this.setState({
         transactions: responseObj
       })  
    })
  }

//Add Transcation
  handleAdd = (newAdd) => {
    
    fetch("http://localhost:6001/transactions",{
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify(newAdd)
    })
    .then(r => r.json())
    .then(responseObj => {

      let newList = [...this.state.transactions , newAdd]
      this.setState({

        transactions: newList

      })
    })

  }

  handleSearch = (searchTerm) => {
  
     this.setState({
       
         searchTerm,

     })

  }

  //Seach functionality

  renderTheSearch = () => {
   const {searchTerm , transactions} = this.state
   
    let array = transactions.filter(transaction => {
             
        return ( transaction.description.toLowerCase().includes(searchTerm) 
        || transaction.description.includes(searchTerm) )

    })
   
    return array
  }


  render() {
    return (
      <div>
        <Search searchTerm={this.state.searchTerm} handleSearch={this.handleSearch}/>
        <AddTransactionForm addList={this.handleAdd}/>
        <TransactionsList transactions = {this.renderTheSearch()} />
      </div>
    );
  }
}

export default AccountContainer;

import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort"

class AccountContainer extends Component {
  state = {
    transactions: [],
    searchTerm: "",
    sort: "All"

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

      let newList = [...this.state.transactions , responseObj]
      this.setState({

        transactions: newList

      })
    })

  }

  handleDelete = (id) => {

    fetch(`http://localhost:6001/transactions/${id}`,{
      method: "DELETE"
    }).then(r => r.json())
    .then(responseObj => {
       
      let newList = this.state.transactions.filter( (deletedTrans => {
            
            return deletedTrans.id !== id

      }))

      this.setState({
        transactions : newList
      })



    })
 }

  //set state
  handleSearch = (searchTerm) => {
  
     this.setState({
       
         searchTerm,

     })

  }

  helperFunc = () => {
    const {searchTerm , transactions} = this.state
    let array = transactions
    array = transactions.filter(transaction => {
             
      return ( transaction.description.toLowerCase().includes(searchTerm) 
      || transaction.description.includes(searchTerm) )
    })
    return array
  }
  
//Search functionality
renderTheSearch = () => {
   const {searchTerm , transactions , sort} = this.state
   let array = transactions
  

  if( sort === "All"){
      return this.helperFunc()
  }
  
  if (sort === "Category"){
    array = transactions.sort((transactionA , transactionB) => {
             
      return transactionA.category.localeCompare(transactionB.category) 

  }).filter(transaction => {
             
    return ( transaction.description.toLowerCase().includes(searchTerm) 
    || transaction.description.includes(searchTerm) )
    
  })
 return array

  }
  if (sort === "Description"){
    array = transactions.sort((transactionA , transactionB) => {
             
      return transactionA.description.localeCompare(transactionB.description)
   }).filter(transaction => {
             
    return ( transaction.description.toLowerCase().includes(searchTerm) 
    || transaction.description.includes(searchTerm) )
    
  })
 return array
 }
}

  handleSort = (term) => {
  this.setState({
      sort: term 
    })
  }
 render() {
    return (
      <div>
        <Search searchTerm={this.state.searchTerm} handleSearch={this.handleSearch}/>
        <Sort sort={this.state.sort}  handleSort={this.handleSort}/> 
        <AddTransactionForm addList={this.handleAdd}/>
        <TransactionsList transactions = {this.renderTheSearch()} deleteTrans = {this.handleDelete} />
         
        
      </div>
    );
  }
}

export default AccountContainer;

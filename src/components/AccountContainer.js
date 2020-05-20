import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {
  render() {
    return (
      <div>
        <Search 
        searchTerm={this.props.searchTerm}
        transactionsSearchTerm={this.props.transactionsSearchTerm}/>
        <AddTransactionForm 
        addNewTransaction={this.props.addNewTransaction}/>
        <TransactionsList 
        arrayTransaction={this.props.arrayTransaction}/>
      </div>
    );
  }
}

export default AccountContainer;

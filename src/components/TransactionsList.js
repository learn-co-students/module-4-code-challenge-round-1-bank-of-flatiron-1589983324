import React from "react";
import Transaction from "./Transaction";

const TransactionsList = (props) => {
  console.log("HEREEE", props.transactions)
  const transactions = props.transactions.map(transaction => {
  return <Transaction transaction={ transaction } key={ transaction.id }/>
  })

  return (
    <table className="ui celled striped padded table">
      <tbody>
        <tr>
          <th>
            <h3 className="ui center aligned header">Date</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Description</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Category</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Amount</h3>
          </th>
        </tr>
        { transactions }
      </tbody>
    </table>
  );
};

export default TransactionsList;

import React from "react";
import Transaction from "./Transaction";

const TransactionsList = (props) => {
  let transArray = props.transList.map(transaction => {
    return ( <Transaction key={transaction.id} transaction={transaction} remove={props.remove}/>)
  })
  return (
    <table className="ui celled striped padded table">
      <tbody>
        <tr>
          <th>
            <h3 className="ui center aligned header">Date</h3>
          </th>
          <th>
            <h3 className="ui center aligned header" onClick={(e) => props.sortUpdate(e.target)}>Description</h3>
          </th>
          <th>
            <h3 className="ui center aligned header" onClick={(e) => props.sortUpdate(e.target)}>Category</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Amount</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Delete</h3>
          </th>
        </tr>
        {transArray}
      </tbody>
    </table>
  );
};

export default TransactionsList;

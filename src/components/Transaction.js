import React from "react";

const Transaction = (props) => {

  const deleteTransaction = () => {
    props.deleteTrans(props.transaction.id)
  }
  return (
    <tr>
      <td>{props.transaction.date}</td>
      <td>{props.transaction.description}</td>
      <td>{props.transaction.category}</td>
      <td>{props.transaction.amount}</td>
      <td><button onClick = {deleteTransaction}>Delete Transaction</button></td>
    </tr>
  );
};

export default Transaction;

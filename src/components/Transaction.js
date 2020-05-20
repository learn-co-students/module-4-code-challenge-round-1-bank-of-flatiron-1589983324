import React from "react"

const Transaction = (props) => {
  let { date, description, category, amount } = props.transaction

  let handleDelete = event => {
    event.preventDefault()
    
    fetch(`http://localhost:6001/transactions/${props.transaction.id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then((oldTransaction) =>
      props.deleteTransaction(oldTransaction.id),
      console.log("Successfully deleted!")
    )
  }

  return (
    <tr>
      <td>{ date }</td>
      <td>{ description }</td>
      <td>{ category }</td>
      <td>{ amount }</td>
      <td><button onClick={handleDelete}>Delete</button></td>
    </tr>
  );
};

export default Transaction
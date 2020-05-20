import React from "react";

const Transaction = (props) => {
  // console.log(props)
  let {date, description, category, amount} = props.transObj
  // console.log(description)

let handleDelete = (evt) => {
  props.handleDelete(props.transObj)
  // console.log(props.transObj)
}

  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount}</td>
    <td><button onClick={handleDelete}>X</button></td>
    </tr>
  );
};

export default Transaction;

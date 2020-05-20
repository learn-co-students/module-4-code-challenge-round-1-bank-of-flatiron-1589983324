import React from "react";

const Transaction = (props) => {
  let {id, date, description, category, amount} = props.transaction
  let {remove} = props
  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount}</td>
      <td><button value={id} onClick={(e) => remove(e)}>⨉</button></td>
    </tr>
  );
};

export default Transaction;

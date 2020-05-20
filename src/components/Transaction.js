import React from "react";

const Transaction = (props) => {
  // console.log(props)
  let {date, description, category, amount} = props.transObj
  // console.log(description)



  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount}</td>
    </tr>
  );
};

export default Transaction;

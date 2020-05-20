import React from "react";

const Transaction = (props) => {
  return (
    <tr>
      <td>{ props.transaction.date }</td> {/* Date */}
      <td>{ props.transaction.description }</td> {/* Description */}
      <td>{ props.transaction.category }</td> {/* Category */}
      <td>{ "$ " + props.transaction.amount }</td> {/* Amount */}
    </tr>
  );
};

export default Transaction;

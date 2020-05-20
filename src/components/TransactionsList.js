import React from "react";
import Transaction from "./Transaction";

const TransactionsList = (props) => {

  let arrayOfTrans = props.transList.map((transObj) => {
    return <Transaction 
      key={transObj.id}
      transObj={transObj}
    />
  })

  // console.log(props)
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
        {arrayOfTrans}
      </tbody>
    </table>
  );
};

export default TransactionsList;

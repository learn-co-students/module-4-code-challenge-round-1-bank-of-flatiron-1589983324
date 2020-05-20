import React from "react";

const Search = (props) => {

  let onChangeHandle = (evt) => {
    // console.log(evt.target.value)
    props.handleSearch(evt.target.value)
  }

  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder={"Search your Recent Transactions"}
        onChange={onChangeHandle}
      />
      <i className="circular search link icon"></i>
    </div>
  );
};

export default Search;

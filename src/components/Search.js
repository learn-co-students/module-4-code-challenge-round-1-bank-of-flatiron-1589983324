import React from "react";

const Search = (props) => {

  let handleInfoToPassUp = (evt) => {
    console.log(evt.target.value, "OVER HERE")
    props.handleSearchTerm(evt.target.value)
  }
  

  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        value={props.searchTerm}
        placeholder={"Search your Recent Transactions"}
        onChange={handleInfoToPassUp}
      />
      <i className="circular search link icon"></i>
    </div>
  );
};

export default Search;

import React from "react";

const Search = (props) => {

const handleSearchTerm = (evt) => {
   
      props.handleSearch(evt.target.value)

  }
  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder={"Search your Recent Transactions"}
        onChange={handleSearchTerm}
        value = {props.searchTerm}
      />
      <i className="circular search link icon"></i>
    </div>
  );
};

export default Search;

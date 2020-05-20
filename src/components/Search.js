import React from "react";

const Search = (props) => {
  let {searchTerm, searchUpdate} = props
  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder={"Search your Recent Transactions"}
        name="searchTerm"
        value={searchTerm}
        onChange={(e) => {searchUpdate(e.target)}}
      />
      <i className="circular search link icon"></i>
    </div>
  );
};

export default Search;

import React from "react";
import '../styles/SearchBox.css';

const Searchbox = ({searchClick ,searchChange}) => {
  return (
    <div>
      <input
        className="search"
        type="search"
        placeholder="search"
        onChange={searchChange}
      />
      <button onClick={searchClick}>search</button>
    </div>
  );
};
export default Searchbox;

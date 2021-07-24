import React from "react";
import { TextField } from "@material-ui/core";

function SearchBar(props) {
  const { onSearch } = props;

  return (
    <div>
      <TextField
        onChange={onSearch}
        id="standard-basic"
        label="Search a course"
        name="search"
      />
    </div>
  );
}

export default SearchBar;

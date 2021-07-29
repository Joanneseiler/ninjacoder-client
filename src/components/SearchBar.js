import React from "react";
import { TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

function SearchBar(props) {
  const { onSearch } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 40,
      }}
    >
      <div>
        <TextField
          style={{ borderRadius: 20, width: "40ch" }}
          onChange={onSearch}
          id="standard-basic"
          label="Search a course"
          name="search"
        />
      </div>
      <div style={{ paddingTop: 20 }}>
        <SearchIcon />
      </div>
    </div>
  );
}

export default SearchBar;

import React from "react";
import { TextField } from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

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
          <TextField style={{borderRadius: 20, width: "40ch"}}
            onChange={onSearch}
            id="standard-basic"
            label="Search a course"
            name="search"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
      </div>
    </div>
  );
}

export default SearchBar;

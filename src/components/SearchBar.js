import React from "react";
import { TextField } from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

function SearchBar(props) {
  const { onSearch } = props;

  return (
    <div style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: 20}}>
      <div>
          <TextField style={{borderRadius: 20, width: "100%", maxWidth: 240}}
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
      {/* <div style={{paddingTop: 20}}>
          <SearchIcon/>
      </div> */}
    </div>
  );
}

export default SearchBar;

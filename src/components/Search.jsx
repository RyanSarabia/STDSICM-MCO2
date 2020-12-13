/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';

export default function Search() {
  const [searchInput, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = () => {
    if (searchInput !== '') {
      console.log(searchInput);
      axios.get(`/explore/getAllAuction?search=${searchInput}`).then((res) => {
        console.log(res.data);
      });
    }
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <FormControl variant="outlined">
      <OutlinedInput
        name="search"
        placeholder="Search"
        // variant="outlined"
        inputProps={{ maxLength: '30' }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="search" onClick={handleSubmit}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        style={{ width: '30vw' }}
        value={searchInput}
        onChange={handleChange}
        onKeyPress={handleEnterPress}
      />
    </FormControl>
  );
}

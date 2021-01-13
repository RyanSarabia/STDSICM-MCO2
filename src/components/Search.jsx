/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

export default function Search() {
  const [searchInput, setSearch] = useState('');
  const location = useLocation();
  const history = useHistory();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = () => {
    if (searchInput !== '') {
      // can be done without URLSearchParams, but will be kept if new URL queries are used
      const query = new URLSearchParams(location.search);
      query.set('search', searchInput);
      history.push(`/explore?search=${query.get('search')}`);
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

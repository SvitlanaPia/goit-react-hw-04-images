import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
  SearchbarComponent,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  StyledSearchIcon,
} from './Searchbar.styled';

export const Searchbar = props => {
  const [query, setQuery] = useState('');

  const onChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const onSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      toast.error('Please enter the value of images you are looking for.');
      return;
    }

    props.onSubmit(query);
    setQuery('');
  };

  return (
    <SearchbarComponent>
      <SearchForm onSubmit={onSubmit}>
        <SearchFormButton type="submit">
          <StyledSearchIcon />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={onChange}
        />
      </SearchForm>
    </SearchbarComponent>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

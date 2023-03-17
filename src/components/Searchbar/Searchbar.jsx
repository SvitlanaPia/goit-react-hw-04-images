import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
  SearchbarComponent,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  StyledSearchIcon,
} from './Searchbar.styled';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };

  onChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  onSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      toast.error('Please enter the value of images you are looking for.');
      return;
    }

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <SearchbarComponent>
        <SearchForm onSubmit={this.onSubmit}>
          <SearchFormButton type="submit">
            <StyledSearchIcon />
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.onChange}
          />
        </SearchForm>
      </SearchbarComponent>
    );
  }
}

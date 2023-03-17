import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppWrapper } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { requestPictures } from '../services/api';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    pictures: [],
    loading: false,
    error: null,
    showButton: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.page !== page || prevState.query !== query) {
      const fetchPictures = async () => {
        try {
          this.setState({ loading: true });
          const picturesData = await requestPictures(query, page);
          const pictures = picturesData.hits;
          const totalHits = picturesData.totalHits;

          if (!totalHits) {
            return toast.warn(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          }

          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...pictures],
          }));

          if (this.state.page >= Math.ceil(totalHits / 12)) {
            return this.setState({
              showButton: false,
            });
          }

          this.setState({
            showButton: true,
          });
        } catch (error) {
          this.setState({ error: error.message });
        } finally {
          this.setState({ loading: false });
        }
      };
      fetchPictures();
    }
  }

  onFormSubmit = query => {
    this.setState({
      query,
      page: 1,
      pictures: [],
      showButton: false,
    });
  };

  loadMoreBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { pictures, showButton, loading } = this.state;

    return (
      <AppWrapper>
        <Searchbar onSubmit={this.onFormSubmit}></Searchbar>
        <ImageGallery pictures={pictures}></ImageGallery>
        {showButton && <Button loadMoreBtn={this.loadMoreBtn}></Button>}
        {loading && <Loader />}
        <ToastContainer />
      </AppWrapper>
    );
  }
}

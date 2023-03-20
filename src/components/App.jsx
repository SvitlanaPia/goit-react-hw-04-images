import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppWrapper, ErrorWrapper } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { requestPictures } from '../services/api';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const fetchPictures = async () => {
      if (!query) return;

      try {
        setLoading(true);
        const picturesData = await requestPictures(query, page);
        const pictures = picturesData.hits;
        const totalHits = picturesData.totalHits;
        if (!totalHits) {
          return toast.warn(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        setPictures(prevPictures => [...prevPictures, ...pictures]);

        if (page >= Math.ceil(totalHits / 12)) {
          return setShowButton(false);
        }
        setShowButton(true);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPictures();
  }, [page, query]);

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setPictures([]);
    setShowButton(false);
  };

  const loadMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <AppWrapper>
      <Searchbar onSubmit={handleFormSubmit}></Searchbar>
      {loading && <Loader />}
      <ImageGallery pictures={pictures} />
      {showButton && <Button loadMoreBtn={loadMoreBtn} />}
      {error && <ErrorWrapper>Error: {error}</ErrorWrapper>}
      <ToastContainer />
    </AppWrapper>
  );
};

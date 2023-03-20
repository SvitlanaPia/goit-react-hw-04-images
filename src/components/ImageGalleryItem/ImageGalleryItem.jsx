import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItemImage, GalleryItem } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';

export const ImageGalleryItem = ({ pictures }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = picture => {
    setShowModal(true);
    setSelectedImage(picture);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage('');
  };

  return (
    <>
      {pictures.map(picture => (
        <GalleryItem key={picture.id} onClick={() => openModal(picture)}>
          <ImageGalleryItemImage
            src={picture.webformatURL}
            alt={picture.tags}
          />
        </GalleryItem>
      ))}
      {showModal && <Modal picture={selectedImage} closeModal={closeModal} />}
    </>
  );
};

ImageGalleryItem.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.object.isRequired),
};

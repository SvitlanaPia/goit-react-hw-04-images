import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Overlay, StyledModal } from './Modal.styled';

export const Modal = ({ picture, closeModal }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const onCloseModal = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  const { largeImageURL, tags } = picture;

  return (
    <Overlay onClick={onCloseModal}>
      <StyledModal>
        <img src={largeImageURL} alt={tags} />
      </StyledModal>
    </Overlay>
  );
};

Modal.propTypes = {
  picture: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};

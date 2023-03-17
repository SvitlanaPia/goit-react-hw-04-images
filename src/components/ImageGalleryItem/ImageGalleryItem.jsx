import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItemImage, GalleryItem } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';

export class ImageGalleryItem extends Component {
  static propTypes = {
    props: PropTypes.arrayOf(PropTypes.object.isRequired),
  };

  state = {
    showModal: false,
    selectedImage: '',
  };

  openModal = picture => {
    this.setState({
      showModal: true,
      selectedImage: picture,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      selectedImage: '',
    });
  };

  render() {
    const { pictures } = this.props;
    const { showModal, selectedImage } = this.state;

    return (
      <>
        {pictures.map(picture => (
          <GalleryItem key={picture.id} onClick={() => this.openModal(picture)}>
            <ImageGalleryItemImage
              src={picture.webformatURL}
              alt={picture.tags}
            />
          </GalleryItem>
        ))}
        {showModal && (
          <Modal picture={selectedImage} closeModal={this.closeModal} />
        )}
      </>
    );
  }
}

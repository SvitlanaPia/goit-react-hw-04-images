import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Overlay, StyledModal } from './Modal.styled';

export class Modal extends Component {
  static propTypes = {
    picture: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  closeModal = event => {
    if (event.currentTarget === event.target) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props.picture;

    return (
      <Overlay onClick={this.closeModal}>
        <StyledModal>
          <img src={largeImageURL} alt={tags} />
        </StyledModal>
      </Overlay>
    );
  }
}

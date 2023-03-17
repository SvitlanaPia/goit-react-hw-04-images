import PropTypes from 'prop-types';
import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ pictures }) => {
  return (
    <ImageGalleryList>
      <ImageGalleryItem pictures={pictures} />
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.object.isRequired),
};

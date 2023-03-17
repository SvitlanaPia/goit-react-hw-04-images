import PropTypes from 'prop-types';
import { LoadMoreBtn } from './Button.styled';

export const Button = ({ loadMoreBtn }) => {
  return (
    <LoadMoreBtn type="button" onClick={loadMoreBtn}>
      Load more
    </LoadMoreBtn>
  );
};

Button.propTypes = {
  loadMoreBtn: PropTypes.func.isRequired,
};

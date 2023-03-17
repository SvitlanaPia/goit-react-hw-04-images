import axios from 'axios';

export const requestPictures = async (query, page) => {
  const BASE_url = 'https://pixabay.com/api/';

  const params = {
    q: query,
    page: page,
    key: '33287661-e60aebe6a2e676af85a18e745',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: '12',
  };

  const { data } = await axios.get(`${BASE_url}`, { params });
  return data;
};

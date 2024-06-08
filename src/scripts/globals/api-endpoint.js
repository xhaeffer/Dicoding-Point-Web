import CONFIG from './config';

const API_ENDPOINT = {
  GET_RESTAURANTS: `${CONFIG.BASE_URL}/list`,
  GET_RESTAURANT: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
  SEARCH_RESTAURANT: (query) => `${CONFIG.BASE_URL}/search?q=${query}`,
  ADD_REVIEW: `${CONFIG.BASE_URL}/review`,
  GET_RESTAURANT_IMG: (pictId) => `${CONFIG.BASE_IMAGE_URL}/${pictId}`,
};

export default API_ENDPOINT;

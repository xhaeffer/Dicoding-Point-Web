import API_ENDPOINT from '../globals/api-endpoint';

class restaurantApi {
  static async getRestaurants() {
    try {
      const response = await fetch(API_ENDPOINT.GET_RESTAURANTS);
      const responseJson = await response.json();

      return responseJson;
    } catch (error) {
      return error;
    }
  }

  static async getRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.GET_RESTAURANT(id));
      const responseJson = await response.json();

      return responseJson;
    } catch (error) {
      return error;
    }
  }

  static async searchRestaurant(query) {
    try {
      const response = await fetch(API_ENDPOINT.SEARCH_RESTAURANT(query));
      const responseJson = await response.json();

      return responseJson;
    } catch (error) {
      return error;
    }
  }

  static async addReview(data) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(API_ENDPOINT.ADD_REVIEW, options);
      const responseJson = await response.json();

      return responseJson;
    } catch (error) {
      return error;
    }
  }
}

export default restaurantApi;

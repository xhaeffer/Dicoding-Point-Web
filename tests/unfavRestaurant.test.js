/* eslint-disable no-undef */
import FavoriteButtonInitiator from '../src/scripts/utils/fav-button-initiator';
import favRestaurantApi from '../src/scripts/data/favRestaurant-api';

describe('Unfavoriting A Restaurant', () => {
  const removeFav = () => {
    document.body.innerHTML = '<div id="addFav"></div>';
  };

  beforeEach(async () => {
    removeFav();
    await favRestaurantApi.addFavorite({ id: 1 });
  });

  afterEach(async () => {
    await favRestaurantApi.deleteFavorite(1);
  });

  it('should show the unfavorite button when the restaurant has been favorited', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButton: document.querySelector('#addFav'),
      restaurant: {
        id: 1,
      },
    });

    expect(document.querySelector('[aria-label="remove restaurant from favorite"]')).toBeTruthy();
  });

  it('should not show the favorite button when the restaurant has been favorited', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButton: document.querySelector('#addFav'),
      restaurant: {
        id: 1,
      },
    });

    expect(document.querySelector('[aria-label="add restaurant to favorite"]')).toBeFalsy();
  });

  it('should be able to remove a restaurant from favorite', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButton: document.querySelector('#addFav'),
      restaurant: {
        id: 1,
      },
    });

    document.querySelector('[aria-label="remove restaurant from favorite"]').dispatchEvent(new Event('click'));

    const restaurant = await favRestaurantApi.getFavorites();
    expect(restaurant).toEqual([]);
  });

  it('should not throw error when user click unfavorite button if the unfavorited movie is not in the list', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButton: document.querySelector('#addFav'),
      restaurant: {
        id: 1,
      },
    });

    await favRestaurantApi.deleteFavorite(1);

    document.querySelector('[aria-label="remove restaurant from favorite"]').dispatchEvent(new Event('click'));

    expect(await favRestaurantApi.getFavorites()).toEqual([]);
  });
});

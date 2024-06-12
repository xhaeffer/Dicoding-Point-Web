/* eslint-disable no-undef */
import FavoriteButtonInitiator from '../src/scripts/utils/fav-button-initiator';
import favRestaurantApi from '../src/scripts/data/favRestaurant-api';

describe('Favoriting A Restaurant', () => {
  const addFav = () => {
    document.body.innerHTML = '<div id="addFav"></div>';
  };

  beforeEach(() => {
    addFav();
  });

  it('should show the favorite button when the restaurant has not been favorited before', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButton: document.querySelector('#addFav'),
      restaurant: {
        id: 1,
      },
    });

    expect(document.querySelector('[aria-label="add restaurant to favorite"]')).toBeTruthy();
  });

  it('should not show the favorite button when the restaurant has not been favorited before', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButton: document.querySelector('#addFav'),
      restaurant: {
        id: 1,
      },
    });

    expect(document.querySelector('[aria-label="remove restaurant from favorite"]')).toBeFalsy();
  });

  it('should be able to add a restaurant to favorite', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButton: document.querySelector('#addFav'),
      restaurant: {
        id: 1,
      },
    });

    document.querySelector('#favButton').dispatchEvent(new Event('click'));

    const restaurant = await favRestaurantApi.getFavorite(1);
    expect(restaurant).toEqual({ id: 1 });

    await favRestaurantApi.deleteFavorite(1);
  });

  it('should not add a restaurant to favorite when it already exists', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButton: document.querySelector('#addFav'),
      restaurant: {
        id: 1,
      },
    });

    await favRestaurantApi.addFavorite({ id: 1 });

    document.querySelector('#favButton').dispatchEvent(new Event('click'));

    const restaurants = await favRestaurantApi.getFavorites();
    expect(restaurants).toEqual([{ id: 1 }]);

    await favRestaurantApi.deleteFavorite(1);
  });

  it('should not add a restaurant to favorite when it has no id', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButton: document.querySelector('#addFav'),
      restaurant: {},
    });

    document.querySelector('#favButton').dispatchEvent(new Event('click'));

    const restaurants = await favRestaurantApi.getFavorites();
    expect(restaurants).toEqual([]);
  });
});

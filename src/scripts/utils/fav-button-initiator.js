import FavoriteRestaurant from '../data/db-api';
import { favoriteButtonTemplate, favoritedButtonTemplate } from '../views/templates/items';

const FavoriteButtonInitiator = {
  async init({ favoriteButton, restaurant }) {
    this._favoriteButton = favoriteButton;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isFavorite(id)) {
      this._renderFavorited();
    } else {
      this._renderFavorite();
    }
  },

  async _isFavorite(id) {
    const restaurant = await FavoriteRestaurant.getFavorite(id);
    return !!restaurant;
  },

  _renderFavorite() {
    this._favoriteButton.innerHTML = favoriteButtonTemplate();

    let favButton = this._favoriteButton.getRootNode();
    favButton = favButton.querySelector('#favButton');
    favButton.addEventListener('click', async () => {
      await FavoriteRestaurant.addFavorite(this._restaurant);
      this._renderButton();
    });
  },

  _renderFavorited() {
    this._favoriteButton.innerHTML = favoritedButtonTemplate();

    let favButton = this._favoriteButton.getRootNode();
    favButton = favButton.querySelector('#favButton');
    favButton.addEventListener('click', async () => {
      await FavoriteRestaurant.deleteFavorite(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default FavoriteButtonInitiator;

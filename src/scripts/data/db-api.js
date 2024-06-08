import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const db = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const FavoriteRestaurant = {
  async getFavorite(id) {
    return (await db).get(OBJECT_STORE_NAME, id);
  },
  async getFavorites() {
    return (await db).getAll(OBJECT_STORE_NAME);
  },
  async addFavorite(movie) {
    return (await db).put(OBJECT_STORE_NAME, movie);
  },
  async deleteFavorite(id) {
    return (await db).delete(OBJECT_STORE_NAME, id);
  },
};

export default FavoriteRestaurant;

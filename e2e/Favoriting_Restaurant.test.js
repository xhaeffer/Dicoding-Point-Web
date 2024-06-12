/* eslint-disable no-undef */
const assert = require('assert');

Feature('Favoriting Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorited restaurant', ({ I }) => {
  I.see('Daftar kosong Tidak ada data yang dapat ditampilkan', '.no-data-msg');
});

Scenario('favoriting one restaurant', async ({ I }) => {
  I.see('Daftar kosong Tidak ada data yang dapat ditampilkan', '.no-data-msg');

  I.amOnPage('/');
  I.seeElement('.restaurant-item');
  const firstRestaurant = locate('.restaurant-item').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#addFav');
  I.click('#addFav');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');
  const favoritedRestaurantTitle = await I.grabTextFrom('.restaurant-item');

  assert.strictEqual(firstRestaurantTitle, favoritedRestaurantTitle);
});

Scenario('unfavoriting one restaurant', async ({ I }) => {
  I.see('Daftar kosong Tidak ada data yang dapat ditampilkan', '.no-data-msg');

  I.amOnPage('/');
  I.seeElement('.restaurant-item');
  const firstRestaurant = locate('.restaurant-item').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#addFav');
  I.click('#addFav');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');
  const favoritedRestaurantTitle = await I.grabTextFrom('.restaurant-item');

  assert.strictEqual(firstRestaurantTitle, favoritedRestaurantTitle);
  I.click(firstRestaurant);

  I.seeElement('#addFav');
  I.click('#addFav');

  I.amOnPage('/#/favorite');
  I.see('Daftar kosong Tidak ada data yang dapat ditampilkan', '.no-data-msg');
});

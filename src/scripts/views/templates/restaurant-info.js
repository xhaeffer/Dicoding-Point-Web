import restaurantApi from '../../data/restaurant-api';
import UrlParser from '../../routes/url-parser';
import API_ENDPOINT from '../../globals/api-endpoint';
import FavoriteButtonInitiator from '../../utils/fav-button-initiator';

import {
  favoriteButtonTemplate,
  errorTemplate,
  offlineTemplate,
  noDataTemplate,
} from './items';

class RestaurantInfo extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = this.getStyle();
    this.shadow.appendChild(style);

    this.restaurant = document.createElement('div');
    this.restaurant.className = 'restaurant';
    this.render();
    this.shadow.appendChild(this.restaurant);
  }

  async getRestaurant(id) {
    try {
      const { restaurant } = await restaurantApi.getRestaurant(id);
      return restaurant;
    } catch (error) {
      return error;
    }
  }

  async render() {
    try {
      const { id } = UrlParser.parseActiveUrlWithoutCombiner();
      const restaurantData = await this.getRestaurant(id);

      if (restaurantData === undefined) {
        throw new Error('Offline');
      }

      if (Object.keys(restaurantData).length === 0) {
        throw new Error('Empty');
      }

      if (restaurantData.error) {
        throw new Error(restaurantData.message);
      }

      const {
        name,
        city,
        address,
        pictureId,
        rating,
        description,
        categories,
        menus,
        customerReviews,
        img = API_ENDPOINT.GET_RESTAURANT_IMG(pictureId),
      } = restaurantData;

      this.restaurant.innerHTML = `
        <div class="restaurant-info">
          <div class="restaurant-card">
            <div class="restaurant-identity">
              <div class="restaurant-data">
                <h1 style="margin:0">${name}</h1>
                <p style="margin:0">⭐️ <b>${rating} | ${customerReviews.length} ulasan</b></p>
              </div>
              <div class="add-favorite" id="addFav">
                ${favoriteButtonTemplate()}
              </div>
            </div>
            <div class="restaurant-identity">
              <p style="margin:30px 0 0">Lokasi:<br> ${address}<br>${city}</p>
              <p style="margin:30px 0 0">Kategori:<br>${categories.map((category) => category.name).join(', ')}</p>
            </div>
          </div>
        </div>

        <div class="restaurant-img">
          <img src="${img}" alt="${name}">
        </div>

        <div class="restaurant-description">
          <div class="restaurant-card">
            <h2>Deskripsi</h2>
            <p>${description}</p>
          </div>
        </div>

        <div class="restaurant-menu">
          <div class="restaurant-card">
            <h2>Menu</h2>
            <p>Makanan:</p>
            <ul>${menus.foods.map((food) => `<li>${food.name}</li>`).join('')}</ul>
            <p>Minuman:</p>
            <ul>${menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}</ul>
          </div>
        </div>

        <div class="restaurant-review">
          <div class="restaurant-card">
            <h2>Penilaian & ulasan</h2>
            <p class="restaurant-score">${rating} / 5.0</p>
            <div class="restaurant-comments">
              ${customerReviews.map((review) => `
                <div class="restaurant-comment">
                  <p style="font-weight:bold">${review.name}</p>
                  <p>${review.review}</p>
                  <p style="font-size:10px">${review.date}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;

      FavoriteButtonInitiator.init({
        favoriteButton: this.restaurant.querySelector('#addFav'),
        restaurant: {
          id,
          name,
          pictureId,
          city,
          rating,
        },
      });
    } catch (error) {
      this.shadow.removeChild(this.restaurant);

      const errorHandler = document.createElement('div');

      if (error.message === 'Offline') {
        errorHandler.innerHTML = offlineTemplate();
      } else if (error.message === 'Empty') {
        errorHandler.innerHTML = noDataTemplate();
      } else {
        errorHandler.innerHTML = errorTemplate(error);
      }

      this.shadow.appendChild(errorHandler);
    }
  }

  getStyle() {
    return `
      @import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css);

      .restaurant {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .restaurant > * > .restaurant-card {
        display: flex;
        flex-direction: column;
        text-align: justify;
        padding: 20px;
        background-color: #ffffff;
      }
      
      .restaurant > * > .restaurant-card > * {
        margin: 10px 0 0;
      }

      .restaurant > .restaurant-info > .restaurant-card > .restaurant-identity {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 40px;
        text-align: left;
      }

      .restaurant > .restaurant-info > .restaurant-card > * > .add-favorite {
        align-self: center;
      }

      .restaurant > .restaurant-review > .restaurant-card > .restaurant-score {
        text-align: center;
        margin: 25px 0 15px;
        font-size: 32px;
      }

      .restaurant > .restaurant-review > .restaurant-card > .restaurant-comments > .restaurant-comment {
        border-bottom : 1px solid;
        border-color: #dcdcdc;
        margin: 10px 0 10px;
      }

      .restaurant > .restaurant-review > .restaurant-card > .restaurant-comments > .restaurant-comment > * {
        margin: 5px;
      }

      .restaurant > .restaurant-img > img {
        width: 100%;
        height: auto;
        margin-top: -10px;
      }

      @media screen and (min-width: 630px) {
        .restaurant {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-areas: 
            "info info"
            "img img"
            "desc menu"
            "review review";
          grid-gap: 20px;
          padding: 30px;        
        }

        .restaurant > .restaurant-info { 
          grid-area: info; 
        } 
        
        .restaurant > .restaurant-img { 
          grid-area: img; 
        } 
        
        .restaurant > .restaurant-description { 
          grid-area: desc;
        } 
        
        .restaurant > .restaurant-menu { 
          grid-area: menu; 
        } 
        
        .restaurant > .restaurant-review { 
          grid-area: review; 
        }
        
        .restaurant > .restaurant-img > img {
          margin-top: 0;
          border-radius: 10px;
        }

        @media screen and (min-width: 1270px) {
          .restaurant {
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: auto 1fr auto;
            grid-template-areas: 
            "info img img"
            "desc img img"
            "menu review review";
            padding: 100px;
          }

          .restaurant > .restaurant-img > img {
            object-fit: contain;
            width: 100%;
            height: 100%;
          }

          .restaurant > .restaurant-review > .restaurant-card > .restaurant-comments {
            max-height: 350px;
            overflow: auto;
          }
        }
      }
    `;
  }
}

customElements.define('restaurant-info', RestaurantInfo);

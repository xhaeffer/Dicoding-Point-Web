import { gsap } from 'gsap';

import restaurantApi from '../../data/restaurant-api';
import FavoriteRestaurant from '../../data/db-api';
import API_ENDPOINT from '../../globals/api-endpoint';
import { errorTemplate, offlineTemplate, noDataTemplate } from './items';

class RestaurantsList extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = this.getStyle();
    this.shadow.appendChild(style);

    this.restaurants = document.createElement('div');
    this.restaurants.className = 'restaurants';
    this.render();
    this.shadow.appendChild(this.restaurants);
  }

  async getRestaurantsList(dataSource) {
    try {
      if (dataSource === 'favorite') {
        const favorite = await FavoriteRestaurant.getFavorites();
        return favorite;
      }

      const { restaurants } = await restaurantApi.getRestaurants();
      return restaurants;
    } catch (error) {
      return error;
    }
  }

  async render() {
    try {
      const dataSource = this.getAttribute('data-source');
      const restaurantsList = await this.getRestaurantsList(dataSource);

      if (restaurantsList === undefined) {
        throw new Error('Offline');
      }

      if (Object.keys(restaurantsList).length === 0) {
        throw new Error('Empty');
      }

      if (restaurantsList.error) {
        throw new Error(restaurantsList.message);
      }

      restaurantsList.forEach((restaurant) => {
        const {
          id,
          name,
          city,
          rating,
          pictureId,
          img = API_ENDPOINT.GET_RESTAURANT_IMG(pictureId),
        } = restaurant;

        const restaurantItem = `
          <div class="restaurant-item" id="restaurant-${id}" tabindex="0">
            <img src="${img}" alt="${name}">
              <div class="restaurant-info">
                <h2>${name}</h2>
                <p>${city}</p>        
              </div>
              <br>
              <p>⭐️ ${rating}</p>
          </div>
        `;

        this.restaurants.innerHTML += restaurantItem;
        this.getEventListeners();
      });
    } catch (error) {
      this.shadow.removeChild(this.restaurants);

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
      .restaurants {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        gap: 40px;
      }
      
      .restaurants > .restaurant-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-height: 400px;
        padding-bottom: 10px;
        border-radius: 15px;
        cursor: pointer;
        overflow: hidden;
        background-color: #ffffff;
      }
      
      .restaurants > .restaurant-item > img {
        width: 100%;
        max-height: 140px;
        border-radius: 15px 15px 0 0;
        object-fit: cover;
      }
      
      .restaurants > .restaurant-item > .restaurant-info {
        padding: 0 30px 10px;
        text-align: center;
        border-bottom: 1px solid;
        border-color: #dcdcdc;
        line-height: 1;
      }
      
      .restaurants > .restaurant-item > .restaurant-info > h2 {
        font-size: 22px;
      }
      
      .restaurants > .restaurant-item > .restaurant-info > p {
        font-size: 18px;
      }

      @media screen and (min-width: 630px) {
        .restaurants {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }
      
        @media screen and (min-width: 1024px) {
          .restaurants {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      }
    `;
  }

  getEventListeners() {
    const restaurantItems = this.restaurants.querySelectorAll('.restaurant-item');
    restaurantItems.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, { scale: 1.1, duration: 0.3 });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, { scale: 1, duration: 0.3 });
      });

      item.addEventListener('click', () => {
        const restaurantId = item.id.split('-')[1];
        window.location.href = `/#/detail/${restaurantId}`;
      });

      item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          const restaurantId = item.id.split('-')[1];
          window.location.href = `/#/detail/${restaurantId}`;
          event.preventDefault();
        }
      });
    });
  }
}

customElements.define('restaurants-list', RestaurantsList);

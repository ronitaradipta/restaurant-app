/* eslint-disable no-alert */
import FavouriteRestaurantIdb from '../../data/favourite-restaurant-idb';
import RestaurantSource from '../../data/restaurant-source';
import UrlParser from '../../routes/url-parser';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import {
  createRestaurantDetailTemplate,
  failedLoad,
  spinnerLoading,
} from '../templates/template-creator';

const RestaurantDetails = {
  async render() {
    return `
      <div class="container">
        <h2>Restaurant Details</h2>
        <div id="detail"></div>
        <div id="spinner-container"></div>
        <div id="likeButtonContainer"></div>
        <div class="form-review">
          <h3>Create Review</h3>
          <form id="review-form">
            <div class="input-container">
              <label for="name" class="form-label">Name</label>
              <input name="name" type="text" class="form-control" id="name" required>
            </div>
            <div class="input-container">
              <label for="review" class="form-label">Review</label>
              <textarea name="review" cols="10" rows="6" class="form-control" id="review" required></textarea>
            </div>
            <button id="submit-button" type="submit">Send</button>
          </form>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const detailContainer = document.querySelector('#detail');
    const spinnerContainer = document.querySelector('#spinner-container');

    spinnerContainer.innerHTML = spinnerLoading();
    try {
      const restaurant = await RestaurantSource.restaurantDetails(url.id);

      detailContainer.innerHTML += createRestaurantDetailTemplate(restaurant);

      spinnerContainer.style.display = 'none';

      LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        favouriteRestaurants: FavouriteRestaurantIdb,
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          description: restaurant.description,
          pictureId: restaurant.pictureId,
          city: restaurant.city,
          rating: restaurant.rating,
        },
      });

      const reviewForm = document.querySelector('#review-form');

      reviewForm.addEventListener('submit', async (e) => {
        try {
          e.preventDefault();

          const data = {
            id: url.id,
            name: reviewForm.name.value,
            review: reviewForm.review.value,
          };

          await RestaurantSource.addReviewRestaurant(data);

          reviewForm.name.value = '';
          reviewForm.review.value = '';
          alert('reviews added successfully');
          window.location.reload();
        } catch (error) {
          console.log(error);
          alert(
            'failed to add review. please try again or check your connection'
          );
        }
      });
    } catch (error) {
      console.log(error);
      spinnerContainer.style.display = 'none';
      detailContainer.innerHTML = failedLoad();
    }
  },
};

export default RestaurantDetails;

import CONFIG from '../../globals/config';
import getRatingStar from '../../utils/get-ratings';

const createRestaurantCardTemplate = (restaurant) => `
<div class="card-item" tabindex="0">
  <a href="#/detail/${restaurant.id}">
    <div class="image-container" tabindex="0">
      <img src=${CONFIG.BASE_IMAGE_URL}/small/${restaurant.pictureId} alt="${
  restaurant.name
}" />
    </div>
    <div class="card-content">
      <span aria-label="rating restoran ${restaurant.name}">
        ${getRatingStar(restaurant.rating)} ${restaurant.rating}
      </span>
      <span class="city">${restaurant.city}</span>
      <h3>${restaurant.name}</h3>
      <p>
        ${restaurant.description}
      </p>
    </div>
  </a>
</div>`;

const createRestaurantDetailTemplate = (restaurant) => `
<div id="detail">
<div class="main-detail">
  <div class="image-container">
  <img src=${CONFIG.BASE_IMAGE_URL}/medium/${restaurant.pictureId} alt="${
  restaurant.name
}"/>  
  </div>

<div class="menu">
<h3>Menu</h3>
<div class="menu-container">
<div class="menu-food">
  <h4><i class="fa-solid fa-utensils"></i>Food</h4>
  <ul>
      ${restaurant.menus.foods
        .map(
          (food) =>
            `<li><i class="fa-solid fa-check"></i><p>${food.name}</p></li>`
        )
        .join('')}
  </ul>
</div>
<div class="menu-drink">
  <h4><i class="fa-solid fa-mug-saucer"></i>Drink</h4>
  <ul>
      ${restaurant.menus.drinks
        .map(
          (drink) =>
            `<li><i class="fa-solid fa-check"></i><p>${drink.name}</p></li>`
        )
        .join('')}
  </ul>
</div>
</div>
</div>
 
<ul class="detail-container">
  <li>
    <p class="restaurant-title">${restaurant.name}</p>
  </li>
  <li>
    
    <p class="restaurant-rating">${getRatingStar(restaurant.rating)} ${
  restaurant.rating
}</p>
  </li>
  <li>
    <i class="fa-solid fa-map-location-dot"></i>
    <p class="restaurant-address">${restaurant.address}, ${restaurant.city}</p>
  </li>
  <hr/>
  <li>
    <p class="restaurant-details">${restaurant.description}</p>
  </li>
  <li class="restaurant-category">
    <i class="fa-solid fa-tag"></i>
    ${restaurant.categories
      .map((category) => `<span class="category">${category.name}</span>`)
      .join(',')}
  </li>
</ul>



<div class="review">
<h3>Reviews</h3>
  ${restaurant.customerReviews
    .map(
      (review) => `<div class="review-item">
    <div class="review-head"><p class="review-name">${review.name}</p><p class="review-date">${review.date}</p></div>
    <div class="review-body">
      <p>${review.review}</p>
    </div>
  </div>`
    )
    .join('')}
</div>
</div>

</div>
 `;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const spinnerLoading = () => `
  <div id="spinner"></div>
`;

const failedLoad = () => `
  <div id="failed-load">
    <p>We're unable to display the data at this time. Please try again later or check your internet connection.</p>
  </div>
`;

export {
  createRestaurantCardTemplate,
  createRestaurantDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
  spinnerLoading,
  failedLoad,
};

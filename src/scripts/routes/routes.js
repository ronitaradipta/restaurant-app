import RestaurantList from '../views/pages/restaurant-list';
import RestaurantDetails from '../views/pages/restaurant-details';
import Favourites from '../views/pages/favourites';

const routes = {
  '/': RestaurantList,
  '/home': RestaurantList,
  '/favourites': Favourites,
  '/detail/:id': RestaurantDetails,
};

export default routes;

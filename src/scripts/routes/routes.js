import ExploreUs from '../views/pages/explore-us';
import Favorite from '../views/pages/favorite';
import Detail from '../views/pages/detail';

const routes = {
  '/': ExploreUs,
  '/explore-us': ExploreUs,
  '/favorite': Favorite,
  '/detail/:id': Detail,
};

export default routes;

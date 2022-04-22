import React from 'react';
import { Switch, Route, withRouter } from 'react-router';

import RestaurantList from './list/RestaurantList';
import RestaurantNew from './new/RestaurantNew';
import RestaurantEdit from './edit/RestaurantEdit';
import MenusList from './menu/MenusList';
class Restaurants extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/app/restaurants" exact component={RestaurantList} />
        <Route path="/app/restaurants/new" exact component={RestaurantNew} />
        <Route path="/app/restaurants/edit/:id" exact component={RestaurantEdit} />
        <Route path="/app/restaurants/menu/:id" exact component={MenusList} />
      </Switch>
    );
  }
}

export default withRouter(Restaurants);

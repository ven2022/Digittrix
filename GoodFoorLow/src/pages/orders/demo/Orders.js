import React from 'react';
import { Switch, Route, withRouter } from 'react-router';

import OrderList from './list/OrderList';
import OrderEdit from './edit/OrderEdit';

class Orders extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/app/orders" exact component={OrderList} />
        <Route path="/app/orders/edit/:id" exact component={OrderEdit} />
      </Switch>
    );
  }
}

export default withRouter(Orders);

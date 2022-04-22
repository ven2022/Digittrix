import React from 'react';
import { Switch, Route, withRouter } from 'react-router';
import NotificationsNew from './NotificationsNew';
import restaurant from './RestaurantNotification';
import customer from './CustomerNotification';
class Notifications extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/app/notifications/NotificationsNew/:id" exact component={NotificationsNew} />
        <Route path="/app/notifications/restaurant/" exact component={restaurant} />
        <Route path="/app/notifications/customer/" exact component={customer} />
      </Switch>
    );
  }
}

export default withRouter(Notifications);

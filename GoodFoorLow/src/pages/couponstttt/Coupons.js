import React from 'react';
import { Switch, Route, withRouter } from 'react-router';

import CouponList from './list/CouponList';
import CouponNew from './new/CouponNew';
import CouponEdit from './edit/CouponEdit';

class Coupons extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/app/coupons" exact component={CouponList} />
        <Route path="/app/coupons/new" exact component={CouponNew} />
        <Route path="/app/coupons/edit/:id" exact component={CouponEdit} />
      </Switch>
    );
  }
}

export default withRouter(Coupons);

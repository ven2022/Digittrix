import React from 'react';
import { Switch, Route, withRouter,} from 'react-router';

import CommissionList from './list/CommissionList';
import CommissionNew from './new/CommissionNew';
import CommissionEdit from './edit/CommissionEdit';
import { createBrowserHistory } from "history";
class Commissions extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/app/commissions" exact component={CommissionList} />
        <Route path="/app/commissions/new" exact component={CommissionNew} />
        <Route path="/app/commissions/edit/:id" exact component={CommissionEdit} />
      </Switch>
    );
  }
}

export default withRouter(Commissions);

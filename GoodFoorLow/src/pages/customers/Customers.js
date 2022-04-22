import React from 'react';
import { Switch, Route, withRouter } from 'react-router';

import CustomerList from './list/CustomerList';
import CustomerNew from './new/CustomerNew';
import CustomerEdit from './edit/CustomerEdit';

class Customers extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/app/customers" exact component={CustomerList} />
        <Route path="/app/customers/new" exact component={CustomerNew} />
        <Route path="/app/customers/edit/:id" exact component={CustomerEdit} />
      </Switch>
    );
  }
}

export default withRouter(Customers);

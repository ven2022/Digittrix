import React from 'react';
import { Switch, Route, withRouter } from 'react-router';
import StoreList from './list/StoreList';
import StoreNew from './new/StoreNew';
import StoreEdit from './edit/StoreEdit';

class Store extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/app/store" exact component={StoreList} />
        <Route path="/app/store/new" exact component={StoreNew} />
        <Route path="/app/store/edit/:id" exact component={StoreEdit} />
      </Switch>
    );
  }
}

export default withRouter(Store);

import React from 'react';
import { Switch, Route, withRouter } from 'react-router';

import CategoryList from './list/CategoryList';
import CategoryNew from './new/CategoryNew';
import CategoryEdit from './edit/CategoryEdit';

class Category extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/app/category" exact component={CategoryList} />
        <Route path="/app/category/new" exact component={CategoryNew} />
        <Route path="/app/category/edit/:id" exact component={CategoryEdit} />
      </Switch>
    );
  }
}

export default withRouter(Category);

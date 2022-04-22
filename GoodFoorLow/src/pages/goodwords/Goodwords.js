import React from 'react';
import { Switch, Route, withRouter } from 'react-router';

import GoodwordsList from './list/GoodwordsList';
import GoodwordsNew from './new/GoodwordsNew';
import GoodwordsEdit from './edit/GoodwordsEdit';

class Goodwords extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/app/goodwords" exact component={GoodwordsList} />
        <Route path="/app/goodwords/new" exact component={GoodwordsNew} />
        <Route path="/app/goodwords/edit/:id" exact component={GoodwordsEdit} />
      </Switch>
    );
  }
}

export default withRouter(Goodwords);

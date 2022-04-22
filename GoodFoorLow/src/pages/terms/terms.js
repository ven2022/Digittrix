import React from 'react';
import { Switch, Route, withRouter } from 'react-router';
import terms from './list/terms';
class Terms extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/app/terms" exact component={terms} />
      </Switch>
    );
  }
}
export default withRouter(Terms);

import React from 'react';
import { Switch, Route, withRouter } from 'react-router';
import Messages from './list/messages';
class messages extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/app/messages" exact component={Messages} />
      </Switch>
    );
  }
}
export default withRouter(messages);

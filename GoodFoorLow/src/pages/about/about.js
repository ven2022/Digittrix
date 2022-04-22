import React from 'react';
import { Switch, Route, withRouter } from 'react-router';
import aboutus from './list/aboutus';
class about extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/app/about" exact component={aboutus} />
      </Switch>
    );
  }
}
export default withRouter(about);

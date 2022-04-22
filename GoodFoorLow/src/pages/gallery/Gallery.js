import React from 'react';
import { Switch, Route, withRouter } from 'react-router';

import GalleryList from './list/GalleryList';
import GalleryNew from './new/GalleryNew';
import GalleryEdit from './edit/GalleryEdit';

class Gallery extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/app/gallery" exact component={GalleryList} />
        <Route path="/app/gallery/new" exact component={GalleryNew} />
        <Route path="/app/gallery/edit/:id" exact component={GalleryEdit} />
      </Switch>
    );
  }
}

export default withRouter(Gallery);

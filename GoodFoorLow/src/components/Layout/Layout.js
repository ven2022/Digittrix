import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import {Box, IconButton, Link} from '@material-ui/core'
import Icon from '@mdi/react'

//icons
import {
  mdiFacebook as FacebookIcon,
  mdiTwitter as TwitterIcon,
  mdiGithub as GithubIcon,
} from '@mdi/js'

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Customers from "../../pages/customers";
import Coupons from "../../pages/coupons";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";
import Restaurants from "../../pages/restaurants";
import Commissions from "../../pages/commissions";
import Category from "../../pages/category";
import Store from "../../pages/store";
import Orders from "../../pages/orders";
import about from "../../pages/about";
import terms from "../../pages/terms";
import notifications from "../../pages/notifications";
import Goodwords from "../../pages/goodwords";
import Messages from "../../pages/messages";
// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/typography" component={Typography} />
              <Route path="/app/category" component={Category} />
              <Route path="/app/orders" component={Orders} />
              <Route path="/app/restaurants" component={Restaurants} />
              <Route path="/app/store" component={Store} />
              <Route path="/app/customers" component={Customers} />
              <Route path="/app/coupons" component={Coupons} />
              {/* <Route path="/app/gallery" component={Gallery} /> */}
              <Route path="/app/goodwords" component={Goodwords}/>
              <Route path="/app/messages" component={Messages}/>
              {/* <Route path="/app/ideal" component={Ideal} />*/}
              <Route path="/app/about" component={about} />
              {/* <Route path="/app/contact" component={contact} />
              <Route path="/app/privacy" component={privacy} /> */}
              <Route path="/app/terms" component={terms} />
               {/*<Route path="/app/commissions" component={Commissions} /> */}
              <Route path="/app/notifications" component={Notifications} />
              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
              <Route path="/app/ui/maps" component={Maps} />
              <Route path="/app/ui/icons" component={Icons} />
              <Route path="/app/ui/charts" component={Charts} />
            </Switch>
            <Box
              mt={5}
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent="space-between"
            >
              <div>
               {/*<Link
                  color={'primary'}
                  href='#'
                  target={'_blank'}
                  className={classes.link}
                >
                  Flatlogic
                </Link>
                <Link
                  color={'primary'}
                  href='#'
                  target={'_blank'}
                  className={classes.link}
                >
                  About Us
                </Link>
                <Link
                  color={'primary'}
                  href='#'
                  target={'_blank'}
                  className={classes.link}
                >
                  Blog
                </Link>
              </div>
              <div>
                <Link
                  href={'https://www.facebook.com'}
                  target={'_blank'}
                >
                  <IconButton aria-label="facebook">
                    <Icon
                      path={FacebookIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
                <Link
                  href={'https://twitter.com'}
                  target={'_blank'}
                >
                  <IconButton aria-label="twitter">
                    <Icon
                      path={TwitterIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
                <Link
                  href={'https://github.com'}
                  target={'_blank'}
                >
                  <IconButton
                    aria-label="github"
                    style={{marginRight: -12}}
                  >
                    <Icon
                      path={GithubIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
              */}
              </div>
            </Box>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);

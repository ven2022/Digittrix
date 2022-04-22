import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  Hotel as HotelIcon,
  SupervisorAccount as SupervisorAccount,
  Note as Note,
  RestaurantMenu as RestaurantMenu,
  ListAlt as ListAlt,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
//import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const structure = [
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  { id: 1, label: "Category",link: "/app/category",icon: <RestaurantMenu />},
  { id: 2, label: "Orders", link: "/app/orders", icon: <ListAlt /> },
  { id: 3, label: "Store Category", link: "/app/store", icon: <HotelIcon /> },
  { id: 3, label: "Restaurant", link: "/app/restaurants", icon: <HotelIcon /> },
  { id: 4, label: "Customers",link: "/app/customers",icon: <SupervisorAccount />},
  { id: 5, label: "Coupons", link: "/app/coupons", icon: <Note /> },
  { id: 6, label: "Good Words", link: "/app/goodwords", icon: <Note /> },
  { id: 7, label: "Contact Messages", link: "/app/messages", icon: <Note /> },
  {id: 8,label: "Push Notification",link: "/app/notifications",icon: <Note />,children: [{ label: "Restaurant", link: "/app/notifications/restaurant" },{ label: "Customers", link: "/app/notifications/customer" }]},
  {id: 9,label: "Pages",link: "/app/pages",icon: <Note />,children: [{ label: "About us", link: "/app/about" },{ label: "T&C", link: "/app/terms" }]},
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);

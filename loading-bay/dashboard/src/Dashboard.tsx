import React from 'react';
import OverviewPage from './overview/OverviewPage';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ImageIcon from '@material-ui/icons/Image';
import CloudIcon from '@material-ui/icons/Cloud';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToApp from '@material-ui/icons/ExitToApp';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  WithStyles,
  createStyles,
  Theme,
  CircularProgress,
  Tooltip
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import HelpIcon from '@material-ui/icons/Help';
import { Config, EntitySchema, CoreContext } from '@refract-cms/core';
import Graphql from './graphql/Graphql';
import { ApolloProvider } from 'react-apollo';
import { createApolloClient } from './graphql/create-apollo-client';
import EntityList from './entities/EntityList';
import { Router, Link } from '@reach/router';
import { setBaseRoute } from './router/state/router.actions';
import { AppState } from './state/app.state';
import { connect, Provider } from 'react-redux';
import { combineContainers } from 'combine-containers';
import { configure } from './config/state/config.actions';
import { store } from './state/root.store';
import { provide } from './state/provide';
import EditEntity from './entities/EditEntity';
import Auth from './auth/Auth';
import { logout } from './auth/state/auth.actions';
import Notifications from './notifications/Notifications';
// import { FileService } from '@refract-cms/core';
import { createLinkComponent } from './shared/create-link-component';
import axios from 'axios';
import { authService } from './auth/auth.service';

const drawerWidth = 240;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    toolbar: {
      paddingRight: 24 // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      // marginLeft: drawerWidth,
      // width: `calc(100% - ${drawerWidth}px)`,
      // transition: theme.transitions.create(['width', 'margin'], {
      //   easing: theme.transitions.easing.sharp,
      //   duration: theme.transitions.duration.enteringScreen
      // })
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36
    },
    menuButtonHidden: {
      display: 'none'
    },
    title: {
      flexGrow: 1
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
      background: theme.palette.background.default
    },
    chartContainer: {
      marginLeft: -22
    },
    tableContainer: {
      height: 320
    },
    h5: {
      marginBottom: theme.spacing(2)
    }
  });

interface Props
  extends DashboardProps,
    WithStyles<typeof styles>,
    MapDispatchToProps,
    ReturnType<typeof mapStateToProps> {}

export interface DashboardProps {
  config: Config;
  serverUrl: string;
  rootPath: string;
  homePageUrl?: string;
}

class Dashboard extends React.Component<Props> {
  state = {
    open: true
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    const { config, serverUrl, rootPath, configure, setBaseRoute } = this.props;
    setBaseRoute(rootPath);
    configure(config, serverUrl);
  }

  render() {
    const { classes, config, serverUrl, routes, isLoggedIn, logout, homePageUrl } = this.props;
    if (!routes) {
      return <CircularProgress />;
    }
    return (
      <CoreContext.Provider
        value={{
          serverUrl,
          getPluginAxios: pluginAlias => {
            const client = axios.create({
              baseURL: `${serverUrl}/plugins/${pluginAlias}`,
              headers: {
                Authorization: 'Bearer ' + authService.getAccessToken()
              }
            });
            return client;
          }
          // fileService: new FileService(serverUrl)
        }}
      >
        <ApolloProvider client={createApolloClient({ serverUrl })}>
          <Notifications />
          <CssBaseline />

          {!isLoggedIn ? (
            <Router>
              <Auth default path="/" />
            </Router>
          ) : (
            <div className={classes.root}>
              <AppBar
                position="absolute"
                className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
              >
                <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                  <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.handleDrawerOpen}
                    className={classNames(classes.menuButton, this.state.open && classes.menuButtonHidden)}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                    Content Dashboard
                  </Typography>
                  {/* <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
                  {homePageUrl && (
                    <Tooltip title="Go to home page" color="secondary">
                      <IconButton href={homePageUrl} color="inherit">
                        <HomeIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Toolbar>
              </AppBar>
              <Drawer
                variant="permanent"
                classes={{
                  paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)
                }}
                open={this.state.open}
              >
                <div className={classes.toolbarIcon}>
                  <IconButton onClick={this.handleDrawerClose}>
                    <ChevronLeftIcon />
                  </IconButton>
                </div>
                <Divider />
                <List>
                  <ListItem button component={createLinkComponent(routes.root.createUrl())}>
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Overview" />
                  </ListItem>
                  <ListItem button component={createLinkComponent(routes.graphql.createUrl())}>
                    <ListItemIcon>
                      <CloudIcon />
                    </ListItemIcon>
                    <ListItemText primary="GraphQL playground" />
                  </ListItem>
                </List>
                <Divider />
                <List>
                  {config.schema.map(schema => {
                    return (
                      <ListItem
                        key={schema.options.alias}
                        button
                        component={createLinkComponent(routes.entity.list.createUrl(schema))}
                      >
                        {schema.options.icon && (
                          <ListItemIcon>
                            <schema.options.icon />
                          </ListItemIcon>
                        )}
                        <ListItemText primary={schema.options.displayName || schema.options.alias} />
                      </ListItem>
                    );
                  })}
                </List>
                <Divider />
                <List>
                  <ListItem button onClick={logout}>
                    <ListItemIcon>
                      <ExitToApp />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </List>
              </Drawer>
              <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Router>
                  <OverviewPage path={routes.root.path} />
                  <Graphql path={routes.graphql.path} serverUrl={serverUrl} />
                  <EntityList path={routes.entity.list.path} />
                  <EditEntity path={routes.entity.edit.path} />
                </Router>
              </main>
            </div>
          )}
        </ApolloProvider>
      </CoreContext.Provider>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    entities: state.config.schema,
    routes: state.router.routes,
    isLoggedIn: Boolean(state.auth.activeUserToken)
  };
}

const mapDispatchToProps = {
  setBaseRoute,
  configure,
  logout
};

type MapDispatchToProps = typeof mapDispatchToProps;

export default provide(store)(
  combineContainers(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    withStyles(styles)
  )(Dashboard)
) as React.ComponentType<DashboardProps>;

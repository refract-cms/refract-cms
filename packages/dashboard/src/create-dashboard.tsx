import React from 'react';
import Dashboard, { DashboardProps } from './Dashboard';
import { RouteComponentProps as ReactRouterRouteComponentProps } from 'react-router-dom';
import { RouteComponentProps as ReachRouterRouteComponentProps } from '@reach/router';
import { Omit } from '@material-ui/core';

export interface ReachOrReactRouterProps
  extends Partial<Pick<ReachRouterRouteComponentProps, 'path'>>,
    Partial<Pick<ReactRouterRouteComponentProps, 'match'>> {}

export const createDashboard = (dashboardProps: Omit<DashboardProps, 'rootPath'>) => (
  props: ReachOrReactRouterProps
) => <Dashboard rootPath={getBaseRoute(props)} {...dashboardProps} />;

function getBaseRoute(props: ReachOrReactRouterProps) {
  const { path, match } = props;
  if (path) {
    return path;
  } else if (match) {
    return match.path;
  } else {
    return '/';
  }
}

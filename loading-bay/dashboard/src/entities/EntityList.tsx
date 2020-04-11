import React, { Component } from 'react';
import { Query, withApollo } from 'react-apollo';
import {
  LinearProgress,
  List,
  Button,
  ListSubheader,
  IconButton,
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Table,
  TableBody,
  TableRow,
  TablePagination,
  Badge,
  Tooltip
} from '@material-ui/core';
import { Entity, graphqlQueryHelper, EntityListItem, PropertyOptions } from '@refract-cms/core';
import { RouteComponentProps, Link } from '@reach/router';
import { connect } from 'react-redux';
import { AppState } from '../state/app.state';
import { combineContainers } from 'combine-containers';
import Page from '../pages/Page';
import Sort from '@material-ui/icons/Sort';
import Filter from '@material-ui/icons/FilterList';
import Refresh from '@material-ui/icons/Refresh';
import EntityListSortDialog from './EntityListSortDialog';
import EntityListFilterDialog from './entity-list-filters/EntityListFilterDialog';
import { createLinkComponent } from '../shared/create-link-component';
import * as EntityActions from './state/entity.actions';
import { buildEntityListQueryOptions } from './state/build-entity-list-query-options';

export interface EntitiesListProps extends RouteComponentProps<{ alias: string }> {}

interface Props
  extends EntitiesListProps,
    ReturnType<typeof mapStateToProps>,
    DispatchProps,
    WithStyles<typeof styles> {}

interface State {
  sortDialogOpen: boolean;
  filterDialogOpen: boolean;
  count: number | undefined;
  lastFetchAlias?: string;
}

const styles = (theme: Theme) =>
  createStyles({
    textLink: {
      cursor: 'pointer',
      color: theme.palette.secondary.main,
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  });

class EntitiesList extends Component<Props, State> {
  state: State = {
    sortDialogOpen: false,
    filterDialogOpen: false,
    count: undefined
  };

  render() {
    const { routes, entitySchema, classes, entityItemState, setPage } = this.props;
    const { query, variables } = buildEntityListQueryOptions(entityItemState);
    return (
      <div>
        <Query
          query={query}
          variables={variables}
          displayName={`${entitySchema.options.alias}_list`}
          notifyOnNetworkStatusChange
          fetchPolicy="cache-and-network"
          onCompleted={data => {
            const count = !data.loading && data ? data.count : undefined;
            const lastFetchAlias = entitySchema.options.alias;
            if (count !== this.state.count) {
              this.setState({ count, lastFetchAlias });
            }
          }}
        >
          {({ loading, data, refetch, variables }) => {
            const items = data.items || [];
            if (loading && this.state.lastFetchAlias !== entitySchema.options.alias) {
              return <LinearProgress />;
            }
            return (
              <Page
                title={entitySchema.options.displayName || entitySchema.options.alias}
                actionComponents={
                  !entitySchema.options.maxOne
                    ? [
                        <IconButton disabled={loading} onClick={() => refetch(variables)}>
                          <Refresh />
                        </IconButton>,
                        <IconButton onClick={() => this.setState({ sortDialogOpen: true })}>
                          <Tooltip title="Sort">
                            <Badge variant="dot" badgeContent={entityItemState.orderByField ? 1 : 0} color="secondary">
                              <Sort />
                            </Badge>
                          </Tooltip>
                        </IconButton>,
                        <IconButton onClick={() => this.setState({ filterDialogOpen: true })}>
                          <Tooltip title="Filters">
                            <Badge badgeContent={entityItemState.filters.length} color="secondary">
                              <Filter />
                            </Badge>
                          </Tooltip>
                        </IconButton>,
                        <Button
                          variant="contained"
                          color="primary"
                          component={createLinkComponent(
                            routes.entity.edit.createUrl({ id: 'new', schema: entitySchema })
                          )}
                        >
                          Add new
                        </Button>
                      ]
                    : undefined
                }
              >
                {!entitySchema.options.maxOne ? (
                  <div>
                    <List
                      subheader={
                        entityItemState && entityItemState.orderByField && entityItemState.orderByDirection ? (
                          <ListSubheader
                            className={classes.textLink}
                            onClick={() => this.setState({ sortDialogOpen: true })}
                          >
                            Sorted by{' '}
                            {
                              (entitySchema.properties[entityItemState.orderByField] as PropertyOptions<any, any>)
                                .displayName
                            }
                            , {entityItemState.orderByDirection}
                          </ListSubheader>
                        ) : (
                          undefined
                        )
                      }
                    >
                      {items.map((item: Entity) => {
                        return (
                          <EntityListItem
                            key={item._id}
                            component={createLinkComponent(
                              routes.entity.edit.createUrl({ id: item._id, schema: entitySchema })
                            )}
                            button
                            entity={item}
                            schema={entitySchema}
                          />
                        );
                      })}
                    </List>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TablePagination
                            page={entityItemState.currentPage}
                            count={data.count}
                            onChangePage={(e, page) => {
                              setPage({
                                alias: entitySchema.options.alias,
                                page
                              });
                            }}
                            rowsPerPage={10}
                          />
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      component={props => (
                        <Link
                          to={
                            items.length === 0
                              ? routes.entity.edit.createUrl({ id: 'new', schema: entitySchema })
                              : routes.entity.edit.createUrl({ id: items[0]._id, schema: entitySchema })
                          }
                          {...props}
                        />
                      )}
                    >
                      Edit {entitySchema.options.displayName || entitySchema.options.alias}
                    </Button>
                  </div>
                )}
              </Page>
            );
          }}
        </Query>
        <EntityListSortDialog
          schema={entitySchema}
          open={this.state.sortDialogOpen}
          onClose={() => this.setState({ sortDialogOpen: false })}
          setOpened={opened => this.setState({ sortDialogOpen: opened })}
        />
        <EntityListFilterDialog
          schema={entitySchema}
          open={this.state.filterDialogOpen}
          onClose={() => this.setState({ filterDialogOpen: false })}
          setOpened={opened => this.setState({ filterDialogOpen: opened })}
          count={this.state.count}
        />
      </div>
    );
  }
}

const mapDispatchToProps = { ...EntityActions };

type DispatchProps = typeof mapDispatchToProps;

function mapStateToProps(state: AppState, ownProps: EntitiesListProps) {
  const entitySchema = state.config.schema.find(s => s.options.alias === ownProps.alias)!;
  const entityItemState = state.entity[entitySchema.options.alias];
  return {
    schema: state.config.schema,
    routes: state.router.routes!,
    entitySchema,
    entityItemState
  };
}

export default combineContainers(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withApollo,
  withStyles(styles)
)(EntitiesList);

import React, { Component, Fragment } from 'react';
import {
  EntitySchema,
  graphqlQueryHelper,
  Entity,
  withCoreContext,
  WithCoreContextProps,
  RenderEditor,
} from '@refract-cms/core';
import { navigate } from '@reach/router';
import {
  Button,
  LinearProgress,
  Typography,
  WithStyles,
  withStyles,
  createStyles,
  Theme,
  Toolbar,
  AppBar,
  Grid,
  IconButton,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { combineContainers } from 'combine-containers';
import type { AppState } from '../state/app-state';
import { Routes } from '../router/routes';
import { RouteComponentProps } from '@reach/router';
import { WithApolloClient, withApollo } from 'react-apollo';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import Page from '../pages/Page';
import { addNotification } from '../notifications/state/notification-actions';
import Delete from '@material-ui/icons/Delete';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { buildEntityListQueryOptions } from './state/build-entity-list-query-options';

interface State {
  updateValues: any;
  loading: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
    card: {
      margin: theme.spacing(),
    },
    propertyEditor: {
      marginBottom: theme.spacing(4),
    },
    root: {
      paddingBottom: 70,
    },
  });

interface Props
  extends EntityFormProps,
    WithStyles<typeof styles>,
    ReturnType<typeof mapStateToProps>,
    WithApolloClient<EntityFormProps>,
    MapDispatchToProps,
    WithCoreContextProps {}

class EntityForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const updateValues: any = {};
    if (props.newEntity) {
      Object.keys(props.schema.properties).forEach((propertyKey) => {
        const propertyOptions = props.schema.properties[propertyKey];
        updateValues[propertyKey] = propertyOptions.defaultValue;
      });
      this.state = {
        updateValues,
        loading: false,
      };
    } else {
      this.state = {
        updateValues,
        loading: true,
      };
    }

    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.back = this.back.bind(this);
  }

  componentDidMount() {
    const { schema, id, newEntity, client } = this.props;
    if (!newEntity) {
      client
        .query<{ item: Entity }>({
          query: graphqlQueryHelper.getByIdQueryWithAllFields(schema, id!),
        })
        .then(({ data, errors }) => {
          if (!errors) {
            this.setState({
              loading: false,
              updateValues: data.item,
            });
          }
        });
    }
  }

  render() {
    const { schema, classes, context } = this.props;
    return this.state.loading ? (
      <LinearProgress />
    ) : (
      <div className={classes.root}>
        <Page
          title={schema.options.displayName || schema.options.alias}
          actionComponents={[
            <IconButton key="back" onClick={this.back}>
              <ArrowBack />
            </IconButton>,
            <IconButton key="delete" onClick={this.delete}>
              <Delete />
            </IconButton>,
            <Button key="save" color="primary" variant="contained" onClick={this.save}>
              Save
            </Button>,
          ]}
        >
          <Grid justify="center" container>
            <Grid item xs={12} sm={12} md={10} lg={8} xl={7}>
              <div className={classes.card}>
                {Object.keys(schema.properties).map((propertyKey: string, index: number) => {
                  const propertyOptions = schema.properties[propertyKey];
                  return (
                    <div key={index} className={classes.propertyEditor}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                          <Typography variant="subtitle1" gutterBottom>
                            {propertyOptions.displayName || propertyKey}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                          <RenderEditor
                            source={this.state.updateValues}
                            serverUrl={context.serverUrl}
                            setValue={(value) => {
                              this.setState({
                                updateValues: {
                                  ...this.state.updateValues,
                                  [propertyKey]: value,
                                },
                              });
                            }}
                            value={this.state.updateValues[propertyKey]}
                            propertyKey={propertyKey}
                            propertyOptions={propertyOptions}
                          />
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </div>
            </Grid>
          </Grid>
        </Page>
      </div>
    );
  }

  save() {
    const { schema } = this.props;
    this.setState({ loading: true }, () => {
      this.props
        .saveEntity(this.state.updateValues)
        .then(() => {
          this.back();
          this.props.addNotification(`Successfully saved ${schema.options.displayName || schema.options.alias}.`);
        })
        .catch(() => {
          this.setState({ loading: false });
        });
    });
  }

  delete() {
    if (window.confirm('Are you sure you want to delete?')) {
      const { client, schema, entityItemState, id } = this.props;
      const refetchQueryOptions = buildEntityListQueryOptions(entityItemState);
      this.setState({ loading: true }, () => {
        client
          .mutate({
            refetchQueries: [refetchQueryOptions],
            mutation: gql(`
      mutation {
        ${this.props.alias}RemoveById(id: "${this.props.id!}")
      }`),
          })
          .then(() => {
            this.back();
            this.props.addNotification(`Successfully deleted ${schema.options.displayName || schema.options.alias}.`);
          })
          .catch(() => {
            this.setState({ loading: false });
          });
      });
    }
  }

  back() {
    navigate(this.props.routes.entity.list.createUrl(this.props.schema));
  }
}

export interface EntityFormProps {
  newEntity?: boolean;
  alias: string;
  saveEntity: (item: any) => Promise<void>;
  id?: string;
}

function mapStateToProps(state: AppState, ownProps: EntityFormProps) {
  const entitySchema = state.config.schema.find((s) => s.options.alias === ownProps.alias)!;
  const entityItemState = state.entity[entitySchema.options.alias];
  return {
    routes: state.router.routes!,
    schema: entitySchema,
    entityItemState,
  };
}

const mapDispatchToProps = {
  addNotification,
};

type MapDispatchToProps = typeof mapDispatchToProps;

export default combineContainers(
  withApollo,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withCoreContext
)(EntityForm) as React.ComponentType<EntityFormProps>;

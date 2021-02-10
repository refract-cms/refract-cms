import React from 'react';
import type { RouteComponentProps } from '@reach/router';
import gql from 'graphql-tag';
import { Mutation, WithApolloClient, withApollo } from 'react-apollo';
import EntityForm from './EntityForm';
import { graphqlQueryHelper } from '@refract-cms/core';
import { combineContainers } from 'combine-containers';
import { connect } from 'react-redux';
import type { AppState } from '../state/app-state';
import { graphql } from 'graphql';
import type ApolloClient from 'apollo-client';
import { buildEntityListQueryOptions } from './state/build-entity-list-query-options';

export interface EditEntityProps extends RouteComponentProps<{ alias: string; id: string | 'new' }> {}

export interface Props extends EditEntityProps, WithApolloClient<any>, ReturnType<typeof mapStateToProps> {
  client: ApolloClient<any>;
}

const EditEntity = ({ alias, id, client, schema, entityItemState }: Props) => {
  const refetchQueryOptions = buildEntityListQueryOptions(entityItemState);
  const createMutation = gql(
    `
  mutation save($record: ${schema.options.alias}Input!){
    update: ${alias}Create(record: $record) {
      _id
      ${graphqlQueryHelper.buildPropertiesFromSchema(schema)}
    }
  }
  `
  );
  const updateMutation = gql(
    `
  mutation save($record: ${schema.options.alias}Input!){
    update: ${alias}Update(record: $record) {
      _id
      ${graphqlQueryHelper.buildPropertiesFromSchema(schema)}
    }
  }
  `
  );
  const newEntity = !id || id === 'new';
  const mutation = newEntity ? createMutation : updateMutation;
  return (
    <Mutation mutation={mutation} refetchQueries={[refetchQueryOptions]}>
      {(save, mutationResult) => {
        return (
          <EntityForm
            alias={alias!}
            newEntity={newEntity}
            id={id}
            saveEntity={(record) => {
              const recordWithNullInsteadOfUndefined = Object.keys(record).reduce((acc, recordKey) => {
                acc[recordKey] = record[recordKey] === undefined ? null : record[recordKey];
                return acc;
              }, {});
              // delete recordWithNullInsteadOfUndefined['__typename'];
              return new Promise((resolve, reject) => {
                save({
                  variables: {
                    record: recordWithNullInsteadOfUndefined,
                  },
                  update: (proxy, updateResult) => {
                    const responseObject = updateResult.data.update;
                    client.cache.writeData({
                      id: responseObject._id,
                      data: responseObject,
                    });
                    resolve();
                  },
                });
              });
            }}
          />
        );
      }}
    </Mutation>
  );
};

function mapStateToProps(state: AppState, ownProps: EditEntityProps) {
  const entitySchema = state.config.schema.find((s) => s.options.alias === ownProps.alias)!;
  const entityItemState = state.entity[entitySchema.options.alias];
  return {
    routes: state.router.routes!,
    schema: entitySchema,
    entityItemState,
  };
}

export default combineContainers(
  connect(mapStateToProps),
  withApollo
)(EditEntity) as React.ComponentType<EditEntityProps>;

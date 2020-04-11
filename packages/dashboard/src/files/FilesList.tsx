// import React, { Component } from 'react';
// import gql from 'graphql-tag';
// import { Query, withApollo, WithApolloClient } from 'react-apollo';
// import {
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemAvatar,
//   Avatar,
//   ListItemSecondaryAction,
//   IconButton
// } from '@material-ui/core';
// import { RouteComponentProps, Link } from '@reach/router';
// import { graphqlQueryHelper } from '@refract-cms/core';
// import { connect } from 'react-redux';
// import { AppState } from '../state/app-state';
// import { combineContainers } from 'combine-containers';
// import { Delete } from '@material-ui/icons';
// import { addNotification } from '../notifications/state/notification-actions';

// export interface FilesListProps extends RouteComponentProps<{ alias: string }> {}

// interface Props extends FilesListProps, ReturnType<typeof mapStateToProps>, WithApolloClient<{}>, MapDispatchToProps {}

// class FilesList extends Component<Props> {
//   render() {
//     const { routes } = this.props;
//     const query = gql`
//       {
//         files: getFiles {
//           _id
//           url
//         }
//       }
//     `;
//     return (
//       <Query query={query}>
//         {({ loading, error, data }) => {
//           return (
//             <div>
//               {loading && <CircularProgress />}
//               {!loading && (
//                 <List>
//                   {data.files.map(file => (
//                     <ListItem key={file._id}>
//                       <ListItemAvatar>
//                         <Avatar src={file.url} />
//                       </ListItemAvatar>
//                       <ListItemText primary={file._id} secondary={file.url} />
//                       <ListItemSecondaryAction>
//                         <IconButton onClick={this.handleDelete(file._id)}>
//                           <Delete />
//                         </IconButton>
//                       </ListItemSecondaryAction>
//                     </ListItem>
//                   ))}
//                 </List>
//               )}
//             </div>
//           );
//         }}
//       </Query>
//     );
//   }

//   handleDelete = (id: string) => () => {
//     if (window.confirm('Are you sure you want to delete?')) {
//       const { client, addNotification } = this.props;
//       client
//         .mutate({
//           mutation: gql(`
//       mutation {
//         fileDelete(id: "${id}")
//       }`)
//         })
//         .then(() => {
//           client.resetStore();
//           addNotification('Successfully deleted file.');
//         });
//     }
//   };
// }

// function mapStateToProps(state: AppState) {
//   return {
//     routes: state.router.routes!
//   };
// }

// const mapDispatchToProps = {
//   addNotification
// };

// type MapDispatchToProps = typeof mapDispatchToProps;

// export default combineContainers(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   ),
//   withApollo
// )(FilesList);

// import React from 'react';
// import { LinearProgress, IconButton, Button, CircularProgress, Typography } from '@material-ui/core';
// import * as Icons from '@material-ui/icons';
// import createUniqueString from 'unique-string';
// import { withApollo, WithApolloClient } from 'react-apollo';
// import { connect } from 'react-redux';
// import { combineContainers } from 'combine-containers';
// import { addNotification } from '../notifications/state/notification.actions';

// interface State {
//   file?: File;
//   uploading: boolean;
// }

// interface ImageUploaderProps {
//   onUploaded?: () => void;
// }

// interface Props extends ImageUploaderProps, WithApolloClient<{}>, MapDispatchToProps {}

// class ImageUploader extends React.Component<Props, State> {
//   state: State = {
//     uploading: false
//   };

//   constructor(props) {
//     super(props);
//     this.upload = this.upload.bind(this);
//   }

//   render() {
//     const { file, uploading } = this.state;
//     return (
//       <div>
//         {!uploading && !file ? (
//           <div>
//             <input hidden onChange={this.handleImageChange} accept="image/*" id="icon-button-file" type="file" />
//             <label htmlFor="icon-button-file">
//               <Button color="primary" component="span">
//                 Select File to upload
//               </Button>
//             </label>
//           </div>
//         ) : null}
//         {file && !this.state.uploading ? (
//           <div>
//             <Typography gutterBottom>File selected.</Typography>
//             <Button color="primary" variant="contained" onClick={this.upload}>
//               Upload
//             </Button>
//           </div>
//         ) : (
//           <React.Fragment />
//         )}
//         {uploading && <CircularProgress />}
//       </div>
//     );
//   }

//   handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e && e.target && e.target.files) {
//       const file = e.target.files[0];
//       e.target.value = '';
//       this.setState({
//         file
//       });
//     }
//   };

//   upload() {
//     const { file } = this.state;
//     if (file) {
//       const uniqueString = createUniqueString();
//       const filename = `${uniqueString}_${file.name}`;
//       this.setState({
//         uploading: true
//       });
//       fileService.upload(file, filename).then(() => {
//         this.setState({ uploading: false });
//         this.props.client.resetStore();
//         this.props.addNotification('Successfully uploaded file.');
//         if (this.props.onUploaded) {
//           this.props.onUploaded();
//         }
//         this.setState({
//           file: undefined
//         });
//       });
//     }
//   }
// }

// const mapDispatchToProps = {
//   addNotification
// };

// type MapDispatchToProps = typeof mapDispatchToProps;

// export default combineContainers(
//   withApollo,
//   connect(
//     null,
//     mapDispatchToProps
//   )
// )(ImageUploader) as React.ComponentType<ImageUploaderProps>;

import React from 'react';
import { LinearProgress, IconButton, Button, CircularProgress, Typography } from '@material-ui/core';
import type { withApollo, WithApolloClient } from 'react-apollo';
import { connect } from 'react-redux';
import { combineContainers } from 'combine-containers';
import type { FileRef } from './file-ref';
import { withCoreContext, WithCoreContextProps } from '@refract-cms/core';

interface State {
  file?: File;
  uploading: boolean;
}

interface ImageUploaderProps {
  onUploaded?: (fileRef: FileRef) => void;
}

interface Props extends ImageUploaderProps, WithApolloClient<{}>, MapDispatchToProps, WithCoreContextProps {}

class ImageUploader extends React.Component<Props, State> {
  state: State = {
    uploading: false,
  };

  constructor(props) {
    super(props);
    this.upload = this.upload.bind(this);
  }

  render() {
    const { file, uploading } = this.state;
    return (
      <div>
        {!uploading && !file ? (
          <div>
            <input onChange={this.handleImageChange} accept="image/*" id="icon-button-file" type="file" />
            {/* <label htmlFor="icon-button-file">
              <Button color="primary">Select File to upload</Button>
            </label> */}
          </div>
        ) : null}
        {file && !this.state.uploading ? (
          <div>
            <Typography gutterBottom>File selected.</Typography>
            <Button color="primary" variant="contained" onClick={this.upload}>
              Upload
            </Button>
          </div>
        ) : (
          <React.Fragment />
        )}
        {uploading && <CircularProgress />}
      </div>
    );
  }

  handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.target && e.target.files) {
      const file = e.target.files[0];
      e.target.value = '';
      this.setState({
        file,
      });
    }
  };

  upload() {
    const { file } = this.state;
    if (file) {
      this.setState({
        uploading: true,
      });
      const data = new FormData();
      data.append('file', file);
      const httpClient = this.props.context.getPluginAxios('fileSystemImage');
      httpClient
        .post(`/files`, data)
        .then((r) => r.data)
        .then((multerFile) => {
          this.setState({ uploading: false });
          // this.props.client.resetStore();
          // this.props.addNotification('Successfully uploaded file.');
          if (this.props.onUploaded) {
            this.props.onUploaded({
              path: multerFile.path,
              fileName: multerFile.originalname,
              mimetype: multerFile.mimetype,
              size: multerFile.size,
            });
          }
          this.setState({
            file: undefined,
          });
        });
    }
  }
}

const mapDispatchToProps = {
  // addNotification
};

type MapDispatchToProps = typeof mapDispatchToProps;

export default combineContainers(
  connect(null, mapDispatchToProps),
  withCoreContext
)(ImageUploader) as React.ComponentType<ImageUploaderProps>;

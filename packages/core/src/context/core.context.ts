import React from 'react';
// import { FileService } from '../files/file.service';
import { CoreContextModel } from './core-context.model';

export const CoreContext = React.createContext<CoreContextModel>({
  serverUrl: '',
  getPluginAxios: null
  // fileService: new FileService('')
});

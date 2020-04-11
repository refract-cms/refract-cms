import { PluginConfig } from '../plugins/plugin-config';
import { AxiosInstance } from 'axios';

// import { FileService } from "../files/file.service";

export interface CoreContextModel {
  serverUrl: string;
  getPluginAxios: (pluginAlias: string) => AxiosInstance;
  // fileService: FileService;
}

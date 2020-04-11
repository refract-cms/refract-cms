import React from "react";
import { PluginConfig } from "../plugins/plugin-config";
import { AxiosInstance } from "axios";

export interface CoreContextModel {
  serverUrl: string;
  getPluginAxios: (pluginAlias: string) => AxiosInstance;
  // fileService: FileService;
}

export const CoreContext = React.createContext<CoreContextModel>({
  serverUrl: "",
  getPluginAxios: null,
  // fileService: new FileService('')
});

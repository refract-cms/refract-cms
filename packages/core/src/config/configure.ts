import { Config } from './config';
import mergeWith from 'lodash/mergeWith';
import isArray from 'lodash/isArray';
import { PluginConfig } from '../plugins/plugin-config';

function customizer(objValue, srcValue) {
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

const defaultExtensionConfig: PluginConfig = {
  schema: [],
};

export const configure = (config: Config, plugins: PluginConfig[]) => {
  return mergeWith(config, defaultExtensionConfig, ...plugins, customizer);
};

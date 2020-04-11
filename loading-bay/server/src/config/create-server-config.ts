import mergeWith from 'lodash/mergeWith';
import isArray from 'lodash/isArray';
import { ServerOptionsArgs } from './server-options-args.model';
import { ServerConfig } from './server-config.model';

function customizer(objValue, srcValue) {
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

// const defaultExtensionConfig: ServerOptionsArgs = {

// };

export const configureServerConfig = (config: ServerConfig, ...extensions: ServerOptionsArgs[]) => {
  return mergeWith(config, ...extensions, customizer);
};

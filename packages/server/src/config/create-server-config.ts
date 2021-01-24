import mergeWith from 'lodash/mergeWith';
import isArray from 'lodash/isArray';
import type { ServerOptionsArgs } from './server-options-args';
import type { ServerConfig } from './server-config';

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

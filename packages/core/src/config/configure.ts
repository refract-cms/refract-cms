// import type { Config } from './config';
// import mergeWith from 'lodash/mergeWith';
// import isArray from 'lodash/isArray';
// import type { PluginConfig } from '../plugins/plugin-config';

// function customizer(objValue, srcValue) {
//   if (isArray(objValue)) {
//     return objValue.concat(srcValue);
//   }
// }

// const defaultExtensionConfig: PluginConfig = {
//   schema: [],
// };

// export const configure = (config: Config, ...extensions: PluginConfig[]) => {
//   return mergeWith(config, defaultExtensionConfig, ...extensions, customizer);
// };

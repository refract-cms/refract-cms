import type { Config } from '../config/config';

export interface PluginConfig extends Pick<Config, 'schema'> {
  name?: string;
}

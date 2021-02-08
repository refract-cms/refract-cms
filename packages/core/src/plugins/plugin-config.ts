import type { UserConfig } from '../config/user-config';

export interface PluginConfig extends Pick<UserConfig, 'schema'> {
  name?: string;
}

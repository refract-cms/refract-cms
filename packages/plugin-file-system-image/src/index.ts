import type { PluginConfig } from '@refract-cms/core';
import { FileSystemImageSchema } from './file-system-image-schema';
export { FileService } from './file-service';

export const fileSystemImagePluginConfig: PluginConfig = {
  name: 'fileSystemImage',
  schema: [FileSystemImageSchema],
};

export { FileSystemImageSchema } from './file-system-image-schema';

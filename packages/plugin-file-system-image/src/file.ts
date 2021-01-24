import type { Entity } from '@refract-cms/core';
import type { FileRef } from './file-ref';

export interface FileModel extends Entity {
  fileRef: FileRef;
}

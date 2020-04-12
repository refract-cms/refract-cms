import { Entity } from '@refract-cms/core';
import { FileRef } from './file-ref';

export interface FileModel extends Entity {
  fileRef: FileRef;
}

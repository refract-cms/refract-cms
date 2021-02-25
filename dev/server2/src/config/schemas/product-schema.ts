import { composeSchema, createTextEditor } from '@refract-cms/core';
import ZoomInIcon from '@material-ui/icons/ZoomIn';

export const ProductSchema = composeSchema({
  options: {
    alias: 'product',
    displayName: 'Product',
    icon: ZoomInIcon,
  },
  properties: {
    name: {
      type: String,
      editorComponent: createTextEditor(),
    },
  },
});

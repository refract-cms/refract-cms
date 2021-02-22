---
id: create-schema
title: Create schema
---

## Create a schema

Create a `ts` file inside directory: `config/schemas`, e.g. `product-schema.ts`

```tsx
import { composeSchema, createTextEditor, createBooleanEditor } from '@refract-cms/core';

export const ProductSchema = composeSchema({
  options: {
    alias: 'product',
    displayName: 'Product',
    instanceDisplayProps: (product) => ({
      primaryText: product.title,
    }),
  },
  properties: {
    title: {
      type: String,
      displayName: 'Title',
      editorComponent: createTextEditor(),
    },
    active: {
      type: Boolean,
      displayName: 'Active',
      editorComponent: createBooleanEditor(),
    },
  },
});
```

## Add new schema to config

Edit file `config/index.ts`

```tsx
import { buildConfig } from '@refract-cms/core';
import { ProductSchema } from './schemas/product-schema';

export const config = buildConfig({
  schema: [
    ProductSchema,
    // The rest of your schemas
  ],
});
```

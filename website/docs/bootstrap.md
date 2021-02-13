---
id: bootstrap
title: Bootstrap
slug: /
---

```bash
npx @refract-cms/create --dir myapp
```

## Develop locally

```bash
cd ./myapp
docker-compose up -d
npm start
```

## Create a schema

Create a `ts` file inside directory: `./src/config/schemas`, e.g. `product-schema.ts`

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

Edit file `./src/config/index.ts`

```tsx
import { buildConfig } from '@refract-cms/core';
import { ProductSchema } from './schemas/product-schema';

export const config = buildConfig({
  schema: [
    ProductSchema,
    // The rest of the schemas
  ],
});
```

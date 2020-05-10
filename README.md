[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![code style: prettier](https://camo.githubusercontent.com/92e9f7b1209bab9e3e9cd8cdf62f072a624da461/68747470733a2f2f666c61742e62616467656e2e6e65742f62616467652f4275696c74253230576974682f547970655363726970742f626c7565)](https://github.com/microsoft/TypeScript) ![CI](https://github.com/refract-cms/refract-cms/workflows/CI/badge.svg)

## What is Refract-CMS?

Refract-CMS is an open source, code first, self-hosted headless CMS using React, Express & MongoDB.

## How is it different from other CMS's?

Unlike most other CMS systems, the schema is defined in JavaScript/TypeScript, and we do not force developers to use elaborate GUI's.

Developers can live entirely in their chosen code editor, while content editors can utilize a blazing fast React based single-page-app, to manage content.

This approach has some advantages:

- It allows teams to properly code-review schema changes using their current git workflows.
- Your schema's can be copy/pasted between projects, or distributed using your organizations private NPM registry etc.
- Your schema can be deployed to multiple environments without requiring you to do duplicate work in a GUI or database imports, You just deploy the code and start editing.
- Clean database, Refract-CMS only creates one mongo collection per schema, as it doesn't have to store schema information in there.

## GraphQL

The CMS exposes a GraphQL endpoint, with rich filtering that you can use to query data for your frontend apps.

## Customization

Property editors for each property on the entity model are added to the schema in code, allowing you to choose between some of the in-built editors (TextBox, Select, Image) or to write your own using React.

## Docs

View the docs: <https://refract-cms.com/docs>

## Hosting

You are responsible for:

- Serving an express app using the Refract-CMS express middleware.
- React editor dashboard.

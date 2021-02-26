import React from 'react';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

export interface HtmlProps {
  title: string;
}

export function Html(props: HtmlProps) {
  return (
    <html lang="">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet="utf-8" />
        <title>{props.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
        {process.env.NODE_ENV === 'production'
          ? `<script src="${assets.client.js}" defer></script>`
          : `<script src="${assets.client.js}" defer crossorigin></script>`}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>
  );
}

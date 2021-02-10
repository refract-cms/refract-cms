require('@babel/register')({
  cache: false,
  extensions: ['.ts', '.tsx'],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
});

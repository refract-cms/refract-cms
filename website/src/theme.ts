import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3647ac',
    },
  },
  typography: {
    fontFamily: 'var(--ifm-font-size-base)/var(--ifm-line-height-base) var(--ifm-font-family-base)',
  },
});

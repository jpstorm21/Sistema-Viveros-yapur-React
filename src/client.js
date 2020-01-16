import React from 'react';
import ReactDom from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { primaryColor, secondaryColor } from './styles';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes/routes';
import { basename } from './routes/routes.json';

// Define theme color palette for all the pages.
const theme = createMuiTheme({
  fontFamily: 'Source Sans Pro Light',
  palette: {
    primary: primaryColor,
    secondary: secondaryColor
  },
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiCard: {
      root: {
        overflow: 'initial',
      },
    },
    MuiCardActions: {
      root: {
        padding: '8px 12px 8px 16px',
      },
      disableActionSpacing: {
        padding: '8px 16px',
      },
    },
  }
});

ReactDom.render(
  (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter basename={`${basename}/`}>
        { renderRoutes(routes) }
      </BrowserRouter>
    </MuiThemeProvider>
  ),
  document.getElementById('app')
);
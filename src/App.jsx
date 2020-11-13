import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Landing from './pages/Landing';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#278B8D',
      main: '#173D36',
      dark: '#278B8D',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

require('./App.css');

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Route path="/" exact component={Landing} />
      </Router>
    </ThemeProvider>
  );
}

export default App;

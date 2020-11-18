import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Landing from './pages/Landing';
import Registration from './pages/Registration';
import MainPage from './pages/MainPage';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#fff',
      main: '#173D36',
      dark: '#2C989B',
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
        <Switch>
          <Route path="/login" exact component={Landing} />
          <Route path="/register" component={Registration} />
          <Route path="/" component={MainPage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;

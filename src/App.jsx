import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import Landing from './pages/Landing';
import Registration from './pages/Registration';
import MainPage from './pages/MainPage';
import ProtectedRoute from './components/ProtectedRoute';

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

export default function App() {
  useEffect(() => {
    document.title = 'Lasell#';
  });
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Router>
          <Switch>
            <Route path="/login" exact component={Landing} />
            <ProtectedRoute path="/register" component={Registration} />
            <ProtectedRoute path="/" component={MainPage} />
          </Switch>
        </Router>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

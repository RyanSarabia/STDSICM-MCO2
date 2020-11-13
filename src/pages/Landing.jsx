import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

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

export default function Landing() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid
            item
            direction="column"
            alignItems="center"
            justify="center"
            style={{ textAlign: 'center' }}
          >
            <h1 style={{ margin: 0, fontSize: 90, color: '#173D36' }}> LaSell++ </h1>
            <h5 style={{ margin: 0 }}>
              Made by Lasallians, for Lasallians. Sell and bid within the Lasallian community.
            </h5>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" className={{ textTransform: 'uppercase' }}>
              Sign In
            </Button>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

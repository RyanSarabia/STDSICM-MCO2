import React from 'react';
import GoogleLogin from 'react-google-login';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const responseGoogle = (response) => {
  console.log('hellooo ddd');
  console.log(response);
  console.log(response.profileObj);
};

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
            <GoogleLogin
              clientId="498581729039-9633ego9k719cs5a2rq44s6dgcrmi2rb.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  variant="contained"
                  color="primary"
                  className={{ textTransform: 'uppercase' }}
                >
                  Sign In With Google
                </Button>
              )}
              buttonText="Sign-in"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

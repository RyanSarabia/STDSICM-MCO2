import React from 'react';
// import GoogleLogin from 'react-google-login';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
// import axios from 'axios';

// const responseGoogle = (response) => {
//   axios.get('http://localhost:5000/auth/google', response.profileObj);
// };

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
          <h1 style={{ margin: 0, fontSize: 90, color: '#173D36' }}> LaSell++ </h1>
          <h5 style={{ margin: 0 }}>
            Made by Lasallians, for Lasallians. Sell and bid within the Lasallian community.
          </h5>
        </Grid>
        <Grid item>
          <a href="http://localhost:5000/auth/google">
            <Button
              variant="contained"
              color="primary"
              className={{ textTransform: 'uppercase' }}
            >
              Sign In With Google
            </Button>
          </a>
        </Grid>
      </Grid>
    </Container>
  );
}

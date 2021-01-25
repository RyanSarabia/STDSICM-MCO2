import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import axios from 'axios';

export default function Landing() {
  // useEffect(() => {
  //   const query = queryString.parse(props.location.search);
  //   if (query.token) {
  //     window.localStorage.setItem('jwt', query.token);
  //     props.history.push('/');
  //   }
  // });
  const login = () => {
    console.log('reached');
    axios.get('/api/auth/google');
  };

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
          <Button
            variant="contained"
            color="primary"
            className={{ textTransform: 'uppercase' }}
            onClick={login}
          >
            Sign In With Google
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

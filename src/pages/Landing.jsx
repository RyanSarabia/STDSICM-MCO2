import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

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
          <h1 style={{ margin: 0, fontSize: 90, color: 'black' }}> LaSell++ </h1>
          <h5 style={{ margin: 0 }}>
            Made by Lasallians, for Lasallians. Sell and bid within the Lasallian community.
          </h5>
        </Grid>
        <Grid item>
          <Button href="/register" variant="contained" color="primary" className={{ textTransform: 'lowercase' }}>
            Sign In
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

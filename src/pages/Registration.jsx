import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import RegistrationForm from '../components/RegistrationForm';

export default function Registration() {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      style={{ marginTop: '200px' }}
    >
      <h3> Hi, Juan Cruz! Complete your details to finish sign-up. </h3>
      <Grid
        item
      >
        <Paper
          style={{ padding: '20px' }}
        >
          <RegistrationForm />
          <p style={{ fontSize: '8px' }}> You may still edit these later. </p>
        </Paper>
      </Grid>
    </Grid>
  );
}

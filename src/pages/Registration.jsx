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
      style={{ marginTop: '20vh' }}
    >
      <h3> Hi, Juan Cruz! Complete your details to finish sign-up. </h3>
      <Paper
        style={{ padding: '20px', minWidth: '35vh' }}
      >
        <RegistrationForm />
        <p style={{ fontSize: '8px' }}> You may still edit these later. </p>
      </Paper>
    </Grid>
  );
}

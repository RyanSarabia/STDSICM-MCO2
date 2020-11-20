import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CreateForm from './CreateForm';

export default function Create() {
  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Grid item xs={12} style={{ marginTop: '15vh' }}>
        <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '2vh' }}>
          Create Auction
        </Typography>
        <CreateForm />
      </Grid>
    </Grid>
  );
}

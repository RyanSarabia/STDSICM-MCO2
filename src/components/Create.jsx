import React from 'react';
import Grid from '@material-ui/core/Grid';
import CreateForm from './CreateForm';

export default function Create() {
  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Grid item xs={12}>
        <CreateForm />
      </Grid>
    </Grid>
  );
}

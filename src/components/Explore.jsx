import React from 'react';
import Grid from '@material-ui/core/Grid';
import ExploreCard from './ExploreCard';

export default function Explore() {
  return (
    <div>
      <p> Explore page </p>
      <Grid container direction="column" xs={12} alignItems="center">
        <Grid item>
          <ExploreCard />
        </Grid>
      </Grid>
    </div>
  );
}

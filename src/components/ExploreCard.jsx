/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default function ExploreCard({ auction }) {
  // const cutoff = new Date(auction.cutoff);

  return (
    <Container>
      <Paper elevation={5} style={{ height: '50vh', width: '50vw' }}>
        <Grid
          container
          justify="space-around"
          alignContent="space-between"
          style={{ padding: '4vh' }}
        >
          <Grid item container direction="column" xs={5} spacing={1}>
            <Grid item>
              <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                {auction.title}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="h7">{auction.description}</Typography>
            </Grid>

            <Grid item>
              <Chip label={auction.cutoffdate} />
            </Grid>
            <Grid item>
              <Button color="primary" variant="contained">
                View Details
              </Button>
            </Grid>
          </Grid>

          <Grid item container direction="column" xs={7} alignItems="center">
            <Grid item container justify="space-around">
              <Grid item container direction="column" xs={6} alignItems="center">
                <Grid item>
                  <Typography variant="h5"> Current</Typography>
                </Grid>
                <Grid item>
                  <Chip
                    label={new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'PHP',
                    }).format(auction.currentPrice)}
                  />
                </Grid>
              </Grid>
              <Grid item container direction="column" xs={6} alignItems="center">
                <Grid item>
                  <Typography variant="h5"> Steal </Typography>
                </Grid>
                <Grid item>
                  <Chip
                    label={new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'PHP',
                    }).format(auction.stealPrice)}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Card>
                <CardMedia
                  component="image"
                  style={{ height: 200, width: 200 }}
                  image={auction.photo}
                />
              </Card>
            </Grid>
            <Grid item>
              <Chip label={auction.postdate} size="small" variant="outlined" />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
// {
//   new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'PHP',
//   })
// }

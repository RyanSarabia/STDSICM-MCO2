import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default function ExploreCard() {
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
                Item Name
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="h7">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed repellat delectus nemo
                nisi architecto. Quis accusamus eveniet velit animi, officia odit earum doloribus,
                laboriosam sit adipisci, ab officiis nisi at!
              </Typography>
            </Grid>

            <Grid item>
              <Chip label="Tier" />
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
                  <Chip label="Php 5.00" />
                </Grid>
              </Grid>
              <Grid item container direction="column" xs={6} alignItems="center">
                <Grid item>
                  <Typography variant="h5"> Steal </Typography>
                </Grid>
                <Grid item>
                  <Chip label="Php 10.00" />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Card>
                <CardMedia
                  component="image"
                  style={{ height: 200, width: 200 }}
                  image="logo512.png"
                />
              </Card>
            </Grid>
            <Grid item>
              <Chip label="Post Date" size="small" variant="outlined" />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

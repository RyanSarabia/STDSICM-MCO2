/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ImagePopup from './ImagePopup';

function FormatDescription(props) {
  const { desc } = props;
  if (desc.length > 250) {
    const truncDesc = `${desc.substring(0, 250)}... `;
    return (
      <div>
        <Typography style={{ wordWrap: 'break-word', fontSize: '12px' }}>
          {truncDesc}
          <span>
            <a href="/" style={{ fontWeight: 'bold', color: 'green', textDecoration: 'none' }}>
              See More
            </a>
          </span>
        </Typography>
      </div>
    );
  }
  return <Typography style={{ wordWrap: 'break-word', fontSize: '12px' }}>{desc}</Typography>;
}

export default function ExploreCard({ auction }) {
  // const cutoff = new Date(auction.cutoff);

  const [isModalOpen, setModal] = useState(false);

  const handleImageClick = () => {
    setModal(true);
  };

  const handlePopupClose = () => {
    console.log('closing');
    setModal(false);
  };

  return (
    <Container>
      <Paper elevation={5} style={{ height: '50vh', width: '50vw' }}>
        <Grid
          container
          justify="space-around"
          alignContent="space-between"
          style={{ padding: '4vh' }}
        >
          <Grid
            item
            container
            direction="column"
            xs={5}
            spacing={1}
            style={{ wordWrap: 'break-word' }}
          >
            <Grid item style={{ fontWeight: 'bold', maxWidth: '100%' }}>
              <Typography variant="h5" style={{ fontWeight: 'bold', wordWrap: 'break-word' }}>
                {auction.title}
              </Typography>
            </Grid>

            <Grid item style={{ maxWidth: '100%' }}>
              <FormatDescription desc={auction.description} />
            </Grid>

            <Grid item style={{ maxWidth: '100%' }}>
              <Chip label={auction.cutoffdate} style={{ maxWidth: '100%' }} />
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
              <Card onClick={handleImageClick}>
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
      <ImagePopup
        open={isModalOpen}
        onClose={handlePopupClose}
        image={auction.photo}
        caption={auction.title}
      />
    </Container>
  );
}
// {
//   new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'PHP',
//   })
// }

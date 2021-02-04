/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ImagePopup from './ImagePopup';
// import Loading from './Loading';

function FormatDescription(props) {
  const { desc, _id } = props;
  if (desc.length > 250) {
    const truncDesc = `${desc.substring(0, 250)}... `;
    console.log(_id);
    const toAuction = `/auction/${_id}`;
    return (
      <div>
        <Typography
          style={{ wordWrap: 'break-word', fontSize: '12px' }}
          className="class-explore-card-desc"
        >
          {truncDesc}
          <span>
            <a
              href={toAuction}
              style={{ fontWeight: 'bold', color: 'green', textDecoration: 'none' }}
              className="class-explore-card-more"
            >
              See More
            </a>
          </span>
        </Typography>
      </div>
    );
  }
  return (
    <Typography
      style={{ wordWrap: 'break-word', fontSize: '12px' }}
      className="class-explore-card-desc"
    >
      {desc}
    </Typography>
  );
}

function BidPrice(props) {
  const { hasBid, startBid, curBid } = props;
  if (hasBid) {
    return (
      <Grid item container direction="column" xs={6} alignItems="center">
        <Grid item>
          <Typography variant="overline"> Current</Typography>
        </Grid>
        <Grid item>
          <Chip
            className="class-explore-card-bid"
            label={new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'PHP',
            }).format(curBid)}
          />
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid item container direction="column" xs={6} alignItems="center">
      <Grid item>
        <Typography variant="overline"> Starting</Typography>
      </Grid>
      <Grid item>
        <Chip
          className="class-explore-card-start"
          label={new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'PHP',
          }).format(startBid)}
        />
      </Grid>
    </Grid>
  );
}

export default function ExploreCard({ auction }) {
  // const cutoff = new Date(auction.cutoff);

  const [isModalOpen, setModal] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [hasBid, setHasBid] = useState(false);
  const toAuction = `/auction/${auction._id}`;

  useEffect(() => {
    if (auction.currentPrice >= auction.startPrice) {
      setHasBid(true);
    }
    setLoading(false);
  });

  const handleImageClick = () => {
    setModal(true);
  };

  const handlePopupClose = () => {
    console.log('closing');
    setModal(false);
  };

  /* eslint-disable */

  return (
    <Container>
      <Paper elevation={5} style={{ height: '55vh', width: '45vw' }}>
        {isLoading ? (
          <LinearProgress />
        ) : (
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
                  <a href={toAuction} style={{ textDecoration: 'none', color: 'black' }}>
                    <Typography
                      className="class-explore-card-title"
                      variant="h5"
                      style={{ fontWeight: 'bold', wordWrap: 'break-word' }}
                    >
                      {auction.title}
                    </Typography>
                  </a>
                </Grid>

                <Grid item style={{ maxWidth: '100%', marginTop: '5%', marginBottom: '5%' }}>
                  <FormatDescription desc={auction.description} _id={auction._id} />
                </Grid>

                <div>
                  <Typography variant="overline"> Cut-off </Typography>
                  <Grid item style={{ maxWidth: '100%' }}>
                    <Chip
                      className="class-explore-card-cutoffdate"
                      label={auction.cutoffdate}
                      style={{ maxWidth: '100%', marginBottom: "10%" }}
                    />
                  </Grid>
                </div>
                <Grid item>
                  <Button
                    className="class-explore-card-view"
                    color="primary"
                    variant="contained"
                    href={toAuction}
                  >
                    View Details
                </Button>
                </Grid>
              </Grid>

              <Grid item container direction="column" xs={7} alignItems="center" spacing="2">
                <Grid item container justify="flex-end">
                  <BidPrice
                    hasBid={hasBid}
                    curBid={auction.currentPrice}
                    startBid={auction.startPrice}
                  />
                  <Grid item container direction="column" xs={6} alignItems="center">
                    <Grid item style={{}}>
                      <Typography variant="overline"> Steal </Typography>
                    </Grid>
                    <Grid item>
                      <Chip
                        className="class-explore-card-steal"
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
                      style={{ height: 250, width: 250 }}
                      image={auction.photo}
                      className="class-explore-card-img"
                    />
                  </Card>
                </Grid>
                <Grid item style={{ marginLeft: "auto" }} >
                  <Chip
                    className="class-explore-card-postdate"
                    label={auction.postdate}
                    size="small"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
      </Paper>
      <ImagePopup
        open={isModalOpen}
        onClose={handlePopupClose}
        image={auction.photo}
        caption={auction.title}
      />
    </Container >
  );
  /* eslint-disable */
}
// {
//   new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'PHP',
//   })
// }

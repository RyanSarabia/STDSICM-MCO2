/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
// import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
// import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ImagePopup from './ImagePopup';
// import Loading from './Loading';

function FormatDescription(props) {
  const { desc, _id } = props;
  if (desc.length > 250) {
    const truncDesc = `${desc.substring(0, 250)}... `;
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
      <Grid item container direction="column" style={{ marginBottom: '3%' }}>
        <Typography item variant="overline" style={{ lineHeight: '160%' }}>
          Current
        </Typography>
        <Chip
          item
          variant="outlined"
          color="primary"
          style={{ width: '100%' }}
          className="class-explore-card-bid"
          label={new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'PHP',
          }).format(curBid)}
        />
      </Grid>
    );
  }
  return (
    <Grid item container direction="column" style={{ marginBottom: '3%' }}>
      <Typography item variant="overline" style={{ lineHeight: '160%' }}>
        Starting
      </Typography>
      <Chip
        item
        variant="outlined"
        color="primary"
        style={{ width: '100%' }}
        className="class-explore-card-start"
        label={new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'PHP',
        }).format(startBid)}
      />
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
    setModal(false);
  };

  /* eslint-disable */

  return (
    <Grid container justify="center" style={{ padding: '1%' }}>
      {isLoading ? (
        <Card
          item
          elevation={5}
          style={{
            height: '500px',
            width: '810px',
          }}
        >
          <LinearProgress />
        </Card>
      ) : (
          <Card
            item
            elevation={5}
            style={{
              position: 'relative',
              padding: 0,
              height: '500px',
              width: '810px',
              display: 'flex',
            }}
          >
            <Grid
              item
              container
              direction="column"
              justify="space-between"
              spacing={1}
              style={{
                padding: '5%',
                maxWidth: '320px',
                wordWrap: 'break-word',
              }}
            >
              <Grid item style={{ maxWidth: '100%', maxHeight: '50%', padding: 0 }}>
                <a
                  href={toAuction}
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                  }}
                >
                  <Typography
                    className="class-explore-card-title"
                    variant="h5"
                    style={{ fontWeight: 'bold' }}
                  >
                    {auction.title}
                  </Typography>
                </a>

                <FormatDescription desc={auction.description} _id={auction._id} />
              </Grid>

              <Grid
                item
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
                style={{ maxHeight: '50%', padding: 0 }}
              >
                <BidPrice
                  item
                  hasBid={hasBid}
                  curBid={auction.currentPrice}
                  startBid={auction.startPrice}
                />
                <Grid item container direction="column" style={{ marginBottom: '3%' }}>
                  <Typography item variant="overline" style={{ lineHeight: '160%' }}>
                    Steal
                </Typography>
                  <Chip
                    item
                    variant="outlined"
                    color="primary"
                    style={{ width: '100%' }}
                    className="class-explore-card-steal"
                    label={new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'PHP',
                    }).format(auction.stealPrice)}
                  />
                </Grid>

                <Grid item container direction="column">
                  <Typography item variant="overline" style={{ lineHeight: '160%' }}>
                    Cut-off
                </Typography>
                  <Chip
                    variant="outlined"
                    color="primary"
                    style={{ width: '100%' }}
                    className="class-explore-card-cutoffdate"
                    label={auction.cutoffdate}
                    style={{ maxWidth: '100%' }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <CardMedia
              onClick={handleImageClick}
              component="image"
              style={{ padding: 0, height: '100%', width: '500px' }}
              image={auction.photo}
              className="class-explore-card-img"
            />

            <Grid
              container
              direction="column"
              alignItems="flex-end"
              style={{ maxWidth: '20%', position: 'absolute', right: '10px', bottom: '20px' }}
            >
              <Button
                item
                className="class-explore-card-view"
                color="primary"
                variant="contained"
                href={toAuction}
              >
                View Details
            </Button>
              <Chip
                item
                style={{ marginTop: '5px', color: 'white', backgroundColor: '#1a1a1a' }}
                className="class-explore-card-postdate"
                label={auction.postdate}
                size="small"
              />
            </Grid>
          </Card>
        )}
      <ImagePopup
        open={isModalOpen}
        onClose={handlePopupClose}
        image={auction.photo}
        caption={auction.title}
      />
    </Grid>
  );
  /* eslint-disable */
}
// {
//   new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'PHP',
//   })
// }

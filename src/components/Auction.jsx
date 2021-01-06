import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
// import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import { useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { formatDate } from '../myFunctions';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  shape: {
    backgroundColor: 'green',
    width: '17px',
    height: '17px',
  },
  shapeCircle: {
    borderRadius: '50%',
  },
}));

export default function Auction() {
  const classes = useStyles();
  const circle = <div className={clsx(classes.shape, classes.shapeCircle)} />;
  const [auction, setAuction] = useState('');
  const auctionId = useParams().auction;

  console.log(auctionId);
  console.log(auction);

  useEffect(() => {
    axios.get(`/auction/getAuction/${auctionId}`).then((res) => {
      const tempdata = res.data;
      console.log(tempdata);

      tempdata.postdate = formatDate(tempdata.postdate);
      tempdata.cutoff = formatDate(tempdata.cutoff);

      setAuction(tempdata);
    });
  }, []);

  return (
    <Grid container="true" direction="row">
      <Card
        elevation={3}
        style={{
          maxWidth: '50%',
          minWidth: '50%',
          marginLeft: '3vw',
          marginTop: '3vw',
          marginBottom: '3vw',
          padding: '1vw',
          borderRadius: '1vw',
        }}
      >
        <Grid container="true">
          <Grid item container="true" justify="space-between">
            <Typography variant="h4">{auction.title}</Typography>
            <Grid
              item
              container="true"
              justify="flex-end"
              alignItems="center"
              style={{ width: '10vw' }}
            >
              {circle}
              <Typography style={{ margin: '5px' }}>Status</Typography>
            </Grid>
          </Grid>
          <Grid item container="true">
            <Chip label={auction.postdate} variant="outlined" />
          </Grid>
          <Grid item container="true" style={{ marginTop: '1vw', marginBottom: '1vw' }}>
            <Typography variant="h7">{auction.description}</Typography>
          </Grid>
          <Grid item direction="column" container="true">
            <Typography style={{ fontWeight: 'bold' }}>Cut-off</Typography>
            <Chip label={auction.postdate} variant="outlined" style={{ maxWidth: '160px' }} />
          </Grid>
          <Grid item container="true" justify="center">
            <CardMedia
              style={{
                width: '100%',
                height: '25vw',
                objectFit: 'scale-down',
                marginTop: '1vw',
                borderRadius: '10px',
              }}
              component="image"
              image={auction.imageurl}
            />
          </Grid>
        </Grid>
      </Card>
      <Card
        elevation={3}
        style={{
          maxWidth: '35%',
          minWidth: '35%',
          maxHeight: '16  vw',
          margin: '3vw',
          padding: '1vw',
          borderRadius: '1vw',
        }}
      >
        <Grid
          container="true"
          direction="column"
          justify="space-arpund"
          style={{ padding: '2vw', height: '100%' }}
        >
          <Grid item container="true" justify="space-around">
            <Typography>
              Starting Bid:
              {auction.startPrice}
            </Typography>
            <Typography>
              Current Bid:
              {auction.currentPrice}
            </Typography>
          </Grid>
          <Grid item container="true" justify="space-around" style={{ marginTop: '1vw' }}>
            <Typography>
              Highest Bidder:
              {auction.highestBidder}
            </Typography>
          </Grid>
          <Grid
            item
            container="true"
            direction="row"
            justify="center"
            alignItems="center"
            style={{ marginTop: '1vw' }}
          >
            <TextField
              type="number"
              variant="outlined"
              min={parseInt(auction.currentPrice + auction.increment, 10)}
              max={parseInt(auction.stealPrice - auction.increment, 10)}
              step={parseInt(auction.increment, 10)}
              defaultValue={parseInt(auction.currentPrice + auction.increment, 10)}
              key={`${Math.floor(Math.random() * 1000)}-min`}
              onKeyDown={(event) => {
                event.preventDefault();
              }}
              style={{ width: '5vw', height: '100%', borderRadius: '0.5vw' }}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ width: '5vw', marginLeft: '1vw', borderRadius: '0.5vw' }}
            >
              Bid
            </Button>
          </Grid>
          <Grid item container="true" justify="center" style={{ marginTop: '1vw' }}>
            <input
              type="number"
              value={parseInt(auction.stealPrice, 10)}
              style={{ width: '5vw', borderRadius: '0.5vw' }}
              readOnly
            />
            <Button
              variant="contained"
              color="primary"
              style={{ width: '5vw', marginLeft: '1vw', borderRadius: '0.5vw' }}
            >
              Steal
            </Button>
          </Grid>
        </Grid>
      </Card>
      <script type="text/javascript" src="../myfunctions.js" />
    </Grid>
  );
}

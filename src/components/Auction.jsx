/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
// import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
// import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
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
  const [bidAmount, setBidAmount] = useState(0);
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
      setBidAmount(parseInt(tempdata.currentPrice, 10) + parseInt(tempdata.increment, 10));
    });
  }, []);

  function HandleIncrement() {
    const bid = parseInt(bidAmount, 10);
    const inc = parseInt(auction.increment, 10);
    if (bid + inc < auction.stealPrice) setBidAmount(bid + inc);
  }

  function HandleDecrement() {
    const bid = parseInt(bidAmount, 10);
    const inc = parseInt(auction.increment, 10);
    if (bid - inc > auction.currentPrice) setBidAmount(bid - inc);
  }

  return (
    <Grid container="true" direction="row" justify="space-between">
      <Card
        elevation={3}
        style={{
          maxWidth: '60%',
          minWidth: '60%',
          marginLeft: '5vw',
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
            <Chip label={auction.postdate} size="small" variant="outlined" />
          </Grid>
          <Grid item container="true" style={{ marginTop: '1vw', marginBottom: '1vw' }}>
            <Typography variant="body2">{auction.description}</Typography>
          </Grid>
          <Grid item direction="column" container="true">
            <Typography variant="caption" style={{ fontWeight: 'bold' }}>
              Cut-off
            </Typography>
            <Chip
              label={auction.postdate}
              variant="outlined"
              color="primary"
              style={{ maxWidth: '160px' }}
            />
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
          maxWidth: '30%',
          minWidth: '30%',
          maxHeight: '350px',
          marginTop: '3vw',
          marginBottom: '3vw',
          marginRight: 0,
          padding: '1vw',
          borderRadius: '1vw 0vw 0vw 1vw',
        }}
      >
        <Grid
          container="true"
          direction="column"
          justify="space-around"
          style={{ padding: '2vw', height: '100%' }}
        >
          <Grid item container="true" spacing={2}>
            <Grid item>
              <Typography variant="caption">STARTING </Typography>
              <br />
              <Chip
                label={`P${auction.startPrice}.00`}
                color="primary"
                variant="outlined"
                style={{ maxWidth: '160px' }}
              />
            </Grid>
            <Grid item>
              <Typography variant="caption">CURRENT </Typography>
              <br />
              <Chip
                label={`P${auction.currentPrice}.00`}
                color="primary"
                variant="outlined"
                style={{ maxWidth: '160px' }}
              />
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="caption">HIGHEST BIDDER</Typography>
            <br />
            <Chip
              label={`Mr.${auction.highestBidder}`}
              color="primary"
              variant="outlined"
              style={{ maxWidth: '160px' }}
            />
          </Grid>
          <Grid item style={{ marginTop: '1vw' }}>
            <TextField
              type="text"
              variant="outlined"
              size="small"
              label={`Increments of ${auction.increment}`}
              key={`${Math.floor(Math.random() * 1000)}-min`}
              onKeyDown={(event) => {
                event.preventDefault();
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start">P</InputAdornment>,
                endAdornment: (
                  <InputAdornment position="end">
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      alignItems="center"
                      style={{ marginLeft: '10px' }}
                    >
                      <Button style={{ padding: 0 }}>
                        <KeyboardArrowUpIcon
                          onClick={HandleIncrement}
                          style={{ fontSize: '20px' }}
                        />
                      </Button>
                      <Button style={{ padding: 0 }}>
                        <KeyboardArrowDownIcon
                          onClick={HandleDecrement}
                          style={{ fontSize: '20px' }}
                        />
                      </Button>
                    </Grid>
                  </InputAdornment>
                ),
                inputProps: {
                  value: bidAmount,
                },
              }}
              style={{ width: '50%' }}
            />
            <Button variant="contained" color="primary" style={{ width: '20%', marginLeft: '1vw' }}>
              Bid
            </Button>
          </Grid>
          <Grid item>
            <TextField
              type="text"
              variant="outlined"
              size="small"
              InputProps={{
                inputProps: {
                  readOnly: true,
                  disabled: true,
                  value: `P${auction.stealPrice}.00`,
                  style: { textAlign: 'center' },
                },
              }}
              style={{ width: '50%' }}
            />
            <Button variant="contained" color="primary" style={{ width: '20%', marginLeft: '1vw' }}>
              Steal
            </Button>
          </Grid>
        </Grid>
      </Card>
      <script type="text/javascript" src="../myfunctions.js" />
    </Grid>
  );
}

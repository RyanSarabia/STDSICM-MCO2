/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
// import Badge from '@material-ui/core/Badge';
import FaceIcon from '@material-ui/icons/Face';
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
import ImagePopup from './ImagePopup';
import { formatDate, diffMinutes } from '../myFunctions';
import DialogButton from './DialogButton';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  shape: {
    width: '17px',
    height: '17px',
  },
  shapeCircle: {
    borderRadius: '50%',
  },
  green: {
    backgroundColor: 'green',
  },
  gray: {
    backgroundColor: 'gray',
  },
}));

export default function Auction() {
  const classes = useStyles();
  const greenCircle = <div className={clsx(classes.shape, classes.shapeCircle, classes.green)} />;
  const grayCircle = <div className={clsx(classes.shape, classes.shapeCircle, classes.gray)} />;
  const [auction, setAuction] = useState('');
  const [bidAmount, setBidAmount] = useState(0);
  const [isDisabled, setDisable] = useState(false);
  const [status, setStatus] = useState('OPEN');
  const [statusIcon, setStatusIcon] = useState(greenCircle);
  const [hasBid, setHasBid] = useState(false);
  const [owner, setOwner] = useState('Johnny Doe');
  const auctionId = useParams().auction;
  const [isModalOpen, setModal] = useState(false);
  const [loadTrigger, setTrigger] = useState(false);

  console.log(auctionId);
  console.log(auction);

  useEffect(() => {
    axios.get(`/auction/getAuction/${auctionId}`).then((res) => {
      const tempdata = res.data;
      console.log(tempdata);

      const curDate = new Date();
      const cutoffDate = new Date(tempdata.cutoff);
      if (curDate > cutoffDate || tempdata.currentPrice === tempdata.stealPrice) {
        console.log('buboi');
        setStatus('CLOSED');
        setStatusIcon(grayCircle);
        setDisable(true);
      }

      axios.get(`/auction/getOwner/${auctionId}`).then((res2) => {
        if (res2.data.isCurr) {
          setDisable(true);
        }
      });

      if (tempdata.currentPrice >= tempdata.startPrice) {
        setHasBid(true);
        setBidAmount(parseInt(tempdata.currentPrice, 10) + parseInt(tempdata.increment, 10));
      } else {
        setBidAmount(parseInt(tempdata.startPrice, 10));
      }

      const postdate = new Date(tempdata.postdate);
      const minutesPosted = diffMinutes(postdate, curDate);
      if (minutesPosted === 1) {
        tempdata.postdate = `${minutesPosted} minute ago`;
      } else if (minutesPosted < 60) {
        tempdata.postdate = `${minutesPosted} minutes ago`;
      } else if (minutesPosted < 1440) {
        tempdata.postdate = `${minutesPosted / 60} hours ago`;
      } else {
        tempdata.postdate = formatDate(tempdata.postdate);
      }
      tempdata.cutoff = formatDate(tempdata.cutoff);

      setAuction(tempdata);
    });
    setOwner('Johnny Boy');
  }, [loadTrigger]);

  const handleImageClick = () => {
    setModal(true);
  };

  const handlePopupClose = () => {
    console.log('closing');
    setModal(false);
  };

  function HandleIncrement() {
    const bid = parseInt(bidAmount, 10);
    const inc = parseInt(auction.increment, 10);
    if (bid + inc < auction.stealPrice) setBidAmount(bid + inc);
  }

  function HandleDecrement() {
    const bid = parseInt(bidAmount, 10);
    const inc = parseInt(auction.increment, 10);
    let min = parseInt(auction.startPrice, 10) - inc;
    if (hasBid) {
      console.log('has bid');
      min = parseInt(auction.currentPrice, 10);
    }
    if (bid - inc > min) setBidAmount(bid - inc);
  }

  const handleBid = () => {
    axios.post(`/auction/postAuction/${auctionId}/bid?bid=${bidAmount}`).then((res) => {
      console.log(res);
      setTrigger(!loadTrigger);
    });
  };

  const handleSteal = () => {
    axios.post(`/auction/postAuction/${auctionId}/steal`).then((res) => {
      console.log(res);
      setTrigger(!loadTrigger);
    });
  };

  return (
    <Grid container direction="row" justify="space-between">
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
        <Grid container>
          <Grid item container justify="space-between">
            <Typography variant="h4" style={{ textTransform: 'capitalize' }}>
              {auction.title}
            </Typography>
            <Chip icon={statusIcon} label={status} variant="outlined" elevation={3} />
          </Grid>
          <Grid item container style={{ marginTop: '1%' }}>
            <FaceIcon />
            <Typography
              variant="button"
              style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                marginRight: '2%',
                marginLeft: '0.5%',
              }}
            >
              {owner}
            </Typography>
            <Chip label={auction.postdate} size="small" variant="outlined" />
          </Grid>
          <Grid item container style={{ marginTop: '1%', marginBottom: '1%' }}>
            <Typography variant="body2">{auction.description}</Typography>
          </Grid>
          <Grid item container justify="center">
            <CardMedia
              onClick={handleImageClick}
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
          maxHeight: '300px',
          marginTop: '3vw',
          marginBottom: '3vw',
          marginRight: 0,
          padding: '1vw',
          borderRadius: '1vw 0vw 0vw 1vw',
        }}
      >
        <Grid
          container
          direction="column"
          justify="space-around"
          style={{ padding: '2vw', height: '100%' }}
        >
          <Grid item container spacing={2}>
            <Grid item hidden={hasBid}>
              <Typography variant="caption">STARTING BID</Typography>
              <br />
              <Chip
                label={`P${auction.startPrice}.00`}
                color="primary"
                variant="outlined"
                style={{ maxWidth: '160px' }}
              />
            </Grid>
            <Grid item hidden={!hasBid}>
              <Typography variant="caption">CURRENT BID</Typography>
              <br />
              <Chip
                label={`P${auction.currentPrice}.00`}
                color="primary"
                variant="outlined"
                style={{ maxWidth: '160px' }}
              />
            </Grid>
            <Grid item hidden={!hasBid}>
              <Typography variant="caption">HIGHEST BIDDER</Typography>
              <br />
              <Chip
                label={`Mr.${auction.highestBidder}`}
                color="primary"
                variant="outlined"
                style={{ maxWidth: '160px' }}
              />
            </Grid>
          </Grid>
          <Grid item direction="column" container>
            <Typography variant="caption">CUT-OFF</Typography>
            <Chip
              label={auction.cutoff}
              variant="outlined"
              color="primary"
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
              value={bidAmount}
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
                      <IconButton
                        onClick={HandleIncrement}
                        disabled={isDisabled}
                        style={{ padding: 0 }}
                      >
                        <KeyboardArrowUpIcon style={{ fontSize: '20px' }} />
                      </IconButton>
                      <IconButton
                        onClick={HandleDecrement}
                        disabled={isDisabled}
                        style={{ padding: 0 }}
                      >
                        <KeyboardArrowDownIcon style={{ fontSize: '20px' }} />
                      </IconButton>
                    </Grid>
                  </InputAdornment>
                ),
              }}
              style={{ width: '50%' }}
            />
            <DialogButton
              isDisabled={isDisabled}
              dialogMessage="Are you sure you want to bid? This action cannot be undone."
              dialogTitle={`Bid on ${auction.title}?`}
              confirmText="Yes, bid!"
              cancelText="Cancel"
              buttonText="Bid"
              confirmAction={handleBid}
            />
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
            <DialogButton
              isDisabled={isDisabled}
              dialogMessage="Are you sure you want to steal? This action cannot be undone."
              dialogTitle={`Steal ${auction.title}?`}
              confirmText="Yes, steal!"
              cancelText="Cancel"
              buttonText="Steal"
              confirmAction={handleSteal}
            />
          </Grid>
        </Grid>
      </Card>
      <div className="modal">
        <ImagePopup
          open={isModalOpen}
          onClose={handlePopupClose}
          image={auction.imageurl}
          caption={auction.title}
        />
      </div>
      <script type="text/javascript" src="../myfunctions.js" />
    </Grid>
  );
}

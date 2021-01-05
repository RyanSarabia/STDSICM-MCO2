import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';

export default function Auction() {
  const [auction, setAuction] = useState('');
  const auctionId = useParams().auction;

  console.log(auctionId);
  console.log(auction);

  useEffect(() => {
    axios.get(`/auction/getAuction/${auctionId}`).then((res) => {
      const tempdata = res.data;
      console.log(tempdata);
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
        }}
      >
        <Grid container="true">
          <Typography>{auction.title}</Typography>
          <Typography>{auction.postdate}</Typography>
          <Typography>{auction.description}</Typography>
          <Typography>{auction.cutoff}</Typography>
          <CardMedia
            style={{ height: 200, width: 200 }}
            component="image"
            image={auction.imageurl}
          />
        </Grid>
      </Card>
      <Card
        elevation={3}
        style={{ maxWidth: '35%', minWidth: '35%', margin: '3vw', padding: '1vw' }}
      >
        <Grid container="true">
          <Typography>
            Starting Bid:
            {auction.startPrice}
          </Typography>
          <Typography>
            Current Bid:
            {auction.currentPrice}
          </Typography>
          <Typography>
            Highest Bidder:
            {auction.highestBidder}
          </Typography>
          <Button>Bid</Button>
          <Button>Steal</Button>
        </Grid>
      </Card>
    </Grid>
  );
}

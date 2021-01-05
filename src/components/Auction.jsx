// import React, { useState, useEffect } from 'react';
import React, { useEffect } from 'react';
import axios from 'axios';
// import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';

export default function Auction() {
  const auctionId = useParams().auction;

  console.log(auctionId);

  useEffect(() => {
    axios.get(`/explore/getAuction/${auctionId}`).then((res) => {
      const tempdata = res.data;
      console.log(tempdata);
    });
  }, []);

  return (
    <div>
      <div> Buboi </div>
    </div>
  );
}

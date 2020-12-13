import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import ExploreCard from './ExploreCard';
import Search from './Search';
import PaginationBar from './PaginationBar';

export default function Explore() {
  const [auctions, setAuctions] = useState('');

  useEffect(() => {
    axios.get('/explore/getAllAuction').then((res) => {
      setAuctions(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div>
      <p> Explore page </p>
      <Grid
        item
        container
        xs={12}
        alignItems="center"
        justify="center"
        style={{ marginBottom: '5vh' }}
      >
        <Search />
      </Grid>
      <Grid container direction="column" xs={12} alignItems="center" justify="center" spacing={5}>
        {auctions &&
          auctions.map((auction) => {
            return (
              <Grid item>
                <ExploreCard auction={auction} />
              </Grid>
            );
          })}
      </Grid>
      <PaginationBar />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { useLocation } from 'react-router-dom';
import ExploreCard from './ExploreCard';
import Search from './Search';
import PaginationBar from './PaginationBar';

function formatDate(oldDate) {
  let newDate = oldDate.getMonth() + 1;
  newDate += '/';
  newDate += oldDate.getDate();
  newDate += '/';
  newDate += oldDate.getFullYear();
  newDate += ' ';
  newDate += oldDate.getHours();
  newDate += ':';
  newDate += oldDate.getMinutes();
  newDate += ':';
  newDate += oldDate.getSeconds();

  return newDate;
}

export default function Explore() {
  const [auctions, setAuctions] = useState('');
  const [auctionCount, setCount] = useState('');
  const location = useLocation();

  useEffect(() => {
    axios.get(`/explore/getAllAuction${location.search}`).then((res) => {
      let i;

      for (i = 0; i < res.data.length; i += 1) {
        const postdate = new Date(res.data[i].postdate);
        const cutoffdate = new Date(res.data[i].cutoffdate);

        res.data[i].postdate = formatDate(postdate);
        res.data[i].cutoffdate = formatDate(cutoffdate);
      }

      setAuctions(res.data.auctions);
      setCount(res.data.count);
      window.scrollTo(0, 0);
    });
  }, [location]);

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

      {auctionCount > 10 && (
        <Grid
          container
          xs={12}
          alignItems="center"
          justify="center"
          style={{ marginTop: '4vh', marginBottom: '4vh' }}
        >
          <PaginationBar pageCount={Math.ceil(auctionCount / 10, 10)} />
        </Grid>
      )}
    </div>
  );
}

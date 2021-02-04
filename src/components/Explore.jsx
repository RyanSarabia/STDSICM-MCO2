import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { useLocation } from 'react-router-dom';
import ExploreCard from './ExploreCard';
import Loading from './Loading';
import Search from './Search';
import PaginationBar from './PaginationBar';
import { formatDate } from '../myFunctions';

export default function Explore() {
  const [auctions, setAuctions] = useState('');
  const [auctionCount, setCount] = useState('');
  const location = useLocation();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/explore/getAllAuction${location.search}`).then((res) => {
      const tempdata = res.data.auctions;

      for (let i = 0; i < tempdata.length; i += 1) {
        tempdata[i].postdate = formatDate(tempdata[i].postdate);
        tempdata[i].cutoffdate = formatDate(tempdata[i].cutoffdate);
      }

      setAuctions(tempdata);
      setCount(res.data.count);
      window.scrollTo(0, 0);
      setLoading(false);
    });
  }, [location]);

  return (
    <>
      {isLoading ? (
        <Loading label="Fetching data..." />
      ) : (
        <div>
          <Grid
            item
            container
            alignItems="center"
            justify="center"
            style={{ margin: '5vh 0 5vh 0' }}
          >
            <Search pageName="explore" />
          </Grid>
          <Grid container direction="column" alignItems="center" justify="center" spacing={5}>
            {auctionCount < 1 && (
              <Grid
                container
                alignItems="center"
                justify="center"
                style={{ marginTop: '4vh', marginBottom: '4vh' }}
              >
                No auctions to show.
              </Grid>
            )}
            {auctions &&
              auctions.map((auction) => {
                return <ExploreCard item auction={auction} />;
              })}
          </Grid>

          {auctionCount > 10 && (
            <Grid
              container
              alignItems="center"
              justify="center"
              style={{ marginTop: '4vh', marginBottom: '4vh' }}
            >
              <PaginationBar pageCount={Math.ceil(auctionCount / 10, 10)} pageName="explore" />
            </Grid>
          )}
        </div>
      )}
    </>
  );
}

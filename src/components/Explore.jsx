import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { useLocation } from 'react-router-dom';
import ExploreCard from './ExploreCard';
import Search from './Search';

export default function Explore() {
  const [auctions, setAuctions] = useState('');
  const location = useLocation();
  // const query = new URLSearchParams(location.search);

  useEffect(() => {
    // console.log(query.get('search'));

    // <Route>
    //   {({ location }) => {
    //     const query = new URLSearchParams(location.search);
    //     const page = parseInt(query.get('page') || '1', 10);
    //     return (
    //       <Pagination
    //         page={page}
    //         count={10}
    //         renderItem={(item) => (
    //           <PaginationItem
    //             component={Link}
    //             to={`/explore${item.page === 1 ? '' : `?page=${item.page}`}`}
    //             // eslint-disable-next-line react/jsx-props-no-spreading
    //             {...item}
    //           />
    //         )}
    //       />
    //     );
    //   }}
    // </Route>;

    axios.get(`/explore/getAllAuction${location.search}`).then((res) => {
      let i;

      for (i = 0; i < res.data.length; i += 1) {
        const oldpostdate = new Date(res.data[i].postdate);
        let newpostdate = oldpostdate.getMonth();
        newpostdate += '/';
        newpostdate += oldpostdate.getDay();
        newpostdate += '/';
        newpostdate += oldpostdate.getFullYear();
        newpostdate += ' ';
        newpostdate += oldpostdate.getHours();
        newpostdate += ':';
        newpostdate += oldpostdate.getMinutes();
        newpostdate += ':';
        newpostdate += oldpostdate.getSeconds();

        const oldcutoffdate = new Date(res.data[i].cutoffdate);
        let newcutoffdate = oldcutoffdate.getMonth();
        newcutoffdate += '/';
        newcutoffdate += oldcutoffdate.getDay();
        newcutoffdate += '/';
        newcutoffdate += oldcutoffdate.getFullYear();
        newcutoffdate += ' ';
        newcutoffdate += oldcutoffdate.getHours();
        newcutoffdate += ':';
        newcutoffdate += oldcutoffdate.getMinutes();
        newcutoffdate += ':';
        newcutoffdate += oldcutoffdate.getSeconds();

        res.data[i].cutoffdate = newcutoffdate;
        res.data[i].postdate = newpostdate;
      }

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
      <Grid container direction="column" alignItems="center" justify="center" spacing={5}>
        {auctions &&
          auctions.map((auction) => {
            return (
              <Grid item>
                <ExploreCard auction={auction} />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}

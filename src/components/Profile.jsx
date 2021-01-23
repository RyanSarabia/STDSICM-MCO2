import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
// import GridList from '@material-ui/core/GridList';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import { Typography } from '@material-ui/core';
import ExploreCard from './ExploreCard';
import { formatDate } from '../myFunctions';

export default function Profile() {
  const profileId = useParams().userID;
  const [user, setUser] = useState('');
  const [auctions, setAuctions] = useState('');

  useEffect(() => {
    axios.get(`/profile/getUser/${profileId}`).then((res) => {
      const tempuser = res.data;
      const tempauctions = res.data.auctions;

      for (let i = 0; i < tempauctions.length; i += 1) {
        tempauctions[i].postdate = formatDate(tempauctions[i].postdate);
        tempauctions[i].cutoffdate = formatDate(tempauctions[i].cutoffdate);
      }

      setUser(tempuser);
      setAuctions(tempauctions);
    });
  }, []);

  return (
    <Grid container spacing={5}>
      <Grid item xs={4}>
        <Card
          elevation={5}
          style={{
            maxWidth: '100%',
            minWidth: '30%',
            marginLeft: '5vw',
            marginTop: '5vw',
            marginBottom: '5vw',
            padding: '1vw',
            paddingTop: '3vw',
            paddingBottom: '3vw',
            borderRadius: '5px',
          }}
        >
          <Grid container>
            <Grid item container justify="center">
              <CardMedia
                style={{
                  width: '10vw',
                  height: '10vw',
                  objectFit: 'scale-down',
                  marginTop: '1vw',
                  marginBottom: '2vw',
                  borderRadius: '50%',
                }}
                component="image"
                image={user.dpURL}
              />
            </Grid>
            <Grid item container justify="center">
              <Typography variant="h6">{user.firstName}</Typography>
            </Grid>
            <Grid
              style={{
                flexWrap: 'wrap',
              }}
            >
              {user.bio}
            </Grid>
            <Grid
              style={{
                marginLeft: '4vw',
                marginTop: '3vw',
              }}
            >
              <Typography variant="caption">CONTACT NUMBER</Typography>
              <br />
              <Chip
                label={`${user.contactNum}`}
                color="primary"
                variant="outlined"
                style={{ maxWidth: '160px' }}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={8}>
        <Grid
          container
          direction="column"
          xs={12}
          alignItems="center"
          justify="center"
          spacing={5}
          style={{
            marginTop: '5vw',
          }}
        >
          {auctions &&
            auctions.map((auction) => {
              return (
                <Grid item>
                  <ExploreCard auction={auction} />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </Grid>
  );
}

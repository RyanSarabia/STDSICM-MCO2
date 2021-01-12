import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import { Typography } from '@material-ui/core';

export default function Profile() {
  const profileId = useParams().userID;
  const [user, setUser] = useState('');

  console.log(profileId);

  useEffect(() => {
    axios.get(`/profile/getUser/${profileId}`).then((res) => {
      const tempdata = res.data;
      console.log(tempdata);

      setUser(tempdata);
    });
  }, []);

  return (
    <Card
      elevation={3}
      style={{
        maxWidth: '30%',
        minWidth: '30%',
        marginLeft: '5vw',
        marginTop: '5vw',
        marginBottom: '5vw',
        padding: '1vw',
        paddingTop: '3vw',
        paddingBottom: '3vw',
        borderRadius: '1vw',
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
  );
}

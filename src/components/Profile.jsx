import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Grid from '@material-ui/core/Grid';
// import GridList from '@material-ui/core/GridList';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Typography, TextField } from '@material-ui/core';
import ExploreCard from './ExploreCard';

export default function Profile() {
  const profileId = useParams().userID;
  const [user, setUser] = useState('');
  const [auctions, setAuctions] = useState('');
  const [isEditing, setEditing] = useState(false);

  const { register, errors, handleSubmit, formState, reset } = useForm({
    criteriaMode: 'all',
    mode: 'onChange',
  });

  // console.log(profileId);

  useEffect(() => {
    axios.get(`/profile/getUser/${profileId}`).then((res) => {
      const tempdata = res.data;
      console.log(tempdata);
      console.log(tempdata.auctions);

      setUser(tempdata);
      setAuctions(tempdata.auctions);

      const defaultValues = {
        newBio: tempdata.bio,
        newContact: tempdata.contactNum,
      };

      reset(defaultValues);
    });

    axios.get(`/profile/getUserAuctions/${profileId}`).then((res2) => {
      console.log('Here are the auctions: ');
      console.log(res2);
    });
  }, []);

  function toggleEditing() {
    if (isEditing) {
      setEditing(false);
    } else {
      setEditing(true);
    }
    console.log(isEditing);
  }

  const onSubmit = (data) => {
    console.log(`Contact: ${data.newContact}`);
    console.log(`Bio: ${data.newBio}`);

    axios
      .post('/profile/postProfile', { bio: data.newBio, contact: data.newContact })
      .then((res) => {
        const tempdata = res.data;

        setUser(tempdata);
        setAuctions(tempdata.auctions);

        const defaultValues = {
          newBio: tempdata.bio,
          newContact: tempdata.contactNum,
        };
        reset(defaultValues);
        setEditing(false);
      });
  };

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
              hidden={isEditing}
              style={{
                flexWrap: 'wrap',
              }}
            >
              {user.bio}
            </Grid>
            <Grid
              hidden={isEditing}
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
            <Grid
              hidden={!isEditing}
              style={{
                margin: 'auto',
                marginTop: '10%',
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  multiline
                  name="newBio"
                  label="New Bio"
                  color="primary"
                  variant="outlined"
                  fullWidth
                  rows={3}
                  rowsMax={6}
                  inputProps={{ maxLength: '140' }}
                  inputRef={register}
                  id="profile-id-bio-field"
                />
                <Grid
                  style={{
                    marginTop: '5%',
                    marginBottom: '5%',
                  }}
                >
                  <TextField
                    name="newContact"
                    label="New Contact Number"
                    color="primary"
                    variant="outlined"
                    size="small"
                    required
                    inputProps={{ maxLength: '10' }}
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                    InputProps={{
                      startAdornment: <InputAdornment position="start"> +63 </InputAdornment>,
                    }}
                    inputRef={register({
                      required: 'This field is required.',
                      pattern: {
                        value: /^9[0-9]{9}$/,
                        message: 'Invalid contact number format.',
                      },
                    })}
                    helperText={
                      <ErrorMessage errors={errors} name="newContact" id="id-contact-error" />
                    }
                    id="profile-id-contact-field"
                  />
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={!formState.isValid}
                    type="submit"
                    id="id-submit-button"
                  >
                    Save
                  </Button>
                </Grid>
              </form>
            </Grid>
            <Grid item container justify="center">
              <Button
                variant={isEditing ? 'outlined' : 'contained'}
                color={isEditing ? 'secondary' : 'primary'}
                onClick={toggleEditing}
              >
                {isEditing ? 'Cancel' : 'Edit profile'}
              </Button>
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

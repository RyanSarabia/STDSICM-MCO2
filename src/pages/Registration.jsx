/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import RegistrationForm from '../components/RegistrationForm';

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
    };
  }

  componentDidMount() {
    document.title = 'Registration | Lasell#';
    axios.get('/register').then((res) => {
      this.setState({ user: res.data });
    });
  }

  render() {
    const { user } = this.state;
    return (
      <Grid container direction="column" alignItems="center" style={{ marginTop: '20vh' }}>
        <Typography variant="h5" style={{ fontWeight: 'bold' }} id="id-welcome-text">
          <Grid container direction="row" alignItems="center" justify="center">
            Welcome,
            <Avatar
              alt={user.firstName + user.lastName}
              src={user.dpURL}
              style={{ margin: '0.5vh' }}
              id="id-avatar"
            />
            {user.firstName} {user.lastName}! Complete your details to sign-up.
          </Grid>
        </Typography>
        <Paper style={{ padding: '20px', minWidth: '35vh' }}>
          <RegistrationForm />
          <p style={{ fontSize: '8px' }}> You may still edit these later. </p>
        </Paper>
      </Grid>
    );
  }
}

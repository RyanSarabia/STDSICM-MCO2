/* eslint-disable react/prop-types */
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ExploreIcon from '@material-ui/icons/Explore';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CreateIcon from '@material-ui/icons/Create';
import FaceIcon from '@material-ui/icons/Face';
import { useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  Logo: {
    textDecoration: 'none',
    color: '#484848',
    transition: '0.3s',
    '&:hover': {
      transform: 'scale(2.1)',
      color: '#173D36',
    },
  },
}));

export default function NavigationBar({ logout, userID }) {
  const { path } = useRouteMatch();
  const classes = useStyles();

  return (
    <AppBar color="inherit" position="sticky" id="id-navbar">
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <a id="LasellLogo" href={`${path}explore`} className={classes.Logo}>
              <Typography
                variant="h5"
                style={{ fontWeight: 'bold', letterSpacing: '1.2px' }}
                id="id-navbar-title"
              >
                LaSell++
              </Typography>
            </a>
          </Grid>

          <Grid item>
            <Tooltip title="Explore">
              <IconButton aria-label="explore" href={`${path}explore`} id="id-explore-button">
                <ExploreIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Create">
              <IconButton aria-label="create" href={`${path}create`} id="id-create-button">
                <CreateIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Profile">
              <IconButton aria-label="profile" href={`/profile/${userID}`} id="id-profile-button">
                <FaceIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton onClick={logout} aria-label="logout" id="id-logout-button">
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

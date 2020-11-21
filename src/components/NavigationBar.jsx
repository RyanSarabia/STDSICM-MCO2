import React, { useEffect, useState } from 'react';
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
import { Redirect, useRouteMatch } from 'react-router-dom';
import axios from '../../node_modules/axios';

export default function NavigationBar() {
  const { path } = useRouteMatch();
  const [userID, setUserID] = useState();

  useEffect(() => {
    axios.get('/getID').then((res) => {
      setUserID(res.data.user_id);
    });
  });

  const logout = () => {
    axios.get('/logout').then((res) => {
      console.log(res);
      return <Redirect to="/login" />;
    });
  };
  return (
    <AppBar color="inherit" position="sticky">
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
              Lasell++
            </Typography>
          </Grid>

          <Grid item>
            <Tooltip title="Explore">
              <IconButton aria-label="explore" href={`${path}explore`}>
                <ExploreIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Create">
              <IconButton aria-label="create" href={`${path}create`}>
                <CreateIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Profile">
              <IconButton aria-label="profile" href={`${path}profile/${userID}`}>
                <FaceIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton onClick={logout} aria-label="logout">
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

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

export default function NavigationBar() {
  return (
    <AppBar color="inherit" position="sticky">
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">

          <Grid item>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}> Lasell++ </Typography>
          </Grid>

          <Grid item>
            <Tooltip title="Explore">
              <IconButton aria-label="explore">
                <ExploreIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Create">
              <IconButton aria-label="create">
                <CreateIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Profile">
              <IconButton aria-label="profile">
                <FaceIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton aria-label="logout">
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </Grid>

        </Grid>
      </Toolbar>
    </AppBar>
  );
}

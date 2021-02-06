/* eslint-disable react/prop-types */
import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function CircularProgressWithLabel({ label }) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress color="primary" thickness="2.0" size={120} disableShrink />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">
          {label}
        </Typography>
      </Box>
    </Box>
  );
}

export default function Loading({ label, hasBackdrop }) {
  return (
    <>
      {hasBackdrop ? (
        <Backdrop open>
          <CircularProgressWithLabel label={label} />
        </Backdrop>
      ) : (
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="100%"
          >
            <CircularProgressWithLabel label={label} />
          </Box>
        )}
    </>
  );
}

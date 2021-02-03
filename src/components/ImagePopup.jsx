import React from 'react';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Fade from '@material-ui/core/Fade';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';

// eslint-disable-next-line react/prop-types
export default function ImagePopup({ image, open, onClose, caption }) {
  return (
    <Modal
      id="id-image-popup"
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Grid
          container
          xs={12}
          direction="column"
          justify="center"
          alignItems="center"
          style={{ outline: 'none', maxWidth: 'fit-content' }}
        >
          <Card
            style={{
              maxWidth: '90vh',
              minWidth: '50vh',
              maxHeight: '90vh',
              overflow: 'auto',
            }}
          >
            <CardHeader
              action={
                <IconButton id="id-popup-close-button" onClick={onClose}>
                  <HighlightOffIcon />
                </IconButton>
              }
              title={caption}
              id="id-popup-title"
            />
            <CardMedia component="img" image={image} id="id-popup-content" />
          </Card>
        </Grid>
      </Fade>
    </Modal>
  );
}

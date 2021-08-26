/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DialogButton({
  isDisabled,
  dialogMessage,
  dialogTitle,
  confirmText,
  cancelText,
  buttonText,
  confirmAction,
  buttonId,
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    confirmAction();
    handleClose();
  };

  return (
    <>
      <Button
        id={buttonId}
        variant="contained"
        color="primary"
        onClick={handleOpen}
        disabled={isDisabled}
        style={{ width: '20%', marginLeft: '1vw' }}
      >
        {buttonText}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="id-dialog-title"> {dialogTitle} </DialogTitle>
        <DialogContent>
          <DialogContentText id="id-dialog-description">{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button id="id-cancel-button" onClick={handleClose} color="primary">
            {cancelText}
          </Button>
          <Button
            id="id-confirm-button"
            onClick={handleConfirm}
            color="primary"
            variant="contained"
            autoFocus
          >
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import React from 'react';

const FormData = ({ isOpen = false, onClose, children, title = '' }) => {
  // if (!isOpen) {
  //   return null;
  // }
  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };
  return (
    <Dialog onClose={handleClose} open={isOpen} fullScreen>
      <DialogTitle align="center">{title}</DialogTitle>
      <IconButton onClick={handleClose} size="large" sx={{ position: 'absolute', right: 20, top: 20 }}>
        <CloseIcon />
      </IconButton>
      {children}
    </Dialog>
  );
};

export default FormData;

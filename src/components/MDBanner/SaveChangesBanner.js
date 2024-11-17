
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MDButton from 'components/MDButton';

const SaveChangesBanner = ({ open, onClose, success, message }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="center">
          {success ? <CheckCircleOutlineIcon style={{ color: 'green', fontSize: 160 }} /> : <ErrorOutlineIcon style={{ color: 'red', fontSize: 160 }} />}
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6" align="center">
          {success ? 'Success!' : 'Error'}
        </Typography>
        <Typography variant="body2" align="center">
          {message ? message : success ? 'Your settings have been saved' : 'There was an error saving your settings'}
        </Typography>
      </DialogContent>
      <DialogActions>
        <MDButton variant="contained" color="info" fullWidth onClick={onClose}>
          Awesome!
        </MDButton>
      </DialogActions>
    </Dialog>
  );
};

export default SaveChangesBanner;
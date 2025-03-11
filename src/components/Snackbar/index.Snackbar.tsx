import * as React from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface CustomizedSnackbarsProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  message: string; 
}

export default function SnakbarHandler(props: CustomizedSnackbarsProps) {
const {open,setOpen,message} = props;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar  open={open} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{color:"green",backgroundColor:"white", width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

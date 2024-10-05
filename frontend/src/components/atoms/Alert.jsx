import React, { useState } from 'react';
import Alert from '@mui/material/Alert';

const BasicAlert = ({ severity, message }) => {
  // severity can accept: success, info, warning, and error
  return (
    <Alert severity={severity}>{message}</Alert>
  );
}

export default BasicAlert;
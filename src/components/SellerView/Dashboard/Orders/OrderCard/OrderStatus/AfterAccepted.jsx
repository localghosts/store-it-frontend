import React from 'react';
import { TextField, Button } from '@mui/material';

function AfterAccepted() {
  return (
    <div>
      <div className="orderAcceptedText">
        <b>ORDER ACCEPTED</b>
      </div>
      <TextField
        label="Update status"
        size="small"
        varian
        t="outlined"
        style={{ marginRight: '10px' }}
      />
      <div className="buttons">
        <Button variant="contained" onClick={() => { }}> Update </Button>
      </div>
    </div>
  );
}

export default AfterAccepted;

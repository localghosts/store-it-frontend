import React from 'react';
import { Button } from '@mui/material';

function AcceptOrReject({ setAccepted, setRejected }) {
  return (
    <div className="buttons">
      <Button variant="contained" onClick={() => setAccepted(true)}> Accept </Button>
      <Button variant="contained" onClick={() => setRejected(true)}> Reject </Button>
    </div>
  );
}

export default AcceptOrReject;

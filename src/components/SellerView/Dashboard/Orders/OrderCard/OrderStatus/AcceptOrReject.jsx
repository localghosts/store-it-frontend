import React, { useState } from 'react';
import { Button, Collapse, CircularProgress } from '@mui/material';
import axios from 'axios';
import BASE_URL from '../../../../../../url';

function AcceptOrReject({ singleOrder, setHistory, storeSlug }) {
  const [loading, setLoading] = useState(false);
  const config = {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  };
  const onAccept = () => {
    setLoading(true);
    axios
      .put(`${BASE_URL}/store/${storeSlug}/order/${singleOrder.orderID}`, { status: 'ACCEPTED' }, config)
      .then(() => {
        axios
          .get(`${BASE_URL}/store/${storeSlug}/orders`, config)
          .then((res) => {
            setLoading(false);
            setHistory(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const onReject = () => {
    setLoading(true);
    axios
      .put(`${BASE_URL}/store/${storeSlug}/order/${singleOrder.orderID}`, { status: 'REJECTED' }, config)
      .then(() => {
        axios
          .get(`${BASE_URL}/store/${storeSlug}/orders`, config)
          .then((res) => {
            setLoading(false);
            setHistory(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="buttons">
      {loading ? (
        <Collapse in={loading}>
          <div className="loadingStatus">
            <CircularProgress />
          </div>
        </Collapse>
      )
        : (
          <div className="buttons">
            <Button variant="contained" onClick={() => onAccept()}> Accept </Button>
            <Button variant="contained" onClick={() => onReject()}> Reject </Button>
          </div>
        )}
    </div>
  );
}

export default AcceptOrReject;

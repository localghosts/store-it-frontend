import React, { useState } from 'react';
import {
  FormControl, InputLabel, Select, MenuItem, Collapse, CircularProgress,
} from '@mui/material';
import axios from 'axios';
import BASE_URL from '../../../../../../url';

function AfterAccepted({
  singleOrder, storeSlug, setHistory, setError,
}) {
  const [status, setStatus] = useState('ACCEPTED');
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const config = {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  };

  const handleChange = (event) => {
    setError(false);
    setLoading(true);
    axios
      .put(`${BASE_URL}/store/${storeSlug}/order/${singleOrder.orderID}`, { status: event.target.value }, config)
      .then(() => {
        axios
          .get(`${BASE_URL}/store/${storeSlug}/orders`, config)
          .then((res) => {
            setLoading(false);
            setStatus(event.target.value);
            setHistory(res.data);
            if (event.target.value === 'DELIVERED') setCompleted(true);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            setError(true);
          });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  };
  return (
    <div>
      <div className="orderAcceptedText">
        <b>ORDER ACCEPTED</b>
      </div>
      {loading
        ? (
          <Collapse in={loading}>
            <div className="loadingStatus">
              <CircularProgress />
            </div>
          </Collapse>
        )
        : (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              disabled={completed}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value="ACCEPTED">Accepted</MenuItem>
              <MenuItem value="PROCESSING">Processing</MenuItem>
              <MenuItem value="OUT_FOR_DELIVERY">Out for Delivery</MenuItem>
              <MenuItem value="DELIVERED">Delivered</MenuItem>
            </Select>
          </FormControl>
        )}
    </div>
  );
}

export default AfterAccepted;

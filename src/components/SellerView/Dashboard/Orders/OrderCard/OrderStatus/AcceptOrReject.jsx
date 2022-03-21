import React, { useState } from 'react';
import { Button, Collapse, CircularProgress } from '@mui/material';
import axios from 'axios';
import { ThemeProvider } from '@mui/system';
import BASE_URL from '../../../../../../url';
import theme from '../../../../../ThemePalette';

function AcceptOrReject({
  singleOrder, setHistory, storeSlug, setError,
}) {
  const [loading, setLoading] = useState(false);
  const config = {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  };
  const onAccept = () => {
    let status;
    setLoading(true);
    setError(false);
    axios
      .put(`${BASE_URL}/store/${storeSlug}/order/${singleOrder.orderID}`, { status: 'ACCEPTED' }, config)
      .then(() => {
        axios
          .get(`${BASE_URL}/store/${storeSlug}/orders`, config)
          .then((res) => {
            setLoading(false);
            setHistory(res.data.sort((a, b) => b.orderID - a.orderID));
          })
          .catch((err) => {
            status = err?.response?.status ?? 500;
            setError(true);
            setLoading(false);
          });
      })
      .catch((err) => {
        status = err?.response?.status ?? 500;
        setError(true);
        setLoading(false);
      });
    return status;
  };

  const onReject = () => {
    let status;
    setLoading(true);
    setError(false);
    axios
      .put(`${BASE_URL}/store/${storeSlug}/order/${singleOrder.orderID}`, { status: 'REJECTED' }, config)
      .then(() => {
        axios
          .get(`${BASE_URL}/store/${storeSlug}/orders`, config)
          .then((res) => {
            setLoading(false);
            setHistory(res.data.sort((a, b) => b.orderID - a.orderID));
          })
          .catch((err) => {
            status = err?.response?.status ?? 500;
            setError(true);
          });
      })
      .catch((err) => {
        status = err?.response?.status ?? 500;
        setError(true);
      });

    return status;
  };
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default AcceptOrReject;

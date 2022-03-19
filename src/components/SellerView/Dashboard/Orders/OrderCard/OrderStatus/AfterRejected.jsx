import axios from 'axios';
import React, { useEffect } from 'react';
import BASE_URL from '../../../../../../url';

function AfterRejected({
  singleOrder, setHistory, storeSlug, setError,
}) {
  useEffect(() => {
    const config = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };

    if (singleOrder.status === 'PLACED') {
      setError(false);
      axios
        .put(`${BASE_URL}/store/${storeSlug}/order/${singleOrder.orderID}`, { status: 'REJECTED' }, config)
        .then(() => {
          axios
            .get(`${BASE_URL}/store/${storeSlug}/orders`, config)
            .then((res) => {
              setHistory(res.data.sort((a, b) => b.orderID - a.orderID));
            })
            .catch((err) => {
              console.log(err);
              setError(true);
            });
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        });
    }
  }, [singleOrder, setError]);

  return (
    <div>
      <div className="center">
        <b>ORDER REJECTED </b>
      </div>
    </div>
  );
}
export default AfterRejected;

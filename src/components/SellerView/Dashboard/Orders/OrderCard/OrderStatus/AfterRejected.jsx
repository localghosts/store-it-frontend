import axios from 'axios';
import React, { useEffect } from 'react';
import BASE_URL from '../../../../../../url';

function AfterRejected({ singleOrder, setHistory, storeSlug }) {
  useEffect(() => {
    const config = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };

    if (singleOrder.status === 'PLACED') {
      axios
        .put(`${BASE_URL}/store/${storeSlug}/order/${singleOrder.orderID}`, { status: 'REJECTED' }, config)
        .then(() => {
          axios
            .get(`${BASE_URL}/store/${storeSlug}/orders`, config)
            .then((res) => {
              setHistory(res.data);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }, [singleOrder]);

  return (
    <div>
      <div className="center">
        <b>ORDER REJECTED </b>
      </div>
    </div>
  );
}
export default AfterRejected;

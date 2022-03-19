import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Card from './Card';

export default function Display({ options, display }) {
  return display === true ? (
    <Stack direction="column" spacing={2} alignItems="center" className="display">
      <div className="display-search">
        {options.map((item) => (
          <Card storeElement={item} />
        ))}
        {options.length === 0
          ? <Typography sx={{ fontWeight: 'bold' }}>No products to show!</Typography> : <div />}
      </div>
    </Stack>
  ) : (<div />);
}

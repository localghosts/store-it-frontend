import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import Card from './Card';
import theme from '../ThemePalette';

export default function Display({ options, display }) {
  return display === true ? (
    <ThemeProvider theme={theme}>
      <Stack direction="column" spacing={2} alignItems="center" className="display">
        <div className="display-search" style={{ backgroundColor: theme.palette.quaternary.main }}>
          {options.map((item) => (
            <Card storeElement={item} />
          ))}
          {options.length === 0
            ? <Typography sx={{ fontWeight: 'bold' }}>No products to show!</Typography> : <div />}
        </div>
      </Stack>
    </ThemeProvider>
  ) : (<div />);
}

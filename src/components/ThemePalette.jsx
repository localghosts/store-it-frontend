import { createTheme } from '@mui/material/styles';
import { brown } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: brown[500],
    },
    secondary: {
      main: brown[200],
    },
    tertiary: {
      main: brown[50],
    },
    quaternary: {
      main: brown[100],
    },
  },
});

export default theme;

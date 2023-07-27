import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
    palette: {
        contrastThreshold: 4.5,
        mode: 'light',
        primary: {
            main: '#01589b',
        },
        secondary: {
            main: '#d86409',
        },
    },
});

theme = responsiveFontSizes(theme);

export default theme;
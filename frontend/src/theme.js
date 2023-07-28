import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
    palette: {
        contrastThreshold: 4.5,
        mode: 'light',
        primary: {
            main: '#EDCF9B',
        },
        secondary: {
            main: '#ab1a00',
        },
    },
});

theme = responsiveFontSizes(theme);

export default theme;
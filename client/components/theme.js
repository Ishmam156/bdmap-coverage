import { createMuiTheme } from '@material-ui/core/styles'

// Setting primary and secondary colors as global and overriding Material UI default
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#19aaf8',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#38e117',
            contrastText: '#000000',
        },
    },
})

export default theme

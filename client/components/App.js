import React from 'react'
import { DSMapProvider } from './DSMapContext'
import Drawer from 'Components/Drawer'
import Router from 'Components/Router'

import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'

// Render App with Context as well as Theme
const App = () => {
    return (
        <>
            <DSMapProvider>
                <ThemeProvider theme={theme}>
                    <Drawer>
                        <Router />
                    </Drawer>
                </ThemeProvider>
            </DSMapProvider>
        </>
    )
}

export default App

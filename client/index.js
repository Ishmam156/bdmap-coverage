import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import 'Assets/custom.scss'
import App from 'Components/App'
import ErrorBoundary from 'Components/ErrorBoundary'
import ScrollToTop from 'Components/ScrollToTop'

const refresh = () =>
    render(
        <Router>
            <ErrorBoundary>
                <ScrollToTop />
                <App />
            </ErrorBoundary>
        </Router>,
        document.getElementById('root')
    )

refresh()

if (module.hot) {
    module.hot.accept()
}

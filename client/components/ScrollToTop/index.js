import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Function taken from React Router DOM website to help with autoscroll back to top on click
const ScrollToTop = () => {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}

export default ScrollToTop

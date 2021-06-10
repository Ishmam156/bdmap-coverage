/**
 * Insert common items for frontend here
 */
import logo from 'Assets/Logo.png'
import loading from 'Assets/Loading.gif'

const longTitle = 'Bangladesh Map Coverage'
const shortTitle = 'BD Map Coverage'

// Global images
export const images = {
    logo,
    loading,
}

// Export Navbar Title
export const title = {
    longTitle,
    shortTitle,
}

// Global navbar links
// Change Users label as needed
export const usersLabel = 'Users'

export const topDrawerLinks = [
    {
        label: 'Home',
        link: '/',
    },
    {
        label: usersLabel,
        link: '/users',
    },
    {
        label: 'Add visit',
        link: '/districtupload',
    },
]

// Global navbar links
export const bottomDrawerLinks = [
    {
        label: 'My Profile',
        link: '/profile',
    },
    {
        label: 'Log In',
        link: '/login',
    },
    {
        label: 'Log Out',
        link: '/logout',
    },
]

// Everything from application wide common items is available through here
export * from '@root/config/common'

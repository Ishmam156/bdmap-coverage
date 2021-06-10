import React, { useContext } from 'react'
import { DSMapContext } from '../DSMapContext'
import { Link } from 'react-router-dom'
import { topDrawerLinks, bottomDrawerLinks, images } from 'Utilities/common'
import { title, usersLabel } from 'Utilities/common'

import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import EmojiPeopleOutlinedIcon from '@material-ui/icons/EmojiPeopleOutlined'
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined'
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined'
import List from '@material-ui/core/List'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'

const drawerWidth = 180

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    logo: {
        maxWidth: 32,
        marginRight: '.1in',
    },
    header: {
        color: 'white',
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: 'white',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}))

// Set drawer icons from Material UI Library
const drawerIcons = {
    '/': <HomeOutlinedIcon />,
    '/users': <EmojiPeopleOutlinedIcon />,
    '/districtupload': <RoomOutlinedIcon />,
    '/profile': <AccountCircleOutlinedIcon />,
    '/login': <VpnKeyOutlinedIcon />,
    '/logout': <ExitToAppOutlinedIcon />,
}

// Set which labels to show when logged in and when logged out
const logInItems = ['Home', usersLabel, 'Add visit', 'My Profile', 'Log Out']
const logOutItems = ['Home', usersLabel, 'Log In']

// Drawer component based on Material UI responsive drawer
const ResponsiveDrawer = (props) => {
    const { windowDrawer } = props
    const classes = useStyles()
    const theme = useTheme()
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const [user, , , , , , , ,] = useContext(DSMapContext)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    // Transition of drawer if on mobile device
    const handleDesktopToggle = () => {
        if (mobileOpen) {
            setMobileOpen(!mobileOpen)
        }
    }

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <List>
                {user && (
                    <ListItem button>
                        <ListItemText
                            primary={user.name}
                            secondary="Logged in"
                        />
                    </ListItem>
                )}
                {topDrawerLinks.map((item, index) => {
                    if (user && logInItems.includes(item.label)) {
                        return (
                            <Link
                                to={item.link}
                                key={item.label}
                                onClick={handleDesktopToggle}
                            >
                                <ListItem button>
                                    <ListItemIcon>
                                        {drawerIcons[item.link]}
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItem>
                            </Link>
                        )
                    }
                    if (!user && logOutItems.includes(item.label)) {
                        return (
                            <Link
                                to={item.link}
                                key={item.label}
                                onClick={handleDesktopToggle}
                            >
                                <ListItem button>
                                    <ListItemIcon>
                                        {drawerIcons[item.link]}
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItem>
                            </Link>
                        )
                    }
                })}
            </List>
            <Divider />
            <List>
                {bottomDrawerLinks.map((item, index) => {
                    if (user && logInItems.includes(item.label)) {
                        return (
                            <Link
                                to={item.link}
                                key={item.label}
                                onClick={handleDesktopToggle}
                            >
                                <ListItem button>
                                    <ListItemIcon>
                                        {drawerIcons[item.link]}
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItem>
                            </Link>
                        )
                    }
                    if (!user && logOutItems.includes(item.label)) {
                        return (
                            <Link
                                to={item.link}
                                key={item.label}
                                onClick={handleDesktopToggle}
                            >
                                <ListItem button>
                                    <ListItemIcon>
                                        {drawerIcons[item.link]}
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItem>
                            </Link>
                        )
                    }
                })}
            </List>
        </div>
    )

    const container =
        windowDrawer !== undefined ? () => window().document.body : undefined

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img
                        src={images.logo}
                        className={classes.logo}
                        alt="D&S Logo"
                    />
                    <Typography variant="h6" noWrap className={classes.header}>
                        {/* Shorten the title of webpage depending on screen width */}
                        {window.innerWidth > 500
                            ? title.longTitle
                            : title.shortTitle}
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
        </div>
    )
}

export default ResponsiveDrawer

import React, { useContext } from 'react'
import { DSMapContext } from '../DSMapContext'
import { Link } from 'react-router-dom'

import Loading from 'Components/Loading'
import SVGMap from 'Components/SVGMap'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

// Color for styling map legend
const useStyles = makeStyles((theme) => ({
    legendRoot: {
        background: '#ebeeef',
        boxShadow:
            '0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset',
    },
    zeroColor: {
        background: '#d9f1fe',
        border: '1px solid #d9f1fe',
        boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11)',
    },
    singleColor: {
        background: '#9bdcfc',
        border: '1px solid #9bdcfc',
        boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11)',
    },
    doubleColor: {
        background: '#18a9f1',
        border: '1px solid #18a9f1',
        boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11)',
    },
}))

const FrontPage = () => {
    const [user, , districts, , , , visit, , ,] = useContext(DSMapContext)

    // Count of districts that have been visited
    const districtCount = () => {
        const visitedDistrict = districts.filter((district) => {
            return district.visitCount > 0
        })

        return visitedDistrict.length
    }

    const visitedDistrictsCount = districtCount()
    const classes = useStyles()

    // Loading GIF
    if (districts.length === 0) {
        return <Loading />
    }

    return (
        <Grid
            item
            container
            xs={12}
            spacing={2}
            justify="center"
            alignItems="center"
        >
            {window.innerWidth < 600 && !user && (
                <Grid
                    item
                    xs={12}
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <Link to="/login">
                        <Button variant="contained" color="primary">
                            Log In
                        </Button>
                    </Link>
                </Grid>
            )}
            {user && (
                <>
                    <Grid
                        item
                        xs={6}
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h3">{visit.length}</Typography>
                        <Typography variant="subtitle2">
                            Visits done by team
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h3">
                            {visitedDistrictsCount}
                        </Typography>
                        <Typography variant="subtitle2">
                            Districts visited by team
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        <Link to="/districtupload">
                            <Button variant="contained" color="primary">
                                Add visit to map
                            </Button>
                        </Link>
                    </Grid>
                </>
            )}
            <Grid item xs={12} />
            <Grid
                item
                container
                spacing={4}
                xs={12}
                alignItems="flex-start"
                justify="center"
                style={{
                    textAlign: 'center',
                }}
            >
                <SVGMap
                    locationClassName="mapColor"
                    districts={districts}
                    viewBox="0 0 1530.748 2138"
                    label="Map of Bangladesh"
                />
            </Grid>
            <Grid item xs={12} />
            <Grid
                item
                container
                xs={6}
                sm={4}
                alignItems="stretch"
                justify="center"
                className={classes.legendRoot}
                style={{
                    textAlign: 'center',
                }}
            >
                <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom>
                        Legend of visits
                    </Typography>
                </Grid>
                <Grid item xs={2} className={classes.zeroColor}></Grid>
                <Grid item xs={2}>
                    <Typography variant="body2">0</Typography>
                </Grid>
                <Grid item xs={2} className={classes.singleColor}></Grid>
                <Grid item xs={2}>
                    <Typography variant="body2">1</Typography>
                </Grid>
                <Grid item xs={2} className={classes.doubleColor}></Grid>
                <Grid item xs={2}>
                    <Typography variant="body2">{'2+'}</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default FrontPage

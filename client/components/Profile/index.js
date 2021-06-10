import React, { useContext } from 'react'
import { DSMapContext } from '../DSMapContext'
import { Link } from 'react-router-dom'

import VisitCard from 'Components/VisitCard'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// Handle user's profile view
const Profile = () => {
    const [user, , , , , , , , visitCount] = useContext(DSMapContext)

    // Show log in requirement to user
    if (!user) {
        return (
            <Grid container alignItems="center" justify="center" spacing={2}>
                <Grid
                    item
                    xs={12}
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="subtitle2">
                        You must be logged in to view profile page.
                    </Typography>
                </Grid>
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
            </Grid>
        )
    }

    // Check if user is yet to visit a district
    if (visitCount.length === 0) {
        return (
            <Grid container alignItems="center" justify="center" spacing={2}>
                <Grid
                    item
                    xs={12}
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="subtitle2">
                        You are yet to add your visits to the map!
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
            </Grid>
        )
    }

    // Count of unique districts visited
    const districtCount = new Set(
        visitCount.map((count) => count.district.name)
    )

    // Sort visits by date by showing the recent visits first
    visitCount.sort(function (a, b) {
        if (a.date < b.date) {
            return 1
        }
        if (a.date > b.date) {
            return -1
        }
        return 0
    })

    return (
        <Grid container>
            <Grid
                item
                container
                xs={12}
                spacing={2}
                justify="center"
                alignItems="center"
            >
                <Grid
                    item
                    xs={6}
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h3">{visitCount.length}</Typography>
                    <Typography variant="subtitle2">Total visits</Typography>
                </Grid>
                <Grid
                    item
                    xs={6}
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h3">{districtCount.size}</Typography>
                    <Typography variant="subtitle2">
                        Districts visited
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
                <Grid item xs={12} />
                <Grid
                    item
                    container
                    spacing={2}
                    xs={12}
                    alignItems="flex-start"
                    justify="center"
                    style={{
                        textAlign: 'center',
                    }}
                >
                    {visitCount.map((visit) => (
                        <Grid item key={visit.id}>
                            <VisitCard visit={visit} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Profile

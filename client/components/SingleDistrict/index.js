import React, { useContext } from 'react'
import { DSMapContext } from '../MapContext'
import { Link } from 'react-router-dom'

import Loading from 'Components/Loading'
import VisitCard from 'Components/VisitCard'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const SingleDistrict = ({ name, distDefault }) => {
    const [user, , districts, , , , visit, ,] = useContext(DSMapContext)

    const districtStats = districts.find((district) => district.name === name)

    // Default loading screen
    if (distDefault && !districtStats) {
        return <Loading />
    }

    // Show limited information if user not logged in
    if (!user) {
        return (
            <>
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
                            xs={12}
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            <Typography variant="h3">{name}</Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            <Typography variant="h3">
                                {districtStats.visitCount}
                            </Typography>
                            <Typography variant="subtitle2">
                                {districtStats.visitCount === 0
                                    ? 'Not yet visited by team'
                                    : districtStats.visitCount === 1
                                    ? 'Time visited by team'
                                    : 'Times visited by team'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        )
    }

    // Show full visits and visitors information if logged in
    const visitCount = visit.filter(
        (visitDist) => visitDist.district.name === name
    )

    visitCount.sort(function (a, b) {
        if (a.date < b.date) {
            return 1
        }
        if (a.date > b.date) {
            return -1
        }
        return 0
    })

    const totalVisitors = visitCount
        .map((visit) => visit.visitors.length)
        .reduce((a, b) => a + b, 0)

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
                    xs={12}
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h3">{name}</Typography>
                </Grid>
                <Grid
                    item
                    xs={6}
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h3">
                        {districtStats.visitCount}
                    </Typography>
                    <Typography variant="subtitle2">
                        {districtStats.visitCount === 0
                            ? 'Not yet visited by team'
                            : districtStats.visitCount === 1
                            ? 'Time visited by team'
                            : 'Times visited by team'}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={6}
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h3">{totalVisitors}</Typography>
                    <Typography variant="subtitle2">Total visitors</Typography>
                </Grid>

                <Grid
                    item
                    xs={12}
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <Link to={`/districtupload/${name}`}>
                        <Button variant="contained" color="primary">
                            Add visit to map
                        </Button>
                    </Link>
                </Grid>
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
                    {visitCount.map((visit) => (
                        <Grid item key={visit.id}>
                            <VisitCard visit={visit} district={true} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SingleDistrict

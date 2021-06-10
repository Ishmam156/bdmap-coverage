import React from 'react'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

// Define width of card
const useStyles = makeStyles({
    root: {
        maxWidth: 300,
    },
})

// Taken from SO
const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [day, month, year].join(' / ')
}

// Show each individual visit in Material UI Card format
const VisitCard = ({ visit, district }) => {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={`Visit photo of ${visit.district.name}`}
                    height="200"
                    image={visit.photoURL}
                    title={`${visit.district.name} visit`}
                />
                <CardContent>
                    {/* Check if district page or not to ensure non duplication of district name */}
                    {!district && (
                        <Typography variant="h5" component="h2">
                            {visit.district.name}
                        </Typography>
                    )}
                    <Typography gutterBottom variant="caption" display="block">
                        {formatDate(visit.date)}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        gutterBottom
                    >
                        {visit.description}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2" component="h3">
                        Visitors
                    </Typography>
                    <Typography gutterBottom variant="caption" display="block">
                        {visit.visitors
                            .map((visitor) => visitor.name)
                            .sort()
                            .join(', ')}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default VisitCard

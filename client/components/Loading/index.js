import React from 'react'
import Grid from '@material-ui/core/Grid'
import { images } from 'Utilities/common'

// Common loading GIF across app
const Loading = () => {
    return (
        <Grid container alignItems="center" justify="center">
            <img src={images.loading} />
        </Grid>
    )
}

export default Loading

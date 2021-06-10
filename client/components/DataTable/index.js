import React from 'react'
import Loading from 'Components/Loading'
import { usersLabel } from 'Utilities/common'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'

const DataTable = ({ data, dataLegend }) => {
    // Loading GIF
    if (data.length === 0) {
        return <Loading />
    }

    // Get count of employees who've gone on visits
    const employeeCount = data.filter((visit) => visit.visits.length > 0).length

    return (
        <Grid container alignItems="center" justify="center">
            <Grid item xs={1} />
            <Grid item xs={10}>
                <Typography variant="h6" id="tableTitle" component="div">
                    {`${usersLabel} Family`}
                </Typography>
                {employeeCount > 0 && (
                    <Typography
                        variant="subtitle1"
                        id="tableSubtitle"
                        component="div"
                    >
                        <strong>{employeeCount}</strong> of your colleagues have
                        visited a district.
                    </Typography>
                )}
                <TableContainer component={Paper}>
                    <Table aria-label="user table">
                        <TableHead>
                            <TableRow>
                                {dataLegend.map((name) => (
                                    <TableCell align="center" key={name}>
                                        {name}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.visits.sort().join(', ')}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={1} />
        </Grid>
    )
}

export default DataTable

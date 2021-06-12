import { DSMapContext } from '../MapContext'
import React, { useContext } from 'react'
import DataTable from 'Components/DataTable'

const Users = () => {
    const [user, , , , users, , visit, , ,] = useContext(DSMapContext)

    // Sort users by name alphabetically
    users.sort(function (a, b) {
        if (a.name < b.name) {
            return -1
        }
        if (a.name > b.name) {
            return 1
        }
        return 0
    })

    let data = []

    // No visit information if user not logged in
    if (!user) {
        data = users.map((user) => {
            return { ...user, visits: [] }
        })
    }

    // Add name of district that each user has visited in an array
    if (user) {
        data = users.map((user) => {
            let visits = []
            visit.forEach((vis) => {
                const visitors = vis.visitors.map((visitor) => visitor.name)
                if (visitors.includes(user.name)) {
                    if (!visits.includes(vis.district.name)) {
                        visits.push(vis.district.name)
                    }
                }
            })
            return { ...user, visits }
        })
    }

    // Data table headers
    const userLegend = ['#', 'Name', 'Districts Visited']

    return (
        <>
            <DataTable data={data} dataLegend={userLegend} />
        </>
    )
}

export default Users

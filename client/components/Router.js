import React from 'react'
import { Route, Switch, useRouteMatch, Link } from 'react-router-dom'

import DistrictUpload from 'Components/DistrictUpload'
import FrontPage from 'Components/FrontPage'
import Login from 'Components/Login'
import LogOut from 'Components/LogOut'
import Users from 'Components/Users'
import Profile from 'Components/Profile'
import SingleDistrict from 'Components/SingleDistrict'

const Router = () => {
    // Check for id match of district and district upload
    const match = useRouteMatch('/district/:name')
    const districtName = match ? match.params.name : null

    const matchDistrict = useRouteMatch('/districtupload/:name')
    const uploadName = matchDistrict ? matchDistrict.params.name : null

    // All routes for front end
    return (
        <div className="content">
            <Switch>
                <Route exact path="/district/:name">
                    <SingleDistrict name={districtName} />
                </Route>
                <Route exact path="/districtupload/:name">
                    <DistrictUpload name={uploadName} distDefault={true} />
                </Route>
                <Route exact path="/districtupload">
                    <DistrictUpload distDefault={false} />
                </Route>
                <Route exact path="/users">
                    <Users />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/profile">
                    <Profile />
                </Route>
                <Route exact path="/logout">
                    <LogOut />
                </Route>
                <Route exact path="/">
                    <FrontPage />
                </Route>
            </Switch>
        </div>
    )
}

export default Router

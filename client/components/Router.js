import React from 'react'
import { Route, Switch, useRouteMatch, Link } from 'react-router-dom'

import DistrictUpload from 'Components/DistrictUpload'
import FrontPage from 'Components/FrontPage'
import Login from 'Components/Login'
import LogOut from 'Components/LogOut'
import Users from 'Components/Users'
import Profile from 'Components/Profile'
import Drawer from 'Components/Drawer'
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
                    <Drawer>
                        <SingleDistrict
                            name={districtName}
                            distDefault={true}
                        />
                    </Drawer>
                </Route>
                <Route exact path="/districtupload/:name">
                    <Drawer>
                        <DistrictUpload name={uploadName} distDefault={true} />
                    </Drawer>
                </Route>
                <Route exact path="/districtupload">
                    <Drawer>
                        <DistrictUpload distDefault={false} />
                    </Drawer>
                </Route>
                <Route exact path="/users">
                    <Drawer>
                        <Users />
                    </Drawer>
                </Route>
                <Route exact path="/login">
                    <Drawer>
                        <Login />
                    </Drawer>
                </Route>
                <Route exact path="/profile">
                    <Drawer>
                        <Profile />
                    </Drawer>
                </Route>
                <Route exact path="/logout">
                    <LogOut />
                </Route>
                <Route exact path="/">
                    <Drawer>
                        <FrontPage />
                    </Drawer>
                </Route>
            </Switch>
        </div>
    )
}

export default Router

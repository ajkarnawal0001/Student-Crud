
import React from 'react'
import { Route, Switch } from 'react-router'
import AddUser from './AddUser'
import AllUsers from './AllUsers'
import EditUser from './EditUser'
import { Home } from './Home'
import Navbar from './Navbar'

export const RoutePath = () => {
    return (
      <>
            <Navbar/>
      <Switch>
        <Route exact path="/"  >
          <Home/>
          </Route>
        <Route exact path="/add">
          <AddUser/>
          </Route>
        <Route exact path="/edit/:id">
          <EditUser/>
          </Route>
      </Switch>
    </>
    )
}

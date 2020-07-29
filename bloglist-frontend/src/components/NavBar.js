import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

const NavBar = ({ handleLogOut, user }) => {
  return (
    <AppBar position="static">
      <ToolBar>
        <Button color="inherit" component={Link} to="/">
          Blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
        <Typography>
          {user.name} has logged in
        </Typography>
        <Button onClick={handleLogOut} color="secondary">
          log out
        </Button>
      </ToolBar>
    </AppBar>
  )
}

export default NavBar
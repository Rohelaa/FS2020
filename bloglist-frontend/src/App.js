import React, { useEffect, useState } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { addUser, removeUser } from './reducers/userReducer'
import { Switch, Route, Link, useRouteMatch, Redirect, } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import Container from '@material-ui/core/Container'
import Blogs from './components/Blogs'
import NavBar from './components/NavBar'

const App = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService
      .getAll()
      .then(response => {
        console.log(response)
        setUsers(response)
      })
  }, [])

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const match = useRouteMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(initializeBlogs(blogs))
    )
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(addUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(removeUser())
    console.log(window.localStorage)
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <Container>
      <NavBar handleLogOut={handleLogout} user={user} />
      <h2>blogs</h2>
      <div>
        <Notification />
      </div>
      <Switch>
        <Route path="/blogs/:id">
          {blog ? <Blog blog={blog} /> : <Redirect to="/"/>}
        </Route>
        <Route path="/users/:id">
          <User users={users}/>
        </Route>
        <Route path="/users">
          <Users users={users}/>
        </Route>
        <Route path="/">
          <BlogForm />
          <Blogs blogs={blogs} />
        </Route>
      </Switch>
    </Container>
  )
}

export default App
import React, { useEffect, useState } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createNewBlog } from './reducers/blogReducer'
import { addUser, removeUser } from './reducers/userReducer'
import { Switch, Route, Link, useRouteMatch, Redirect, } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import Container from '@material-ui/core/Container'
import Blogs from './components/Blogs'

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
      // console.log('user\'s info: ', user)
      dispatch(addUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const createBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      console.log(createdBlog)
      blogFormRef.current.toggleVisibility()
      dispatch(createNewBlog(createdBlog))
      console.log('created blog: ', createdBlog)
    } catch (exception) {
      console.error(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(removeUser())
    console.log(window.localStorage)
  }

  const blogFormRef = React.createRef()

  const blogForm = () => {
    return (
      <Togglable buttonId='new-blog-button' buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
    )
  }

  // const blogsSorted = () => (
  //   blogs
  //     .sort((a, b) => b.likes - a.likes)
  //     .map(blog =>
  //       <Link key={blog.id} to={`blogs/${blog.id}`}>
  //         <div>
  //           {blog.title} {blog.author}
  //         </div>
  //       </Link>
  //     )
  // )

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  const padding = {
    padding: 5
  }

  const navigationBar = {
    padding: 5,
    background: '#99ffb3'
  }

  return (
    <Container>
      <div style={navigationBar}>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user.name} logged in
        <button onClick={handleLogout}>log out</button>
      </div>
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
          {blogForm()}
          <Blogs blogs={blogs} />
        </Route>
      </Switch>
    </Container>
  )
}

export default App
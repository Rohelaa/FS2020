import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createNewBlog } from './reducers/blogReducer'
import { like } from './reducers/blogReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const blogsInStore = useSelector(state => state.blogs)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(initializeBlogs(blogs))
    )
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    try {
      const response = await blogService.update(updatedBlog)
      console.log(response)
      dispatch(like(updatedBlog))
      // const blogsUpdated = blogs
      //   .filter(b => b.id !== response.id)
      //   .concat(updatedBlog)

      // console.log('updated...', blogsUpdated)

      // setBlogs(blogsUpdated)
      // console.log('response: ', response)
      // const blogs = await blogService.getAll()
      // console.log(blogs)
      // setBlogs(blogs)
    } catch (err) {
      console.error(err)
    }
  }

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

  const removeBlog = async blog => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        // console.log(blog)
        blogService.remove(blog)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
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

  const blogsSorted = () => (
    blogsInStore
      .sort((a, b) => b.likes - a.likes)
      .map(blog =>
        <Blog
          user={user}
          key={blog.id}
          blog={blog}
          handleDelete={removeBlog}
          handleLike={addLike}
        />
      )
  )

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm
          setUser={setUser}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user.name} logged in
      <button onClick={handleLogout}>log out</button>
      {blogForm()}
      {blogsSorted()}
    </div>
  )
}

export default App
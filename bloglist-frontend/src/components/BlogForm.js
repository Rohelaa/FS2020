import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import { createNewBlog } from '../reducers/blogReducer'
import { TextField, Button } from '@material-ui/core'

const BlogForm = () => {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const dispatch = useDispatch()

  const blogFormRef = React.createRef()

  const handleChange = ({ target }) => {
    setBlog({
      ...blog,
      [target.name]: target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const createdBlog = await blogService.create(blog)
      // console.log('created blog: ', createdBlog)
      blogFormRef.current.toggleVisibility()
      
      dispatch(createNewBlog(createdBlog))
      dispatch(showNotification(`a new blog ${blog.title} by ${blog.author} added`))
      setTimeout(() => {
        dispatch(hideNotification())
      }, 5000)
      setBlog({
        title: '',
        author: '',
        url: ''
      })
      console.log('created blog: ', createdBlog)
    } catch (exception) {
      dispatch(showNotification('Invalid input'))
      setTimeout(() => {
        dispatch(hideNotification())
      }, 5000)
      // console.error(exception);
    }
  }

  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   createBlog(blog)
    
    
  // }

  return (
    <Togglable buttonId='new-blog-button' buttonLabel='new blog' ref={blogFormRef}>
    {/* <div> */}
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField 
            label="title"
            onChange={handleChange}
            value={blog.title}  
          /> 
        </div>
        <div>
          <TextField 
            label="author"
            onChange={handleChange}
            value={blog.author}  
          />   
        </div>
        <div>
          <TextField 
            label="url"
            onChange={handleChange}
            value={blog.url}  
          /> 
        </div>
        <Button variant="contained" color="inherit" id="save-blog" type="submit">create</Button>
      </form>
    {/* </div> */}
    </Togglable>
  )
}

export default BlogForm
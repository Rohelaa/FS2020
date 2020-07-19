import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { remove, like, commentBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import commentService from '../services/comments'

const Blog = ({ blog }) => {
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const removeBlog = async blog => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.remove(blog)
        dispatch(remove(blog))
      }
    } catch (exception) {
      console.error(exception)
    }
  }

  const addLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    try {
      const response = await blogService.update(updatedBlog)
      console.log(response)
      dispatch(like(updatedBlog))
    } catch (err) {
      console.error(err)
    }
  }

  if (!blog) {
    return null
  }

  const comments = () => (
    <ul>
      {blog.comments.map((com, index) =>
        <li key={index}>{com}</li>)}
    </ul>
  )

  const submitComment = async (event) => {
    try {
      event.preventDefault()
      const commentObject = {
        content: comment
      }
      const updatedBlog = await commentService.create(blog, commentObject)
      dispatch(commentBlog(updatedBlog))
      // console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      {blog.url}
      <div>
        {blog.likes}
        <button onClick={() => addLike(blog)}>like</button>
        <div>
          added by {blog.user.name}
        </div>
        <button onClick={() => removeBlog(blog)}>delete</button>
      </div>
      <div>
        <h3>comments</h3>
        <form onSubmit={submitComment}>
          <input
            value={comment}
            onChange={event => setComment(event.target.value)}
          />
          <button type="submit">add comment</button>
        </form>
        {comments()}
      </div>
    </div>
  )
}

export default Blog
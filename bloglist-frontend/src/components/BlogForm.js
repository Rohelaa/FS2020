import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const handleChange = ({ target }) => {
    setBlog({
      ...blog,
      [target.name]: target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog(blog)
    setBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            id='title'
            name="title"
            onChange={handleChange}
            value={blog.title}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            name="author"
            value={blog.author}
            onChange={handleChange}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            name="url"
            value={blog.url}
            onChange={handleChange}
          />
        </div>
        <button id="save-blog" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
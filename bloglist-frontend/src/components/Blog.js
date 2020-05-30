import React, { useState } from 'react'

const Blog = ({ blog, user, handleDelete, handleLike }) => {
  const [expand, setExpand] = useState(false)

  // const addLike = async () => {
  //   const updatedBlog = {
  //     ...blog,
  //     likes: blog.likes + 1
  //   }

  //   console.log('updated blog: ', updatedBlog)

  //   try {
  //     const response = await blogService.update(updatedBlog)
  //     console.log('response: ', response)
  //     setBlog({
  //       ...blog,
  //       likes: response.likes
  //     })
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const blogStyle = {
    border: 'solid',
    borderWidth: 1,
    padding: 3,
    marginTop: 5
  }

  if (!expand) {
    return (
      <div className='blog' style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => setExpand(!expand)}>view</button>
      </div>
    )
  }

  return (
    <div style={blogStyle} className='expandedBlog'>
      {blog.title} {blog.author}
      <button onClick={() => setExpand(!expand)}>hide</button>
      <div>
        <div>
          {blog.url}
        </div>
        <div className='likes'>
          likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button>
        </div>
        {
          Object.prototype.hasOwnProperty.call(blog, 'user') ?
            <div className='user'>
              {blog.user.name}
            </div>
            : null
        }
        {
          user.name === blog.user.name ?
            <button onClick={() => handleDelete(blog)}>remove</button>
            : null
        }
      </div>
    </div>
  )
}

export default Blog

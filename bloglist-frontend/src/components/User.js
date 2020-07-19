import React from 'react'
import { useParams } from 'react-router-dom'

const User = ({ users }) => {
  console.log(users)
  const { id } = useParams()
  console.log(typeof id)
  const user = users.find(user => user.id === id)
  console.log(user)

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User
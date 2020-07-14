import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      console.log(window.localStorage)
      blogService.setToken(user.token)
      setUser(user)
      dispatch(showNotification('Succesfully logged in'))
      setTimeout(() => {
        dispatch(hideNotification())
      }, 5000)
    } catch (exception) {
      dispatch(showNotification('wrong username or password'))
      setTimeout(() => {
        dispatch(hideNotification())
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
        <input
          id="username"
          type="text"
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          value={username}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          value={password}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )
}

export default LoginForm
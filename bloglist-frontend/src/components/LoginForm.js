import React, { useState } from 'react'

const LoginForm = ({
  handleLogin,
  message
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin({
      username, password
    })

    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>log in to application</h2>
      {message}
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
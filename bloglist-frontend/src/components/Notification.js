import React from 'react'

const Notification = ({ message }) => {

  if (message !== null && message.toLowerCase().startsWith('wrong')) {
    return (
      <div className="error">
        {message}
      </div>

    )
  }

  return (
    <div className="success">
      {message}
    </div>
  )

}

export default Notification
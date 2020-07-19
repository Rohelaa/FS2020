import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  if (notification !== null) {
    if (notification.toLowerCase().startsWith('wrong')) {
      return (
        <Alert severity="error">
          {notification}
        </Alert>
      )
    } else {
      return (
        <Alert severity="success">
          {notification}
        </Alert>
      )
    }
  }

  return null
}

export default Notification
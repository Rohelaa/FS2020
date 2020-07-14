const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return action.data
    case "HIDE_NOTIFICATION":
      return null 
    default:
      return state
  }
}

export const showNotification = (text) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: text
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}

export default notificationReducer
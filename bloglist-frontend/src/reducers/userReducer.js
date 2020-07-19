const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return action.data
    case 'REMOVE_USER':
      return null
    default:
      return state
  }
}

export const addUser = (user) => {
  return {
    type: 'ADD_USER',
    data: user
  }
}

export const removeUser = () => {
  return {
    type: 'REMOVE_USER',
  }
}

export default userReducer
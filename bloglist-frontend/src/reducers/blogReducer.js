const blogReducer = (state = [], action) => {
  console.log('action:', action);
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'LIKE':
      console.log('action data: ', action.data)
      
      const filteredBlogs = state.filter(blog => blog.id !== action.data.id)
      return [...filteredBlogs, action.data]
    default:
      return state
  }
}

export const like = (updatedBlog) => {
  return {
    type: 'LIKE',
    data: updatedBlog
  }
}

export const createNewBlog = (newBlog) => {
  return {
    type: 'NEW_BLOG',
    data: newBlog
  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs
  }
}

export default blogReducer
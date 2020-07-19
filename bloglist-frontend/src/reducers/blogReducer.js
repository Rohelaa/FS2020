const blogReducer = (state = [], action) => {
  console.log('action:', action)
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'LIKE': {
      console.log('action data: ', action.data)
      const filteredBlogs = state.filter(blog => blog.id !== action.data.id)
      return [...filteredBlogs, action.data]
    }
    case 'COMMENT_BLOG': {
      const filteredBlogs = state.filter(blog => blog.id !== action.data.id)
      return [...filteredBlogs, action.data]
    }
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.data.id)
    default:
      return state
  }
}

export const commentBlog = blog => {
  return {
    type: 'COMMENT_BLOG',
    data: blog
  }
}

export const remove = (blog) => {
  return {
    type: 'REMOVE_BLOG',
    data: blog
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
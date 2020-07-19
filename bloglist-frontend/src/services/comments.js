import axios from 'axios'

const baseUrl = '/api/blogs'

const create = async (object, comment) => {
  const response = await axios.post(`${baseUrl}/${object.id}/comments`, comment)
  return response.data
}

export default { create }
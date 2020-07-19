import { Link } from 'react-router-dom'
import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const Blogs = ({ blogs }) => {
console.log(blogs)
  const sortedBlogArray = [...blogs].sort((a, b) => b.likes - a.likes)
  console.log(blogs)
  console.log(sortedBlogArray)

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {sortedBlogArray.map(blog =>
            <TableRow key={blog.id}>
              <TableCell>
                <Link to={`blogs/${blog.id}`}>
                  {blog.title} {blog.author}
                </Link>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Blogs
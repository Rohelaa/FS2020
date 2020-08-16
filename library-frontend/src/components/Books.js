import React, { useState } from 'react'
import GenreFilter from './GenreFilter'

const Books = ({ books, show }) => {
  const [booksByGenre, setBooksByGenre] = useState(null)

  if (!show) {
    return null
  }

  if (books.loading) {
    return <div>loading...</div>
  }

  if (booksByGenre && booksByGenre !== 'all genres') {
    return (
      <div>
        <h2>books</h2>
        <GenreFilter 
          books={books.data.allBooks}
          setBooksByGenre={setBooksByGenre}
        />
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>
             {booksByGenre.map(a =>
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>
      <GenreFilter 
        books={books.data.allBooks}
        setBooksByGenre={setBooksByGenre}
      />
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
           {books.data.allBooks.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  )
}

export default Books
import React, { useEffect } from 'react'
import Select from 'react-select'
import { useLazyQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../queries'

const GenreFilter = ({ books, setBooksByGenre }) => {
  const [getBooks, result] = useLazyQuery(BOOKS_BY_GENRE)

  console.log(books)
  console.log(result)

  useEffect(() => {
    if (result.data) {
      setBooksByGenre(result.data.allBooks)
    } 
  }, [result]) // eslint-disable-line

  const genres = books.map(b => b.genres[0])
  
  // COOOOOL ! ! !

  let array666 = []

  const cleanedGenres = genres.reduce((acc, currVal) => {
    if (!array666.includes(currVal) && currVal !== undefined) {
      array666 = [...acc, currVal]
    }

    return array666
  }, ['all genres'])

  console.log(cleanedGenres)

  const options = cleanedGenres.map(g => {
    if (g === 'all genres') {
      return { value: '', label: g }
    }
    return { value: g, label: g } 
  })

  const getBooksByGenre = ({ value }) => {
    getBooks({ variables: { genre: value }})
  }

  return (
    <div>
      filter by genre
      <Select 
        options={options}
        onChange={(event) => getBooksByGenre(event)}
      />
    </div>
    
  )
}

export default GenreFilter
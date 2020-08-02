import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import Select from 'react-select'

const AuthorForm = ({ authors }) => {
  const [author, setAuthor] = useState('')
  const [birthyear, setBirthyear] = useState('')
  
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { name: author, setBornTo: Number(birthyear) } })

    setAuthor('')
    setBirthyear('')
  }

  console.log(authors)

  const options = authors.map(a => {
    return { value: a.name, label: a.name }
  })

  return (
    <div>
      <h2>Set birthyear</h2>
      <Select 
        options={options}
        onChange={(event, asd) => {
          console.log(event)
          console.log(asd)
          setAuthor(event.value)
        }}
      />
      <form onSubmit={handleSubmit}>
        <div>
          born
          <input 
            onChange={({ target }) => setBirthyear(target.value)}
            value={birthyear}
          />  
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorForm
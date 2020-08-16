import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name 
      born
      id
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
        born
      }
      published
      id
      genres
    }
  }
`

export const BOOKS_BY_GENRE = gql`
  query allBooks($genre: String!) {
    allBooks(genre: $genre) {
      title
      author {
        name
        born
      }
      published
      id
      genres
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!, 
    $author: String!, 
    $published: Int!, 
    $genres: [String!]!
  ) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres 
    ) {
      title,
      author {
        id
      }
      published,
      genres
    }
  } 
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const USER_INFO = gql`
  query {
    me {
      username 
      favoriteGenre
      id
    }
  }
`
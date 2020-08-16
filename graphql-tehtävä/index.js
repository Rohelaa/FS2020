const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'salainen'

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://fullstack:AamunSarastus30@harjoittelucluster-abncp.mongodb.net/library?retryWrites=true'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true 
})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks:  async (root, args) => {
      if (args.genre) {
        const books = await Book.find({ genres: { $in: args.genre }}).populate('author')
        return books
      } 

      // console.log('books: ', await Book.find({}).populate('author'))

      const books = await Book.find({}).populate('author')
      console.log('asdasdsabooks:', books)
      return books
    },
    allAuthors: async () => {
      // console.log(await Author.find({}))
      return await Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Book: {
    author: (root) => {
      return {
        name: root.author.name,
        born: root.author.born,
        bookCount: root.author.bookCount,
        id: root.author.id
      }
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      let author = await Author.findOne({ name: args.author })

      console.log('author: ', author)
      if (!author) {
        const newAuthor = new Author({
          name: args.author,
          born: null,
          bookCount: 1
        })

        try {
          await newAuthor.save()
          currentUser.authors = currentUser.authors.concat(newAuthor)
          await currentUser.save()
          console.log(`author: ${newAuthor} saved!`)
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }

        console.log('author id: ', newAuthor._id)

        const newBook = new Book({ ...args, author: newAuthor })

        try {
          await newBook.save()
          currentUser.books = currentUser.books.concat(newBook)
          await currentUser.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }

        console.log('book added: ', newBook)
        return newBook
      }

      author.bookCount = author.bookCount + 1

      try {
        await author.save()
        currentUser.authors = currentUser.authors.concat(author)
        await currentUser.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      const newBook = new Book({ ...args, author: author })
      console.log(newBook)

      try {
        await newBook.save()
        currentUser.books = currentUser.books.concat(newBook)
        await currentUser.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      console.log('book added: ', newBook)

      return newBook
    },
    editAuthor: async (root, args, context) => {
      const user = context.currentUser

      if (!user) {
        throw new AuthenticationError('not authenticated')
      }
      
      let author = await Author.findOne({ name: args.name })
      console.log(author)

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      return author
    },
    createUser: (root, args) => {
      const user = new User({ 
        username: args.username,
        favoriteGenre: args.favoriteGenre
       })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'salainen') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id).populate('books').populate('authors')
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
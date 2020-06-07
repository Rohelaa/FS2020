describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Roope Laakso',
      username: 'robba',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('robba')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Roope Laakso logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('robba')
      cy.get('#password').type('asdasdasdads')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'robba', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.get('#new-blog-button').click()
      cy.get('#title').type('a new blog created by Cypress')
      cy.get('#author').type('Roope Laakso')
      cy.get('#url').type('-')
      cy.get('#save-blog').click()

      cy.contains('a new blog created by Cypress')
    })

    describe('and a blog exists', function() {
      cy.createBlog({ 
        title: 'another blog created by Cypress',
        author: 'Roope Laakso',
        url: '-'
      })

      it('')
    })
  })
})
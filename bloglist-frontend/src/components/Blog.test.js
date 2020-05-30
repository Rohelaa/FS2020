import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('at start renders title and author but not url and likes', () => {
  const blog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testUrl',
    likes: 0
  }
  const component = render(
    <Blog blogData={blog} />
  )

  const div = component.container.querySelector('.blog')

  // component.debug()

  expect(div).toHaveTextContent('testTitle')
  expect(div).toHaveTextContent('testAuthor')
  expect(div).not.toHaveTextContent('testUrl')
  expect(div).not.toHaveTextContent('likes')
})

test('after clicking view button, renders also url and likes', () => {
  const blog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testUrl',
    likes: 0,
    user: 'testUser'
  }

  const user = {
    username: 'testUsername',
    name: 'testName',
    passwordHash: 'testPasswordHash',
  }


  const component = render(
    <Blog blogData={blog} user={user} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.expandedBlog')
  expect(div).toHaveTextContent('testTitle')
  expect(div).toHaveTextContent('testAuthor')
  expect(div).toHaveTextContent('testUrl')
  expect(div).toHaveTextContent('likes')
})

// test('clicking like button two times calls event handler two times', async () => {
//   const blog = {
//     title: 'testTitle',
//     author: 'testAuthor',
//     url: 'testUrl',
//     likes: 0,
//     user: 'testUser'
//   }

//   const user = {
//     username: 'testUsername',
//     name: 'testName',
//     passwordHash: 'testPasswordHash',
//   }

//   const mockHandler = jest.fn()

//   const component = render(
//     <Blog blogData={blog} user={user} />
//   )

//   const viewButton = component.getByText('view')

//   fireEvent.click(viewButton)

//   // component.debug()

//   const likeButton = component.getByText('like')
//   fireEvent.click(likeButton)
//   fireEvent.click(likeButton)

//   console.log(mockHandler.mock)
//   expect(mockHandler.mock.calls).toHaveLength(2)
// })
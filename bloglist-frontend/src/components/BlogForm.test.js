import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'

test('creating new blog calls event handler with correct information', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'testTitle' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'testAuthor' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'testUrl' }
  })
  fireEvent.submit(form)

  const stateAfterSubmit = createBlog.mock.calls[0][0]

  console.log(createBlog.mock.calls[0][0])
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(stateAfterSubmit.title).toBe('testTitle')
  expect(stateAfterSubmit.author).toBe('testAuthor')
  expect(stateAfterSubmit.url).toBe('testUrl')
})

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import userReducer from './reducers/userReducer'
import { BrowserRouter as Router} from 'react-router-dom'
 
const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: userReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools()
)

store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
)
import React from 'react'

const Recommendations = ({ userInfo }) => {
  console.log(userInfo)
  return (
    <div>
      books in your favorite genre 
      <strong>{userInfo.data.me.favoriteGenre}</strong>
      <table>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
      </table>
    </div>
  )
}

export default Recommendations
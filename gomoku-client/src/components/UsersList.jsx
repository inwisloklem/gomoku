import React from 'react'
import PropTypes from 'prop-types'
import styles from './UsersList.module.sass'

function UsersList ({ users }) {
  return (
    <ul className={styles.list}>
      {users.map(user => (
        <li className={styles.listItem} key={user.id}>
          {user.userName}
        </li>
      ))}
    </ul>
  )
}

UsersList.propTypes = {
  users: PropTypes.array
}

export default UsersList

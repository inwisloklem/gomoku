import React from 'react'
import PropTypes from 'prop-types'
import styles from './UsersList.module.sass'
import classNames from 'classnames'

function UsersList ({ currentUser, onDialogInit, users }) {
  return (
    <ul className={styles.list}>
      {users.map(user => {
        const stylesListItem = classNames({
          [styles.listItem]: true,
          [styles.listItemCurrent]: currentUser.id === user.id
        })
        return (
          <li className={stylesListItem} key={user.id} onClick={() => onDialogInit(user)}>
            {user.userName}
          </li>)
      })}
    </ul>
  )
}

UsersList.propTypes = {
  currentUser: PropTypes.object,
  onDialogInit: PropTypes.func,
  users: PropTypes.array
}

export default UsersList

import React from 'react'
import PropTypes from 'prop-types'
import styles from './UsersList.module.sass'
import classNames from 'classnames'

const { compare } = new Intl.Collator()

function UsersList ({ currentUser, onDialogInit, users }) {
  const sortedUsers = users.sort((a, b) => compare(a.userName, b.userName))
  return (
    <ul className={styles.list}>
      {sortedUsers.map(user => {
        const stylesListItem = classNames({
          [styles.listItem]: true,
          [styles.listItemCurrent]: currentUser.id === user.id
        })
        return (
          <li className={stylesListItem} key={user.id} onClick={() => onDialogInit(user)}>
            {user.userName} {currentUser.id === user.id ? '*' : ''}
          </li>
        )
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

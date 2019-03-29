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
        return (
          <li className={styles.listItem} key={user.id} onClick={() => onDialogInit(user)}>
            <span
              className={classNames({
                [styles.userName]: true,
                [styles.userNameCurrent]: currentUser.id === user.id,
                [styles.userNameBusy]: currentUser.id !== user.id && user.isBusy
              })}
            >
              {user.userName}
            </span>
            {currentUser.id === user.id ? ' *' : ''}
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

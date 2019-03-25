import React from 'react'
import PropTypes from 'prop-types'
import styles from './MessagesList.module.sass'

function MessagesList (props) {
  const { messages, userName } = props
  return (
    <ul className={styles.list}>
      <li className={styles.listItem}>
        Welcome to Gomoku chat, <strong>{userName}</strong>
      </li>
      {messages.map(message => (
        <li className={styles.listItem} key={message.id}>
          {message.messageText}
        </li>
      ))}
    </ul>
  )
}

MessagesList.propTypes = {
  messages: PropTypes.array,
  userName: PropTypes.string
}

export default MessagesList

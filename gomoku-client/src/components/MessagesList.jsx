import React from 'react'
import PropTypes from 'prop-types'
import styles from './MessagesList.module.sass'

function MessagesList (props) {
  const { messages } = props
  return (
    <ul className={styles.list}>
      <li className={styles.listItem}>Welcome to Gomoku chat</li>
      {messages.map(message => (
        <li className={styles.listItem} key={message.id}>
          {message.messageText}
        </li>
      ))}
    </ul>
  )
}

MessagesList.propTypes = {
  messages: PropTypes.array
}

export default MessagesList

import React from 'react'
import PropTypes from 'prop-types'
import styles from './MessagesList.module.sass'

function MessagesList (props) {
  const { messages } = props
  return (
    <ul className={styles.list}>
      {messages.map(message => (
        <li className={styles.listItem} key={message.id}>
          <span className={styles.userName}>{`<${message.author.userName}> `}</span>
          {message.text}
        </li>
      ))}
    </ul>
  )
}

MessagesList.propTypes = {
  messages: PropTypes.array
}

export default MessagesList

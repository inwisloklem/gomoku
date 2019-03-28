import React from 'react'
import PropTypes from 'prop-types'
import styles from './Dialog.module.sass'

function Dialog ({ onAccept, onReject, open, view, userName }) {
  const switchDialogContent = (userName, view) => {
    switch (view) {
      case 'choose':
        return (
          <>
            <h2 className={styles.title}>
              <span className={styles.userName}>{userName}</span> offers you a game
            </h2>
            <div className={styles.inner}>
              <button type='button' className={styles.button} onClick={onAccept}>
                Play now
              </button>
              <button type='button' className={styles.buttonGhost} onClick={onReject}>
                Next time
              </button>
            </div>
          </>
        )
      case 'request':
        return (
          <>
            <h2 className={styles.title}>
              Waiting for <span className={styles.userName}>{userName}</span>...
            </h2>
            <div className={styles.inner}>
              <button type='button' className={styles.buttonGhost} onClick={onReject}>
                Drop it
              </button>
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <dialog className={styles.dialog} open={open}>
      {switchDialogContent(userName, view)}
    </dialog>
  )
}

Dialog.propTypes = {
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
  open: PropTypes.bool,
  view: PropTypes.string,
  userName: PropTypes.string
}

export default Dialog

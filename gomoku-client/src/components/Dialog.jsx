import React from 'react'
import PropTypes from 'prop-types'
import styles from './Dialog.module.sass'

function Dialog ({ open, ...props }) {
  const switchDialogContent = ({ onAccept, onReject, view, user }) => {
    switch (view) {
      case 'choose':
        return (
          <>
            <h2 className={styles.title}>
              <span className={styles.userName}>{user.userName}</span> offers you a game
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
              Waiting for <span className={styles.userName}>{user.userName}</span>...
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
      {switchDialogContent(props)}
    </dialog>
  )
}

Dialog.propTypes = {
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
  open: PropTypes.bool,
  view: PropTypes.string,
  user: PropTypes.object
}

export default Dialog

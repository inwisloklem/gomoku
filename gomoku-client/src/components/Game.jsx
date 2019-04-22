import React, { useState } from 'react'
import styles from './Game.module.sass'

const FIELD_WIDTH = 20
const FIELD_HEIGHT = 20

const makeInitFieldState = (width, height) => new Array(height).fill(new Array(width).fill(null))

function Game () {
  const [field] = useState(makeInitFieldState(FIELD_WIDTH, FIELD_HEIGHT))

  return (
    <main className={styles.game}>
      <div className={styles.field}>
        {field.map((row, x) => (
          <div className={styles.row} key={x}>
            {row.map((value, y) => (
              <button className={styles.button} key={y} type='button'>
                {value}
              </button>
            ))}
          </div>
        ))}
      </div>
    </main>
  )
}

export default Game

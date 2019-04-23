import React, { useState } from 'react'
import clone from '../clone'
import styles from './Game.module.sass'

const FIELD_WIDTH = 20
const FIELD_HEIGHT = 20

const makeInitFieldState = (width, height) => new Array(height).fill(new Array(width).fill(null))

function Game () {
  const [field, setField] = useState(makeInitFieldState(FIELD_WIDTH, FIELD_HEIGHT))

  const handleClick = e => {
    const [x, y] = e.target.dataset.square.match(/\d+/g)
    const updatedField = clone(field)
    updatedField[x][y] = 'X'
    setField(updatedField)
  }

  return (
    <main className={styles.game}>
      <h1 className={styles.title}>Game</h1>
      <div className={styles.field}>
        {field.map((row, x) => (
          <div className={styles.row} key={x}>
            {row.map((value, y) => (
              <button
                className={styles.button}
                data-square={`[${x}, ${y}]`}
                key={y}
                onClick={handleClick}
                type='button'
              >
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

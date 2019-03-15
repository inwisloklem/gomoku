const makeChecker = dir => {
  const checkDirection = ({ current, field, points }) => {
    const [col, row] = current
    let seq = []
    for (let step = 0; step < points; step += 1) {
      switch (dir) {
        case 'right-left':
          if (field[row][col] === field[row][col + step]) {
            seq.push([col + step, row])
          }
          break
        case 'bottom':
          if (field[row + step] && field[row][col] === field[row + step][col]) {
            seq.push([col, row + step])
          }
          break
        case 'bottom-right':
          if (field[row + step] && field[row][col] === field[row + step][col + step]) {
            seq.push([col + step, row + step])
          }
          break
        case 'bottom-left':
          if (field[row + step] && field[row][col] === field[row + step][col - step]) {
            seq.push([col - step, row + step])
          }
          break
        default:
          throw new Error(dir ? `no such direction ${dir}` : 'direction required')
      }
    }
    return seq.length === points ? seq : null
  }
  return checkDirection
}

const checkRightLeft = makeChecker('right-left')
const checkBottom = makeChecker('bottom')
const checkBottomRight = makeChecker('bottom-right')
const checkBottomLeft = makeChecker('bottom-left')

const findPosition = (field, points = 5) => {
  for (let row = 0; row < field.length; row += 1) {
    for (let col = 0; col < field[row].length; col += 1) {
      if (field[row][col]) {
        const options = { current: [col, row], field, points }
        const rightLeft = checkRightLeft(options)
        const bottom = checkBottom(options)
        const bottomLeft = checkBottomLeft(options)
        const bottomRight = checkBottomRight(options)
        return rightLeft || bottom || bottomLeft || bottomRight
      }
    }
  }
  return null
}

module.exports = findPosition

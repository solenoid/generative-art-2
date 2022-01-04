import {
  idGenerator,
  // rgbToHex is useful to convert rgb(x, y, z) values that come out Digital Color Meter into hex.
  rgbToHex,
} from './utils.js'

const colorSequences = [
  ['#dc6414', '#60b060', '#ff781c', '#dcf032', '#ffb90c'],
  ['#dc6414', '#60b060', '#ff781c', '#a0dc50', '#c89614'],
  ['#dc6414', '#60b060', '#f0460c', '#98da46', '#3ea52a'],
  ['#dc6414', '#60b060', '#f0460c', '#4aac36', '#98da46'],
  ['#dc6414', '#46b478', '#fb5112', '#4aac36', '#968a7e'],
  ['#dc6414', '#46b478', '#fb5112', '#8ca3b6', '#986a73'],
  ['#dc6414', '#4694bd', '#fb5112', '#8ca3b6', '#986a73'],
]

const color = (r, i, j) => {
  let colorSequence

  const m = i % 25
  const n = j % 14
  const row0 = [0].includes(n)
  const row1 = [1, 13].includes(n)
  const row2 = [2, 12].includes(n)
  const row3 = [3, 11].includes(n)
  const row4 = [4, 10].includes(n)
  const row5 = [5, 9].includes(n)
  const row6 = [6, 8].includes(n)
  const row7 = [7].includes(n)

  if (row4 && [12].includes(m)) colorSequence = 0
  if (row5 && [11, 12].includes(m)) colorSequence = 0
  if (row6 && [11, 12, 13].includes(m)) colorSequence = 0
  if (row7 && [10, 11, 12, 13].includes(m)) colorSequence = 0

  if (row0 && [12].includes(m)) colorSequence = 1
  if (row1 && [11, 12].includes(m)) colorSequence = 1
  if (row2 && [11, 12, 13].includes(m)) colorSequence = 1
  if (row3 && [10, 11, 12, 13].includes(m)) colorSequence = 1
  if (row4 && [10, 11, 13, 14].includes(m)) colorSequence = 1
  if (row5 && [9, 10, 13, 14].includes(m)) colorSequence = 1
  if (row6 && [9, 10, 14, 15].includes(m)) colorSequence = 1
  if (row7 && [8, 9, 14, 15].includes(m)) colorSequence = 1

  if (row0 && [10, 11, 13, 14].includes(m)) colorSequence = 2
  if (row1 && [9, 10, 13, 14].includes(m)) colorSequence = 2
  if (row2 && [9, 10, 14, 15].includes(m)) colorSequence = 2
  if (row3 && [8, 9, 14, 15].includes(m)) colorSequence = 2
  if (row4 && [8, 9, 15, 16].includes(m)) colorSequence = 2
  if (row5 && [7, 8, 15, 16].includes(m)) colorSequence = 2
  if (row6 && [7, 8, 16, 17].includes(m)) colorSequence = 2
  if (row7 && [6, 7, 16, 17].includes(m)) colorSequence = 2

  if (row0 && [7, 8, 9, 15, 16, 17].includes(m)) colorSequence = 3
  if (row1 && [6, 7, 8, 15, 16, 17].includes(m)) colorSequence = 3
  if (row2 && [6, 7, 8, 16, 17, 18].includes(m)) colorSequence = 3
  if (row3 && [5, 6, 7, 16, 17, 18].includes(m)) colorSequence = 3
  if (row4 && [5, 6, 7, 17, 18, 19].includes(m)) colorSequence = 3
  if (row5 && [4, 5, 6, 17, 18, 19].includes(m)) colorSequence = 3
  if (row6 && [4, 5, 6, 18, 19, 20].includes(m)) colorSequence = 3
  if (row7 && [3, 4, 5, 18, 19, 20].includes(m)) colorSequence = 3

  if (row0 && [4, 5, 6, 18, 19, 20].includes(m)) colorSequence = 4
  if (row1 && [3, 4, 5, 18, 19, 20].includes(m)) colorSequence = 4
  if (row2 && [3, 4, 5, 19, 20, 21].includes(m)) colorSequence = 4
  if (row3 && [2, 3, 4, 19, 20, 21].includes(m)) colorSequence = 4
  if (row4 && [2, 3, 4, 20, 21, 22].includes(m)) colorSequence = 4
  if (row5 && [1, 2, 3, 20, 21, 22].includes(m)) colorSequence = 4
  if (row6 && [1, 2, 3, 21, 22, 23].includes(m)) colorSequence = 4
  if (row7 && [0, 1, 2, 21, 22, 23].includes(m)) colorSequence = 4

  if (row0 && [2, 3, 21, 22].includes(m)) colorSequence = 5
  if (row1 && [1, 2, 21, 22].includes(m)) colorSequence = 5
  if (row2 && [1, 2, 22, 23].includes(m)) colorSequence = 5
  if (row3 && [0, 1, 22, 23].includes(m)) colorSequence = 5
  if (row4 && [0, 1, 23, 24].includes(m)) colorSequence = 5
  if (row5 && [0, 23, 24].includes(m)) colorSequence = 5
  if (row6 && [0, 24].includes(m)) colorSequence = 5
  if (row7 && [24].includes(m)) colorSequence = 5

  if (row0 && [0, 1, 23, 24].includes(m)) colorSequence = 6
  if (row1 && [0, 23, 24].includes(m)) colorSequence = 6
  if (row2 && [0, 24].includes(m)) colorSequence = 6
  if (row3 && [24].includes(m)) colorSequence = 6

  if (r > 9) return colorSequences[colorSequence][0]
  if (r > 7) return colorSequences[colorSequence][1]
  if (r > 5) return colorSequences[colorSequence][2]
  if (r > 3) return colorSequences[colorSequence][3]
  if (r > 1) return colorSequences[colorSequence][4]
  // should never hit this last return
  return '#000'
}

const sharedAttrs = `fill=none stroke-width="1"`
const circles = (r, i, j, cx, cy) => {
  if (r < 2) return ''
  const smaller = circles(r - 2, i, j, cx, cy)
  return `<circle
  cx="${cx}"
  cy="${cy}"
  r="${r}"
  stroke="${color(r, i, j)}"
  ${sharedAttrs}/>
  ${smaller}`
}

export const draw = (
  selector,
  width,
  artPad,
  circlesAcross,
  circlesDown,
  background = '#073381',
) => {
  const artId = idGenerator('art')
  const drawWidth = width - artPad * 2
  const radius = drawWidth / circlesAcross / 2
  const xMove = radius * 2
  // 3:4 is the ratio for base:height of an equilateral triangle
  const yMove = radius * 2 * (7 / 8)
  const betweenCircle = 4
  const drawHeight = yMove * circlesDown + betweenCircle
  const height = drawHeight + artPad * 2

  let allCircles = ''
  for (let i = 0; i < circlesAcross; i++) {
    for (let j = 0; j < circlesDown; j++) {
      const evenRow = !(j % 2)
      const lastColumn = i === circlesAcross - 1
      const r = Math.floor(radius - betweenCircle / 2)
      allCircles += evenRow
        ? circles(r, i, j, radius + i * xMove, radius + j * yMove)
        : lastColumn
        ? ''
        : circles(r, i, j, radius + (i + 0.5) * xMove, radius + j * yMove)
    }
  }
  document.querySelector(
    selector,
  ).innerHTML = `<svg id="${artId}" width=${width} height=${height} viewbox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${background}"/>
    <g transform="translate(${artPad},${artPad})">
      ${allCircles}
    </g>
  </svg>`
}

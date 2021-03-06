const betList = [
  {
    name: 'Boom 00',
    spaces: ['00'],
    type: 'specific',
    description: {
      primary: 'Bet only on 00',
      secondary: 'Put at least the minimum bet on one spot - usually 00',
    },
  },
  { name: 'Green', type: 'specific', spaces: ['00', '0'] },
  {
    name: 'Green++',
    type: 'specific',
    spaces: ['00', '0', '1', '2', '27', '28'],
  },
  { name: '5 Across', type: 'straight', spaces: ['10', '27', '00', '1', '13'] },
  { name: '5 Bell Curve', spaces: null },
  { name: '3 Bell Curve', spaces: null },
  {
    name: '7 Across',
    type: 'straight',
    spaces: ['25', '10', '27', '00', '1', '13', '36'],
  },
  { name: '7 Slant Curve', spaces: null },
  { name: '7 Bell Curve', spaces: null },
]

function createBets() {
  const allBets = [...betList]
  allBets.forEach((bet) => {
    bet.selected = false
    const newSpaces = []
    if (bet.spaces) {
      const spaceCount = bet.spaces.length
      let betAmount
      if (spaceCount <= 5) {
        betAmount = 5 / spaceCount
      } else {
        betAmount = 1
      }
      bet.spaces.forEach((betSpace) => {
        if (typeof betSpace === 'string') {
          const val = betSpace.toString()
          const newSpace = { slice: val, betAmount }
          newSpaces.push(newSpace)
        }
      })
      bet.spaces = [...newSpaces]
    }
  })
  return allBets
}

export { createBets }

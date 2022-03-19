const betList = [
  { name: 'Boom 00', selected: false, spaces: ['00'] },
  { name: 'Green', selected: false, spaces: ['00', '0'] },
  { name: 'Green++', selected: false, spaces: ['00', '0', '1', '2', '27', '28'] },
  { name: '5 Across', selected: false, spaces: ['10', '27', '00', '1', '13'] },
  { name: '5 Bell Curve', selected: false, spaces: null },
  { name: '3 Bell Curve', selected: false, spaces: null },
  { name: '7 Across', selected: false, spaces: ['25', '10', '27', '00', '1', '13', '36'] },
  { name: '7 Slant Curve', selected: false, spaces: null },
  { name: '7 Bell Curve', selected: false, spaces: null },
]

function createBets() {
  return betList
}

export { createBets }

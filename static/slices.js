function createSlices(offset = 0) {
  const slices = []
  const numbers = [
    100, 27, 10, 25, 29, 12, 8, 19, 31, 18, 6, 21, 33, 16, 4, 23, 14, 35, 2, 0,
    28, 9, 26, 30, 11, 7, 20, 32, 17, 5, 22, 34, 15, 3, 24, 36, 13, 1,
  ]

  let color
  // Starts as 'true' so that the next number after green is red
  let isBlack = true
  numbers.forEach((number) => {
    if (number === 100 || number === 0) {
      color = 'green'
    } else {
      color = isBlack ? 'black' : 'red'
    }
    slices.push({ number, color })
    isBlack = !isBlack
  })

  let tempslice
  while (offset < 0) {
    tempslice = slices.shift()
    slices.push(tempslice)
    offset = offset - 1
  }
  return slices
}

export { createSlices }

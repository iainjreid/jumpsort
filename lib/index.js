'use strict'

/**
 * This method will apply the instructions provided to the Array provided by reference.
 *
 * @param {Array}   arr          - An Array to apply the sorting instructions to
 * @param {Array[]} instructions - An Array of sorting instructions to be applied
 *
 * @returns {Array} The Array provided as the first argument
 */
exports.apply = (arr, instructions) => {
  for (const [from, to] of instructions) {
    arr.splice(to, 0, arr.splice(from, 1)[0])
  }

  return arr
}

/**
 * This method will generate the instructions required to transition between the two Arrays provided.
 *
 * @param {Array} arr1 - An ordered Array of unique values
 * @param {Array} arr2 - An ordered Array of unique values
 *
 * @returns {Array[]} The Array of instructions
 */
exports.generate = (arr1, arr2) => {
  const steps = []
  const tracer = Array.from(arr1)

  for (var i = 0, n = arr1.length + 1; i < n; i++) {
    const move = tracer.reduce(function (acc, val, i) {
      if (Math.abs(i - arr2.indexOf(val)) > Math.abs(acc[0] - acc[1])) {
        return [i, arr2.indexOf(val)]
      } else {
        return acc
      }
    }, [0, 0])

    if (!move[0] && !move[1]) {
      break
    }

    steps.push([move[0], move[1]])
    tracer.splice(move[1], 0, tracer.splice(move[0], 1)[0])
  }

  return steps
}

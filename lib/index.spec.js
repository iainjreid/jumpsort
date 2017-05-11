'use strict'

// Dependencies
const expect = require('chai').expect
const jumpsort = require('../')

describe('Statically written tests for "apply" method:', () => {
  it('should have an arity of two', () => {
    jumpsort.apply.length === 2
  })

  it('should correctly execute the sorting instructions [0 instructions]', () => {
    const arr = [0, 1, 2, 3, 4, 5]
    const instructions = []

    jumpsort.apply(arr, instructions)

    expect(arr).to.deep.equal([0, 1, 2, 3, 4, 5])
  })

  it('should correctly execute the sorting instructions [1 instructions]', () => {
    const arr = [0, 1, 2, 3, 4, 5]
    const instructions = [[0, 4]]

    jumpsort.apply(arr, instructions)

    expect(arr).to.deep.equal([1, 2, 3, 4, 0, 5])
  })

  it('should correctly execute the sorting instructions [2 instructions]', () => {
    const arr = [0, 1, 2, 3, 4, 5]
    const instructions = [[5, 2], [1, 3]]

    jumpsort.apply(arr, instructions)

    expect(arr).to.deep.equal([0, 5, 2, 1, 3, 4])
  })

  it('should correctly execute the sorting instructions [3 instructions]', () => {
    const arr = [0, 1, 2, 3, 4, 5]
    const instructions = [[4, 1], [1, 2], [5, 0]]

    jumpsort.apply(arr, instructions)

    expect(arr).to.deep.equal([5, 0, 1, 4, 2, 3])
  })

  it('should correctly execute the sorting instructions [4 instructions]', () => {
    const arr = [0, 1, 2, 3, 4, 5]
    const instructions = [[4, 5], [3, 2], [5, 2], [1, 0]]

    jumpsort.apply(arr, instructions)

    expect(arr).to.deep.equal([1, 0, 4, 3, 2, 5])
  })

  it('should correctly execute the sorting instructions [5 instructions]', () => {
    const arr = [0, 1, 2, 3, 4, 5]
    const instructions = [[3, 0], [1, 5], [4, 1], [0, 5], [1, 3]]

    jumpsort.apply(arr, instructions)

    expect(arr).to.deep.equal([5, 2, 4, 1, 0, 3])
  })

  it('should correctly execute the sorting instructions [6 instructions]', () => {
    const arr = [0, 1, 2, 3, 4, 5]
    const instructions = [[5, 2], [1, 4], [2, 0], [3, 5], [2, 3], [1, 0]]

    jumpsort.apply(arr, instructions)

    expect(arr).to.deep.equal([0, 2, 1, 5, 4, 3])
  })
})

describe('Statically written tests for "generate" method:', () => {
  it('should have an arity of two', () => {
    jumpsort.generate.length === 2
  })

  it('should correctly generate the sorting instructions [0 instructions]', () => {
    const arr1 = [0, 1, 2, 3, 4, 5]
    const arr2 = [0, 1, 2, 3, 4, 5]

    expect(jumpsort.generate(arr1, arr2)).to.deep.equal([])
  })

  it('should correctly generate the sorting instructions [1 instructions]', () => {
    const arr1 = [0, 1, 2, 3, 4, 5]
    const arr2 = [0, 1, 3, 2, 4, 5]

    expect(jumpsort.generate(arr1, arr2)).to.deep.equal([[2, 3]])
  })

  it('should correctly generate the sorting instructions [2 instructions]', () => {
    const arr1 = [0, 1, 2, 3, 4, 5]
    const arr2 = [0, 4, 1, 2, 5, 3]

    expect(jumpsort.generate(arr1, arr2)).to.deep.equal([[4, 1], [4, 5]])
  })

  it('should correctly generate the sorting instructions [3 instructions]', () => {
    const arr1 = [0, 1, 2, 3, 4, 5]
    const arr2 = [4, 5, 0, 2, 1, 3]

    expect(jumpsort.generate(arr1, arr2)).to.deep.equal([[4, 0], [5, 1], [3, 4]])
  })

  it('should correctly generate the sorting instructions [4 instructions]', () => {
    const arr1 = [0, 1, 2, 3, 4, 5]
    const arr2 = [0, 3, 5, 2, 4, 1]

    expect(jumpsort.generate(arr1, arr2)).to.deep.equal([[1, 5], [1, 3], [2, 4], [2, 3]])
  })

  it('should correctly generate the sorting instructions [5 instructions]', () => {
    const arr1 = [0, 1, 2, 3, 4, 5]
    const arr2 = [5, 3, 1, 4, 0, 2]

    expect(jumpsort.generate(arr1, arr2)).to.deep.equal([[5, 0], [1, 4], [2, 5], [1, 2], [3, 4]])
  })

  it('should correctly generate the sorting instructions [6 instructions]', () => {
    const arr1 = [0, 1, 2, 3, 4, 5]
    const arr2 = [4, 2, 5, 3, 0, 1]

    expect(jumpsort.generate(arr1, arr2)).to.deep.equal([[0, 4], [0, 5], [1, 3], [2, 4], [0, 1], [2, 3]])
  })
});

describe('Dynamically generated tests:', () => {
  let i = 0

  while (++i < 100) {
    const arr1 = shuffle([0, 1, 2, 3, 4, 5])
    const arr2 = shuffle([0, 1, 2, 3, 4, 5])

    if (arr1.some((x, i) => arr2[i] === x)) {
      i--
    } else {
      it(`for [${arr1.toString()}] and [${arr2.toString()}] should generate and apply the sorting instructions correctly`, () => {
        let instructions = jumpsort.generate(arr1, arr2)

        expect(instructions).to.have.length.above(0)
        expect(instructions).to.have.length.below(8)

        jumpsort.apply(arr1, instructions)

        expect(arr1).to.deep.equal(arr2)
      })
    }
  }
})

function shuffle(arr) {
  let i = 0, n = arr.length, x

  while (++i < n) {
    x = Math.floor(Math.random() * i);
    [arr[i], arr[x]] = [arr[x], arr[i]]
  }

  return arr;
}

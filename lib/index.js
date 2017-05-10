'use strict';

exports.apply = (arr, moves) => {
  for (var [from, to] of instructions) {
    arr.splice(to, 0, arr.splice(from, 1)[0])
  }

  return arr
}

exports.generate = (arr1, arr2) => {
  var moves = []
  var tracker = Array.from(arr1)

  for (var i = 0, n = arr1.length + 1; i < n; i++) {
    var move = tracker.reduce(function(acc, val, i) {
      var currMove = [i, arr2.indexOf(val)]

      if (Math.abs(currMove[0] - currMove[1]) > Math.abs(acc[0] - acc[1])) {
        return currMove
      } else {
        return acc
      }
    }, [0, 0])

    if (!move[0] && !move[1]) {
      break
    }

    console.log(move);

    moves.push([move[0], move[1]])
    tracker.splice(move[1], 0, tracker.splice(move[0], 1)[0])

    console.log(tracer);
  }

  return moves
}


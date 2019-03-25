const input1 = [
  "(1, 2)",
  "(5, 3)",
  "(3, 1)",
  "(1, 2)",
  "(2, 4)",
  "(1, 6)",
  "(2, 3)",
  "(3, 4)",
  "(5, 6)"
];

const input2 = [
  [1, 2],
  [5, 3],
  [3, 1],
  [1, 2],
  [2, 4],
  [1, 6],
  [2, 3],
  [3, 4],
  [5, 6]
];

var permuteArr = [];
var stoneSet = [];
var output = [];

dominoes(input2);

function dominoes(input) {
  var isFound;

  isFound = findDominoes(input);
  if (!isFound) {
    console.error("No Solution.");
  } else {
    console.log("Found!");
    console.log("output:" + output);
  }
}

function findDominoes(input) {
  if (input.length === 0) {
    return false;
  } else if (input.length === 1) {
    if (input[0][0] !== input[0][1]) {
      return false;
    } else {
      return true;
    }
  }

  permuteArr = permute(input);
  for (let arr of permuteArr) {
    // if there is a valid permutation, then break
    if (checkValid(arr)) {
      // copy array
      output = arr.slice();
      return true;
    }
  }

  return false;
}

function checkValid(arr) {
  // compare the first and the last stone:
  if (arr[0][0] !== arr[arr.length - 1][1]) {
    if (arr[0][0] === arr[arr.length - 1][0]) {
      swap(arr, arr.length - 1);
    } else if (arr[0][1] === arr[arr.length - 1][1]) {
      swap(arr, 0);
    } else if (arr[0][1] === arr[arr.length - 1][0]) {
      swap(arr, arr.length - 1);
      swap(arr, 0);
    } else {
      return false;
    }
  }

  // iterate the stones to find match
  for (let i = 1; i < arr.length; i++) {
    let prev = arr[i - 1];
    let curr = arr[i];

    if (prev[1] === curr[0]) {
      continue;
    } else if (prev[1] === curr[1]) {
      swap(arr, i);
    } else {
      return false;
    }
  }

  return true;
}

function swap(arr, index) {
  var temp = arr[index][0];
  arr[index][0] = arr[index][1];
  arr[index][1] = temp;
}

function permute(arr) {
  var stone;
  for (let i = 0; i < arr.length; i++) {
    // retrieve one stone
    stone = arr.splice(i, 1)[0];
    stoneSet.push(stone);

    if (arr.length === 0) {
      permuteArr.push(stoneSet.slice());
    }

    permute(arr);

    // backtracking:
    arr.splice(i, 0, stone);
    stoneSet.pop();
  }

  return permuteArr;
}

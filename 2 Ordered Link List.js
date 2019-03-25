const arr = [
  { id: 1 },
  { id: 2, before: 1 },
  { id: 3, after: 1 },
  { id: 5, first: true },
  { id: 6, last: true },
  { id: 7, after: 8 },
  { id: 8 },
  { id: 9 }
];

orderedList(arr);

function orderedList(arr) {
  var isFirst = false;
  var isLast = false;
  var firstObj = {};
  var lastObj = {};
  var resultArr = [];

  for (let obj of arr) {
    if (obj.first === true && isFirst === true) {
      console.error("No Solution.");
      return;
    } else if (obj.first === true && isFirst === false) {
      firstObj = obj;
      isFirst = true;
    }
    if (obj.last === true && isLast === true) {
      console.error("No Solution.");
      return;
    } else if (obj.last === true && isLast === false) {
      lastObj = obj;
      isLast = true;
    }
    if (!obj.before && !obj.after && !obj.last && !obj.first) {
      let isPush = false;
      for (let resultObj of resultArr) {
        if (resultObj.id === obj.id) {
          isPush = true;
          break;
        }
      }
      if (!isPush) {
        resultArr.push(obj);
      }
    }
    if (obj.before) {
      let beforeId = obj.before;
      for (let arrObj of arr) {
        if (arrObj.id === beforeId) {
          let index = 0;
          let isPush = false;
          for (let resultObj of resultArr) {
            if (resultObj.id === beforeId) {
              resultArr.splice(index, 0, obj);
              isPush = true;
              break;
            }
            index++;
          }
          if (!isPush) {
            resultArr.push(obj, arrObj);
          }
          break;
        }
      }
    }
    if (obj.after) {
      let afterId = obj.after;
      for (let arrObj of arr) {
        if (arrObj.id === afterId) {
          let index = 0;
          let isPush = false;
          for (let resultObj of resultArr) {
            if (resultObj.id === afterId) {
              resultArr.splice(index + 1, 0, obj);
              isPush = true;
              break;
            }
            index++;
          }
          if (!isPush) {
            resultArr.push(arrObj, obj);
          }
          break;
        }
      }
    }
  }
  resultArr.unshift(firstObj);
  resultArr.push(lastObj);

  console.log(resultArr);
}

function createTree(arr) {
  var tree = [];
  var nodeSet = {};
  for (let obj of arr) {
    nodeSet[obj["id"]] = obj;
    // init children arr
    obj["children"] = [];
  }
  // console.log(nodeSet);

  for (let obj of arr) {
    if (obj["parentId"] != null) {
      if (!nodeSet[obj["parentId"]]) {
        console.error("Error. No Solution.");
        return;
      } else {
        nodeSet[obj["parentId"]]["children"].push(obj);
      }
    } else {
      tree.push(obj);
    }
  }

  console.log(tree);
}

const arr = [
  { id: 1, name: "i1" },
  { id: 2, name: "i2", parentId: 1 },
  { id: 4, name: "i4", parentId: 3 },
  { id: 3, name: "i3", parentId: 2 },
  { id: 8, name: "i8", parentId: 7 }
];

createTree(arr);

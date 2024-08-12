
let index = 0;
loadNodes2();

function getData() {
  let data = localStorage.getItem("tree_data");

  try {
    if (!data)
      data = {
        root: {
          parent: null,
          id: "root",
          child: [],
          value: "ROOT",
        },
      };
    else {
      data = JSON.parse(data);
    }
  } catch {
    return {
      root: {
        parent: null,
        id: "root",
        child: [],
        value: "ROOT",
      },
    };
  }

  return data;
}

function loadNodes2() {
  const treeData = getData();

  for (let node in treeData){
    if (+treeData[node].id > index){
      index = +treeData[node].id
    }
  }

  const queue = [];
  queue.push("root");

  while (queue.length > 0) {
    const nodeId = queue.shift();
    const node = document.getElementById(nodeId);

    for (let i = 0; i < treeData[nodeId].child.length; i++) {
      queue.push(treeData[nodeId].child[i]);
    }

    if (node) continue;

    const parentNode = document.getElementById(treeData[nodeId].parent);
    if (!parentNode) delete treeData[nodeId]

    if (parentNode.getElementsByTagName("ul").length === 0) {
      parentNode.insertAdjacentHTML(
        "beforeend",
        `
                <ul></ul>
            `
      );
    }
    parentNode.getElementsByTagName("ul")[0].insertAdjacentHTML(
      "beforeend",
      `
        <li id="${nodeId}" class="node">
            <span>${treeData[nodeId].value} ::  (id=${nodeId})
                <div class="options">
                    <button onclick="addNode(event)">Add</button>
                    <button onclick="removeNode(event)">Remove</button>
                    <button onclick="moveNode(event)">Move</button>
                  <button onclick="mergeNode(event)">Merge</button>
                </div>
            </span>
        </li>
        `
    );
  }
}

function mergeNode(event) {
  const treeData = getData();

  const node = event.target.closest(".node");
  const nodeId = node.id;

  const targetNodeId = prompt("Enter target node id: ", "0");
  const targetNodeData = treeData[targetNodeId];

  if (!targetNodeData) return;
  
  let traverseNode = treeData[targetNodeId];

  while (traverseNode && traverseNode.id !== nodeId) {
    traverseNode = treeData[traverseNode.parent];
  }

  if (traverseNode && traverseNode.id === nodeId) return;

  if (nodeId !== "root") node.remove();
  else return;

  const nodeParentData = treeData[treeData[nodeId].parent];
  const childIndex = nodeParentData.child.indexOf(nodeId);
  nodeParentData.child.splice(childIndex, 1);

  treeData[nodeId].child.forEach((child) => {
    targetNodeData.child.push(child);
    treeData[child].parent = targetNodeId;
  });

  delete treeData[nodeId];

  const targetElement = document.getElementById(targetNodeId);
  node.getElementsByTagName("span")[0].remove();

  if (targetElement.getElementsByTagName("ul").length === 0) {
    targetElement.insertAdjacentHTML("beforeend", "<ul></ul>");
  }
  targetElement
    .getElementsByTagName("ul")[0]
    .insertAdjacentHTML("beforeend", node.innerHTML);

  localStorage.setItem("tree_data", JSON.stringify(treeData));
}

function addNode(event) {
  const treeData = getData();
  const currentNode = event.target.closest(".node");
  const id = "" + ++index;
  treeData[currentNode.id].child.push(id);
  const value = prompt("Enter node value: ", "NOTHING");
  let newElement = `
    <li id="${id}" class="node">
        <span>${value} ::  (id=${id})
            <div class="options">
                <button onclick="addNode(event)">Add</button>
                <button onclick="removeNode(event)">Remove</button>
                <button onclick="moveNode(event)">Move</button>
                <button onclick="mergeNode(event)">Merge</button>
            </div>
        </span>
    </li>
    `;
  if (currentNode.getElementsByTagName("ul").length == 0) {
    let childrenContainer = document.createElement("ul");
    childrenContainer.insertAdjacentHTML("beforeend", newElement);
    currentNode.insertAdjacentElement("beforeend", childrenContainer);
  } else {
    currentNode
      .getElementsByTagName("ul")[0]
      .insertAdjacentHTML("beforeend", newElement);
  }

  treeData[id] = {
    parent: currentNode.id,
    child: [],
    id,
    value,
  };

  localStorage.setItem("tree_data", JSON.stringify(treeData));
}

function removeNode(event) {
  const node = event.target.closest(".node");
  const nodeId = node.id;
  const treeData = getData();

  if (node.id === "root") {
    node.getElementsByTagName("ul")[0].remove();
  } else {
    node.remove();
    const parentNode = treeData[treeData[nodeId].parent].child;
    const childIndex = parentNode.indexOf(nodeId);
    parentNode.splice(childIndex, 1);
  }

  const queue = [];
  queue.push(...treeData[nodeId].child);
  treeData[nodeId].child = [];

  while (queue.length > 0) {
    const queueNode = queue.shift();
    queue.push(...treeData[queueNode].child);
    treeData[queueNode].child = [];

    delete treeData[queueNode];
  }

  if (nodeId !== "root") {
    delete treeData[nodeId];
  }

  localStorage.setItem("tree_data", JSON.stringify(treeData));
}

function moveNode(event) {
  const treeData = getData();

  const node = event.target.closest(".node");
  const nodeId = node.id;

  const targetNodeId = prompt("Enter target node id: ", 0);
  const targetNode = document.getElementById(targetNodeId);

  if (!targetNode) return;

  const oldParentId = treeData[nodeId].parent;
  const oldParentData = treeData[oldParentId];
  const childIndex = oldParentData.child.indexOf(nodeId);
  oldParentData.child.splice(childIndex, 1);

  treeData[nodeId].parent = targetNodeId;
  let traverseNode = treeData[targetNodeId];

  while (traverseNode && traverseNode.id !== nodeId) {
    traverseNode = treeData[traverseNode.parent];
  }

  if (traverseNode && traverseNode.id === nodeId) return;

  if (targetNode.getElementsByTagName("ul").length === 0)
    targetNode.insertAdjacentHTML("beforeend", `<ul></ul>`);
  targetNode
    .getElementsByTagName("ul")[0]
    .insertAdjacentHTML("beforeend", node.outerHTML);
  node.remove();

  treeData[targetNodeId].child.push(nodeId);

  localStorage.setItem("tree_data", JSON.stringify(treeData));
}

async function fetchData(){
  const result = await fetch('http://localhost:3000/get', {
    method: 'GET',
  })
  .then(response => response.json())
  .catch(error => console.log(error))
}




let index = 0;
loadNodes2();

function getData() {
  let data = localStorage.getItem("tree_data");

  try {
    if (!data) data = [];
    else {
      data = JSON.parse(data);
    }
  } catch {
    data = [];
  }

  return data;
}

const minHeapSort = () => {
  const a = getData()
  let length = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;

    if (left < length && a[left].value > a[max].value) max = left;
    if (right < length && a[right].value > a[max].value) max = right;
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      heapify(a, max);
    }
  };
  
  for (let i = Math.floor(length / 2); i >= 0; i -= 1) heapify(a, i);
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    length--;
    heapify(a, 0);
  }
  
  console.log(a);
  loadNodes2(a)
};

const maxHeapSort = () => {
  const a = getData()
  let length = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < length && a[left].value < a[max].value) max = left;
    if (right < length && a[right].value < a[max].value) max = right;
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      heapify(a, max);
    }
  };

  for (let i = Math.floor(length / 2); i >= 0; i--) heapify(a, i);
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    length--;
    heapify(a, 0);
  }
  
  console.log(a);
  loadNodes2(a)
};

function clearData() {
  localStorage.clear("tree_data");
  location.reload();
}

document.getElementById("form").addEventListener("submit", addFormField);
function addFormField(event) {
  event.preventDefault();

  const value = event.target.add.value;
  const treeData = getData();

  treeData.push({
    id: ++index,
    value: +value
  });

  localStorage.setItem("tree_data", JSON.stringify(treeData));
  location.reload();
}

function loadNodes2(data) {
  let treeData = getData();

  if (data) {
    document.getElementById("tree").innerHTML = "";
    treeData = data;
  }

  if (!treeData.length) return;
  let rootData = treeData[0];

  document.getElementById("tree").insertAdjacentHTML(
    "beforeend",
    `
  <li id="${rootData.id}" class="node">
    <span>${rootData.value} :: (id=${rootData.id})  
        <div class="options">
          </div>
    </span>
  </li>
  `
  );

  let tempIndex = 0;
  for (let item of treeData) {
    if (tempIndex === 0) {
      tempIndex++;
      continue;
    }

    const parentIndex = Math.floor((tempIndex - 1) / 2);
    const parentNode = document.getElementById(treeData[parentIndex].id);

    if (!parentNode) {
      tempIndex++;
      continue;
    }

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
        <li id="${item.id}" class="node">
            <span>${item.value} ::  (id=${item.id})
                <div class="options">
                </div>
            </span>
        </li>
        `
    );

    tempIndex++;
  }

  index = tempIndex;
}
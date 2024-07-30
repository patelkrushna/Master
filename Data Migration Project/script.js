let srcAuth = "HTK17gXd7WjPv9PoudfPPw";
let alias = "rapidops-685805985029970927.myfreshworks.com/crm/sales";

let domain = alias.slice(0, alias.length - 10);

const linkname = "rapidops54.salesmate.io";
const url = `https://${linkname}/apis/module/v4/fields/all-visible-fields`;
const accessToken = "b5e5c290-e03b-11ee-84f7-a1320719413f";

const srcData = {},
  destData = {};
const srcFieldName = {},
  destFieldName = {};
const moduleMapAuto = new Map([
  ["company", "organization"],
  ["contact", "person"],
  ["deal", "deal"],
  ["product", "product"],
  ["task", "activity"],
]);
const mapping = {};

async function getDestFields() {
  let meta = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-linkname": linkname,
      accessToken: accessToken,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
  if (meta) {
    for (let module in meta.Data) {
      destFieldName[module] = [];
      destData[module] = meta.Data[module].filter((elem) => {
        if (!elem.isSystem) {
          destFieldName[module].push([
            elem.fieldName,
            elem.displayName,
            elem.type,
          ]);
          return true;
        }
      });
    }
    // console.log(destData);
  }
}

const apiKeyPipedrive = "1a443e17358997a9c38a2bcfdc8e106ee129c9e0";
const apiUrlPipedrive = "https://api.pipedrive.com/v1";

async function fetchVisibleFields(moduleType) {
  const response = await fetch(
    `${apiUrlPipedrive}/${moduleType}Fields?api_token=${apiKeyPipedrive}`
  );
  const module = await response.json();
  if (module) {
    srcFieldName[moduleType] = [];
    srcData[moduleType] = module.data;
    srcData[moduleType].forEach((elem) =>
      srcFieldName[moduleType].push([elem.key, elem.name])
    );
  }
  return module;
}

async function getSrcFields() {
  const modules = ["deal", "person", "organization", "activity", "product"];
  const visibleFieldsPipedrive = {};

  for (const moduleType of modules) {
    visibleFieldsPipedrive[moduleType] = await fetchVisibleFields(moduleType);
  }
  //   console.log(srcData);
}

Promise.all([getSrcFields(), getDestFields()]).then((res) => {
  console.log(srcFieldName);
  console.log(destFieldName);
  console.log(destData);
  console.log(srcData);
  const tHead = document.getElementById("tableHead");
  let tempElem = document.createElement("tbody");
  for (let field of srcFieldName["person"]) {
    const row = document.createElement("tr");
    const col1 = document.createElement("td");
    col1.scope = "col";
    // console.log(field);
    col1.innerHTML = field[1];
    const col2 = document.createElement("td");
    const select = document.createElement("select");
    select.addEventListener("change", (event) => {
      let selectedField = event.target.value;
      console.log(event.target.value);
    });
    for (let destField of destFieldName["contact"]) {
      let option = new Option(destField[1], destField[1]);
      select.append(option);
    }
    col2.scope = "col";
    col2.append(select);
    row.append(col1, col2);
    tempElem.append(row);
  }
  tHead.after(tempElem);
});

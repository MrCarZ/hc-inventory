const load = () => {
  itemsData = JSON.parse(localStorage.getItem("items-data"));
  if (itemsData !== null) {
    const tbody = document.getElementById("items-table").children[0];
    itemsData.map((value) => {
      tbody.appendChild(generateTableRow(value));
    });
  }

  customersData = JSON.parse(localStorage.getItem("customers-data"));
  if (customersData !== null) {
    const tbody = document.getElementById("customer-table").children[0];
    customersData.map((value) => {
      tbody.appendChild(generateTableRow(value));
    });
  }
};

const generateHTMLElement = (tag, atributes) => {
  const newElement = document.createElement(tag);
  const properties = Object.getOwnPropertyNames(atributes);
  properties.map((value) => {
    newElement[`${value}`] = atributes[`${value}`];
  });
  return newElement;
};

const generateTableRow = (data) => {
  const newRow = document.createElement("tr");

  const rowInformations = Object.getOwnPropertyNames(data);

  rowInformations.map((value) => {
    const newInformation = document.createElement("td");
    newInformation.innerText = data[`${value}`];
    newRow.appendChild(newInformation);
  });

  // Delete Button
  const newInformation = document.createElement("td");
  const newDelete = generateHTMLElement("button", {
    id: data[rowInformations[0]],
    className: "trash-button glyphicon glyphicon-trash",
    onclick: () => deleteTask(newDelete.id),
  });
  newInformation.appendChild(newDelete);
  newRow.appendChild(newInformation);

  return newRow;
};

const deleteTask = (id) => {
  const dataToChange = id[0] == "c" ? "customers-data" : "items-data";
  var tableData = JSON.parse(localStorage.getItem(dataToChange));
  tableData = tableData.filter((value) => {
    console.log(value);
    if (value.id !== id) {
      return true;
    }
    return false;
  });

  localStorage.setItem(dataToChange, JSON.stringify(tableData));

  const button = document.getElementById(id);
  button.parentElement.parentElement.remove();
};

const handleRowCreate = (tableId) => {
  const tbody = document.getElementById(tableId).children[0];
  var data = {};
  if (tableId == "customer-table") {
    var localData =
      JSON.parse(localStorage.getItem("customers-data")) === null
        ? []
        : JSON.parse(localStorage.getItem("customers-data"));
    const currentData = localData.length;
    data = {
      id: "c" + currentData,
      customerName: document.getElementById("customer-name").value,
      customerBirthdate: document.getElementById("customer-birthdate").value,
      customerTelephone: document.getElementById("customer-telephone").value,
    };
    if(data.customerName == "" || data.customerBirthdate == "" || data.customerTelephone == ""){
      alert('You must fill all the forms with valid information!');
      return;
    }
    localData.push(data);
    localStorage.setItem("customers-data", JSON.stringify(localData));
  } else if (tableId == "items-table") {
    var localData =
      JSON.parse(localStorage.getItem("items-data")) == null
        ? []
        : JSON.parse(localStorage.getItem("items-data"));
    const currentData = localData.length;
    data = {
      id: "i" + currentData,
      itemName: document.getElementById("item-name").value,
      itemPrice: document.getElementById("item-price").value,
      itemQuantity: document.getElementById("item-quantity").value,
    };
    if(data.itemName == "" || data.itemPrice == "" || data.itemQuantity == ""){
      alert('You must fill all the forms with valid information!');
      return;
    }
    localData.push(data);
    localStorage.setItem("items-data", JSON.stringify(localData));
  }

  const tableRow = generateTableRow(data);
  tbody.appendChild(tableRow);
};

const handleShowHide = (tableId) => {
  const table = document.getElementById(tableId);
  table.style.display = table.style.display == "none" ? "inline-block" : "none";
};

const handlePopup = (id) => {
  document.getElementById("popup").style.display = "block";
  document.getElementById(id).style.display = "block";
};

const closeForm = () => {
  document.getElementById("popup").style.display = "none";
  document.getElementById("items-popup").style.display = "none";
  document.getElementById("customer-popup").style.display = "none";
};

window.onclick = (event) => {
  popup = document.getElementById("popup");
  console.log(event.target);
  if (event.target == popup) {
    popup.style.display = "none";
  }
}
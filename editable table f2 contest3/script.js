const addNewButton = document.getElementById("add-new");
const tableBody = document.getElementById("table-body");

// Event Listeners
addNewButton.addEventListener("click", addNewRow);
tableBody.addEventListener("input", validateInput);
tableBody.addEventListener("click", handleSaveButtonClick);

// Variables
let tableData = [];

// Functions
function addNewRow() {
  const newRow = `
    <tr>
      <td class="id"></td>
      <td><input type="text" name="student_name" /></td>
      <td><input type="text" name="student_roll" /></td>
      <td><input type="text" name="subject" /></td>
      <td><input type="text" name="marks" /></td>
      <td><input type="text" name="markedBy" /></td>
      <td class="save-col"><button class="save-btn">Save</button></td>
    </tr>
  `;
  tableBody.insertAdjacentHTML("beforeend", newRow);
  updateRowIds();
}

function updateRowIds() {
  const rows = tableBody.querySelectorAll("tr");
  rows.forEach((row, index) => {
    const idCell = row.querySelector(".id");
    if (idCell) {
      idCell.textContent = index + 1;
    }
  });
}

function handleSaveButtonClick(event) {
  const saveButton = event.target.closest(".save-btn");
  if (saveButton) {
    const row = saveButton.closest("tr");
    saveTableRow(row);
  }
}

function saveTableRow(row) {
  const inputs = row.querySelectorAll("input[type='text']");
  const rowData = {};
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value) {
      input.classList.add("error");
      const errorMessage = input.nextElementSibling;
      errorMessage.textContent = "This field is required";
      isValid = false;
    } else {
      input.classList.remove("error");
      const errorMessage = input.nextElementSibling;
      errorMessage.textContent = "";
      rowData[input.name] = input.value;
    }
  });

  const marksInput = row.querySelector("input[name='marks']");
  if (marksInput && isNaN(marksInput.value)) {
    marksInput.classList.add("error");
    const errorMessage = marksInput.nextElementSibling;
    errorMessage.textContent = "This field should be a number";
    isValid = false;
  }

  const markedByInput = row.querySelector("input[name='markedBy']");
  if (markedByInput && !markedByInput.value) {
    markedByInput.classList.add("error");
    const errorMessage = markedByInput.nextElementSibling;
    errorMessage.textContent = "This field is required";
    isValid = false;
  }

  if (isValid) {
    tableData.push(rowData);
    updateRowIds();
  }
}

function validateInput(event) {
  const input = event.target;
  if (input.tagName === "INPUT" && input.type === "text") {
    if (!input.value) {
      input.classList.add("error");
      const errorMessage = input.nextElementSibling;
      errorMessage.textContent = "This field is required";
    } else {
      input.classList.remove("error");
      const errorMessage = input.nextElementSibling;
      errorMessage.textContent = "";
    }
  }
}

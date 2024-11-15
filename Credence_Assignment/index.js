var ID = 0;
var editID = null;  // Variable to hold the ID of the employee being edited

function SaveData() {
    var Name = document.getElementById("empname").value.trim();
    var Designation = document.getElementById("empdesignation").value.trim();
    var JoiningDate = document.getElementById("empjoiningdate").value.trim();
    var Age = document.getElementById("empAge").value.trim();

    if (Name == "" || Designation == "" || JoiningDate == "" || Age == "") {
        alert("Please Fill all Details.")
        return;
    }

    var Date = JoiningDate.split("-");
    var FormattedDate = Date[2] + "-" + Date[1] + "-" + Date[0];

    const newEmployee = {
        id: ID + 1,
        name: Name,
        age: Age,
        designation: Designation,
        joiningDate: FormattedDate
    };

    if (editID !== null) {
        newEmployee.id = editID;
        updateEmployee(newEmployee);
    } else {
        addEmployee(newEmployee);
    }
}

function getDataFromLocalStorage() {
    const storedData = localStorage.getItem('data');
    return storedData ? JSON.parse(storedData) : [];
}

function addEmployee(employee) {
    const employees = getDataFromLocalStorage();
    employees.push(employee);
    localStorage.setItem('data', JSON.stringify(employees));

    alert("Data Saved successfully!!!!")
    var AddData = document.getElementById("AddData");
    AddData.classList.add("d-none");
    var AddNew = document.getElementById("AddNew");
    AddNew.classList.remove("d-none");

    ClearData();
    RefreshData();
}

function updateEmployee(employee) {
    let employees = getDataFromLocalStorage();
    employees = employees.map(emp => emp.id === employee.id ? employee : emp);
    localStorage.setItem('data', JSON.stringify(employees));

    alert("Data Updated successfully!!!!");
    var AddData = document.getElementById("AddData");
    AddData.classList.add("d-none");
    var AddNew = document.getElementById("AddNew");
    AddNew.classList.remove("d-none");

    ClearData();
    RefreshData();

    // Reset the editID to null after updating
    editID = null;
}

function ClearData() {
    var Name = document.getElementById("empname");
    Name.value = "";
    var Designation = document.getElementById("empdesignation");
    Designation.value = "";
    var JoiningDate = document.getElementById("empjoiningdate");
    JoiningDate.value = "";
    var Age = document.getElementById("empAge");
    Age.value = "";
}

function CancelData() {
    ClearData();
    var AddData = document.getElementById("AddData");
    AddData.classList.add("d-none");
    var AddNew = document.getElementById("AddNew");
    AddNew.classList.remove("d-none");
}

function RefreshData() {
    const employees = getDataFromLocalStorage();
    const tableBody = document.querySelector('#emptable tbody');
    tableBody.innerHTML = '';

    employees.forEach(employee => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', employee.id);

        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.age}</td>
            <td>${employee.designation}</td>
            <td>${employee.joiningDate}</td>
            <td>
                <button type="button" class="btn btn-danger" onclick="DeleteData(${employee.id})">Delete</button>
                <button type="button" class="btn btn-warning" onclick="EditData(${employee.id})">Edit</button>
            </td>
        `;
        tableBody.appendChild(row);

        ID = employee.id;
    });
}

function DeleteData(id) {
    let employees = getDataFromLocalStorage();
    employees = employees.filter(employee => employee.id !== id);
    localStorage.setItem('data', JSON.stringify(employees));

    alert("Record Deleted!!!!")
    RefreshData();
}

function EditData(id) {
    const employees = getDataFromLocalStorage();
    const employeeToEdit = employees.find(emp => emp.id === id);

    // Set the form fields with employee data
    document.getElementById("empname").value = employeeToEdit.name;
    document.getElementById("empdesignation").value = employeeToEdit.designation;
    document.getElementById("empjoiningdate").value = employeeToEdit.joiningDate.split("-").reverse().join("-");
    document.getElementById("empAge").value = employeeToEdit.age;

    // Set the editID to the current employee's ID
    editID = id;

    var AddData = document.getElementById("AddData");
    AddData.classList.remove("d-none");

    var AddNew = document.getElementById("AddNew");
    AddNew.classList.add("d-none");
}

function AddNew() {
    var AddData = document.getElementById("AddData");
    AddData.classList.remove("d-none");

    var AddNew = document.getElementById("AddNew");
    AddNew.classList.add("d-none");
}

RefreshData();


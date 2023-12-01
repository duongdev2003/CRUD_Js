var selectedRow = null;

/* Show Alerts */
const showAlert = (message, className) => {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
};

/* Clear All Fields */
const clearFields = () => {
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#age").value = "";
};

/* Add Data */
document.querySelector("#student-form").addEventListener("submit", (e) => {
    e.preventDefault();

    //Get Form Values
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const email = document.querySelector("#email").value;
    const age = document.querySelector("#age").value;

    //Validate
    if (firstName == "" || lastName == "" || email == "" || age == "") {
        showAlert("Please fill in all fields", "danger");
    } else {
        if (selectedRow == null) {
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${email}</td>
            <td>${age}</td>
            <td>
                <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            </td>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Student Added", "success");
        } else {
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = email;
            selectedRow.children[3].textContent = age;
            selectedRow = null;
            showAlert("Student Info Edited", "info");
        }
        clearFields();
    }
});

/* Edit Data */
document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("edit")) {
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastName").value = selectedRow.children[1].textContent;
        document.querySelector("#email").value = selectedRow.children[3].textContent;
        document.querySelector("#age").value = selectedRow.children[4].textContent;
    }
});

/* Delete Data */
document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("delete")) {
        target.parentElement.parentElement.remove();
        showAlert("Student Data Delete", "danger");
    }
});

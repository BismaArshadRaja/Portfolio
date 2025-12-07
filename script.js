
const formBox = document.getElementById("formfiller");
const inputs = document.querySelectorAll("#formfiller input");
const submitBtn = document.getElementById("subbtn");

document.getElementById("open").addEventListener("click", function () {
resetForm();
formBox.style.display = "block";
//sab add kero 
 submitBtn.innerText = "Submit";  
});

//close the form
document.getElementById("close").addEventListener("click", function () {
    formBox.style.display = "none";
});

//increment in sr.no 
let counter = document.querySelectorAll("#tableBody tr").length + 1;


let editingRow = null;


function resetForm() {
    inputs.forEach(input => (input.value = ""));
    editingRow = null;
}

//plz fill all fields
submitBtn.addEventListener("click", function () {
    const name = inputs[0].value;
    const email = inputs[1].value;
    const phone = inputs[2].value;
    const age = inputs[3].value;
    const city = inputs[4].value;

    if ([name, email, phone, age, city].includes("")) {
        alert("Please fill all fields!");
        return;
    }

    // whatever u want to update
    if (editingRow) {
        editingRow.cells[1].innerText = name;
        editingRow.cells[2].innerText = email;
        editingRow.cells[3].innerText = phone;
        editingRow.cells[4].innerText = age;
        editingRow.cells[5].innerText = city;

        formBox.style.display = "none";
        resetForm();
        return;
    }

    // new dtaa save kary ga or add kary ga pori row
    const tableBody = document.getElementById("tableBody");
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${counter}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${age}</td>
        <td>${city}</td>
        <td class="triobtns">
            <button class="blue view"><i class="fa-regular fa-eye"></i></button>
            <button class="yellow edit"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="red delete"><i class="fa-solid fa-trash-can"></i></button>
        </td>
    `;

    tableBody.appendChild(tr);
    counter++;
    formBox.style.display = "none";
    resetForm();
});


document.getElementById("tableBody").addEventListener("click", function (e) {
    const btn = e.target.closest("button");
    const row = e.target.closest("tr");

    if (!btn) return;

  //user view of his/her data
    if (btn.classList.contains("view")) {
        alert("Name: " + row.cells[1].innerText +
              "\nEmail: " + row.cells[2].innerText +
              "\nPhone: " + row.cells[3].innerText +
              "\nAge: " + row.cells[4].innerText +
              "\nCity: " + row.cells[5].innerText);
    }

    // dele data u don't want
    if (btn.classList.contains("delete")) {
        row.remove();
    }

  // change u want
    if (btn.classList.contains("edit")) {
        editingRow = row;

        inputs[0].value = row.cells[1].innerText;
        inputs[1].value = row.cells[2].innerText;
        inputs[2].value = row.cells[3].innerText;
        inputs[3].value = row.cells[4].innerText;
        inputs[4].value = row.cells[5].innerText;

        submitBtn.innerText = "Update";
        formBox.style.display = "block";
    }
});

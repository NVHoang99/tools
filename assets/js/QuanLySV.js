let listStudent = new ListStudent();
let btnAddStudent = document.getElementById("btnAddStudent");
let btnSetStorage = document.getElementById("btnSetStorage");
let btnGetStorage = document.getElementById("btnGetStorage");
let btnSaveUpdate =  document.getElementById("btnSaveUpdate");

btnAddStudent.addEventListener("click", addStudent);
btnSetStorage.addEventListener("click", setStorage);
btnGetStorage.addEventListener("click", getStorage);
btnSaveUpdate.addEventListener("click", saveUpdate);

function addStudent() {
    //lay gia tri cac the input
    let masv = getInputValue("masv");
    let hoten = getInputValue("hoten");
    let cmnd = getInputValue("cmnd");
    let sdt = getInputValue("sdt");
    let email = getInputValue("email");
    let diemToan = getInputValue("diemToan");
    let diemLy = getInputValue("diemLy");
    let diemHoa = getInputValue("diemHoa");

    //create a student
    let student = new Student(
        masv,
        hoten,
        email,
        sdt,
        cmnd,
        diemToan,
        diemLy,
        diemHoa
    );
    student.tinhDTB();
    student.xepLoai();
    //add stutent to list
    listStudent.AddStudent(student);

    //render listview
    renderView(listStudent);
}

function setStorage() {
    // convert to JSON
    let jsonListView = JSON.stringify(listStudent.list);
    // save in Storage
    localStorage.setItem("ListStudent", jsonListView);
}

function getStorage() {
    // get json string
    let jsonListView = localStorage.getItem("ListStudent");
    // convert to JS
    let result = JSON.parse(jsonListView);
    // assign result to array
    listStudent.list = result;
    // render listView
    renderView(listStudent);
}

function getInputValue(selector) {
    return document.getElementById(selector).value;
}

function setInputValue(selector, value) {
    document.getElementById(selector).value = value;
}

function renderView(ListStudent) {
    let index = 0;
    let tableRow = "";
    ListStudent.list.forEach((student) => {
        let studentID = index;
        index++;
        tableRow += `<tr>
        <td>${index}</td>
        <td>${student.masv}</td>
        <td>${student.hoten}</td>
        <td>${student.email}</td>
        <td>${student.sdt}</td>
        <td>${student.cmnd}</td>
        <td>${student.diemtoan}</td>
        <td>${student.diemly}</td>
        <td>${student.diemhoa}</td>
        <td>${student.DTB}</td>
        <td>${student.XL}</td>
        <td> <a href="#" onclick="updateStudent(${studentID})"> Sửa </a>  | 
             <a href="#" onclick="deleteStudent(${studentID})"> Xóa </a>  
        </td>
    </tr>`;
    });
    let tableContent = document.querySelector("#tbodySinhVien");
    tableContent.innerHTML = tableRow;
}

function deleteStudent(ID) {
    // get json string
    let jsonListView = localStorage.getItem("ListStudent");
    // convert to JS
    let result = JSON.parse(jsonListView);
    // assign result to array
    listStudent.list = result;
    // delete element of array
    listStudent.DeleteStudent(ID);
    // save in storage
    setStorage();
    // render listView
    renderView(listStudent);
}


var saveID; //global variable for updateStudent()
function updateStudent(ID){
    //render to input tags
    setInputValue("masv", listStudent.list[ID].masv);
    setInputValue("hoten", listStudent.list[ID].hoten);
    setInputValue("email", listStudent.list[ID].email);
    setInputValue("cmnd", listStudent.list[ID].cmnd);
    setInputValue("sdt", listStudent.list[ID].sdt);
    setInputValue("diemToan", listStudent.list[ID].diemtoan);
    setInputValue("diemLy", listStudent.list[ID].diemly);
    setInputValue("diemHoa", listStudent.list[ID].diemhoa);
    saveID = ID;
}

function saveUpdate() {
    //lay gia tri cac the input
    let masv = getInputValue("masv");
    let hoten = getInputValue("hoten");
    let cmnd = getInputValue("cmnd");
    let sdt = getInputValue("sdt");
    let email = getInputValue("email");
    let diemToan = getInputValue("diemToan");
    let diemLy = getInputValue("diemLy");
    let diemHoa = getInputValue("diemHoa");

    //create a student
    let student = new Student(
        masv,
        hoten,
        email,
        sdt,
        cmnd,
        diemToan,
        diemLy,
        diemHoa
    );
    student.tinhDTB();
    student.xepLoai();
    //update stutent to list
    listStudent.UpdateStudent(student, saveID);

    //render listview
    renderView(listStudent);
}

function findStudent() {
    let valueFindInput = getInputValue("timkiem");
    // get json string
    let jsonListView = localStorage.getItem("ListStudent");
    // convert to JS
    let result = JSON.parse(jsonListView);
    // assign result to array
    listStudent.list = result;

    let findResult = listStudent.FindStudent(valueFindInput);
    renderView(findResult);
}

//add method for Student
Student.prototype.DTB = "";
Student.prototype.XL = "";
Student.prototype.tinhDTB = function () {
    this.DTB = parseFloat(
        (this.diemhoa + this.diemtoan + this.diemly) / 3
    ).toFixed(2);
};
Student.prototype.xepLoai = function () {
    if (this.DTB < 5) {
        this.XL = "Yếu";
    } else if (this.DTB >= 8) {
        this.XL = "Giỏi";
    } else if (this.DTB >= 6.5) {
        this.XL = "Khá";
    } else {
        this.XL = "Trung bình";
    }
};

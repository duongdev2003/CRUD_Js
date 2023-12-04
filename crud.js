var selectedRow = null;

/* Show Alerts */
const showAlert = (message, className) => {
    // Tạo một phần tử <div> mới
    const div = document.createElement("div");

    // Đặt tên lớp cho phần tử <div> bằng cách sử dụng chuỗi mẫu
    div.className = `alert alert-${className}`;

    // Thêm một nút văn bản với nội dung được cung cấp vào phần tử <div>
    div.appendChild(document.createTextNode(message));

    // Tìm phần tử có lớp "container" và lưu nó vào biến container
    const container = document.querySelector(".container");

    // Tìm phần tử có lớp "main" và lưu nó vào biến main
    const main = document.querySelector(".main");

    // Chèn phần tử <div> mới tạo vào trước phần tử "main" bên trong "container"
    container.insertBefore(div, main);

    // Đặt một hàm timeout để loại bỏ cảnh báo sau 3000 mili giây (3 giây)
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
};

/* Clear All Fields */
// Lấy các phần tử có id và gán giá trị của nó thành chuỗi rỗng
const clearFields = () => {
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#age").value = "";
};

/* Add Data */
// Thêm một lắng nghe sự kiện submit cho phần tử có id là "student-form"
document.querySelector("#student-form").addEventListener("submit", (e) => {
    // Ngăn chặn hành vi mặc định của sự kiện submit (tránh việc tải lại trang)
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
        // Kiểm tra xem có hàng nào được chọn để chỉnh sửa không
        if (selectedRow == null) {
            // Nếu không có hàng nào được chọn, thực hiện thêm sinh viên mới
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            // Tạo nội dung HTML cho hàng mới bằng cách sử dụng dữ liệu từ biểu mẫu
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

            // Thêm hàng mới vào danh sách (bảng)
            list.appendChild(row);

            // Đặt lại giá trị của selectedRow để báo hiệu rằng không có hàng nào được chọn
            selectedRow = null;

            // Hiển thị thông báo với nội dung "Student Added" và loại "success"
            showAlert("Student Added", "success");
        } else {
            // Nếu có hàng được chọn, thực hiện chỉnh sửa thông tin sinh viên trong hàng đó
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = email;
            selectedRow.children[3].textContent = age;

            // Đặt lại giá trị của selectedRow để báo hiệu rằng không có hàng nào được chọn
            selectedRow = null;

            // Hiển thị thông báo với nội dung "Student Info Edited" và loại "info"
            showAlert("Student Info Edited", "info");
        }

        // Gọi hàm clearFields để làm sạch các trường nhập liệu trong biểu mẫu
        clearFields();
    }
});

/* Edit Data */
// Thêm một lắng nghe sự kiện click cho phần tử có id là "student-list"
document.querySelector("#student-list").addEventListener("click", (e) => {
    // Lấy phần tử mục tiêu đã kích hoạt sự kiện click
    target = e.target;

    // Kiểm tra xem phần tử được click có chứa class "edit" hay không
    if (target.classList.contains("edit")) {
        // Nếu có class "edit", lấy phần tử cha của phần tử được click
        selectedRow = target.parentElement.parentElement;

        // Đặt giá trị của ô input có id "firstName" bằng nội dung văn bản của cột đầu tiên của hàng được chọn
        document.querySelector("#firstName").value =
            selectedRow.children[0].textContent;

        // Đặt giá trị của ô input có id "lastName" bằng nội dung văn bản của cột thứ hai của hàng được chọn
        document.querySelector("#lastName").value =
            selectedRow.children[1].textContent;

        // Đặt giá trị của ô input có id "email" bằng nội dung văn bản của cột thứ tư của hàng được chọn
        document.querySelector("#email").value =
            selectedRow.children[2].textContent;

        // Đặt giá trị của ô input có id "age" bằng nội dung văn bản của cột thứ năm của hàng được chọn
        document.querySelector("#age").value =
            selectedRow.children[3].textContent;
    }
});

/* Delete Data */
// Thêm một lắng nghe sự kiện click cho phần tử có id là "student-list"
document.querySelector("#student-list").addEventListener("click", (e) => {
    // Lấy phần tử mục tiêu đã kích hoạt sự kiện click
    target = e.target;

    // Kiểm tra xem phần tử được click có chứa class "delete" hay không
    if (target.classList.contains("delete")) {
        // Nếu có class "delete", xóa phần tử cha cha của phần tử được click (đây là hàng của sinh viên)
        target.parentElement.parentElement.remove();

        // Gọi hàm showAlert để hiển thị thông báo với nội dung "Student Data Delete" và loại "danger"
        showAlert("Student Data Delete", "danger");
    }
});

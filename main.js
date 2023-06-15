function register(event) {
  event.preventDefault(); // Ngăn chặn việc gửi lại biểu mẫu

  // Lấy giá trị từ các trường nhập liệu
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var repassword = document.getElementById("repassword").value;
  var avatar = document.getElementById("avatar-input").files[0]; // Lấy file avatar đã chọn

  // Kiểm tra xem mật khẩu và mật khẩu xác nhận có khớp nhau hay không
  if (password !== repassword) {
    alert("Mật khẩu xác nhận không khớp!");
    return;
  }

  // Tạo đối tượng người dùng mới
  var user = {
    name: name,
    email: email,
    password: password,
    avatar: null // Khởi tạo avatar ban đầu là null
  };

  if (avatar) {
    var reader = new FileReader();

    reader.onload = function (e) {
      var avatarData = e.target.result;

      // Lưu dữ liệu avatar vào local storage
      localStorage.setItem("avatar", avatarData);
      user.avatar = avatarData; // Cập nhật giá trị avatar trong đối tượng người dùng

      // Lưu thông tin người dùng vào local storage
      localStorage.setItem("user", JSON.stringify(user));

      // Chuyển hướng đến trang đăng nhập
      window.location.href = "login.html";
    };

    reader.readAsDataURL(avatar);
  } else {
    // Lưu thông tin người dùng vào local storage
    localStorage.setItem("user", JSON.stringify(user));

    // Chuyển hướng đến trang đăng nhập
    window.location.href = "login.html";
  }
}



//Login
function login(event) {
  event.preventDefault(); // Ngăn chặn việc gửi lại biểu mẫu

  // Lấy giá trị từ các trường nhập liệu
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // Lấy thông tin người dùng đã đăng ký từ local storage
  var storedUser = localStorage.getItem("user");

  if (storedUser) {
    // Chuyển đổi dữ liệu người dùng thành đối tượng JavaScript
    var user = JSON.parse(storedUser);

    // Kiểm tra tính hợp lệ của email và mật khẩu
    if (email === user.email && password === user.password) {
      alert("Đăng nhập thành công!");
      // Thực hiện các hành động khác sau khi đăng nhập thành công
      window.location.href = "../index.html";
    } else {
      alert("Email hoặc mật khẩu không chính xác!");
    }
  } else {
    alert("Người dùng không tồn tại!");
  }
}

// Kiểm tra xem người dùng đã đăng nhập hay chưa
function checkLoggedIn() {
  var storedUser = localStorage.getItem("user");
  var accountMenu = document.getElementById("accountMenu");
  var registerLink = document.getElementById("registerLink");
  var loginLink = document.getElementById("loginLink");
  var userName = document.getElementById("userName");
  var logoutLink = document.getElementById("logoutLink");

  if (storedUser) {
    var user = JSON.parse(storedUser);
    accountMenu.classList.add("logged-in");
    registerLink.style.display = "none";
    loginLink.style.display = "none";
    userName.style.display = "block";
    userName.getElementsByTagName("span")[0].textContent = user.name;
    logoutLink.style.display = "block";
    userName.addEventListener("click", function () {
      showUserInfo(user);
    });
  } else {
    accountMenu.classList.remove("logged-in");
    registerLink.style.display = "block";
    loginLink.style.display = "block";
    userName.style.display = "none";
    logoutLink.style.display = "none";
  }
}

// Đăng xuất
function logout() {
  localStorage.removeItem("user");
  checkLoggedIn();
}

// Kiểm tra trạng thái đăng nhập khi tải trang
document.addEventListener("DOMContentLoaded", function () {
  checkLoggedIn();
});

// Hiển thị thông tin người dùng
function showUserInfo(user) {
  var userInfoContainer = document.getElementById("userInfo");
  var avatarImg = document.createElement("img");
  avatarImg.src = user.avatar;
  avatarImg.alt = "Avatar";
  avatarImg.classList.add("avatar");
  userInfoContainer.appendChild(avatarImg);

  var nameHeading = document.createElement("h3");
  nameHeading.textContent = "Tên: " + user.name;
  userInfoContainer.appendChild(nameHeading);

  var emailParagraph = document.createElement("p");
  emailParagraph.textContent = "Email: " + user.email;
  userInfoContainer.appendChild(emailParagraph);

  var passwordParagraph = document.createElement("p");
  passwordParagraph.textContent = "Mật khẩu: " + user.password;
  userInfoContainer.appendChild(passwordParagraph);
}


// Slide
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(slideIndex) {
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  } else if (slideIndex >= slides.length) {
    slideIndex = 0;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active');
  }

  slides[slideIndex].classList.add('active');
  currentSlide = slideIndex;
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function previousSlide() {
  showSlide(currentSlide - 1);
}

setInterval(nextSlide, 3000);




// Thêm sản phẩm vào giỏ
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCountElement = document.getElementById('cart-count');
const cartLink = document.getElementById('cart-link');
let cartCount = 0;

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    cartCount++;
    cartCountElement.textContent = cartCount;
  });
});





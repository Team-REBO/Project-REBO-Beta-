// Account
$("#UPDATE").on("submit", function (e) {
  e.preventDefault();
  Swal.fire({
    title: "Bạn chắc chắn không ?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Đồng ý, Lưu thay đổi!",
    preConfirm: update,
  });
});
$("#DELETE").on("submit", function (e) {
  e.preventDefault();
  Swal.fire({
    title: "Bạn chắc chắn không ?",
    text: "Bạn sẽ không thể hoàn nguyên điều này!!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Đồng ý, Xoá!",
    preConfirm: deleted,
  });
});
$("#CHANGE").on("submit", function (e) {
  e.preventDefault();
  Swal.fire({
    title: "Bạn chắc chắn không ?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Đồng ý, Lưu thay đổi!",
    preConfirm: change,
  });
});
var update = function update() {
  $.ajax({
    url: "Update_Account/",
    type: "POST",
    cache: false,
    data: {
      email: $("#EMAIL").val(),
      fullname: $("#FULLNAME").val(),
    },
  })
    .done(function (data) {
      Swal.fire({
        icon: "success",
        title: "OK",
        preConfirm: load,
      });
    })
    .fail(function () {
      Swal.fire({
        icon: "error",
        title: "Incorrect",
      });
    });
};
var deleted = function deleted() {
  $.ajax({
    url: "Delete_Account/",
    type: "GET",
  }).done(function () {
    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Your file has been deleted.",
      preConfirm: toLogin,
    });
  });
};
var change = function change() {
  $.ajax({
    url: "Changes_Pass/",
    type: "POST",
    cache: false,
    dataType: "html",
    data: {
      old: $("#Pass-old").val(),
      new: $("#Pass-new").val(),
      newconfirm: $("#Pass-new-confirm").val(),
    },
  })
    .done(function (data) {
      Swal.fire({
        icon: "success",
        title: "OK",
        preConfirm: toLogin,
      });
    })
    .fail(function () {
      Swal.fire({
        icon: "error",
        title: "Incorrect",
      });
    });
};

//LOGIN AND SINGUP
$("#LOGIN").on("submit", function (e) {
  e.preventDefault();
  $.ajax({
    url: "login/check/",
    type: "POST",
    dataType: "html",
    cache: false,
    data: {
      email: $("#Email").val(),
      pass: $("#Pass").val(),
    },
  })
    .done(function () {
      Swal.fire({
        icon: "success",
        title: "OK",
        preConfirm: toOverview,
      });
    })
    .fail(function (data) {
      if ((data = 404)) {
        Swal.fire({
          icon: "error",
          title: "Password incorect!!!",
        });
      }
      console.log(data);
    });
});

var load = function load() {
  setInterval("location.reload()", 100);
};
var toLogin = function toLogin() {
  window.location = "http://rebo-demo.herokuapp.com/login?";
};
var toOverview = function toOverview() {
  // window.location = "http://localhost:3000/Overview"; only run in local
  window.location = "http://rebo-demo.herokuapp.com/Overview"; // run only heroku
};

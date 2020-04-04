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
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
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
        preConfirm: test,
      });
    })
    .fail(function () {
      Swal.fire({
        icon: "error",
        title: "Incorrect",
      });
    });
};
var load = function load() {
  setInterval("location.reload()", 100);
};
var test = function test() {
  window.location = "http://localhost:3000/login?";
};

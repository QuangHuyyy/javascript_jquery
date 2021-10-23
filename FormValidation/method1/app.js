Validator({
  form: "#form-1",
  errorSelector: ".form-message",
  rules: [
    Validator.isRequired("#fullname"),
    Validator.isRequired("#email"),
    Validator.isEmail("#email"),
    Validator.minLength("#password", 6, `Mật khẩu tối thiếu 6 ký tự!`),
    Validator.isRequired("#password_confirmation"),
    Validator.isConfirmed(
      "#password_confirmation",
      function () {
        return document.querySelector("#form-1 #password").value;
      },
      "Mật khẩu nhập lại không chính xác!"
    ),
  ],
});

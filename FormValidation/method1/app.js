Validator({
  form: "#form-1",
  errorSelector: ".form-message",
  rules: [
    Validator.isRequired("#fullname"),
    Validator.isEmail("#email"),
    Validator.minLength("#password", 6),
  ],
});

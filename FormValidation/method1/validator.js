function Validator(options) {
  var formElement = document.querySelector(options.form);

  function validate(inputElement, errorElement, rule) {
    var errorMessage = rule.test(inputElement.value);

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add("invalid");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("invalid");
    }
  }

  options.rules.forEach(function (rule) {
    if (formElement) {
      var inputElement = formElement.querySelector(rule.selector);
      var errorElement =
        inputElement.parentElement.querySelector(options.errorSelector);

      inputElement.onblur = function () {
        validate(inputElement, errorElement, rule);
      };

      inputElement.oninput = function () {
        errorElement.innerText = "";
        inputElement.parentElement.classList.remove("invalid");
      };
    }
  });
}
Validator.isRequired = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : "Vui lòng nhập trường này!";
    },
  };
};
Validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      const regex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(value) ? undefined : "Email không đúng định dạng!";
    },
  };
};

Validator.minLength = function (selector, min = 6) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min
        ? undefined
        : `Vui lòng nhập tối thiếu ${min} ký tự!`;
    },
  };
};

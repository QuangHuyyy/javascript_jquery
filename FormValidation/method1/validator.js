function Validator(options) {
  var formElement = document.querySelector(options.form);
  var selectorRules = {};

  function validate(inputElement, errorElement, rule) {
    //Lấy ra từng rule của selector
    rules = selectorRules[rule.selector];
    var errorMessage;
    //Vòng lặp lặp qua từng rule và kiểm tra
    // Nếu có lỗi thì dừng việc kiểm tra
    for (let i = 0; i < rules.length; i++) {
      errorMessage = rules[i](inputElement.value);
      if (errorMessage) {
        break;
      }
    }
    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add("invalid");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("invalid");
    }
  }
  if (formElement) {
    options.rules.forEach(function (rule) {
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }
      var inputElement = formElement.querySelector(rule.selector);
      var errorElement = inputElement.parentElement.querySelector(
        options.errorSelector
      );

      if (inputElement) {
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
}
Validator.isRequired = function (
  selector,
  message = "Vui lòng nhập trường này!"
) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : message;
    },
  };
};
Validator.isEmail = function (
  selector,
  message = "Email không đúng định dạng!"
) {
  return {
    selector: selector,
    test: function (value) {
      const regex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(value) ? undefined : message;
    },
  };
};

Validator.minLength = function (
  selector,
  min = 6,
  message = `Vui lòng nhập tối thiếu ${min} ký tự!`
) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min ? undefined : message;
    },
  };
};

Validator.isConfirmed = function (
  selector,
  getConfirmation,
  message = "Giá trị nhập không đúng!"
) {
  return {
    selector: selector,
    test: function (value) {
      return value == getConfirmation() ? undefined : message;
    },
  };
};

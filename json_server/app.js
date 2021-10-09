var cakeApi = "http://localhost:3000/cakes";
var arrCake = [];
function start() {
  $("#save").hide();
  getCakes();
  handleCreateCake();
}
start();

function getCakes() {
  fetch(cakeApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (cakes) {
      arrCake = cakes.slice();
      renderCakes(cakes);
    });
}

function renderCakes(arrCake) {
  var html = arrCake.map(function (cake) {
    return `<li>
                <h3>${cake.name}</h3>
                <p>${cake.price}</p>
                <button onClick=handleDeleteCake(${cake.id})>Xóa</button>
                <button onClick=handleUpdateCake(${cake.id})>Sửa</button>
            </li>`;
  });
  $(".cake-list").html(html.join(""));
}
// create new cake
function handleCreateCake() {
  $("#create").click(function () {
    var name = $('input[name="name"]').val();
    var price = $('input[name="price"]').val();
    var data = {
      name: name,
      price: price,
    };
    createCake(data);
  });
}

function createCake(data) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(cakeApi, options)
    .then((response) => response.json())
    .then(function (cake) {
      arrCake.push(cake);
      renderCakes(arrCake);
    });
}

// Delete cake
function handleDeleteCake(id) {
  var options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(cakeApi + "/" + id, options)
    .then((response) => response.json())
    .then(function () {
      arrCake = arrCake.filter((cake) => cake.id != id);
      renderCakes(arrCake);
    });
}
// Update cake

function handleUpdateCake(id) {
  $("#create").hide();
  $("#save").show();
  var name = $('input[name="name"]');
  var price = $('input[name="price"]');
  let result = arrCake.find((cake) => cake.id == id);
  name.val(result.name);
  price.val(result.price);
  if ($("#cancel").length == 0) {
    $("#save").after(`<button id="cancel">Cancel</button>`);
  }
  $("#cancel").click(resetText);

  $("#save").click(function () {
    var data = {
      name: name.val(),
      price: price.val(),
    };
    updateCake(id, data);
    resetText();
    $("#create").show();
    $("#save").hide();
  });
}
function updateCake(id, data) {
  var options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(cakeApi + "/" + id, options)
    .then((response) => response.json())
    .then(function () {
      for (const element of arrCake) {
        if (element.id === id) {
        }
      }
      renderCakes(arrCake);
    });
}

// Reset text
function resetText() {
  $('input[name="name"]').val("");
  $('input[name="price"]').val("");
  $("#cancel").remove();
}

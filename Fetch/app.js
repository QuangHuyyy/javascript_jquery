var postAPI = "https://jsonplaceholder.typicode.com/posts";
fetch(postAPI)
  .then(function (response) {
    return response.json();
    // JSON.parse(): JSON -> JS
  })
  .then(function (posts) {
    var htmls = posts.map(function (post) {
      return `<li><h2>${post.title}</h2><p>${post.body}</p></li>`;
    });
    var html = htmls.join("");
    $(".post-block").html(html);
  });

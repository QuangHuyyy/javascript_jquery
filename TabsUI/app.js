const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$(".tab-item");
const panes = $$(".tab-pane");

const line = $(".line");
tabs.forEach((tab, index) => {
  var pane = panes[index];
  tab.onclick = function () {
    $(".tab-item.active").classList.remove("active");
    $(".tab-pane.active").classList.remove("active");

    this.classList.add("active");
    pane.classList.add("active");
    line.style.width = this.offsetWidth + "px";
    line.style.left = this.offsetLeft + "px";
  };
});

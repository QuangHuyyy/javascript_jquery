var panes = $(".tab-pane");
var line = $(".line");
$(".tab-item").click(function () {
  var index = $(this).attr("data-index");
  $(".tab-item.active").removeClass("active");
  $(".tab-pane.active").removeClass("active");

  $(this).addClass("active");
  $(panes[index]).addClass("active");
  line.innerWidth($(this).innerWidth() + "px");
  line.css("left", $(this).position().left + "px");
});
function activeTab(obj){
    
}
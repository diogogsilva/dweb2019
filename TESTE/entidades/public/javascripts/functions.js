$(document).ready(function () {
    $(".clickable").click(function() {
      var url = $(this).attr("data-href");
      window.location.assign(url);
    });
  
});
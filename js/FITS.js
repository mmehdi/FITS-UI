$(document).ready(function() {
    $("input[name$='first-tab-radioBtns']").click(function() {
        var radioVal = $(this).val();
        
      if(radioVal==0)
          $("#first-tab-form").fadeIn('slow');
      else
      	  $("#first-tab-form").fadeOut('slow');
    });
});
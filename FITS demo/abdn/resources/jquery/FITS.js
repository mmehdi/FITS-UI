$(document).ready(function() {

$("#tab-fare-structure-form-radioBtns").change();

    $("input[name$='tab-fare-structure-radioBtns']").click(function() {
        var radioVal = $(this).val();
        
      if(radioVal==0)
          $("#tab-fare-structure-form").fadeIn('slow');
      else
      	  $("#tab-fare-structure-form").fadeOut('slow');
    });


  $('#tab-eligibility-field-9-text').hide();

  $('#tab-eligibility-field-9').change(function() {
      if (this.checked) {
          $('#tab-eligibility-field-9-text').fadeIn('slow');
      }
      else {
        $('#tab-eligibility-field-9-text').fadeOut('slow');
      }
  });

    $('#tab-eligibility-field-16-text').hide();

  $('#tab-eligibility-field-16').change(function() {
      if (this.checked) {
          $('#tab-eligibility-field-16-text').fadeIn('slow');
      }
      else {
        $('#tab-eligibility-field-16-text').fadeOut('slow');
      }
  });

  //show hide surcharge fields depending on selection in passenger eligibility

   $("input[name='eligible-checkbox']").each( function () {
        var value = $(this).val();
        var passenger_elig_id = 'tab-surcharge-structure-pt-group-'+value;
        if(this.checked)
          $('#'+passenger_elig_id).hide();
        else
          $('#'+passenger_elig_id).show();
   });

     $("input[name='eligible-checkbox']").click(function() {
        //var id = $(this).attr('id');
        var value = $(this).val();
        var passenger_elig_id = 'tab-surcharge-structure-pt-group-'+value;
        if(this.checked)
          $('#'+passenger_elig_id).hide();
        else
          $('#'+passenger_elig_id).show();
      });

});

//range slider
$(document).ready(function() {

var rangeTimes = [];

$(".range-slider").slider({
		range: true,
    min: 0,
    max: 1440,
    values: [540, 1080],
    step:15,
    slide: slideTime,
    change: updateOpeningHours
	});

	function slideTime(event, ui){
    if (event && event.target) {
      var $rangeslider = $(event.target);
      var $rangeday = $rangeslider.closest(".range-day");
      var rangeday_d = parseInt($rangeday.data('day'));
      var $rangecheck = $rangeday.find(":checkbox");
      var $rangetime = $rangeslider.next(".range-time");
    }
    
    if ($rangecheck.is(':checked')) {
      $rangeday.removeClass('range-day-disabled');
      $rangeslider.slider('enable');
      
      if (ui!==undefined) {
        var val0 = ui.values[0],
			      val1 = ui.values[1];
      } else {
        var val0 = $rangeslider.slider('values', 0),
			      val1 = $rangeslider.slider('values', 1);
      }
      
      var minutes0 = parseInt(val0 % 60, 10),
			    hours0 = parseInt(val0 / 60 % 24, 10),
			    minutes1 = parseInt(val1 % 60, 10),
			    hours1 = parseInt(val1 / 60 % 24, 10);
      if (hours1==0) hours1=24;
      
		  rangeTimes[rangeday_d] = [getTime(hours0, minutes0),getTime(hours1, minutes1)];
        
      $rangetime.text(rangeTimes[rangeday_d][0] + ' - ' + rangeTimes[rangeday_d][1]);
      
    } else {
      $rangeday.addClass('range-day-disabled');
      $rangeslider.slider('disable');
      
      rangeTimes[rangeday_d] = [];
      
      $rangetime.text('Closed');
    }
	}

  function updateOpeningHours() {
    if ($('#schedule').length) {
      $('#schedule tbody').empty();
    } else {
      $('#tab-general-form').append('<br>\
      <table id="schedule">\
	    <thead>\
		    <tr>\
          <th>Day</th>\
			    <th>Opening Time</th>\
			    <th>Closing Time</th>\
		    </tr>\
	    </thead>\
	    <tbody>\
	    </tbody>\
      </table>');
    }
    var days = {1:"Monday",2:"Tuesday",3:"Wednesday",4:"Thursday",5:"Friday",6:"Saturday",7:"Sunday"};
    for (d=1; d<=7; d++) {
      $('#schedule tbody').append('<tr>'+
			   '<td>'+days[d]+'</td>'+
			   '<td>'+(rangeTimes[d][0]===undefined?'Closed':rangeTimes[d][0])+'</td>'+
         '<td>'+(rangeTimes[d][1]===undefined?'':rangeTimes[d][1])+'</td>'+
			'</tr>');
    }
  }

	function getTime(hours, minutes) {
		var time = null; 
		minutes = minutes + "";
		if (minutes.length == 1) {
      minutes = "0" + minutes;
		}

    //make number two digits 01,02 etc
    hours =  hours > 9 ? "" + hours: "0" + hours;
		
    return hours + ":" + minutes;
	}

  $('.range-checkbox').on('change', function(){
    var $rangecheck = $(this);
    var $rangeslider = $rangecheck.closest('.range-day').find('.range-slider');
    slideTime({target:$rangeslider});
    updateOpeningHours();
  });

	$("#scheduleSubmit").on('click', updateOpeningHours);

slideTime({target:$('#range-slider-1')});
slideTime({target:$('#range-slider-2')});
slideTime({target:$('#range-slider-3')});
slideTime({target:$('#range-slider-4')});
slideTime({target:$('#range-slider-5')});
slideTime({target:$('#range-slider-6')});
slideTime({target:$('#range-slider-7')});
updateOpeningHours();

});
//range slider end


$(document).ready(function() {
// initialize google map
BlitzMap.setMap( 'myMap', true, 'mapData' );
BlitzMap.init();// initialize BlitzMap
$('#myMap').show();
});

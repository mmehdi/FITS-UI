Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
};

function getDates(startDate, stopDate) {
   var dateArray = new Array();
   var currentDate = startDate;
   while (currentDate <= stopDate) {
     dateArray.push(new Date (currentDate) );
     currentDate = currentDate.addDays(1);
   }
   return dateArray;
 }

var dateArray = getDates(new Date(), (new Date()).addDays(10));

var today = new Date();

var theday = new Date();

console.log("today is " + today.toUTCString());

console.log("the day is " + theday.toUTCString());

while(theday.getDay() == 0 || theday.getDay() == 6){
	
	theday = theday.addDays(1);
}

var nextday = theday.addDays(1);

while(nextday.getDay() == 0 || nextday.getDay() == 6){
	
	nextday = nextday.addDays(1);
}

console.log("next day is " + nextday.toUTCString());

var the_day_after_next_day = nextday.addDays(1);

while(the_day_after_next_day.getDay() == 0 || the_day_after_next_day.getDay() == 6){
	
	the_day_after_next_day = the_day_after_next_day.addDays(1);
}

console.log("the day aftr next day is " + the_day_after_next_day.toUTCString());


var weekday=new Array(7);
weekday[0]="Sunday";
weekday[1]="Monday";
weekday[2]="Tuesday";
weekday[3]="Wednesday";
weekday[4]="Thursday";
weekday[5]="Friday";
weekday[6]="Saturday";

//alert("today is " + weekday[today.getDay()]);

$(document).ready(function () {  
    loadDropDownList(dateArray); 
    setCollectionDays();
    });   
      
    function loadDropDownList(dateArray) {  
    
    	var dotruralcountworkingday =0;
    	var parcelforcecountworkingday = 0;
    	var citylinkcountworkingday = 0;
    	var yourcompanycountworkingday = 0;
    	
    	var dotruralcount_offset = 0;
    	var parcelforcecount_offset = 0;
    	var citylinkcount_offset = 0;
    	var yourcompanycount_offset = 0;
    	
    	var i = 0;
    	for (i = 0; i < dateArray.length; i ++ ) {
    	  
    	
    	  if(dateArray[i].getDay() == 0 ||  dateArray[i].getDay() == 6){
    		  continue;
    	  }
    	  
    	  var value = dateArray[i].toUTCString().substring(3, 16);
    	  
    	  value = weekday[dateArray[i].getDay()] + value;
    	  
    	  var listItem = "";
    	  
    	  if(citylinkcountworkingday < 5){
    		  
    		  if(citylinkcount_offset >= 2 ){

        		  listItem = $("<option></option>").val(value + " between 9am and 5.30pm").html(value);  
        		  $("#collection_date_city_link").append(listItem);  
        		  citylinkcountworkingday++;
    			  
    		  }else{
    			  citylinkcount_offset++;
    		  }
    	  }
    	  
    	  if(parcelforcecountworkingday < 5){
    		  
    		  if(parcelforcecount_offset >= 0){
    			  listItem = $("<option></option>").val(value + " between 8.30am and 17.30pm").html(value);  
            	  $("#collection_date_parcel_force").append(listItem);  
            	  parcelforcecountworkingday++;
    		  }
    		  
    	  }
    	  
    	  if(dotruralcountworkingday <5){
    		  if(dotruralcount_offset >= 0){
    			  
    			  listItem = $("<option></option>").val(value + " between 10:00am to 3:00pm").html(value);  
            	  $("#collection_date_dotrural").append(listItem);  
            	  dotruralcountworkingday++;
    		  }
    		 
    	  }
    	  
    	  if(yourcompanycountworkingday < 5){
    		  
    		  if(yourcompanycount_offset >= 1){
    			  listItem = $("<option></option>").val(value + " between 8.30am and 17.30pm").html(value);  
            	  $("#collection_date_your_company").append(listItem);  
            	  yourcompanycountworkingday++;
    			  
    		  }else{
    			  yourcompanycount_offset++;
    		  }
        	 
    	  }
    	  
		}
    }  
    

	function setCollectionDays(){
		
		var theday_str = weekday[theday.getDay()];
		var theday_numvalue =  getYearMonthDay(theday);
		
		var nextday_str = weekday[nextday.getDay()];
		var nextday_numvalue = getYearMonthDay(nextday);
		
		var thedayafternextday_str = weekday[the_day_after_next_day.getDay()];
		var thedayafternextday_numvalue = getYearMonthDay(the_day_after_next_day);
		
		$("#city_link_the_day_after_next_day_span").html('').append(the_day_after_next_day);
		
		//alert("city link next day num value : " + thedayafternextday_numvalue);
		
		$("#city_link_the_day_after_next_day_label").html('').append( thedayafternextday_str);
		
		$("#pf_today_span").html('').append( theday_numvalue);
		
		//alert("parcel force today num value :" + theday_numvalue);
		
		$("#dotrural_today_span").html('').append( theday_numvalue);
		
		//alert("dot rural today num value :" + theday_numvalue);
		
		$("#your_company_next_day_span").html('').append( nextday_numvalue);
		
		//alert("your company next day num value :" + nextday_numvalue);
		
		
	}
	
	
	function getYearMonthDay(date){
		
		
		
		var year = date.getFullYear();
		var month = date.getMonth()<10?("0" + (date.getMonth()+1)):(date.getMonth()+1);
		var day = date.getDate()<10?("0"+ date.getDate()):date.getDate();
		
		console.log ("the day number value for the full year + month + day is " + year + month+day);
		
		return year+month+day;
		
	}
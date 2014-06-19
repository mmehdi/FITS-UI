	// This example displays an address form, using the autocomplete feature
	// of the Google Places API to help users fill in the information.

	var placeSearch, autocomplete_f, autocomplete_t;
	var componentForm = {
	  street_number: 'short_name',
	  route: 'long_name',
	  locality: 'long_name',
	  //administrative_area_level_1: 'short_name',
	  //country: 'long_name',
	  postal_code: 'short_name'
	};
	
	function initialize() {
	  // Create the autocomplete object, restricting the search
	  // to geographical location types.
	  autocomplete_f = new google.maps.places.Autocomplete(
	      /** @type {HTMLInputElement} */(document.getElementById('autocomplete_f')),
	      { types: ['geocode'] });
	  // When the user selects an address from the dropdown,
	  // populate the address fields in the form.
	  google.maps.event.addListener(autocomplete_f, 'place_changed', function() {
	    fillInAddress('f');
	  });
	  
	  autocomplete_t = new google.maps.places.Autocomplete(
		      /** @type {HTMLInputElement} */(document.getElementById('autocomplete_t')),
		      { types: ['geocode'] });
	  
	  google.maps.event.addListener(autocomplete_t, 'place_changed', function() {
		    fillInAddress('t');
		  });
	  
	}
	
	// The START and END in square brackets define a snippet for our documentation:
	// [START region_fillform]
	function fillInAddress(type) {
		
		var place = null;
	
		if (type == 'f'){
			// Get the place details from the autocomplete object.
			 place = autocomplete_f.getPlace();
			 
			for (var component in componentForm) {
					
			    document.getElementById(component+"_f").value = '';
			    document.getElementById(component+"_f").disabled = false;
			}
			 
		}else if(type == 't'){
			
			 place = autocomplete_t.getPlace();
			 
			 for (var component in componentForm) {
	
				 document.getElementById(component+"_t").value = '';
				 document.getElementById(component+"_t").disabled = false;
			 }
			 
		}
		
	
	  // Get each component of the address from the place details
	  // and fill the corresponding field on the form.
	  for (var i = 0; i < place.address_components.length; i++) {
		  
	    var addressType = place.address_components[i].types[0];
	    
	    if (componentForm[addressType]) {
	    	
	      var val = place.address_components[i][componentForm[addressType]];
	      if(type == 'f'){
	    	  document.getElementById(addressType+"_f").value = val;
	      }else if(type == 't'){
	    	  document.getElementById(addressType+"_t").value = val;
	      }
	      
	    }
	  }
	}
	// [END region_fillform]
	
	// [START region_geolocation]
	// Bias the autocomplete object to the user's geographical location,
	// as supplied by the browser's 'navigator.geolocation' object.
	function geolocate_f() {
	  if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position) {
	      var geolocation = new google.maps.LatLng(
	          position.coords.latitude, position.coords.longitude);
	      autocomplete_f.setBounds(new google.maps.LatLngBounds(geolocation,
	          geolocation));
	    });
	  }
	}
	
	
	function geolocate_t() {
		  if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(function(position) {
		      var geolocation = new google.maps.LatLng(
		          position.coords.latitude, position.coords.longitude);
		      autocomplete_t.setBounds(new google.maps.LatLngBounds(geolocation,
		          geolocation));
		    });
		  }
		}
	// [END region_geolocation]

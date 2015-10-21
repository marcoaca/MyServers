$("#locate").click(function(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			$("#demo").html("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude)
		});
	} else {
		$("#demo").html("Position not supported by browser!");
	}
});
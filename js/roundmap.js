//
// End of round map
//

function rminitialize() {
  console.log('End of round called');

  //
  // If locLatLongs or guessLatLongs are undefined, they didn't make a guess and there is no
  // round map for people who run out of time, so don't show it at all
  //
  var currentLLArr = [0,0] 
  currentLLArr = locLatLongs.replace(/[\])}[{(]/g, '').split(',');
  var GuessLLArr = [0,0]
  if (guessLatLongs){
  	GuessLLArr = guessLatLongs.replace(/[\])}[{(]/g, '').replace(/\s/g, '').split(',');
  }
  var actualLtLng = new google.maps.LatLng(currentLLArr[0], currentLLArr[1]);
  var guessLtLng = new google.maps.LatLng(GuessLLArr[0], GuessLLArr[1]);
	console.log(currentLLArr)
	console.log(GuessLLArr)
  var mapOptions = {
    zoom: 2,
    center: actualLtLng,
    mapTypeControl: false,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  var map = new google.maps.Map($('#roundMap')[0], mapOptions);
	console.log(map)
	
	var markers = [];//some array
	
	var imageActual = {
          url: 'img/actual-flag-small.png',
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(64, 64),
          //scaledSize: new google.maps.Size(50, 50), // scaled size
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(18, 64)
        };

  var actualMarker = new google.maps.Marker({
    position: actualLtLng,
    title: "Actual Location",
    icon: imageActual
  });
  
  var imageGuess = {
          url: 'img/guess-flag-small.png',
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(64, 64),
          //scaledSize: new google.maps.Size(50, 50), // scaled size
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(18, 64)
        };
	if (guessLatLongs){
  var guessMarker = new google.maps.Marker({
    position: guessLtLng,
    title: "Your Guess",
    icon: imageGuess
  });
  guessMarker.setMap(map);
  markers.push(guessMarker)
}
  actualMarker.setMap(map);
  markers.push(actualMarker)
  console.log(markers)
  if (markers.length>1){
var bounds = new google.maps.LatLngBounds();
  if (markers.length>0) { 
      for (var i = 0; i < markers.length; i++) {
         bounds.extend(markers[i].getPosition());
        }    
        map.fitBounds(bounds);
    }
    }else{
  	map.setZoom(10);
	map.panTo(actualMarker.position);
}
};

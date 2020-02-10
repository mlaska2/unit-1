function jQueryAjax() {
  $.get("data/MegaCities.geojson", callback, "json")
};

//define callback function
function callback(response){
    //tasks using the data go here
    console.log(response);
};

$(document).ready(jQueryAjax)

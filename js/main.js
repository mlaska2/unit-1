// Script by Matt Laska, G575 Spring 2020
//initialize function called when the script loads
function initialize(){
	cities();
	//call the debugAjax function upon the document being loaded
	debugAjax();
};

//function to create a table with cities and their populations
function cities(){
	//define two arrays for cities and population
	var cityPop = [
		{
			city: 'Madison',
			population: 233209
		},
		{
			city: 'Milwaukee',
			population: 594833
		},
		{
			city: 'Green Bay',
			population: 104057
		},
		{
			city: 'Superior',
			population: 27244
		}
	];

	//append the table element to the div
	$("#mydiv").append("<table>");

	//append a header row to the table
	$("table").append("<tr>");

	//add the "City" and "Population" columns to the header row
	$("tr").append("<th>City</th><th>Population</th>");

	//loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        //assign longer html strings to a variable
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        //add the row's html string to the table
        $("table").append(rowHtml);
    };
		//calling addColumns and addEvents functions within the cities function
  	addColumns(cityPop);
    addEvents();
};
//function to add a column to the table with City Size
function addColumns(cityPop){
	//.each method to perform the function of adding a City Size to each row
    $('tr').each(function(i){
			//if conditional to add "City Size" to header row if i==0
    	if (i == 0){

    		$(this).append('<th>City Size</th>');
			//if i!=0, define a variable citySize without assigning a value
    	} else {

    		var citySize;

			// nested conditional to assign a citySize based on each city's population in cityPop
    		if (cityPop[i-1].population < 100000){   //why doing i-1?? is it because the header row is index i=0 in this .each method?
    			citySize = 'Small';

    		} else if (cityPop[i-1].population < 500000){
    			citySize = 'Medium';

    		} else {
    			citySize = 'Large';
    		};
			//add the City Size value to the newly created column in the table
    		$(this).append('<td>' + citySize + '</td>');
    	};
    });
};
//fucntion to create pop-up when something (table) in our case, is clicked
function clickme(){
	//the message that will be displayed in the pop-up
	alert('Hey, you clicked me!');
};
//function to create random RGB color and set css color style for table to it
function hoverHandler(){
	//define a variable "color"
	var color = "rgb(";
	//loop to generate 3 numbers between 0 and 255 to create an RGB color
	for (var i=0; i<3; i++){
		//assign (random number between 0-1 multiplied by 255) to the variable
		var random = Math.round(Math.random() * 255);
		// add the number to "color" variable
		color += random;
		// conditional to add either "," or ")" to "color" variable
		if (i<2){
			color += ",";

		} else {
			color += ")";
	};
	//set the css style of color to this element (the table) with the variable "color"
	$('table').css('color', color);
}
}
//create a function to add various behaviors when interacting with the table
function addEvents(){
	//event listener to call hoverHandler function when hover over table
	$('table').mouseover(hoverHandler);
	//event listener to call clickme function when table is clicked on
	$('table').on('click', clickme);

};

//New Code from Activity 4 - debug it

//create callback function that accesses the AJAX request response and displays it in the browser
function debugCallback(response){
	//setting variable mydata equal to the servers response from the AJAX request
	var mydata=response
	//appending the response in string format to the HTML mydiv ID to display results in browser
	$(mydiv).append('GeoJSON data: <br>' + JSON.stringify(mydata));
};

//create function that executes AJAX request
function debugAjax(){
	//create a variable mydata - don't think this is totally necessary??
	var mydata;
	//jQuery AJAX request method with two parameters
	$.ajax("data/MegaCities.geojson", {
		dataType: "json",
		//calls callback function upon sucessfully executed AJAX request
		success: debugCallback
	});
//this is undefined because mydata has not been assigned to anything - that happens in the callback function
//	$(mydiv).append('<br>GeoJSON data:<br>' + JSON.stringify(mydata));
};
/*mydata has not yet been defined because the AJAX request hasn't been
completed, meaning the callback function hasn't been called yet*/
//$(mydiv).append('GeoJSON data: ' + JSON.stringify(mydata));


//call the initialize function when the document has loaded
$(document).ready(initialize);

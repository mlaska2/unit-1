// Script by Matt Laska, G575 Spring 2020
//initialize function called when the script loads
function initialize(){
	cities();
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
//create a function to add various behaviors when interacting with the table
function addEvents(){
	//creating anonymous function to change color of table every time cursor moves over it
	$('table').mouseover(function(){
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
		$(this).css('color', color);
	};
	//create a function to display a pop-up when the table is clicked
	function clickme(){
		//the message that will be displayed in the pop-up
		alert('Hey, you clicked me!');
	};
	//add the behavior (clickme function) to the table
	$('table').on('click', clickme);
  });
};
//call the initialize function when the document has loaded
$(document).ready(initialize);

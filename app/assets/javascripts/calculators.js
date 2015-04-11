// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var app = {

    calculateCalories : function() {
	var height   = $("#visina").val();
	var weight   = $("#te_ina").val();
	var age      = $("#godine").val();
	var gender   = $("#pol").val();
	var activity = $("#nivo_aktivnosti").val();

	var resting_energy_expenditure = app.harris_benedict_equation(height, weight, age, gender);
	
	// 1.1 is termic effect of feeding
	var total_expenditure = (resting_energy_expenditure * activity * 1.1).toFixed();

	$("#result").text(
	    "Vaš dnevni utrošak kalorija iznosi " + total_expenditure +
	    ". Za vreme dijete unosite " + (total_expenditure - 500) + " kalorije."
	);

	return false;    
    },

    harris_benedict_equation : function(height, weight, age, gender) {
	// Reference: http://en.wikipedia.org/wiki/Harris%E2%80%93Benedict_equation

	// equation for males
	if (gender === "0") {
	    return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
	// equation for females
	} else {
	    return 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age
	}
    },

    init : function() {
	$(document).on("submit", "#calculateCalories", app.calculateCalories);
    }
}

$(document).ready(function() {
    app.init();
})

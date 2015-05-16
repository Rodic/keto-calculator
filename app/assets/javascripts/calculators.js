// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var app = {

  total_expenditure : null,

  restricted_intake : null,

  food_items : null,

  calculate_calories : function() {
  	var height   = $("#visina").val();
  	var weight   = $("#te_ina").val();
  	var age      = $("#godine").val();
  	var gender   = $("#pol").val();
  	var activity = $("#nivo_aktivnosti").val();
  	var deficit = $("#deficit").val();

  	var resting_energy_expenditure = app.harris_benedict_equation(height, weight, age, gender);
  	
  	// 1.1 is termic effect of feeding
  	app.total_expenditure = (resting_energy_expenditure * activity * 1.1).toFixed();
  	app.restricted_intake = (app.total_expenditure * (1 - deficit)).toFixed();

  	// Show/hide appropriate sections
  	$("#caloriesExpenditureSection").addClass("hide");
  	$("#menu").removeClass("hide");

  	// Display calc result
  	$("#calculatedDeficit").text(
  	    "Vaš dnevni utrošak kalorija iznosi " + app.total_expenditure +
  	    ". Dozvoljeni unos kalorija za vreme dijete - " + app.restricted_intake + "."
    );

    return false;    
  },

  // Reference: http://en.wikipedia.org/wiki/Harris%E2%80%93Benedict_equation
  harris_benedict_equation : function(height, weight, age, gender) {
  	// equation for males
  	if (gender === "0") {
  	    return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
  	// equation for females
  	} else {
  	    return 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age
  	}
  },

  get_food_items : function() {
    $.ajax({
	    dataType: "json",
	    url: "food_items.json",
	    success: function(data) {
		    $("#food_item").autocomplete({
          minLength: 1,
          source: data,
          select: function(event, ui) {
            alert(ui.item["data"]["calories"]);
          },
        });
	    },
    });
  },

  init : function() {
    app.get_food_items();
    $(document).on("submit", "#calculateCalories", app.calculate_calories);
  }
}

$(document).ready(function() {
    app.init();
})

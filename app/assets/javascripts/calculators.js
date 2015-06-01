// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var app = {

  total_expenditure : null,

  restricted_intake : null,

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

    // Remove notice after 5 secs
    $(".panel").delay(5000).fadeOut(3000);

    $("#totalProteins").html("0 / " + Math.max(150, 1.75 * weight) + " g");
    $("#totalCarbs").html("0 / 30 g");
    $("#totalFats").html("0 / neograničeno");
    $("#totalCalories").html("0 / " + app.restricted_intake + " kcal");

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

   // Bottom of the table
  update_summary : function(vals) {
    var cells = [ "#totalProteins", "#totalCarbs", "#totalFats", "#totalCalories" ];
    for(var i = 0; i < vals.length; i ++) {
      var elem = $(cells[i]);
      var val  = elem.html().split(" / ");
      var curr = val[0];
      var max  = val[1];
      var updated = (parseFloat(curr) + parseFloat(vals[i])).toFixed(2);

      elem.html(updated + " / " + max);
    }
  },

  delete_record : function() {
    var row  = $(this).closest('tr');
    var data = row.find('td');
    app.update_summary([ '-' + data.eq(1).html(),
                         '-' + data.eq(2).html(),
                         '-' + data.eq(3).html(),
                         '-' + data.eq(4).html() ]);
    row.remove();
  },

  // when quantity changes
  update_record : function() {
    var old_value   = $(this).data('quantity');
    var new_value   = parseFloat($(this).val());
    
    $(this).data('quantity', new_value);

    var change_rate = new_value / old_value;

    var deltas = [];

    var row = $(this).closest('tr');
    var tds = row.find('td');

    for(var i = 1; i < 5; i++) {
      var old = parseFloat(tds.eq(i).html());
      var upd = old * change_rate;

      deltas.push(upd - old);

      tds.eq(i).html(upd);
    }

    app.update_summary(deltas);
  },

  create_record : function(event, ui) {
    var elem = $(
      "<tr>" + 
        "<td>" + ui.item["value"] + "</td>" +
        "<td>" + ui.item["data"]["proteins"] + "</td>" +
        "<td>" + ui.item["data"]["carbs"] + "</td>" +
        "<td>" + ui.item["data"]["fats"] + "</td>" +
        "<td>" + ui.item["data"]["calories"] + "</td>" +
        '<td>' +
          '<input type="text" ' + 
            'data-quantity="'+ ui.item["data"]["quantity"] + '" ' +
            'value="' + ui.item["data"]["quantity"] + '">' +
          '</input> ' + 
          ui.item["data"]["unit"] + 
        '</td>' +
        '<td><a href="#" class="button tiny alert delete-item">x</a></td>' +
      "</tr>");

    elem.appendTo($('#menu > tbody'));

    app.update_summary([ ui.item["data"]["proteins"], 
                         ui.item["data"]["carbs"],
                         ui.item["data"]["fats"], 
                         ui.item["data"]["calories"] ]);

    elem.find('.delete-item').click(app.delete_record);
    elem.find('input').change(app.update_record);

    // clear input box
    $(this).val("");
    return false;
  },

  init : function() {
    $.getJSON("food_items.json").then(function(data) {
      $("#food_item").autocomplete({
        source : data,
        select : app.create_record
      });
    });

    $(document).on("submit", "#calculateCalories", app.calculate_calories);
  }
}

$(document).ready(function() {
    app.init();
})

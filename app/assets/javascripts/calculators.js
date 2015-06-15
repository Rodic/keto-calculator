// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var app = {

  calculate_calories : function(e) {
  	var height   = $("#height").val();
  	var weight   = $("#weight").val();
  	var age      = $("#age").val();
  	var gender   = $("#sex").val();
  	var activity = $("#activity_level").val();
  	var deficit = $("#deficit").val();

  	var resting_energy_expenditure = app.harris_benedict_equation(height, weight, age, gender);
  	
  	// 1.1 is termic effect of feeding
  	var total_expenditure = (resting_energy_expenditure * activity * 1.1).toFixed();
  	var restricted_intake = (total_expenditure * (1 - deficit)).toFixed();

    var protein_intake = Math.max(150, 1.75 * weight);

  	// Show/hide appropriate sections
  	$("#caloriesExpenditureSection").addClass("hide");
  	$("#menu").removeClass("hide");

    app.display_advices(total_expenditure, restricted_intake, protein_intake);

    $("#totalProteins").html("0 / " + protein_intake + " g");
    $("#totalCarbs").html("0 / 30 g");
    $("#totalFats").html("0 / &infin;");
    $("#totalCalories").html("0 / " + restricted_intake + " kcal");

    return false;    
  },

  // Display modal with general guidelines
  display_advices : function(total_expenditure, restricted_intake, protein_intake) {
    var advices_panel = $("#dietAdvices");
    advices_panel.empty();

    $('<p>').text(
      t('calculator.expenditure') + " " + total_expenditure + ". " +
      t('calculator.allowed') + " - " + restricted_intake + " kcal."
    ).appendTo(advices_panel);

    $('<p>').text(t('calculator.proteins_advice') + protein_intake + " " + t('calculator.grams')+ ".").appendTo(advices_panel);
    $('<p>').text(t('calculator.carbs_advice')).appendTo(advices_panel);
    $('<p>').text(t('calculator.fats_advice')).appendTo(advices_panel);
    $('<p>').text(t('calculator.disclaimer')).appendTo(advices_panel);
    $('<a class="close-reveal-modal" aria-label="Close">&#215;</a>').appendTo(advices_panel);
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

      tds.eq(i).html(upd.toFixed(2));
    }

    app.update_summary(deltas);
  },

  create_record_from_list : function(event, ui) {
    console.log(ui);
    app.create_record(ui.item);

    // clear input box
    $(this).val("");
    return false;
  },

  create_record_from_user_input : function() {
    var item = {};
    var name = $("#inserted_name");
    var proteins = $("#inserted_proteins");
    var carbs = $("#inserted_carbs");
    var fats = $("#inserted_fats");
    var calories = $("#inserted_calories");
    var quantity = $("#inserted_quantity");

    item["value"] = name.val();
    item["data"] = {};
    item["data"]["proteins"] = proteins.val() || 0;
    item["data"]["carbs"] = carbs.val() || 0;
    item["data"]["fats"] = fats.val() || 0;
    item["data"]["calories"] = calories.val() || 0;
    item["data"]["quantity"] = quantity.val() || 0;
    item["data"]["unit"] = $("#inserted_unit").val();

    app.create_record(item);

    name.val('');
    proteins.val('');
    carbs.val('');
    fats.val('');
    calories.val('');
    quantity.val('');

    console.log(item);
  },

  create_record : function(item) {
    var elem = $(
      "<tr>" + 
        "<td>" + item["value"] + "</td>" +
        "<td>" + item["data"]["proteins"] + "</td>" +
        "<td>" + item["data"]["carbs"] + "</td>" +
        "<td>" + item["data"]["fats"] + "</td>" +
        "<td>" + item["data"]["calories"] + "</td>" +
        '<td>' +
          '<input type="text" class="half" ' + 
            'data-quantity="'+ item["data"]["quantity"] + '" ' +
            'value="' + item["data"]["quantity"] + '">' +
          '</input> ' + 
          item["data"]["unit"] + 
        '</td>' +
        '<td><a href="#" class="button tiny alert delete-item">'+ t('calculator.del') +'</a></td>' +
      "</tr>");

    elem.appendTo($('#menu > tbody'));

    app.update_summary([ item["data"]["proteins"], 
                         item["data"]["carbs"],
                         item["data"]["fats"], 
                         item["data"]["calories"] ]);

    elem.find('.delete-item').click(app.delete_record);
    elem.find('input').change(app.update_record);
  },

  init : function() {
    if(!$("#calculateCalories").length)
      return;

    $(document).on("submit", "#calculateCalories", app.calculate_calories);
    $(document).on("submit", "#calculateCalories", function(){
      $('#dietAdvices').foundation('reveal', 'open')
    });
    $(document).on("click", "#insert_item", app.create_record_from_user_input);

    $.getJSON("food_items.json")
      .done(function(data) {
        $("#food_item").autocomplete({
          source : data,
          select : app.create_record_from_list
        });
      })
      .fail(function() {
        alert("Failed to load data! Please reload the page.");
      });
  }
}

$(document).on('ready page:load', app.init);

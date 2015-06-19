// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var app = {

  macro_graph: null,
  cal_graph: null,

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

    app.init_graphs();
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

  update_graphs : function(vals) {

    var aux = function(x, y) {
      return (parseFloat(x) + parseFloat(y)).toFixed(2);
    }

    for(var i = 0; i < 3; i++)
        app.macro_graph.datasets[0].bars[i].value = aux(app.macro_graph.datasets[0].bars[i].value, vals[i]);
    app.macro_graph.update();

    app.cal_graph.datasets[0].bars[0].value = aux(app.cal_graph.datasets[0].bars[0].value, vals[3]);
    app.cal_graph.update();
  },

  init_graphs : function() {
    var macro_data = {
      labels: [ t('calculator.proteins'), t('calculator.carbs'), t('calculator.fats') ],
      datasets: [
        {
          label: "Your macro intake",
          fillColor: "#6CB168",
          highlightFill: "#7BB977",
          data: [0, 0, 0]
        }
      ]
    };

    var cal_data = {
      labels: [ t('calculator.calories') ],
      datasets: [
        {
          label: "Your caloric intake",
          fillColor: "#FFCC33",
          highlightFill: "#FFD147",
          data: [0]
        }
      ]
    };

    app.macro_graph = new Chart($("#macro-vals-graph").get(0).getContext("2d")).Bar(macro_data);
    app.cal_graph = new Chart($("#calories-intake-graph").get(0).getContext("2d")).Bar(cal_data);
  },

  delete_record : function() {
    var row  = $(this).closest('tr');
    var data = row.find('td');
    var vals = [ '-' + data.eq(1).html(),
                 '-' + data.eq(2).html(),
                 '-' + data.eq(3).html(),
                 '-' + data.eq(4).html() ];

    app.update_summary(vals);
    app.update_graphs(vals);
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
    app.update_graphs(deltas);
  },

  create_record_from_list : function(event, ui) {
    app.create_record(ui.item);
    // clear input box
    $(this).val("");
    return false;
  },

  create_record_from_user_input : function() {
    var item = {};
    var name = $("#inserted_name").val();
    var proteins = $("#inserted_proteins").val();
    var carbs = $("#inserted_carbs").val();
    var fats = $("#inserted_fats").val();
    var calories = $("#inserted_calories").val();
    var quantity = $("#inserted_quantity").val();
    var unit = $("#inserted_unit").val();

    if(!name || !proteins || !carbs || !fats || !calories || !quantity){
      alert(t("calculator.enter_required_data"));
      return false;
    }

    item["value"] = name;
    item["data"] = {};
    item["data"]["proteins"] = proteins;
    item["data"]["carbs"] = carbs;
    item["data"]["fats"] = fats;
    item["data"]["calories"] = calories;
    item["data"]["quantity"] = quantity;
    item["data"]["unit"] = unit;

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
        '<td><a href="#" class="button tiny secondary delete-item">'+ t('calculator.del') +'</a></td>' +
      "</tr>");

    elem.appendTo($('#table-menu > tbody'));

    var vals = [ item["data"]["proteins"], 
                 item["data"]["carbs"],
                 item["data"]["fats"], 
                 item["data"]["calories"] ];

    app.update_summary(vals);
    app.update_graphs(vals);

    elem.find('.delete-item').click(app.delete_record);
    elem.find('input').change(app.update_record);
  },

  export_to_pdf : function(e) {
    e.preventDefault();

    // Read table vals

    var headers = [];
    var data = [];

    var parseCell = function(td) {
      var text = $.trim($(td).text());

      // jsPDF doesn't support utf8
      var reps = [ ['Č', 'C'], [ 'č', 'c' ], [ 'Đ', 'Dj' ], [ 'đ', 'dj' ], [ 'Ć', 'C' ], [ 'ć', 'c' ] ];
      
      for(var i = 0; i < reps.length; i++)
        text = text.replace(reps[i][0], reps[i][1]);

      // Truncate long strings with ellipsis
      if(text.length > 35)
        text = text.substring(0, 35) + '...';

      if ($(td).find('input').length)
        return $(td).find('input').val() + ' ' + text;
      else
        return text;
    };

    $("#table-menu th").each(function(i) {
      if(i < 6)
        headers.push(parseCell(this));
    });

    $("#table-menu tr").each(function(i, tr) {
      $(tr).find('td').each(function(j, td) {
        if(i !== 1 && j < 6){
          data.push(parseCell(td));          
        }
      })
    });

    data[data.length-1] = " "; // overwrite 'Export PDF'


    // Create PDF

    var doc = jsPDF('l', 'pt', 'a3');

    doc.cellInitialize();

    doc.setFontSize(22);
    doc.text(550, 40, 'Menu');

    doc.setFontSize(16);

    // printing headers
    for(var i = 0; i < headers.length; i++) {
      doc.setFontStyle('bold');
      doc.setFillColor(108, 177, 104);
      doc.printingHeaderRow = true;
      if(i == 0)
        doc.cell(60, 80, 300, 30, headers[i], 0);
      else
        doc.cell(60, 80, 150, 30, headers[i], 0);
    }

    // printing data
    doc.setFontStyle('normal');
    doc.setFillColor(250, 250, 250);
    doc.printingHeaderRow = false;

    for(var i = 0; i < data.length; i++) {
      if(i % headers.length === 0)
        doc.cell(60, 80, 300, 30, data[i], 1 + Math.floor(i / headers.length));
      else
        doc.cell(60, 80, 150, 30, data[i], 1 + Math.floor(i / headers.length));
    }

    doc.save('Menu.pdf');
  },

  init : function() {
    if(!$("#calculateCalories").length)
      return;

    $(document).on("submit", "#calculateCalories", app.calculate_calories);
    $(document).on("submit", "#calculateCalories", function(){
      $('#dietAdvices').foundation('reveal', 'open')
    });
    $(document).on("click", "#insert_item", app.create_record_from_user_input);
    $(document).on("click", "#export-pdf",  app.export_to_pdf);

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

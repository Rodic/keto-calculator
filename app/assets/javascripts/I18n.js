translations = {
  sr : {
    calculator : {
      expenditure : "Vaš dnevni utrošak kalorija iznosi",
      allowed : "Dozvoljeni unos kalorija za vreme dijete",
      proteins_advice: "* Potrebna količina proteina iznosi - ",
      carbs_advice: "* Dnevno unosite najviše 30 grama ugljenih hidrata.",
      fats_advice: "* Ne postoje restrikcije vezane za masti. Količinu prilagodite ukupnom utrošku kalorija.",
      disclaimer: "Ovo su smernice koje se mogu pronaći u relevantnoj literaturi. Pre započinjanja dijete neophodno je konsultovati lekara.",
      grams: "grama",
      del: "Obriši",
      proteins: "Proteini",
      carbs: "Ugljeni hidrati",
      fats: "Masti",
      calories: "Kalorije",
      enter_required_data: "Unesite sve podatke!"
    }
  },

  en : {
    calculator : {
      expenditure : "Your daily calories expenditure is",
      allowed : "In order to achieve your goal, intake should be about",
      proteins_advice: "* Protein intake should be - ",
      carbs_advice: "* Carb intake is at most 30 grams.",
      fats_advice: "* There is no fats related restriction. Adjust the intake to the total calories expenditure.",
      disclaimer: "These are advices that can be found in relevant literature. Before going on diet, consult with your doctor.",
      grams: "grams",
      del: "Delete",
      proteins: "Proteins",
      carbs: "Carbohydrates",
      fats: "Fats",
      calories: "Calories",
      enter_required_data: "Enter required data!"
    }
  }
}

var t = function(path) {
  var lang = document.documentElement.lang;
  var val  = translations[lang];

  path = path.split('.');

  for(var i = 0; i < path.length; i++) {
    if(!val)
      return path.join(' '); 
    val = val[path[i]];
  }
  
  return val ? val : path.join(' ');
}

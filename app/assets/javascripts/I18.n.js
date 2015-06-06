translations = {
  sr : {
    calculator : {
      expenditure : "Vaš dnevni utrošak kalorija iznosi",
      allowed : "Dozvoljeni unos kalorija za vreme dijete"
    }
  },

  en : {
    calculator : {
      expenditure : "Your daily calories expenditure is",
      allowed : "In order to achieve your goal, your intake should be about"
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

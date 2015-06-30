var validate_add_new_item_form = function() {
  
  var food_item_name = new LiveValidation('food_item_name');
  food_item_name.add(Validate.Presence, { failureMessage : t('validations.cant_be_blank') });

  var keyword = new LiveValidation('food_item_keyword');
  keyword.add(Validate.Presence, { failureMessage : t('validations.cant_be_blank') });

  var calories = new LiveValidation('food_item_nutritional_value_attributes_calories');
  calories.add(Validate.Presence, { failureMessage : t('validations.cant_be_blank') });
  calories.add(Validate.Numericality, { notANumberMessage : t('validations.must_be_numerical') });

  var proteins = new LiveValidation("food_item_nutritional_value_attributes_proteins");
  proteins.add(Validate.Presence, { failureMessage : t('validations.cant_be_blank') });
  proteins.add(Validate.Numericality, { notANumberMessage : t('validations.must_be_numerical') });

  var carbs = new LiveValidation("food_item_nutritional_value_attributes_carbs");
  carbs.add(Validate.Presence, { failureMessage : t('validations.cant_be_blank') });
  carbs.add(Validate.Numericality, { notANumberMessage : t('validations.must_be_numerical') });

  var fats = new LiveValidation("food_item_nutritional_value_attributes_fats");
  fats.add(Validate.Presence, { failureMessage : t('validations.cant_be_blank') });
  fats.add(Validate.Numericality, { notANumberMessage : t('validations.must_be_numerical') });

  var quantity = new LiveValidation("food_item_nutritional_value_attributes_quantity");
  quantity.add(Validate.Presence, { failureMessage : t('validations.cant_be_blank') });
  quantity.add(Validate.Numericality, { notANumberMessage : t('validations.must_be_numerical') });

  var unit = new LiveValidation("food_item_nutritional_value_attributes_unit");
  unit.add(Validate.Presence, { failureMessage : t('validations.cant_be_blank') });

  var humanizer = new LiveValidation("food_item_humanizer_answer");
  humanizer.add(Validate.Presence, { failureMessage : t('validations.cant_be_blank') });
};

$(document).on('ready page:load', validate_add_new_item_form);

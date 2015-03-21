FactoryGirl.define do
  factory :nutritional_value do
    calories "46.00"
    proteins "3.10"
    fats "1.60"
    carbs "4.50"
    quantity 100
    unit "grama"
    food_item
  end

end

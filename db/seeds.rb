# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'json'

Dir.glob('db/json_data/*/*{[!~]}') do |json_file|
  puts "Working with #{json_file}..."
  item = JSON.parse(File.read(json_file))

  fi = FoodItem.create!(
         name: item["name"], keyword: item["keyword"], brand: item["brand"]
       )

  unit = item[:quantity] == "1" ? "komad" : "grama"

  nv = NutritionalValue.create!(
         calories: item["calories"], carbs: item["carbs"], 
         proteins: item["proteins"], fats: item["fats"],
         quantity: item["quantitiy"], unit: unit, food_item: fi)
end

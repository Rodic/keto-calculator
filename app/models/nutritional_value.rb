class NutritionalValue < ActiveRecord::Base

  belongs_to :food_item

  validates_presence_of :calories, :carbs, :fats, :proteins, :quantity, :unit
  validates_numericality_of :calories, :carbs, :fats, :proteins, :quantity
end

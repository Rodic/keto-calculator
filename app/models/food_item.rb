class FoodItem < ActiveRecord::Base

  has_one :nutritional_value

  validates :name, presence: true

end

class FoodItem < ActiveRecord::Base

  validates :name, presence: true

end

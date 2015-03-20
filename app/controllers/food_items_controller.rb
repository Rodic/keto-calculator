class FoodItemsController < ApplicationController

  def index
    @food_hash = FoodItem.order(:keyword).inject(Hash.new []) do |acc, f|
      acc[f.keyword.mb_chars.capitalize.to_s] += [f]; acc
    end
  end
end

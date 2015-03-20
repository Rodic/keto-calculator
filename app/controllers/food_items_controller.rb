class FoodItemsController < ApplicationController

  def index
    @food_hash = Hash.new([])

    FoodItem.order(:keyword).each do |f|
      @food_hash[f.keyword_capitalized] += [f]
    end
  end
end

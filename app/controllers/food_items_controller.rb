class FoodItemsController < ApplicationController

  def index
    @food_hash = Hash.new([])

    FoodItem.order(:keyword).each do |f|
      @food_hash[f.keyword.mb_chars.capitalize.to_s] += [f]
    end
  end
end

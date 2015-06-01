# -*- coding: utf-8 -*-
class FoodItemsController < ApplicationController

  def index
    respond_to do | client_wants|
      client_wants.html do
        # { food_keyword1 => [ food_object1, ... ], food_keyword2 => [ food_object1, ... ] }
        @food_hash = FoodItem.order(:keyword).inject(Hash.new []) do |acc, f|
          acc[f.keyword.mb_chars.capitalize.to_s] += [f]; acc
        end
      end
      client_wants.json { render json: FoodItem.all }
    end
  end

  def new
    @food_item = FoodItem.new
    @food_item.build_nutritional_value
  end

  def create
    @food_item = FoodItem.new(food_item_params)
    if @food_item.save
      flash[:success] = "Hvala Vam. Namirnica će postati dostupna nakon verifikacije."
      redirect_to food_item_path(@food_item)
    else
      flash.now[:alert] = "Namirnica nije dodata. Molimo Vas da proverite ispravnost upisanih vrednosti."
      render "new"
    end
  end

  def show
    @food_item = FoodItem.find(params[:id])
  end

  private
    def food_item_params
      params.require(:food_item).permit(
        :name, :keyword, :brand, :humanizer_answer, :humanizer_question_id, :humanizer_testing,
        nutritional_value_attributes: [ 
          :calories, :proteins, :carbs, :fats, :quantity, :unit ]
      )
    end
end

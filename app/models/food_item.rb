# -*- coding: utf-8 -*-
class FoodItem < ActiveRecord::Base

  has_one :nutritional_value, dependent: :destroy

  accepts_nested_attributes_for :nutritional_value

  validates_presence_of :name, :keyword

  before_save :capitalize_brand, :downcase_keyword


  def capitalize_brand
    self.brand.capitalize!
  end

  def downcase_keyword
    self.keyword.downcase!
  end
end

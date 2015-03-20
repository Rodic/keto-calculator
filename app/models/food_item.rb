# -*- coding: utf-8 -*-
class FoodItem < ActiveRecord::Base

  has_one :nutritional_value

  validates_presence_of :name, :keyword

  before_save :capitalize_brand, :downcase_keyword


  def capitalize_brand
    self.brand.capitalize!
  end

  def downcase_keyword
    self.keyword.downcase!
  end

  def keyword_capitalized
    keyword = self.keyword.capitalize
    keyword[0] = "Š" if keyword[0] == "š"
    keyword[0] = "Đ" if keyword[0] == "đ"
    keyword[0] = "Č" if keyword[0] == "č"
    keyword[0] = "Ć" if keyword[0] == "ć"
    keyword[0] = "Ž" if keyword[0] == "ž"
    keyword
  end

end

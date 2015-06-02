# -*- coding: utf-8 -*-
class FoodItem < ActiveRecord::Base

  include Humanizer

  attr_accessor :humanizer_testing
  require_human_on :create, :unless => :humanizer_testing

  scope :approved, -> { where(approved: true) }
  scope :pending,  -> { where(approved: false) }
  
  has_one :nutritional_value, dependent: :destroy

  accepts_nested_attributes_for :nutritional_value

  validates_presence_of :name, :keyword

  before_save :capitalize_brand, :downcase_keyword

  def as_json(options = {})
    name = self.brand.empty? ? self.name : "#{self.name} (#{self.brand})"
    { value: name, data: self.nutritional_value }
  end

  def capitalize_brand
    self.brand.capitalize!
  end

  def downcase_keyword
    self.keyword.downcase!
  end
end

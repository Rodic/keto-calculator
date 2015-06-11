# -*- coding: utf-8 -*-
class FoodItem < ActiveRecord::Base

  include Humanizer

  attr_accessor :humanizer_testing
  require_human_on :create, :unless => :humanizer_testing

  has_attached_file :image, 
    styles: { medium: '300x300>', thumb: '100x100>' },
    default_url: '/no-pic.jpg',
    storage: :dropbox,
    dropbox_credentials: {
      app_key: ENV['DROPBOX_APP_KEY'],
      app_secret: ENV['DROPBOX_APP_SECRET'],
      access_token: ENV['DROPBOX_ACCESS_TOKEN'],
      access_token_secret: ENV['DROPBOX_ACCESS_TOKEN_SECRET'],
      user_id: ENV['DROPBOX_USER_ID'],
      access_type: ENV['DROPBOX_ACCESS_TYPE']
    },
    dropbox_option: { 
      :path => proc { |style| "images/#{id}/#{style}/#{image.original_filename}" } 
    }

  scope :approved, -> { where(approved: true) }
  scope :pending,  -> { where(approved: false) }
  
  has_one :nutritional_value, dependent: :destroy

  accepts_nested_attributes_for :nutritional_value

  validates_presence_of :name, :keyword
  validates_attachment_content_type :image, 
    content_type: ["image/jpg", "image/jpeg", "image/png", "image/gif"],
    size: { :in => 0..5.megabytes }

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

# -*- coding: utf-8 -*-
require 'rails_helper'

RSpec.describe FoodItem, type: :model do
  
  describe "validations" do

    it "validates with proper data" do
      expect(FactoryGirl.build(:food_item)).to be_valid
    end

    [ :name, :keyword ].each do |attr|
      it "fails to validate without #{attr}" do
        expect(FactoryGirl.build(:food_item, attr => "")).to_not be_valid
      end
    end

    it "validates without brand" do
      expect(FactoryGirl.build(:food_item, brand: "")).to be_valid
    end
  end

  describe "normalizations" do

    it "capitalizes brand name" do
      expect(FactoryGirl.create(:food_item, brand: "imlek").brand).to eq("Imlek")
    end

    it "downcases keyword" do
      expect(FactoryGirl.create(:food_item, keyword: "Jogurt").keyword).to eq("jogurt")
    end

  end

  describe "associations" do

    let(:fi) { FactoryGirl.create(:food_item) }

    it "has one nutritional value" do
      expect(fi).to respond_to(:nutritional_value)
    end

    it "returns correct nutritional value" do
      nv = FactoryGirl.create(:nutritional_value, food_item: fi)
      expect(fi.nutritional_value).to eq(nv)
    end
  end
end

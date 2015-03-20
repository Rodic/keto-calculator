require 'rails_helper'

RSpec.describe FoodItem, type: :model do
  
  describe "validations" do

    it "validates with proper data" do
      expect(FactoryGirl.build(:food_item)).to be_valid
    end

    it "fails to validate without name" do
      expect(FactoryGirl.build(:food_item, name: "")).to_not be_valid
    end

    it "validates without brand" do
      expect(FactoryGirl.build(:food_item, brand: "")).to be_valid
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

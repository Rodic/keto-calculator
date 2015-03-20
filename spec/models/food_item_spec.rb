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
end

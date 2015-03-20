require 'rails_helper'

RSpec.describe NutritionalValue, type: :model do
  
  describe "validations" do
    
    it "validates with proper data" do
      expect(FactoryGirl.build(:nutritional_value)).to be_valid
    end

    it "fails to validate without calories" do
      expect(FactoryGirl.build(:nutritional_value, calories: nil)).to_not be_valid
    end

    it "fails to validate without proteins" do
      expect(FactoryGirl.build(:nutritional_value, proteins: nil)).to_not be_valid
    end

    it "fails to validate without crbs" do
      expect(FactoryGirl.build(:nutritional_value, carbs: nil)).to_not be_valid
    end

    it "fails to validate without fats" do
      expect(FactoryGirl.build(:nutritional_value, fats: nil)).to_not be_valid
    end

    it "fails to validate without quantity" do
      expect(FactoryGirl.build(:nutritional_value, quantity: nil)).to_not be_valid
    end

    it "fails to validate without unit" do
      expect(FactoryGirl.build(:nutritional_value, unit: nil)).to_not be_valid
    end
  end

  describe "associations" do

    let(:fi) { FactoryGirl.create(:food_item) }
    let(:nv) { FactoryGirl.create(:nutritional_value, food_item: fi) }    

    it "belongs to food_item" do
      expect(nv).to respond_to(:food_item)
    end

    it "returns correct food_item" do
      expect(nv.food_item).to eq(fi)
    end
  end
end

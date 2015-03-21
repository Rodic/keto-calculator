require 'rails_helper'

RSpec.describe NutritionalValue, type: :model do
  
  describe "validations" do
    
    it "validates with proper data" do
      expect(FactoryGirl.build(:nutritional_value)).to be_valid
    end

    [ :calories, :proteins, :carbs, :fats, :quantity, :unit ].each do |attr|
      it "fails to validate without #{attr}" do
        expect(FactoryGirl.build(:nutritional_value, attr => nil)).to_not be_valid
      end
    end
    
    [ :calories, :carbs, :proteins, :fats, :quantity ].each do |attr|

      it "fails to validate when #{attr} are not numerical" do
        expect(FactoryGirl.build(:nutritional_value, attr => "a bunch")).to_not be_valid
      end
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

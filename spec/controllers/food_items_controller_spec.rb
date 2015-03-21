require 'rails_helper'

RSpec.describe FoodItemsController, type: :controller do

  describe "index" do

    it "renders correct template" do
      expect(get :index).to render_template("index")
    end
  end

  describe "new" do
    
    it "renders correct template" do
      expect(get :new).to render_template("new")
    end
  end

  describe "create" do

    context "successful creation" do

      let(:params) {{ food_item: FactoryGirl.attributes_for(:food_item).merge(
                        { nutritional_value_attributes: FactoryGirl.attributes_for(:nutritional_value) }
                      ) }}

      it "increases number of FoodItems in databse" do
        expect{ post :create, params }.to change(FoodItem, :count).by(1)
      end

      it "increases number of NutritionalValues in databse" do
        expect{ post :create, params }.to change(NutritionalValue, :count).by(1)
      end

      it "redirects to root page" do
        expect(post :create, params).to redirect_to(root_path)
      end
    end

    context "unsuccessful creation" do

      context "invalid food_item" do

        let(:params) {{ food_item: FactoryGirl.attributes_for(:food_item, name: nil).merge(
                        { nutritional_value_attributes: FactoryGirl.attributes_for(:nutritional_value) }
                      ) }}
        
        it "doesn't increase num of FoodItems in database" do
          expect{ post :create, params}.to_not change(FoodItem, :count)
        end

        it "doesn't increase num of NutritionalValue in database" do
          expect{ post :create, params}.to_not change(NutritionalValue, :count)
        end

        it "renders new page" do
          expect(post :create, params).to render_template("new")
        end
      end

      context "invalid nutritional_value" do

        let(:params) {{ food_item: FactoryGirl.attributes_for(:food_item).merge(
                        { nutritional_value_attributes: FactoryGirl.attributes_for(
                                                          :nutritional_value, fats: nil) }) }}
        
        it "doesn't increase num of FoodItems in database" do
          expect{ post :create, params}.to_not change(FoodItem, :count)
        end

        it "doesn't increase num of NutritionalValue in database" do
          expect{ post :create, params}.to_not change(NutritionalValue, :count)
        end

        it "renders new page" do
          expect(post :create, params).to render_template("new")
        end
      end
    end
  end
end

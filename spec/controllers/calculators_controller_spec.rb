require 'rails_helper'

RSpec.describe CalculatorsController, type: :controller do

  describe "index" do

    it "renders correct template" do
      expect(get :index).to render_template("index")
    end
  end

end

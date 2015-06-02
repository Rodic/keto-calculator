ActiveAdmin.register FoodItem do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # permit_params :list, :of, :attributes, :on, :model
  #
  # or
  #
  # permit_params do
  #   permitted = [:permitted, :attributes]
  #   permitted << :other if resource.something?
  #   permitted
  # end

  permit_params :name, :keyword, :brand, :approved,
                nutritional_value_attributes: [ 
                  :calories, :proteins, :carbs, :fats, :quantity, :unit 
                ]

  form do |f|
    f.inputs do
      f.input :name
      f.input :brand
      f.input :keyword

      f.has_many :nutritional_value, heading: 'Nutritional values', new_record: false do |nv|
        nv.input :proteins
        nv.input :carbs
        nv.input :fats
        nv.input :calories
        nv.input :quantity
        nv.input :unit
      end 

      f.input :approved
    end
    f.actions
  end

  controller do

    def new
      @food_item = FoodItem.new
      @food_item.build_nutritional_value
    end

    def create
      @food_item = FoodItem.new(permitted_params[:food_item].merge(humanizer_testing: true))
      if @food_item.save
        flash[:success] = "Namirnica je uspešno sačuvana."
        redirect_to admin_food_item_path(@food_item)
      else
        flash.now[:alert] = "Namirnica nije dodata. Molimo Vas da proverite ispravnost upisanih vrednosti."
        render :new
      end
    end

    def update
      @food_item = FoodItem.find(params[:id])
      if @food_item.update_attributes(permitted_params[:food_item])
         flash[:success] = "Namirnica je uspešno izmenjena."
         redirect_to admin_food_item_path(@food_item)
      else
         flash.now[:alert] = "Namirnica nije izmenjena. Molimo Vas da proverite ispravnost upisanih vrednosti."
         render :edit
      end
    end

  end
end

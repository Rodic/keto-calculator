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

  permit_params :name, :keyword, :brand, :image, :approved,
                nutritional_value_attributes: [ 
                  :calories, :proteins, :carbs, :fats, :quantity, :unit 
                ]

  form(html: {multipart: true}) do |f|
    f.inputs do
      f.input :name
      f.input :brand
      f.input :keyword
      f.input :image, as: :file

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

  member_action :approve, method: :put do
    @food_item = FoodItem.find(params[:id])
    @food_item.approved = true
    if @food_item.save
      flash[:success] = "Namirnica je odobrena"
      redirect_to admin_food_item_path(@food_item)
    end
  end

  show do
    attributes_table do
      row :name
      row :brand
      row :keyword
      row :proteins do |food_item|
        food_item.nutritional_value.proteins
      end
      row :carbs do |food_item|
        food_item.nutritional_value.carbs
      end
      row :fats do |food_item|
        food_item.nutritional_value.fats
      end
      row :calories do |food_item|
        food_item.nutritional_value.calories
      end
      row :quantity do |food_item|
        food_item.nutritional_value.quantity
      end
      row :unit do |food_item|
        food_item.nutritional_value.unit
      end
      row :approved
      row :created_at
      row :updated_at
      row :image do |food_item|
        image_tag(food_item.image.url)
      end
    end
  end

  index do
    column :id
    column :name
    column :brand
    column :keyword
    column :approved
    column "Image" do |food_item|
      if(food_item.image.exists?)
        image_tag(food_item.image.url(:thumb))
      else
        'No'
      end
    end
    column :created_at
    column :updated_at
    actions
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

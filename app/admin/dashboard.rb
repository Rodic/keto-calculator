ActiveAdmin.register_page "Dashboard" do

  menu priority: 1, label: proc{ I18n.t("active_admin.dashboard") }

  content title: proc{ I18n.t("active_admin.dashboard") } do

    panel "Waiting for approval" do
      table_for FoodItem.pending do
        column :name
        column :brand
        column :keyword
        column :proteins do |food_item|
          food_item.nutritional_value.proteins
        end
        column :carbs do |food_item|
          food_item.nutritional_value.carbs
        end
        column :fats do |food_item|
          food_item.nutritional_value.fats
        end
        column :quantity do |food_item|
          food_item.nutritional_value.quantity
        end
        column :unit do |food_item|
          food_item.nutritional_value.unit
        end
        column '' do |food_item|
          link_to "View", admin_food_item_path(food_item)
        end
        column '' do |food_item|
          link_to "Approve", approve_admin_food_item_path(food_item), method: :put
        end
        column '' do |food_item|
          link_to "Delete", admin_food_item_path(food_item), method: :delete
        end
      end
    end

    # Here is an example of a simple dashboard with columns and panels.
    #
    # columns do
    #   column do
    #     panel "Recent Posts" do
    #       ul do
    #         Post.recent(5).map do |post|
    #           li link_to(post.title, admin_post_path(post))
    #         end
    #       end
    #     end
    #   end

    #   column do
    #     panel "Info" do
    #       para "Welcome to ActiveAdmin."
    #     end
    #   end
    # end
  end # content
end

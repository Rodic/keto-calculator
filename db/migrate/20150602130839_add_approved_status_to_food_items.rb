class AddApprovedStatusToFoodItems < ActiveRecord::Migration
  def change
    add_column :food_items, :approved, :boolean, null: false, default: false
  end
end

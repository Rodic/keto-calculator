class AddColumnKeywordToFoodItems < ActiveRecord::Migration
  def change
    add_column :food_items, :keyword, :string
  end
end

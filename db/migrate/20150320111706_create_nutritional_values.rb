class CreateNutritionalValues < ActiveRecord::Migration
  def change
    create_table :nutritional_values do |t|
      t.decimal :calories, precision: 6, scale: 2
      t.decimal :proteins, precision: 6, scale: 2
      t.decimal :fats, precision: 6, scale: 2
      t.decimal :carbs, precision: 6, scale: 2
      t.integer :quantity
      t.string :unit
      t.integer :food_item_id

      t.timestamps
    end
  end
end

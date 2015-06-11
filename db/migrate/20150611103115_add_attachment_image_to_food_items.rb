class AddAttachmentImageToFoodItems < ActiveRecord::Migration
  def self.up
    change_table :food_items do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :food_items, :image
  end
end

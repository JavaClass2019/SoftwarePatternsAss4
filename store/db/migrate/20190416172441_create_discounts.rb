class CreateDiscounts < ActiveRecord::Migration[5.2]
  def change
    create_table :discounts do |t|
      t.string :description
      t.float :percentage
      t.boolean :is_active
      t.references :product, foreign_key: true

      t.timestamps
    end
  end
end

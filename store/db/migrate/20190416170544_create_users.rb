class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :fullname
      t.string :email
      t.string :password_digest
      t.string :shipment_address, null: true
      t.references :role, foreign_key: true
      t.references :payment_method, null: true, foreign_key: true

      t.timestamps
    end
  end
end

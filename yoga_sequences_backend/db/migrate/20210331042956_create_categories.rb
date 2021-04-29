class CreateCategories < ActiveRecord::Migration[5.2]
    create_table :categories do |t|
      t.integer :user_id
      t.string :name, default: 'Uncategorized'

      t.timestamps
    end
end

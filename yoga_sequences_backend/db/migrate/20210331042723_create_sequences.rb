class CreateSequences < ActiveRecord::Migration[5.2]
    create_table :sequences do |t|
      t.string :name
      t.integer :category_id
      t.timestamps
  end
end

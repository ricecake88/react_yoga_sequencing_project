class CreateYogaSequences < ActiveRecord::Migration[5.2]
  def change
    create_table :yoga_sequences do |t|
      t.string :name
      t.integer :pose_id
      t.string :category

      t.timestamps
    end
  end
end

class CreatePoses < ActiveRecord::Migration[5.2]
    create_table :poses do |t|
      t.string :name
      t.string :sanskrit
      t.text :tags, array:true
      t.string :pose_category
      t.string :url
      t.string :image
      t.string :video
      t.text :description

      t.timestamps
  end
end

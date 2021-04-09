class CreateYogaPoses < ActiveRecord::Migration[5.2]
  def change
    create_table :yoga_poses do |t|
      t.string :name
      t.string :sanskrit
      t.text :tags, array:true
      t.string :category
      t.string :url
      t.string :image
      t.string :video
      t.text :description

      t.timestamps
    end
  end
end

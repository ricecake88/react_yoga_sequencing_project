class CreateYogaPoseInSeqs < ActiveRecord::Migration[5.2]
  def change
    create_table :yoga_pose_in_seqs do |t|
      t.integer :yoga_seq_id
      t.integer :yoga_pose_id
      t.integer :num_breaths
      t.integer :yoga_pose_order

      t.timestamps
    end
  end
end

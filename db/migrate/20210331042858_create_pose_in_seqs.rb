class CreatePoseInSeqs < ActiveRecord::Migration[5.2]
    create_table :pose_in_seqs do |t|
      t.integer :sequence_id
      t.integer :pose_id
      t.integer :num_breaths
      t.integer :pose_order

      t.timestamps
    end
end

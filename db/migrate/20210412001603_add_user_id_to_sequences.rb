class AddUserIdToSequences < ActiveRecord::Migration[5.2]
  def change
    add_column :sequences, :user_id, :integer
  end
end

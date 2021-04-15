class ChangeCategoryIdColumnToSequences < ActiveRecord::Migration[5.2]
    def up
      change_column :sequences, :category_id, :integer, default: 0
    end
  end
  
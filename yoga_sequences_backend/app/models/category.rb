class Category < ApplicationRecord
    validates :name, presence: true, format: {with: /\A[\w\s]+\s*[\w\s\.&!\-]*\Z/ }
    validates_uniqueness_of :name, scope: :user_id
    belongs_to :user

    def self.set_deleted_category_to_uncategorized(id, current_user)
        sequences = Sequence.where(:user_id => current_user.id, :category_id => id)
        uncategorized_category = Category.find_by(:user_id => current_user.id, :name => "Uncategorized")
        sequences.each do |seq|
            seq.update(:category_id => uncategorized_category.id)
        end
    end
end

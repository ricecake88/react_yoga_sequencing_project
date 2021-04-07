class YogaCategory < ApplicationRecord
    validates_uniqueness_of :name, scope: :user_id    
    belongs_to :user
end

class YogaSequence < ApplicationRecord
    has_many :yoga_poses
    belongs_to :yoga_category
end

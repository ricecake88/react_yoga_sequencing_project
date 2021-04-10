class Sequence < ApplicationRecord
    has_many :poses
    belongs_to :category
end

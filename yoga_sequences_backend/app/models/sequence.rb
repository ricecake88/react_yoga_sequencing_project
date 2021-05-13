class Sequence < ApplicationRecord
    
    validates :name, presence: true, format: {with: /\A[\w\s]+\s*[\w\s\.&!\-]*\Z/ }
    validates_uniqueness_of :name, scope: :user_id

    belongs_to :category
    belongs_to :user
    #has_many :pose_in_seqs, inverse_of: :sequence, autosave: true
    has_many :pose_in_seqs, dependent: :destroy
    has_many :poses, through: :pose_in_seqs
    accepts_nested_attributes_for :pose_in_seqs, allow_destroy: true
    #accepts_nested_attributes_for :poses
end

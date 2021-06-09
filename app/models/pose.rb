class Pose < ApplicationRecord
    has_many :pose_in_seqs, inverse_of: :pose
    has_many :sequences, through: :pose_in_seqs
end

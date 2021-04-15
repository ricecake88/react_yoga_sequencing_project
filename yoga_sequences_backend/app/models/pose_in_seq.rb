class PoseInSeq < ApplicationRecord
    belongs_to :pose, inverse_of: :pose_in_seqs, autosave: true, optional: true
    belongs_to :sequence, inverse_of: :pose_in_seqs, autosave: true, optional: true
end

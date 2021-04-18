class Api::V1::SequencesController < ApplicationController
    before_action :authenticate_user!

    def index
        if current_user
            sequences = Sequence.find_by(:user_id => current_user.id)
            render json: {sequences: sequences}
        else
            render json: {errors: "Not Authorized."}
        end
    end

    def create
        if current_user
            Rails.logger.debug params.inspect
            sequence = Sequence.new(seq_params)
            if sequence.save!
                render json: {
                    sequence: {
                        id: sequence.id,
                        name: sequence.name,
                        category_id: sequence.category_id,
                        poses: sequence.poses,
                        poses_in_seq: sequence.pose_in_seqs
                    }}
            else
                render json: {errors: sequence.errors}
            end
        end
    end

    #private
    def seq_params
    #    Rails.logger.debug params.inspect
        params.permit(:name, :user_id, :category_id, pose_in_seqs_attributes: [:id, :pose_order, :pose_id, :num_breaths] )
    end

end

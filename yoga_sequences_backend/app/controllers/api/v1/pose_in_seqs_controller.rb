class Api::V1::PoseInSeqsController < ApplicationController

    before_action :authenticate_user!

    def create
        Rails.logger.debug params.inspect
        pose = PoseInSeq.new(pose_in_seq_params)
        if pose.save!
            render json: { pose: pose }
        else
            render json: { errors: pose.errors }
        end
    end

    def destroy
        poseInSeq = PoseInSeq.find(params[:id])
        if poseInSeq.destroy
            render json: {poseInSeq: poseInSeq}
        else
            render json: {errors: poseInSeq.errors}
        end
    end

    def pose_in_seq_params
        params.permit(:sequence_id, :pose_id, :num_breaths, :pose_order)
    end
end
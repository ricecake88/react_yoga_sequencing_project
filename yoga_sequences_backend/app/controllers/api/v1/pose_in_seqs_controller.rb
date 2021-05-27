class Api::V1::PoseInSeqsController < ApplicationController

    before_action :authenticate_user!

    def index 
        poses = PoseInSeq.where(:sequence => params[:sequence_id])
        render json: {pose_in_seqs: poses}, status: 200
    end

    def create
        Rails.logger.debug params.inspect
        pose = PoseInSeq.new(pose_in_seq_params)
        if pose.save!
            render json: { pose: pose }, status: 200
        else
            render json: { error: pose.errors }, status: 422
        end
    end

    def destroy
        poseInSeq = PoseInSeq.find(params[:id])
        if poseInSeq.destroy
            render json: {poseInSeq: poseInSeq}, status: 200
        else
            render json: {error: poseInSeq.errors}, status: 400
        end
    end

    def pose_in_seq_params
        params.permit(:sequence_id, :pose_id, :num_breaths, :pose_order)
    end
end
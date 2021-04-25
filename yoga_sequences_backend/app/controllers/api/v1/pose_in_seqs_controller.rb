class Api::V1::PoseInSeqsController < ApplicationController
    def destroy
        poseInSeq = PoseInSeq.find(params[:id])
        if poseInSeq.destroy
            render json: {poseInSeq: poseInSeq}
        else
            render json: {errors: poseInSeq.errors}
        end
    end
end
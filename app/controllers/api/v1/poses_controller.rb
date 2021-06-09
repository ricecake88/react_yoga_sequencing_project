class Api::V1::PosesController < ApplicationController

    def index
            poses = Pose.all
            render json: {poses: poses}
    end

    def show
            pose = Pose.find(:id => params[:id])
            if pose
                render json: {pose: pose}
            else
                render json: {error: "Pose not found."}, status: 400
            end
    end

end
class Api::V1::PosesController < ApplicationController
    before_action :authenticate_user!

    def index

        if current_user
            poses = Pose.all
            render json: {poses: poses}
        end
    end

    def show
        if current_user
            pose = Pose.find(:id => params[:id])
            if pose
                render json: {pose: pose}
            else
                render json: {error: "Pose not found."}, status: 400
            end
        end
    end

end
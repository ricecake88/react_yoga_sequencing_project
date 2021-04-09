class Api::V1::YogaPosesController < ApplicationController
    before_action :authenticate_user!

    def index
        
        if current_user
            yoga_poses = YogaPose.all
            render json: {yoga_poses: yoga_poses}
        else
            render json: {errors: "Not Authorized"}
        end
    end

end
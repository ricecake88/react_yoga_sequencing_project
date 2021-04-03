class Api::V1::UsersController < ApplicationController
    before_action :set_user, only: [:update]

    def index
        @users = User.all
        render json: @users
    end

    def create
        @user = User.new(user_params)
        if @user.save
            render json: @user, status: :created, location: @user
        else
            render json: @user.errors, status: :unprocessable_entity
        end
    end

    def update
        # check for logged in to do this
        if @user.update(user_prams)
            render json: @user
        else
            render json: @user.errors, status: unprocessable_entity
        end
    end

    private
    def set_user
        @user = User.find(params[:id])
    end

    def user_params
        params.require(:user).permit(:name, :email, :password_digest)
    end
end
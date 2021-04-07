class Api::V1::YogaCategoriesController < ApplicationController
    before_action :authenticate_user!
    def index
        Rails.logger.debug params.inspect
        if current_user
            categories = YogaCategory.where(:user_id => params[:user_id])
            render json: {categories: categories}
        else
            render json: {errors: "Error, no current_user"}
        end
    end

    def create
        Rails.logger.debug params.inspect
        yoga_category = YogaCategory.new(:name=> params[:name], :user_id => current_user.id)
        if yoga_category.save!
            #yoga_category.user = current_user
            render json: {category: yoga_category}
        else
            render json: {errors: yoga_category.errors}
        end
    end

    def update
        render json: {errors: "Not yet implemented"}
    end

end
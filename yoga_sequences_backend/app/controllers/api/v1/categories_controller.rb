class Api::V1::CategoriesController < ApplicationController
    before_action :authenticate_user!
    def index
        Rails.logger.debug params.inspect
        if current_user
            categories = Category.where(:user_id => params[:user_id])
            render json: {categories: categories}
        else
            render json: {errors: "Error, no current_user"}
        end
    end

    def create
        Rails.logger.debug params.inspect
        category = Category.new(:name=> params[:name], :user_id => current_user.id)
        if category.save!
            category.user = current_user
            render json: {category: category}
        else
            render json: {errors: category.errors}
        end
    end

    def update
        render json: {errors: "Not yet implemented"}
    end

    def destroy
        category = Category.find(params[:id])
        Category.set_deleted_category_to_uncategorized(category.id, current_user)
        if category.delete
            render json: {category: category}
        else
            render json: {errors: category.errors}
        end
    end

end
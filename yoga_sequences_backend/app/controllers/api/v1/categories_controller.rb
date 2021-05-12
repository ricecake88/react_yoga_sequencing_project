class Api::V1::CategoriesController < ApplicationController
    before_action :authenticate_user!
    def index
        Rails.logger.debug params.inspect
        if current_user
            categories = Category.where(:user_id => params[:user_id]).order(id: :DESC)
            render json: {categories: categories}, status: 200
        else
            render json: {errors: "Unauthorized"}, status: 401
        end
    end

    def create
        Rails.logger.debug params.inspect
        unless !current_user
            category = Category.new(:name=> params[:name], :user_id => current_user.id)
            if category.save
                category.user = current_user
                render json: {category: category}, status: 200
            else
                render json: {errors: category.errors.full_messages.first}, status: 422
            end
        end
    end

    def destroy
        unless !current_user
            category = Category.find(params[:id])
            Category.set_deleted_category_to_uncategorized(category.id, current_user)
            if category.delete
                render json: {category: category}, status: 200
            else
                render json: {errors: category.errors.full_messages.first}
            end
        end
    end

end
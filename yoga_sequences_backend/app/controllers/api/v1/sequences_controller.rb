class Api::V1::SequencesController < ApplicationController
    before_action :authenticate_user!

    def create
        Rails.logger.debug params.inspect
        sequence = Sequence.new(:name => params[:name], :category_id => params[:category_id])
        if sequence.save!
            render json: {sequence: sequence}
        else
            render json: {errors: sequence.errors}
        end
    end

end

class Api::V1::SequencesController < ApplicationController
    before_action :authenticate_user!

    def index
        if current_user
            sequences = Sequence.where(:user_id => current_user.id)
            #render json: {sequences: sequences}
            #render :json => {:sequences => sequences}.to_json(:include => :pose_in_seqs)
            render json: {:sequences => sequences}.to_json({:include => [:pose_in_seqs, :poses, :category]})
        else
            render json: {errors: "Not Authorized."}
        end
    end

    def create
        if current_user
            Rails.logger.debug params.inspect
            sequence = Sequence.new(seq_params)
            if sequence.save!
                render json: {
                    sequence: {
                        id: sequence.id,
                        name: sequence.name,
                        category: sequence.category,
                        poses: sequence.poses,
                        pose_in_seqs: sequence.pose_in_seqs
                    }}
            else
                render json: {errors: sequence.errors}
            end
        end
    end

    def update
        if current_user
            Rails.logger.debug params.inspect
            sequence = Sequence.find(params[:id])
            sequence.attributes = seq_params
            if sequence.save
                render json: {
                    sequence: {
                        id: sequence.id,
                        name: sequence.name,
                        category: sequence.category,
                        poses: sequence.poses,
                        pose_in_seqs: sequence.pose_in_seqs
                    }}
            else
                render json: {errors: sequence.errors}
            end
        end
    end

    def destroy
        Rails.logger.debug params.inspect
        sequence = Sequence.find(params[:id])
        if sequence.delete
            render json: { sequence: sequence}
        else
            render json: { errors: sequence.errors}
        end
    end

    #private
    def seq_params
    #    Rails.logger.debug params.inspect
        params.permit(:name, :user_id, :category_id, pose_in_seqs_attributes: [:id, :pose_order, :pose_id, :num_breaths] )
    end

end

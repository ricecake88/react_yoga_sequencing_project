class Api::V1::SequencesController < ApplicationController
    before_action :authenticate_user!

    def index
        if current_user
            sequences = Sequence.where(:user_id => current_user.id)
            render json: {:sequences => sequences}.to_json({:include => [:pose_in_seqs, :poses, :category]}), status: 200
        end
    end

    def show
        if current_user
            Rails.logger.debug params.inspect
            sequence = Sequence.find_by(:id => params[:id], :user_id => current_user.id)
            if sequence
                render json: {
                    sequence: {
                        id: sequence.id,
                        name: sequence.name,
                        category: sequence.category,
                        poses: sequence.poses,
                        pose_in_seqs: sequence.pose_in_seqs.each{|pose_in_seq| {
                            pose_order: pose_in_seq.pose_order,
                            pose_id: pose_in_seq.pose_id,
                            num_breaths: pose_in_seq.num_breaths,
                            sequence_id: sequence.id
                            }}
                    }
                }, status: 200
            else
                render json: {error: "Sequence not found"}, status: 404
            end
        end
    end

    def create
        if current_user
            Rails.logger.debug params.inspect
            sequence = Sequence.new(seq_params)
            if sequence.save
                render json: {
                    sequence: {
                        id: sequence.id,
                        name: sequence.name,
                        category: sequence.category,
                        poses: sequence.poses,
                        pose_in_seqs: sequence.pose_in_seqs.each{|pose_in_seq| {
                            pose_order: pose_in_seq.pose_order,
                            pose_id: pose_in_seq.pose_id,
                            num_breaths: pose_in_seq.num_breaths,
                            sequence_id: sequence.id
                            }}
                    }}, status: 200
            else
                render json: {error: sequence.errors.full_messages.first }, status: 422
            end
        end
    end

    def update
        if current_user
            Rails.logger.debug params.inspect
            sequence = Sequence.find(params[:id])
            #sequence.attributes = seq_params
            #if sequence.save
            if sequence.update(seq_params)
                sequence.save
                render json: {
                    sequence: {
                        id: sequence.id,
                        name: sequence.name,
                        category: sequence.category,
                        poses: sequence.poses,
                        pose_in_seqs: sequence.pose_in_seqs.each{|pose_in_seq| {
                            pose_order: pose_in_seq.pose_order,
                            pose_id: pose_in_seq.pose_id,
                            num_breaths: pose_in_seq.num_breaths,
                            sequence_id: sequence.id
                            }}
                    }}, status: 200
            else
                render json: {error: sequence.errors.full_messages.first }, status: 422
            end
        end
    end

    def destroy
        Rails.logger.debug params.inspect
        sequence = Sequence.find(params[:id])
        if sequence.delete
            render json: { sequence: sequence }, status: 200
        else
            render json: { error: sequence.errors.full_messages.first }, status: 400
        end
    end

    #private
    def seq_params
    #    Rails.logger.debug params.inspect
        params.permit(:name, :user_id, :category_id, pose_in_seqs_attributes: [:id, :pose_order, :pose_id, :num_breaths] )
    end

end

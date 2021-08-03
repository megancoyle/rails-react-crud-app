class Api::V1::RecordsController < ApplicationController
    before_action :set_record, only: [:show, :edit, :update, :destroy]
    
    def index
        @records = Record.all
    end

    def show
        respond_to do |format|
            format.json { render :show }
        end
    end

    def create
        @record = Record.create(record_params)

        respond_to do |format|
          if @record.save
            format.json { render :show, status: :created, location: api_v1_record_path(@record) }
          else
            format.json { render json: @record.errors, status: :unprocessable_entity }
          end
        end
    end

    def update
        respond_to do |format|
            if @record.update(record_params)
              format.json { render :show, status: :ok, location: api_v1_record_path(@record) }
            else
              format.json { render json: @record.errors, status: :unprocessable_entity }
            end
        end
    end

    def destroy
        @record.destroy
          respond_to do |format|
            format.json { head :no_content }
        end
    end

    private
        def set_record
            @record = Record.find(params[:id])
        end

        def record_params
            params.require(:record).permit(:artist, :album, :year, :condition)
        end
end

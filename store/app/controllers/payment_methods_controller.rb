class PaymentMethodsController < ApplicationController
  skip_before_action :authorize_request, only: :index
  before_action :set_payment_method, only: [:show, :update, :destroy]

  # GET /payment_methods
  def index
    @payment_methods = PaymentMethod.all

    render json: @payment_methods
  end

  # GET /payment_methods/1
  def show
    render json: @payment_method
  end

  # POST /payment_methods
  def create
    @payment_method = PaymentMethod.new(payment_method_params)

    if @payment_method.save
      render json: @payment_method, status: :created, location: @payment_method
    else
      render json: @payment_method.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /payment_methods/1
  def update
    if @payment_method.update(payment_method_params)
      render json: @payment_method
    else
      render json: @payment_method.errors, status: :unprocessable_entity
    end
  end

  # DELETE /payment_methods/1
  def destroy
    @payment_method.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_payment_method
      @payment_method = PaymentMethod.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def payment_method_params
      params.require(:payment_method).permit(:name)
    end
end

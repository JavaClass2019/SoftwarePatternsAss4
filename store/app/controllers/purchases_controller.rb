class PurchasesController < ApplicationController
  skip_before_action :authorize_request, only: [:create, :index]
  before_action :set_purchase, only: [:show, :update, :destroy]

  # GET /purchases
  def index
    @purchases = Purchase.includes(:product).where(user_id: params[:user_id]).order(created_at: :desc)
    render json: @purchases.collect { |purchase| purchase.attributes.merge!({ product: purchase.product }) }
  end

  # GET /purchases/1
  def show
    render json: @purchase
  end

  # POST /purchases
  def create
    return render :nothing => true, status: :bad_request unless params[:products].respond_to?(:each)
    params[:products].each do |product|
      Product.update product, :is_available => false
      Purchase.create(user_id: params[:user_id], product_id: product)
    end
    render :nothing => true, status: :no_content
  end

  # PATCH/PUT /purchases/1
  def update
    if @purchase.update(purchase_params)
      render json: @purchase
    else
      render json: @purchase.errors, status: :unprocessable_entity
    end
  end

  # DELETE /purchases/1
  def destroy
    @purchase.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_purchase
      @purchase = Purchase.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def purchase_params
      params.require(:purchase).permit(:user_id, :product_id)
    end
end

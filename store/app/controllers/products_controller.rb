class ProductsController < ApplicationController
  skip_before_action :authorize_request, only: [:index, :create, :show, :destroy]
  before_action :set_product, only: [:show, :update, :destroy]

  # GET /products
  def index
    @products = Product.where(is_available: true).order(created_at: :desc)

    render json: @products
  end

  # GET /products/1
  def show
    render json: @product
  end

  # POST /products
  def create
    @product = Product.new(product_params)
    @product.user_id = params[:user_id]

    if @product.save
      render json: @product, status: :created, location: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /products/1
  def update
    if @product.update(product_params)
      render json: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # DELETE /products/1
  def destroy
    @product.is_available = false
    @product.save
    render nothing: true, status: :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      @product = Product.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def product_params
      params.require(:product).permit(:name, :price, :manufacturer_id, :is_available, :img_url, :category_id, :user_id)
    end
end

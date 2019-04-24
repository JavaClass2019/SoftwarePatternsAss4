class AuthenticationController < ApplicationController
  skip_before_action :authorize_request, only: :authenticate
  # return auth token once user is authenticated
  def authenticate
    auth_token = AuthenticateUser.new(auth_params[:email], auth_params[:password]).call
    user = User.find_by_email(auth_params[:email])
    render json: user.attributes.merge!({ token: auth_token, role: Role.find(user.role_id) })
  end

  private

  def auth_params
    params.permit(:email, :password)
  end
end
# app/controllers/api/sessions_controller.rb
module Api
class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def create
    # Используем метод Devise для создания сессии
    Rails.logger.info("Received login request: #{params.inspect}")  # Логируем параметры запроса
    user = User.find_by(email: params[:email])

    if user&.valid_password?(params[:password])
      sign_in(user)  # Devise аутентифицирует пользователя
      render json: { message: 'Successfully logged in', user: user }, status: :ok
    else
      render json: { error: 'Invalid credentials' }, status: :unauthorized
    end
  end
end
end

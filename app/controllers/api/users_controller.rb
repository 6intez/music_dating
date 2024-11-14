# app/controllers/api/users_controller.rb
module Api
  class UsersController < ApplicationController
    before_action :authenticate_user!  # Если вы используете Devise для аутентификации пользователей

    # Метод для обработки API-запроса /api/my_profile
    def my_profile
      @user = current_user  # Получаем текущего пользователя
      audio_files = @user.audio_files.map { |file| { url: url_for(file) } }  # Получаем URL аудиофайлов

      # Возвращаем JSON с информацией о пользователе и аудиофайлах
      render json: { user: @user, audio_files: audio_files }
    end
  end
end

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
    def show
      @user = User.where.not(id: current_user.id)
                  .where.not(id: current_user.liked_users.pluck(:id))
                  .order("RANDOM()").first

      if @user.nil?
        render json: { no_more_users: true }, status: :ok
      else
        render json: {
          user: {
            name: @user.name,
            id: @user.id,
            audio_files: @user.audio_files.map { |audio| { url: url_for(audio) } }
          },
          no_more_users: false
        }, status: :ok
      end
    end

    def skip
      @user = current_user
      # Ищем следующего пользователя, исключая текущего
      @next_user = User.where.not(id: @user.id).order("RANDOM()").first

      # Если больше нет пользователей, отправляем сообщение
      if @next_user.nil?
        render json: { message: "Больше нет доступных пользователей." }, status: :ok
      else
        # Возвращаем данные следующего пользователя с аудиофайлами
        render json: {
          user: {
            id: @next_user.id,  # Включаем id пользователя для корректной обработки в front-end
            name: @next_user.name,
            audio_files: @next_user.audio_files.map { |audio| { url: url_for(audio) } }
          },
          no_more_users: false
        }, status: :ok
      end
    rescue ActiveRecord::RecordNotFound => e
      render json: { error: 'Пользователь не найден' }, status: :unprocessable_entity
    end

    def collaborations
      @matches = current_user.matches # или другой метод для получения коллабораций
      render json: @matches, include: :audio_files
    end

  end
end

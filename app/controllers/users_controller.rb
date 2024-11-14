class UsersController < ApplicationController
  before_action :authenticate_user! # Для защиты страницы, чтобы доступ был только у авторизованных пользователей

  def my_profile
    @user = current_user
    audio_files = @user.audio_files.map { |file| { url: url_for(file) } }

    if request.format.json?
      render json: { user: @user, audio_files: audio_files }
    else
      render :my_profile
    end
  end


  def show
    @user = User.where.not(id: current_user.id).where.not(id:current_user.liked_users.pluck(:id)).order("RANDOM()").first

    if @user.nil?
      flash[:notice] = "Нет доступных профилей для просмотра."
      @no_more_users = true # Флаг для отображения сообщения в представлении
      redirect_to my_profile_path and return
    else
      @no_more_users = false
    end
  end




  def skip
    @user = current_user
    @next_user = User.where.not(id: @user.id).order("RANDOM()").first

    if @next_user.nil?
      flash[:notice] = "Больше нет доступных пользователей."
      redirect_to my_profile_path
    else
      redirect_to user_path(@next_user)
    end
  end
  def collaborations
    @matches = current_user.matches
  end

end

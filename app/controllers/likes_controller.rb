class LikesController < ApplicationController
  include LikesHelper
  before_action :authenticate_user!

  def create
    @liked_user = User.find(params[:id])
    result = like_user(current_user, @liked_user)

    if result[:error]
      flash[:alert] = result[:error]
    else
      flash[:notice] = "Вы поставили лайк пользователю #{@liked_user.name}."
    end

    @next_user = User.where.not(id: current_user.id).order("RANDOM()").first
    if @next_user.nil?
      flash[:notice] ||= "Больше нет доступных пользователей."
      redirect_to my_profile_path
    else
      redirect_to user_path(@next_user)
    end
  end
end

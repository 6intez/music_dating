class LikesController < ApplicationController
  before_action :authenticate_user!

  def create
    @liked_user = User.find(params[:id])

    existing_like = Like.find_by(liker: current_user, liked: @liked_user)

    if existing_like
      flash[:alert] = "Вы уже поставили лайк этому пользователю."
    else
      @like = Like.new(liker: current_user, liked: @liked_user)
      if @like.save
        flash[:notice] = "Вы поставили лайк пользователю #{@liked_user.name}."
      else
        flash[:alert] = "Не удалось поставить лайк."
      end
    end
    @next_user = User.where.not(id: current_user.id).order("RANDOM()").first
    if @next_user.nil?
      flash[:notice] = "Больше нет доступных пользователей."
      redirect_to my_profile_path
    else
      redirect_to user_path(@next_user)
    end
  end
end

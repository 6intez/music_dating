module Api

    class LikesController < ApplicationController
      include LikesHelper
      before_action :authenticate_user!

      def create
        Rails.logger.info("Полученные параметры: #{params.inspect}")
        liked_user = User.find(params[:id])

        if current_user.liked_users.include?(liked_user)
          render json: { message: "Вы уже поставили лайк этому пользователю." }, status: :unprocessable_entity
        else
          like = current_user.likes.build(liked: liked_user)
          if like.save
            render json: { message: "Лайк поставлен.", liked_user: liked_user.id }, status: :created
          else
            render json: { errors: like.errors.full_messages }, status: :unprocessable_entity
          end
        end
    end
  end
end

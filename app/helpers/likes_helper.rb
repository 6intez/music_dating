module LikesHelper
  def like_user(current_user, liked_user)
    if current_user.liked_users.include?(liked_user)
      { error: "Вы уже поставили лайк этому пользователю." }
    else
      like = current_user.likes.build(liked: liked_user)
      if like.save
        { success: "Лайк поставлен.", liked_user: liked_user }
      else
        { error: like.errors.full_messages.join(", ") }
      end
    end
  end
end

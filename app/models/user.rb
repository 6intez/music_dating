class User < ApplicationRecord
  # Devise modules
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable

  # Active Storage association for audio files
  has_many_attached :audio_files
  has_many :likes, foreign_key: :liker_id, dependent: :destroy
  has_many :liked_users, through: :likes, source: :liked

  # Дополнительно, если нужно, для получения пользователей, которые лайкнули текущего пользователя
  has_many :received_likes, class_name: 'Like', foreign_key: :liked_id, dependent: :destroy
  # Validation for name and audio files
  def matches
    liked_users = Like.where(liker_id: id).pluck(:liked_id)
    liker_users = Like.where(liked_id: id).pluck(:liker_id)
    User.where(id: liked_users & liker_users)
  end
  validates :name, presence: true
  validates :audio_files, length: { is: 3, message: 'You must upload exactly 3 audio files' }
end

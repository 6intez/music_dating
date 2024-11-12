class Like < ApplicationRecord
  belongs_to :liker, class_name: 'User'
  belongs_to :liked, class_name: 'User'

  validates :liker_id, presence: true
  validates :liked_id, presence: true
  validates :liker_id, uniqueness: { scope: :liked_id }
end

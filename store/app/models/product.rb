class Product < ApplicationRecord
  scope :is_available, -> { where(is_available: true) }
  belongs_to :manufacturer
  belongs_to :category
  belongs_to :user
  has_many :reviews
end

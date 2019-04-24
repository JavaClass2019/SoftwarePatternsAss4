class User < ApplicationRecord
  # has an encrypted password
  has_secure_password

  belongs_to :role
  belongs_to :payment_method, optional: true
  has_many :purchases
  validates_presence_of :fullname, :email, :password_digest, :role_id
end

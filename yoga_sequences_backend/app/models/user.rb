class User < ApplicationRecord
    has_secure_password
    has_many :yoga_sequences
    has_many :yoga_categories
end

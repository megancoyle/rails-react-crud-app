class Record < ApplicationRecord
    default_scope { order(created_at: :desc) }
    validates :artist, presence: true
end

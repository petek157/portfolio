class Project < ApplicationRecord

    has_and_belongs_to_many :teches
    has_many_attached :image
    has_one_attached :main_image
end

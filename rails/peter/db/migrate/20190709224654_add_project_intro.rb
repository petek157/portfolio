class AddProjectIntro < ActiveRecord::Migration[5.2]
  def up
    add_column(:projects, :intro, :string)
  end

  def down 
    remove_column(:projects, :intro)
  end
end

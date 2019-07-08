class UpdateProjectwithLinks < ActiveRecord::Migration[5.2]
  def up
    add_column(:projects, :publicUrl, :string)
    add_column(:projects, :adminUrl, :string)
    add_column(:projects, :gitUrl, :string)
  end

  def down 
    remove_column(:projects, :publicUrl)
    remove_column(:projects, :adminUrl)
    remove_column(:projects, :gitUrl)
  end
end

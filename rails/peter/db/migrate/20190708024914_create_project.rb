class CreateProject < ActiveRecord::Migration[5.2]
  def up
    create_table :projects do |t|
      t.string 'title', :null => false, :limit => 50
      t.string
    end
  end

  def down

  end
end

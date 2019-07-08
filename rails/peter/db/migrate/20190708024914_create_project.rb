class CreateProject < ActiveRecord::Migration[5.2]
  def up
    create_table :projects do |t|
      t.string 'title', :null => false, :limit => 50
      t.string 'description'
      t.timestamps
    end
  end

  def down
    drop_table :projects
  end
end

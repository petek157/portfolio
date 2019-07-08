class CreateTech < ActiveRecord::Migration[5.2]
  def up
    create_table :teches do |t|
      t.string 'name'
      t.timestamps
    end
  end

  def down
    drop_table :teches
  end
end

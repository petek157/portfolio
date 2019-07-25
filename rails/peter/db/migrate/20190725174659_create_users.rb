class CreateUsers < ActiveRecord::Migration[5.2]
  def up
    create_table :users do |t|
      t.column "first_name", :string, :limit => 25
      t.string "last_name", :limit => 50
      t.string "email", :default => '', :null => false, :limit => 100
      t.string "username", :limit => 25
      t.string "password_digest"
      t.string "role", :limit => 25
      t.timestamps
    end
    add_index("users", "username")
  end

  def down
    drop_table :users
  end
end

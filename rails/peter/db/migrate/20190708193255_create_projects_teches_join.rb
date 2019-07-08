class CreateProjectsTechesJoin < ActiveRecord::Migration[5.2]
  def up
    create_table :projects_teches, :id => false do |t|
      t.integer 'project_id'
      t.integer 'tech_id'
    end
    add_index('projects_teches', ['project_id', 'tech_id'])
  end

  def down
    drop_table :projects_teches
  end
end

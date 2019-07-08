class ProjectsController < ApplicationController
  def index
    @projects = Project.all
  end

  def show
  end

  def new
    @project = Project.new()
  end

  def create
    @project = Project.new(project_params)

    if @project.save
      flash[:notice] = "#{@project.title} was created successfully."
      redirect_to(projects_path())
    else
       render('new')
    end
  end

  def edit
    @project = Project.find(params[:id])
  end

  def update
    @project = Project.find(params[:id])

    if @project.update_attributes(project_params)
      flash[:notice] = "#{@project.title} was updated successfully."
      redirect_to(project_path(@project))
    else
      render('edit')
    end
  end

  def delete
  end

  private

  def project_params
    params.require(:project).permit(:title, :description, :tech_ids, :publicUrl, :adminUrl, :gitUrl)
  end
end

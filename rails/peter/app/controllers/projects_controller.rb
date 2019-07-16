class ProjectsController < ApplicationController
  def index
    @projects = Project.all
  end

  def show
    @project = Project.find(params[:id])
    @images = @project.image
  end

  def new
    @project = Project.new()
  end

  def create
    project = Project.create!(project_params)

    flash[:notice] = "#{project.title} was created successfully."
    redirect_to(projects_path())

  end

  def edit
    @project = Project.find(params[:id])
    @from = params[:from]
  end

  def update
    @project = Project.find(params[:id])
    # if params[:main_image] != nil
    #   @project.main_image.purge
    #   @project.main_image.attach(params[:main_image])
    # end
    

    # @project.image.attach(params[:image])
    if @project.update_attributes(project_params)
      
      flash[:notice] = "#{@project.title} was updated successfully."
      if params[:from] == 's'
        redirect_to(project_path(@project))
      else 
        redirect_to(projects_path())
      end
    else
      render('edit')
    end
  end

  def delete
    @project = Project.find(params[:id])
  end

  def destroy
    @project = Project.find(params[:id])
    @project.destroy

    flash[:notice] = "#{@project.title} was deleted successfully."
    flash[:success] = true
    redirect_to(projects_path())
  end

  private

  def project_params
    params.require(:project).permit(:title, :description, :publicUrl, :adminUrl, :gitUrl, :intro, :main_image, image: [], :tech_ids => [])
  end
end

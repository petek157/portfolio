class AccessController < ApplicationController
  def menu
    projects = Project.all
    redirect_to project_path(projects[0])
  end

  def login
  end

  def attempt_login
    if params[:username].present? && params[:password].present?
      found_user = User.where(:username => params[:username]).first
      if found_user
        auth_user = found_user.authenticate(params[:password])
      end
    end

    if auth_user

      session[:user_id] = auth_user.id
      redirect_to projects_path()

    else
      flash.now[:notice] = "Invalid username/password"
      render('login')
    end
  end

  def logout
    session[:user_id] = nil
    flash[:notice] = 'Logged Out'
    redirect_to access_menu_path
  end
end

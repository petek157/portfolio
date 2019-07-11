class HomeController < ApplicationController
  def index
    @projects = Project.all
  end

  def resume
  end

  def detail
    @projects = Project.all
  end

  def contact
  end
end

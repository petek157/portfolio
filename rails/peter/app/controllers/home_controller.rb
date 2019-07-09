class HomeController < ApplicationController
  def index
    @projects = Project.all
  end

  def resume
  end

  def detail
  end

  def contact
  end
end

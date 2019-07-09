Rails.application.routes.draw do

  root 'home#index'
  get 'resume', :to => 'home#resume'
  get 'details', :to => 'home#detail'
  get 'contact', :to => 'home#contact'

  get 'home/index'
  get 'home/resume'
  get 'home/detail'


  resources :projects do
    member do
      get :delete
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

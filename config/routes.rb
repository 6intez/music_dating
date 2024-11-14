Rails.application.routes.draw do
  # config/routes.rb
  root 'home#index'

  devise_for :users
  get 'my_profile', to: 'users#my_profile', as: :my_profile


  delete 'signout', to: 'devise/sessions#destroy', as: :signout
  namespace :api do
    get 'my_profile', to: 'users#my_profile'
    get 'users/show', to: 'users#show'
    post 'users/skip', to: 'users#skip'
  end
  # Маршрут для профиля других пользователей
  resources :users, only: [:show]
  resources :users do
    post 'skip', on: :member
  end
  # Маршрут для лайков
  post 'like/:id', to: 'likes#create', as: :like_user

  # Страница "Мои коллаборации"
  get 'my_collaborations', to: 'users#collaborations', as: :my_collaborations

  # Проверка состояния сервера
  get "up" => "rails/health#show", as: :rails_health_check
end

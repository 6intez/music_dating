Rails.application.routes.draw do
  root 'home#index'

  devise_for :users
  get 'my_profile', to: 'users#my_profile', as: :my_profile

  delete 'signout', to: 'devise/sessions#destroy', as: :signout

  namespace :api do
    get 'my_profile', to: 'users#my_profile'
    get 'users/show', to: 'users#show'
    get 'users/collaborations', to: 'users#collaborations'
    post 'users/skip', to: 'users#skip'
    post 'like/:id', to: 'likes#create', as: 'like_user'  # Важно использовать likes
  end

  resources :users, only: [:show] do
    post 'skip', on: :member
    resources :likes, only: [:create], module: :users  # Лайки под пользователями
  end

  resources :likes, only: [:create]  # Общий лайк по ID

  # Страница "Мои коллаборации"
  get 'my_collaborations', to: 'users#collaborations', as: :my_collaborations

  # Проверка состояния сервера
  get "up" => "rails/health#show", as: :rails_health_check
end

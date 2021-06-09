Rails.application.routes.draw do
  #namespace :api do
  #  namespace :v1 do

  #    end
  #  end

    # devise_for :users, path: 'api/v1/users', path_names: {
    #   sign_in: 'login',
    #   sign_out: 'logout',
    #   registration: 'signup'
    # },
    # controllers: {
    #   sessions: 'api/v1/users/sessions',
    #   registrations: 'api/v1/users/registrations'
    #  }

     namespace :api, as: nil do
      namespace :v1, as: nil do |version|
        devise_for :users,
          path_names: {
            sign_in: 'login',
            sign_out: 'logout',
            registration: 'signup'
          },
          controllers: {
            registrations: "api/v1/users/registrations",
            sessions: "api/v1/users/sessions",
          }
          resources :categories
          resources :sequences
          resources :poses, only: [:index, :show]
          resources :pose_in_seqs, only: [:create, :destroy]
      end
    end

    get '/api/v1/users/current_user', to: 'api/v1/users/current_user#index'
  ## For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #namespace :api do
  #  namespace :v1 do
  #    resources :users, only: [:create, :update, :index]
  #  end
  # end
end

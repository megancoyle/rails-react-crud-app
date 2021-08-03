Rails.application.routes.draw do
  root 'pages#home'
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :records, only: [:index, :show, :create, :update, :destroy]
    end
  end
end

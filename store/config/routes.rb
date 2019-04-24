Rails.application.routes.draw do
  resources :purchases
  resources :discounts
  resources :products do
    resources :reviews
  end
  post 'users/login', to: 'authentication#authenticate'
  post 'users/customer', to: 'users#add_customer'
  post 'users/admin', to: 'users#add_admin'
  resources :users do
    resources :purchases
    resources :products
  end
  resources :manufacturers
  resources :payment_methods
  resources :roles
  resources :categories
end

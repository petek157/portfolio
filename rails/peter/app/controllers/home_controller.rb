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

  def donate

    require 'sendgrid-ruby'
    include SendGrid
    
    Stripe.api_key = Rails.application.credentials.dig(:stripe, :sand_sec_key)

    token = params[:stripeToken]
    first = params[:firstname]
    last = params[:lastname]
    company = params[:company]
    email = params[:email]
    dollars = params[:amount].to_f
    cents = (dollars * 100).ceil.to_i
    begin
      charge = Stripe::Charge.create({
          amount: cents,
          currency: 'usd',
          description: '4 the Kids Donation',
          source: token,
          metadata: {
            'firstname' => first,
            'lastname' => last,
            'company' => company,
            'email' => email
          }
      })
    rescue Stripe::CardError => e
      # Since it's a decline, Stripe::CardError will be caught
      body = e.json_body
      err  = body[:error]
    
      puts "Status is: #{e.http_status}"
      puts "Type is: #{err[:type]}"
      puts "Charge ID is: #{err[:charge]}"
      # The following fields are optional
      puts "Code is: #{err[:code]}" if err[:code]
      puts "Decline code is: #{err[:decline_code]}" if err[:decline_code]
      puts "Param is: #{err[:param]}" if err[:param]
      puts "Message is: #{err[:message]}" if err[:message]
      flash[:alert] = "Sorry, #{err[:message]}"
    rescue Stripe::RateLimitError => e
      # Too many requests made to the API too quickly
      flash[:alert] = "This is emberasing, something went wrong on my end. Please wait just a minute and try again."
    rescue Stripe::InvalidRequestError => e
      # Invalid parameters were supplied to Stripe's API
      flash[:alert] = "Something about that card information didnt match. Give it another try."
    rescue Stripe::AuthenticationError => e
      # Authentication with Stripe's API failed
      # (maybe you changed API keys recently)
      flash[:alert] = "My bad. Something went wrong on my end. You havent been charged. I've been notified. If you provided your email, Ill let you know when its fixed and if your still interested could try donating again."
    rescue Stripe::APIConnectionError => e
      # Network communication with Stripe failed
      flash[:alert] = "My bad. Something went wrong on my end. You havent been charged. I've been notified. If you provided your email, Ill let you know when its fixed and if your still interested could try donating again."
    rescue Stripe::StripeError => e
      # Display a very generic error to the user, and maybe send
      # yourself an email
      flash[:alert] = "My bad. Something went wrong on my end. You havent been charged. I've been notified. If you provided your email, Ill let you know when its fixed and if your still interested could try donating again."
    rescue => e
      # Something else happened, completely unrelated to Stripe
      flash[:alert] = "My bad. Something went wrong on my end. You havent been charged. I've been notified. If you provided your email, Ill let you know when its fixed and if your still interested could try donating again."
    else
      flash[:success] = " #{first} You Are Awesome! Thank you for your donation!"

      from = Email.new(email: 'peterk3@koruga.com')
      to = Email.new(email: email)
      subject = 'Thank you for your donation'
      content = Content.new(type: 'text/plain', value: "Your donation of $#{params[:amount]} is greatly appreciated.")
      mail = Mail.new(from, subject, to, content)

      sg = SendGrid::API.new(api_key: Rails.application.credentials.dig(:sendgrid, :api))
      response = sg.client.mail._('send').post(request_body: mail.to_json)
      puts response.status_code
      puts response.body
      puts response.headers

    ensure
      redirect_to home_index_path()
    end

  end
end

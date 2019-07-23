class DonationMailer < ApplicationMailer

    def send_wupty_email
        @contrib = params[:contrib]
        mail( :to => @contrib[:to], :subject => 'Thanks for donating to WUP Rise!' )
    end

end

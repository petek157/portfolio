
$(document).on("turbolinks:load", function() {
    console.log("TURBO");
    //console.log($( ".twilio-box" ).css('width'));
    var tWidth = $( ".twilio-box" ).width() + 26;
    $('.twilio-box').css({'right': -tWidth});
    $('.twilio').click(function() {
        console.log($( ".twilio-box" ).css('width'));
        $( ".twilio-box" ).animate({
            right: 63,
          }, 750, "linear", function() {
            // Animation complete.
          });
    });
    $('.twilio-close').click(function() {
        $( ".twilio-box" ).animate({
            right: -tWidth,
          }, 750, "linear", function() {
            // Animation complete.
          });
    });
});
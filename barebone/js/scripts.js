var selectedTags = [];
var tags = ["All"];

$(function() {

    $.getJSON( "/barebone/data.json", function( data ) {
      var html = "";
      
      $.each( data["projects"], function(i, project) {
        html += '<div class="project">';
        
          html += '<div class="title">' + project.title + '</div>';
          html += '<div class="tags">'
              html += '<ul>';
              project.tech.sort();
                $.each(project.tech, function(i, t) {
                  console.log(t);
                  html += '<li>' + t + '</li>';
                  if ($.inArray(t, tags) == -1) {
                    tags.push(t);
                  }
                });
              html += '</ul>';
          html += '</div>';
          html += '<div class="img">';
              html += '<img src="' + project.image + '"/>';
          html += '</div>';
          html += '<div class="desc">';
            $.each(project.description, function(i, d) {
              html += '<p>' + d + '</p>';
            });
          html += '</div>';
          if (project.link != "" && project.link != undefined) {
            html += '<div class="link"><a href="' + project.link + '">View</a></div>';
          }
          html += '</div>';
      });

      tags.sort();
        $.each(tags, function(i, ta) {
            $(".filter").append('<li class="">' + ta + '</li>');
        });
        highlightFilters();
      
        $(".projects").html(html);
    });
  
})

$(".filter").on("click", "li", function() {
    console.log($(this).text());
    selectedTags.push($(this).text());
    highlightFilters();
})

function highlightFilters() {
    console.log("highlight");
    $.each(tags, function(i, ta) {
        if (ta == "All" && selectedTags.length == 0) {
            $('.filter').find('.li').addClass('active');
            $('.filter').find('.li:contains("' + ta + '")').addClass('active');
        } else {
          if ($.inArray(ta, selectedTags) != -1) {
            $('.filter').find('.li:contains(' + ta + ')').addClass('active');
          } else {
            $('.filter').find('.li:contains(' + ta + ')').addClass('active');
          }
        }
    });
}
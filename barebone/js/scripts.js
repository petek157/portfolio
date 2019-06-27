$(function() {
  
    $.getJSON( "/barebone/data.json", function( data ) {
      var html = "";
      var tags = ["All"];
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
        $(".filter").append('<li>' + ta + '</li>');
      });
      
      $(".projects").html(html);
    });
  
})
var selectedTags = [];
var tags = ["All"];
var allProjectIds = [];
var selectedProjects = [];

$(function() {

    $.getJSON( "/barebone/data.json", function( data ) {
      var html = "";
      
      $.each( data["projects"], function(i, project) {
        allProjectIds.push(project.id);
        html += createProjectHtml(project);
      });

      tags.sort();
        $.each(tags, function(i, ta) {
            if (ta == "All") {
              $(".filter").append('<li id="' + ta + '" class="active">' + ta + '</li>');
            } else {
              $(".filter").append('<li id="' + ta + '" class="">' + ta + '</li>');
            }
        });
        
      
        $(".projects").html(html);
    });
  
})

function createProjectHtml(project) {
  html = '<div id="' + project.id + '" class="project">';
        
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
    return html;
}

$(".filter").on("click", "li", function() {
    var selected = $(this).text();
    if (selected == "All") {
      $('.active').each(function(i, ta) {
        $(this).removeClass('active');
      });
      $(this).addClass('active');
    } else {
      if ($(this).hasClass('active')) {
        
        $(this).removeClass('active');
        selectedTags.forEach(function(ta, i) {
          console.log(ta);
          console.log(selected);
          if (ta == selected) {
            console.log("HIT");
            selectedTags.splice(i, 1);
          }
        });
        console.log(selectedTags.length);
        if (selectedTags.length == 0) {
          $('#All').addClass('active');
        }
      } else {
        
        $(this).addClass('active');
        $('#All').removeClass('active');
        selectedTags.push(selected);
      }
    }
    filterProjects();
})

function filterProjects() {

  selectedProjects = allProjectIds.filter(function(id) {
    
    return selectedTags.some(function(tag))
    
    project.tech.some(function(r) {
      if (selectedTags.indexOf(r) >= 0) {
        return project;
      }
    });
  });
  console.log(selectedProjects);
  $('.project').each(function(i, pr) {
    if ( selectedProjects.indexOf(pr.id) >= 0) {
      $(this).show();
    } else {
      $(this).hide();
    }
  })
}
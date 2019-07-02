var selectedTags = [];
var tags = [];
var allProjects = [];
var selectedProjects = [];

$(function() {

    $.getJSON( "/barebone/data.json", function( data ) {
      var html = "";
      
      $.each( data["projects"], function(i, project) {
        allProjects.push(project);
        html += createProjectHtml(project);
      });

      tags.sort();
      tags.splice(0, 0, "All");
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
      selectedTags = [];
      selectedTags.push("All");
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
        selectedTags.forEach(function(ta, i) {
          console.log(ta);
          console.log(selected);
          if (ta == "All") {
            selectedTags.splice(i, 1);
          }
        });
        $(this).addClass('active');
        $('#All').removeClass('active');
        selectedTags.push(selected);
      }
    }
    filterProjects();
})

function filterProjects() {
  console.log(selectedTags);
  selectedProjects = allProjects.filter(function(project) {
    if (selectedTags[0] == "All") {
      return project;
    } else {
      var projectTech = project.tech;
      for (i = 0; i < projectTech.length; i++) {
        var thisTech = projectTech[i];
        for (t = 0; t < selectedTags.length; t++) {
          if (selectedTags[t] == thisTech) {
            return project;
          }
        }
      }
    }
  });
  console.log(selectedProjects);

  

  $('.project').each(function(i, pr) {
    var showIt = false;
    for (p = 0; p < selectedProjects.length; p++) {
      if ($(this).attr("id") == selectedProjects[p].id) {
        showIt = true;
      }
    }
    if (showIt) {
      $(this).show();
    } else {
      $(this).hide();
    }
  })
}
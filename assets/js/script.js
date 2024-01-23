// hide categories section on page load
$(function () {
  $("#categories").css("display", "none");
  $("#videos").css("display", "none");
  $(".my-hobbies").css("display", "none");
});

// Check if any local storage exists, and if so make my hobbies button visible

$(function () {
if (localStorage.length > 0) {
  $(".my-hobbies").css("display", "block");
}
});

// 'find new hobby' button opens categories section
$("#newHobbyBtn").on("click", function () {
  $("#welcome").css("display", "none");
  $("#categories").css("display", "block");
});

// 'my-hobbies' button on the navbar takes user to saved hobbies page
$(".my-hobbies").on("click", function (e) {
  e.preventDefault();
  window.location.href = "myhobbies.html";
});

// Random Hobby generator- APis Ninja API Key
APIkey = "HQJGUX8MyF1GgKP0bU2umUaZZp0XuqHXsfD4kWju";

// fetch call for random hobbies generator on user click of a category
let hobbyCategory = $(".hobby-category");
hobbyCategory.on("click", function (e) {
  e.preventDefault();

  let dataCategory = $(this).attr("data-category");

  fetchData(dataCategory);
});

// function to store search hobbies/history into local storage
function storeHobbies(hobbyName, dataCategory) {
  let general = [];
  let sports_and_outdoors = [];
  let education = [];
  let collection = [];
  let competition = [];
  let observation = [];
  general = JSON.parse(localStorage.getItem("general")) || [];
  sports_and_outdoors =
    JSON.parse(localStorage.getItem("sports_and_outdoors")) || [];
  education = JSON.parse(localStorage.getItem("education")) || [];
  collection = JSON.parse(localStorage.getItem("collection")) || [];
  competition = JSON.parse(localStorage.getItem("competition")) || [];
  observation = JSON.parse(localStorage.getItem("observation")) || [];

  if (dataCategory === "general" && !general.includes(hobbyName)){
    general.push(hobbyName);
    localStorage.setItem("general", JSON.stringify(general));
  } else if (dataCategory === "sports_and_outdoors" && !sports_and_outdoors.includes(hobbyName)) {
    sports_and_outdoors.push(hobbyName);
    localStorage.setItem(
      "sports_and_outdoors",
      JSON.stringify(sports_and_outdoors)
    );
  } else if (dataCategory === "education" && !education.includes(hobbyName)) {
    education.push(hobbyName);
    localStorage.setItem("education", JSON.stringify(education));
  } else if (dataCategory === "collection" && !collection.includes(hobbyName)) {
    collection.push(hobbyName);
    localStorage.setItem("collection", JSON.stringify(collection));
  } else if (dataCategory === "competition" && !competition.includes(hobbyName)) {
    competition.push(hobbyName);
    localStorage.setItem("competition", JSON.stringify(competition));
  } else if (dataCategory === "observation" && !observation.includes(hobbyName)) {
    observation.push(hobbyName);
    localStorage.setItem("observation", JSON.stringify(observation));
  }
}

// youtube api
APikey = "AIzaSyBndN5rIlX_lHDt6WsGPFvYWotnMrOgvgU";


function fetchData(dataCategory) {
  queryURL = `https://api.api-ninjas.com/v1/hobbies?apikey=${APIkey}&limit=5&category=${dataCategory}`;

  fetch(queryURL, {
    headers: {
      "X-Api-Key": APIkey,
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      //  data captured onto variables
      let hobbyName = data.hobby;
      let wikiLink = data.link;

      // hobby info page display
      $("#categories").css("display", "none");
      $("#hobby").css("display", "block");
      $("#videos").css("display", "none");

      let hobbySection = $("#hobby");

      // this section needs works
      let taglineArray = [
        "Have you thought about ",
        "How about ",
        "Ever considered ",
        "Would you like to try ",
        "What about ",
      ];

      let i = Math.floor(Math.random() * 5);

      let hobbySectionText = $("<h2>")
        .text(taglineArray[i] + hobbyName + "?")
        .addClass("display-5 fw-bold text-center mb-5");
      hobbySection.append(hobbySectionText);

      // 4 dynamic buttons appended onto page
      hobbySection.append(
        $("<button>")
          .text("Pursue Hobby")
          .addClass("videosGenerator btn-pink btn-lg btn")
      );
      hobbySection.append(
        $("<button>")
          .text("What is " + hobbyName + '?')
          .addClass("wikipediaGenerator btn-yellow btn-lg btn")
      );
      hobbySection.append(
        $("<button>")
        .text("New " + dataCategory.replace(/_/g, ' ') + " hobby")
          .addClass("sameHobbyGenerator btn-yellow btn-lg btn")
      );
      hobbySection.append(
        $("<button>")
          .text("Start Over")
          .addClass("startOverBtn btn-yellow btn-lg btn")
      );

      // event- listeners added to dynamic buttons
      $(".startOverBtn").on("click", function (e) {
        e.preventDefault();
        window.location.href = "index.html";
      });

      // what is? button takes user to wikipedia page
      $(".wikipediaGenerator").on("click", function (e) {
        e.preventDefault();

        $(this).attr("href", wikiLink).attr("target", "_blank");
        window.open($(this).attr("href"), "_blank");
      });

      $(".sameHobbyGenerator").on("click", function (e) {
              e.preventDefault();
              hobbySection.empty();
              $("#hobby").css("display", "none");
              fetchData(dataCategory);
            });

            
            // youtube videos appending ('pursue hobby' button)
            $(".videosGenerator").on("click", function (e) {
              e.preventDefault();
              $("#hobby").css("display", "none");
              $("#categories").css("display", "none");
             
              
              // function call to store searched hobbies in local storage under each category
              storeHobbies(hobbyName, dataCategory);
              console.log(hobbyName, dataCategory);

              // Make my hobbies button visible only after video generator button is clicked
              $(".my-hobbies").css("display", "block");

        // youtube api
        youtubeAPikey = "AIzaSyBndN5rIlX_lHDt6WsGPFvYWotnMrOgvgU";

        youtubeQueryURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${youtubeAPikey}&q=${hobbyName}+hobby&videoEmbeddable=true&type=video&maxResults=6&videoLicense=creativeCommon`;

        fetch(youtubeQueryURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);

            let videoItems = data.items;

            let videoSection = $("#videos");

            $("#videos").css("display", "block");

            let videoHeader = $("<h2>")
              .text(
                "Here are some videos to help you get started on " + hobbyName
              )
              .addClass("display-5 fw-bold text-center mb-5");
            videoSection.append(videoHeader);
            let videoMain = $("<div>").addClass("row");
            videoSection.append(videoMain);

            for (let i = 0; i < videoItems.length; i++) {
              let videoDIv = $("<div>").addClass("col-md-6 col-xl-4 video-wrapper");
              let videoID = data.items[i].id.videoId;
              console.log(videoID);
              let videoTitle = data.items[i].snippet.title.trim().toLowerCase();
              let titleElement = $("<h4>").html(videoTitle);

              let videoIframe = $("<iframe>");

              videoIframe.attr("width", "350");
              videoIframe.attr("height", "215");
              videoIframe.attr(
                "src",
                "https://www.youtube.com/embed/" + videoID
              );
              videoIframe.attr("frameborder", "0");
              videoIframe.attr(
                "allow",
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              );
              videoIframe.attr("allowfullscreen", "");

              videoDIv.append(titleElement, videoIframe);
              videoMain.append(videoDIv);
              videoSection.append(videoMain);
            }

            videoSection.append(
              $("<button>")
                .text("Start Over")
                .addClass("startOverBtn btn-yellow btn-lg btn")
            );
            $("#videos").css("display", "block");

            $(".startOverBtn").on("click", function (e) {
              e.preventDefault();
              window.location.href = "index.html";
            });
          });
      });
    });
}

// renderbuttons of saved hobbies from local storage into myhobbies.hyml file

$(document).ready(function () {
  renderbuttons();
});

// function to renderbuttons for search history onto the page

function renderbuttons() {
  // saved hobbies under each category is made to render onto its own parent category
  $("#savedGeneral").on("click", function (e) {
    e.preventDefault();

    let general = JSON.parse(localStorage.getItem("general"));
    let generalButton = $("#generalContainer");
    generalButton.empty();

    if (!general) {
      generalButton.append(
        $("<p>").text("No hobbies to view yet").addClass("btn-yellow btn")
      );
    } else {
      for (let i = 0; i < general.length; i++) {
        let savedHobbyName = general[i];
        let newButton = $("<button>")
          .text(savedHobbyName)
          .addClass("btn-pink btn");
        generalButton.append(newButton);
        newButton.on("click", function () {
          retrieveVideos(savedHobbyName);
        });
      }
    }
  });

  // sports category
  $("#savedSports").on("click", function (e) {
    e.preventDefault();

    let sports_and_outdoors = JSON.parse(
      localStorage.getItem("sports_and_outdoors")
    );
    let sportsButton = $("#sportsContainer");

    sportsButton.empty();

    if (!sports_and_outdoors) {
      sportsButton.append(
        $("<p>").text("No hobbies to view yet").addClass("btn-yellow btn")
      );
    } else {
      for (let i = 0; i < sports_and_outdoors.length; i++) {
        let savedHobbyName = sports_and_outdoors[i];
        let newButton = $("<button>")
          .text(savedHobbyName)
          .addClass("btn btn-pink");
        sportsButton.append(newButton);
        newButton.on("click", function () {
          retrieveVideos(savedHobbyName);
        });
      }
    }
  });

  // education category
  $("#savedEducation").on("click", function (e) {
    e.preventDefault();

    let education = JSON.parse(localStorage.getItem("education"));
    let educationButton = $("#educationContainer");
    educationButton.empty();

    if (!education) {
      educationButton.append(
        $("<p>").text("No hobbies to view yet").addClass("btn-yellow btn")
      );
    } else {
      for (let i = 0; i < education.length; i++) {
        let savedHobbyName = education[i];
        let newButton = $("<button>")
          .text(savedHobbyName)
          .addClass("btn btn-pink");
        educationButton.append(newButton);
        newButton.on("click", function () {
          retrieveVideos(savedHobbyName);
        });
      }
    }
  });

  // collection category
  $("#savedCollection").on("click", function (e) {
    e.preventDefault();

    let collection = JSON.parse(localStorage.getItem("collection"));
    let collectionButton = $("#collectionContainer");
    collectionButton.empty();

    if (!collection) {
      collectionButton.append(
        $("<p>").text("No hobbies to view yet").addClass("btn-yellow btn")
      );
    } else {
      for (let i = 0; i < collection.length; i++) {
        let savedHobbyName = collection[i];
        let newButton = $("<button>")
          .text(savedHobbyName)
          .addClass("btn btn-pink");
        collectionButton.append(newButton);
        newButton.on("click", function () {
          retrieveVideos(savedHobbyName);
        });
      }
    }
  });

  // competition category
  $("#savedCompetition").on("click", function (e) {
    e.preventDefault();

    let competition = JSON.parse(localStorage.getItem("competition"));
    let competitionButton = $("#competitionContainer");
    competitionButton.empty();

    if (!competition) {
      competitionButton.append(
        $("<p>").text("No hobbies to view yet").addClass("btn-yellow btn")
      );
    } else {
      for (let i = 0; i < competition.length; i++) {
        let savedHobbyName = competition[i];
        let newButton = $("<button>")
          .text(savedHobbyName)
          .addClass("btn btn-pink");
        competitionButton.append(newButton);
        newButton.on("click", function () {
          retrieveVideos(savedHobbyName);
        });
      }
    }
  });

  // observation category
  $("#savedObservation").on("click", function (e) {
    e.preventDefault();

    let observation = JSON.parse(localStorage.getItem("observation"));
    let observationButton = $("#observationContainer");
    observationButton.empty();

    if (!observation) {
      observationButton.append(
        $("<p>").text("No hobbies to view yet").addClass("btn-yellow btn")
      );
    } else {
      for (let i = 0; i < observation.length; i++) {
        let savedHobbyName = observation[i];
        let newButton = $("<button>")
          .text(savedHobbyName)
          .addClass("btn btn-pink");
        observationButton.append(newButton);
        newButton.on("click", function () {
          retrieveVideos(savedHobbyName);
        });
      }
    }
  });
}

// function to recreate youtube videos from saved buttons

function retrieveVideos(savedHobbyName) {
  $(".hobby-section").css("display", "none");
  youtubeAPikey = "AIzaSyBndN5rIlX_lHDt6WsGPFvYWotnMrOgvgU";

  youtubeQueryURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${youtubeAPikey}&q=${savedHobbyName}+hobby&videoEmbeddable=true&type=video&maxResults=6&videoLicense=creativeCommon&relevanceLanguage=en`;

  fetch(youtubeQueryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      let videoItems = data.items;

      let videoSection = $("#savedVideos");

      $("#savedVideos").css("display", "block");

      let videoHeader = $("<h2>")
        .text(
          "Here are some videos to help you get started on " + savedHobbyName
        )
        .addClass("display-5 fw-bold text-center mb-5");
      videoSection.append(videoHeader);
      let videoMain = $("<div>").addClass("row");
      videoSection.append(videoMain);

      for (let i = 0; i < videoItems.length; i++) {
        let videoDiv = $("<div>").addClass("col-md-6 col-xl-4 video-wrapper");
        let videoID = data.items[i].id.videoId;
        console.log(videoID);
        let videoTitle = data.items[i].snippet.title.trim().toLowerCase();
        let titleElement = $("<h4>").html(videoTitle);

        let videoIframe = $("<iframe>");

        videoIframe.attr("width", "350");
        videoIframe.attr("height", "215");
        videoIframe.attr("src", "https://www.youtube.com/embed/" + videoID);
        videoIframe.attr("frameborder", "0");
        videoIframe.attr(
          "allow",
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        );
        videoIframe.attr("allowfullscreen", "");

        videoDiv.append(titleElement, videoIframe);
        videoMain.append(videoDiv);
        videoSection.append(videoMain);
      }

      videoSection.append(
        $("<button>")
          .text("Start Over")
          .addClass("startOverBtn btn-yellow btn-lg btn")
      );

      $(".startOverBtn").on("click", function (e) {
        e.preventDefault();
        window.location.href = "index.html";
      });
    });
}

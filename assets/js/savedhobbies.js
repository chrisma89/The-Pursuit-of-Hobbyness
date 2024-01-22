// renderbuttons of saved hobbies from local storage into myhobbies.hyml file


$(document).ready(function(){
     renderbuttons();
  })

  // function to renderbuttons for search history onto the page

function renderbuttons (){
  
  // saved hobbies under each category is made to render onto its own parent category
  $(".savedgeneral").on("click", function(e){
    e.preventDefault();

    let general = JSON.parse(localStorage.getItem("general"));
    let generalbutton = $(".generalcontainer");
    generalbutton.empty()

    if(!general.length){
      generalbutton.append($("<p>").text("No hobbies to view yet").addClass("btn-yellow btn"))
    }
    else{
    for (let i=0; i <general.length; i++){
      let savedHobbyName = general[i];
      let newButton = $("<button>").text(savedHobbyName).addClass("btn-pink btn")
      generalbutton.append(newButton);
      newButton.on("click", function(){
        retrieveVideos(savedHobbyName); 
      });
      
    }
    }
  })

  // sports category
  $(".savedsports").on("click", function(e){
    e.preventDefault();

    let sports_and_outdoors = JSON.parse(localStorage.getItem("sports_and_outdoors"));
    let sportsbutton = $(".sportscontainer")
    
    sportsbutton.empty()

    if(!sports_and_outdoors){
      sportsbutton.append($("<p>").text("No hobbies to view yet").addClass("btn-yellow btn"))
    }
    else {
    for (let i=0; i < sports_and_outdoors.length; i++){
      let savedHobbyName = sports_and_outdoors[i];
      let newButton =$("<button>").text(savedHobbyName).addClass("btn btn-pink")
      sportsbutton.append(newButton);
      newButton.on("click", function(){
        retrieveVideos(savedHobbyName)
      })
    }}
  })

   // education category
  $(".savededucation").on("click", function(e){
    e.preventDefault();

    let education = JSON.parse(localStorage.getItem("education"));
    let educationbutton = $(".educationcontainer")
    educationbutton.empty()

    if(!education){
      educationbutton.append($("<p>").text("No hobbies to view yet").addClass("btn-yellow btn"))
    }
    else {
    for (let i=0; i < education.length; i++){
      let savedHobbyName = education[i];
      let newButton =$("<button>").text(savedHobbyName).addClass("btn btn-pink")
      educationbutton.append(newButton);
      newButton.on("click", function(){
        retrieveVideos(savedHobbyName)
      })
    }}
  })

   // collection category
  $(".savedcollection").on("click", function(e){
    e.preventDefault();

    let collection = JSON.parse(localStorage.getItem("collection"))
    let collectionbutton = $(".collectioncontainer")
    collectionbutton.empty()

    if(!collection){
      collectionbutton.append($("<p>").text("No hobbies to view yet").addClass("btn-yellow btn"))
    }
    else {
    for (let i=0; i < collection.length; i++){
      let savedHobbyName = collection[i];
      let newButton =$("<button>").text(savedHobbyName).addClass("btn btn-pink")
      collectionbutton.append(newButton);
      newButton.on("click", function(){
        retrieveVideos(savedHobbyName)
      })
    }}
  })

   // competition category
  $(".savedcompetition").on("click", function(e){
    e.preventDefault();

    let competition = JSON.parse(localStorage.getItem("competition"))
    let competitionbutton = $(".competitioncontainer")
     competitionbutton.empty()

     if(!competition){
      competitionbutton.append($("<p>").text("No hobbies to view yet").addClass("btn-yellow btn"))
    }
    else {
    for (let i=0; i < competition.length; i++){
      let savedHobbyName = competition[i];
      let newButton =$("<button>").text(savedHobbyName).addClass("btn btn-pink")
      competitionbutton.append(newButton);
      newButton.on("click", function(){
        retrieveVideos(savedHobbyName)
      })
    }}
  })

  // observation category
  $(".savedobservation").on("click", function(e){
    e.preventDefault();

    let observation = JSON.parse(localStorage.getItem("observation"))
    let observationbutton = $(".observationcontainer")
    observationbutton.empty()

    if(!observation){
      observationbutton.append($("<p>").text("No hobbies to view yet").addClass("btn-yellow btn"))
    }
    else {

    for (let i=0; i < observation.length; i++){
      let savedHobbyName = observation[i];
      let newButton =$("<button>").text(savedHobbyName).addClass("btn btn-pink")
      observationbutton.append(newButton);
      newButton.on("click", function(){
        retrieveVideos(savedHobbyName)
      })

    }}
  })
}

// ---------------------------------------------------------
// function to recreate youtube videos from saved buttons

function retrieveVideos (savedHobbyName){

      $(".hobby-section").css("display" ,"none")
       youtubeAPikey = "AIzaSyBndN5rIlX_lHDt6WsGPFvYWotnMrOgvgU";

        youtubeQueryURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${youtubeAPikey}&q=${savedHobbyName}+hobby&videoEmbeddable=true&type=video&maxResults=6`;

        fetch(youtubeQueryURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);

            let videoItems = data.items;

            let videoSection = $(".savedvideosection");

            let videoHeader = $("<h2>")
              .text(
                "Here are some videos to help you get started on " + savedHobbyName
              )
              .addClass("display-5 fw-bold text-center mb-5");
            videoSection.append(videoHeader);
            let videoMain = $("<div>").addClass("row");
            videoSection.append(videoMain);

            for (let i = 0; i < videoItems.length; i++) {
              let videoDIv = $("<div>").addClass("col-md-6 col-xl-4");
              let videoID = data.items[i].id.videoId;
              console.log(videoID);
              let videoTitle = data.items[i].snippet.title.trim();
              let titleElement = $("<h4>").text(videoTitle);

              titleElement.css({
                // height: "10px",
                // width: "10px",
              });

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
                .addClass("startoverbtn btn-yellow btn-lg btn")
            );
          
            // $("#videos").css("display", "block");
            $(".savedvideosection").css("display", "block")
            

            $(".startoverbtn").on("click", function (e) {
              e.preventDefault();
              window.location.href = "index.html";
            });
})
}

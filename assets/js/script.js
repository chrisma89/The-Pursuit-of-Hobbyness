// hide categories section on page load
$(function () {
  $("#categories").css("display", "none");
});

// 'find new hobby' button opens categories section
$(".newhobbybtn").on("click", function () {
  $("#welcome").css("display", "none");
  $("#categories").css("display", "block");
});

// 'my-hobbies' button on home page takes user to saved hobbies page
$(".my-hobbies").on("click", function (e) {
  e.preventDefault();
  window.location.href = "myhobbies.html";
});

// Random Hobby generator- APis Ninja API Key
APIkey = "HQJGUX8MyF1GgKP0bU2umUaZZp0XuqHXsfD4kWju";

// fetch call for random hobbies generator on user click of a category
$(".hobby-category").on("click", function (e) {
  e.preventDefault();

  let dataCategory = $(this).attr("data-category");
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
        "We recommend ",
        "Ever considered ",
        "Here is something interesting : ",
        "What about ",
      ];

      // for(let i =0; i < taglineArray.length; i++){
      let hobbySectionText = $("<h3>").text(
        taglineArray[0] + hobbyName + " ? "
      );
      hobbySection.append(hobbySectionText);
      // return
      // }
      //

      // 4 dynamic buttons appended onto page
      hobbySection.append(
        $("<button>")
          .text("Take me to the videos")
          .addClass("videosgeneratorbtn btn-pink btn-lg btn")
      );
      hobbySection.append(
        $("<button>")
          .text("What is " + hobbyName)
          .addClass("wikipedialinkgenerator btn-yellow btn-lg btn")
      );
      hobbySection.append(
        $("<button>")
          .text("New " + dataCategory + " hobby")
          .addClass("samecategoryhobbygenerator btn-yellow btn-lg btn")
      );
      hobbySection.append(
        $("<button>")
          .text("Start Over")
          .addClass("startoverbtn btn-yellow btn-lg btn")
      );

      // event- listeners added to dynamic buttons
      $(".startoverbtn").on("click", function (e) {
        e.preventDefault();
        window.location.href = "index.html";
      });

      // what is? button takes user to wikipedia page
      $(".wikipedialinkgenerator").on("click", function (e) {
        e.preventDefault();

        $(this).attr("href", wikiLink).attr("target", "_blank");
        window.open($(this).attr("href"), "_blank");
      });

      // this section needs work
      //  $(".samecategoryhobbygenerator").on("click", function(e){
      //             e.preventDefault();
      //             $(this.dataCategory)
      //  })
      //

      // function call to store searched hobbies in local storage under each category
      storeHobbies(hobbyName, dataCategory);
      console.log(hobbyName, dataCategory);

      // youtube videos appending ('take me to the videos' button)
      $(".videosgeneratorbtn").on("click", function (e) {
        e.preventDefault();
        $("#hobby").css("display", "none");
        $("#videos").css("display", "block");


        // youtube api
        youtubeAPikey = "AIzaSyBndN5rIlX_lHDt6WsGPFvYWotnMrOgvgU";

        youtubeQueryURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${youtubeAPikey}&q=${hobbyName}+hobby&videoEmbeddable=true&type=video&maxResults=6`;

        fetch(youtubeQueryURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);

            let videoItems = data.items;

            // embedCustomVideos();
            let videoSection = $("#videos");
            // videoSection.append(
            //   $("<button>")
            //     .text("My Hobbies")
            //     .addClass("myhobbiesbtn btn-yellow btn-lg")
            // );

            // // My hobbies button on videos page takes user to saved hobbies
            // $(".myhobbiesbtn").on("click", function (e) {
            //   e.preventDefault();
            //   window.location.href = "myhobbies.html";
            // });

            let videoHeader = $("<h3>").text(
              "Here are some videos to help you get started on " + hobbyName
            );
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
                height: "10px",
                width: "10px",
              
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

              videoDIv.append(videoTitle, videoIframe);
              videoMain.append(videoDIv);
              videoSection.append(videoMain);
            }

            videoSection.append(
              $("<button>")
                .text("Start Over")
                .addClass("startoverbtn btn-yellow btn-lg btn")
            );

            $(".startoverbtn").on("click", function (e) {
              e.preventDefault();
              window.location.href = "index.html";
            });
          });
      });
    });
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

  if (dataCategory === "general") {
    general.push(hobbyName);
    localStorage.setItem("general", JSON.stringify(general));
  } else if (dataCategory === "sports_and_outdoors") {
    sports_and_outdoors.push(hobbyName);
    localStorage.setItem(
      "sports_and_outdoors",
      JSON.stringify(sports_and_outdoors)
    );
  } else if (dataCategory === "education") {
    education.push(hobbyName);
    localStorage.setItem("education", JSON.stringify(education));
  } else if (dataCategory === "collection") {
    collection.push(hobbyName);
    localStorage.setItem("collection", JSON.stringify(collection));
  } else if (dataCategory === "competition") {
    competition.push(hobbyName);
    localStorage.setItem("competition", JSON.stringify(competition));
  } else if (dataCategory === "observation") {
    observation.push(hobbyName);
    localStorage.setItem("observation", JSON.stringify(observation));
  }
}

// youtube api
APikey = "AIzaSyBndN5rIlX_lHDt6WsGPFvYWotnMrOgvgU";

// $(".something").attr( { title:"Test", alt:"Test2" } );

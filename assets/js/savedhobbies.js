// renderbuttons of saved hobbies from local storage into myhobbies.hyml file


$(document).ready(function(){
     renderbuttons();
  })

  // function to renderbuttons for search history onto the page

function renderbuttons (){
  
  // saved hobbies under each category is made to render onto its own parent category
  $(".savedgeneral").on("click", function(e){
    e.preventDefault();

    let general = JSON.parse(localStorage.getItem("general")) || [];
    let generalbutton = $(".generalcontainer");
    generalbutton.empty()

    if(!general){
      generalbutton.append($("<p>").text("No hobbies to view yet").addClass("btn-yellow btn"))
    }
    for (let i=0; i <general.length; i++){
      let hobbyName = general[i];
      let newButton = $("<button>").text(hobbyName).addClass("btn-pink btn").on("click", function(){
        fetchData(hobbyName); // Pass hobbyName if needed in fetchData
      });
      generalbutton.append(newButton);
    
    }
  })

  // sports category
  $(".savedsports").on("click", function(e){
    e.preventDefault();

    let sports_and_outdoors = JSON.parse(localStorage.getItem("sports_and_outdoors"))
    let sportsbutton = $(".sportscontainer")
    
    sportsbutton.empty()

    if(!sports_and_outdoors){
      sportsbutton.append($("<p>").text("No hobbies to view yet").addClass("btn-yellow btn"))
    }

    for (let i=0; i < sports_and_outdoors.length; i++){
      
      sportsbutton.append($("<button>").text(sports_and_outdoors[i]).addClass("btn-pink btn"))
    }
  })

   // education category
  $(".savededucation").on("click", function(e){
    e.preventDefault();

    let education = JSON.parse(localStorage.getItem("education"))
    let educationbutton = $(".educationcontainer")
    educationbutton.empty()

    if(!education){
      educationbutton.append($("<p>").text("No hobbies to view yet").addClass("btn-yellow btn"))
    }

    for (let i=0; i < education.length; i++){
      
      educationbutton.append($("<button>").text(education[i]).addClass("btn-pink btn"))
    }
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

    for (let i=0; i < collection.length; i++){
      
      collectionbutton.append($("<button>").text(collection[i]).addClass("btn-pink btn"))
    }
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

    for (let i=0; i < competition.length; i++){
      
      competitionbutton.append($("<button>").text(competition[i]).addClass("btn-pink btn"))
    }
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

    for (let i=0; i < observation.length; i++){
      
      observationbutton.append($("<button>").text(observation[i]).addClass("btn-pink btn"))
    }
  })
}




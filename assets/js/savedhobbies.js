// renderbuttons of saved hobbies from local storage into myhobbies.hyml file


$(document).ready(function(){
     renderbuttons();
  })

  // function to renderbuttons for search history onto the page

function renderbuttons (){
  $(".savedgeneral").on("click", function(e){
    e.preventDefault();

    let general = JSON.parse(localStorage.getItem("general"))
    let generalbutton = $(".generalcontainer")
    // generalbutton.empty()
    for (let i=0; i <general.length; i++){
      ;
      generalbutton.append($("<button>").text(general[i]).addClass("btn-pink"))
    }
  })

  $(".savedsports").on("click", function(e){
    e.preventDefault();

    let sports_and_outdoors = JSON.parse(localStorage.getItem("sports_and_outdoors"))
    let sportsbutton = $(".sportscontainer")
    // generalbutton.empty()
    for (let i=0; i < sports_and_outdoors.length; i++){
      ;
      sportsbutton.append($("<button>").text(sports_and_outdoors[i]).addClass("btn-pink"))
    }
  })

  $(".savededucation").on("click", function(e){
    e.preventDefault();

    let education = JSON.parse(localStorage.getItem("education"))
    let educationbutton = $(".educationcontainer")
    
    for (let i=0; i < education.length; i++){
      ;
      educationbutton.append($("<button>").text(education[i]).addClass("btn-pink"))
    }
  })

  $(".savedcollection").on("click", function(e){
    e.preventDefault();

    let collection = JSON.parse(localStorage.getItem("collection"))
    let collectionbutton = $(".collectioncontainer")
    
    for (let i=0; i < collection.length; i++){
      ;
      collectionbutton.append($("<button>").text(collection[i]).addClass("btn-pink"))
    }
  })

  $(".savedcompetition").on("click", function(e){
    e.preventDefault();

    let competition = JSON.parse(localStorage.getItem("competition"))
    let competitionbutton = $(".competitioncontainer")
    
    for (let i=0; i < competition.length; i++){
      ;
      competitionbutton.append($("<button>").text(competition[i]).addClass("btn-pink"))
    }
  })

  $(".savedobservation").on("click", function(e){
    e.preventDefault();

    let observation = JSON.parse(localStorage.getItem("observation"))
    let observationbutton = $(".observationcontainer")
    
    for (let i=0; i < observation.length; i++){
      ;
      observationbutton.append($("<button>").text(observation[i]).addClass("btn-pink"))
    }
  })


 
//  let storedHobbies = JSON.parse(localStorage.getItem("searchedHobby"))
//  let category = JSON.parse(localStorage.getItem("searchedcategory"))

//  console.log(category)
  //  for (let i =0; i<storedHobbies.length; i++){
  //   let searchedButton = $("<button>").text(storedHobbies[i]).addClass("btn-primary")
  //   $(".saved-hobbies").append(searchedButton)
  //  }
}

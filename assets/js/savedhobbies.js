// renderbuttons of saved hobbies from local storage into myhobbies.hyml file


$(document).ready(function(){
     renderbuttons();
  })

  // function to renderbuttons for search history onto the page

function renderbuttons (){

 
 let storedHobbies = JSON.parse(localStorage.getItem("searchedHobby"))
   for (let i =0; i<storedHobbies.length; i++){
    let searchedButton = $("<button>").text(storedHobbies[i]).addClass("btn-primary")
    $("#history").append(searchedButton)
   }
}

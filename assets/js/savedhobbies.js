// renderbuttons of saved hobbies from local storage into myhobbies.hyml file


$(document).ready(function(){
     renderbuttons(storedHobbies);
  })

  // function to renderbuttons for search history onto the page

function renderbuttons (storedHobbies){

  localStorage.getItem(JSON.parse(storedHobbies))
   for (let i =0; i<storedHobbies.length; i++){
    let searchedButton = $("<button>").text(storeHobbies[i]).addClass("btn-primary")
    $("#history").append(searchedButton)
   }
}

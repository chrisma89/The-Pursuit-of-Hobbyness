// Pseudocode 
// 1. Landing Page - 
// A. Heading Display "Pursuit of Hobbies" [HTML - static - id ="header", text= "Pursuit Oh Hobbies.(Next Line)- Explore and create a hobby!"(need to decide on tag line)]
// B. [HTML- static- text = "Please pick a category" / css- 6 cards with images, and text overlay??(General/ Sports/Education/Collection/Competition/Observation)/ Javascript- make images clickable with event listeners, enable api call on click and bring in the next page with data]

// 2. Data Page-
// A. Landing page disappears and Data Page appears[ JS- display hide (need id for both landing and data page html content to manipulate visibility)]
// B. Heading display "We recommend [Randomly chosen Hobby from the chosen category]"[Needs id/class for displaying JS dynamic content. JS- take data.hobby and add in to text and append]
// C. display 5 youtube videos [ HTML - class/id for the videos section to able to append videos/ CSS- could use cards again or carousel??]
// D. Static HTML - 3 Buttons - 1. More- Hobby Information [JS- event listener attached- needs HTML id/class - if clicked- bring on Wikipedia Link on the same page??] 2. Make a hobby plan [JS- event listener attached- needs HTML id/class - if clicked- bring on a modal to make a planner on the next page?? 3. Search for another hobby (JS- event listener attached- needs HTML id/class - if clicked- take back to landing page) ]

// 3. Planner Modal? Or page with dropdown lists??
// Modal - with drop down list? (Monday to Sunday) - User picks their day/days 
// Hours - Modal with drop down list? (Morning/Afternoon/Evening- time blocks like 6-7pm??)
// Save button that is clickable with event listener- brings on planner page

// 4. Planner Page
// A. Enter - UserName - store in local storage [ HTML - static- form imput /CSS- forms /JS- collect user input and store in local storage with setItem]
// B. Display - Chosen hobby and schedule (with option to change??)
// C. A note section ? - to keep persistent data that the user might use to keep notes
// D. Save button - [on click - retrieves username from local storage getItem and displays - username, hobby, schedule and notes] 

// could add start again button - to go back to landing page






// API Key
APIkey = "HQJGUX8MyF1GgKP0bU2umUaZZp0XuqHXsfD4kWju";

// Queryurl for random hobbies

// https://api.api-ninjas.com/v1/hobbies?category=

// fetch call for random hobbies generator

$(".hobby-category").on("click",function(e){
   e.preventDefault();
   let dataCategory = $(this).attr("data-category");
queryURL = `https://api.api-ninjas.com/v1/hobbies?apikey=${APIkey}&limit=5&category=${dataCategory}`;
   fetch(queryURL, {
    headers: {
      'X-Api-Key': APIkey
    }
  })
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    console.log(data)
   
    // Random hobby suggestion appended to page
    let hobbyName = data.hobby
    storeHobbies(hobbyName);
    let randomHobby = $("<h3>").text(hobbyName)
    // localStorage.setItem("searchedHobby", data.hobby) ||[];
    $("body").append(randomHobby)

    // more info button takes user to wikipedia page
    $("#wiki-link").on("click", function(e){
       e.preventDefault();
      //  let infoText = $("<p>");
       let wikipediaLink = $("<a>").attr("href", data.link).text("Link to Wikipedia")
      //  wikipediaLink.append(infoText)
       $("#wiki-link").append(wikipediaLink)
    })
   })
})


// function to store search hobbies/history into local storage
function storeHobbies (hobbyName){
  let storedHobbies =[];
  storedHobbies = JSON.parse(localStorage.getItem("searchedHobby")) || [];

if (!storedHobbies.includes(hobbyName)) {
    storedHobbies.push(hobbyName);
  }
  localStorage.setItem("searchedHobby", JSON.stringify(storedHobbies));
}

// function to renderbuttons for search history onto the page

function renderbuttons (storedHobbies){

  localStorage.getItem(JSON.parse(storedHobbies))
   for (let i =0; i<storedHobbies.length; i++){
    let searchedButton = $("<button>").text(storeHobbies[i]).addClass("btn-primary")
    $("#history").append(searchedButton)
   }
}


// Button to restart the hobby search
$("#restart").on("click", function(e){
  e.preventDefault()
  window.location.href = "index.html";
  })


// button to take to saved hobbies
// $("#hobby-plan").on("click", function(e){
//   e.preventDefault();
//   window.location.href= "myhobbies.html";

//   $(document).ready(function(){
//      renderbuttons(storedHobbies);
//   })
 
// })
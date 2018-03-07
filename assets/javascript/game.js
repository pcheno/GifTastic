$(document).ready(function () {
  // Creates an array containing some animals
  var animals = ["Kangaroo", "Horse", "Skunk", "Cow", "Bird", "Coyote", "Dog", "Pig", "Duck", "Opossum"]
  // Create array containing acceptable ratings
  var ratings = ["g", "pg", "y"]

  function renderButtons() {
    //First empty out the div
    $("#animalButtons").empty();

    //now loop through animal array and create buttons and add to div
    for (var i = 0; i < animals.length; i++) {

      var a = $("<button>");

      a.addClass("animalBtn");
      a.attr("data-name", animals[i]);
      a.text(animals[i]);

      //add new button to div
      $("#animalButtons").append(a);

    } //for loop animals
  } // function renderButtons

  // adding an animal on click
  $("#addAnimal").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var animal = $("#animalInput").val().trim();

    // Adding movie from the textbox to our array. Check to make sure it is not already there, and if it is blank
    if (($.inArray(animal, animals) < 0) && (animal.length > 0)) {
      animals.push(animal);
    }
    // Calling renderButtons which handles the processing of our animal array
    renderButtons();
    // Clear input
    $("#animalInput").val("");
  });

  $(document).on("click", ".animalBtn", function () {

    var animal = $(this).attr("data-name");
    $("#animalGif").empty();
    // Constructing a queryURL using the animal name
    //var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
     // animal + "&api_key=VdxI3Z7sfpDYNUa1ke80JpoRVOJ9kLzb&limit=10&rating=g";
    var queryURL = "https://api.giphy.com/v1/gifs/random?tag=" +
      animal + "&api_key=VdxI3Z7sfpDYNUa1ke80JpoRVOJ9kLzb&rating=g";
    var gifCount = 0; 
    var gifId = [];  //store gif ids so as to get a display of random gifs
    do{
      ++gifCount;
      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After data comes back from the request
        .then(function (response) {
          console.log(queryURL);

          console.log(response);
          //clear out the giffy area
        

          // storing the data from the AJAX request in the results variable
          var results = response.data;

         

            // Creating and storing a div tag
            var animalDiv = $("<div>");
            animalDiv.addClass("gifyDiv");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: g");

            // Creating and storing an image tag
            var animalImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr({
              src: results.images.fixed_height_still.url,
              dataStill: results.images.fixed_height_still.url,
              dataAnimate: results.images.fixed_height.url,
              dataState: "still"
            });

            // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(p);
            animalDiv.append(animalImage);

            // Prependng the animalDiv to the HTML page in the "#animalGif" div
            $("#animalGif").prepend(animalDiv);

          
        }); //ajax
    } while (gifCount < 10)
  }); //on click for animalBtn

  //click on giffy   
  $(document).on("click", "img", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("dataState");
    // If the clicked image's state is still, update its src attribute to what its datAnimate value is.
    // Then, set the image's dataState to animate
    // Else set src to the dataStill value

    if (state == "animate") {
      $(this).attr("src", $(this).attr("dataStill"));
      $(this).attr("dataState", "still");
    } else {
      $(this).attr("src", $(this).attr("dataAnimate"));
      $(this).attr("dataState", "animate");
    } //end of if else state
  }); //end of click on gif


  //Just beginning, nothing clicked yet
  renderButtons();

}); //$(document).ready(function ()
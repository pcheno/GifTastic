$(document).ready(function () {
  // Creates an array containing some animals
  var animals = ["Camel", "Horse", "Skunk", "Cow", "Bird", "Coyote", "Dog", "Pig", "Duck", "Opossum"]
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

  $("#animalBtn").on("click", function (event) {
    event.preventDefault();
    console.log("we got here");
  });


  $(document).on("click", ".animalBtn", function () {

    var animal = $(this).attr("data-name");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=dc6zaTOxFJmzC&limit=10";

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
        $("#animalGif").empty();

        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {
          // check rating 
          if ((ratings.includes(results[i].rating))) {
            // Creating and storing a div tag
            var animalDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var animalImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr({
              src: results[i].images.fixed_height_still.url,
              dataStill: results[i].images.fixed_height_still.url,
              dataAnimate: results[i].images.fixed_height.url,
              dataState: "still"
            });


            // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(p);
            animalDiv.append(animalImage);

            // Prependng the animalDiv to the HTML page in the "#animalGif" div
            $("#animalGif").prepend(animalDiv);
          } //if included in ratings
        } //for loop thru results
      }); //ajax

  }); //on click for animalBtn

  //click on giffy   
  $(document).on("click","img", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("dataState");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    console.log("state:"+state)
    if (state == "animate") {
      console.log("true state: " + "dataStill: "+  $(this).attr("dataStill") )
      $(this).attr("src", $(this).attr("dataStill"));
      $(this).attr("dataState", "still");
    } else {
      console.log("false state: " + "dataAnimate: "+  $(this).attr("dataAnimate") )
      $(this).attr("src", $(this).attr("dataAnimate"));
      $(this).attr("dataState", "animate");
    }
  }); //end of click on gif

 
  //Just beginning, nothing clicked yet
  renderButtons();

}); //$(document).ready(function ()
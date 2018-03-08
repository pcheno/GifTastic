$(document).ready(function () {
  // Creates an array containing some animals
  var animals = ["kangaroo", "horse", "skunk", "cow", "bird", "coyote", "dog", "pig", "duck", "opossum", "sloth"]

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
  }); //on click of addAnimal buttons




  $(document).on("click", ".animalBtn", function (event) {
    event.preventDefault();
    var animal = $(this).attr("data-name");
    $("#animalGif").empty();

    var queryURL = "https://api.giphy.com/v1/gifs/random?tag=" +
      animal + "&api_key=VdxI3Z7sfpDYNUa1ke80JpoRVOJ9kLzb&rating=g";
    var gifCount = 0;
    var gifId = []; //store gif ids so as to get a display of random gifs
    for (var i=0;i < 10;i++) {
      
      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After data comes back from the request
        .then(function (response) {

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
          // and getting the giffy imgs and set data state
          console.log(results.images.fixed_height_still.url);

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
    } //for loop for 10 gifs
  }); //on click for animalBtn gets gifs and sets attributes

  //click on giffy   
  $(document).on("click", "img", function (event) {
    event.preventDefault();
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
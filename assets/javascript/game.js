$(document).ready(function () {
  // Creates an array containing some animals
  var animals = ["Camel", "Horse", "Skunk", "Cow", "Bird", "Coyote", "Dog", "Pig", "Duck", "Opossum"]
  // Create array containing acceptable ratings
  var ratings = ["g","pg","y"]

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

  // adding an animal
  $("#addAnimal").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var animal = $("#animalInput").val().trim();

    // Adding movie from the textbox to our array. Check to make sure it is not already there, and if it is blank
    if (($.inArray(animal, animals) < 0)  && (animal.length >0)) {
      animals.push(animal);
    }
    // Calling renderButtons which handles the processing of our animal array
    renderButtons();
    // Clear input
    $("#animalInput").val("");
  });

  renderButtons();


}); //$(document).ready(function ()
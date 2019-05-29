var menu = "";
var ingredients = []; 

// when document is ready, load content to the favorite circles.
$(document).ready(function () {
    console.log("document ready");
    // for(var i=1; i<5; i++){
    //     $("#number-"+i).text(i);
    // }
    $.get("/api/recipes", function (response) {
        console.log(response);
        console.log(response[0].favorites);
        // update favorites numbers and names
        for (var i = 1; i < 5; i++) {
            $("#number-" + i).text(response[i-1].favorites);
            $("#text-"+i).text(response[i-1].name);
            console.log(response[i-1].favorites);
        }

    });
}); 

// search function
$("#search").on("click", function(){
    event.preventDefault();
    menu = $("#input").val();
    recipeGet();
    localStorage.clear();
    localStorage.setItem("menuItem", menu);
    $("#input").val("");
});
// on page load, display the search results from last time
menu = localStorage.getItem("nemuItem");
if(menu != ""){
    console.log(menu);
    recipeGet();
    display();
}

// function for getting recipe info from Edmame API
function recipeGet(){
    var queryURL = "https://api.edamam.com/search?app_id=70759dcf&app_key=9dd2180439775e87273f0c2286490cbb&q=" + menu; 
    console.log(menu);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        namePool = [];
        imagePool = [];
        sourcePool = [];
        linkPool = [];
        caloryPool = [];
        timePool = [];
        servesPool = [];
        // get 10 recipes
        for (var i = 0; i<10; i++){
            var name = response.hits[i].recipe.label;
            var image = response.hits[i].recipe.image;
            // if returns no image, replace image with our own default image
            if(image === null){
                image = "/img/bros.png";
            }
            console.log(image);
            var source = response.hits[i].recipe.source;
            var link = response.hits[i].recipe.url;
            var calory = parseInt(response.hits[i].recipe.calories);
            var time = parseInt(response.hits[i].recipe.totalTime);
            var serves = parseInt(response.hits[i].recipe.yield);
            // store the vars into array
            namePool.push(name);
            imagePool.push(image);
            sourcePool.push(source);
            linkPool.push(link);
            caloryPool.push(calory);
            timePool.push(time);
            servesPool.push(serves);
        }
        display();
    })
}

// function for manipulating DOM
function display(){
    $("#searchResults").empty();
    for(var i = 0; i<10; i++){
        var newCard = $("<div>", {"class": "card card-block"});
        var newImage = $("<img>", {"class": "card-img-top"});
        newImage.attr("src", imagePool[i]);
        newCard.append(newImage);
        var newBody = $("<div>", {"class": "card-body"});
        var newTitle = $("<h5>", {"class": "card-title"}).text(namePool[i]);
        var newText = $("<p>", {"class": "card-text"}).html("Calories: " + caloryPool[i]);
        var newLink = $("<a>").text(sourcePool[i]);
        newLink.attr("href", linkPool[i]);
        newLink.attr("class", "btn btn-primary");
        newBody.append(newTitle);
        newBody.append(newText);
        newBody.append(newLink);
        newCard.append(newBody);
        var newCol = $("<div>", {"class": "col-sm-4 col-xs-6"});
        newCol.append(newCard);
        $("#searchResults").append(newCol);
        // add a fav button with corresponding id
        var favButton = $("<button>").html('<i class="far fa-star"></i>');
        favButton.attr("class", "fav");
        favButton.attr("data-recipeId", i);
        newTitle.append(favButton);
    }
}

$(".like").on("click", function(){
    event.preventDefault();
    var id = $(this).data("recipeid");
    // alert("You liked it!");
    console.log(id);
    var getUrl = "/api/recipes/" + id;
    console.log(getUrl);
    $.get(getUrl, function(data){
        var favorites = data.favorites;
        console.log(data);
        console.log("test fav" + favorites);
        var updatedRecipe = {
            favorites: parseInt(favorites + 1)
        };

        $.ajax({
            url: "/api/like/" + id,
            type: "PUT",
            data: updatedRecipe
        }).then(function(response){
            console.log("favorite times updated.");
            location.reload();
        })
    });

   
})
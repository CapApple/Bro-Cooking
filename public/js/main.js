// when document is ready, load content to the favorite circles.
$(document).on("ready", function(){
    console.log("document ready");
    for(var i=1; i<5; i++){
        $("#number-"+i).text(i);
    }
    $.get("/api/recipes", function(response){
        alert("test");
        console.log(response);
        for(var i=1; i<5; i++){
            $("#number-"+i).text(response[i-1].favorites);
        }
    });
});


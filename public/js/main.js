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
        }

    });
});


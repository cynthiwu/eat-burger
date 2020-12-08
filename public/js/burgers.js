$(function() {
    console.log("Test test test")
    $(".devour-button").on("click", function(event){
        const id = $(this).data("id");
        // const newDevour = $(this).data("devoured");
        const newDevour = "true";

        console.log(id);
        console.log(newDevour);

        const newDevourState = {
            devoured: newDevour
        };

        // Send the PUT request.

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevourState
        }).then(
            function() {
                console.log("Changed devoured to", newDevour);

                location.reload();
            }
        );   
    });

    $("#form-button").on("click", function(event) {
        event.preventDefault();
        const newBurger = {
            burger_name: $("#bu").val().trim(),
        };

        $.ajax("api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log("Created new burger");
                location.reload();
            }
        );
    });

    $(".close-button").on("click", function(event) {
        event.preventDefault();

        const id = $(this).data("id");

        $.ajax("/api/burgers/" + id, {
            type: "DELETE",
        }).then(
            function() {
                console.log("Deleted burger with ID" + id);
                location.reload();
            }
        );
    });
    
});


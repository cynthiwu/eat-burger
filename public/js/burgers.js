$(function() {
    
    // Adding event listener to devour button
    $(".devour-button").on("click", function(event){
        const id = $(this).data("id");
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

    // Adding event listener to the submit form button
    $("#form-button").on("click", function(event) {
        event.preventDefault();
        const newBurger = {
            burger_name: $("#bu").val().trim(),
        };

        // Send the PUT request.
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

    // Adding event listener to the close buttons
    $(".close-button").on("click", function(event) {
        event.preventDefault();

        const id = $(this).data("id");

        // Send the DELETE request.

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


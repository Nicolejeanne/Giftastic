$( document ).ready(function() {

    // Array of reactions
    let topics = ["HAPPY", "ANGRY", "ANNOYED", "SAD", "SILLY"];
    let results;
    let reactionImage;

    // Function to loop through array and append .reactionButtons div with topics array buttons
    function displayTopicButtons() {
        for (let i = 0; i < topics.length; i++){
            let reactionBtn = $("<button>");
            reactionBtn.addClass("topic-button");
            reactionBtn.attr("data-topic", topics[i]);
            reactionBtn.text(topics[i]);
            $(".reactionButtons").append(reactionBtn);
            console.log(reactionBtn);
            }
    }

    // Call function to display buttons
    displayTopicButtons();

    // Function to take input from user on submit button click, add input to array and append new button
    $(".addreaction").on("click", function(e) {
        e.preventDefault();
        // Take the value of the input from input field, trim white space and capitalize all letters
        let newReaction = $(".topic-input").val().trim().toUpperCase();
        // Add new input to end of array
        topics.push(newReaction);
        console.log(topics);
        // Empty reaction buttons so they do not duplicate
        $(".reactionButtons").empty();
        //Call Create Button Function to redisplay new array of buttons
        displayTopicButtons();
    });

    // "on-click" event attached to the reaction buttons
    $(document).on("click", ".topic-button", function(e) {
        e.preventDefault();
        // this assign the data to the button that was clicked, "this" is the clicked button, then assigns that to a variable
        let reaction = $(this).attr("data-topic");
        console.log(reaction);

    // The Giphy URL
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + reaction + "&api_key=8qLkmandy7K0kPgCCFksfYU2U0zSj7LU&limit=10";
        
    // AJAX request
        $.ajax({
            url: queryURL,
            method: "GET"
        })

    // .then statement to retrieve the data
        .then(function(response) {
        
    // Store the array of JSON results in a variable
        results = response.data;
        
    // Loop over responses
        for (let j = 0; j < results.length; j++) {

            // Only taking action if the photo is rated other than "r"
            if (results[j].rating !== "r") {

                // Creating a div with the class "item"
                let gifDiv = $("<div class= 'item'>");
                
                // Storing the result item's rating capitalized
                let rating = results[j].rating.toUpperCase();

                // Creating a paragraph tag for the rating
                let p = $("<p>").text("Rating: " + rating);

                // Creating an image tag
                reactionImage = $("<img>"); 

                // Give the image tag an src attr from the result item
                reactionImage.attr("src", results[j].images.fixed_width_still.url);
                reactionImage.attr("data-image", "true");
                reactionImage.attr("data-animated", results[j].images.fixed_width_downsampled.url);
                reactionImage.attr("data-still", results[j].images.fixed_width_still.url);
                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                gifDiv.append(p);
                gifDiv.append(reactionImage);

                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $(".reactions").prepend(gifDiv);  
            }


                 
        }
        });
    });

    // Start and Stop animation
       $(document).on("click", "img", function(){
           let currentlyStill = $(this).attr("data-image");
            if (currentlyStill === "false") {
                // $(this).src = results[j].images.fixed_width_still.url;
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-image", "true");
            }
            else {
                // $(this).src = results[j].images.fixed_width_downsampled.url;
                $(this).attr("src", $(this).attr("data-animated"));
                $(this).attr("data-image", "false");
            }
        });

});

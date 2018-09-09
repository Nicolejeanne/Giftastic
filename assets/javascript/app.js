$( document ).ready(function() {

    // Array of reactions
    let topics = ["Happy", "Angry", "Annoyed", "Sad", "Silly"];

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

    

displayTopicButtons();

    // "on-click" event attached to the reaction buttons
    $(".topic-button").on("click", function() {
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
        let results = response.data;
        
        // Loop over responses
        for (let j = 0; j < results.length; j++) {

            // Only taking action if the photo has an appropriate rating
            if (results[j].rating !== "r") {

                // Creating a div with the class "item"
                let gifDiv = $("<div class= 'item'>");
                
                // Storing the result item's rating
                let rating = results[j].rating;

                // creating a papragraph tag for the rating
                let p = $("<p>").text("Rating: " + rating);

                // Creating an image tag
                let reactionImage = $("<img>"); 

                // Giving the image tag an src attr from the result item
                reactionImage.attr("src", results[j].images.fixed_width_downsampled.url);

                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                gifDiv.append(p);
                gifDiv.append(reactionImage);

                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $(".reactions").prepend(gifDiv);  

                
                    
            

                /*let reactionBtn = $("<button>");
                reactionBtn.addClass("topic-button");
                reactionBtn.attr("data-topic", topics[i]);
                reactionBtn.text(topics[i]);
                $(".reactionButtons").append(reactionBtn);
                console.log(reactionBtn);
                
                function newButton() {
        $(".addreaction").on("click", function() {
            let newReaction = $(".topic-input").val();
            topics.push(newReaction);
            console.log(topics);
            
    });
    }
                */






                 // "on-click" event to start then stop the animation of the gif
    // $("<img>").on("click", function() {
        // this will need to start then on second click stop the animation
        // reactionImage.attr("src", results[j].images.fixed_width_downsampled.url);
        // reactionImage.attr("src", results[j].images.fixed_width_still.url);
    // });
            }
        }
    });
});

   

    // Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.
});
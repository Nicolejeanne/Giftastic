$( document ).ready(function() {

    let topics = ["Happy", "Angry", "Annoyed", "Sad", "Silly"];

    function displayTopicButtons() {
        for (let i = 0; i < topics.length; i++){
            let reactionBtn = $("<button>");
            reactionBtn.addClass("topic-button", "topic-button-color");
            reactionBtn.attr("data-topic", topics[i]);
            reactionBtn.text(topics[i]);
            $(".reactionButtons").append(reactionBtn);
            console.log(reactionBtn);
        }
    }
    displayTopicButtons();
});
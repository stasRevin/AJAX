$(document).ready(function() {

   var shuffledInput = $("#shuffledInput");
   var userText = $("#userText");

   $("#submitButton").click(function() {

        shuffledInput.shuffleLetters({
            "text": userText.val()
        });
        userText.val("");
   });

});
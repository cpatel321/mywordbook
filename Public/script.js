$(document).ready(function () {
    // Function to handle form submission
    $("#wordForm").submit(function (event) {
        event.preventDefault();

        // Get the word and meaning from the form
        const word = $("#word").val();
        const meaning = $("#meaning").val();
        const meaningG= $("#meaningG").val();

        // Send the data to the back-end API
        $.ajax({
            url: "/api/words",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ word: word,meaningG: meaningG, meaning: meaning }),
            success: function (data) {
                // Clear the form after successful submission
                $("#word").val("");
                $("#meaning").val("");
                $("#meaningG").val("");

                // Display the newly added word and meaning
                displayWord(data);
            },
            error: function (error) {
                console.error("Error adding word:", error);
            }
        });
    });

    // Function to display the added word in the word list
    function displayWord(wordData) {
        const wordItem = $("<div class='word-item'></div>");
        const wordHeader = $("<h3></h3>").text(wordData.word);
        const meaningPara = $("<p></p>").text("Meaning: " + wordData.meaning);
        const meaningParaG = $("<p></p>").text("Google Translate: " + wordData.meaningG);

        wordItem.append(wordHeader,meaningParaG, meaningPara);
        $("#wordList").empty();
        $("#wordList").append(wordItem);
    }

    // Fetch the existing words from the back-end API on page load
    $.ajax({
        url: "/api/words",
        method: "GET",
        success: function (data) {
            // Display the existing words
            data.forEach(function (wordData) {
                displayWord(wordData);
            });
        },
        error: function (error) {
            console.error("Error fetching words:", error);
        }
    });
});

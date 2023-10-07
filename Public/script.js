$(document).ready(function () {
    // Get the meaningG input element
    const meaningGInput = $("#meaningG");
    updateWordOfTheDay();
  // Attach an input event listener to the word input box
  $("#word").on("input", function () {
    const inputWord = $(this).val();

    $.ajax({
      url: "/api/dictionary/" + inputWord,
      method: "GET",
      success: function (data) {
        meaningGInput.val(data.meaningG);
      },
      error: function (error) {
        // Clear the meaningG input if the word is not found
        meaningGInput.val("");
      }
    });
  });

    // Function to handle form submission
    $("#wordForm").submit(function (event) {
        event.preventDefault();

        // Get the word and meaning from the form
        const word = $("#word").val();
        const meaning = $("#meaning").val();
        const meaningG = meaningGInput.val();

        // Send the data to the back-end API
        $.ajax({
            url: "/api/words",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ word: word, meaningG: meaningG, meaning: meaning }),
            success: function (data) {
                // Clear the form after successful submission
                $("#word").val("");
                $("#meaning").val("");
                meaningGInput.val(""); // Clear the meaningG input as well

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
        const meaningPara = $("<p><b></b></p>").text("Custom Meaning: " + wordData.meaning);
        const meaningParaG = $("<p><b></b></p>").text("Meaning: " + wordData.meaningG);

        wordItem.append(wordHeader, meaningParaG, meaningPara);
        $("#wordList").empty();
        $("#wordList").append(wordItem);
    }

    // Function to fetch and display the meaningG from JSON file based on the word
    function fetchMeaningG(word) {
        const matchedWord = wordsData.find(entry => entry.word === word);
        if (matchedWord) {
            meaningGInput.val(matchedWord.meaningG);
        } else {
            meaningGInput.val("");
        }
    }

    function updateWordOfTheDay() {
        $.ajax({
            url: "/api/wordofday",
            method: "GET",
            success: function (data) {
                $("#wordOfTheDay").text(data.word);
                $("#wordOfTheDayMeaning").text(data.meaning);
            },
            error: function (error) {
                $("#wordOfTheDay").text("No word available for the day.");
                $("#wordOfTheDayMeaning").text("");
            }
        });
    }
    
});

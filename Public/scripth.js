$(document).ready(function () {



    function displayWord(wordData) {
        const wordItem = $("<div class='word-item'></div>");
        const wordHeader = $("<h3></h3>").text(wordData.word);
        const meaningPara = $("<p></p>").text("Meaning: " + wordData.meaning);
        const meaningParaG = $("<p></p>").text("Google Translate: " + wordData.meaningG);

        wordItem.append(wordHeader,meaningParaG, meaningPara);
        // wordItem.append(wordHeader, meaningPara);
        
        $("#wordList").append(wordItem);
    }

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

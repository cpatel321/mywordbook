$(document).ready(function () {

    function displayWord(wordData) {
        const wordItem = $("<div class='word-item'></div>");
        const wordHeader = $("<h3></h3>").text(wordData.word);
        const meaningPara = $("<p></p>").text("Custom Meaning: " + wordData.meaning);
        const meaningParaG = $("<p></p>").text("Meaning: " + wordData.meaningG);

        wordItem.append(wordHeader,meaningParaG, meaningPara);
        // wordItem.append(wordHeader, meaningPara);
        
        $("#wordList").append(wordItem);
    }

    $.ajax({
        url: "/api/words",
        method: "GET",
        success: function (data) {
            // Display the existing words
            data.sort(function (a, b) {
                return b.id - a.id; // Sort by numerical id in descending order
            });
            data.forEach(function (wordData) {
                displayWord(wordData);
            });
        },
        error: function (error) {
            console.error("Error fetching words:", error);
        }
});
});

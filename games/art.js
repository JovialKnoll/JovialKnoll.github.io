var dice = document.getElementById('dice');
var checkButton = document.getElementById('button');
var results = document.getElementById('results');
function fileInput() {
    checkButton.disabled = false;
}
function checkArt() {
    var resultElement = document.createElement('div');
    resultElement.innerHTML = "It's Art.";
    results.insertBefore(resultElement, results.firstChild);
}

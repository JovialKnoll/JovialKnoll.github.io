var dice = document.getElementById('dice');
var rollButton = document.getElementById('button');
var results = document.getElementById('results');
function diceInput(text) {
    var cleanText = text
        .replace(/\s/g, '')
        .toLowerCase();
    var valid = /^([-]?[0-9]*[d]?[0-9]+)([+-][0-9]*[d]?[0-9]+)*$/.test(cleanText);
    rollButton.disabled = !valid;
}
function getRoll(size) {
    return Math.floor(Math.random() * (size)) + 1;
}
function handlePart(part) {
    var partResult = 0;
    if (part.indexOf('d') > -1) {
        var dieArray = part.split('d');
        var rollsLeft = 1;
        if (dieArray[0].length > 0) {
            rollsLeft = parseInt(dieArray[0]);
        }
        var dieSize = parseInt(dieArray[1]);
        while (rollsLeft > 0) {
            partResult += getRoll(dieSize);
            --rollsLeft;
        }
    } else if (part.length > 0){
        partResult = parseInt(input);
    }
    return partResult;
}
function rollDice() {
    var array = dice.value
        .replace(/\s/g, '')
        .toLowerCase()
        .split('+')
        .filter(function (input) {
            return input.length > 0;
        });
    var result = 0;
    for (var i = 0; i < array.length; ++i) {
        var part = array[i];
        var parts = part.split('-');
        result += handlePart(parts[0]);
        for (var j = 1; j < parts.length; ++j) {
            result -= handlePart(parts[j]);
        }
    }
    var resultElement = document.createElement('div');
    resultElement.innerHTML = result;
    results.insertBefore(resultElement, results.firstChild);
}

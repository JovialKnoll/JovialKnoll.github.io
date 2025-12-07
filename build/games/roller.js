const dice = document.getElementById('dice');
const rollButton = document.getElementById('button');
const results = document.getElementById('results');
function diceInput(textIn) {
    const cleanText = textIn
        .replace(/\s/g, '')
        .toLowerCase();
    const valid = /^([-]?[0-9]*[d]?[0-9]+)([+-][0-9]*[d]?[0-9]+)*$/.test(cleanText);
    rollButton.disabled = !valid;
}
function getRoll(size) {
    return size === 0
        ? 0
        : Math.floor(Math.random() * size) + 1
        ;
}
function handlePart(part) {
    let partResult = 0;
    if (part.indexOf('d') > -1) {
        const dieArray = part.split('d');
        let rollsLeft = 1;
        if (dieArray[0].length > 0) {
            rollsLeft = parseInt(dieArray[0]);
        }
        const dieSize = parseInt(dieArray[1]);
        while (rollsLeft > 0) {
            partResult += getRoll(dieSize);
            --rollsLeft;
        }
    } else if (part.length > 0){
        partResult = parseInt(part);
    }
    return partResult;
}
function rollDice() {
    const array = dice.value
        .replace(/\s/g, '')
        .toLowerCase()
        .split('+')
        .filter(function (input) {
            return input.length > 0;
        });
    let result = 0;
    for (let i = 0; i < array.length; ++i) {
        const part = array[i];
        const parts = part.split('-');
        result += handlePart(parts[0]);
        for (let j = 1; j < parts.length; ++j) {
            result -= handlePart(parts[j]);
        }
    }
    const resultElement = document.createElement('div');
    resultElement.innerHTML = result;
    results.insertBefore(resultElement, results.firstChild);
}
dice.addEventListener("keydown", function (e) {
    if (e.code === "Enter" && !rollButton.disabled) {
        rollDice();
    }
});

function getRoll(size) {
    return Math.floor(Math.random() * (size)) + 1;
}
function rollDice() {
    var array = document.getElementById('dice')
        .value
        .replace(/\s/g, '')
        .toLowerCase()
        .split('+')
        .filter(function (input) {
            return input.length > 0;
        });
    var result = 0;
    for (var i = 0; i < array.length; ++i) {
        var input = array[i];
        if (input.indexOf('d') > -1) {
            var dieArray = input.split('d');
            var rollsLeft = 1;
            if (dieArray[0].length > 0) {
                rollsLeft = parseInt(dieArray[0]);
            }
            var dieSize = parseInt(dieArray[1]);
            while (rollsLeft > 0) {
                result += getRoll(dieSize);
                --rollsLeft;
            }
        } else {
            result += parseInt(input);
        }
    }
    var parentElement = document.getElementById('results');
    var resultElement = document.createElement('div');
    resultElement.innerHTML = result;
    parentElement.insertBefore(resultElement, parentElement.firstChild);
}
document.getElementById('button').onclick = rollDice;

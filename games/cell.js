// elements
var aliveChanceButton = document.getElementById('alive-chance-button');
var aliveChanceText = document.getElementById('alive-chance-text');
var timeButton = document.getElementById('time-button');
var timeText = document.getElementById('time-text');
var canvas = document.getElementById('canvas');
// state
var size = 256;
var multi = 2;
var deadBright = 48;
var deadSteps = 6;
var deadSpeed = deadBright / deadSteps;
var redSpeed = 5;
var blueSpeed = 4;
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, size*multi, size*multi);
var nextTime;
var born = [];
var survives = [];
var cellArray;
// make it work
function getAliveChance() {
    return parseFloat(aliveChanceText.value);
}
function getTime() {
    return parseInt(timeText.value);
}
function aliveChanceInput(newAliveChance) {
    // validation goes here
}
function timeInput(newTime) {
    // validation goes here
}
function resetArray() {
    cellArray = new Array(size)
        .fill(0)
        .map(function() {
            return new Array(size)
                .fill(0)
                .map(function() {
                    return Math.random() < (1 - getAliveChance())
                        ? 0
                        : 1;
                });
        });
}
resetArray();
function getWrappedIndex(i) {
    return (i + size) % size;
}
function getNeighbor(i, j) {
    return cellArray[getWrappedIndex(i)][getWrappedIndex(j)] > 0 ? 1 : 0;
}
function getNewValue(i, j) {
    var adjacentAliveCount = 0;
    for (var x = -1; x < 2; ++x) {
        for (var y = -1; y < 2; ++y) {
            adjacentAliveCount += getNeighbor(i + x, j + y);
        }
    }
    selfAliveCount = getNeighbor(i, j);
    adjacentAliveCount -= selfAliveCount;
    currentValue = cellArray[i][j];
    return selfAliveCount
        ? (
            survives.includes(adjacentAliveCount)
                ? Math.min(1024, currentValue + 1)
                : 0
        )
        : (
            born.includes(adjacentAliveCount)
                ? 1
                : 0
        )
        ;
}
function getColor(val) {
    var r = Math.max(0, 255 + redSpeed - val * redSpeed).toString();
    var b = Math.min(255, - blueSpeed + val * blueSpeed).toString();
    var g = (255 - r - b);
    return "rgb(" + r + "," + g + "," + b + ")";
}
function updateDrawArray() {
    var newArray = [];
    for (var i = 0; i < size; ++i)
    {
        var newColumn = [];
        for (var j = 0; j < size; ++j)
        {
            newColumn.push(getNewValue(i, j));
            var val = cellArray[i][j];
            if (val > 0) {
                ctx.fillStyle = getColor(val);
                ctx.fillRect(i*multi, j*multi, multi, multi);
            }
        }
        newArray.push(newColumn);
    }
    cellArray = newArray;
}
// looping and input
var isRunning = false;
function loop() {
    ctx.globalAlpha = 0.333;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, size*multi, size*multi);
    ctx.globalAlpha = 1.0;
    updateDrawArray();
}
function setTime() {
    nextTime = getTime();
    if (isRunning) {
        toggleRunning();
        toggleRunning();
    }
}
setTime();
function setRules() {
    born = [];
    survives = [];
    for (var n = 0; n < 9; ++n) {
        var bElement = document.getElementById('b' + n.toString());
        if (bElement.checked) {
            born.push(n);
        }
        var sElement = document.getElementById('s' + n.toString());
        if (sElement.checked) {
            survives.push(n);
        }
    }
}
setRules();
function resetAutomata() {
    setRules();
    resetArray();
    loop();
}
function toggleRunning() {
    isRunning = !isRunning;
    if (isRunning) {
        interval = setInterval(loop, nextTime);
    }
    else {
        clearInterval(interval);
    }
}
toggleRunning();

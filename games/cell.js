// state
var size = 256;
var multi = 2;
var deadBright = 48;
var deadSteps = 6;
var deadSpeed = deadBright / deadSteps;
var redSpeed = 4;
var blueSpeed = 2;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var aliveChance = 0.0625;
var nextTime = 500;
var time = nextTime;
var born = [];
var survives = [];
var cellArray;
// make it work
function clearCanvas() {
    // make this be transparent
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, size*multi, size*multi);
}
clearCanvas();
function aliveChanceInput(newAliveChance) {
    // validation goes here
    aliveChance = newAliveChance;
}
function timeInput(newNextTime) {
    // validation goes here
    nextTime = newNextTime;
}
function resetArray() {
    cellArray = new Array(size)
        .fill(0)
        .map(function() {
            return new Array(size)
                .fill(0)
                .map(function() {
                    return Math.random() < (1 - aliveChance) ? 0 : 1;
                });
        });
}
resetArray();
function getNeighbor(i, j) {
    return cellArray[(i + size) % size][(j + size) % size] > 0 ? 1 : 0;
}
function getNewValue(i, j) {
    var neighbors = getNeighbor(i - 1, j - 1)
        + getNeighbor(i, j - 1)
        + getNeighbor(i + 1, j - 1)
        + getNeighbor(i - 1, j)
        + getNeighbor(i + 1, j)
        + getNeighbor(i - 1, j + 1)
        + getNeighbor(i, j + 1)
        + getNeighbor(i + 1, j + 1);
    currentValue = cellArray[i][j];
    return currentValue > 0
        ? (survives.includes(neighbors) ? Math.min(1024, currentValue + 1) : 0)
        : (born.includes(neighbors) ? 1 : 0)
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
    for (var i = 0;i < size;++i)
    {
        var newColumn = [];
        for (var j = 0;j < size;++j)
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
    clearCanvas();
    updateDrawArray();
}
function toggleRunning() {
    isRunning = !isRunning;
    if (isRunning) {
        interval = setInterval(loop, time);
    }
    else {
        clearInterval(interval);
    }
}
function setTime() {
    time = nextTime;
    if (isRunning) {
        toggleRunning();
        toggleRunning();
    }
}
setTime();
function setRules() {
    born = [];
    survives = [];
    for (var n = 0;n < 9;++n) {
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
toggleRunning();

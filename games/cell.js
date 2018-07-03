// state
var size = 256;
var multi = 2;
var smallest = -12;
var deadSpeed = 4;
var redSpeed = 4;
var blueSpeed = 2;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var aliveChance = 0.125;
var cellArray;
var nextTime = 125;
var time = nextTime;
var born = [];
var survives = [];
// make it work
function clearCanvas() {
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
                    return Math.random() < (1 - aliveChance) ? smallest : 1;
                });
        });
}
resetArray();
function getNeighbor(i, j) {
    return cellArray[(i + size) % size][(j + size) % size] > 0 ? 1 : 0;
}
function getNewValue(i, j) {
    var neighbors = 0;
    for (var di = -1;di < 2;++di) {
        neighbors += getNeighbor(i + di, j - 1);
        neighbors += getNeighbor(i + di, j + 1);
    }
    neighbors += getNeighbor(i - 1, j);
    neighbors += getNeighbor(i + 1, j);
    currentValue = cellArray[i][j];
    return currentValue > 0
        ? (survives.includes(neighbors) ? Math.min(1024, currentValue + 1) : 0)
        : (born.includes(neighbors) ? 1 : Math.max(smallest, currentValue - 1))
        ;
}
function getColor(val) {
    if (val < 1) {
        var c = Math.max(0, 48 + val * deadSpeed).toString();
        return "rgb(" + c + "," + c + "," + c + ")";
    }
    var r = Math.max(0, 255 + redSpeed - val * redSpeed).toString();
    var b = Math.min(255, - blueSpeed + val * blueSpeed).toString();
    return "rgb(" + r + ",0," + b + ")";
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
            if (val > smallest) {
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
var time = nextTime;
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

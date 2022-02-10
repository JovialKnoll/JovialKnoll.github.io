const aliveChanceText = document.getElementById('alive-chance-text');
const timeText = document.getElementById('time-text');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const size = 256;
const redSpeed = 5;
const blueSpeed = 4;
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, size, size);
let nextTime;
let born = [];
let survives = [];
let cellArray;
// make it work
function getAliveChance() {
    return parseFloat(aliveChanceText.value);
}
function getTime() {
    return parseInt(timeText.value);
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
    let adjacentAliveCount = 0;
    for (let x = -1; x < 2; ++x) {
        for (let y = -1; y < 2; ++y) {
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
    const r = Math.max(0, 255 + redSpeed - val * redSpeed).toString();
    const b = Math.min(255, - blueSpeed + val * blueSpeed).toString();
    const g = (255 - r - b);
    return "rgb(" + r + "," + g + "," + b + ")";
}
function updateDrawArray() {
    const newArray = [];
    for (let i = 0; i < size; ++i)
    {
        const newColumn = [];
        for (let j = 0; j < size; ++j)
        {
            newColumn.push(getNewValue(i, j));
            const val = cellArray[i][j];
            if (val > 0) {
                ctx.fillStyle = getColor(val);
                ctx.fillRect(i, j, 1, 1);
            }
        }
        newArray.push(newColumn);
    }
    cellArray = newArray;
}
// looping and input
let isRunning = false;
function loop() {
    ctx.globalAlpha = 0.333;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, size, size);
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
    for (let n = 0; n < 9; ++n) {
        const bElement = document.getElementById('b' + n.toString());
        if (bElement.checked) {
            born.push(n);
        }
        const sElement = document.getElementById('s' + n.toString());
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

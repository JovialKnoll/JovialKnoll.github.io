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
toggleRunning();
function resetAutomata() {
    resetArray();
    loop();
}
function setTime() {
    time = nextTime;
    if (isRunning) {
        toggleRunning();
        toggleRunning();
    }
}
function setRules() {
}

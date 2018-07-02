// main loop
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
// start
toggleRunning();
// interaction setup

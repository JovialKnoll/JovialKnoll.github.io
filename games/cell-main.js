// main loop
function loop() {
    updateArray();
    clearCanvas();
    drawArray();
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

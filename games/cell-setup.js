// canvas setup
var size = 256;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
function clearCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, size*2, size*2);
}
clearCanvas();
// state setup
var amountBlank = 0.666;
var cellArray;
function resetArray() {
    cellArray = new Array(size)
        .fill(0)
        .map(function() {
            return new Array(size)
                .fill(0)
                .map(function() {
                    return Math.random() < amountBlank ? 0 : 1;
                });
        });
}
resetArray();
var time = 50;
var born = [3];
var survives = [2,3];
var isRunning = false;
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
    return cellArray[i][j] > 0
        ? (survives.includes(neighbors) ? cellArray[i][j] + 1 : 0)
        : (born.includes(neighbors) ? 1 : 0)
        ;
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
                ctx.fillStyle = "rgb("
                    + Math.max(0, 255 + 8 - val * 8).toString()
                    + ",0,"
                    + Math.min(255, - 8 + val * 8).toString()
                    + ")";
                ctx.fillRect(i*2, j*2, 2, 2);
            }
        }
        newArray.push(newColumn);
    }
    cellArray = newArray;
}

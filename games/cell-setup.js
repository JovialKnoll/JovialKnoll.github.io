// canvas setup
var size = 256;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
function clearCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, size, size);
}
clearCanvas();
// state setup
var amountBlank = 0.666;
var cellArray = new Array(size)
    .fill(0)
    .map(function() {
        return new Array(size)
            .fill(0)
            .map(function() {
                return Math.random() < amountBlank ? 0 : 1;
            });
    });
var time = 1000;
var isRunning = false;
function drawArray() {
    ctx.fillStyle = 'red';
    for (var i = 0;i < size;++i)
    {
        for (var j = 0;j < size;++j)
        {
            switch (cellArray[i][j]) {
                case 1:
                    ctx.fillRect(i, j, 1, 1);
                    break;
            }
        }
    }
}
function updateArray() {
    var newArray = [];
    for (var i = 0;i < size;++i)
    {
        var newColumn = [];
        for (var j = 0;j < size;++j)
        {
            // fill out column cells
        }
        newArray.push(newColumn);
    }
    //cellArray = newArray;
}

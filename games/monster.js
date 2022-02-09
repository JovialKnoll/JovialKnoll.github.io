const smallSize = 48;
const largeSize = 64;
var canvasSize = 64;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'white';

const levelSelect = document.getElementById('level');
const bodySelects = [
    document.getElementById('tail'),
    document.getElementById('body'),
    document.getElementById('head'),
    document.getElementById('legs'),
    document.getElementById('arms')
];
const bodyParts = [
    "tail",
    "body",
    "head",
    "legs",
    "arms"
];
const bodyGroups = [
    "A",
    "B",
    "C"
];
var images = {};
// setting up images
for (var lvl = 0; lvl < 4; ++lvl) {
    var parts = bodyParts;
    if (lvl === 0) {
        parts = bodyParts.slice(1, 4);
    }
    var size = lvl === 3
        ? largeSize
        : smallSize;
    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];
        for (var j = 0; j < bodyGroups.length; ++j) {
            var group = bodyGroups[j];
            var fileStart = lvl.toString() + "-" + part + "-" + group;
            if (lvl === 0) {
                var file = fileStart + ".png";
                var image = new Image(size, size);
                image.src = "./images/" + file;
                images[fileStart] = image;
            }
            else {
                for (var k = 0; k < 3; ++k) {
                    var fileKey = fileStart + k.toString();
                    var file = fileKey + ".png";
                    var image = new Image(size, size);
                    image.src = "./images/" + file;
                    images[fileKey] = image;
                }
            }
        }
    }
}
function getLvl() {
    return parseInt(levelSelect.options[levelSelect.selectedIndex].value);
}
function levelChange() {
    // empty out options
    for (var i = 0; i < bodySelects.length; ++i) {
        var bodySelect = bodySelects[i];
        bodySelect.length = 0;
        bodySelect.disabled = true;
    }
    const lvl = getLvl();
    var selects = bodySelects;
    if (lvl === 0) {
        selects = bodySelects.slice(1, 4);
    }
    // fill in options
    for (var i = 0; i < selects.length; ++i) {
        var select = selects[i];
        for (var j = 0; j < bodyGroups.length; ++j) {
            var group = bodyGroups[j];
            if (lvl === 0) {
                var option = document.createElement('option');
                option.value = group;
                option.innerHTML = group;
                select.appendChild(option);
            }
            else {
                for (var k = 0; k < 3; ++k) {
                    var val = group + k.toString();
                    var option = document.createElement('option');
                    option.value = val;
                    option.innerHTML = val;
                    select.appendChild(option);
                }
            }
        }
        // pick a random option
        select.getElementsByTagName('option')[Math.floor(Math.random() * select.length)].selected = 'selected';
        select.disabled = false;
    }
    drawMonster();
}
function drawMonster() {
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    const lvl = getLvl();
    for (var i = 0; i < bodySelects.length; ++i) {
        var bodySelect = bodySelects[i];
        if (bodySelect.disabled) {
            continue;
        }
        var part = bodyParts[i];
        var imageKey = lvl.toString() + "-" + part + "-" + bodySelect.options[bodySelect.selectedIndex].value;
        var image = images[imageKey];
        var posX = 0;
        var posY = 0;
        if (lvl !== 3) {
            posX = (canvasSize - smallSize) / 2;
            posY = canvasSize - smallSize;
        }
        ctx.drawImage(image, posX, posY);
    }
}

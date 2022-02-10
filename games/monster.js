const smallSize = 48;
const largeSize = 64;
const canvasSize = 64;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
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
const images = {};
// setting up images
for (let lvl = 0; lvl < 4; ++lvl) {
    let parts = bodyParts;
    if (lvl === 0) {
        parts = bodyParts.slice(1, 4);
    }
    const size = lvl === 3
        ? largeSize
        : smallSize;
    for (let i = 0; i < parts.length; ++i) {
        const part = parts[i];
        for (let j = 0; j < bodyGroups.length; ++j) {
            const group = bodyGroups[j];
            const fileStart = lvl.toString() + "-" + part + "-" + group;
            if (lvl === 0) {
                const file = fileStart + ".png";
                const image = new Image(size, size);
                image.src = "./images/" + file;
                images[fileStart] = image;
            }
            else {
                for (let k = 0; k < 3; ++k) {
                    const fileKey = fileStart + k.toString();
                    const file = fileKey + ".png";
                    const image = new Image(size, size);
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
    for (let i = 0; i < bodySelects.length; ++i) {
        const bodySelect = bodySelects[i];
        bodySelect.length = 0;
        bodySelect.disabled = true;
    }
    const lvl = getLvl();
    let selects = bodySelects;
    if (lvl === 0) {
        selects = bodySelects.slice(1, 4);
    }
    // fill in options
    for (let i = 0; i < selects.length; ++i) {
        const select = selects[i];
        for (let j = 0; j < bodyGroups.length; ++j) {
            const group = bodyGroups[j];
            if (lvl === 0) {
                const option = document.createElement('option');
                option.value = group;
                option.innerHTML = group;
                select.appendChild(option);
            }
            else {
                for (let k = 0; k < 3; ++k) {
                    const val = group + k.toString();
                    const option = document.createElement('option');
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
    for (let i = 0; i < bodySelects.length; ++i) {
        const bodySelect = bodySelects[i];
        if (bodySelect.disabled) {
            continue;
        }
        const part = bodyParts[i];
        const imageKey = lvl.toString() + "-" + part + "-" + bodySelect.options[bodySelect.selectedIndex].value;
        const image = images[imageKey];
        let posX = 0;
        let posY = 0;
        if (lvl !== 3) {
            posX = (canvasSize - smallSize) / 2;
            posY = canvasSize - smallSize;
        }
        ctx.drawImage(image, posX, posY);
    }
}

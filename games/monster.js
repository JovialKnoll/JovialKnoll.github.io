// constant values
const smallSize = 48;
const canvasSize = 64;
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
for (let lvl = 0; lvl < 4; ++lvl) {
    let parts = bodyParts;
    if (lvl === 0) {
        parts = bodyParts.slice(1, 4);
    }
    const size = lvl === 3
        ? canvasSize
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
const baseTone = [[72, 79, 69], [123, 129, 121]];
const d1 = [94, 71, 124];
const d2 = [115, 72, 169];
const d3 = [135, 72, 214];
const d4 = [97, 51, 80];
const d5 = [132, 27, 97];
const d6 = [166, 4, 114];
const d7 = [27, 79, 51];
const d8 = [29, 102, 63];
const d9 = [30, 125, 75];
const d10 = [22, 55, 62];
const d11 = [25, 78, 87];
const d12 = [27, 100, 112];
const skins = [
    [baseTone, [d1, [116, 144, 148]], [d2, [110, 170, 177]], [d3, [105, 195, 205]]],
    [baseTone, [d1, [132, 141, 163]], [d2, [141, 152, 208]], [d3, [150, 164, 250]]],
    [baseTone, [d1, [159, 122, 158]], [d2, [197, 115, 196]], [d3, [233, 108, 233]]],
    [baseTone, [d4, [162, 117, 125]], [d5, [201, 105, 130]], [d6, [240, 93, 134]]],
    [baseTone, [d4, [158, 125, 81]], [d5, [194, 121, 40]], [d6, [229, 117, 0]]],
    [baseTone, [d4, [161, 141, 81]], [d5, [199, 154, 41]], [d6, [237, 166, 1]]],
    [baseTone, [d7, [157, 142, 68]], [d8, [186, 163, 35]], [d9, [215, 183, 3]]],
    [baseTone, [d7, [143, 147, 113]], [d8, [164, 167, 105]], [d9, [184, 185, 97]]],
    [baseTone, [d7, [132, 160, 86]], [d8, [148, 186, 83]], [d9, [163, 211, 80]]],
    [baseTone, [d10, [95, 133, 110]], [d11, [109, 162, 131]], [d12, [122, 190, 152]]],
    [baseTone, [d10, [85, 135, 147]], [d11, [71, 144, 157]], [d12, [57, 152, 167]]],
    [baseTone, [d10, [117, 151, 149]], [d11, [111, 173, 177]], [d12, [105, 195, 205]]]
];
// page elements
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'white';
const levelSelect = document.getElementById('level');
const bodySelects = [];
for (let i = 0; i < bodyParts.length; ++i) {
    bodySelects.push(
        document.getElementById(
            bodyParts[i]
        )
    );
}
const colorSelect = document.getElementById('color');
const randomizeButton = document.getElementById('randomize');
const downloadButton = document.getElementById('download');
const scaleSelect = document.getElementById('scale');
// functions - get values
function getLvl() {
    return parseInt(levelSelect.options[levelSelect.selectedIndex].value);
}
function getSkin() {
    const lvl = getLvl();
    return skins[colorSelect.selectedIndex][lvl];
}
function getScale() {
    return parseInt(scaleSelect.options[scaleSelect.selectedIndex].value);
}
// functions - do things
function levelChange() {
    for (let i = 0; i < bodySelects.length; ++i) {
        const bodySelect = bodySelects[i];
        bodySelect.length = 0;
        bodySelect.disabled = true;
    }
    const lvl = getLvl();
    let selects = bodySelects;
    if (lvl === 0) {
        selects = bodySelects.slice(1, 4);
        colorSelect.length = 0;
        colorSelect.disabled = true;
    } else if (colorSelect.length === 0) {
        for (let i = 0; i < skins.length; ++i) {
            const option = document.createElement('option');
            option.innerHTML = String.fromCharCode(65 + i);
            colorSelect.appendChild(option);
        }
        colorSelect.disabled = false;
    }
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
        select.disabled = false;
    }
    randomizeButton.disabled = false;
    downloadButton.disabled = false;
    randomize();
}
function randomize() {
    if (levelSelect.selectedIndex === 0) {
        return;
    }
    for (let i = 0; i < bodySelects.length; ++i) {
        const bodySelect = bodySelects[i];
        if (bodySelect.disabled) {
            continue;
        }
        bodySelect.getElementsByTagName('option')[Math.floor(Math.random() * bodySelect.length)].selected = 'selected';
    }
    if (!colorSelect.disabled) {
        colorSelect.getElementsByTagName('option')[Math.floor(Math.random() * colorSelect.length)].selected = 'selected';
    }
    drawMonster();
}
function drawMonster() {
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    const lvl = getLvl();
    // draw body parts
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
    // replace color
    if (!colorSelect.disabled) {
        const skin = getSkin();
        const imageData = ctx.getImageData(0, 0, canvasSize, canvasSize);
        for (let i = 0; i < imageData.data.length; i += 4) {
            if (
                imageData.data[i] === baseTone[0][0]
                && imageData.data[i+1] === baseTone[0][1]
                && imageData.data[i+2] === baseTone[0][2]
            ) {
                imageData.data[i] = skin[0][0];
                imageData.data[i+1] = skin[0][1];
                imageData.data[i+2] = skin[0][2];
            } else if (
                imageData.data[i] === baseTone[1][0]
                && imageData.data[i+1] === baseTone[1][1]
                && imageData.data[i+2] === baseTone[1][2]
            ){
                imageData.data[i] = skin[1][0];
                imageData.data[i+1] = skin[1][1];
                imageData.data[i+2] = skin[1][2];
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }
}
function download() {
    const scale = getScale();
    const scaleCanvasSize = canvasSize * scale;
    const scaleCanvas = document.createElement('canvas');
    scaleCanvas.width = scaleCanvasSize;
    scaleCanvas.height = scaleCanvasSize;
    const scaleCtx = scaleCanvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvasSize, canvasSize);
    for (let x = 0; x < canvasSize; ++x) {
        for (let y = 0; y < canvasSize; ++y) {
            const i = (y * canvasSize + x) * 4;
            const r = imageData.data[i];
            const g = imageData.data[i+1];
            const b = imageData.data[i+2];
            scaleCtx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            scaleCtx.fillRect(x * scale, y * scale, scale, scale);
        }
    }
    const link = document.createElement('a');
    link.download = "monster.png";
    link.href = scaleCanvas.toDataURL();
    link.click();
}

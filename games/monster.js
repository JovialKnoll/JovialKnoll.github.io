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
        ? 64
        : 48;
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
function levelSelect(level) {
    console.log(level);
}

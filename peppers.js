let w = 0, h = 0;
let pepperSprites = [];
let miniPeppers = [];

let pepperNames = [ "birds-eye",    "cayenne",    "fatalii",    "habanero",
                    "jalapeno",    "madame-jeanette",    "naga-jolokia",    "peperoncini",
                    "pequin",    "poblano",    "scotch-bonnet",    "tabasco"];

let pepperWidths =  [100,120,140,120,120,120,120,120,100,140,120,100];
let pepperHeights = [150,180,210,180,180,180,180,180,150,210,180,150];

let rows = [7, 3, 5, 0, 1, 2, 4, 6];
let columns = { "birds-eye":    {0:1, 1:1, 2:5, 3:5, 4:7, 5:7},
                "cayenne":      {0:1, 1:1, 2:5, 3:5, 4:7, 5:7, 6:6},
                "fatalii":      {0:1, 1:1, 2:5, 3:5, 4:7, 5:7},
                "habanero":     {0:1, 1:1, 2:5, 3:5, 4:7, 5:7},
                "jalapeno":     {0:1, 1:1, 2:5, 3:5, 4:7, 5:7},
                "madame-jeanette":{0:1, 1:1, 2:10, 3:10, 4:7, 5:7, 6:1, 7:1},
                "naga-jolokia": {0:1, 1:8, 2:5, 3:5, 4:7, 5:7},
                "peperoncini":  {0:1, 1:1, 2:5, 3:5, 4:7, 5:7},
                "pequin":       {0:1, 1:1, 2:4, 3:4, 4:7, 5:7},
                "poblano":      {0:1, 1:1, 2:5, 3:5, 4:7, 5:7},
                "scotch-bonnet":{0:1, 1:1, 2:5, 3:5, 4:7, 5:7},
                "tabasco":      {0:1, 1:1, 2:10, 3:10, 4:7, 5:7}};

function fixSize() {
    w = window.innerWidth;
    h = window.innerHeight;
    const canvas = document.getElementById('pepperCanvas');
    canvas.width = w;
    canvas.height = h;
}

function pageLoad() {

    window.addEventListener("resize", fixSize);
    fixSize();

    for (let p of pepperNames) {
        let mini = new Image();
        mini.src = p + "_mini.png";
        miniPeppers.push(mini);
        let maxi = new Image();
        maxi.src = p + ".png";
        pepperSprites.push(maxi);
    }

    window.requestAnimationFrame(redraw);

}

let lastTimestamp = 0;
let t = 0;

function redraw(timestamp) {

    if (lastTimestamp === 0) lastTimestamp = timestamp;
    const frameLength = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;
    t += frameLength * 10;

    const canvas = document.getElementById('pepperCanvas');
    const context = canvas.getContext('2d');

    context.fillStyle = 'black';
    context.fillRect(0,0,w,h);

    for (let p = 0; p < 12; p++) {
        context.drawImage(miniPeppers[p], 100+p*150, 100);

        for (let row of rows) {

            if (row * pepperHeights[p] > pepperSprites[p].height) continue;

            let cols = columns[pepperNames[p]][row]
            let twoArms = false;
            if (cols == 10) {
                twoArms = true;
                cols = 5;
            }

            let col = Math.floor(t) % cols;

            if (row > 1 && cols != 4) {
                let offset = 0;
                if (row == 5) offset = 3;
                if (row == 3 && cols == 5) offset = 2;
                if (row == 2 && cols == 10) extra = 5;
                let pace = 1;
                if (cols == 5) pace = 0.6667;
                col = Math.floor(t*pace + offset) % (cols-1) + 1;
                if (twoArms  && row == 2) col += 5;
            }

            context.drawImage(pepperSprites[p],
                    col * pepperWidths[p],
                    row * pepperHeights[p],
                    pepperWidths[p],
                    pepperHeights[p],
                    130-pepperWidths[p]/2+p*150,
                    410-pepperHeights[p],
                    pepperWidths[p],
                    pepperHeights[p]);
        }
    }

    window.requestAnimationFrame(redraw);

}

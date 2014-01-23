'use strict';

var Gol = (function () {
    // Private
    var canvas,
        ctx,
        grid = {
            background: 'rgba(44, 44, 44, 1)',
            backgroundLight: 'rgba(44, 44, 44, .333)',
            color: 'rgba(204, 204, 204, 1)',
            blockSize: 8,
            cols: 0,
            rows: 0,
            light: 'rgba(50, 50, 50, 1)', //'rgba(227, 187, 0, 1)',
            content: []
        },
        start,
        mousemoveEvent = false,
        animation = true;

    var setGrid = function(cols, rows) {
        grid.cols = cols;
        grid.rows = rows;

        ctx.strokeStyle = grid.color;
        for (var i = 0 ; i < rows ; i++) {
            ctx.moveTo(0, i * grid.blockSize);
            ctx.lineTo(canvas.width, i * grid.blockSize);
        }

        for (var i = 0 ; i < cols ; i++) {
            ctx.moveTo(i * grid.blockSize, 0);
            ctx.lineTo(i * grid.blockSize, canvas.height);
        }

        //ctx.stroke();

        initGrid(cols, rows);

        /*grid.content = [[0, 1, 0],
                        [0, 1, 0],
                        [0, 1, 0]];*/
    };

    var initGrid = function(cols, rows) {
        for (var i = 0 ; i < rows ; i++) {
            grid.content[i] = [];

            for (var j = 0 ; j < cols ; j++) {
                grid.content[i][j] = weightedRandom(60);
                if (grid.content[i][j]) {
                    changeColorAt(i, j, grid.light);
                }
            }
        }
    };

    var weightedRandom = function(weightZero) {
        var random = Math.floor(Math.random() * 101);

        if (random <= weightZero) {
            return 0;
        } else {
            return 1;
        }
    };

    var changeColorAt = function(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(y * grid.blockSize,
                     x * grid.blockSize,
                     grid.blockSize,
                     grid.blockSize);
    };

    var update = function() {
        var newGrid = [];

        for (var i = 0 ; i < grid.rows ; i++) {
            newGrid[i] = [];

            for (var j = 0 ; j < grid.cols ; j++) {
                if (isAlive(i, j)) {
                    newGrid[i][j] = 1;
                    changeColorAt(i, j, grid.light);
                } else {
                    newGrid[i][j] = 0;
                    changeColorAt(i, j, grid.background);
                }
            }
        }

        grid.content = newGrid;
    };

    var isAlive = function(x, y) {
        var neighbors = 0;

        neighbors += isThereNeighborAt(x - 1, y - 1);
        neighbors += isThereNeighborAt(x, y - 1);
        neighbors += isThereNeighborAt(x + 1, y - 1);

        neighbors += isThereNeighborAt(x - 1, y);
        neighbors += isThereNeighborAt(x + 1, y);

        neighbors += isThereNeighborAt(x - 1, y + 1);
        neighbors += isThereNeighborAt(x, y + 1);
        neighbors += isThereNeighborAt(x + 1, y + 1);

        if (((neighbors === 2 || neighbors === 3) && grid.content[x][y] === 1) ||
            (neighbors === 3 && grid.content[x][y] === 0)) {
            return 1;
        } else {
            return 0;
        }
    };

    var isThereNeighborAt = function(x, y) {
        if (grid.content[x] && grid.content[x][y] === 1) {
            return 1;
        } else {
            return 0;
        }
    };

    var gameLoop = function() {
        if (!start) {
            start = performance.now();
        }

        if (performance.now() - start > 100) {
            start = performance.now();
            update();
        }

        requestAnimationFrame(gameLoop);
    };

    var settingCanvas = function(width, height) {
        canvas.width = width;
        canvas.height = height;

        ctx.fillStyle = grid.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        setGrid(Math.ceil(width / grid.blockSize), Math.ceil(height / grid.blockSize));
        requestAnimationFrame(gameLoop);
    };

    // Public
    return function(elm, width, height) {
        /*
        initObject: {
            elm,
            blockSize,
            cols,
            rows
        }
        */
        this.init = function(initObject) {
            canvas = initObject.elm;
            ctx = canvas.getContext('2d');
            grid.blockSize = initObject.blockSize;

            settingCanvas(initObject.width, initObject.height);
        };

        this.setAnimation = function(state) {
            animation = state;
        };

        this.nextStep = function() {
            update();
        };

        this.getGridContent = function() {
            return grid.content;
        };

        this.initGrid = function(myGrid) {
            grid.content = myGrid;
        };

        this.resize = function(width, height) {
            settingCanvas(width, height);
        };

        this.addCellsOnHover = function() {
            if (mousemoveEvent)
                return;

            canvas.addEventListener("mousemove", function(e) {
                var canvasOffsetLeft = canvas.getBoundingClientRect().left,
                    canvasOffsetTop = canvas.getBoundingClientRect().top,
                    row,
                    col;

                row = Math.floor((e.clientY - canvasOffsetTop) / grid.blockSize);
                col = Math.floor((e.clientX - canvasOffsetLeft) / grid.blockSize);

                changeColorAt(row, col, grid.light);
                grid.content[row][col] = 1;
            }, false);

            mousemoveEvent = true;
        };

        this.init(elm, width, height);
    };
}());
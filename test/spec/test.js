/* global describe, it */

(function () {
    'use strict';

    describe('Game of life', function() {
        describe('Testing known figures', function() {
            it('empty should remain empty', function() {
                var blockSize = 3;
                var golElm = $('#gol');
                var gol = new Gol({
                    elm: golElm.get(0),
                    blockSize: blockSize,
                    width: blockSize * 3,
                    height: blockSize * 3
                }); // 3x3 grid

                var myGrid = [[0, 0, 0],
                              [0, 0, 0],
                              [0, 0, 0]];

                gol.setAnimation(false);
                gol.initGrid(myGrid);
                gol.nextStep();

                expect(gol.getGridContent()).to.deep.equal(myGrid);
            });

            it('square should remain square', function() {
                var blockSize = 3;
                var golElm = $('#gol');
                var gol = new Gol({
                    elm: golElm.get(0),
                    blockSize: blockSize,
                    width: blockSize * 3,
                    height: blockSize * 3
                }); // 3x3 grid

                var myGrid = [[0, 0, 0],
                              [0, 1, 1],
                              [0, 1, 1]];

                gol.setAnimation(false);
                gol.initGrid(myGrid);
                gol.nextStep();

                console.log(gol.getGridContent(), myGrid);
                expect(gol.getGridContent()).to.deep.equal(myGrid);
            });

            it('toad should iterate once', function() {
                var blockSize = 3;
                var golElm = $('#gol');
                var gol = new Gol({
                    elm: golElm.get(0),
                    blockSize: blockSize,
                    width: blockSize * 4,
                    height: blockSize * 4
                }); // 4x4 grid

                var myGrid = [[0, 0, 0, 0],
                              [0, 1, 1, 1],
                              [1, 1, 1, 0],
                              [0, 0, 0, 0]];

                gol.setAnimation(false);
                gol.initGrid(myGrid);
                gol.nextStep();

                console.log(gol.getGridContent(), myGrid);
                expect(gol.getGridContent()).to.deep.equal([[0, 0, 1, 0],
                                                            [1, 0, 0, 1],
                                                            [1, 0, 0, 1],
                                                            [0, 1, 0, 0]]);
            });
        });
    });
})();

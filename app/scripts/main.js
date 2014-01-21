'use strict';

var golElm = $('#game-of-life');
golElm.parent().height(window.innerHeight);
var headerGol = new Gol(golElm.get(0), golElm.parent().width(), golElm.parent().height());
headerGol.addCellsOnHover();

window.addEventListener('resize', function() {
    if (headerGol) {
        headerGol.resize(golElm.parent().width(), golElm.parent().height());
    }
});
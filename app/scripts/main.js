'use strict';

(function() {
    var golElm, headerGol, headerHeight, headerMinHeight, blockSize = 8;

    golElm = $('#game-of-life');

    headerHeight = 470;

/*    headerMinHeight = parseInt(golElm.parent().css('min-height'), 10);
    if (headerMinHeight > $(window).height()) {
        headerHeight = headerMinHeight;
    } else {
        headerHeight = $(window).height();
    }*/

    golElm.parent().height(headerHeight);

    headerGol = new Gol({
        elm: golElm.get(0),
        blockSize: blockSize,
        width: $(window).width(),
        height: headerHeight
    });
    headerGol.addCellsOnHover();

    window.addEventListener('resize', function() {
        if (headerGol) {
            /*if (headerMinHeight > $(window).height()) {
                headerHeight = headerMinHeight;
            } else {
                headerHeight = $(window).height();
            }*/

            golElm.parent().height(headerHeight);
            headerGol.resize($(window).width(), headerHeight);
        }
    });
}());
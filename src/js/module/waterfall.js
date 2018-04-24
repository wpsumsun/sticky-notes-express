// 瀑布流布局
// var $ = require('../library/jquery.min')
var waterFull = (function() {
    var $ct
    var $items
    function render($c) {
        $ct = $c
        $items = $ct.children()

        var nodeWidth = $items.outerWidth(true)
        var cloumnsNum = $(window).width()/nodeWidth
        var cloumnsHeight = []

        for(var i =0;i<cloumnsNum;i++) {
            cloumnsHeight.push(0)
        }

        $items.each(function(){
            var current = $(this)
            var minHeight = cloumnsHeight[0]
            var index = 0;
            for(var i=0;i<cloumnsHeight.length;i++) {
                if(cloumnsHeight[i] < minHeight) {
                    index = i
                    minHeight = cloumnsHeight[i]
                }
            }

            current.css({
                left: nodeWidth*index,
                top: minHeight
            })

            cloumnsHeight[index] = current.outerHeight(true) + minHeight

        })

    }

    $(window).on('resize',function() {
        render($ct)
    })

    return {
        init: render
    }
})()

module.exports = waterFull
// 发布订阅模式

var eventCenter = (function() {
    var events = {}
    
    function on(evt, handle) {
        events[evt] = events[evt] || []
        events[evt].push({ handle })
    }

    function fire(evt, args) {
        if(!events[evt]) { return }
        events[evt].forEach(event => {
            event.handle(args)
        })
    }

    return {
        on,
        fire,
    }

})()

module.exports = eventCenter
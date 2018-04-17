var $ = require('../library/jquery.min.js')
require('../../less/toast.less')

function toast(msg, time) {
    this.msg = msg
    this.delayTime = time || 1000;
    this.createToast()
    this.showToast()
}

toast.prototype = {
    createToast: function() {
        var tmp = `<div class='toast'>${this.msg}</div>`
        this.$toast = $(tmp) 
        $('body').append(this.$toast)
    },
    showToast: function() {
        this.$toast.fadeIn(300, ()=>{
            setTimeout(()=>{
                this.$toast.fadeOut(300, ()=>{
                    this.$toast.remove()
                })
            },this.delayTime)
        })
    },
}

function Toast(msg, time) {
    return new toast(msg, time)
}

module.exports.Toast = Toast
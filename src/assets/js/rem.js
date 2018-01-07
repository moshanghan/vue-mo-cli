(function (doc, win) {
    // 分辨率Resolution适配
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };

    // Abort if browser does not support addEventListener
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    win.addEventListener('pageshow', recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

!function(t) {
    var e = {
        mode: "horizontal",
        slideSelector: "",
        infiniteLoop: !0,
        hideControlOnEnd: !1,
        speed: 500,
        easing: null,
        slideMargin: 0,
        startSlide: 0,
        randomStart: !1,
        captions: !1,
        ticker: !1,
        tickerHover: !1,
        adaptiveHeight: !1,
        adaptiveHeightSpeed: 500,
        video: !1,
        useCSS: !0,
        preloadImages: "visible",
        responsive: !0,
        slideZIndex: 50,
        wrapperClass: "bx-wrapper",
        touchEnabled: !0,
        swipeThreshold: 50,
        oneToOneTouch: !0,
        preventDefaultSwipeX: !0,
        preventDefaultSwipeY: !1,
        ariaLive: !0,
        ariaHidden: !0,
        keyboardEnabled: !1,
        pager: !0,
        pagerType: "full",
        pagerShortSeparator: " / ",
        pagerSelector: null,
        buildPager: null,
        pagerCustom: null,
        controls: !0,
        nextText: "Next",
        prevText: "Prev",
        nextSelector: null,
        prevSelector: null,
        autoControls: !1,
        startText: "Start",
        stopText: "Stop",
        autoControlsCombine: !1,
        autoControlsSelector: null,
        auto: !1,
        pause: 4e3,
        autoStart: !0,
        autoDirection: "next",
        stopAutoOnClick: !1,
        autoHover: !1,
        autoDelay: 0,
        autoSlideForOnePage: !1,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 0,
        slideWidth: 0,
        shrinkItems: !1,
        onSliderLoad: function() {
            return !0
        },
        onSlideBefore: function() {
            return !0
        },
        onSlideAfter: function() {
            return !0
        },
        onSlideNext: function() {
            return !0
        },
        onSlidePrev: function() {
            return !0
        },
        onSliderResize: function() {
            return !0
        },
        onAutoChange: function() {
            return !0
        }
    };
    t.fn.bxSlider = function(n) {
        if (0 === this.length)
            return this;
        if (this.length > 1)
            return this.each((function() {
                t(this).bxSlider(n)
            }
            )),
            this;
        var o = {}
          , s = this
          , a = t(window).width()
          , r = t(window).height();
        if (!t(s).data("bxSlider")) {
            var l = function() {
                t(s).data("bxSlider") || (o.settings = t.extend({}, e, n),
                o.settings.slideWidth = parseInt(o.settings.slideWidth),
                o.children = s.children(o.settings.slideSelector),
                o.children.length < o.settings.minSlides && (o.settings.minSlides = o.children.length),
                o.children.length < o.settings.maxSlides && (o.settings.maxSlides = o.children.length),
                o.settings.randomStart && (o.settings.startSlide = Math.floor(Math.random() * o.children.length)),
                o.active = {
                    index: o.settings.startSlide
                },
                o.carousel = o.settings.minSlides > 1 || o.settings.maxSlides > 1,
                o.carousel && (o.settings.preloadImages = "all"),
                o.minThreshold = o.settings.minSlides * o.settings.slideWidth + (o.settings.minSlides - 1) * o.settings.slideMargin,
                o.maxThreshold = o.settings.maxSlides * o.settings.slideWidth + (o.settings.maxSlides - 1) * o.settings.slideMargin,
                o.working = !1,
                o.controls = {},
                o.interval = null,
                o.animProp = "vertical" === o.settings.mode ? "top" : "left",
                o.usingCSS = o.settings.useCSS && "fade" !== o.settings.mode && function() {
                    for (var t = document.createElement("div"), e = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"], n = 0; n < e.length; n++)
                        if (void 0 !== t.style[e[n]])
                            return o.cssPrefix = e[n].replace("Perspective", "").toLowerCase(),
                            o.animProp = "-" + o.cssPrefix + "-transform",
                            !0;
                    return !1
                }(),
                "vertical" === o.settings.mode && (o.settings.maxSlides = o.settings.minSlides),
                s.data("origStyle", s.attr("style")),
                s.children(o.settings.slideSelector).each((function() {
                    t(this).data("origStyle", t(this).attr("style"))
                }
                )),
                c())
            }
              , c = function() {
                var e = o.children.eq(o.settings.startSlide);
                s.wrap('<div class="' + o.settings.wrapperClass + '"><div class="bx-viewport"></div></div>'),
                o.viewport = s.parent(),
                o.settings.ariaLive && !o.settings.ticker && o.viewport.attr("aria-live", "polite"),
                o.loader = t('<div class="bx-loading" />'),
                o.viewport.prepend(o.loader),
                s.css({
                    width: "horizontal" === o.settings.mode ? 1e3 * o.children.length + 215 + "%" : "auto",
                    position: "relative"
                }),
                o.usingCSS && o.settings.easing ? s.css("-" + o.cssPrefix + "-transition-timing-function", o.settings.easing) : o.settings.easing || (o.settings.easing = "swing"),
                o.viewport.css({
                    width: "100%",
                    overflow: "hidden",
                    position: "relative"
                }),
                o.viewport.parent().css({
                    maxWidth: h()
                }),
                o.children.css({
                    float: "horizontal" === o.settings.mode ? "left" : "none",
                    listStyle: "none",
                    position: "relative"
                }),
                o.children.css("width", f()),
                "horizontal" === o.settings.mode && o.settings.slideMargin > 0 && o.children.css("marginRight", o.settings.slideMargin),
                "vertical" === o.settings.mode && o.settings.slideMargin > 0 && o.children.css("marginBottom", o.settings.slideMargin),
                "fade" === o.settings.mode && (o.children.css({
                    position: "absolute",
                    zIndex: 0,
                    display: "none"
                }),
                o.children.eq(o.settings.startSlide).css({
                    zIndex: o.settings.slideZIndex,
                    display: "block"
                })),
                o.controls.el = t('<div class="bx-controls" />'),
                o.settings.captions && C(),
                o.active.last = o.settings.startSlide === m() - 1,
                o.settings.video && s.fitVids(),
                "none" === o.settings.preloadImages ? e = null : ("all" === o.settings.preloadImages || o.settings.ticker) && (e = o.children),
                o.settings.ticker ? o.settings.pager = !1 : (o.settings.controls && S(),
                o.settings.auto && o.settings.autoControls && $(),
                o.settings.pager && w(),
                (o.settings.controls || o.settings.autoControls || o.settings.pager) && o.viewport.after(o.controls.el)),
                null === e ? u() : d(e, u)
            }
              , d = function(e, n) {
                var i = e.find('img:not([src=""]), iframe').length
                  , o = 0;
                0 !== i ? e.find('img:not([src=""]), iframe').each((function() {
                    t(this).one("load error", (function() {
                        ++o === i && n()
                    }
                    )).each((function() {
                        (this.complete || "" == this.src) && t(this).trigger("load")
                    }
                    ))
                }
                )) : n()
            }
              , u = function() {
                if (o.settings.infiniteLoop && "fade" !== o.settings.mode && !o.settings.ticker) {
                    var e = "vertical" === o.settings.mode ? o.settings.minSlides : o.settings.maxSlides
                      , n = o.children.slice(0, e).clone(!0).addClass("bx-clone")
                      , i = o.children.slice(-e).clone(!0).addClass("bx-clone");
                    o.settings.ariaHidden && (n.attr("aria-hidden", !0),
                    i.attr("aria-hidden", !0)),
                    s.append(n).prepend(i)
                }
                o.loader.remove(),
                b(),
                "vertical" === o.settings.mode && (o.settings.adaptiveHeight = !0),
                o.viewport.height(p()),
                s.redrawSlider(),
                o.settings.onSliderLoad.call(s, o.active.index),
                o.initialized = !0,
                o.settings.responsive && t(window).on("resize", _),
                o.settings.auto && o.settings.autoStart && (m() > 1 || o.settings.autoSlideForOnePage) && D(),
                o.settings.ticker && H(),
                o.settings.pager && L(o.settings.startSlide),
                o.settings.controls && z(),
                o.settings.touchEnabled && !o.settings.ticker && B(),
                o.settings.keyboardEnabled && !o.settings.ticker && t(document).keydown(j)
            }
              , p = function() {
                var e = 0
                  , n = t();
                if ("vertical" === o.settings.mode || o.settings.adaptiveHeight)
                    if (o.carousel) {
                        var s = 1 === o.settings.moveSlides ? o.active.index : o.active.index * v();
                        for (n = o.children.eq(s),
                        i = 1; i <= o.settings.maxSlides - 1; i++)
                            n = s + i >= o.children.length ? n.add(o.children.eq(i - 1)) : n.add(o.children.eq(s + i))
                    } else
                        n = o.children.eq(o.active.index);
                else
                    n = o.children;
                return "vertical" === o.settings.mode ? (n.each((function(n) {
                    e += t(this).outerHeight()
                }
                )),
                o.settings.slideMargin > 0 && (e += o.settings.slideMargin * (o.settings.minSlides - 1))) : e = Math.max.apply(Math, n.map((function() {
                    return t(this).outerHeight(!1)
                }
                )).get()),
                "border-box" === o.viewport.css("box-sizing") ? e += parseFloat(o.viewport.css("padding-top")) + parseFloat(o.viewport.css("padding-bottom")) + parseFloat(o.viewport.css("border-top-width")) + parseFloat(o.viewport.css("border-bottom-width")) : "padding-box" === o.viewport.css("box-sizing") && (e += parseFloat(o.viewport.css("padding-top")) + parseFloat(o.viewport.css("padding-bottom"))),
                e
            }
              , h = function() {
                var t = "100%";
                return o.settings.slideWidth > 0 && (t = "horizontal" === o.settings.mode ? o.settings.maxSlides * o.settings.slideWidth + (o.settings.maxSlides - 1) * o.settings.slideMargin : o.settings.slideWidth),
                t
            }
              , f = function() {
                var t = o.settings.slideWidth
                  , e = o.viewport.width();
                if (0 === o.settings.slideWidth || o.settings.slideWidth > e && !o.carousel || "vertical" === o.settings.mode)
                    t = e;
                else if (o.settings.maxSlides > 1 && "horizontal" === o.settings.mode) {
                    if (e > o.maxThreshold)
                        return t;
                    e < o.minThreshold ? t = (e - o.settings.slideMargin * (o.settings.minSlides - 1)) / o.settings.minSlides : o.settings.shrinkItems && (t = Math.floor((e + o.settings.slideMargin) / Math.ceil((e + o.settings.slideMargin) / (t + o.settings.slideMargin)) - o.settings.slideMargin))
                }
                return t
            }
              , g = function() {
                var t = 1
                  , e = null;
                return "horizontal" === o.settings.mode && o.settings.slideWidth > 0 ? o.viewport.width() < o.minThreshold ? t = o.settings.minSlides : o.viewport.width() > o.maxThreshold ? t = o.settings.maxSlides : (e = o.children.first().width() + o.settings.slideMargin,
                t = Math.floor((o.viewport.width() + o.settings.slideMargin) / e) || 1) : "vertical" === o.settings.mode && (t = o.settings.minSlides),
                t
            }
              , m = function() {
                var t = 0
                  , e = 0
                  , n = 0;
                if (o.settings.moveSlides > 0) {
                    if (!o.settings.infiniteLoop) {
                        for (; e < o.children.length; )
                            ++t,
                            e = n + g(),
                            n += o.settings.moveSlides <= g() ? o.settings.moveSlides : g();
                        return n
                    }
                    t = Math.ceil(o.children.length / v())
                } else
                    t = Math.ceil(o.children.length / g());
                return t
            }
              , v = function() {
                return o.settings.moveSlides > 0 && o.settings.moveSlides <= g() ? o.settings.moveSlides : g()
            }
              , b = function() {
                var t, e, n;
                o.children.length > o.settings.maxSlides && o.active.last && !o.settings.infiniteLoop ? "horizontal" === o.settings.mode ? (t = (e = o.children.last()).position(),
                y(-(t.left - (o.viewport.width() - e.outerWidth())), "reset", 0)) : "vertical" === o.settings.mode && (n = o.children.length - o.settings.minSlides,
                t = o.children.eq(n).position(),
                y(-t.top, "reset", 0)) : (t = o.children.eq(o.active.index * v()).position(),
                o.active.index === m() - 1 && (o.active.last = !0),
                void 0 !== t && ("horizontal" === o.settings.mode ? y(-t.left, "reset", 0) : "vertical" === o.settings.mode && y(-t.top, "reset", 0)))
            }
              , y = function(e, n, i, a) {
                var r, l;
                o.usingCSS ? (l = "vertical" === o.settings.mode ? "translate3d(0, " + e + "px, 0)" : "translate3d(" + e + "px, 0, 0)",
                s.css("-" + o.cssPrefix + "-transition-duration", i / 1e3 + "s"),
                "slide" === n ? (s.css(o.animProp, l),
                0 !== i ? s.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", (function(e) {
                    t(e.target).is(s) && (s.off("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),
                    I())
                }
                )) : I()) : "reset" === n ? s.css(o.animProp, l) : "ticker" === n && (s.css("-" + o.cssPrefix + "-transition-timing-function", "linear"),
                s.css(o.animProp, l),
                0 !== i ? s.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", (function(e) {
                    t(e.target).is(s) && (s.off("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),
                    y(a.resetValue, "reset", 0),
                    R())
                }
                )) : (y(a.resetValue, "reset", 0),
                R()))) : ((r = {})[o.animProp] = e,
                "slide" === n ? s.animate(r, i, o.settings.easing, (function() {
                    I()
                }
                )) : "reset" === n ? s.css(o.animProp, e) : "ticker" === n && s.animate(r, i, "linear", (function() {
                    y(a.resetValue, "reset", 0),
                    R()
                }
                )))
            }
              , x = function() {
                for (var e = "", n = "", i = m(), s = 0; s < i; s++)
                    n = "",
                    o.settings.buildPager && t.isFunction(o.settings.buildPager) || o.settings.pagerCustom ? (n = o.settings.buildPager(s),
                    o.pagerEl.addClass("bx-custom-pager")) : (n = s + 1,
                    o.pagerEl.addClass("bx-default-pager")),
                    e += '<div class="bx-pager-item"><a href="" data-slide-index="' + s + '" class="bx-pager-link">' + n + "</a></div>";
                o.pagerEl.html(e)
            }
              , w = function() {
                o.settings.pagerCustom ? o.pagerEl = t(o.settings.pagerCustom) : (o.pagerEl = t('<div class="bx-pager" />'),
                o.settings.pagerSelector ? t(o.settings.pagerSelector).html(o.pagerEl) : o.controls.el.addClass("bx-has-pager").append(o.pagerEl),
                x()),
                o.pagerEl.on("click touchend", "a", M)
            }
              , S = function() {
                o.controls.next = t('<a class="bx-next" href="">' + o.settings.nextText + "</a>"),
                o.controls.prev = t('<a class="bx-prev" href="">' + o.settings.prevText + "</a>"),
                o.controls.next.on("click touchend", T),
                o.controls.prev.on("click touchend", P),
                o.settings.nextSelector && t(o.settings.nextSelector).append(o.controls.next),
                o.settings.prevSelector && t(o.settings.prevSelector).append(o.controls.prev),
                o.settings.nextSelector || o.settings.prevSelector || (o.controls.directionEl = t('<div class="bx-controls-direction" />'),
                o.controls.directionEl.append(o.controls.prev).append(o.controls.next),
                o.controls.el.addClass("bx-has-controls-direction").append(o.controls.directionEl))
            }
              , $ = function() {
                o.controls.start = t('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + o.settings.startText + "</a></div>"),
                o.controls.stop = t('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + o.settings.stopText + "</a></div>"),
                o.controls.autoEl = t('<div class="bx-controls-auto" />'),
                o.controls.autoEl.on("click", ".bx-start", E),
                o.controls.autoEl.on("click", ".bx-stop", k),
                o.settings.autoControlsCombine ? o.controls.autoEl.append(o.controls.start) : o.controls.autoEl.append(o.controls.start).append(o.controls.stop),
                o.settings.autoControlsSelector ? t(o.settings.autoControlsSelector).html(o.controls.autoEl) : o.controls.el.addClass("bx-has-controls-auto").append(o.controls.autoEl),
                A(o.settings.autoStart ? "stop" : "start")
            }
              , C = function() {
                o.children.each((function(e) {
                    var n = t(this).find("img:first").attr("title");
                    void 0 !== n && ("" + n).length && t(this).append('<div class="bx-caption"><span>' + n + "</span></div>")
                }
                ))
            }
              , T = function(t) {
                t.preventDefault(),
                o.controls.el.hasClass("disabled") || (o.settings.auto && o.settings.stopAutoOnClick && s.stopAuto(),
                s.goToNextSlide())
            }
              , P = function(t) {
                t.preventDefault(),
                o.controls.el.hasClass("disabled") || (o.settings.auto && o.settings.stopAutoOnClick && s.stopAuto(),
                s.goToPrevSlide())
            }
              , E = function(t) {
                s.startAuto(),
                t.preventDefault()
            }
              , k = function(t) {
                s.stopAuto(),
                t.preventDefault()
            }
              , M = function(e) {
                var n, i;
                e.preventDefault(),
                o.controls.el.hasClass("disabled") || (o.settings.auto && o.settings.stopAutoOnClick && s.stopAuto(),
                void 0 !== (n = t(e.currentTarget)).attr("data-slide-index") && (i = parseInt(n.attr("data-slide-index"))) !== o.active.index && s.goToSlide(i))
            }
              , L = function(e) {
                var n = o.children.length;
                if ("short" === o.settings.pagerType)
                    return o.settings.maxSlides > 1 && (n = Math.ceil(o.children.length / o.settings.maxSlides)),
                    void o.pagerEl.html("0" + (e + 1) + "<span>" + o.settings.pagerShortSeparator + " 0" + n + "</span>");
                o.pagerEl.find("a").removeClass("active"),
                o.pagerEl.each((function(n, i) {
                    t(i).find("a").eq(e).addClass("active")
                }
                ))
            }
              , I = function() {
                if (o.settings.infiniteLoop) {
                    var t = "";
                    0 === o.active.index ? t = o.children.eq(0).position() : o.active.index === m() - 1 && o.carousel ? t = o.children.eq((m() - 1) * v()).position() : o.active.index === o.children.length - 1 && (t = o.children.eq(o.children.length - 1).position()),
                    t && ("horizontal" === o.settings.mode ? y(-t.left, "reset", 0) : "vertical" === o.settings.mode && y(-t.top, "reset", 0))
                }
                o.working = !1,
                o.settings.onSlideAfter.call(s, o.children.eq(o.active.index), o.oldIndex, o.active.index)
            }
              , A = function(t) {
                o.settings.autoControlsCombine ? o.controls.autoEl.html(o.controls[t]) : (o.controls.autoEl.find("a").removeClass("active"),
                o.controls.autoEl.find("a:not(.bx-" + t + ")").addClass("active"))
            }
              , z = function() {
                1 === m() ? (o.controls.prev.addClass("disabled"),
                o.controls.next.addClass("disabled")) : !o.settings.infiniteLoop && o.settings.hideControlOnEnd && (0 === o.active.index ? (o.controls.prev.addClass("disabled"),
                o.controls.next.removeClass("disabled")) : o.active.index === m() - 1 ? (o.controls.next.addClass("disabled"),
                o.controls.prev.removeClass("disabled")) : (o.controls.prev.removeClass("disabled"),
                o.controls.next.removeClass("disabled")))
            }
              , F = function() {
                s.startAuto()
            }
              , O = function() {
                s.stopAuto()
            }
              , D = function() {
                o.settings.autoDelay > 0 ? setTimeout(s.startAuto, o.settings.autoDelay) : (s.startAuto(),
                t(window).focus(F).blur(O)),
                o.settings.autoHover && s.hover((function() {
                    o.interval && (s.stopAuto(!0),
                    o.autoPaused = !0)
                }
                ), (function() {
                    o.autoPaused && (s.startAuto(!0),
                    o.autoPaused = null)
                }
                ))
            }
              , H = function() {
                var e, n, i, a, r, l, c, d, u = 0;
                "next" === o.settings.autoDirection ? s.append(o.children.clone().addClass("bx-clone")) : (s.prepend(o.children.clone().addClass("bx-clone")),
                e = o.children.first().position(),
                u = "horizontal" === o.settings.mode ? -e.left : -e.top),
                y(u, "reset", 0),
                o.settings.pager = !1,
                o.settings.controls = !1,
                o.settings.autoControls = !1,
                o.settings.tickerHover && (o.usingCSS ? (a = "horizontal" === o.settings.mode ? 4 : 5,
                o.viewport.hover((function() {
                    n = s.css("-" + o.cssPrefix + "-transform"),
                    i = parseFloat(n.split(",")[a]),
                    y(i, "reset", 0)
                }
                ), (function() {
                    d = 0,
                    o.children.each((function(e) {
                        d += "horizontal" === o.settings.mode ? t(this).outerWidth(!0) : t(this).outerHeight(!0)
                    }
                    )),
                    r = o.settings.speed / d,
                    l = "horizontal" === o.settings.mode ? "left" : "top",
                    c = r * (d - Math.abs(parseInt(i))),
                    R(c)
                }
                ))) : o.viewport.hover((function() {
                    s.stop()
                }
                ), (function() {
                    d = 0,
                    o.children.each((function(e) {
                        d += "horizontal" === o.settings.mode ? t(this).outerWidth(!0) : t(this).outerHeight(!0)
                    }
                    )),
                    r = o.settings.speed / d,
                    l = "horizontal" === o.settings.mode ? "left" : "top",
                    c = r * (d - Math.abs(parseInt(s.css(l)))),
                    R(c)
                }
                ))),
                R()
            }
              , R = function(t) {
                var e, n, i = t || o.settings.speed, a = {
                    left: 0,
                    top: 0
                }, r = {
                    left: 0,
                    top: 0
                };
                "next" === o.settings.autoDirection ? a = s.find(".bx-clone").first().position() : r = o.children.first().position(),
                e = "horizontal" === o.settings.mode ? -a.left : -a.top,
                n = "horizontal" === o.settings.mode ? -r.left : -r.top,
                y(e, "ticker", i, {
                    resetValue: n
                })
            }
              , q = function(e) {
                var n = t(window)
                  , i = {
                    top: n.scrollTop(),
                    left: n.scrollLeft()
                }
                  , o = e.offset();
                return i.right = i.left + n.width(),
                i.bottom = i.top + n.height(),
                o.right = o.left + e.outerWidth(),
                o.bottom = o.top + e.outerHeight(),
                !(i.right < o.left || i.left > o.right || i.bottom < o.top || i.top > o.bottom)
            }
              , j = function(t) {
                var e = document.activeElement.tagName.toLowerCase();
                if (null == new RegExp(e,["i"]).exec("input|textarea") && q(s)) {
                    if (39 === t.keyCode)
                        return T(t),
                        !1;
                    if (37 === t.keyCode)
                        return P(t),
                        !1
                }
            }
              , B = function() {
                o.touch = {
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    }
                },
                o.viewport.on("touchstart MSPointerDown pointerdown", W),
                o.viewport.on("click", ".bxslider a", (function(t) {
                    o.viewport.hasClass("click-disabled") && (t.preventDefault(),
                    o.viewport.removeClass("click-disabled"))
                }
                ))
            }
              , W = function(t) {
                if ("touchstart" === t.type || 0 === t.button)
                    if (t.preventDefault(),
                    o.controls.el.addClass("disabled"),
                    o.working)
                        o.controls.el.removeClass("disabled");
                    else {
                        o.touch.originalPos = s.position();
                        var e = t.originalEvent
                          , n = void 0 !== e.changedTouches ? e.changedTouches : [e];
                        if ("function" == typeof PointerEvent && void 0 === e.pointerId)
                            return;
                        o.touch.start.x = n[0].pageX,
                        o.touch.start.y = n[0].pageY,
                        o.viewport.get(0).setPointerCapture && (o.pointerId = e.pointerId,
                        o.viewport.get(0).setPointerCapture(o.pointerId)),
                        o.originalClickTarget = e.originalTarget || e.target,
                        o.originalClickButton = e.button,
                        o.originalClickButtons = e.buttons,
                        o.originalEventType = e.type,
                        o.hasMove = !1,
                        o.viewport.on("touchmove MSPointerMove pointermove", X),
                        o.viewport.on("touchend MSPointerUp pointerup", N),
                        o.viewport.on("MSPointerCancel pointercancel", Y)
                    }
            }
              , Y = function(t) {
                t.preventDefault(),
                y(o.touch.originalPos.left, "reset", 0),
                o.controls.el.removeClass("disabled"),
                o.viewport.off("MSPointerCancel pointercancel", Y),
                o.viewport.off("touchmove MSPointerMove pointermove", X),
                o.viewport.off("touchend MSPointerUp pointerup", N),
                o.viewport.get(0).releasePointerCapture && o.viewport.get(0).releasePointerCapture(o.pointerId)
            }
              , X = function(t) {
                var e = t.originalEvent
                  , n = void 0 !== e.changedTouches ? e.changedTouches : [e]
                  , i = Math.abs(n[0].pageX - o.touch.start.x)
                  , s = Math.abs(n[0].pageY - o.touch.start.y)
                  , a = 0
                  , r = 0;
                o.hasMove = !0,
                (3 * i > s && o.settings.preventDefaultSwipeX || 3 * s > i && o.settings.preventDefaultSwipeY) && t.preventDefault(),
                "touchmove" !== t.type && t.preventDefault(),
                "fade" !== o.settings.mode && o.settings.oneToOneTouch && ("horizontal" === o.settings.mode ? (r = n[0].pageX - o.touch.start.x,
                a = o.touch.originalPos.left + r) : (r = n[0].pageY - o.touch.start.y,
                a = o.touch.originalPos.top + r),
                y(a, "reset", 0))
            }
              , N = function(e) {
                e.preventDefault(),
                o.viewport.off("touchmove MSPointerMove pointermove", X),
                o.controls.el.removeClass("disabled");
                var n = e.originalEvent
                  , i = void 0 !== n.changedTouches ? n.changedTouches : [n]
                  , a = 0
                  , r = 0;
                o.touch.end.x = i[0].pageX,
                o.touch.end.y = i[0].pageY,
                "fade" === o.settings.mode ? (r = Math.abs(o.touch.start.x - o.touch.end.x)) >= o.settings.swipeThreshold && (o.touch.start.x > o.touch.end.x ? s.goToNextSlide() : s.goToPrevSlide(),
                s.stopAuto()) : ("horizontal" === o.settings.mode ? (r = o.touch.end.x - o.touch.start.x,
                a = o.touch.originalPos.left) : (r = o.touch.end.y - o.touch.start.y,
                a = o.touch.originalPos.top),
                !o.settings.infiniteLoop && (0 === o.active.index && r > 0 || o.active.last && r < 0) ? y(a, "reset", 200) : Math.abs(r) >= o.settings.swipeThreshold ? (r < 0 ? s.goToNextSlide() : s.goToPrevSlide(),
                s.stopAuto()) : y(a, "reset", 200)),
                o.viewport.off("touchend MSPointerUp pointerup", N),
                o.viewport.get(0).releasePointerCapture && o.viewport.get(0).releasePointerCapture(o.pointerId),
                !1 !== o.hasMove || 0 !== o.originalClickButton && "touchstart" !== o.originalEventType || t(o.originalClickTarget).trigger({
                    type: "click",
                    button: o.originalClickButton,
                    buttons: o.originalClickButtons
                })
            }
              , _ = function(e) {
                if (o.initialized)
                    if (o.working)
                        window.setTimeout(_, 10);
                    else {
                        var n = t(window).width()
                          , i = t(window).height();
                        a === n && r === i || (a = n,
                        r = i,
                        s.redrawSlider(),
                        o.settings.onSliderResize.call(s, o.active.index))
                    }
            }
              , Z = function(t) {
                var e = g();
                o.settings.ariaHidden && !o.settings.ticker && (o.children.attr("aria-hidden", "true"),
                o.children.slice(t, t + e).attr("aria-hidden", "false"))
            };
            return s.goToSlide = function(e, n) {
                var i, a, r, l, c = !0, d = 0, u = {
                    left: 0,
                    top: 0
                }, h = null;
                if (o.oldIndex = o.active.index,
                o.active.index = function(t) {
                    return t < 0 ? o.settings.infiniteLoop ? m() - 1 : o.active.index : t >= m() ? o.settings.infiniteLoop ? 0 : o.active.index : t
                }(e),
                !o.working && o.active.index !== o.oldIndex) {
                    if (o.working = !0,
                    void 0 !== (c = o.settings.onSlideBefore.call(s, o.children.eq(o.active.index), o.oldIndex, o.active.index)) && !c)
                        return o.active.index = o.oldIndex,
                        void (o.working = !1);
                    "next" === n ? o.settings.onSlideNext.call(s, o.children.eq(o.active.index), o.oldIndex, o.active.index) || (c = !1) : "prev" === n && (o.settings.onSlidePrev.call(s, o.children.eq(o.active.index), o.oldIndex, o.active.index) || (c = !1)),
                    o.active.last = o.active.index >= m() - 1,
                    (o.settings.pager || o.settings.pagerCustom) && L(o.active.index),
                    o.settings.controls && z(),
                    "fade" === o.settings.mode ? (o.settings.adaptiveHeight && o.viewport.height() !== p() && o.viewport.animate({
                        height: p()
                    }, o.settings.adaptiveHeightSpeed),
                    o.children.filter(":visible").fadeOut(o.settings.speed).css({
                        zIndex: 0
                    }),
                    o.children.eq(o.active.index).css("zIndex", o.settings.slideZIndex + 1).fadeIn(o.settings.speed, (function() {
                        t(this).css("zIndex", o.settings.slideZIndex),
                        I()
                    }
                    ))) : (o.settings.adaptiveHeight && o.viewport.height() !== p() && o.viewport.animate({
                        height: p()
                    }, o.settings.adaptiveHeightSpeed),
                    !o.settings.infiniteLoop && o.carousel && o.active.last ? "horizontal" === o.settings.mode ? (u = (h = o.children.eq(o.children.length - 1)).position(),
                    d = o.viewport.width() - h.outerWidth()) : (i = o.children.length - o.settings.minSlides,
                    u = o.children.eq(i).position()) : o.carousel && o.active.last && "prev" === n ? (a = 1 === o.settings.moveSlides ? o.settings.maxSlides - v() : (m() - 1) * v() - (o.children.length - o.settings.maxSlides),
                    u = (h = s.children(".bx-clone").eq(a)).position()) : "next" === n && 0 === o.active.index ? (u = s.find("> .bx-clone").eq(o.settings.maxSlides).position(),
                    o.active.last = !1) : e >= 0 && (l = e * parseInt(v()),
                    u = o.children.eq(l).position()),
                    void 0 !== u && (r = "horizontal" === o.settings.mode ? -(u.left - d) : -u.top,
                    y(r, "slide", o.settings.speed)),
                    o.working = !1),
                    o.settings.ariaHidden && Z(o.active.index * v())
                }
            }
            ,
            s.goToNextSlide = function() {
                if ((o.settings.infiniteLoop || !o.active.last) && !0 !== o.working) {
                    var t = parseInt(o.active.index) + 1;
                    s.goToSlide(t, "next")
                }
            }
            ,
            s.goToPrevSlide = function() {
                if ((o.settings.infiniteLoop || 0 !== o.active.index) && !0 !== o.working) {
                    var t = parseInt(o.active.index) - 1;
                    s.goToSlide(t, "prev")
                }
            }
            ,
            s.startAuto = function(t) {
                o.interval || (o.interval = setInterval((function() {
                    "next" === o.settings.autoDirection ? s.goToNextSlide() : s.goToPrevSlide()
                }
                ), o.settings.pause),
                o.settings.onAutoChange.call(s, !0),
                o.settings.autoControls && !0 !== t && A("stop"))
            }
            ,
            s.stopAuto = function(t) {
                o.autoPaused && (o.autoPaused = !1),
                o.interval && (clearInterval(o.interval),
                o.interval = null,
                o.settings.onAutoChange.call(s, !1),
                o.settings.autoControls && !0 !== t && A("start"))
            }
            ,
            s.getCurrentSlide = function() {
                return o.active.index
            }
            ,
            s.getCurrentSlideElement = function() {
                return o.children.eq(o.active.index)
            }
            ,
            s.getSlideElement = function(t) {
                return o.children.eq(t)
            }
            ,
            s.getSlideCount = function() {
                return o.children.length
            }
            ,
            s.isWorking = function() {
                return o.working
            }
            ,
            s.redrawSlider = function() {
                o.children.add(s.find(".bx-clone")).outerWidth(f()),
                o.viewport.css("height", p()),
                o.settings.ticker || b(),
                o.active.last && (o.active.index = m() - 1),
                o.active.index >= m() && (o.active.last = !0),
                o.settings.pager && !o.settings.pagerCustom && (x(),
                L(o.active.index)),
                o.settings.ariaHidden && Z(o.active.index * v())
            }
            ,
            s.destroySlider = function() {
                o.initialized && (o.initialized = !1,
                t(".bx-clone", this).remove(),
                o.children.each((function() {
                    void 0 !== t(this).data("origStyle") ? t(this).attr("style", t(this).data("origStyle")) : t(this).removeAttr("style")
                }
                )),
                void 0 !== t(this).data("origStyle") ? this.attr("style", t(this).data("origStyle")) : t(this).removeAttr("style"),
                t(this).unwrap().unwrap(),
                o.controls.el && o.controls.el.remove(),
                o.controls.next && o.controls.next.remove(),
                o.controls.prev && o.controls.prev.remove(),
                o.pagerEl && o.settings.controls && !o.settings.pagerCustom && o.pagerEl.remove(),
                t(".bx-caption", this).remove(),
                o.controls.autoEl && o.controls.autoEl.remove(),
                clearInterval(o.interval),
                o.settings.responsive && t(window).off("resize", _),
                o.settings.keyboardEnabled && t(document).off("keydown", j),
                t(this).removeData("bxSlider"),
                t(window).off("blur", O).off("focus", F))
            }
            ,
            s.reloadSlider = function(e) {
                void 0 !== e && (n = e),
                s.destroySlider(),
                l(),
                t(s).data("bxSlider", this)
            }
            ,
            l(),
            t(s).data("bxSlider", this),
            this
        }
    }
}(jQuery);
var ScrollReveal = function() {
    "use strict";
    var t = {
        delay: 0,
        distance: "0",
        duration: 600,
        easing: "cubic-bezier(0.5, 0, 0, 1)",
        interval: 0,
        opacity: 0,
        origin: "bottom",
        rotate: {
            x: 0,
            y: 0,
            z: 0
        },
        scale: 1,
        cleanup: !1,
        container: document.documentElement,
        desktop: !0,
        mobile: !0,
        reset: !1,
        useDelay: "always",
        viewFactor: 0,
        viewOffset: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        afterReset: function() {},
        afterReveal: function() {},
        beforeReset: function() {},
        beforeReveal: function() {}
    }
      , e = function() {
        document.documentElement.classList.add("sr"),
        document.body ? document.body.style.height = "100%" : document.addEventListener("DOMContentLoaded", (function() {
            document.body.style.height = "100%"
        }
        ))
    }
      , n = function() {
        return document.documentElement.classList.remove("sr"),
        {
            clean: function() {},
            destroy: function() {},
            reveal: function() {},
            sync: function() {},
            get noop() {
                return !0
            }
        }
    };
    function i(t) {
        return "object" == typeof window.Node ? t instanceof window.Node : null !== t && "object" == typeof t && "number" == typeof t.nodeType && "string" == typeof t.nodeName
    }
    function o(t, e) {
        if (void 0 === e && (e = document),
        t instanceof Array)
            return t.filter(i);
        if (i(t))
            return [t];
        if (n = t,
        o = Object.prototype.toString.call(n),
        "object" == typeof window.NodeList ? n instanceof window.NodeList : null !== n && "object" == typeof n && "number" == typeof n.length && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(o) && (0 === n.length || i(n[0])))
            return Array.prototype.slice.call(t);
        var n, o;
        if ("string" == typeof t)
            try {
                var s = e.querySelectorAll(t);
                return Array.prototype.slice.call(s)
            } catch (t) {
                return []
            }
        return []
    }
    function s(t) {
        return null !== t && t instanceof Object && (t.constructor === Object || "[object Object]" === Object.prototype.toString.call(t))
    }
    function a(t, e) {
        if (s(t))
            return Object.keys(t).forEach((function(n) {
                return e(t[n], n, t)
            }
            ));
        if (t instanceof Array)
            return t.forEach((function(n, i) {
                return e(n, i, t)
            }
            ));
        throw new TypeError("Expected either an array or object literal.")
    }
    function r(t) {
        for (var e = [], n = arguments.length - 1; 0 < n--; )
            e[n] = arguments[n + 1];
        if (this.constructor.debug && console) {
            var i = "%cScrollReveal: " + t;
            e.forEach((function(t) {
                return i += "\n â€” " + t
            }
            )),
            console.log(i, "color: #ea654b;")
        }
    }
    function l() {
        var t = this
          , e = {
            active: [],
            stale: []
        }
          , n = {
            active: [],
            stale: []
        }
          , i = {
            active: [],
            stale: []
        };
        try {
            a(o("[data-sr-id]"), (function(t) {
                var n = parseInt(t.getAttribute("data-sr-id"));
                e.active.push(n)
            }
            ))
        } catch (t) {
            throw t
        }
        a(this.store.elements, (function(t) {
            -1 === e.active.indexOf(t.id) && e.stale.push(t.id)
        }
        )),
        a(e.stale, (function(e) {
            return delete t.store.elements[e]
        }
        )),
        a(this.store.elements, (function(t) {
            -1 === i.active.indexOf(t.containerId) && i.active.push(t.containerId),
            t.hasOwnProperty("sequence") && -1 === n.active.indexOf(t.sequence.id) && n.active.push(t.sequence.id)
        }
        )),
        a(this.store.containers, (function(t) {
            -1 === i.active.indexOf(t.id) && i.stale.push(t.id)
        }
        )),
        a(i.stale, (function(e) {
            var n = t.store.containers[e].node;
            n.removeEventListener("scroll", t.delegate),
            n.removeEventListener("resize", t.delegate),
            delete t.store.containers[e]
        }
        )),
        a(this.store.sequences, (function(t) {
            -1 === n.active.indexOf(t.id) && n.stale.push(t.id)
        }
        )),
        a(n.stale, (function(e) {
            return delete t.store.sequences[e]
        }
        ))
    }
    function c(t) {
        if (t.constructor !== Array)
            throw new TypeError("Expected array.");
        if (16 === t.length)
            return t;
        if (6 !== t.length)
            throw new RangeError("Expected array with either 6 or 16 values.");
        var e = d();
        return e[0] = t[0],
        e[1] = t[1],
        e[4] = t[2],
        e[5] = t[3],
        e[12] = t[4],
        e[13] = t[5],
        e
    }
    function d() {
        for (var t = [], e = 0; e < 16; e++)
            e % 5 == 0 ? t.push(1) : t.push(0);
        return t
    }
    function u(t, e) {
        for (var n = c(t), i = c(e), o = [], s = 0; s < 4; s++)
            for (var a = [n[s], n[s + 4], n[s + 8], n[s + 12]], r = 0; r < 4; r++) {
                var l = 4 * r
                  , d = [i[l], i[l + 1], i[l + 2], i[l + 3]]
                  , u = a[0] * d[0] + a[1] * d[1] + a[2] * d[2] + a[3] * d[3];
                o[s + l] = u
            }
        return o
    }
    function p(t, e) {
        var n = d();
        return n[0] = t,
        n[5] = "number" == typeof e ? e : t,
        n
    }
    var h = function() {
        var t = {}
          , e = document.documentElement.style;
        function n(n, i) {
            if (void 0 === i && (i = e),
            n && "string" == typeof n) {
                if (t[n])
                    return t[n];
                if ("string" == typeof i[n])
                    return t[n] = n;
                if ("string" == typeof i["-webkit-" + n])
                    return t[n] = "-webkit-" + n;
                throw new RangeError('Unable to find "' + n + '" style property.')
            }
            throw new TypeError("Expected a string.")
        }
        return n.clearCache = function() {
            return t = {}
        }
        ,
        n
    }();
    function f(t, e) {
        e.split(";").forEach((function(e) {
            var n = e.split(":")
              , i = n[0]
              , o = n.slice(1);
            i && o && (t.style[i.trim()] = o.join(":"))
        }
        ))
    }
    function g(t) {
        var e, n = this;
        try {
            a(o(t), (function(t) {
                var i = t.getAttribute("data-sr-id");
                if (null !== i) {
                    e = !0;
                    var o = n.store.elements[i];
                    o.callbackTimer && window.clearTimeout(o.callbackTimer.clock),
                    f(o.node, o.styles.inline.generated),
                    t.removeAttribute("data-sr-id"),
                    delete n.store.elements[i]
                }
            }
            ))
        } catch (t) {
            return r.call(this, "Clean failed.", t.message)
        }
        if (e)
            try {
                l.call(this)
            } catch (t) {
                return r.call(this, "Clean failed.", t.message)
            }
    }
    function m(t) {
        for (var e = [], n = arguments.length - 1; 0 < n--; )
            e[n] = arguments[n + 1];
        if (s(t))
            return a(e, (function(e) {
                a(e, (function(e, n) {
                    s(e) ? (t[n] && s(t[n]) || (t[n] = {}),
                    m(t[n], e)) : t[n] = e
                }
                ))
            }
            )),
            t;
        throw new TypeError("Target must be an object literal.")
    }
    function v(t) {
        return void 0 === t && (t = navigator.userAgent),
        /Android|iPhone|iPad|iPod/i.test(t)
    }
    var b, y = (b = 0,
    function() {
        return b++
    }
    );
    function x() {
        var t = this;
        l.call(this),
        a(this.store.elements, (function(t) {
            var e = [t.styles.inline.generated];
            t.visible ? (e.push(t.styles.opacity.computed),
            e.push(t.styles.transform.generated.final),
            t.revealed = !0) : (e.push(t.styles.opacity.generated),
            e.push(t.styles.transform.generated.initial),
            t.revealed = !1),
            f(t.node, e.filter((function(t) {
                return "" !== t
            }
            )).join(" "))
        }
        )),
        a(this.store.containers, (function(e) {
            var n = e.node === document.documentElement ? window : e.node;
            n.addEventListener("scroll", t.delegate),
            n.addEventListener("resize", t.delegate)
        }
        )),
        this.delegate(),
        this.initTimeout = null
    }
    function w(t, e) {
        void 0 === e && (e = {});
        var n = e.pristine || this.pristine
          , i = "always" === t.config.useDelay || "onload" === t.config.useDelay && n || "once" === t.config.useDelay && !t.seen
          , o = t.visible && !t.revealed
          , s = !t.visible && t.revealed && t.config.reset;
        return e.reveal || o ? function(t, e) {
            var n = [t.styles.inline.generated, t.styles.opacity.computed, t.styles.transform.generated.final];
            e ? n.push(t.styles.transition.generated.delayed) : n.push(t.styles.transition.generated.instant),
            t.revealed = t.seen = !0,
            f(t.node, n.filter((function(t) {
                return "" !== t
            }
            )).join(" ")),
            S.call(this, t, e)
        }
        .call(this, t, i) : e.reset || s ? function(t) {
            var e = [t.styles.inline.generated, t.styles.opacity.generated, t.styles.transform.generated.initial, t.styles.transition.generated.instant];
            t.revealed = !1,
            f(t.node, e.filter((function(t) {
                return "" !== t
            }
            )).join(" ")),
            S.call(this, t)
        }
        .call(this, t) : void 0
    }
    function S(t, e) {
        var n = this
          , i = e ? t.config.duration + t.config.delay : t.config.duration
          , o = t.revealed ? t.config.beforeReveal : t.config.beforeReset
          , s = t.revealed ? t.config.afterReveal : t.config.afterReset
          , a = 0;
        t.callbackTimer && (a = Date.now() - t.callbackTimer.start,
        window.clearTimeout(t.callbackTimer.clock)),
        o(t.node),
        t.callbackTimer = {
            start: Date.now(),
            clock: window.setTimeout((function() {
                s(t.node),
                t.callbackTimer = null,
                t.revealed && !t.config.reset && t.config.cleanup && g.call(n, t.node)
            }
            ), i - a)
        }
    }
    function $(t, e) {
        if (void 0 === e && (e = this.pristine),
        !t.visible && t.revealed && t.config.reset)
            return w.call(this, t, {
                reset: !0
            });
        var n = this.store.sequences[t.sequence.id]
          , i = t.sequence.index;
        if (n) {
            var o = new T(n,"visible",this.store)
              , s = new T(n,"revealed",this.store);
            if (n.models = {
                visible: o,
                revealed: s
            },
            !s.body.length) {
                var a = n.members[o.body[0]]
                  , r = this.store.elements[a];
                if (r)
                    return P.call(this, n, o.body[0], -1, e),
                    P.call(this, n, o.body[0], 1, e),
                    w.call(this, r, {
                        reveal: !0,
                        pristine: e
                    })
            }
            if (!n.blocked.head && i === [].concat(s.head).pop() && i >= [].concat(o.body).shift())
                return P.call(this, n, i, -1, e),
                w.call(this, t, {
                    reveal: !0,
                    pristine: e
                });
            if (!n.blocked.foot && i === [].concat(s.foot).shift() && i <= [].concat(o.body).pop())
                return P.call(this, n, i, 1, e),
                w.call(this, t, {
                    reveal: !0,
                    pristine: e
                })
        }
    }
    function C(t) {
        var e = Math.abs(t);
        if (isNaN(e))
            throw new RangeError("Invalid sequence interval.");
        this.id = y(),
        this.interval = Math.max(e, 16),
        this.members = [],
        this.models = {},
        this.blocked = {
            head: !1,
            foot: !1
        }
    }
    function T(t, e, n) {
        var i = this;
        this.head = [],
        this.body = [],
        this.foot = [],
        a(t.members, (function(t, o) {
            var s = n.elements[t];
            s && s[e] && i.body.push(o)
        }
        )),
        this.body.length && a(t.members, (function(t, o) {
            var s = n.elements[t];
            s && !s[e] && (o < i.body[0] ? i.head.push(o) : i.foot.push(o))
        }
        ))
    }
    function P(t, e, n, i) {
        var o = this
          , s = ["head", null, "foot"][1 + n]
          , a = t.members[e + n]
          , r = this.store.elements[a];
        t.blocked[s] = !0,
        setTimeout((function() {
            t.blocked[s] = !1,
            r && $.call(o, r, i)
        }
        ), t.interval)
    }
    function E(e, n, i) {
        var s = this;
        void 0 === n && (n = {}),
        void 0 === i && (i = !1);
        var l, b = [], w = n.interval || t.interval;
        try {
            w && (l = new C(w));
            var S = o(e);
            if (!S.length)
                throw new Error("Invalid reveal target.");
            a(S.reduce((function(t, e) {
                var i = {}
                  , r = e.getAttribute("data-sr-id");
                r ? (m(i, s.store.elements[r]),
                f(i.node, i.styles.inline.computed)) : (i.id = y(),
                i.node = e,
                i.seen = !1,
                i.revealed = !1,
                i.visible = !1);
                var x = m({}, i.config || s.defaults, n);
                if (!x.mobile && v() || !x.desktop && !v())
                    return r && g.call(s, i),
                    t;
                var w, S = o(x.container)[0];
                if (!S)
                    throw new Error("Invalid container.");
                return S.contains(e) && (null === (w = function(t) {
                    for (var e = [], n = arguments.length - 1; 0 < n--; )
                        e[n] = arguments[n + 1];
                    var i = null;
                    return a(e, (function(e) {
                        a(e, (function(e) {
                            null === i && e.node === t && (i = e.id)
                        }
                        ))
                    }
                    )),
                    i
                }(S, b, s.store.containers)) && (w = y(),
                b.push({
                    id: w,
                    node: S
                })),
                i.config = x,
                i.containerId = w,
                i.styles = function(t) {
                    var e = window.getComputedStyle(t.node)
                      , n = e.position
                      , i = t.config
                      , o = {}
                      , s = (t.node.getAttribute("style") || "").match(/[\w-]+\s*:\s*[^;]+\s*/gi) || [];
                    o.computed = s ? s.map((function(t) {
                        return t.trim()
                    }
                    )).join("; ") + ";" : "",
                    o.generated = s.some((function(t) {
                        return t.match(/visibility\s?:\s?visible/i)
                    }
                    )) ? o.computed : s.concat(["visibility: visible"]).map((function(t) {
                        return t.trim()
                    }
                    )).join("; ") + ";";
                    var a, r, l, f, g, m, v, b, y, x, w, S, $, C = parseFloat(e.opacity), T = isNaN(parseFloat(i.opacity)) ? parseFloat(e.opacity) : parseFloat(i.opacity), P = {
                        computed: C !== T ? "opacity: " + C + ";" : "",
                        generated: C !== T ? "opacity: " + T + ";" : ""
                    }, E = [];
                    if (parseFloat(i.distance)) {
                        var k = "top" === i.origin || "bottom" === i.origin ? "Y" : "X"
                          , M = i.distance;
                        "top" !== i.origin && "left" !== i.origin || (M = /^-/.test(M) ? M.substr(1) : "-" + M);
                        var L = M.match(/(^-?\d+\.?\d?)|(em$|px$|%$)/g)
                          , I = L[0];
                        switch (L[1]) {
                        case "em":
                            M = parseInt(e.fontSize) * I;
                            break;
                        case "px":
                            M = I;
                            break;
                        case "%":
                            M = "Y" === k ? t.node.getBoundingClientRect().height * I / 100 : t.node.getBoundingClientRect().width * I / 100;
                            break;
                        default:
                            throw new RangeError("Unrecognized or missing distance unit.")
                        }
                        "Y" === k ? E.push((l = M,
                        (f = d())[13] = l,
                        f)) : E.push((a = M,
                        (r = d())[12] = a,
                        r))
                    }
                    i.rotate.x && E.push((g = i.rotate.x,
                    m = Math.PI / 180 * g,
                    (v = d())[5] = v[10] = Math.cos(m),
                    v[6] = v[9] = Math.sin(m),
                    v[9] *= -1,
                    v)),
                    i.rotate.y && E.push((b = i.rotate.y,
                    y = Math.PI / 180 * b,
                    (x = d())[0] = x[10] = Math.cos(y),
                    x[2] = x[8] = Math.sin(y),
                    x[2] *= -1,
                    x)),
                    i.rotate.z && E.push((w = i.rotate.z,
                    S = Math.PI / 180 * w,
                    ($ = d())[0] = $[5] = Math.cos(S),
                    $[1] = $[4] = Math.sin(S),
                    $[4] *= -1,
                    $)),
                    1 !== i.scale && (0 === i.scale ? E.push(p(2e-4)) : E.push(p(i.scale)));
                    var A = {};
                    if (E.length) {
                        A.property = h("transform"),
                        A.computed = {
                            raw: e[A.property],
                            matrix: function(t) {
                                if ("string" == typeof t) {
                                    var e = t.match(/matrix(3d)?\(([^)]+)\)/);
                                    if (e)
                                        return c(e[2].split(", ").map(parseFloat))
                                }
                                return d()
                            }(e[A.property])
                        },
                        E.unshift(A.computed.matrix);
                        var z = E.reduce(u);
                        A.generated = {
                            initial: A.property + ": matrix3d(" + z.join(", ") + ");",
                            final: A.property + ": matrix3d(" + A.computed.matrix.join(", ") + ");"
                        }
                    } else
                        A.generated = {
                            initial: "",
                            final: ""
                        };
                    var F = {};
                    if (P.generated || A.generated.initial) {
                        F.property = h("transition"),
                        F.computed = e[F.property],
                        F.fragments = [];
                        var O = i.delay
                          , D = i.duration
                          , H = i.easing;
                        P.generated && F.fragments.push({
                            delayed: "opacity " + D / 1e3 + "s " + H + " " + O / 1e3 + "s",
                            instant: "opacity " + D / 1e3 + "s " + H + " 0s"
                        }),
                        A.generated.initial && F.fragments.push({
                            delayed: A.property + " " + D / 1e3 + "s " + H + " " + O / 1e3 + "s",
                            instant: A.property + " " + D / 1e3 + "s " + H + " 0s"
                        }),
                        F.computed && !F.computed.match(/all 0s|none 0s/) && F.fragments.unshift({
                            delayed: F.computed,
                            instant: F.computed
                        });
                        var R = F.fragments.reduce((function(t, e, n) {
                            return t.delayed += 0 === n ? e.delayed : ", " + e.delayed,
                            t.instant += 0 === n ? e.instant : ", " + e.instant,
                            t
                        }
                        ), {
                            delayed: "",
                            instant: ""
                        });
                        F.generated = {
                            delayed: F.property + ": " + R.delayed + ";",
                            instant: F.property + ": " + R.instant + ";"
                        }
                    } else
                        F.generated = {
                            delayed: "",
                            instant: ""
                        };
                    return {
                        inline: o,
                        opacity: P,
                        position: n,
                        transform: A,
                        transition: F
                    }
                }(i),
                l && (i.sequence = {
                    id: l.id,
                    index: l.members.length
                },
                l.members.push(i.id)),
                t.push(i)),
                t
            }
            ), []), (function(t) {
                (s.store.elements[t.id] = t).node.setAttribute("data-sr-id", t.id)
            }
            ))
        } catch (e) {
            return r.call(this, "Reveal failed.", e.message)
        }
        a(b, (function(t) {
            s.store.containers[t.id] = {
                id: t.id,
                node: t.node
            }
        }
        )),
        l && (this.store.sequences[l.id] = l),
        !0 !== i && (this.store.history.push({
            target: e,
            options: n
        }),
        this.initTimeout && window.clearTimeout(this.initTimeout),
        this.initTimeout = window.setTimeout(x.bind(this), 0))
    }
    var k, M = Math.sign || function(t) {
        return (0 < t) - (t < 0) || +t
    }
    , L = (k = Date.now(),
    function(t) {
        var e = Date.now();
        16 < e - k ? t(k = e) : setTimeout((function() {
            return L(t)
        }
        ), 0)
    }
    ), I = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || L;
    function A(t, e) {
        for (var n = e ? t.node.clientHeight : t.node.offsetHeight, i = e ? t.node.clientWidth : t.node.offsetWidth, o = 0, s = 0, a = t.node; isNaN(a.offsetTop) || (o += a.offsetTop),
        isNaN(a.offsetLeft) || (s += a.offsetLeft),
        a = a.offsetParent; )
            ;
        return {
            bounds: {
                top: o,
                right: s + i,
                bottom: o + n,
                left: s
            },
            height: n,
            width: i
        }
    }
    function z(t, e) {
        var n = this;
        void 0 === t && (t = {
            type: "init"
        }),
        void 0 === e && (e = this.store.elements),
        I((function() {
            var i = "init" === t.type || "resize" === t.type;
            a(n.store.containers, (function(t) {
                i && (t.geometry = A.call(n, t, !0));
                var e = function(t) {
                    var e, n;
                    return n = t.node === document.documentElement ? (e = window.pageYOffset,
                    window.pageXOffset) : (e = t.node.scrollTop,
                    t.node.scrollLeft),
                    {
                        top: e,
                        left: n
                    }
                }
                .call(n, t);
                t.scroll && (t.direction = {
                    x: M(e.left - t.scroll.left),
                    y: M(e.top - t.scroll.top)
                }),
                t.scroll = e
            }
            )),
            a(e, (function(t) {
                (i || void 0 === t.geometry) && (t.geometry = A.call(n, t)),
                t.visible = function(t) {
                    void 0 === t && (t = {});
                    var e = this.store.containers[t.containerId];
                    if (e) {
                        var n = Math.max(0, Math.min(1, t.config.viewFactor))
                          , i = t.config.viewOffset
                          , o = t.geometry.bounds.top + t.geometry.height * n
                          , s = t.geometry.bounds.right - t.geometry.width * n
                          , a = t.geometry.bounds.bottom - t.geometry.height * n
                          , r = t.geometry.bounds.left + t.geometry.width * n
                          , l = e.geometry.bounds.top + e.scroll.top + i.top
                          , c = e.geometry.bounds.right + e.scroll.left - i.right
                          , d = e.geometry.bounds.bottom + e.scroll.top - i.bottom
                          , u = e.geometry.bounds.left + e.scroll.left + i.left;
                        return o < d && u < s && l < a && r < c || "fixed" === t.styles.position
                    }
                }
                .call(n, t)
            }
            )),
            a(e, (function(t) {
                t.sequence ? $.call(n, t) : w.call(n, t)
            }
            )),
            n.pristine = !1
        }
        ))
    }
    var F, O, D, H, R, q, j, B;
    function W(i) {
        var s;
        if (void 0 === i && (i = {}),
        void 0 === this || Object.getPrototypeOf(this) !== W.prototype)
            return new W(i);
        if (!W.isSupported())
            return r.call(this, "Instantiation failed.", "This browser is not supported."),
            n();
        try {
            s = m({}, q || t, i)
        } catch (i) {
            return r.call(this, "Invalid configuration.", i.message),
            n()
        }
        try {
            if (!o(s.container)[0])
                throw new Error("Invalid container.")
        } catch (i) {
            return r.call(this, i.message),
            n()
        }
        return !(q = s).mobile && v() || !q.desktop && !v() ? (r.call(this, "This device is disabled.", "desktop: " + q.desktop, "mobile: " + q.mobile),
        n()) : (e(),
        this.store = {
            containers: {},
            elements: {},
            history: [],
            sequences: {}
        },
        this.pristine = !0,
        F = F || z.bind(this),
        O = O || function() {
            var t = this;
            a(this.store.elements, (function(t) {
                f(t.node, t.styles.inline.generated),
                t.node.removeAttribute("data-sr-id")
            }
            )),
            a(this.store.containers, (function(e) {
                var n = e.node === document.documentElement ? window : e.node;
                n.removeEventListener("scroll", t.delegate),
                n.removeEventListener("resize", t.delegate)
            }
            )),
            this.store = {
                containers: {},
                elements: {},
                history: [],
                sequences: {}
            }
        }
        .bind(this),
        D = D || E.bind(this),
        H = H || g.bind(this),
        R = R || function() {
            var t = this;
            a(this.store.history, (function(e) {
                E.call(t, e.target, e.options, !0)
            }
            )),
            x.call(this)
        }
        .bind(this),
        Object.defineProperty(this, "delegate", {
            get: function() {
                return F
            }
        }),
        Object.defineProperty(this, "destroy", {
            get: function() {
                return O
            }
        }),
        Object.defineProperty(this, "reveal", {
            get: function() {
                return D
            }
        }),
        Object.defineProperty(this, "clean", {
            get: function() {
                return H
            }
        }),
        Object.defineProperty(this, "sync", {
            get: function() {
                return R
            }
        }),
        Object.defineProperty(this, "defaults", {
            get: function() {
                return q
            }
        }),
        Object.defineProperty(this, "version", {
            get: function() {
                return "4.0.9"
            }
        }),
        Object.defineProperty(this, "noop", {
            get: function() {
                return !1
            }
        }),
        B || (B = this))
    }
    return W.isSupported = function() {
        return ("transform"in (e = document.documentElement.style) || "WebkitTransform"in e) && ("transition"in (t = document.documentElement.style) || "WebkitTransition"in t);
        var t, e
    }
    ,
    Object.defineProperty(W, "debug", {
        get: function() {
            return j || !1
        },
        set: function(t) {
            return j = "boolean" == typeof t ? t : j
        }
    }),
    W(),
    W
}();
!function(t, e, n, i) {
    "use strict";
    function o(t, e) {
        var i, o, s = [], a = 0;
        t && t.isDefaultPrevented() || (t.preventDefault(),
        (o = (i = (e = t && t.data ? t.data.options : e || {}).$target || n(t.currentTarget)).attr("data-fancybox") || "") ? (a = (s = (s = e.selector ? n(e.selector) : t.data ? t.data.items : []).length ? s.filter('[data-fancybox="' + o + '"]') : n('[data-fancybox="' + o + '"]')).index(i)) < 0 && (a = 0) : s = [i],
        n.fancybox.open(s, e, a))
    }
    if (t.console = t.console || {
        info: function(t) {}
    },
    n) {
        if (n.fn.fancybox)
            return void console.info("fancyBox already initialized");
        var s = {
            loop: !1,
            gutter: 50,
            keyboard: !0,
            arrows: !0,
            infobar: !0,
            smallBtn: "auto",
            toolbar: "auto",
            buttons: ["zoom", "close"],
            idleTime: 3,
            protect: !1,
            modal: !1,
            image: {
                preload: !1
            },
            ajax: {
                settings: {
                    data: {
                        fancybox: !0
                    }
                }
            },
            iframe: {
                tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',
                preload: !0,
                css: {},
                attr: {
                    scrolling: "auto"
                }
            },
            defaultType: "image",
            animationEffect: "zoom",
            animationDuration: 366,
            zoomOpacity: "auto",
            transitionEffect: "fade",
            transitionDuration: 366,
            slideClass: "",
            baseClass: "",
            baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"></div></div></div>',
            spinnerTpl: '<div class="fancybox-loading"></div>',
            errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
            btnTpl: {
                download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg viewBox="0 0 40 40"><path d="M13,16 L20,23 L27,16 M20,7 L20,23 M10,24 L10,28 L30,28 L30,24" /></svg></a>',
                zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg viewBox="0 0 40 40"><path d="M18,17 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0 M24,22 L31,29" /></svg></button>',
                close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg viewBox="0 0 40 40"><path d="M10,10 L30,30 M30,10 L10,30" /></svg></button>',
                smallBtn: '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"><svg viewBox="0 0 32 32"><path d="M10,10 L22,22 M22,10 L10,22"></path></svg></button>',
                arrowLeft: '<a data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}" href="javascript:;"><svg viewBox="0 0 40 40"><path d="M18,12 L10,20 L18,28 M10,20 L30,20"></path></svg></a>',
                arrowRight: '<a data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}" href="javascript:;"><svg viewBox="0 0 40 40"><path d="M10,20 L30,20 M22,12 L30,20 L22,28"></path></svg></a>'
            },
            parentEl: "body",
            autoFocus: !1,
            backFocus: !0,
            trapFocus: !0,
            fullScreen: {
                autoStart: !1
            },
            touch: {
                vertical: !0,
                momentum: !0
            },
            hash: null,
            media: {},
            slideShow: {
                autoStart: !1,
                speed: 4e3
            },
            thumbs: {
                autoStart: !1,
                hideOnClose: !0,
                parentEl: ".fancybox-container",
                axis: "y"
            },
            wheel: "auto",
            onInit: n.noop,
            beforeLoad: n.noop,
            afterLoad: n.noop,
            beforeShow: n.noop,
            afterShow: n.noop,
            beforeClose: n.noop,
            afterClose: n.noop,
            onActivate: n.noop,
            onDeactivate: n.noop,
            clickContent: function(t, e) {
                return "image" === t.type && "zoom"
            },
            clickSlide: "close",
            clickOutside: "close",
            dblclickContent: !1,
            dblclickSlide: !1,
            dblclickOutside: !1,
            mobile: {
                idleTime: !1,
                clickContent: function(t, e) {
                    return "image" === t.type && "toggleControls"
                },
                clickSlide: function(t, e) {
                    return "image" === t.type ? "toggleControls" : "close"
                },
                dblclickContent: function(t, e) {
                    return "image" === t.type && "zoom"
                },
                dblclickSlide: function(t, e) {
                    return "image" === t.type && "zoom"
                }
            },
            lang: "en",
            i18n: {
                en: {
                    CLOSE: "Fermer",
                    NEXT: "Suiv",
                    PREV: "Prec",
                    ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                    PLAY_START: "Start slideshow",
                    PLAY_STOP: "Pause slideshow",
                    FULL_SCREEN: "Plein Ã©cran",
                    THUMBS: "Thumbnails",
                    DOWNLOAD: "Download",
                    SHARE: "Share",
                    ZOOM: "Zoom"
                },
                de: {
                    CLOSE: "Schliessen",
                    NEXT: "Weiter",
                    PREV: "ZurÃ¼ck",
                    ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es spÃ¤ter nochmal.",
                    PLAY_START: "Diaschau starten",
                    PLAY_STOP: "Diaschau beenden",
                    FULL_SCREEN: "Vollbild",
                    THUMBS: "Vorschaubilder",
                    DOWNLOAD: "Herunterladen",
                    SHARE: "Teilen",
                    ZOOM: "MaÃŸstab"
                }
            }
        }
          , a = n(t)
          , r = n(e)
          , l = 0
          , c = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function(e) {
            return t.setTimeout(e, 1e3 / 60)
        }
          , d = function() {
            var t, n = e.createElement("fakeelement"), o = {
                transition: "transitionend",
                OTransition: "oTransitionEnd",
                MozTransition: "transitionend",
                WebkitTransition: "webkitTransitionEnd"
            };
            for (t in o)
                if (n.style[t] !== i)
                    return o[t];
            return "transitionend"
        }()
          , u = function(t) {
            return t && t.length && t[0].offsetHeight
        }
          , p = function(t, e) {
            var i = n.extend(!0, {}, t, e);
            return n.each(e, (function(t, e) {
                n.isArray(e) && (i[t] = e)
            }
            )),
            i
        }
          , h = function(t, i, o) {
            var s = this;
            s.opts = p({
                index: o
            }, n.fancybox.defaults),
            n.isPlainObject(i) && (s.opts = p(s.opts, i)),
            n.fancybox.isMobile && (s.opts = p(s.opts, s.opts.mobile)),
            s.id = s.opts.id || ++l,
            s.currIndex = parseInt(s.opts.index, 10) || 0,
            s.prevIndex = null,
            s.prevPos = null,
            s.currPos = 0,
            s.firstRun = !0,
            s.group = [],
            s.slides = {},
            s.addContent(t),
            s.group.length && (s.$lastFocus = n(e.activeElement).trigger("blur"),
            s.init())
        };
        n.extend(h.prototype, {
            init: function() {
                var o, s, a, r = this, l = r.group[r.currIndex].opts, c = n.fancybox.scrollbarWidth;
                n.fancybox.getInstance() || !1 === l.hideScrollbar || (n("body").addClass("fancybox-active"),
                !n.fancybox.isMobile && e.body.scrollHeight > t.innerHeight && (c === i && (o = n('<div style="width:100px;height:100px;overflow:scroll;" />').appendTo("body"),
                c = n.fancybox.scrollbarWidth = o[0].offsetWidth - o[0].clientWidth,
                o.remove()),
                n("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar { margin-right: ' + c + "px; }</style>"),
                n("body").addClass("compensate-for-scrollbar"))),
                a = "",
                n.each(l.buttons, (function(t, e) {
                    a += l.btnTpl[e] || ""
                }
                )),
                s = n(r.translate(r, l.baseTpl.replace("{{buttons}}", a).replace("{{arrows}}", l.btnTpl.arrowLeft + l.btnTpl.arrowRight))).attr("id", "fancybox-container-" + r.id).addClass("fancybox-is-hidden").addClass(l.baseClass).data("FancyBox", r).appendTo(l.parentEl),
                r.$refs = {
                    container: s
                },
                ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach((function(t) {
                    r.$refs[t] = s.find(".fancybox-" + t)
                }
                )),
                r.trigger("onInit"),
                r.activate(),
                r.jumpTo(r.currIndex)
            },
            translate: function(t, e) {
                var n = t.opts.i18n[t.opts.lang];
                return e.replace(/\{\{(\w+)\}\}/g, (function(t, e) {
                    var o = n[e];
                    return o === i ? t : o
                }
                ))
            },
            addContent: function(t) {
                var e, o = this, s = n.makeArray(t);
                n.each(s, (function(t, e) {
                    var s, a, r, l, c, d = {}, u = {};
                    n.isPlainObject(e) ? (d = e,
                    u = e.opts || e) : "object" === n.type(e) && n(e).length ? (u = (s = n(e)).data() || {},
                    (u = n.extend(!0, {}, u, u.options)).$orig = s,
                    d.src = o.opts.src || u.src || s.attr("href"),
                    d.type || d.src || (d.type = "inline",
                    d.src = e)) : d = {
                        type: "html",
                        src: e + ""
                    },
                    d.opts = n.extend(!0, {}, o.opts, u),
                    n.isArray(u.buttons) && (d.opts.buttons = u.buttons),
                    a = d.type || d.opts.type,
                    l = d.src || "",
                    !a && l && ((r = l.match(/\.(mp4|mov|ogv)((\?|#).*)?$/i)) ? (a = "video",
                    d.opts.videoFormat || (d.opts.videoFormat = "video/" + ("ogv" === r[1] ? "ogg" : r[1]))) : l.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? a = "image" : l.match(/\.(pdf)((\?|#).*)?$/i) ? a = "iframe" : "#" === l.charAt(0) && (a = "inline")),
                    a ? d.type = a : o.trigger("objectNeedsType", d),
                    d.contentType || (d.contentType = n.inArray(d.type, ["html", "inline", "ajax"]) > -1 ? "html" : d.type),
                    d.index = o.group.length,
                    "auto" == d.opts.smallBtn && (d.opts.smallBtn = n.inArray(d.type, ["html", "inline", "ajax"]) > -1),
                    "auto" === d.opts.toolbar && (d.opts.toolbar = !d.opts.smallBtn),
                    d.opts.$trigger && d.index === o.opts.index && (d.opts.$thumb = d.opts.$trigger.find("img:first")),
                    d.opts.$thumb && d.opts.$thumb.length || !d.opts.$orig || (d.opts.$thumb = d.opts.$orig.find("img:first")),
                    "function" === n.type(d.opts.caption) && (d.opts.caption = d.opts.caption.apply(e, [o, d])),
                    "function" === n.type(o.opts.caption) && (d.opts.caption = o.opts.caption.apply(e, [o, d])),
                    d.opts.caption instanceof n || (d.opts.caption = d.opts.caption === i ? "" : d.opts.caption + ""),
                    "ajax" === d.type && ((c = l.split(/\s+/, 2)).length > 1 && (d.src = c.shift(),
                    d.opts.filter = c.shift())),
                    d.opts.modal && (d.opts = n.extend(!0, d.opts, {
                        infobar: 0,
                        toolbar: 0,
                        smallBtn: 0,
                        keyboard: 0,
                        slideShow: 0,
                        fullScreen: 0,
                        thumbs: 0,
                        touch: 0,
                        clickContent: !1,
                        clickSlide: !1,
                        clickOutside: !1,
                        dblclickContent: !1,
                        dblclickSlide: !1,
                        dblclickOutside: !1
                    })),
                    o.group.push(d)
                }
                )),
                Object.keys(o.slides).length && (o.updateControls(),
                (e = o.Thumbs) && e.isActive && (e.create(),
                e.focus()))
            },
            addEvents: function() {
                var i = this;
                i.removeEvents(),
                i.$refs.container.on("click.fb-close", "[data-fancybox-close]", (function(t) {
                    t.stopPropagation(),
                    t.preventDefault(),
                    i.close(t)
                }
                )).on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", (function(t) {
                    t.stopPropagation(),
                    t.preventDefault(),
                    i.previous()
                }
                )).on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", (function(t) {
                    t.stopPropagation(),
                    t.preventDefault(),
                    i.next()
                }
                )).on("click.fb", "[data-fancybox-zoom]", (function(t) {
                    i[i.isScaledDown() ? "scaleToActual" : "scaleToFit"]()
                }
                )),
                a.on("orientationchange.fb resize.fb", (function(t) {
                    t && t.originalEvent && "resize" === t.originalEvent.type ? c((function() {
                        i.update()
                    }
                    )) : (i.$refs.stage.hide(),
                    setTimeout((function() {
                        i.$refs.stage.show(),
                        i.update()
                    }
                    ), n.fancybox.isMobile ? 600 : 250))
                }
                )),
                r.on("focusin.fb", (function(t) {
                    var i = n.fancybox ? n.fancybox.getInstance() : null;
                    i.isClosing || !i.current || !i.current.opts.trapFocus || n(t.target).hasClass("fancybox-container") || n(t.target).is(e) || i && "fixed" !== n(t.target).css("position") && !i.$refs.container.has(t.target).length && (t.stopPropagation(),
                    i.focus())
                }
                )),
                r.on("keydown.fb", (function(t) {
                    var e = i.current
                      , o = t.keyCode || t.which;
                    if (e && e.opts.keyboard && !(t.ctrlKey || t.altKey || t.shiftKey || n(t.target).is("input") || n(t.target).is("textarea")))
                        return 8 === o || 27 === o ? (t.preventDefault(),
                        void i.close(t)) : 37 === o || 38 === o ? (t.preventDefault(),
                        void i.previous()) : 39 === o || 40 === o ? (t.preventDefault(),
                        void i.next()) : void i.trigger("afterKeydown", t, o)
                }
                )),
                i.group[i.currIndex].opts.idleTime && (i.idleSecondsCounter = 0,
                r.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", (function(t) {
                    i.idleSecondsCounter = 0,
                    i.isIdle && i.showControls(),
                    i.isIdle = !1
                }
                )),
                i.idleInterval = t.setInterval((function() {
                    i.idleSecondsCounter++,
                    i.idleSecondsCounter >= i.group[i.currIndex].opts.idleTime && !i.isDragging && (i.isIdle = !0,
                    i.idleSecondsCounter = 0,
                    i.hideControls())
                }
                ), 1e3))
            },
            removeEvents: function() {
                var e = this;
                a.off("orientationchange.fb resize.fb"),
                r.off("focusin.fb keydown.fb .fb-idle"),
                this.$refs.container.off(".fb-close .fb-prev .fb-next"),
                e.idleInterval && (t.clearInterval(e.idleInterval),
                e.idleInterval = null)
            },
            previous: function(t) {
                return this.jumpTo(this.currPos - 1, t)
            },
            next: function(t) {
                return this.jumpTo(this.currPos + 1, t)
            },
            jumpTo: function(t, e) {
                var o, s, a, r, l, c, d, p = this, h = p.group.length;
                if (!(p.isDragging || p.isClosing || p.isAnimating && p.firstRun)) {
                    if (t = parseInt(t, 10),
                    !(s = p.current ? p.current.opts.loop : p.opts.loop) && (t < 0 || t >= h))
                        return !1;
                    if (o = p.firstRun = !Object.keys(p.slides).length,
                    !(h < 2 && !o && p.isDragging)) {
                        if (r = p.current,
                        p.prevIndex = p.currIndex,
                        p.prevPos = p.currPos,
                        a = p.createSlide(t),
                        h > 1 && ((s || a.index > 0) && p.createSlide(t - 1),
                        (s || a.index < h - 1) && p.createSlide(t + 1)),
                        p.current = a,
                        p.currIndex = a.index,
                        p.currPos = a.pos,
                        p.trigger("beforeShow", o),
                        p.updateControls(),
                        c = n.fancybox.getTranslate(a.$slide),
                        a.isMoved = (0 !== c.left || 0 !== c.top) && !a.$slide.hasClass("fancybox-animated"),
                        a.forcedDuration = i,
                        n.isNumeric(e) ? a.forcedDuration = e : e = a.opts[o ? "animationDuration" : "transitionDuration"],
                        e = parseInt(e, 10),
                        o)
                            return a.opts.animationEffect && e && p.$refs.container.css("transition-duration", e + "ms"),
                            p.$refs.container.removeClass("fancybox-is-hidden"),
                            u(p.$refs.container),
                            p.$refs.container.addClass("fancybox-is-open"),
                            u(p.$refs.container),
                            a.$slide.addClass("fancybox-slide--previous"),
                            p.loadSlide(a),
                            a.$slide.removeClass("fancybox-slide--previous").addClass("fancybox-slide--current"),
                            void p.preload("image");
                        n.each(p.slides, (function(t, e) {
                            n.fancybox.stop(e.$slide)
                        }
                        )),
                        a.$slide.removeClass("fancybox-slide--next fancybox-slide--previous").addClass("fancybox-slide--current"),
                        a.isMoved ? (l = Math.round(a.$slide.width()),
                        n.each(p.slides, (function(t, i) {
                            var o = i.pos - a.pos;
                            n.fancybox.animate(i.$slide, {
                                top: 0,
                                left: o * l + o * i.opts.gutter
                            }, e, (function() {
                                i.$slide.removeAttr("style").removeClass("fancybox-slide--next fancybox-slide--previous"),
                                i.pos === p.currPos && (a.isMoved = !1,
                                p.complete())
                            }
                            ))
                        }
                        ))) : p.$refs.stage.children().removeAttr("style"),
                        a.isLoaded ? p.revealContent(a) : p.loadSlide(a),
                        p.preload("image"),
                        r.pos !== a.pos && (d = "fancybox-slide--" + (r.pos > a.pos ? "next" : "previous"),
                        r.$slide.removeClass("fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous"),
                        r.isComplete = !1,
                        e && (a.isMoved || a.opts.transitionEffect) && (a.isMoved ? r.$slide.addClass(d) : (d = "fancybox-animated " + d + " fancybox-fx-" + a.opts.transitionEffect,
                        n.fancybox.animate(r.$slide, d, e, (function() {
                            r.$slide.removeClass(d).removeAttr("style")
                        }
                        )))))
                    }
                }
            },
            createSlide: function(t) {
                var e, i, o = this;
                return i = (i = t % o.group.length) < 0 ? o.group.length + i : i,
                !o.slides[t] && o.group[i] && (e = n('<div class="fancybox-slide"></div>').appendTo(o.$refs.stage),
                o.slides[t] = n.extend(!0, {}, o.group[i], {
                    pos: t,
                    $slide: e,
                    isLoaded: !1
                }),
                o.updateSlide(o.slides[t])),
                o.slides[t]
            },
            scaleToActual: function(t, e, o) {
                var s, a, r, l, c, d = this, u = d.current, p = u.$content, h = n.fancybox.getTranslate(u.$slide).width, f = n.fancybox.getTranslate(u.$slide).height, g = u.width, m = u.height;
                !d.isAnimating && p && "image" == u.type && u.isLoaded && !u.hasError && (n.fancybox.stop(p),
                d.isAnimating = !0,
                t = t === i ? .5 * h : t,
                e = e === i ? .5 * f : e,
                (s = n.fancybox.getTranslate(p)).top -= n.fancybox.getTranslate(u.$slide).top,
                s.left -= n.fancybox.getTranslate(u.$slide).left,
                l = g / s.width,
                c = m / s.height,
                a = .5 * h - .5 * g,
                r = .5 * f - .5 * m,
                g > h && ((a = s.left * l - (t * l - t)) > 0 && (a = 0),
                a < h - g && (a = h - g)),
                m > f && ((r = s.top * c - (e * c - e)) > 0 && (r = 0),
                r < f - m && (r = f - m)),
                d.updateCursor(g, m),
                n.fancybox.animate(p, {
                    top: r,
                    left: a,
                    scaleX: l,
                    scaleY: c
                }, o || 330, (function() {
                    d.isAnimating = !1
                }
                )),
                d.SlideShow && d.SlideShow.isActive && d.SlideShow.stop())
            },
            scaleToFit: function(t) {
                var e, i = this, o = i.current, s = o.$content;
                !i.isAnimating && s && "image" == o.type && o.isLoaded && !o.hasError && (n.fancybox.stop(s),
                i.isAnimating = !0,
                e = i.getFitPos(o),
                i.updateCursor(e.width, e.height),
                n.fancybox.animate(s, {
                    top: e.top,
                    left: e.left,
                    scaleX: e.width / s.width(),
                    scaleY: e.height / s.height()
                }, t || 330, (function() {
                    i.isAnimating = !1
                }
                )))
            },
            getFitPos: function(t) {
                var e, n, i, o, s, a = t.$content, r = t.width || t.opts.width, l = t.height || t.opts.height, c = {};
                return !!(t.isLoaded && a && a.length) && (o = {
                    top: parseInt(t.$slide.css("paddingTop"), 10),
                    right: parseInt(t.$slide.css("paddingRight"), 10),
                    bottom: parseInt(t.$slide.css("paddingBottom"), 10),
                    left: parseInt(t.$slide.css("paddingLeft"), 10)
                },
                e = parseInt(this.$refs.stage.width(), 10) - (o.left + o.right),
                n = parseInt(this.$refs.stage.height(), 10) - (o.top + o.bottom),
                r && l || (r = e,
                l = n),
                i = Math.min(1, e / r, n / l),
                r = Math.floor(i * r),
                l = Math.floor(i * l),
                "image" === t.type ? (c.top = Math.floor(.5 * (n - l)) + o.top,
                c.left = Math.floor(.5 * (e - r)) + o.left) : "video" === t.contentType && (l > r / (s = t.opts.width && t.opts.height ? r / l : t.opts.ratio || 16 / 9) ? l = r / s : r > l * s && (r = l * s)),
                c.width = r,
                c.height = l,
                c)
            },
            update: function() {
                var t = this;
                n.each(t.slides, (function(e, n) {
                    t.updateSlide(n)
                }
                ))
            },
            updateSlide: function(t, e) {
                var i = this
                  , o = t && t.$content
                  , s = t.width || t.opts.width
                  , a = t.height || t.opts.height;
                o && (s || a || "video" === t.contentType) && !t.hasError && (n.fancybox.stop(o),
                n.fancybox.setTranslate(o, i.getFitPos(t)),
                t.pos === i.currPos && (i.isAnimating = !1,
                i.updateCursor())),
                t.$slide.trigger("refresh"),
                i.$refs.toolbar.toggleClass("compensate-for-scrollbar", t.$slide.get(0).scrollHeight > t.$slide.get(0).clientHeight),
                i.trigger("onUpdate", t)
            },
            centerSlide: function(t, e) {
                var o, s;
                this.current && (o = Math.round(t.$slide.width()),
                s = t.pos - this.current.pos,
                n.fancybox.animate(t.$slide, {
                    top: 0,
                    left: s * o + s * t.opts.gutter,
                    opacity: 1
                }, e === i ? 0 : e, null, !1))
            },
            updateCursor: function(t, e) {
                var i, o = this, s = o.current, a = o.$refs.container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut");
                s && !o.isClosing && (i = o.isZoomable(),
                a.toggleClass("fancybox-is-zoomable", i),
                n("[data-fancybox-zoom]").prop("disabled", !i),
                i && ("zoom" === s.opts.clickContent || n.isFunction(s.opts.clickContent) && "zoom" === s.opts.clickContent(s)) ? o.isScaledDown(t, e) ? a.addClass("fancybox-can-zoomIn") : s.opts.touch ? a.addClass("fancybox-can-drag") : a.addClass("fancybox-can-zoomOut") : s.opts.touch && "video" !== s.contentType && a.addClass("fancybox-can-drag"))
            },
            isZoomable: function() {
                var t, e = this, n = e.current;
                if (n && !e.isClosing && "image" === n.type && !n.hasError) {
                    if (!n.isLoaded)
                        return !0;
                    if (t = e.getFitPos(n),
                    n.width > t.width || n.height > t.height)
                        return !0
                }
                return !1
            },
            isScaledDown: function(t, e) {
                var o = !1
                  , s = this.current
                  , a = s.$content;
                return t !== i && e !== i ? o = t < s.width && e < s.height : a && (o = (o = n.fancybox.getTranslate(a)).width < s.width && o.height < s.height),
                o
            },
            canPan: function() {
                var t, e = !1, n = this.current;
                return "image" === n.type && (t = n.$content) && !n.hasError && (e = this.getFitPos(n),
                e = Math.abs(t.width() - e.width) > 1 || Math.abs(t.height() - e.height) > 1),
                e
            },
            loadSlide: function(t) {
                var e, i, o, s = this;
                if (!t.isLoading && !t.isLoaded) {
                    switch (t.isLoading = !0,
                    s.trigger("beforeLoad", t),
                    e = t.type,
                    (i = t.$slide).off("refresh").trigger("onReset").addClass(t.opts.slideClass),
                    e) {
                    case "image":
                        s.setImage(t);
                        break;
                    case "iframe":
                        s.setIframe(t);
                        break;
                    case "html":
                        s.setContent(t, t.src || t.content);
                        break;
                    case "video":
                        s.setContent(t, '<video class="fancybox-video" controls controlsList="nodownload"><source src="' + t.src + '" type="' + t.opts.videoFormat + "\">Your browser doesn't support HTML5 video</video");
                        break;
                    case "inline":
                        n(t.src).length ? s.setContent(t, n(t.src)) : s.setError(t);
                        break;
                    case "ajax":
                        s.showLoading(t),
                        o = n.ajax(n.extend({}, t.opts.ajax.settings, {
                            url: t.src,
                            success: function(e, n) {
                                "success" === n && s.setContent(t, e)
                            },
                            error: function(e, n) {
                                e && "abort" !== n && s.setError(t)
                            }
                        })),
                        i.one("onReset", (function() {
                            o.abort()
                        }
                        ));
                        break;
                    default:
                        s.setError(t)
                    }
                    return !0
                }
            },
            setImage: function(e) {
                var i, o, s, a, r, l = this, c = e.opts.srcset || e.opts.image.srcset;
                if (e.timouts = setTimeout((function() {
                    var t = e.$image;
                    !e.isLoading || t && t[0].complete || e.hasError || l.showLoading(e)
                }
                ), 350),
                c) {
                    a = t.devicePixelRatio || 1,
                    r = t.innerWidth * a,
                    s = c.split(",").map((function(t) {
                        var e = {};
                        return t.trim().split(/\s+/).forEach((function(t, n) {
                            var i = parseInt(t.substring(0, t.length - 1), 10);
                            return 0 === n ? e.url = t : void (i && (e.value = i,
                            e.postfix = t[t.length - 1]))
                        }
                        )),
                        e
                    }
                    )),
                    s.sort((function(t, e) {
                        return t.value - e.value
                    }
                    ));
                    for (var d = 0; d < s.length; d++) {
                        var u = s[d];
                        if ("w" === u.postfix && u.value >= r || "x" === u.postfix && u.value >= a) {
                            o = u;
                            break
                        }
                    }
                    !o && s.length && (o = s[s.length - 1]),
                    o && (e.src = o.url,
                    e.width && e.height && "w" == o.postfix && (e.height = e.width / e.height * o.value,
                    e.width = o.value),
                    e.opts.srcset = c)
                }
                e.$content = n('<div class="fancybox-content"></div>').addClass("fancybox-is-hidden").appendTo(e.$slide.addClass("fancybox-slide--image")),
                i = e.opts.thumb || !(!e.opts.$thumb || !e.opts.$thumb.length) && e.opts.$thumb.attr("src"),
                !1 !== e.opts.preload && e.opts.width && e.opts.height && i && (e.width = e.opts.width,
                e.height = e.opts.height,
                e.$ghost = n("<img />").one("error", (function() {
                    n(this).remove(),
                    e.$ghost = null
                }
                )).one("load", (function() {
                    l.afterLoad(e)
                }
                )).addClass("fancybox-image").appendTo(e.$content).attr("src", i)),
                l.setBigImage(e)
            },
            setBigImage: function(t) {
                var e = this
                  , i = n("<img />");
                t.$image = i.one("error", (function() {
                    e.setError(t)
                }
                )).one("load", (function() {
                    var n;
                    t.$ghost || (e.resolveImageSlideSize(t, this.naturalWidth, this.naturalHeight),
                    e.afterLoad(t)),
                    t.timouts && (clearTimeout(t.timouts),
                    t.timouts = null),
                    e.isClosing || (t.opts.srcset && ((n = t.opts.sizes) && "auto" !== n || (n = (t.width / t.height > 1 && a.width() / a.height() > 1 ? "100" : Math.round(t.width / t.height * 100)) + "vw"),
                    i.attr("sizes", n).attr("srcset", t.opts.srcset)),
                    t.$ghost && setTimeout((function() {
                        t.$ghost && !e.isClosing && t.$ghost.hide()
                    }
                    ), Math.min(300, Math.max(1e3, t.height / 1600))),
                    e.hideLoading(t))
                }
                )).addClass("fancybox-image").attr("src", t.src).appendTo(t.$content),
                (i[0].complete || "complete" == i[0].readyState) && i[0].naturalWidth && i[0].naturalHeight ? i.trigger("load") : i[0].error && i.trigger("error")
            },
            resolveImageSlideSize: function(t, e, n) {
                var i = parseInt(t.opts.width, 10)
                  , o = parseInt(t.opts.height, 10);
                t.width = e,
                t.height = n,
                i > 0 && (t.width = i,
                t.height = Math.floor(i * n / e)),
                o > 0 && (t.width = Math.floor(o * e / n),
                t.height = o)
            },
            setIframe: function(t) {
                var e, o = this, s = t.opts.iframe, a = t.$slide;
                t.$content = n('<div class="fancybox-content' + (s.preload ? " fancybox-is-hidden" : "") + '"></div>').css(s.css).appendTo(a),
                a.addClass("fancybox-slide--" + t.contentType),
                t.$iframe = e = n(s.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr(s.attr).appendTo(t.$content),
                s.preload ? (o.showLoading(t),
                e.on("load.fb error.fb", (function(e) {
                    this.isReady = 1,
                    t.$slide.trigger("refresh"),
                    o.afterLoad(t)
                }
                )),
                a.on("refresh.fb", (function() {
                    var n, o = t.$content, a = s.css.width, r = s.css.height;
                    if (1 === e[0].isReady) {
                        try {
                            n = e.contents().find("body")
                        } catch (t) {}
                        n && n.length && n.children().length && (o.css({
                            width: "",
                            height: ""
                        }),
                        a === i && (a = Math.ceil(Math.max(n[0].clientWidth, n.outerWidth(!0)))),
                        a && o.width(a),
                        r === i && (r = Math.ceil(Math.max(n[0].clientHeight, n.outerHeight(!0)))),
                        r && o.height(r)),
                        o.removeClass("fancybox-is-hidden")
                    }
                }
                ))) : this.afterLoad(t),
                e.attr("src", t.src),
                a.one("onReset", (function() {
                    try {
                        n(this).find("iframe").hide().unbind().attr("src", "//about:blank")
                    } catch (t) {}
                    n(this).off("refresh.fb").empty(),
                    t.isLoaded = !1
                }
                ))
            },
            setContent: function(t, e) {
                this.isClosing || (this.hideLoading(t),
                t.$content && n.fancybox.stop(t.$content),
                t.$slide.empty(),
                function(t) {
                    return t && t.hasOwnProperty && t instanceof n
                }(e) && e.parent().length ? (e.parent().parent(".fancybox-slide--inline").trigger("onReset"),
                t.$placeholder = n("<div>").hide().insertAfter(e),
                e.css("display", "inline-block")) : t.hasError || ("string" === n.type(e) && (3 === (e = n("<div>").append(n.trim(e)).contents())[0].nodeType && (e = n("<div>").html(e))),
                t.opts.filter && (e = n("<div>").html(e).find(t.opts.filter))),
                t.$slide.one("onReset", (function() {
                    n(this).find("video,audio").trigger("pause"),
                    t.$placeholder && (t.$placeholder.after(e.hide()).remove(),
                    t.$placeholder = null),
                    t.$smallBtn && (t.$smallBtn.remove(),
                    t.$smallBtn = null),
                    t.hasError || (n(this).empty(),
                    t.isLoaded = !1)
                }
                )),
                n(e).appendTo(t.$slide),
                n(e).is("video,audio") && (n(e).addClass("fancybox-video"),
                n(e).wrap("<div></div>"),
                t.contentType = "video",
                t.opts.width = t.opts.width || n(e).attr("width"),
                t.opts.height = t.opts.height || n(e).attr("height")),
                t.$content = t.$slide.children().filter("div,form,main,video,audio").first().addClass("fancybox-content"),
                t.$slide.addClass("fancybox-slide--" + t.contentType),
                this.afterLoad(t))
            },
            setError: function(t) {
                t.hasError = !0,
                t.$slide.trigger("onReset").removeClass("fancybox-slide--" + t.contentType).addClass("fancybox-slide--error"),
                t.contentType = "html",
                this.setContent(t, this.translate(t, t.opts.errorTpl)),
                t.pos === this.currPos && (this.isAnimating = !1)
            },
            showLoading: function(t) {
                var e = this;
                (t = t || e.current) && !t.$spinner && (t.$spinner = n(e.translate(e, e.opts.spinnerTpl)).appendTo(t.$slide))
            },
            hideLoading: function(t) {
                (t = t || this.current) && t.$spinner && (t.$spinner.remove(),
                delete t.$spinner)
            },
            afterLoad: function(t) {
                var e = this;
                e.isClosing || (t.isLoading = !1,
                t.isLoaded = !0,
                e.trigger("afterLoad", t),
                e.hideLoading(t),
                t.pos === e.currPos && e.updateCursor(),
                !t.opts.smallBtn || t.$smallBtn && t.$smallBtn.length || (t.$smallBtn = n(e.translate(t, t.opts.btnTpl.smallBtn)).prependTo(t.$content)),
                t.opts.protect && t.$content && !t.hasError && (t.$content.on("contextmenu.fb", (function(t) {
                    return 2 == t.button && t.preventDefault(),
                    !0
                }
                )),
                "image" === t.type && n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)),
                e.revealContent(t))
            },
            revealContent: function(t) {
                var e, o, s, a, r = this, l = t.$slide, c = !1, d = !1;
                return e = t.opts[r.firstRun ? "animationEffect" : "transitionEffect"],
                s = t.opts[r.firstRun ? "animationDuration" : "transitionDuration"],
                s = parseInt(t.forcedDuration === i ? s : t.forcedDuration, 10),
                t.pos === r.currPos && (t.isComplete ? e = !1 : r.isAnimating = !0),
                !t.isMoved && t.pos === r.currPos && s || (e = !1),
                "zoom" === e && (t.pos === r.currPos && s && "image" === t.type && !t.hasError && (d = r.getThumbPos(t)) ? c = r.getFitPos(t) : e = "fade"),
                "zoom" === e ? (c.scaleX = c.width / d.width,
                c.scaleY = c.height / d.height,
                "auto" == (a = t.opts.zoomOpacity) && (a = Math.abs(t.width / t.height - d.width / d.height) > .1),
                a && (d.opacity = .1,
                c.opacity = 1),
                n.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"), d),
                u(t.$content),
                void n.fancybox.animate(t.$content, c, s, (function() {
                    r.isAnimating = !1,
                    r.complete()
                }
                ))) : (r.updateSlide(t),
                e ? (n.fancybox.stop(l),
                o = "fancybox-animated fancybox-slide--" + (t.pos >= r.prevPos ? "next" : "previous") + " fancybox-fx-" + e,
                l.removeAttr("style").removeClass("fancybox-slide--current fancybox-slide--next fancybox-slide--previous").addClass(o),
                t.$content.removeClass("fancybox-is-hidden"),
                u(l),
                void n.fancybox.animate(l, "fancybox-slide--current", s, (function(e) {
                    l.removeClass(o).removeAttr("style"),
                    t.pos === r.currPos && r.complete()
                }
                ), !0)) : (u(l),
                t.$content.removeClass("fancybox-is-hidden"),
                void (t.pos === r.currPos && r.complete())))
            },
            getThumbPos: function(i) {
                var o, s = !1, a = i.opts.$thumb, r = a && a.length && a[0].ownerDocument === e ? a.offset() : 0;
                return r && function(e) {
                    for (var i, o = e[0], s = o.getBoundingClientRect(), a = []; null !== o.parentElement; )
                        "hidden" !== n(o.parentElement).css("overflow") && "auto" !== n(o.parentElement).css("overflow") || a.push(o.parentElement.getBoundingClientRect()),
                        o = o.parentElement;
                    return i = a.every((function(t) {
                        var e = Math.min(s.right, t.right) - Math.max(s.left, t.left)
                          , n = Math.min(s.bottom, t.bottom) - Math.max(s.top, t.top);
                        return e > 0 && n > 0
                    }
                    )),
                    i && s.bottom > 0 && s.right > 0 && s.left < n(t).width() && s.top < n(t).height()
                }(a) && (o = this.$refs.stage.offset(),
                s = {
                    top: r.top - o.top + parseFloat(a.css("border-top-width") || 0),
                    left: r.left - o.left + parseFloat(a.css("border-left-width") || 0),
                    width: a.width(),
                    height: a.height(),
                    scaleX: 1,
                    scaleY: 1
                }),
                s
            },
            complete: function() {
                var t = this
                  , i = t.current
                  , o = {};
                !i.isMoved && i.isLoaded && (i.isComplete || (i.isComplete = !0,
                i.$slide.siblings().trigger("onReset"),
                t.preload("inline"),
                u(i.$slide),
                i.$slide.addClass("fancybox-slide--complete"),
                n.each(t.slides, (function(e, i) {
                    i.pos >= t.currPos - 1 && i.pos <= t.currPos + 1 ? o[i.pos] = i : i && (n.fancybox.stop(i.$slide),
                    i.$slide.off().remove())
                }
                )),
                t.slides = o),
                t.isAnimating = !1,
                t.updateCursor(),
                t.trigger("afterShow"),
                i.$slide.find("video,audio").filter(":visible:first").trigger("play"),
                (n(e.activeElement).is("[disabled]") || i.opts.autoFocus && "image" != i.type && "iframe" !== i.type) && t.focus())
            },
            preload: function(t) {
                var e = this
                  , n = e.slides[e.currPos + 1]
                  , i = e.slides[e.currPos - 1];
                n && n.type === t && e.loadSlide(n),
                i && i.type === t && e.loadSlide(i)
            },
            focus: function() {
                var t, e = this.current;
                this.isClosing || e && e.isComplete && e.$content && ((t = e.$content.find("input[autofocus]:enabled:visible:first")).length || (t = e.$content.find("button,:input,[tabindex],a").filter(":enabled:visible:first")),
                (t = t && t.length ? t : e.$content).trigger("focus"))
            },
            activate: function() {
                var t = this;
                n(".fancybox-container").each((function() {
                    var e = n(this).data("FancyBox");
                    e && e.id !== t.id && !e.isClosing && (e.trigger("onDeactivate"),
                    e.removeEvents(),
                    e.isVisible = !1)
                }
                )),
                t.isVisible = !0,
                (t.current || t.isIdle) && (t.update(),
                t.updateControls()),
                t.trigger("onActivate"),
                t.addEvents()
            },
            close: function(t, e) {
                var i, o, s, a, r, l, p, h = this, f = h.current, g = function() {
                    h.cleanUp(t)
                };
                return !(h.isClosing || (h.isClosing = !0,
                !1 === h.trigger("beforeClose", t) ? (h.isClosing = !1,
                c((function() {
                    h.update()
                }
                )),
                1) : (h.removeEvents(),
                f.timouts && clearTimeout(f.timouts),
                s = f.$content,
                i = f.opts.animationEffect,
                o = n.isNumeric(e) ? e : i ? f.opts.animationDuration : 0,
                f.$slide.off(d).removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"),
                f.$slide.siblings().trigger("onReset").remove(),
                o && h.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing"),
                h.hideLoading(f),
                h.hideControls(),
                h.updateCursor(),
                "zoom" !== i || !0 !== t && s && o && "image" === f.type && !f.hasError && (p = h.getThumbPos(f)) || (i = "fade"),
                "zoom" === i ? (n.fancybox.stop(s),
                a = n.fancybox.getTranslate(s),
                l = {
                    top: a.top,
                    left: a.left,
                    scaleX: a.width / p.width,
                    scaleY: a.height / p.height,
                    width: p.width,
                    height: p.height
                },
                r = f.opts.zoomOpacity,
                "auto" == r && (r = Math.abs(f.width / f.height - p.width / p.height) > .1),
                r && (p.opacity = 0),
                n.fancybox.setTranslate(s, l),
                u(s),
                n.fancybox.animate(s, p, o, g),
                0) : (i && o ? !0 === t ? setTimeout(g, o) : n.fancybox.animate(f.$slide.removeClass("fancybox-slide--current"), "fancybox-animated fancybox-slide--previous fancybox-fx-" + i, o, g) : g(),
                0))))
            },
            cleanUp: function(t) {
                var e, i = this, o = n("body");
                i.current.$slide.trigger("onReset"),
                i.$refs.container.empty().remove(),
                i.trigger("afterClose", t),
                i.$lastFocus && i.current.opts.backFocus && i.$lastFocus.trigger("focus"),
                i.current = null,
                (e = n.fancybox.getInstance()) ? e.activate() : (o.removeClass("fancybox-active compensate-for-scrollbar"),
                n("#fancybox-style-noscroll").remove())
            },
            trigger: function(t, e) {
                var i, o = Array.prototype.slice.call(arguments, 1), s = this, a = e && e.opts ? e : s.current;
                return a ? o.unshift(a) : a = s,
                o.unshift(s),
                n.isFunction(a.opts[t]) && (i = a.opts[t].apply(a, o)),
                !1 === i ? i : void ("afterClose" !== t && s.$refs ? s.$refs.container.trigger(t + ".fb", o) : r.trigger(t + ".fb", o))
            },
            updateControls: function(t) {
                var e = this
                  , n = e.current
                  , i = n.index
                  , o = n.opts.caption
                  , s = e.$refs.container
                  , a = e.$refs.caption;
                n.$slide.trigger("refresh"),
                e.$caption = o && o.length ? a.html(o) : null,
                e.isHiddenControls || e.isIdle || e.showControls(),
                s.find("[data-fancybox-count]").html(e.group.length),
                s.find("[data-fancybox-index]").html(i + 1),
                s.find("[data-fancybox-prev]").toggleClass("disabled", !n.opts.loop && i <= 0),
                s.find("[data-fancybox-next]").toggleClass("disabled", !n.opts.loop && i >= e.group.length - 1),
                "image" === n.type ? s.find("[data-fancybox-zoom]").show().end().find("[data-fancybox-download]").attr("href", n.opts.image.src || n.src).show() : n.opts.toolbar && s.find("[data-fancybox-download],[data-fancybox-zoom]").hide()
            },
            hideControls: function() {
                this.isHiddenControls = !0,
                this.$refs.container.removeClass("fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav")
            },
            showControls: function() {
                var t = this
                  , e = t.current ? t.current.opts : t.opts
                  , n = t.$refs.container;
                t.isHiddenControls = !1,
                t.idleSecondsCounter = 0,
                n.toggleClass("fancybox-show-toolbar", !(!e.toolbar || !e.buttons)).toggleClass("fancybox-show-infobar", !!(e.infobar && t.group.length > 1)).toggleClass("fancybox-show-nav", !!(e.arrows && t.group.length > 1)).toggleClass("fancybox-is-modal", !!e.modal),
                t.$caption ? n.addClass("fancybox-show-caption ") : n.removeClass("fancybox-show-caption")
            },
            toggleControls: function() {
                this.isHiddenControls ? this.showControls() : this.hideControls()
            }
        }),
        n.fancybox = {
            version: "3.3.5",
            defaults: s,
            getInstance: function(t) {
                var e = n('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox")
                  , i = Array.prototype.slice.call(arguments, 1);
                return e instanceof h && ("string" === n.type(t) ? e[t].apply(e, i) : "function" === n.type(t) && t.apply(e, i),
                e)
            },
            open: function(t, e, n) {
                return new h(t,e,n)
            },
            close: function(t) {
                var e = this.getInstance();
                e && (e.close(),
                !0 === t && this.close())
            },
            destroy: function() {
                this.close(!0),
                r.add("body").off("click.fb-start", "**")
            },
            isMobile: e.createTouch !== i && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            use3d: function() {
                var n = e.createElement("div");
                return t.getComputedStyle && t.getComputedStyle(n) && t.getComputedStyle(n).getPropertyValue("transform") && !(e.documentMode && e.documentMode < 11)
            }(),
            getTranslate: function(t) {
                var e;
                return !(!t || !t.length) && {
                    top: (e = t[0].getBoundingClientRect()).top || 0,
                    left: e.left || 0,
                    width: e.width,
                    height: e.height,
                    opacity: parseFloat(t.css("opacity"))
                }
            },
            setTranslate: function(t, e) {
                var n = ""
                  , o = {};
                if (t && e)
                    return e.left === i && e.top === i || (n = (e.left === i ? t.position().left : e.left) + "px, " + (e.top === i ? t.position().top : e.top) + "px",
                    n = this.use3d ? "translate3d(" + n + ", 0px)" : "translate(" + n + ")"),
                    e.scaleX !== i && e.scaleY !== i && (n = (n.length ? n + " " : "") + "scale(" + e.scaleX + ", " + e.scaleY + ")"),
                    n.length && (o.transform = n),
                    e.opacity !== i && (o.opacity = e.opacity),
                    e.width !== i && (o.width = e.width),
                    e.height !== i && (o.height = e.height),
                    t.css(o)
            },
            animate: function(t, e, o, s, a) {
                var r = !1;
                n.isFunction(o) && (s = o,
                o = null),
                n.isPlainObject(e) || t.removeAttr("style"),
                n.fancybox.stop(t),
                t.on(d, (function(i) {
                    (!i || !i.originalEvent || t.is(i.originalEvent.target) && "z-index" != i.originalEvent.propertyName) && (n.fancybox.stop(t),
                    r && n.fancybox.setTranslate(t, r),
                    n.isPlainObject(e) ? !1 === a && t.removeAttr("style") : !0 !== a && t.removeClass(e),
                    n.isFunction(s) && s(i))
                }
                )),
                n.isNumeric(o) && t.css("transition-duration", o + "ms"),
                n.isPlainObject(e) ? (e.scaleX !== i && e.scaleY !== i && (r = n.extend({}, e, {
                    width: t.width() * e.scaleX,
                    height: t.height() * e.scaleY,
                    scaleX: 1,
                    scaleY: 1
                }),
                delete e.width,
                delete e.height,
                t.parent().hasClass("fancybox-slide--image") && t.parent().addClass("fancybox-is-scaling")),
                n.fancybox.setTranslate(t, e)) : t.addClass(e),
                t.data("timer", setTimeout((function() {
                    t.trigger("transitionend")
                }
                ), o + 16))
            },
            stop: function(t) {
                t && t.length && (clearTimeout(t.data("timer")),
                t.off("transitionend").css("transition-duration", ""),
                t.parent().removeClass("fancybox-is-scaling"))
            }
        },
        n.fn.fancybox = function(t) {
            var e;
            return (e = (t = t || {}).selector || !1) ? n("body").off("click.fb-start", e).on("click.fb-start", e, {
                options: t
            }, o) : this.off("click.fb-start").on("click.fb-start", {
                items: this,
                options: t
            }, o),
            this
        }
        ,
        r.on("click.fb-start", "[data-fancybox]", o),
        r.on("click.fb-start", "[data-trigger]", (function(t) {
            o(t, {
                $target: n('[data-fancybox="' + n(t.currentTarget).attr("data-trigger") + '"]').eq(n(t.currentTarget).attr("data-index") || 0),
                $trigger: n(this)
            })
        }
        ))
    }
}(window, document, window.jQuery || jQuery),
function(t) {
    "use strict";
    var e = function(e, n, i) {
        if (e)
            return i = i || "",
            "object" === t.type(i) && (i = t.param(i, !0)),
            t.each(n, (function(t, n) {
                e = e.replace("$" + t, n || "")
            }
            )),
            i.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + i),
            e
    }
      , n = {
        youtube: {
            matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
            params: {
                autoplay: 1,
                autohide: 1,
                fs: 1,
                rel: 0,
                hd: 1,
                wmode: "transparent",
                enablejsapi: 1,
                html5: 1
            },
            paramPlace: 8,
            type: "iframe",
            url: "//www.youtube.com/embed/$4",
            thumb: "//img.youtube.com/vi/$4/hqdefault.jpg"
        },
        vimeo: {
            matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
            params: {
                autoplay: 1,
                hd: 1,
                show_title: 1,
                show_byline: 1,
                show_portrait: 0,
                fullscreen: 1,
                api: 1
            },
            paramPlace: 3,
            type: "iframe",
            url: "//player.vimeo.com/video/$2"
        },
        instagram: {
            matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
            type: "image",
            url: "//$1/p/$2/media/?size=l"
        },
        gmap_place: {
            matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
            type: "iframe",
            url: function(t) {
                return "//maps.google." + t[2] + "/?ll=" + (t[9] ? t[9] + "&z=" + Math.floor(t[10]) + (t[12] ? t[12].replace(/^\//, "&") : "") : t[12] + "").replace(/\?/, "&") + "&output=" + (t[12] && t[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
            }
        },
        gmap_search: {
            matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
            type: "iframe",
            url: function(t) {
                return "//maps.google." + t[2] + "/maps?q=" + t[5].replace("query=", "q=").replace("api=1", "") + "&output=embed"
            }
        }
    };
    t(document).on("objectNeedsType.fb", (function(i, o, s) {
        var a, r, l, c, d, u, p, h = s.src || "", f = !1;
        a = t.extend(!0, {}, n, s.opts.media),
        t.each(a, (function(n, i) {
            if (l = h.match(i.matcher)) {
                if (f = i.type,
                p = n,
                u = {},
                i.paramPlace && l[i.paramPlace]) {
                    "?" == (d = l[i.paramPlace])[0] && (d = d.substring(1)),
                    d = d.split("&");
                    for (var o = 0; o < d.length; ++o) {
                        var a = d[o].split("=", 2);
                        2 == a.length && (u[a[0]] = decodeURIComponent(a[1].replace(/\+/g, " ")))
                    }
                }
                return c = t.extend(!0, {}, i.params, s.opts[n], u),
                h = "function" === t.type(i.url) ? i.url.call(this, l, c, s) : e(i.url, l, c),
                r = "function" === t.type(i.thumb) ? i.thumb.call(this, l, c, s) : e(i.thumb, l),
                "youtube" === n ? h = h.replace(/&t=((\d+)m)?(\d+)s/, (function(t, e, n, i) {
                    return "&start=" + ((n ? 60 * parseInt(n, 10) : 0) + parseInt(i, 10))
                }
                )) : "vimeo" === n && (h = h.replace("&%23", "#")),
                !1
            }
        }
        )),
        f ? (s.opts.thumb || s.opts.$thumb && s.opts.$thumb.length || (s.opts.thumb = r),
        "iframe" === f && (s.opts = t.extend(!0, s.opts, {
            iframe: {
                preload: !1,
                attr: {
                    scrolling: "no"
                }
            }
        })),
        t.extend(s, {
            type: f,
            src: h,
            origSrc: s.src,
            contentSource: p,
            contentType: "image" === f ? "image" : "gmap_place" == p || "gmap_search" == p ? "map" : "video"
        })) : h && (s.type = s.opts.defaultType)
    }
    ))
}(window.jQuery || jQuery),
function(t, e, n) {
    "use strict";
    var i = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function(e) {
        return t.setTimeout(e, 1e3 / 60)
    }
      , o = t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t.oCancelAnimationFrame || function(e) {
        t.clearTimeout(e)
    }
      , s = function(e) {
        var n = [];
        for (var i in e = (e = e.originalEvent || e || t.e).touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e])
            e[i].pageX ? n.push({
                x: e[i].pageX,
                y: e[i].pageY
            }) : e[i].clientX && n.push({
                x: e[i].clientX,
                y: e[i].clientY
            });
        return n
    }
      , a = function(t, e, n) {
        return e && t ? "x" === n ? t.x - e.x : "y" === n ? t.y - e.y : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)) : 0
    }
      , r = function(t) {
        if (t.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio') || n.isFunction(t.get(0).onclick) || t.data("selectable"))
            return !0;
        for (var e = 0, i = t[0].attributes, o = i.length; e < o; e++)
            if ("data-fancybox-" === i[e].nodeName.substr(0, 14))
                return !0;
        return !1
    }
      , l = function(e) {
        var n = t.getComputedStyle(e)["overflow-y"]
          , i = t.getComputedStyle(e)["overflow-x"]
          , o = ("scroll" === n || "auto" === n) && e.scrollHeight > e.clientHeight
          , s = ("scroll" === i || "auto" === i) && e.scrollWidth > e.clientWidth;
        return o || s
    }
      , c = function(t) {
        for (var e = !1; !(e = l(t.get(0))) && ((t = t.parent()).length && !t.hasClass("fancybox-stage") && !t.is("body")); )
            ;
        return e
    }
      , d = function(t) {
        var e = this;
        e.instance = t,
        e.$bg = t.$refs.bg,
        e.$stage = t.$refs.stage,
        e.$container = t.$refs.container,
        e.destroy(),
        e.$container.on("touchstart.fb.touch mousedown.fb.touch", n.proxy(e, "ontouchstart"))
    };
    d.prototype.destroy = function() {
        this.$container.off(".fb.touch")
    }
    ,
    d.prototype.ontouchstart = function(i) {
        var o = this
          , l = n(i.target)
          , d = o.instance
          , u = d.current
          , p = u.$content
          , h = "touchstart" == i.type;
        if (h && o.$container.off("mousedown.fb.touch"),
        (!i.originalEvent || 2 != i.originalEvent.button) && l.length && !r(l) && !r(l.parent()) && (l.is("img") || !(i.originalEvent.clientX > l[0].clientWidth + l.offset().left))) {
            if (!u || d.isAnimating || d.isClosing)
                return i.stopPropagation(),
                void i.preventDefault();
            if (o.realPoints = o.startPoints = s(i),
            o.startPoints.length) {
                if (i.stopPropagation(),
                o.startEvent = i,
                o.canTap = !0,
                o.$target = l,
                o.$content = p,
                o.opts = u.opts.touch,
                o.isPanning = !1,
                o.isSwiping = !1,
                o.isZooming = !1,
                o.isScrolling = !1,
                o.startTime = (new Date).getTime(),
                o.distanceX = o.distanceY = o.distance = 0,
                o.canvasWidth = Math.round(u.$slide[0].clientWidth),
                o.canvasHeight = Math.round(u.$slide[0].clientHeight),
                o.contentLastPos = null,
                o.contentStartPos = n.fancybox.getTranslate(o.$content) || {
                    top: 0,
                    left: 0
                },
                o.sliderStartPos = o.sliderLastPos || n.fancybox.getTranslate(u.$slide),
                o.stagePos = n.fancybox.getTranslate(d.$refs.stage),
                o.sliderStartPos.top -= o.stagePos.top,
                o.sliderStartPos.left -= o.stagePos.left,
                o.contentStartPos.top -= o.stagePos.top,
                o.contentStartPos.left -= o.stagePos.left,
                n(e).off(".fb.touch").on(h ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", n.proxy(o, "ontouchend")).on(h ? "touchmove.fb.touch" : "mousemove.fb.touch", n.proxy(o, "ontouchmove")),
                n.fancybox.isMobile && e.addEventListener("scroll", o.onscroll, !0),
                !o.opts && !d.canPan() || !l.is(o.$stage) && !o.$stage.find(l).length)
                    return void (l.is(".fancybox-image") && i.preventDefault());
                n.fancybox.isMobile && (c(l) || c(l.parent())) || i.preventDefault(),
                (1 === o.startPoints.length || u.hasError) && (o.instance.canPan() ? (n.fancybox.stop(o.$content),
                o.$content.css("transition-duration", ""),
                o.isPanning = !0) : o.isSwiping = !0,
                o.$container.addClass("fancybox-controls--isGrabbing")),
                2 === o.startPoints.length && "image" === u.type && (u.isLoaded || u.$ghost) && (o.canTap = !1,
                o.isSwiping = !1,
                o.isPanning = !1,
                o.isZooming = !0,
                n.fancybox.stop(o.$content),
                o.$content.css("transition-duration", ""),
                o.centerPointStartX = .5 * (o.startPoints[0].x + o.startPoints[1].x) - n(t).scrollLeft(),
                o.centerPointStartY = .5 * (o.startPoints[0].y + o.startPoints[1].y) - n(t).scrollTop(),
                o.percentageOfImageAtPinchPointX = (o.centerPointStartX - o.contentStartPos.left) / o.contentStartPos.width,
                o.percentageOfImageAtPinchPointY = (o.centerPointStartY - o.contentStartPos.top) / o.contentStartPos.height,
                o.startDistanceBetweenFingers = a(o.startPoints[0], o.startPoints[1]))
            }
        }
    }
    ,
    d.prototype.onscroll = function(t) {
        this.isScrolling = !0,
        e.removeEventListener("scroll", this.onscroll, !0)
    }
    ,
    d.prototype.ontouchmove = function(t) {
        var e = this
          , i = n(t.target);
        return void 0 !== t.originalEvent.buttons && 0 === t.originalEvent.buttons ? void e.ontouchend(t) : e.isScrolling || !i.is(e.$stage) && !e.$stage.find(i).length ? void (e.canTap = !1) : (e.newPoints = s(t),
        void ((e.opts || e.instance.canPan()) && e.newPoints.length && e.newPoints.length && (e.isSwiping && !0 === e.isSwiping || t.preventDefault(),
        e.distanceX = a(e.newPoints[0], e.startPoints[0], "x"),
        e.distanceY = a(e.newPoints[0], e.startPoints[0], "y"),
        e.distance = a(e.newPoints[0], e.startPoints[0]),
        e.distance > 0 && (e.isSwiping ? e.onSwipe(t) : e.isPanning ? e.onPan() : e.isZooming && e.onZoom()))))
    }
    ,
    d.prototype.onSwipe = function(e) {
        var s, a = this, r = a.isSwiping, l = a.sliderStartPos.left || 0;
        if (!0 !== r)
            "x" == r && (a.distanceX > 0 && (a.instance.group.length < 2 || 0 === a.instance.current.index && !a.instance.current.opts.loop) ? l += Math.pow(a.distanceX, .8) : a.distanceX < 0 && (a.instance.group.length < 2 || a.instance.current.index === a.instance.group.length - 1 && !a.instance.current.opts.loop) ? l -= Math.pow(-a.distanceX, .8) : l += a.distanceX),
            a.sliderLastPos = {
                top: "x" == r ? 0 : a.sliderStartPos.top + a.distanceY,
                left: l
            },
            a.requestId && (o(a.requestId),
            a.requestId = null),
            a.requestId = i((function() {
                a.sliderLastPos && (n.each(a.instance.slides, (function(t, e) {
                    var i = e.pos - a.instance.currPos;
                    n.fancybox.setTranslate(e.$slide, {
                        top: a.sliderLastPos.top,
                        left: a.sliderLastPos.left + i * a.canvasWidth + i * e.opts.gutter
                    })
                }
                )),
                a.$container.addClass("fancybox-is-sliding"))
            }
            ));
        else if (Math.abs(a.distance) > 10) {
            if (a.canTap = !1,
            a.instance.group.length < 2 && a.opts.vertical ? a.isSwiping = "y" : a.instance.isDragging || !1 === a.opts.vertical || "auto" === a.opts.vertical && n(t).width() > 800 ? a.isSwiping = "x" : (s = Math.abs(180 * Math.atan2(a.distanceY, a.distanceX) / Math.PI),
            a.isSwiping = s > 45 && s < 135 ? "y" : "x"),
            a.canTap = !1,
            "y" === a.isSwiping && n.fancybox.isMobile && (c(a.$target) || c(a.$target.parent())))
                return void (a.isScrolling = !0);
            a.instance.isDragging = a.isSwiping,
            a.startPoints = a.newPoints,
            n.each(a.instance.slides, (function(t, e) {
                n.fancybox.stop(e.$slide),
                e.$slide.css("transition-duration", ""),
                e.inTransition = !1,
                e.pos === a.instance.current.pos && (a.sliderStartPos.left = n.fancybox.getTranslate(e.$slide).left - n.fancybox.getTranslate(a.instance.$refs.stage).left)
            }
            )),
            a.instance.SlideShow && a.instance.SlideShow.isActive && a.instance.SlideShow.stop()
        }
    }
    ,
    d.prototype.onPan = function() {
        var t = this;
        return a(t.newPoints[0], t.realPoints[0]) < (n.fancybox.isMobile ? 10 : 5) ? void (t.startPoints = t.newPoints) : (t.canTap = !1,
        t.contentLastPos = t.limitMovement(),
        t.requestId && (o(t.requestId),
        t.requestId = null),
        void (t.requestId = i((function() {
            n.fancybox.setTranslate(t.$content, t.contentLastPos)
        }
        ))))
    }
    ,
    d.prototype.limitMovement = function() {
        var t, e, n, i, o, s, a = this, r = a.canvasWidth, l = a.canvasHeight, c = a.distanceX, d = a.distanceY, u = a.contentStartPos, p = u.left, h = u.top, f = u.width, g = u.height;
        return o = f > r ? p + c : p,
        s = h + d,
        t = Math.max(0, .5 * r - .5 * f),
        e = Math.max(0, .5 * l - .5 * g),
        n = Math.min(r - f, .5 * r - .5 * f),
        i = Math.min(l - g, .5 * l - .5 * g),
        c > 0 && o > t && (o = t - 1 + Math.pow(-t + p + c, .8) || 0),
        c < 0 && o < n && (o = n + 1 - Math.pow(n - p - c, .8) || 0),
        d > 0 && s > e && (s = e - 1 + Math.pow(-e + h + d, .8) || 0),
        d < 0 && s < i && (s = i + 1 - Math.pow(i - h - d, .8) || 0),
        {
            top: s,
            left: o
        }
    }
    ,
    d.prototype.limitPosition = function(t, e, n, i) {
        var o = this.canvasWidth
          , s = this.canvasHeight;
        return n > o ? t = (t = t > 0 ? 0 : t) < o - n ? o - n : t : t = Math.max(0, o / 2 - n / 2),
        i > s ? e = (e = e > 0 ? 0 : e) < s - i ? s - i : e : e = Math.max(0, s / 2 - i / 2),
        {
            top: e,
            left: t
        }
    }
    ,
    d.prototype.onZoom = function() {
        var e = this
          , s = e.contentStartPos
          , r = s.width
          , l = s.height
          , c = s.left
          , d = s.top
          , u = a(e.newPoints[0], e.newPoints[1]) / e.startDistanceBetweenFingers
          , p = Math.floor(r * u)
          , h = Math.floor(l * u)
          , f = (r - p) * e.percentageOfImageAtPinchPointX
          , g = (l - h) * e.percentageOfImageAtPinchPointY
          , m = (e.newPoints[0].x + e.newPoints[1].x) / 2 - n(t).scrollLeft()
          , v = (e.newPoints[0].y + e.newPoints[1].y) / 2 - n(t).scrollTop()
          , b = m - e.centerPointStartX
          , y = {
            top: d + (g + (v - e.centerPointStartY)),
            left: c + (f + b),
            scaleX: u,
            scaleY: u
        };
        e.canTap = !1,
        e.newWidth = p,
        e.newHeight = h,
        e.contentLastPos = y,
        e.requestId && (o(e.requestId),
        e.requestId = null),
        e.requestId = i((function() {
            n.fancybox.setTranslate(e.$content, e.contentLastPos)
        }
        ))
    }
    ,
    d.prototype.ontouchend = function(t) {
        var i = this
          , a = Math.max((new Date).getTime() - i.startTime, 1)
          , r = i.isSwiping
          , l = i.isPanning
          , c = i.isZooming
          , d = i.isScrolling;
        return i.endPoints = s(t),
        i.$container.removeClass("fancybox-controls--isGrabbing"),
        n(e).off(".fb.touch"),
        e.removeEventListener("scroll", i.onscroll, !0),
        i.requestId && (o(i.requestId),
        i.requestId = null),
        i.isSwiping = !1,
        i.isPanning = !1,
        i.isZooming = !1,
        i.isScrolling = !1,
        i.instance.isDragging = !1,
        i.canTap ? i.onTap(t) : (i.speed = 366,
        i.velocityX = i.distanceX / a * .5,
        i.velocityY = i.distanceY / a * .5,
        i.speedX = Math.max(.5 * i.speed, Math.min(1.5 * i.speed, 1 / Math.abs(i.velocityX) * i.speed)),
        void (l ? i.endPanning() : c ? i.endZooming() : i.endSwiping(r, d)))
    }
    ,
    d.prototype.endSwiping = function(t, e) {
        var i = this
          , o = !1
          , s = i.instance.group.length;
        i.sliderLastPos = null,
        "y" == t && !e && Math.abs(i.distanceY) > 50 ? (n.fancybox.animate(i.instance.current.$slide, {
            top: i.sliderStartPos.top + i.distanceY + 150 * i.velocityY,
            opacity: 0
        }, 200),
        o = i.instance.close(!0, 200)) : "x" == t && i.distanceX > 50 && s > 1 ? o = i.instance.previous(i.speedX) : "x" == t && i.distanceX < -50 && s > 1 && (o = i.instance.next(i.speedX)),
        !1 !== o || "x" != t && "y" != t || (e || s < 2 ? i.instance.centerSlide(i.instance.current, 150) : i.instance.jumpTo(i.instance.current.index)),
        i.$container.removeClass("fancybox-is-sliding")
    }
    ,
    d.prototype.endPanning = function() {
        var t, e, i, o = this;
        o.contentLastPos && (!1 === o.opts.momentum ? (t = o.contentLastPos.left,
        e = o.contentLastPos.top) : (t = o.contentLastPos.left + o.velocityX * o.speed,
        e = o.contentLastPos.top + o.velocityY * o.speed),
        (i = o.limitPosition(t, e, o.contentStartPos.width, o.contentStartPos.height)).width = o.contentStartPos.width,
        i.height = o.contentStartPos.height,
        n.fancybox.animate(o.$content, i, 330))
    }
    ,
    d.prototype.endZooming = function() {
        var t, e, i, o, s = this, a = s.instance.current, r = s.newWidth, l = s.newHeight;
        s.contentLastPos && (t = s.contentLastPos.left,
        o = {
            top: e = s.contentLastPos.top,
            left: t,
            width: r,
            height: l,
            scaleX: 1,
            scaleY: 1
        },
        n.fancybox.setTranslate(s.$content, o),
        r < s.canvasWidth && l < s.canvasHeight ? s.instance.scaleToFit(150) : r > a.width || l > a.height ? s.instance.scaleToActual(s.centerPointStartX, s.centerPointStartY, 150) : (i = s.limitPosition(t, e, r, l),
        n.fancybox.setTranslate(s.$content, n.fancybox.getTranslate(s.$content)),
        n.fancybox.animate(s.$content, i, 150)))
    }
    ,
    d.prototype.onTap = function(e) {
        var i, o = this, a = n(e.target), r = o.instance, l = r.current, c = e && s(e) || o.startPoints, d = c[0] ? c[0].x - n(t).scrollLeft() - o.stagePos.left : 0, u = c[0] ? c[0].y - n(t).scrollTop() - o.stagePos.top : 0, p = function(t) {
            var i = l.opts[t];
            if (n.isFunction(i) && (i = i.apply(r, [l, e])),
            i)
                switch (i) {
                case "close":
                    r.close(o.startEvent);
                    break;
                case "toggleControls":
                    r.toggleControls(!0);
                    break;
                case "next":
                    r.next();
                    break;
                case "nextOrClose":
                    r.group.length > 1 ? r.next() : r.close(o.startEvent);
                    break;
                case "zoom":
                    "image" == l.type && (l.isLoaded || l.$ghost) && (r.canPan() ? r.scaleToFit() : r.isScaledDown() ? r.scaleToActual(d, u) : r.group.length < 2 && r.close(o.startEvent))
                }
        };
        if ((!e.originalEvent || 2 != e.originalEvent.button) && (a.is("img") || !(d > a[0].clientWidth + a.offset().left))) {
            if (a.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container"))
                i = "Outside";
            else if (a.is(".fancybox-slide"))
                i = "Slide";
            else {
                if (!r.current.$content || !r.current.$content.find(a).addBack().filter(a).length)
                    return;
                i = "Content"
            }
            if (o.tapped) {
                if (clearTimeout(o.tapped),
                o.tapped = null,
                Math.abs(d - o.tapX) > 50 || Math.abs(u - o.tapY) > 50)
                    return this;
                p("dblclick" + i)
            } else
                o.tapX = d,
                o.tapY = u,
                l.opts["dblclick" + i] && l.opts["dblclick" + i] !== l.opts["click" + i] ? o.tapped = setTimeout((function() {
                    o.tapped = null,
                    p("click" + i)
                }
                ), 500) : p("click" + i);
            return this
        }
    }
    ,
    n(e).on("onActivate.fb", (function(t, e) {
        e && !e.Guestures && (e.Guestures = new d(e))
    }
    ))
}(window, document, window.jQuery || jQuery),
function(t, e) {
    "use strict";
    e.extend(!0, e.fancybox.defaults, {
        btnTpl: {
            slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg viewBox="0 0 40 40"><path d="M13,12 L27,20 L13,27 Z" /><path d="M15,10 v19 M23,10 v19" /></svg></button>'
        },
        slideShow: {
            autoStart: !1,
            speed: 3e3
        }
    });
    var n = function(t) {
        this.instance = t,
        this.init()
    };
    e.extend(n.prototype, {
        timer: null,
        isActive: !1,
        $button: null,
        init: function() {
            var t = this;
            t.$button = t.instance.$refs.toolbar.find("[data-fancybox-play]").on("click", (function() {
                t.toggle()
            }
            )),
            (t.instance.group.length < 2 || !t.instance.group[t.instance.currIndex].opts.slideShow) && t.$button.hide()
        },
        set: function(t) {
            var e = this;
            e.instance && e.instance.current && (!0 === t || e.instance.current.opts.loop || e.instance.currIndex < e.instance.group.length - 1) ? e.timer = setTimeout((function() {
                e.isActive && e.instance.jumpTo((e.instance.currIndex + 1) % e.instance.group.length)
            }
            ), e.instance.current.opts.slideShow.speed) : (e.stop(),
            e.instance.idleSecondsCounter = 0,
            e.instance.showControls())
        },
        clear: function() {
            clearTimeout(this.timer),
            this.timer = null
        },
        start: function() {
            var t = this
              , e = t.instance.current;
            e && (t.isActive = !0,
            t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"),
            t.set(!0))
        },
        stop: function() {
            var t = this
              , e = t.instance.current;
            t.clear(),
            t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"),
            t.isActive = !1
        },
        toggle: function() {
            var t = this;
            t.isActive ? t.stop() : t.start()
        }
    }),
    e(t).on({
        "onInit.fb": function(t, e) {
            e && !e.SlideShow && (e.SlideShow = new n(e))
        },
        "beforeShow.fb": function(t, e, n, i) {
            var o = e && e.SlideShow;
            i ? o && n.opts.slideShow.autoStart && o.start() : o && o.isActive && o.clear()
        },
        "afterShow.fb": function(t, e, n) {
            var i = e && e.SlideShow;
            i && i.isActive && i.set()
        },
        "afterKeydown.fb": function(n, i, o, s, a) {
            var r = i && i.SlideShow;
            !r || !o.opts.slideShow || 80 !== a && 32 !== a || e(t.activeElement).is("button,a,input") || (s.preventDefault(),
            r.toggle())
        },
        "beforeClose.fb onDeactivate.fb": function(t, e) {
            var n = e && e.SlideShow;
            n && n.stop()
        }
    }),
    e(t).on("visibilitychange", (function() {
        var n = e.fancybox.getInstance()
          , i = n && n.SlideShow;
        i && i.isActive && (t.hidden ? i.clear() : i.set())
    }
    ))
}(document, window.jQuery || jQuery),
function(t, e) {
    "use strict";
    var n = function() {
        for (var e = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]], n = {}, i = 0; i < e.length; i++) {
            var o = e[i];
            if (o && o[1]in t) {
                for (var s = 0; s < o.length; s++)
                    n[e[0][s]] = o[s];
                return n
            }
        }
        return !1
    }();
    if (n) {
        var i = {
            request: function(e) {
                (e = e || t.documentElement)[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT)
            },
            exit: function() {
                t[n.exitFullscreen]()
            },
            toggle: function(e) {
                e = e || t.documentElement,
                this.isFullscreen() ? this.exit() : this.request(e)
            },
            isFullscreen: function() {
                return Boolean(t[n.fullscreenElement])
            },
            enabled: function() {
                return Boolean(t[n.fullscreenEnabled])
            }
        };
        e.extend(!0, e.fancybox.defaults, {
            btnTpl: {
                fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}"><svg viewBox="0 0 40 40"><path d="M9,12 v16 h22 v-16 h-22 v8" /></svg></button>'
            },
            fullScreen: {
                autoStart: !1
            }
        }),
        e(t).on({
            "onInit.fb": function(t, e) {
                e && e.group[e.currIndex].opts.fullScreen ? (e.$refs.container.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", (function(t) {
                    t.stopPropagation(),
                    t.preventDefault(),
                    i.toggle()
                }
                )),
                e.opts.fullScreen && !0 === e.opts.fullScreen.autoStart && i.request(),
                e.FullScreen = i) : e && e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide()
            },
            "afterKeydown.fb": function(t, e, n, i, o) {
                e && e.FullScreen && 70 === o && (i.preventDefault(),
                e.FullScreen.toggle())
            },
            "beforeClose.fb": function(t, e) {
                e && e.FullScreen && e.$refs.container.hasClass("fancybox-is-fullscreen") && i.exit()
            }
        }),
        e(t).on(n.fullscreenchange, (function() {
            var t = i.isFullscreen()
              , n = e.fancybox.getInstance();
            n && (n.current && "image" === n.current.type && n.isAnimating && (n.current.$content.css("transition", "none"),
            n.isAnimating = !1,
            n.update(!0, !0, 0)),
            n.trigger("onFullscreenChange", t),
            n.$refs.container.toggleClass("fancybox-is-fullscreen", t))
        }
        ))
    } else
        e && e.fancybox && (e.fancybox.defaults.btnTpl.fullScreen = !1)
}(document, window.jQuery || jQuery),
function(t, e) {
    "use strict";
    var n = "fancybox-thumbs"
      , i = n + "-active";
    e.fancybox.defaults = e.extend(!0, {
        btnTpl: {
            thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg viewBox="0 0 120 120"><path d="M30,30 h14 v14 h-14 Z M50,30 h14 v14 h-14 Z M70,30 h14 v14 h-14 Z M30,50 h14 v14 h-14 Z M50,50 h14 v14 h-14 Z M70,50 h14 v14 h-14 Z M30,70 h14 v14 h-14 Z M50,70 h14 v14 h-14 Z M70,70 h14 v14 h-14 Z" /></svg></button>'
        },
        thumbs: {
            autoStart: !1,
            hideOnClose: !0,
            parentEl: ".fancybox-container",
            axis: "y"
        }
    }, e.fancybox.defaults);
    var o = function(t) {
        this.init(t)
    };
    e.extend(o.prototype, {
        $button: null,
        $grid: null,
        $list: null,
        isVisible: !1,
        isActive: !1,
        init: function(t) {
            var e, n, i = this;
            i.instance = t,
            t.Thumbs = i,
            i.opts = t.group[t.currIndex].opts.thumbs,
            e = (e = t.group[0]).opts.thumb || !(!e.opts.$thumb || !e.opts.$thumb.length) && e.opts.$thumb.attr("src"),
            t.group.length > 1 && (n = (n = t.group[1]).opts.thumb || !(!n.opts.$thumb || !n.opts.$thumb.length) && n.opts.$thumb.attr("src")),
            i.$button = t.$refs.toolbar.find("[data-fancybox-thumbs]"),
            i.opts && e && n && e && n ? (i.$button.show().on("click", (function() {
                i.toggle()
            }
            )),
            i.isActive = !0) : i.$button.hide()
        },
        create: function() {
            var t, i = this, o = i.instance, s = i.opts.parentEl, a = [];
            i.$grid || (i.$grid = e('<div class="' + n + " " + n + "-" + i.opts.axis + '"></div>').appendTo(o.$refs.container.find(s).addBack().filter(s)),
            i.$grid.on("click", "li", (function() {
                o.jumpTo(e(this).attr("data-index"))
            }
            ))),
            i.$list || (i.$list = e("<ul>").appendTo(i.$grid)),
            e.each(o.group, (function(e, n) {
                (t = n.opts.thumb || (n.opts.$thumb ? n.opts.$thumb.attr("src") : null)) || "image" !== n.type || (t = n.src),
                a.push('<li data-index="' + e + '" tabindex="0" class="fancybox-thumbs-loading"' + (t && t.length ? ' style="background-image:url(' + t + ')" />' : "") + "></li>")
            }
            )),
            i.$list[0].innerHTML = a.join(""),
            "x" === i.opts.axis && i.$list.width(parseInt(i.$grid.css("padding-right"), 10) + o.group.length * i.$list.children().eq(0).outerWidth(!0))
        },
        focus: function(t) {
            var e, n, o = this, s = o.$list, a = o.$grid;
            o.instance.current && (n = (e = s.children().removeClass(i).filter('[data-index="' + o.instance.current.index + '"]').addClass(i)).position(),
            "y" === o.opts.axis && (n.top < 0 || n.top > s.height() - e.outerHeight()) ? s.stop().animate({
                scrollTop: s.scrollTop() + n.top
            }, t) : "x" === o.opts.axis && (n.left < a.scrollLeft() || n.left > a.scrollLeft() + (a.width() - e.outerWidth())) && s.parent().stop().animate({
                scrollLeft: n.left
            }, t))
        },
        update: function() {
            var t = this;
            t.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible),
            t.isVisible ? (t.$grid || t.create(),
            t.instance.trigger("onThumbsShow"),
            t.focus(0)) : t.$grid && t.instance.trigger("onThumbsHide"),
            t.instance.update()
        },
        hide: function() {
            this.isVisible = !1,
            this.update()
        },
        show: function() {
            this.isVisible = !0,
            this.update()
        },
        toggle: function() {
            this.isVisible = !this.isVisible,
            this.update()
        }
    }),
    e(t).on({
        "onInit.fb": function(t, e) {
            var n;
            e && !e.Thumbs && ((n = new o(e)).isActive && !0 === n.opts.autoStart && n.show())
        },
        "beforeShow.fb": function(t, e, n, i) {
            var o = e && e.Thumbs;
            o && o.isVisible && o.focus(i ? 0 : 250)
        },
        "afterKeydown.fb": function(t, e, n, i, o) {
            var s = e && e.Thumbs;
            s && s.isActive && 71 === o && (i.preventDefault(),
            s.toggle())
        },
        "beforeClose.fb": function(t, e) {
            var n = e && e.Thumbs;
            n && n.isVisible && !1 !== n.opts.hideOnClose && n.$grid.hide()
        }
    })
}(document, window.jQuery || jQuery),
function(t, e) {
    "use strict";
    e.extend(!0, e.fancybox.defaults, {
        btnTpl: {
            share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg viewBox="0 0 40 40"><path d="M6,30 C8,18 19,16 23,16 L23,16 L23,10 L33,20 L23,29 L23,24 C19,24 8,27 6,30 Z"></svg></button>'
        },
        share: {
            url: function(t, e) {
                return !t.currentHash && "inline" !== e.type && "html" !== e.type && (e.origSrc || e.src) || window.location
            },
            tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" /></p></div>'
        }
    }),
    e(t).on("click", "[data-fancybox-share]", (function() {
        var t, n, i = e.fancybox.getInstance(), o = i.current || null;
        o && ("function" === e.type(o.opts.share.url) && (t = o.opts.share.url.apply(o, [i, o])),
        n = o.opts.share.tpl.replace(/\{\{media\}\}/g, "image" === o.type ? encodeURIComponent(o.src) : "").replace(/\{\{url\}\}/g, encodeURIComponent(t)).replace(/\{\{url_raw\}\}/g, function(t) {
            var e = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "/": "&#x2F;",
                "`": "&#x60;",
                "=": "&#x3D;"
            };
            return String(t).replace(/[&<>"'`=\/]/g, (function(t) {
                return e[t]
            }
            ))
        }(t)).replace(/\{\{descr\}\}/g, i.$caption ? encodeURIComponent(i.$caption.text()) : ""),
        e.fancybox.open({
            src: i.translate(i, n),
            type: "html",
            opts: {
                animationEffect: !1,
                afterLoad: function(t, e) {
                    i.$refs.container.one("beforeClose.fb", (function() {
                        t.close(null, 0)
                    }
                    )),
                    e.$content.find(".fancybox-share__links a").click((function() {
                        return window.open(this.href, "Share", "width=550, height=450"),
                        !1
                    }
                    ))
                }
            }
        }))
    }
    ))
}(document, window.jQuery || jQuery),
function(t, e, n) {
    "use strict";
    function i() {
        var t = e.location.hash.substr(1)
          , n = t.split("-")
          , i = n.length > 1 && /^\+?\d+$/.test(n[n.length - 1]) && parseInt(n.pop(-1), 10) || 1;
        return {
            hash: t,
            index: i < 1 ? 1 : i,
            gallery: n.join("-")
        }
    }
    function o(t) {
        "" !== t.gallery && n("[data-fancybox='" + n.escapeSelector(t.gallery) + "']").eq(t.index - 1).trigger("click.fb-start")
    }
    function s(t) {
        var e, n;
        return !!t && ("" !== (n = (e = t.current ? t.current.opts : t.opts).hash || (e.$orig ? e.$orig.data("fancybox") : "")) && n)
    }
    n.escapeSelector || (n.escapeSelector = function(t) {
        return (t + "").replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, (function(t, e) {
            return e ? "\0" === t ? "ï¿½" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
        }
        ))
    }
    ),
    n((function() {
        !1 !== n.fancybox.defaults.hash && (n(t).on({
            "onInit.fb": function(t, e) {
                var n, o;
                !1 !== e.group[e.currIndex].opts.hash && (n = i(),
                (o = s(e)) && n.gallery && o == n.gallery && (e.currIndex = n.index - 1))
            },
            "beforeShow.fb": function(n, i, o, a) {
                var r;
                o && !1 !== o.opts.hash && ((r = s(i)) && (i.currentHash = r + (i.group.length > 1 ? "-" + (o.index + 1) : ""),
                e.location.hash !== "#" + i.currentHash && (i.origHash || (i.origHash = e.location.hash),
                i.hashTimer && clearTimeout(i.hashTimer),
                i.hashTimer = setTimeout((function() {
                    "replaceState"in e.history ? (e.history[a ? "pushState" : "replaceState"]({}, t.title, e.location.pathname + e.location.search + "#" + i.currentHash),
                    a && (i.hasCreatedHistory = !0)) : e.location.hash = i.currentHash,
                    i.hashTimer = null
                }
                ), 300))))
            },
            "beforeClose.fb": function(n, i, o) {
                !1 !== o.opts.hash && (s(i),
                i.currentHash && i.hasCreatedHistory ? e.history.back() : i.currentHash && ("replaceState"in e.history ? e.history.replaceState({}, t.title, e.location.pathname + e.location.search + (i.origHash || "")) : e.location.hash = i.origHash),
                i.currentHash = null,
                clearTimeout(i.hashTimer))
            }
        }),
        n(e).on("hashchange.fb", (function() {
            var t, e = i();
            n.each(n(".fancybox-container").get().reverse(), (function(e, i) {
                var o = n(i).data("FancyBox");
                if (o.currentHash)
                    return t = o,
                    !1
            }
            )),
            t ? !t.currentHash || t.currentHash === e.gallery + "-" + e.index || 1 === e.index && t.currentHash == e.gallery || (t.currentHash = null,
            t.close()) : "" !== e.gallery && o(e)
        }
        )),
        setTimeout((function() {
            n.fancybox.getInstance() || o(i())
        }
        ), 50))
    }
    ))
}(document, window, window.jQuery || jQuery),
function(t, e) {
    "use strict";
    var n = (new Date).getTime();
    e(t).on({
        "onInit.fb": function(t, e, i) {
            e.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", (function(t) {
                var i = e.current
                  , o = (new Date).getTime();
                e.group.length < 2 || !1 === i.opts.wheel || "auto" === i.opts.wheel && "image" !== i.type || (t.preventDefault(),
                t.stopPropagation(),
                i.$slide.hasClass("fancybox-animated") || (t = t.originalEvent || t,
                o - n < 250 || (n = o,
                e[(-t.deltaY || -t.deltaX || t.wheelDelta || -t.detail) < 0 ? "next" : "previous"]())))
            }
            ))
        }
    })
}(document, window.jQuery || jQuery),
$((function() {
    if (setTimeout((function() {
        $("#page-loading").fadeOut()
    }
    ), 500),
    $("#mobile-btn").click((function() {
        $("#mobile-menu .sub-menu, #mobile-menu .has-sub>a").removeClass("open"),
        $("#mobile-menu .menu").toggleClass("open"),
        $(this).toggleClass("cross")
    }
    )),
    $("#mobile-menu .menu .has-sub>a").click((function() {
        return $(this).parent().siblings(".has-sub").children("a, .sub-menu").removeClass("open"),
        $(this).toggleClass("open"),
        $(this).parent().children(".sub-menu").toggleClass("open"),
        !1
    }
    )),
    $(window).scroll((function() {
        $(this).scrollTop() > 300 ? $(".main-header").addClass("scroll") : $(".main-header").removeClass("scroll")
    }
    )),
    $(".scroll-to").bind("click", (function(t) {
        var e = $(this);
        $("html, body").stop().animate({
            scrollTop: $(e.attr("href")).offset().top - 140
        }, 1500),
        t.preventDefault()
    }
    )),
    $(window).scroll((function() {
        $tobottom = document.body.scrollHeight - window.innerHeight - window.scrollY,
        $(this).scrollTop() > 500 && $tobottom > 500 ? $(".scrollup").addClass("active") : $(".scrollup").removeClass("active")
    }
    )),
    $(".scrollup").click((function() {
        return $("html, body").animate({
            scrollTop: 0
        }, 600),
        !1
    }
    )),
    $(".menu-btn").click((function() {
        return $(".menu-btn-icn").toggleClass("open"),
        $(this).hasClass("open") ? ($("body").removeClass("open"),
        $(".menu-panel .img, .menu-panel nav, .menu-panel .bottom").removeClass("open"),
        $(".menu-panel nav").addClass("closing"),
        $(".menu-panel .bottom").addClass("closing"),
        $(".menu-bar nav").addClass("open"),
        setTimeout((function() {
            $(".menu-panel").removeClass("open")
        }
        ), 500)) : ($("body").addClass("open"),
        $(".menu-panel").addClass("open"),
        $(".menu-panel nav").removeClass("closing"),
        $(".menu-panel .bottom").removeClass("closing"),
        $(".menu-bar nav").removeClass("open"),
        setTimeout((function() {
            $(".menu-panel .img, .menu-panel nav, .menu-panel .bottom").addClass("open")
        }
        ), 500)),
        $(this).toggleClass("open"),
        !1
    }
    )),
    $(".menu-panel li a").hover((function() {
        var t = "." + $(this).data("hover");
        $(".menu-panel .img").toggleClass("hover"),
        $(t).toggleClass("open")
    }
    )),
    "ontouchstart"in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)
        ;
    else {
        const t = document.querySelectorAll(".mag");
        t.forEach((t=>{
            t.addEventListener("mousemove", (function(e) {
                const n = t.getBoundingClientRect()
                  , i = e.clientX - n.left - n.width / 2
                  , o = e.clientY - n.top - n.height / 2;
                t.children[0].style.transform = "translate(" + .3 * i + "px, " + .5 * o + "px)"
            }
            ))
        }
        )),
        t.forEach((t=>{
            t.addEventListener("mouseout", (function(e) {
                t.children[0].style.transform = "translate(0px, 0px)"
            }
            ))
        }
        ))
    }
    $(".cs-5 .slider").bxSlider({
        touchEnabled: !1,
        mode: "horizontal",
        infiniteLoop: !1,
        hideControlOnEnd: !0,
        auto: !1,
        pause: 6e3,
        controls: !0,
        prevText: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 22 17" enable-background="new 0 0 22 17" xml:space="preserve"><path fill="currentColor" d="M21.55,7.324l-6.873-6.873C14.386,0.16,14,0,13.588,0s-0.798,0.16-1.089,0.451c-0.6,0.6-0.6,1.577,0,2.178l4.245,4.244H1.54 C0.691,6.873,0,7.563,0,8.413s0.691,1.54,1.54,1.54h15.204l-4.245,4.244c-0.291,0.291-0.451,0.677-0.451,1.088 c0,0.412,0.16,0.798,0.451,1.089c0.291,0.291,0.678,0.451,1.089,0.451s0.798-0.16,1.089-0.451l6.873-6.873 C22.15,8.901,22.15,7.924,21.55,7.324z"/></svg>',
        nextText: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 22 17" enable-background="new 0 0 22 17" xml:space="preserve"><path fill="currentColor" d="M21.55,7.324l-6.873-6.873C14.386,0.16,14,0,13.588,0s-0.798,0.16-1.089,0.451c-0.6,0.6-0.6,1.577,0,2.178l4.245,4.244H1.54 C0.691,6.873,0,7.563,0,8.413s0.691,1.54,1.54,1.54h15.204l-4.245,4.244c-0.291,0.291-0.451,0.677-0.451,1.088 c0,0.412,0.16,0.798,0.451,1.089c0.291,0.291,0.678,0.451,1.089,0.451s0.798-0.16,1.089-0.451l6.873-6.873 C22.15,8.901,22.15,7.924,21.55,7.324z"/></svg>',
        pager: !1
    }),
    $(".cs-25 .slider").bxSlider({
        touchEnabled: !1,
        mode: "horizontal",
        infiniteLoop: !1,
        hideControlOnEnd: !0,
        auto: !1,
        pause: 6e3,
        controls: !0,
        prevText: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 22 17" enable-background="new 0 0 22 17" xml:space="preserve"><path fill="currentColor" d="M21.55,7.324l-6.873-6.873C14.386,0.16,14,0,13.588,0s-0.798,0.16-1.089,0.451c-0.6,0.6-0.6,1.577,0,2.178l4.245,4.244H1.54 C0.691,6.873,0,7.563,0,8.413s0.691,1.54,1.54,1.54h15.204l-4.245,4.244c-0.291,0.291-0.451,0.677-0.451,1.088 c0,0.412,0.16,0.798,0.451,1.089c0.291,0.291,0.678,0.451,1.089,0.451s0.798-0.16,1.089-0.451l6.873-6.873 C22.15,8.901,22.15,7.924,21.55,7.324z"/></svg>',
        nextText: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 22 17" enable-background="new 0 0 22 17" xml:space="preserve"><path fill="currentColor" d="M21.55,7.324l-6.873-6.873C14.386,0.16,14,0,13.588,0s-0.798,0.16-1.089,0.451c-0.6,0.6-0.6,1.577,0,2.178l4.245,4.244H1.54 C0.691,6.873,0,7.563,0,8.413s0.691,1.54,1.54,1.54h15.204l-4.245,4.244c-0.291,0.291-0.451,0.677-0.451,1.088 c0,0.412,0.16,0.798,0.451,1.089c0.291,0.291,0.678,0.451,1.089,0.451s0.798-0.16,1.089-0.451l6.873-6.873 C22.15,8.901,22.15,7.924,21.55,7.324z"/></svg>',
        pager: !1
    }),
    $(".cs-34 .slider").bxSlider({
        touchEnabled: !0,
        mode: "horizontal",
        infiniteLoop: !0,
        minSlides: 1,
        maxSlides: 2,
        moveSlides: 1,
        shrinkItems: !0,
        slideWidth: 530,
        auto: !0,
        pause: 6e3,
        controls: !0,
        prevText: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 22 17" enable-background="new 0 0 22 17" xml:space="preserve"><path fill="currentColor" d="M21.55,7.324l-6.873-6.873C14.386,0.16,14,0,13.588,0s-0.798,0.16-1.089,0.451c-0.6,0.6-0.6,1.577,0,2.178l4.245,4.244H1.54 C0.691,6.873,0,7.563,0,8.413s0.691,1.54,1.54,1.54h15.204l-4.245,4.244c-0.291,0.291-0.451,0.677-0.451,1.088 c0,0.412,0.16,0.798,0.451,1.089c0.291,0.291,0.678,0.451,1.089,0.451s0.798-0.16,1.089-0.451l6.873-6.873 C22.15,8.901,22.15,7.924,21.55,7.324z"/></svg>',
        nextText: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 22 17" enable-background="new 0 0 22 17" xml:space="preserve"><path fill="currentColor" d="M21.55,7.324l-6.873-6.873C14.386,0.16,14,0,13.588,0s-0.798,0.16-1.089,0.451c-0.6,0.6-0.6,1.577,0,2.178l4.245,4.244H1.54 C0.691,6.873,0,7.563,0,8.413s0.691,1.54,1.54,1.54h15.204l-4.245,4.244c-0.291,0.291-0.451,0.677-0.451,1.088 c0,0.412,0.16,0.798,0.451,1.089c0.291,0.291,0.678,0.451,1.089,0.451s0.798-0.16,1.089-0.451l6.873-6.873 C22.15,8.901,22.15,7.924,21.55,7.324z"/></svg>',
        pager: !1
    }),
    $(".cs-44 .slider").bxSlider({
        touchEnabled: !1,
        mode: "fade",
        infiniteLoop: !0,
        auto: !0,
        pause: 2e3,
        controls: !1,
        pager: !1,
        onSlideBefore: function(t, e, n) {
            var i, o;
            o = 350 - 350 * (o = 100 * (i = n + 1) / 6) / 100,
            $(".cs-44 .content .outer-slider .pager-col .percent .number .f-title").html("0" + i),
            $(".cs-44 .content .outer-slider .pager-col svg circle:nth-child(2)").css("stroke-dashoffset", o)
        }
    }),
    window.innerWidth > 719 ? $shrinkItems47 = !1 : $shrinkItems47 = !0,
    $(".cs-47 .slider").bxSlider({
        touchEnabled: !0,
        mode: "horizontal",
        infiniteLoop: !1,
        minSlides: 1,
        maxSlides: 6,
        moveSlides: 1,
        shrinkItems: $shrinkItems47,
        slideWidth: 300,
        auto: !1,
        pause: 6e3,
        controls: !0,
        prevSelector: "#bx-prev",
        nextSelector: "#bx-next",
        prevText: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 22 17" enable-background="new 0 0 22 17" xml:space="preserve"><path fill="currentColor" d="M21.55,7.324l-6.873-6.873C14.386,0.16,14,0,13.588,0s-0.798,0.16-1.089,0.451c-0.6,0.6-0.6,1.577,0,2.178l4.245,4.244H1.54 C0.691,6.873,0,7.563,0,8.413s0.691,1.54,1.54,1.54h15.204l-4.245,4.244c-0.291,0.291-0.451,0.677-0.451,1.088 c0,0.412,0.16,0.798,0.451,1.089c0.291,0.291,0.678,0.451,1.089,0.451s0.798-0.16,1.089-0.451l6.873-6.873 C22.15,8.901,22.15,7.924,21.55,7.324z"/></svg>',
        nextText: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 22 17" enable-background="new 0 0 22 17" xml:space="preserve"><path fill="currentColor" d="M21.55,7.324l-6.873-6.873C14.386,0.16,14,0,13.588,0s-0.798,0.16-1.089,0.451c-0.6,0.6-0.6,1.577,0,2.178l4.245,4.244H1.54 C0.691,6.873,0,7.563,0,8.413s0.691,1.54,1.54,1.54h15.204l-4.245,4.244c-0.291,0.291-0.451,0.677-0.451,1.088 c0,0.412,0.16,0.798,0.451,1.089c0.291,0.291,0.678,0.451,1.089,0.451s0.798-0.16,1.089-0.451l6.873-6.873 C22.15,8.901,22.15,7.924,21.55,7.324z"/></svg>',
        pager: !1
    }),
    window.addEventListener("scroll", (()=>{
        const t = document.getElementById("moving-text")
          , e = 1.3 * window.pageYOffset;
        null != t && (t.style.transform = `translate3d(-${e}px, 0px, 0px)`)
    }
    )),
    window.addEventListener("scroll", (()=>{
        const t = document.getElementById("moving-text-2")
          , e = 1.3 * window.pageYOffset;
        null != t && (t.style.transform = `translate3d(-${e}px, 0px, 0px)`)
    }
    )),
    $(".cs-13 .btn").click((function() {
        return $target = $(this).closest(".box"),
        $target2 = $($target).find(".inner"),
        $targetheight = $($target2).innerHeight(),
        $($target).hasClass("open") ? ($($target).removeClass("open"),
        $($target).find(".more").css("height", 0)) : ($($target).addClass("open"),
        $($target).find(".more").css("height", $targetheight)),
        !1
    }
    )),
    $(".cs-24 .btn-sm, .cs-28 .btn-sm").click((function() {
        return $target = $(this).closest(".box"),
        $target2 = $($target).find(".inner"),
        $targetheight = $($target2).innerHeight(),
        $($target).hasClass("open") ? ($($target).removeClass("open"),
        $($target).find(".more").css("height", 0)) : ($($target).addClass("open"),
        $($target).find(".more").css("height", $targetheight)),
        !1
    }
    )),
    $("[type=file]").on("change", (function() {
        var t = this.files[0].name
          , e = $(this).attr("placeholder");
        "" != $(this).val() ? $(this).next().text(t) : $(this).next().text(e)
    }
    )),
    $(".faq").on("click", ".t-item:not(.open)", (function() {
        $(".t-item.open").removeClass("open"),
        $(".c-item.open").css("height", "0px"),
        $(".c-item.open").removeClass("open"),
        $target = $(this).next(".c-item"),
        $target2 = $target.find("div"),
        $(this).toggleClass("open"),
        $($target).toggleClass("open"),
        $targetheight = $($target2).innerHeight(),
        $($target).css("height", $targetheight)
    }
    )),
    $(".faq").on("click", ".t-item.open", (function() {
        $target = $(this).next(".c-item"),
        $(this).toggleClass("open"),
        $($target).toggleClass("open"),
        $($target).css("height", "0px")
    }
    )),
    $(".cs-52 .item a").click((function() {
        var t = $(this).parent().find(".modal-content").html();
        return $("body").addClass("blocked"),
        $("#modal .box .inner").html(t),
        $("#modal").addClass("active"),
        !1
    }
    )),
    $("#close-modal").click((function() {
        return $("#modal").removeClass("active"),
        $("body").removeClass("blocked"),
        !1
    }
    )),
    ScrollReveal().reveal(".sr-1", {
        delay: 500,
        viewFactor: .5,
        distance: "30px"
    }),
    ScrollReveal().reveal(".sr-2", {
        delay: 300,
        viewFactor: .1,
        distance: "30px",
        interval: 100
    }),
    ScrollReveal().reveal(".sr-3", {
        delay: 1e3,
        viewFactor: .5,
        distance: "30px"
    }),
    ScrollReveal().reveal(".sr-left", {
        origin: "left",
        delay: 500,
        viewFactor: .5,
        distance: "300px"
    }),
    ScrollReveal().reveal(".sr-right", {
        origin: "right",
        delay: 500,
        viewFactor: .5,
        distance: "300px"
    })
}
));

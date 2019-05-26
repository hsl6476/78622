(function(e) {
    function t(t) {
        for (var s, r, a = t[0], c = t[1], d = t[2], u = 0, h = []; u < a.length; u++)
            r = a[u],
            n[r] && h.push(n[r][0]),
            n[r] = 0;
        for (s in c)
            Object.prototype.hasOwnProperty.call(c, s) && (e[s] = c[s]);
        l && l(t);
        while (h.length)
            h.shift()();
        return i.push.apply(i, d || []),
        o()
    }
    function o() {
        for (var e, t = 0; t < i.length; t++) {
            for (var o = i[t], s = !0, a = 1; a < o.length; a++) {
                var c = o[a];
                0 !== n[c] && (s = !1)
            }
            s && (i.splice(t--, 1),
            e = r(r.s = o[0]))
        }
        return e
    }
    var s = {}
      , n = {
        2: 0
    }
      , i = [];
    function r(t) {
        if (s[t])
            return s[t].exports;
        var o = s[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(o.exports, o, o.exports, r),
        o.l = !0,
        o.exports
    }
    r.m = e,
    r.c = s,
    r.d = function(e, t, o) {
        r.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: o
        })
    }
    ,
    r.r = function(e) {
        "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    r.t = function(e, t) {
        if (1 & t && (e = r(e)),
        8 & t)
            return e;
        if (4 & t && "object" === typeof e && e && e.__esModule)
            return e;
        var o = Object.create(null);
        if (r.r(o),
        Object.defineProperty(o, "default", {
            enumerable: !0,
            value: e
        }),
        2 & t && "string" != typeof e)
            for (var s in e)
                r.d(o, s, function(t) {
                    return e[t]
                }
                .bind(null, s));
        return o
    }
    ,
    r.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e["default"]
        }
        : function() {
            return e
        }
        ;
        return r.d(t, "a", t),
        t
    }
    ,
    r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    r.p = "";
    var a = window["dyasstWebpackJsonp"] = window["dyasstWebpackJsonp"] || []
      , c = a.push.bind(a);
    a.push = t,
    a = a.slice();
    for (var d = 0; d < a.length; d++)
        t(a[d]);
    var l = c;
    i.push([116, 0]),
    o()
}
)({
    116: function(e, t, o) {
        var s = o(8)
          , n = o(117)
          , i = o(118)
          , r = o(121)
          , a = o(126)
          , c = o(127)
          , d = o(128)
          , l = o(129)
          , u = o(130)
          , h = o(149);
        function p(e) {
            var t = new r(e);
            t.on("got", ()=>{
                console.log("got"),
                window.postMessage({
                    source: "treasure_got",
                    target: "bg"
                }, "*")
            }
            ),
            t.on("got_res", e=>{
                console.log("got_res", e),
                window.postMessage({
                    source: "treasure_got_res",
                    data: e,
                    target: "bg"
                }, "*")
            }
            ),
            t.on("miss", ()=>{
                e.ghoulEnabled && e.autoClose && t.noTs && window.close()
            }
            );
            var o = new a(e)
              , p = new c(e)
              , f = new d(e)
              , g = new l(e,window.dyasstReactAgent)
              , m = new u(e)
              , w = new h(e)
              , b = new i;
            b.push(t),
            b.push(o),
            b.push(p),
            b.push(f),
            b.push(g),
            b.push(m),
            b.push(w);
            try {
                b.install()
            } catch (e) {
                console.error(e)
            }
            document.location.href.startsWith(s.roomUrl) && window.postMessage({
                source: "pro_tab",
                target: "bg"
            }, "*"),
            window.addEventListener("message", o=>{
                o.source === window && o.data && "sync" === o.data.source ? "normal" === e.ghoulMode && e.autoClose && t.noTs && window.close() : o.source === window && o.data && "tsbox" === o.data.source ? t.handleRemotePendingBoxes(o.data.data) : o.source === window && o.data && "update_setting" === o.data.source && b.updateSetting(o.data.data)
            }
            ),
            n()
        }
        (()=>{
            var e = !1;
            window.postMessage({
                source: "backend_installed"
            }, "*"),
            window.addEventListener("message", t=>{
                if (t.source === window && t.data && "setting" === t.data.source && !e) {
                    e = !0;
                    var o = t.data.data;
                    o.key === s.key && p(o)
                }
            }
            )
        }
        )()
    },
    117: function(e, t, o) {
        var {injectRemoteJS: s, waitForDom: n} = o(9)
          , {roomUrl: i} = o(8);
        async function r() {
            if (document.location.href.startsWith(i)) {
                var e = await n(".TreasureWrap");
                e.style.visibility = "hidden";
                var t = document.createElement("div");
                t.id = "dyasst-tsbox";
                var o = document.getElementsByClassName("layout-Player-effect")[0];
                o.insertBefore(t, o.firstElementChild),
                s("chrome-extension://gbbpngofangjplfgakjffjfcphngbolm/tsbuild/content/views/tsbox.js")
            }
        }
        e.exports = r
    },
    118: function(e, t, o) {
        var s = o(119)
          , {sleep: n} = o(9);
        class i {
            constructor() {
                this.webpackHooker = new s,
                this.plugins = [],
                this.objPromises = new Map
            }
            async waitForObj(e, t, o=200) {
                while (1) {
                    if (e[t])
                        return;
                    await n(o)
                }
            }
            push(e) {
                e.grant() && this.plugins.push(e)
            }
            updateSetting(e) {
                this.plugins.forEach(t=>t.updateSetting(e))
            }
            install() {
                this.plugins.forEach(e=>{
                    e.registerWebpackHooks(this.webpackHooker);
                    var t = e.getDepObjs();
                    t && t.length > 0 && t.forEach(t=>{
                        this.objPromises.has(t) || this.objPromises.set(t, this.waitForObj(window, t)),
                        this.objPromises.get(t).then(()=>e.depObjReady(t))
                    }
                    )
                }
                ),
                this.webpackHooker.install(),
                this.plugins.forEach(e=>e.install())
            }
        }
        e.exports = i
    },
    119: function(e, t, o) {
        var s = o(120);
        class n {
            constructor() {
                this.hooks = {}
            }
            replace(e, t, o) {
                this.hooks[e] || (this.hooks[e] = {});
                var s = this.hooks[e];
                while (t.length > 0) {
                    var n = t.shift();
                    s[n] || (s[n] = {}),
                    s = s[n]
                }
                s.leaf = !0,
                s.replace && console.log("webpackHooker replace conflict:", e, t),
                s.replace = o
            }
            subscribe(e, t, o) {
                this.hooks[e] || (this.hooks[e] = {});
                var s = this.hooks[e];
                while (t.length > 0) {
                    var n = t.shift();
                    s[n] || (s[n] = {}),
                    s = s[n]
                }
                s.leaf = !0,
                s.subscribers || (s.subscribers = []),
                s.subscribers.push(o)
            }
            install() {
                s.hook(this.hooks)
            }
        }
        e.exports = n
    },
    12: function(e, t) {
        e.exports = {
            headerTitle: "99999摸金助手",
            avatarUrl: "https://apic.douyucdn.cn/upload/avatar_v3/201808/650168b922e4aae868b29fec672c4fa9_big.jpg",
            version: "1.1.0",
            roomUrl: "https://www.douyu.com/99999",
            roomId: "99999",
            notification: {
                enabled: !1,
                label2_0: "专属"
            },
            proModeEnabled: !1,
            jsBundleUrl: "https://static.jiuwozb.com/tsbuild_99999",
            versionTitle: "定制版",
            key: "a321bf"
        }
    },
    120: function(e, t, o) {
        var {sleep: s} = o(9);
        async function n() {
            while (!window.shark_room_jsonp)
                await s(333);
            return new Promise(e=>{
                var t = "fakeModule"
                  , o = {
                    [t]: (t,o,s)=>{
                        e(s.c)
                    }
                };
                window.shark_room_jsonp.push([[1e4], o, [[t]]])
            }
            )
        }
        function i(e, t, o) {
            Object.keys(t).forEach(s=>{
                if ("prototype" === s)
                    return i(e.prototype, t[s], o);
                var n = e[s]
                  , {leaf: r} = t[s];
                Object.defineProperty(e, s, {
                    get: ()=>{
                        return r ? function(...e) {
                            return t[s].subscribers && t[s].subscribers.forEach(t=>t(o, n, ...e)),
                            t[s].replace ? t[s].replace.call(this, o, n, ...e) : n.call(this, ...e)
                        }
                        : e[`_${s}`]
                    }
                    ,
                    set: n=>{
                        !r && i(n, t[s], o),
                        e[`_${s}`] = n
                    }
                }),
                n && (e[s] = n)
            }
            )
        }
        function r(e, t, o) {
            Object.defineProperty(e, t, {
                get: ()=>e[`_${t}`],
                set: s=>{
                    var n = s.exports;
                    Object.defineProperty(s, "exports", {
                        get: ()=>s._exports,
                        set: t=>{
                            i(t, o, e),
                            s._exports = t
                        }
                    }),
                    s.exports = n,
                    e[`_${t}`] = s
                }
            })
        }
        async function a(e) {
            var t = await n();
            Object.keys(e).forEach(o=>r(t, o, e[o]))
        }
        e.exports = {
            hook: a
        }
    },
    121: function(e, t, o) {
        (function(t) {
            var s = o(122)
              , n = o(13)
              , i = o(124)
              , {sleep: r, waitForObj: a} = o(9)
              , {getDid: c, getUid: d} = o(88)
              , {Subject: l} = o(270)
              , u = t && t.env && !0;
            class h extends n {
                constructor(e) {
                    super(),
                    this.name = "tsbox",
                    this.setting = e,
                    this.state = "IDLE",
                    this.pendingBox = new s((e,t)=>e.surplusTime < t.surplusTime),
                    this.noTs = !0
                }
                grant() {
                    return !0
                }
                registerWebpackHooks(e) {
                    e.replace("1c14c", ["a", "prototype", "drawTreasureRequest"], this.drawTreasureRequest)
                }
                drawTreasureRequest(e, t, o) {
                    var s = o.payload || {}
                      , {type: n, data: i} = s
                      , r = this.global.get("douyuDid")
                      , a = {};
                    "init" === n ? (this.config.treasureId = i.treasureId,
                    this.config.ownRid = i.roomId,
                    a = {
                        room_id: i.roomId,
                        package_room_id: i.roomId,
                        device_id: r,
                        packerid: i.treasureId || 0,
                        version: 1
                    },
                    this.config.isGeeChecking = !0) : (a = Object.assign({}, {
                        room_id: this.config.ownRid || 0,
                        package_room_id: this.config.ownRid || 0,
                        device_id: r,
                        packerid: this.config.treasureId || 0,
                        version: 1
                    }, i),
                    this.config.isGeeChecking = !1);
                    var c = window.sdk9eecb9526ff2f13a6112("0b1d3").default;
                    return c.post(String, "/member/task/redPacketReceive", a, {
                        headers: {
                            "content-type": "application/x-www-form-urlencoded"
                        }
                    })
                }
                pushPendingBox(e) {
                    this.pendingBox.add(e)
                }
                handleRemotePendingBoxes(e) {
                    window.dyasstTsboxSubject && e.forEach(e=>window.dyasstTsboxSubject.next(e)),
                    "pro" === this.setting.ghoulMode && this.handlePendingBoxes(e)
                }
                checkBoxType(e) {
                    var {boxFilter: t} = this.setting
                      , o = parseInt(e.treasureType, 10);
                    return "all" === t || ("100" === t ? [100, 104, 105].includes(o) : "101" === t ? o >= 101 && ![104, 105].includes(o) : "102" === t ? o >= 103 && ![104, 105, 119].includes(o) : "103" === t ? 127 === o : void 0)
                }
                handlePendingBoxes(e, t=!0) {
                    if (e && e instanceof Array ? e.forEach(e=>this.pushPendingBox(e)) : e && this.pushPendingBox(e),
                    t) {
                        if (!this.pendingBox.isEmpty() && "IDLE" === this.state) {
                            var o = this.pendingBox.poll();
                            if (!this.checkBoxType(o))
                                return this.handlePendingBoxes();
                            this.noTs = !1,
                            this.state = "WAITING";
                            var {delayRange: s} = this.setting
                              , n = o.noDelay || 128 === o.treasureType ? 0 : Math.max(s[1] - s[0], 0) * Math.random() + s[0]
                              , i = Math.max(1e3 * o.surplusTime - Date.now() - (this.setting.timeDelta || 0) + n + 5, 0);
                            setTimeout(()=>this.handleTimeupBox(o), i)
                        }
                        this.pendingBox.isEmpty() && "IDLE" === this.state && (this.noTs = !0)
                    }
                }
                handleTimeupBox(e) {
                    if ("WAITING" === this.state) {
                        var t = parseInt((Date.now() + this.setting.timeDelta) / 1e3, 10);
                        if ("pro" === this.setting.ghoulMode && e.surplusTime + 5 < t)
                            return console.log("miss"),
                            this.state = "IDLE",
                            this.handlePendingBoxes();
                        this.checkBoxType(e) ? (console.log("picking", e),
                        this.state = "PICKING",
                        window.PlayerAsideApp.container.registry.store.dispatch({
                            type: "DRAW_TREASURE",
                            payload: {
                                data: e,
                                type: "init"
                            }
                        })) : (console.log("pass"),
                        this.state = "IDLE",
                        this.handlePendingBoxes())
                    }
                }
                async setDocTitle() {
                    if (!document.title_src) {
                        document.title_src = document.title,
                        document.title = "[新箱子验证] " + document.title;
                        while (1) {
                            if (!document.hidden) {
                                document.title = document.title_src,
                                delete document.title_src;
                                break
                            }
                            await r(1e3)
                        }
                    }
                }
                async showGeeTestPanel() {
                    var e = "INIT";
                    while (1) {
                        if ("INIT" === e) {
                            var t = document.getElementsByClassName("geetest_radar_tip");
                            t && t.length > 0 && (t[0].onmouseenter && t[0].onmouseenter(),
                            t[0].click && t[0].click(),
                            e = "GEE")
                        } else if ("GEE" === e) {
                            var o = document.getElementsByClassName("geetest_popup_box");
                            o && o.length > 0 && (o[0].style["width"] = "347px",
                            e = "WAIT")
                        } else if ("WAIT" === e) {
                            var s = document.getElementsByClassName("geetest_popup_box");
                            if (!s || s.length <= 0)
                                break
                        }
                        await r(200)
                    }
                }
                isArray(e) {
                    return /@\S\//g.test(String(e))
                }
                dataMap(e) {
                    return e.map(e=>({
                        roomId: window.socketProxy.info.room.roomId,
                        treasureId: parseInt(e.rpid, 10),
                        treasureType: parseInt(e.rpt, 10),
                        senderName: e.snk,
                        snk: e.snk,
                        senderUid: +e.sid,
                        surplusTime: parseInt(e.ot, 10),
                        destroyTime: parseInt(e.dt, 10)
                    }))
                }
                installSocketHook() {
                    var {socketStream: e} = window.socketProxy
                      , {setting: t} = this;
                    t.ghoulEnabled && (e.subscribe("tsboxb", e=>{
                        u || console.log("tsboxb", e),
                        this.handlePendingBoxes(this.dataMap([e]))
                    }
                    ),
                    e.subscribe("tslist", e=>{
                        var t = e.list || []
                          , o = [];
                        (this.isArray(t) ? i(t) : [t]).forEach(e=>{
                            e && o.push(i(e))
                        }
                        ),
                        u || console.log(o),
                        this.handlePendingBoxes(this.dataMap(o))
                    }
                    ),
                    e.subscribe(e=>{
                        e.tsid && console.log(e)
                    }
                    ))
                }
                installHttpHook() {
                    var e = window.sdk9eecb9526ff2f13a6112("0b1d3").default;
                    e.applyMiddleWare("post", /\/member\/task\/redPacketReceive/i, e=>{
                        return void 0 !== e.geetest ? (this.state = "GEE_TESTING",
                        this.setDocTitle(),
                        this.emit("got"),
                        this.showGeeTestPanel()) : void 0 !== e.award_type ? (this.emit("got_res", e),
                        this.state = "IDLE",
                        this.handlePendingBoxes()) : (this.state = "IDLE",
                        console.log("miss."),
                        this.handlePendingBoxes()),
                        e
                    }
                    )
                }
                getSDK() {
                    if (this.sdk)
                        return this.sdk;
                    for (var e of Object.keys(window))
                        if (/^sdk([a-f]|[0-9])+$/.test(e))
                            return this.sdkKey = e,
                            this.sdk = window[e],
                            this.sdk
                }
                getDepObjs() {
                    return ["socketProxy", "sdk9eecb9526ff2f13a6112"]
                }
                depObjReady(e) {
                    "socketProxy" === e ? this.installSocketHook() : "sdk9eecb9526ff2f13a6112" === e && this.installHttpHook()
                }
                sendAutoBarrage() {
                    a(window, "socketProxy").then(()=>{
                        var e = {
                            type: "chatmessage",
                            col: 0,
                            content: ".",
                            dy: c(),
                            ifs: 0,
                            nc: 0,
                            rev: 0,
                            sender: d()
                        };
                        window.socketProxy.sendMessage(e),
                        console.log("send barrage", e)
                    }
                    )
                }
                install() {
                    window.dyasstTsboxSubject = new l,
                    this.setting.ghoulEnabled && this.setting.autoSendBarrageEnabled && a(window, "dyasstRid").then(()=>{
                        var e = `dyasstAutoSend_${window.dyasstRid}`;
                        void 0 === window.localStorage[e] && (window.localStorage[e] = "0");
                        var t = new Date
                          , o = parseInt(window.localStorage[e], 10);
                        (new Date(o).toDateString() !== t.toDateString() || t.getTime() - o > 12e5) && setTimeout(()=>{
                            this.sendAutoBarrage(),
                            window.localStorage[e] = Date.now()
                        }
                        , 3e3 * Math.random() + 1e3)
                    }
                    )
                }
            }
            e.exports = h
        }
        ).call(this, o(24))
    },
    124: function(e, t, o) {
        var {isPlainObject: s} = o(125);
        function n(e, t) {
            return e ? {
                key: e,
                value: t
            } : [t]
        }
        function i(e) {
            for (var t = [], o = "", s = "", i = 0, r = e.length; i < r; i++) {
                var a = e.charAt(i);
                "/" === a ? (t.push(n(o, s)),
                o = "",
                s = "") : "@" === a ? (i += 1,
                a = e.charAt(i),
                "A" === a ? s += "@" : "S" === a ? s += "/" : "=" === a && (o = s,
                s = "")) : s += a
            }
            return t
        }
        function r(e) {
            var t = String(e);
            return t ? ("/" !== t.charAt(t.length - 1) && (t += "/"),
            i(t)) : []
        }
        function a(e) {
            var t = void 0;
            return r(e).forEach(e=>{
                if (Array.isArray(e) && (t = t || [],
                1 === e.length ? t.push(e[0]) : t.push(e)),
                s(e)) {
                    var o = e.key
                      , n = e.value;
                    (t = t || {})[o] = n
                }
            }
            ),
            t
        }
        e.exports = a
    },
    126: function(e, t, o) {
        var s = o(13)
          , {getUid: n} = o(88);
        class i extends s {
            constructor(e) {
                super(),
                this.setting = e,
                this.uid = null
            }
            getDepObjs() {
                return ["socketProxy"]
            }
            depObjReady(e) {
                "socketProxy" === e && this.installSocketHook()
            }
            barrageHandler(e) {}
            installSocketHook() {
                var {socketStream: e} = window.socketProxy
                  , t = this
                  , o = e.MODULE.uenter.throttle;
                e.MODULE.uenter.throttle = function(...e) {
                    return t.setting.blockEnterBarrage || o.call(this, ...e)
                }
                ;
                var s = e.MODULE.chatmsg.throttle;
                e.MODULE.chatmsg.throttle = function(e, ...o) {
                    t.uid || (t.uid = n());
                    try {
                        e.uid !== t.uid && e.uid !== window.socketProxy.info.user.userName || "off" === t.setting.nobleBarrageExp || (e.nc = "1",
                        e.nl = t.setting.nobleBarrageExp)
                    } catch (e) {}
                    return s.call(this, e, ...o)
                }
                ,
                e.subscribe("chatmsg", this.barrageHandler.bind(this));
            }
        }
        e.exports = i
    },
    127: function(e, t, o) {
        var s = o(13)
          , {injectRemoteJS: n, waitForDom: i} = o(9);
        class r extends s {
            install() {
                i("body").then(()=>{
                    var e = document.createElement("div");
                    e.id = "dyasst-barrage",
                    document.body.insertBefore(e, document.body.firstElementChild),
                    n("chrome-extension://gbbpngofangjplfgakjffjfcphngbolm/tsbuild/content/views/barrage.js")
                }
                )
            }
        }
        e.exports = r
    },
    128: function(e, t, o) {
        var s = o(13)
          , {injectRemoteJS: n, waitForDom: i} = o(9)
          , {roomUrl: r} = o(8);
        class a extends s {
            constructor(e) {
                super(),
                this.setting = e
            }
            grant() {
                return document.location.href.startsWith(r) && this.setting.notificationShow
            }
            install() {
                window.dyasstPcNotificationEnabled = this.setting.pcNotificationEnabled,
                i("body").then(()=>{
                    var e = document.createElement("div");
                    e.id = "dyasst-notification",
                    document.body.insertBefore(e, document.body.firstElementChild),
                    n("chrome-extension://gbbpngofangjplfgakjffjfcphngbolm/tsbuild/content/views/notification.js")
                }
                )
            }
        }
        e.exports = a
    },
    129: function(e, t, o) {
        var s = o(13)
          , {sleep: n, waitForDom: i, getReactInstance: r} = o(9);
        class a extends s {
            constructor(e, t) {
                super(),
                this.setting = e,
                this.reactAgent = t
            }
            giftHandler(e) {
                20226 === e.id || 20005 === e.id ? (e.batchDesc = ["口嗨1小时", "妹妹微信", "我无聊哥出狱辣", "你在想P吃"],
                e.batchNumArr = [10, 500, 1e3, 9999],
                e.intro = "赠送500个超火，您将获得妹妹微信") : 2e4 === e.id ? (e.batchDesc = ["长长久久", "赞一发", "我爱你", "一生一世", "溜溜溜"],
                e.batchNumArr = [99, 233, 520, 1314, 6666],
                e.intro = "Powered By 摸金插件") : 20137 === e.id ? (e.batchDesc = ["长长久久", "赞一发", "我爱你", "一生一世", "溜溜溜"],
                e.batchNumArr = [99, 233, 520, 1314, 6666],
                e.intro = "Powered By 摸金插件") : 20138 === e.id && (e.batchDesc = ["长长久久", "赞一发", "我爱你", "一生一世", "溜溜溜"],
                e.batchNumArr = [99, 233, 520, 1314, 6666],
                e.intro = "Powered By 摸金插件")
            }
            async install() {
                i(".Backpack").then(e=>{
                    var t = r(e);
                    if (t) {
                        var {batchGiftConfigs: o, propGiftConfigs: s} = t.stateNode.props
                          , n = {
                            isBatch: 1,
                            descList: ["长长久久", "赞一发", "我爱你", "一生一世", "溜溜溜"],
                            numList: [99, 233, 520, 1314, 6666],
                            intro: "Powered By 摸金插件"
                        };
                        Object.keys(s).forEach(e=>{
                            o[e] || (o[e] = n)
                        }
                        )
                    }
                }
                );
                while (1) {
                    try {
                        var {giftData: e} = window.RoomApp.container.registry.store.getState()
                          , {allGift: t} = e;
                        if (t.length > 0) {
                            t.forEach(e=>{
                                this.giftHandler(e)
                            }
                            );
                            break
                        }
                    } catch (e) {}
                    await n(333)
                }
            }
        }
        e.exports = a
    },
    13: function(e, t, o) {
        var {EventEmitter: s} = o(123);
        class n extends s {
            grant() {
                return !0
            }
            updateSetting(e) {
                this.setting = e
            }
            getDepObjs() {
                return null
            }
            depObjReady() {}
            registerWebpackHooks() {}
            install() {}
        }
        e.exports = n
    },
    130: function(e, t, o) {
        var s = o(13)
          , n = o(63)
          , {waitForDom: i} = o(9);
        class r extends s {
            constructor(e) {
                super(),
                this.setting = e,
                this.roomId = "",
                this.roomInfo = null
            }
            setRoomId(e) {
                this.roomId = e,
                window.dyasstRid = e
            }
            async fetchRoomInfo() {
                try {
                    var e = await n.get(`https://www.douyu.com/betard/${this.roomId}`);
                    200 === e.status ? "object" === typeof e.data ? (this.roomInfo = e.data,
                    this.roomInfoHandler(e.data)) : console.log("cannot fetch room info") : console.error(e)
                } catch (e) {
                    console.error(e)
                }
            }
            roomInfoHandler(e) {
                i(".AnchorLevelTip-tipBarNum").then(t=>{
                    var o = !1;
                    t.childNodes.forEach(e=>{
                        " / " === e.data && (o = !0),
                        o && t.removeChild(e)
                    }
                    ),
                    t.appendChild(document.createTextNode(" / ")),
                    t.appendChild(document.createTextNode(e.room.levelInfo.experience))
                }
                )
            }
            install() {
                var e = /www.douyu.com\/([0-9]+)/.exec(document.location.href);
                e && 2 === e.length && (this.setRoomId(e[1]),
                this.fetchRoomInfo())
            }
        }
        e.exports = r
    },
    149: function(e, t, o) {
        var s = o(13)
          , {waitForDom: n, waitForObj: i} = o(9);
        class r extends s {
            constructor(e) {
                super(),
                this.setting = e
            }
            install() {
                this.setting.blockRoomAd && (n(".Bottom-ad", 333).then(e=>{
                    e.style.display = "none"
                }
                ),
                n(".SignBarrage", 333).then(e=>{
                    e.style.display = "none"
                }
                ),
                n(".Title-ad", 333).then(e=>{
                    e.style.display = "none"
                }
                ),
                n("div[class^=recommendAD]", 333).then(e=>{
                    e.style.display = "none"
                }
                )),
                this.setting.blockLiveStream && i(window, "H5PlayerVideoLib").then(()=>{
                    i(window.H5PlayerVideoLib, "getVideo").then(()=>{
                        var e = window.H5PlayerVideoLib.getVideo();
                        try {
                            e ? (e.destroy(),
                            console.log("video blocked")) : console.log("off")
                        } catch (e) {
                            console.log(e)
                        }
                    }
                    )
                }
                )
            }
        }
        e.exports = r
    },
    8: function(e, t, o) {
        e.exports = o(12)
    },
    88: function(e, t) {
        function o() {
            for (var e of document.cookie.split(";"))
                if (e.indexOf("acf_uid") >= 0)
                    return e.split("=")[1]
        }
        function s() {
            if (!this.did)
                for (var e of document.cookie.split(";"))
                    if (e.indexOf("acf_did") >= 0)
                        return e.split("=")[1]
        }
        e.exports = {
            getUid: o,
            getDid: s
        }
    },
    9: function(e, t, o) {
        (function(t) {
            var {jsBundleUrl: s} = o(8);
            async function n(e) {
                return new Promise(t=>setTimeout(()=>t(), e))
            }
            function i(e) {
                var o = t && t.env && !0;
                o ? (e = e.startsWith("/tsbuild") ? e.slice(8) : e,
                e = e.startsWith("chrome-extension") ? e.slice(e.indexOf("/tsbuild") + 8) : e,
                e = s + e) : e = e.startsWith("chrome-extension") ? e : chrome.extension.getURL(e);
                var n = document.createElement("script");
                return n.src = e,
                document.documentElement.appendChild(n),
                n.parentNode.removeChild(n),
                n
            }
            function r(e, t) {
                if (t > 0) {
                    var o = new Audio;
                    o.src = e,
                    o.volume = t,
                    o.play()
                }
            }
            async function a(e, t, o=200) {
                while (1) {
                    if (e[t])
                        return;
                    await n(o)
                }
            }
            async function c(e, t=200) {
                while (1) {
                    var o = document.querySelector(e);
                    if (o)
                        return o;
                    await n(t)
                }
            }
            function d(e) {
                for (var t of Object.keys(e))
                    if (t.startsWith("__reactInternalInstance"))
                        return e[t].return
            }
            e.exports = {
                sleep: n,
                injectRemoteJS: i,
                playAudio: r,
                waitForObj: a,
                waitForDom: c,
                getReactInstance: d
            }
        }
        ).call(this, o(24))
    }
});

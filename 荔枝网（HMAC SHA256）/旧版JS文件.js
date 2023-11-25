const window={};
var demo;

!function (t) {
    var e = {};
    function i(n) {
        if (e[n])
            return e[n].exports;
        var s = e[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(s.exports, s, s.exports, i),
        s.l = !0,
        s.exports
    }
    demo = i;
}({
696: function(_e, t, n) {
        "use strict";
        (function(e) {
            var a=function(e){return e&&e.__esModule?e:{default:e}};
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.default = void 0;
            var r = a(n(175))
              , l = a(n(176))
              , o = a(n(1305))
              , i = a(n(240));
            this.s = function(t, n, a) {                
                var s = i.default.getUser
                  , u = i.default.getJWT
                  , c = i.default.getDeviceId
                  , d = (new Date).getTime()
                  , f = {}
                  , p = ""
                  , _ = "";
                a && (p = (0,
                r.default)(a),
                _ = l.default.stringify(p));
                var m = "".concat(t, "\n").concat(n, "\n").concat(d, "\n").concat(_);
                return f = {
                    "Content-Type": "application/json",
                    "X-ITOUCHTV-Ca-Timestamp": d,
                    "X-ITOUCHTV-Ca-Signature": l.default.stringify((0,
                    o.default)(m, "dfkcY1c3sfuw0Cii9DWjOUO3iQy2hqlDxyvDXd1oVMxwYAJSgeB6phO8eW1dfuwX")),
                    "X-ITOUCHTV-Ca-Key": "89541443007807288657755311869534",
                    "X-ITOUCHTV-CLIENT": "WEB_PC",
                    "X-ITOUCHTV-DEVICE-ID": e.__DEVICEID__ || c()
                },
                u() && (f.Authorization = u()),
                s() && s().pk && (f["X-ITOUCHTV-USER-PK"] = s().pk),
                e.__X_FORWARDED_FOR__ && (f["X-Forwarded-For"] = e.__X_FORWARDED_FOR__),
                f
            };
        }
        ).call(this, window)
    }


,
175: function(e, _t, n) {
        var r;
        e.exports = (r = n(43),
        function(e) {
            var t = r
              , n = t.lib
              , o = n.WordArray
              , i = n.Hasher
              , u = t.algo
              , a = [];
            !function() {
                for (var t = 0; t < 64; t++)
                    a[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0
            }();
            var c = u.MD5 = i.extend({
                _doReset: function() {
                    this._hash = new o.init([1732584193, 4023233417, 2562383102, 271733878])
                },
                _doProcessBlock: function(e, t) {
                    for (var n = 0; n < 16; n++) {
                        var r = t + n
                          , o = e[r];
                        e[r] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8)
                    }
                    var i = this._hash.words
                      , u = e[t + 0]
                      , c = e[t + 1]
                      , d = e[t + 2]
                      , h = e[t + 3]
                      , v = e[t + 4]
                      , y = e[t + 5]
                      , m = e[t + 6]
                      , g = e[t + 7]
                      , b = e[t + 8]
                      , _ = e[t + 9]
                      , w = e[t + 10]
                      , x = e[t + 11]
                      , E = e[t + 12]
                      , k = e[t + 13]
                      , S = e[t + 14]
                      , O = e[t + 15]
                      , T = i[0]
                      , C = i[1]
                      , P = i[2]
                      , j = i[3];
                    T = l(T, C, P, j, u, 7, a[0]),
                    j = l(j, T, C, P, c, 12, a[1]),
                    P = l(P, j, T, C, d, 17, a[2]),
                    C = l(C, P, j, T, h, 22, a[3]),
                    T = l(T, C, P, j, v, 7, a[4]),
                    j = l(j, T, C, P, y, 12, a[5]),
                    P = l(P, j, T, C, m, 17, a[6]),
                    C = l(C, P, j, T, g, 22, a[7]),
                    T = l(T, C, P, j, b, 7, a[8]),
                    j = l(j, T, C, P, _, 12, a[9]),
                    P = l(P, j, T, C, w, 17, a[10]),
                    C = l(C, P, j, T, x, 22, a[11]),
                    T = l(T, C, P, j, E, 7, a[12]),
                    j = l(j, T, C, P, k, 12, a[13]),
                    P = l(P, j, T, C, S, 17, a[14]),
                    T = s(T, C = l(C, P, j, T, O, 22, a[15]), P, j, c, 5, a[16]),
                    j = s(j, T, C, P, m, 9, a[17]),
                    P = s(P, j, T, C, x, 14, a[18]),
                    C = s(C, P, j, T, u, 20, a[19]),
                    T = s(T, C, P, j, y, 5, a[20]),
                    j = s(j, T, C, P, w, 9, a[21]),
                    P = s(P, j, T, C, O, 14, a[22]),
                    C = s(C, P, j, T, v, 20, a[23]),
                    T = s(T, C, P, j, _, 5, a[24]),
                    j = s(j, T, C, P, S, 9, a[25]),
                    P = s(P, j, T, C, h, 14, a[26]),
                    C = s(C, P, j, T, b, 20, a[27]),
                    T = s(T, C, P, j, k, 5, a[28]),
                    j = s(j, T, C, P, d, 9, a[29]),
                    P = s(P, j, T, C, g, 14, a[30]),
                    T = f(T, C = s(C, P, j, T, E, 20, a[31]), P, j, y, 4, a[32]),
                    j = f(j, T, C, P, b, 11, a[33]),
                    P = f(P, j, T, C, x, 16, a[34]),
                    C = f(C, P, j, T, S, 23, a[35]),
                    T = f(T, C, P, j, c, 4, a[36]),
                    j = f(j, T, C, P, v, 11, a[37]),
                    P = f(P, j, T, C, g, 16, a[38]),
                    C = f(C, P, j, T, w, 23, a[39]),
                    T = f(T, C, P, j, k, 4, a[40]),
                    j = f(j, T, C, P, u, 11, a[41]),
                    P = f(P, j, T, C, h, 16, a[42]),
                    C = f(C, P, j, T, m, 23, a[43]),
                    T = f(T, C, P, j, _, 4, a[44]),
                    j = f(j, T, C, P, E, 11, a[45]),
                    P = f(P, j, T, C, O, 16, a[46]),
                    T = p(T, C = f(C, P, j, T, d, 23, a[47]), P, j, u, 6, a[48]),
                    j = p(j, T, C, P, g, 10, a[49]),
                    P = p(P, j, T, C, S, 15, a[50]),
                    C = p(C, P, j, T, y, 21, a[51]),
                    T = p(T, C, P, j, E, 6, a[52]),
                    j = p(j, T, C, P, h, 10, a[53]),
                    P = p(P, j, T, C, w, 15, a[54]),
                    C = p(C, P, j, T, c, 21, a[55]),
                    T = p(T, C, P, j, b, 6, a[56]),
                    j = p(j, T, C, P, O, 10, a[57]),
                    P = p(P, j, T, C, m, 15, a[58]),
                    C = p(C, P, j, T, k, 21, a[59]),
                    T = p(T, C, P, j, v, 6, a[60]),
                    j = p(j, T, C, P, x, 10, a[61]),
                    P = p(P, j, T, C, d, 15, a[62]),
                    C = p(C, P, j, T, _, 21, a[63]),
                    i[0] = i[0] + T | 0,
                    i[1] = i[1] + C | 0,
                    i[2] = i[2] + P | 0,
                    i[3] = i[3] + j | 0
                },
                _doFinalize: function() {
                    var t = this._data
                      , n = t.words
                      , r = 8 * this._nDataBytes
                      , o = 8 * t.sigBytes;
                    n[o >>> 5] |= 128 << 24 - o % 32;
                    var i = e.floor(r / 4294967296)
                      , u = r;
                    n[15 + (o + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8),
                    n[14 + (o + 64 >>> 9 << 4)] = 16711935 & (u << 8 | u >>> 24) | 4278255360 & (u << 24 | u >>> 8),
                    t.sigBytes = 4 * (n.length + 1),
                    this._process();
                    for (var a = this._hash, c = a.words, l = 0; l < 4; l++) {
                        var s = c[l];
                        c[l] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8)
                    }
                    return a
                },
                clone: function() {
                    var e = i.clone.call(this);
                    return e._hash = this._hash.clone(),
                    e
                }
            });
            function l(e, t, n, r, o, i, u) {
                var a = e + (t & n | ~t & r) + o + u;
                return (a << i | a >>> 32 - i) + t
            }
            function s(e, t, n, r, o, i, u) {
                var a = e + (t & r | n & ~r) + o + u;
                return (a << i | a >>> 32 - i) + t
            }
            function f(e, t, n, r, o, i, u) {
                var a = e + (t ^ n ^ r) + o + u;
                return (a << i | a >>> 32 - i) + t
            }
            function p(e, t, n, r, o, i, u) {
                var a = e + (n ^ (t | ~r)) + o + u;
                return (a << i | a >>> 32 - i) + t
            }
            t.MD5 = i._createHelper(c),
            t.HmacMD5 = i._createHmacHelper(c)
        }(Math),
        r.MD5)
    }

,
43: function(e, _t, _n) {
        var r;
        e.exports = (r = r || function(e, t) {
            var n = Object.create || function() {
                function e() {}
                return function(t) {
                    var n;
                    return e.prototype = t,
                    n = new e,
                    e.prototype = null,
                    n
                }
            }()
              , r = {}
              , o = r.lib = {}
              , i = o.Base = {
                extend: function(e) {
                    var t = n(this);
                    return e && t.mixIn(e),
                    t.hasOwnProperty("init") && this.init !== t.init || (t.init = function() {
                        t.$super.init.apply(this, arguments)
                    }
                    ),
                    t.init.prototype = t,
                    t.$super = this,
                    t
                },
                create: function() {
                    var e = this.extend();
                    return e.init.apply(e, arguments),
                    e
                },
                init: function() {},
                mixIn: function(e) {
                    for (var t in e)
                        e.hasOwnProperty(t) && (this[t] = e[t]);
                    e.hasOwnProperty("toString") && (this.toString = e.toString)
                },
                clone: function() {
                    return this.init.prototype.extend(this)
                }
            }
              , u = o.WordArray = i.extend({
                init: function(e, n) {
                    e = this.words = e || [],
                    this.sigBytes = n != t ? n : 4 * e.length
                },
                toString: function(e) {
                    return (e || c).stringify(this)
                },
                concat: function(e) {
                    var t = this.words
                      , n = e.words
                      , r = this.sigBytes
                      , o = e.sigBytes;
                    if (this.clamp(),
                    r % 4)
                        for (var i = 0; i < o; i++) {
                            var u = n[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                            t[r + i >>> 2] |= u << 24 - (r + i) % 4 * 8
                        }
                    else
                        for (i = 0; i < o; i += 4)
                            t[r + i >>> 2] = n[i >>> 2];
                    return this.sigBytes += o,
                    this
                },
                clamp: function() {
                    var t = this.words
                      , n = this.sigBytes;
                    t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8,
                    t.length = e.ceil(n / 4)
                },
                clone: function() {
                    var e = i.clone.call(this);
                    return e.words = this.words.slice(0),
                    e
                },
                random: function(t) {
                    for (var n, r = [], o = function(t) {
                        t = t;
                        var n = 987654321
                          , r = 4294967295;
                        return function() {
                            var o = ((n = 36969 * (65535 & n) + (n >> 16) & r) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & r) & r;
                            return o /= 4294967296,
                            (o += .5) * (e.random() > .5 ? 1 : -1)
                        }
                    }, i = 0; i < t; i += 4) {
                        var a = o(4294967296 * (n || e.random()));
                        n = 987654071 * a(),
                        r.push(4294967296 * a() | 0)
                    }
                    return new u.init(r,t)
                }
            })
              , a = r.enc = {}
              , c = a.Hex = {
                stringify: function(e) {
                    for (var t = e.words, n = e.sigBytes, r = [], o = 0; o < n; o++) {
                        var i = t[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                        r.push((i >>> 4).toString(16)),
                        r.push((15 & i).toString(16))
                    }
                    return r.join("")
                },
                parse: function(e) {
                    for (var t = e.length, n = [], r = 0; r < t; r += 2)
                        n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - r % 8 * 4;
                    return new u.init(n,t / 2)
                }
            }
              , l = a.Latin1 = {
                stringify: function(e) {
                    for (var t = e.words, n = e.sigBytes, r = [], o = 0; o < n; o++) {
                        var i = t[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                        r.push(String.fromCharCode(i))
                    }
                    return r.join("")
                },
                parse: function(e) {
                    for (var t = e.length, n = [], r = 0; r < t; r++)
                        n[r >>> 2] |= (255 & e.charCodeAt(r)) << 24 - r % 4 * 8;
                    return new u.init(n,t)
                }
            }
              , s = a.Utf8 = {
                stringify: function(e) {
                    try {
                        return decodeURIComponent(escape(l.stringify(e)))
                    } catch (e) {
                        throw new Error("Malformed UTF-8 data")
                    }
                },
                parse: function(e) {
                    return l.parse(unescape(encodeURIComponent(e)))
                }
            }
              , f = o.BufferedBlockAlgorithm = i.extend({
                reset: function() {
                    this._data = new u.init,
                    this._nDataBytes = 0
                },
                _append: function(e) {
                    "string" == typeof e && (e = s.parse(e)),
                    this._data.concat(e),
                    this._nDataBytes += e.sigBytes
                },
                _process: function(t) {
                    var n = this._data
                      , r = n.words
                      , o = n.sigBytes
                      , i = this.blockSize
                      , a = o / (4 * i)
                      , c = (a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * i
                      , l = e.min(4 * c, o);
                    if (c) {
                        for (var s = 0; s < c; s += i)
                            this._doProcessBlock(r, s);
                        var f = r.splice(0, c);
                        n.sigBytes -= l
                    }
                    return new u.init(f,l)
                },
                clone: function() {
                    var e = i.clone.call(this);
                    return e._data = this._data.clone(),
                    e
                },
                _minBufferSize: 0
            })
              , p = (o.Hasher = f.extend({
                cfg: i.extend(),
                init: function(e) {
                    this.cfg = this.cfg.extend(e),
                    this.reset()
                },
                reset: function() {
                    f.reset.call(this),
                    this._doReset()
                },
                update: function(e) {
                    return this._append(e),
                    this._process(),
                    this
                },
                finalize: function(e) {
                    return e && this._append(e),
                    this._doFinalize()
                },
                blockSize: 16,
                _createHelper: function(e) {
                    return function(t, n) {
                        return new e.init(n).finalize(t)
                    }
                },
                _createHmacHelper: function(e) {
                    return function(t, n) {
                        return new p.HMAC.init(e,n).finalize(t)
                    }
                }
            }),
            r.algo = {});
            return r
        }(Math),
        r)
    }


,
176: function(e, _t, n) {
        var r;
        e.exports = (r = n(43),
        function() {
            var e = r
              , t = e.lib.WordArray;
            function n(e, n, r) {
                for (var o = [], i = 0, u = 0; u < n; u++)
                    if (u % 4) {
                        var a = r[e.charCodeAt(u - 1)] << u % 4 * 2
                          , c = r[e.charCodeAt(u)] >>> 6 - u % 4 * 2;
                        o[i >>> 2] |= (a | c) << 24 - i % 4 * 8,
                        i++
                    }
                return t.create(o, i)
            }
            e.enc.Base64 = {
                stringify: function(e) {
                    var t = e.words
                      , n = e.sigBytes
                      , r = this._map;
                    e.clamp();
                    for (var o = [], i = 0; i < n; i += 3)
                        for (var u = (t[i >>> 2] >>> 24 - i % 4 * 8 & 255) << 16 | (t[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255) << 8 | t[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255, a = 0; a < 4 && i + .75 * a < n; a++)
                            o.push(r.charAt(u >>> 6 * (3 - a) & 63));
                    var c = r.charAt(64);
                    if (c)
                        for (; o.length % 4; )
                            o.push(c);
                    return o.join("")
                },
                parse: function(e) {
                    var t = e.length
                      , r = this._map
                      , o = this._reverseMap;
                    if (!o) {
                        o = this._reverseMap = [];
                        for (var i = 0; i < r.length; i++)
                            o[r.charCodeAt(i)] = i
                    }
                    var u = r.charAt(64);
                    if (u) {
                        var a = e.indexOf(u);
                        -1 !== a && (t = a)
                    }
                    return n(e, t, o)
                },
                _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
            }
        }(),
        r.enc.Base64)
    }


,
240: function(_e, t, n) {
        "use strict";
        //var a = n(14);
        var a=function(e){return e&&e.__esModule?e:{default:e}};
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = void 0;
        var nnn = function (e) {
            // return nn = function(e) {
                return typeof e
            // }
            ,
            nn(e)
        }
        ,rrr = function (t) {
                    // return "function" == typeof Symbol && "symbol" === nnn(Symbol.iterator) ? e.exports = rr = function(e) {
                    // return nnn(e)
                // }
                // : e.exports = rr = function(e) {
                //     return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : nnn(e)
                // }
                // ,
                // rr(t)
                return typeof t
            }
          , r=a(rrr)
          , l = a(n(697))
          , o = a(n(1306));

        function i() {
            var e = "WEB_".concat((0,
            o.default)());
            return l.default.set("DEVICEID", e, {
                expires: 30
            }),
            e
        }
        var s = {
            saveUser: function(e) {
                "object" === (0,
                r.default)(e) && e && (e = JSON.stringify(e),
                l.default.set("USER", e, {
                    expires: 7
                }))
            },
            getUser: function() {
                return !("object" !== ("undefined" == typeof window ? "undefined" : (0,
                r.default)(window)) || !l.default.get("USER")) && JSON.parse(l.default.get("USER"))
            },
            getJWT: function() {
                return !("object" !== ("undefined" == typeof window ? "undefined" : (0,
                r.default)(window)) || !l.default.get("USER")) && "Bearer " + JSON.parse(l.default.get("USER")).jwt
            },
            logout: function() {
                "object" === ("undefined" == typeof window ? "undefined" : (0,
                r.default)(window)) && l.default.remove("USER")
            },
            getDeviceId: function() {
                return "object" === ("undefined" == typeof window ? "undefined" : (0,
                r.default)(window)) && (l.default.get("DEVICEID") ? l.default.get("DEVICEID") : i())
            },
            createDeviceId: i
        };
        t.default = s
    }
,
1305: function(e, _t, n) {
    var r;
    e.exports = (r = n(43),
    n(393),
    n(285),
    r.HmacSHA256)
},
285: function(e, _t, n) {
        var r, o, i, u;
        e.exports = (r = n(43),
        i = (o = r).lib.Base,
        u = o.enc.Utf8,
        void (o.algo.HMAC = i.extend({
            init: function(e, t) {
                e = this._hasher = new e.init,
                "string" == typeof t && (t = u.parse(t));
                var n = e.blockSize
                  , r = 4 * n;
                t.sigBytes > r && (t = e.finalize(t)),
                t.clamp();
                for (var o = this._oKey = t.clone(), i = this._iKey = t.clone(), a = o.words, c = i.words, l = 0; l < n; l++)
                    a[l] ^= 1549556828,
                    c[l] ^= 909522486;
                o.sigBytes = i.sigBytes = r,
                this.reset()
            },
            reset: function() {
                var e = this._hasher;
                e.reset(),
                e.update(this._iKey)
            },
            update: function(e) {
                return this._hasher.update(e),
                this
            },
            finalize: function(e) {
                var t = this._hasher
                  , n = t.finalize(e);
                return t.reset(),
                t.finalize(this._oKey.clone().concat(n))
            }
        })))
    },
393: function(e, _t, n) {
        var r;
        e.exports = (r = n(43),
        function(e) {
            var t = r
              , n = t.lib
              , o = n.WordArray
              , i = n.Hasher
              , u = t.algo
              , a = []
              , c = [];
            !function() {
                function t(t) {
                    for (var n = e.sqrt(t), r = 2; r <= n; r++)
                        if (!(t % r))
                            return !1;
                    return !0
                }
                function n(e) {
                    return 4294967296 * (e - (0 | e)) | 0
                }
                for (var r = 2, o = 0; o < 64; )
                    t(r) && (o < 8 && (a[o] = n(e.pow(r, .5))),
                    c[o] = n(e.pow(r, 1 / 3)),
                    o++),
                    r++
            }();
            var l = []
              , s = u.SHA256 = i.extend({
                _doReset: function() {
                    this._hash = new o.init(a.slice(0))
                },
                _doProcessBlock: function(e, t) {
                    for (var n = this._hash.words, r = n[0], o = n[1], i = n[2], u = n[3], a = n[4], s = n[5], f = n[6], p = n[7], d = 0; d < 64; d++) {
                        if (d < 16)
                            l[d] = 0 | e[t + d];
                        else {
                            var h = l[d - 15]
                              , v = (h << 25 | h >>> 7) ^ (h << 14 | h >>> 18) ^ h >>> 3
                              , y = l[d - 2]
                              , m = (y << 15 | y >>> 17) ^ (y << 13 | y >>> 19) ^ y >>> 10;
                            l[d] = v + l[d - 7] + m + l[d - 16]
                        }
                        var g = r & o ^ r & i ^ o & i
                          , b = (r << 30 | r >>> 2) ^ (r << 19 | r >>> 13) ^ (r << 10 | r >>> 22)
                          , _ = p + ((a << 26 | a >>> 6) ^ (a << 21 | a >>> 11) ^ (a << 7 | a >>> 25)) + (a & s ^ ~a & f) + c[d] + l[d];
                        p = f,
                        f = s,
                        s = a,
                        a = u + _ | 0,
                        u = i,
                        i = o,
                        o = r,
                        r = _ + (b + g) | 0
                    }
                    n[0] = n[0] + r | 0,
                    n[1] = n[1] + o | 0,
                    n[2] = n[2] + i | 0,
                    n[3] = n[3] + u | 0,
                    n[4] = n[4] + a | 0,
                    n[5] = n[5] + s | 0,
                    n[6] = n[6] + f | 0,
                    n[7] = n[7] + p | 0
                },
                _doFinalize: function() {
                    var t = this._data
                      , n = t.words
                      , r = 8 * this._nDataBytes
                      , o = 8 * t.sigBytes;
                    return n[o >>> 5] |= 128 << 24 - o % 32,
                    n[14 + (o + 64 >>> 9 << 4)] = e.floor(r / 4294967296),
                    n[15 + (o + 64 >>> 9 << 4)] = r,
                    t.sigBytes = 4 * n.length,
                    this._process(),
                    this._hash
                },
                clone: function() {
                    var e = i.clone.call(this);
                    return e._hash = this._hash.clone(),
                    e
                }
            });
            t.SHA256 = i._createHelper(s),
            t.HmacSHA256 = i._createHmacHelper(s)
        }(Math),
        r.SHA256)
    },
1306: function(e, _t, n) {
    var r, o, i = n(1307), a = n(1308), s = 0, c = 0;
    e.exports = function(e, t, n) {
        var u = t && n || 0
          , l = t || []
          , f = (e = e || {}).node || r
          , d = void 0 !== e.clockseq ? e.clockseq : o;
        if (null == f || null == d) {
            var p = i();
            null == f && (f = r = [1 | p[0], p[1], p[2], p[3], p[4], p[5]]),
            null == d && (d = o = 16383 & (p[6] << 8 | p[7]))
        }
        var h = void 0 !== e.msecs ? e.msecs : (new Date).getTime()
          , m = void 0 !== e.nsecs ? e.nsecs : c + 1
          , v = h - s + (m - c) / 1e4;
        if (v < 0 && void 0 === e.clockseq && (d = d + 1 & 16383),
        (v < 0 || h > s) && void 0 === e.nsecs && (m = 0),
        m >= 1e4)
            throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
        s = h,
        c = m,
        o = d;
        var y = (1e4 * (268435455 & (h += 122192928e5)) + m) % 4294967296;
        l[u++] = y >>> 24 & 255,
        l[u++] = y >>> 16 & 255,
        l[u++] = y >>> 8 & 255,
        l[u++] = 255 & y;
        var g = h / 4294967296 * 1e4 & 268435455;
        l[u++] = g >>> 8 & 255,
        l[u++] = 255 & g,
        l[u++] = g >>> 24 & 15 | 16,
        l[u++] = g >>> 16 & 255,
        l[u++] = d >>> 8 | 128,
        l[u++] = 255 & d;
        for (var b = 0; b < 6; ++b)
            l[u + b] = f[b];
        return t || a(l)
    }
},
1307: function(e, _t) {
    var n = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);
    if (n) {
        var r = new Uint8Array(16);
        e.exports = function() {
            return n(r),
            r
        }
    } else {
        var o = new Array(16);
        e.exports = function() {
            for (var e, t = 0; t < 16; t++)
                0 == (3 & t) && (e = 4294967296 * Math.random()),
                o[t] = e >>> ((3 & t) << 3) & 255;
            return o
        }
    }
}
,
1308: function(e, _t) {
    for (var n = [], r = 0; r < 256; ++r)
        n[r] = (r + 256).toString(16).substr(1);
    e.exports = function(e, t) {
        var r = t || 0
          , o = n;
        return [o[e[r++]], o[e[r++]], o[e[r++]], o[e[r++]], "-", o[e[r++]], o[e[r++]], "-", o[e[r++]], o[e[r++]], "-", o[e[r++]], o[e[r++]], "-", o[e[r++]], o[e[r++]], o[e[r++]], o[e[r++]], o[e[r++]], o[e[r++]]].join("")
    }
}
,
697: function(e, t, n) {
    var r, o;
    !function(i) {
        if (void 0 === (o = "function" == typeof (r = i) ? r.call(t, n, t, e) : r) || (e.exports = o),
        !0,
        e.exports = i(),
        !!0) {
            var a = window.Cookies
              , s = window.Cookies = i();
            s.noConflict = function() {
                return window.Cookies = a,
                s
            }
        }
    }((function() {
        function e() {
            for (var e = 0, t = {}; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n)
                    t[r] = n[r]
            }
            return t
        }
        function t(e) {
            return e.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent)
        }
        return function n(r) {
            function o() {}
            function i(t, n, i) {
                if ("undefined" != typeof document) {
                    "number" == typeof (i = e({
                        path: "/"
                    }, o.defaults, i)).expires && (i.expires = new Date(1 * new Date + 864e5 * i.expires)),
                    i.expires = i.expires ? i.expires.toUTCString() : "";
                    try {
                        var a = JSON.stringify(n);
                        /^[\{\[]/.test(a) && (n = a)
                    } catch (e) {}
                    n = r.write ? r.write(n, t) : encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent),
                    t = encodeURIComponent(String(t)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
                    var s = "";
                    for (var c in i)
                        i[c] && (s += "; " + c,
                        !0 !== i[c] && (s += "=" + i[c].split(";")[0]));
                    return document.cookie = t + "=" + n + s
                }
            }
            function a(e, n) {
                if ("undefined" != typeof document) {
                    for (var o = {}, i = document.cookie ? document.cookie.split("; ") : [], a = 0; a < i.length; a++) {
                        var s = i[a].split("=")
                          , c = s.slice(1).join("=");
                        n || '"' !== c.charAt(0) || (c = c.slice(1, -1));
                        try {
                            var u = t(s[0]);
                            if (c = (r.read || r)(c, u) || t(c),
                            n)
                                try {
                                    c = JSON.parse(c)
                                } catch (e) {}
                            if (o[u] = c,
                            e === u)
                                break
                        } catch (e) {}
                    }
                    return e ? o[e] : o
                }
            }
            return o.set = i,
            o.get = function(e) {
                return a(e, !1)
            }
            ,
            o.getJSON = function(e) {
                return a(e, !0)
            }
            ,
            o.remove = function(t, n) {
                i(t, "", e(n, {
                    expires: -1
                }))
            }
            ,
            o.defaults = {},
            o.withConverter = n,
            o
        }((function() {}
        ))
    }
    ))
}    
})

var AAA=demo(696);
console.log(AAA.s("GET", "https://tcdn-api.itouchtv.cn/getParam", ""))
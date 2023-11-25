var demo;

function get_sign_data(text, key) {
    var hexString = demo("4d09").doSignature(text, key, {hash: !0}),
    textString = "";
    for (let i = 0; i < hexString.length; i += 2) {
        const byte = parseInt(hexString.substr(i, 2), 16);
        textString += String.fromCharCode(byte);
    }
    return base64encode(textString);
}

function base64encode(str) {
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    out="", i=0, c1, c2, c3, len = str.length;
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}

!function(e) {
    var n = {};
    function o(t) {
        var i;
        return (n[t] || (i = n[t] = {
            i: t,
            l: !1,
            exports: {}
        }, e[t].call(i.exports, i, i.exports, o), i.l = !0, i)).exports
    }
    o.m = e, o.c = n, o.d = function(e, t, n) {
        o.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }, o.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, o.n = function(e) {
        var t = e && function() {
            return e
        };
        return o.d(t, "a", t), t
    }, o.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, demo = o
}({
    "07e3": function(e) {
        var n = {}.hasOwnProperty;
        e.exports = function(e, t) {
            return n.call(e, t)
        }
    },
    "294c": function(e) {
        e.exports = function(e) {
            try {
                return !!e()
            } catch (e) {
                return !0
            }
        }
    },
    "454f": function(e, _t, n) {
        (i = n("63b6"))(i.S + i.F * !n("8e60"), "Object", {
            defineProperty: n("d9f6").f
        });
        var i = n("584a").Object;
        e.exports = function(e, t, n) {
            return i.defineProperty(e, t, n)
        }
    },
    "4d09": function(_e, t, n) {
        "use strict";
        n.d(t, "doSignature", function() {
            return g
        });
        var i = n("f33e").BigInteger,
            o = {}.encodeDer,
            s = n("4d2d").SM3Digest,
            u = n("b381"),
            h = (n = u.generateEcparam()).G,
            d = n.curve,
            f = n.n;

        function g(e, t) {
            var r = (n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}).pointPool,
                a = n.der,
                s = n.hash,
                n = n.publicKey,
                e = "string" == typeof e ? u.parseUtf8StringToHex(e) : u.parseArrayBufferToHex(e),
                h = (s && (e = b(e, n || A(t))), new i(t, 16)),
                d = new i(e, 16),
                p = null,
                m = null,
                v = null;
            do {
                do {
                    var g, p = (g = r && r.length ? r.pop() : w()).k,
                        m = d.add(g.x1).mod(f)
                } while (m.equals(i.ZERO) || m.add(p).equals(f))
            } while ((v = h.add(i.ONE).modInverse(f).multiply(p.subtract(m.multiply(h))).mod(f)).equals(i.ZERO));
            return a ? o(m, v) : u.leftPad(m.toString(16), 64) + u.leftPad(v.toString(16), 64)
        }

        function b(e, t) {
            var n = new s,
                t = (new s).getZ(h, t.substr(2, 128)),
                t = u.hexToArray(u.arrayToHex(t).toString()),
                e = u.hexToArray(e),
                l = Array(n.getDigestSize());
            return n.blockUpdate(t, 0, t.length), n.blockUpdate(e, 0, e.length), n.doFinal(l, 0), u.arrayToHex(l).toString()
        }

        function A(e) {
            return e = h.multiply(new i(e, 16)), "04" + u.leftPad(e.getX().toBigInteger().toString(16), 64) + u.leftPad(e.getY().toBigInteger().toString(16), 64)
        }

        function w() {
            var e = u.generateKeyPairHex(),
                t = d.decodePointHex(e.publicKey);
            return e.k = new i(e.privateKey, 16), e.x1 = t.getX().toBigInteger(), e
        }
        t.default = {
            doSignature: g
        }
    },
    "4d2d": function(_e, t, n) {
        "use strict";

        function s(e, t, n, i, r) {
            for (var o = 0; o < r; o++) n[i + o] = e[t + o]
        }
        n.r(t), n.d(t, "SM3Digest", function() {
            return u
        });
        var i = n("d225"),
            r = n("b0b4"),
            o = (n("6b54"), n("f33e").BigInteger),
            a = n("b381"),
            l = {
                minValue: -2147483648,
                maxValue: 2147483647,
                parse: function(e) {
                    if (e < this.minValue) {
                        for (var n = (t = (+("" + -e)).toString(2)).substr(t.length - 31, 31), i = "", r = 0; r < n.length; r++) i += "0" == n.substr(r, 1) ? "1" : "0";
                        return parseInt(i, 2) + 1
                    }
                    if (e > this.maxValue) {
                        for (var t, a = (t = (+("" + e)).toString(2)).substr(t.length - 31, 31), s = "", l = 0; l < a.length; l++) s += "0" == a.substr(l, 1) ? "1" : "0";
                        return -(parseInt(s, 2) + 1)
                    }
                    return e
                },
                parseByte: function(e) {
                    if (e < 0) {
                        for (var t = (+("" + -e)).toString(2), n = t.substr(t.length - 8, 8), i = "", r = 0; r < n.length; r++) i += "0" == n.substr(r, 1) ? "1" : "0";
                        return (parseInt(i, 2) + 1) % 256
                    }
                    return 255 < e ? parseInt((t = (+("" + e)).toString(2)).substr(t.length - 8, 8), 2) : e
                }
            },
            u = function() {
                function e() {
                    (0, i.a)(this, e), this.xBuf = [], this.xBufOff = 0, this.byteCount = 0, this.DIGEST_LENGTH = 32, this.v0 = [1937774191, 1226093241, 388252375, 3666478592, 2842636476, 372324522, 3817729613, 2969243214], this.v0 = [1937774191, 1226093241, 388252375, -628488704, -1452330820, 372324522, -477237683, -1325724082], this.v = Array(8), this.v_ = Array(8), this.X0 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], this.X = Array(68), this.xOff = 0, this.T_00_15 = 2043430169, this.T_16_63 = 2055708042, 0 < arguments.length ? this.initDigest(arguments.length <= 0 ? void 0 : arguments[0]) : this.init()
                }
                return (0, r.a)(e, [{
                    key: "init",
                    value: function() {
                        this.xBuf = [, , , , ], this.reset()
                    }
                }, {
                    key: "getDigestSize",
                    value: function() {
                        return this.DIGEST_LENGTH
                    }
                }, {
                    key: "reset",
                    value: function() {
                        this.byteCount = 0, this.xBufOff = 0;
                        for (var e = Object.keys(this.xBuf), t = 0, n = e.length; t < n; t++) this.xBuf[e[t]] = null;
                        s(this.v0, 0, this.v, 0, this.v0.length), this.xOff = 0, s(this.X0, 0, this.X, 0, this.X0.length)
                    }
                }, {
                    key: "processBlock",
                    value: function() {
                        for (var t = this.X, n = Array(64), e = 16; e < 68; e++) t[e] = this.p1(t[e - 16] ^ t[e - 9] ^ this.rotate(t[e - 3], 15)) ^ this.rotate(t[e - 13], 7) ^ t[e - 6];
                        for (e = 0; e < 64; e++) n[e] = t[e] ^ t[e + 4];
                        var i, r, o, a, u, c = this.v,
                            h = this.v_;
                        for (s(c, 0, h, 0, this.v0.length), e = 0; e < 16; e++) u = this.rotate(h[0], 12), i = l.parse(l.parse(u + h[4]) + this.rotate(this.T_00_15, e)), r = (i = this.rotate(i, 7)) ^ u, o = l.parse(l.parse(this.ff_00_15(h[0], h[1], h[2]) + h[3]) + r) + n[e], a = l.parse(l.parse(this.gg_00_15(h[4], h[5], h[6]) + h[7]) + i) + t[e], h[3] = h[2], h[2] = this.rotate(h[1], 9), h[1] = h[0], h[0] = o, h[7] = h[6], h[6] = this.rotate(h[5], 19), h[5] = h[4], h[4] = this.p0(a);
                        for (e = 16; e < 64; e++) u = this.rotate(h[0], 12), i = l.parse(l.parse(u + h[4]) + this.rotate(this.T_16_63, e)), r = (i = this.rotate(i, 7)) ^ u, o = l.parse(l.parse(this.ff_16_63(h[0], h[1], h[2]) + h[3]) + r) + n[e], a = l.parse(l.parse(this.gg_16_63(h[4], h[5], h[6]) + h[7]) + i) + t[e], h[3] = h[2], h[2] = this.rotate(h[1], 9), h[1] = h[0], h[0] = o, h[7] = h[6], h[6] = this.rotate(h[5], 19), h[5] = h[4], h[4] = this.p0(a);
                        for (e = 0; e < 8; e++) c[e] ^= l.parse(h[e]);
                        this.xOff = 0, s(this.X0, 0, this.X, 0, this.X0.length)
                    }
                }, {
                    key: "processWord",
                    value: function(e, t) {
                        var n = e[t] << 24,
                            n = (n |= (255 & e[++t]) << 16) | (255 & e[++t]) << 8 | 255 & e[++t];
                        this.X[this.xOff] = n, 16 == ++this.xOff && this.processBlock()
                    }
                }, {
                    key: "processLength",
                    value: function(e) {
                        14 < this.xOff && this.processBlock(), this.X[14] = this.urShiftLong(e, 32), this.X[15] = 4294967295 & e
                    }
                }, {
                    key: "intToBigEndian",
                    value: function(e, t, n) {
                        t[n] = 255 & l.parseByte(this.urShift(e, 24)), t[++n] = 255 & l.parseByte(this.urShift(e, 16)), t[++n] = 255 & l.parseByte(this.urShift(e, 8)), t[++n] = 255 & l.parseByte(e)
                    }
                }, {
                    key: "doFinal",
                    value: function(e, t) {
                        this.finish();
                        for (var n = 0; n < 8; n++) this.intToBigEndian(this.v[n], e, t + 4 * n);
                        return this.reset(), this.DIGEST_LENGTH
                    }
                }, {
                    key: "update",
                    value: function(e) {
                        this.xBuf[this.xBufOff++] = e, this.xBufOff === this.xBuf.length && (this.processWord(this.xBuf, 0), this.xBufOff = 0), this.byteCount++
                    }
                }, {
                    key: "blockUpdate",
                    value: function(e, t, n) {
                        for (; 0 !== this.xBufOff && 0 < n;) this.update(e[t]), t++, n--;
                        for (; n > this.xBuf.length;) this.processWord(e, t), t += this.xBuf.length, n -= this.xBuf.length, this.byteCount += this.xBuf.length;
                        for (; 0 < n;) this.update(e[t]), t++, n--
                    }
                }, {
                    key: "finish",
                    value: function() {
                        var e = this.byteCount << 3;
                        for (this.update(128); 0 !== this.xBufOff;) this.update(0);
                        this.processLength(e), this.processBlock()
                    }
                }, {
                    key: "rotate",
                    value: function(e, t) {
                        return e << t | this.urShift(e, 32 - t)
                    }
                }, {
                    key: "p0",
                    value: function(e) {
                        return e ^ this.rotate(e, 9) ^ this.rotate(e, 17)
                    }
                }, {
                    key: "p1",
                    value: function(e) {
                        return e ^ this.rotate(e, 15) ^ this.rotate(e, 23)
                    }
                }, {
                    key: "ff_00_15",
                    value: function(e, t, n) {
                        return e ^ t ^ n
                    }
                }, {
                    key: "ff_16_63",
                    value: function(e, t, n) {
                        return e & t | e & n | t & n
                    }
                }, {
                    key: "gg_00_15",
                    value: function(e, t, n) {
                        return e ^ t ^ n
                    }
                }, {
                    key: "gg_16_63",
                    value: function(e, t, n) {
                        return e & t | ~e & n
                    }
                }, {
                    key: "urShift",
                    value: function(e, t) {
                        return (e = l.maxValue < e || e < l.minValue ? l.parse(e) : e) >>> t
                    }
                }, {
                    key: "urShiftLong",
                    value: function(e, t) {
                        var i = new o;
                        if (i.fromInt(e), 0 <= i.signum()) n = i.shiftRight(t).intValue();
                        else {
                            (i = new o).fromInt(2);
                            var s = "";
                            if ((a = ~t) < 0) {
                                for (var l = 64 + a, u = 0; u < l; u++) s += "0";
                                (a = new o).fromInt(e >> t);
                                var a, h = new o("10" + s, 2),
                                    s = h.toRadix(10),
                                    n = h.add(a).toRadix(10)
                            } else n = (e >> t) + (s = i.shiftLeft(~t).intValue())
                        }
                        return n
                    }
                }, {
                    key: "getZ",
                    value: function(e, t) {
                        var i = 4 * (n = a.parseUtf8StringToHex("1234567812345678")).length,
                            i = (this.update(i >> 8 & 255), this.update(255 & i), a.hexToArray(n)),
                            n = (this.blockUpdate(i, 0, i.length), a.hexToArray(e.curve.a.toBigInteger().toRadix(16))),
                            i = a.hexToArray(e.curve.b.toBigInteger().toRadix(16)),
                            l = a.hexToArray(e.getX().toBigInteger().toRadix(16)),
                            e = a.hexToArray(e.getY().toBigInteger().toRadix(16)),
                            c = a.hexToArray(t.substr(0, 64)),
                            t = a.hexToArray(t.substr(64, 64)),
                            n = (this.blockUpdate(n, 0, n.length), this.blockUpdate(i, 0, i.length), this.blockUpdate(l, 0, l.length), this.blockUpdate(e, 0, e.length), this.blockUpdate(c, 0, c.length), this.blockUpdate(t, 0, t.length), Array(this.getDigestSize()));
                        return this.doFinal(n, 0), n
                    }
                }]), e
            }()
    },
    "584a": function(e) {
        e = e.exports = {
            version: "2.6.12"
        }, "number" == typeof __e && (__e = e)
    },
    "63b6": function(e, _t, n) {
        function l(e, t, n) {
            var u, c, h, d = e & l.F,
                f = e & l.G,
                p = e & l.S,
                m = e & l.P,
                v = e & l.B,
                g = e & l.W,
                y = f ? r : r[t] || (r[t] = {}),
                b = y.prototype,
                A = f ? i : p ? i[t] : (i[t] || {}).prototype;
            for (u in n = f ? t : n)(c = !d && A && void 0 !== A[u]) && s(y, u) || (h = (c ? A : n)[u], y[u] = f && "function" != typeof A[u] ? n[u] : v && c ? o(h, i) : g && A[u] == h ? function() {
                function t() {}
                return t.prototype = h.prototype, t
            }() : m && "function" == typeof h ? o(Function.call, h) : h, m && ((y.virtual || (y.virtual = {}))[u] = h, e & l.R) && b && !b[u] && a(b, u, h))
        }
        var i = {},
            r = n("584a"),
            s = n("07e3");
        l.F = 1, l.G = 2, l.S = 4, l.P = 8, l.B = 16, l.W = 32, l.U = 64, l.R = 128, e.exports = l
    },
    "6b54": function(_e, _t, _n) {
        "use strict";
        return "/a/b" != /./.toString.call({
            source: "a",
            flags: "b"
        })
    },
    "85f2": function(e, _t, n) {
        e.exports = n("454f")
    },
    "8e60": function(e, _t, n) {
        e.exports = !n("294c")(function() {
            return 7 != Object.defineProperty({}, "a", {
                get: function() {
                    return 7
                }
            }).a
        })
    },
    b0b4: function(_e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return a
        });
        var t = n("85f2"),
            r = n.n(t);

        function o(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), r()(e, i.key, i)
            }
        }

        function a(e, t, n) {
            return t && o(e.prototype, t), n && o(e, n), r()(e, "prototype", {
                writable: !1
            }), e
        }
    },
    b381: function(_e, t, n) {
        "use strict";
        n.d(t, "generateEcparam", function() {
            return y
        }), n.d(t, "generateKeyPairHex", function() {
            return b
        }), n.d(t, "parseUtf8StringToHex", function() {
            return A
        }), n.d(t, "leftPad", function() {
            return x
        }), n.d(t, "arrayToHex", function() {
            return C
        }), n.d(t, "hexToArray", function() {
            return S
        });
        var i = n("d225"),
            r = n("b0b4"),
            o = n("f33e").BigInteger,
            a = new o("3"),
            s = function() {
                function e(t, n) {
                    (0, i.a)(this, e), this.x = n, this.q = t
                }
                return (0, r.a)(e, [{
                    key: "toBigInteger",
                    value: function() {
                        return this.x
                    }
                }, {
                    key: "negate",
                    value: function() {
                        return new e(this.q, this.x.negate().mod(this.q))
                    }
                }]), e
            }(),
            l = function() {
                function e(t, n, r, a) {
                    (0, i.a)(this, e), this.curve = t, this.x = n, this.y = r, this.z = null == a ? o.ONE : a, this.zinv = null
                }
                return (0, r.a)(e, [{
                    key: "getX",
                    value: function() {
                        return null === this.zinv && (this.zinv = this.z.modInverse(this.curve.q)), this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q))
                    }
                }, {
                    key: "getY",
                    value: function() {
                        return null === this.zinv && (this.zinv = this.z.modInverse(this.curve.q)), this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q))
                    }
                }, {
                    key: "isInfinity",
                    value: function() {
                        return null === this.x && null === this.y || this.z.equals(o.ZERO) && !this.y.toBigInteger().equals(o.ZERO)
                    }
                }, {
                    key: "negate",
                    value: function() {
                        return new e(this.curve, this.x, this.y.negate(), this.z)
                    }
                }, {
                    key: "add",
                    value: function(t) {
                        var u, n, i, r, b, a, d, s;
                        return this.isInfinity() ? t : t.isInfinity() ? this : (n = this.x.toBigInteger(), i = this.y.toBigInteger(), r = this.z, a = t.x.toBigInteger(), s = t.y.toBigInteger(), t = t.z, u = this.curve.q, n = n.multiply(t).mod(u), a = a.multiply(r).mod(u), d = n.subtract(a), i = i.multiply(t).mod(u), s = s.multiply(r).mod(u), s = i.subtract(s), o.ZERO.equals(d) ? o.ZERO.equals(s) ? this.twice() : this.curve.infinity : (a = n.add(a), r = r.multiply(t).mod(u), t = d.square().mod(u), b = d.multiply(t).mod(u), a = r.multiply(s.square()).subtract(a.multiply(t)).mod(u), d = d.multiply(a).mod(u), s = s.multiply(t.multiply(n).subtract(a)).subtract(i.multiply(b)).mod(u), t = b.multiply(r).mod(u), new e(this.curve, this.curve.fromBigInteger(d), this.curve.fromBigInteger(s), t)))
                    }
                }, {
                    key: "twice",
                    value: function() {
                        var r, l, n, i, d, f, o, t;
                        return this.isInfinity() ? this : this.y.toBigInteger().signum() ? (t = this.x.toBigInteger(), n = this.y.toBigInteger(), i = this.z, r = this.curve.q, o = this.curve.a.toBigInteger(), o = t.square().multiply(a).add(o.multiply(i.square())).mod(r), l = n.shiftLeft(1).multiply(i).mod(r), t = (n = n.square().mod(r)).multiply(t).multiply(i).mod(r), i = l.square().mod(r), d = o.square().subtract(t.shiftLeft(3)).mod(r), f = l.multiply(d).mod(r), o = o.multiply(t.shiftLeft(2).subtract(d)).subtract(i.shiftLeft(1).multiply(n)).mod(r), t = l.multiply(i).mod(r), new e(this.curve, this.curve.fromBigInteger(f), this.curve.fromBigInteger(o), t)) : this.curve.infinity
                    }
                }, {
                    key: "multiply",
                    value: function(e) {
                        if (this.isInfinity()) return this;
                        if (!e.signum()) return this.curve.infinity;
                        for (var t = e.multiply(a), n = this.negate(), i = this, r = t.bitLength() - 2; 0 < r; r--) {
                            var i = i.twice(),
                                o = t.testBit(r);
                            o !== e.testBit(r) && (i = i.add(o ? this : n))
                        }
                        return i
                    }
                }]), e
            }(),
            u = function() {
                function e(t, n, r) {
                    (0, i.a)(this, e), this.q = t, this.a = this.fromBigInteger(n), this.b = this.fromBigInteger(r), this.infinity = new l(this, null, null)
                }
                return (0, r.a)(e, [{
                    key: "fromBigInteger",
                    value: function(e) {
                        return new s(this.q, e)
                    }
                }, {
                    key: "decodePointHex",
                    value: function(e) {
                        switch (parseInt(e.substr(0, 2), 16)) {
                            case 0:
                                return this.infinity;
                            case 2:
                            case 3:
                                return null;
                            case 4:
                            case 6:
                            case 7:
                                var t = (e.length - 2) / 2,
                                    n = e.substr(2, t),
                                    t = e.substr(2 + t, t);
                                return new l(this, this.fromBigInteger(new o(n, 16)), this.fromBigInteger(new o(t, 16)));
                            default:
                                return null
                        }
                    }
                }]), e
            }(),
            h = (n = n("f33e")).BigInteger,
            d = new n.SecureRandom,
            m = (n = y()).G,
            v = n.n;

        function y() {
            var e = new h("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFF", 16),
                t = new h("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFC", 16),
                n = new h("28E9FA9E9D9F5E344D5A9E4BCF6509A7F39789F515AB8F92DDBCBD414D940E93", 16);
            return {
                curve: e = new u(e, t, n),
                G: e.decodePointHex("0432C4AE2C1F1981195F9904466A39C9948FE30BBFF2660BE1715A4589334C74C7BC3736A2F4F6779C59BDCEE36B692153D0A9877CC62A474002DF32E52139F0A0"),
                n: new h("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFF7203DF6B21C6052B53BBF40939D54123", 16)
            }
        }

        function b() {
            var e = new h(v.bitLength(), d).mod(v.subtract(h.ONE)).add(h.ONE);
            return {
                privateKey: x(e.toString(16), 64),
                publicKey: "04" + x((e = m.multiply(e)).getX().toBigInteger().toString(16), 64) + x(e.getY().toBigInteger().toString(16), 64)
            }
        }

        function A(e) {
            for (var t = (e = unescape(encodeURIComponent(e))).length, n = [], i = 0; i < t; i++) n[i >>> 2] |= (255 & e.charCodeAt(i)) << 24 - i % 4 * 8;
            for (var r = [], o = 0; o < t; o++) {
                var a = n[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                r.push((a >>> 4).toString(16)), r.push((15 & a).toString(16))
            }
            return r.join("")
        }

        function x(e, t) {
            return e.length >= t ? e : Array(t - e.length + 1).join("0") + e
        }

        function C(e) {
            for (var t = [], n = 0, i = 0; i < 2 * e.length; i += 2) t[i >>> 3] |= parseInt(e[n], 10) << 24 - i % 8 * 4, n++;
            for (var r = [], o = 0; o < e.length; o++) {
                var a = t[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                r.push((a >>> 4).toString(16)), r.push((15 & a).toString(16))
            }
            return r.join("")
        }

        function S(e) {
            for (var t = [], n = (e = (n = e.length) % 2 != 0 ? x(e, n + 1) : e).length, i = 0; i < n; i += 2) t.push(parseInt(e.substr(i, 2), 16));
            return t
        }
        t.default = {
            generateEcparam: y,
            generateKeyPairHex: b,
            parseUtf8StringToHex: A,
            leftPad: x,
            arrayToHex: C,
            hexToArray: S
        }
    },
    d225: function(_e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        n.d(t, "a", function() {
            return i
        })
    },
    d9f6: function(_e, t) {
        t.f = Object.defineProperty
    },
    f33e: function(e) {
        function n(e, t, n) {
            null != e && ("number" == typeof e ? this.fromNumber(e, t, n) : null == t && "string" != typeof e ? this.fromString(e, 256) : this.fromString(e, t))
        }

        function i() {
            return new n(null)
        }
        n.prototype.am = function(e, t, n, i, r, o) {
            for (var a = 16383 & t, s = t >> 14; 0 <= --o;) {
                var l = 16383 & this[e],
                    u = this[e++] >> 14,
                    c = s * l + u * a;
                r = ((l = a * l + ((16383 & c) << 14) + n[i] + r) >> 28) + (c >> 14) + s * u, n[i++] = 268435455 & l
            }
            return r
        }, n.prototype.DB = 28, n.prototype.DM = 268435455, n.prototype.DV = 268435456, n.prototype.FV = 4503599627370496, n.prototype.F1 = 24, n.prototype.F2 = 4;
        for (var _, l = [], o = 48, a = 0; a <= 9; ++a) l[o++] = a;
        for (o = 97, a = 10; a < 36; ++a) l[o++] = a;
        for (o = 65, a = 10; a < 36; ++a) l[o++] = a;

        function u(e) {
            return "0123456789abcdefghijklmnopqrstuvwxyz" [0 | e] || ""
        }

        function c(e, t) {
            return null == (e = l[e.charCodeAt(t)]) ? -1 : e
        }

        function h(e) {
            var t = i();
            return t.fromInt(e), t
        }

        function d(e) {
            var t, n = 1;
            return 0 != (t = e >>> 16) && (e = t, n += 16), 0 != (t = e >> 8) && (e = t, n += 8), 0 != (t = e >> 4) && (e = t, n += 4), 0 != (t = e >> 2) && (e = t, n += 2), 0 != (t = e >> 1) && (e = t, n += 1), n
        }

        function D() {
            var e = (new Date).getTime();
            S[k++] ^= 255 & e, S[k++] ^= e >> 8 & 255, S[k++] ^= e >> 16 & 255, S[k++] ^= e >> 24 & 255, F <= k && (k -= F)
        }
        if (n.prototype.copyTo = function(e) {
            for (var t = this.t - 1; 0 <= t; --t) e[t] = this[t];
            e.t = this.t, e.s = this.s
        }, n.prototype.fromInt = function(e) {
            this.t = 1, this.s = e < 0 ? -1 : 0, 0 < e ? this[0] = e : e < -1 ? this[0] = e + this.DV : this.t = 0
        }, n.prototype.fromString = function(e, t) {
            var i;
            if (16 == t) i = 4;
            else if (8 == t) i = 3;
            else if (256 == t) i = 8;
            else if (2 == t) i = 1;
            else if (32 == t) i = 5;
            else {
                if (4 != t) return void this.fromRadix(e, t);
                i = 2
            }
            this.t = 0, this.s = 0;
            for (var r = e.length, o = !1, a = 0; 0 <= --r;) {
                var s = 8 == i ? 255 & e[r] : c(e, r);
                s < 0 ? "-" == (e[0 | r] || "") && (o = !0) : (o = !1, 0 == a ? this[this.t++] = s : a + i > this.DB ? (this[this.t - 1] |= (s & (1 << this.DB - a) - 1) << a, this[this.t++] = s >> this.DB - a) : this[this.t - 1] |= s << a, (a += i) >= this.DB && (a -= this.DB))
            }
            8 == i && 0 != (128 & e[0]) && (this.s = -1, 0 < a) && (this[this.t - 1] |= (1 << this.DB - a) - 1 << a), this.clamp(), o && n.ZERO.subTo(this, this)
        }, n.prototype.clamp = function() {
            for (var e = this.s & this.DM; 0 < this.t && this[this.t - 1] == e;)--this.t
        }, n.prototype.dlShiftTo = function(e, t) {
            for (var n = this.t - 1; 0 <= n; --n) t[n + e] = this[n];
            for (n = e - 1; 0 <= n; --n) t[n] = 0;
            t.t = this.t + e, t.s = this.s
        }, n.prototype.drShiftTo = function(e, t) {
            for (var n = e; n < this.t; ++n) t[n - e] = this[n];
            t.t = Math.max(this.t - e, 0), t.s = this.s
        }, n.prototype.lShiftTo = function(e, t) {
            for (var i = e % this.DB, r = this.DB - i, o = (1 << r) - 1, a = Math.floor(e / this.DB), s = this.s << i & this.DM, n = this.t - 1; 0 <= n; --n) t[n + a + 1] = this[n] >> r | s, s = (this[n] & o) << i;
            for (n = a - 1; 0 <= n; --n) t[n] = 0;
            t[a] = s, t.t = this.t + a + 1, t.s = this.s, t.clamp()
        }, n.prototype.rShiftTo = function(e, t) {
            t.s = this.s;
            var n = Math.floor(e / this.DB);
            if (n >= this.t) t.t = 0;
            else {
                var i = e % this.DB,
                    r = this.DB - i,
                    o = (1 << i) - 1;
                t[0] = this[n] >> i;
                for (var a = 1 + n; a < this.t; ++a) t[a - n - 1] |= (this[a] & o) << r, t[a - n] = this[a] >> i;
                0 < i && (t[this.t - n - 1] |= (this.s & o) << r), t.t = this.t - n, t.clamp()
            }
        }, n.prototype.subTo = function(e, t) {
            for (var n = 0, i = 0, r = Math.min(e.t, this.t); n < r;) i += this[n] - e[n], t[n++] = i & this.DM, i >>= this.DB;
            if (e.t < this.t) {
                for (i -= e.s; n < this.t;) i += this[n], t[n++] = i & this.DM, i >>= this.DB;
                i += this.s
            } else {
                for (i += this.s; n < e.t;) i -= e[n], t[n++] = i & this.DM, i >>= this.DB;
                i -= e.s
            }
            t.s = i < 0 ? -1 : 0, i < -1 ? t[n++] = this.DV + i : 0 < i && (t[n++] = i), t.t = n, t.clamp()
        }, n.prototype.multiplyTo = function(e, t) {
            var i = this.abs(),
                r = e.abs(),
                o = i.t;
            for (t.t = o + r.t; 0 <= --o;) t[o] = 0;
            for (o = 0; o < r.t; ++o) t[o + i.t] = i.am(0, r[o], t, o, 0, i.t);
            t.s = 0, t.clamp(), this.s != e.s && n.ZERO.subTo(t, t)
        }, n.prototype.squareTo = function(e) {
            for (var t = this.abs(), n = e.t = 2 * t.t; 0 <= --n;) e[n] = 0;
            for (n = 0; n < t.t - 1; ++n) {
                var i = t.am(n, t[n], e, 2 * n, 0, 1);
                (e[n + t.t] += t.am(n + 1, 2 * t[n], e, 2 * n + 1, i, t.t - n - 1)) >= t.DV && (e[n + t.t] -= t.DV, e[n + t.t + 1] = 1)
            }
            0 < e.t && (e[e.t - 1] += t.am(n, t[n], e, 2 * n, 0, 1)), e.s = 0, e.clamp()
        }, n.prototype.divRemTo = function(e, t, r) {
            if (!((o = e.abs()).t <= 0)) {
                var a = this.abs();
                if (a.t < o.t) null != t && t.fromInt(0), null != r && this.copyTo(r);
                else {
                    null == r && (r = i());
                    var s = i(),
                        l = this.s,
                        e = e.s,
                        c = this.DB - d(o[o.t - 1]),
                        h = (0 < c ? (o.lShiftTo(c, s), a.lShiftTo(c, r)) : (o.copyTo(s), a.copyTo(r)), s.t),
                        f = s[h - 1];
                    if (0 != f) {
                        var o = f * (1 << this.F1) + (1 < h ? s[h - 2] >> this.F2 : 0),
                            m = this.FV / o,
                            v = (1 << this.F1) / o,
                            g = 1 << this.F2,
                            y = r.t,
                            b = y - h,
                            A = null == t ? i() : t;
                        for (s.dlShiftTo(b, A), 0 <= r.compareTo(A) && (r[r.t++] = 1, r.subTo(A, r)), n.ONE.dlShiftTo(h, A), A.subTo(s, s); s.t < h;) s[s.t++] = 0;
                        for (; 0 <= --b;) {
                            var w = r[--y] == f ? this.DM : Math.floor(r[y] * m + (r[y - 1] + g) * v);
                            if ((r[y] += s.am(0, w, r, b, 0, h)) < w)
                                for (s.dlShiftTo(b, A), r.subTo(A, r); r[y] < --w;) r.subTo(A, r)
                        }
                        null != t && (r.drShiftTo(h, t), l != e) && n.ZERO.subTo(t, t), r.t = h, r.clamp(), 0 < c && r.rShiftTo(c, r), l < 0 && n.ZERO.subTo(r, r)
                    }
                }
            }
        }, n.prototype.isEven = function() {
            return 0 == (0 < this.t ? 1 & this[0] : this.s)
        }, n.prototype.toString = function(e) {
            if (this.s < 0) return "-" + this.negate().toString(e);
            var t;
            if (16 == e) t = 4;
            else if (8 == e) t = 3;
            else if (2 == e) t = 1;
            else if (32 == e) t = 5;
            else {
                if (4 != e) return this.toRadix(e);
                t = 2
            }
            var n, i = (1 << t) - 1,
                r = !1,
                o = "",
                a = this.t,
                s = this.DB - a * this.DB % t;
            if (0 < a--)
                for (s < this.DB && 0 < (n = this[a] >> s) && (r = !0, o = u(n)); 0 <= a;) s < t ? (n = (this[a] & (1 << s) - 1) << t - s, n |= this[--a] >> (s += this.DB - t)) : (n = this[a] >> (s -= t) & i, s <= 0 && (s += this.DB, --a)), (r = 0 < n || r) && (o += u(n));
            return r ? o : "0"
        }, n.prototype.negate = function() {
            var e = i();
            return n.ZERO.subTo(this, e), e
        }, n.prototype.abs = function() {
            return this.s < 0 ? this.negate() : this
        }, n.prototype.compareTo = function(e) {
            var t = this.s - e.s;
            if (0 != t) return t;
            var n = this.t;
            if (0 != (t = n - e.t)) return this.s < 0 ? -t : t;
            for (; 0 <= --n;)
                if (0 != (t = this[n] - e[n])) return t;
            return 0
        }, n.prototype.bitLength = function() {
            return this.t <= 0 ? 0 : this.DB * (this.t - 1) + d(this[this.t - 1] ^ this.s & this.DM)
        }, n.prototype.mod = function(e) {
            var t = i();
            return this.abs().divRemTo(e, null, t), this.s < 0 && 0 < t.compareTo(n.ZERO) && e.subTo(t, t), t
        }, n.ZERO = h(0), n.ONE = h(1), n.prototype.chunkSize = function(e) {
            return Math.floor(Math.LN2 * this.DB / Math.log(e))
        }, n.prototype.toRadix = function(e) {
            if (null == e && (e = 10), 0 == this.signum() || e < 2 || 36 < e) return "0";
            var t = this.chunkSize(e),
                n = Math.pow(e, t),
                r = h(n),
                o = i(),
                a = i(),
                s = "";
            for (this.divRemTo(r, o, a); 0 < o.signum();) s = (n + a.intValue()).toString(e).substr(1) + s, o.divRemTo(r, o, a);
            return a.intValue().toString(e) + s
        }, n.prototype.fromRadix = function(e, t) {
            this.fromInt(0);
            for (var i = this.chunkSize(t = null == t ? 10 : t), r = Math.pow(t, i), o = !1, a = 0, s = 0, l = 0; l < e.length; ++l) {
                var u = c(e, l);
                u < 0 ? "-" == (e[0 | l] || "") && 0 == this.signum() && (o = !0) : (s = t * s + u, ++a >= i && (this.dMultiply(r), this.dAddOffset(s, 0), s = a = 0))
            }
            0 < a && (this.dMultiply(Math.pow(t, a)), this.dAddOffset(s, 0)), o && n.ZERO.subTo(this, this)
        }, n.prototype.fromNumber = function(e, t, i) {
            if ("number" == typeof t)
                if (e < 2) this.fromInt(1);
                else
                    for (this.fromNumber(e, i), this.testBit(e - 1) || this.bitwiseTo(n.ONE.shiftLeft(e - 1), v, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(t);) this.dAddOffset(2, 0), this.bitLength() > e && this.subTo(n.ONE.shiftLeft(e - 1), this);
            else {
                var o = 7 & e;
                (i = []).length = 1 + (e >> 3), t.nextBytes(i), 0 < o ? i[0] &= (1 << o) - 1 : i[0] = 0, this.fromString(i, 256)
            }
        }, n.prototype.addTo = function(e, t) {
            for (var n = 0, i = 0, r = Math.min(e.t, this.t); n < r;) i += this[n] + e[n], t[n++] = i & this.DM, i >>= this.DB;
            if (e.t < this.t) {
                for (i += e.s; n < this.t;) i += this[n], t[n++] = i & this.DM, i >>= this.DB;
                i += this.s
            } else {
                for (i += this.s; n < e.t;) i += e[n], t[n++] = i & this.DM, i >>= this.DB;
                i += e.s
            }
            t.s = i < 0 ? -1 : 0, 0 < i ? t[n++] = i : i < -1 && (t[n++] = this.DV + i), t.t = n, t.clamp()
        }, n.prototype.dMultiply = function(e) {
            this[this.t] = this.am(0, e - 1, this, 0, 0, this.t), ++this.t, this.clamp()
        }, n.prototype.dAddOffset = function(e, t) {
            if (0 != e) {
                for (; this.t <= t;) this[this.t++] = 0;
                for (this[t] += e; this[t] >= this.DV;) this[t] -= this.DV, ++t >= this.t && (this[this.t++] = 0), ++this[t]
            }
        }, n.prototype.clone = function() {
            var e = i();
            return this.copyTo(e), e
        }, n.prototype.intValue = function() {
            if (this.s < 0) {
                if (1 == this.t) return this[0] - this.DV;
                if (0 == this.t) return -1
            } else {
                if (1 == this.t) return this[0];
                if (0 == this.t) return 0
            }
            return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
        }, n.prototype.equals = function(e) {
            return 0 == this.compareTo(e)
        }, n.prototype.signum = function() {
            return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
        }, n.prototype.shiftLeft = function(e) {
            var t = i();
            return e < 0 ? this.rShiftTo(-e, t) : this.lShiftTo(e, t), t
        }, n.prototype.shiftRight = function(e) {
            var t = i();
            return e < 0 ? this.lShiftTo(-e, t) : this.rShiftTo(e, t), t
        }, n.prototype.testBit = function(e) {
            var t = Math.floor(e / this.DB);
            return t >= this.t ? 0 != this.s : 0 != (this[t] & 1 << e % this.DB)
        }, n.prototype.add = function(e) {
            var t = i();
            return this.addTo(e, t), t
        }, n.prototype.subtract = function(e) {
            var t = i();
            return this.subTo(e, t), t
        }, n.prototype.multiply = function(e) {
            var t = i();
            return this.multiplyTo(e, t), t
        }, n.prototype.modInverse = function(e) {
            var t = e.isEven();
            if (this.isEven() && t || 0 == e.signum()) return n.ZERO;
            for (var i = e.clone(), r = this.clone(), o = h(1), a = h(0), s = h(0), l = h(1); 0 != i.signum();) {
                for (; i.isEven();) i.rShiftTo(1, i), t ? (o.isEven() && a.isEven() || (o.addTo(this, o), a.subTo(e, a)), o.rShiftTo(1, o)) : a.isEven() || a.subTo(e, a), a.rShiftTo(1, a);
                for (; r.isEven();) r.rShiftTo(1, r), t ? (s.isEven() && l.isEven() || (s.addTo(this, s), l.subTo(e, l)), s.rShiftTo(1, s)) : l.isEven() || l.subTo(e, l), l.rShiftTo(1, l);
                0 <= i.compareTo(r) ? (i.subTo(r, i), t && o.subTo(s, o), a.subTo(l, a)) : (r.subTo(i, r), t && s.subTo(o, s), l.subTo(a, l))
            }
            return 0 != r.compareTo(n.ONE) ? n.ZERO : 0 <= l.compareTo(e) ? l.subtract(e) : l.signum() < 0 && (l.addTo(e, l), l.signum() < 0) ? l.add(e) : l
        }, n.prototype.square = function() {
            var e = i();
            return this.squareTo(e), e
        }, n.prototype.Barrett = function() {}, null == S) {
            for (var T, S = [], k = 0, P = new Uint8Array(32), ii = 0; ii < P.length; ++ii) P[ii] = Math.floor(256 * Math.random());
            for (T = 0; T < 32; ++T) S[k++] = P[T];
            for (; k < F;) S[k++] = (T = Math.floor(65536 * Math.random())) >>> 8, S[k++] = 255 & T;
            k = 0, D()
        }

        function j() {}

        function N() {
            this.i = 0, this.j = 0, this.S = []
        }
        j.prototype.nextBytes = function(e) {
            for (var t = 0; t < e.length; ++t) e[t] = function() {
                if (null == _) {
                    for (D(), (_ = new N).init(S), k = 0; k < S.length; ++k) S[k] = 0;
                    k = 0
                }
                return _.next()
            }()
        }, N.prototype.init = function(e) {
            for (var n, i, t = 0; t < 256; ++t) this.S[t] = t;
            for (t = n = 0; t < 256; ++t) n = n + this.S[t] + e[t % e.length] & 255, i = this.S[t], this.S[t] = this.S[n], this.S[n] = i;
            this.i = 0, this.j = 0
        }, N.prototype.next = function() {
            var e;
            return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, e = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = e, this.S[e + this.S[this.i] & 255]
        };
        var F = 256;
        n.SecureRandom = j, e.exports = n.BigInteger = n
    }
});
var key = "009c4a35d9aca4c68f1a3fa89c93684347205a4d84dc260558a049869709ac0b42",
    text = 'appCode=T98HPCGN5ZVVQBS8LZQNOAEXVI9GYHKQ&data={"pageNum":"1","pageSize":"10","regnCode":"440100"}&encType=SM4&signType=SM2&timestamp=1689926207&version=1.0.0&key=NMVFVILMKT13GEMD3BKPKCTBOQBPZR2P';
console.log(get_sign_data(text, key));
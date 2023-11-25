var demo
!(function (t) {
  var e = {}
  function i (n) {
    if (e[n]) return e[n].exports
    var s = (e[n] = {
      i: n,
      l: !1,
      exports: {}
    })
    return t[n].call(s.exports, s, s.exports, i), (s.l = !0), s.exports
  }
  ;(i.n = function (e) {
    var r = function () {
            return e
          }
    return i.d(r, 'a', r), r
  }),
    (i.d = function (e, r, t) {
      i.o(e, r) ||
        Object.defineProperty(e, r, {
          enumerable: !0,
          get: t
        })
    }),
    (i.o = function (e, r) {
      return Object.prototype.hasOwnProperty.call(e, r)
    }),
    (demo = i)
})({
  Ib8C: function (e, t, n) {
    var r
    e.exports = r = r ||
      (function (e, t) {
        var o = Object.create,
          a = {},
          l = (a.lib = {}),
          s = (l.Base = {
            extend: function (e) {
              var t = o(this)
              return (
                e && t.mixIn(e),
                (t.hasOwnProperty('init') && this.init !== t.init) ||
                  (t.init = function () {
                    t.$super.init.apply(this, arguments)
                  }),
                (t.init.prototype = t),
                (t.$super = this),
                t
              )
            },
            create: function () {
              var e = this.extend()
              return e.init.apply(e, arguments), e
            },
            init: function () {},
            mixIn: function (e) {
              for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t])
              e.hasOwnProperty('toString') && (this.toString = e.toString)
            },
            clone: function () {
              return this.init.prototype.extend(this)
            }
          }),
          u = (l.WordArray = s.extend({
            init: function (e, t) {
              ;(e = this.words = e || []),
                (this.sigBytes = null != t ? t : 4 * e.length)
            },
            toString: function (e) {
              return (e || d).stringify(this)
            },
            concat: function (e) {
              var t = this.words,
                n = e.words,
                r = this.sigBytes,
                i = e.sigBytes
              if ((this.clamp(), r % 4))
                for (var o = 0; o < i; o++)
                  t[(r + o) >>> 2] |=
                    ((n[o >>> 2] >>> (24 - (o % 4) * 8)) & 255) <<
                    (24 - ((r + o) % 4) * 8)
              else for (var a = 0; a < i; a += 4) t[(r + a) >>> 2] = n[a >>> 2]
              return (this.sigBytes += i), this
            },
            clamp: function () {
              var t = this.words,
                n = this.sigBytes
              ;(t[n >>> 2] &= 4294967295 << (32 - (n % 4) * 8)),
                (t.length = e.ceil(n / 4))
            },
            clone: function () {
              var e = s.clone.call(this)
              return (e.words = this.words.slice(0)), e
            },
          })),
          c = (a.enc = {}),
          d = (c.Hex = {
            stringify: function (e) {
              for (var t = e.words, n = e.sigBytes, r = [], i = 0; i < n; i++) {
                var o = (t[i >>> 2] >>> (24 - (i % 4) * 8)) & 255
                r.push((o >>> 4).toString(16)), r.push((15 & o).toString(16))
              }
              return r.join('')
            },
            parse: function (e) {
              for (var t = e.length, n = [], r = 0; r < t; r += 2)
                n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << (24 - (r % 8) * 4)
              return new u.init(n, t / 2)
            }
          }),
          p = (c.Latin1 = {
            parse: function (e) {
              for (var t = e.length, n = [], r = 0; r < t; r++)
                n[r >>> 2] |= (255 & e.charCodeAt(r)) << (24 - (r % 4) * 8)
              return new u.init(n, t)
            }
          }),
          h = (c.Utf8 = {
            parse: function (e) {
              return p.parse(unescape(encodeURIComponent(e)))
            }
          }),
          f = (l.BufferedBlockAlgorithm = s.extend({
            reset: function () {
              ;(this._data = new u.init()), (this._nDataBytes = 0)
            },
            _append: function (e) {
              'string' == typeof e && (e = h.parse(e)),
                this._data.concat(e),
                (this._nDataBytes += e.sigBytes)
            },
            _process: function (t) {
              var n,
                r = this._data,
                i = r.words,
                o = r.sigBytes,
                a = this.blockSize,
                l = o / (4 * a),
                s =
                  (l = t
                    ? e.ceil(l)
                    : e.max((0 | l) - this._minBufferSize, 0)) * a,
                c = e.min(4 * s, o)
              if (s) {
                for (var d = 0; d < s; d += a) this._doProcessBlock(i, d)
                ;(n = i.splice(0, s)), (r.sigBytes -= c)
              }
              return new u.init(n, c)
            },
            _minBufferSize: 0
          })),
          m =
            ((l.Hasher = f.extend({
              cfg: s.extend(),
              init: function (e) {
                ;(this.cfg = this.cfg.extend(e)), this.reset()
              },
              reset: function () {
                f.reset.call(this), this._doReset()
              },
              update: function (e) {
                return this._append(e), this._process(), this
              },
              finalize: function (e) {
                return e && this._append(e), this._doFinalize()
              },
              blockSize: 16,
              _createHelper: function (e) {
                return
              },
              _createHmacHelper: function (e) {
                return
              }
            })),
            (a.algo = {}))
        return a
      })(Math)
  },
  qM6L: function (e, t, n) {
    var r
    e.exports =
      ((r = n('Ib8C')),
      (function () {
        var e = r.lib.WordArray,
          t = r.enc
        function n (e) {
          return ((e << 8) & 4278255360) | ((e >>> 8) & 16711935)
        }
        ;(t.Utf16 = t.Utf16BE = {}),
          (t.Utf16LE = {
            parse: function (t) {
              for (var r = t.length, i = [], o = 0; o < r; o++)
                i[o >>> 1] |= n(t.charCodeAt(o) << (16 - (o % 2) * 16))
              return e.create(i, 2 * r)
            }
          })
      })(),
      r.enc.Utf16)
  },
  ETIr: function (e, t, n) {
    var r, i
    e.exports =
      ((i = n('Ib8C')),
      (r = i.lib.WordArray),
      (i.enc.Base64 = {
        stringify: function (e) {
          var t = e.words,
            n = e.sigBytes,
            r = this._map
          e.clamp()
          for (var i = [], o = 0; o < n; o += 3)
            for (
              var a =
                  (((t[o >>> 2] >>> (24 - (o % 4) * 8)) & 255) << 16) |
                  (((t[(o + 1) >>> 2] >>> (24 - ((o + 1) % 4) * 8)) & 255) <<
                    8) |
                  ((t[(o + 2) >>> 2] >>> (24 - ((o + 2) % 4) * 8)) & 255),
                l = 0;
              l < 4 && o + 0.75 * l < n;
              l++
            )
              i.push(r.charAt((a >>> (6 * (3 - l))) & 63))
          var s = r.charAt(64)
          if (s) for (; i.length % 4; ) i.push(s)
          return i.join('')
        },
        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
      }),
      i.enc.Base64)
  },
  cv67: function (e, t, n) {
    var r
    e.exports =
      ((r = n('Ib8C')),
      (function (e) {
        var t = r,
          n = t.lib,
          i = n.WordArray,
          o = n.Hasher,
          a = t.algo,
          l = []
        !(function () {
          for (var t = 0; t < 64; t++)
            l[t] = (4294967296 * e.abs(e.sin(t + 1))) | 0
        })()
        var s = (a.MD5 = o.extend({
        }))
        ;(t.MD5 = o._createHelper(s)), (t.HmacMD5 = o._createHmacHelper(s))
      })(Math),
      r.MD5)
  },
  '3y9D': function (e, t, n) {
    var r, i, o, a, l, s, u
    e.exports =
      ((u = n('Ib8C')),
      (o = (i = (r = u).lib).WordArray),
      (l = []),
      (s = r.algo.SHA1 =
        (a = i.Hasher).extend({
          _doReset: function () {this._hash = new o.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])},
          _doProcessBlock: function (e, t) {
            for (
              var n = this._hash.words,
                r = n[0],
                i = n[1],
                o = n[2],
                a = n[3],
                s = n[4],
                u = 0;
              u < 80;
              u++
            ) {
              if (u < 16) l[u] = 0 | e[t + u]
              else {
                var c = l[u - 3] ^ l[u - 8] ^ l[u - 14] ^ l[u - 16]
                l[u] = (c << 1) | (c >>> 31)
              }
              var d = ((r << 5) | (r >>> 27)) + s + l[u]
              ;(d +=
                u < 20
                  ? 1518500249 + ((i & o) | (~i & a))
                  : u < 40
                  ? 1859775393 + (i ^ o ^ a)
                  : u < 60
                  ? ((i & o) | (i & a) | (o & a)) - 1894007588
                  : (i ^ o ^ a) - 899497514),
                (s = a),
                (a = o),
                (o = (i << 30) | (i >>> 2)),
                (i = r),
                (r = d)
            }
            ;(n[0] = (n[0] + r) | 0),
              (n[1] = (n[1] + i) | 0),
              (n[2] = (n[2] + o) | 0),
              (n[3] = (n[3] + a) | 0),
              (n[4] = (n[4] + s) | 0)
          },
          _doFinalize: function () {
            var e = this._data,
              t = e.words,
              n = 8 * this._nDataBytes,
              r = 8 * e.sigBytes
            return (
              (t[r >>> 5] |= 128 << (24 - (r % 32))),
              (t[14 + (((r + 64) >>> 9) << 4)] = Math.floor(n / 4294967296)),
              (t[15 + (((r + 64) >>> 9) << 4)] = n),
              (e.sigBytes = 4 * t.length),
              this._process(),
              this._hash
            )
          },
        })),
      (r.SHA1 = a._createHelper(s)),
      (r.HmacSHA1 = a._createHmacHelper(s)),
      u.SHA1)
  },
  WYAk: function (e, t, n) {
    var r, i
    e.exports =
      ((r = n('Ib8C')),
      (i = r.enc.Utf8),
      void (r.algo.HMAC = r.lib.Base.extend({
        init: function (e, t) {
          ;(e = this._hasher = new e.init()),
            'string' == typeof t && (t = i.parse(t))
          var n = e.blockSize,
            r = 4 * n
          t.sigBytes > r && (t = e.finalize(t)), t.clamp()
          for (
            var o = (this._oKey = t.clone()),
              a = (this._iKey = t.clone()),
              l = o.words,
              s = a.words,
              u = 0;
            u < n;
            u++
          )
            (l[u] ^= 1549556828), (s[u] ^= 909522486)
          ;(o.sigBytes = a.sigBytes = r), this.reset()
        },
        reset: function () {
          var e = this._hasher
          e.reset(), e.update(this._iKey)
        },
        update: function (e) {
          return this._hasher.update(e), this
        },
        finalize: function (e) {
          var t = this._hasher,
            n = t.finalize(e)
          return t.reset(), t.finalize(this._oKey.clone().concat(n))
        }
      })))
  },
  e7zE: function (e, t, n) {
    var r, i, o, a, l, s, u, c
    e.exports =
      ((c = n('Ib8C')),
      n('3y9D'),
      n('WYAk'),
      (a = (i = (r = c).lib).WordArray),
      (s = (l = r.algo).HMAC),
      (u = l.PBKDF2 =
        (o = i.Base).extend({
          cfg: o.extend({ keySize: 4, hasher: l.SHA1, iterations: 1 }),
          init: function (e) {
            this.cfg = this.cfg.extend(e)
          },
          compute: function (e, t) {
            for (
              var n = this.cfg,
                r = s.create(n.hasher, e),
                i = a.create(),
                o = a.create([1]),
                l = i.words,
                u = o.words,
                c = n.keySize,
                d = n.iterations;
              l.length < c;
            ) {
              var p = r.update(t).finalize(o)
              r.reset()
              for (var h = p.words, f = h.length, m = p, g = 1; g < d; g++) {
                ;(m = r.finalize(m)), r.reset()
                for (var _ = m.words, v = 0; v < f; v++) h[v] ^= _[v]
              }
              i.concat(p), u[0]++
            }
            return (i.sigBytes = 4 * c), i
          }
        })),
      (r.PBKDF2 = function (e, t, n) {
        return u.create(n).compute(e, t)
      }),
      c.PBKDF2)
  },
  K3mO: function (e, t, n) {
    var r, i, o, a, l, s, u
    e.exports =
      ((u = n('Ib8C')),
      n('3y9D'),
      n('WYAk'),
      (a = (i = (r = u).lib).WordArray),
      (s = (l = r.algo).EvpKDF =
        (o = i.Base).extend({
          cfg: o.extend({ keySize: 4, hasher: l.MD5, iterations: 1 }),
        })),
      (r.EvpKDF = function (e, t, n) {}),
      u.EvpKDF)
  },
  OLod: function (e, t, n) {
    var r, i, o, a, l, s, u, c, d, p, h, f, m, g, _, v, y, b, w
    e.exports =
      ((r = n('Ib8C')),
      n('K3mO'),
      void (
        r.lib.Cipher ||
        ((i = r),
        (o = i.lib),
        (a = o.Base),
        (l = o.WordArray),
        (s = o.BufferedBlockAlgorithm),
        (u = i.enc),
        (c = u.Base64),
        (d = i.algo.EvpKDF),
        (p = o.Cipher =
          s.extend({
            cfg: a.extend(),
            createEncryptor: function (e, t) {
              return this.create(this._ENC_XFORM_MODE, e, t)
            },
            init: function (e, t, n) {
              ;(this.cfg = this.cfg.extend(n)),
                (this._xformMode = e),
                (this._key = t),
                this.reset()
            },
            reset: function () {
              s.reset.call(this), this._doReset()
            },
            finalize: function (e) {
              return e && this._append(e), this._doFinalize()
            },
            keySize: 4,
            ivSize: 4,
            _ENC_XFORM_MODE: 1,
            _DEC_XFORM_MODE: 2,
            _createHelper: (function () {
              function e (e) {
                return 'string' == typeof e ? w : y
              }
              return function (t) {
                return {
                  encrypt: function (n, r, i) {
                    return e(r).encrypt(t, n, r, i)
                  },
                }
              }
            })()
          })),
        (o.StreamCipher = p.extend({
          blockSize: 1
        })),
        (h = i.mode = {}),
        (f = o.BlockCipherMode =
          a.extend({
            createEncryptor: function (e, t) {
              return this.Encryptor.create(e, t)
            },
            init: function (e, t) {
              ;(this._cipher = e), (this._iv = t)
            }
          })),
        (m = h.CBC =
          (function () {
            var e = f.extend()
            function t (e, t, n) {
              var r,
                i = this._iv
              i ? ((r = i), (this._iv = void 0)) : (r = this._prevBlock)
              for (var o = 0; o < n; o++) e[t + o] ^= r[o]
            }
            return (
              (e.Encryptor = e.extend({
                processBlock: function (e, n) {
                  var r = this._cipher,
                    i = r.blockSize
                  t.call(this, e, n, i),
                    r.encryptBlock(e, n),
                    (this._prevBlock = e.slice(n, n + i))
                }
              })),
              (e.Decryptor = e.extend({
              })),
              e
            )
          })()),
        (g = (i.pad = {}).Pkcs7 =
          {
            pad: function (e, t) {
              for (
                var n = 4 * t,
                  r = n - (e.sigBytes % n),
                  i = (r << 24) | (r << 16) | (r << 8) | r,
                  o = [],
                  a = 0;
                a < r;
                a += 4
              )
                o.push(i)
              var s = l.create(o, r)
              e.concat(s)
            },
          }),
        (o.BlockCipher = p.extend({
          cfg: p.cfg.extend({ mode: m, padding: g }),
          reset: function () {
            var e
            p.reset.call(this)
            var t = this.cfg,
              n = t.iv,
              r = t.mode
            this._xformMode == this._ENC_XFORM_MODE
              ? (e = r.createEncryptor)
              : ((e = r.createDecryptor), (this._minBufferSize = 1)),
              this._mode && this._mode.__creator == e
                ? this._mode.init(this, n && n.words)
                : ((this._mode = e.call(r, this, n && n.words)),
                  (this._mode.__creator = e))
          },
          _doProcessBlock: function (e, t) {
            this._mode.processBlock(e, t)
          },
          _doFinalize: function () {
            var e,
              t = this.cfg.padding
            return (
              this._xformMode == this._ENC_XFORM_MODE
                ? (t.pad(this._data, this.blockSize), (e = this._process(!0)))
                : ((e = this._process(!0)), t.unpad(e)),
              e
            )
          },
          blockSize: 4
        })),
        (_ = o.CipherParams =
          a.extend({
            init: function (e) {
              this.mixIn(e)
            },
            toString: function (e) {
              return (e || this.formatter).stringify(this)
            }
          })),
        (v = (i.format = {}).OpenSSL =
          {
            stringify: function (e) {
              var t = e.ciphertext,
                n = e.salt
              return (
                n ? l.create([1398893684, 1701076831]).concat(n).concat(t) : t
              ).toString(c)
            },
          }),
        (y = o.SerializableCipher =
          a.extend({
            cfg: a.extend({ format: v }),
            encrypt: function (e, t, n, r) {
              r = this.cfg.extend(r)
              var i = e.createEncryptor(n, r),
                o = i.finalize(t),
                a = i.cfg
              return _.create({
                ciphertext: o,
                key: n,
                iv: a.iv,
                algorithm: e,
                mode: a.mode,
                padding: a.padding,
                blockSize: e.blockSize,
                formatter: r.format
              })
            },
          })),
        (b = (i.kdf = {}).OpenSSL = {}),
        (w = o.PasswordBasedCipher =
          y.extend({
            cfg: y.cfg.extend({ kdf: b }),
          })))
      ))
  },
  wZgz: function (e, t, n) {
    var r
    e.exports =
      ((r = n('Ib8C')),
      n('ETIr'),
      n('cv67'),
      n('K3mO'),
      n('OLod'),
      (function () {
        var e = r,
          t = e.lib.BlockCipher,
          n = e.algo,
          i = [],
          o = [],
          a = [],
          l = [],
          s = [],
          u = [],
          c = [],
          d = [],
          p = [],
          h = []
        !(function () {
          for (var e = [], t = 0; t < 256; t++)
            e[t] = t < 128 ? t << 1 : (t << 1) ^ 283
          var n = 0,
            r = 0
          for (t = 0; t < 256; t++) {
            var f = r ^ (r << 1) ^ (r << 2) ^ (r << 3) ^ (r << 4)
            ;(i[n] = f = (f >>> 8) ^ (255 & f) ^ 99), (o[f] = n)
            var m,
              g = e[n],
              _ = e[g],
              v = e[_]
            ;(a[n] = ((m = (257 * e[f]) ^ (16843008 * f)) << 24) | (m >>> 8)),
              (l[n] = (m << 16) | (m >>> 16)),
              (s[n] = (m << 8) | (m >>> 24)),
              (u[n] = m),
              (c[f] =
                ((m =
                  (16843009 * v) ^ (65537 * _) ^ (257 * g) ^ (16843008 * n)) <<
                  24) |
                (m >>> 8)),
              (d[f] = (m << 16) | (m >>> 16)),
              (p[f] = (m << 8) | (m >>> 24)),
              (h[f] = m),
              n ? ((n = g ^ e[e[e[v ^ g]]]), (r ^= e[e[r]])) : (n = r = 1)
          }
        })()
        var f = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
          m = (n.AES = t.extend({
            _doReset: function () {
              if (!this._nRounds || this._keyPriorReset !== this._key) {
                for (
                  var e = (this._keyPriorReset = this._key),
                    t = e.words,
                    n = e.sigBytes / 4,
                    r = 4 * ((this._nRounds = n + 6) + 1),
                    o = (this._keySchedule = []),
                    a = 0;
                  a < r;
                  a++
                )
                  a < n
                    ? (o[a] = t[a])
                    : ((u = o[a - 1]),
                      a % n
                        ? n > 6 &&
                          a % n == 4 &&
                          (u =
                            (i[u >>> 24] << 24) |
                            (i[(u >>> 16) & 255] << 16) |
                            (i[(u >>> 8) & 255] << 8) |
                            i[255 & u])
                        : ((u =
                            (i[(u = (u << 8) | (u >>> 24)) >>> 24] << 24) |
                            (i[(u >>> 16) & 255] << 16) |
                            (i[(u >>> 8) & 255] << 8) |
                            i[255 & u]),
                          (u ^= f[(a / n) | 0] << 24)),
                      (o[a] = o[a - n] ^ u))
                for (var l = (this._invKeySchedule = []), s = 0; s < r; s++) {
                  if (((a = r - s), s % 4)) var u = o[a]
                  else u = o[a - 4]
                  l[s] =
                    s < 4 || a <= 4
                      ? u
                      : c[i[u >>> 24]] ^
                        d[i[(u >>> 16) & 255]] ^
                        p[i[(u >>> 8) & 255]] ^
                        h[i[255 & u]]
                }
              }
            },
            encryptBlock: function (e, t) {
              this._doCryptBlock(e, t, this._keySchedule, a, l, s, u, i)
            },
            _doCryptBlock: function (e, t, n, r, i, o, a, l) {
              for (
                var s = this._nRounds,
                  u = e[t] ^ n[0],
                  c = e[t + 1] ^ n[1],
                  d = e[t + 2] ^ n[2],
                  p = e[t + 3] ^ n[3],
                  h = 4,
                  f = 1;
                f < s;
                f++
              ) {
                var m =
                    r[u >>> 24] ^
                    i[(c >>> 16) & 255] ^
                    o[(d >>> 8) & 255] ^
                    a[255 & p] ^
                    n[h++],
                  g =
                    r[c >>> 24] ^
                    i[(d >>> 16) & 255] ^
                    o[(p >>> 8) & 255] ^
                    a[255 & u] ^
                    n[h++],
                  _ =
                    r[d >>> 24] ^
                    i[(p >>> 16) & 255] ^
                    o[(u >>> 8) & 255] ^
                    a[255 & c] ^
                    n[h++],
                  v =
                    r[p >>> 24] ^
                    i[(u >>> 16) & 255] ^
                    o[(c >>> 8) & 255] ^
                    a[255 & d] ^
                    n[h++]
                ;(u = m), (c = g), (d = _), (p = v)
              }
              ;(m =
                ((l[u >>> 24] << 24) |
                  (l[(c >>> 16) & 255] << 16) |
                  (l[(d >>> 8) & 255] << 8) |
                  l[255 & p]) ^
                n[h++]),
                (g =
                  ((l[c >>> 24] << 24) |
                    (l[(d >>> 16) & 255] << 16) |
                    (l[(p >>> 8) & 255] << 8) |
                    l[255 & u]) ^
                  n[h++]),
                (_ =
                  ((l[d >>> 24] << 24) |
                    (l[(p >>> 16) & 255] << 16) |
                    (l[(u >>> 8) & 255] << 8) |
                    l[255 & c]) ^
                  n[h++]),
                (v =
                  ((l[p >>> 24] << 24) |
                    (l[(u >>> 16) & 255] << 16) |
                    (l[(c >>> 8) & 255] << 8) |
                    l[255 & d]) ^
                  n[h++]),
                (e[t] = m),
                (e[t + 1] = g),
                (e[t + 2] = _),
                (e[t + 3] = v)
            },
            keySize: 8
          }))
        e.AES = t._createHelper(m)
      })(),
      r.AES)
  },
  NFKh: function (e, t, n) {
    var r
    e.exports =
      ((r = n('Ib8C')),
      n('qM6L'),
      n('ETIr'),
      n('cv67'),
      n('3y9D'),
      n('WYAk'),
      n('e7zE'),
      n('K3mO'),
      n('OLod'),
      n('wZgz'),
      r)
  }
})

var ui = demo('NFKh'),
  ci = demo.n(ui);

function aesEncryption (text) {
    t = ci.a.enc.Utf8.parse('Ivan Medvedev'),
    n = ci.a.enc.Utf8.parse('Flight Status'),
    r = ci.a.PBKDF2(n, t, {
      keySize: 12,
      iterations: 1e3,
      hasher: ci.a.algo.SHA1
    }),
    i = ci.a.enc.Hex.stringify(r),
    o = ci.a.enc.Hex.parse(i.substring(0, 64)),
    a = ci.a.enc.Hex.parse(i.substring(64, i.length)),
    l = ci.a.enc.Utf16LE.parse(text);
    console.log(`t = ${t}`);
    console.log(`n = ${n}`);
    console.log(`r = ${r}`);
    console.log(`i = ${i}`);
    console.log(`o = ${o}`);
    console.log(`a = ${a}`);
    console.log(`l = ${l}`);
  return ci.a.AES.encrypt(l, o, {iv: a}).toString()
}

function myAES (username, password) {
  var text=username+'|'+password+'|'+ (new Date).toISOString();
  return aesEncryption(text);
}

var e = 'fsfrontend|fsfrontend123|2023-08-01T07:20:22.372Z';
expected_result = 'l+AdAzsTSQ+7s7MY/QIR4WZP5cZ2PaWYVlHhITOzt1wGVQqlWrym+ybK0m4M98QyjRuUa/4QyieL5YGs2PwME5brdOHOThqAchpzCPBqGsFKRZRMwo8RPUiqfNLZ8G7bb7Rz8ASnJjHx2IK7pRmqOA=='
result = aesEncryption(e)
result == expected_result
  ? console.log(result)
  : console.log('Result is different!')

// var username='fsfrontend', password='fsfrontend123';
// result = myAES(username, password);
// console.log(result);
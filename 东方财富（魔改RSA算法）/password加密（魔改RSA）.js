var window=global;

JSEncrypt = (function () {
  function i (r) {
    const n = e[r]
    if (void 0 !== n) { return n.exports }
    const s = e[r] = {
      exports: {}
    }
    return t[r](s, s.exports, i),
    s.exports
  }
  i.d = (t, e) => {
    for (const r in e) {
      i.o(e, r) && !i.o(t, r) && Object.defineProperty(t, r, {
        enumerable: !0,
        get: e[r]
      })
    }
  }
  ,
  i.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)
  const r = {}
  return (() => {
    'use strict'
    function t (t) {
      return '0123456789abcdefghijklmnopqrstuvwxyz'.charAt(t)
    }

    i.d(r, {
      default: () => ot
    })
    const c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    function f (t) {
      let e; let i; let r = ''
      for (e = 0; e + 3 <= t.length; e += 3) {
        i = parseInt(t.substring(e, e + 3), 16),
        r += c.charAt(i >> 6) + c.charAt(63 & i)
      }
      for (e + 1 == t.length
        ? (i = parseInt(t.substring(e, e + 1), 16),
          r += c.charAt(i << 2))
        : e + 2 == t.length && (i = parseInt(t.substring(e, e + 2), 16),
        r += c.charAt(i >> 2) + c.charAt((3 & i) << 4)); (3 & r.length) > 0;) { r += '=' }
      return r
    }

    let p;
    var g = {
      decode: function (t) {
        let e
        if (void 0 === p) {
          const i = '= \f\n\r\t \u2028\u2029'
          for (p = Object.create(null),
          e = 0; e < 64; ++e) { p['ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(e)] = e }
          for (p['-'] = 62,
          p._ = 63,
          e = 0; e < i.length; ++e) { p[i.charAt(e)] = -1 }
        }
        const r = []
        let n = 0
        let s = 0
        for (e = 0; e < t.length; ++e) {
          let o = t.charAt(e)
          if (o == '=') { break }
          if ((o = p[o]) != -1) {
            if (void 0 === o) { throw new Error('Illegal character at offset ' + e) }
            n |= o,
            ++s >= 4
              ? (r[r.length] = n >> 16,
                r[r.length] = n >> 8 & 255,
                r[r.length] = 255 & n,
                n = 0,
                s = 0)
              : n <<= 6
          }
        }
        switch (s) {
          case 1:
            throw new Error('Base64 encoding incomplete: at least 2 bits missing')
          case 2:
            r[r.length] = n >> 10
            break
          case 3:
            r[r.length] = n >> 16,
            r[r.length] = n >> 8 & 255
        }
        return r
      },
    };
    const v = (function () {
      function t (t) {
        this.buf = [+t || 0]
      }
      return t
    }());

    let T;
    const S = (function () {
      function t (e, i) {
        this.hexDigits = '0123456789ABCDEF',
        e instanceof t
          ? (this.enc = e.enc,
            this.pos = e.pos)
          : (this.enc = e,
            this.pos = i)
      }
      return t.prototype.get = function (t) {
        if (void 0 === t && (t = this.pos++),
        t >= this.enc.length) { throw new Error('Requesting byte offset '.concat(t, ' on a stream of length ').concat(this.enc.length)) }
        return typeof this.enc === 'string' ? this.enc.charCodeAt(t) : this.enc[t]
      }
      ,
      t.prototype.hexByte = function (t) {
        return this.hexDigits.charAt(t >> 4 & 15) + this.hexDigits.charAt(15 & t)
      }
      ,
      t.prototype.hexDump = function (t, e, i) {
        for (var r = '', n = t; n < e; ++n) {
          if (r += this.hexByte(this.get(n)),
          !0 !== i) {
            switch (15 & n) {
              case 7:
                r += '  '
                break
              case 15:
                r += '\n'
                break
              default:
                r += ' '
            }
          }
        }
        return r
      }
      ,
      t
    }()); const E = (function () {
      function t (t, e, i, r, n) {
        if (!(r instanceof w)) { throw new Error('Invalid tag value.') }
        this.stream = t,
        this.header = e,
        this.length = i,
        this.tag = r,
        this.sub = n
      }
      return t.prototype.posStart = function () {
        return this.stream.pos
      }
      ,
      t.prototype.posEnd = function () {
        return this.stream.pos + this.header + Math.abs(this.length)
      }
      ,
      t.prototype.toHexString = function () {
        return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
      }
      ,
      t.decodeLength = function (t) {
        let e = t.get()
        const i = 127 & e
        if (i == e) { return i }
        if (i > 6) { throw new Error('Length over 48 bits not supported at position ' + (t.pos - 1)) }
        if (i === 0) { return null }
        e = 0
        for (let r = 0; r < i; ++r) { e = 256 * e + t.get() }
        return e
      }
      ,
      t.prototype.getHexStringValue = function () {
        const t = this.toHexString()
        const e = 2 * this.header
        const i = 2 * this.length
        return t.substr(e, i)
      }
      ,
      t.decode = function (e) {
        let i
        i = e instanceof S ? e : new S(e, 0)
        const r = new S(i)
        const n = new w(i)
        let s = t.decodeLength(i)
        const o = i.pos
        const h = o - r.pos
        let a = null
        const u = function () {
          const e = []
          if (s !== null) {
            for (var r = o + s; i.pos < r;) { e[e.length] = t.decode(i) }
            if (i.pos != r) { throw new Error('Content size is not correct for container starting at offset ' + o) }
          } else {
            try {
              for (; ;) {
                const n = t.decode(i)
                if (n.tag.isEOC()) { break }
                e[e.length] = n
              }
              s = o - i.pos
            } catch (t) {
              throw new Error('Exception while decoding undefined length content: ' + t)
            }
          }
          return e
        }
        if (n.tagConstructed) { a = u() } else if (n.isUniversal() && (n.tagNumber == 3 || n.tagNumber == 4)) {
          try {
            if (n.tagNumber == 3 && i.get() != 0) { throw new Error('BIT STRINGs with unused bits cannot encapsulate.') }
            a = u()
            for (let c = 0; c < a.length; ++c) {
              if (a[c].tag.isEOC()) { throw new Error('EOC is not supposed to be actual content.') }
            }
          } catch (t) {
            a = null
          }
        }
        if (a === null) {
          if (s === null) { throw new Error("We can't skip over an invalid tag with undefined length at offset " + o) }
          i.pos = o + Math.abs(s)
        }
        return new t(r, h, s, n, a)
      }
      ,
      t
    }());
    var w = (function () {
      function t (t) {
        let e = t.get()
        if (this.tagClass = e >> 6,
        this.tagConstructed = (32 & e) != 0,
        this.tagNumber = 31 & e,
        this.tagNumber == 31) {
          const i = new v()
          do {
            e = t.get(),
            i.mulAdd(128, 127 & e)
          } while (128 & e)
          this.tagNumber = i.simplify()
        }
      }
      return t.prototype.isUniversal = function () {
        return this.tagClass === 0
      }
      ,
      t.prototype.isEOC = function () {
        return this.tagClass === 0 && this.tagNumber === 0
      }
      ,
      t
    }());
    const R = (function () {
      function i (t, e, i) {
        t != null && (typeof t === 'number' ? this.fromNumber(t, e, i) : e == null && typeof t !== 'string' ? this.fromString(t, 256) : this.fromString(t, e))
      }
      return i.prototype.toString = function (e) {
        if (this.s < 0) { return '-' + this.negate().toString(e) }
        let i
        if (e == 16) { i = 4 } else if (e == 8) { i = 3 } else if (e == 2) { i = 1 } else if (e == 32) { i = 5 } else {
          if (e != 4) { return this.toRadix(e) }
          i = 2
        }
        let r; const n = (1 << i) - 1; let s = !1; let o = ''; let h = this.t; let a = 28 - h * 28 % i
        if (h-- > 0) {
          for (a < 28 && (r = this[h] >> a) > 0 && (s = !0,
          o = t(r)); h >= 0;) {
            a < i
              ? (r = (this[h] & (1 << a) - 1) << i - a,
                r |= this[--h] >> (a += 28 - i))
              : (r = this[h] >> (a -= i) & n,
                a <= 0 && (a += 28,
                --h)),
            r > 0 && (s = !0),
            s && (o += t(r))
          }
        }
        return s ? o : '0'
      }
      ,
      i.prototype.negate = function () {
        const t = I()
        return i.ZERO.subTo(this, t),
        t
      }
      ,
      i.prototype.abs = function () {
        return this.s < 0 ? this.negate() : this
      }
      ,
      i.prototype.compareTo = function (t) {
        let e = this.s - t.s
        if (e != 0) { return e }
        let i = this.t
        if ((e = i - t.t) != 0) { return this.s < 0 ? -e : e }
        for (; --i >= 0;) {
          if ((e = this[i] - t[i]) != 0) { return e }
        }
        return 0
      }
      ,
      i.prototype.bitLength = function () {
        return this.t <= 0 ? 0 : 28 * (this.t - 1) + C(this[this.t - 1] ^ this.s & 268435455)
      }
      ,
      i.prototype.modPowInt = function (t, e) {
        let i
        return i = t < 256 || e.isEven() ? new O(e) : new A(e),
        this.exp(t, i)
      }
      ,

      i.prototype.copyTo = function (t) {
        for (let e = this.t - 1; e >= 0; --e) { t[e] = this[e] }
        t.t = this.t,
        t.s = this.s
      }
      ,
      i.prototype.fromInt = function (t) {
        this.t = 1,
        this.s = t < 0 ? -1 : 0,
        t > 0 ? this[0] = t : t < -1 ? this[0] = t + 268435456 : this.t = 0
      }
      ,
      i.prototype.fromString = function (t, e) {
        let r
        if (e == 16) { r = 4 } else if (e == 8) { r = 3 } else if (e == 256) { r = 8 } else if (e == 2) { r = 1 } else if (e == 32) { r = 5 } else {
          if (e != 4) { return void 0 }
          r = 2
        }
        this.t = 0,
        this.s = 0
        for (var n = t.length, s = !1, o = 0; --n >= 0;) {
          const h = r == 8 ? 255 & +t[n] : q(t, n)
          h < 0
            ? t.charAt(n) == '-' && (s = !0)
            : (s = !1,
              o == 0
                ? this[this.t++] = h
                : o + r > 28
                  ? (this[this.t - 1] |= (h & (1 << 28 - o) - 1) << o,
                    this[this.t++] = h >> 28 - o)
                  : this[this.t - 1] |= h << o,
              (o += r) >= 28 && (o -= 28))
        }
        r == 8 && (128 & +t[0]) != 0 && (this.s = -1,
        o > 0 && (this[this.t - 1] |= (1 << 28 - o) - 1 << o)),
        this.clamp(),
        s && i.ZERO.subTo(this, this)
      }
      ,
      i.prototype.clamp = function () {
        for (let t = this.s & 268435455; this.t > 0 && this[this.t - 1] == t;) { --this.t }
      }
      ,
      i.prototype.dlShiftTo = function (t, e) {
        let i
        for (i = this.t - 1; i >= 0; --i) { e[i + t] = this[i] }
        for (i = t - 1; i >= 0; --i) { e[i] = 0 }
        e.t = this.t + t,
        e.s = this.s
      }
      ,
      i.prototype.drShiftTo = function (t, e) {
        for (let i = t; i < this.t; ++i) { e[i - t] = this[i] }
        e.t = Math.max(this.t - t, 0),
        e.s = this.s
      }
      ,
      i.prototype.lShiftTo = function (t, e) {
        for (var i = t % 28, r = 28 - i, n = (1 << r) - 1, s = Math.floor(t / 28), o = this.s << i & 268435455, h = this.t - 1; h >= 0; --h) {
          e[h + s + 1] = this[h] >> r | o,
          o = (this[h] & n) << i
        }
        for (h = s - 1; h >= 0; --h) { e[h] = 0 }
        e[s] = o,
        e.t = this.t + s + 1,
        e.s = this.s,
        e.clamp()
      }
      ,
      i.prototype.rShiftTo = function (t, e) {
        e.s = this.s
        const i = Math.floor(t / 28)
        if (i >= this.t) { e.t = 0 } else {
          const r = t % 28
          const n = 28 - r
          const s = (1 << r) - 1
          e[0] = this[i] >> r
          for (let o = i + 1; o < this.t; ++o) {
            e[o - i - 1] |= (this[o] & s) << n,
            e[o - i] = this[o] >> r
          }
          r > 0 && (e[this.t - i - 1] |= (this.s & s) << n),
          e.t = this.t - i,
          e.clamp()
        }
      }
      ,
      i.prototype.subTo = function (t, e) {
        for (var i = 0, r = 0, n = Math.min(t.t, this.t); i < n;) {
          r += this[i] - t[i],
          e[i++] = r & 268435455,
          r >>= 28
        }
        if (t.t < this.t) {
          for (r -= t.s; i < this.t;) {
            r += this[i],
            e[i++] = r & 268435455,
            r >>= 28
          }
          r += this.s
        } else {
          for (r += this.s; i < t.t;) {
            r -= t[i],
            e[i++] = r & 268435455,
            r >>= 28
          }
          r -= t.s
        }
        e.s = r < 0 ? -1 : 0,
        r < -1 ? e[i++] = 268435456 + r : r > 0 && (e[i++] = r),
        e.t = i,
        e.clamp()
      }
      ,
      i.prototype.multiplyTo = function (t, e) {
        const r = this.abs()
        const n = t.abs()
        let s = r.t
        for (e.t = s + n.t; --s >= 0;) { e[s] = 0 }
        for (s = 0; s < n.t; ++s) { e[s + r.t] = r.am(0, n[s], e, s, 0, r.t) }
        e.s = 0,
        e.clamp(),
        this.s != t.s && i.ZERO.subTo(e, e)
      }
      ,
      i.prototype.squareTo = function (t) {
        for (var e = this.abs(), i = t.t = 2 * e.t; --i >= 0;) { t[i] = 0 }
        for (i = 0; i < e.t - 1; ++i) {
          const r = e.am(i, e[i], t, 2 * i, 0, 1);
          (t[i + e.t] += e.am(i + 1, 2 * e[i], t, 2 * i + 1, r, e.t - i - 1)) >= 268435456 && (t[i + e.t] -= 268435456,
          t[i + e.t + 1] = 1)
        }
        t.t > 0 && (t[t.t - 1] += e.am(i, e[i], t, 2 * i, 0, 1)),
        t.s = 0,
        t.clamp()
      }
      ,
      i.prototype.divRemTo = function (t, e, r) {
        const n = t.abs()
        if (!(n.t <= 0)) {
          const s = this.abs()
          if (s.t < n.t) {
            return e != null && e.fromInt(0),
            void (r != null && this.copyTo(r))
          }
          r == null && (r = I())
          const o = I()
          const h = this.s
          const a = t.s
          const u = 28 - C(n[n.t - 1])
          u > 0
            ? (n.lShiftTo(u, o),
              s.lShiftTo(u, r))
            : (n.copyTo(o),
              s.copyTo(r))
          const c = o.t
          const f = o[c - 1]
          if (f != 0) {
            const l = f * 16777216 + (c > 1 ? o[c - 2] >> 4 : 0)
            const p = this.FV / l
            const g = 16777216 / l
            const d = 16
            let v = r.t
            let m = v - c
            const y = e == null ? I() : e
            for (o.dlShiftTo(m, y),
            r.compareTo(y) >= 0 && (r[r.t++] = 1,
            r.subTo(y, r)),
            i.ONE.dlShiftTo(c, y),
            y.subTo(o, o); o.t < c;) { o[o.t++] = 0 }
            for (; --m >= 0;) {
              let b = r[--v] == f ? 268435455 : Math.floor(r[v] * p + (r[v - 1] + d) * g)
              if ((r[v] += o.am(0, b, r, m, 0, c)) < b) {
                for (o.dlShiftTo(m, y),
                r.subTo(y, r); r[v] < --b;) { r.subTo(y, r) }
              }
            }
            e != null && (r.drShiftTo(c, e),
            h != a && i.ZERO.subTo(e, e)),
            r.t = c,
            r.clamp(),
            u > 0 && r.rShiftTo(u, r),
            h < 0 && i.ZERO.subTo(r, r)
          }
        }
      }
      ,
      i.prototype.invDigit = function () {
        if (this.t < 1) { return 0 }
        const t = this[0]
        if ((1 & t) == 0) { return 0 }
        let e = 3 & t
        return (e = (e = (e = (e = e * (2 - (15 & t) * e) & 15) * (2 - (255 & t) * e) & 255) * (2 - ((65535 & t) * e & 65535)) & 65535) * (2 - t * e % 268435456) % 268435456) > 0 ? 268435456 - e : -e
      }
      ,
      i.prototype.isEven = function () {
        return (this.t > 0 ? 1 & this[0] : this.s) == 0
      }
      ,
      i.prototype.exp = function (t, e) {
        if (t > 4294967295 || t < 1) { return i.ONE }
        let r = I()
        let n = I()
        const s = e.convert(this)
        let o = C(t) - 1
        for (s.copyTo(r); --o >= 0;) {
          if (e.sqrTo(r, n),
          (t & 1 << o) > 0) { e.mulTo(n, s, r) } else {
            const h = r
            r = n,
            n = h
          }
        }
        return e.revert(r)
      }
      ,
      i
    }());
    var O = (function () {
      function t (t) {
        this.m = t
      }
      return t.prototype.convert = function (t) {
        return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
      }
      ,
      t.prototype.revert = function (t) {
        return t
      }
      ,
      t.prototype.reduce = function (t) {
        t.divRemTo(this.m, null, t)
      }
      ,
      t.prototype.mulTo = function (t, e, i) {
        t.multiplyTo(e, i),
        this.reduce(i)
      }
      ,
      t.prototype.sqrTo = function (t, e) {
        t.squareTo(e),
        this.reduce(e)
      }
      ,
      t
    }());
    var A = (function () {
      function t (t) {
        this.m = t,
        this.mp = t.invDigit(),
        this.mpl = 32767 & this.mp,
        this.mph = this.mp >> 15,
        this.um = (1 << 28 - 15) - 1,
        this.mt2 = 2 * t.t
      }
      return t.prototype.convert = function (t) {
        const e = I()
        return t.abs().dlShiftTo(this.m.t, e),
        e.divRemTo(this.m, null, e),
        t.s < 0 && e.compareTo(R.ZERO) > 0 && this.m.subTo(e, e),
        e
      }
      ,
      t.prototype.revert = function (t) {
        const e = I()
        return t.copyTo(e),
        this.reduce(e),
        e
      }
      ,
      t.prototype.reduce = function (t) {
        for (; t.t <= this.mt2;) { t[t.t++] = 0 }
        for (let e = 0; e < this.m.t; ++e) {
          let i = 32767 & t[e]
          const r = i * this.mpl + ((i * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & 268435455
          for (t[i = e + this.m.t] += this.m.am(0, r, t, e, 0, this.m.t); t[i] >= 268435456;) {
            t[i] -= 268435456,
            t[++i]++
          }
        }
        t.clamp(),
        t.drShiftTo(this.m.t, t),
        t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
      }
      ,
      t.prototype.mulTo = function (t, e, i) {
        t.multiplyTo(e, i),
        this.reduce(i)
      }
      ,
      t.prototype.sqrTo = function (t, e) {
        t.squareTo(e),
        this.reduce(e)
      }
      ,
      t
    }());
    function I () {
      return new R(null)
    }
    function N (t, e) {
      return new R(t, e)
    }
    R.prototype.am = function (t, e, i, r, n, s) {
      for (let o = 16383 & e, h = e >> 14; --s >= 0;) {
        let a = 16383 & this[t]
        const u = this[t++] >> 14
        const c = h * a + u * o
        n = ((a = o * a + ((16383 & c) << 14) + i[r] + n) >> 28) + (c >> 14) + h * u,
        i[r++] = 268435455 & a
      }
      return n
    },
    T = 28,
    R.prototype.DB = 28,
    R.prototype.DM = 268435455,
    R.prototype.DV = 268435456,
    R.prototype.FV = 4503599627370496,
    R.prototype.F1 = 24,
    R.prototype.F2 = 4
    let M; let L; const j = []
    for (M = '0'.charCodeAt(0),
    L = 0; L <= 9; ++L) { j[M++] = L }
    for (M = 'a'.charCodeAt(0),
    L = 10; L < 36; ++L) { j[M++] = L }
    for (M = 'A'.charCodeAt(0),
    L = 10; L < 36; ++L) { j[M++] = L }
    function q (t, e) {
      const i = j[t.charCodeAt(e)]
      return i == null ? -1 : i
    }
    function H (t) {
      const e = I()
      return e.fromInt(t),
      e
    }
    function C (t) {
      let e; let i = 1
      return (e = t >>> 16) != 0 && (t = e,
      i += 16),
      (e = t >> 8) != 0 && (t = e,
      i += 8),
      (e = t >> 4) != 0 && (t = e,
      i += 4),
      (e = t >> 2) != 0 && (t = e,
      i += 2),
      (e = t >> 1) != 0 && (t = e,
      i += 1),
      i
    }
    R.ZERO = H(0),
    R.ONE = H(1)
    let F; let U; const K = (function () {
      function t () {
        this.i = 0,
        this.j = 0,
        this.S = []
      }
      return t.prototype.init = function (t) {
        let e, i, r
        for (e = 0; e < 256; ++e) { this.S[e] = e }
        for (i = 0,
        e = 0; e < 256; ++e) {
          i = i + this.S[e] + t[e % t.length] & 255,
          r = this.S[e],
          this.S[e] = this.S[i],
          this.S[i] = r
        }
        this.i = 0,
        this.j = 0
      }
      ,
      t.prototype.next = function () {
        let t
        return this.i = this.i + 1 & 255,
        this.j = this.j + this.S[this.i] & 255,
        t = this.S[this.i],
        this.S[this.i] = this.S[this.j],
        this.S[this.j] = t,
        this.S[t + this.S[this.i] & 255]
      }
      ,
      t
    }());
    var k = [], _=0;
    U = 0;
    const z = new Uint32Array(256)
    for (window.crypto.getRandomValues(z), _ = 0; _ < z.length; ++_)
     { k[U++] = 255 & z[_] }

    function $ () {
      if (F == null) {
        F=new K();
        // for (U=0; U < 256;U++) {
        //   const t = Math.floor(65536 * Math.random())
        //   k[U] = 255 & t
        // }
        for (F.init(k),
        U = 0; U < k.length; ++U) { k[U] = 0 }
        U = 0
      }
      return F.next()
    }
    const Y = (function () {
      return t.prototype.nextBytes = function (t) {
        for (let e = 0; e < t.length; ++e) { t[e] = $() }
      }
      ,
      t
    }())
    const J = (function () {
      function t () {
        this.n = null,
        this.e = 0,
        this.d = null,
        this.p = null,
        this.q = null,
        this.dmp1 = null,
        this.dmq1 = null,
        this.coeff = null
      }
      return t.prototype.doPublic = function (t) {
        return t.modPowInt(this.e, this.n)
      },

      t.prototype.encrypt = function (t) {
        const e = this.n.bitLength() + 7 >> 3
        const i = (function (t, e) {
          if (e < t.length + 11) {
            return console.error('Message too long for RSA'),
            null
          }
          for (var i = [], r = t.length - 1; r >= 0 && e > 0;) {
            const n = t.charCodeAt(r--)
            n < 128
              ? i[--e] = n
              : n > 127 && n < 2048
                ? (i[--e] = 63 & n | 128,
                  i[--e] = n >> 6 | 192)
                : (i[--e] = 63 & n | 128,
                  i[--e] = n >> 6 & 63 | 128,
                  i[--e] = n >> 12 | 224)
          }
          i[--e] = 0
          for (let s = new Y(), o = []; e > 2;) {
            for (o[0] = 0; o[0] == 0;) { s.nextBytes(o) }
            i[--e] = o[0]
          }
          return i[--e] = 2,
          i[--e] = 0,
          new R(i)
        }(t, e))
        if (i == null) { return null }
        const r = this.doPublic(i)
        if (r == null) { return null }
        for (var n = r.toString(16), s = n.length, o = 0; o < 2 * e - s; o++) { n = '0' + n }
        return n
      },
      t
    }())
    let tt;
    const it = (tt = function (t, e) {
      return tt = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e
      } ||
            function (t, e) {
              for (const i in e) { Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]) }
            }
      ,
      tt(t, e)
    }
    ,
    function (t, e) {
      if (typeof e !== 'function' && e !== null) { throw new TypeError('Class extends value ' + String(e) + ' is not a constructor or null') }
      function i () {
        this.constructor = t
      }
      tt(t, e),
      t.prototype = e === null
        ? Object.create(e)
        : (i.prototype = e.prototype,
          new i())
    }
    ); const rt = (function (t) {
      function e (i) {
        const r = t.call(this) || this
        return i && (typeof i === 'string' ? r.parseKey(i) : (e.hasPrivateKeyProperty(i) || e.hasPublicKeyProperty(i)) && r.parsePropertiesFrom(i)),
        r
      }
      return it(e, t),
      e.prototype.parseKey = function (t) {
        try {
          let e = 0
          let i = 0
          const r = g.decode(t)
          let n = E.decode(r)
          if (n.sub.length === 3 && (n = n.sub[2].sub[0]),
          n.sub.length === 9) {
            e = n.sub[1].getHexStringValue(),
            this.n = N(e, 16),
            i = n.sub[2].getHexStringValue(),
            this.e = parseInt(i, 16)
            const s = n.sub[3].getHexStringValue()
            this.d = N(s, 16)
            const o = n.sub[4].getHexStringValue()
            this.p = N(o, 16)
            const h = n.sub[5].getHexStringValue()
            this.q = N(h, 16)
            const a = n.sub[6].getHexStringValue()
            this.dmp1 = N(a, 16)
            const c = n.sub[7].getHexStringValue()
            this.dmq1 = N(c, 16)
            const f = n.sub[8].getHexStringValue()
            this.coeff = N(f, 16)
          } else {
            if (n.sub.length !== 2) { return !1 }
            if (n.sub[0].sub) {
              const l = n.sub[1].sub[0]
              e = l.sub[0].getHexStringValue(),
              this.n = N(e, 16),
              i = l.sub[1].getHexStringValue(),
              this.e = parseInt(i, 16)
            } else {
              e = n.sub[0].getHexStringValue(),
              this.n = N(e, 16),
              i = n.sub[1].getHexStringValue(),
              this.e = parseInt(i, 16)
            }
          }
          return !0
        } catch (t) {
          return !1
        }
      }
      ,
      e
    }(J));
    const ot = (function () {
      function t (t) {
        void 0 === t && (t = {}),
        t = t || {},
        this.default_key_size = t.default_key_size ? parseInt(t.default_key_size, 10) : 1024,
        this.default_public_exponent = t.default_public_exponent || '010001',
        this.log = t.log || !1,
        this.key = null
      }
      return t.prototype.setKey = function (t) {
        this.log && this.key && console.warn('A key was already set, overriding existing.'),
        this.key = new rt(t)
      }
      ,
      t.prototype.setPublicKey = function (t) {
        this.setKey(t)
      }
      ,
      t.prototype.encrypt = function (t) {
        try {
          return f(this.key.encrypt(t))
        } catch (t) {
          return !1
        }
      }
      ,
      t.version = '3.3.1',
      t
    }())
  }
  )(),
  r.default
}());

function my_rsa_encrypt (password, pubKey) {
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(pubKey)
  const rsaPassword = encrypt.encrypt(password)
  return rsaPassword
}

var password = "testTEST12345!@#$%";
var pubKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBgxenWGQrynpHxvRsnlXWBFCrGhf3eES3/aajLV+oceh1m4xZyUSA5mMoRvdvfmo+snVPuGPTwzz4MP1xLSgEtcQRzl1atza0Kt106HBKihKqhqJsLTSRE0xiGcZJMPpcpho/xLI+T3nmsHwQTMQD+TAgmzLBnffs6Hoart6FPQIDAQAB";
var encryptor = new JSEncrypt();
encryptor.setPublicKey(pubKey);
var rsaPassword = encryptor.encrypt(password);
console.log(rsaPassword);

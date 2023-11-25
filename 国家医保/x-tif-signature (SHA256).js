var SHIFT = [24, 16, 8, 0], 
EXTRA = [-2147483648, 8388608, 32768, 128],
HEX_CHARS = "0123456789abcdef".split(""),
OUTPUT_TYPES = ["hex", "array", "digest", "arrayBuffer"],
K = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];

function h(){
    var e, t, n, i = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", r = "0123456789";
    return e = o(6, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"),
    t = o(1, i),
    n = o(1, r),
    t + n + e;
    function o(e, t) {
        e = e || 32;
        for (var n = "", i = 0; i < e; i++)
            n += t.charAt(Math.ceil(1e3 * Math.random()) % t.length);
        return n
    }
}

function Sha256(e, t) {
    t ? (blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0,
    this.blocks = blocks) : this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    e ? (this.h0 = 3238371032,
    this.h1 = 914150663,
    this.h2 = 812702999,
    this.h3 = 4144912697,
    this.h4 = 4290775857,
    this.h5 = 1750603025,
    this.h6 = 1694076839,
    this.h7 = 3204075428) : (this.h0 = 1779033703,
    this.h1 = 3144134277,
    this.h2 = 1013904242,
    this.h3 = 2773480762,
    this.h4 = 1359893119,
    this.h5 = 2600822924,
    this.h6 = 528734635,
    this.h7 = 1541459225),
    this.block = this.start = this.bytes = this.hBytes = 0,
    this.finalized = this.hashed = !1,
    this.first = !0,
    this.is224 = e
}

Sha256.prototype.update = function (e) {
if (!this.finalized) {
    var t, n = typeof e;
    if ("string" !== n) {
        if ("object" !== n)
            throw new Error(ERROR);
        if (null === e)
            throw new Error(ERROR);
        if (ARRAY_BUFFER && e.constructor === ArrayBuffer)
            e = new Uint8Array(e);
        else if (!(Array.isArray(e) || ARRAY_BUFFER && ArrayBuffer.isView(e)))
            throw new Error(ERROR);
        t = !0
    }
    for (var i, r, o = 0, a = e.length, s = this.blocks; o < a; ) {
        if (this.hashed && (this.hashed = !1,
        s[0] = this.block,
        s[16] = s[1] = s[2] = s[3] = s[4] = s[5] = s[6] = s[7] = s[8] = s[9] = s[10] = s[11] = s[12] = s[13] = s[14] = s[15] = 0),
        t)
            for (r = this.start; o < a && r < 64; ++o)
                s[r >> 2] |= e[o] << SHIFT[3 & r++];
        else
            for (r = this.start; o < a && r < 64; ++o)
                (i = e.charCodeAt(o)) < 128 ? s[r >> 2] |= i << SHIFT[3 & r++] : i < 2048 ? (s[r >> 2] |= (192 | i >> 6) << SHIFT[3 & r++],
                s[r >> 2] |= (128 | 63 & i) << SHIFT[3 & r++]) : i < 55296 || i >= 57344 ? (s[r >> 2] |= (224 | i >> 12) << SHIFT[3 & r++],
                s[r >> 2] |= (128 | i >> 6 & 63) << SHIFT[3 & r++],
                s[r >> 2] |= (128 | 63 & i) << SHIFT[3 & r++]) : (i = 65536 + ((1023 & i) << 10 | 1023 & e.charCodeAt(++o)),
                s[r >> 2] |= (240 | i >> 18) << SHIFT[3 & r++],
                s[r >> 2] |= (128 | i >> 12 & 63) << SHIFT[3 & r++],
                s[r >> 2] |= (128 | i >> 6 & 63) << SHIFT[3 & r++],
                s[r >> 2] |= (128 | 63 & i) << SHIFT[3 & r++]);
        this.lastByteIndex = r,
        this.bytes += r - this.start,
        r >= 64 ? (this.block = s[16],
        this.start = r - 64,
        this.hash(),
        this.hashed = !0) : this.start = r
    }
    return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0,
    this.bytes = this.bytes % 4294967296),
    this
}}

Sha256.prototype.finalize = function() {
    if (!this.finalized) {
        this.finalized = !0;
        var e = this.blocks
          , t = this.lastByteIndex;
        e[16] = this.block,
        e[t >> 2] |= EXTRA[3 & t],
        this.block = e[16],
        t >= 56 && (this.hashed || this.hash(),
        e[0] = this.block,
        e[16] = e[1] = e[2] = e[3] = e[4] = e[5] = e[6] = e[7] = e[8] = e[9] = e[10] = e[11] = e[12] = e[13] = e[14] = e[15] = 0),
        e[14] = this.hBytes << 3 | this.bytes >>> 29,
        e[15] = this.bytes << 3,
        this.hash()
    }
}

Sha256.prototype.hash = function() {
    var e, t, n, i, r, o, a, s, l, u = this.h0, c = this.h1, h = this.h2, d = this.h3, f = this.h4, p = this.h5, m = this.h6, v = this.h7, g = this.blocks;
    for (e = 16; e < 64; ++e)
        t = ((r = g[e - 15]) >>> 7 | r << 25) ^ (r >>> 18 | r << 14) ^ r >>> 3,
        n = ((r = g[e - 2]) >>> 17 | r << 15) ^ (r >>> 19 | r << 13) ^ r >>> 10,
        g[e] = g[e - 16] + t + g[e - 7] + n << 0;
    for (l = c & h,
    e = 0; e < 64; e += 4)
        this.first ? (this.is224 ? (o = 300032,
        v = (r = g[0] - 1413257819) - 150054599 << 0,
        d = r + 24177077 << 0) : (o = 704751109,
        v = (r = g[0] - 210244248) - 1521486534 << 0,
        d = r + 143694565 << 0),
        this.first = !1) : (t = (u >>> 2 | u << 30) ^ (u >>> 13 | u << 19) ^ (u >>> 22 | u << 10),
        i = (o = u & c) ^ u & h ^ l,
        v = d + (r = v + (n = (f >>> 6 | f << 26) ^ (f >>> 11 | f << 21) ^ (f >>> 25 | f << 7)) + (f & p ^ ~f & m) + K[e] + g[e]) << 0,
        d = r + (t + i) << 0),
        t = (d >>> 2 | d << 30) ^ (d >>> 13 | d << 19) ^ (d >>> 22 | d << 10),
        i = (a = d & u) ^ d & c ^ o,
        m = h + (r = m + (n = (v >>> 6 | v << 26) ^ (v >>> 11 | v << 21) ^ (v >>> 25 | v << 7)) + (v & f ^ ~v & p) + K[e + 1] + g[e + 1]) << 0,
        t = ((h = r + (t + i) << 0) >>> 2 | h << 30) ^ (h >>> 13 | h << 19) ^ (h >>> 22 | h << 10),
        i = (s = h & d) ^ h & u ^ a,
        p = c + (r = p + (n = (m >>> 6 | m << 26) ^ (m >>> 11 | m << 21) ^ (m >>> 25 | m << 7)) + (m & v ^ ~m & f) + K[e + 2] + g[e + 2]) << 0,
        t = ((c = r + (t + i) << 0) >>> 2 | c << 30) ^ (c >>> 13 | c << 19) ^ (c >>> 22 | c << 10),
        i = (l = c & h) ^ c & d ^ s,
        f = u + (r = f + (n = (p >>> 6 | p << 26) ^ (p >>> 11 | p << 21) ^ (p >>> 25 | p << 7)) + (p & m ^ ~p & v) + K[e + 3] + g[e + 3]) << 0,
        u = r + (t + i) << 0;
    this.h0 = this.h0 + u << 0,
    this.h1 = this.h1 + c << 0,
    this.h2 = this.h2 + h << 0,
    this.h3 = this.h3 + d << 0,
    this.h4 = this.h4 + f << 0,
    this.h5 = this.h5 + p << 0,
    this.h6 = this.h6 + m << 0,
    this.h7 = this.h7 + v << 0
}

Sha256.prototype.hex = function() {
    this.finalize();
    var e = this.h0
      , t = this.h1
      , n = this.h2
      , i = this.h3
      , r = this.h4
      , o = this.h5
      , a = this.h6
      , s = this.h7
      , l = HEX_CHARS[e >> 28 & 15] + HEX_CHARS[e >> 24 & 15] + HEX_CHARS[e >> 20 & 15] + HEX_CHARS[e >> 16 & 15] + HEX_CHARS[e >> 12 & 15] + HEX_CHARS[e >> 8 & 15] + HEX_CHARS[e >> 4 & 15] + HEX_CHARS[15 & e] + HEX_CHARS[t >> 28 & 15] + HEX_CHARS[t >> 24 & 15] + HEX_CHARS[t >> 20 & 15] + HEX_CHARS[t >> 16 & 15] + HEX_CHARS[t >> 12 & 15] + HEX_CHARS[t >> 8 & 15] + HEX_CHARS[t >> 4 & 15] + HEX_CHARS[15 & t] + HEX_CHARS[n >> 28 & 15] + HEX_CHARS[n >> 24 & 15] + HEX_CHARS[n >> 20 & 15] + HEX_CHARS[n >> 16 & 15] + HEX_CHARS[n >> 12 & 15] + HEX_CHARS[n >> 8 & 15] + HEX_CHARS[n >> 4 & 15] + HEX_CHARS[15 & n] + HEX_CHARS[i >> 28 & 15] + HEX_CHARS[i >> 24 & 15] + HEX_CHARS[i >> 20 & 15] + HEX_CHARS[i >> 16 & 15] + HEX_CHARS[i >> 12 & 15] + HEX_CHARS[i >> 8 & 15] + HEX_CHARS[i >> 4 & 15] + HEX_CHARS[15 & i] + HEX_CHARS[r >> 28 & 15] + HEX_CHARS[r >> 24 & 15] + HEX_CHARS[r >> 20 & 15] + HEX_CHARS[r >> 16 & 15] + HEX_CHARS[r >> 12 & 15] + HEX_CHARS[r >> 8 & 15] + HEX_CHARS[r >> 4 & 15] + HEX_CHARS[15 & r] + HEX_CHARS[o >> 28 & 15] + HEX_CHARS[o >> 24 & 15] + HEX_CHARS[o >> 20 & 15] + HEX_CHARS[o >> 16 & 15] + HEX_CHARS[o >> 12 & 15] + HEX_CHARS[o >> 8 & 15] + HEX_CHARS[o >> 4 & 15] + HEX_CHARS[15 & o] + HEX_CHARS[a >> 28 & 15] + HEX_CHARS[a >> 24 & 15] + HEX_CHARS[a >> 20 & 15] + HEX_CHARS[a >> 16 & 15] + HEX_CHARS[a >> 12 & 15] + HEX_CHARS[a >> 8 & 15] + HEX_CHARS[a >> 4 & 15] + HEX_CHARS[15 & a];
    return this.is224 || (l += HEX_CHARS[s >> 28 & 15] + HEX_CHARS[s >> 24 & 15] + HEX_CHARS[s >> 20 & 15] + HEX_CHARS[s >> 16 & 15] + HEX_CHARS[s >> 12 & 15] + HEX_CHARS[s >> 8 & 15] + HEX_CHARS[s >> 4 & 15] + HEX_CHARS[15 & s]),
    l
}

// function get_x_tif_signature(timestamp, random_text){
//     enc=new Sha256(),
//     signature=enc.update(timestamp+random_text+timestamp)["hex"]();
//     return (signature, timestamp, random_text);
// }

function get_x_tif_signature(){
    var timestamp= Date.now().toString().slice(0,10), random_text = h(),
    enc=new Sha256(),
    signature=enc.update(timestamp+random_text+timestamp)["hex"]();
    return timestamp+'\n'+random_text+'\n'+signature;
}

//var timestamp= Date.now().toString().slice(0,10), random_text = h(),
// res=get_x_tif_signature();
// console.log(res)
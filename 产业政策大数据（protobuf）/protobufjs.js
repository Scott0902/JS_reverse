function param_encode(m) {
    var w=new Writer();
    w.create();
        w.uint32(10).string(m.word)
        w.uint32(18).string(m.department)
        w.uint32(26).string(m.policyType)
        w.uint32(34).string(m.industry)
        w.uint32(42).string(m.customerIndt)
        w.uint32(50).string(m.startTime)
        w.uint32(58).string(m.endTime)
        w.uint32(66).string(m.province)
        w.uint32(74).string(m.city)
        w.uint32(82).string(m.downtown)
        w.uint32(90).string(m.garden)
        w.uint32(96).uint32(m.wholews)
        w.uint32(104).uint32(m.type)
        w.uint32(112).uint32(m.sorttype)
        w.uint32(120).uint32(m.pageNum)
        w.uint32(128).uint32(m.pageSize)
    return w
}

function Writer(e, t, n){
    var g;
    function c(e, t, n) {
        this.fn = e,
        this.len = t,
        this.next = g,
        this.val = n
    }
    function p(e, t, n) {
        t[n] = 255 & e
    }
    function h(e, t) {
        this.len = e,
        this.next = g,
        this.val = t
    }
    function a_length(e) {
        for (var t, n = 0, o = 0; o < e.length; ++o)
            (t = e.charCodeAt(o)) < 128 ? n += 1 : t < 2048 ? n += 2 : 55296 == (64512 & t) && 56320 == (64512 & e.charCodeAt(o + 1)) ? (++o,
            n += 4) : n += 3;
        return n
    }
    function a_write (e, t, n) {
        for (var o, r, i = n, s = 0; s < e.length; ++s)
            (o = e.charCodeAt(s)) < 128 ? t[n++] = o : (o < 2048 ? t[n++] = o >> 6 | 192 : (55296 == (64512 & o) && 56320 == (64512 & (r = e.charCodeAt(s + 1))) ? (++s,
            t[n++] = (o = 65536 + ((1023 & o) << 10) + (1023 & r)) >> 18 | 240,
            t[n++] = o >> 12 & 63 | 128) : t[n++] = o >> 12 | 224,
            t[n++] = o >> 6 & 63 | 128),
            t[n++] = 63 & o | 128);
        return n - i
    }
    this.create = function () {
        this.len = 0,
        this.head = new c({},0,0),
        this.tail = this.head,
        this.states = null
    },
    this.p = function(e, t, n) {
        return this.tail = this.tail.next = new c(e,t,n),
        this.len += t,
        this
    },
    (h.prototype = Object.create(c.prototype)).fn = function(e, t, n) {
        for (; 127 < e; )
            t[n++] = 127 & e | 128,
            e >>>= 7;
        t[n] = e
    },
    this.uint32 = function(e) {
        return this.len += (this.tail = this.tail.next = new h((e >>>= 0) < 128 ? 1 : e < 16384 ? 2 : e < 2097152 ? 3 : e < 268435456 ? 4 : 5,e)).len,
        this
    },
    this.string = function(e) {
        var t = a_length(e);
        return t ? this.uint32(t).p(a_write, t, e) : this.p(p, 1, 0)
    },
    this.finish = function() {
        for (var e = this.head.next, t = new Uint8Array(this.len), n = 0; e; )
            e.fn(e.val, t, n),
            n += e.len,
            e = e.next;
        return t
    }
  };

function PolicyInfoSearchParam_encode(m){
    var res=param_encode(m).finish().slice(),
    result='', i=0;
    for (i = 0; i < res.length; i++)
      result += ('0'+res[i].toString(16)).slice(-2);
  return result;
} 


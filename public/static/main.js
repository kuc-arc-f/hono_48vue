/**
* @vue/shared v3.4.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function bs(e, t) {
  const s = new Set(e.split(","));
  return t ? (n) => s.has(n.toLowerCase()) : (n) => s.has(n);
}
const V = {}, ze = [], ie = () => {
}, Er = () => !1, Mt = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), xs = (e) => e.startsWith("onUpdate:"), Y = Object.assign, ys = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, Cr = Object.prototype.hasOwnProperty, R = (e, t) => Cr.call(e, t), I = Array.isArray, qe = (e) => Ft(e) === "[object Map]", wn = (e) => Ft(e) === "[object Set]", A = (e) => typeof e == "function", G = (e) => typeof e == "string", Qe = (e) => typeof e == "symbol", B = (e) => e !== null && typeof e == "object", En = (e) => (B(e) || A(e)) && A(e.then) && A(e.catch), Cn = Object.prototype.toString, Ft = (e) => Cn.call(e), Or = (e) => Ft(e).slice(8, -1), On = (e) => Ft(e) === "[object Object]", vs = (e) => G(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, wt = /* @__PURE__ */ bs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Lt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (s) => t[s] || (t[s] = e(s));
}, Tr = /-(\w)/g, Ye = Lt((e) => e.replace(Tr, (t, s) => s ? s.toUpperCase() : "")), Ir = /\B([A-Z])/g, ke = Lt(
  (e) => e.replace(Ir, "-$1").toLowerCase()
), Tn = Lt((e) => e.charAt(0).toUpperCase() + e.slice(1)), Yt = Lt((e) => e ? `on${Tn(e)}` : ""), Pe = (e, t) => !Object.is(e, t), Zt = (e, t) => {
  for (let s = 0; s < e.length; s++)
    e[s](t);
}, Tt = (e, t, s) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: s
  });
}, Sr = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Ws;
const In = () => Ws || (Ws = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function ws(e) {
  if (I(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], r = G(n) ? Mr(n) : ws(n);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else if (G(e) || B(e))
    return e;
}
const Ar = /;(?![^(]*\))/g, Pr = /:([^]+)/, Rr = /\/\*[^]*?\*\//g;
function Mr(e) {
  const t = {};
  return e.replace(Rr, "").split(Ar).forEach((s) => {
    if (s) {
      const n = s.split(Pr);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function Es(e) {
  let t = "";
  if (G(e))
    t = e;
  else if (I(e))
    for (let s = 0; s < e.length; s++) {
      const n = Es(e[s]);
      n && (t += n + " ");
    }
  else if (B(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const Fr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Lr = /* @__PURE__ */ bs(Fr);
function Sn(e) {
  return !!e || e === "";
}
const zs = (e) => G(e) ? e : e == null ? "" : I(e) || B(e) && (e.toString === Cn || !A(e.toString)) ? JSON.stringify(e, An, 2) : String(e), An = (e, t) => t && t.__v_isRef ? An(e, t.value) : qe(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, r], i) => (s[Xt(n, i) + " =>"] = r, s),
    {}
  )
} : wn(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => Xt(s))
} : Qe(t) ? Xt(t) : B(t) && !I(t) && !On(t) ? String(t) : t, Xt = (e, t = "") => {
  var s;
  return Qe(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e;
};
/**
* @vue/reactivity v3.4.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let le;
class Nr {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = le, !t && le && (this.index = (le.scopes || (le.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const s = le;
      try {
        return le = this, t();
      } finally {
        le = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    le = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    le = this.parent;
  }
  stop(t) {
    if (this._active) {
      let s, n;
      for (s = 0, n = this.effects.length; s < n; s++)
        this.effects[s].stop();
      for (s = 0, n = this.cleanups.length; s < n; s++)
        this.cleanups[s]();
      if (this.scopes)
        for (s = 0, n = this.scopes.length; s < n; s++)
          this.scopes[s].stop(!0);
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function $r(e, t = le) {
  t && t.active && t.effects.push(e);
}
function Hr() {
  return le;
}
let He;
class Cs {
  constructor(t, s, n, r) {
    this.fn = t, this.trigger = s, this.scheduler = n, this.active = !0, this.deps = [], this._dirtyLevel = 2, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, $r(this, r);
  }
  get dirty() {
    if (this._dirtyLevel === 1) {
      Ue();
      for (let t = 0; t < this._depsLength; t++) {
        const s = this.deps[t];
        if (s.computed && (jr(s.computed), this._dirtyLevel >= 2))
          break;
      }
      this._dirtyLevel < 2 && (this._dirtyLevel = 0), Be();
    }
    return this._dirtyLevel >= 2;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 2 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = Ie, s = He;
    try {
      return Ie = !0, He = this, this._runnings++, qs(this), this.fn();
    } finally {
      Gs(this), this._runnings--, He = s, Ie = t;
    }
  }
  stop() {
    var t;
    this.active && (qs(this), Gs(this), (t = this.onStop) == null || t.call(this), this.active = !1);
  }
}
function jr(e) {
  return e.value;
}
function qs(e) {
  e._trackId++, e._depsLength = 0;
}
function Gs(e) {
  if (e.deps && e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      Pn(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function Pn(e, t) {
  const s = e.get(t);
  s !== void 0 && t._trackId !== s && (e.delete(t), e.size === 0 && e.cleanup());
}
let Ie = !0, is = 0;
const Rn = [];
function Ue() {
  Rn.push(Ie), Ie = !1;
}
function Be() {
  const e = Rn.pop();
  Ie = e === void 0 ? !0 : e;
}
function Os() {
  is++;
}
function Ts() {
  for (is--; !is && os.length; )
    os.shift()();
}
function Mn(e, t, s) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const n = e.deps[e._depsLength];
    n !== t ? (n && Pn(n, e), e.deps[e._depsLength++] = t) : e._depsLength++;
  }
}
const os = [];
function Fn(e, t, s) {
  Os();
  for (const n of e.keys())
    if (e.get(n) === n._trackId) {
      if (n._dirtyLevel < t) {
        const r = n._dirtyLevel;
        n._dirtyLevel = t, r === 0 && (n._shouldSchedule = !0, n.trigger());
      }
      n.scheduler && n._shouldSchedule && (!n._runnings || n.allowRecurse) && (n._shouldSchedule = !1, os.push(n.scheduler));
    }
  Ts();
}
const Ln = (e, t) => {
  const s = /* @__PURE__ */ new Map();
  return s.cleanup = e, s.computed = t, s;
}, ls = /* @__PURE__ */ new WeakMap(), je = Symbol(""), cs = Symbol("");
function te(e, t, s) {
  if (Ie && He) {
    let n = ls.get(e);
    n || ls.set(e, n = /* @__PURE__ */ new Map());
    let r = n.get(s);
    r || n.set(s, r = Ln(() => n.delete(s))), Mn(
      He,
      r
    );
  }
}
function ve(e, t, s, n, r, i) {
  const l = ls.get(e);
  if (!l)
    return;
  let f = [];
  if (t === "clear")
    f = [...l.values()];
  else if (s === "length" && I(e)) {
    const u = Number(n);
    l.forEach((d, p) => {
      (p === "length" || !Qe(p) && p >= u) && f.push(d);
    });
  } else
    switch (s !== void 0 && f.push(l.get(s)), t) {
      case "add":
        I(e) ? vs(s) && f.push(l.get("length")) : (f.push(l.get(je)), qe(e) && f.push(l.get(cs)));
        break;
      case "delete":
        I(e) || (f.push(l.get(je)), qe(e) && f.push(l.get(cs)));
        break;
      case "set":
        qe(e) && f.push(l.get(je));
        break;
    }
  Os();
  for (const u of f)
    u && Fn(
      u,
      2
    );
  Ts();
}
const Vr = /* @__PURE__ */ bs("__proto__,__v_isRef,__isVue"), Nn = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Qe)
), Js = /* @__PURE__ */ Ur();
function Ur() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...s) {
      const n = F(this);
      for (let i = 0, l = this.length; i < l; i++)
        te(n, "get", i + "");
      const r = n[t](...s);
      return r === -1 || r === !1 ? n[t](...s.map(F)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...s) {
      Ue(), Os();
      const n = F(this)[t].apply(this, s);
      return Ts(), Be(), n;
    };
  }), e;
}
function Br(e) {
  const t = F(this);
  return te(t, "has", e), t.hasOwnProperty(e);
}
class $n {
  constructor(t = !1, s = !1) {
    this._isReadonly = t, this._shallow = s;
  }
  get(t, s, n) {
    const r = this._isReadonly, i = this._shallow;
    if (s === "__v_isReactive")
      return !r;
    if (s === "__v_isReadonly")
      return r;
    if (s === "__v_isShallow")
      return i;
    if (s === "__v_raw")
      return n === (r ? i ? ei : Un : i ? Vn : jn).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const l = I(t);
    if (!r) {
      if (l && R(Js, s))
        return Reflect.get(Js, s, n);
      if (s === "hasOwnProperty")
        return Br;
    }
    const f = Reflect.get(t, s, n);
    return (Qe(s) ? Nn.has(s) : Vr(s)) || (r || te(t, "get", s), i) ? f : se(f) ? l && vs(s) ? f : f.value : B(f) ? r ? Bn(f) : As(f) : f;
  }
}
class Hn extends $n {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, r) {
    let i = t[s];
    if (!this._shallow) {
      const u = Ze(i);
      if (!It(n) && !Ze(n) && (i = F(i), n = F(n)), !I(t) && se(i) && !se(n))
        return u ? !1 : (i.value = n, !0);
    }
    const l = I(t) && vs(s) ? Number(s) < t.length : R(t, s), f = Reflect.set(t, s, n, r);
    return t === F(r) && (l ? Pe(n, i) && ve(t, "set", s, n) : ve(t, "add", s, n)), f;
  }
  deleteProperty(t, s) {
    const n = R(t, s);
    t[s];
    const r = Reflect.deleteProperty(t, s);
    return r && n && ve(t, "delete", s, void 0), r;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!Qe(s) || !Nn.has(s)) && te(t, "has", s), n;
  }
  ownKeys(t) {
    return te(
      t,
      "iterate",
      I(t) ? "length" : je
    ), Reflect.ownKeys(t);
  }
}
class Kr extends $n {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, s) {
    return !0;
  }
  deleteProperty(t, s) {
    return !0;
  }
}
const Dr = /* @__PURE__ */ new Hn(), Wr = /* @__PURE__ */ new Kr(), zr = /* @__PURE__ */ new Hn(
  !0
), Is = (e) => e, Nt = (e) => Reflect.getPrototypeOf(e);
function _t(e, t, s = !1, n = !1) {
  e = e.__v_raw;
  const r = F(e), i = F(t);
  s || (Pe(t, i) && te(r, "get", t), te(r, "get", i));
  const { has: l } = Nt(r), f = n ? Is : s ? Rs : ot;
  if (l.call(r, t))
    return f(e.get(t));
  if (l.call(r, i))
    return f(e.get(i));
  e !== r && e.get(t);
}
function mt(e, t = !1) {
  const s = this.__v_raw, n = F(s), r = F(e);
  return t || (Pe(e, r) && te(n, "has", e), te(n, "has", r)), e === r ? s.has(e) : s.has(e) || s.has(r);
}
function bt(e, t = !1) {
  return e = e.__v_raw, !t && te(F(e), "iterate", je), Reflect.get(e, "size", e);
}
function Ys(e) {
  e = F(e);
  const t = F(this);
  return Nt(t).has.call(t, e) || (t.add(e), ve(t, "add", e, e)), this;
}
function Zs(e, t) {
  t = F(t);
  const s = F(this), { has: n, get: r } = Nt(s);
  let i = n.call(s, e);
  i || (e = F(e), i = n.call(s, e));
  const l = r.call(s, e);
  return s.set(e, t), i ? Pe(t, l) && ve(s, "set", e, t) : ve(s, "add", e, t), this;
}
function Xs(e) {
  const t = F(this), { has: s, get: n } = Nt(t);
  let r = s.call(t, e);
  r || (e = F(e), r = s.call(t, e)), n && n.call(t, e);
  const i = t.delete(e);
  return r && ve(t, "delete", e, void 0), i;
}
function Qs() {
  const e = F(this), t = e.size !== 0, s = e.clear();
  return t && ve(e, "clear", void 0, void 0), s;
}
function xt(e, t) {
  return function(n, r) {
    const i = this, l = i.__v_raw, f = F(l), u = t ? Is : e ? Rs : ot;
    return !e && te(f, "iterate", je), l.forEach((d, p) => n.call(r, u(d), u(p), i));
  };
}
function yt(e, t, s) {
  return function(...n) {
    const r = this.__v_raw, i = F(r), l = qe(i), f = e === "entries" || e === Symbol.iterator && l, u = e === "keys" && l, d = r[e](...n), p = s ? Is : t ? Rs : ot;
    return !t && te(
      i,
      "iterate",
      u ? cs : je
    ), {
      // iterator protocol
      next() {
        const { value: v, done: E } = d.next();
        return E ? { value: v, done: E } : {
          value: f ? [p(v[0]), p(v[1])] : p(v),
          done: E
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Ee(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function qr() {
  const e = {
    get(i) {
      return _t(this, i);
    },
    get size() {
      return bt(this);
    },
    has: mt,
    add: Ys,
    set: Zs,
    delete: Xs,
    clear: Qs,
    forEach: xt(!1, !1)
  }, t = {
    get(i) {
      return _t(this, i, !1, !0);
    },
    get size() {
      return bt(this);
    },
    has: mt,
    add: Ys,
    set: Zs,
    delete: Xs,
    clear: Qs,
    forEach: xt(!1, !0)
  }, s = {
    get(i) {
      return _t(this, i, !0);
    },
    get size() {
      return bt(this, !0);
    },
    has(i) {
      return mt.call(this, i, !0);
    },
    add: Ee("add"),
    set: Ee("set"),
    delete: Ee("delete"),
    clear: Ee("clear"),
    forEach: xt(!0, !1)
  }, n = {
    get(i) {
      return _t(this, i, !0, !0);
    },
    get size() {
      return bt(this, !0);
    },
    has(i) {
      return mt.call(this, i, !0);
    },
    add: Ee("add"),
    set: Ee("set"),
    delete: Ee("delete"),
    clear: Ee("clear"),
    forEach: xt(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
    e[i] = yt(
      i,
      !1,
      !1
    ), s[i] = yt(
      i,
      !0,
      !1
    ), t[i] = yt(
      i,
      !1,
      !0
    ), n[i] = yt(
      i,
      !0,
      !0
    );
  }), [
    e,
    s,
    t,
    n
  ];
}
const [
  Gr,
  Jr,
  Yr,
  Zr
] = /* @__PURE__ */ qr();
function Ss(e, t) {
  const s = t ? e ? Zr : Yr : e ? Jr : Gr;
  return (n, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? n : Reflect.get(
    R(s, r) && r in n ? s : n,
    r,
    i
  );
}
const Xr = {
  get: /* @__PURE__ */ Ss(!1, !1)
}, Qr = {
  get: /* @__PURE__ */ Ss(!1, !0)
}, kr = {
  get: /* @__PURE__ */ Ss(!0, !1)
}, jn = /* @__PURE__ */ new WeakMap(), Vn = /* @__PURE__ */ new WeakMap(), Un = /* @__PURE__ */ new WeakMap(), ei = /* @__PURE__ */ new WeakMap();
function ti(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function si(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ti(Or(e));
}
function As(e) {
  return Ze(e) ? e : Ps(
    e,
    !1,
    Dr,
    Xr,
    jn
  );
}
function ni(e) {
  return Ps(
    e,
    !1,
    zr,
    Qr,
    Vn
  );
}
function Bn(e) {
  return Ps(
    e,
    !0,
    Wr,
    kr,
    Un
  );
}
function Ps(e, t, s, n, r) {
  if (!B(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = r.get(e);
  if (i)
    return i;
  const l = si(e);
  if (l === 0)
    return e;
  const f = new Proxy(
    e,
    l === 2 ? n : s
  );
  return r.set(e, f), f;
}
function Ge(e) {
  return Ze(e) ? Ge(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Ze(e) {
  return !!(e && e.__v_isReadonly);
}
function It(e) {
  return !!(e && e.__v_isShallow);
}
function Kn(e) {
  return Ge(e) || Ze(e);
}
function F(e) {
  const t = e && e.__v_raw;
  return t ? F(t) : e;
}
function Dn(e) {
  return Tt(e, "__v_skip", !0), e;
}
const ot = (e) => B(e) ? As(e) : e, Rs = (e) => B(e) ? Bn(e) : e;
class Wn {
  constructor(t, s, n, r) {
    this._setter = s, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new Cs(
      () => t(this._value),
      () => fs(this, 1)
    ), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = n;
  }
  get value() {
    const t = F(this);
    return (!t._cacheable || t.effect.dirty) && Pe(t._value, t._value = t.effect.run()) && fs(t, 2), zn(t), t._value;
  }
  set value(t) {
    this._setter(t);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(t) {
    this.effect.dirty = t;
  }
  // #endregion
}
function ri(e, t, s = !1) {
  let n, r;
  const i = A(e);
  return i ? (n = e, r = ie) : (n = e.get, r = e.set), new Wn(n, r, i || !r, s);
}
function zn(e) {
  Ie && He && (e = F(e), Mn(
    He,
    e.dep || (e.dep = Ln(
      () => e.dep = void 0,
      e instanceof Wn ? e : void 0
    ))
  ));
}
function fs(e, t = 2, s) {
  e = F(e);
  const n = e.dep;
  n && Fn(
    n,
    t
  );
}
function se(e) {
  return !!(e && e.__v_isRef === !0);
}
function ii(e) {
  return oi(e, !1);
}
function oi(e, t) {
  return se(e) ? e : new li(e, t);
}
class li {
  constructor(t, s) {
    this.__v_isShallow = s, this.dep = void 0, this.__v_isRef = !0, this._rawValue = s ? t : F(t), this._value = s ? t : ot(t);
  }
  get value() {
    return zn(this), this._value;
  }
  set value(t) {
    const s = this.__v_isShallow || It(t) || Ze(t);
    t = s ? t : F(t), Pe(t, this._rawValue) && (this._rawValue = t, this._value = s ? t : ot(t), fs(this, 2));
  }
}
function ci(e) {
  return se(e) ? e.value : e;
}
const fi = {
  get: (e, t, s) => ci(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const r = e[t];
    return se(r) && !se(s) ? (r.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function qn(e) {
  return Ge(e) ? e : new Proxy(e, fi);
}
/**
* @vue/runtime-core v3.4.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Se(e, t, s, n) {
  let r;
  try {
    r = n ? e(...n) : e();
  } catch (i) {
    $t(i, t, s);
  }
  return r;
}
function ue(e, t, s, n) {
  if (A(e)) {
    const i = Se(e, t, s, n);
    return i && En(i) && i.catch((l) => {
      $t(l, t, s);
    }), i;
  }
  const r = [];
  for (let i = 0; i < e.length; i++)
    r.push(ue(e[i], t, s, n));
  return r;
}
function $t(e, t, s, n = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let i = t.parent;
    const l = t.proxy, f = `https://vuejs.org/errors/#runtime-${s}`;
    for (; i; ) {
      const d = i.ec;
      if (d) {
        for (let p = 0; p < d.length; p++)
          if (d[p](e, l, f) === !1)
            return;
      }
      i = i.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      Se(
        u,
        null,
        10,
        [e, l, f]
      );
      return;
    }
  }
  ui(e, s, r, n);
}
function ui(e, t, s, n = !0) {
  console.error(e);
}
let lt = !1, us = !1;
const Z = [];
let me = 0;
const Je = [];
let Ce = null, $e = 0;
const Gn = /* @__PURE__ */ Promise.resolve();
let Ms = null;
function ai(e) {
  const t = Ms || Gn;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function di(e) {
  let t = me + 1, s = Z.length;
  for (; t < s; ) {
    const n = t + s >>> 1, r = Z[n], i = ct(r);
    i < e || i === e && r.pre ? t = n + 1 : s = n;
  }
  return t;
}
function Fs(e) {
  (!Z.length || !Z.includes(
    e,
    lt && e.allowRecurse ? me + 1 : me
  )) && (e.id == null ? Z.push(e) : Z.splice(di(e.id), 0, e), Jn());
}
function Jn() {
  !lt && !us && (us = !0, Ms = Gn.then(Zn));
}
function hi(e) {
  const t = Z.indexOf(e);
  t > me && Z.splice(t, 1);
}
function pi(e) {
  I(e) ? Je.push(...e) : (!Ce || !Ce.includes(
    e,
    e.allowRecurse ? $e + 1 : $e
  )) && Je.push(e), Jn();
}
function ks(e, t, s = lt ? me + 1 : 0) {
  for (; s < Z.length; s++) {
    const n = Z[s];
    if (n && n.pre) {
      if (e && n.id !== e.uid)
        continue;
      Z.splice(s, 1), s--, n();
    }
  }
}
function Yn(e) {
  if (Je.length) {
    const t = [...new Set(Je)].sort(
      (s, n) => ct(s) - ct(n)
    );
    if (Je.length = 0, Ce) {
      Ce.push(...t);
      return;
    }
    for (Ce = t, $e = 0; $e < Ce.length; $e++)
      Ce[$e]();
    Ce = null, $e = 0;
  }
}
const ct = (e) => e.id == null ? 1 / 0 : e.id, gi = (e, t) => {
  const s = ct(e) - ct(t);
  if (s === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return s;
};
function Zn(e) {
  us = !1, lt = !0, Z.sort(gi);
  try {
    for (me = 0; me < Z.length; me++) {
      const t = Z[me];
      t && t.active !== !1 && Se(t, null, 14);
    }
  } finally {
    me = 0, Z.length = 0, Yn(), lt = !1, Ms = null, (Z.length || Je.length) && Zn();
  }
}
function _i(e, t, ...s) {
  if (e.isUnmounted)
    return;
  const n = e.vnode.props || V;
  let r = s;
  const i = t.startsWith("update:"), l = i && t.slice(7);
  if (l && l in n) {
    const p = `${l === "modelValue" ? "model" : l}Modifiers`, { number: v, trim: E } = n[p] || V;
    E && (r = s.map((S) => G(S) ? S.trim() : S)), v && (r = s.map(Sr));
  }
  let f, u = n[f = Yt(t)] || // also try camelCase event handler (#2249)
  n[f = Yt(Ye(t))];
  !u && i && (u = n[f = Yt(ke(t))]), u && ue(
    u,
    e,
    6,
    r
  );
  const d = n[f + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[f])
      return;
    e.emitted[f] = !0, ue(
      d,
      e,
      6,
      r
    );
  }
}
function Xn(e, t, s = !1) {
  const n = t.emitsCache, r = n.get(e);
  if (r !== void 0)
    return r;
  const i = e.emits;
  let l = {}, f = !1;
  if (!A(e)) {
    const u = (d) => {
      const p = Xn(d, t, !0);
      p && (f = !0, Y(l, p));
    };
    !s && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !i && !f ? (B(e) && n.set(e, null), null) : (I(i) ? i.forEach((u) => l[u] = null) : Y(l, i), B(e) && n.set(e, l), l);
}
function Ht(e, t) {
  return !e || !Mt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), R(e, t[0].toLowerCase() + t.slice(1)) || R(e, ke(t)) || R(e, t));
}
let be = null, jt = null;
function St(e) {
  const t = be;
  return be = e, jt = e && e.type.__scopeId || null, t;
}
function Qn(e) {
  jt = e;
}
function kn() {
  jt = null;
}
function mi(e, t = be, s) {
  if (!t || e._n)
    return e;
  const n = (...r) => {
    n._d && un(-1);
    const i = St(t);
    let l;
    try {
      l = e(...r);
    } finally {
      St(i), n._d && un(1);
    }
    return l;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function Qt(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: r,
    props: i,
    propsOptions: [l],
    slots: f,
    attrs: u,
    emit: d,
    render: p,
    renderCache: v,
    data: E,
    setupState: S,
    ctx: K,
    inheritAttrs: L
  } = e;
  let W, D;
  const ae = St(e);
  try {
    if (s.shapeFlag & 4) {
      const z = r || n, re = z;
      W = _e(
        p.call(
          re,
          z,
          v,
          i,
          S,
          E,
          K
        )
      ), D = u;
    } else {
      const z = t;
      W = _e(
        z.length > 1 ? z(
          i,
          { attrs: u, slots: f, emit: d }
        ) : z(
          i,
          null
          /* we know it doesn't need it */
        )
      ), D = t.props ? u : bi(u);
    }
  } catch (z) {
    it.length = 0, $t(z, e, 1), W = Ae(ft);
  }
  let $ = W;
  if (D && L !== !1) {
    const z = Object.keys(D), { shapeFlag: re } = $;
    z.length && re & 7 && (l && z.some(xs) && (D = xi(
      D,
      l
    )), $ = Xe($, D));
  }
  return s.dirs && ($ = Xe($), $.dirs = $.dirs ? $.dirs.concat(s.dirs) : s.dirs), s.transition && ($.transition = s.transition), W = $, St(ae), W;
}
const bi = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || Mt(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, xi = (e, t) => {
  const s = {};
  for (const n in e)
    (!xs(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function yi(e, t, s) {
  const { props: n, children: r, component: i } = e, { props: l, children: f, patchFlag: u } = t, d = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return n ? en(n, l, d) : !!l;
    if (u & 8) {
      const p = t.dynamicProps;
      for (let v = 0; v < p.length; v++) {
        const E = p[v];
        if (l[E] !== n[E] && !Ht(d, E))
          return !0;
      }
    }
  } else
    return (r || f) && (!f || !f.$stable) ? !0 : n === l ? !1 : n ? l ? en(n, l, d) : !0 : !!l;
  return !1;
}
function en(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < n.length; r++) {
    const i = n[r];
    if (t[i] !== e[i] && !Ht(s, i))
      return !0;
  }
  return !1;
}
function vi({ vnode: e, parent: t }, s) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
}
const wi = Symbol.for("v-ndc"), Ei = (e) => e.__isSuspense;
function Ci(e, t) {
  t && t.pendingBranch ? I(e) ? t.effects.push(...e) : t.effects.push(e) : pi(e);
}
const Oi = Symbol.for("v-scx"), Ti = () => Ct(Oi), vt = {};
function kt(e, t, s) {
  return er(e, t, s);
}
function er(e, t, {
  immediate: s,
  deep: n,
  flush: r,
  once: i,
  onTrack: l,
  onTrigger: f
} = V) {
  if (t && i) {
    const M = t;
    t = (...xe) => {
      M(...xe), re();
    };
  }
  const u = k, d = (M) => n === !0 ? M : (
    // for deep: false, only traverse root-level properties
    We(M, n === !1 ? 1 : void 0)
  );
  let p, v = !1, E = !1;
  if (se(e) ? (p = () => e.value, v = It(e)) : Ge(e) ? (p = () => d(e), v = !0) : I(e) ? (E = !0, v = e.some((M) => Ge(M) || It(M)), p = () => e.map((M) => {
    if (se(M))
      return M.value;
    if (Ge(M))
      return d(M);
    if (A(M))
      return Se(M, u, 2);
  })) : A(e) ? t ? p = () => Se(e, u, 2) : p = () => (S && S(), ue(
    e,
    u,
    3,
    [K]
  )) : p = ie, t && n) {
    const M = p;
    p = () => We(M());
  }
  let S, K = (M) => {
    S = $.onStop = () => {
      Se(M, u, 4), S = $.onStop = void 0;
    };
  }, L;
  if (Kt)
    if (K = ie, t ? s && ue(t, u, 3, [
      p(),
      E ? [] : void 0,
      K
    ]) : p(), r === "sync") {
      const M = Ti();
      L = M.__watcherHandles || (M.__watcherHandles = []);
    } else
      return ie;
  let W = E ? new Array(e.length).fill(vt) : vt;
  const D = () => {
    if (!(!$.active || !$.dirty))
      if (t) {
        const M = $.run();
        (n || v || (E ? M.some((xe, de) => Pe(xe, W[de])) : Pe(M, W))) && (S && S(), ue(t, u, 3, [
          M,
          // pass undefined as the old value when it's changed for the first time
          W === vt ? void 0 : E && W[0] === vt ? [] : W,
          K
        ]), W = M);
      } else
        $.run();
  };
  D.allowRecurse = !!t;
  let ae;
  r === "sync" ? ae = D : r === "post" ? ae = () => ee(D, u && u.suspense) : (D.pre = !0, u && (D.id = u.uid), ae = () => Fs(D));
  const $ = new Cs(p, ie, ae), z = Hr(), re = () => {
    $.stop(), z && ys(z.effects, $);
  };
  return t ? s ? D() : W = $.run() : r === "post" ? ee(
    $.run.bind($),
    u && u.suspense
  ) : $.run(), L && L.push(re), re;
}
function Ii(e, t, s) {
  const n = this.proxy, r = G(e) ? e.includes(".") ? tr(n, e) : () => n[e] : e.bind(n, n);
  let i;
  A(t) ? i = t : (i = t.handler, s = t);
  const l = at(this), f = er(r, i.bind(n), s);
  return l(), f;
}
function tr(e, t) {
  const s = t.split(".");
  return () => {
    let n = e;
    for (let r = 0; r < s.length && n; r++)
      n = n[s[r]];
    return n;
  };
}
function We(e, t, s = 0, n) {
  if (!B(e) || e.__v_skip)
    return e;
  if (t && t > 0) {
    if (s >= t)
      return e;
    s++;
  }
  if (n = n || /* @__PURE__ */ new Set(), n.has(e))
    return e;
  if (n.add(e), se(e))
    We(e.value, t, s, n);
  else if (I(e))
    for (let r = 0; r < e.length; r++)
      We(e[r], t, s, n);
  else if (wn(e) || qe(e))
    e.forEach((r) => {
      We(r, t, s, n);
    });
  else if (On(e))
    for (const r in e)
      We(e[r], t, s, n);
  return e;
}
function Le(e, t, s, n) {
  const r = e.dirs, i = t && t.dirs;
  for (let l = 0; l < r.length; l++) {
    const f = r[l];
    i && (f.oldValue = i[l].value);
    let u = f.dir[n];
    u && (Ue(), ue(u, s, 8, [
      e.el,
      f,
      e,
      t
    ]), Be());
  }
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function sr(e, t) {
  return A(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Y({ name: e.name }, t, { setup: e })
  ) : e;
}
const Et = (e) => !!e.type.__asyncLoader, nr = (e) => e.type.__isKeepAlive;
function Si(e, t) {
  rr(e, "a", t);
}
function Ai(e, t) {
  rr(e, "da", t);
}
function rr(e, t, s = k) {
  const n = e.__wdc || (e.__wdc = () => {
    let r = s;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (Vt(t, n, s), s) {
    let r = s.parent;
    for (; r && r.parent; )
      nr(r.parent.vnode) && Pi(n, t, s, r), r = r.parent;
  }
}
function Pi(e, t, s, n) {
  const r = Vt(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  ir(() => {
    ys(n[t], r);
  }, s);
}
function Vt(e, t, s = k, n = !1) {
  if (s) {
    const r = s[e] || (s[e] = []), i = t.__weh || (t.__weh = (...l) => {
      if (s.isUnmounted)
        return;
      Ue();
      const f = at(s), u = ue(t, s, e, l);
      return f(), Be(), u;
    });
    return n ? r.unshift(i) : r.push(i), i;
  }
}
const we = (e) => (t, s = k) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!Kt || e === "sp") && Vt(e, (...n) => t(...n), s)
), Ri = we("bm"), Mi = we("m"), Fi = we("bu"), Li = we("u"), Ni = we("bum"), ir = we("um"), $i = we("sp"), Hi = we(
  "rtg"
), ji = we(
  "rtc"
);
function Vi(e, t = k) {
  Vt("ec", e, t);
}
const as = (e) => e ? br(e) ? Hs(e) || e.proxy : as(e.parent) : null, rt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Y(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => as(e.parent),
    $root: (e) => as(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Ls(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, Fs(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = ai.bind(e.proxy)),
    $watch: (e) => Ii.bind(e)
  })
), es = (e, t) => e !== V && !e.__isScriptSetup && R(e, t), Ui = {
  get({ _: e }, t) {
    const { ctx: s, setupState: n, data: r, props: i, accessCache: l, type: f, appContext: u } = e;
    let d;
    if (t[0] !== "$") {
      const S = l[t];
      if (S !== void 0)
        switch (S) {
          case 1:
            return n[t];
          case 2:
            return r[t];
          case 4:
            return s[t];
          case 3:
            return i[t];
        }
      else {
        if (es(n, t))
          return l[t] = 1, n[t];
        if (r !== V && R(r, t))
          return l[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (d = e.propsOptions[0]) && R(d, t)
        )
          return l[t] = 3, i[t];
        if (s !== V && R(s, t))
          return l[t] = 4, s[t];
        ds && (l[t] = 0);
      }
    }
    const p = rt[t];
    let v, E;
    if (p)
      return t === "$attrs" && te(e, "get", t), p(e);
    if (
      // css module (injected by vue-loader)
      (v = f.__cssModules) && (v = v[t])
    )
      return v;
    if (s !== V && R(s, t))
      return l[t] = 4, s[t];
    if (
      // global properties
      E = u.config.globalProperties, R(E, t)
    )
      return E[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: r, ctx: i } = e;
    return es(r, t) ? (r[t] = s, !0) : n !== V && R(n, t) ? (n[t] = s, !0) : R(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: r, propsOptions: i }
  }, l) {
    let f;
    return !!s[l] || e !== V && R(e, l) || es(t, l) || (f = i[0]) && R(f, l) || R(n, l) || R(rt, l) || R(r.config.globalProperties, l);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : R(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function tn(e) {
  return I(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let ds = !0;
function Bi(e) {
  const t = Ls(e), s = e.proxy, n = e.ctx;
  ds = !1, t.beforeCreate && sn(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: i,
    methods: l,
    watch: f,
    provide: u,
    inject: d,
    // lifecycle
    created: p,
    beforeMount: v,
    mounted: E,
    beforeUpdate: S,
    updated: K,
    activated: L,
    deactivated: W,
    beforeDestroy: D,
    beforeUnmount: ae,
    destroyed: $,
    unmounted: z,
    render: re,
    renderTracked: M,
    renderTriggered: xe,
    errorCaptured: de,
    serverPrefetch: Wt,
    // public API
    expose: Re,
    inheritAttrs: et,
    // assets
    components: dt,
    directives: ht,
    filters: zt
  } = t;
  if (d && Ki(d, n, null), l)
    for (const U in l) {
      const H = l[U];
      A(H) && (n[U] = H.bind(s));
    }
  if (r) {
    const U = r.call(s, s);
    B(U) && (e.data = As(U));
  }
  if (ds = !0, i)
    for (const U in i) {
      const H = i[U], Me = A(H) ? H.bind(s, s) : A(H.get) ? H.get.bind(s, s) : ie, pt = !A(H) && A(H.set) ? H.set.bind(s) : ie, Fe = yo({
        get: Me,
        set: pt
      });
      Object.defineProperty(n, U, {
        enumerable: !0,
        configurable: !0,
        get: () => Fe.value,
        set: (he) => Fe.value = he
      });
    }
  if (f)
    for (const U in f)
      or(f[U], n, s, U);
  if (u) {
    const U = A(u) ? u.call(s) : u;
    Reflect.ownKeys(U).forEach((H) => {
      Ji(H, U[H]);
    });
  }
  p && sn(p, e, "c");
  function X(U, H) {
    I(H) ? H.forEach((Me) => U(Me.bind(s))) : H && U(H.bind(s));
  }
  if (X(Ri, v), X(Mi, E), X(Fi, S), X(Li, K), X(Si, L), X(Ai, W), X(Vi, de), X(ji, M), X(Hi, xe), X(Ni, ae), X(ir, z), X($i, Wt), I(Re))
    if (Re.length) {
      const U = e.exposed || (e.exposed = {});
      Re.forEach((H) => {
        Object.defineProperty(U, H, {
          get: () => s[H],
          set: (Me) => s[H] = Me
        });
      });
    } else
      e.exposed || (e.exposed = {});
  re && e.render === ie && (e.render = re), et != null && (e.inheritAttrs = et), dt && (e.components = dt), ht && (e.directives = ht);
}
function Ki(e, t, s = ie) {
  I(e) && (e = hs(e));
  for (const n in e) {
    const r = e[n];
    let i;
    B(r) ? "default" in r ? i = Ct(
      r.from || n,
      r.default,
      !0
    ) : i = Ct(r.from || n) : i = Ct(r), se(i) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (l) => i.value = l
    }) : t[n] = i;
  }
}
function sn(e, t, s) {
  ue(
    I(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function or(e, t, s, n) {
  const r = n.includes(".") ? tr(s, n) : () => s[n];
  if (G(e)) {
    const i = t[e];
    A(i) && kt(r, i);
  } else if (A(e))
    kt(r, e.bind(s));
  else if (B(e))
    if (I(e))
      e.forEach((i) => or(i, t, s, n));
    else {
      const i = A(e.handler) ? e.handler.bind(s) : t[e.handler];
      A(i) && kt(r, i, e);
    }
}
function Ls(e) {
  const t = e.type, { mixins: s, extends: n } = t, {
    mixins: r,
    optionsCache: i,
    config: { optionMergeStrategies: l }
  } = e.appContext, f = i.get(t);
  let u;
  return f ? u = f : !r.length && !s && !n ? u = t : (u = {}, r.length && r.forEach(
    (d) => At(u, d, l, !0)
  ), At(u, t, l)), B(t) && i.set(t, u), u;
}
function At(e, t, s, n = !1) {
  const { mixins: r, extends: i } = t;
  i && At(e, i, s, !0), r && r.forEach(
    (l) => At(e, l, s, !0)
  );
  for (const l in t)
    if (!(n && l === "expose")) {
      const f = Di[l] || s && s[l];
      e[l] = f ? f(e[l], t[l]) : t[l];
    }
  return e;
}
const Di = {
  data: nn,
  props: rn,
  emits: rn,
  // objects
  methods: nt,
  computed: nt,
  // lifecycle
  beforeCreate: Q,
  created: Q,
  beforeMount: Q,
  mounted: Q,
  beforeUpdate: Q,
  updated: Q,
  beforeDestroy: Q,
  beforeUnmount: Q,
  destroyed: Q,
  unmounted: Q,
  activated: Q,
  deactivated: Q,
  errorCaptured: Q,
  serverPrefetch: Q,
  // assets
  components: nt,
  directives: nt,
  // watch
  watch: zi,
  // provide / inject
  provide: nn,
  inject: Wi
};
function nn(e, t) {
  return t ? e ? function() {
    return Y(
      A(e) ? e.call(this, this) : e,
      A(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Wi(e, t) {
  return nt(hs(e), hs(t));
}
function hs(e) {
  if (I(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++)
      t[e[s]] = e[s];
    return t;
  }
  return e;
}
function Q(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function nt(e, t) {
  return e ? Y(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function rn(e, t) {
  return e ? I(e) && I(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Y(
    /* @__PURE__ */ Object.create(null),
    tn(e),
    tn(t ?? {})
  ) : t;
}
function zi(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const s = Y(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    s[n] = Q(e[n], t[n]);
  return s;
}
function lr() {
  return {
    app: null,
    config: {
      isNativeTag: Er,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let qi = 0;
function Gi(e, t) {
  return function(n, r = null) {
    A(n) || (n = Y({}, n)), r != null && !B(r) && (r = null);
    const i = lr(), l = /* @__PURE__ */ new WeakSet();
    let f = !1;
    const u = i.app = {
      _uid: qi++,
      _component: n,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: vo,
      get config() {
        return i.config;
      },
      set config(d) {
      },
      use(d, ...p) {
        return l.has(d) || (d && A(d.install) ? (l.add(d), d.install(u, ...p)) : A(d) && (l.add(d), d(u, ...p))), u;
      },
      mixin(d) {
        return i.mixins.includes(d) || i.mixins.push(d), u;
      },
      component(d, p) {
        return p ? (i.components[d] = p, u) : i.components[d];
      },
      directive(d, p) {
        return p ? (i.directives[d] = p, u) : i.directives[d];
      },
      mount(d, p, v) {
        if (!f) {
          const E = Ae(n, r);
          return E.appContext = i, v === !0 ? v = "svg" : v === !1 && (v = void 0), p && t ? t(E, d) : e(E, d, v), f = !0, u._container = d, d.__vue_app__ = u, Hs(E.component) || E.component.proxy;
        }
      },
      unmount() {
        f && (e(null, u._container), delete u._container.__vue_app__);
      },
      provide(d, p) {
        return i.provides[d] = p, u;
      },
      runWithContext(d) {
        Pt = u;
        try {
          return d();
        } finally {
          Pt = null;
        }
      }
    };
    return u;
  };
}
let Pt = null;
function Ji(e, t) {
  if (k) {
    let s = k.provides;
    const n = k.parent && k.parent.provides;
    n === s && (s = k.provides = Object.create(n)), s[e] = t;
  }
}
function Ct(e, t, s = !1) {
  const n = k || be;
  if (n || Pt) {
    const r = n ? n.parent == null ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : Pt._context.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return s && A(t) ? t.call(n && n.proxy) : t;
  }
}
function Yi(e, t, s, n = !1) {
  const r = {}, i = {};
  Tt(i, Bt, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), cr(e, t, r, i);
  for (const l in e.propsOptions[0])
    l in r || (r[l] = void 0);
  s ? e.props = n ? r : ni(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
}
function Zi(e, t, s, n) {
  const {
    props: r,
    attrs: i,
    vnode: { patchFlag: l }
  } = e, f = F(r), [u] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || l > 0) && !(l & 16)
  ) {
    if (l & 8) {
      const p = e.vnode.dynamicProps;
      for (let v = 0; v < p.length; v++) {
        let E = p[v];
        if (Ht(e.emitsOptions, E))
          continue;
        const S = t[E];
        if (u)
          if (R(i, E))
            S !== i[E] && (i[E] = S, d = !0);
          else {
            const K = Ye(E);
            r[K] = ps(
              u,
              f,
              K,
              S,
              e,
              !1
            );
          }
        else
          S !== i[E] && (i[E] = S, d = !0);
      }
    }
  } else {
    cr(e, t, r, i) && (d = !0);
    let p;
    for (const v in f)
      (!t || // for camelCase
      !R(t, v) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((p = ke(v)) === v || !R(t, p))) && (u ? s && // for camelCase
      (s[v] !== void 0 || // for kebab-case
      s[p] !== void 0) && (r[v] = ps(
        u,
        f,
        v,
        void 0,
        e,
        !0
      )) : delete r[v]);
    if (i !== f)
      for (const v in i)
        (!t || !R(t, v)) && (delete i[v], d = !0);
  }
  d && ve(e, "set", "$attrs");
}
function cr(e, t, s, n) {
  const [r, i] = e.propsOptions;
  let l = !1, f;
  if (t)
    for (let u in t) {
      if (wt(u))
        continue;
      const d = t[u];
      let p;
      r && R(r, p = Ye(u)) ? !i || !i.includes(p) ? s[p] = d : (f || (f = {}))[p] = d : Ht(e.emitsOptions, u) || (!(u in n) || d !== n[u]) && (n[u] = d, l = !0);
    }
  if (i) {
    const u = F(s), d = f || V;
    for (let p = 0; p < i.length; p++) {
      const v = i[p];
      s[v] = ps(
        r,
        u,
        v,
        d[v],
        e,
        !R(d, v)
      );
    }
  }
  return l;
}
function ps(e, t, s, n, r, i) {
  const l = e[s];
  if (l != null) {
    const f = R(l, "default");
    if (f && n === void 0) {
      const u = l.default;
      if (l.type !== Function && !l.skipFactory && A(u)) {
        const { propsDefaults: d } = r;
        if (s in d)
          n = d[s];
        else {
          const p = at(r);
          n = d[s] = u.call(
            null,
            t
          ), p();
        }
      } else
        n = u;
    }
    l[
      0
      /* shouldCast */
    ] && (i && !f ? n = !1 : l[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === ke(s)) && (n = !0));
  }
  return n;
}
function fr(e, t, s = !1) {
  const n = t.propsCache, r = n.get(e);
  if (r)
    return r;
  const i = e.props, l = {}, f = [];
  let u = !1;
  if (!A(e)) {
    const p = (v) => {
      u = !0;
      const [E, S] = fr(v, t, !0);
      Y(l, E), S && f.push(...S);
    };
    !s && t.mixins.length && t.mixins.forEach(p), e.extends && p(e.extends), e.mixins && e.mixins.forEach(p);
  }
  if (!i && !u)
    return B(e) && n.set(e, ze), ze;
  if (I(i))
    for (let p = 0; p < i.length; p++) {
      const v = Ye(i[p]);
      on(v) && (l[v] = V);
    }
  else if (i)
    for (const p in i) {
      const v = Ye(p);
      if (on(v)) {
        const E = i[p], S = l[v] = I(E) || A(E) ? { type: E } : Y({}, E);
        if (S) {
          const K = fn(Boolean, S.type), L = fn(String, S.type);
          S[
            0
            /* shouldCast */
          ] = K > -1, S[
            1
            /* shouldCastTrue */
          ] = L < 0 || K < L, (K > -1 || R(S, "default")) && f.push(v);
        }
      }
    }
  const d = [l, f];
  return B(e) && n.set(e, d), d;
}
function on(e) {
  return e[0] !== "$";
}
function ln(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function cn(e, t) {
  return ln(e) === ln(t);
}
function fn(e, t) {
  return I(t) ? t.findIndex((s) => cn(s, e)) : A(t) && cn(t, e) ? 0 : -1;
}
const ur = (e) => e[0] === "_" || e === "$stable", Ns = (e) => I(e) ? e.map(_e) : [_e(e)], Xi = (e, t, s) => {
  if (t._n)
    return t;
  const n = mi((...r) => Ns(t(...r)), s);
  return n._c = !1, n;
}, ar = (e, t, s) => {
  const n = e._ctx;
  for (const r in e) {
    if (ur(r))
      continue;
    const i = e[r];
    if (A(i))
      t[r] = Xi(r, i, n);
    else if (i != null) {
      const l = Ns(i);
      t[r] = () => l;
    }
  }
}, dr = (e, t) => {
  const s = Ns(t);
  e.slots.default = () => s;
}, Qi = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (e.slots = F(t), Tt(t, "_", s)) : ar(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && dr(e, t);
  Tt(e.slots, Bt, 1);
}, ki = (e, t, s) => {
  const { vnode: n, slots: r } = e;
  let i = !0, l = V;
  if (n.shapeFlag & 32) {
    const f = t._;
    f ? s && f === 1 ? i = !1 : (Y(r, t), !s && f === 1 && delete r._) : (i = !t.$stable, ar(t, r)), l = t;
  } else
    t && (dr(e, t), l = { default: 1 });
  if (i)
    for (const f in r)
      !ur(f) && l[f] == null && delete r[f];
};
function gs(e, t, s, n, r = !1) {
  if (I(e)) {
    e.forEach(
      (E, S) => gs(
        E,
        t && (I(t) ? t[S] : t),
        s,
        n,
        r
      )
    );
    return;
  }
  if (Et(n) && !r)
    return;
  const i = n.shapeFlag & 4 ? Hs(n.component) || n.component.proxy : n.el, l = r ? null : i, { i: f, r: u } = e, d = t && t.r, p = f.refs === V ? f.refs = {} : f.refs, v = f.setupState;
  if (d != null && d !== u && (G(d) ? (p[d] = null, R(v, d) && (v[d] = null)) : se(d) && (d.value = null)), A(u))
    Se(u, f, 12, [l, p]);
  else {
    const E = G(u), S = se(u);
    if (E || S) {
      const K = () => {
        if (e.f) {
          const L = E ? R(v, u) ? v[u] : p[u] : u.value;
          r ? I(L) && ys(L, i) : I(L) ? L.includes(i) || L.push(i) : E ? (p[u] = [i], R(v, u) && (v[u] = p[u])) : (u.value = [i], e.k && (p[e.k] = u.value));
        } else
          E ? (p[u] = l, R(v, u) && (v[u] = l)) : S && (u.value = l, e.k && (p[e.k] = l));
      };
      l ? (K.id = -1, ee(K, s)) : K();
    }
  }
}
const ee = Ci;
function eo(e) {
  return to(e);
}
function to(e, t) {
  const s = In();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: r,
    patchProp: i,
    createElement: l,
    createText: f,
    createComment: u,
    setText: d,
    setElementText: p,
    parentNode: v,
    nextSibling: E,
    setScopeId: S = ie,
    insertStaticContent: K
  } = e, L = (o, c, a, h = null, g = null, b = null, y = void 0, m = null, x = !!c.dynamicChildren) => {
    if (o === c)
      return;
    o && !st(o, c) && (h = gt(o), he(o, g, b, !0), o = null), c.patchFlag === -2 && (x = !1, c.dynamicChildren = null);
    const { type: _, ref: w, shapeFlag: O } = c;
    switch (_) {
      case Ut:
        W(o, c, a, h);
        break;
      case ft:
        D(o, c, a, h);
        break;
      case ss:
        o == null && ae(c, a, h, y);
        break;
      case ce:
        dt(
          o,
          c,
          a,
          h,
          g,
          b,
          y,
          m,
          x
        );
        break;
      default:
        O & 1 ? re(
          o,
          c,
          a,
          h,
          g,
          b,
          y,
          m,
          x
        ) : O & 6 ? ht(
          o,
          c,
          a,
          h,
          g,
          b,
          y,
          m,
          x
        ) : (O & 64 || O & 128) && _.process(
          o,
          c,
          a,
          h,
          g,
          b,
          y,
          m,
          x,
          Ke
        );
    }
    w != null && g && gs(w, o && o.ref, b, c || o, !c);
  }, W = (o, c, a, h) => {
    if (o == null)
      n(
        c.el = f(c.children),
        a,
        h
      );
    else {
      const g = c.el = o.el;
      c.children !== o.children && d(g, c.children);
    }
  }, D = (o, c, a, h) => {
    o == null ? n(
      c.el = u(c.children || ""),
      a,
      h
    ) : c.el = o.el;
  }, ae = (o, c, a, h) => {
    [o.el, o.anchor] = K(
      o.children,
      c,
      a,
      h,
      o.el,
      o.anchor
    );
  }, $ = ({ el: o, anchor: c }, a, h) => {
    let g;
    for (; o && o !== c; )
      g = E(o), n(o, a, h), o = g;
    n(c, a, h);
  }, z = ({ el: o, anchor: c }) => {
    let a;
    for (; o && o !== c; )
      a = E(o), r(o), o = a;
    r(c);
  }, re = (o, c, a, h, g, b, y, m, x) => {
    c.type === "svg" ? y = "svg" : c.type === "math" && (y = "mathml"), o == null ? M(
      c,
      a,
      h,
      g,
      b,
      y,
      m,
      x
    ) : Wt(
      o,
      c,
      g,
      b,
      y,
      m,
      x
    );
  }, M = (o, c, a, h, g, b, y, m) => {
    let x, _;
    const { props: w, shapeFlag: O, transition: C, dirs: T } = o;
    if (x = o.el = l(
      o.type,
      b,
      w && w.is,
      w
    ), O & 8 ? p(x, o.children) : O & 16 && de(
      o.children,
      x,
      null,
      h,
      g,
      ts(o, b),
      y,
      m
    ), T && Le(o, null, h, "created"), xe(x, o, o.scopeId, y, h), w) {
      for (const N in w)
        N !== "value" && !wt(N) && i(
          x,
          N,
          null,
          w[N],
          b,
          o.children,
          h,
          g,
          ye
        );
      "value" in w && i(x, "value", null, w.value, b), (_ = w.onVnodeBeforeMount) && ge(_, h, o);
    }
    T && Le(o, null, h, "beforeMount");
    const P = so(g, C);
    P && C.beforeEnter(x), n(x, c, a), ((_ = w && w.onVnodeMounted) || P || T) && ee(() => {
      _ && ge(_, h, o), P && C.enter(x), T && Le(o, null, h, "mounted");
    }, g);
  }, xe = (o, c, a, h, g) => {
    if (a && S(o, a), h)
      for (let b = 0; b < h.length; b++)
        S(o, h[b]);
    if (g) {
      let b = g.subTree;
      if (c === b) {
        const y = g.vnode;
        xe(
          o,
          y,
          y.scopeId,
          y.slotScopeIds,
          g.parent
        );
      }
    }
  }, de = (o, c, a, h, g, b, y, m, x = 0) => {
    for (let _ = x; _ < o.length; _++) {
      const w = o[_] = m ? Oe(o[_]) : _e(o[_]);
      L(
        null,
        w,
        c,
        a,
        h,
        g,
        b,
        y,
        m
      );
    }
  }, Wt = (o, c, a, h, g, b, y) => {
    const m = c.el = o.el;
    let { patchFlag: x, dynamicChildren: _, dirs: w } = c;
    x |= o.patchFlag & 16;
    const O = o.props || V, C = c.props || V;
    let T;
    if (a && Ne(a, !1), (T = C.onVnodeBeforeUpdate) && ge(T, a, c, o), w && Le(c, o, a, "beforeUpdate"), a && Ne(a, !0), _ ? Re(
      o.dynamicChildren,
      _,
      m,
      a,
      h,
      ts(c, g),
      b
    ) : y || H(
      o,
      c,
      m,
      null,
      a,
      h,
      ts(c, g),
      b,
      !1
    ), x > 0) {
      if (x & 16)
        et(
          m,
          c,
          O,
          C,
          a,
          h,
          g
        );
      else if (x & 2 && O.class !== C.class && i(m, "class", null, C.class, g), x & 4 && i(m, "style", O.style, C.style, g), x & 8) {
        const P = c.dynamicProps;
        for (let N = 0; N < P.length; N++) {
          const j = P[N], q = O[j], oe = C[j];
          (oe !== q || j === "value") && i(
            m,
            j,
            q,
            oe,
            g,
            o.children,
            a,
            h,
            ye
          );
        }
      }
      x & 1 && o.children !== c.children && p(m, c.children);
    } else
      !y && _ == null && et(
        m,
        c,
        O,
        C,
        a,
        h,
        g
      );
    ((T = C.onVnodeUpdated) || w) && ee(() => {
      T && ge(T, a, c, o), w && Le(c, o, a, "updated");
    }, h);
  }, Re = (o, c, a, h, g, b, y) => {
    for (let m = 0; m < c.length; m++) {
      const x = o[m], _ = c[m], w = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        x.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (x.type === ce || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !st(x, _) || // - In the case of a component, it could contain anything.
        x.shapeFlag & 70) ? v(x.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          a
        )
      );
      L(
        x,
        _,
        w,
        null,
        h,
        g,
        b,
        y,
        !0
      );
    }
  }, et = (o, c, a, h, g, b, y) => {
    if (a !== h) {
      if (a !== V)
        for (const m in a)
          !wt(m) && !(m in h) && i(
            o,
            m,
            a[m],
            null,
            y,
            c.children,
            g,
            b,
            ye
          );
      for (const m in h) {
        if (wt(m))
          continue;
        const x = h[m], _ = a[m];
        x !== _ && m !== "value" && i(
          o,
          m,
          _,
          x,
          y,
          c.children,
          g,
          b,
          ye
        );
      }
      "value" in h && i(o, "value", a.value, h.value, y);
    }
  }, dt = (o, c, a, h, g, b, y, m, x) => {
    const _ = c.el = o ? o.el : f(""), w = c.anchor = o ? o.anchor : f("");
    let { patchFlag: O, dynamicChildren: C, slotScopeIds: T } = c;
    T && (m = m ? m.concat(T) : T), o == null ? (n(_, a, h), n(w, a, h), de(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      c.children || [],
      a,
      w,
      g,
      b,
      y,
      m,
      x
    )) : O > 0 && O & 64 && C && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    o.dynamicChildren ? (Re(
      o.dynamicChildren,
      C,
      a,
      g,
      b,
      y,
      m
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (c.key != null || g && c === g.subTree) && hr(
      o,
      c,
      !0
      /* shallow */
    )) : H(
      o,
      c,
      a,
      w,
      g,
      b,
      y,
      m,
      x
    );
  }, ht = (o, c, a, h, g, b, y, m, x) => {
    c.slotScopeIds = m, o == null ? c.shapeFlag & 512 ? g.ctx.activate(
      c,
      a,
      h,
      y,
      x
    ) : zt(
      c,
      a,
      h,
      g,
      b,
      y,
      x
    ) : js(o, c, x);
  }, zt = (o, c, a, h, g, b, y) => {
    const m = o.component = po(
      o,
      h,
      g
    );
    if (nr(o) && (m.ctx.renderer = Ke), go(m), m.asyncDep) {
      if (g && g.registerDep(m, X), !o.el) {
        const x = m.subTree = Ae(ft);
        D(null, x, c, a);
      }
    } else
      X(
        m,
        o,
        c,
        a,
        g,
        b,
        y
      );
  }, js = (o, c, a) => {
    const h = c.component = o.component;
    if (yi(o, c, a))
      if (h.asyncDep && !h.asyncResolved) {
        U(h, c, a);
        return;
      } else
        h.next = c, hi(h.update), h.effect.dirty = !0, h.update();
    else
      c.el = o.el, h.vnode = c;
  }, X = (o, c, a, h, g, b, y) => {
    const m = () => {
      if (o.isMounted) {
        let { next: w, bu: O, u: C, parent: T, vnode: P } = o;
        {
          const De = pr(o);
          if (De) {
            w && (w.el = P.el, U(o, w, y)), De.asyncDep.then(() => {
              o.isUnmounted || m();
            });
            return;
          }
        }
        let N = w, j;
        Ne(o, !1), w ? (w.el = P.el, U(o, w, y)) : w = P, O && Zt(O), (j = w.props && w.props.onVnodeBeforeUpdate) && ge(j, T, w, P), Ne(o, !0);
        const q = Qt(o), oe = o.subTree;
        o.subTree = q, L(
          oe,
          q,
          // parent may have changed if it's in a teleport
          v(oe.el),
          // anchor may have changed if it's in a fragment
          gt(oe),
          o,
          g,
          b
        ), w.el = q.el, N === null && vi(o, q.el), C && ee(C, g), (j = w.props && w.props.onVnodeUpdated) && ee(
          () => ge(j, T, w, P),
          g
        );
      } else {
        let w;
        const { el: O, props: C } = c, { bm: T, m: P, parent: N } = o, j = Et(c);
        if (Ne(o, !1), T && Zt(T), !j && (w = C && C.onVnodeBeforeMount) && ge(w, N, c), Ne(o, !0), O && Jt) {
          const q = () => {
            o.subTree = Qt(o), Jt(
              O,
              o.subTree,
              o,
              g,
              null
            );
          };
          j ? c.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !o.isUnmounted && q()
          ) : q();
        } else {
          const q = o.subTree = Qt(o);
          L(
            null,
            q,
            a,
            h,
            o,
            g,
            b
          ), c.el = q.el;
        }
        if (P && ee(P, g), !j && (w = C && C.onVnodeMounted)) {
          const q = c;
          ee(
            () => ge(w, N, q),
            g
          );
        }
        (c.shapeFlag & 256 || N && Et(N.vnode) && N.vnode.shapeFlag & 256) && o.a && ee(o.a, g), o.isMounted = !0, c = a = h = null;
      }
    }, x = o.effect = new Cs(
      m,
      ie,
      () => Fs(_),
      o.scope
      // track it in component's effect scope
    ), _ = o.update = () => {
      x.dirty && x.run();
    };
    _.id = o.uid, Ne(o, !0), _();
  }, U = (o, c, a) => {
    c.component = o;
    const h = o.vnode.props;
    o.vnode = c, o.next = null, Zi(o, c.props, h, a), ki(o, c.children, a), Ue(), ks(o), Be();
  }, H = (o, c, a, h, g, b, y, m, x = !1) => {
    const _ = o && o.children, w = o ? o.shapeFlag : 0, O = c.children, { patchFlag: C, shapeFlag: T } = c;
    if (C > 0) {
      if (C & 128) {
        pt(
          _,
          O,
          a,
          h,
          g,
          b,
          y,
          m,
          x
        );
        return;
      } else if (C & 256) {
        Me(
          _,
          O,
          a,
          h,
          g,
          b,
          y,
          m,
          x
        );
        return;
      }
    }
    T & 8 ? (w & 16 && ye(_, g, b), O !== _ && p(a, O)) : w & 16 ? T & 16 ? pt(
      _,
      O,
      a,
      h,
      g,
      b,
      y,
      m,
      x
    ) : ye(_, g, b, !0) : (w & 8 && p(a, ""), T & 16 && de(
      O,
      a,
      h,
      g,
      b,
      y,
      m,
      x
    ));
  }, Me = (o, c, a, h, g, b, y, m, x) => {
    o = o || ze, c = c || ze;
    const _ = o.length, w = c.length, O = Math.min(_, w);
    let C;
    for (C = 0; C < O; C++) {
      const T = c[C] = x ? Oe(c[C]) : _e(c[C]);
      L(
        o[C],
        T,
        a,
        null,
        g,
        b,
        y,
        m,
        x
      );
    }
    _ > w ? ye(
      o,
      g,
      b,
      !0,
      !1,
      O
    ) : de(
      c,
      a,
      h,
      g,
      b,
      y,
      m,
      x,
      O
    );
  }, pt = (o, c, a, h, g, b, y, m, x) => {
    let _ = 0;
    const w = c.length;
    let O = o.length - 1, C = w - 1;
    for (; _ <= O && _ <= C; ) {
      const T = o[_], P = c[_] = x ? Oe(c[_]) : _e(c[_]);
      if (st(T, P))
        L(
          T,
          P,
          a,
          null,
          g,
          b,
          y,
          m,
          x
        );
      else
        break;
      _++;
    }
    for (; _ <= O && _ <= C; ) {
      const T = o[O], P = c[C] = x ? Oe(c[C]) : _e(c[C]);
      if (st(T, P))
        L(
          T,
          P,
          a,
          null,
          g,
          b,
          y,
          m,
          x
        );
      else
        break;
      O--, C--;
    }
    if (_ > O) {
      if (_ <= C) {
        const T = C + 1, P = T < w ? c[T].el : h;
        for (; _ <= C; )
          L(
            null,
            c[_] = x ? Oe(c[_]) : _e(c[_]),
            a,
            P,
            g,
            b,
            y,
            m,
            x
          ), _++;
      }
    } else if (_ > C)
      for (; _ <= O; )
        he(o[_], g, b, !0), _++;
    else {
      const T = _, P = _, N = /* @__PURE__ */ new Map();
      for (_ = P; _ <= C; _++) {
        const ne = c[_] = x ? Oe(c[_]) : _e(c[_]);
        ne.key != null && N.set(ne.key, _);
      }
      let j, q = 0;
      const oe = C - P + 1;
      let De = !1, Bs = 0;
      const tt = new Array(oe);
      for (_ = 0; _ < oe; _++)
        tt[_] = 0;
      for (_ = T; _ <= O; _++) {
        const ne = o[_];
        if (q >= oe) {
          he(ne, g, b, !0);
          continue;
        }
        let pe;
        if (ne.key != null)
          pe = N.get(ne.key);
        else
          for (j = P; j <= C; j++)
            if (tt[j - P] === 0 && st(ne, c[j])) {
              pe = j;
              break;
            }
        pe === void 0 ? he(ne, g, b, !0) : (tt[pe - P] = _ + 1, pe >= Bs ? Bs = pe : De = !0, L(
          ne,
          c[pe],
          a,
          null,
          g,
          b,
          y,
          m,
          x
        ), q++);
      }
      const Ks = De ? no(tt) : ze;
      for (j = Ks.length - 1, _ = oe - 1; _ >= 0; _--) {
        const ne = P + _, pe = c[ne], Ds = ne + 1 < w ? c[ne + 1].el : h;
        tt[_] === 0 ? L(
          null,
          pe,
          a,
          Ds,
          g,
          b,
          y,
          m,
          x
        ) : De && (j < 0 || _ !== Ks[j] ? Fe(pe, a, Ds, 2) : j--);
      }
    }
  }, Fe = (o, c, a, h, g = null) => {
    const { el: b, type: y, transition: m, children: x, shapeFlag: _ } = o;
    if (_ & 6) {
      Fe(o.component.subTree, c, a, h);
      return;
    }
    if (_ & 128) {
      o.suspense.move(c, a, h);
      return;
    }
    if (_ & 64) {
      y.move(o, c, a, Ke);
      return;
    }
    if (y === ce) {
      n(b, c, a);
      for (let O = 0; O < x.length; O++)
        Fe(x[O], c, a, h);
      n(o.anchor, c, a);
      return;
    }
    if (y === ss) {
      $(o, c, a);
      return;
    }
    if (h !== 2 && _ & 1 && m)
      if (h === 0)
        m.beforeEnter(b), n(b, c, a), ee(() => m.enter(b), g);
      else {
        const { leave: O, delayLeave: C, afterLeave: T } = m, P = () => n(b, c, a), N = () => {
          O(b, () => {
            P(), T && T();
          });
        };
        C ? C(b, P, N) : N();
      }
    else
      n(b, c, a);
  }, he = (o, c, a, h = !1, g = !1) => {
    const {
      type: b,
      props: y,
      ref: m,
      children: x,
      dynamicChildren: _,
      shapeFlag: w,
      patchFlag: O,
      dirs: C
    } = o;
    if (m != null && gs(m, null, a, o, !0), w & 256) {
      c.ctx.deactivate(o);
      return;
    }
    const T = w & 1 && C, P = !Et(o);
    let N;
    if (P && (N = y && y.onVnodeBeforeUnmount) && ge(N, c, o), w & 6)
      wr(o.component, a, h);
    else {
      if (w & 128) {
        o.suspense.unmount(a, h);
        return;
      }
      T && Le(o, null, c, "beforeUnmount"), w & 64 ? o.type.remove(
        o,
        c,
        a,
        g,
        Ke,
        h
      ) : _ && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (b !== ce || O > 0 && O & 64) ? ye(
        _,
        c,
        a,
        !1,
        !0
      ) : (b === ce && O & 384 || !g && w & 16) && ye(x, c, a), h && Vs(o);
    }
    (P && (N = y && y.onVnodeUnmounted) || T) && ee(() => {
      N && ge(N, c, o), T && Le(o, null, c, "unmounted");
    }, a);
  }, Vs = (o) => {
    const { type: c, el: a, anchor: h, transition: g } = o;
    if (c === ce) {
      vr(a, h);
      return;
    }
    if (c === ss) {
      z(o);
      return;
    }
    const b = () => {
      r(a), g && !g.persisted && g.afterLeave && g.afterLeave();
    };
    if (o.shapeFlag & 1 && g && !g.persisted) {
      const { leave: y, delayLeave: m } = g, x = () => y(a, b);
      m ? m(o.el, b, x) : x();
    } else
      b();
  }, vr = (o, c) => {
    let a;
    for (; o !== c; )
      a = E(o), r(o), o = a;
    r(c);
  }, wr = (o, c, a) => {
    const { bum: h, scope: g, update: b, subTree: y, um: m } = o;
    h && Zt(h), g.stop(), b && (b.active = !1, he(y, o, c, a)), m && ee(m, c), ee(() => {
      o.isUnmounted = !0;
    }, c), c && c.pendingBranch && !c.isUnmounted && o.asyncDep && !o.asyncResolved && o.suspenseId === c.pendingId && (c.deps--, c.deps === 0 && c.resolve());
  }, ye = (o, c, a, h = !1, g = !1, b = 0) => {
    for (let y = b; y < o.length; y++)
      he(o[y], c, a, h, g);
  }, gt = (o) => o.shapeFlag & 6 ? gt(o.component.subTree) : o.shapeFlag & 128 ? o.suspense.next() : E(o.anchor || o.el);
  let qt = !1;
  const Us = (o, c, a) => {
    o == null ? c._vnode && he(c._vnode, null, null, !0) : L(
      c._vnode || null,
      o,
      c,
      null,
      null,
      null,
      a
    ), qt || (qt = !0, ks(), Yn(), qt = !1), c._vnode = o;
  }, Ke = {
    p: L,
    um: he,
    m: Fe,
    r: Vs,
    mt: zt,
    mc: de,
    pc: H,
    pbc: Re,
    n: gt,
    o: e
  };
  let Gt, Jt;
  return t && ([Gt, Jt] = t(
    Ke
  )), {
    render: Us,
    hydrate: Gt,
    createApp: Gi(Us, Gt)
  };
}
function ts({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function Ne({ effect: e, update: t }, s) {
  e.allowRecurse = t.allowRecurse = s;
}
function so(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function hr(e, t, s = !1) {
  const n = e.children, r = t.children;
  if (I(n) && I(r))
    for (let i = 0; i < n.length; i++) {
      const l = n[i];
      let f = r[i];
      f.shapeFlag & 1 && !f.dynamicChildren && ((f.patchFlag <= 0 || f.patchFlag === 32) && (f = r[i] = Oe(r[i]), f.el = l.el), s || hr(l, f)), f.type === Ut && (f.el = l.el);
    }
}
function no(e) {
  const t = e.slice(), s = [0];
  let n, r, i, l, f;
  const u = e.length;
  for (n = 0; n < u; n++) {
    const d = e[n];
    if (d !== 0) {
      if (r = s[s.length - 1], e[r] < d) {
        t[n] = r, s.push(n);
        continue;
      }
      for (i = 0, l = s.length - 1; i < l; )
        f = i + l >> 1, e[s[f]] < d ? i = f + 1 : l = f;
      d < e[s[i]] && (i > 0 && (t[n] = s[i - 1]), s[i] = n);
    }
  }
  for (i = s.length, l = s[i - 1]; i-- > 0; )
    s[i] = l, l = t[l];
  return s;
}
function pr(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : pr(t);
}
const ro = (e) => e.__isTeleport, ce = Symbol.for("v-fgt"), Ut = Symbol.for("v-txt"), ft = Symbol.for("v-cmt"), ss = Symbol.for("v-stc"), it = [];
let fe = null;
function gr(e = !1) {
  it.push(fe = e ? null : []);
}
function io() {
  it.pop(), fe = it[it.length - 1] || null;
}
let ut = 1;
function un(e) {
  ut += e;
}
function oo(e) {
  return e.dynamicChildren = ut > 0 ? fe || ze : null, io(), ut > 0 && fe && fe.push(e), e;
}
function _r(e, t, s, n, r, i) {
  return oo(
    J(
      e,
      t,
      s,
      n,
      r,
      i,
      !0
    )
  );
}
function lo(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function st(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Bt = "__vInternal", mr = ({ key: e }) => e ?? null, Ot = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? G(e) || se(e) || A(e) ? { i: be, r: e, k: t, f: !!s } : e : null);
function J(e, t = null, s = null, n = 0, r = null, i = e === ce ? 0 : 1, l = !1, f = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && mr(t),
    ref: t && Ot(t),
    scopeId: jt,
    slotScopeIds: null,
    children: s,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: n,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: be
  };
  return f ? ($s(u, s), i & 128 && e.normalize(u)) : s && (u.shapeFlag |= G(s) ? 8 : 16), ut > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  fe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && fe.push(u), u;
}
const Ae = co;
function co(e, t = null, s = null, n = 0, r = null, i = !1) {
  if ((!e || e === wi) && (e = ft), lo(e)) {
    const f = Xe(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && $s(f, s), ut > 0 && !i && fe && (f.shapeFlag & 6 ? fe[fe.indexOf(e)] = f : fe.push(f)), f.patchFlag |= -2, f;
  }
  if (xo(e) && (e = e.__vccOpts), t) {
    t = fo(t);
    let { class: f, style: u } = t;
    f && !G(f) && (t.class = Es(f)), B(u) && (Kn(u) && !I(u) && (u = Y({}, u)), t.style = ws(u));
  }
  const l = G(e) ? 1 : Ei(e) ? 128 : ro(e) ? 64 : B(e) ? 4 : A(e) ? 2 : 0;
  return J(
    e,
    t,
    s,
    n,
    r,
    l,
    i,
    !0
  );
}
function fo(e) {
  return e ? Kn(e) || Bt in e ? Y({}, e) : e : null;
}
function Xe(e, t, s = !1) {
  const { props: n, ref: r, patchFlag: i, children: l } = e, f = t ? uo(n || {}, t) : n;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && mr(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && r ? I(r) ? r.concat(Ot(t)) : [r, Ot(t)] : Ot(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== ce ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Xe(e.ssContent),
    ssFallback: e.ssFallback && Xe(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Ve(e = " ", t = 0) {
  return Ae(Ut, null, e, t);
}
function _e(e) {
  return e == null || typeof e == "boolean" ? Ae(ft) : I(e) ? Ae(
    ce,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Oe(e) : Ae(Ut, null, String(e));
}
function Oe(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Xe(e);
}
function $s(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (I(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), $s(e, r()), r._c && (r._d = !0));
      return;
    } else {
      s = 32;
      const r = t._;
      !r && !(Bt in t) ? t._ctx = be : r === 3 && be && (be.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    A(t) ? (t = { default: t, _ctx: be }, s = 32) : (t = String(t), n & 64 ? (s = 16, t = [Ve(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function uo(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const r in n)
      if (r === "class")
        t.class !== n.class && (t.class = Es([t.class, n.class]));
      else if (r === "style")
        t.style = ws([t.style, n.style]);
      else if (Mt(r)) {
        const i = t[r], l = n[r];
        l && i !== l && !(I(i) && i.includes(l)) && (t[r] = i ? [].concat(i, l) : l);
      } else
        r !== "" && (t[r] = n[r]);
  }
  return t;
}
function ge(e, t, s, n = null) {
  ue(e, t, 7, [
    s,
    n
  ]);
}
const ao = lr();
let ho = 0;
function po(e, t, s) {
  const n = e.type, r = (t ? t.appContext : e.appContext) || ao, i = {
    uid: ho++,
    vnode: e,
    type: n,
    parent: t,
    appContext: r,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new Nr(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: fr(n, r),
    emitsOptions: Xn(n, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: V,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: V,
    data: V,
    props: V,
    attrs: V,
    slots: V,
    refs: V,
    setupState: V,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense: s,
    suspenseId: s ? s.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = _i.bind(null, i), e.ce && e.ce(i), i;
}
let k = null, Rt, _s;
{
  const e = In(), t = (s, n) => {
    let r;
    return (r = e[s]) || (r = e[s] = []), r.push(n), (i) => {
      r.length > 1 ? r.forEach((l) => l(i)) : r[0](i);
    };
  };
  Rt = t(
    "__VUE_INSTANCE_SETTERS__",
    (s) => k = s
  ), _s = t(
    "__VUE_SSR_SETTERS__",
    (s) => Kt = s
  );
}
const at = (e) => {
  const t = k;
  return Rt(e), e.scope.on(), () => {
    e.scope.off(), Rt(t);
  };
}, an = () => {
  k && k.scope.off(), Rt(null);
};
function br(e) {
  return e.vnode.shapeFlag & 4;
}
let Kt = !1;
function go(e, t = !1) {
  t && _s(t);
  const { props: s, children: n } = e.vnode, r = br(e);
  Yi(e, s, r, t), Qi(e, n);
  const i = r ? _o(e, t) : void 0;
  return t && _s(!1), i;
}
function _o(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Dn(new Proxy(e.ctx, Ui));
  const { setup: n } = s;
  if (n) {
    const r = e.setupContext = n.length > 1 ? bo(e) : null, i = at(e);
    Ue();
    const l = Se(
      n,
      e,
      0,
      [
        e.props,
        r
      ]
    );
    if (Be(), i(), En(l)) {
      if (l.then(an, an), t)
        return l.then((f) => {
          dn(e, f, t);
        }).catch((f) => {
          $t(f, e, 0);
        });
      e.asyncDep = l;
    } else
      dn(e, l, t);
  } else
    xr(e, t);
}
function dn(e, t, s) {
  A(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : B(t) && (e.setupState = qn(t)), xr(e, s);
}
let hn;
function xr(e, t, s) {
  const n = e.type;
  if (!e.render) {
    if (!t && hn && !n.render) {
      const r = n.template || Ls(e).template;
      if (r) {
        const { isCustomElement: i, compilerOptions: l } = e.appContext.config, { delimiters: f, compilerOptions: u } = n, d = Y(
          Y(
            {
              isCustomElement: i,
              delimiters: f
            },
            l
          ),
          u
        );
        n.render = hn(r, d);
      }
    }
    e.render = n.render || ie;
  }
  {
    const r = at(e);
    Ue();
    try {
      Bi(e);
    } finally {
      Be(), r();
    }
  }
}
function mo(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, s) {
        return te(e, "get", "$attrs"), t[s];
      }
    }
  ));
}
function bo(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    get attrs() {
      return mo(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Hs(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(qn(Dn(e.exposed)), {
      get(t, s) {
        if (s in t)
          return t[s];
        if (s in rt)
          return rt[s](e);
      },
      has(t, s) {
        return s in t || s in rt;
      }
    }));
}
function xo(e) {
  return A(e) && "__vccOpts" in e;
}
const yo = (e, t) => ri(e, t, Kt), vo = "3.4.13";
/**
* @vue/runtime-dom v3.4.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const wo = "http://www.w3.org/2000/svg", Eo = "http://www.w3.org/1998/Math/MathML", Te = typeof document < "u" ? document : null, pn = Te && /* @__PURE__ */ Te.createElement("template"), Co = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const r = t === "svg" ? Te.createElementNS(wo, e) : t === "mathml" ? Te.createElementNS(Eo, e) : Te.createElement(e, s ? { is: s } : void 0);
    return e === "select" && n && n.multiple != null && r.setAttribute("multiple", n.multiple), r;
  },
  createText: (e) => Te.createTextNode(e),
  createComment: (e) => Te.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Te.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, s, n, r, i) {
    const l = s ? s.previousSibling : t.lastChild;
    if (r && (r === i || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), s), !(r === i || !(r = r.nextSibling)); )
        ;
    else {
      pn.innerHTML = n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e;
      const f = pn.content;
      if (n === "svg" || n === "mathml") {
        const u = f.firstChild;
        for (; u.firstChild; )
          f.appendChild(u.firstChild);
        f.removeChild(u);
      }
      t.insertBefore(f, s);
    }
    return [
      // first
      l ? l.nextSibling : t.firstChild,
      // last
      s ? s.previousSibling : t.lastChild
    ];
  }
}, Oo = Symbol("_vtc");
function To(e, t, s) {
  const n = e[Oo];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const Io = Symbol("_vod"), So = Symbol("");
function Ao(e, t, s) {
  const n = e.style, r = n.display, i = G(s);
  if (s && !i) {
    if (t && !G(t))
      for (const l in t)
        s[l] == null && ms(n, l, "");
    for (const l in s)
      ms(n, l, s[l]);
  } else if (i) {
    if (t !== s) {
      const l = n[So];
      l && (s += ";" + l), n.cssText = s;
    }
  } else
    t && e.removeAttribute("style");
  Io in e && (n.display = r);
}
const gn = /\s*!important$/;
function ms(e, t, s) {
  if (I(s))
    s.forEach((n) => ms(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    e.setProperty(t, s);
  else {
    const n = Po(e, t);
    gn.test(s) ? e.setProperty(
      ke(n),
      s.replace(gn, ""),
      "important"
    ) : e[n] = s;
  }
}
const _n = ["Webkit", "Moz", "ms"], ns = {};
function Po(e, t) {
  const s = ns[t];
  if (s)
    return s;
  let n = Ye(t);
  if (n !== "filter" && n in e)
    return ns[t] = n;
  n = Tn(n);
  for (let r = 0; r < _n.length; r++) {
    const i = _n[r] + n;
    if (i in e)
      return ns[t] = i;
  }
  return t;
}
const mn = "http://www.w3.org/1999/xlink";
function Ro(e, t, s, n, r) {
  if (n && t.startsWith("xlink:"))
    s == null ? e.removeAttributeNS(mn, t.slice(6, t.length)) : e.setAttributeNS(mn, t, s);
  else {
    const i = Lr(t);
    s == null || i && !Sn(s) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : s);
  }
}
function Mo(e, t, s, n, r, i, l) {
  if (t === "innerHTML" || t === "textContent") {
    n && l(n, r, i), e[t] = s ?? "";
    return;
  }
  const f = e.tagName;
  if (t === "value" && f !== "PROGRESS" && // custom elements may use _value internally
  !f.includes("-")) {
    e._value = s;
    const d = f === "OPTION" ? e.getAttribute("value") : e.value, p = s ?? "";
    d !== p && (e.value = p), s == null && e.removeAttribute(t);
    return;
  }
  let u = !1;
  if (s === "" || s == null) {
    const d = typeof e[t];
    d === "boolean" ? s = Sn(s) : s == null && d === "string" ? (s = "", u = !0) : d === "number" && (s = 0, u = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  u && e.removeAttribute(t);
}
function Fo(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function Lo(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const bn = Symbol("_vei");
function No(e, t, s, n, r = null) {
  const i = e[bn] || (e[bn] = {}), l = i[t];
  if (n && l)
    l.value = n;
  else {
    const [f, u] = $o(t);
    if (n) {
      const d = i[t] = Vo(n, r);
      Fo(e, f, d, u);
    } else
      l && (Lo(e, f, l, u), i[t] = void 0);
  }
}
const xn = /(?:Once|Passive|Capture)$/;
function $o(e) {
  let t;
  if (xn.test(e)) {
    t = {};
    let n;
    for (; n = e.match(xn); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : ke(e.slice(2)), t];
}
let rs = 0;
const Ho = /* @__PURE__ */ Promise.resolve(), jo = () => rs || (Ho.then(() => rs = 0), rs = Date.now());
function Vo(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    ue(
      Uo(n, s.value),
      t,
      5,
      [n]
    );
  };
  return s.value = e, s.attached = jo(), s;
}
function Uo(e, t) {
  if (I(t)) {
    const s = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      s.call(e), e._stopped = !0;
    }, t.map((n) => (r) => !r._stopped && n && n(r));
  } else
    return t;
}
const yn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Bo = (e, t, s, n, r, i, l, f, u) => {
  const d = r === "svg";
  t === "class" ? To(e, n, d) : t === "style" ? Ao(e, s, n) : Mt(t) ? xs(t) || No(e, t, s, n, l) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Ko(e, t, n, d)) ? Mo(
    e,
    t,
    n,
    i,
    l,
    f,
    u
  ) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), Ro(e, t, n, d));
};
function Ko(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && yn(t) && A(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return yn(t) && G(s) ? !1 : t in e;
}
const Do = /* @__PURE__ */ Y({ patchProp: Bo }, Co);
let vn;
function Wo() {
  return vn || (vn = eo(Do));
}
const zo = (...e) => {
  const t = Wo().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const r = Go(n);
    if (!r)
      return;
    const i = t._component;
    !A(i) && !i.render && !i.template && (i.template = r.innerHTML), r.innerHTML = "";
    const l = s(r, !1, qo(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), l;
  }, t;
};
function qo(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Go(e) {
  return G(e) ? document.querySelector(e) : e;
}
const Jo = "/vite.svg", Yo = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--logos'%20width='37.07'%20height='36'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20198'%3e%3cpath%20fill='%2341B883'%20d='M204.8%200H256L128%20220.8L0%200h97.92L128%2051.2L157.44%200h47.36Z'%3e%3c/path%3e%3cpath%20fill='%2341B883'%20d='m0%200l128%20220.8L256%200h-51.2L128%20132.48L50.56%200H0Z'%3e%3c/path%3e%3cpath%20fill='%2335495E'%20d='M50.56%200L128%20133.12L204.8%200h-47.36L128%2051.2L97.92%200H50.56Z'%3e%3c/path%3e%3c/svg%3e", Dt = (e) => (Qn("data-v-1d5be6d4"), e = e(), kn(), e), Zo = { class: "card" }, Xo = /* @__PURE__ */ Dt(() => /* @__PURE__ */ J("p", null, [
  /* @__PURE__ */ Ve(" Edit "),
  /* @__PURE__ */ J("code", null, "components/HelloWorld.vue"),
  /* @__PURE__ */ Ve(" to test HMR ")
], -1)), Qo = /* @__PURE__ */ Dt(() => /* @__PURE__ */ J("p", null, [
  /* @__PURE__ */ Ve(" Check out "),
  /* @__PURE__ */ J("a", {
    href: "https://vuejs.org/guide/quick-start.html#local",
    target: "_blank"
  }, "create-vue"),
  /* @__PURE__ */ Ve(", the official Vue + Vite starter ")
], -1)), ko = /* @__PURE__ */ Dt(() => /* @__PURE__ */ J("p", null, [
  /* @__PURE__ */ Ve(" Install "),
  /* @__PURE__ */ J("a", {
    href: "https://github.com/vuejs/language-tools",
    target: "_blank"
  }, "Volar"),
  /* @__PURE__ */ Ve(" in your IDE for a better DX ")
], -1)), el = /* @__PURE__ */ Dt(() => /* @__PURE__ */ J("p", { class: "read-the-docs" }, "Click on the Vite and Vue logos to learn more", -1)), tl = /* @__PURE__ */ sr({
  __name: "HelloWorld",
  props: {
    msg: {}
  },
  setup(e) {
    const t = ii(0);
    return (s, n) => (gr(), _r(ce, null, [
      J("h1", null, zs(s.msg), 1),
      J("div", Zo, [
        J("button", {
          type: "button",
          onClick: n[0] || (n[0] = (r) => t.value++)
        }, "count is " + zs(t.value), 1),
        Xo
      ]),
      Qo,
      ko,
      el
    ], 64));
  }
}), yr = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, r] of t)
    s[n] = r;
  return s;
}, sl = /* @__PURE__ */ yr(tl, [["__scopeId", "data-v-1d5be6d4"]]), nl = (e) => (Qn("data-v-58aba71c"), e = e(), kn(), e), rl = /* @__PURE__ */ nl(() => /* @__PURE__ */ J("div", null, [
  /* @__PURE__ */ J("a", {
    href: "https://vitejs.dev",
    target: "_blank"
  }, [
    /* @__PURE__ */ J("img", {
      src: Jo,
      class: "logo",
      alt: "Vite logo"
    })
  ]),
  /* @__PURE__ */ J("a", {
    href: "https://vuejs.org/",
    target: "_blank"
  }, [
    /* @__PURE__ */ J("img", {
      src: Yo,
      class: "logo vue",
      alt: "Vue logo"
    })
  ])
], -1)), il = /* @__PURE__ */ sr({
  __name: "App",
  setup(e) {
    return (t, s) => (gr(), _r(ce, null, [
      rl,
      Ae(sl, { msg: "Vite + Vue" })
    ], 64));
  }
}), ol = /* @__PURE__ */ yr(il, [["__scopeId", "data-v-58aba71c"]]);
zo(ol).mount("#app");

const __defProp = Object.defineProperty;
const __defNormalProp = (obj, key, value) => (key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value);
const __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== 'symbol' ? `${key}` : key, value);
    return value;
};
const commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
function getAugmentedNamespace(n) {
    if (n.__esModule) return n;
    const a = Object.defineProperty({}, '__esModule', { value: true });
    Object.keys(n).forEach((k) => {
        const d = Object.getOwnPropertyDescriptor(n, k);
        Object.defineProperty(a, k, d.get ? d : {
            enumerable: true,
            get() {
                return n[k];
            },
        });
    });
    return a;
}
function commonjsRequire(path) {
    throw new Error(`Could not dynamically require "${path}". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.`);
}
const dist$3 = {};
const boc = {};
const builder = {};
const cell = {};
const mask = {};
Object.defineProperty(mask, '__esModule', { value: true });
mask.Mask = void 0;
class Mask {
    constructor(mask2) {
        this._value = mask2 instanceof Mask ? mask2.value : mask2;
        this._hashIndex = Mask.countSetBits(this._value);
        this._hashCount = this._hashIndex + 1;
    }

    get value() {
        return this._value;
    }

    get level() {
        return 32 - Math.clz32(this._value);
    }

    get hashIndex() {
        return this._hashIndex;
    }

    get hashCount() {
        return this._hashCount;
    }

    apply(level) {
        return new Mask(this._value & (1 << level) - 1);
    }

    static countSetBits(n) {
        n -= (n >> 1 & 1431655765);
        n = (n & 858993459) + (n >> 2 & 858993459);
        return (n + (n >> 4) & 252645135) * 16843009 >> 24;
    }
}
mask.Mask = Mask;
const slice = {};
const coins = {};
const decimal = { exports: {} };
(function (module) {
    (function (globalScope) {
        const EXP_LIMIT = 9e15; const MAX_DIGITS = 1e9; const NUMERALS = '0123456789abcdef'; let LN10 = '2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058'; let PI = '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789'; const DEFAULTS = {
            precision: 20,
            rounding: 4,
            modulo: 1,
            toExpNeg: -7,
            toExpPos: 21,
            minE: -EXP_LIMIT,
            maxE: EXP_LIMIT,
            crypto: false,
        }; let Decimal; let inexact; let noConflict; let quadrant; let external = true; const decimalError = '[DecimalError] '; const invalidArgument = `${decimalError}Invalid argument: `; const precisionLimitExceeded = `${decimalError}Precision limit exceeded`; const cryptoUnavailable = `${decimalError}crypto unavailable`; const tag = '[object Decimal]'; const mathfloor = Math.floor; const mathpow = Math.pow; const isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i; const isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i; const isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i; const isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i; const BASE = 1e7; const LOG_BASE = 7; const MAX_SAFE_INTEGER = 9007199254740991; const LN10_PRECISION = LN10.length - 1; const PI_PRECISION = PI.length - 1; const
            P = { toStringTag: tag };
        P.absoluteValue = P.abs = function () {
            const x = new this.constructor(this);
            if (x.s < 0) x.s = 1;
            return finalise(x);
        };
        P.ceil = function () {
            return finalise(new this.constructor(this), this.e + 1, 2);
        };
        P.clampedTo = P.clamp = function (min3, max3) {
            let k; const x = this; const
                Ctor = x.constructor;
            min3 = new Ctor(min3);
            max3 = new Ctor(max3);
            if (!min3.s || !max3.s) return new Ctor(NaN);
            if (min3.gt(max3)) throw Error(invalidArgument + max3);
            k = x.cmp(min3);
            return k < 0 ? min3 : x.cmp(max3) > 0 ? max3 : new Ctor(x);
        };
        P.comparedTo = P.cmp = function (y) {
            let i; let j; let xdL; let ydL; const x = this; const xd = x.d; const yd = (y = new x.constructor(y)).d; const xs = x.s; const
                ys = y.s;
            if (!xd || !yd) {
                return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1;
            }
            if (!xd[0] || !yd[0]) return xd[0] ? xs : yd[0] ? -ys : 0;
            if (xs !== ys) return xs;
            if (x.e !== y.e) return x.e > y.e ^ xs < 0 ? 1 : -1;
            xdL = xd.length;
            ydL = yd.length;
            for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
                if (xd[i] !== yd[i]) return xd[i] > yd[i] ^ xs < 0 ? 1 : -1;
            }
            return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
        };
        P.cosine = P.cos = function () {
            let pr; let rm; let x = this; const
                Ctor = x.constructor;
            if (!x.d) return new Ctor(NaN);
            if (!x.d[0]) return new Ctor(1);
            pr = Ctor.precision;
            rm = Ctor.rounding;
            Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
            Ctor.rounding = 1;
            x = cosine(Ctor, toLessThanHalfPi(Ctor, x));
            Ctor.precision = pr;
            Ctor.rounding = rm;
            return finalise(quadrant == 2 || quadrant == 3 ? x.neg() : x, pr, rm, true);
        };
        P.cubeRoot = P.cbrt = function () {
            let e; let m; let n; let r; let rep; let s; let sd; let t; let t3; let t3plusx; const x = this; const
                Ctor = x.constructor;
            if (!x.isFinite() || x.isZero()) return new Ctor(x);
            external = false;
            s = x.s * (x.s * x) ** (1 / 3);
            if (!s || Math.abs(s) == 1 / 0) {
                n = digitsToString(x.d);
                e = x.e;
                if (s = (e - n.length + 1) % 3) n += s == 1 || s == -2 ? '0' : '00';
                s = n ** (1 / 3);
                e = mathfloor((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2));
                if (s == 1 / 0) {
                    n = `5e${e}`;
                } else {
                    n = s.toExponential();
                    n = n.slice(0, n.indexOf('e') + 1) + e;
                }
                r = new Ctor(n);
                r.s = x.s;
            } else {
                r = new Ctor(s.toString());
            }
            sd = (e = Ctor.precision) + 3;
            for (; ;) {
                t = r;
                t3 = t.times(t).times(t);
                t3plusx = t3.plus(x);
                r = divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1);
                if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
                    n = n.slice(sd - 3, sd + 1);
                    if (n == '9999' || !rep && n == '4999') {
                        if (!rep) {
                            finalise(t, e + 1, 0);
                            if (t.times(t).times(t).eq(x)) {
                                r = t;
                                break;
                            }
                        }
                        sd += 4;
                        rep = 1;
                    } else {
                        if (!+n || !+n.slice(1) && n.charAt(0) == '5') {
                            finalise(r, e + 1, 1);
                            m = !r.times(r).times(r).eq(x);
                        }
                        break;
                    }
                }
            }
            external = true;
            return finalise(r, e, Ctor.rounding, m);
        };
        P.decimalPlaces = P.dp = function () {
            let w; const { d } = this; let
                n = NaN;
            if (d) {
                w = d.length - 1;
                n = (w - mathfloor(this.e / LOG_BASE)) * LOG_BASE;
                w = d[w];
                if (w) for (; w % 10 == 0; w /= 10) n--;
                if (n < 0) n = 0;
            }
            return n;
        };
        P.dividedBy = P.div = function (y) {
            return divide(this, new this.constructor(y));
        };
        P.dividedToIntegerBy = P.divToInt = function (y) {
            const x = this; const
                Ctor = x.constructor;
            return finalise(divide(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding);
        };
        P.equals = P.eq = function (y) {
            return this.cmp(y) === 0;
        };
        P.floor = function () {
            return finalise(new this.constructor(this), this.e + 1, 3);
        };
        P.greaterThan = P.gt = function (y) {
            return this.cmp(y) > 0;
        };
        P.greaterThanOrEqualTo = P.gte = function (y) {
            const k = this.cmp(y);
            return k == 1 || k === 0;
        };
        P.hyperbolicCosine = P.cosh = function () {
            let k; let n; let pr; let rm; let len; let x = this; const Ctor = x.constructor; const
                one = new Ctor(1);
            if (!x.isFinite()) return new Ctor(x.s ? 1 / 0 : NaN);
            if (x.isZero()) return one;
            pr = Ctor.precision;
            rm = Ctor.rounding;
            Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
            Ctor.rounding = 1;
            len = x.d.length;
            if (len < 32) {
                k = Math.ceil(len / 3);
                n = (1 / tinyPow(4, k)).toString();
            } else {
                k = 16;
                n = '2.3283064365386962890625e-10';
            }
            x = taylorSeries(Ctor, 1, x.times(n), new Ctor(1), true);
            let cosh2_x; let i = k; const
                d8 = new Ctor(8);
            for (; i--;) {
                cosh2_x = x.times(x);
                x = one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
            }
            return finalise(x, Ctor.precision = pr, Ctor.rounding = rm, true);
        };
        P.hyperbolicSine = P.sinh = function () {
            let k; let pr; let rm; let len; let x = this; const
                Ctor = x.constructor;
            if (!x.isFinite() || x.isZero()) return new Ctor(x);
            pr = Ctor.precision;
            rm = Ctor.rounding;
            Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
            Ctor.rounding = 1;
            len = x.d.length;
            if (len < 3) {
                x = taylorSeries(Ctor, 2, x, x, true);
            } else {
                k = 1.4 * Math.sqrt(len);
                k = k > 16 ? 16 : k | 0;
                x = x.times(1 / tinyPow(5, k));
                x = taylorSeries(Ctor, 2, x, x, true);
                let sinh2_x; const d5 = new Ctor(5); const d16 = new Ctor(16); const
                    d20 = new Ctor(20);
                for (; k--;) {
                    sinh2_x = x.times(x);
                    x = x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
                }
            }
            Ctor.precision = pr;
            Ctor.rounding = rm;
            return finalise(x, pr, rm, true);
        };
        P.hyperbolicTangent = P.tanh = function () {
            let pr; let rm; const x = this; const
                Ctor = x.constructor;
            if (!x.isFinite()) return new Ctor(x.s);
            if (x.isZero()) return new Ctor(x);
            pr = Ctor.precision;
            rm = Ctor.rounding;
            Ctor.precision = pr + 7;
            Ctor.rounding = 1;
            return divide(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm);
        };
        P.inverseCosine = P.acos = function () {
            let halfPi; let x = this; const Ctor = x.constructor; const k = x.abs().cmp(1); const pr = Ctor.precision; const
                rm = Ctor.rounding;
            if (k !== -1) {
                return k === 0 ? x.isNeg() ? getPi(Ctor, pr, rm) : new Ctor(0) : new Ctor(NaN);
            }
            if (x.isZero()) return getPi(Ctor, pr + 4, rm).times(0.5);
            Ctor.precision = pr + 6;
            Ctor.rounding = 1;
            x = x.asin();
            halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
            Ctor.precision = pr;
            Ctor.rounding = rm;
            return halfPi.minus(x);
        };
        P.inverseHyperbolicCosine = P.acosh = function () {
            let pr; let rm; let x = this; const
                Ctor = x.constructor;
            if (x.lte(1)) return new Ctor(x.eq(1) ? 0 : NaN);
            if (!x.isFinite()) return new Ctor(x);
            pr = Ctor.precision;
            rm = Ctor.rounding;
            Ctor.precision = pr + Math.max(Math.abs(x.e), x.sd()) + 4;
            Ctor.rounding = 1;
            external = false;
            x = x.times(x).minus(1).sqrt().plus(x);
            external = true;
            Ctor.precision = pr;
            Ctor.rounding = rm;
            return x.ln();
        };
        P.inverseHyperbolicSine = P.asinh = function () {
            let pr; let rm; let x = this; const
                Ctor = x.constructor;
            if (!x.isFinite() || x.isZero()) return new Ctor(x);
            pr = Ctor.precision;
            rm = Ctor.rounding;
            Ctor.precision = pr + 2 * Math.max(Math.abs(x.e), x.sd()) + 6;
            Ctor.rounding = 1;
            external = false;
            x = x.times(x).plus(1).sqrt().plus(x);
            external = true;
            Ctor.precision = pr;
            Ctor.rounding = rm;
            return x.ln();
        };
        P.inverseHyperbolicTangent = P.atanh = function () {
            let pr; let rm; let wpr; let xsd; let x = this; const
                Ctor = x.constructor;
            if (!x.isFinite()) return new Ctor(NaN);
            if (x.e >= 0) return new Ctor(x.abs().eq(1) ? x.s / 0 : x.isZero() ? x : NaN);
            pr = Ctor.precision;
            rm = Ctor.rounding;
            xsd = x.sd();
            if (Math.max(xsd, pr) < 2 * -x.e - 1) return finalise(new Ctor(x), pr, rm, true);
            Ctor.precision = wpr = xsd - x.e;
            x = divide(x.plus(1), new Ctor(1).minus(x), wpr + pr, 1);
            Ctor.precision = pr + 4;
            Ctor.rounding = 1;
            x = x.ln();
            Ctor.precision = pr;
            Ctor.rounding = rm;
            return x.times(0.5);
        };
        P.inverseSine = P.asin = function () {
            let halfPi; let k; let pr; let rm; let x = this; const
                Ctor = x.constructor;
            if (x.isZero()) return new Ctor(x);
            k = x.abs().cmp(1);
            pr = Ctor.precision;
            rm = Ctor.rounding;
            if (k !== -1) {
                if (k === 0) {
                    halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
                    halfPi.s = x.s;
                    return halfPi;
                }
                return new Ctor(NaN);
            }
            Ctor.precision = pr + 6;
            Ctor.rounding = 1;
            x = x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();
            Ctor.precision = pr;
            Ctor.rounding = rm;
            return x.times(2);
        };
        P.inverseTangent = P.atan = function () {
            let i; let j; let k; let n; let px; let t; let r; let wpr; let x2; let x = this; const Ctor = x.constructor; const pr = Ctor.precision; const
                rm = Ctor.rounding;
            if (!x.isFinite()) {
                if (!x.s) return new Ctor(NaN);
                if (pr + 4 <= PI_PRECISION) {
                    r = getPi(Ctor, pr + 4, rm).times(0.5);
                    r.s = x.s;
                    return r;
                }
            } else if (x.isZero()) {
                return new Ctor(x);
            } else if (x.abs().eq(1) && pr + 4 <= PI_PRECISION) {
                r = getPi(Ctor, pr + 4, rm).times(0.25);
                r.s = x.s;
                return r;
            }
            Ctor.precision = wpr = pr + 10;
            Ctor.rounding = 1;
            k = Math.min(28, wpr / LOG_BASE + 2 | 0);
            for (i = k; i; --i) x = x.div(x.times(x).plus(1).sqrt().plus(1));
            external = false;
            j = Math.ceil(wpr / LOG_BASE);
            n = 1;
            x2 = x.times(x);
            r = new Ctor(x);
            px = x;
            for (; i !== -1;) {
                px = px.times(x2);
                t = r.minus(px.div(n += 2));
                px = px.times(x2);
                r = t.plus(px.div(n += 2));
                if (r.d[j] !== void 0) for (i = j; r.d[i] === t.d[i] && i--;) ;
            }
            if (k) r = r.times(2 << k - 1);
            external = true;
            return finalise(r, Ctor.precision = pr, Ctor.rounding = rm, true);
        };
        P.isFinite = function () {
            return !!this.d;
        };
        P.isInteger = P.isInt = function () {
            return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
        };
        P.isNaN = function () {
            return !this.s;
        };
        P.isNegative = P.isNeg = function () {
            return this.s < 0;
        };
        P.isPositive = P.isPos = function () {
            return this.s > 0;
        };
        P.isZero = function () {
            return !!this.d && this.d[0] === 0;
        };
        P.lessThan = P.lt = function (y) {
            return this.cmp(y) < 0;
        };
        P.lessThanOrEqualTo = P.lte = function (y) {
            return this.cmp(y) < 1;
        };
        P.logarithm = P.log = function (base2) {
            let isBase10; let d; let denominator; let k; let inf; let num; let sd; let r; const arg = this; const Ctor = arg.constructor; const pr = Ctor.precision; const rm = Ctor.rounding; const
                guard2 = 5;
            if (base2 == null) {
                base2 = new Ctor(10);
                isBase10 = true;
            } else {
                base2 = new Ctor(base2);
                d = base2.d;
                if (base2.s < 0 || !d || !d[0] || base2.eq(1)) return new Ctor(NaN);
                isBase10 = base2.eq(10);
            }
            d = arg.d;
            if (arg.s < 0 || !d || !d[0] || arg.eq(1)) {
                return new Ctor(d && !d[0] ? -1 / 0 : arg.s != 1 ? NaN : d ? 0 : 1 / 0);
            }
            if (isBase10) {
                if (d.length > 1) {
                    inf = true;
                } else {
                    for (k = d[0]; k % 10 === 0;) k /= 10;
                    inf = k !== 1;
                }
            }
            external = false;
            sd = pr + guard2;
            num = naturalLogarithm(arg, sd);
            denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base2, sd);
            r = divide(num, denominator, sd, 1);
            if (checkRoundingDigits(r.d, k = pr, rm)) {
                do {
                    sd += 10;
                    num = naturalLogarithm(arg, sd);
                    denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base2, sd);
                    r = divide(num, denominator, sd, 1);
                    if (!inf) {
                        if (+digitsToString(r.d).slice(k + 1, k + 15) + 1 == 1e14) {
                            r = finalise(r, pr + 1, 0);
                        }
                        break;
                    }
                } while (checkRoundingDigits(r.d, k += 10, rm));
            }
            external = true;
            return finalise(r, pr, rm);
        };
        P.minus = P.sub = function (y) {
            let d; let e; let i; let j; let k; let len; let pr; let rm; let xd; let xe; let xLTy; let yd; const x = this; const
                Ctor = x.constructor;
            y = new Ctor(y);
            if (!x.d || !y.d) {
                if (!x.s || !y.s) y = new Ctor(NaN);
                else if (x.d) y.s = -y.s;
                else y = new Ctor(y.d || x.s !== y.s ? x : NaN);
                return y;
            }
            if (x.s != y.s) {
                y.s = -y.s;
                return x.plus(y);
            }
            xd = x.d;
            yd = y.d;
            pr = Ctor.precision;
            rm = Ctor.rounding;
            if (!xd[0] || !yd[0]) {
                if (yd[0]) y.s = -y.s;
                else if (xd[0]) y = new Ctor(x);
                else return new Ctor(rm === 3 ? -0 : 0);
                return external ? finalise(y, pr, rm) : y;
            }
            e = mathfloor(y.e / LOG_BASE);
            xe = mathfloor(x.e / LOG_BASE);
            xd = xd.slice();
            k = xe - e;
            if (k) {
                xLTy = k < 0;
                if (xLTy) {
                    d = xd;
                    k = -k;
                    len = yd.length;
                } else {
                    d = yd;
                    e = xe;
                    len = xd.length;
                }
                i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;
                if (k > i) {
                    k = i;
                    d.length = 1;
                }
                d.reverse();
                for (i = k; i--;) d.push(0);
                d.reverse();
            } else {
                i = xd.length;
                len = yd.length;
                xLTy = i < len;
                if (xLTy) len = i;
                for (i = 0; i < len; i++) {
                    if (xd[i] != yd[i]) {
                        xLTy = xd[i] < yd[i];
                        break;
                    }
                }
                k = 0;
            }
            if (xLTy) {
                d = xd;
                xd = yd;
                yd = d;
                y.s = -y.s;
            }
            len = xd.length;
            for (i = yd.length - len; i > 0; --i) xd[len++] = 0;
            for (i = yd.length; i > k;) {
                if (xd[--i] < yd[i]) {
                    for (j = i; j && xd[--j] === 0;) xd[j] = BASE - 1;
                    --xd[j];
                    xd[i] += BASE;
                }
                xd[i] -= yd[i];
            }
            for (; xd[--len] === 0;) xd.pop();
            for (; xd[0] === 0; xd.shift()) --e;
            if (!xd[0]) return new Ctor(rm === 3 ? -0 : 0);
            y.d = xd;
            y.e = getBase10Exponent(xd, e);
            return external ? finalise(y, pr, rm) : y;
        };
        P.modulo = P.mod = function (y) {
            let q; const x = this; const
                Ctor = x.constructor;
            y = new Ctor(y);
            if (!x.d || !y.s || y.d && !y.d[0]) return new Ctor(NaN);
            if (!y.d || x.d && !x.d[0]) {
                return finalise(new Ctor(x), Ctor.precision, Ctor.rounding);
            }
            external = false;
            if (Ctor.modulo == 9) {
                q = divide(x, y.abs(), 0, 3, 1);
                q.s *= y.s;
            } else {
                q = divide(x, y, 0, Ctor.modulo, 1);
            }
            q = q.times(y);
            external = true;
            return x.minus(q);
        };
        P.naturalExponential = P.exp = function () {
            return naturalExponential(this);
        };
        P.naturalLogarithm = P.ln = function () {
            return naturalLogarithm(this);
        };
        P.negated = P.neg = function () {
            const x = new this.constructor(this);
            x.s = -x.s;
            return finalise(x);
        };
        P.plus = P.add = function (y) {
            let carry; let d; let e; let i; let k; let len; let pr; let rm; let xd; let yd; const x = this; const
                Ctor = x.constructor;
            y = new Ctor(y);
            if (!x.d || !y.d) {
                if (!x.s || !y.s) y = new Ctor(NaN);
                else if (!x.d) y = new Ctor(y.d || x.s === y.s ? x : NaN);
                return y;
            }
            if (x.s != y.s) {
                y.s = -y.s;
                return x.minus(y);
            }
            xd = x.d;
            yd = y.d;
            pr = Ctor.precision;
            rm = Ctor.rounding;
            if (!xd[0] || !yd[0]) {
                if (!yd[0]) y = new Ctor(x);
                return external ? finalise(y, pr, rm) : y;
            }
            k = mathfloor(x.e / LOG_BASE);
            e = mathfloor(y.e / LOG_BASE);
            xd = xd.slice();
            i = k - e;
            if (i) {
                if (i < 0) {
                    d = xd;
                    i = -i;
                    len = yd.length;
                } else {
                    d = yd;
                    e = k;
                    len = xd.length;
                }
                k = Math.ceil(pr / LOG_BASE);
                len = k > len ? k + 1 : len + 1;
                if (i > len) {
                    i = len;
                    d.length = 1;
                }
                d.reverse();
                for (; i--;) d.push(0);
                d.reverse();
            }
            len = xd.length;
            i = yd.length;
            if (len - i < 0) {
                i = len;
                d = yd;
                yd = xd;
                xd = d;
            }
            for (carry = 0; i;) {
                carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
                xd[i] %= BASE;
            }
            if (carry) {
                xd.unshift(carry);
                ++e;
            }
            for (len = xd.length; xd[--len] == 0;) xd.pop();
            y.d = xd;
            y.e = getBase10Exponent(xd, e);
            return external ? finalise(y, pr, rm) : y;
        };
        P.precision = P.sd = function (z) {
            let k; const
                x = this;
            if (z !== void 0 && z !== !!z && z !== 1 && z !== 0) throw Error(invalidArgument + z);
            if (x.d) {
                k = getPrecision(x.d);
                if (z && x.e + 1 > k) k = x.e + 1;
            } else {
                k = NaN;
            }
            return k;
        };
        P.round = function () {
            const x = this; const
                Ctor = x.constructor;
            return finalise(new Ctor(x), x.e + 1, Ctor.rounding);
        };
        P.sine = P.sin = function () {
            let pr; let rm; let x = this; const
                Ctor = x.constructor;
            if (!x.isFinite()) return new Ctor(NaN);
            if (x.isZero()) return new Ctor(x);
            pr = Ctor.precision;
            rm = Ctor.rounding;
            Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
            Ctor.rounding = 1;
            x = sine(Ctor, toLessThanHalfPi(Ctor, x));
            Ctor.precision = pr;
            Ctor.rounding = rm;
            return finalise(quadrant > 2 ? x.neg() : x, pr, rm, true);
        };
        P.squareRoot = P.sqrt = function () {
            let m; let n; let sd; let r; let rep; let t; const x = this; const { d } = x; let { e } = x; let { s } = x; const
                Ctor = x.constructor;
            if (s !== 1 || !d || !d[0]) {
                return new Ctor(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
            }
            external = false;
            s = Math.sqrt(+x);
            if (s == 0 || s == 1 / 0) {
                n = digitsToString(d);
                if ((n.length + e) % 2 == 0) n += '0';
                s = Math.sqrt(n);
                e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);
                if (s == 1 / 0) {
                    n = `5e${e}`;
                } else {
                    n = s.toExponential();
                    n = n.slice(0, n.indexOf('e') + 1) + e;
                }
                r = new Ctor(n);
            } else {
                r = new Ctor(s.toString());
            }
            sd = (e = Ctor.precision) + 3;
            for (; ;) {
                t = r;
                r = t.plus(divide(x, t, sd + 2, 1)).times(0.5);
                if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
                    n = n.slice(sd - 3, sd + 1);
                    if (n == '9999' || !rep && n == '4999') {
                        if (!rep) {
                            finalise(t, e + 1, 0);
                            if (t.times(t).eq(x)) {
                                r = t;
                                break;
                            }
                        }
                        sd += 4;
                        rep = 1;
                    } else {
                        if (!+n || !+n.slice(1) && n.charAt(0) == '5') {
                            finalise(r, e + 1, 1);
                            m = !r.times(r).eq(x);
                        }
                        break;
                    }
                }
            }
            external = true;
            return finalise(r, e, Ctor.rounding, m);
        };
        P.tangent = P.tan = function () {
            let pr; let rm; let x = this; const
                Ctor = x.constructor;
            if (!x.isFinite()) return new Ctor(NaN);
            if (x.isZero()) return new Ctor(x);
            pr = Ctor.precision;
            rm = Ctor.rounding;
            Ctor.precision = pr + 10;
            Ctor.rounding = 1;
            x = x.sin();
            x.s = 1;
            x = divide(x, new Ctor(1).minus(x.times(x)).sqrt(), pr + 10, 0);
            Ctor.precision = pr;
            Ctor.rounding = rm;
            return finalise(quadrant == 2 || quadrant == 4 ? x.neg() : x, pr, rm, true);
        };
        P.times = P.mul = function (y) {
            let carry; let e; let i; let k; let r; let rL; let t; let xdL; let ydL; const x = this; const Ctor = x.constructor; let xd = x.d; let
                yd = (y = new Ctor(y)).d;
            y.s *= x.s;
            if (!xd || !xd[0] || !yd || !yd[0]) {
                return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd ? NaN : !xd || !yd ? y.s / 0 : y.s * 0);
            }
            e = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
            xdL = xd.length;
            ydL = yd.length;
            if (xdL < ydL) {
                r = xd;
                xd = yd;
                yd = r;
                rL = xdL;
                xdL = ydL;
                ydL = rL;
            }
            r = [];
            rL = xdL + ydL;
            for (i = rL; i--;) r.push(0);
            for (i = ydL; --i >= 0;) {
                carry = 0;
                for (k = xdL + i; k > i;) {
                    t = r[k] + yd[i] * xd[k - i - 1] + carry;
                    r[k--] = t % BASE | 0;
                    carry = t / BASE | 0;
                }
                r[k] = (r[k] + carry) % BASE | 0;
            }
            for (; !r[--rL];) r.pop();
            if (carry) ++e;
            else r.shift();
            y.d = r;
            y.e = getBase10Exponent(r, e);
            return external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
        };
        P.toBinary = function (sd, rm) {
            return toStringBinary(this, 2, sd, rm);
        };
        P.toDecimalPlaces = P.toDP = function (dp, rm) {
            let x = this; const
                Ctor = x.constructor;
            x = new Ctor(x);
            if (dp === void 0) return x;
            checkInt32(dp, 0, MAX_DIGITS);
            if (rm === void 0) rm = Ctor.rounding;
            else checkInt32(rm, 0, 8);
            return finalise(x, dp + x.e + 1, rm);
        };
        P.toExponential = function (dp, rm) {
            let str; let x = this; const
                Ctor = x.constructor;
            if (dp === void 0) {
                str = finiteToString(x, true);
            } else {
                checkInt32(dp, 0, MAX_DIGITS);
                if (rm === void 0) rm = Ctor.rounding;
                else checkInt32(rm, 0, 8);
                x = finalise(new Ctor(x), dp + 1, rm);
                str = finiteToString(x, true, dp + 1);
            }
            return x.isNeg() && !x.isZero() ? `-${str}` : str;
        };
        P.toFixed = function (dp, rm) {
            let str; let y; const x = this; const
                Ctor = x.constructor;
            if (dp === void 0) {
                str = finiteToString(x);
            } else {
                checkInt32(dp, 0, MAX_DIGITS);
                if (rm === void 0) rm = Ctor.rounding;
                else checkInt32(rm, 0, 8);
                y = finalise(new Ctor(x), dp + x.e + 1, rm);
                str = finiteToString(y, false, dp + y.e + 1);
            }
            return x.isNeg() && !x.isZero() ? `-${str}` : str;
        };
        P.toFraction = function (maxD) {
            let d; let d0; let d1; let d2; let e; let k; let n; let n0; let n1; let pr; let q; let r; const x = this; const xd = x.d; const
                Ctor = x.constructor;
            if (!xd) return new Ctor(x);
            n1 = d0 = new Ctor(1);
            d1 = n0 = new Ctor(0);
            d = new Ctor(d1);
            e = d.e = getPrecision(xd) - x.e - 1;
            k = e % LOG_BASE;
            d.d[0] = 10 ** (k < 0 ? LOG_BASE + k : k);
            if (maxD == null) {
                maxD = e > 0 ? d : n1;
            } else {
                n = new Ctor(maxD);
                if (!n.isInt() || n.lt(n1)) throw Error(invalidArgument + n);
                maxD = n.gt(d) ? e > 0 ? d : n1 : n;
            }
            external = false;
            n = new Ctor(digitsToString(xd));
            pr = Ctor.precision;
            Ctor.precision = e = xd.length * LOG_BASE * 2;
            for (; ;) {
                q = divide(n, d, 0, 1, 1);
                d2 = d0.plus(q.times(d1));
                if (d2.cmp(maxD) == 1) break;
                d0 = d1;
                d1 = d2;
                d2 = n1;
                n1 = n0.plus(q.times(d2));
                n0 = d2;
                d2 = d;
                d = n.minus(q.times(d2));
                n = d2;
            }
            d2 = divide(maxD.minus(d0), d1, 0, 1, 1);
            n0 = n0.plus(d2.times(n1));
            d0 = d0.plus(d2.times(d1));
            n0.s = n1.s = x.s;
            r = divide(n1, d1, e, 1).minus(x).abs().cmp(divide(n0, d0, e, 1).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];
            Ctor.precision = pr;
            external = true;
            return r;
        };
        P.toHexadecimal = P.toHex = function (sd, rm) {
            return toStringBinary(this, 16, sd, rm);
        };
        P.toNearest = function (y, rm) {
            let x = this; const
                Ctor = x.constructor;
            x = new Ctor(x);
            if (y == null) {
                if (!x.d) return x;
                y = new Ctor(1);
                rm = Ctor.rounding;
            } else {
                y = new Ctor(y);
                if (rm === void 0) {
                    rm = Ctor.rounding;
                } else {
                    checkInt32(rm, 0, 8);
                }
                if (!x.d) return y.s ? x : y;
                if (!y.d) {
                    if (y.s) y.s = x.s;
                    return y;
                }
            }
            if (y.d[0]) {
                external = false;
                x = divide(x, y, 0, rm, 1).times(y);
                external = true;
                finalise(x);
            } else {
                y.s = x.s;
                x = y;
            }
            return x;
        };
        P.toNumber = function () {
            return +this;
        };
        P.toOctal = function (sd, rm) {
            return toStringBinary(this, 8, sd, rm);
        };
        P.toPower = P.pow = function (y) {
            let e; let k; let pr; let r; let rm; let s; let x = this; const Ctor = x.constructor; const
                yn = +(y = new Ctor(y));
            if (!x.d || !y.d || !x.d[0] || !y.d[0]) return new Ctor((+x) ** yn);
            x = new Ctor(x);
            if (x.eq(1)) return x;
            pr = Ctor.precision;
            rm = Ctor.rounding;
            if (y.eq(1)) return finalise(x, pr, rm);
            e = mathfloor(y.e / LOG_BASE);
            if (e >= y.d.length - 1 && (k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
                r = intPow(Ctor, x, k, pr);
                return y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
            }
            s = x.s;
            if (s < 0) {
                if (e < y.d.length - 1) return new Ctor(NaN);
                if ((y.d[e] & 1) == 0) s = 1;
                if (x.e == 0 && x.d[0] == 1 && x.d.length == 1) {
                    x.s = s;
                    return x;
                }
            }
            k = (+x) ** yn;
            e = k == 0 || !isFinite(k) ? mathfloor(yn * (Math.log(`0.${digitsToString(x.d)}`) / Math.LN10 + x.e + 1)) : new Ctor(`${k}`).e;
            if (e > Ctor.maxE + 1 || e < Ctor.minE - 1) return new Ctor(e > 0 ? s / 0 : 0);
            external = false;
            Ctor.rounding = x.s = 1;
            k = Math.min(12, (`${e}`).length);
            r = naturalExponential(y.times(naturalLogarithm(x, pr + k)), pr);
            if (r.d) {
                r = finalise(r, pr + 5, 1);
                if (checkRoundingDigits(r.d, pr, rm)) {
                    e = pr + 10;
                    r = finalise(naturalExponential(y.times(naturalLogarithm(x, e + k)), e), e + 5, 1);
                    if (+digitsToString(r.d).slice(pr + 1, pr + 15) + 1 == 1e14) {
                        r = finalise(r, pr + 1, 0);
                    }
                }
            }
            r.s = s;
            external = true;
            Ctor.rounding = rm;
            return finalise(r, pr, rm);
        };
        P.toPrecision = function (sd, rm) {
            let str; let x = this; const
                Ctor = x.constructor;
            if (sd === void 0) {
                str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
            } else {
                checkInt32(sd, 1, MAX_DIGITS);
                if (rm === void 0) rm = Ctor.rounding;
                else checkInt32(rm, 0, 8);
                x = finalise(new Ctor(x), sd, rm);
                str = finiteToString(x, sd <= x.e || x.e <= Ctor.toExpNeg, sd);
            }
            return x.isNeg() && !x.isZero() ? `-${str}` : str;
        };
        P.toSignificantDigits = P.toSD = function (sd, rm) {
            const x = this; const
                Ctor = x.constructor;
            if (sd === void 0) {
                sd = Ctor.precision;
                rm = Ctor.rounding;
            } else {
                checkInt32(sd, 1, MAX_DIGITS);
                if (rm === void 0) rm = Ctor.rounding;
                else checkInt32(rm, 0, 8);
            }
            return finalise(new Ctor(x), sd, rm);
        };
        P.toString = function () {
            const x = this; const Ctor = x.constructor; const
                str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
            return x.isNeg() && !x.isZero() ? `-${str}` : str;
        };
        P.truncated = P.trunc = function () {
            return finalise(new this.constructor(this), this.e + 1, 1);
        };
        P.valueOf = P.toJSON = function () {
            const x = this; const Ctor = x.constructor; const
                str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
            return x.isNeg() ? `-${str}` : str;
        };
        function digitsToString(d) {
            let i; let k; let ws; const indexOfLastWord = d.length - 1; let str = ''; let
                w = d[0];
            if (indexOfLastWord > 0) {
                str += w;
                for (i = 1; i < indexOfLastWord; i++) {
                    ws = `${d[i]}`;
                    k = LOG_BASE - ws.length;
                    if (k) str += getZeroString(k);
                    str += ws;
                }
                w = d[i];
                ws = `${w}`;
                k = LOG_BASE - ws.length;
                if (k) str += getZeroString(k);
            } else if (w === 0) {
                return '0';
            }
            for (; w % 10 === 0;) w /= 10;
            return str + w;
        }
        function checkInt32(i, min3, max3) {
            if (i !== ~~i || i < min3 || i > max3) {
                throw Error(invalidArgument + i);
            }
        }
        function checkRoundingDigits(d, i, rm, repeating) {
            let di; let k; let r; let
                rd;
            for (k = d[0]; k >= 10; k /= 10) --i;
            if (--i < 0) {
                i += LOG_BASE;
                di = 0;
            } else {
                di = Math.ceil((i + 1) / LOG_BASE);
                i %= LOG_BASE;
            }
            k = 10 ** (LOG_BASE - i);
            rd = d[di] % k | 0;
            if (repeating == null) {
                if (i < 3) {
                    if (i == 0) rd = rd / 100 | 0;
                    else if (i == 1) rd = rd / 10 | 0;
                    r = rm < 4 && rd == 99999 || rm > 3 && rd == 49999 || rd == 5e4 || rd == 0;
                } else {
                    r = (rm < 4 && rd + 1 == k || rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 100 | 0) == 10 ** (i - 2) - 1 || (rd == k / 2 || rd == 0) && (d[di + 1] / k / 100 | 0) == 0;
                }
            } else if (i < 4) {
                if (i == 0) rd = rd / 1e3 | 0;
                else if (i == 1) rd = rd / 100 | 0;
                else if (i == 2) rd = rd / 10 | 0;
                r = (repeating || rm < 4) && rd == 9999 || !repeating && rm > 3 && rd == 4999;
            } else {
                r = ((repeating || rm < 4) && rd + 1 == k || !repeating && rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 1e3 | 0) == 10 ** (i - 3) - 1;
            }
            return r;
        }
        function convertBase(str, baseIn, baseOut) {
            let j; const arr = [0]; let arrL; let i = 0; const
                strL = str.length;
            for (; i < strL;) {
                for (arrL = arr.length; arrL--;) arr[arrL] *= baseIn;
                arr[0] += NUMERALS.indexOf(str.charAt(i++));
                for (j = 0; j < arr.length; j++) {
                    if (arr[j] > baseOut - 1) {
                        if (arr[j + 1] === void 0) arr[j + 1] = 0;
                        arr[j + 1] += arr[j] / baseOut | 0;
                        arr[j] %= baseOut;
                    }
                }
            }
            return arr.reverse();
        }
        function cosine(Ctor, x) {
            let k; let len; let
                y;
            if (x.isZero()) return x;
            len = x.d.length;
            if (len < 32) {
                k = Math.ceil(len / 3);
                y = (1 / tinyPow(4, k)).toString();
            } else {
                k = 16;
                y = '2.3283064365386962890625e-10';
            }
            Ctor.precision += k;
            x = taylorSeries(Ctor, 1, x.times(y), new Ctor(1));
            for (let i = k; i--;) {
                const cos2x = x.times(x);
                x = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
            }
            Ctor.precision -= k;
            return x;
        }
        var divide = (function () {
            function multiplyInteger(x, k, base2) {
                let temp; let carry = 0; let
                    i = x.length;
                for (x = x.slice(); i--;) {
                    temp = x[i] * k + carry;
                    x[i] = temp % base2 | 0;
                    carry = temp / base2 | 0;
                }
                if (carry) x.unshift(carry);
                return x;
            }
            function compare4(a, b, aL, bL) {
                let i; let
                    r;
                if (aL != bL) {
                    r = aL > bL ? 1 : -1;
                } else {
                    for (i = r = 0; i < aL; i++) {
                        if (a[i] != b[i]) {
                            r = a[i] > b[i] ? 1 : -1;
                            break;
                        }
                    }
                }
                return r;
            }
            function subtract(a, b, aL, base2) {
                let i = 0;
                for (; aL--;) {
                    a[aL] -= i;
                    i = a[aL] < b[aL] ? 1 : 0;
                    a[aL] = i * base2 + a[aL] - b[aL];
                }
                for (; !a[0] && a.length > 1;) a.shift();
            }
            return function (x, y, pr, rm, dp, base2) {
                let cmp; let e; let i; let k; let logBase; let more; let prod; let prodL; let q; let qd; let rem; let remL; let rem0; let sd; let t; let xi; let xL; let yd0; let yL; let yz; const Ctor = x.constructor; const sign3 = x.s == y.s ? 1 : -1; let xd = x.d; let
                    yd = y.d;
                if (!xd || !xd[0] || !yd || !yd[0]) {
                    return new Ctor(
                        !x.s || !y.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN : xd && xd[0] == 0 || !yd ? sign3 * 0 : sign3 / 0,
                    );
                }
                if (base2) {
                    logBase = 1;
                    e = x.e - y.e;
                } else {
                    base2 = BASE;
                    logBase = LOG_BASE;
                    e = mathfloor(x.e / logBase) - mathfloor(y.e / logBase);
                }
                yL = yd.length;
                xL = xd.length;
                q = new Ctor(sign3);
                qd = q.d = [];
                for (i = 0; yd[i] == (xd[i] || 0); i++) ;
                if (yd[i] > (xd[i] || 0)) e--;
                if (pr == null) {
                    sd = pr = Ctor.precision;
                    rm = Ctor.rounding;
                } else if (dp) {
                    sd = pr + (x.e - y.e) + 1;
                } else {
                    sd = pr;
                }
                if (sd < 0) {
                    qd.push(1);
                    more = true;
                } else {
                    sd = sd / logBase + 2 | 0;
                    i = 0;
                    if (yL == 1) {
                        k = 0;
                        yd = yd[0];
                        sd++;
                        for (; (i < xL || k) && sd--; i++) {
                            t = k * base2 + (xd[i] || 0);
                            qd[i] = t / yd | 0;
                            k = t % yd | 0;
                        }
                        more = k || i < xL;
                    } else {
                        k = base2 / (yd[0] + 1) | 0;
                        if (k > 1) {
                            yd = multiplyInteger(yd, k, base2);
                            xd = multiplyInteger(xd, k, base2);
                            yL = yd.length;
                            xL = xd.length;
                        }
                        xi = yL;
                        rem = xd.slice(0, yL);
                        remL = rem.length;
                        for (; remL < yL;) rem[remL++] = 0;
                        yz = yd.slice();
                        yz.unshift(0);
                        yd0 = yd[0];
                        if (yd[1] >= base2 / 2) ++yd0;
                        do {
                            k = 0;
                            cmp = compare4(yd, rem, yL, remL);
                            if (cmp < 0) {
                                rem0 = rem[0];
                                if (yL != remL) rem0 = rem0 * base2 + (rem[1] || 0);
                                k = rem0 / yd0 | 0;
                                if (k > 1) {
                                    if (k >= base2) k = base2 - 1;
                                    prod = multiplyInteger(yd, k, base2);
                                    prodL = prod.length;
                                    remL = rem.length;
                                    cmp = compare4(prod, rem, prodL, remL);
                                    if (cmp == 1) {
                                        k--;
                                        subtract(prod, yL < prodL ? yz : yd, prodL, base2);
                                    }
                                } else {
                                    if (k == 0) cmp = k = 1;
                                    prod = yd.slice();
                                }
                                prodL = prod.length;
                                if (prodL < remL) prod.unshift(0);
                                subtract(rem, prod, remL, base2);
                                if (cmp == -1) {
                                    remL = rem.length;
                                    cmp = compare4(yd, rem, yL, remL);
                                    if (cmp < 1) {
                                        k++;
                                        subtract(rem, yL < remL ? yz : yd, remL, base2);
                                    }
                                }
                                remL = rem.length;
                            } else if (cmp === 0) {
                                k++;
                                rem = [0];
                            }
                            qd[i++] = k;
                            if (cmp && rem[0]) {
                                rem[remL++] = xd[xi] || 0;
                            } else {
                                rem = [xd[xi]];
                                remL = 1;
                            }
                        } while ((xi++ < xL || rem[0] !== void 0) && sd--);
                        more = rem[0] !== void 0;
                    }
                    if (!qd[0]) qd.shift();
                }
                if (logBase == 1) {
                    q.e = e;
                    inexact = more;
                } else {
                    for (i = 1, k = qd[0]; k >= 10; k /= 10) i++;
                    q.e = i + e * logBase - 1;
                    finalise(q, dp ? pr + q.e + 1 : pr, rm, more);
                }
                return q;
            };
        }());
        function finalise(x, sd, rm, isTruncated) {
            let digits; let i; let j; let k; let rd; let roundUp; let w; let xd; let xdi; const
                Ctor = x.constructor;
            out:
            if (sd != null) {
                xd = x.d;
                if (!xd) return x;
                for (digits = 1, k = xd[0]; k >= 10; k /= 10) digits++;
                i = sd - digits;
                if (i < 0) {
                    i += LOG_BASE;
                    j = sd;
                    w = xd[xdi = 0];
                    rd = w / 10 ** (digits - j - 1) % 10 | 0;
                } else {
                    xdi = Math.ceil((i + 1) / LOG_BASE);
                    k = xd.length;
                    if (xdi >= k) {
                        if (isTruncated) {
                            for (; k++ <= xdi;) xd.push(0);
                            w = rd = 0;
                            digits = 1;
                            i %= LOG_BASE;
                            j = i - LOG_BASE + 1;
                        } else {
                            break out;
                        }
                    } else {
                        w = k = xd[xdi];
                        for (digits = 1; k >= 10; k /= 10) digits++;
                        i %= LOG_BASE;
                        j = i - LOG_BASE + digits;
                        rd = j < 0 ? 0 : w / 10 ** (digits - j - 1) % 10 | 0;
                    }
                }
                isTruncated = isTruncated || sd < 0 || xd[xdi + 1] !== void 0 || (j < 0 ? w : w % 10 ** (digits - j - 1));
                roundUp = rm < 4 ? (rd || isTruncated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || isTruncated || rm == 6 && (i > 0 ? j > 0 ? w / 10 ** (digits - j) : 0 : xd[xdi - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
                if (sd < 1 || !xd[0]) {
                    xd.length = 0;
                    if (roundUp) {
                        sd -= x.e + 1;
                        xd[0] = 10 ** ((LOG_BASE - sd % LOG_BASE) % LOG_BASE);
                        x.e = -sd || 0;
                    } else {
                        xd[0] = x.e = 0;
                    }
                    return x;
                }
                if (i == 0) {
                    xd.length = xdi;
                    k = 1;
                    xdi--;
                } else {
                    xd.length = xdi + 1;
                    k = 10 ** (LOG_BASE - i);
                    xd[xdi] = j > 0 ? (w / 10 ** (digits - j) % 10 ** j | 0) * k : 0;
                }
                if (roundUp) {
                    for (; ;) {
                        if (xdi == 0) {
                            for (i = 1, j = xd[0]; j >= 10; j /= 10) i++;
                            j = xd[0] += k;
                            for (k = 1; j >= 10; j /= 10) k++;
                            if (i != k) {
                                x.e++;
                                if (xd[0] == BASE) xd[0] = 1;
                            }
                            break;
                        } else {
                            xd[xdi] += k;
                            if (xd[xdi] != BASE) break;
                            xd[xdi--] = 0;
                            k = 1;
                        }
                    }
                }
                for (i = xd.length; xd[--i] === 0;) xd.pop();
            }
            if (external) {
                if (x.e > Ctor.maxE) {
                    x.d = null;
                    x.e = NaN;
                } else if (x.e < Ctor.minE) {
                    x.e = 0;
                    x.d = [0];
                }
            }
            return x;
        }
        function finiteToString(x, isExp, sd) {
            if (!x.isFinite()) return nonFiniteToString(x);
            let k; const { e } = x; let str = digitsToString(x.d); const
                len = str.length;
            if (isExp) {
                if (sd && (k = sd - len) > 0) {
                    str = `${str.charAt(0)}.${str.slice(1)}${getZeroString(k)}`;
                } else if (len > 1) {
                    str = `${str.charAt(0)}.${str.slice(1)}`;
                }
                str = str + (x.e < 0 ? 'e' : 'e+') + x.e;
            } else if (e < 0) {
                str = `0.${getZeroString(-e - 1)}${str}`;
                if (sd && (k = sd - len) > 0) str += getZeroString(k);
            } else if (e >= len) {
                str += getZeroString(e + 1 - len);
                if (sd && (k = sd - e - 1) > 0) str = `${str}.${getZeroString(k)}`;
            } else {
                if ((k = e + 1) < len) str = `${str.slice(0, k)}.${str.slice(k)}`;
                if (sd && (k = sd - len) > 0) {
                    if (e + 1 === len) str += '.';
                    str += getZeroString(k);
                }
            }
            return str;
        }
        function getBase10Exponent(digits, e) {
            let w = digits[0];
            for (e *= LOG_BASE; w >= 10; w /= 10) e++;
            return e;
        }
        function getLn10(Ctor, sd, pr) {
            if (sd > LN10_PRECISION) {
                external = true;
                if (pr) Ctor.precision = pr;
                throw Error(precisionLimitExceeded);
            }
            return finalise(new Ctor(LN10), sd, 1, true);
        }
        function getPi(Ctor, sd, rm) {
            if (sd > PI_PRECISION) throw Error(precisionLimitExceeded);
            return finalise(new Ctor(PI), sd, rm, true);
        }
        function getPrecision(digits) {
            let w = digits.length - 1; let
                len = w * LOG_BASE + 1;
            w = digits[w];
            if (w) {
                for (; w % 10 == 0; w /= 10) len--;
                for (w = digits[0]; w >= 10; w /= 10) len++;
            }
            return len;
        }
        function getZeroString(k) {
            let zs = '';
            for (; k--;) zs += '0';
            return zs;
        }
        function intPow(Ctor, x, n, pr) {
            let isTruncated; let r = new Ctor(1); const
                k = Math.ceil(pr / LOG_BASE + 4);
            external = false;
            for (; ;) {
                if (n % 2) {
                    r = r.times(x);
                    if (truncate(r.d, k)) isTruncated = true;
                }
                n = mathfloor(n / 2);
                if (n === 0) {
                    n = r.d.length - 1;
                    if (isTruncated && r.d[n] === 0) ++r.d[n];
                    break;
                }
                x = x.times(x);
                truncate(x.d, k);
            }
            external = true;
            return r;
        }
        function isOdd(n) {
            return n.d[n.d.length - 1] & 1;
        }
        function maxOrMin(Ctor, args, ltgt) {
            let y; let x = new Ctor(args[0]); let
                i = 0;
            for (; ++i < args.length;) {
                y = new Ctor(args[i]);
                if (!y.s) {
                    x = y;
                    break;
                } else if (x[ltgt](y)) {
                    x = y;
                }
            }
            return x;
        }
        function naturalExponential(x, sd) {
            let denominator; let guard2; let j; let pow2; let sum2; let t; let wpr; let rep = 0; let i = 0; let k = 0; const Ctor = x.constructor; const rm = Ctor.rounding; const
                pr = Ctor.precision;
            if (!x.d || !x.d[0] || x.e > 17) {
                return new Ctor(x.d ? !x.d[0] ? 1 : x.s < 0 ? 0 : 1 / 0 : x.s ? x.s < 0 ? 0 : x : 0 / 0);
            }
            if (sd == null) {
                external = false;
                wpr = pr;
            } else {
                wpr = sd;
            }
            t = new Ctor(0.03125);
            while (x.e > -2) {
                x = x.times(t);
                k += 5;
            }
            guard2 = Math.log(2 ** k) / Math.LN10 * 2 + 5 | 0;
            wpr += guard2;
            denominator = pow2 = sum2 = new Ctor(1);
            Ctor.precision = wpr;
            for (; ;) {
                pow2 = finalise(pow2.times(x), wpr, 1);
                denominator = denominator.times(++i);
                t = sum2.plus(divide(pow2, denominator, wpr, 1));
                if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
                    j = k;
                    while (j--) sum2 = finalise(sum2.times(sum2), wpr, 1);
                    if (sd == null) {
                        if (rep < 3 && checkRoundingDigits(sum2.d, wpr - guard2, rm, rep)) {
                            Ctor.precision = wpr += 10;
                            denominator = pow2 = t = new Ctor(1);
                            i = 0;
                            rep++;
                        } else {
                            return finalise(sum2, Ctor.precision = pr, rm, external = true);
                        }
                    } else {
                        Ctor.precision = pr;
                        return sum2;
                    }
                }
                sum2 = t;
            }
        }
        function naturalLogarithm(y, sd) {
            let c; let c0; let denominator; let e; let numerator; let rep; let sum2; let t; let wpr; let x1; let x2; let n = 1; const guard2 = 10; let x = y; const xd = x.d; const Ctor = x.constructor; const rm = Ctor.rounding; const
                pr = Ctor.precision;
            if (x.s < 0 || !xd || !xd[0] || !x.e && xd[0] == 1 && xd.length == 1) {
                return new Ctor(xd && !xd[0] ? -1 / 0 : x.s != 1 ? NaN : xd ? 0 : x);
            }
            if (sd == null) {
                external = false;
                wpr = pr;
            } else {
                wpr = sd;
            }
            Ctor.precision = wpr += guard2;
            c = digitsToString(xd);
            c0 = c.charAt(0);
            if (Math.abs(e = x.e) < 15e14) {
                while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
                    x = x.times(y);
                    c = digitsToString(x.d);
                    c0 = c.charAt(0);
                    n++;
                }
                e = x.e;
                if (c0 > 1) {
                    x = new Ctor(`0.${c}`);
                    e++;
                } else {
                    x = new Ctor(`${c0}.${c.slice(1)}`);
                }
            } else {
                t = getLn10(Ctor, wpr + 2, pr).times(`${e}`);
                x = naturalLogarithm(new Ctor(`${c0}.${c.slice(1)}`), wpr - guard2).plus(t);
                Ctor.precision = pr;
                return sd == null ? finalise(x, pr, rm, external = true) : x;
            }
            x1 = x;
            sum2 = numerator = x = divide(x.minus(1), x.plus(1), wpr, 1);
            x2 = finalise(x.times(x), wpr, 1);
            denominator = 3;
            for (; ;) {
                numerator = finalise(numerator.times(x2), wpr, 1);
                t = sum2.plus(divide(numerator, new Ctor(denominator), wpr, 1));
                if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
                    sum2 = sum2.times(2);
                    if (e !== 0) sum2 = sum2.plus(getLn10(Ctor, wpr + 2, pr).times(`${e}`));
                    sum2 = divide(sum2, new Ctor(n), wpr, 1);
                    if (sd == null) {
                        if (checkRoundingDigits(sum2.d, wpr - guard2, rm, rep)) {
                            Ctor.precision = wpr += guard2;
                            t = numerator = x = divide(x1.minus(1), x1.plus(1), wpr, 1);
                            x2 = finalise(x.times(x), wpr, 1);
                            denominator = rep = 1;
                        } else {
                            return finalise(sum2, Ctor.precision = pr, rm, external = true);
                        }
                    } else {
                        Ctor.precision = pr;
                        return sum2;
                    }
                }
                sum2 = t;
                denominator += 2;
            }
        }
        function nonFiniteToString(x) {
            return String(x.s * x.s / 0);
        }
        function parseDecimal(x, str) {
            let e; let i; let
                len;
            if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');
            if ((i = str.search(/e/i)) > 0) {
                if (e < 0) e = i;
                e += +str.slice(i + 1);
                str = str.substring(0, i);
            } else if (e < 0) {
                e = str.length;
            }
            for (i = 0; str.charCodeAt(i) === 48; i++) ;
            for (len = str.length; str.charCodeAt(len - 1) === 48; --len) ;
            str = str.slice(i, len);
            if (str) {
                len -= i;
                x.e = e = e - i - 1;
                x.d = [];
                i = (e + 1) % LOG_BASE;
                if (e < 0) i += LOG_BASE;
                if (i < len) {
                    if (i) x.d.push(+str.slice(0, i));
                    for (len -= LOG_BASE; i < len;) x.d.push(+str.slice(i, i += LOG_BASE));
                    str = str.slice(i);
                    i = LOG_BASE - str.length;
                } else {
                    i -= len;
                }
                for (; i--;) str += '0';
                x.d.push(+str);
                if (external) {
                    if (x.e > x.constructor.maxE) {
                        x.d = null;
                        x.e = NaN;
                    } else if (x.e < x.constructor.minE) {
                        x.e = 0;
                        x.d = [0];
                    }
                }
            } else {
                x.e = 0;
                x.d = [0];
            }
            return x;
        }
        function parseOther(x, str) {
            let base2; let Ctor; let divisor; let i; let isFloat; let len; let p; let xd; let
                xe;
            if (str.indexOf('_') > -1) {
                str = str.replace(/(\d)_(?=\d)/g, '$1');
                if (isDecimal.test(str)) return parseDecimal(x, str);
            } else if (str === 'Infinity' || str === 'NaN') {
                if (!+str) x.s = NaN;
                x.e = NaN;
                x.d = null;
                return x;
            }
            if (isHex.test(str)) {
                base2 = 16;
                str = str.toLowerCase();
            } else if (isBinary.test(str)) {
                base2 = 2;
            } else if (isOctal.test(str)) {
                base2 = 8;
            } else {
                throw Error(invalidArgument + str);
            }
            i = str.search(/p/i);
            if (i > 0) {
                p = +str.slice(i + 1);
                str = str.substring(2, i);
            } else {
                str = str.slice(2);
            }
            i = str.indexOf('.');
            isFloat = i >= 0;
            Ctor = x.constructor;
            if (isFloat) {
                str = str.replace('.', '');
                len = str.length;
                i = len - i;
                divisor = intPow(Ctor, new Ctor(base2), i, i * 2);
            }
            xd = convertBase(str, base2, BASE);
            xe = xd.length - 1;
            for (i = xe; xd[i] === 0; --i) xd.pop();
            if (i < 0) return new Ctor(x.s * 0);
            x.e = getBase10Exponent(xd, xe);
            x.d = xd;
            external = false;
            if (isFloat) x = divide(x, divisor, len * 4);
            if (p) x = x.times(Math.abs(p) < 54 ? 2 ** p : Decimal.pow(2, p));
            external = true;
            return x;
        }
        function sine(Ctor, x) {
            let k; const
                len = x.d.length;
            if (len < 3) {
                return x.isZero() ? x : taylorSeries(Ctor, 2, x, x);
            }
            k = 1.4 * Math.sqrt(len);
            k = k > 16 ? 16 : k | 0;
            x = x.times(1 / tinyPow(5, k));
            x = taylorSeries(Ctor, 2, x, x);
            let sin2_x; const d5 = new Ctor(5); const d16 = new Ctor(16); const
                d20 = new Ctor(20);
            for (; k--;) {
                sin2_x = x.times(x);
                x = x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
            }
            return x;
        }
        function taylorSeries(Ctor, n, x, y, isHyperbolic) {
            let j; let t; let u; let x2; const pr = Ctor.precision; const
                k = Math.ceil(pr / LOG_BASE);
            external = false;
            x2 = x.times(x);
            u = new Ctor(y);
            for (; ;) {
                t = divide(u.times(x2), new Ctor(n++ * n++), pr, 1);
                u = isHyperbolic ? y.plus(t) : y.minus(t);
                y = divide(t.times(x2), new Ctor(n++ * n++), pr, 1);
                t = u.plus(y);
                if (t.d[k] !== void 0) {
                    for (j = k; t.d[j] === u.d[j] && j--;) ;
                    if (j == -1) break;
                }
                j = u;
                u = y;
                y = t;
                t = j;
            }
            external = true;
            t.d.length = k + 1;
            return t;
        }
        function tinyPow(b, e) {
            let n = b;
            while (--e) n *= b;
            return n;
        }
        function toLessThanHalfPi(Ctor, x) {
            let t; const isNeg = x.s < 0; const pi = getPi(Ctor, Ctor.precision, 1); const
                halfPi = pi.times(0.5);
            x = x.abs();
            if (x.lte(halfPi)) {
                quadrant = isNeg ? 4 : 1;
                return x;
            }
            t = x.divToInt(pi);
            if (t.isZero()) {
                quadrant = isNeg ? 3 : 2;
            } else {
                x = x.minus(t.times(pi));
                if (x.lte(halfPi)) {
                    quadrant = isOdd(t) ? isNeg ? 2 : 3 : isNeg ? 4 : 1;
                    return x;
                }
                quadrant = isOdd(t) ? isNeg ? 1 : 4 : isNeg ? 3 : 2;
            }
            return x.minus(pi).abs();
        }
        function toStringBinary(x, baseOut, sd, rm) {
            let base2; let e; let i; let k; let len; let roundUp; let str; let xd; let y; const Ctor = x.constructor; const
                isExp = sd !== void 0;
            if (isExp) {
                checkInt32(sd, 1, MAX_DIGITS);
                if (rm === void 0) rm = Ctor.rounding;
                else checkInt32(rm, 0, 8);
            } else {
                sd = Ctor.precision;
                rm = Ctor.rounding;
            }
            if (!x.isFinite()) {
                str = nonFiniteToString(x);
            } else {
                str = finiteToString(x);
                i = str.indexOf('.');
                if (isExp) {
                    base2 = 2;
                    if (baseOut == 16) {
                        sd = sd * 4 - 3;
                    } else if (baseOut == 8) {
                        sd = sd * 3 - 2;
                    }
                } else {
                    base2 = baseOut;
                }
                if (i >= 0) {
                    str = str.replace('.', '');
                    y = new Ctor(1);
                    y.e = str.length - i;
                    y.d = convertBase(finiteToString(y), 10, base2);
                    y.e = y.d.length;
                }
                xd = convertBase(str, 10, base2);
                e = len = xd.length;
                for (; xd[--len] == 0;) xd.pop();
                if (!xd[0]) {
                    str = isExp ? '0p+0' : '0';
                } else {
                    if (i < 0) {
                        e--;
                    } else {
                        x = new Ctor(x);
                        x.d = xd;
                        x.e = e;
                        x = divide(x, y, sd, rm, 0, base2);
                        xd = x.d;
                        e = x.e;
                        roundUp = inexact;
                    }
                    i = xd[sd];
                    k = base2 / 2;
                    roundUp = roundUp || xd[sd + 1] !== void 0;
                    roundUp = rm < 4 ? (i !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2)) : i > k || i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 || rm === (x.s < 0 ? 8 : 7));
                    xd.length = sd;
                    if (roundUp) {
                        for (; ++xd[--sd] > base2 - 1;) {
                            xd[sd] = 0;
                            if (!sd) {
                                ++e;
                                xd.unshift(1);
                            }
                        }
                    }
                    for (len = xd.length; !xd[len - 1]; --len) ;
                    for (i = 0, str = ''; i < len; i++) str += NUMERALS.charAt(xd[i]);
                    if (isExp) {
                        if (len > 1) {
                            if (baseOut == 16 || baseOut == 8) {
                                i = baseOut == 16 ? 4 : 3;
                                for (--len; len % i; len++) str += '0';
                                xd = convertBase(str, base2, baseOut);
                                for (len = xd.length; !xd[len - 1]; --len) ;
                                for (i = 1, str = '1.'; i < len; i++) str += NUMERALS.charAt(xd[i]);
                            } else {
                                str = `${str.charAt(0)}.${str.slice(1)}`;
                            }
                        }
                        str = str + (e < 0 ? 'p' : 'p+') + e;
                    } else if (e < 0) {
                        for (; ++e;) str = `0${str}`;
                        str = `0.${str}`;
                    } else if (++e > len) for (e -= len; e--;) str += '0';
                    else if (e < len) str = `${str.slice(0, e)}.${str.slice(e)}`;
                }
                str = (baseOut == 16 ? '0x' : baseOut == 2 ? '0b' : baseOut == 8 ? '0o' : '') + str;
            }
            return x.s < 0 ? `-${str}` : str;
        }
        function truncate(arr, len) {
            if (arr.length > len) {
                arr.length = len;
                return true;
            }
        }
        function abs(x) {
            return new this(x).abs();
        }
        function acos(x) {
            return new this(x).acos();
        }
        function acosh(x) {
            return new this(x).acosh();
        }
        function add(x, y) {
            return new this(x).plus(y);
        }
        function asin(x) {
            return new this(x).asin();
        }
        function asinh(x) {
            return new this(x).asinh();
        }
        function atan(x) {
            return new this(x).atan();
        }
        function atanh(x) {
            return new this(x).atanh();
        }
        function atan2(y, x) {
            y = new this(y);
            x = new this(x);
            let r; const pr = this.precision; const rm = this.rounding; const
                wpr = pr + 4;
            if (!y.s || !x.s) {
                r = new this(NaN);
            } else if (!y.d && !x.d) {
                r = getPi(this, wpr, 1).times(x.s > 0 ? 0.25 : 0.75);
                r.s = y.s;
            } else if (!x.d || y.isZero()) {
                r = x.s < 0 ? getPi(this, pr, rm) : new this(0);
                r.s = y.s;
            } else if (!y.d || x.isZero()) {
                r = getPi(this, wpr, 1).times(0.5);
                r.s = y.s;
            } else if (x.s < 0) {
                this.precision = wpr;
                this.rounding = 1;
                r = this.atan(divide(y, x, wpr, 1));
                x = getPi(this, wpr, 1);
                this.precision = pr;
                this.rounding = rm;
                r = y.s < 0 ? r.minus(x) : r.plus(x);
            } else {
                r = this.atan(divide(y, x, wpr, 1));
            }
            return r;
        }
        function cbrt(x) {
            return new this(x).cbrt();
        }
        function ceil(x) {
            return finalise(x = new this(x), x.e + 1, 2);
        }
        function clamp(x, min3, max3) {
            return new this(x).clamp(min3, max3);
        }
        function config2(obj) {
            if (!obj || typeof obj !== 'object') throw Error(`${decimalError}Object expected`);
            let i; let p; let v; const useDefaults = obj.defaults === true; const
                ps = [
                    'precision',
                    1,
                    MAX_DIGITS,
                    'rounding',
                    0,
                    8,
                    'toExpNeg',
                    -EXP_LIMIT,
                    0,
                    'toExpPos',
                    0,
                    EXP_LIMIT,
                    'maxE',
                    0,
                    EXP_LIMIT,
                    'minE',
                    -EXP_LIMIT,
                    0,
                    'modulo',
                    0,
                    9,
                ];
            for (i = 0; i < ps.length; i += 3) {
                if (p = ps[i], useDefaults) this[p] = DEFAULTS[p];
                if ((v = obj[p]) !== void 0) {
                    if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2]) this[p] = v;
                    else throw Error(`${invalidArgument + p}: ${v}`);
                }
            }
            if (p = 'crypto', useDefaults) this[p] = DEFAULTS[p];
            if ((v = obj[p]) !== void 0) {
                if (v === true || v === false || v === 0 || v === 1) {
                    if (v) {
                        if (typeof crypto !== 'undefined' && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                            this[p] = true;
                        } else {
                            throw Error(cryptoUnavailable);
                        }
                    } else {
                        this[p] = false;
                    }
                } else {
                    throw Error(`${invalidArgument + p}: ${v}`);
                }
            }
            return this;
        }
        function cos(x) {
            return new this(x).cos();
        }
        function cosh(x) {
            return new this(x).cosh();
        }
        function clone(obj) {
            let i; let p; let
                ps;
            function Decimal2(v) {
                let e; let i2; let t; const
                    x = this;
                if (!(x instanceof Decimal2)) return new Decimal2(v);
                x.constructor = Decimal2;
                if (isDecimalInstance(v)) {
                    x.s = v.s;
                    if (external) {
                        if (!v.d || v.e > Decimal2.maxE) {
                            x.e = NaN;
                            x.d = null;
                        } else if (v.e < Decimal2.minE) {
                            x.e = 0;
                            x.d = [0];
                        } else {
                            x.e = v.e;
                            x.d = v.d.slice();
                        }
                    } else {
                        x.e = v.e;
                        x.d = v.d ? v.d.slice() : v.d;
                    }
                    return;
                }
                t = typeof v;
                if (t === 'number') {
                    if (v === 0) {
                        x.s = 1 / v < 0 ? -1 : 1;
                        x.e = 0;
                        x.d = [0];
                        return;
                    }
                    if (v < 0) {
                        v = -v;
                        x.s = -1;
                    } else {
                        x.s = 1;
                    }
                    if (v === ~~v && v < 1e7) {
                        for (e = 0, i2 = v; i2 >= 10; i2 /= 10) e++;
                        if (external) {
                            if (e > Decimal2.maxE) {
                                x.e = NaN;
                                x.d = null;
                            } else if (e < Decimal2.minE) {
                                x.e = 0;
                                x.d = [0];
                            } else {
                                x.e = e;
                                x.d = [v];
                            }
                        } else {
                            x.e = e;
                            x.d = [v];
                        }
                        return;
                    } if (v * 0 !== 0) {
                        if (!v) x.s = NaN;
                        x.e = NaN;
                        x.d = null;
                        return;
                    }
                    return parseDecimal(x, v.toString());
                } if (t !== 'string') {
                    throw Error(invalidArgument + v);
                }
                if ((i2 = v.charCodeAt(0)) === 45) {
                    v = v.slice(1);
                    x.s = -1;
                } else {
                    if (i2 === 43) v = v.slice(1);
                    x.s = 1;
                }
                return isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
            }
            Decimal2.prototype = P;
            Decimal2.ROUND_UP = 0;
            Decimal2.ROUND_DOWN = 1;
            Decimal2.ROUND_CEIL = 2;
            Decimal2.ROUND_FLOOR = 3;
            Decimal2.ROUND_HALF_UP = 4;
            Decimal2.ROUND_HALF_DOWN = 5;
            Decimal2.ROUND_HALF_EVEN = 6;
            Decimal2.ROUND_HALF_CEIL = 7;
            Decimal2.ROUND_HALF_FLOOR = 8;
            Decimal2.EUCLID = 9;
            Decimal2.config = Decimal2.set = config2;
            Decimal2.clone = clone;
            Decimal2.isDecimal = isDecimalInstance;
            Decimal2.abs = abs;
            Decimal2.acos = acos;
            Decimal2.acosh = acosh;
            Decimal2.add = add;
            Decimal2.asin = asin;
            Decimal2.asinh = asinh;
            Decimal2.atan = atan;
            Decimal2.atanh = atanh;
            Decimal2.atan2 = atan2;
            Decimal2.cbrt = cbrt;
            Decimal2.ceil = ceil;
            Decimal2.clamp = clamp;
            Decimal2.cos = cos;
            Decimal2.cosh = cosh;
            Decimal2.div = div;
            Decimal2.exp = exp;
            Decimal2.floor = floor;
            Decimal2.hypot = hypot;
            Decimal2.ln = ln;
            Decimal2.log = log;
            Decimal2.log10 = log10;
            Decimal2.log2 = log2;
            Decimal2.max = max2;
            Decimal2.min = min2;
            Decimal2.mod = mod;
            Decimal2.mul = mul;
            Decimal2.pow = pow;
            Decimal2.random = random;
            Decimal2.round = round;
            Decimal2.sign = sign2;
            Decimal2.sin = sin;
            Decimal2.sinh = sinh;
            Decimal2.sqrt = sqrt;
            Decimal2.sub = sub;
            Decimal2.sum = sum;
            Decimal2.tan = tan;
            Decimal2.tanh = tanh;
            Decimal2.trunc = trunc;
            if (obj === void 0) obj = {};
            if (obj) {
                if (obj.defaults !== true) {
                    ps = ['precision', 'rounding', 'toExpNeg', 'toExpPos', 'maxE', 'minE', 'modulo', 'crypto'];
                    for (i = 0; i < ps.length;) if (!obj.hasOwnProperty(p = ps[i++])) obj[p] = this[p];
                }
            }
            Decimal2.config(obj);
            return Decimal2;
        }
        function div(x, y) {
            return new this(x).div(y);
        }
        function exp(x) {
            return new this(x).exp();
        }
        function floor(x) {
            return finalise(x = new this(x), x.e + 1, 3);
        }
        function hypot() {
            let i; let n; let
                t = new this(0);
            external = false;
            for (i = 0; i < arguments.length;) {
                n = new this(arguments[i++]);
                if (!n.d) {
                    if (n.s) {
                        external = true;
                        return new this(1 / 0);
                    }
                    t = n;
                } else if (t.d) {
                    t = t.plus(n.times(n));
                }
            }
            external = true;
            return t.sqrt();
        }
        function isDecimalInstance(obj) {
            return obj instanceof Decimal || obj && obj.toStringTag === tag || false;
        }
        function ln(x) {
            return new this(x).ln();
        }
        function log(x, y) {
            return new this(x).log(y);
        }
        function log2(x) {
            return new this(x).log(2);
        }
        function log10(x) {
            return new this(x).log(10);
        }
        function max2() {
            return maxOrMin(this, arguments, 'lt');
        }
        function min2() {
            return maxOrMin(this, arguments, 'gt');
        }
        function mod(x, y) {
            return new this(x).mod(y);
        }
        function mul(x, y) {
            return new this(x).mul(y);
        }
        function pow(x, y) {
            return new this(x).pow(y);
        }
        function random(sd) {
            let d; let e; let k; let n; let i = 0; const r = new this(1); let
                rd = [];
            if (sd === void 0) sd = this.precision;
            else checkInt32(sd, 1, MAX_DIGITS);
            k = Math.ceil(sd / LOG_BASE);
            if (!this.crypto) {
                for (; i < k;) rd[i++] = Math.random() * 1e7 | 0;
            } else if (crypto.getRandomValues) {
                d = crypto.getRandomValues(new Uint32Array(k));
                for (; i < k;) {
                    n = d[i];
                    if (n >= 429e7) {
                        d[i] = crypto.getRandomValues(new Uint32Array(1))[0];
                    } else {
                        rd[i++] = n % 1e7;
                    }
                }
            } else if (crypto.randomBytes) {
                d = crypto.randomBytes(k *= 4);
                for (; i < k;) {
                    n = d[i] + (d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 127) << 24);
                    if (n >= 214e7) {
                        crypto.randomBytes(4).copy(d, i);
                    } else {
                        rd.push(n % 1e7);
                        i += 4;
                    }
                }
                i = k / 4;
            } else {
                throw Error(cryptoUnavailable);
            }
            k = rd[--i];
            sd %= LOG_BASE;
            if (k && sd) {
                n = 10 ** (LOG_BASE - sd);
                rd[i] = (k / n | 0) * n;
            }
            for (; rd[i] === 0; i--) rd.pop();
            if (i < 0) {
                e = 0;
                rd = [0];
            } else {
                e = -1;
                for (; rd[0] === 0; e -= LOG_BASE) rd.shift();
                for (k = 1, n = rd[0]; n >= 10; n /= 10) k++;
                if (k < LOG_BASE) e -= LOG_BASE - k;
            }
            r.e = e;
            r.d = rd;
            return r;
        }
        function round(x) {
            return finalise(x = new this(x), x.e + 1, this.rounding);
        }
        function sign2(x) {
            x = new this(x);
            return x.d ? x.d[0] ? x.s : 0 * x.s : x.s || NaN;
        }
        function sin(x) {
            return new this(x).sin();
        }
        function sinh(x) {
            return new this(x).sinh();
        }
        function sqrt(x) {
            return new this(x).sqrt();
        }
        function sub(x, y) {
            return new this(x).sub(y);
        }
        function sum() {
            let i = 0; const args = arguments; let
                x = new this(args[i]);
            external = false;
            for (; x.s && ++i < args.length;) x = x.plus(args[i]);
            external = true;
            return finalise(x, this.precision, this.rounding);
        }
        function tan(x) {
            return new this(x).tan();
        }
        function tanh(x) {
            return new this(x).tanh();
        }
        function trunc(x) {
            return finalise(x = new this(x), x.e + 1, 1);
        }
        Decimal = clone(DEFAULTS);
        Decimal.prototype.constructor = Decimal;
        Decimal['default'] = Decimal.Decimal = Decimal;
        LN10 = new Decimal(LN10);
        PI = new Decimal(PI);
        if (module.exports) {
            if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
                P[Symbol['for']('nodejs.util.inspect.custom')] = P.toString;
                P[Symbol.toStringTag] = 'Decimal';
            }
            module.exports = Decimal;
        } else {
            if (!globalScope) {
                globalScope = typeof self !== 'undefined' && self && self.self == self ? self : window;
            }
            noConflict = globalScope.Decimal;
            Decimal.noConflict = function () {
                globalScope.Decimal = noConflict;
                return Decimal;
            };
            globalScope.Decimal = Decimal;
        }
    }(commonjsGlobal));
}(decimal));
const __importDefault$b = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { 'default': mod };
};
Object.defineProperty(coins, '__esModule', { value: true });
coins.Coins = void 0;
const decimal_js_1 = __importDefault$b(decimal.exports);
class Coins {
    constructor(value, options) {
        const { isNano = false, decimals = 9 } = options || {};
        Coins.checkCoinsType(value);
        Coins.checkCoinsDecimals(decimals);
        const decimal2 = new decimal_js_1.default(value.toString());
        if (decimal2.dp() > decimals) {
            throw new Error(`Invalid Coins value, decimals places "${decimal2.dp()}" can't be greater than selected "${decimals}"`);
        }
        this.decimals = decimals;
        this.multiplier = (1 * 10) ** this.decimals;
        this.value = !isNano ? decimal2.mul(this.multiplier) : decimal2;
    }

    add(coins2) {
        Coins.checkCoins(coins2);
        Coins.compareCoinsDecimals(this, coins2);
        this.value = this.value.add(coins2.value);
        return this;
    }

    sub(coins2) {
        Coins.checkCoins(coins2);
        Coins.compareCoinsDecimals(this, coins2);
        this.value = this.value.sub(coins2.value);
        return this;
    }

    mul(value) {
        Coins.checkValue(value);
        Coins.checkConvertability(value);
        const multiplier = value.toString();
        this.value = this.value.mul(multiplier);
        return this;
    }

    div(value) {
        Coins.checkValue(value);
        Coins.checkConvertability(value);
        const divider = value.toString();
        this.value = this.value.div(divider);
        return this;
    }

    eq(coins2) {
        Coins.checkCoins(coins2);
        Coins.compareCoinsDecimals(this, coins2);
        return this.value.eq(coins2.value);
    }

    gt(coins2) {
        Coins.checkCoins(coins2);
        Coins.compareCoinsDecimals(this, coins2);
        return this.value.gt(coins2.value);
    }

    gte(coins2) {
        Coins.checkCoins(coins2);
        Coins.compareCoinsDecimals(this, coins2);
        return this.value.gte(coins2.value);
    }

    lt(coins2) {
        Coins.checkCoins(coins2);
        Coins.compareCoinsDecimals(this, coins2);
        return this.value.lt(coins2.value);
    }

    lte(coins2) {
        Coins.checkCoins(coins2);
        Coins.compareCoinsDecimals(this, coins2);
        return this.value.lte(coins2.value);
    }

    isNegative() {
        return this.value.isNegative();
    }

    isPositive() {
        return this.value.isPositive();
    }

    isZero() {
        return this.value.isZero();
    }

    toString() {
        const value = this.value.div(this.multiplier).toFixed(this.decimals);
        const re1 = new RegExp(`\\.0{${this.decimals}}$`);
        const re2 = new RegExp('(\\.[0-9]*?[0-9])0+$');
        const coins2 = value.replace(re1, '').replace(re2, '$1');
        return coins2;
    }

    toNano() {
        return this.value.toFixed(0);
    }

    static checkCoinsType(value) {
        if (Coins.isValid(value) && Coins.isConvertable(value)) return void 0;
        if (Coins.isCoins(value)) return void 0;
        throw new Error('Invalid Coins value');
    }

    static checkCoinsDecimals(decimals) {
        if (decimals < 0 || decimals > 18) {
            throw new Error('Invalid decimals value, must be 0-18');
        }
    }

    static compareCoinsDecimals(a, b) {
        if (a.decimals !== b.decimals) {
            throw new Error("Can't perform mathematical operation of Coins with different decimals");
        }
    }

    static checkValue(value) {
        if (Coins.isValid(value)) return void 0;
        throw new Error('Invalid value');
    }

    static checkCoins(value) {
        if (Coins.isCoins(value)) return void 0;
        throw new Error('Invalid value');
    }

    static checkConvertability(value) {
        if (Coins.isConvertable(value)) return void 0;
        throw new Error('Invalid value');
    }

    static isValid(value) {
        return typeof value === 'string' || typeof value === 'number' || typeof value === 'bigint';
    }

    static isCoins(value) {
        return value instanceof Coins;
    }

    static isConvertable(value) {
        try {
            new decimal_js_1.default(value.toString());
            return true;
        } catch (_err) {
            return false;
        }
    }

    static fromNano(value, decimals = 9) {
        Coins.checkCoinsType(value);
        Coins.checkCoinsDecimals(decimals);
        return new Coins(value, { isNano: true, decimals });
    }
}
coins.Coins = Coins;
const address = {};
const checksum = {};
Object.defineProperty(checksum, '__esModule', { value: true });
checksum.crc32cBytesLe = checksum.crc16BytesBe = checksum.crc32c = checksum.crc16 = void 0;
const crc16 = (data2) => {
    const POLY = 4129;
    const bytes2 = new Uint8Array(data2);
    const int16 = bytes2.reduce((acc, el) => {
        let crc = acc ^ el << 8;
        for (let i = 0; i < 8; i++) {
            crc = (crc & 32768) === 32768 ? crc << 1 ^ POLY : crc << 1;
        }
        return crc;
    }, 0) & 65535;
    const [uint16] = new Uint16Array([int16]);
    return uint16;
};
checksum.crc16 = crc16;
const crc16BytesBe = (data2) => {
    const crc = crc16(data2);
    const buffer = new ArrayBuffer(2);
    const view = new DataView(buffer);
    view.setUint16(0, crc, false);
    return new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
};
checksum.crc16BytesBe = crc16BytesBe;
const crc32c = (data2) => {
    const POLY = 2197175160;
    const bytes2 = new Uint8Array(data2);
    const int32 = bytes2.reduce((acc, el, i) => {
        let crc = acc ^ el;
        for (let i2 = 0; i2 < 8; i2++) {
            crc = crc & 1 ? crc >>> 1 ^ POLY : crc >>> 1;
        }
        return crc;
    }, 0 ^ 4294967295) ^ 4294967295;
    const [uint32] = new Uint32Array([int32]);
    return uint32;
};
checksum.crc32c = crc32c;
const crc32cBytesLe = (data2) => {
    const crc = crc32c(data2);
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setUint32(0, crc, true);
    return new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
};
checksum.crc32cBytesLe = crc32cBytesLe;
const global$1 = typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {};
function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
let cachedSetTimeout = defaultSetTimout;
let cachedClearTimeout = defaultClearTimeout;
if (typeof global$1.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
}
if (typeof global$1.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
}
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        return setTimeout(fun, 0);
    }
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e2) {
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        return clearTimeout(marker);
    }
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            return cachedClearTimeout.call(null, marker);
        } catch (e2) {
            return cachedClearTimeout.call(this, marker);
        }
    }
}
let queue = [];
let draining = false;
let currentQueue;
let queueIndex = -1;
function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}
function drainQueue() {
    if (draining) {
        return;
    }
    const timeout = runTimeout(cleanUpNextTick);
    draining = true;
    let len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
function nextTick(fun) {
    const args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (let i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
}
function Item(fun, array2) {
    this.fun = fun;
    this.array = array2;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
const title = 'browser';
const platform = 'browser';
const browser$1 = true;
const env = {};
const argv = [];
const version = '';
const versions = {};
const release = {};
const config = {};
function noop() {
}
const on = noop;
const addListener = noop;
const once = noop;
const off = noop;
const removeListener = noop;
const removeAllListeners = noop;
const emit = noop;
function binding(name) {
    throw new Error('process.binding is not supported');
}
function cwd() {
    return '/';
}
function chdir(dir) {
    throw new Error('process.chdir is not supported');
}
function umask() {
    return 0;
}
const performance = global$1.performance || {};
const performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {
    return new Date().getTime();
};
function hrtime(previousTimestamp) {
    const clocktime = performanceNow.call(performance) * 1e-3;
    let seconds = Math.floor(clocktime);
    let nanoseconds = Math.floor(clocktime % 1 * 1e9);
    if (previousTimestamp) {
        seconds -= previousTimestamp[0];
        nanoseconds -= previousTimestamp[1];
        if (nanoseconds < 0) {
            seconds--;
            nanoseconds += 1e9;
        }
    }
    return [seconds, nanoseconds];
}
const startTime = new Date();
function uptime() {
    const currentTime = new Date();
    const dif = currentTime - startTime;
    return dif / 1e3;
}
const browser$1$1 = {
    nextTick,
    title,
    browser: browser$1,
    env,
    argv,
    version,
    versions,
    on,
    addListener,
    once,
    off,
    removeListener,
    removeAllListeners,
    emit,
    binding,
    cwd,
    chdir,
    umask,
    hrtime,
    platform,
    release,
    config,
    uptime,
};
const lookup$4 = [];
const revLookup = [];
const Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
let inited = false;
function init$2() {
    inited = true;
    const code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    for (let i = 0, len = code.length; i < len; ++i) {
        lookup$4[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
    }
    revLookup['-'.charCodeAt(0)] = 62;
    revLookup['_'.charCodeAt(0)] = 63;
}
function toByteArray(b64) {
    if (!inited) {
        init$2();
    }
    let i; let j; let l; let tmp; let placeHolders; let
        arr;
    const len = b64.length;
    if (len % 4 > 0) {
        throw new Error('Invalid string. Length must be a multiple of 4');
    }
    placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;
    arr = new Arr(len * 3 / 4 - placeHolders);
    l = placeHolders > 0 ? len - 4 : len;
    let L = 0;
    for (i = 0, j = 0; i < l; i += 4, j += 3) {
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[L++] = tmp >> 16 & 255;
        arr[L++] = tmp >> 8 & 255;
        arr[L++] = tmp & 255;
    }
    if (placeHolders === 2) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[L++] = tmp & 255;
    } else if (placeHolders === 1) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[L++] = tmp >> 8 & 255;
        arr[L++] = tmp & 255;
    }
    return arr;
}
function tripletToBase64(num) {
    return lookup$4[num >> 18 & 63] + lookup$4[num >> 12 & 63] + lookup$4[num >> 6 & 63] + lookup$4[num & 63];
}
function encodeChunk(uint8, start, end) {
    let tmp;
    const output2 = [];
    for (let i = start; i < end; i += 3) {
        tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
        output2.push(tripletToBase64(tmp));
    }
    return output2.join('');
}
function fromByteArray(uint8) {
    if (!inited) {
        init$2();
    }
    let tmp;
    const len = uint8.length;
    const extraBytes = len % 3;
    let output2 = '';
    const parts = [];
    const maxChunkLength = 16383;
    for (let i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
        parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
    }
    if (extraBytes === 1) {
        tmp = uint8[len - 1];
        output2 += lookup$4[tmp >> 2];
        output2 += lookup$4[tmp << 4 & 63];
        output2 += '==';
    } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        output2 += lookup$4[tmp >> 10];
        output2 += lookup$4[tmp >> 4 & 63];
        output2 += lookup$4[tmp << 2 & 63];
        output2 += '=';
    }
    parts.push(output2);
    return parts.join('');
}
function read(buffer, offset, isLE, mLen, nBytes) {
    let e; let
        m;
    const eLen = nBytes * 8 - mLen - 1;
    const eMax = (1 << eLen) - 1;
    const eBias = eMax >> 1;
    let nBits = -7;
    let i = isLE ? nBytes - 1 : 0;
    const d = isLE ? -1 : 1;
    let s = buffer[offset + i];
    i += d;
    e = s & (1 << -nBits) - 1;
    s >>= -nBits;
    nBits += eLen;
    for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
    }
    m = e & (1 << -nBits) - 1;
    e >>= -nBits;
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
    }
    if (e === 0) {
        e = 1 - eBias;
    } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
    } else {
        m += 2 ** mLen;
        e -= eBias;
    }
    return (s ? -1 : 1) * m * 2 ** (e - mLen);
}
function write(buffer, value, offset, isLE, mLen, nBytes) {
    let e; let m; let
        c;
    let eLen = nBytes * 8 - mLen - 1;
    const eMax = (1 << eLen) - 1;
    const eBias = eMax >> 1;
    const rt = mLen === 23 ? 2 ** -24 - 2 ** -77 : 0;
    let i = isLE ? 0 : nBytes - 1;
    const d = isLE ? 1 : -1;
    const s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
    } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = 2 ** -e) < 1) {
            e--;
            c *= 2;
        }
        if (e + eBias >= 1) {
            value += rt / c;
        } else {
            value += rt * 2 ** (1 - eBias);
        }
        if (value * c >= 2) {
            e++;
            c /= 2;
        }
        if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
        } else if (e + eBias >= 1) {
            m = (value * c - 1) * 2 ** mLen;
            e += eBias;
        } else {
            m = value * 2 ** (eBias - 1) * 2 ** mLen;
            e = 0;
        }
    }
    for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
    }
    e = e << mLen | m;
    eLen += mLen;
    for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
    }
    buffer[offset + i - d] |= s * 128;
}
const toString$1 = {}.toString;
const isArray$1 = Array.isArray || function (arr) {
    return toString$1.call(arr) == '[object Array]';
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
const INSPECT_MAX_BYTES = 50;
Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== void 0 ? global$1.TYPED_ARRAY_SUPPORT : true;
kMaxLength();
function kMaxLength() {
    return Buffer.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
}
function createBuffer(that, length) {
    if (kMaxLength() < length) {
        throw new RangeError('Invalid typed array length');
    }
    if (Buffer.TYPED_ARRAY_SUPPORT) {
        that = new Uint8Array(length);
        that.__proto__ = Buffer.prototype;
    } else {
        if (that === null) {
            that = new Buffer(length);
        }
        that.length = length;
    }
    return that;
}
function Buffer(arg, encodingOrOffset, length) {
    if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
        return new Buffer(arg, encodingOrOffset, length);
    }
    if (typeof arg === 'number') {
        if (typeof encodingOrOffset === 'string') {
            throw new Error(
                'If encoding is specified then the first argument must be a string',
            );
        }
        return allocUnsafe(this, arg);
    }
    return from(this, arg, encodingOrOffset, length);
}
Buffer.poolSize = 8192;
Buffer._augment = function (arr) {
    arr.__proto__ = Buffer.prototype;
    return arr;
};
function from(that, value, encodingOrOffset, length) {
    if (typeof value === 'number') {
        throw new TypeError('"value" argument must not be a number');
    }
    if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
        return fromArrayBuffer(that, value, encodingOrOffset, length);
    }
    if (typeof value === 'string') {
        return fromString(that, value, encodingOrOffset);
    }
    return fromObject(that, value);
}
Buffer.from = function (value, encodingOrOffset, length) {
    return from(null, value, encodingOrOffset, length);
};
if (Buffer.TYPED_ARRAY_SUPPORT) {
    Buffer.prototype.__proto__ = Uint8Array.prototype;
    Buffer.__proto__ = Uint8Array;
}
function assertSize(size2) {
    if (typeof size2 !== 'number') {
        throw new TypeError('"size" argument must be a number');
    } else if (size2 < 0) {
        throw new RangeError('"size" argument must not be negative');
    }
}
function alloc(that, size2, fill2, encoding) {
    assertSize(size2);
    if (size2 <= 0) {
        return createBuffer(that, size2);
    }
    if (fill2 !== void 0) {
        return typeof encoding === 'string' ? createBuffer(that, size2).fill(fill2, encoding) : createBuffer(that, size2).fill(fill2);
    }
    return createBuffer(that, size2);
}
Buffer.alloc = function (size2, fill2, encoding) {
    return alloc(null, size2, fill2, encoding);
};
function allocUnsafe(that, size2) {
    assertSize(size2);
    that = createBuffer(that, size2 < 0 ? 0 : checked(size2) | 0);
    if (!Buffer.TYPED_ARRAY_SUPPORT) {
        for (let i = 0; i < size2; ++i) {
            that[i] = 0;
        }
    }
    return that;
}
Buffer.allocUnsafe = function (size2) {
    return allocUnsafe(null, size2);
};
Buffer.allocUnsafeSlow = function (size2) {
    return allocUnsafe(null, size2);
};
function fromString(that, string2, encoding) {
    if (typeof encoding !== 'string' || encoding === '') {
        encoding = 'utf8';
    }
    if (!Buffer.isEncoding(encoding)) {
        throw new TypeError('"encoding" must be a valid string encoding');
    }
    const length = byteLength(string2, encoding) | 0;
    that = createBuffer(that, length);
    const actual = that.write(string2, encoding);
    if (actual !== length) {
        that = that.slice(0, actual);
    }
    return that;
}
function fromArrayLike(that, array2) {
    const length = array2.length < 0 ? 0 : checked(array2.length) | 0;
    that = createBuffer(that, length);
    for (let i = 0; i < length; i += 1) {
        that[i] = array2[i] & 255;
    }
    return that;
}
function fromArrayBuffer(that, array2, byteOffset, length) {
    array2.byteLength;
    if (byteOffset < 0 || array2.byteLength < byteOffset) {
        throw new RangeError("'offset' is out of bounds");
    }
    if (array2.byteLength < byteOffset + (length || 0)) {
        throw new RangeError("'length' is out of bounds");
    }
    if (byteOffset === void 0 && length === void 0) {
        array2 = new Uint8Array(array2);
    } else if (length === void 0) {
        array2 = new Uint8Array(array2, byteOffset);
    } else {
        array2 = new Uint8Array(array2, byteOffset, length);
    }
    if (Buffer.TYPED_ARRAY_SUPPORT) {
        that = array2;
        that.__proto__ = Buffer.prototype;
    } else {
        that = fromArrayLike(that, array2);
    }
    return that;
}
function fromObject(that, obj) {
    if (internalIsBuffer(obj)) {
        const len = checked(obj.length) | 0;
        that = createBuffer(that, len);
        if (that.length === 0) {
            return that;
        }
        obj.copy(that, 0, 0, len);
        return that;
    }
    if (obj) {
        if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
            if (typeof obj.length !== 'number' || isnan(obj.length)) {
                return createBuffer(that, 0);
            }
            return fromArrayLike(that, obj);
        }
        if (obj.type === 'Buffer' && isArray$1(obj.data)) {
            return fromArrayLike(that, obj.data);
        }
    }
    throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
}
function checked(length) {
    if (length >= kMaxLength()) {
        throw new RangeError(`Attempt to allocate Buffer larger than maximum size: 0x${kMaxLength().toString(16)} bytes`);
    }
    return length | 0;
}
Buffer.isBuffer = isBuffer$1;
function internalIsBuffer(b) {
    return !!(b != null && b._isBuffer);
}
Buffer.compare = function compare2(a, b) {
    if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
        throw new TypeError('Arguments must be Buffers');
    }
    if (a === b) return 0;
    let x = a.length;
    let y = b.length;
    for (let i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
        }
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
};
Buffer.isEncoding = function isEncoding(encoding) {
    switch (String(encoding).toLowerCase()) {
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'latin1':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
            return true;
        default:
            return false;
    }
};
Buffer.concat = function concat2(list, length) {
    if (!isArray$1(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
    }
    if (list.length === 0) {
        return Buffer.alloc(0);
    }
    let i;
    if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
            length += list[i].length;
        }
    }
    const buffer = Buffer.allocUnsafe(length);
    let pos = 0;
    for (i = 0; i < list.length; ++i) {
        const buf = list[i];
        if (!internalIsBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
        }
        buf.copy(buffer, pos);
        pos += buf.length;
    }
    return buffer;
};
function byteLength(string2, encoding) {
    if (internalIsBuffer(string2)) {
        return string2.length;
    }
    if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string2) || string2 instanceof ArrayBuffer)) {
        return string2.byteLength;
    }
    if (typeof string2 !== 'string') {
        string2 = `${string2}`;
    }
    const len = string2.length;
    if (len === 0) return 0;
    let loweredCase = false;
    for (; ;) {
        switch (encoding) {
            case 'ascii':
            case 'latin1':
            case 'binary':
                return len;
            case 'utf8':
            case 'utf-8':
            case void 0:
                return utf8ToBytes(string2).length;
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
                return len * 2;
            case 'hex':
                return len >>> 1;
            case 'base64':
                return base64ToBytes$1(string2).length;
            default:
                if (loweredCase) return utf8ToBytes(string2).length;
                encoding = (`${encoding}`).toLowerCase();
                loweredCase = true;
        }
    }
}
Buffer.byteLength = byteLength;
function slowToString(encoding, start, end) {
    let loweredCase = false;
    if (start === void 0 || start < 0) {
        start = 0;
    }
    if (start > this.length) {
        return '';
    }
    if (end === void 0 || end > this.length) {
        end = this.length;
    }
    if (end <= 0) {
        return '';
    }
    end >>>= 0;
    start >>>= 0;
    if (end <= start) {
        return '';
    }
    if (!encoding) encoding = 'utf8';
    while (true) {
        switch (encoding) {
            case 'hex':
                return hexSlice(this, start, end);
            case 'utf8':
            case 'utf-8':
                return utf8Slice(this, start, end);
            case 'ascii':
                return asciiSlice(this, start, end);
            case 'latin1':
            case 'binary':
                return latin1Slice(this, start, end);
            case 'base64':
                return base64Slice(this, start, end);
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
                return utf16leSlice(this, start, end);
            default:
                if (loweredCase) throw new TypeError(`Unknown encoding: ${encoding}`);
                encoding = (`${encoding}`).toLowerCase();
                loweredCase = true;
        }
    }
}
Buffer.prototype._isBuffer = true;
function swap$1(b, n, m) {
    const i = b[n];
    b[n] = b[m];
    b[m] = i;
}
Buffer.prototype.swap16 = function swap16() {
    const len = this.length;
    if (len % 2 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 16-bits');
    }
    for (let i = 0; i < len; i += 2) {
        swap$1(this, i, i + 1);
    }
    return this;
};
Buffer.prototype.swap32 = function swap32() {
    const len = this.length;
    if (len % 4 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 32-bits');
    }
    for (let i = 0; i < len; i += 4) {
        swap$1(this, i, i + 3);
        swap$1(this, i + 1, i + 2);
    }
    return this;
};
Buffer.prototype.swap64 = function swap64() {
    const len = this.length;
    if (len % 8 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 64-bits');
    }
    for (let i = 0; i < len; i += 8) {
        swap$1(this, i, i + 7);
        swap$1(this, i + 1, i + 6);
        swap$1(this, i + 2, i + 5);
        swap$1(this, i + 3, i + 4);
    }
    return this;
};
Buffer.prototype.toString = function toString2() {
    const length = this.length | 0;
    if (length === 0) return '';
    if (arguments.length === 0) return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
};
Buffer.prototype.equals = function equals(b) {
    if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer');
    if (this === b) return true;
    return Buffer.compare(this, b) === 0;
};
Buffer.prototype.inspect = function inspect() {
    let str = '';
    const max2 = INSPECT_MAX_BYTES;
    if (this.length > 0) {
        str = this.toString('hex', 0, max2).match(/.{2}/g).join(' ');
        if (this.length > max2) str += ' ... ';
    }
    return `<Buffer ${str}>`;
};
Buffer.prototype.compare = function compare3(target, start, end, thisStart, thisEnd) {
    if (!internalIsBuffer(target)) {
        throw new TypeError('Argument must be a Buffer');
    }
    if (start === void 0) {
        start = 0;
    }
    if (end === void 0) {
        end = target ? target.length : 0;
    }
    if (thisStart === void 0) {
        thisStart = 0;
    }
    if (thisEnd === void 0) {
        thisEnd = this.length;
    }
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError('out of range index');
    }
    if (thisStart >= thisEnd && start >= end) {
        return 0;
    }
    if (thisStart >= thisEnd) {
        return -1;
    }
    if (start >= end) {
        return 1;
    }
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target) return 0;
    let x = thisEnd - thisStart;
    let y = end - start;
    const len = Math.min(x, y);
    const thisCopy = this.slice(thisStart, thisEnd);
    const targetCopy = target.slice(start, end);
    for (let i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
        }
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
};
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
    if (buffer.length === 0) return -1;
    if (typeof byteOffset === 'string') {
        encoding = byteOffset;
        byteOffset = 0;
    } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
    } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
    }
    byteOffset = +byteOffset;
    if (isNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
    }
    if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
        if (dir) return -1;
        byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
    }
    if (typeof val === 'string') {
        val = Buffer.from(val, encoding);
    }
    if (internalIsBuffer(val)) {
        if (val.length === 0) {
            return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
    } if (typeof val === 'number') {
        val &= 255;
        if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
            if (dir) {
                return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            }
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
    }
    throw new TypeError('val must be string, number or Buffer');
}
function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    let indexSize = 1;
    let arrLength = arr.length;
    let valLength = val.length;
    if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
            if (arr.length < 2 || val.length < 2) {
                return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
        }
    }
    function read2(buf, i2) {
        if (indexSize === 1) {
            return buf[i2];
        }
        return buf.readUInt16BE(i2 * indexSize);
    }
    let i;
    if (dir) {
        let foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
            if (read2(arr, i) === read2(val, foundIndex === -1 ? 0 : i - foundIndex)) {
                if (foundIndex === -1) foundIndex = i;
                if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
            } else {
                if (foundIndex !== -1) i -= i - foundIndex;
                foundIndex = -1;
            }
        }
    } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
            let found = true;
            for (let j = 0; j < valLength; j++) {
                if (read2(arr, i + j) !== read2(val, j)) {
                    found = false;
                    break;
                }
            }
            if (found) return i;
        }
    }
    return -1;
}
Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
};
Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};
Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};
function hexWrite(buf, string2, offset, length) {
    offset = Number(offset) || 0;
    const remaining = buf.length - offset;
    if (!length) {
        length = remaining;
    } else {
        length = Number(length);
        if (length > remaining) {
            length = remaining;
        }
    }
    const strLen = string2.length;
    if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');
    if (length > strLen / 2) {
        length = strLen / 2;
    }
    for (var i = 0; i < length; ++i) {
        const parsed = parseInt(string2.substr(i * 2, 2), 16);
        if (isNaN(parsed)) return i;
        buf[offset + i] = parsed;
    }
    return i;
}
function utf8Write(buf, string2, offset, length) {
    return blitBuffer(utf8ToBytes(string2, buf.length - offset), buf, offset, length);
}
function asciiWrite(buf, string2, offset, length) {
    return blitBuffer(asciiToBytes(string2), buf, offset, length);
}
function latin1Write(buf, string2, offset, length) {
    return asciiWrite(buf, string2, offset, length);
}
function base64Write(buf, string2, offset, length) {
    return blitBuffer(base64ToBytes$1(string2), buf, offset, length);
}
function ucs2Write(buf, string2, offset, length) {
    return blitBuffer(utf16leToBytes(string2, buf.length - offset), buf, offset, length);
}
Buffer.prototype.write = function write2(string2, offset, length, encoding) {
    if (offset === void 0) {
        encoding = 'utf8';
        length = this.length;
        offset = 0;
    } else if (length === void 0 && typeof offset === 'string') {
        encoding = offset;
        length = this.length;
        offset = 0;
    } else if (isFinite(offset)) {
        offset |= 0;
        if (isFinite(length)) {
            length |= 0;
            if (encoding === void 0) encoding = 'utf8';
        } else {
            encoding = length;
            length = void 0;
        }
    } else {
        throw new Error(
            'Buffer.write(string, encoding, offset[, length]) is no longer supported',
        );
    }
    const remaining = this.length - offset;
    if (length === void 0 || length > remaining) length = remaining;
    if (string2.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError('Attempt to write outside buffer bounds');
    }
    if (!encoding) encoding = 'utf8';
    let loweredCase = false;
    for (; ;) {
        switch (encoding) {
            case 'hex':
                return hexWrite(this, string2, offset, length);
            case 'utf8':
            case 'utf-8':
                return utf8Write(this, string2, offset, length);
            case 'ascii':
                return asciiWrite(this, string2, offset, length);
            case 'latin1':
            case 'binary':
                return latin1Write(this, string2, offset, length);
            case 'base64':
                return base64Write(this, string2, offset, length);
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
                return ucs2Write(this, string2, offset, length);
            default:
                if (loweredCase) throw new TypeError(`Unknown encoding: ${encoding}`);
                encoding = (`${encoding}`).toLowerCase();
                loweredCase = true;
        }
    }
};
Buffer.prototype.toJSON = function toJSON() {
    return {
        type: 'Buffer',
        data: Array.prototype.slice.call(this._arr || this, 0),
    };
};
function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) {
        return fromByteArray(buf);
    }
    return fromByteArray(buf.slice(start, end));
}
function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    const res = [];
    let i = start;
    while (i < end) {
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
            var secondByte; var thirdByte; var fourthByte; var
                tempCodePoint;
            switch (bytesPerSequence) {
                case 1:
                    if (firstByte < 128) {
                        codePoint = firstByte;
                    }
                    break;
                case 2:
                    secondByte = buf[i + 1];
                    if ((secondByte & 192) === 128) {
                        tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                        if (tempCodePoint > 127) {
                            codePoint = tempCodePoint;
                        }
                    }
                    break;
                case 3:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                        tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                        if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                            codePoint = tempCodePoint;
                        }
                    }
                    break;
                case 4:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    fourthByte = buf[i + 3];
                    if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                        tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                        if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                            codePoint = tempCodePoint;
                        }
                    }
            }
        }
        if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
        } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
}
const MAX_ARGUMENTS_LENGTH = 4096;
function decodeCodePointsArray(codePoints) {
    const len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
    }
    let res = '';
    let i = 0;
    while (i < len) {
        res += String.fromCharCode.apply(
            String,
            codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH),
        );
    }
    return res;
}
function asciiSlice(buf, start, end) {
    let ret = '';
    end = Math.min(buf.length, end);
    for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
    }
    return ret;
}
function latin1Slice(buf, start, end) {
    let ret = '';
    end = Math.min(buf.length, end);
    for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
    }
    return ret;
}
function hexSlice(buf, start, end) {
    const len = buf.length;
    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len) end = len;
    let out = '';
    for (let i = start; i < end; ++i) {
        out += toHex(buf[i]);
    }
    return out;
}
function utf16leSlice(buf, start, end) {
    const bytes2 = buf.slice(start, end);
    let res = '';
    for (let i = 0; i < bytes2.length; i += 2) {
        res += String.fromCharCode(bytes2[i] + bytes2[i + 1] * 256);
    }
    return res;
}
Buffer.prototype.slice = function slice2(start, end) {
    const len = this.length;
    start = ~~start;
    end = end === void 0 ? len : ~~end;
    if (start < 0) {
        start += len;
        if (start < 0) start = 0;
    } else if (start > len) {
        start = len;
    }
    if (end < 0) {
        end += len;
        if (end < 0) end = 0;
    } else if (end > len) {
        end = len;
    }
    if (end < start) end = start;
    let newBuf;
    if (Buffer.TYPED_ARRAY_SUPPORT) {
        newBuf = this.subarray(start, end);
        newBuf.__proto__ = Buffer.prototype;
    } else {
        const sliceLen = end - start;
        newBuf = new Buffer(sliceLen, void 0);
        for (let i = 0; i < sliceLen; ++i) {
            newBuf[i] = this[i + start];
        }
    }
    return newBuf;
};
function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
    if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}
Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
    offset |= 0;
    byteLength2 |= 0;
    if (!noAssert) checkOffset(offset, byteLength2, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
    }
    return val;
};
Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
    offset |= 0;
    byteLength2 |= 0;
    if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
    }
    let val = this[offset + --byteLength2];
    let mul = 1;
    while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
    }
    return val;
};
Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 1, this.length);
    return this[offset];
};
Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] | this[offset + 1] << 8;
};
Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] << 8 | this[offset + 1];
};
Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);
    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
};
Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};
Buffer.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
    offset |= 0;
    byteLength2 |= 0;
    if (!noAssert) checkOffset(offset, byteLength2, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
    }
    mul *= 128;
    if (val >= mul) val -= 2 ** (8 * byteLength2);
    return val;
};
Buffer.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
    offset |= 0;
    byteLength2 |= 0;
    if (!noAssert) checkOffset(offset, byteLength2, this.length);
    let i = byteLength2;
    let mul = 1;
    let val = this[offset + --i];
    while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
    }
    mul *= 128;
    if (val >= mul) val -= 2 ** (8 * byteLength2);
    return val;
};
Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 1, this.length);
    if (!(this[offset] & 128)) return this[offset];
    return (255 - this[offset] + 1) * -1;
};
Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    const val = this[offset] | this[offset + 1] << 8;
    return val & 32768 ? val | 4294901760 : val;
};
Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    const val = this[offset + 1] | this[offset] << 8;
    return val & 32768 ? val | 4294901760 : val;
};
Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};
Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};
Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);
    return read(this, offset, true, 23, 4);
};
Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);
    return read(this, offset, false, 23, 4);
};
Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 8, this.length);
    return read(this, offset, true, 52, 8);
};
Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 8, this.length);
    return read(this, offset, false, 52, 8);
};
function checkInt(buf, value, offset, ext, max2, min2) {
    if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max2 || value < min2) throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length) throw new RangeError('Index out of range');
}
Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset |= 0;
    byteLength2 |= 0;
    if (!noAssert) {
        const maxBytes = 2 ** (8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
    }
    let mul = 1;
    let i = 0;
    this[offset] = value & 255;
    while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
    }
    return offset + byteLength2;
};
Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset |= 0;
    byteLength2 |= 0;
    if (!noAssert) {
        const maxBytes = 2 ** (8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
    }
    let i = byteLength2 - 1;
    let mul = 1;
    this[offset + i] = value & 255;
    while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
    }
    return offset + byteLength2;
};
Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset |= 0;
    if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
    if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
    this[offset] = value & 255;
    return offset + 1;
};
function objectWriteUInt16(buf, value, offset, littleEndian) {
    if (value < 0) value = 65535 + value + 1;
    for (let i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
        buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
    }
}
Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset |= 0;
    if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
    } else {
        objectWriteUInt16(this, value, offset, true);
    }
    return offset + 2;
};
Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset |= 0;
    if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
    } else {
        objectWriteUInt16(this, value, offset, false);
    }
    return offset + 2;
};
function objectWriteUInt32(buf, value, offset, littleEndian) {
    if (value < 0) value = 4294967295 + value + 1;
    for (let i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
        buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 255;
    }
}
Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset |= 0;
    if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
    } else {
        objectWriteUInt32(this, value, offset, true);
    }
    return offset + 4;
};
Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset |= 0;
    if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
    } else {
        objectWriteUInt32(this, value, offset, false);
    }
    return offset + 4;
};
Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset |= 0;
    if (!noAssert) {
        const limit = 2 ** (8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
    }
    let i = 0;
    let mul = 1;
    let sub = 0;
    this[offset] = value & 255;
    while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength2;
};
Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset |= 0;
    if (!noAssert) {
        const limit = 2 ** (8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
    }
    let i = byteLength2 - 1;
    let mul = 1;
    let sub = 0;
    this[offset + i] = value & 255;
    while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength2;
};
Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset |= 0;
    if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
    if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
    if (value < 0) value = 255 + value + 1;
    this[offset] = value & 255;
    return offset + 1;
};
Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset |= 0;
    if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
    } else {
        objectWriteUInt16(this, value, offset, true);
    }
    return offset + 2;
};
Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset |= 0;
    if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
    } else {
        objectWriteUInt16(this, value, offset, false);
    }
    return offset + 2;
};
Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset |= 0;
    if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
    } else {
        objectWriteUInt32(this, value, offset, true);
    }
    return offset + 4;
};
Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset |= 0;
    if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
    if (value < 0) value = 4294967295 + value + 1;
    if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
    } else {
        objectWriteUInt32(this, value, offset, false);
    }
    return offset + 4;
};
function checkIEEE754(buf, value, offset, ext, max2, min2) {
    if (offset + ext > buf.length) throw new RangeError('Index out of range');
    if (offset < 0) throw new RangeError('Index out of range');
}
function writeFloat(buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
        checkIEEE754(buf, value, offset, 4);
    }
    write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
}
Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert);
};
Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert);
};
function writeDouble(buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
        checkIEEE754(buf, value, offset, 8);
    }
    write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
}
Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert);
};
Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert);
};
Buffer.prototype.copy = function copy2(target, targetStart, start, end) {
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start;
    if (end === start) return 0;
    if (target.length === 0 || this.length === 0) return 0;
    if (targetStart < 0) {
        throw new RangeError('targetStart out of bounds');
    }
    if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
    if (end < 0) throw new RangeError('sourceEnd out of bounds');
    if (end > this.length) end = this.length;
    if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
    }
    const len = end - start;
    let i;
    if (this === target && start < targetStart && targetStart < end) {
        for (i = len - 1; i >= 0; --i) {
            target[i + targetStart] = this[i + start];
        }
    } else if (len < 1e3 || !Buffer.TYPED_ARRAY_SUPPORT) {
        for (i = 0; i < len; ++i) {
            target[i + targetStart] = this[i + start];
        }
    } else {
        Uint8Array.prototype.set.call(
            target,
            this.subarray(start, start + len),
            targetStart,
        );
    }
    return len;
};
Buffer.prototype.fill = function fill(val, start, end, encoding) {
    if (typeof val === 'string') {
        if (typeof start === 'string') {
            encoding = start;
            start = 0;
            end = this.length;
        } else if (typeof end === 'string') {
            encoding = end;
            end = this.length;
        }
        if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (code < 256) {
                val = code;
            }
        }
        if (encoding !== void 0 && typeof encoding !== 'string') {
            throw new TypeError('encoding must be a string');
        }
        if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
            throw new TypeError(`Unknown encoding: ${encoding}`);
        }
    } else if (typeof val === 'number') {
        val &= 255;
    }
    if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError('Out of range index');
    }
    if (end <= start) {
        return this;
    }
    start >>>= 0;
    end = end === void 0 ? this.length : end >>> 0;
    if (!val) val = 0;
    let i;
    if (typeof val === 'number') {
        for (i = start; i < end; ++i) {
            this[i] = val;
        }
    } else {
        const bytes2 = internalIsBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
        const len = bytes2.length;
        for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes2[i % len];
        }
    }
    return this;
};
const INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
function base64clean(str) {
    str = stringtrim(str).replace(INVALID_BASE64_RE, '');
    if (str.length < 2) return '';
    while (str.length % 4 !== 0) {
        str = `${str}=`;
    }
    return str;
}
function stringtrim(str) {
    if (str.trim) return str.trim();
    return str.replace(/^\s+|\s+$/g, '');
}
function toHex(n) {
    if (n < 16) return `0${n.toString(16)}`;
    return n.toString(16);
}
function utf8ToBytes(string2, units) {
    units = units || Infinity;
    let codePoint;
    const { length } = string2;
    let leadSurrogate = null;
    const bytes2 = [];
    for (let i = 0; i < length; ++i) {
        codePoint = string2.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
                if (codePoint > 56319) {
                    if ((units -= 3) > -1) bytes2.push(239, 191, 189);
                    continue;
                } else if (i + 1 === length) {
                    if ((units -= 3) > -1) bytes2.push(239, 191, 189);
                    continue;
                }
                leadSurrogate = codePoint;
                continue;
            }
            if (codePoint < 56320) {
                if ((units -= 3) > -1) bytes2.push(239, 191, 189);
                leadSurrogate = codePoint;
                continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
            if ((units -= 3) > -1) bytes2.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
            if ((units -= 1) < 0) break;
            bytes2.push(codePoint);
        } else if (codePoint < 2048) {
            if ((units -= 2) < 0) break;
            bytes2.push(
                codePoint >> 6 | 192,
                codePoint & 63 | 128,
            );
        } else if (codePoint < 65536) {
            if ((units -= 3) < 0) break;
            bytes2.push(
                codePoint >> 12 | 224,
                codePoint >> 6 & 63 | 128,
                codePoint & 63 | 128,
            );
        } else if (codePoint < 1114112) {
            if ((units -= 4) < 0) break;
            bytes2.push(
                codePoint >> 18 | 240,
                codePoint >> 12 & 63 | 128,
                codePoint >> 6 & 63 | 128,
                codePoint & 63 | 128,
            );
        } else {
            throw new Error('Invalid code point');
        }
    }
    return bytes2;
}
function asciiToBytes(str) {
    const byteArray = [];
    for (let i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
    }
    return byteArray;
}
function utf16leToBytes(str, units) {
    let c; let hi; let
        lo;
    const byteArray = [];
    for (let i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
    }
    return byteArray;
}
function base64ToBytes$1(str) {
    return toByteArray(base64clean(str));
}
function blitBuffer(src2, dst, offset, length) {
    for (var i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src2.length) break;
        dst[i + offset] = src2[i];
    }
    return i;
}
function isnan(val) {
    return val !== val;
}
function isBuffer$1(obj) {
    return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj));
}
function isFastBuffer(obj) {
    return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
}
function isSlowBuffer(obj) {
    return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0));
}
const helpers = {};
const lib = {};
lib.TextEncoder = typeof TextEncoder !== 'undefined' ? TextEncoder : lib.TextEncoder;
lib.TextDecoder = typeof TextDecoder !== 'undefined' ? TextDecoder : lib.TextDecoder;
Object.defineProperty(helpers, '__esModule', { value: true });
helpers.bytesToBase64 = helpers.base64ToBytes = helpers.bytesToString = helpers.stringToBytes = helpers.sliceIntoChunks = helpers.bytesToHex = helpers.bytesToBits = helpers.bytesCompare = helpers.bytesToUint = helpers.bitsToBytes = helpers.bitsToHex = hexToBytes_1 = helpers.hexToBytes = helpers.hexToBits = helpers.uintToHex = helpers.isNodeEnv = void 0;
const util_1 = lib;
const isNodeEnv = typeof browser$1$1 !== 'undefined' && browser$1$1.versions !== void 0 && browser$1$1.versions.node !== void 0;
helpers.isNodeEnv = isNodeEnv;
const uintToHex = (uint) => {
    const hex = `0${uint.toString(16)}`;
    return hex.slice(-(Math.floor(hex.length / 2) * 2));
};
helpers.uintToHex = uintToHex;
const hexToBits = (hex) => hex.split('').reduce((acc, val) => {
    const chunk = parseInt(val, 16).toString(2).padStart(4, '0').split('')
        .map((bit) => Number(bit));
    return acc.concat(chunk);
}, []);
helpers.hexToBits = hexToBits;
const hexToBytes = (hex) => new Uint8Array(hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
var hexToBytes_1 = helpers.hexToBytes = hexToBytes;
const bytesToUint = (bytes2) => {
    const data2 = Array.from(bytes2);
    const uint = data2.reduce((acc, _el, i) => {
        acc *= 256;
        acc += bytes2[i];
        return acc;
    }, 0);
    return uint;
};
helpers.bytesToUint = bytesToUint;
const bytesCompare = (a, b) => {
    if (a.length !== b.length) {
        return false;
    }
    return Array.from(a).every((uint, i) => uint === b[i]);
};
helpers.bytesCompare = bytesCompare;
const bytesToBits$1 = (data2) => {
    const bytes2 = new Uint8Array(data2);
    return bytes2.reduce((acc, uint) => {
        const chunk = uint.toString(2).padStart(8, '0').split('').map((bit) => Number(bit));
        return acc.concat(chunk);
    }, []);
};
helpers.bytesToBits = bytesToBits$1;
const bitsToHex = (bits2) => {
    const bitstring = bits2.join('');
    const hex = (bitstring.match(/.{1,4}/g) || []).map((el) => parseInt(el.padStart(4, '0'), 2).toString(16));
    return hex.join('');
};
helpers.bitsToHex = bitsToHex;
const bitsToBytes$1 = (bits2) => {
    if (bits2.length === 0) {
        return new Uint8Array();
    }
    return hexToBytes(bitsToHex(bits2));
};
helpers.bitsToBytes = bitsToBytes$1;
const bytesToHex = (bytes2) => bytes2.reduce((acc, uint) => `${acc}${uintToHex(uint)}`, '');
helpers.bytesToHex = bytesToHex;
const bytesToString = (bytes2) => {
    const decoder = new util_1.TextDecoder();
    return decoder.decode(bytes2);
};
helpers.bytesToString = bytesToString;
const stringToBytes = (value) => {
    const encoder = new util_1.TextEncoder();
    return encoder.encode(value);
};
helpers.stringToBytes = stringToBytes;
const bytesToBase64 = (data2) => {
    const bytes2 = new Uint8Array(data2);
    const str = String.fromCharCode(...bytes2);
    return isNodeEnv ? Buffer.from(bytes2).toString('base64') : btoa(str);
};
helpers.bytesToBase64 = bytesToBase64;
const base64ToBytes = (base64) => {
    const binary2 = isNodeEnv ? Buffer.from(base64, 'base64').toString('binary') : atob(base64);
    return Uint8Array.from(binary2, (char) => char.charCodeAt(0));
};
helpers.base64ToBytes = base64ToBytes;
const sliceIntoChunks = (arr, chunkSize) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
};
helpers.sliceIntoChunks = sliceIntoChunks;
Object.defineProperty(address, '__esModule', { value: true });
address.Address = void 0;
const checksum_1$1 = checksum;
const helpers_1$e = helpers;
const FLAG_BOUNCEABLE = 17;
const FLAG_NON_BOUNCEABLE = 81;
const FLAG_TEST_ONLY = 128;
class Address {
    constructor(address2, options) {
        const isAddress = Address.isAddress(address2);
        const isEncoded = Address.isEncoded(address2);
        const isRaw = Address.isRaw(address2);
        let result;
        switch (true) {
            case isAddress:
                result = Address.parseAddress(address2);
                break;
            case isEncoded:
                result = Address.parseEncoded(address2);
                break;
            case isRaw:
                result = Address.parseRaw(address2);
                break;
            default:
                result = null;
                break;
        }
        if (result === null) {
            throw new Error("Address: can't parse address. Unknown type.");
        }
        const { workchain = result.workchain, bounceable = result.bounceable, testOnly = result.testOnly } = options || {};
        this._hash = result.hash;
        this._workchain = workchain;
        this._bounceable = bounceable;
        this._testOnly = testOnly;
    }

    get hash() {
        return new Uint8Array(this._hash);
    }

    get workchain() {
        return this._workchain;
    }

    get bounceable() {
        return this._bounceable;
    }

    get testOnly() {
        return this._testOnly;
    }

    static isEncoded(address2) {
        const re = /^([a-zA-Z0-9_-]{48}|[a-zA-Z0-9\/\+]{48})$/;
        return typeof address2 === 'string' && re.test(address2);
    }

    static isRaw(address2) {
        const re = /^-?[0-9]:[a-zA-Z0-9]{64}$/;
        return typeof address2 === 'string' && re.test(address2);
    }

    static parseEncoded(value) {
        const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
        const bytes2 = (0, helpers_1$e.base64ToBytes)(base64);
        const data2 = Array.from(bytes2);
        const address2 = data2.splice(0, 34);
        const checksum2 = data2.splice(0, 2);
        const crc = (0, checksum_1$1.crc16BytesBe)(address2);
        if (!(0, helpers_1$e.bytesCompare)(crc, checksum2)) {
            throw new Error("Address: can't parse address. Wrong checksum.");
        }
        const { buffer } = new Uint8Array(address2.splice(0, 2));
        const view = new DataView(buffer);
        const tag = view.getUint8(0);
        const workchain = view.getInt8(1);
        const hash2 = new Uint8Array(address2.splice(0, 32));
        const { bounceable, testOnly } = Address.decodeTag(tag);
        return {
            bounceable,
            testOnly,
            workchain,
            hash: hash2,
        };
    }

    static parseAddress(value) {
        const { workchain, bounceable, testOnly } = value;
        const hash2 = new Uint8Array(value.hash);
        return {
            bounceable,
            testOnly,
            workchain,
            hash: hash2,
        };
    }

    static parseRaw(value) {
        const data2 = value.split(':');
        const workchain = parseInt(data2[0], 10);
        const hash2 = (0, helpers_1$e.hexToBytes)(data2[1]);
        const bounceable = false;
        const testOnly = false;
        return {
            bounceable,
            testOnly,
            workchain,
            hash: hash2,
        };
    }

    static encodeTag(options) {
        const { bounceable, testOnly } = options;
        const tag = bounceable ? FLAG_BOUNCEABLE : FLAG_NON_BOUNCEABLE;
        return testOnly ? tag | FLAG_TEST_ONLY : tag;
    }

    static decodeTag(tag) {
        let data2 = tag;
        const testOnly = (data2 & FLAG_TEST_ONLY) !== 0;
        if (testOnly) {
            data2 ^= FLAG_TEST_ONLY;
        }
        if (![FLAG_BOUNCEABLE, FLAG_NON_BOUNCEABLE].includes(data2)) {
            throw new Error('Address: bad address tag.');
        }
        const bounceable = data2 === FLAG_BOUNCEABLE;
        return {
            bounceable,
            testOnly,
        };
    }

    eq(address2) {
        return address2 === this || (0, helpers_1$e.bytesCompare)(this._hash, address2.hash) && this._workchain === address2.workchain;
    }

    toString(type2 = 'base64', options) {
        const { workchain = this.workchain, bounceable = this.bounceable, testOnly = this.testOnly, urlSafe = true } = options || {};
        if (typeof workchain !== 'number' || workchain < -128 || workchain >= 128) {
            throw new Error('Address: workchain must be int8.');
        }
        if (typeof bounceable !== 'boolean') {
            throw new Error('Address: bounceable flag must be a boolean.');
        }
        if (typeof testOnly !== 'boolean') {
            throw new Error('Address: testOnly flag must be a boolean.');
        }
        if (typeof urlSafe !== 'boolean') {
            throw new Error('Address: urlSafe flag must be a boolean.');
        }
        if (type2 === 'raw') {
            return `${workchain}:${(0, helpers_1$e.bytesToHex)(this._hash)}`.toUpperCase();
        }
        const tag = Address.encodeTag({ bounceable, testOnly });
        const address2 = new Uint8Array([tag, workchain, ...this._hash]);
        const checksum2 = (0, checksum_1$1.crc16BytesBe)(address2);
        const base64 = (0, helpers_1$e.bytesToBase64)(new Uint8Array([...address2, ...checksum2]));
        return urlSafe ? base64.replace(/\//g, '_').replace(/\+/g, '-') : base64.replace(/_/g, '/').replace(/-/g, '+');
    }

    static isAddress(address2) {
        return address2 instanceof Address;
    }

    static isValid(address2) {
        try {
            new Address(address2);
            return true;
        } catch (e) {
            return false;
        }
    }
}
address.Address = Address;
Address.NONE = null;
const hashmap = {};
Object.defineProperty(hashmap, '__esModule', { value: true });
hashmap.Hashmap = hashmap.HashmapE = void 0;
const builder_1$1 = builder;
class Hashmap {
    constructor(keySize, options) {
        const { serializers = { key: (key) => key, value: (value) => value }, deserializers = { key: (key) => key, value: (value) => value } } = options || {};
        this.hashmap = /* @__PURE__ */ new Map();
        this.keySize = keySize;
        this.serializeKey = serializers.key;
        this.serializeValue = serializers.value;
        this.deserializeKey = deserializers.key;
        this.deserializeValue = deserializers.value;
    }

    * [Symbol.iterator]() {
        for (const [k, v] of this.hashmap) {
            const key = this.deserializeKey(k.split('').map((b) => Number(b)));
            const value = this.deserializeValue(v);
            yield [key, value];
        }
    }

    get(key) {
        const k = this.serializeKey(key).join('');
        const v = this.hashmap.get(k);
        return v !== void 0 ? this.deserializeValue(v) : void 0;
    }

    has(key) {
        return this.get(key) !== void 0;
    }

    set(key, value) {
        const k = this.serializeKey(key).join('');
        const v = this.serializeValue(value);
        this.hashmap.set(k, v);
        return this;
    }

    add(key, value) {
        return !this.has(key) ? this.set(key, value) : this;
    }

    replace(key, value) {
        return this.has(key) ? this.set(key, value) : this;
    }

    getSet(key, value) {
        const prev = this.get(key);
        this.set(key, value);
        return prev;
    }

    getAdd(key, value) {
        const prev = this.get(key);
        this.add(key, value);
        return prev;
    }

    getReplace(key, value) {
        const prev = this.get(key);
        this.replace(key, value);
        return prev;
    }

    delete(key) {
        const k = this.serializeKey(key).join('');
        this.hashmap.delete(k);
        return this;
    }

    isEmpty() {
        return this.hashmap.size === 0;
    }

    forEach(callbackfn) {
        return [...this].forEach(([key, value]) => callbackfn(key, value));
    }

    getRaw(key) {
        return this.hashmap.get(key.join(''));
    }

    setRaw(key, value) {
        this.hashmap.set(key.join(''), value);
        return this;
    }

    sortHashmap() {
        const sorted = [...this.hashmap].reduce((acc, [bitstring, value]) => {
            const key = bitstring.split('').map((b) => Number(b));
            const order = parseInt(bitstring, 2);
            const lt = acc.findIndex((el) => order > el.order);
            const index = lt > -1 ? lt : acc.length;
            acc.splice(index, 0, { order, key, value });
            return acc;
        }, []);
        return sorted.map((el) => [el.key, el.value]);
    }

    serialize() {
        const nodes = this.sortHashmap();
        if (nodes.length === 0) {
            throw new Error("Hashmap: can't be empty. It must contain at least 1 key-value pair.");
        }
        return Hashmap.serializeEdge(nodes);
    }

    static serializeEdge(nodes) {
        if (!nodes.length) {
            const label2 = this.serializeLabelShort([]);
            return new builder_1$1.Builder().storeBits(label2).cell();
        }
        const edge = new builder_1$1.Builder();
        const label = this.serializeLabel(nodes);
        edge.storeBits(label);
        if (nodes.length === 1) {
            const leaf = this.serializeLeaf(nodes[0]);
            edge.storeSlice(leaf.slice());
        }
        if (nodes.length > 1) {
            const [leftNodes, rightNodes] = this.serializeFork(nodes);
            const leftEdge = this.serializeEdge(leftNodes);
            edge.storeRef(leftEdge);
            if (rightNodes.length) {
                const rightEdge = this.serializeEdge(rightNodes);
                edge.storeRef(rightEdge);
            }
        }
        return edge.cell();
    }

    static serializeFork(nodes) {
        return nodes.reduce((acc, [key, value]) => {
            acc[key.shift()].push([key, value]);
            return acc;
        }, [[], []]);
    }

    static serializeLeaf(node) {
        return node[1];
    }

    static serializeLabel(nodes) {
        const [first2] = nodes[0];
        const [last2] = nodes[nodes.length - 1];
        const m = first2.length;
        const sameBitsIndex = first2.findIndex((bit, i) => bit !== last2[i]);
        const sameBitsLength = sameBitsIndex === -1 ? first2.length : sameBitsIndex;
        if (first2[0] !== last2[0] || m === 0) {
            return this.serializeLabelShort([]);
        }
        const label = first2.slice(0, sameBitsLength);
        const repeated = label.join('').match(/(^0+)|(^1+)/)[0].split('').map((b) => Number(b));
        const labelShort = this.serializeLabelShort(label);
        const labelLong = this.serializeLabelLong(label, m);
        const labelSame = nodes.length > 1 && repeated.length > 1 ? this.serializeLabelSame(repeated, m) : null;
        const labels = [
            { bits: label.length, label: labelShort },
            { bits: label.length, label: labelLong },
            { bits: repeated.length, label: labelSame },
        ].filter((el) => el.label !== null);
        labels.sort((a, b) => a.label.length - b.label.length);
        const choosen = labels[0];
        nodes.forEach(([key]) => key.splice(0, choosen.bits));
        return choosen.label;
    }

    static serializeLabelShort(bits2) {
        const label = new builder_1$1.Builder();
        label.storeBit(0).storeBits(bits2.map(() => 1)).storeBit(0).storeBits(bits2);
        return label.bits;
    }

    static serializeLabelLong(bits2, m) {
        const label = new builder_1$1.Builder();
        label.storeBits([1, 0]).storeUint(bits2.length, Math.ceil(Math.log2(m + 1))).storeBits(bits2);
        return label.bits;
    }

    static serializeLabelSame(bits2, m) {
        const label = new builder_1$1.Builder();
        label.storeBits([1, 1]).storeBit(bits2[0]).storeUint(bits2.length, Math.ceil(Math.log2(m + 1)));
        return label.bits;
    }

    static deserialize(keySize, slice3, options) {
        if (slice3.bits.length < 2) {
            throw new Error("Hashmap: can't be empty. It must contain at least 1 key-value pair.");
        }
        const hashmap2 = new Hashmap(keySize, options);
        const nodes = Hashmap.deserializeEdge(slice3, keySize);
        for (let i = 0; i < nodes.length; i += 1) {
            const [key, value] = nodes[i];
            hashmap2.setRaw(key, value);
        }
        return hashmap2;
    }

    static deserializeEdge(edge, keySize, key = []) {
        const nodes = [];
        key.push(...this.deserializeLabel(edge, keySize - key.length));
        if (key.length === keySize) {
            const value = new builder_1$1.Builder().storeSlice(edge).cell();
            return nodes.concat([[key, value]]);
        }
        return edge.refs.reduce((acc, _r, i) => {
            const forkEdge = edge.loadRef().slice();
            const forkKey = key.concat([i]);
            return acc.concat(this.deserializeEdge(forkEdge, keySize, forkKey));
        }, []);
    }

    static deserializeLabel(edge, m) {
        if (edge.loadBit() === 0) {
            return this.deserializeLabelShort(edge);
        }
        if (edge.loadBit() === 0) {
            return this.deserializeLabelLong(edge, m);
        }
        return this.deserializeLabelSame(edge, m);
    }

    static deserializeLabelShort(edge) {
        const length = edge.bits.findIndex((b) => b === 0);
        return edge.skip(length + 1) && edge.loadBits(length);
    }

    static deserializeLabelLong(edge, m) {
        const length = edge.loadUint(Math.ceil(Math.log2(m + 1)));
        return edge.loadBits(length);
    }

    static deserializeLabelSame(edge, m) {
        const repeated = edge.loadBit();
        const length = edge.loadUint(Math.ceil(Math.log2(m + 1)));
        return [...Array(length)].map(() => repeated);
    }

    cell() {
        return this.serialize();
    }

    static parse(keySize, slice3, options) {
        return this.deserialize(keySize, slice3, options);
    }
}
hashmap.Hashmap = Hashmap;
class HashmapE extends Hashmap {
    constructor(keySize, options) {
        super(keySize, options);
    }

    serialize() {
        const nodes = this.sortHashmap();
        const result = new builder_1$1.Builder();
        if (!nodes.length) {
            return result.storeBit(0).cell();
        }
        return result.storeBit(1).storeRef(HashmapE.serializeEdge(nodes)).cell();
    }

    static deserialize(keySize, slice3, options) {
        if (slice3.bits.length !== 1) {
            throw new Error('HashmapE: bad hashmap size flag.');
        }
        if (slice3.loadBit() === 0) {
            return new HashmapE(keySize, options);
        }
        const hashmap2 = new HashmapE(keySize, options);
        const edge = slice3.loadRef().slice();
        const nodes = Hashmap.deserializeEdge(edge, keySize);
        for (let i = 0; i < nodes.length; i += 1) {
            const [key, value] = nodes[i];
            hashmap2.setRaw(key, value);
        }
        return hashmap2;
    }

    static parse(keySize, slice3, options) {
        return this.deserialize(keySize, slice3, options);
    }
}
hashmap.HashmapE = HashmapE;
const numbers = {};
Object.defineProperty(numbers, '__esModule', { value: true });
numbers.bitsToBigInt = numbers.bitsToBigUint = numbers.bitsToIntUint = void 0;
const bitsToBigUint = (bits2) => {
    if (!bits2.length) return { value: 0n, isSafe: true };
    const value = bits2.reverse().reduce((acc, bit, i) => BigInt(bit) * 2n ** BigInt(i) + acc, 0n);
    const isSafe = value <= Number.MAX_SAFE_INTEGER;
    return {
        value,
        isSafe,
    };
};
numbers.bitsToBigUint = bitsToBigUint;
const bitsToBigInt = (bits2) => {
    if (!bits2.length) return { value: 0n, isSafe: true };
    const { value: uint } = bitsToBigUint(bits2);
    const size2 = BigInt(bits2.length);
    const int = 1n << size2 - 1n;
    const value = uint >= int ? uint - int * 2n : uint;
    const isSafe = value >= Number.MIN_SAFE_INTEGER && value <= Number.MAX_SAFE_INTEGER;
    return {
        value,
        isSafe,
    };
};
numbers.bitsToBigInt = bitsToBigInt;
const bitsToIntUint = (bits2, options) => {
    const { type: type2 = 'uint' } = options;
    const { value, isSafe } = type2 === 'uint' ? bitsToBigUint(bits2) : bitsToBigInt(bits2);
    if (!isSafe) {
        throw new Error('loaded value does not fit max/min safe integer value, use alternative BigInt methods');
    }
    return Number(value);
};
numbers.bitsToIntUint = bitsToIntUint;
Object.defineProperty(slice, '__esModule', { value: true });
slice.Slice = void 0;
const coins_1$1 = coins;
const address_1$2 = address;
const hashmap_1 = hashmap;
const helpers_1$d = helpers;
const numbers_1$2 = numbers;
class Slice {
    constructor(bits2, refs) {
        this._bits = bits2;
        this._refs = refs;
    }

    get bits() {
        return Array.from(this._bits);
    }

    get refs() {
        return Array.from(this._refs);
    }

    skip(size2) {
        return this.skipBits(size2);
    }

    skipBits(size2) {
        if (this._bits.length < size2) {
            throw new Error('Slice: bits overflow.');
        }
        this._bits.splice(0, size2);
        return this;
    }

    skipRefs(size2) {
        if (this._refs.length < size2) {
            throw new Error('Slice: refs overflow.');
        }
        this._refs.splice(0, size2);
        return this;
    }

    skipDict() {
        const isEmpty2 = this.loadBit() === 0;
        return !isEmpty2 ? this.skipRefs(1) : this;
    }

    loadRef() {
        if (!this._refs.length) {
            throw new Error('Slice: refs overflow.');
        }
        return this._refs.shift();
    }

    preloadRef() {
        if (!this._refs.length) {
            throw new Error('Slice: refs overflow.');
        }
        return this._refs[0];
    }

    loadBit() {
        if (!this._bits.length) {
            throw new Error('Slice: bits overflow.');
        }
        return this._bits.shift();
    }

    preloadBit() {
        if (!this._bits.length) {
            throw new Error('Slice: bits overflow.');
        }
        return this._bits[0];
    }

    loadBits(size2) {
        if (size2 < 0 || this._bits.length < size2) {
            throw new Error('Slice: bits overflow.');
        }
        return this._bits.splice(0, size2);
    }

    preloadBits(size2) {
        if (size2 < 0 || this._bits.length < size2) {
            throw new Error('Slice: bits overflow.');
        }
        return this._bits.slice(0, size2);
    }

    loadInt(size2) {
        const bits2 = this.loadBits(size2);
        return (0, numbers_1$2.bitsToIntUint)(bits2, { type: 'int' });
    }

    preloadInt(size2) {
        const bits2 = this.preloadBits(size2);
        return (0, numbers_1$2.bitsToIntUint)(bits2, { type: 'int' });
    }

    loadBigInt(size2) {
        const bits2 = this.loadBits(size2);
        const { value } = (0, numbers_1$2.bitsToBigInt)(bits2);
        return value;
    }

    preloadBigInt(size2) {
        const bits2 = this.preloadBits(size2);
        const { value } = (0, numbers_1$2.bitsToBigInt)(bits2);
        return value;
    }

    loadUint(size2) {
        const bits2 = this.loadBits(size2);
        return (0, numbers_1$2.bitsToIntUint)(bits2, { type: 'uint' });
    }

    preloadUint(size2) {
        const bits2 = this.preloadBits(size2);
        return (0, numbers_1$2.bitsToIntUint)(bits2, { type: 'uint' });
    }

    loadBigUint(size2) {
        const bits2 = this.loadBits(size2);
        const { value } = (0, numbers_1$2.bitsToBigUint)(bits2);
        return value;
    }

    preloadBigUint(size2) {
        const bits2 = this.preloadBits(size2);
        const { value } = (0, numbers_1$2.bitsToBigUint)(bits2);
        return value;
    }

    loadVarInt(length) {
        const size2 = Math.ceil(Math.log2(length));
        const sizeBytes = this.loadUint(size2);
        const sizeBits = sizeBytes * 8;
        return this.loadInt(sizeBits);
    }

    preloadVarInt(length) {
        const size2 = Math.ceil(Math.log2(length));
        const sizeBytes = this.preloadUint(size2);
        const sizeBits = sizeBytes * 8;
        const bits2 = this.preloadBits(size2 + sizeBits).slice(size2);
        return (0, numbers_1$2.bitsToIntUint)(bits2, { type: 'int' });
    }

    loadVarBigInt(length) {
        const size2 = Math.ceil(Math.log2(length));
        const sizeBytes = this.loadUint(size2);
        const sizeBits = sizeBytes * 8;
        const bits2 = this.loadBits(sizeBits);
        const { value } = (0, numbers_1$2.bitsToBigInt)(bits2);
        return value;
    }

    preloadVarBigInt(length) {
        const size2 = Math.ceil(Math.log2(length));
        const sizeBytes = this.preloadUint(size2);
        const sizeBits = sizeBytes * 8;
        const bits2 = this.preloadBits(size2 + sizeBits).slice(size2);
        const { value } = (0, numbers_1$2.bitsToBigInt)(bits2);
        return value;
    }

    loadVarUint(length) {
        const size2 = Math.ceil(Math.log2(length));
        const sizeBytes = this.loadUint(size2);
        const sizeBits = sizeBytes * 8;
        return this.loadUint(sizeBits);
    }

    preloadVarUint(length) {
        const size2 = Math.ceil(Math.log2(length));
        const sizeBytes = this.preloadUint(size2);
        const sizeBits = sizeBytes * 8;
        const bits2 = this.preloadBits(size2 + sizeBits).slice(size2);
        return (0, numbers_1$2.bitsToIntUint)(bits2, { type: 'uint' });
    }

    loadVarBigUint(length) {
        const size2 = Math.ceil(Math.log2(length));
        const sizeBytes = this.loadUint(size2);
        const sizeBits = sizeBytes * 8;
        const bits2 = this.loadBits(sizeBits);
        const { value } = (0, numbers_1$2.bitsToBigUint)(bits2);
        return value;
    }

    preloadVarBigUint(length) {
        const size2 = Math.ceil(Math.log2(length));
        const sizeBytes = this.preloadUint(size2);
        const sizeBits = sizeBytes * 8;
        const bits2 = this.preloadBits(size2 + sizeBits).slice(size2);
        const { value } = (0, numbers_1$2.bitsToBigUint)(bits2);
        return value;
    }

    loadBytes(size2) {
        const bits2 = this.loadBits(size2);
        return (0, helpers_1$d.bitsToBytes)(bits2);
    }

    preloadBytes(size2) {
        const bits2 = this.preloadBits(size2);
        return (0, helpers_1$d.bitsToBytes)(bits2);
    }

    loadString(size2 = null) {
        const bytes2 = size2 === null ? this.loadBytes(this._bits.length) : this.loadBytes(size2);
        return (0, helpers_1$d.bytesToString)(bytes2);
    }

    preloadString(size2 = null) {
        const bytes2 = size2 === null ? this.preloadBytes(this._bits.length) : this.preloadBytes(size2);
        return (0, helpers_1$d.bytesToString)(bytes2);
    }

    loadAddress() {
        const FLAG_ADDRESS_NO = [0, 0];
        const FLAG_ADDRESS = [1, 0];
        const flag = this.preloadBits(2);
        if (flag.every((bit, i) => bit === FLAG_ADDRESS_NO[i])) {
            return this.skip(2) && address_1$2.Address.NONE;
        }
        if (flag.every((bit, i) => bit === FLAG_ADDRESS[i])) {
            const size2 = 2 + 1 + 8 + 256;
            const bits2 = this.loadBits(size2).slice(2);
            bits2.splice(0, 1);
            const workchain = (0, numbers_1$2.bitsToIntUint)(bits2.splice(0, 8), { type: 'int' });
            const hash2 = (0, helpers_1$d.bitsToHex)(bits2.splice(0, 256));
            const raw = `${workchain}:${hash2}`;
            return new address_1$2.Address(raw);
        }
        throw new Error('Slice: bad address flag bits.');
    }

    preloadAddress() {
        const FLAG_ADDRESS_NO = [0, 0];
        const FLAG_ADDRESS = [1, 0];
        const flag = this.preloadBits(2);
        if (flag.every((bit, i) => bit === FLAG_ADDRESS_NO[i])) {
            return address_1$2.Address.NONE;
        }
        if (flag.every((bit, i) => bit === FLAG_ADDRESS[i])) {
            const size2 = 2 + 1 + 8 + 256;
            const bits2 = this.preloadBits(size2).slice(2);
            bits2.splice(0, 1);
            const workchain = (0, numbers_1$2.bitsToIntUint)(bits2.splice(0, 8), { type: 'int' });
            const hash2 = (0, helpers_1$d.bitsToHex)(bits2.splice(0, 256));
            const raw = `${workchain}:${hash2}`;
            return new address_1$2.Address(raw);
        }
        throw new Error('Slice: bad address flag bits.');
    }

    loadCoins(decimals = 9) {
        const coins2 = this.loadVarUint(16);
        return new coins_1$1.Coins(coins2, { isNano: true, decimals });
    }

    preloadCoins(decimals = 9) {
        const coins2 = this.preloadVarUint(16);
        return new coins_1$1.Coins(coins2, { isNano: true, decimals });
    }

    loadDict(keySize, options) {
        const dictConstructor = this.loadBit();
        const isEmpty2 = dictConstructor === 0;
        return !isEmpty2 ? hashmap_1.HashmapE.parse(keySize, new Slice([dictConstructor], [this.loadRef()]), options) : new hashmap_1.HashmapE(keySize, options);
    }

    preloadDict(keySize, options) {
        const dictConstructor = this.preloadBit();
        const isEmpty2 = dictConstructor === 0;
        return !isEmpty2 ? hashmap_1.HashmapE.parse(keySize, new Slice([dictConstructor], [this.preloadRef()]), options) : new hashmap_1.HashmapE(keySize, options);
    }

    static parse(cell2) {
        return new Slice(cell2.bits, cell2.refs);
    }
}
slice.Slice = Slice;
const bits = {};
Object.defineProperty(bits, '__esModule', { value: true });
bits.rollback = bits.augment = void 0;
const augment = (bits2, divider = 8) => {
    const amount = divider - bits2.length % divider;
    const overage = [...Array(amount)].map((_el, i) => (i === 0 ? 1 : 0));
    if (overage.length !== 0 && overage.length !== divider) {
        return bits2.concat(overage);
    }
    return bits2;
};
bits.augment = augment;
const rollback = (bits2) => {
    const index = bits2.slice(-7).reverse().indexOf(1);
    if (index === -1) {
        throw new Error('Incorrectly augmented bits.');
    }
    return bits2.slice(0, -(index + 1));
};
bits.rollback = rollback;
const hash$1 = {};
const sha256$5 = {};
const _sha2 = {};
const _assert = {};
Object.defineProperty(_assert, '__esModule', { value: true });
_assert.output = _assert.exists = _assert.hash = _assert.bytes = _assert.bool = _assert.number = void 0;
function number$1(n) {
    if (!Number.isSafeInteger(n) || n < 0) throw new Error(`Wrong positive integer: ${n}`);
}
_assert.number = number$1;
function bool(b) {
    if (typeof b !== 'boolean') throw new Error(`Expected boolean, not ${b}`);
}
_assert.bool = bool;
function bytes(b, ...lengths) {
    if (!(b instanceof Uint8Array)) throw new TypeError('Expected Uint8Array');
    if (lengths.length > 0 && !lengths.includes(b.length)) throw new TypeError(`Expected Uint8Array of length ${lengths}, not of length=${b.length}`);
}
_assert.bytes = bytes;
function hash(hash2) {
    if (typeof hash2 !== 'function' || typeof hash2.create !== 'function') throw new Error('Hash should be wrapped by utils.wrapConstructor');
    number$1(hash2.outputLen);
    number$1(hash2.blockLen);
}
_assert.hash = hash;
function exists$3(instance, checkFinished = true) {
    if (instance.destroyed) throw new Error('Hash instance has been destroyed');
    if (checkFinished && instance.finished) throw new Error('Hash#digest() has already been called');
}
_assert.exists = exists$3;
function output(out, instance) {
    bytes(out);
    const min2 = instance.outputLen;
    if (out.length < min2) {
        throw new Error(`digestInto() expects output buffer of length at least ${min2}`);
    }
}
_assert.output = output;
const assert = {
    number: number$1,
    bool,
    bytes,
    hash,
    exists: exists$3,
    output,
};
_assert.default = assert;
const utils$l = {};
const cryptoBrowser = {};
Object.defineProperty(cryptoBrowser, '__esModule', { value: true });
cryptoBrowser.crypto = void 0;
cryptoBrowser.crypto = {
    node: void 0,
    web: typeof self === 'object' && 'crypto' in self ? self.crypto : void 0,
};
(function (exports) {
    /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.randomBytes = exports.wrapConstructorWithOpts = exports.wrapConstructor = exports.checkOpts = exports.Hash = exports.concatBytes = exports.toBytes = exports.utf8ToBytes = exports.asyncLoop = exports.nextTick = exports.hexToBytes = exports.bytesToHex = exports.isLE = exports.rotr = exports.createView = exports.u32 = exports.u8 = void 0;
    const crypto_1 = cryptoBrowser;
    const u8 = (arr) => new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
    exports.u8 = u8;
    const u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
    exports.u32 = u32;
    const createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    exports.createView = createView;
    const rotr = (word, shift) => word << 32 - shift | word >>> shift;
    exports.rotr = rotr;
    exports.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
    if (!exports.isLE) throw new Error('Non little-endian hardware is not supported');
    const hexes = Array.from({ length: 256 }, (v, i) => i.toString(16).padStart(2, '0'));
    function bytesToHex2(uint8a) {
        if (!(uint8a instanceof Uint8Array)) throw new Error('Uint8Array expected');
        let hex = '';
        for (let i = 0; i < uint8a.length; i++) {
            hex += hexes[uint8a[i]];
        }
        return hex;
    }
    exports.bytesToHex = bytesToHex2;
    function hexToBytes2(hex) {
        if (typeof hex !== 'string') {
            throw new TypeError(`hexToBytes: expected string, got ${typeof hex}`);
        }
        if (hex.length % 2) throw new Error('hexToBytes: received invalid unpadded hex');
        const array2 = new Uint8Array(hex.length / 2);
        for (let i = 0; i < array2.length; i++) {
            const j = i * 2;
            const hexByte = hex.slice(j, j + 2);
            const byte = Number.parseInt(hexByte, 16);
            if (Number.isNaN(byte) || byte < 0) throw new Error('Invalid byte sequence');
            array2[i] = byte;
        }
        return array2;
    }
    exports.hexToBytes = hexToBytes2;
    const nextTick2 = async () => {
    };
    exports.nextTick = nextTick2;
    async function asyncLoop(iters, tick, cb) {
        let ts = Date.now();
        for (let i = 0; i < iters; i++) {
            cb(i);
            const diff = Date.now() - ts;
            if (diff >= 0 && diff < tick) continue;
            await (0, exports.nextTick)();
            ts += diff;
        }
    }
    exports.asyncLoop = asyncLoop;
    function utf8ToBytes2(str) {
        if (typeof str !== 'string') {
            throw new TypeError(`utf8ToBytes expected string, got ${typeof str}`);
        }
        return new TextEncoder().encode(str);
    }
    exports.utf8ToBytes = utf8ToBytes2;
    function toBytes(data2) {
        if (typeof data2 === 'string') data2 = utf8ToBytes2(data2);
        if (!(data2 instanceof Uint8Array)) throw new TypeError(`Expected input type is Uint8Array (got ${typeof data2})`);
        return data2;
    }
    exports.toBytes = toBytes;
    function concatBytes(...arrays) {
        if (!arrays.every((a) => a instanceof Uint8Array)) throw new Error('Uint8Array list expected');
        if (arrays.length === 1) return arrays[0];
        const length = arrays.reduce((a, arr) => a + arr.length, 0);
        const result = new Uint8Array(length);
        for (let i = 0, pad = 0; i < arrays.length; i++) {
            const arr = arrays[i];
            result.set(arr, pad);
            pad += arr.length;
        }
        return result;
    }
    exports.concatBytes = concatBytes;
    class Hash {
        clone() {
            return this._cloneInto();
        }
    }
    exports.Hash = Hash;
    const isPlainObject2 = (obj) => Object.prototype.toString.call(obj) === '[object Object]' && obj.constructor === Object;
    function checkOpts(defaults2, opts) {
        if (opts !== void 0 && (typeof opts !== 'object' || !isPlainObject2(opts))) throw new TypeError('Options should be object or undefined');
        const merged = Object.assign(defaults2, opts);
        return merged;
    }
    exports.checkOpts = checkOpts;
    function wrapConstructor(hashConstructor) {
        const hashC = (message2) => hashConstructor().update(toBytes(message2)).digest();
        const tmp = hashConstructor();
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = () => hashConstructor();
        return hashC;
    }
    exports.wrapConstructor = wrapConstructor;
    function wrapConstructorWithOpts(hashCons) {
        const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
        const tmp = hashCons({});
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = (opts) => hashCons(opts);
        return hashC;
    }
    exports.wrapConstructorWithOpts = wrapConstructorWithOpts;
    function randomBytes(bytesLength = 32) {
        if (crypto_1.crypto.web) {
            return crypto_1.crypto.web.getRandomValues(new Uint8Array(bytesLength));
        } if (crypto_1.crypto.node) {
            return new Uint8Array(crypto_1.crypto.node.randomBytes(bytesLength).buffer);
        }
        throw new Error("The environment doesn't have randomBytes function");
    }
    exports.randomBytes = randomBytes;
}(utils$l));
Object.defineProperty(_sha2, '__esModule', { value: true });
_sha2.SHA2 = void 0;
const _assert_js_1$1 = _assert;
const utils_js_1$3 = utils$l;
function setBigUint64(view, byteOffset, value, isLE) {
    if (typeof view.setBigUint64 === 'function') return view.setBigUint64(byteOffset, value, isLE);
    const _32n = BigInt(32);
    const _u32_max = BigInt(4294967295);
    const wh = Number(value >> _32n & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE ? 4 : 0;
    const l = isLE ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE);
    view.setUint32(byteOffset + l, wl, isLE);
}
class SHA2 extends utils_js_1$3.Hash {
    constructor(blockLen, outputLen, padOffset, isLE) {
        super();
        this.blockLen = blockLen;
        this.outputLen = outputLen;
        this.padOffset = padOffset;
        this.isLE = isLE;
        this.finished = false;
        this.length = 0;
        this.pos = 0;
        this.destroyed = false;
        this.buffer = new Uint8Array(blockLen);
        this.view = (0, utils_js_1$3.createView)(this.buffer);
    }

    update(data2) {
        _assert_js_1$1.default.exists(this);
        const { view, buffer, blockLen } = this;
        data2 = (0, utils_js_1$3.toBytes)(data2);
        const len = data2.length;
        for (let pos = 0; pos < len;) {
            const take = Math.min(blockLen - this.pos, len - pos);
            if (take === blockLen) {
                const dataView = (0, utils_js_1$3.createView)(data2);
                for (; blockLen <= len - pos; pos += blockLen) this.process(dataView, pos);
                continue;
            }
            buffer.set(data2.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
                this.process(view, 0);
                this.pos = 0;
            }
        }
        this.length += data2.length;
        this.roundClean();
        return this;
    }

    digestInto(out) {
        _assert_js_1$1.default.exists(this);
        _assert_js_1$1.default.output(out, this);
        this.finished = true;
        const { buffer, view, blockLen, isLE } = this;
        let { pos } = this;
        buffer[pos++] = 128;
        this.buffer.subarray(pos).fill(0);
        if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
        }
        for (let i = pos; i < blockLen; i++) buffer[i] = 0;
        setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
        this.process(view, 0);
        const oview = (0, utils_js_1$3.createView)(out);
        this.get().forEach((v, i) => oview.setUint32(4 * i, v, isLE));
    }

    digest() {
        const { buffer, outputLen } = this;
        this.digestInto(buffer);
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
    }

    _cloneInto(to) {
        to || (to = new this.constructor());
        to.set(...this.get());
        const { blockLen, buffer, length, finished, destroyed, pos } = this;
        to.length = length;
        to.pos = pos;
        to.finished = finished;
        to.destroyed = destroyed;
        if (length % blockLen) to.buffer.set(buffer);
        return to;
    }
}
_sha2.SHA2 = SHA2;
Object.defineProperty(sha256$5, '__esModule', { value: true });
sha256$5.sha256 = void 0;
const _sha2_js_1$1 = _sha2;
const utils_js_1$2 = utils$l;
const Chi = (a, b, c) => a & b ^ ~a & c;
const Maj = (a, b, c) => a & b ^ a & c ^ b & c;
const SHA256_K = new Uint32Array([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298,
]);
const IV = new Uint32Array([
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225,
]);
const SHA256_W = new Uint32Array(64);
class SHA256 extends _sha2_js_1$1.SHA2 {
    constructor() {
        super(64, 32, 8, false);
        this.A = IV[0] | 0;
        this.B = IV[1] | 0;
        this.C = IV[2] | 0;
        this.D = IV[3] | 0;
        this.E = IV[4] | 0;
        this.F = IV[5] | 0;
        this.G = IV[6] | 0;
        this.H = IV[7] | 0;
    }

    get() {
        const { A, B, C, D, E, F, G, H } = this;
        return [A, B, C, D, E, F, G, H];
    }

    set(A, B, C, D, E, F, G, H) {
        this.A = A | 0;
        this.B = B | 0;
        this.C = C | 0;
        this.D = D | 0;
        this.E = E | 0;
        this.F = F | 0;
        this.G = G | 0;
        this.H = H | 0;
    }

    process(view, offset) {
        for (let i = 0; i < 16; i++, offset += 4) SHA256_W[i] = view.getUint32(offset, false);
        for (let i = 16; i < 64; i++) {
            const W15 = SHA256_W[i - 15];
            const W2 = SHA256_W[i - 2];
            const s0 = (0, utils_js_1$2.rotr)(W15, 7) ^ (0, utils_js_1$2.rotr)(W15, 18) ^ W15 >>> 3;
            const s1 = (0, utils_js_1$2.rotr)(W2, 17) ^ (0, utils_js_1$2.rotr)(W2, 19) ^ W2 >>> 10;
            SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
        }
        let { A, B, C, D, E, F, G, H } = this;
        for (let i = 0; i < 64; i++) {
            const sigma1 = (0, utils_js_1$2.rotr)(E, 6) ^ (0, utils_js_1$2.rotr)(E, 11) ^ (0, utils_js_1$2.rotr)(E, 25);
            const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
            const sigma0 = (0, utils_js_1$2.rotr)(A, 2) ^ (0, utils_js_1$2.rotr)(A, 13) ^ (0, utils_js_1$2.rotr)(A, 22);
            const T2 = sigma0 + Maj(A, B, C) | 0;
            H = G;
            G = F;
            F = E;
            E = D + T1 | 0;
            D = C;
            C = B;
            B = A;
            A = T1 + T2 | 0;
        }
        A = A + this.A | 0;
        B = B + this.B | 0;
        C = C + this.C | 0;
        D = D + this.D | 0;
        E = E + this.E | 0;
        F = F + this.F | 0;
        G = G + this.G | 0;
        H = H + this.H | 0;
        this.set(A, B, C, D, E, F, G, H);
    }

    roundClean() {
        SHA256_W.fill(0);
    }

    destroy() {
        this.set(0, 0, 0, 0, 0, 0, 0, 0);
        this.buffer.fill(0);
    }
}
sha256$5.sha256 = (0, utils_js_1$2.wrapConstructor)(() => new SHA256());
const sha512$5 = {};
const _u64 = {};
(function (exports) {
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.add = exports.toBig = exports.split = exports.fromBig = void 0;
    const U32_MASK64 = BigInt(2 ** 32 - 1);
    const _32n = BigInt(32);
    function fromBig(n, le = false) {
        if (le) return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
        return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
    }
    exports.fromBig = fromBig;
    function split(lst, le = false) {
        const Ah = new Uint32Array(lst.length);
        const Al = new Uint32Array(lst.length);
        for (let i = 0; i < lst.length; i++) {
            const { h, l } = fromBig(lst[i], le);
            [Ah[i], Al[i]] = [h, l];
        }
        return [Ah, Al];
    }
    exports.split = split;
    const toBig = (h, l) => BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
    exports.toBig = toBig;
    const shrSH = (h, l, s) => h >>> s;
    const shrSL = (h, l, s) => h << 32 - s | l >>> s;
    const rotrSH = (h, l, s) => h >>> s | l << 32 - s;
    const rotrSL = (h, l, s) => h << 32 - s | l >>> s;
    const rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
    const rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
    const rotr32H = (h, l) => l;
    const rotr32L = (h, l) => h;
    const rotlSH = (h, l, s) => h << s | l >>> 32 - s;
    const rotlSL = (h, l, s) => l << s | h >>> 32 - s;
    const rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
    const rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
    function add(Ah, Al, Bh, Bl) {
        const l = (Al >>> 0) + (Bl >>> 0);
        return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
    }
    exports.add = add;
    const add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
    const add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
    const add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
    const add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
    const add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
    const add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
    const u64 = {
        fromBig,
        split,
        toBig: exports.toBig,
        shrSH,
        shrSL,
        rotrSH,
        rotrSL,
        rotrBH,
        rotrBL,
        rotr32H,
        rotr32L,
        rotlSH,
        rotlSL,
        rotlBH,
        rotlBL,
        add,
        add3L,
        add3H,
        add4L,
        add4H,
        add5H,
        add5L,
    };
    exports.default = u64;
}(_u64));
Object.defineProperty(sha512$5, '__esModule', { value: true });
sha512$5.sha384 = sha512$5.sha512_256 = sha512$5.sha512 = sha512$5.SHA512 = void 0;
const _sha2_js_1 = _sha2;
const _u64_js_1 = _u64;
const utils_js_1$1 = utils$l;
const [SHA512_Kh, SHA512_Kl] = _u64_js_1.default.split([
    '0x428a2f98d728ae22',
    '0x7137449123ef65cd',
    '0xb5c0fbcfec4d3b2f',
    '0xe9b5dba58189dbbc',
    '0x3956c25bf348b538',
    '0x59f111f1b605d019',
    '0x923f82a4af194f9b',
    '0xab1c5ed5da6d8118',
    '0xd807aa98a3030242',
    '0x12835b0145706fbe',
    '0x243185be4ee4b28c',
    '0x550c7dc3d5ffb4e2',
    '0x72be5d74f27b896f',
    '0x80deb1fe3b1696b1',
    '0x9bdc06a725c71235',
    '0xc19bf174cf692694',
    '0xe49b69c19ef14ad2',
    '0xefbe4786384f25e3',
    '0x0fc19dc68b8cd5b5',
    '0x240ca1cc77ac9c65',
    '0x2de92c6f592b0275',
    '0x4a7484aa6ea6e483',
    '0x5cb0a9dcbd41fbd4',
    '0x76f988da831153b5',
    '0x983e5152ee66dfab',
    '0xa831c66d2db43210',
    '0xb00327c898fb213f',
    '0xbf597fc7beef0ee4',
    '0xc6e00bf33da88fc2',
    '0xd5a79147930aa725',
    '0x06ca6351e003826f',
    '0x142929670a0e6e70',
    '0x27b70a8546d22ffc',
    '0x2e1b21385c26c926',
    '0x4d2c6dfc5ac42aed',
    '0x53380d139d95b3df',
    '0x650a73548baf63de',
    '0x766a0abb3c77b2a8',
    '0x81c2c92e47edaee6',
    '0x92722c851482353b',
    '0xa2bfe8a14cf10364',
    '0xa81a664bbc423001',
    '0xc24b8b70d0f89791',
    '0xc76c51a30654be30',
    '0xd192e819d6ef5218',
    '0xd69906245565a910',
    '0xf40e35855771202a',
    '0x106aa07032bbd1b8',
    '0x19a4c116b8d2d0c8',
    '0x1e376c085141ab53',
    '0x2748774cdf8eeb99',
    '0x34b0bcb5e19b48a8',
    '0x391c0cb3c5c95a63',
    '0x4ed8aa4ae3418acb',
    '0x5b9cca4f7763e373',
    '0x682e6ff3d6b2b8a3',
    '0x748f82ee5defb2fc',
    '0x78a5636f43172f60',
    '0x84c87814a1f0ab72',
    '0x8cc702081a6439ec',
    '0x90befffa23631e28',
    '0xa4506cebde82bde9',
    '0xbef9a3f7b2c67915',
    '0xc67178f2e372532b',
    '0xca273eceea26619c',
    '0xd186b8c721c0c207',
    '0xeada7dd6cde0eb1e',
    '0xf57d4f7fee6ed178',
    '0x06f067aa72176fba',
    '0x0a637dc5a2c898a6',
    '0x113f9804bef90dae',
    '0x1b710b35131c471b',
    '0x28db77f523047d84',
    '0x32caab7b40c72493',
    '0x3c9ebe0a15c9bebc',
    '0x431d67c49c100d4c',
    '0x4cc5d4becb3e42b6',
    '0x597f299cfc657e2a',
    '0x5fcb6fab3ad6faec',
    '0x6c44198c4a475817',
].map((n) => BigInt(n)));
const SHA512_W_H = new Uint32Array(80);
const SHA512_W_L = new Uint32Array(80);
class SHA512 extends _sha2_js_1.SHA2 {
    constructor() {
        super(128, 64, 16, false);
        this.Ah = 1779033703 | 0;
        this.Al = 4089235720 | 0;
        this.Bh = 3144134277 | 0;
        this.Bl = 2227873595 | 0;
        this.Ch = 1013904242 | 0;
        this.Cl = 4271175723 | 0;
        this.Dh = 2773480762 | 0;
        this.Dl = 1595750129 | 0;
        this.Eh = 1359893119 | 0;
        this.El = 2917565137 | 0;
        this.Fh = 2600822924 | 0;
        this.Fl = 725511199 | 0;
        this.Gh = 528734635 | 0;
        this.Gl = 4215389547 | 0;
        this.Hh = 1541459225 | 0;
        this.Hl = 327033209 | 0;
    }

    get() {
        const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
        return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
    }

    set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
        this.Ah = Ah | 0;
        this.Al = Al | 0;
        this.Bh = Bh | 0;
        this.Bl = Bl | 0;
        this.Ch = Ch | 0;
        this.Cl = Cl | 0;
        this.Dh = Dh | 0;
        this.Dl = Dl | 0;
        this.Eh = Eh | 0;
        this.El = El | 0;
        this.Fh = Fh | 0;
        this.Fl = Fl | 0;
        this.Gh = Gh | 0;
        this.Gl = Gl | 0;
        this.Hh = Hh | 0;
        this.Hl = Hl | 0;
    }

    process(view, offset) {
        for (let i = 0; i < 16; i++, offset += 4) {
            SHA512_W_H[i] = view.getUint32(offset);
            SHA512_W_L[i] = view.getUint32(offset += 4);
        }
        for (let i = 16; i < 80; i++) {
            const W15h = SHA512_W_H[i - 15] | 0;
            const W15l = SHA512_W_L[i - 15] | 0;
            const s0h = _u64_js_1.default.rotrSH(W15h, W15l, 1) ^ _u64_js_1.default.rotrSH(W15h, W15l, 8) ^ _u64_js_1.default.shrSH(W15h, W15l, 7);
            const s0l = _u64_js_1.default.rotrSL(W15h, W15l, 1) ^ _u64_js_1.default.rotrSL(W15h, W15l, 8) ^ _u64_js_1.default.shrSL(W15h, W15l, 7);
            const W2h = SHA512_W_H[i - 2] | 0;
            const W2l = SHA512_W_L[i - 2] | 0;
            const s1h = _u64_js_1.default.rotrSH(W2h, W2l, 19) ^ _u64_js_1.default.rotrBH(W2h, W2l, 61) ^ _u64_js_1.default.shrSH(W2h, W2l, 6);
            const s1l = _u64_js_1.default.rotrSL(W2h, W2l, 19) ^ _u64_js_1.default.rotrBL(W2h, W2l, 61) ^ _u64_js_1.default.shrSL(W2h, W2l, 6);
            const SUMl = _u64_js_1.default.add4L(s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
            const SUMh = _u64_js_1.default.add4H(SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
            SHA512_W_H[i] = SUMh | 0;
            SHA512_W_L[i] = SUMl | 0;
        }
        let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
        for (let i = 0; i < 80; i++) {
            const sigma1h = _u64_js_1.default.rotrSH(Eh, El, 14) ^ _u64_js_1.default.rotrSH(Eh, El, 18) ^ _u64_js_1.default.rotrBH(Eh, El, 41);
            const sigma1l = _u64_js_1.default.rotrSL(Eh, El, 14) ^ _u64_js_1.default.rotrSL(Eh, El, 18) ^ _u64_js_1.default.rotrBL(Eh, El, 41);
            const CHIh = Eh & Fh ^ ~Eh & Gh;
            const CHIl = El & Fl ^ ~El & Gl;
            const T1ll = _u64_js_1.default.add5L(Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
            const T1h = _u64_js_1.default.add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
            const T1l = T1ll | 0;
            const sigma0h = _u64_js_1.default.rotrSH(Ah, Al, 28) ^ _u64_js_1.default.rotrBH(Ah, Al, 34) ^ _u64_js_1.default.rotrBH(Ah, Al, 39);
            const sigma0l = _u64_js_1.default.rotrSL(Ah, Al, 28) ^ _u64_js_1.default.rotrBL(Ah, Al, 34) ^ _u64_js_1.default.rotrBL(Ah, Al, 39);
            const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
            const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
            Hh = Gh | 0;
            Hl = Gl | 0;
            Gh = Fh | 0;
            Gl = Fl | 0;
            Fh = Eh | 0;
            Fl = El | 0;
            ({ h: Eh, l: El } = _u64_js_1.default.add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
            Dh = Ch | 0;
            Dl = Cl | 0;
            Ch = Bh | 0;
            Cl = Bl | 0;
            Bh = Ah | 0;
            Bl = Al | 0;
            const All = _u64_js_1.default.add3L(T1l, sigma0l, MAJl);
            Ah = _u64_js_1.default.add3H(All, T1h, sigma0h, MAJh);
            Al = All | 0;
        }
        ({ h: Ah, l: Al } = _u64_js_1.default.add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
        ({ h: Bh, l: Bl } = _u64_js_1.default.add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
        ({ h: Ch, l: Cl } = _u64_js_1.default.add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
        ({ h: Dh, l: Dl } = _u64_js_1.default.add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
        ({ h: Eh, l: El } = _u64_js_1.default.add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
        ({ h: Fh, l: Fl } = _u64_js_1.default.add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
        ({ h: Gh, l: Gl } = _u64_js_1.default.add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
        ({ h: Hh, l: Hl } = _u64_js_1.default.add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
        this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
    }

    roundClean() {
        SHA512_W_H.fill(0);
        SHA512_W_L.fill(0);
    }

    destroy() {
        this.buffer.fill(0);
        this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
}
sha512$5.SHA512 = SHA512;
class SHA512_256 extends SHA512 {
    constructor() {
        super();
        this.Ah = 573645204 | 0;
        this.Al = 4230739756 | 0;
        this.Bh = 2673172387 | 0;
        this.Bl = 3360449730 | 0;
        this.Ch = 596883563 | 0;
        this.Cl = 1867755857 | 0;
        this.Dh = 2520282905 | 0;
        this.Dl = 1497426621 | 0;
        this.Eh = 2519219938 | 0;
        this.El = 2827943907 | 0;
        this.Fh = 3193839141 | 0;
        this.Fl = 1401305490 | 0;
        this.Gh = 721525244 | 0;
        this.Gl = 746961066 | 0;
        this.Hh = 246885852 | 0;
        this.Hl = 2177182882 | 0;
        this.outputLen = 32;
    }
}
class SHA384 extends SHA512 {
    constructor() {
        super();
        this.Ah = 3418070365 | 0;
        this.Al = 3238371032 | 0;
        this.Bh = 1654270250 | 0;
        this.Bl = 914150663 | 0;
        this.Ch = 2438529370 | 0;
        this.Cl = 812702999 | 0;
        this.Dh = 355462360 | 0;
        this.Dl = 4144912697 | 0;
        this.Eh = 1731405415 | 0;
        this.El = 4290775857 | 0;
        this.Fh = 2394180231 | 0;
        this.Fl = 1750603025 | 0;
        this.Gh = 3675008525 | 0;
        this.Gl = 1694076839 | 0;
        this.Hh = 1203062813 | 0;
        this.Hl = 3204075428 | 0;
        this.outputLen = 48;
    }
}
sha512$5.sha512 = (0, utils_js_1$1.wrapConstructor)(() => new SHA512());
sha512$5.sha512_256 = (0, utils_js_1$1.wrapConstructor)(() => new SHA512_256());
sha512$5.sha384 = (0, utils_js_1$1.wrapConstructor)(() => new SHA384());
Object.defineProperty(hash$1, '__esModule', { value: true });
hash$1.sha512 = hash$1.sha256 = void 0;
const sha256_1 = sha256$5;
const sha512_1$1 = sha512$5;
const helpers_1$c = helpers;
const sha256$4 = (bytes2) => {
    const digest = sha256_1.sha256.create().update(bytes2).digest();
    return (0, helpers_1$c.bytesToHex)(digest);
};
hash$1.sha256 = sha256$4;
const sha512$4 = (bytes2) => {
    const digest = sha512_1$1.sha512.create().update(bytes2).digest();
    return (0, helpers_1$c.bytesToHex)(digest);
};
hash$1.sha512 = sha512$4;
Object.defineProperty(cell, '__esModule', { value: true });
cell.CellType = cell.Cell = void 0;
const mask_1 = mask;
const slice_1 = slice;
const helpers_1$b = helpers;
const numbers_1$1 = numbers;
const bits_1$1 = bits;
const hash_1$1 = hash$1;
const HASH_BITS = 256;
const DEPTH_BITS = 16;
let CellType;
(function (CellType2) {
    CellType2[CellType2['Ordinary'] = -1] = 'Ordinary';
    CellType2[CellType2['PrunedBranch'] = 1] = 'PrunedBranch';
    CellType2[CellType2['LibraryReference'] = 2] = 'LibraryReference';
    CellType2[CellType2['MerkleProof'] = 3] = 'MerkleProof';
    CellType2[CellType2['MerkleUpdate'] = 4] = 'MerkleUpdate';
}(CellType || (CellType = {})));
cell.CellType = CellType;
const validateOrdinary = (bits2, refs) => {
    if (bits2.length > 1023) throw new Error(`Ordinary cell can't has more than 1023 bits, got "${bits2.length}"`);
    if (refs.length > 4) throw new Error(`Ordinary cell can't has more than 4 refs, got "${refs.length}"`);
};
const validatePrunedBranch = (bits2, refs) => {
    const minSize = 8 + 8 + 1 * (HASH_BITS + DEPTH_BITS);
    if (bits2.length < minSize) {
        throw new Error(`Pruned Branch cell can't has less than (8 + 8 + 256 + 16) bits, got "${bits2.length}"`);
    }
    if (refs.length !== 0) {
        throw new Error(`Pruned Branch cell can't has refs, got "${refs.length}"`);
    }
    const type2 = (0, numbers_1$1.bitsToIntUint)(bits2.slice(0, 8), { type: 'int' });
    if (type2 !== CellType.PrunedBranch) {
        throw new Error(`Pruned Branch cell type must be exactly ${CellType.PrunedBranch}, got "${type2}"`);
    }
    const mask2 = new mask_1.Mask((0, numbers_1$1.bitsToIntUint)(bits2.slice(8, 16), { type: 'uint' }));
    if (mask2.level < 1 || mask2.level > 3) {
        throw new Error(`Pruned Branch cell level must be >= 1 and <= 3, got "${mask2.level}"`);
    }
    const { hashCount } = mask2.apply(mask2.level - 1);
    const size2 = 8 + 8 + hashCount * (HASH_BITS + DEPTH_BITS);
    if (bits2.length !== size2) {
        throw new Error(`Pruned Branch cell with level "${mask2.level}" must have exactly ${size2} bits, got "${bits2.length}"`);
    }
};
const validateLibraryReference = (bits2, refs) => {
    const size2 = 8 + HASH_BITS;
    if (bits2.length !== size2) {
        throw new Error(`Library Reference cell must have exactly (8 + 256) bits, got "${bits2.length}"`);
    }
    if (refs.length !== 0) {
        throw new Error(`Library Reference cell can't has refs, got "${refs.length}"`);
    }
    const type2 = (0, numbers_1$1.bitsToIntUint)(bits2.slice(0, 8), { type: 'int' });
    if (type2 !== CellType.LibraryReference) {
        throw new Error(`Library Reference cell type must be exactly ${CellType.LibraryReference}, got "${type2}"`);
    }
};
const validateMerkleProof = (bits2, refs) => {
    const size2 = 8 + HASH_BITS + DEPTH_BITS;
    if (bits2.length !== size2) {
        throw new Error(`Merkle Proof cell must have exactly (8 + 256 + 16) bits, got "${bits2.length}"`);
    }
    if (refs.length !== 1) {
        throw new Error(`Merkle Proof cell must have exactly 1 ref, got "${refs.length}"`);
    }
    const type2 = (0, numbers_1$1.bitsToIntUint)(bits2.slice(0, 8), { type: 'int' });
    if (type2 !== CellType.MerkleProof) {
        throw new Error(`Merkle Proof cell type must be exactly ${CellType.MerkleProof}, got "${type2}"`);
    }
    const data2 = Array.from(bits2.slice(8));
    const proofHash = (0, helpers_1$b.bitsToHex)(data2.splice(0, HASH_BITS));
    const proofDepth = (0, numbers_1$1.bitsToIntUint)(data2.splice(0, DEPTH_BITS), { type: 'uint' });
    const refHash = refs[0].hash(0);
    const refDepth = refs[0].depth(0);
    if (proofHash !== refHash) {
        throw new Error(`Merkle Proof cell ref hash must be exactly "${proofHash}", got "${refHash}"`);
    }
    if (proofDepth !== refDepth) {
        throw new Error(`Merkle Proof cell ref depth must be exactly "${proofDepth}", got "${refDepth}"`);
    }
};
const validateMerkleUpdate = (bits2, refs) => {
    const size2 = 8 + 2 * (HASH_BITS + DEPTH_BITS);
    if (bits2.length !== size2) {
        throw new Error(`Merkle Update cell must have exactly (8 + (2 * (256 + 16))) bits, got "${bits2.length}"`);
    }
    if (refs.length !== 2) {
        throw new Error(`Merkle Update cell must have exactly 2 refs, got "${refs.length}"`);
    }
    const type2 = (0, numbers_1$1.bitsToIntUint)(bits2.slice(0, 8), { type: 'int' });
    if (type2 !== CellType.MerkleUpdate) {
        throw new Error(`Merkle Update cell type must be exactly ${CellType.MerkleUpdate}, got "${type2}"`);
    }
    const data2 = Array.from(bits2.slice(8));
    refs.forEach((ref, i) => {
        const index = refs.length - i - 1;
        const proofHash = (0, helpers_1$b.bitsToHex)(data2.splice(0, HASH_BITS));
        const proofDepth = (0, numbers_1$1.bitsToIntUint)(data2.splice(HASH_BITS * index, DEPTH_BITS), { type: 'uint' });
        const refHash = ref.hash(0);
        const refDepth = ref.depth(0);
        if (proofHash !== refHash) {
            throw new Error(`Merkle Update cell ref #${i} hash must be exactly "${proofHash}", got "${refHash}"`);
        }
        if (proofDepth !== refDepth) {
            throw Error(`Merkle Update cell ref #${i} depth must be exactly "${proofDepth}", got "${refDepth}"`);
        }
    });
};
const getMapper = (type2) => {
    const map2 = /* @__PURE__ */ new Map([
        [CellType.Ordinary, {
            validate: validateOrdinary,
            mask: (_b, r) => new mask_1.Mask(r.reduce((acc, el) => acc | el.mask.value, 0)),
        }],
        [CellType.PrunedBranch, {
            validate: validatePrunedBranch,
            mask: (b) => new mask_1.Mask((0, numbers_1$1.bitsToIntUint)(b.slice(0, 8), { type: 'uint' })),
        }],
        [CellType.LibraryReference, {
            validate: validateLibraryReference,
            mask: () => new mask_1.Mask(0),
        }],
        [CellType.MerkleProof, {
            validate: validateMerkleProof,
            mask: (_b, r) => new mask_1.Mask(r[0].mask.value >> 1),
        }],
        [CellType.MerkleUpdate, {
            validate: validateMerkleUpdate,
            mask: (_b, r) => new mask_1.Mask((r[0].mask.value | r[1].mask.value) >> 1),
        }],
    ]);
    const result = map2.get(type2);
    if (result === void 0) {
        throw new Error('Unknown cell type');
    }
    return result;
};
class Cell {
    constructor(options) {
        this.hashes = [];
        this.depths = [];
        const { bits: bits2 = [], refs = [], type: type2 = CellType.Ordinary } = options || {};
        const { validate, mask: mask2 } = getMapper(type2);
        validate(bits2, refs);
        this._mask = mask2(bits2, refs);
        this._type = type2;
        this._bits = bits2;
        this._refs = refs;
        this.initialize();
    }

    get bits() {
        return Array.from(this._bits);
    }

    get refs() {
        return Array.from(this._refs);
    }

    get mask() {
        return this._mask;
    }

    get type() {
        return this._type;
    }

    get exotic() {
        return this._type !== CellType.Ordinary;
    }

    initialize() {
        const isMerkle = [CellType.MerkleProof, CellType.MerkleUpdate].includes(this.type);
        const isPrunedBranch = this.type === CellType.PrunedBranch;
        const hashIndexOffset = isPrunedBranch ? this.mask.hashCount - 1 : 0;
        for (let levelIndex = 0, hashIndex = 0; levelIndex <= this.mask.level; levelIndex++) {
            if (hashIndex < hashIndexOffset) {
                hashIndex++;
                continue;
            }
            if (hashIndex === hashIndexOffset && levelIndex !== 0 && !isPrunedBranch || hashIndex !== hashIndexOffset && levelIndex === 0 && isPrunedBranch) {
                throw new Error("Can't deserialize cell");
            }
            const refLevel = levelIndex + Number(isMerkle);
            const refsDescriptor = this.getRefsDescriptor(this.mask.apply(levelIndex));
            const bitsDescriptor = this.getBitsDescriptor();
            const data2 = hashIndex !== hashIndexOffset ? (0, helpers_1$b.hexToBits)(this.hashes[hashIndex - hashIndexOffset - 1]) : this.getAugmentedBits();
            const { depthRepr, hashRepr, depth } = this._refs.reduce((acc, ref) => {
                const refDepth = ref.depth(refLevel);
                const refHash = ref.hash(refLevel);
                acc.depthRepr = acc.depthRepr.concat(this.getDepthDescriptor(refDepth));
                acc.hashRepr = acc.hashRepr.concat((0, helpers_1$b.hexToBits)(refHash));
                acc.depth = Math.max(acc.depth, refDepth);
                return acc;
            }, { depthRepr: [], hashRepr: [], depth: 0 });
            const representation = [].concat(refsDescriptor, bitsDescriptor, data2, depthRepr, hashRepr);
            if (this._refs.length && depth >= 1024) {
                throw new Error("Cell depth can't be more than 1024");
            }
            const dest = hashIndex - hashIndexOffset;
            this.depths[dest] = this._refs.length ? depth + 1 : depth;
            this.hashes[dest] = (0, hash_1$1.sha256)((0, helpers_1$b.bitsToBytes)(representation));
            hashIndex++;
        }
    }

    getDepthDescriptor(depth) {
        const descriptor = Uint8Array.from([Math.floor(depth / 256), depth % 256]);
        return (0, helpers_1$b.bytesToBits)(descriptor);
    }

    getRefsDescriptor(mask2) {
        const value = this._refs.length + Number(this.exotic) * 8 + (mask2 ? mask2.value : this.mask.value) * 32;
        const descriptor = Uint8Array.from([value]);
        return (0, helpers_1$b.bytesToBits)(descriptor);
    }

    getBitsDescriptor() {
        const value = Math.ceil(this._bits.length / 8) + Math.floor(this._bits.length / 8);
        const descriptor = Uint8Array.from([value]);
        return (0, helpers_1$b.bytesToBits)(descriptor);
    }

    getAugmentedBits() {
        return (0, bits_1$1.augment)(this._bits);
    }

    hash(level = 3) {
        if (this.type !== CellType.PrunedBranch) {
            return this.hashes[this.mask.apply(level).hashIndex];
        }
        const { hashIndex } = this.mask.apply(level);
        const { hashIndex: thisHashIndex } = this.mask;
        const skip = 16 + hashIndex * HASH_BITS;
        return hashIndex !== thisHashIndex ? (0, helpers_1$b.bitsToHex)(this._bits.slice(skip, skip + HASH_BITS)) : this.hashes[0];
    }

    depth(level = 3) {
        if (this.type !== CellType.PrunedBranch) {
            return this.depths[this.mask.apply(level).hashIndex];
        }
        const { hashIndex } = this.mask.apply(level);
        const { hashIndex: thisHashIndex } = this.mask;
        const skip = 16 + thisHashIndex * HASH_BITS + hashIndex * DEPTH_BITS;
        return hashIndex !== thisHashIndex ? (0, numbers_1$1.bitsToIntUint)(this._bits.slice(skip, skip + DEPTH_BITS), { type: 'uint' }) : this.depths[0];
    }

    slice() {
        return slice_1.Slice.parse(this);
    }

    print(indent = 1, size2 = 0) {
        const bits2 = Array.from(this._bits);
        const areDivisible = bits2.length % 4 === 0;
        const augmented = !areDivisible ? (0, bits_1$1.augment)(bits2, 4) : bits2;
        const fiftHex = `${(0, helpers_1$b.bitsToHex)(augmented).toUpperCase()}${!areDivisible ? '_' : ''}`;
        const output2 = [`${' '.repeat(indent * size2)}x{${fiftHex}}
`];
        this._refs.forEach((ref) => output2.push(ref.print(indent, size2 + 1)));
        return output2.join('');
    }

    eq(cell2) {
        return this.hash() === cell2.hash();
    }
}
cell.Cell = Cell;
Object.defineProperty(builder, '__esModule', { value: true });
builder.Builder = void 0;
const cell_1$1 = cell;
const helpers_1$a = helpers;
class Builder {
    constructor(size2 = 1023) {
        this._size = size2;
        this._bits = [];
        this._refs = [];
    }

    checkBitsOverflow(size2) {
        if (size2 > this.remainder) {
            throw new Error(`Builder: bits overflow. Can't add ${size2} bits. Only ${this.remainder} bits left.`);
        }
    }

    checkRefsOverflow(size2) {
        if (size2 > 4 - this._refs.length) {
            throw new Error(`Builder: refs overflow. Can't add ${size2} refs. Only ${4 - this._refs.length} refs left.`);
        }
    }

    storeNumber(value, size2) {
        const bits2 = Array.from({ length: size2 }).map((_el, i) => Number((value >> BigInt(i) & 1n) === 1n)).reverse();
        this.storeBits(bits2);
        return this;
    }

    get size() {
        return this._size;
    }

    get bits() {
        return Array.from(this._bits);
    }

    get bytes() {
        return (0, helpers_1$a.bitsToBytes)(this._bits);
    }

    get refs() {
        return Array.from(this._refs);
    }

    get remainder() {
        return this._size - this._bits.length;
    }

    storeSlice(slice3) {
        const { bits: bits2, refs } = slice3;
        this.checkBitsOverflow(bits2.length);
        this.checkRefsOverflow(refs.length);
        this.storeBits(bits2);
        refs.forEach((ref) => this.storeRef(ref));
        return this;
    }

    storeRef(ref) {
        this.checkRefsOverflow(1);
        this._refs.push(ref);
        return this;
    }

    storeRefs(refs) {
        this.checkRefsOverflow(refs.length);
        this._refs.push(...refs);
        return this;
    }

    storeBit(bit) {
        if (bit !== 0 && bit !== 1) {
            throw new Error("Builder: can't store bit, because it's type not Number or value doesn't equals 0 nor 1.");
        }
        this.checkBitsOverflow(1);
        this._bits.push(bit);
        return this;
    }

    storeBits(bits2) {
        this.checkBitsOverflow(bits2.length);
        this._bits = this._bits.concat(bits2);
        return this;
    }

    storeInt(value, size2) {
        const int = BigInt(value);
        const intBits = 1n << BigInt(size2) - 1n;
        if (int < -intBits || int >= intBits) {
            throw new Error("Builder: can't store an Int, because its value allocates more space than provided.");
        }
        this.storeNumber(int, size2);
        return this;
    }

    storeUint(value, size2) {
        const uint = BigInt(value);
        if (uint < 0 || uint >= 1n << BigInt(size2)) {
            throw new Error("Builder: can't store an UInt, because its value allocates more space than provided.");
        }
        this.storeNumber(uint, size2);
        return this;
    }

    storeVarInt(value, length) {
        const int = BigInt(value);
        const size2 = Math.ceil(Math.log2(length));
        const sizeBytes = Math.ceil(int.toString(2).length / 8);
        const sizeBits = sizeBytes * 8;
        this.checkBitsOverflow(size2 + sizeBits);
        return int === 0n ? this.storeUint(0, size2) : this.storeUint(sizeBytes, size2).storeInt(value, sizeBits);
    }

    storeVarUint(value, length) {
        const uint = BigInt(value);
        const size2 = Math.ceil(Math.log2(length));
        const sizeBytes = Math.ceil(uint.toString(2).length / 8);
        const sizeBits = sizeBytes * 8;
        this.checkBitsOverflow(size2 + sizeBits);
        return uint === 0n ? this.storeUint(0, size2) : this.storeUint(sizeBytes, size2).storeUint(value, sizeBits);
    }

    storeBytes(value) {
        this.checkBitsOverflow(value.length * 8);
        Uint8Array.from(value).forEach((byte) => this.storeUint(byte, 8));
        return this;
    }

    storeString(value) {
        const bytes2 = (0, helpers_1$a.stringToBytes)(value);
        this.storeBytes(bytes2);
        return this;
    }

    storeAddress(address2) {
        if (address2 === null) {
            this.storeBits([0, 0]);
            return this;
        }
        const anycast = 0;
        const addressBitsSize = 2 + 1 + 8 + 256;
        this.checkBitsOverflow(addressBitsSize);
        this.storeBits([1, 0]);
        this.storeUint(anycast, 1);
        this.storeInt(address2.workchain, 8);
        this.storeBytes(address2.hash);
        return this;
    }

    storeCoins(coins2) {
        if (coins2.isNegative()) {
            throw new Error("Builder: coins value can't be negative.");
        }
        const nano = BigInt(coins2.toNano());
        this.storeVarUint(nano, 16);
        return this;
    }

    storeDict(hashmap2) {
        const slice3 = hashmap2.cell().slice();
        this.storeSlice(slice3);
        return this;
    }

    clone() {
        const data2 = new Builder(this._size);
        data2.storeBits(this.bits);
        this.refs.forEach((ref) => data2.storeRef(ref));
        return data2;
    }

    cell(type2 = cell_1$1.CellType.Ordinary) {
        const cell2 = new cell_1$1.Cell({
            bits: this.bits,
            refs: this.refs,
            type: type2,
        });
        return cell2;
    }
}
builder.Builder = Builder;
const serializer = {};
Object.defineProperty(serializer, '__esModule', { value: true });
serializer.deserializeFift = serializer.deserialize = serializer.serialize = void 0;
const builder_1 = builder;
const cell_1 = cell;
const helpers_1$9 = helpers;
const bits_1 = bits;
const numbers_1 = numbers;
const checksum_1 = checksum;
const REACH_BOC_MAGIC_PREFIX = (0, helpers_1$9.hexToBytes)('B5EE9C72');
const LEAN_BOC_MAGIC_PREFIX = (0, helpers_1$9.hexToBytes)('68FF65F3');
const LEAN_BOC_MAGIC_PREFIX_CRC = (0, helpers_1$9.hexToBytes)('ACC3A728');
const deserializeFift = (data2) => {
    if (!data2) {
        throw new Error("Can't deserialize. Empty fift hex.");
    }
    const re = /((\s*)x{([0-9a-zA-Z_]+)}\n?)/gmi;
    const matches = [...data2.matchAll(re)];
    if (!matches.length) {
        throw new Error("Can't deserialize. Bad fift hex.");
    }
    const parseFiftHex = (fift) => {
        if (fift === '_') return [];
        const bits2 = fift.split('').map((el) => (el === '_' ? el : (0, helpers_1$9.hexToBits)(el).join(''))).join('').replace(/1[0]*_$/, '')
            .split('')
            .map((b) => parseInt(b, 10));
        return bits2;
    };
    if (matches.length === 1) {
        return [new cell_1.Cell({ bits: parseFiftHex(matches[0][3]) })];
    }
    const isLastNested = (stack2, indent) => {
        const lastStackIndent = stack2[stack2.length - 1].indent;
        return lastStackIndent !== 0 && lastStackIndent >= indent;
    };
    const stack = matches.reduce((acc, el, i) => {
        const [, , spaces, fift] = el;
        const isLast = i === matches.length - 1;
        const indent = spaces.length;
        const bits2 = parseFiftHex(fift);
        const builder2 = new builder_1.Builder().storeBits(bits2);
        while (acc.length && isLastNested(acc, indent)) {
            const { builder: b } = acc.pop();
            acc[acc.length - 1].builder.storeRef(b.cell());
        }
        if (isLast) {
            acc[acc.length - 1].builder.storeRef(builder2.cell());
        } else {
            acc.push({ indent, builder: builder2 });
        }
        return acc;
    }, []);
    return stack.map((el) => el.builder.cell());
};
serializer.deserializeFift = deserializeFift;
const deserializeHeader = (bytes2) => {
    if (bytes2.length < 4 + 1) {
        throw new Error('Not enough bytes for magic prefix');
    }
    const crcbytes = Uint8Array.from(bytes2.slice(0, bytes2.length - 4));
    const prefix = bytes2.splice(0, 4);
    const [flags_byte] = bytes2.splice(0, 1);
    const header = {
        has_index: true,
        hash_crc32: null,
        has_cache_bits: false,
        flags: 0,
        size_bytes: flags_byte,
        offset_bytes: null,
        cells_num: null,
        roots_num: null,
        absent_num: null,
        tot_cells_size: null,
        root_list: null,
        cells_data: null,
    };
    if ((0, helpers_1$9.bytesCompare)(prefix, REACH_BOC_MAGIC_PREFIX)) {
        header.has_index = (flags_byte & 128) !== 0;
        header.has_cache_bits = (flags_byte & 32) !== 0;
        header.flags = (flags_byte & 16) * 2 + (flags_byte & 8);
        header.size_bytes = flags_byte % 8;
        header.hash_crc32 = flags_byte & 64;
    } else if ((0, helpers_1$9.bytesCompare)(prefix, LEAN_BOC_MAGIC_PREFIX)) {
        header.hash_crc32 = 0;
    } else if ((0, helpers_1$9.bytesCompare)(prefix, LEAN_BOC_MAGIC_PREFIX_CRC)) {
        header.hash_crc32 = 1;
    } else {
        throw new Error('Bad magic prefix');
    }
    if (bytes2.length < 1 + 5 * header.size_bytes) {
        throw new Error('Not enough bytes for encoding cells counters');
    }
    const [offset_bytes] = bytes2.splice(0, 1);
    header.cells_num = (0, helpers_1$9.bytesToUint)(bytes2.splice(0, header.size_bytes));
    header.roots_num = (0, helpers_1$9.bytesToUint)(bytes2.splice(0, header.size_bytes));
    header.absent_num = (0, helpers_1$9.bytesToUint)(bytes2.splice(0, header.size_bytes));
    header.tot_cells_size = (0, helpers_1$9.bytesToUint)(bytes2.splice(0, offset_bytes));
    header.offset_bytes = offset_bytes;
    if (bytes2.length < header.roots_num * header.size_bytes) {
        throw new Error('Not enough bytes for encoding root cells hashes');
    }
    header.root_list = [...Array(header.roots_num)].reduce((acc) => {
        const refIndex = (0, helpers_1$9.bytesToUint)(bytes2.splice(0, header.size_bytes));
        return acc.concat([refIndex]);
    }, []);
    if (header.has_index) {
        if (bytes2.length < header.offset_bytes * header.cells_num) {
            throw new Error('Not enough bytes for index encoding');
        }
        Object.keys([...Array(header.cells_num)]).forEach(() => bytes2.splice(0, header.offset_bytes));
    }
    if (bytes2.length < header.tot_cells_size) {
        throw new Error('Not enough bytes for cells data');
    }
    header.cells_data = bytes2.splice(0, header.tot_cells_size);
    if (header.hash_crc32) {
        if (bytes2.length < 4) {
            throw new Error('Not enough bytes for crc32c hashsum');
        }
        const result = (0, checksum_1.crc32cBytesLe)(crcbytes);
        if (!(0, helpers_1$9.bytesCompare)(result, bytes2.splice(0, 4))) {
            throw new Error('Crc32c hashsum mismatch');
        }
    }
    if (bytes2.length) {
        throw new Error('Too much bytes in BoC serialization');
    }
    return header;
};
const deserializeCell = (remainder, refIndexSize) => {
    if (remainder.length < 2) {
        throw new Error('BoC not enough bytes to encode cell descriptors');
    }
    const [refsDescriptor] = remainder.splice(0, 1);
    const level = refsDescriptor >> 5;
    const totalRefs = refsDescriptor & 7;
    const hasHashes = (refsDescriptor & 16) !== 0;
    const isExotic = (refsDescriptor & 8) !== 0;
    const isAbsent = totalRefs === 7 && hasHashes;
    if (isAbsent) {
        throw new Error('BoC can\'t deserialize absent cell');
    }
    if (totalRefs > 4) {
        throw new Error(`BoC cell can't has more than 4 refs ${totalRefs}`);
    }
    const [bitsDescriptor] = remainder.splice(0, 1);
    const isAugmented = (bitsDescriptor & 1) !== 0;
    const dataSize = (bitsDescriptor >> 1) + Number(isAugmented);
    const hashesSize = hasHashes ? (level + 1) * 32 : 0;
    const depthSize = hasHashes ? (level + 1) * 2 : 0;
    if (remainder.length < hashesSize + depthSize + dataSize + refIndexSize * totalRefs) {
        throw new Error('BoC not enough bytes to encode cell data');
    }
    if (hasHashes) {
        remainder.splice(0, hashesSize + depthSize);
    }
    const bits2 = isAugmented ? (0, bits_1.rollback)((0, helpers_1$9.bytesToBits)(remainder.splice(0, dataSize))) : (0, helpers_1$9.bytesToBits)(remainder.splice(0, dataSize));
    if (isExotic && bits2.length < 8) {
        throw new Error('BoC not enough bytes for an exotic cell type');
    }
    const type2 = isExotic ? (0, numbers_1.bitsToIntUint)(bits2.slice(0, 8), { type: 'int' }) : cell_1.CellType.Ordinary;
    if (isExotic && type2 === cell_1.CellType.Ordinary) {
        throw new Error('BoC an exotic cell can\'t be of ordinary type');
    }
    const pointer = {
        type: type2,
        builder: new builder_1.Builder(bits2.length).storeBits(bits2),
        refs: Array.from({ length: totalRefs }).map(() => (0, helpers_1$9.bytesToUint)(remainder.splice(0, refIndexSize))),
    };
    return {
        pointer,
        remainder,
    };
};
const deserialize = (data2, checkMerkleProofs) => {
    let hasMerkleProofs = false;
    const bytes2 = Array.from(data2);
    const pointers = [];
    const { cells_num, size_bytes, cells_data, root_list } = deserializeHeader(bytes2);
    for (let i = 0, remainder = cells_data; i < cells_num; i += 1) {
        const deserialized = deserializeCell(remainder, size_bytes);
        remainder = deserialized.remainder;
        pointers.push(deserialized.pointer);
    }
    Array.from({ length: pointers.length }).forEach((_el, i) => {
        const pointerIndex = pointers.length - i - 1;
        const pointer = pointers[pointerIndex];
        const { builder: cellBuilder, type: cellType } = pointer;
        pointer.refs.forEach((refIndex) => {
            const { builder: refBuilder, type: refType } = pointers[refIndex];
            if (refIndex < pointerIndex) {
                throw new Error('Topological order is broken');
            }
            if (refType === cell_1.CellType.MerkleProof || refType === cell_1.CellType.MerkleUpdate) {
                hasMerkleProofs = true;
            }
            cellBuilder.storeRef(refBuilder.cell(refType));
        });
        if (cellType === cell_1.CellType.MerkleProof || cellType === cell_1.CellType.MerkleUpdate) {
            hasMerkleProofs = true;
        }
        pointer.cell = cellBuilder.cell(cellType);
    });
    if (checkMerkleProofs && !hasMerkleProofs) {
        throw new Error('BOC does not contain Merkle Proofs');
    }
    return root_list.map((refIndex) => pointers[refIndex].cell);
};
serializer.deserialize = deserialize;
const depthFirstSort = (root) => {
    const stack = [{ cell: new cell_1.Cell({ refs: root }), children: root.length, scanned: 0 }];
    const cells = [];
    const hashIndexes = /* @__PURE__ */ new Map();
    const process = (node) => {
        const ref = node.cell.refs[node.scanned++];
        const hash2 = ref.hash();
        const index = hashIndexes.get(hash2);
        const length = index !== void 0 ? cells.push(cells.splice(index, 1, null)[0]) : cells.push({ cell: ref, hash: hash2 });
        stack.push({ cell: ref, children: ref.refs.length, scanned: 0 });
        hashIndexes.set(hash2, length - 1);
    };
    while (stack.length) {
        let current = stack[stack.length - 1];
        if (current.children !== current.scanned) {
            process(current);
        } else {
            while (stack.length && current && current.children === current.scanned) {
                stack.pop();
                current = stack[stack.length - 1];
            }
            if (current !== void 0) {
                process(current);
            }
        }
    }
    const result = cells.filter((el) => el !== null).reduce((acc, { cell: cell2, hash: hash2 }, i) => {
        acc.cells.push(cell2);
        acc.hashmap.set(hash2, i);
        return acc;
    }, { cells: [], hashmap: /* @__PURE__ */ new Map() });
    return result;
};
const breadthFirstSort = (root) => {
    const stack = [...root];
    const cells = root.map((el) => ({ cell: el, hash: el.hash() }));
    const hashIndexes = new Map(cells.map((el, i) => [el.hash, i]));
    const process = (node) => {
        const hash2 = node.hash();
        const index = hashIndexes.get(hash2);
        const length = index !== void 0 ? cells.push(cells.splice(index, 1, null)[0]) : cells.push({ cell: node, hash: hash2 });
        stack.push(node);
        hashIndexes.set(hash2, length - 1);
    };
    while (stack.length) {
        const { length } = stack;
        stack.forEach((node) => {
            node.refs.forEach((ref) => process(ref));
        });
        stack.splice(0, length);
    }
    const result = cells.filter((el) => el !== null).reduce((acc, { cell: cell2, hash: hash2 }, i) => {
        acc.cells.push(cell2);
        acc.hashmap.set(hash2, i);
        return acc;
    }, { cells: [], hashmap: /* @__PURE__ */ new Map() });
    return result;
};
const serializeCell = (cell2, hashmap2, refIndexSize) => {
    const representation = [].concat(cell2.getRefsDescriptor(), cell2.getBitsDescriptor(), cell2.getAugmentedBits());
    const serialized = cell2.refs.reduce((acc, ref) => {
        const refIndex = hashmap2.get(ref.hash());
        const bits2 = Array.from({ length: refIndexSize }).map((_el, i) => Number((refIndex >> i & 1) === 1)).reverse();
        return acc.concat(bits2);
    }, representation);
    return serialized;
};
const serialize = (root, options = {}) => {
    const { has_index = false, has_cache_bits = false, hash_crc32 = true, topological_order = 'breadth-first', flags = 0 } = options;
    const { cells: cells_list, hashmap: hashmap2 } = topological_order === 'breadth-first' ? breadthFirstSort(root) : depthFirstSort(root);
    const cells_num = cells_list.length;
    const size2 = cells_num.toString(2).length;
    const size_bytes = Math.max(Math.ceil(size2 / 8), 1);
    const [cells_bits, size_index] = cells_list.reduce((acc, cell2) => {
        const bits2 = serializeCell(cell2, hashmap2, size_bytes * 8);
        acc[0] = acc[0].concat(bits2);
        acc[1].push(bits2.length / 8);
        return acc;
    }, [[], []]);
    const full_size = cells_bits.length / 8;
    const offset_bits = full_size.toString(2).length;
    const offset_bytes = Math.max(Math.ceil(offset_bits / 8), 1);
    const builder_size = 32 + 3 + 2 + 3 + 8 + cells_bits.length + size_bytes * 8 * 4 + offset_bytes * 8 + (has_index ? cells_list.length * (offset_bytes * 8) : 0);
    const result = new builder_1.Builder(builder_size);
    result.storeBytes(REACH_BOC_MAGIC_PREFIX).storeBit(Number(has_index)).storeBit(Number(hash_crc32)).storeBit(Number(has_cache_bits))
        .storeUint(flags, 2)
        .storeUint(size_bytes, 3)
        .storeUint(offset_bytes, 8)
        .storeUint(cells_num, size_bytes * 8)
        .storeUint(root.length, size_bytes * 8)
        .storeUint(0, size_bytes * 8)
        .storeUint(full_size, offset_bytes * 8)
        .storeUint(0, size_bytes * 8);
    if (has_index) {
        cells_list.forEach((_2, index) => {
            result.storeUint(size_index[index], offset_bytes * 8);
        });
    }
    const augmentedBits = (0, bits_1.augment)(result.storeBits(cells_bits).bits);
    const bytes2 = (0, helpers_1$9.bitsToBytes)(augmentedBits);
    if (hash_crc32) {
        const hashsum = (0, checksum_1.crc32cBytesLe)(bytes2);
        return new Uint8Array([...bytes2, ...hashsum]);
    }
    return bytes2;
};
serializer.serialize = serialize;
(function (exports) {
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.Builder = exports.Slice = exports.HashmapE = exports.Hashmap = exports.CellType = exports.Cell = exports.Mask = exports.BOC = void 0;
    const builder_12 = builder;
    Object.defineProperty(exports, 'Builder', { enumerable: true,
        get() {
            return builder_12.Builder;
        } });
    const slice_12 = slice;
    Object.defineProperty(exports, 'Slice', { enumerable: true,
        get() {
            return slice_12.Slice;
        } });
    const mask_12 = mask;
    Object.defineProperty(exports, 'Mask', { enumerable: true,
        get() {
            return mask_12.Mask;
        } });
    const cell_12 = cell;
    Object.defineProperty(exports, 'Cell', { enumerable: true,
        get() {
            return cell_12.Cell;
        } });
    Object.defineProperty(exports, 'CellType', { enumerable: true,
        get() {
            return cell_12.CellType;
        } });
    const hashmap_12 = hashmap;
    Object.defineProperty(exports, 'Hashmap', { enumerable: true,
        get() {
            return hashmap_12.Hashmap;
        } });
    Object.defineProperty(exports, 'HashmapE', { enumerable: true,
        get() {
            return hashmap_12.HashmapE;
        } });
    const helpers_12 = helpers;
    const serializer_1 = serializer;
    class BOC {
        static isHex(data2) {
            const re = /^[a-fA-F0-9]+$/;
            return typeof data2 === 'string' && re.test(data2);
        }

        static isBase64(data2) {
            const re = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;
            return typeof data2 === 'string' && re.test(data2);
        }

        static isFift(data2) {
            const re = /^x\{/;
            return typeof data2 === 'string' && re.test(data2);
        }

        static isBytes(data2) {
            return ArrayBuffer.isView(data2);
        }

        static from(data2, checkMerkleProofs = false) {
            if (BOC.isBytes(data2)) {
                return (0, serializer_1.deserialize)(data2, checkMerkleProofs);
            }
            const value = data2.trim();
            if (BOC.isFift(value)) {
                if (checkMerkleProofs) {
                    throw new Error('BOC: cheking Merkle Proofs is not currently implemented for fift hex');
                }
                return (0, serializer_1.deserializeFift)(value);
            }
            if (BOC.isHex(value)) {
                return (0, serializer_1.deserialize)((0, helpers_12.hexToBytes)(value), checkMerkleProofs);
            }
            if (BOC.isBase64(value)) {
                return (0, serializer_1.deserialize)((0, helpers_12.base64ToBytes)(value), checkMerkleProofs);
            }
            throw new Error("BOC: can't deserialize. Bad data.");
        }

        static fromStandard(data2, checkMerkleProofs = false) {
            const cells = BOC.from(data2, checkMerkleProofs);
            if (cells.length !== 1) {
                throw new Error(`BOC: standard BOC consists of only 1 root cell. Got ${cells.length}.`);
            }
            return cells[0];
        }

        static toBytes(cells, options) {
            if (cells.length === 0 || cells.length > 4) {
                throw new Error('BOC: root cells length must be from 1 to 4');
            }
            return (0, serializer_1.serialize)(cells, options);
        }

        static toBytesStandard(cell2, options) {
            return BOC.toBytes([cell2], options);
        }

        static toBase64(cells, options) {
            const bytes2 = BOC.toBytes(cells, options);
            return (0, helpers_12.bytesToBase64)(bytes2);
        }

        static toBase64Standard(cell2, options) {
            return BOC.toBase64([cell2], options);
        }

        static toFiftHex(cells) {
            const fift = cells.map((cell2) => cell2.print());
            return fift.join('\n');
        }

        static toFiftHexStandard(cell2) {
            return BOC.toFiftHex([cell2]);
        }

        static toHex(cells, options) {
            const bytes2 = BOC.toBytes(cells, options);
            return (0, helpers_12.bytesToHex)(bytes2);
        }

        static toHexStandard(cell2, options) {
            return BOC.toHex([cell2], options);
        }
    }
    exports.BOC = BOC;
}(boc));
const crypto$1 = {};
const mnemonicBip39 = {};
const require$$0$3 = [
    'abandon',
    'ability',
    'able',
    'about',
    'above',
    'absent',
    'absorb',
    'abstract',
    'absurd',
    'abuse',
    'access',
    'accident',
    'account',
    'accuse',
    'achieve',
    'acid',
    'acoustic',
    'acquire',
    'across',
    'act',
    'action',
    'actor',
    'actress',
    'actual',
    'adapt',
    'add',
    'addict',
    'address',
    'adjust',
    'admit',
    'adult',
    'advance',
    'advice',
    'aerobic',
    'affair',
    'afford',
    'afraid',
    'again',
    'age',
    'agent',
    'agree',
    'ahead',
    'aim',
    'air',
    'airport',
    'aisle',
    'alarm',
    'album',
    'alcohol',
    'alert',
    'alien',
    'all',
    'alley',
    'allow',
    'almost',
    'alone',
    'alpha',
    'already',
    'also',
    'alter',
    'always',
    'amateur',
    'amazing',
    'among',
    'amount',
    'amused',
    'analyst',
    'anchor',
    'ancient',
    'anger',
    'angle',
    'angry',
    'animal',
    'ankle',
    'announce',
    'annual',
    'another',
    'answer',
    'antenna',
    'antique',
    'anxiety',
    'any',
    'apart',
    'apology',
    'appear',
    'apple',
    'approve',
    'april',
    'arch',
    'arctic',
    'area',
    'arena',
    'argue',
    'arm',
    'armed',
    'armor',
    'army',
    'around',
    'arrange',
    'arrest',
    'arrive',
    'arrow',
    'art',
    'artefact',
    'artist',
    'artwork',
    'ask',
    'aspect',
    'assault',
    'asset',
    'assist',
    'assume',
    'asthma',
    'athlete',
    'atom',
    'attack',
    'attend',
    'attitude',
    'attract',
    'auction',
    'audit',
    'august',
    'aunt',
    'author',
    'auto',
    'autumn',
    'average',
    'avocado',
    'avoid',
    'awake',
    'aware',
    'away',
    'awesome',
    'awful',
    'awkward',
    'axis',
    'baby',
    'bachelor',
    'bacon',
    'badge',
    'bag',
    'balance',
    'balcony',
    'ball',
    'bamboo',
    'banana',
    'banner',
    'bar',
    'barely',
    'bargain',
    'barrel',
    'base',
    'basic',
    'basket',
    'battle',
    'beach',
    'bean',
    'beauty',
    'because',
    'become',
    'beef',
    'before',
    'begin',
    'behave',
    'behind',
    'believe',
    'below',
    'belt',
    'bench',
    'benefit',
    'best',
    'betray',
    'better',
    'between',
    'beyond',
    'bicycle',
    'bid',
    'bike',
    'bind',
    'biology',
    'bird',
    'birth',
    'bitter',
    'black',
    'blade',
    'blame',
    'blanket',
    'blast',
    'bleak',
    'bless',
    'blind',
    'blood',
    'blossom',
    'blouse',
    'blue',
    'blur',
    'blush',
    'board',
    'boat',
    'body',
    'boil',
    'bomb',
    'bone',
    'bonus',
    'book',
    'boost',
    'border',
    'boring',
    'borrow',
    'boss',
    'bottom',
    'bounce',
    'box',
    'boy',
    'bracket',
    'brain',
    'brand',
    'brass',
    'brave',
    'bread',
    'breeze',
    'brick',
    'bridge',
    'brief',
    'bright',
    'bring',
    'brisk',
    'broccoli',
    'broken',
    'bronze',
    'broom',
    'brother',
    'brown',
    'brush',
    'bubble',
    'buddy',
    'budget',
    'buffalo',
    'build',
    'bulb',
    'bulk',
    'bullet',
    'bundle',
    'bunker',
    'burden',
    'burger',
    'burst',
    'bus',
    'business',
    'busy',
    'butter',
    'buyer',
    'buzz',
    'cabbage',
    'cabin',
    'cable',
    'cactus',
    'cage',
    'cake',
    'call',
    'calm',
    'camera',
    'camp',
    'can',
    'canal',
    'cancel',
    'candy',
    'cannon',
    'canoe',
    'canvas',
    'canyon',
    'capable',
    'capital',
    'captain',
    'car',
    'carbon',
    'card',
    'cargo',
    'carpet',
    'carry',
    'cart',
    'case',
    'cash',
    'casino',
    'castle',
    'casual',
    'cat',
    'catalog',
    'catch',
    'category',
    'cattle',
    'caught',
    'cause',
    'caution',
    'cave',
    'ceiling',
    'celery',
    'cement',
    'census',
    'century',
    'cereal',
    'certain',
    'chair',
    'chalk',
    'champion',
    'change',
    'chaos',
    'chapter',
    'charge',
    'chase',
    'chat',
    'cheap',
    'check',
    'cheese',
    'chef',
    'cherry',
    'chest',
    'chicken',
    'chief',
    'child',
    'chimney',
    'choice',
    'choose',
    'chronic',
    'chuckle',
    'chunk',
    'churn',
    'cigar',
    'cinnamon',
    'circle',
    'citizen',
    'city',
    'civil',
    'claim',
    'clap',
    'clarify',
    'claw',
    'clay',
    'clean',
    'clerk',
    'clever',
    'click',
    'client',
    'cliff',
    'climb',
    'clinic',
    'clip',
    'clock',
    'clog',
    'close',
    'cloth',
    'cloud',
    'clown',
    'club',
    'clump',
    'cluster',
    'clutch',
    'coach',
    'coast',
    'coconut',
    'code',
    'coffee',
    'coil',
    'coin',
    'collect',
    'color',
    'column',
    'combine',
    'come',
    'comfort',
    'comic',
    'common',
    'company',
    'concert',
    'conduct',
    'confirm',
    'congress',
    'connect',
    'consider',
    'control',
    'convince',
    'cook',
    'cool',
    'copper',
    'copy',
    'coral',
    'core',
    'corn',
    'correct',
    'cost',
    'cotton',
    'couch',
    'country',
    'couple',
    'course',
    'cousin',
    'cover',
    'coyote',
    'crack',
    'cradle',
    'craft',
    'cram',
    'crane',
    'crash',
    'crater',
    'crawl',
    'crazy',
    'cream',
    'credit',
    'creek',
    'crew',
    'cricket',
    'crime',
    'crisp',
    'critic',
    'crop',
    'cross',
    'crouch',
    'crowd',
    'crucial',
    'cruel',
    'cruise',
    'crumble',
    'crunch',
    'crush',
    'cry',
    'crystal',
    'cube',
    'culture',
    'cup',
    'cupboard',
    'curious',
    'current',
    'curtain',
    'curve',
    'cushion',
    'custom',
    'cute',
    'cycle',
    'dad',
    'damage',
    'damp',
    'dance',
    'danger',
    'daring',
    'dash',
    'daughter',
    'dawn',
    'day',
    'deal',
    'debate',
    'debris',
    'decade',
    'december',
    'decide',
    'decline',
    'decorate',
    'decrease',
    'deer',
    'defense',
    'define',
    'defy',
    'degree',
    'delay',
    'deliver',
    'demand',
    'demise',
    'denial',
    'dentist',
    'deny',
    'depart',
    'depend',
    'deposit',
    'depth',
    'deputy',
    'derive',
    'describe',
    'desert',
    'design',
    'desk',
    'despair',
    'destroy',
    'detail',
    'detect',
    'develop',
    'device',
    'devote',
    'diagram',
    'dial',
    'diamond',
    'diary',
    'dice',
    'diesel',
    'diet',
    'differ',
    'digital',
    'dignity',
    'dilemma',
    'dinner',
    'dinosaur',
    'direct',
    'dirt',
    'disagree',
    'discover',
    'disease',
    'dish',
    'dismiss',
    'disorder',
    'display',
    'distance',
    'divert',
    'divide',
    'divorce',
    'dizzy',
    'doctor',
    'document',
    'dog',
    'doll',
    'dolphin',
    'domain',
    'donate',
    'donkey',
    'donor',
    'door',
    'dose',
    'double',
    'dove',
    'draft',
    'dragon',
    'drama',
    'drastic',
    'draw',
    'dream',
    'dress',
    'drift',
    'drill',
    'drink',
    'drip',
    'drive',
    'drop',
    'drum',
    'dry',
    'duck',
    'dumb',
    'dune',
    'during',
    'dust',
    'dutch',
    'duty',
    'dwarf',
    'dynamic',
    'eager',
    'eagle',
    'early',
    'earn',
    'earth',
    'easily',
    'east',
    'easy',
    'echo',
    'ecology',
    'economy',
    'edge',
    'edit',
    'educate',
    'effort',
    'egg',
    'eight',
    'either',
    'elbow',
    'elder',
    'electric',
    'elegant',
    'element',
    'elephant',
    'elevator',
    'elite',
    'else',
    'embark',
    'embody',
    'embrace',
    'emerge',
    'emotion',
    'employ',
    'empower',
    'empty',
    'enable',
    'enact',
    'end',
    'endless',
    'endorse',
    'enemy',
    'energy',
    'enforce',
    'engage',
    'engine',
    'enhance',
    'enjoy',
    'enlist',
    'enough',
    'enrich',
    'enroll',
    'ensure',
    'enter',
    'entire',
    'entry',
    'envelope',
    'episode',
    'equal',
    'equip',
    'era',
    'erase',
    'erode',
    'erosion',
    'error',
    'erupt',
    'escape',
    'essay',
    'essence',
    'estate',
    'eternal',
    'ethics',
    'evidence',
    'evil',
    'evoke',
    'evolve',
    'exact',
    'example',
    'excess',
    'exchange',
    'excite',
    'exclude',
    'excuse',
    'execute',
    'exercise',
    'exhaust',
    'exhibit',
    'exile',
    'exist',
    'exit',
    'exotic',
    'expand',
    'expect',
    'expire',
    'explain',
    'expose',
    'express',
    'extend',
    'extra',
    'eye',
    'eyebrow',
    'fabric',
    'face',
    'faculty',
    'fade',
    'faint',
    'faith',
    'fall',
    'false',
    'fame',
    'family',
    'famous',
    'fan',
    'fancy',
    'fantasy',
    'farm',
    'fashion',
    'fat',
    'fatal',
    'father',
    'fatigue',
    'fault',
    'favorite',
    'feature',
    'february',
    'federal',
    'fee',
    'feed',
    'feel',
    'female',
    'fence',
    'festival',
    'fetch',
    'fever',
    'few',
    'fiber',
    'fiction',
    'field',
    'figure',
    'file',
    'film',
    'filter',
    'final',
    'find',
    'fine',
    'finger',
    'finish',
    'fire',
    'firm',
    'first',
    'fiscal',
    'fish',
    'fit',
    'fitness',
    'fix',
    'flag',
    'flame',
    'flash',
    'flat',
    'flavor',
    'flee',
    'flight',
    'flip',
    'float',
    'flock',
    'floor',
    'flower',
    'fluid',
    'flush',
    'fly',
    'foam',
    'focus',
    'fog',
    'foil',
    'fold',
    'follow',
    'food',
    'foot',
    'force',
    'forest',
    'forget',
    'fork',
    'fortune',
    'forum',
    'forward',
    'fossil',
    'foster',
    'found',
    'fox',
    'fragile',
    'frame',
    'frequent',
    'fresh',
    'friend',
    'fringe',
    'frog',
    'front',
    'frost',
    'frown',
    'frozen',
    'fruit',
    'fuel',
    'fun',
    'funny',
    'furnace',
    'fury',
    'future',
    'gadget',
    'gain',
    'galaxy',
    'gallery',
    'game',
    'gap',
    'garage',
    'garbage',
    'garden',
    'garlic',
    'garment',
    'gas',
    'gasp',
    'gate',
    'gather',
    'gauge',
    'gaze',
    'general',
    'genius',
    'genre',
    'gentle',
    'genuine',
    'gesture',
    'ghost',
    'giant',
    'gift',
    'giggle',
    'ginger',
    'giraffe',
    'girl',
    'give',
    'glad',
    'glance',
    'glare',
    'glass',
    'glide',
    'glimpse',
    'globe',
    'gloom',
    'glory',
    'glove',
    'glow',
    'glue',
    'goat',
    'goddess',
    'gold',
    'good',
    'goose',
    'gorilla',
    'gospel',
    'gossip',
    'govern',
    'gown',
    'grab',
    'grace',
    'grain',
    'grant',
    'grape',
    'grass',
    'gravity',
    'great',
    'green',
    'grid',
    'grief',
    'grit',
    'grocery',
    'group',
    'grow',
    'grunt',
    'guard',
    'guess',
    'guide',
    'guilt',
    'guitar',
    'gun',
    'gym',
    'habit',
    'hair',
    'half',
    'hammer',
    'hamster',
    'hand',
    'happy',
    'harbor',
    'hard',
    'harsh',
    'harvest',
    'hat',
    'have',
    'hawk',
    'hazard',
    'head',
    'health',
    'heart',
    'heavy',
    'hedgehog',
    'height',
    'hello',
    'helmet',
    'help',
    'hen',
    'hero',
    'hidden',
    'high',
    'hill',
    'hint',
    'hip',
    'hire',
    'history',
    'hobby',
    'hockey',
    'hold',
    'hole',
    'holiday',
    'hollow',
    'home',
    'honey',
    'hood',
    'hope',
    'horn',
    'horror',
    'horse',
    'hospital',
    'host',
    'hotel',
    'hour',
    'hover',
    'hub',
    'huge',
    'human',
    'humble',
    'humor',
    'hundred',
    'hungry',
    'hunt',
    'hurdle',
    'hurry',
    'hurt',
    'husband',
    'hybrid',
    'ice',
    'icon',
    'idea',
    'identify',
    'idle',
    'ignore',
    'ill',
    'illegal',
    'illness',
    'image',
    'imitate',
    'immense',
    'immune',
    'impact',
    'impose',
    'improve',
    'impulse',
    'inch',
    'include',
    'income',
    'increase',
    'index',
    'indicate',
    'indoor',
    'industry',
    'infant',
    'inflict',
    'inform',
    'inhale',
    'inherit',
    'initial',
    'inject',
    'injury',
    'inmate',
    'inner',
    'innocent',
    'input',
    'inquiry',
    'insane',
    'insect',
    'inside',
    'inspire',
    'install',
    'intact',
    'interest',
    'into',
    'invest',
    'invite',
    'involve',
    'iron',
    'island',
    'isolate',
    'issue',
    'item',
    'ivory',
    'jacket',
    'jaguar',
    'jar',
    'jazz',
    'jealous',
    'jeans',
    'jelly',
    'jewel',
    'job',
    'join',
    'joke',
    'journey',
    'joy',
    'judge',
    'juice',
    'jump',
    'jungle',
    'junior',
    'junk',
    'just',
    'kangaroo',
    'keen',
    'keep',
    'ketchup',
    'key',
    'kick',
    'kid',
    'kidney',
    'kind',
    'kingdom',
    'kiss',
    'kit',
    'kitchen',
    'kite',
    'kitten',
    'kiwi',
    'knee',
    'knife',
    'knock',
    'know',
    'lab',
    'label',
    'labor',
    'ladder',
    'lady',
    'lake',
    'lamp',
    'language',
    'laptop',
    'large',
    'later',
    'latin',
    'laugh',
    'laundry',
    'lava',
    'law',
    'lawn',
    'lawsuit',
    'layer',
    'lazy',
    'leader',
    'leaf',
    'learn',
    'leave',
    'lecture',
    'left',
    'leg',
    'legal',
    'legend',
    'leisure',
    'lemon',
    'lend',
    'length',
    'lens',
    'leopard',
    'lesson',
    'letter',
    'level',
    'liar',
    'liberty',
    'library',
    'license',
    'life',
    'lift',
    'light',
    'like',
    'limb',
    'limit',
    'link',
    'lion',
    'liquid',
    'list',
    'little',
    'live',
    'lizard',
    'load',
    'loan',
    'lobster',
    'local',
    'lock',
    'logic',
    'lonely',
    'long',
    'loop',
    'lottery',
    'loud',
    'lounge',
    'love',
    'loyal',
    'lucky',
    'luggage',
    'lumber',
    'lunar',
    'lunch',
    'luxury',
    'lyrics',
    'machine',
    'mad',
    'magic',
    'magnet',
    'maid',
    'mail',
    'main',
    'major',
    'make',
    'mammal',
    'man',
    'manage',
    'mandate',
    'mango',
    'mansion',
    'manual',
    'maple',
    'marble',
    'march',
    'margin',
    'marine',
    'market',
    'marriage',
    'mask',
    'mass',
    'master',
    'match',
    'material',
    'math',
    'matrix',
    'matter',
    'maximum',
    'maze',
    'meadow',
    'mean',
    'measure',
    'meat',
    'mechanic',
    'medal',
    'media',
    'melody',
    'melt',
    'member',
    'memory',
    'mention',
    'menu',
    'mercy',
    'merge',
    'merit',
    'merry',
    'mesh',
    'message',
    'metal',
    'method',
    'middle',
    'midnight',
    'milk',
    'million',
    'mimic',
    'mind',
    'minimum',
    'minor',
    'minute',
    'miracle',
    'mirror',
    'misery',
    'miss',
    'mistake',
    'mix',
    'mixed',
    'mixture',
    'mobile',
    'model',
    'modify',
    'mom',
    'moment',
    'monitor',
    'monkey',
    'monster',
    'month',
    'moon',
    'moral',
    'more',
    'morning',
    'mosquito',
    'mother',
    'motion',
    'motor',
    'mountain',
    'mouse',
    'move',
    'movie',
    'much',
    'muffin',
    'mule',
    'multiply',
    'muscle',
    'museum',
    'mushroom',
    'music',
    'must',
    'mutual',
    'myself',
    'mystery',
    'myth',
    'naive',
    'name',
    'napkin',
    'narrow',
    'nasty',
    'nation',
    'nature',
    'near',
    'neck',
    'need',
    'negative',
    'neglect',
    'neither',
    'nephew',
    'nerve',
    'nest',
    'net',
    'network',
    'neutral',
    'never',
    'news',
    'next',
    'nice',
    'night',
    'noble',
    'noise',
    'nominee',
    'noodle',
    'normal',
    'north',
    'nose',
    'notable',
    'note',
    'nothing',
    'notice',
    'novel',
    'now',
    'nuclear',
    'number',
    'nurse',
    'nut',
    'oak',
    'obey',
    'object',
    'oblige',
    'obscure',
    'observe',
    'obtain',
    'obvious',
    'occur',
    'ocean',
    'october',
    'odor',
    'off',
    'offer',
    'office',
    'often',
    'oil',
    'okay',
    'old',
    'olive',
    'olympic',
    'omit',
    'once',
    'one',
    'onion',
    'online',
    'only',
    'open',
    'opera',
    'opinion',
    'oppose',
    'option',
    'orange',
    'orbit',
    'orchard',
    'order',
    'ordinary',
    'organ',
    'orient',
    'original',
    'orphan',
    'ostrich',
    'other',
    'outdoor',
    'outer',
    'output',
    'outside',
    'oval',
    'oven',
    'over',
    'own',
    'owner',
    'oxygen',
    'oyster',
    'ozone',
    'pact',
    'paddle',
    'page',
    'pair',
    'palace',
    'palm',
    'panda',
    'panel',
    'panic',
    'panther',
    'paper',
    'parade',
    'parent',
    'park',
    'parrot',
    'party',
    'pass',
    'patch',
    'path',
    'patient',
    'patrol',
    'pattern',
    'pause',
    'pave',
    'payment',
    'peace',
    'peanut',
    'pear',
    'peasant',
    'pelican',
    'pen',
    'penalty',
    'pencil',
    'people',
    'pepper',
    'perfect',
    'permit',
    'person',
    'pet',
    'phone',
    'photo',
    'phrase',
    'physical',
    'piano',
    'picnic',
    'picture',
    'piece',
    'pig',
    'pigeon',
    'pill',
    'pilot',
    'pink',
    'pioneer',
    'pipe',
    'pistol',
    'pitch',
    'pizza',
    'place',
    'planet',
    'plastic',
    'plate',
    'play',
    'please',
    'pledge',
    'pluck',
    'plug',
    'plunge',
    'poem',
    'poet',
    'point',
    'polar',
    'pole',
    'police',
    'pond',
    'pony',
    'pool',
    'popular',
    'portion',
    'position',
    'possible',
    'post',
    'potato',
    'pottery',
    'poverty',
    'powder',
    'power',
    'practice',
    'praise',
    'predict',
    'prefer',
    'prepare',
    'present',
    'pretty',
    'prevent',
    'price',
    'pride',
    'primary',
    'print',
    'priority',
    'prison',
    'private',
    'prize',
    'problem',
    'process',
    'produce',
    'profit',
    'program',
    'project',
    'promote',
    'proof',
    'property',
    'prosper',
    'protect',
    'proud',
    'provide',
    'public',
    'pudding',
    'pull',
    'pulp',
    'pulse',
    'pumpkin',
    'punch',
    'pupil',
    'puppy',
    'purchase',
    'purity',
    'purpose',
    'purse',
    'push',
    'put',
    'puzzle',
    'pyramid',
    'quality',
    'quantum',
    'quarter',
    'question',
    'quick',
    'quit',
    'quiz',
    'quote',
    'rabbit',
    'raccoon',
    'race',
    'rack',
    'radar',
    'radio',
    'rail',
    'rain',
    'raise',
    'rally',
    'ramp',
    'ranch',
    'random',
    'range',
    'rapid',
    'rare',
    'rate',
    'rather',
    'raven',
    'raw',
    'razor',
    'ready',
    'real',
    'reason',
    'rebel',
    'rebuild',
    'recall',
    'receive',
    'recipe',
    'record',
    'recycle',
    'reduce',
    'reflect',
    'reform',
    'refuse',
    'region',
    'regret',
    'regular',
    'reject',
    'relax',
    'release',
    'relief',
    'rely',
    'remain',
    'remember',
    'remind',
    'remove',
    'render',
    'renew',
    'rent',
    'reopen',
    'repair',
    'repeat',
    'replace',
    'report',
    'require',
    'rescue',
    'resemble',
    'resist',
    'resource',
    'response',
    'result',
    'retire',
    'retreat',
    'return',
    'reunion',
    'reveal',
    'review',
    'reward',
    'rhythm',
    'rib',
    'ribbon',
    'rice',
    'rich',
    'ride',
    'ridge',
    'rifle',
    'right',
    'rigid',
    'ring',
    'riot',
    'ripple',
    'risk',
    'ritual',
    'rival',
    'river',
    'road',
    'roast',
    'robot',
    'robust',
    'rocket',
    'romance',
    'roof',
    'rookie',
    'room',
    'rose',
    'rotate',
    'rough',
    'round',
    'route',
    'royal',
    'rubber',
    'rude',
    'rug',
    'rule',
    'run',
    'runway',
    'rural',
    'sad',
    'saddle',
    'sadness',
    'safe',
    'sail',
    'salad',
    'salmon',
    'salon',
    'salt',
    'salute',
    'same',
    'sample',
    'sand',
    'satisfy',
    'satoshi',
    'sauce',
    'sausage',
    'save',
    'say',
    'scale',
    'scan',
    'scare',
    'scatter',
    'scene',
    'scheme',
    'school',
    'science',
    'scissors',
    'scorpion',
    'scout',
    'scrap',
    'screen',
    'script',
    'scrub',
    'sea',
    'search',
    'season',
    'seat',
    'second',
    'secret',
    'section',
    'security',
    'seed',
    'seek',
    'segment',
    'select',
    'sell',
    'seminar',
    'senior',
    'sense',
    'sentence',
    'series',
    'service',
    'session',
    'settle',
    'setup',
    'seven',
    'shadow',
    'shaft',
    'shallow',
    'share',
    'shed',
    'shell',
    'sheriff',
    'shield',
    'shift',
    'shine',
    'ship',
    'shiver',
    'shock',
    'shoe',
    'shoot',
    'shop',
    'short',
    'shoulder',
    'shove',
    'shrimp',
    'shrug',
    'shuffle',
    'shy',
    'sibling',
    'sick',
    'side',
    'siege',
    'sight',
    'sign',
    'silent',
    'silk',
    'silly',
    'silver',
    'similar',
    'simple',
    'since',
    'sing',
    'siren',
    'sister',
    'situate',
    'six',
    'size',
    'skate',
    'sketch',
    'ski',
    'skill',
    'skin',
    'skirt',
    'skull',
    'slab',
    'slam',
    'sleep',
    'slender',
    'slice',
    'slide',
    'slight',
    'slim',
    'slogan',
    'slot',
    'slow',
    'slush',
    'small',
    'smart',
    'smile',
    'smoke',
    'smooth',
    'snack',
    'snake',
    'snap',
    'sniff',
    'snow',
    'soap',
    'soccer',
    'social',
    'sock',
    'soda',
    'soft',
    'solar',
    'soldier',
    'solid',
    'solution',
    'solve',
    'someone',
    'song',
    'soon',
    'sorry',
    'sort',
    'soul',
    'sound',
    'soup',
    'source',
    'south',
    'space',
    'spare',
    'spatial',
    'spawn',
    'speak',
    'special',
    'speed',
    'spell',
    'spend',
    'sphere',
    'spice',
    'spider',
    'spike',
    'spin',
    'spirit',
    'split',
    'spoil',
    'sponsor',
    'spoon',
    'sport',
    'spot',
    'spray',
    'spread',
    'spring',
    'spy',
    'square',
    'squeeze',
    'squirrel',
    'stable',
    'stadium',
    'staff',
    'stage',
    'stairs',
    'stamp',
    'stand',
    'start',
    'state',
    'stay',
    'steak',
    'steel',
    'stem',
    'step',
    'stereo',
    'stick',
    'still',
    'sting',
    'stock',
    'stomach',
    'stone',
    'stool',
    'story',
    'stove',
    'strategy',
    'street',
    'strike',
    'strong',
    'struggle',
    'student',
    'stuff',
    'stumble',
    'style',
    'subject',
    'submit',
    'subway',
    'success',
    'such',
    'sudden',
    'suffer',
    'sugar',
    'suggest',
    'suit',
    'summer',
    'sun',
    'sunny',
    'sunset',
    'super',
    'supply',
    'supreme',
    'sure',
    'surface',
    'surge',
    'surprise',
    'surround',
    'survey',
    'suspect',
    'sustain',
    'swallow',
    'swamp',
    'swap',
    'swarm',
    'swear',
    'sweet',
    'swift',
    'swim',
    'swing',
    'switch',
    'sword',
    'symbol',
    'symptom',
    'syrup',
    'system',
    'table',
    'tackle',
    'tag',
    'tail',
    'talent',
    'talk',
    'tank',
    'tape',
    'target',
    'task',
    'taste',
    'tattoo',
    'taxi',
    'teach',
    'team',
    'tell',
    'ten',
    'tenant',
    'tennis',
    'tent',
    'term',
    'test',
    'text',
    'thank',
    'that',
    'theme',
    'then',
    'theory',
    'there',
    'they',
    'thing',
    'this',
    'thought',
    'three',
    'thrive',
    'throw',
    'thumb',
    'thunder',
    'ticket',
    'tide',
    'tiger',
    'tilt',
    'timber',
    'time',
    'tiny',
    'tip',
    'tired',
    'tissue',
    'title',
    'toast',
    'tobacco',
    'today',
    'toddler',
    'toe',
    'together',
    'toilet',
    'token',
    'tomato',
    'tomorrow',
    'tone',
    'tongue',
    'tonight',
    'tool',
    'tooth',
    'top',
    'topic',
    'topple',
    'torch',
    'tornado',
    'tortoise',
    'toss',
    'total',
    'tourist',
    'toward',
    'tower',
    'town',
    'toy',
    'track',
    'trade',
    'traffic',
    'tragic',
    'train',
    'transfer',
    'trap',
    'trash',
    'travel',
    'tray',
    'treat',
    'tree',
    'trend',
    'trial',
    'tribe',
    'trick',
    'trigger',
    'trim',
    'trip',
    'trophy',
    'trouble',
    'truck',
    'true',
    'truly',
    'trumpet',
    'trust',
    'truth',
    'try',
    'tube',
    'tuition',
    'tumble',
    'tuna',
    'tunnel',
    'turkey',
    'turn',
    'turtle',
    'twelve',
    'twenty',
    'twice',
    'twin',
    'twist',
    'two',
    'type',
    'typical',
    'ugly',
    'umbrella',
    'unable',
    'unaware',
    'uncle',
    'uncover',
    'under',
    'undo',
    'unfair',
    'unfold',
    'unhappy',
    'uniform',
    'unique',
    'unit',
    'universe',
    'unknown',
    'unlock',
    'until',
    'unusual',
    'unveil',
    'update',
    'upgrade',
    'uphold',
    'upon',
    'upper',
    'upset',
    'urban',
    'urge',
    'usage',
    'use',
    'used',
    'useful',
    'useless',
    'usual',
    'utility',
    'vacant',
    'vacuum',
    'vague',
    'valid',
    'valley',
    'valve',
    'van',
    'vanish',
    'vapor',
    'various',
    'vast',
    'vault',
    'vehicle',
    'velvet',
    'vendor',
    'venture',
    'venue',
    'verb',
    'verify',
    'version',
    'very',
    'vessel',
    'veteran',
    'viable',
    'vibrant',
    'vicious',
    'victory',
    'video',
    'view',
    'village',
    'vintage',
    'violin',
    'virtual',
    'virus',
    'visa',
    'visit',
    'visual',
    'vital',
    'vivid',
    'vocal',
    'voice',
    'void',
    'volcano',
    'volume',
    'vote',
    'voyage',
    'wage',
    'wagon',
    'wait',
    'walk',
    'wall',
    'walnut',
    'want',
    'warfare',
    'warm',
    'warrior',
    'wash',
    'wasp',
    'waste',
    'water',
    'wave',
    'way',
    'wealth',
    'weapon',
    'wear',
    'weasel',
    'weather',
    'web',
    'wedding',
    'weekend',
    'weird',
    'welcome',
    'west',
    'wet',
    'whale',
    'what',
    'wheat',
    'wheel',
    'when',
    'where',
    'whip',
    'whisper',
    'wide',
    'width',
    'wife',
    'wild',
    'will',
    'win',
    'window',
    'wine',
    'wing',
    'wink',
    'winner',
    'winter',
    'wire',
    'wisdom',
    'wise',
    'wish',
    'witness',
    'wolf',
    'woman',
    'wonder',
    'wood',
    'wool',
    'word',
    'work',
    'world',
    'worry',
    'worth',
    'wrap',
    'wreck',
    'wrestle',
    'wrist',
    'write',
    'wrong',
    'yard',
    'year',
    'yellow',
    'you',
    'young',
    'youth',
    'zebra',
    'zero',
    'zone',
    'zoo',
];
const utlis = {};
const naclFast = { exports: {} };
const __viteBrowserExternal = {};
const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    'default': __viteBrowserExternal,
}, Symbol.toStringTag, { value: 'Module' }));
const require$$0$2 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
(function (module) {
    (function (nacl2) {
        const gf = function (init2) {
            let i; const
                r = new Float64Array(16);
            if (init2) for (i = 0; i < init2.length; i++) r[i] = init2[i];
            return r;
        };
        let randombytes = function () {
            throw new Error('no PRNG');
        };
        const _0 = new Uint8Array(16);
        const _9 = new Uint8Array(32);
        _9[0] = 9;
        const gf0 = gf(); const gf1 = gf([1]); const _121665 = gf([56129, 1]); const D = gf([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]); const D2 = gf([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]); const X = gf([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]); const Y = gf([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]); const
            I = gf([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);
        function ts64(x, i, h, l) {
            x[i] = h >> 24 & 255;
            x[i + 1] = h >> 16 & 255;
            x[i + 2] = h >> 8 & 255;
            x[i + 3] = h & 255;
            x[i + 4] = l >> 24 & 255;
            x[i + 5] = l >> 16 & 255;
            x[i + 6] = l >> 8 & 255;
            x[i + 7] = l & 255;
        }
        function vn(x, xi, y, yi, n) {
            let i; let
                d = 0;
            for (i = 0; i < n; i++) d |= x[xi + i] ^ y[yi + i];
            return (1 & d - 1 >>> 8) - 1;
        }
        function crypto_verify_16(x, xi, y, yi) {
            return vn(x, xi, y, yi, 16);
        }
        function crypto_verify_32(x, xi, y, yi) {
            return vn(x, xi, y, yi, 32);
        }
        function core_salsa20(o, p, k, c) {
            const j0 = c[0] & 255 | (c[1] & 255) << 8 | (c[2] & 255) << 16 | (c[3] & 255) << 24; const j1 = k[0] & 255 | (k[1] & 255) << 8 | (k[2] & 255) << 16 | (k[3] & 255) << 24; const j2 = k[4] & 255 | (k[5] & 255) << 8 | (k[6] & 255) << 16 | (k[7] & 255) << 24; const j3 = k[8] & 255 | (k[9] & 255) << 8 | (k[10] & 255) << 16 | (k[11] & 255) << 24; const j4 = k[12] & 255 | (k[13] & 255) << 8 | (k[14] & 255) << 16 | (k[15] & 255) << 24; const j5 = c[4] & 255 | (c[5] & 255) << 8 | (c[6] & 255) << 16 | (c[7] & 255) << 24; const j6 = p[0] & 255 | (p[1] & 255) << 8 | (p[2] & 255) << 16 | (p[3] & 255) << 24; const j7 = p[4] & 255 | (p[5] & 255) << 8 | (p[6] & 255) << 16 | (p[7] & 255) << 24; const j8 = p[8] & 255 | (p[9] & 255) << 8 | (p[10] & 255) << 16 | (p[11] & 255) << 24; const j9 = p[12] & 255 | (p[13] & 255) << 8 | (p[14] & 255) << 16 | (p[15] & 255) << 24; const j10 = c[8] & 255 | (c[9] & 255) << 8 | (c[10] & 255) << 16 | (c[11] & 255) << 24; const j11 = k[16] & 255 | (k[17] & 255) << 8 | (k[18] & 255) << 16 | (k[19] & 255) << 24; const j12 = k[20] & 255 | (k[21] & 255) << 8 | (k[22] & 255) << 16 | (k[23] & 255) << 24; const j13 = k[24] & 255 | (k[25] & 255) << 8 | (k[26] & 255) << 16 | (k[27] & 255) << 24; const j14 = k[28] & 255 | (k[29] & 255) << 8 | (k[30] & 255) << 16 | (k[31] & 255) << 24; const
                j15 = c[12] & 255 | (c[13] & 255) << 8 | (c[14] & 255) << 16 | (c[15] & 255) << 24;
            let x0 = j0; let x1 = j1; let x2 = j2; let x3 = j3; let x4 = j4; let x5 = j5; let x6 = j6; let x7 = j7; let x8 = j8; let x9 = j9; let x10 = j10; let x11 = j11; let x12 = j12; let x13 = j13; let x14 = j14; let x15 = j15; let
                u;
            for (let i = 0; i < 20; i += 2) {
                u = x0 + x12 | 0;
                x4 ^= u << 7 | u >>> 32 - 7;
                u = x4 + x0 | 0;
                x8 ^= u << 9 | u >>> 32 - 9;
                u = x8 + x4 | 0;
                x12 ^= u << 13 | u >>> 32 - 13;
                u = x12 + x8 | 0;
                x0 ^= u << 18 | u >>> 32 - 18;
                u = x5 + x1 | 0;
                x9 ^= u << 7 | u >>> 32 - 7;
                u = x9 + x5 | 0;
                x13 ^= u << 9 | u >>> 32 - 9;
                u = x13 + x9 | 0;
                x1 ^= u << 13 | u >>> 32 - 13;
                u = x1 + x13 | 0;
                x5 ^= u << 18 | u >>> 32 - 18;
                u = x10 + x6 | 0;
                x14 ^= u << 7 | u >>> 32 - 7;
                u = x14 + x10 | 0;
                x2 ^= u << 9 | u >>> 32 - 9;
                u = x2 + x14 | 0;
                x6 ^= u << 13 | u >>> 32 - 13;
                u = x6 + x2 | 0;
                x10 ^= u << 18 | u >>> 32 - 18;
                u = x15 + x11 | 0;
                x3 ^= u << 7 | u >>> 32 - 7;
                u = x3 + x15 | 0;
                x7 ^= u << 9 | u >>> 32 - 9;
                u = x7 + x3 | 0;
                x11 ^= u << 13 | u >>> 32 - 13;
                u = x11 + x7 | 0;
                x15 ^= u << 18 | u >>> 32 - 18;
                u = x0 + x3 | 0;
                x1 ^= u << 7 | u >>> 32 - 7;
                u = x1 + x0 | 0;
                x2 ^= u << 9 | u >>> 32 - 9;
                u = x2 + x1 | 0;
                x3 ^= u << 13 | u >>> 32 - 13;
                u = x3 + x2 | 0;
                x0 ^= u << 18 | u >>> 32 - 18;
                u = x5 + x4 | 0;
                x6 ^= u << 7 | u >>> 32 - 7;
                u = x6 + x5 | 0;
                x7 ^= u << 9 | u >>> 32 - 9;
                u = x7 + x6 | 0;
                x4 ^= u << 13 | u >>> 32 - 13;
                u = x4 + x7 | 0;
                x5 ^= u << 18 | u >>> 32 - 18;
                u = x10 + x9 | 0;
                x11 ^= u << 7 | u >>> 32 - 7;
                u = x11 + x10 | 0;
                x8 ^= u << 9 | u >>> 32 - 9;
                u = x8 + x11 | 0;
                x9 ^= u << 13 | u >>> 32 - 13;
                u = x9 + x8 | 0;
                x10 ^= u << 18 | u >>> 32 - 18;
                u = x15 + x14 | 0;
                x12 ^= u << 7 | u >>> 32 - 7;
                u = x12 + x15 | 0;
                x13 ^= u << 9 | u >>> 32 - 9;
                u = x13 + x12 | 0;
                x14 ^= u << 13 | u >>> 32 - 13;
                u = x14 + x13 | 0;
                x15 ^= u << 18 | u >>> 32 - 18;
            }
            x0 = x0 + j0 | 0;
            x1 = x1 + j1 | 0;
            x2 = x2 + j2 | 0;
            x3 = x3 + j3 | 0;
            x4 = x4 + j4 | 0;
            x5 = x5 + j5 | 0;
            x6 = x6 + j6 | 0;
            x7 = x7 + j7 | 0;
            x8 = x8 + j8 | 0;
            x9 = x9 + j9 | 0;
            x10 = x10 + j10 | 0;
            x11 = x11 + j11 | 0;
            x12 = x12 + j12 | 0;
            x13 = x13 + j13 | 0;
            x14 = x14 + j14 | 0;
            x15 = x15 + j15 | 0;
            o[0] = x0 >>> 0 & 255;
            o[1] = x0 >>> 8 & 255;
            o[2] = x0 >>> 16 & 255;
            o[3] = x0 >>> 24 & 255;
            o[4] = x1 >>> 0 & 255;
            o[5] = x1 >>> 8 & 255;
            o[6] = x1 >>> 16 & 255;
            o[7] = x1 >>> 24 & 255;
            o[8] = x2 >>> 0 & 255;
            o[9] = x2 >>> 8 & 255;
            o[10] = x2 >>> 16 & 255;
            o[11] = x2 >>> 24 & 255;
            o[12] = x3 >>> 0 & 255;
            o[13] = x3 >>> 8 & 255;
            o[14] = x3 >>> 16 & 255;
            o[15] = x3 >>> 24 & 255;
            o[16] = x4 >>> 0 & 255;
            o[17] = x4 >>> 8 & 255;
            o[18] = x4 >>> 16 & 255;
            o[19] = x4 >>> 24 & 255;
            o[20] = x5 >>> 0 & 255;
            o[21] = x5 >>> 8 & 255;
            o[22] = x5 >>> 16 & 255;
            o[23] = x5 >>> 24 & 255;
            o[24] = x6 >>> 0 & 255;
            o[25] = x6 >>> 8 & 255;
            o[26] = x6 >>> 16 & 255;
            o[27] = x6 >>> 24 & 255;
            o[28] = x7 >>> 0 & 255;
            o[29] = x7 >>> 8 & 255;
            o[30] = x7 >>> 16 & 255;
            o[31] = x7 >>> 24 & 255;
            o[32] = x8 >>> 0 & 255;
            o[33] = x8 >>> 8 & 255;
            o[34] = x8 >>> 16 & 255;
            o[35] = x8 >>> 24 & 255;
            o[36] = x9 >>> 0 & 255;
            o[37] = x9 >>> 8 & 255;
            o[38] = x9 >>> 16 & 255;
            o[39] = x9 >>> 24 & 255;
            o[40] = x10 >>> 0 & 255;
            o[41] = x10 >>> 8 & 255;
            o[42] = x10 >>> 16 & 255;
            o[43] = x10 >>> 24 & 255;
            o[44] = x11 >>> 0 & 255;
            o[45] = x11 >>> 8 & 255;
            o[46] = x11 >>> 16 & 255;
            o[47] = x11 >>> 24 & 255;
            o[48] = x12 >>> 0 & 255;
            o[49] = x12 >>> 8 & 255;
            o[50] = x12 >>> 16 & 255;
            o[51] = x12 >>> 24 & 255;
            o[52] = x13 >>> 0 & 255;
            o[53] = x13 >>> 8 & 255;
            o[54] = x13 >>> 16 & 255;
            o[55] = x13 >>> 24 & 255;
            o[56] = x14 >>> 0 & 255;
            o[57] = x14 >>> 8 & 255;
            o[58] = x14 >>> 16 & 255;
            o[59] = x14 >>> 24 & 255;
            o[60] = x15 >>> 0 & 255;
            o[61] = x15 >>> 8 & 255;
            o[62] = x15 >>> 16 & 255;
            o[63] = x15 >>> 24 & 255;
        }
        function core_hsalsa20(o, p, k, c) {
            const j0 = c[0] & 255 | (c[1] & 255) << 8 | (c[2] & 255) << 16 | (c[3] & 255) << 24; const j1 = k[0] & 255 | (k[1] & 255) << 8 | (k[2] & 255) << 16 | (k[3] & 255) << 24; const j2 = k[4] & 255 | (k[5] & 255) << 8 | (k[6] & 255) << 16 | (k[7] & 255) << 24; const j3 = k[8] & 255 | (k[9] & 255) << 8 | (k[10] & 255) << 16 | (k[11] & 255) << 24; const j4 = k[12] & 255 | (k[13] & 255) << 8 | (k[14] & 255) << 16 | (k[15] & 255) << 24; const j5 = c[4] & 255 | (c[5] & 255) << 8 | (c[6] & 255) << 16 | (c[7] & 255) << 24; const j6 = p[0] & 255 | (p[1] & 255) << 8 | (p[2] & 255) << 16 | (p[3] & 255) << 24; const j7 = p[4] & 255 | (p[5] & 255) << 8 | (p[6] & 255) << 16 | (p[7] & 255) << 24; const j8 = p[8] & 255 | (p[9] & 255) << 8 | (p[10] & 255) << 16 | (p[11] & 255) << 24; const j9 = p[12] & 255 | (p[13] & 255) << 8 | (p[14] & 255) << 16 | (p[15] & 255) << 24; const j10 = c[8] & 255 | (c[9] & 255) << 8 | (c[10] & 255) << 16 | (c[11] & 255) << 24; const j11 = k[16] & 255 | (k[17] & 255) << 8 | (k[18] & 255) << 16 | (k[19] & 255) << 24; const j12 = k[20] & 255 | (k[21] & 255) << 8 | (k[22] & 255) << 16 | (k[23] & 255) << 24; const j13 = k[24] & 255 | (k[25] & 255) << 8 | (k[26] & 255) << 16 | (k[27] & 255) << 24; const j14 = k[28] & 255 | (k[29] & 255) << 8 | (k[30] & 255) << 16 | (k[31] & 255) << 24; const
                j15 = c[12] & 255 | (c[13] & 255) << 8 | (c[14] & 255) << 16 | (c[15] & 255) << 24;
            let x0 = j0; let x1 = j1; let x2 = j2; let x3 = j3; let x4 = j4; let x5 = j5; let x6 = j6; let x7 = j7; let x8 = j8; let x9 = j9; let x10 = j10; let x11 = j11; let x12 = j12; let x13 = j13; let x14 = j14; let x15 = j15; let
                u;
            for (let i = 0; i < 20; i += 2) {
                u = x0 + x12 | 0;
                x4 ^= u << 7 | u >>> 32 - 7;
                u = x4 + x0 | 0;
                x8 ^= u << 9 | u >>> 32 - 9;
                u = x8 + x4 | 0;
                x12 ^= u << 13 | u >>> 32 - 13;
                u = x12 + x8 | 0;
                x0 ^= u << 18 | u >>> 32 - 18;
                u = x5 + x1 | 0;
                x9 ^= u << 7 | u >>> 32 - 7;
                u = x9 + x5 | 0;
                x13 ^= u << 9 | u >>> 32 - 9;
                u = x13 + x9 | 0;
                x1 ^= u << 13 | u >>> 32 - 13;
                u = x1 + x13 | 0;
                x5 ^= u << 18 | u >>> 32 - 18;
                u = x10 + x6 | 0;
                x14 ^= u << 7 | u >>> 32 - 7;
                u = x14 + x10 | 0;
                x2 ^= u << 9 | u >>> 32 - 9;
                u = x2 + x14 | 0;
                x6 ^= u << 13 | u >>> 32 - 13;
                u = x6 + x2 | 0;
                x10 ^= u << 18 | u >>> 32 - 18;
                u = x15 + x11 | 0;
                x3 ^= u << 7 | u >>> 32 - 7;
                u = x3 + x15 | 0;
                x7 ^= u << 9 | u >>> 32 - 9;
                u = x7 + x3 | 0;
                x11 ^= u << 13 | u >>> 32 - 13;
                u = x11 + x7 | 0;
                x15 ^= u << 18 | u >>> 32 - 18;
                u = x0 + x3 | 0;
                x1 ^= u << 7 | u >>> 32 - 7;
                u = x1 + x0 | 0;
                x2 ^= u << 9 | u >>> 32 - 9;
                u = x2 + x1 | 0;
                x3 ^= u << 13 | u >>> 32 - 13;
                u = x3 + x2 | 0;
                x0 ^= u << 18 | u >>> 32 - 18;
                u = x5 + x4 | 0;
                x6 ^= u << 7 | u >>> 32 - 7;
                u = x6 + x5 | 0;
                x7 ^= u << 9 | u >>> 32 - 9;
                u = x7 + x6 | 0;
                x4 ^= u << 13 | u >>> 32 - 13;
                u = x4 + x7 | 0;
                x5 ^= u << 18 | u >>> 32 - 18;
                u = x10 + x9 | 0;
                x11 ^= u << 7 | u >>> 32 - 7;
                u = x11 + x10 | 0;
                x8 ^= u << 9 | u >>> 32 - 9;
                u = x8 + x11 | 0;
                x9 ^= u << 13 | u >>> 32 - 13;
                u = x9 + x8 | 0;
                x10 ^= u << 18 | u >>> 32 - 18;
                u = x15 + x14 | 0;
                x12 ^= u << 7 | u >>> 32 - 7;
                u = x12 + x15 | 0;
                x13 ^= u << 9 | u >>> 32 - 9;
                u = x13 + x12 | 0;
                x14 ^= u << 13 | u >>> 32 - 13;
                u = x14 + x13 | 0;
                x15 ^= u << 18 | u >>> 32 - 18;
            }
            o[0] = x0 >>> 0 & 255;
            o[1] = x0 >>> 8 & 255;
            o[2] = x0 >>> 16 & 255;
            o[3] = x0 >>> 24 & 255;
            o[4] = x5 >>> 0 & 255;
            o[5] = x5 >>> 8 & 255;
            o[6] = x5 >>> 16 & 255;
            o[7] = x5 >>> 24 & 255;
            o[8] = x10 >>> 0 & 255;
            o[9] = x10 >>> 8 & 255;
            o[10] = x10 >>> 16 & 255;
            o[11] = x10 >>> 24 & 255;
            o[12] = x15 >>> 0 & 255;
            o[13] = x15 >>> 8 & 255;
            o[14] = x15 >>> 16 & 255;
            o[15] = x15 >>> 24 & 255;
            o[16] = x6 >>> 0 & 255;
            o[17] = x6 >>> 8 & 255;
            o[18] = x6 >>> 16 & 255;
            o[19] = x6 >>> 24 & 255;
            o[20] = x7 >>> 0 & 255;
            o[21] = x7 >>> 8 & 255;
            o[22] = x7 >>> 16 & 255;
            o[23] = x7 >>> 24 & 255;
            o[24] = x8 >>> 0 & 255;
            o[25] = x8 >>> 8 & 255;
            o[26] = x8 >>> 16 & 255;
            o[27] = x8 >>> 24 & 255;
            o[28] = x9 >>> 0 & 255;
            o[29] = x9 >>> 8 & 255;
            o[30] = x9 >>> 16 & 255;
            o[31] = x9 >>> 24 & 255;
        }
        function crypto_core_salsa20(out, inp, k, c) {
            core_salsa20(out, inp, k, c);
        }
        function crypto_core_hsalsa20(out, inp, k, c) {
            core_hsalsa20(out, inp, k, c);
        }
        const sigma = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
        function crypto_stream_salsa20_xor(c, cpos, m, mpos, b, n, k) {
            const z = new Uint8Array(16); const
                x = new Uint8Array(64);
            let u; let
                i;
            for (i = 0; i < 16; i++) z[i] = 0;
            for (i = 0; i < 8; i++) z[i] = n[i];
            while (b >= 64) {
                crypto_core_salsa20(x, z, k, sigma);
                for (i = 0; i < 64; i++) c[cpos + i] = m[mpos + i] ^ x[i];
                u = 1;
                for (i = 8; i < 16; i++) {
                    u = u + (z[i] & 255) | 0;
                    z[i] = u & 255;
                    u >>>= 8;
                }
                b -= 64;
                cpos += 64;
                mpos += 64;
            }
            if (b > 0) {
                crypto_core_salsa20(x, z, k, sigma);
                for (i = 0; i < b; i++) c[cpos + i] = m[mpos + i] ^ x[i];
            }
            return 0;
        }
        function crypto_stream_salsa20(c, cpos, b, n, k) {
            const z = new Uint8Array(16); const
                x = new Uint8Array(64);
            let u; let
                i;
            for (i = 0; i < 16; i++) z[i] = 0;
            for (i = 0; i < 8; i++) z[i] = n[i];
            while (b >= 64) {
                crypto_core_salsa20(x, z, k, sigma);
                for (i = 0; i < 64; i++) c[cpos + i] = x[i];
                u = 1;
                for (i = 8; i < 16; i++) {
                    u = u + (z[i] & 255) | 0;
                    z[i] = u & 255;
                    u >>>= 8;
                }
                b -= 64;
                cpos += 64;
            }
            if (b > 0) {
                crypto_core_salsa20(x, z, k, sigma);
                for (i = 0; i < b; i++) c[cpos + i] = x[i];
            }
            return 0;
        }
        function crypto_stream(c, cpos, d, n, k) {
            const s = new Uint8Array(32);
            crypto_core_hsalsa20(s, n, k, sigma);
            const sn = new Uint8Array(8);
            for (let i = 0; i < 8; i++) sn[i] = n[i + 16];
            return crypto_stream_salsa20(c, cpos, d, sn, s);
        }
        function crypto_stream_xor(c, cpos, m, mpos, d, n, k) {
            const s = new Uint8Array(32);
            crypto_core_hsalsa20(s, n, k, sigma);
            const sn = new Uint8Array(8);
            for (let i = 0; i < 8; i++) sn[i] = n[i + 16];
            return crypto_stream_salsa20_xor(c, cpos, m, mpos, d, sn, s);
        }
        const poly1305 = function (key) {
            this.buffer = new Uint8Array(16);
            this.r = new Uint16Array(10);
            this.h = new Uint16Array(10);
            this.pad = new Uint16Array(8);
            this.leftover = 0;
            this.fin = 0;
            let t0; let t1; let t2; let t3; let t4; let t5; let t6; let
                t7;
            t0 = key[0] & 255 | (key[1] & 255) << 8;
            this.r[0] = t0 & 8191;
            t1 = key[2] & 255 | (key[3] & 255) << 8;
            this.r[1] = (t0 >>> 13 | t1 << 3) & 8191;
            t2 = key[4] & 255 | (key[5] & 255) << 8;
            this.r[2] = (t1 >>> 10 | t2 << 6) & 7939;
            t3 = key[6] & 255 | (key[7] & 255) << 8;
            this.r[3] = (t2 >>> 7 | t3 << 9) & 8191;
            t4 = key[8] & 255 | (key[9] & 255) << 8;
            this.r[4] = (t3 >>> 4 | t4 << 12) & 255;
            this.r[5] = t4 >>> 1 & 8190;
            t5 = key[10] & 255 | (key[11] & 255) << 8;
            this.r[6] = (t4 >>> 14 | t5 << 2) & 8191;
            t6 = key[12] & 255 | (key[13] & 255) << 8;
            this.r[7] = (t5 >>> 11 | t6 << 5) & 8065;
            t7 = key[14] & 255 | (key[15] & 255) << 8;
            this.r[8] = (t6 >>> 8 | t7 << 8) & 8191;
            this.r[9] = t7 >>> 5 & 127;
            this.pad[0] = key[16] & 255 | (key[17] & 255) << 8;
            this.pad[1] = key[18] & 255 | (key[19] & 255) << 8;
            this.pad[2] = key[20] & 255 | (key[21] & 255) << 8;
            this.pad[3] = key[22] & 255 | (key[23] & 255) << 8;
            this.pad[4] = key[24] & 255 | (key[25] & 255) << 8;
            this.pad[5] = key[26] & 255 | (key[27] & 255) << 8;
            this.pad[6] = key[28] & 255 | (key[29] & 255) << 8;
            this.pad[7] = key[30] & 255 | (key[31] & 255) << 8;
        };
        poly1305.prototype.blocks = function (m, mpos, bytes2) {
            const hibit = this.fin ? 0 : 1 << 11;
            let t0; let t1; let t2; let t3; let t4; let t5; let t6; let t7; let
                c;
            let d0; let d1; let d2; let d3; let d4; let d5; let d6; let d7; let d8; let
                d9;
            let h0 = this.h[0]; let h1 = this.h[1]; let h2 = this.h[2]; let h3 = this.h[3]; let h4 = this.h[4]; let h5 = this.h[5]; let h6 = this.h[6]; let h7 = this.h[7]; let h8 = this.h[8]; let
                h9 = this.h[9];
            const r0 = this.r[0]; const r1 = this.r[1]; const r2 = this.r[2]; const r3 = this.r[3]; const r4 = this.r[4]; const r5 = this.r[5]; const r6 = this.r[6]; const r7 = this.r[7]; const r8 = this.r[8]; const
                r9 = this.r[9];
            while (bytes2 >= 16) {
                t0 = m[mpos + 0] & 255 | (m[mpos + 1] & 255) << 8;
                h0 += t0 & 8191;
                t1 = m[mpos + 2] & 255 | (m[mpos + 3] & 255) << 8;
                h1 += (t0 >>> 13 | t1 << 3) & 8191;
                t2 = m[mpos + 4] & 255 | (m[mpos + 5] & 255) << 8;
                h2 += (t1 >>> 10 | t2 << 6) & 8191;
                t3 = m[mpos + 6] & 255 | (m[mpos + 7] & 255) << 8;
                h3 += (t2 >>> 7 | t3 << 9) & 8191;
                t4 = m[mpos + 8] & 255 | (m[mpos + 9] & 255) << 8;
                h4 += (t3 >>> 4 | t4 << 12) & 8191;
                h5 += t4 >>> 1 & 8191;
                t5 = m[mpos + 10] & 255 | (m[mpos + 11] & 255) << 8;
                h6 += (t4 >>> 14 | t5 << 2) & 8191;
                t6 = m[mpos + 12] & 255 | (m[mpos + 13] & 255) << 8;
                h7 += (t5 >>> 11 | t6 << 5) & 8191;
                t7 = m[mpos + 14] & 255 | (m[mpos + 15] & 255) << 8;
                h8 += (t6 >>> 8 | t7 << 8) & 8191;
                h9 += t7 >>> 5 | hibit;
                c = 0;
                d0 = c;
                d0 += h0 * r0;
                d0 += h1 * (5 * r9);
                d0 += h2 * (5 * r8);
                d0 += h3 * (5 * r7);
                d0 += h4 * (5 * r6);
                c = d0 >>> 13;
                d0 &= 8191;
                d0 += h5 * (5 * r5);
                d0 += h6 * (5 * r4);
                d0 += h7 * (5 * r3);
                d0 += h8 * (5 * r2);
                d0 += h9 * (5 * r1);
                c += d0 >>> 13;
                d0 &= 8191;
                d1 = c;
                d1 += h0 * r1;
                d1 += h1 * r0;
                d1 += h2 * (5 * r9);
                d1 += h3 * (5 * r8);
                d1 += h4 * (5 * r7);
                c = d1 >>> 13;
                d1 &= 8191;
                d1 += h5 * (5 * r6);
                d1 += h6 * (5 * r5);
                d1 += h7 * (5 * r4);
                d1 += h8 * (5 * r3);
                d1 += h9 * (5 * r2);
                c += d1 >>> 13;
                d1 &= 8191;
                d2 = c;
                d2 += h0 * r2;
                d2 += h1 * r1;
                d2 += h2 * r0;
                d2 += h3 * (5 * r9);
                d2 += h4 * (5 * r8);
                c = d2 >>> 13;
                d2 &= 8191;
                d2 += h5 * (5 * r7);
                d2 += h6 * (5 * r6);
                d2 += h7 * (5 * r5);
                d2 += h8 * (5 * r4);
                d2 += h9 * (5 * r3);
                c += d2 >>> 13;
                d2 &= 8191;
                d3 = c;
                d3 += h0 * r3;
                d3 += h1 * r2;
                d3 += h2 * r1;
                d3 += h3 * r0;
                d3 += h4 * (5 * r9);
                c = d3 >>> 13;
                d3 &= 8191;
                d3 += h5 * (5 * r8);
                d3 += h6 * (5 * r7);
                d3 += h7 * (5 * r6);
                d3 += h8 * (5 * r5);
                d3 += h9 * (5 * r4);
                c += d3 >>> 13;
                d3 &= 8191;
                d4 = c;
                d4 += h0 * r4;
                d4 += h1 * r3;
                d4 += h2 * r2;
                d4 += h3 * r1;
                d4 += h4 * r0;
                c = d4 >>> 13;
                d4 &= 8191;
                d4 += h5 * (5 * r9);
                d4 += h6 * (5 * r8);
                d4 += h7 * (5 * r7);
                d4 += h8 * (5 * r6);
                d4 += h9 * (5 * r5);
                c += d4 >>> 13;
                d4 &= 8191;
                d5 = c;
                d5 += h0 * r5;
                d5 += h1 * r4;
                d5 += h2 * r3;
                d5 += h3 * r2;
                d5 += h4 * r1;
                c = d5 >>> 13;
                d5 &= 8191;
                d5 += h5 * r0;
                d5 += h6 * (5 * r9);
                d5 += h7 * (5 * r8);
                d5 += h8 * (5 * r7);
                d5 += h9 * (5 * r6);
                c += d5 >>> 13;
                d5 &= 8191;
                d6 = c;
                d6 += h0 * r6;
                d6 += h1 * r5;
                d6 += h2 * r4;
                d6 += h3 * r3;
                d6 += h4 * r2;
                c = d6 >>> 13;
                d6 &= 8191;
                d6 += h5 * r1;
                d6 += h6 * r0;
                d6 += h7 * (5 * r9);
                d6 += h8 * (5 * r8);
                d6 += h9 * (5 * r7);
                c += d6 >>> 13;
                d6 &= 8191;
                d7 = c;
                d7 += h0 * r7;
                d7 += h1 * r6;
                d7 += h2 * r5;
                d7 += h3 * r4;
                d7 += h4 * r3;
                c = d7 >>> 13;
                d7 &= 8191;
                d7 += h5 * r2;
                d7 += h6 * r1;
                d7 += h7 * r0;
                d7 += h8 * (5 * r9);
                d7 += h9 * (5 * r8);
                c += d7 >>> 13;
                d7 &= 8191;
                d8 = c;
                d8 += h0 * r8;
                d8 += h1 * r7;
                d8 += h2 * r6;
                d8 += h3 * r5;
                d8 += h4 * r4;
                c = d8 >>> 13;
                d8 &= 8191;
                d8 += h5 * r3;
                d8 += h6 * r2;
                d8 += h7 * r1;
                d8 += h8 * r0;
                d8 += h9 * (5 * r9);
                c += d8 >>> 13;
                d8 &= 8191;
                d9 = c;
                d9 += h0 * r9;
                d9 += h1 * r8;
                d9 += h2 * r7;
                d9 += h3 * r6;
                d9 += h4 * r5;
                c = d9 >>> 13;
                d9 &= 8191;
                d9 += h5 * r4;
                d9 += h6 * r3;
                d9 += h7 * r2;
                d9 += h8 * r1;
                d9 += h9 * r0;
                c += d9 >>> 13;
                d9 &= 8191;
                c = (c << 2) + c | 0;
                c = c + d0 | 0;
                d0 = c & 8191;
                c >>>= 13;
                d1 += c;
                h0 = d0;
                h1 = d1;
                h2 = d2;
                h3 = d3;
                h4 = d4;
                h5 = d5;
                h6 = d6;
                h7 = d7;
                h8 = d8;
                h9 = d9;
                mpos += 16;
                bytes2 -= 16;
            }
            this.h[0] = h0;
            this.h[1] = h1;
            this.h[2] = h2;
            this.h[3] = h3;
            this.h[4] = h4;
            this.h[5] = h5;
            this.h[6] = h6;
            this.h[7] = h7;
            this.h[8] = h8;
            this.h[9] = h9;
        };
        poly1305.prototype.finish = function (mac, macpos) {
            const g = new Uint16Array(10);
            let c; let mask2; let f; let
                i;
            if (this.leftover) {
                i = this.leftover;
                this.buffer[i++] = 1;
                for (; i < 16; i++) this.buffer[i] = 0;
                this.fin = 1;
                this.blocks(this.buffer, 0, 16);
            }
            c = this.h[1] >>> 13;
            this.h[1] &= 8191;
            for (i = 2; i < 10; i++) {
                this.h[i] += c;
                c = this.h[i] >>> 13;
                this.h[i] &= 8191;
            }
            this.h[0] += c * 5;
            c = this.h[0] >>> 13;
            this.h[0] &= 8191;
            this.h[1] += c;
            c = this.h[1] >>> 13;
            this.h[1] &= 8191;
            this.h[2] += c;
            g[0] = this.h[0] + 5;
            c = g[0] >>> 13;
            g[0] &= 8191;
            for (i = 1; i < 10; i++) {
                g[i] = this.h[i] + c;
                c = g[i] >>> 13;
                g[i] &= 8191;
            }
            g[9] -= 1 << 13;
            mask2 = (c ^ 1) - 1;
            for (i = 0; i < 10; i++) g[i] &= mask2;
            mask2 = ~mask2;
            for (i = 0; i < 10; i++) this.h[i] = this.h[i] & mask2 | g[i];
            this.h[0] = (this.h[0] | this.h[1] << 13) & 65535;
            this.h[1] = (this.h[1] >>> 3 | this.h[2] << 10) & 65535;
            this.h[2] = (this.h[2] >>> 6 | this.h[3] << 7) & 65535;
            this.h[3] = (this.h[3] >>> 9 | this.h[4] << 4) & 65535;
            this.h[4] = (this.h[4] >>> 12 | this.h[5] << 1 | this.h[6] << 14) & 65535;
            this.h[5] = (this.h[6] >>> 2 | this.h[7] << 11) & 65535;
            this.h[6] = (this.h[7] >>> 5 | this.h[8] << 8) & 65535;
            this.h[7] = (this.h[8] >>> 8 | this.h[9] << 5) & 65535;
            f = this.h[0] + this.pad[0];
            this.h[0] = f & 65535;
            for (i = 1; i < 8; i++) {
                f = (this.h[i] + this.pad[i] | 0) + (f >>> 16) | 0;
                this.h[i] = f & 65535;
            }
            mac[macpos + 0] = this.h[0] >>> 0 & 255;
            mac[macpos + 1] = this.h[0] >>> 8 & 255;
            mac[macpos + 2] = this.h[1] >>> 0 & 255;
            mac[macpos + 3] = this.h[1] >>> 8 & 255;
            mac[macpos + 4] = this.h[2] >>> 0 & 255;
            mac[macpos + 5] = this.h[2] >>> 8 & 255;
            mac[macpos + 6] = this.h[3] >>> 0 & 255;
            mac[macpos + 7] = this.h[3] >>> 8 & 255;
            mac[macpos + 8] = this.h[4] >>> 0 & 255;
            mac[macpos + 9] = this.h[4] >>> 8 & 255;
            mac[macpos + 10] = this.h[5] >>> 0 & 255;
            mac[macpos + 11] = this.h[5] >>> 8 & 255;
            mac[macpos + 12] = this.h[6] >>> 0 & 255;
            mac[macpos + 13] = this.h[6] >>> 8 & 255;
            mac[macpos + 14] = this.h[7] >>> 0 & 255;
            mac[macpos + 15] = this.h[7] >>> 8 & 255;
        };
        poly1305.prototype.update = function (m, mpos, bytes2) {
            let i; let
                want;
            if (this.leftover) {
                want = 16 - this.leftover;
                if (want > bytes2) want = bytes2;
                for (i = 0; i < want; i++) this.buffer[this.leftover + i] = m[mpos + i];
                bytes2 -= want;
                mpos += want;
                this.leftover += want;
                if (this.leftover < 16) return;
                this.blocks(this.buffer, 0, 16);
                this.leftover = 0;
            }
            if (bytes2 >= 16) {
                want = bytes2 - bytes2 % 16;
                this.blocks(m, mpos, want);
                mpos += want;
                bytes2 -= want;
            }
            if (bytes2) {
                for (i = 0; i < bytes2; i++) this.buffer[this.leftover + i] = m[mpos + i];
                this.leftover += bytes2;
            }
        };
        function crypto_onetimeauth(out, outpos, m, mpos, n, k) {
            const s = new poly1305(k);
            s.update(m, mpos, n);
            s.finish(out, outpos);
            return 0;
        }
        function crypto_onetimeauth_verify(h, hpos, m, mpos, n, k) {
            const x = new Uint8Array(16);
            crypto_onetimeauth(x, 0, m, mpos, n, k);
            return crypto_verify_16(h, hpos, x, 0);
        }
        function crypto_secretbox(c, m, d, n, k) {
            let i;
            if (d < 32) return -1;
            crypto_stream_xor(c, 0, m, 0, d, n, k);
            crypto_onetimeauth(c, 16, c, 32, d - 32, c);
            for (i = 0; i < 16; i++) c[i] = 0;
            return 0;
        }
        function crypto_secretbox_open(m, c, d, n, k) {
            let i;
            const x = new Uint8Array(32);
            if (d < 32) return -1;
            crypto_stream(x, 0, 32, n, k);
            if (crypto_onetimeauth_verify(c, 16, c, 32, d - 32, x) !== 0) return -1;
            crypto_stream_xor(m, 0, c, 0, d, n, k);
            for (i = 0; i < 32; i++) m[i] = 0;
            return 0;
        }
        function set25519(r, a) {
            let i;
            for (i = 0; i < 16; i++) r[i] = a[i] | 0;
        }
        function car25519(o) {
            let i; let v; let
                c = 1;
            for (i = 0; i < 16; i++) {
                v = o[i] + c + 65535;
                c = Math.floor(v / 65536);
                o[i] = v - c * 65536;
            }
            o[0] += c - 1 + 37 * (c - 1);
        }
        function sel25519(p, q, b) {
            let t; const
                c = ~(b - 1);
            for (let i = 0; i < 16; i++) {
                t = c & (p[i] ^ q[i]);
                p[i] ^= t;
                q[i] ^= t;
            }
        }
        function pack25519(o, n) {
            let i; let j; let
                b;
            const m = gf(); const
                t = gf();
            for (i = 0; i < 16; i++) t[i] = n[i];
            car25519(t);
            car25519(t);
            car25519(t);
            for (j = 0; j < 2; j++) {
                m[0] = t[0] - 65517;
                for (i = 1; i < 15; i++) {
                    m[i] = t[i] - 65535 - (m[i - 1] >> 16 & 1);
                    m[i - 1] &= 65535;
                }
                m[15] = t[15] - 32767 - (m[14] >> 16 & 1);
                b = m[15] >> 16 & 1;
                m[14] &= 65535;
                sel25519(t, m, 1 - b);
            }
            for (i = 0; i < 16; i++) {
                o[2 * i] = t[i] & 255;
                o[2 * i + 1] = t[i] >> 8;
            }
        }
        function neq25519(a, b) {
            const c = new Uint8Array(32); const
                d = new Uint8Array(32);
            pack25519(c, a);
            pack25519(d, b);
            return crypto_verify_32(c, 0, d, 0);
        }
        function par25519(a) {
            const d = new Uint8Array(32);
            pack25519(d, a);
            return d[0] & 1;
        }
        function unpack25519(o, n) {
            let i;
            for (i = 0; i < 16; i++) o[i] = n[2 * i] + (n[2 * i + 1] << 8);
            o[15] &= 32767;
        }
        function A(o, a, b) {
            for (let i = 0; i < 16; i++) o[i] = a[i] + b[i];
        }
        function Z(o, a, b) {
            for (let i = 0; i < 16; i++) o[i] = a[i] - b[i];
        }
        function M(o, a, b) {
            let v; let c; let t0 = 0; let t1 = 0; let t2 = 0; let t3 = 0; let t4 = 0; let t5 = 0; let t6 = 0; let t7 = 0; let t8 = 0; let t9 = 0; let t10 = 0; let t11 = 0; let t12 = 0; let t13 = 0; let t14 = 0; let t15 = 0; let t16 = 0; let t17 = 0; let t18 = 0; let t19 = 0; let t20 = 0; let t21 = 0; let t22 = 0; let t23 = 0; let t24 = 0; let t25 = 0; let t26 = 0; let t27 = 0; let t28 = 0; let t29 = 0; let t30 = 0; const b0 = b[0]; const b1 = b[1]; const b2 = b[2]; const b3 = b[3]; const b4 = b[4]; const b5 = b[5]; const b6 = b[6]; const b7 = b[7]; const b8 = b[8]; const b9 = b[9]; const b10 = b[10]; const b11 = b[11]; const b12 = b[12]; const b13 = b[13]; const b14 = b[14]; const
                b15 = b[15];
            v = a[0];
            t0 += v * b0;
            t1 += v * b1;
            t2 += v * b2;
            t3 += v * b3;
            t4 += v * b4;
            t5 += v * b5;
            t6 += v * b6;
            t7 += v * b7;
            t8 += v * b8;
            t9 += v * b9;
            t10 += v * b10;
            t11 += v * b11;
            t12 += v * b12;
            t13 += v * b13;
            t14 += v * b14;
            t15 += v * b15;
            v = a[1];
            t1 += v * b0;
            t2 += v * b1;
            t3 += v * b2;
            t4 += v * b3;
            t5 += v * b4;
            t6 += v * b5;
            t7 += v * b6;
            t8 += v * b7;
            t9 += v * b8;
            t10 += v * b9;
            t11 += v * b10;
            t12 += v * b11;
            t13 += v * b12;
            t14 += v * b13;
            t15 += v * b14;
            t16 += v * b15;
            v = a[2];
            t2 += v * b0;
            t3 += v * b1;
            t4 += v * b2;
            t5 += v * b3;
            t6 += v * b4;
            t7 += v * b5;
            t8 += v * b6;
            t9 += v * b7;
            t10 += v * b8;
            t11 += v * b9;
            t12 += v * b10;
            t13 += v * b11;
            t14 += v * b12;
            t15 += v * b13;
            t16 += v * b14;
            t17 += v * b15;
            v = a[3];
            t3 += v * b0;
            t4 += v * b1;
            t5 += v * b2;
            t6 += v * b3;
            t7 += v * b4;
            t8 += v * b5;
            t9 += v * b6;
            t10 += v * b7;
            t11 += v * b8;
            t12 += v * b9;
            t13 += v * b10;
            t14 += v * b11;
            t15 += v * b12;
            t16 += v * b13;
            t17 += v * b14;
            t18 += v * b15;
            v = a[4];
            t4 += v * b0;
            t5 += v * b1;
            t6 += v * b2;
            t7 += v * b3;
            t8 += v * b4;
            t9 += v * b5;
            t10 += v * b6;
            t11 += v * b7;
            t12 += v * b8;
            t13 += v * b9;
            t14 += v * b10;
            t15 += v * b11;
            t16 += v * b12;
            t17 += v * b13;
            t18 += v * b14;
            t19 += v * b15;
            v = a[5];
            t5 += v * b0;
            t6 += v * b1;
            t7 += v * b2;
            t8 += v * b3;
            t9 += v * b4;
            t10 += v * b5;
            t11 += v * b6;
            t12 += v * b7;
            t13 += v * b8;
            t14 += v * b9;
            t15 += v * b10;
            t16 += v * b11;
            t17 += v * b12;
            t18 += v * b13;
            t19 += v * b14;
            t20 += v * b15;
            v = a[6];
            t6 += v * b0;
            t7 += v * b1;
            t8 += v * b2;
            t9 += v * b3;
            t10 += v * b4;
            t11 += v * b5;
            t12 += v * b6;
            t13 += v * b7;
            t14 += v * b8;
            t15 += v * b9;
            t16 += v * b10;
            t17 += v * b11;
            t18 += v * b12;
            t19 += v * b13;
            t20 += v * b14;
            t21 += v * b15;
            v = a[7];
            t7 += v * b0;
            t8 += v * b1;
            t9 += v * b2;
            t10 += v * b3;
            t11 += v * b4;
            t12 += v * b5;
            t13 += v * b6;
            t14 += v * b7;
            t15 += v * b8;
            t16 += v * b9;
            t17 += v * b10;
            t18 += v * b11;
            t19 += v * b12;
            t20 += v * b13;
            t21 += v * b14;
            t22 += v * b15;
            v = a[8];
            t8 += v * b0;
            t9 += v * b1;
            t10 += v * b2;
            t11 += v * b3;
            t12 += v * b4;
            t13 += v * b5;
            t14 += v * b6;
            t15 += v * b7;
            t16 += v * b8;
            t17 += v * b9;
            t18 += v * b10;
            t19 += v * b11;
            t20 += v * b12;
            t21 += v * b13;
            t22 += v * b14;
            t23 += v * b15;
            v = a[9];
            t9 += v * b0;
            t10 += v * b1;
            t11 += v * b2;
            t12 += v * b3;
            t13 += v * b4;
            t14 += v * b5;
            t15 += v * b6;
            t16 += v * b7;
            t17 += v * b8;
            t18 += v * b9;
            t19 += v * b10;
            t20 += v * b11;
            t21 += v * b12;
            t22 += v * b13;
            t23 += v * b14;
            t24 += v * b15;
            v = a[10];
            t10 += v * b0;
            t11 += v * b1;
            t12 += v * b2;
            t13 += v * b3;
            t14 += v * b4;
            t15 += v * b5;
            t16 += v * b6;
            t17 += v * b7;
            t18 += v * b8;
            t19 += v * b9;
            t20 += v * b10;
            t21 += v * b11;
            t22 += v * b12;
            t23 += v * b13;
            t24 += v * b14;
            t25 += v * b15;
            v = a[11];
            t11 += v * b0;
            t12 += v * b1;
            t13 += v * b2;
            t14 += v * b3;
            t15 += v * b4;
            t16 += v * b5;
            t17 += v * b6;
            t18 += v * b7;
            t19 += v * b8;
            t20 += v * b9;
            t21 += v * b10;
            t22 += v * b11;
            t23 += v * b12;
            t24 += v * b13;
            t25 += v * b14;
            t26 += v * b15;
            v = a[12];
            t12 += v * b0;
            t13 += v * b1;
            t14 += v * b2;
            t15 += v * b3;
            t16 += v * b4;
            t17 += v * b5;
            t18 += v * b6;
            t19 += v * b7;
            t20 += v * b8;
            t21 += v * b9;
            t22 += v * b10;
            t23 += v * b11;
            t24 += v * b12;
            t25 += v * b13;
            t26 += v * b14;
            t27 += v * b15;
            v = a[13];
            t13 += v * b0;
            t14 += v * b1;
            t15 += v * b2;
            t16 += v * b3;
            t17 += v * b4;
            t18 += v * b5;
            t19 += v * b6;
            t20 += v * b7;
            t21 += v * b8;
            t22 += v * b9;
            t23 += v * b10;
            t24 += v * b11;
            t25 += v * b12;
            t26 += v * b13;
            t27 += v * b14;
            t28 += v * b15;
            v = a[14];
            t14 += v * b0;
            t15 += v * b1;
            t16 += v * b2;
            t17 += v * b3;
            t18 += v * b4;
            t19 += v * b5;
            t20 += v * b6;
            t21 += v * b7;
            t22 += v * b8;
            t23 += v * b9;
            t24 += v * b10;
            t25 += v * b11;
            t26 += v * b12;
            t27 += v * b13;
            t28 += v * b14;
            t29 += v * b15;
            v = a[15];
            t15 += v * b0;
            t16 += v * b1;
            t17 += v * b2;
            t18 += v * b3;
            t19 += v * b4;
            t20 += v * b5;
            t21 += v * b6;
            t22 += v * b7;
            t23 += v * b8;
            t24 += v * b9;
            t25 += v * b10;
            t26 += v * b11;
            t27 += v * b12;
            t28 += v * b13;
            t29 += v * b14;
            t30 += v * b15;
            t0 += 38 * t16;
            t1 += 38 * t17;
            t2 += 38 * t18;
            t3 += 38 * t19;
            t4 += 38 * t20;
            t5 += 38 * t21;
            t6 += 38 * t22;
            t7 += 38 * t23;
            t8 += 38 * t24;
            t9 += 38 * t25;
            t10 += 38 * t26;
            t11 += 38 * t27;
            t12 += 38 * t28;
            t13 += 38 * t29;
            t14 += 38 * t30;
            c = 1;
            v = t0 + c + 65535;
            c = Math.floor(v / 65536);
            t0 = v - c * 65536;
            v = t1 + c + 65535;
            c = Math.floor(v / 65536);
            t1 = v - c * 65536;
            v = t2 + c + 65535;
            c = Math.floor(v / 65536);
            t2 = v - c * 65536;
            v = t3 + c + 65535;
            c = Math.floor(v / 65536);
            t3 = v - c * 65536;
            v = t4 + c + 65535;
            c = Math.floor(v / 65536);
            t4 = v - c * 65536;
            v = t5 + c + 65535;
            c = Math.floor(v / 65536);
            t5 = v - c * 65536;
            v = t6 + c + 65535;
            c = Math.floor(v / 65536);
            t6 = v - c * 65536;
            v = t7 + c + 65535;
            c = Math.floor(v / 65536);
            t7 = v - c * 65536;
            v = t8 + c + 65535;
            c = Math.floor(v / 65536);
            t8 = v - c * 65536;
            v = t9 + c + 65535;
            c = Math.floor(v / 65536);
            t9 = v - c * 65536;
            v = t10 + c + 65535;
            c = Math.floor(v / 65536);
            t10 = v - c * 65536;
            v = t11 + c + 65535;
            c = Math.floor(v / 65536);
            t11 = v - c * 65536;
            v = t12 + c + 65535;
            c = Math.floor(v / 65536);
            t12 = v - c * 65536;
            v = t13 + c + 65535;
            c = Math.floor(v / 65536);
            t13 = v - c * 65536;
            v = t14 + c + 65535;
            c = Math.floor(v / 65536);
            t14 = v - c * 65536;
            v = t15 + c + 65535;
            c = Math.floor(v / 65536);
            t15 = v - c * 65536;
            t0 += c - 1 + 37 * (c - 1);
            c = 1;
            v = t0 + c + 65535;
            c = Math.floor(v / 65536);
            t0 = v - c * 65536;
            v = t1 + c + 65535;
            c = Math.floor(v / 65536);
            t1 = v - c * 65536;
            v = t2 + c + 65535;
            c = Math.floor(v / 65536);
            t2 = v - c * 65536;
            v = t3 + c + 65535;
            c = Math.floor(v / 65536);
            t3 = v - c * 65536;
            v = t4 + c + 65535;
            c = Math.floor(v / 65536);
            t4 = v - c * 65536;
            v = t5 + c + 65535;
            c = Math.floor(v / 65536);
            t5 = v - c * 65536;
            v = t6 + c + 65535;
            c = Math.floor(v / 65536);
            t6 = v - c * 65536;
            v = t7 + c + 65535;
            c = Math.floor(v / 65536);
            t7 = v - c * 65536;
            v = t8 + c + 65535;
            c = Math.floor(v / 65536);
            t8 = v - c * 65536;
            v = t9 + c + 65535;
            c = Math.floor(v / 65536);
            t9 = v - c * 65536;
            v = t10 + c + 65535;
            c = Math.floor(v / 65536);
            t10 = v - c * 65536;
            v = t11 + c + 65535;
            c = Math.floor(v / 65536);
            t11 = v - c * 65536;
            v = t12 + c + 65535;
            c = Math.floor(v / 65536);
            t12 = v - c * 65536;
            v = t13 + c + 65535;
            c = Math.floor(v / 65536);
            t13 = v - c * 65536;
            v = t14 + c + 65535;
            c = Math.floor(v / 65536);
            t14 = v - c * 65536;
            v = t15 + c + 65535;
            c = Math.floor(v / 65536);
            t15 = v - c * 65536;
            t0 += c - 1 + 37 * (c - 1);
            o[0] = t0;
            o[1] = t1;
            o[2] = t2;
            o[3] = t3;
            o[4] = t4;
            o[5] = t5;
            o[6] = t6;
            o[7] = t7;
            o[8] = t8;
            o[9] = t9;
            o[10] = t10;
            o[11] = t11;
            o[12] = t12;
            o[13] = t13;
            o[14] = t14;
            o[15] = t15;
        }
        function S(o, a) {
            M(o, a, a);
        }
        function inv25519(o, i) {
            const c = gf();
            let a;
            for (a = 0; a < 16; a++) c[a] = i[a];
            for (a = 253; a >= 0; a--) {
                S(c, c);
                if (a !== 2 && a !== 4) M(c, c, i);
            }
            for (a = 0; a < 16; a++) o[a] = c[a];
        }
        function pow2523(o, i) {
            const c = gf();
            let a;
            for (a = 0; a < 16; a++) c[a] = i[a];
            for (a = 250; a >= 0; a--) {
                S(c, c);
                if (a !== 1) M(c, c, i);
            }
            for (a = 0; a < 16; a++) o[a] = c[a];
        }
        function crypto_scalarmult(q, n, p) {
            const z = new Uint8Array(32);
            const x = new Float64Array(80); let r; let
                i;
            const a = gf(); const b = gf(); const c = gf(); const d = gf(); const e = gf(); const
                f = gf();
            for (i = 0; i < 31; i++) z[i] = n[i];
            z[31] = n[31] & 127 | 64;
            z[0] &= 248;
            unpack25519(x, p);
            for (i = 0; i < 16; i++) {
                b[i] = x[i];
                d[i] = a[i] = c[i] = 0;
            }
            a[0] = d[0] = 1;
            for (i = 254; i >= 0; --i) {
                r = z[i >>> 3] >>> (i & 7) & 1;
                sel25519(a, b, r);
                sel25519(c, d, r);
                A(e, a, c);
                Z(a, a, c);
                A(c, b, d);
                Z(b, b, d);
                S(d, e);
                S(f, a);
                M(a, c, a);
                M(c, b, e);
                A(e, a, c);
                Z(a, a, c);
                S(b, a);
                Z(c, d, f);
                M(a, c, _121665);
                A(a, a, d);
                M(c, c, a);
                M(a, d, f);
                M(d, b, x);
                S(b, e);
                sel25519(a, b, r);
                sel25519(c, d, r);
            }
            for (i = 0; i < 16; i++) {
                x[i + 16] = a[i];
                x[i + 32] = c[i];
                x[i + 48] = b[i];
                x[i + 64] = d[i];
            }
            const x32 = x.subarray(32);
            const x16 = x.subarray(16);
            inv25519(x32, x32);
            M(x16, x16, x32);
            pack25519(q, x16);
            return 0;
        }
        function crypto_scalarmult_base(q, n) {
            return crypto_scalarmult(q, n, _9);
        }
        function crypto_box_keypair(y, x) {
            randombytes(x, 32);
            return crypto_scalarmult_base(y, x);
        }
        function crypto_box_beforenm(k, y, x) {
            const s = new Uint8Array(32);
            crypto_scalarmult(s, x, y);
            return crypto_core_hsalsa20(k, _0, s, sigma);
        }
        const crypto_box_afternm = crypto_secretbox;
        const crypto_box_open_afternm = crypto_secretbox_open;
        function crypto_box(c, m, d, n, y, x) {
            const k = new Uint8Array(32);
            crypto_box_beforenm(k, y, x);
            return crypto_box_afternm(c, m, d, n, k);
        }
        function crypto_box_open(m, c, d, n, y, x) {
            const k = new Uint8Array(32);
            crypto_box_beforenm(k, y, x);
            return crypto_box_open_afternm(m, c, d, n, k);
        }
        const K = [
            1116352408,
            3609767458,
            1899447441,
            602891725,
            3049323471,
            3964484399,
            3921009573,
            2173295548,
            961987163,
            4081628472,
            1508970993,
            3053834265,
            2453635748,
            2937671579,
            2870763221,
            3664609560,
            3624381080,
            2734883394,
            310598401,
            1164996542,
            607225278,
            1323610764,
            1426881987,
            3590304994,
            1925078388,
            4068182383,
            2162078206,
            991336113,
            2614888103,
            633803317,
            3248222580,
            3479774868,
            3835390401,
            2666613458,
            4022224774,
            944711139,
            264347078,
            2341262773,
            604807628,
            2007800933,
            770255983,
            1495990901,
            1249150122,
            1856431235,
            1555081692,
            3175218132,
            1996064986,
            2198950837,
            2554220882,
            3999719339,
            2821834349,
            766784016,
            2952996808,
            2566594879,
            3210313671,
            3203337956,
            3336571891,
            1034457026,
            3584528711,
            2466948901,
            113926993,
            3758326383,
            338241895,
            168717936,
            666307205,
            1188179964,
            773529912,
            1546045734,
            1294757372,
            1522805485,
            1396182291,
            2643833823,
            1695183700,
            2343527390,
            1986661051,
            1014477480,
            2177026350,
            1206759142,
            2456956037,
            344077627,
            2730485921,
            1290863460,
            2820302411,
            3158454273,
            3259730800,
            3505952657,
            3345764771,
            106217008,
            3516065817,
            3606008344,
            3600352804,
            1432725776,
            4094571909,
            1467031594,
            275423344,
            851169720,
            430227734,
            3100823752,
            506948616,
            1363258195,
            659060556,
            3750685593,
            883997877,
            3785050280,
            958139571,
            3318307427,
            1322822218,
            3812723403,
            1537002063,
            2003034995,
            1747873779,
            3602036899,
            1955562222,
            1575990012,
            2024104815,
            1125592928,
            2227730452,
            2716904306,
            2361852424,
            442776044,
            2428436474,
            593698344,
            2756734187,
            3733110249,
            3204031479,
            2999351573,
            3329325298,
            3815920427,
            3391569614,
            3928383900,
            3515267271,
            566280711,
            3940187606,
            3454069534,
            4118630271,
            4000239992,
            116418474,
            1914138554,
            174292421,
            2731055270,
            289380356,
            3203993006,
            460393269,
            320620315,
            685471733,
            587496836,
            852142971,
            1086792851,
            1017036298,
            365543100,
            1126000580,
            2618297676,
            1288033470,
            3409855158,
            1501505948,
            4234509866,
            1607167915,
            987167468,
            1816402316,
            1246189591,
        ];
        function crypto_hashblocks_hl(hh, hl, m, n) {
            const wh = new Int32Array(16); const wl = new Int32Array(16); let bh0; let bh1; let bh2; let bh3; let bh4; let bh5; let bh6; let bh7; let bl0; let bl1; let bl2; let bl3; let bl4; let bl5; let bl6; let bl7; let th; let tl; let i; let j; let h; let l; let a; let b; let c; let
                d;
            let ah0 = hh[0]; let ah1 = hh[1]; let ah2 = hh[2]; let ah3 = hh[3]; let ah4 = hh[4]; let ah5 = hh[5]; let ah6 = hh[6]; let ah7 = hh[7]; let al0 = hl[0]; let al1 = hl[1]; let al2 = hl[2]; let al3 = hl[3]; let al4 = hl[4]; let al5 = hl[5]; let al6 = hl[6]; let
                al7 = hl[7];
            let pos = 0;
            while (n >= 128) {
                for (i = 0; i < 16; i++) {
                    j = 8 * i + pos;
                    wh[i] = m[j + 0] << 24 | m[j + 1] << 16 | m[j + 2] << 8 | m[j + 3];
                    wl[i] = m[j + 4] << 24 | m[j + 5] << 16 | m[j + 6] << 8 | m[j + 7];
                }
                for (i = 0; i < 80; i++) {
                    bh0 = ah0;
                    bh1 = ah1;
                    bh2 = ah2;
                    bh3 = ah3;
                    bh4 = ah4;
                    bh5 = ah5;
                    bh6 = ah6;
                    bh7 = ah7;
                    bl0 = al0;
                    bl1 = al1;
                    bl2 = al2;
                    bl3 = al3;
                    bl4 = al4;
                    bl5 = al5;
                    bl6 = al6;
                    bl7 = al7;
                    h = ah7;
                    l = al7;
                    a = l & 65535;
                    b = l >>> 16;
                    c = h & 65535;
                    d = h >>> 16;
                    h = (ah4 >>> 14 | al4 << 32 - 14) ^ (ah4 >>> 18 | al4 << 32 - 18) ^ (al4 >>> 41 - 32 | ah4 << 32 - (41 - 32));
                    l = (al4 >>> 14 | ah4 << 32 - 14) ^ (al4 >>> 18 | ah4 << 32 - 18) ^ (ah4 >>> 41 - 32 | al4 << 32 - (41 - 32));
                    a += l & 65535;
                    b += l >>> 16;
                    c += h & 65535;
                    d += h >>> 16;
                    h = ah4 & ah5 ^ ~ah4 & ah6;
                    l = al4 & al5 ^ ~al4 & al6;
                    a += l & 65535;
                    b += l >>> 16;
                    c += h & 65535;
                    d += h >>> 16;
                    h = K[i * 2];
                    l = K[i * 2 + 1];
                    a += l & 65535;
                    b += l >>> 16;
                    c += h & 65535;
                    d += h >>> 16;
                    h = wh[i % 16];
                    l = wl[i % 16];
                    a += l & 65535;
                    b += l >>> 16;
                    c += h & 65535;
                    d += h >>> 16;
                    b += a >>> 16;
                    c += b >>> 16;
                    d += c >>> 16;
                    th = c & 65535 | d << 16;
                    tl = a & 65535 | b << 16;
                    h = th;
                    l = tl;
                    a = l & 65535;
                    b = l >>> 16;
                    c = h & 65535;
                    d = h >>> 16;
                    h = (ah0 >>> 28 | al0 << 32 - 28) ^ (al0 >>> 34 - 32 | ah0 << 32 - (34 - 32)) ^ (al0 >>> 39 - 32 | ah0 << 32 - (39 - 32));
                    l = (al0 >>> 28 | ah0 << 32 - 28) ^ (ah0 >>> 34 - 32 | al0 << 32 - (34 - 32)) ^ (ah0 >>> 39 - 32 | al0 << 32 - (39 - 32));
                    a += l & 65535;
                    b += l >>> 16;
                    c += h & 65535;
                    d += h >>> 16;
                    h = ah0 & ah1 ^ ah0 & ah2 ^ ah1 & ah2;
                    l = al0 & al1 ^ al0 & al2 ^ al1 & al2;
                    a += l & 65535;
                    b += l >>> 16;
                    c += h & 65535;
                    d += h >>> 16;
                    b += a >>> 16;
                    c += b >>> 16;
                    d += c >>> 16;
                    bh7 = c & 65535 | d << 16;
                    bl7 = a & 65535 | b << 16;
                    h = bh3;
                    l = bl3;
                    a = l & 65535;
                    b = l >>> 16;
                    c = h & 65535;
                    d = h >>> 16;
                    h = th;
                    l = tl;
                    a += l & 65535;
                    b += l >>> 16;
                    c += h & 65535;
                    d += h >>> 16;
                    b += a >>> 16;
                    c += b >>> 16;
                    d += c >>> 16;
                    bh3 = c & 65535 | d << 16;
                    bl3 = a & 65535 | b << 16;
                    ah1 = bh0;
                    ah2 = bh1;
                    ah3 = bh2;
                    ah4 = bh3;
                    ah5 = bh4;
                    ah6 = bh5;
                    ah7 = bh6;
                    ah0 = bh7;
                    al1 = bl0;
                    al2 = bl1;
                    al3 = bl2;
                    al4 = bl3;
                    al5 = bl4;
                    al6 = bl5;
                    al7 = bl6;
                    al0 = bl7;
                    if (i % 16 === 15) {
                        for (j = 0; j < 16; j++) {
                            h = wh[j];
                            l = wl[j];
                            a = l & 65535;
                            b = l >>> 16;
                            c = h & 65535;
                            d = h >>> 16;
                            h = wh[(j + 9) % 16];
                            l = wl[(j + 9) % 16];
                            a += l & 65535;
                            b += l >>> 16;
                            c += h & 65535;
                            d += h >>> 16;
                            th = wh[(j + 1) % 16];
                            tl = wl[(j + 1) % 16];
                            h = (th >>> 1 | tl << 32 - 1) ^ (th >>> 8 | tl << 32 - 8) ^ th >>> 7;
                            l = (tl >>> 1 | th << 32 - 1) ^ (tl >>> 8 | th << 32 - 8) ^ (tl >>> 7 | th << 32 - 7);
                            a += l & 65535;
                            b += l >>> 16;
                            c += h & 65535;
                            d += h >>> 16;
                            th = wh[(j + 14) % 16];
                            tl = wl[(j + 14) % 16];
                            h = (th >>> 19 | tl << 32 - 19) ^ (tl >>> 61 - 32 | th << 32 - (61 - 32)) ^ th >>> 6;
                            l = (tl >>> 19 | th << 32 - 19) ^ (th >>> 61 - 32 | tl << 32 - (61 - 32)) ^ (tl >>> 6 | th << 32 - 6);
                            a += l & 65535;
                            b += l >>> 16;
                            c += h & 65535;
                            d += h >>> 16;
                            b += a >>> 16;
                            c += b >>> 16;
                            d += c >>> 16;
                            wh[j] = c & 65535 | d << 16;
                            wl[j] = a & 65535 | b << 16;
                        }
                    }
                }
                h = ah0;
                l = al0;
                a = l & 65535;
                b = l >>> 16;
                c = h & 65535;
                d = h >>> 16;
                h = hh[0];
                l = hl[0];
                a += l & 65535;
                b += l >>> 16;
                c += h & 65535;
                d += h >>> 16;
                b += a >>> 16;
                c += b >>> 16;
                d += c >>> 16;
                hh[0] = ah0 = c & 65535 | d << 16;
                hl[0] = al0 = a & 65535 | b << 16;
                h = ah1;
                l = al1;
                a = l & 65535;
                b = l >>> 16;
                c = h & 65535;
                d = h >>> 16;
                h = hh[1];
                l = hl[1];
                a += l & 65535;
                b += l >>> 16;
                c += h & 65535;
                d += h >>> 16;
                b += a >>> 16;
                c += b >>> 16;
                d += c >>> 16;
                hh[1] = ah1 = c & 65535 | d << 16;
                hl[1] = al1 = a & 65535 | b << 16;
                h = ah2;
                l = al2;
                a = l & 65535;
                b = l >>> 16;
                c = h & 65535;
                d = h >>> 16;
                h = hh[2];
                l = hl[2];
                a += l & 65535;
                b += l >>> 16;
                c += h & 65535;
                d += h >>> 16;
                b += a >>> 16;
                c += b >>> 16;
                d += c >>> 16;
                hh[2] = ah2 = c & 65535 | d << 16;
                hl[2] = al2 = a & 65535 | b << 16;
                h = ah3;
                l = al3;
                a = l & 65535;
                b = l >>> 16;
                c = h & 65535;
                d = h >>> 16;
                h = hh[3];
                l = hl[3];
                a += l & 65535;
                b += l >>> 16;
                c += h & 65535;
                d += h >>> 16;
                b += a >>> 16;
                c += b >>> 16;
                d += c >>> 16;
                hh[3] = ah3 = c & 65535 | d << 16;
                hl[3] = al3 = a & 65535 | b << 16;
                h = ah4;
                l = al4;
                a = l & 65535;
                b = l >>> 16;
                c = h & 65535;
                d = h >>> 16;
                h = hh[4];
                l = hl[4];
                a += l & 65535;
                b += l >>> 16;
                c += h & 65535;
                d += h >>> 16;
                b += a >>> 16;
                c += b >>> 16;
                d += c >>> 16;
                hh[4] = ah4 = c & 65535 | d << 16;
                hl[4] = al4 = a & 65535 | b << 16;
                h = ah5;
                l = al5;
                a = l & 65535;
                b = l >>> 16;
                c = h & 65535;
                d = h >>> 16;
                h = hh[5];
                l = hl[5];
                a += l & 65535;
                b += l >>> 16;
                c += h & 65535;
                d += h >>> 16;
                b += a >>> 16;
                c += b >>> 16;
                d += c >>> 16;
                hh[5] = ah5 = c & 65535 | d << 16;
                hl[5] = al5 = a & 65535 | b << 16;
                h = ah6;
                l = al6;
                a = l & 65535;
                b = l >>> 16;
                c = h & 65535;
                d = h >>> 16;
                h = hh[6];
                l = hl[6];
                a += l & 65535;
                b += l >>> 16;
                c += h & 65535;
                d += h >>> 16;
                b += a >>> 16;
                c += b >>> 16;
                d += c >>> 16;
                hh[6] = ah6 = c & 65535 | d << 16;
                hl[6] = al6 = a & 65535 | b << 16;
                h = ah7;
                l = al7;
                a = l & 65535;
                b = l >>> 16;
                c = h & 65535;
                d = h >>> 16;
                h = hh[7];
                l = hl[7];
                a += l & 65535;
                b += l >>> 16;
                c += h & 65535;
                d += h >>> 16;
                b += a >>> 16;
                c += b >>> 16;
                d += c >>> 16;
                hh[7] = ah7 = c & 65535 | d << 16;
                hl[7] = al7 = a & 65535 | b << 16;
                pos += 128;
                n -= 128;
            }
            return n;
        }
        function crypto_hash(out, m, n) {
            const hh = new Int32Array(8); const hl = new Int32Array(8); const x = new Uint8Array(256); let i; const
                b = n;
            hh[0] = 1779033703;
            hh[1] = 3144134277;
            hh[2] = 1013904242;
            hh[3] = 2773480762;
            hh[4] = 1359893119;
            hh[5] = 2600822924;
            hh[6] = 528734635;
            hh[7] = 1541459225;
            hl[0] = 4089235720;
            hl[1] = 2227873595;
            hl[2] = 4271175723;
            hl[3] = 1595750129;
            hl[4] = 2917565137;
            hl[5] = 725511199;
            hl[6] = 4215389547;
            hl[7] = 327033209;
            crypto_hashblocks_hl(hh, hl, m, n);
            n %= 128;
            for (i = 0; i < n; i++) x[i] = m[b - n + i];
            x[n] = 128;
            n = 256 - 128 * (n < 112 ? 1 : 0);
            x[n - 9] = 0;
            ts64(x, n - 8, b / 536870912 | 0, b << 3);
            crypto_hashblocks_hl(hh, hl, x, n);
            for (i = 0; i < 8; i++) ts64(out, 8 * i, hh[i], hl[i]);
            return 0;
        }
        function add(p, q) {
            const a = gf(); const b = gf(); const c = gf(); const d = gf(); const e = gf(); const f = gf(); const g = gf(); const h = gf(); const
                t = gf();
            Z(a, p[1], p[0]);
            Z(t, q[1], q[0]);
            M(a, a, t);
            A(b, p[0], p[1]);
            A(t, q[0], q[1]);
            M(b, b, t);
            M(c, p[3], q[3]);
            M(c, c, D2);
            M(d, p[2], q[2]);
            A(d, d, d);
            Z(e, b, a);
            Z(f, d, c);
            A(g, d, c);
            A(h, b, a);
            M(p[0], e, f);
            M(p[1], h, g);
            M(p[2], g, f);
            M(p[3], e, h);
        }
        function cswap(p, q, b) {
            let i;
            for (i = 0; i < 4; i++) {
                sel25519(p[i], q[i], b);
            }
        }
        function pack(r, p) {
            const tx = gf(); const ty = gf(); const
                zi = gf();
            inv25519(zi, p[2]);
            M(tx, p[0], zi);
            M(ty, p[1], zi);
            pack25519(r, ty);
            r[31] ^= par25519(tx) << 7;
        }
        function scalarmult(p, q, s) {
            let b; let
                i;
            set25519(p[0], gf0);
            set25519(p[1], gf1);
            set25519(p[2], gf1);
            set25519(p[3], gf0);
            for (i = 255; i >= 0; --i) {
                b = s[i / 8 | 0] >> (i & 7) & 1;
                cswap(p, q, b);
                add(q, p);
                add(p, p);
                cswap(p, q, b);
            }
        }
        function scalarbase(p, s) {
            const q = [gf(), gf(), gf(), gf()];
            set25519(q[0], X);
            set25519(q[1], Y);
            set25519(q[2], gf1);
            M(q[3], X, Y);
            scalarmult(p, q, s);
        }
        function crypto_sign_keypair(pk, sk, seeded) {
            const d = new Uint8Array(64);
            const p = [gf(), gf(), gf(), gf()];
            let i;
            if (!seeded) randombytes(sk, 32);
            crypto_hash(d, sk, 32);
            d[0] &= 248;
            d[31] &= 127;
            d[31] |= 64;
            scalarbase(p, d);
            pack(pk, p);
            for (i = 0; i < 32; i++) sk[i + 32] = pk[i];
            return 0;
        }
        const L = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]);
        function modL(r, x) {
            let carry; let i; let j; let
                k;
            for (i = 63; i >= 32; --i) {
                carry = 0;
                for (j = i - 32, k = i - 12; j < k; ++j) {
                    x[j] += carry - 16 * x[i] * L[j - (i - 32)];
                    carry = Math.floor((x[j] + 128) / 256);
                    x[j] -= carry * 256;
                }
                x[j] += carry;
                x[i] = 0;
            }
            carry = 0;
            for (j = 0; j < 32; j++) {
                x[j] += carry - (x[31] >> 4) * L[j];
                carry = x[j] >> 8;
                x[j] &= 255;
            }
            for (j = 0; j < 32; j++) x[j] -= carry * L[j];
            for (i = 0; i < 32; i++) {
                x[i + 1] += x[i] >> 8;
                r[i] = x[i] & 255;
            }
        }
        function reduce2(r) {
            const x = new Float64Array(64); let
                i;
            for (i = 0; i < 64; i++) x[i] = r[i];
            for (i = 0; i < 64; i++) r[i] = 0;
            modL(r, x);
        }
        function crypto_sign(sm, m, n, sk) {
            const d = new Uint8Array(64); const h = new Uint8Array(64); const
                r = new Uint8Array(64);
            let i; let j; const
                x = new Float64Array(64);
            const p = [gf(), gf(), gf(), gf()];
            crypto_hash(d, sk, 32);
            d[0] &= 248;
            d[31] &= 127;
            d[31] |= 64;
            const smlen = n + 64;
            for (i = 0; i < n; i++) sm[64 + i] = m[i];
            for (i = 0; i < 32; i++) sm[32 + i] = d[32 + i];
            crypto_hash(r, sm.subarray(32), n + 32);
            reduce2(r);
            scalarbase(p, r);
            pack(sm, p);
            for (i = 32; i < 64; i++) sm[i] = sk[i];
            crypto_hash(h, sm, n + 64);
            reduce2(h);
            for (i = 0; i < 64; i++) x[i] = 0;
            for (i = 0; i < 32; i++) x[i] = r[i];
            for (i = 0; i < 32; i++) {
                for (j = 0; j < 32; j++) {
                    x[i + j] += h[i] * d[j];
                }
            }
            modL(sm.subarray(32), x);
            return smlen;
        }
        function unpackneg(r, p) {
            const t = gf(); const chk = gf(); const num = gf(); const den = gf(); const den2 = gf(); const den4 = gf(); const
                den6 = gf();
            set25519(r[2], gf1);
            unpack25519(r[1], p);
            S(num, r[1]);
            M(den, num, D);
            Z(num, num, r[2]);
            A(den, r[2], den);
            S(den2, den);
            S(den4, den2);
            M(den6, den4, den2);
            M(t, den6, num);
            M(t, t, den);
            pow2523(t, t);
            M(t, t, num);
            M(t, t, den);
            M(t, t, den);
            M(r[0], t, den);
            S(chk, r[0]);
            M(chk, chk, den);
            if (neq25519(chk, num)) M(r[0], r[0], I);
            S(chk, r[0]);
            M(chk, chk, den);
            if (neq25519(chk, num)) return -1;
            if (par25519(r[0]) === p[31] >> 7) Z(r[0], gf0, r[0]);
            M(r[3], r[0], r[1]);
            return 0;
        }
        function crypto_sign_open(m, sm, n, pk) {
            let i;
            const t = new Uint8Array(32); const
                h = new Uint8Array(64);
            const p = [gf(), gf(), gf(), gf()]; const
                q = [gf(), gf(), gf(), gf()];
            if (n < 64) return -1;
            if (unpackneg(q, pk)) return -1;
            for (i = 0; i < n; i++) m[i] = sm[i];
            for (i = 0; i < 32; i++) m[i + 32] = pk[i];
            crypto_hash(h, m, n);
            reduce2(h);
            scalarmult(p, q, h);
            scalarbase(q, sm.subarray(32));
            add(p, q);
            pack(t, p);
            n -= 64;
            if (crypto_verify_32(sm, 0, t, 0)) {
                for (i = 0; i < n; i++) m[i] = 0;
                return -1;
            }
            for (i = 0; i < n; i++) m[i] = sm[i + 64];
            return n;
        }
        const crypto_secretbox_KEYBYTES = 32; const crypto_secretbox_NONCEBYTES = 24; const crypto_secretbox_ZEROBYTES = 32; const crypto_secretbox_BOXZEROBYTES = 16; const crypto_scalarmult_BYTES = 32; const crypto_scalarmult_SCALARBYTES = 32; const crypto_box_PUBLICKEYBYTES = 32; const crypto_box_SECRETKEYBYTES = 32; const crypto_box_BEFORENMBYTES = 32; const crypto_box_NONCEBYTES = crypto_secretbox_NONCEBYTES; const crypto_box_ZEROBYTES = crypto_secretbox_ZEROBYTES; const crypto_box_BOXZEROBYTES = crypto_secretbox_BOXZEROBYTES; const crypto_sign_BYTES = 64; const crypto_sign_PUBLICKEYBYTES = 32; const crypto_sign_SECRETKEYBYTES = 64; const crypto_sign_SEEDBYTES = 32; const
            crypto_hash_BYTES = 64;
        nacl2.lowlevel = {
            crypto_core_hsalsa20,
            crypto_stream_xor,
            crypto_stream,
            crypto_stream_salsa20_xor,
            crypto_stream_salsa20,
            crypto_onetimeauth,
            crypto_onetimeauth_verify,
            crypto_verify_16,
            crypto_verify_32,
            crypto_secretbox,
            crypto_secretbox_open,
            crypto_scalarmult,
            crypto_scalarmult_base,
            crypto_box_beforenm,
            crypto_box_afternm,
            crypto_box,
            crypto_box_open,
            crypto_box_keypair,
            crypto_hash,
            crypto_sign,
            crypto_sign_keypair,
            crypto_sign_open,
            crypto_secretbox_KEYBYTES,
            crypto_secretbox_NONCEBYTES,
            crypto_secretbox_ZEROBYTES,
            crypto_secretbox_BOXZEROBYTES,
            crypto_scalarmult_BYTES,
            crypto_scalarmult_SCALARBYTES,
            crypto_box_PUBLICKEYBYTES,
            crypto_box_SECRETKEYBYTES,
            crypto_box_BEFORENMBYTES,
            crypto_box_NONCEBYTES,
            crypto_box_ZEROBYTES,
            crypto_box_BOXZEROBYTES,
            crypto_sign_BYTES,
            crypto_sign_PUBLICKEYBYTES,
            crypto_sign_SECRETKEYBYTES,
            crypto_sign_SEEDBYTES,
            crypto_hash_BYTES,
            gf,
            D,
            L,
            pack25519,
            unpack25519,
            M,
            A,
            S,
            Z,
            pow2523,
            add,
            set25519,
            modL,
            scalarmult,
            scalarbase,
        };
        function checkLengths(k, n) {
            if (k.length !== crypto_secretbox_KEYBYTES) throw new Error('bad key size');
            if (n.length !== crypto_secretbox_NONCEBYTES) throw new Error('bad nonce size');
        }
        function checkBoxLengths(pk, sk) {
            if (pk.length !== crypto_box_PUBLICKEYBYTES) throw new Error('bad public key size');
            if (sk.length !== crypto_box_SECRETKEYBYTES) throw new Error('bad secret key size');
        }
        function checkArrayTypes() {
            for (let i = 0; i < arguments.length; i++) {
                if (!(arguments[i] instanceof Uint8Array)) throw new TypeError('unexpected type, use Uint8Array');
            }
        }
        function cleanup(arr) {
            for (let i = 0; i < arr.length; i++) arr[i] = 0;
        }
        nacl2.randomBytes = function (n) {
            const b = new Uint8Array(n);
            randombytes(b, n);
            return b;
        };
        nacl2.secretbox = function (msg, nonce, key) {
            checkArrayTypes(msg, nonce, key);
            checkLengths(key, nonce);
            const m = new Uint8Array(crypto_secretbox_ZEROBYTES + msg.length);
            const c = new Uint8Array(m.length);
            for (let i = 0; i < msg.length; i++) m[i + crypto_secretbox_ZEROBYTES] = msg[i];
            crypto_secretbox(c, m, m.length, nonce, key);
            return c.subarray(crypto_secretbox_BOXZEROBYTES);
        };
        nacl2.secretbox.open = function (box, nonce, key) {
            checkArrayTypes(box, nonce, key);
            checkLengths(key, nonce);
            const c = new Uint8Array(crypto_secretbox_BOXZEROBYTES + box.length);
            const m = new Uint8Array(c.length);
            for (let i = 0; i < box.length; i++) c[i + crypto_secretbox_BOXZEROBYTES] = box[i];
            if (c.length < 32) return null;
            if (crypto_secretbox_open(m, c, c.length, nonce, key) !== 0) return null;
            return m.subarray(crypto_secretbox_ZEROBYTES);
        };
        nacl2.secretbox.keyLength = crypto_secretbox_KEYBYTES;
        nacl2.secretbox.nonceLength = crypto_secretbox_NONCEBYTES;
        nacl2.secretbox.overheadLength = crypto_secretbox_BOXZEROBYTES;
        nacl2.scalarMult = function (n, p) {
            checkArrayTypes(n, p);
            if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size');
            if (p.length !== crypto_scalarmult_BYTES) throw new Error('bad p size');
            const q = new Uint8Array(crypto_scalarmult_BYTES);
            crypto_scalarmult(q, n, p);
            return q;
        };
        nacl2.scalarMult.base = function (n) {
            checkArrayTypes(n);
            if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size');
            const q = new Uint8Array(crypto_scalarmult_BYTES);
            crypto_scalarmult_base(q, n);
            return q;
        };
        nacl2.scalarMult.scalarLength = crypto_scalarmult_SCALARBYTES;
        nacl2.scalarMult.groupElementLength = crypto_scalarmult_BYTES;
        nacl2.box = function (msg, nonce, publicKey, secretKey) {
            const k = nacl2.box.before(publicKey, secretKey);
            return nacl2.secretbox(msg, nonce, k);
        };
        nacl2.box.before = function (publicKey, secretKey) {
            checkArrayTypes(publicKey, secretKey);
            checkBoxLengths(publicKey, secretKey);
            const k = new Uint8Array(crypto_box_BEFORENMBYTES);
            crypto_box_beforenm(k, publicKey, secretKey);
            return k;
        };
        nacl2.box.after = nacl2.secretbox;
        nacl2.box.open = function (msg, nonce, publicKey, secretKey) {
            const k = nacl2.box.before(publicKey, secretKey);
            return nacl2.secretbox.open(msg, nonce, k);
        };
        nacl2.box.open.after = nacl2.secretbox.open;
        nacl2.box.keyPair = function () {
            const pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
            const sk = new Uint8Array(crypto_box_SECRETKEYBYTES);
            crypto_box_keypair(pk, sk);
            return { publicKey: pk, secretKey: sk };
        };
        nacl2.box.keyPair.fromSecretKey = function (secretKey) {
            checkArrayTypes(secretKey);
            if (secretKey.length !== crypto_box_SECRETKEYBYTES) throw new Error('bad secret key size');
            const pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
            crypto_scalarmult_base(pk, secretKey);
            return { publicKey: pk, secretKey: new Uint8Array(secretKey) };
        };
        nacl2.box.publicKeyLength = crypto_box_PUBLICKEYBYTES;
        nacl2.box.secretKeyLength = crypto_box_SECRETKEYBYTES;
        nacl2.box.sharedKeyLength = crypto_box_BEFORENMBYTES;
        nacl2.box.nonceLength = crypto_box_NONCEBYTES;
        nacl2.box.overheadLength = nacl2.secretbox.overheadLength;
        nacl2.sign = function (msg, secretKey) {
            checkArrayTypes(msg, secretKey);
            if (secretKey.length !== crypto_sign_SECRETKEYBYTES) throw new Error('bad secret key size');
            const signedMsg = new Uint8Array(crypto_sign_BYTES + msg.length);
            crypto_sign(signedMsg, msg, msg.length, secretKey);
            return signedMsg;
        };
        nacl2.sign.open = function (signedMsg, publicKey) {
            checkArrayTypes(signedMsg, publicKey);
            if (publicKey.length !== crypto_sign_PUBLICKEYBYTES) throw new Error('bad public key size');
            const tmp = new Uint8Array(signedMsg.length);
            const mlen = crypto_sign_open(tmp, signedMsg, signedMsg.length, publicKey);
            if (mlen < 0) return null;
            const m = new Uint8Array(mlen);
            for (let i = 0; i < m.length; i++) m[i] = tmp[i];
            return m;
        };
        nacl2.sign.detached = function (msg, secretKey) {
            const signedMsg = nacl2.sign(msg, secretKey);
            const sig = new Uint8Array(crypto_sign_BYTES);
            for (let i = 0; i < sig.length; i++) sig[i] = signedMsg[i];
            return sig;
        };
        nacl2.sign.detached.verify = function (msg, sig, publicKey) {
            checkArrayTypes(msg, sig, publicKey);
            if (sig.length !== crypto_sign_BYTES) throw new Error('bad signature size');
            if (publicKey.length !== crypto_sign_PUBLICKEYBYTES) throw new Error('bad public key size');
            const sm = new Uint8Array(crypto_sign_BYTES + msg.length);
            const m = new Uint8Array(crypto_sign_BYTES + msg.length);
            let i;
            for (i = 0; i < crypto_sign_BYTES; i++) sm[i] = sig[i];
            for (i = 0; i < msg.length; i++) sm[i + crypto_sign_BYTES] = msg[i];
            return crypto_sign_open(m, sm, sm.length, publicKey) >= 0;
        };
        nacl2.sign.keyPair = function () {
            const pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
            const sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
            crypto_sign_keypair(pk, sk);
            return { publicKey: pk, secretKey: sk };
        };
        nacl2.sign.keyPair.fromSecretKey = function (secretKey) {
            checkArrayTypes(secretKey);
            if (secretKey.length !== crypto_sign_SECRETKEYBYTES) throw new Error('bad secret key size');
            const pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
            for (let i = 0; i < pk.length; i++) pk[i] = secretKey[32 + i];
            return { publicKey: pk, secretKey: new Uint8Array(secretKey) };
        };
        nacl2.sign.keyPair.fromSeed = function (seed) {
            checkArrayTypes(seed);
            if (seed.length !== crypto_sign_SEEDBYTES) throw new Error('bad seed size');
            const pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
            const sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
            for (let i = 0; i < 32; i++) sk[i] = seed[i];
            crypto_sign_keypair(pk, sk, true);
            return { publicKey: pk, secretKey: sk };
        };
        nacl2.sign.publicKeyLength = crypto_sign_PUBLICKEYBYTES;
        nacl2.sign.secretKeyLength = crypto_sign_SECRETKEYBYTES;
        nacl2.sign.seedLength = crypto_sign_SEEDBYTES;
        nacl2.sign.signatureLength = crypto_sign_BYTES;
        nacl2.hash = function (msg) {
            checkArrayTypes(msg);
            const h = new Uint8Array(crypto_hash_BYTES);
            crypto_hash(h, msg, msg.length);
            return h;
        };
        nacl2.hash.hashLength = crypto_hash_BYTES;
        nacl2.verify = function (x, y) {
            checkArrayTypes(x, y);
            if (x.length === 0 || y.length === 0) return false;
            if (x.length !== y.length) return false;
            return vn(x, 0, y, 0, x.length) === 0;
        };
        nacl2.setPRNG = function (fn) {
            randombytes = fn;
        };
        (function () {
            let crypto2 = typeof self !== 'undefined' ? self.crypto || self.msCrypto : null;
            if (crypto2 && crypto2.getRandomValues) {
                const QUOTA = 65536;
                nacl2.setPRNG((x, n) => {
                    let i; const
                        v = new Uint8Array(n);
                    for (i = 0; i < n; i += QUOTA) {
                        crypto2.getRandomValues(v.subarray(i, i + Math.min(n - i, QUOTA)));
                    }
                    for (i = 0; i < n; i++) x[i] = v[i];
                    cleanup(v);
                });
            } else if (typeof commonjsRequire !== 'undefined') {
                crypto2 = require$$0$2;
                if (crypto2 && crypto2.randomBytes) {
                    nacl2.setPRNG((x, n) => {
                        let i; const
                            v = crypto2.randomBytes(n);
                        for (i = 0; i < n; i++) x[i] = v[i];
                        cleanup(v);
                    });
                }
            }
        }());
    }(module.exports ? module.exports : self.nacl = self.nacl || {}));
}(naclFast));
const hmac = {};
(function (exports) {
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.hmac = void 0;
    const _assert_js_12 = _assert;
    const utils_js_12 = utils$l;
    class HMAC extends utils_js_12.Hash {
        constructor(hash2, _key) {
            super();
            this.finished = false;
            this.destroyed = false;
            _assert_js_12.default.hash(hash2);
            const key = (0, utils_js_12.toBytes)(_key);
            this.iHash = hash2.create();
            if (!(this.iHash instanceof utils_js_12.Hash)) throw new TypeError('Expected instance of class which extends utils.Hash');
            const blockLen = this.blockLen = this.iHash.blockLen;
            this.outputLen = this.iHash.outputLen;
            const pad = new Uint8Array(blockLen);
            pad.set(key.length > this.iHash.blockLen ? hash2.create().update(key).digest() : key);
            for (let i = 0; i < pad.length; i++) pad[i] ^= 54;
            this.iHash.update(pad);
            this.oHash = hash2.create();
            for (let i = 0; i < pad.length; i++) pad[i] ^= 54 ^ 92;
            this.oHash.update(pad);
            pad.fill(0);
        }

        update(buf) {
            _assert_js_12.default.exists(this);
            this.iHash.update(buf);
            return this;
        }

        digestInto(out) {
            _assert_js_12.default.exists(this);
            _assert_js_12.default.bytes(out, this.outputLen);
            this.finished = true;
            this.iHash.digestInto(out);
            this.oHash.update(out);
            this.oHash.digestInto(out);
            this.destroy();
        }

        digest() {
            const out = new Uint8Array(this.oHash.outputLen);
            this.digestInto(out);
            return out;
        }

        _cloneInto(to) {
            to || (to = Object.create(Object.getPrototypeOf(this), {}));
            const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
            to = to;
            to.finished = finished;
            to.destroyed = destroyed;
            to.blockLen = blockLen;
            to.outputLen = outputLen;
            to.oHash = oHash._cloneInto(to.oHash);
            to.iHash = iHash._cloneInto(to.iHash);
            return to;
        }

        destroy() {
            this.destroyed = true;
            this.oHash.destroy();
            this.iHash.destroy();
        }
    }
    const hmac2 = (hash2, key, message2) => new HMAC(hash2, key).update(message2).digest();
    exports.hmac = hmac2;
    exports.hmac.create = (hash2, key) => new HMAC(hash2, key);
}(hmac));
const pbkdf2$1 = {};
Object.defineProperty(pbkdf2$1, '__esModule', { value: true });
pbkdf2$1.pbkdf2Async = pbkdf2$1.pbkdf2 = void 0;
const _assert_js_1 = _assert;
const hmac_js_1 = hmac;
const utils_js_1 = utils$l;
function pbkdf2Init(hash2, _password, _salt, _opts) {
    _assert_js_1.default.hash(hash2);
    const opts = (0, utils_js_1.checkOpts)({ dkLen: 32, asyncTick: 10 }, _opts);
    const { c, dkLen, asyncTick } = opts;
    _assert_js_1.default.number(c);
    _assert_js_1.default.number(dkLen);
    _assert_js_1.default.number(asyncTick);
    if (c < 1) throw new Error('PBKDF2: iterations (c) should be >= 1');
    const password = (0, utils_js_1.toBytes)(_password);
    const salt = (0, utils_js_1.toBytes)(_salt);
    const DK = new Uint8Array(dkLen);
    const PRF = hmac_js_1.hmac.create(hash2, password);
    const PRFSalt = PRF._cloneInto().update(salt);
    return { c, dkLen, asyncTick, DK, PRF, PRFSalt };
}
function pbkdf2Output(PRF, PRFSalt, DK, prfW, u) {
    PRF.destroy();
    PRFSalt.destroy();
    if (prfW) prfW.destroy();
    u.fill(0);
    return DK;
}
function pbkdf2(hash2, password, salt, opts) {
    const { c, dkLen, DK, PRF, PRFSalt } = pbkdf2Init(hash2, password, salt, opts);
    let prfW;
    const arr = new Uint8Array(4);
    const view = (0, utils_js_1.createView)(arr);
    const u = new Uint8Array(PRF.outputLen);
    for (let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen) {
        const Ti = DK.subarray(pos, pos + PRF.outputLen);
        view.setInt32(0, ti, false);
        (prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);
        Ti.set(u.subarray(0, Ti.length));
        for (let ui = 1; ui < c; ui++) {
            PRF._cloneInto(prfW).update(u).digestInto(u);
            for (let i = 0; i < Ti.length; i++) Ti[i] ^= u[i];
        }
    }
    return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
}
pbkdf2$1.pbkdf2 = pbkdf2;
async function pbkdf2Async$1(hash2, password, salt, opts) {
    const { c, dkLen, asyncTick, DK, PRF, PRFSalt } = pbkdf2Init(hash2, password, salt, opts);
    let prfW;
    const arr = new Uint8Array(4);
    const view = (0, utils_js_1.createView)(arr);
    const u = new Uint8Array(PRF.outputLen);
    for (let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen) {
        const Ti = DK.subarray(pos, pos + PRF.outputLen);
        view.setInt32(0, ti, false);
        (prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);
        Ti.set(u.subarray(0, Ti.length));
        await (0, utils_js_1.asyncLoop)(c - 1, asyncTick, (i) => {
            PRF._cloneInto(prfW).update(u).digestInto(u);
            for (let i2 = 0; i2 < Ti.length; i2++) Ti[i2] ^= u[i2];
        });
    }
    return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
}
pbkdf2$1.pbkdf2Async = pbkdf2Async$1;
const __importDefault$a = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { 'default': mod };
};
Object.defineProperty(utlis, '__esModule', { value: true });
utlis.normalize = utlis.genereteSeedAsync = utlis.genereteSeed = utlis.genereteWords = utlis.generateKeyPair = utlis.deriveChecksumBits = void 0;
const tweetnacl_1$3 = __importDefault$a(naclFast.exports);
const hmac_1 = hmac;
const sha512_1 = sha512$5;
const pbkdf2_1 = pbkdf2$1;
const hash_1 = hash$1;
const bip_0039_en_json_1$1 = __importDefault$a(require$$0$3);
const helpers_1$8 = helpers;
const getNodeSubtle = () => {
    try {
        const { webcrypto } = require('node:crypto');
        return webcrypto.subtle;
    } catch (err) {
        return null;
    }
};
const getWebSubtle = () => {
    const subtle = typeof self !== 'undefined' && self.crypto && self.crypto.subtle;
    return subtle || null;
};
const hmacSha512Async = async (mnemonic2, password = '') => {
    const subtle = getNodeSubtle() || getWebSubtle();
    if (!subtle) {
        return (0, hmac_1.hmac)(sha512_1.sha512, normalize(mnemonic2.join(' ')), password);
    }
    const algo = { name: 'HMAC', hash: 'SHA-512' };
    const key = await subtle.importKey('raw', (0, helpers_1$8.stringToBytes)(normalize(mnemonic2.join(' '))), algo, false, ['sign']);
    const result = await subtle.sign(algo.name, key, (0, helpers_1$8.stringToBytes)(password));
    return new Uint8Array(result);
};
const pbkdf2Async = async (mnemonic2, salt, rounds, keyLength) => {
    const subtle = getNodeSubtle() || getWebSubtle();
    const entropy = await hmacSha512Async(mnemonic2);
    if (!subtle) {
        const optipns = { c: rounds, dkLen: keyLength };
        return await (0, pbkdf2_1.pbkdf2Async)(sha512_1.sha512, entropy, salt, optipns);
    }
    const key = await subtle.importKey('raw', entropy, { name: 'PBKDF2' }, false, ['deriveBits']);
    const bytes2 = await subtle.deriveBits({
        name: 'PBKDF2',
        hash: 'SHA-512',
        salt,
        iterations: rounds,
    }, key, keyLength * 8);
    return new Uint8Array(bytes2);
};
const deriveChecksumBits = (entropy) => {
    const CS = entropy.length * 8 / 32;
    const hex = (0, hash_1.sha256)(entropy);
    const bits2 = (0, helpers_1$8.hexToBits)(hex);
    return bits2.slice(0, CS);
};
utlis.deriveChecksumBits = deriveChecksumBits;
const generateKeyPair = (seed) => {
    const pair = tweetnacl_1$3.default.sign.keyPair.fromSeed(seed);
    return {
        private: pair.secretKey,
        public: pair.publicKey,
    };
};
utlis.generateKeyPair = generateKeyPair;
const genereteWords = () => {
    const entropy = tweetnacl_1$3.default.randomBytes(32);
    const checkSumBits = deriveChecksumBits(entropy);
    const entropyBits = (0, helpers_1$8.bytesToBits)(entropy);
    const fullBits = entropyBits.concat(checkSumBits);
    const chunks = fullBits.join('').match(/(.{1,11})/g);
    const words = chunks.map((chunk) => {
        const index = parseInt(chunk, 2);
        return bip_0039_en_json_1$1.default[index];
    });
    return words;
};
utlis.genereteWords = genereteWords;
const genereteSeed = (mnemonic2, salt, rounds, keyLength) => {
    const optipns = { c: rounds, dkLen: keyLength };
    const entropy = (0, hmac_1.hmac)(sha512_1.sha512, normalize(mnemonic2.join(' ')), '');
    const bytes2 = (0, pbkdf2_1.pbkdf2)(sha512_1.sha512, entropy, salt, optipns);
    return bytes2;
};
utlis.genereteSeed = genereteSeed;
const genereteSeedAsync = async (mnemonic2, salt, rounds, keyLength) => {
    const bytes2 = await pbkdf2Async(mnemonic2, (0, helpers_1$8.stringToBytes)(salt), rounds, keyLength);
    return bytes2;
};
utlis.genereteSeedAsync = genereteSeedAsync;
const normalize = (value) => (value || '').normalize('NFKD');
utlis.normalize = normalize;
const __importDefault$9 = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { 'default': mod };
};
Object.defineProperty(mnemonicBip39, '__esModule', { value: true });
mnemonicBip39.MnemonicBIP39 = void 0;
const bip_0039_en_json_1 = __importDefault$9(require$$0$3);
const utlis_1$1 = utlis;
class MnemonicBIP39 {
    constructor(mnemonic2 = [], options) {
        if (mnemonic2.length && mnemonic2.length !== 24) {
            throw new Error('Mnemonic: must contain 24 bip39 words.');
        }
        if (mnemonic2.length && !mnemonic2.every((word) => bip_0039_en_json_1.default.includes(word))) {
            throw new Error('Mnemonic: invalid mnemonic phrase words.');
        }
        const { salt = '', rounds = 2048, keyLength = 64 } = options || {};
        const words = mnemonic2.length ? mnemonic2 : (0, utlis_1$1.genereteWords)();
        const seed = (0, utlis_1$1.genereteSeed)(words, this.generateSalt(salt), rounds, keyLength).slice(0, 32);
        const keys2 = (0, utlis_1$1.generateKeyPair)(seed);
        this._words = words;
        this._seed = seed;
        this._keys = keys2;
    }

    get words() {
        return this._words;
    }

    get seed() {
        return this._seed;
    }

    get keys() {
        return this._keys;
    }

    static genereteWords() {
        return (0, utlis_1$1.genereteWords)();
    }

    static generateKeyPair(seed) {
        return (0, utlis_1$1.generateKeyPair)(seed);
    }

    static genereteSeed(mnemonic2, salt = null, rounds = 2048, keyLength = 64) {
        const _salt = `mnemonic${salt !== null ? (0, utlis_1$1.normalize)(salt) : ''}`;
        const seed = (0, utlis_1$1.genereteSeed)(mnemonic2, _salt, rounds, keyLength);
        return seed.slice(0, 32);
    }

    static async genereteSeedAsync(mnemonic2, salt = null, rounds = 2048, keyLength = 64) {
        const _salt = `mnemonic${salt !== null ? (0, utlis_1$1.normalize)(salt) : ''}`;
        const seed = await (0, utlis_1$1.genereteSeedAsync)(mnemonic2, _salt, rounds, keyLength);
        return seed.slice(0, 32);
    }

    generateSalt(salt = null) {
        return `mnemonic${salt !== null ? (0, utlis_1$1.normalize)(salt) : ''}`;
    }
}
mnemonicBip39.MnemonicBIP39 = MnemonicBIP39;
const mnemonic$1 = {};
Object.defineProperty(mnemonic$1, '__esModule', { value: true });
mnemonic$1.Mnemonic = void 0;
const mnemonic_bip39_1 = mnemonicBip39;
const utlis_1 = utlis;
const TON_SALT = 'TON default seed';
const TON_ROUNDS = 1e5;
const TON_KEY_LENGTH = 32;
class Mnemonic extends mnemonic_bip39_1.MnemonicBIP39 {
    constructor(mnemonic2 = []) {
        super(mnemonic2, {
            salt: TON_SALT,
            rounds: TON_ROUNDS,
            keyLength: TON_KEY_LENGTH,
        });
    }

    static genereteSeed(mnemonic2) {
        const seed = (0, utlis_1.genereteSeed)(mnemonic2, (0, utlis_1.normalize)(TON_SALT), TON_ROUNDS, TON_KEY_LENGTH);
        return seed.slice(0, TON_KEY_LENGTH);
    }

    static async genereteSeedAsync(mnemonic2) {
        const seed = await (0, utlis_1.genereteSeedAsync)(mnemonic2, (0, utlis_1.normalize)(TON_SALT), TON_ROUNDS, TON_KEY_LENGTH);
        return seed.slice(0, TON_KEY_LENGTH);
    }

    generateSalt(salt) {
        return (0, utlis_1.normalize)(salt);
    }
}
mnemonic$1.Mnemonic = Mnemonic;
(function (exports) {
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.Mnemonic = exports.MnemonicBIP39 = void 0;
    const mnemonic_bip39_12 = mnemonicBip39;
    Object.defineProperty(exports, 'MnemonicBIP39', { enumerable: true,
        get() {
            return mnemonic_bip39_12.MnemonicBIP39;
        } });
    const mnemonic_12 = mnemonic$1;
    Object.defineProperty(exports, 'Mnemonic', { enumerable: true,
        get() {
            return mnemonic_12.Mnemonic;
        } });
}(crypto$1));
const utils$k = {};
const __createBinding$2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    let desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true,
            get() {
                return m[k];
            } };
    }
    Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    o[k2] = m[k];
});
const __setModuleDefault$2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function (o, v) {
    Object.defineProperty(o, 'default', { enumerable: true, value: v });
} : function (o, v) {
    o['default'] = v;
});
const __importStar$2 = commonjsGlobal && commonjsGlobal.__importStar || function (mod) {
    if (mod && mod.__esModule) return mod;
    const result = {};
    if (mod != null) {
        for (const k in mod) if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$2(result, mod, k);
    }
    __setModuleDefault$2(result, mod);
    return result;
};
Object.defineProperty(utils$k, '__esModule', { value: true });
utils$k.Numbers = utils$k.Helpers = utils$k.Checksum = utils$k.Hash = void 0;
utils$k.Hash = __importStar$2(hash$1);
utils$k.Checksum = __importStar$2(checksum);
utils$k.Helpers = __importStar$2(helpers);
utils$k.Numbers = __importStar$2(numbers);
const contracts = {};
const base = {};
Object.defineProperty(base, '__esModule', { value: true });
base.ContractBase = void 0;
const helpers_1$7 = helpers;
const address_1$1 = address;
const boc_1$1 = boc;
class ContractBase {
    constructor(workchain, code, storage2) {
        this._state = ContractBase.stateInit({ code, storage: storage2 });
        this._workchain = workchain;
        this._address = new address_1$1.Address(`${this._workchain}:${this._state.hash()}`);
    }

    get workchain() {
        return this._workchain;
    }

    get address() {
        return this._address;
    }

    get state() {
        return this._state;
    }

    static stateInit(options) {
        const { code, storage: storage2, libraries = [] } = options;
        const builder2 = new boc_1$1.Builder();
        builder2.storeBits([0, 0, 1]);
        builder2.storeRef(code);
        if (storage2) {
            builder2.storeBit(1).storeRef(storage2);
        } else {
            builder2.storeBit(0);
        }
        const serializers = {
            key: (hash2) => (0, helpers_1$7.hexToBits)(hash2),
            value: (lib2) => new boc_1$1.Builder().storeBit(Number(lib2.public)).storeRef(lib2.library).cell(),
        };
        const dict = new boc_1$1.HashmapE(256, { serializers });
        libraries.forEach((lib2) => dict.set(lib2.library.hash(), lib2));
        builder2.storeDict(dict);
        return builder2.cell();
    }
}
base.ContractBase = ContractBase;
ContractBase.EMPTY_CODE = boc_1$1.BOC.fromStandard('B5EE9C7241010101000A000010FF00F800C8C9FB041D179D63');
const message = {};
const __importDefault$8 = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { 'default': mod };
};
Object.defineProperty(message, '__esModule', { value: true });
message.MessageExternalIn = message.MessageInternal = void 0;
const tweetnacl_1$2 = __importDefault$8(naclFast.exports);
const coins_1 = coins;
const address_1 = address;
const helpers_1$6 = helpers;
const boc_1 = boc;
class Message {
    constructor(header, body = null, state = null) {
        this.header = header;
        this.body = body;
        this.state = state;
    }

    parse(key) {
        const message2 = new boc_1.Builder();
        const body = this.body !== null && key !== void 0 ? Message.signed(this.body, key) : this.body;
        message2.storeSlice(boc_1.Slice.parse(this.header));
        if (this.state !== null) {
            message2.storeBit(1);
            if (message2.remainder >= this.state.bits.length + 1 && message2.refs.length + this.state.refs.length <= 4) {
                message2.storeBit(0).storeSlice(boc_1.Slice.parse(this.state));
            } else {
                message2.storeBit(1).storeRef(this.state);
            }
        } else {
            message2.storeBit(0);
        }
        if (body) {
            if (message2.remainder >= body.bits.length && message2.refs.length + body.refs.length <= 4) {
                message2.storeBit(0).storeSlice(boc_1.Slice.parse(body));
            } else {
                message2.storeBit(1).storeRef(body);
            }
        } else {
            message2.storeBit(0);
        }
        return message2.cell();
    }

    static signed(data2, key) {
        const hash2 = (0, helpers_1$6.hexToBytes)(data2.hash());
        const signature = tweetnacl_1$2.default.sign.detached(hash2, key);
        return new boc_1.Builder().storeBytes(signature).storeSlice(boc_1.Slice.parse(data2)).cell();
    }

    sign(key) {
        return this.parse(key);
    }

    cell() {
        return this.parse();
    }
}
class MessageInternal extends Message {
    constructor(options, data2) {
        const builder2 = new boc_1.Builder();
        const { ihrDisabled = true, bounce, bounced = false, src: src2, dest, value, ihrFee = new coins_1.Coins(0), fwdFee = new coins_1.Coins(0), createdLt = 0, createdAt = 0 } = options;
        const { body = null, state = null } = data2;
        const header = builder2.storeBit(0).storeInt(ihrDisabled ? -1 : 0, 1).storeInt(bounce ? -1 : 0, 1).storeInt(bounced ? -1 : 0, 1)
            .storeAddress(src2)
            .storeAddress(dest)
            .storeCoins(value)
            .storeBit(0)
            .storeCoins(ihrFee)
            .storeCoins(fwdFee)
            .storeUint(createdLt, 64)
            .storeUint(createdAt, 32)
            .cell();
        super(header, body, state);
    }
}
message.MessageInternal = MessageInternal;
class MessageExternalIn extends Message {
    constructor(options, data2) {
        const builder2 = new boc_1.Builder();
        const { src: src2 = address_1.Address.NONE, dest = address_1.Address.NONE, importFee = new coins_1.Coins(0) } = options;
        const { body = null, state = null } = data2;
        const header = builder2.storeBits([1, 0]).storeAddress(src2).storeAddress(dest).storeCoins(importFee)
            .cell();
        super(header, body, state);
    }
}
message.MessageExternalIn = MessageExternalIn;
(function (exports) {
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.MessageInternal = exports.MessageExternalIn = exports.ContractBase = void 0;
    const base_1 = base;
    Object.defineProperty(exports, 'ContractBase', { enumerable: true,
        get() {
            return base_1.ContractBase;
        } });
    const message_1 = message;
    Object.defineProperty(exports, 'MessageExternalIn', { enumerable: true,
        get() {
            return message_1.MessageExternalIn;
        } });
    Object.defineProperty(exports, 'MessageInternal', { enumerable: true,
        get() {
            return message_1.MessageInternal;
        } });
}(contracts));
(function (exports) {
    const __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        let desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true,
                get() {
                    return m[k];
                } };
        }
        Object.defineProperty(o, k2, desc);
    } : function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
    });
    const __setModuleDefault2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
    } : function (o, v) {
        o['default'] = v;
    });
    const __importStar2 = commonjsGlobal && commonjsGlobal.__importStar || function (mod) {
        if (mod && mod.__esModule) return mod;
        const result = {};
        if (mod != null) {
            for (const k in mod) if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding2(result, mod, k);
        }
        __setModuleDefault2(result, mod);
        return result;
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.Contracts = exports.Utils = exports.Coins = exports.Address = exports.MnemonicBIP39 = exports.Mnemonic = exports.HashmapE = exports.Hashmap = exports.Builder = exports.Slice = exports.CellType = exports.Cell = exports.Mask = exports.BOC = void 0;
    const boc_12 = boc;
    Object.defineProperty(exports, 'BOC', { enumerable: true,
        get() {
            return boc_12.BOC;
        } });
    Object.defineProperty(exports, 'Mask', { enumerable: true,
        get() {
            return boc_12.Mask;
        } });
    Object.defineProperty(exports, 'Cell', { enumerable: true,
        get() {
            return boc_12.Cell;
        } });
    Object.defineProperty(exports, 'CellType', { enumerable: true,
        get() {
            return boc_12.CellType;
        } });
    Object.defineProperty(exports, 'Slice', { enumerable: true,
        get() {
            return boc_12.Slice;
        } });
    Object.defineProperty(exports, 'Builder', { enumerable: true,
        get() {
            return boc_12.Builder;
        } });
    Object.defineProperty(exports, 'Hashmap', { enumerable: true,
        get() {
            return boc_12.Hashmap;
        } });
    Object.defineProperty(exports, 'HashmapE', { enumerable: true,
        get() {
            return boc_12.HashmapE;
        } });
    const crypto_1 = crypto$1;
    Object.defineProperty(exports, 'Mnemonic', { enumerable: true,
        get() {
            return crypto_1.Mnemonic;
        } });
    Object.defineProperty(exports, 'MnemonicBIP39', { enumerable: true,
        get() {
            return crypto_1.MnemonicBIP39;
        } });
    const address_12 = address;
    Object.defineProperty(exports, 'Address', { enumerable: true,
        get() {
            return address_12.Address;
        } });
    const coins_12 = coins;
    Object.defineProperty(exports, 'Coins', { enumerable: true,
        get() {
            return coins_12.Coins;
        } });
    exports.Utils = __importStar2(utils$k);
    exports.Contracts = __importStar2(contracts);
}(dist$3));
const dist$2 = {};
const Wallet$2 = {};
const types$2 = {};
Object.defineProperty(types$2, '__esModule', { value: true });
types$2.walletV4Versions = types$2.walletV3Versions = types$2.walletV2Versions = types$2.walletSimpleVersions = void 0;
types$2.walletSimpleVersions = ['org.ton.wallets.simple', 'org.ton.wallets.simple.r2', 'org.ton.wallets.simple.r3'];
types$2.walletV2Versions = ['org.ton.wallets.v2', 'org.ton.wallets.v2.r2'];
types$2.walletV3Versions = ['org.ton.wallets.v3', 'org.ton.wallets.v3.r2'];
types$2.walletV4Versions = ['org.ton.wallets.v4', 'org.ton.wallets.v4.r2'];
const constants$2 = {};
Object.defineProperty(constants$2, '__esModule', { value: true });
constants$2.StandardSubwalletId = void 0;
constants$2.StandardSubwalletId = 698983191;
const Wallet$1 = {};
const WalletV3 = {};
const Source$1 = {};
Object.defineProperty(Source$1, '__esModule', { value: true });
Source$1.Source = void 0;
const ton3_core_1$d = dist$3;
class Source {
    static WalletV3() {
        return ton3_core_1$d.BOC.fromStandard(this.WalletV3Code);
    }

    static WalletV3R2() {
        return ton3_core_1$d.BOC.fromStandard(this.WalletV3R2Code);
    }

    static WalletV4() {
        return ton3_core_1$d.BOC.fromStandard(this.WalletV4Code);
    }

    static WalletV4R2() {
        return ton3_core_1$d.BOC.fromStandard(this.WalletV4R2Code);
    }

    static DnsCollection() {
        return ton3_core_1$d.BOC.fromStandard(this.DnsCollectionCode);
    }

    static DnsItem() {
        return ton3_core_1$d.BOC.fromStandard(this.DnsItemCode);
    }
}
Source$1.Source = Source;
Source.WalletV3Code = 'B5EE9C724101010100620000C0FF0020DD2082014C97BA9730ED44D0D70B1FE0A4F2608308D71820D31FD31FD31FF82313BBF263ED44D0D31FD31FD3FFD15132BAF2A15144BAF2A204F901541055F910F2A3F8009320D74A96D307D402FB00E8D101A4C8CB1FCB1FCBFFC9ED543FBE6EE0';
Source.WalletV3R2Code = 'B5EE9C724101010100710000DEFF0020DD2082014C97BA218201339CBAB19F71B0ED44D0D31FD31F31D70BFFE304E0A4F2608308D71820D31FD31FD31FF82313BBF263ED44D0D31FD31FD3FFD15132BAF2A15144BAF2A204F901541055F910F2A3F8009320D74A96D307D402FB00E8D101A4C8CB1FCB1FCBFFC9ED5410BD6DAD';
Source.WalletV4Code = 'B5EE9C72410215010002F5000114FF00F4A413F4BCF2C80B010201200203020148040504F8F28308D71820D31FD31FD31F02F823BBF263ED44D0D31FD31FD3FFF404D15143BAF2A15151BAF2A205F901541064F910F2A3F80024A4C8CB1F5240CB1F5230CBFF5210F400C9ED54F80F01D30721C0009F6C519320D74A96D307D402FB00E830E021C001E30021C002E30001C0039130E30D03A4C8CB1F12CB1FCBFF1112131403EED001D0D3030171B0915BE021D749C120915BE001D31F218210706C7567BD228210626C6E63BDB022821064737472BDB0925F03E002FA403020FA4401C8CA07CBFFC9D0ED44D0810140D721F404305C810108F40A6FA131B3925F05E004D33FC8258210706C7567BA9131E30D248210626C6E63BAE30004060708020120090A005001FA00F404308210706C7567831EB17080185005CB0527CF165003FA02F40012CB69CB1F5210CB3F0052F8276F228210626C6E63831EB17080185005CB0527CF1624FA0214CB6A13CB1F5230CB3F01FA02F4000092821064737472BA8E3504810108F45930ED44D0810140D720C801CF16F400C9ED54821064737472831EB17080185004CB0558CF1622FA0212CB6ACB1FCB3F9410345F04E2C98040FB000201200B0C0059BD242B6F6A2684080A06B90FA0218470D4080847A4937D29910CE6903E9FF9837812801B7810148987159F31840201580D0E0011B8C97ED44D0D70B1F8003DB29DFB513420405035C87D010C00B23281F2FFF274006040423D029BE84C600201200F100019ADCE76A26840206B90EB85FFC00019AF1DF6A26840106B90EB858FC0006ED207FA00D4D422F90005C8CA0715CBFFC9D077748018C8CB05CB0222CF165005FA0214CB6B12CCCCC971FB00C84014810108F451F2A702006C810108D718C8542025810108F451F2A782106E6F746570748018C8CB05CB025004CF16821005F5E100FA0213CB6A12CB1FC971FB00020072810108D718305202810108F459F2A7F82582106473747270748018C8CB05CB025005CF16821005F5E100FA0214CB6A13CB1F12CB3FC973FB00000AF400C9ED5446A9F34F';
Source.WalletV4R2Code = 'B5EE9C72410214010002D4000114FF00F4A413F4BCF2C80B010201200203020148040504F8F28308D71820D31FD31FD31F02F823BBF264ED44D0D31FD31FD3FFF404D15143BAF2A15151BAF2A205F901541064F910F2A3F80024A4C8CB1F5240CB1F5230CBFF5210F400C9ED54F80F01D30721C0009F6C519320D74A96D307D402FB00E830E021C001E30021C002E30001C0039130E30D03A4C8CB1F12CB1FCBFF1011121302E6D001D0D3032171B0925F04E022D749C120925F04E002D31F218210706C7567BD22821064737472BDB0925F05E003FA403020FA4401C8CA07CBFFC9D0ED44D0810140D721F404305C810108F40A6FA131B3925F07E005D33FC8258210706C7567BA923830E30D03821064737472BA925F06E30D06070201200809007801FA00F40430F8276F2230500AA121BEF2E0508210706C7567831EB17080185004CB0526CF1658FA0219F400CB6917CB1F5260CB3F20C98040FB0006008A5004810108F45930ED44D0810140D720C801CF16F400C9ED540172B08E23821064737472831EB17080185005CB055003CF1623FA0213CB6ACB1FCB3FC98040FB00925F03E20201200A0B0059BD242B6F6A2684080A06B90FA0218470D4080847A4937D29910CE6903E9FF9837812801B7810148987159F31840201580C0D0011B8C97ED44D0D70B1F8003DB29DFB513420405035C87D010C00B23281F2FFF274006040423D029BE84C600201200E0F0019ADCE76A26840206B90EB85FFC00019AF1DF6A26840106B90EB858FC0006ED207FA00D4D422F90005C8CA0715CBFFC9D077748018C8CB05CB0222CF165005FA0214CB6B12CCCCC973FB00C84014810108F451F2A7020070810108D718FA00D33FC8542047810108F451F2A782106E6F746570748018C8CB05CB025006CF165004FA0214CB6A12CB1FCB3FC973FB0002006C810108D718FA00D33F305224810108F459F2A782106473747270748018C8CB05CB025005CF165003FA0213CB6ACB1F12CB3FC973FB00000AF400C9ED54696225E5';
Source.DnsCollectionCode = 'B5EE9C7241021D010002C7000114FF00F4A413F4BCF2C80B0102016202030202CC040502012017180201200607020120131402012008090201200D0E016D420C70094840FF2F0DE01D0D3030171B0925F03E0FA403001D31FED44D0D4D4303122C000E30210245F048210370FEC51BADC840FF2F080A0201200B0C00D032F82320821062E44069BCF2E0C701F00420D74920C218F2E0C8208103F0BBF2E0C92078A908C000F2E0CA21F005F2E0CB58F00714BEF2E0CC22F9018050F833206EB38E10D0F4043052108307F40E6FA131F2D0CD9130E2C85004CF16C9C85003CF1612CCC9F00C000D1C3232C072742000331C27C074C1C07000082CE500A98200B784B98C4830003CB432600201200F100201201112004F3223880875D244B5C61673C58875D2883000082CE6C070007CB83280B50C3400A44C78B98C727420007F1C0875D2638D572E882CE38B8C00B4C1C8700B48F0802C0929BE14902E6C08B08BC8F04EAC2C48B09800F05EC4EC04AC6CC82CE500A98200B784F7B99B04AEA00093083001258C2040FA201938083001658C20407D200CB8083001A58C204064200A38083001E58C20404B2007B8083002258C204032200538083002650C20191EB83002A4E00C9D781E9C600069006AC0BC018060840EE6B2802A0060840EE6B2802A00A08418B9101A68608209E3402A410830856456F81B04A5A9D6A0192A41392002015815160039D2CF8053810F805BBC00C646582AC678B387D0165B5E66664C0207D804002D007232FFFE0A33C5B25C083232C044FD003D0032C03260001B3E401D3232C084B281F2FFF27420020120191A0201201B1C0007B8B5D318001FBA7A3ED44D0D4D43031F00A7001F00B8001BB905BED44D0D4D430307FF002128009DBA30C3020D74978A908C000F2E04620D70A07C00021D749C0085210B0935B786DE0209501D3073101DE21F0035122D71830F9018200BA93C8CB0F01820167A3ED43D8CF16C90191789170E212A0018F83DF327';
Source.DnsItemCode = 'B5EE9C7241022801000698000114FF00F4A413F4BCF2C80B0102016202030202CC04050201201E1F02012006070201481819020120080902015816170201200A0B000D470C8CB01C9D0801F73E09DBC400B434C0C05C6C2497C1383E903E900C7E800C5C75C87E800C7E800C3C0289ECE39397C15B088D148CB1C17CB865407E90350C1B5C3232C1FD00327E08E08418B9101A68608209E3402A4108308324CC200337A0404B20403C162A20032A41287E08C0683C00911DFC02440D7E08FC02F814D671C1462C200C00113E910C1C2EBCB8536003F88E34109B5F0BFA40307020F8256D8040708010C8CB055007CF165005FA0215CB6A12CB1FCB3F226EB39458CF17019132E201C901FB00E029C70091709509D31F50AAE221F008F82321BC24C0008E9E343A3A3B8E1636363737375135C705F2E196102510241023F823F00BE30EE0310DD33F256EB31FB0926C21E30D0D0E0F00FE302680698064A98452B0BEF2E19782103B9ACA0052A0A15270BC993682103B9ACA0019A193390805E220C2008E328210557CEA20F82510396D71708010C8CB055007CF165005FA0215CB6A12CB1FCB3F226EB39458CF17019132E201C901FB00923036E2803C23F823A1A120C2009313A0029130E24474F0091024F823F00B00D2343653CDA182103B9ACA005210A15270BC993682103B9ACA0016A1923005E220C2008E378210370FEC516D72295134544743708010C8CB055007CF165005FA0215CB6A12CB1FCB3F226EB39458CF17019132E201C901FB001CA10B9130E26D5477655477632EF00B0204C882105FCC3D145220BA8E9531373B5372C705F2E191109A104910384706401504E082101A0B9D515220BA8E195B32353537375135C705F2E19A03D4304015045033F823F00BE02182104EB1F0F9BAE3023B20821044BEAE41BAE302382782104ED14B65BA1310111200885B363638385147C705F2E19B04D3FF20D74AC20007D0D30701C000F2E19CF404300798D43040168307F417983050058307F45B30E270C8CB07F400C910354014F823F00B01FE30363A246EF2E19D8050F833D0F4043052408307F40E6FA1F2E19FD30721C00022C001B1F2E1A021C0008E9124109B1068517A10571046105C43144CDD9630103A395F07E201C0018E32708210370FEC51586D8100A0708010C8CB055007CF165005FA0215CB6A12CB1FCB3F226EB39458CF17019132E201C901FB00915BE21301FE8E7A37F8235006A1810258BC066E16B0F2E19E23D0D749F823F0075290BEF2E1975178A182103B9ACA00A120C2008E32102782104ED14B6558076D72708010C8CB055007CF165005FA0215CB6A12CB1FCB3F226EB39458CF17019132E201C901FB0093303535E2F82381012CA0F0024477F0091045103412F823F00BE05F041501F03502FA4021F001FA40D20031FA0082103B9ACA001DA121945314A0A1DE22D70B01C300209205A19135E220C2FFF2E192218E3E821005138D91C8500BCF16500DCF1671244B145448C0708010C8CB055007CF165005FA0215CB6A12CB1FCB3F226EB39458CF17019132E201C901FB00106994102C395BE20114008A8E3528F0018210D53276DB103946096D71708010C8CB055007CF165005FA0215CB6A12CB1FCB3F226EB39458CF17019132E201C901FB0093383430E21045103412F823F00B009A32353582102FCB26A2BA8E3A7082108B77173504C8CBFF5005CF161443308040708010C8CB055007CF165005FA0215CB6A12CB1FCB3F226EB39458CF17019132E201C901FB00E05F04840FF2F00093083001258C2040FA201938083001658C20407D200CB8083001A58C204064200A38083001E58C20404B2007B8083002258C204032200538083002650C20191EB83002A4E00C9D781E9C600069006AC0BC018060840EE6B2802A0060840EE6B2802A00A08418B9101A68608209E3402A410830856456F81B04A5A9D6A0192A4139200201201A1B0201201C1D0021081BA50C1B5C0838343E903E8034CFCC200017321400F3C5807E80B2CFF26000513B513434FFFE900835D2708027DFC07E9035353D0134CFCC0415C415B80C1C1B5B5B5B490415C415A0002B01B232FFD40173C59400F3C5B3333D0032CFF27B5520020120202102012024250013BBB39F00A175F07F008802027422230010A874F00A10475F07000CA959F00A6C71000DB8FCFF00A5F03802012026270013B64A5E014204EBE0FA1000C7B461843AE9240F152118001E5C08DE014206EBE0FA1A60E038001E5C339E8086007AE140F8001E5C33B84111C466105E033E04883DCB11FB64DDC4964AD1BA06B879240DC23572F37CC5CAAAB143A2FFFBC4180012660F003C003060FE81EDF4260F00306EB1583C';
Object.defineProperty(WalletV3, '__esModule', { value: true });
WalletV3.WalletV3Contract = void 0;
const ton3_core_1$c = dist$3;
const constants_1$7 = constants$2;
const Source_1$1 = Source$1;
class WalletV3Contract extends ton3_core_1$c.Contracts.ContractBase {
    constructor(opts) {
        const code = opts.version === 'org.ton.wallets.v3' ? Source_1$1.Source.WalletV3() : Source_1$1.Source.WalletV3R2();
        const storage2 = new ton3_core_1$c.Builder().storeUint(0, 32).storeUint(opts.subwalletId ?? constants_1$7.StandardSubwalletId, 32).storeBytes(opts.publicKey)
            .cell();
        super(opts.workchain ?? 0, code, storage2);
        this.publicKey = opts.publicKey;
        this.subwalletId = opts.subwalletId ?? constants_1$7.StandardSubwalletId;
        this.version = opts.version === 'org.ton.wallets.v3' ? opts.version : 'org.ton.wallets.v3.r2';
    }

    createTransferMessage(transfers, seqno, timeout = 60) {
        if (!transfers.length || transfers.length > 4) {
            throw new Error('ContractWalletV3: can make only 1 to 4 transfers per operation.');
        }
        const body = new ton3_core_1$c.Builder().storeUint(this.subwalletId, 32).storeUint(~~(Date.now() / 1e3) + timeout, 32).storeUint(seqno, 32);
        transfers.forEach((transfer) => {
            const internal2 = new ton3_core_1$c.Contracts.MessageInternal({
                bounce: transfer.destination.bounceable,
                src: ton3_core_1$c.Address.NONE,
                dest: transfer.destination,
                value: transfer.amount,
            }, { body: transfer.body, state: transfer.init });
            body.storeUint(transfer.mode, 8).storeRef(internal2.cell());
        });
        return new ton3_core_1$c.Contracts.MessageExternalIn({ dest: this.address }, { body: body.cell(), state: seqno === 0 ? this.state : void 0 });
    }

    createDeployMessage() {
        const body = new ton3_core_1$c.Builder().storeUint(this.subwalletId, 32).storeInt(-1, 32).storeUint(0, 32);
        return new ton3_core_1$c.Contracts.MessageExternalIn({ dest: this.address }, { body: body.cell(), state: this.state });
    }
}
WalletV3.WalletV3Contract = WalletV3Contract;
const WalletV4 = {};
Object.defineProperty(WalletV4, '__esModule', { value: true });
WalletV4.WalletV4Contract = void 0;
const ton3_core_1$b = dist$3;
const constants_1$6 = constants$2;
const Source_1 = Source$1;
class WalletV4Contract extends ton3_core_1$b.Contracts.ContractBase {
    constructor(opts) {
        const code = opts.version === 'org.ton.wallets.v4' ? Source_1.Source.WalletV4() : Source_1.Source.WalletV4R2();
        const storage2 = new ton3_core_1$b.Builder().storeUint(0, 32).storeUint(opts.subwalletId ?? constants_1$6.StandardSubwalletId, 32).storeBytes(opts.publicKey)
            .storeUint(0, 1)
            .cell();
        super(opts.workchain ?? 0, code, storage2);
        this.publicKey = opts.publicKey;
        this.subwalletId = opts.subwalletId ?? constants_1$6.StandardSubwalletId;
        this.version = opts.version === 'org.ton.wallets.v4' ? opts.version : 'org.ton.wallets.v4.r2';
    }

    createTransferMessage(transfers, seqno, timeout = 60) {
        if (!transfers.length || transfers.length > 4) {
            throw new Error('ContractWalletV3: can make only 1 to 4 transfers per operation.');
        }
        const body = new ton3_core_1$b.Builder().storeUint(this.subwalletId, 32).storeUint(~~(Date.now() / 1e3) + timeout, 32).storeUint(seqno, 32)
            .storeUint(0, 8);
        transfers.forEach((transfer) => {
            const internal2 = new ton3_core_1$b.Contracts.MessageInternal({
                bounce: transfer.destination.bounceable,
                src: ton3_core_1$b.Address.NONE,
                dest: transfer.destination,
                value: transfer.amount,
            }, { body: transfer.body, state: transfer.init });
            body.storeUint(transfer.mode, 8).storeRef(internal2.cell());
        });
        return new ton3_core_1$b.Contracts.MessageExternalIn({ dest: this.address }, { body: body.cell(), state: seqno === 0 ? this.state : void 0 });
    }

    createDeployMessage() {
        const body = new ton3_core_1$b.Builder().storeUint(this.subwalletId, 32).storeInt(-1, 32).storeUint(0, 32);
        return new ton3_core_1$b.Contracts.MessageExternalIn({ dest: this.address }, { body: body.cell(), state: this.state });
    }
}
WalletV4.WalletV4Contract = WalletV4Contract;
Object.defineProperty(Wallet$1, '__esModule', { value: true });
Wallet$1.Wallet = void 0;
const types_1$1 = types$2;
const WalletV3_1 = WalletV3;
const WalletV4_1 = WalletV4;
class Wallet {
    static openByPubKey({ workchain, publicKey, subwalletId, version: version2 = 'org.ton.wallets.v3.r2' }) {
        switch (true) {
            case types_1$1.walletV3Versions.indexOf(version2) > -1:
                return new WalletV3_1.WalletV3Contract({
                    workchain,
                    subwalletId,
                    publicKey,
                    version: version2,
                });
            case types_1$1.walletV4Versions.indexOf(version2) > -1:
                return new WalletV4_1.WalletV4Contract({
                    workchain,
                    subwalletId,
                    publicKey,
                    version: version2,
                });
            default:
                throw Error(`Unknown wallet version: ${version2}`);
        }
    }
}
Wallet$1.Wallet = Wallet;
(function (exports) {
    const __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        let desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true,
                get() {
                    return m[k];
                } };
        }
        Object.defineProperty(o, k2, desc);
    } : function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
    });
    const __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function (m, exports2) {
        for (const p in m) if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding2(exports2, m, p);
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    __exportStar(types$2, exports);
    __exportStar(constants$2, exports);
    __exportStar(Wallet$1, exports);
    __exportStar(WalletV3, exports);
    __exportStar(WalletV4, exports);
}(Wallet$2));
const Jetton$3 = {};
const constants$1 = {};
(function (exports) {
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.JettonOperation = void 0;
    (function (JettonOperation2) {
        JettonOperation2[JettonOperation2['TRANSFER'] = 260734629] = 'TRANSFER';
        JettonOperation2[JettonOperation2['TRANSFER_NOTIFICATION'] = 1935855772] = 'TRANSFER_NOTIFICATION';
        JettonOperation2[JettonOperation2['INTERNAL_TRANSFER'] = 395134233] = 'INTERNAL_TRANSFER';
        JettonOperation2[JettonOperation2['EXCESSES'] = 3576854235] = 'EXCESSES';
        JettonOperation2[JettonOperation2['BURN'] = 1499400124] = 'BURN';
        JettonOperation2[JettonOperation2['BURN_NOTIFICATION'] = 2078119902] = 'BURN_NOTIFICATION';
    }(exports.JettonOperation || (exports.JettonOperation = {})));
}(constants$1));
const JettonWallet$1 = {};
Object.defineProperty(JettonWallet$1, '__esModule', { value: true });
JettonWallet$1.JettonWallet = void 0;
const ton3_core_1$a = dist$3;
const constants_1$5 = constants$1;
class JettonWallet {
    static createTransferRequest({ queryId = 0, amount, destination, responseDestination = null, forwardAmount = new ton3_core_1$a.Coins(0), forwardPayload = null }) {
        const builder2 = new ton3_core_1$a.Builder().storeUint(constants_1$5.JettonOperation.TRANSFER, 32).storeUint(queryId, 64).storeCoins(amount)
            .storeAddress(destination)
            .storeAddress(responseDestination)
            .storeBit(0)
            .storeCoins(forwardAmount);
        if (!forwardPayload || forwardPayload.bits.length <= builder2.remainder) {
            builder2.storeBit(0);
            if (forwardPayload) {
                builder2.storeBits(forwardPayload.bits);
            }
        } else {
            builder2.storeBit(1).storeRef(forwardPayload);
        }
        return builder2.cell();
    }
}
JettonWallet$1.JettonWallet = JettonWallet;
(function (exports) {
    const __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        let desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true,
                get() {
                    return m[k];
                } };
        }
        Object.defineProperty(o, k2, desc);
    } : function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
    });
    const __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function (m, exports2) {
        for (const p in m) if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding2(exports2, m, p);
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    __exportStar(constants$1, exports);
    __exportStar(JettonWallet$1, exports);
}(Jetton$3));
(function (exports) {
    const __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        let desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true,
                get() {
                    return m[k];
                } };
        }
        Object.defineProperty(o, k2, desc);
    } : function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
    });
    const __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function (m, exports2) {
        for (const p in m) if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding2(exports2, m, p);
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    __exportStar(Wallet$2, exports);
    __exportStar(Jetton$3, exports);
}(dist$2));
const dist$1 = {};
const Client$1 = {};
const Client = {};
const HttpApi$1 = {};
const Either$1 = {};
const Applicative$4 = {};
const Apply$4 = {};
const _function = {};
(function (exports) {
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.getEndomorphismMonoid = exports.not = exports.SK = exports.hole = exports.pipe = exports.untupled = exports.tupled = exports.absurd = exports.decrement = exports.increment = exports.tuple = exports.flow = exports.flip = exports.constVoid = exports.constUndefined = exports.constNull = exports.constFalse = exports.constTrue = exports.constant = exports.unsafeCoerce = exports.identity = exports.apply = exports.getRing = exports.getSemiring = exports.getMonoid = exports.getSemigroup = exports.getBooleanAlgebra = void 0;
    const getBooleanAlgebra = function (B) {
        return function () {
            return {
                meet(x, y) {
                    return function (a) {
                        return B.meet(x(a), y(a));
                    };
                },
                join(x, y) {
                    return function (a) {
                        return B.join(x(a), y(a));
                    };
                },
                zero() {
                    return B.zero;
                },
                one() {
                    return B.one;
                },
                implies(x, y) {
                    return function (a) {
                        return B.implies(x(a), y(a));
                    };
                },
                not(x) {
                    return function (a) {
                        return B.not(x(a));
                    };
                },
            };
        };
    };
    exports.getBooleanAlgebra = getBooleanAlgebra;
    const getSemigroup2 = function (S) {
        return function () {
            return {
                concat(f, g) {
                    return function (a) {
                        return S.concat(f(a), g(a));
                    };
                },
            };
        };
    };
    exports.getSemigroup = getSemigroup2;
    const getMonoid2 = function (M) {
        const getSemigroupM = exports.getSemigroup(M);
        return function () {
            return {
                concat: getSemigroupM().concat,
                empty() {
                    return M.empty;
                },
            };
        };
    };
    exports.getMonoid = getMonoid2;
    const getSemiring = function (S) {
        return {
            add(f, g) {
                return function (x) {
                    return S.add(f(x), g(x));
                };
            },
            zero() {
                return S.zero;
            },
            mul(f, g) {
                return function (x) {
                    return S.mul(f(x), g(x));
                };
            },
            one() {
                return S.one;
            },
        };
    };
    exports.getSemiring = getSemiring;
    const getRing = function (R) {
        const S = exports.getSemiring(R);
        return {
            add: S.add,
            mul: S.mul,
            one: S.one,
            zero: S.zero,
            sub(f, g) {
                return function (x) {
                    return R.sub(f(x), g(x));
                };
            },
        };
    };
    exports.getRing = getRing;
    const apply = function (a) {
        return function (f) {
            return f(a);
        };
    };
    exports.apply = apply;
    function identity2(a) {
        return a;
    }
    exports.identity = identity2;
    exports.unsafeCoerce = identity2;
    function constant2(a) {
        return function () {
            return a;
        };
    }
    exports.constant = constant2;
    exports.constTrue = /* @__PURE__ */ constant2(true);
    exports.constFalse = /* @__PURE__ */ constant2(false);
    exports.constNull = /* @__PURE__ */ constant2(null);
    exports.constUndefined = /* @__PURE__ */ constant2(void 0);
    exports.constVoid = exports.constUndefined;
    function flip(f) {
        return function (b, a) {
            return f(a, b);
        };
    }
    exports.flip = flip;
    function flow2(ab, bc, cd, de, ef, fg, gh, hi, ij) {
        switch (arguments.length) {
            case 1:
                return ab;
            case 2:
                return function () {
                    return bc(ab.apply(this, arguments));
                };
            case 3:
                return function () {
                    return cd(bc(ab.apply(this, arguments)));
                };
            case 4:
                return function () {
                    return de(cd(bc(ab.apply(this, arguments))));
                };
            case 5:
                return function () {
                    return ef(de(cd(bc(ab.apply(this, arguments)))));
                };
            case 6:
                return function () {
                    return fg(ef(de(cd(bc(ab.apply(this, arguments))))));
                };
            case 7:
                return function () {
                    return gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))));
                };
            case 8:
                return function () {
                    return hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments))))))));
                };
            case 9:
                return function () {
                    return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))))));
                };
        }
    }
    exports.flow = flow2;
    function tuple2() {
        const t = [];
        for (let _i = 0; _i < arguments.length; _i++) {
            t[_i] = arguments[_i];
        }
        return t;
    }
    exports.tuple = tuple2;
    function increment(n) {
        return n + 1;
    }
    exports.increment = increment;
    function decrement(n) {
        return n - 1;
    }
    exports.decrement = decrement;
    function absurd(_2) {
        throw new Error('Called `absurd` function which should be uncallable');
    }
    exports.absurd = absurd;
    function tupled(f) {
        return function (a) {
            return f.apply(void 0, a);
        };
    }
    exports.tupled = tupled;
    function untupled(f) {
        return function () {
            const a = [];
            for (let _i = 0; _i < arguments.length; _i++) {
                a[_i] = arguments[_i];
            }
            return f(a);
        };
    }
    exports.untupled = untupled;
    function pipe2(a, ab, bc, cd, de, ef, fg, gh, hi) {
        switch (arguments.length) {
            case 1:
                return a;
            case 2:
                return ab(a);
            case 3:
                return bc(ab(a));
            case 4:
                return cd(bc(ab(a)));
            case 5:
                return de(cd(bc(ab(a))));
            case 6:
                return ef(de(cd(bc(ab(a)))));
            case 7:
                return fg(ef(de(cd(bc(ab(a))))));
            case 8:
                return gh(fg(ef(de(cd(bc(ab(a)))))));
            case 9:
                return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
            default:
                var ret = arguments[0];
                for (let i = 1; i < arguments.length; i++) {
                    ret = arguments[i](ret);
                }
                return ret;
        }
    }
    exports.pipe = pipe2;
    exports.hole = absurd;
    const SK2 = function (_2, b) {
        return b;
    };
    exports.SK = SK2;
    function not2(predicate) {
        return function (a) {
            return !predicate(a);
        };
    }
    exports.not = not2;
    const getEndomorphismMonoid = function () {
        return {
            concat(first2, second) {
                return flow2(first2, second);
            },
            empty: identity2,
        };
    };
    exports.getEndomorphismMonoid = getEndomorphismMonoid;
}(_function));
Object.defineProperty(Apply$4, '__esModule', { value: true });
Apply$4.sequenceS = Apply$4.sequenceT = Apply$4.getApplySemigroup = Apply$4.apS = Apply$4.apSecond = Apply$4.apFirst = Apply$4.ap = void 0;
const function_1$3 = _function;
function ap$4(F, G) {
    return function (fa) {
        return function (fab) {
            return F.ap(F.map(fab, (gab) => function (ga) {
                return G.ap(gab, ga);
            }), fa);
        };
    };
}
Apply$4.ap = ap$4;
function apFirst$5(A) {
    return function (second) {
        return function (first2) {
            return A.ap(A.map(first2, (a) => function () {
                return a;
            }), second);
        };
    };
}
Apply$4.apFirst = apFirst$5;
function apSecond$5(A) {
    return function (second) {
        return function (first2) {
            return A.ap(A.map(first2, () => function (b) {
                return b;
            }), second);
        };
    };
}
Apply$4.apSecond = apSecond$5;
function apS$5(F) {
    return function (name, fb) {
        return function (fa) {
            return F.ap(F.map(fa, (a) => function (b) {
                let _a;
                return { ...a, ...(_a = {}, _a[name] = b, _a) };
            }), fb);
        };
    };
}
Apply$4.apS = apS$5;
function getApplySemigroup$3(F) {
    return function (S) {
        return {
            concat(first2, second) {
                return F.ap(F.map(first2, (x) => function (y) {
                    return S.concat(x, y);
                }), second);
            },
        };
    };
}
Apply$4.getApplySemigroup = getApplySemigroup$3;
function curried(f, n, acc) {
    return function (x) {
        const combined = Array(acc.length + 1);
        for (let i = 0; i < acc.length; i++) {
            combined[i] = acc[i];
        }
        combined[acc.length] = x;
        return n === 0 ? f.apply(null, combined) : curried(f, n - 1, combined);
    };
}
const tupleConstructors = {
    1(a) {
        return [a];
    },
    2(a) {
        return function (b) {
            return [a, b];
        };
    },
    3(a) {
        return function (b) {
            return function (c) {
                return [a, b, c];
            };
        };
    },
    4(a) {
        return function (b) {
            return function (c) {
                return function (d) {
                    return [a, b, c, d];
                };
            };
        };
    },
    5(a) {
        return function (b) {
            return function (c) {
                return function (d) {
                    return function (e) {
                        return [a, b, c, d, e];
                    };
                };
            };
        };
    },
};
function getTupleConstructor(len) {
    if (!tupleConstructors.hasOwnProperty(len)) {
        tupleConstructors[len] = curried(function_1$3.tuple, len - 1, []);
    }
    return tupleConstructors[len];
}
function sequenceT(F) {
    return function () {
        const args = [];
        for (let _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        const len = args.length;
        const f = getTupleConstructor(len);
        let fas = F.map(args[0], f);
        for (let i = 1; i < len; i++) {
            fas = F.ap(fas, args[i]);
        }
        return fas;
    };
}
Apply$4.sequenceT = sequenceT;
function getRecordConstructor(keys2) {
    const len = keys2.length;
    switch (len) {
        case 1:
            return function (a) {
                let _a;
                return _a = {}, _a[keys2[0]] = a, _a;
            };
        case 2:
            return function (a) {
                return function (b) {
                    let _a;
                    return _a = {}, _a[keys2[0]] = a, _a[keys2[1]] = b, _a;
                };
            };
        case 3:
            return function (a) {
                return function (b) {
                    return function (c) {
                        let _a;
                        return _a = {}, _a[keys2[0]] = a, _a[keys2[1]] = b, _a[keys2[2]] = c, _a;
                    };
                };
            };
        case 4:
            return function (a) {
                return function (b) {
                    return function (c) {
                        return function (d) {
                            let _a;
                            return _a = {}, _a[keys2[0]] = a, _a[keys2[1]] = b, _a[keys2[2]] = c, _a[keys2[3]] = d, _a;
                        };
                    };
                };
            };
        case 5:
            return function (a) {
                return function (b) {
                    return function (c) {
                        return function (d) {
                            return function (e) {
                                let _a;
                                return _a = {}, _a[keys2[0]] = a, _a[keys2[1]] = b, _a[keys2[2]] = c, _a[keys2[3]] = d, _a[keys2[4]] = e, _a;
                            };
                        };
                    };
                };
            };
        default:
            return curried(function () {
                const args = [];
                for (let _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                const r = {};
                for (let i = 0; i < len; i++) {
                    r[keys2[i]] = args[i];
                }
                return r;
            }, len - 1, []);
    }
}
function sequenceS(F) {
    return function (r) {
        const keys2 = Object.keys(r);
        const len = keys2.length;
        const f = getRecordConstructor(keys2);
        let fr = F.map(r[keys2[0]], f);
        for (let i = 1; i < len; i++) {
            fr = F.ap(fr, r[keys2[i]]);
        }
        return fr;
    };
}
Apply$4.sequenceS = sequenceS;
const Functor$5 = {};
Object.defineProperty(Functor$5, '__esModule', { value: true });
Functor$5.getFunctorComposition = Functor$5.bindTo = Functor$5.flap = Functor$5.map = void 0;
const function_1$2 = _function;
function map$6(F, G) {
    return function (f) {
        return function (fa) {
            return F.map(fa, (ga) => G.map(ga, f));
        };
    };
}
Functor$5.map = map$6;
function flap$6(F) {
    return function (a) {
        return function (fab) {
            return F.map(fab, (f) => f(a));
        };
    };
}
Functor$5.flap = flap$6;
function bindTo$5(F) {
    return function (name) {
        return function (fa) {
            return F.map(fa, (a) => {
                let _a;
                return _a = {}, _a[name] = a, _a;
            });
        };
    };
}
Functor$5.bindTo = bindTo$5;
function getFunctorComposition(F, G) {
    const _map2 = map$6(F, G);
    return {
        map(fga, f) {
            return function_1$2.pipe(fga, _map2(f));
        },
    };
}
Functor$5.getFunctorComposition = getFunctorComposition;
Object.defineProperty(Applicative$4, '__esModule', { value: true });
Applicative$4.getApplicativeComposition = Applicative$4.getApplicativeMonoid = void 0;
const Apply_1 = Apply$4;
const function_1$1 = _function;
const Functor_1 = Functor$5;
function getApplicativeMonoid$1(F) {
    const f = Apply_1.getApplySemigroup(F);
    return function (M) {
        return {
            concat: f(M).concat,
            empty: F.of(M.empty),
        };
    };
}
Applicative$4.getApplicativeMonoid = getApplicativeMonoid$1;
function getApplicativeComposition(F, G) {
    const map2 = Functor_1.getFunctorComposition(F, G).map;
    const _ap2 = Apply_1.ap(F, G);
    return {
        map: map2,
        of(a) {
            return F.of(G.of(a));
        },
        ap(fgab, fga) {
            return function_1$1.pipe(fgab, _ap2(fga));
        },
    };
}
Applicative$4.getApplicativeComposition = getApplicativeComposition;
const Chain$4 = {};
Object.defineProperty(Chain$4, '__esModule', { value: true });
Chain$4.bind = Chain$4.chainFirst = void 0;
function chainFirst$5(M) {
    return function (f) {
        return function (first2) {
            return M.chain(first2, (a) => M.map(f(a), () => a));
        };
    };
}
Chain$4.chainFirst = chainFirst$5;
function bind$8(M) {
    return function (name, f) {
        return function (ma) {
            return M.chain(ma, (a) => M.map(f(a), (b) => {
                let _a;
                return { ...a, ...(_a = {}, _a[name] = b, _a) };
            }));
        };
    };
}
Chain$4.bind = bind$8;
const ChainRec$1 = {};
Object.defineProperty(ChainRec$1, '__esModule', { value: true });
ChainRec$1.tailRec = void 0;
const tailRec$1 = function (startWith, f) {
    let ab = f(startWith);
    while (ab._tag === 'Left') {
        ab = f(ab.left);
    }
    return ab.right;
};
ChainRec$1.tailRec = tailRec$1;
const FromEither$3 = {};
const internal = {};
const __spreadArray$5 = commonjsGlobal && commonjsGlobal.__spreadArray || function (to, from2) {
    for (let i = 0, il = from2.length, j = to.length; i < il; i++, j++) to[j] = from2[i];
    return to;
};
Object.defineProperty(internal, '__esModule', { value: true });
internal.fromReadonlyNonEmptyArray = internal.has = internal.emptyRecord = internal.emptyReadonlyArray = internal.tail = internal.head = internal.isNonEmpty = internal.singleton = internal.right = internal.left = internal.isRight = internal.isLeft = internal.some = internal.none = internal.isSome = internal.isNone = void 0;
const isNone$2 = function (fa) {
    return fa._tag === 'None';
};
internal.isNone = isNone$2;
const isSome$2 = function (fa) {
    return fa._tag === 'Some';
};
internal.isSome = isSome$2;
internal.none = { _tag: 'None' };
const some$5 = function (a) {
    return { _tag: 'Some', value: a };
};
internal.some = some$5;
const isLeft$2 = function (ma) {
    return ma._tag === 'Left';
};
internal.isLeft = isLeft$2;
const isRight$2 = function (ma) {
    return ma._tag === 'Right';
};
internal.isRight = isRight$2;
const left$2 = function (e) {
    return { _tag: 'Left', left: e };
};
internal.left = left$2;
const right$2 = function (a) {
    return { _tag: 'Right', right: a };
};
internal.right = right$2;
const singleton$2 = function (a) {
    return [a];
};
internal.singleton = singleton$2;
const isNonEmpty$6 = function (as) {
    return as.length > 0;
};
internal.isNonEmpty = isNonEmpty$6;
const head$5 = function (as) {
    return as[0];
};
internal.head = head$5;
const tail$4 = function (as) {
    return as.slice(1);
};
internal.tail = tail$4;
internal.emptyReadonlyArray = [];
internal.emptyRecord = {};
internal.has = Object.prototype.hasOwnProperty;
const fromReadonlyNonEmptyArray$2 = function (as) {
    return __spreadArray$5([as[0]], as.slice(1));
};
internal.fromReadonlyNonEmptyArray = fromReadonlyNonEmptyArray$2;
const __createBinding$1 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true,
        get() {
            return m[k];
        } });
} : function (o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    o[k2] = m[k];
});
const __setModuleDefault$1 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function (o, v) {
    Object.defineProperty(o, 'default', { enumerable: true, value: v });
} : function (o, v) {
    o['default'] = v;
});
const __importStar$1 = commonjsGlobal && commonjsGlobal.__importStar || function (mod) {
    if (mod && mod.__esModule) return mod;
    const result = {};
    if (mod != null) {
        for (const k in mod) if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$1(result, mod, k);
    }
    __setModuleDefault$1(result, mod);
    return result;
};
Object.defineProperty(FromEither$3, '__esModule', { value: true });
FromEither$3.filterOrElse = FromEither$3.chainFirstEitherK = FromEither$3.chainEitherK = FromEither$3.fromEitherK = FromEither$3.chainOptionK = FromEither$3.fromOptionK = FromEither$3.fromPredicate = FromEither$3.fromOption = void 0;
const Chain_1 = Chain$4;
const function_1 = _function;
const _$1 = __importStar$1(internal);
function fromOption$3(F) {
    return function (onNone) {
        return function (ma) {
            return F.fromEither(_$1.isNone(ma) ? _$1.left(onNone()) : _$1.right(ma.value));
        };
    };
}
FromEither$3.fromOption = fromOption$3;
function fromPredicate$4(F) {
    return function (predicate, onFalse) {
        return function (a) {
            return F.fromEither(predicate(a) ? _$1.right(a) : _$1.left(onFalse(a)));
        };
    };
}
FromEither$3.fromPredicate = fromPredicate$4;
function fromOptionK$3(F) {
    const fromOptionF = fromOption$3(F);
    return function (onNone) {
        const from2 = fromOptionF(onNone);
        return function (f) {
            return function_1.flow(f, from2);
        };
    };
}
FromEither$3.fromOptionK = fromOptionK$3;
function chainOptionK$2(F, M) {
    const fromOptionKF = fromOptionK$3(F);
    return function (onNone) {
        const from2 = fromOptionKF(onNone);
        return function (f) {
            return function (ma) {
                return M.chain(ma, from2(f));
            };
        };
    };
}
FromEither$3.chainOptionK = chainOptionK$2;
function fromEitherK$3(F) {
    return function (f) {
        return function_1.flow(f, F.fromEither);
    };
}
FromEither$3.fromEitherK = fromEitherK$3;
function chainEitherK$2(F, M) {
    const fromEitherKF = fromEitherK$3(F);
    return function (f) {
        return function (ma) {
            return M.chain(ma, fromEitherKF(f));
        };
    };
}
FromEither$3.chainEitherK = chainEitherK$2;
function chainFirstEitherK$2(F, M) {
    return function_1.flow(fromEitherK$3(F), Chain_1.chainFirst(M));
}
FromEither$3.chainFirstEitherK = chainFirstEitherK$2;
function filterOrElse$2(F, M) {
    return function (predicate, onFalse) {
        return function (ma) {
            return M.chain(ma, (a) => F.fromEither(predicate(a) ? _$1.right(a) : _$1.left(onFalse(a))));
        };
    };
}
FromEither$3.filterOrElse = filterOrElse$2;
const Separated = {};
(function (exports) {
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.right = exports.left = exports.flap = exports.Functor = exports.Bifunctor = exports.URI = exports.bimap = exports.mapLeft = exports.map = exports.separated = void 0;
    const function_12 = _function;
    const Functor_12 = Functor$5;
    const separated2 = function (left3, right3) {
        return { left: left3, right: right3 };
    };
    exports.separated = separated2;
    const _map2 = function (fa, f) {
        return function_12.pipe(fa, exports.map(f));
    };
    const _mapLeft2 = function (fa, f) {
        return function_12.pipe(fa, exports.mapLeft(f));
    };
    const _bimap2 = function (fa, g, f) {
        return function_12.pipe(fa, exports.bimap(g, f));
    };
    const map2 = function (f) {
        return function (fa) {
            return exports.separated(exports.left(fa), f(exports.right(fa)));
        };
    };
    exports.map = map2;
    const mapLeft2 = function (f) {
        return function (fa) {
            return exports.separated(f(exports.left(fa)), exports.right(fa));
        };
    };
    exports.mapLeft = mapLeft2;
    const bimap2 = function (f, g) {
        return function (fa) {
            return exports.separated(f(exports.left(fa)), g(exports.right(fa)));
        };
    };
    exports.bimap = bimap2;
    exports.URI = 'Separated';
    exports.Bifunctor = {
        URI: exports.URI,
        mapLeft: _mapLeft2,
        bimap: _bimap2,
    };
    exports.Functor = {
        URI: exports.URI,
        map: _map2,
    };
    exports.flap = /* @__PURE__ */ Functor_12.flap(exports.Functor);
    const left2 = function (s) {
        return s.left;
    };
    exports.left = left2;
    const right2 = function (s) {
        return s.right;
    };
    exports.right = right2;
}(Separated));
const Witherable$3 = {};
const __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true,
        get() {
            return m[k];
        } });
} : function (o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    o[k2] = m[k];
});
const __setModuleDefault = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function (o, v) {
    Object.defineProperty(o, 'default', { enumerable: true, value: v });
} : function (o, v) {
    o['default'] = v;
});
const __importStar = commonjsGlobal && commonjsGlobal.__importStar || function (mod) {
    if (mod && mod.__esModule) return mod;
    const result = {};
    if (mod != null) {
        for (const k in mod) if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(Witherable$3, '__esModule', { value: true });
Witherable$3.filterE = Witherable$3.witherDefault = Witherable$3.wiltDefault = void 0;
const _ = __importStar(internal);
function wiltDefault$1(T, C) {
    return function (F) {
        const traverseF = T.traverse(F);
        return function (wa, f) {
            return F.map(traverseF(wa, f), C.separate);
        };
    };
}
Witherable$3.wiltDefault = wiltDefault$1;
function witherDefault$1(T, C) {
    return function (F) {
        const traverseF = T.traverse(F);
        return function (wa, f) {
            return F.map(traverseF(wa, f), C.compact);
        };
    };
}
Witherable$3.witherDefault = witherDefault$1;
function filterE$2(W) {
    return function (F) {
        const witherF = W.wither(F);
        return function (predicate) {
            return function (ga) {
                return witherF(ga, (a) => F.map(predicate(a), (b) => (b ? _.some(a) : _.none)));
            };
        };
    };
}
Witherable$3.filterE = filterE$2;
(function (exports) {
    const __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        Object.defineProperty(o, k2, { enumerable: true,
            get() {
                return m[k];
            } });
    } : function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
    });
    const __setModuleDefault2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
    } : function (o, v) {
        o['default'] = v;
    });
    const __importStar2 = commonjsGlobal && commonjsGlobal.__importStar || function (mod) {
        if (mod && mod.__esModule) return mod;
        const result = {};
        if (mod != null) {
            for (const k in mod) if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding2(result, mod, k);
        }
        __setModuleDefault2(result, mod);
        return result;
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.fold = exports.match = exports.foldW = exports.matchW = exports.isRight = exports.isLeft = exports.fromOption = exports.fromPredicate = exports.FromEither = exports.MonadThrow = exports.throwError = exports.ChainRec = exports.Extend = exports.extend = exports.Alt = exports.alt = exports.altW = exports.Bifunctor = exports.mapLeft = exports.bimap = exports.Traversable = exports.sequence = exports.traverse = exports.Foldable = exports.reduceRight = exports.foldMap = exports.reduce = exports.Monad = exports.Chain = exports.chain = exports.chainW = exports.Applicative = exports.Apply = exports.ap = exports.apW = exports.Pointed = exports.of = exports.Functor = exports.map = exports.getAltValidation = exports.getApplicativeValidation = exports.getWitherable = exports.getFilterable = exports.getCompactable = exports.getSemigroup = exports.getEq = exports.getShow = exports.URI = exports.right = exports.left = void 0;
    exports.getValidation = exports.getValidationMonoid = exports.getValidationSemigroup = exports.getApplyMonoid = exports.getApplySemigroup = exports.either = exports.stringifyJSON = exports.parseJSON = exports.sequenceArray = exports.traverseArray = exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndex = exports.traverseReadonlyNonEmptyArrayWithIndex = exports.ApT = exports.apSW = exports.apS = exports.bindW = exports.bind = exports.bindTo = exports.Do = exports.exists = exports.elem = exports.toError = exports.toUnion = exports.chainNullableK = exports.fromNullableK = exports.tryCatchK = exports.tryCatch = exports.fromNullable = exports.orElse = exports.orElseW = exports.swap = exports.filterOrElseW = exports.filterOrElse = exports.chainOptionK = exports.fromOptionK = exports.duplicate = exports.flatten = exports.flattenW = exports.chainFirstW = exports.chainFirst = exports.apSecondW = exports.apSecond = exports.apFirstW = exports.apFirst = exports.flap = exports.getOrElse = exports.getOrElseW = void 0;
    const Applicative_1 = Applicative$4;
    const Apply_12 = Apply$4;
    const Chain_12 = Chain$4;
    const ChainRec_1 = ChainRec$1;
    const FromEither_1 = FromEither$3;
    const function_12 = _function;
    const Functor_12 = Functor$5;
    const _2 = __importStar2(internal);
    const Separated_1 = Separated;
    const Witherable_1 = Witherable$3;
    exports.left = _2.left;
    exports.right = _2.right;
    const _map2 = function (fa, f) {
        return function_12.pipe(fa, exports.map(f));
    };
    const _ap2 = function (fab, fa) {
        return function_12.pipe(fab, exports.ap(fa));
    };
    const _chain2 = function (ma, f) {
        return function_12.pipe(ma, exports.chain(f));
    };
    const _reduce2 = function (fa, b, f) {
        return function_12.pipe(fa, exports.reduce(b, f));
    };
    const _foldMap2 = function (M) {
        return function (fa, f) {
            const foldMapM = exports.foldMap(M);
            return function_12.pipe(fa, foldMapM(f));
        };
    };
    const _reduceRight2 = function (fa, b, f) {
        return function_12.pipe(fa, exports.reduceRight(b, f));
    };
    const _traverse2 = function (F) {
        const traverseF = exports.traverse(F);
        return function (ta, f) {
            return function_12.pipe(ta, traverseF(f));
        };
    };
    const _bimap2 = function (fa, f, g) {
        return function_12.pipe(fa, exports.bimap(f, g));
    };
    const _mapLeft2 = function (fa, f) {
        return function_12.pipe(fa, exports.mapLeft(f));
    };
    const _alt2 = function (fa, that) {
        return function_12.pipe(fa, exports.alt(that));
    };
    const _extend2 = function (wa, f) {
        return function_12.pipe(wa, exports.extend(f));
    };
    const _chainRec2 = function (a, f) {
        return ChainRec_1.tailRec(f(a), (e) => (exports.isLeft(e) ? exports.right(exports.left(e.left)) : exports.isLeft(e.right) ? exports.left(f(e.right.left)) : exports.right(exports.right(e.right.right))));
    };
    exports.URI = 'Either';
    const getShow2 = function (SE, SA) {
        return {
            show(ma) {
                return exports.isLeft(ma) ? `left(${SE.show(ma.left)})` : `right(${SA.show(ma.right)})`;
            },
        };
    };
    exports.getShow = getShow2;
    const getEq2 = function (EL, EA) {
        return {
            equals(x, y) {
                return x === y || (exports.isLeft(x) ? exports.isLeft(y) && EL.equals(x.left, y.left) : exports.isRight(y) && EA.equals(x.right, y.right));
            },
        };
    };
    exports.getEq = getEq2;
    const getSemigroup2 = function (S) {
        return {
            concat(x, y) {
                return exports.isLeft(y) ? x : exports.isLeft(x) ? y : exports.right(S.concat(x.right, y.right));
            },
        };
    };
    exports.getSemigroup = getSemigroup2;
    const getCompactable2 = function (M) {
        const empty2 = exports.left(M.empty);
        return {
            URI: exports.URI,
            _E: void 0,
            compact(ma) {
                return exports.isLeft(ma) ? ma : ma.right._tag === 'None' ? empty2 : exports.right(ma.right.value);
            },
            separate(ma) {
                return exports.isLeft(ma) ? Separated_1.separated(ma, ma) : exports.isLeft(ma.right) ? Separated_1.separated(exports.right(ma.right.left), empty2) : Separated_1.separated(empty2, exports.right(ma.right.right));
            },
        };
    };
    exports.getCompactable = getCompactable2;
    const getFilterable2 = function (M) {
        const empty2 = exports.left(M.empty);
        const _a = exports.getCompactable(M); const compact2 = _a.compact; const
            separate2 = _a.separate;
        const filter2 = function (ma, predicate) {
            return exports.isLeft(ma) ? ma : predicate(ma.right) ? ma : empty2;
        };
        const partition2 = function (ma, p) {
            return exports.isLeft(ma) ? Separated_1.separated(ma, ma) : p(ma.right) ? Separated_1.separated(empty2, exports.right(ma.right)) : Separated_1.separated(exports.right(ma.right), empty2);
        };
        return {
            URI: exports.URI,
            _E: void 0,
            map: _map2,
            compact: compact2,
            separate: separate2,
            filter: filter2,
            filterMap(ma, f) {
                if (exports.isLeft(ma)) {
                    return ma;
                }
                const ob = f(ma.right);
                return ob._tag === 'None' ? empty2 : exports.right(ob.value);
            },
            partition: partition2,
            partitionMap(ma, f) {
                if (exports.isLeft(ma)) {
                    return Separated_1.separated(ma, ma);
                }
                const e = f(ma.right);
                return exports.isLeft(e) ? Separated_1.separated(exports.right(e.left), empty2) : Separated_1.separated(empty2, exports.right(e.right));
            },
        };
    };
    exports.getFilterable = getFilterable2;
    const getWitherable2 = function (M) {
        const F_ = exports.getFilterable(M);
        const C = exports.getCompactable(M);
        return {
            URI: exports.URI,
            _E: void 0,
            map: _map2,
            compact: F_.compact,
            separate: F_.separate,
            filter: F_.filter,
            filterMap: F_.filterMap,
            partition: F_.partition,
            partitionMap: F_.partitionMap,
            traverse: _traverse2,
            sequence: exports.sequence,
            reduce: _reduce2,
            foldMap: _foldMap2,
            reduceRight: _reduceRight2,
            wither: Witherable_1.witherDefault(exports.Traversable, C),
            wilt: Witherable_1.wiltDefault(exports.Traversable, C),
        };
    };
    exports.getWitherable = getWitherable2;
    const getApplicativeValidation2 = function (SE) {
        return {
            URI: exports.URI,
            _E: void 0,
            map: _map2,
            ap(fab, fa) {
                return exports.isLeft(fab) ? exports.isLeft(fa) ? exports.left(SE.concat(fab.left, fa.left)) : fab : exports.isLeft(fa) ? fa : exports.right(fab.right(fa.right));
            },
            of: exports.of,
        };
    };
    exports.getApplicativeValidation = getApplicativeValidation2;
    const getAltValidation2 = function (SE) {
        return {
            URI: exports.URI,
            _E: void 0,
            map: _map2,
            alt(me, that) {
                if (exports.isRight(me)) {
                    return me;
                }
                const ea = that();
                return exports.isLeft(ea) ? exports.left(SE.concat(me.left, ea.left)) : ea;
            },
        };
    };
    exports.getAltValidation = getAltValidation2;
    const map2 = function (f) {
        return function (fa) {
            return exports.isLeft(fa) ? fa : exports.right(f(fa.right));
        };
    };
    exports.map = map2;
    exports.Functor = {
        URI: exports.URI,
        map: _map2,
    };
    exports.of = exports.right;
    exports.Pointed = {
        URI: exports.URI,
        of: exports.of,
    };
    const apW2 = function (fa) {
        return function (fab) {
            return exports.isLeft(fab) ? fab : exports.isLeft(fa) ? fa : exports.right(fab.right(fa.right));
        };
    };
    exports.apW = apW2;
    exports.ap = exports.apW;
    exports.Apply = {
        URI: exports.URI,
        map: _map2,
        ap: _ap2,
    };
    exports.Applicative = {
        URI: exports.URI,
        map: _map2,
        ap: _ap2,
        of: exports.of,
    };
    const chainW2 = function (f) {
        return function (ma) {
            return exports.isLeft(ma) ? ma : f(ma.right);
        };
    };
    exports.chainW = chainW2;
    exports.chain = exports.chainW;
    exports.Chain = {
        URI: exports.URI,
        map: _map2,
        ap: _ap2,
        chain: _chain2,
    };
    exports.Monad = {
        URI: exports.URI,
        map: _map2,
        ap: _ap2,
        of: exports.of,
        chain: _chain2,
    };
    const reduce2 = function (b, f) {
        return function (fa) {
            return exports.isLeft(fa) ? b : f(b, fa.right);
        };
    };
    exports.reduce = reduce2;
    const foldMap2 = function (M) {
        return function (f) {
            return function (fa) {
                return exports.isLeft(fa) ? M.empty : f(fa.right);
            };
        };
    };
    exports.foldMap = foldMap2;
    const reduceRight2 = function (b, f) {
        return function (fa) {
            return exports.isLeft(fa) ? b : f(fa.right, b);
        };
    };
    exports.reduceRight = reduceRight2;
    exports.Foldable = {
        URI: exports.URI,
        reduce: _reduce2,
        foldMap: _foldMap2,
        reduceRight: _reduceRight2,
    };
    const traverse2 = function (F) {
        return function (f) {
            return function (ta) {
                return exports.isLeft(ta) ? F.of(exports.left(ta.left)) : F.map(f(ta.right), exports.right);
            };
        };
    };
    exports.traverse = traverse2;
    const sequence2 = function (F) {
        return function (ma) {
            return exports.isLeft(ma) ? F.of(exports.left(ma.left)) : F.map(ma.right, exports.right);
        };
    };
    exports.sequence = sequence2;
    exports.Traversable = {
        URI: exports.URI,
        map: _map2,
        reduce: _reduce2,
        foldMap: _foldMap2,
        reduceRight: _reduceRight2,
        traverse: _traverse2,
        sequence: exports.sequence,
    };
    const bimap2 = function (f, g) {
        return function (fa) {
            return exports.isLeft(fa) ? exports.left(f(fa.left)) : exports.right(g(fa.right));
        };
    };
    exports.bimap = bimap2;
    const mapLeft2 = function (f) {
        return function (fa) {
            return exports.isLeft(fa) ? exports.left(f(fa.left)) : fa;
        };
    };
    exports.mapLeft = mapLeft2;
    exports.Bifunctor = {
        URI: exports.URI,
        bimap: _bimap2,
        mapLeft: _mapLeft2,
    };
    const altW2 = function (that) {
        return function (fa) {
            return exports.isLeft(fa) ? that() : fa;
        };
    };
    exports.altW = altW2;
    exports.alt = exports.altW;
    exports.Alt = {
        URI: exports.URI,
        map: _map2,
        alt: _alt2,
    };
    const extend2 = function (f) {
        return function (wa) {
            return exports.isLeft(wa) ? wa : exports.right(f(wa));
        };
    };
    exports.extend = extend2;
    exports.Extend = {
        URI: exports.URI,
        map: _map2,
        extend: _extend2,
    };
    exports.ChainRec = {
        URI: exports.URI,
        map: _map2,
        ap: _ap2,
        chain: _chain2,
        chainRec: _chainRec2,
    };
    exports.throwError = exports.left;
    exports.MonadThrow = {
        URI: exports.URI,
        map: _map2,
        ap: _ap2,
        of: exports.of,
        chain: _chain2,
        throwError: exports.throwError,
    };
    exports.FromEither = {
        URI: exports.URI,
        fromEither: function_12.identity,
    };
    exports.fromPredicate = /* @__PURE__ */ FromEither_1.fromPredicate(exports.FromEither);
    exports.fromOption = /* @__PURE__ */ FromEither_1.fromOption(exports.FromEither);
    exports.isLeft = _2.isLeft;
    exports.isRight = _2.isRight;
    const matchW2 = function (onLeft, onRight) {
        return function (ma) {
            return exports.isLeft(ma) ? onLeft(ma.left) : onRight(ma.right);
        };
    };
    exports.matchW = matchW2;
    exports.foldW = exports.matchW;
    exports.match = exports.matchW;
    exports.fold = exports.match;
    const getOrElseW2 = function (onLeft) {
        return function (ma) {
            return exports.isLeft(ma) ? onLeft(ma.left) : ma.right;
        };
    };
    exports.getOrElseW = getOrElseW2;
    exports.getOrElse = exports.getOrElseW;
    exports.flap = /* @__PURE__ */ Functor_12.flap(exports.Functor);
    exports.apFirst = /* @__PURE__ */ Apply_12.apFirst(exports.Apply);
    exports.apFirstW = exports.apFirst;
    exports.apSecond = /* @__PURE__ */ Apply_12.apSecond(exports.Apply);
    exports.apSecondW = exports.apSecond;
    exports.chainFirst = /* @__PURE__ */ Chain_12.chainFirst(exports.Chain);
    exports.chainFirstW = exports.chainFirst;
    exports.flattenW = /* @__PURE__ */ exports.chainW(function_12.identity);
    exports.flatten = exports.flattenW;
    exports.duplicate = /* @__PURE__ */ exports.extend(function_12.identity);
    exports.fromOptionK = /* @__PURE__ */ FromEither_1.fromOptionK(exports.FromEither);
    exports.chainOptionK = /* @__PURE__ */ FromEither_1.chainOptionK(exports.FromEither, exports.Chain);
    exports.filterOrElse = /* @__PURE__ */ FromEither_1.filterOrElse(exports.FromEither, exports.Chain);
    exports.filterOrElseW = exports.filterOrElse;
    const swap2 = function (ma) {
        return exports.isLeft(ma) ? exports.right(ma.left) : exports.left(ma.right);
    };
    exports.swap = swap2;
    const orElseW2 = function (onLeft) {
        return function (ma) {
            return exports.isLeft(ma) ? onLeft(ma.left) : ma;
        };
    };
    exports.orElseW = orElseW2;
    exports.orElse = exports.orElseW;
    const fromNullable2 = function (e) {
        return function (a) {
            return a == null ? exports.left(e) : exports.right(a);
        };
    };
    exports.fromNullable = fromNullable2;
    const tryCatch2 = function (f, onThrow) {
        try {
            return exports.right(f());
        } catch (e) {
            return exports.left(onThrow(e));
        }
    };
    exports.tryCatch = tryCatch2;
    const tryCatchK2 = function (f, onThrow) {
        return function () {
            const a = [];
            for (let _i = 0; _i < arguments.length; _i++) {
                a[_i] = arguments[_i];
            }
            return exports.tryCatch(() => f.apply(void 0, a), onThrow);
        };
    };
    exports.tryCatchK = tryCatchK2;
    const fromNullableK2 = function (e) {
        const from2 = exports.fromNullable(e);
        return function (f) {
            return function_12.flow(f, from2);
        };
    };
    exports.fromNullableK = fromNullableK2;
    const chainNullableK2 = function (e) {
        const from2 = exports.fromNullableK(e);
        return function (f) {
            return exports.chain(from2(f));
        };
    };
    exports.chainNullableK = chainNullableK2;
    exports.toUnion = /* @__PURE__ */ exports.foldW(function_12.identity, function_12.identity);
    function toError2(e) {
        return e instanceof Error ? e : new Error(String(e));
    }
    exports.toError = toError2;
    function elem2(E) {
        return function (a, ma) {
            if (ma === void 0) {
                const elemE_1 = elem2(E);
                return function (ma2) {
                    return elemE_1(a, ma2);
                };
            }
            return exports.isLeft(ma) ? false : E.equals(a, ma.right);
        };
    }
    exports.elem = elem2;
    const exists2 = function (predicate) {
        return function (ma) {
            return exports.isLeft(ma) ? false : predicate(ma.right);
        };
    };
    exports.exists = exists2;
    exports.Do = /* @__PURE__ */ exports.of(_2.emptyRecord);
    exports.bindTo = /* @__PURE__ */ Functor_12.bindTo(exports.Functor);
    exports.bind = /* @__PURE__ */ Chain_12.bind(exports.Chain);
    exports.bindW = exports.bind;
    exports.apS = /* @__PURE__ */ Apply_12.apS(exports.Apply);
    exports.apSW = exports.apS;
    exports.ApT = /* @__PURE__ */ exports.of(_2.emptyReadonlyArray);
    const traverseReadonlyNonEmptyArrayWithIndex2 = function (f) {
        return function (as) {
            const e = f(0, _2.head(as));
            if (exports.isLeft(e)) {
                return e;
            }
            const out = [e.right];
            for (let i = 1; i < as.length; i++) {
                const e_1 = f(i, as[i]);
                if (exports.isLeft(e_1)) {
                    return e_1;
                }
                out.push(e_1.right);
            }
            return exports.right(out);
        };
    };
    exports.traverseReadonlyNonEmptyArrayWithIndex = traverseReadonlyNonEmptyArrayWithIndex2;
    const traverseReadonlyArrayWithIndex2 = function (f) {
        const g = exports.traverseReadonlyNonEmptyArrayWithIndex(f);
        return function (as) {
            return _2.isNonEmpty(as) ? g(as) : exports.ApT;
        };
    };
    exports.traverseReadonlyArrayWithIndex = traverseReadonlyArrayWithIndex2;
    exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndex;
    const traverseArray2 = function (f) {
        return exports.traverseReadonlyArrayWithIndex((_3, a) => f(a));
    };
    exports.traverseArray = traverseArray2;
    exports.sequenceArray = /* @__PURE__ */ exports.traverseArray(function_12.identity);
    function parseJSON2(s, onError) {
        return exports.tryCatch(() => JSON.parse(s), onError);
    }
    exports.parseJSON = parseJSON2;
    const stringifyJSON2 = function (u, onError) {
        return exports.tryCatch(() => {
            const s = JSON.stringify(u);
            if (typeof s !== 'string') {
                throw new Error('Converting unsupported structure to JSON');
            }
            return s;
        }, onError);
    };
    exports.stringifyJSON = stringifyJSON2;
    exports.either = {
        URI: exports.URI,
        map: _map2,
        of: exports.of,
        ap: _ap2,
        chain: _chain2,
        reduce: _reduce2,
        foldMap: _foldMap2,
        reduceRight: _reduceRight2,
        traverse: _traverse2,
        sequence: exports.sequence,
        bimap: _bimap2,
        mapLeft: _mapLeft2,
        alt: _alt2,
        extend: _extend2,
        chainRec: _chainRec2,
        throwError: exports.throwError,
    };
    exports.getApplySemigroup = /* @__PURE__ */ Apply_12.getApplySemigroup(exports.Apply);
    exports.getApplyMonoid = /* @__PURE__ */ Applicative_1.getApplicativeMonoid(exports.Applicative);
    const getValidationSemigroup2 = function (SE, SA) {
        return Apply_12.getApplySemigroup(exports.getApplicativeValidation(SE))(SA);
    };
    exports.getValidationSemigroup = getValidationSemigroup2;
    const getValidationMonoid2 = function (SE, MA) {
        return Applicative_1.getApplicativeMonoid(exports.getApplicativeValidation(SE))(MA);
    };
    exports.getValidationMonoid = getValidationMonoid2;
    function getValidation2(SE) {
        const ap2 = exports.getApplicativeValidation(SE).ap;
        const alt2 = exports.getAltValidation(SE).alt;
        return {
            URI: exports.URI,
            _E: void 0,
            map: _map2,
            of: exports.of,
            chain: _chain2,
            bimap: _bimap2,
            mapLeft: _mapLeft2,
            reduce: _reduce2,
            foldMap: _foldMap2,
            reduceRight: _reduceRight2,
            extend: _extend2,
            traverse: _traverse2,
            sequence: exports.sequence,
            chainRec: _chainRec2,
            throwError: exports.throwError,
            ap: ap2,
            alt: alt2,
        };
    }
    exports.getValidation = getValidation2;
}(Either$1));
const src = {};
function identity$1(a) {
    return a;
}
function constant(a) {
    return function () {
        return a;
    };
}
const constNull = /* @__PURE__ */ constant(null);
const constUndefined = /* @__PURE__ */ constant(void 0);
function flow(ab, bc, cd, de, ef, fg, gh, hi, ij) {
    switch (arguments.length) {
        case 1:
            return ab;
        case 2:
            return function () {
                return bc(ab.apply(this, arguments));
            };
        case 3:
            return function () {
                return cd(bc(ab.apply(this, arguments)));
            };
        case 4:
            return function () {
                return de(cd(bc(ab.apply(this, arguments))));
            };
        case 5:
            return function () {
                return ef(de(cd(bc(ab.apply(this, arguments)))));
            };
        case 6:
            return function () {
                return fg(ef(de(cd(bc(ab.apply(this, arguments))))));
            };
        case 7:
            return function () {
                return gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))));
            };
        case 8:
            return function () {
                return hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments))))))));
            };
        case 9:
            return function () {
                return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))))));
            };
    }
}
function pipe$1(a, ab, bc, cd, de, ef, fg, gh, hi) {
    switch (arguments.length) {
        case 1:
            return a;
        case 2:
            return ab(a);
        case 3:
            return bc(ab(a));
        case 4:
            return cd(bc(ab(a)));
        case 5:
            return de(cd(bc(ab(a))));
        case 6:
            return ef(de(cd(bc(ab(a)))));
        case 7:
            return fg(ef(de(cd(bc(ab(a))))));
        case 8:
            return gh(fg(ef(de(cd(bc(ab(a)))))));
        case 9:
            return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
        default:
            var ret = arguments[0];
            for (let i = 1; i < arguments.length; i++) {
                ret = arguments[i](ret);
            }
            return ret;
    }
}
const SK = function (_2, b) {
    return b;
};
function apFirst$4(A) {
    return function (second) {
        return function (first2) {
            return A.ap(A.map(first2, (a) => function () {
                return a;
            }), second);
        };
    };
}
function apSecond$4(A) {
    return function (second) {
        return function (first2) {
            return A.ap(A.map(first2, () => function (b) {
                return b;
            }), second);
        };
    };
}
function apS$4(F) {
    return function (name, fb) {
        return function (fa) {
            return F.ap(F.map(fa, (a) => function (b) {
                let _a;
                return { ...a, ...(_a = {}, _a[name] = b, _a) };
            }), fb);
        };
    };
}
function getApplySemigroup$2(F) {
    return function (S) {
        return {
            concat(first2, second) {
                return F.ap(F.map(first2, (x) => function (y) {
                    return S.concat(x, y);
                }), second);
            },
        };
    };
}
function chainFirst$4(M) {
    return function (f) {
        return function (first2) {
            return M.chain(first2, (a) => M.map(f(a), () => a));
        };
    };
}
function bind$7(M) {
    return function (name, f) {
        return function (ma) {
            return M.chain(ma, (a) => M.map(f(a), (b) => {
                let _a;
                return { ...a, ...(_a = {}, _a[name] = b, _a) };
            }));
        };
    };
}
const __spreadArray$4 = globalThis && globalThis.__spreadArray || function (to, from2) {
    for (let i = 0, il = from2.length, j = to.length; i < il; i++, j++) to[j] = from2[i];
    return to;
};
const isNone$1 = function (fa) {
    return fa._tag === 'None';
};
const isSome$1 = function (fa) {
    return fa._tag === 'Some';
};
const none$1 = { _tag: 'None' };
const some$4 = function (a) {
    return { _tag: 'Some', value: a };
};
const isLeft$1 = function (ma) {
    return ma._tag === 'Left';
};
const isRight$1 = function (ma) {
    return ma._tag === 'Right';
};
const left$1 = function (e) {
    return { _tag: 'Left', left: e };
};
const right$1 = function (a) {
    return { _tag: 'Right', right: a };
};
const isNonEmpty$5 = function (as) {
    return as.length > 0;
};
const head$4 = function (as) {
    return as[0];
};
const tail$3 = function (as) {
    return as.slice(1);
};
const emptyReadonlyArray = [];
const emptyRecord = {};
const has$2 = Object.prototype.hasOwnProperty;
const fromReadonlyNonEmptyArray$1 = function (as) {
    return __spreadArray$4([as[0]], as.slice(1));
};
function fromOption$2(F) {
    return function (onNone) {
        return function (ma) {
            return F.fromEither(isNone$1(ma) ? left$1(onNone()) : right$1(ma.value));
        };
    };
}
function fromPredicate$3(F) {
    return function (predicate, onFalse) {
        return function (a) {
            return F.fromEither(predicate(a) ? right$1(a) : left$1(onFalse(a)));
        };
    };
}
function fromOptionK$2(F) {
    const fromOptionF = fromOption$2(F);
    return function (onNone) {
        const from2 = fromOptionF(onNone);
        return function (f) {
            return flow(f, from2);
        };
    };
}
function chainOptionK$1(F, M) {
    const fromOptionKF = fromOptionK$2(F);
    return function (onNone) {
        const from2 = fromOptionKF(onNone);
        return function (f) {
            return function (ma) {
                return M.chain(ma, from2(f));
            };
        };
    };
}
function fromEitherK$2(F) {
    return function (f) {
        return flow(f, F.fromEither);
    };
}
function chainEitherK$1(F, M) {
    const fromEitherKF = fromEitherK$2(F);
    return function (f) {
        return function (ma) {
            return M.chain(ma, fromEitherKF(f));
        };
    };
}
function chainFirstEitherK$1(F, M) {
    return flow(fromEitherK$2(F), chainFirst$4(M));
}
function filterOrElse$1(F, M) {
    return function (predicate, onFalse) {
        return function (ma) {
            return M.chain(ma, (a) => F.fromEither(predicate(a) ? right$1(a) : left$1(onFalse(a))));
        };
    };
}
function flap$5(F) {
    return function (a) {
        return function (fab) {
            return F.map(fab, (f) => f(a));
        };
    };
}
function bindTo$4(F) {
    return function (name) {
        return function (fa) {
            return F.map(fa, (a) => {
                let _a;
                return _a = {}, _a[name] = a, _a;
            });
        };
    };
}
const fromEquals = function (equals2) {
    return {
        equals(x, y) {
            return x === y || equals2(x, y);
        },
    };
};
const eqStrict = {
    equals(a, b) {
        return a === b;
    },
};
const equalsDefault = function (compare4) {
    return function (first2, second) {
        return first2 === second || compare4(first2, second) === 0;
    };
};
const fromCompare = function (compare4) {
    return {
        equals: equalsDefault(compare4),
        compare(first2, second) {
            return first2 === second ? 0 : compare4(first2, second);
        },
    };
};
const getSemigroup$3 = function () {
    return {
        concat(first2, second) {
            return fromCompare((a, b) => {
                const ox = first2.compare(a, b);
                return ox !== 0 ? ox : second.compare(a, b);
            });
        },
    };
};
const getMonoid$4 = function () {
    return {
        concat: getSemigroup$3().concat,
        empty: fromCompare(() => 0),
    };
};
const min$3 = function (O) {
    return function (first2, second) {
        return first2 === second || O.compare(first2, second) < 1 ? first2 : second;
    };
};
const max$3 = function (O) {
    return function (first2, second) {
        return first2 === second || O.compare(first2, second) > -1 ? first2 : second;
    };
};
function compare(first2, second) {
    return first2 < second ? -1 : first2 > second ? 1 : 0;
}
({
    equals: eqStrict.equals,
    compare,
});
const min$2 = function (O) {
    return {
        concat: min$3(O),
    };
};
const max$2 = function (O) {
    return {
        concat: max$3(O),
    };
};
const first = function () {
    return { concat: identity$1 };
};
const last$4 = function () {
    return { concat(_2, y) {
        return y;
    } };
};
const __spreadArray$3 = globalThis && globalThis.__spreadArray || function (to, from2) {
    for (let i = 0, il = from2.length, j = to.length; i < il; i++, j++) to[j] = from2[i];
    return to;
};
const isNonEmpty$4 = isNonEmpty$5;
const isOutOfBound$3 = function (i, as) {
    return i < 0 || i >= as.length;
};
const prependW$2 = function (head2) {
    return function (tail2) {
        return __spreadArray$3([head2], tail2);
    };
};
const prepend$2 = prependW$2;
const prependAll$2 = function (middle) {
    return function (as) {
        const out = [middle, as[0]];
        for (let i = 1; i < as.length; i++) {
            out.push(middle, as[i]);
        }
        return out;
    };
};
const intersperse$2 = function (middle) {
    return function (as) {
        const rest = tail$2(as);
        return isNonEmpty$4(rest) ? pipe$1(rest, prependAll$2(middle), prepend$2(head$3(as))) : as;
    };
};
const reduce$7 = function (b, f) {
    return reduceWithIndex$5(b, (_2, b2, a) => f(b2, a));
};
const foldMap$7 = function (S) {
    return function (f) {
        return function (as) {
            return as.slice(1).reduce((s, a) => S.concat(s, f(a)), f(as[0]));
        };
    };
};
const reduceRight$7 = function (b, f) {
    return reduceRightWithIndex$5(b, (_2, b2, a) => f(b2, a));
};
var reduceWithIndex$5 = function (b, f) {
    return function (as) {
        return as.reduce((b2, a, i) => f(i, b2, a), b);
    };
};
const foldMapWithIndex$5 = function (S) {
    return function (f) {
        return function (as) {
            return as.slice(1).reduce((s, a, i) => S.concat(s, f(i + 1, a)), f(0, as[0]));
        };
    };
};
var reduceRightWithIndex$5 = function (b, f) {
    return function (as) {
        return as.reduceRight((b2, a, i) => f(i, a, b2), b);
    };
};
const extract$1 = head$4;
const getShow$7 = function (S) {
    return {
        show(as) {
            return `[${as.map(S.show).join(', ')}]`;
        },
    };
};
const getEq$7 = function (E) {
    return fromEquals((xs, ys) => xs.length === ys.length && xs.every((x, i) => E.equals(x, ys[i])));
};
var head$3 = extract$1;
var tail$2 = tail$3;
const last$3 = function (as) {
    return as[as.length - 1];
};
const min$1 = function (O) {
    const S = min$2(O);
    return function (as) {
        return as.reduce(S.concat);
    };
};
const max$1 = function (O) {
    const S = max$2(O);
    return function (as) {
        return as.reduce(S.concat);
    };
};
const concatAll$1 = function (S) {
    return function (as) {
        return as.reduce(S.concat);
    };
};
const intercalate$3 = function (S) {
    const concatAllS = concatAll$1(S);
    return function (middle) {
        return flow(intersperse$2(middle), concatAllS);
    };
};
const __spreadArray$2 = globalThis && globalThis.__spreadArray || function (to, from2) {
    for (let i = 0, il = from2.length, j = to.length; i < il; i++, j++) to[j] = from2[i];
    return to;
};
const isNonEmpty$3 = function (as) {
    return as.length > 0;
};
const isOutOfBound$2 = function (i, as) {
    return i < 0 || i >= as.length;
};
const prependW$1 = function (head2) {
    return function (tail2) {
        return __spreadArray$2([head2], tail2);
    };
};
const prepend$1 = prependW$1;
const appendW$1 = function (end) {
    return function (init2) {
        return __spreadArray$2(__spreadArray$2([], init2), [end]);
    };
};
const append$1 = appendW$1;
const unsafeInsertAt$1 = function (i, a, as) {
    if (isNonEmpty$3(as)) {
        const xs = fromReadonlyNonEmptyArray(as);
        xs.splice(i, 0, a);
        return xs;
    }
    return [a];
};
const unsafeUpdateAt$1 = function (i, a, as) {
    const xs = fromReadonlyNonEmptyArray(as);
    xs[i] = a;
    return xs;
};
const uniq$1 = function (E) {
    return function (as) {
        if (as.length === 1) {
            return copy$1(as);
        }
        const out = [head$2(as)];
        const rest = tail$1(as);
        const _loop_1 = function (a2) {
            if (out.every((o) => !E.equals(o, a2))) {
                out.push(a2);
            }
        };
        for (let _i = 0, rest_1 = rest; _i < rest_1.length; _i++) {
            const a = rest_1[_i];
            _loop_1(a);
        }
        return out;
    };
};
const sortBy$1 = function (ords) {
    if (isNonEmpty$3(ords)) {
        const M = getMonoid$4();
        return sort$1(ords.reduce(M.concat, M.empty));
    }
    return copy$1;
};
const union$4 = function (E) {
    const uniqE = uniq$1(E);
    return function (second) {
        return function (first2) {
            return uniqE(pipe$1(first2, concat$1(second)));
        };
    };
};
const rotate$1 = function (n) {
    return function (as) {
        const len = as.length;
        const m = Math.round(n) % len;
        if (isOutOfBound$2(Math.abs(m), as) || m === 0) {
            return copy$1(as);
        }
        if (m < 0) {
            const _a = splitAt$1(-m)(as); const f = _a[0]; const
                s = _a[1];
            return pipe$1(s, concat$1(f));
        }
        return rotate$1(m - len)(as);
    };
};
var fromReadonlyNonEmptyArray = fromReadonlyNonEmptyArray$1;
const fromArray = function (as) {
    return isNonEmpty$3(as) ? some$4(as) : none$1;
};
const makeBy$1 = function (f) {
    return function (n) {
        const j = Math.max(0, Math.floor(n));
        const out = [f(0)];
        for (let i = 1; i < j; i++) {
            out.push(f(i));
        }
        return out;
    };
};
const replicate$1 = function (a) {
    return makeBy$1(() => a);
};
const range$1 = function (start, end) {
    return start <= end ? makeBy$1((i) => start + i)(end - start + 1) : [start];
};
const unprepend = function (as) {
    return [head$2(as), tail$1(as)];
};
const unappend = function (as) {
    return [init$1(as), last$2(as)];
};
function concatW$1(second) {
    return function (first2) {
        return first2.concat(second);
    };
}
function concat$1(x, y) {
    return y ? x.concat(y) : function (y2) {
        return y2.concat(x);
    };
}
const reverse$1 = function (as) {
    return __spreadArray$2([last$2(as)], as.slice(0, -1).reverse());
};
function group(E) {
    return function (as) {
        const len = as.length;
        if (len === 0) {
            return [];
        }
        const out = [];
        let head2 = as[0];
        let nea = [head2];
        for (let i = 1; i < len; i++) {
            const a = as[i];
            if (E.equals(a, head2)) {
                nea.push(a);
            } else {
                out.push(nea);
                head2 = a;
                nea = [head2];
            }
        }
        out.push(nea);
        return out;
    };
}
const groupBy = function (f) {
    return function (as) {
        const out = {};
        for (let _i = 0, as_1 = as; _i < as_1.length; _i++) {
            const a = as_1[_i];
            const k = f(a);
            if (out.hasOwnProperty(k)) {
                out[k].push(a);
            } else {
                out[k] = [a];
            }
        }
        return out;
    };
};
var sort$1 = function (O) {
    return function (as) {
        return as.slice().sort(O.compare);
    };
};
const insertAt$2 = function (i, a) {
    return function (as) {
        return i < 0 || i > as.length ? none$1 : some$4(unsafeInsertAt$1(i, a, as));
    };
};
const updateAt$2 = function (i, a) {
    return modifyAt$2(i, () => a);
};
var modifyAt$2 = function (i, f) {
    return function (as) {
        return isOutOfBound$2(i, as) ? none$1 : some$4(unsafeUpdateAt$1(i, f(as[i]), as));
    };
};
var copy$1 = fromReadonlyNonEmptyArray;
const of$3 = function (a) {
    return [a];
};
const zipWith$1 = function (as, bs, f) {
    const cs = [f(as[0], bs[0])];
    const len = Math.min(as.length, bs.length);
    for (let i = 1; i < len; i++) {
        cs[i] = f(as[i], bs[i]);
    }
    return cs;
};
function zip$1(as, bs) {
    if (bs === void 0) {
        return function (bs2) {
            return zip$1(bs2, as);
        };
    }
    return zipWith$1(as, bs, (a, b) => [a, b]);
}
const unzip$1 = function (abs) {
    const fa = [abs[0][0]];
    const fb = [abs[0][1]];
    for (let i = 1; i < abs.length; i++) {
        fa[i] = abs[i][0];
        fb[i] = abs[i][1];
    }
    return [fa, fb];
};
const prependAll$1 = function (middle) {
    return function (as) {
        const out = [middle, as[0]];
        for (let i = 1; i < as.length; i++) {
            out.push(middle, as[i]);
        }
        return out;
    };
};
const intersperse$1 = function (middle) {
    return function (as) {
        const rest = tail$1(as);
        return isNonEmpty$3(rest) ? pipe$1(rest, prependAll$1(middle), prepend$1(head$2(as))) : copy$1(as);
    };
};
const foldMapWithIndex$4 = foldMapWithIndex$5;
const foldMap$6 = foldMap$7;
const chainWithIndex$1 = function (f) {
    return function (as) {
        const out = fromReadonlyNonEmptyArray(f(0, head$2(as)));
        for (let i = 1; i < as.length; i++) {
            out.push.apply(out, f(i, as[i]));
        }
        return out;
    };
};
const chop$1 = function (f) {
    return function (as) {
        const _a = f(as); const b = _a[0]; const
            rest = _a[1];
        const out = [b];
        let next = rest;
        while (isNonEmpty$3(next)) {
            const _b = f(next); const b_1 = _b[0]; const
                rest_2 = _b[1];
            out.push(b_1);
            next = rest_2;
        }
        return out;
    };
};
var splitAt$1 = function (n) {
    return function (as) {
        const m = Math.max(1, n);
        return m >= as.length ? [copy$1(as), []] : [pipe$1(as.slice(1, m), prepend$1(head$2(as))), as.slice(m)];
    };
};
const chunksOf$1 = function (n) {
    return chop$1(splitAt$1(n));
};
const _map$5 = function (fa, f) {
    return pipe$1(fa, map$5(f));
};
const _mapWithIndex$3 = function (fa, f) {
    return pipe$1(fa, mapWithIndex$3(f));
};
const _ap$3 = function (fab, fa) {
    return pipe$1(fab, ap$3(fa));
};
const _chain$3 = function (ma, f) {
    return pipe$1(ma, chain$3(f));
};
const _extend$3 = function (wa, f) {
    return pipe$1(wa, extend$4(f));
};
const _reduce$5 = function (fa, b, f) {
    return pipe$1(fa, reduce$6(b, f));
};
const _foldMap$5 = function (M) {
    const foldMapM = foldMap$6(M);
    return function (fa, f) {
        return pipe$1(fa, foldMapM(f));
    };
};
const _reduceRight$5 = function (fa, b, f) {
    return pipe$1(fa, reduceRight$6(b, f));
};
const _traverse$5 = function (F) {
    const traverseF = traverse$5(F);
    return function (ta, f) {
        return pipe$1(ta, traverseF(f));
    };
};
const _alt$3 = function (fa, that) {
    return pipe$1(fa, alt$3(that));
};
const _reduceWithIndex$3 = function (fa, b, f) {
    return pipe$1(fa, reduceWithIndex$4(b, f));
};
const _foldMapWithIndex$3 = function (M) {
    const foldMapWithIndexM = foldMapWithIndex$4(M);
    return function (fa, f) {
        return pipe$1(fa, foldMapWithIndexM(f));
    };
};
const _reduceRightWithIndex$3 = function (fa, b, f) {
    return pipe$1(fa, reduceRightWithIndex$4(b, f));
};
const _traverseWithIndex$3 = function (F) {
    const traverseWithIndexF = traverseWithIndex$3(F);
    return function (ta, f) {
        return pipe$1(ta, traverseWithIndexF(f));
    };
};
const altW$3 = function (that) {
    return function (as) {
        return pipe$1(as, concatW$1(that()));
    };
};
var alt$3 = altW$3;
var ap$3 = function (as) {
    return chain$3((f) => pipe$1(as, map$5(f)));
};
var chain$3 = function (f) {
    return chainWithIndex$1((_2, a) => f(a));
};
var extend$4 = function (f) {
    return function (as) {
        let next = tail$1(as);
        const out = [f(as)];
        while (isNonEmpty$3(next)) {
            out.push(f(next));
            next = tail$1(next);
        }
        return out;
    };
};
const duplicate$3 = /* @__PURE__ */ extend$4(identity$1);
const flatten$3 = /* @__PURE__ */ chain$3(identity$1);
var map$5 = function (f) {
    return mapWithIndex$3((_2, a) => f(a));
};
var mapWithIndex$3 = function (f) {
    return function (as) {
        const out = [f(0, head$2(as))];
        for (let i = 1; i < as.length; i++) {
            out.push(f(i, as[i]));
        }
        return out;
    };
};
var reduce$6 = reduce$7;
var reduceWithIndex$4 = reduceWithIndex$5;
var reduceRight$6 = reduceRight$7;
var reduceRightWithIndex$4 = reduceRightWithIndex$5;
var traverse$5 = function (F) {
    const traverseWithIndexF = traverseWithIndex$3(F);
    return function (f) {
        return traverseWithIndexF((_2, a) => f(a));
    };
};
const sequence$5 = function (F) {
    return traverseWithIndex$3(F)((_2, a) => a);
};
var traverseWithIndex$3 = function (F) {
    return function (f) {
        return function (as) {
            let out = F.map(f(0, head$2(as)), of$3);
            for (let i = 1; i < as.length; i++) {
                out = F.ap(F.map(out, (bs) => function (b) {
                    return pipe$1(bs, append$1(b));
                }), f(i, as[i]));
            }
            return out;
        };
    };
};
const extract = head$3;
const URI$4 = 'NonEmptyArray';
const getShow$6 = getShow$7;
const getSemigroup$2 = function () {
    return {
        concat: concat$1,
    };
};
const getEq$6 = getEq$7;
const getUnionSemigroup$2 = function (E) {
    const unionE = union$4(E);
    return {
        concat(first2, second) {
            return unionE(second)(first2);
        },
    };
};
const Functor$4 = {
    URI: URI$4,
    map: _map$5,
};
const flap$4 = /* @__PURE__ */ flap$5(Functor$4);
const Pointed$3 = {
    URI: URI$4,
    of: of$3,
};
const FunctorWithIndex$2 = {
    URI: URI$4,
    map: _map$5,
    mapWithIndex: _mapWithIndex$3,
};
const Apply$3 = {
    URI: URI$4,
    map: _map$5,
    ap: _ap$3,
};
const apFirst$3 = /* @__PURE__ */ apFirst$4(Apply$3);
const apSecond$3 = /* @__PURE__ */ apSecond$4(Apply$3);
const Applicative$3 = {
    URI: URI$4,
    map: _map$5,
    ap: _ap$3,
    of: of$3,
};
const Chain$3 = {
    URI: URI$4,
    map: _map$5,
    ap: _ap$3,
    chain: _chain$3,
};
const chainFirst$3 = /* @__PURE__ */ chainFirst$4(Chain$3);
const Monad$3 = {
    URI: URI$4,
    map: _map$5,
    ap: _ap$3,
    of: of$3,
    chain: _chain$3,
};
const Foldable$4 = {
    URI: URI$4,
    reduce: _reduce$5,
    foldMap: _foldMap$5,
    reduceRight: _reduceRight$5,
};
const FoldableWithIndex$2 = {
    URI: URI$4,
    reduce: _reduce$5,
    foldMap: _foldMap$5,
    reduceRight: _reduceRight$5,
    reduceWithIndex: _reduceWithIndex$3,
    foldMapWithIndex: _foldMapWithIndex$3,
    reduceRightWithIndex: _reduceRightWithIndex$3,
};
const Traversable$4 = {
    URI: URI$4,
    map: _map$5,
    reduce: _reduce$5,
    foldMap: _foldMap$5,
    reduceRight: _reduceRight$5,
    traverse: _traverse$5,
    sequence: sequence$5,
};
const TraversableWithIndex$2 = {
    URI: URI$4,
    map: _map$5,
    mapWithIndex: _mapWithIndex$3,
    reduce: _reduce$5,
    foldMap: _foldMap$5,
    reduceRight: _reduceRight$5,
    traverse: _traverse$5,
    sequence: sequence$5,
    reduceWithIndex: _reduceWithIndex$3,
    foldMapWithIndex: _foldMapWithIndex$3,
    reduceRightWithIndex: _reduceRightWithIndex$3,
    traverseWithIndex: _traverseWithIndex$3,
};
const Alt$3 = {
    URI: URI$4,
    map: _map$5,
    alt: _alt$3,
};
const Comonad = {
    URI: URI$4,
    map: _map$5,
    extend: _extend$3,
    extract,
};
const Do$3 = /* @__PURE__ */ of$3(emptyRecord);
const bindTo$3 = /* @__PURE__ */ bindTo$4(Functor$4);
const bind$6 = /* @__PURE__ */ bind$7(Chain$3);
const apS$3 = /* @__PURE__ */ apS$4(Apply$3);
var head$2 = head$3;
var tail$1 = function (as) {
    return as.slice(1);
};
var last$2 = last$3;
var init$1 = function (as) {
    return as.slice(0, -1);
};
const min = min$1;
const max = max$1;
const concatAll = function (S) {
    return function (as) {
        return as.reduce(S.concat);
    };
};
const matchLeft$1 = function (f) {
    return function (as) {
        return f(head$2(as), tail$1(as));
    };
};
const matchRight$1 = function (f) {
    return function (as) {
        return f(init$1(as), last$2(as));
    };
};
const modifyHead = function (f) {
    return function (as) {
        return __spreadArray$2([
            f(head$2(as)),
        ], tail$1(as));
    };
};
const updateHead = function (a) {
    return modifyHead(() => a);
};
const modifyLast = function (f) {
    return function (as) {
        return pipe$1(init$1(as), append$1(f(last$2(as))));
    };
};
const updateLast = function (a) {
    return modifyLast(() => a);
};
const intercalate$2 = intercalate$3;
function groupSort(O) {
    const sortO = sort$1(O);
    const groupO = group(O);
    return function (as) {
        return isNonEmpty$3(as) ? groupO(sortO(as)) : [];
    };
}
function filter$4(predicate) {
    return filterWithIndex$3((_2, a) => predicate(a));
}
var filterWithIndex$3 = function (predicate) {
    return function (as) {
        return fromArray(as.filter((a, i) => predicate(i, a)));
    };
};
const uncons = unprepend;
const unsnoc = unappend;
function cons$1(head2, tail2) {
    return tail2 === void 0 ? prepend$1(head2) : pipe$1(tail2, prepend$1(head2));
}
const snoc$1 = function (init2, end) {
    return pipe$1(init2, append$1(end));
};
const prependToAll$1 = prependAll$1;
const fold$2 = concatAll$1;
const nonEmptyArray = {
    URI: URI$4,
    of: of$3,
    map: _map$5,
    mapWithIndex: _mapWithIndex$3,
    ap: _ap$3,
    chain: _chain$3,
    extend: _extend$3,
    extract,
    reduce: _reduce$5,
    foldMap: _foldMap$5,
    reduceRight: _reduceRight$5,
    traverse: _traverse$5,
    sequence: sequence$5,
    reduceWithIndex: _reduceWithIndex$3,
    foldMapWithIndex: _foldMapWithIndex$3,
    reduceRightWithIndex: _reduceRightWithIndex$3,
    traverseWithIndex: _traverseWithIndex$3,
    alt: _alt$3,
};
const NonEmptyArray = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    isNonEmpty: isNonEmpty$3,
    isOutOfBound: isOutOfBound$2,
    prependW: prependW$1,
    prepend: prepend$1,
    appendW: appendW$1,
    append: append$1,
    unsafeInsertAt: unsafeInsertAt$1,
    unsafeUpdateAt: unsafeUpdateAt$1,
    uniq: uniq$1,
    sortBy: sortBy$1,
    union: union$4,
    rotate: rotate$1,
    fromReadonlyNonEmptyArray,
    fromArray,
    makeBy: makeBy$1,
    replicate: replicate$1,
    range: range$1,
    unprepend,
    unappend,
    concatW: concatW$1,
    concat: concat$1,
    reverse: reverse$1,
    group,
    groupBy,
    sort: sort$1,
    insertAt: insertAt$2,
    updateAt: updateAt$2,
    modifyAt: modifyAt$2,
    copy: copy$1,
    of: of$3,
    zipWith: zipWith$1,
    zip: zip$1,
    unzip: unzip$1,
    prependAll: prependAll$1,
    intersperse: intersperse$1,
    foldMapWithIndex: foldMapWithIndex$4,
    foldMap: foldMap$6,
    chainWithIndex: chainWithIndex$1,
    chop: chop$1,
    splitAt: splitAt$1,
    chunksOf: chunksOf$1,
    altW: altW$3,
    alt: alt$3,
    ap: ap$3,
    chain: chain$3,
    extend: extend$4,
    duplicate: duplicate$3,
    flatten: flatten$3,
    map: map$5,
    mapWithIndex: mapWithIndex$3,
    reduce: reduce$6,
    reduceWithIndex: reduceWithIndex$4,
    reduceRight: reduceRight$6,
    reduceRightWithIndex: reduceRightWithIndex$4,
    traverse: traverse$5,
    sequence: sequence$5,
    traverseWithIndex: traverseWithIndex$3,
    extract,
    URI: URI$4,
    getShow: getShow$6,
    getSemigroup: getSemigroup$2,
    getEq: getEq$6,
    getUnionSemigroup: getUnionSemigroup$2,
    Functor: Functor$4,
    flap: flap$4,
    Pointed: Pointed$3,
    FunctorWithIndex: FunctorWithIndex$2,
    Apply: Apply$3,
    apFirst: apFirst$3,
    apSecond: apSecond$3,
    Applicative: Applicative$3,
    Chain: Chain$3,
    chainFirst: chainFirst$3,
    Monad: Monad$3,
    Foldable: Foldable$4,
    FoldableWithIndex: FoldableWithIndex$2,
    Traversable: Traversable$4,
    TraversableWithIndex: TraversableWithIndex$2,
    Alt: Alt$3,
    Comonad,
    Do: Do$3,
    bindTo: bindTo$3,
    bind: bind$6,
    apS: apS$3,
    head: head$2,
    tail: tail$1,
    last: last$2,
    init: init$1,
    min,
    max,
    concatAll,
    matchLeft: matchLeft$1,
    matchRight: matchRight$1,
    modifyHead,
    updateHead,
    modifyLast,
    updateLast,
    intercalate: intercalate$2,
    groupSort,
    filter: filter$4,
    filterWithIndex: filterWithIndex$3,
    uncons,
    unsnoc,
    cons: cons$1,
    snoc: snoc$1,
    prependToAll: prependToAll$1,
    fold: fold$2,
    nonEmptyArray,
}, Symbol.toStringTag, { value: 'Module' }));
const Eq$1 = {
    equals(first2, second) {
        return first2 === second;
    },
};
const Ord$1 = {
    equals: Eq$1.equals,
    compare(first2, second) {
        return first2 < second ? -1 : first2 > second ? 1 : 0;
    },
};
const separated = function (left2, right2) {
    return { left: left2, right: right2 };
};
function wiltDefault(T, C) {
    return function (F) {
        const traverseF = T.traverse(F);
        return function (wa, f) {
            return F.map(traverseF(wa, f), C.separate);
        };
    };
}
function witherDefault(T, C) {
    return function (F) {
        const traverseF = T.traverse(F);
        return function (wa, f) {
            return F.map(traverseF(wa, f), C.compact);
        };
    };
}
function filterE$1(W) {
    return function (F) {
        const witherF = W.wither(F);
        return function (predicate) {
            return function (ga) {
                return witherF(ga, (a) => F.map(predicate(a), (b) => (b ? some$4(a) : none$1)));
            };
        };
    };
}
function guard$2(F, P) {
    return function (b) {
        return b ? P.of(void 0) : F.zero();
    };
}
const __spreadArray$1 = globalThis && globalThis.__spreadArray || function (to, from2) {
    for (let i = 0, il = from2.length, j = to.length; i < il; i++, j++) to[j] = from2[i];
    return to;
};
const isNonEmpty$2 = isNonEmpty$4;
const matchW$3 = function (onEmpty, onNonEmpty) {
    return function (as) {
        return isNonEmpty$2(as) ? onNonEmpty(as) : onEmpty();
    };
};
const match$3 = matchW$3;
const isOutOfBound$1 = isOutOfBound$3;
function lookup$3(i, as) {
    return as === void 0 ? function (as2) {
        return lookup$3(i, as2);
    } : isOutOfBound$1(i, as) ? none$1 : some$4(as[i]);
}
const head$1 = function (as) {
    return isNonEmpty$2(as) ? some$4(head$3(as)) : none$1;
};
const last$1 = function (as) {
    return isNonEmpty$2(as) ? some$4(last$3(as)) : none$1;
};
const findIndex$1 = function (predicate) {
    return function (as) {
        for (let i = 0; i < as.length; i++) {
            if (predicate(as[i])) {
                return some$4(i);
            }
        }
        return none$1;
    };
};
function findFirst$1(predicate) {
    return function (as) {
        for (let i = 0; i < as.length; i++) {
            if (predicate(as[i])) {
                return some$4(as[i]);
            }
        }
        return none$1;
    };
}
const findFirstMap$1 = function (f) {
    return function (as) {
        for (let i = 0; i < as.length; i++) {
            const out = f(as[i]);
            if (isSome$1(out)) {
                return out;
            }
        }
        return none$1;
    };
};
function findLast$1(predicate) {
    return function (as) {
        for (let i = as.length - 1; i >= 0; i--) {
            if (predicate(as[i])) {
                return some$4(as[i]);
            }
        }
        return none$1;
    };
}
const findLastMap$1 = function (f) {
    return function (as) {
        for (let i = as.length - 1; i >= 0; i--) {
            const out = f(as[i]);
            if (isSome$1(out)) {
                return out;
            }
        }
        return none$1;
    };
};
const findLastIndex$1 = function (predicate) {
    return function (as) {
        for (let i = as.length - 1; i >= 0; i--) {
            if (predicate(as[i])) {
                return some$4(i);
            }
        }
        return none$1;
    };
};
function elem$5(E) {
    return function (a, as) {
        if (as === void 0) {
            const elemE_1 = elem$5(E);
            return function (as2) {
                return elemE_1(a, as2);
            };
        }
        const predicate = function (element) {
            return E.equals(element, a);
        };
        let i = 0;
        for (; i < as.length; i++) {
            if (predicate(as[i])) {
                return true;
            }
        }
        return false;
    };
}
const _chainRecDepthFirst$1 = function (a, f) {
    return pipe$1(a, chainRecDepthFirst$1(f));
};
const _chainRecBreadthFirst$1 = function (a, f) {
    return pipe$1(a, chainRecBreadthFirst$1(f));
};
const foldMapWithIndex$3 = function (M) {
    return function (f) {
        return function (fa) {
            return fa.reduce((b, a, i) => M.concat(b, f(i, a)), M.empty);
        };
    };
};
const reduce$5 = function (b, f) {
    return reduceWithIndex$3(b, (_2, b2, a) => f(b2, a));
};
const foldMap$5 = function (M) {
    const foldMapWithIndexM = foldMapWithIndex$3(M);
    return function (f) {
        return foldMapWithIndexM((_2, a) => f(a));
    };
};
var reduceWithIndex$3 = function (b, f) {
    return function (fa) {
        const len = fa.length;
        let out = b;
        for (let i = 0; i < len; i++) {
            out = f(i, out, fa[i]);
        }
        return out;
    };
};
const reduceRight$5 = function (b, f) {
    return reduceRightWithIndex$3(b, (_2, a, b2) => f(a, b2));
};
var reduceRightWithIndex$3 = function (b, f) {
    return function (fa) {
        return fa.reduceRight((b2, a, i) => f(i, a, b2), b);
    };
};
const getShow$5 = function (S) {
    return {
        show(as) {
            return `[${as.map(S.show).join(', ')}]`;
        },
    };
};
const getEq$5 = function (E) {
    return fromEquals((xs, ys) => xs.length === ys.length && xs.every((x, i) => E.equals(x, ys[i])));
};
const getOrd$2 = function (O) {
    return fromCompare((a, b) => {
        const aLen = a.length;
        const bLen = b.length;
        const len = Math.min(aLen, bLen);
        for (let i = 0; i < len; i++) {
            const ordering = O.compare(a[i], b[i]);
            if (ordering !== 0) {
                return ordering;
            }
        }
        return Ord$1.compare(aLen, bLen);
    });
};
var chainRecDepthFirst$1 = function (f) {
    return function (a) {
        const todo = __spreadArray$1([], f(a));
        const out = [];
        while (todo.length > 0) {
            const e = todo.shift();
            if (isLeft$1(e)) {
                todo.unshift.apply(todo, f(e.left));
            } else {
                out.push(e.right);
            }
        }
        return out;
    };
};
var chainRecBreadthFirst$1 = function (f) {
    return function (a) {
        const initial = f(a);
        const todo = [];
        const out = [];
        function go(e2) {
            if (isLeft$1(e2)) {
                f(e2.left).forEach((v) => todo.push(v));
            } else {
                out.push(e2.right);
            }
        }
        for (let _i = 0, initial_1 = initial; _i < initial_1.length; _i++) {
            const e = initial_1[_i];
            go(e);
        }
        while (todo.length > 0) {
            go(todo.shift());
        }
        return out;
    };
};
function every$3(predicate) {
    return function (as) {
        return as.every(predicate);
    };
}
const intercalate$1 = function (M) {
    const intercalateM = intercalate$3(M);
    return function (middle) {
        return match$3(() => M.empty, intercalateM(middle));
    };
};
const isEmpty$2 = function (as) {
    return as.length === 0;
};
const isNonEmpty$1 = isNonEmpty$3;
const prepend = prepend$1;
const prependW = prependW$1;
const append = append$1;
const appendW = appendW$1;
const makeBy = function (n, f) {
    return n <= 0 ? [] : makeBy$1(f)(n);
};
const replicate = function (n, a) {
    return makeBy(n, () => a);
};
function fromPredicate$2(predicate) {
    return function (a) {
        return predicate(a) ? [a] : [];
    };
}
const fromOption$1 = function (ma) {
    return isNone$1(ma) ? [] : [ma.value];
};
const fromEither$1 = function (e) {
    return isLeft$1(e) ? [] : [e.right];
};
const matchW$2 = function (onEmpty, onNonEmpty) {
    return function (as) {
        return isNonEmpty$1(as) ? onNonEmpty(as) : onEmpty();
    };
};
const match$2 = matchW$2;
const matchLeftW = function (onEmpty, onNonEmpty) {
    return function (as) {
        return isNonEmpty$1(as) ? onNonEmpty(head$2(as), tail$1(as)) : onEmpty();
    };
};
const matchLeft = matchLeftW;
const foldLeft = matchLeft;
const matchRightW = function (onEmpty, onNonEmpty) {
    return function (as) {
        return isNonEmpty$1(as) ? onNonEmpty(init$1(as), last$2(as)) : onEmpty();
    };
};
const matchRight = matchRightW;
const foldRight = matchRight;
const chainWithIndex = function (f) {
    return function (as) {
        const out = [];
        for (let i = 0; i < as.length; i++) {
            out.push.apply(out, f(i, as[i]));
        }
        return out;
    };
};
const scanLeft = function (b, f) {
    return function (as) {
        const len = as.length;
        const out = new Array(len + 1);
        out[0] = b;
        for (let i = 0; i < len; i++) {
            out[i + 1] = f(out[i], as[i]);
        }
        return out;
    };
};
const scanRight = function (b, f) {
    return function (as) {
        const len = as.length;
        const out = new Array(len + 1);
        out[len] = b;
        for (let i = len - 1; i >= 0; i--) {
            out[i] = f(as[i], out[i + 1]);
        }
        return out;
    };
};
const size$2 = function (as) {
    return as.length;
};
const isOutOfBound = isOutOfBound$2;
const lookup$2 = lookup$3;
const head = head$1;
const last = last$1;
const tail = function (as) {
    return isNonEmpty$1(as) ? some$4(tail$1(as)) : none$1;
};
const init = function (as) {
    return isNonEmpty$1(as) ? some$4(init$1(as)) : none$1;
};
const takeLeft = function (n) {
    return function (as) {
        return isOutOfBound(n, as) ? copy(as) : as.slice(0, n);
    };
};
const takeRight = function (n) {
    return function (as) {
        return isOutOfBound(n, as) ? copy(as) : n === 0 ? [] : as.slice(-n);
    };
};
function takeLeftWhile(predicate) {
    return function (as) {
        const out = [];
        for (let _i = 0, as_1 = as; _i < as_1.length; _i++) {
            const a = as_1[_i];
            if (!predicate(a)) {
                break;
            }
            out.push(a);
        }
        return out;
    };
}
const spanLeftIndex = function (as, predicate) {
    const l = as.length;
    let i = 0;
    for (; i < l; i++) {
        if (!predicate(as[i])) {
            break;
        }
    }
    return i;
};
function spanLeft(predicate) {
    return function (as) {
        const _a = splitAt(spanLeftIndex(as, predicate))(as); const init2 = _a[0]; const
            rest = _a[1];
        return { init: init2, rest };
    };
}
const dropLeft = function (n) {
    return function (as) {
        return n <= 0 || isEmpty$2(as) ? copy(as) : n >= as.length ? [] : as.slice(n, as.length);
    };
};
const dropRight = function (n) {
    return function (as) {
        return n <= 0 || isEmpty$2(as) ? copy(as) : n >= as.length ? [] : as.slice(0, as.length - n);
    };
};
function dropLeftWhile(predicate) {
    return function (as) {
        return as.slice(spanLeftIndex(as, predicate));
    };
}
const findIndex = findIndex$1;
function findFirst(predicate) {
    return findFirst$1(predicate);
}
const findFirstMap = findFirstMap$1;
function findLast(predicate) {
    return findLast$1(predicate);
}
const findLastMap = findLastMap$1;
const findLastIndex = findLastIndex$1;
var copy = function (as) {
    return as.slice();
};
const insertAt$1 = function (i, a) {
    return function (as) {
        return i < 0 || i > as.length ? none$1 : some$4(unsafeInsertAt(i, a, as));
    };
};
const updateAt$1 = function (i, a) {
    return modifyAt$1(i, () => a);
};
const deleteAt$1 = function (i) {
    return function (as) {
        return isOutOfBound(i, as) ? none$1 : some$4(unsafeDeleteAt(i, as));
    };
};
var modifyAt$1 = function (i, f) {
    return function (as) {
        return isOutOfBound(i, as) ? none$1 : some$4(unsafeUpdateAt(i, f(as[i]), as));
    };
};
const reverse = function (as) {
    return isEmpty$2(as) ? [] : as.slice().reverse();
};
const rights = function (as) {
    const r = [];
    for (let i = 0; i < as.length; i++) {
        const a = as[i];
        if (a._tag === 'Right') {
            r.push(a.right);
        }
    }
    return r;
};
const lefts = function (as) {
    const r = [];
    for (let i = 0; i < as.length; i++) {
        const a = as[i];
        if (a._tag === 'Left') {
            r.push(a.left);
        }
    }
    return r;
};
const sort = function (O) {
    return function (as) {
        return as.length <= 1 ? copy(as) : as.slice().sort(O.compare);
    };
};
const zipWith = function (fa, fb, f) {
    const fc = [];
    const len = Math.min(fa.length, fb.length);
    for (let i = 0; i < len; i++) {
        fc[i] = f(fa[i], fb[i]);
    }
    return fc;
};
function zip(as, bs) {
    if (bs === void 0) {
        return function (bs2) {
            return zip(bs2, as);
        };
    }
    return zipWith(as, bs, (a, b) => [a, b]);
}
const unzip = function (as) {
    const fa = [];
    const fb = [];
    for (let i = 0; i < as.length; i++) {
        fa[i] = as[i][0];
        fb[i] = as[i][1];
    }
    return [fa, fb];
};
const prependAll = function (middle) {
    const f = prependAll$1(middle);
    return function (as) {
        return isNonEmpty$1(as) ? f(as) : [];
    };
};
const intersperse = function (middle) {
    const f = intersperse$1(middle);
    return function (as) {
        return isNonEmpty$1(as) ? f(as) : copy(as);
    };
};
const rotate = function (n) {
    const f = rotate$1(n);
    return function (as) {
        return isNonEmpty$1(as) ? f(as) : copy(as);
    };
};
const elem$4 = elem$5;
const uniq = function (E) {
    const f = uniq$1(E);
    return function (as) {
        return isNonEmpty$1(as) ? f(as) : copy(as);
    };
};
const sortBy = function (ords) {
    const f = sortBy$1(ords);
    return function (as) {
        return isNonEmpty$1(as) ? f(as) : copy(as);
    };
};
const chop = function (f) {
    const g = chop$1(f);
    return function (as) {
        return isNonEmpty$1(as) ? g(as) : [];
    };
};
var splitAt = function (n) {
    return function (as) {
        return n >= 1 && isNonEmpty$1(as) ? splitAt$1(n)(as) : isEmpty$2(as) ? [copy(as), []] : [[], copy(as)];
    };
};
const chunksOf = function (n) {
    const f = chunksOf$1(n);
    return function (as) {
        return isNonEmpty$1(as) ? f(as) : [];
    };
};
const fromOptionK$1 = function (f) {
    return function () {
        const a = [];
        for (let _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromOption$1(f.apply(void 0, a));
    };
};
function comprehension(input, f, g) {
    if (g === void 0) {
        g = function () {
            return true;
        };
    }
    const go = function (scope, input2) {
        return isNonEmpty$1(input2) ? pipe$1(head$2(input2), chain$2((x) => go(pipe$1(scope, append(x)), tail$1(input2)))) : g.apply(void 0, scope) ? [f.apply(void 0, scope)] : [];
    };
    return go([], input);
}
const concatW = function (second) {
    return function (first2) {
        return isEmpty$2(first2) ? copy(second) : isEmpty$2(second) ? copy(first2) : first2.concat(second);
    };
};
const concat = concatW;
function union$3(E) {
    const unionE = union$4(E);
    return function (first2, second) {
        if (second === void 0) {
            const unionE_1 = union$3(E);
            return function (second2) {
                return unionE_1(second2, first2);
            };
        }
        return isNonEmpty$1(first2) && isNonEmpty$1(second) ? unionE(second)(first2) : isNonEmpty$1(first2) ? copy(first2) : copy(second);
    };
}
function intersection$3(E) {
    const elemE = elem$4(E);
    return function (xs, ys) {
        if (ys === void 0) {
            const intersectionE_1 = intersection$3(E);
            return function (ys2) {
                return intersectionE_1(ys2, xs);
            };
        }
        return xs.filter((a) => elemE(a, ys));
    };
}
function difference$2(E) {
    const elemE = elem$4(E);
    return function (xs, ys) {
        if (ys === void 0) {
            const differenceE_1 = difference$2(E);
            return function (ys2) {
                return differenceE_1(ys2, xs);
            };
        }
        return xs.filter((a) => !elemE(a, ys));
    };
}
const _map$4 = function (fa, f) {
    return pipe$1(fa, map$4(f));
};
const _mapWithIndex$2 = function (fa, f) {
    return pipe$1(fa, mapWithIndex$2(f));
};
const _ap$2 = function (fab, fa) {
    return pipe$1(fab, ap$2(fa));
};
const _chain$2 = function (ma, f) {
    return pipe$1(ma, chain$2(f));
};
const _filter$3 = function (fa, predicate) {
    return pipe$1(fa, filter$3(predicate));
};
const _filterMap$3 = function (fa, f) {
    return pipe$1(fa, filterMap$3(f));
};
const _partition$3 = function (fa, predicate) {
    return pipe$1(fa, partition$3(predicate));
};
const _partitionMap$3 = function (fa, f) {
    return pipe$1(fa, partitionMap$3(f));
};
const _partitionWithIndex$2 = function (fa, predicateWithIndex) {
    return pipe$1(fa, partitionWithIndex$2(predicateWithIndex));
};
const _partitionMapWithIndex$2 = function (fa, f) {
    return pipe$1(fa, partitionMapWithIndex$2(f));
};
const _alt$2 = function (fa, that) {
    return pipe$1(fa, alt$2(that));
};
const _reduce$4 = function (fa, b, f) {
    return pipe$1(fa, reduce$4(b, f));
};
const _foldMap$4 = function (M) {
    const foldMapM = foldMap$4(M);
    return function (fa, f) {
        return pipe$1(fa, foldMapM(f));
    };
};
const _reduceRight$4 = function (fa, b, f) {
    return pipe$1(fa, reduceRight$4(b, f));
};
const _reduceWithIndex$2 = function (fa, b, f) {
    return pipe$1(fa, reduceWithIndex$2(b, f));
};
const _foldMapWithIndex$2 = function (M) {
    const foldMapWithIndexM = foldMapWithIndex$2(M);
    return function (fa, f) {
        return pipe$1(fa, foldMapWithIndexM(f));
    };
};
const _reduceRightWithIndex$2 = function (fa, b, f) {
    return pipe$1(fa, reduceRightWithIndex$2(b, f));
};
const _filterMapWithIndex$2 = function (fa, f) {
    return pipe$1(fa, filterMapWithIndex$2(f));
};
const _filterWithIndex$2 = function (fa, predicateWithIndex) {
    return pipe$1(fa, filterWithIndex$2(predicateWithIndex));
};
const _extend$2 = function (fa, f) {
    return pipe$1(fa, extend$3(f));
};
const _traverse$4 = function (F) {
    const traverseF = traverse$4(F);
    return function (ta, f) {
        return pipe$1(ta, traverseF(f));
    };
};
const _traverseWithIndex$2 = function (F) {
    const traverseWithIndexF = traverseWithIndex$2(F);
    return function (ta, f) {
        return pipe$1(ta, traverseWithIndexF(f));
    };
};
const _chainRecDepthFirst = _chainRecDepthFirst$1;
const _chainRecBreadthFirst = _chainRecBreadthFirst$1;
const of$2 = of$3;
const zero$1 = function () {
    return [];
};
var map$4 = function (f) {
    return function (fa) {
        return fa.map((a) => f(a));
    };
};
var ap$2 = function (fa) {
    return chain$2((f) => pipe$1(fa, map$4(f)));
};
var chain$2 = function (f) {
    return function (ma) {
        return pipe$1(ma, chainWithIndex((_2, a) => f(a)));
    };
};
const flatten$2 = /* @__PURE__ */ chain$2(identity$1);
var mapWithIndex$2 = function (f) {
    return function (fa) {
        return fa.map((a, i) => f(i, a));
    };
};
var filterMapWithIndex$2 = function (f) {
    return function (fa) {
        const out = [];
        for (let i = 0; i < fa.length; i++) {
            const optionB = f(i, fa[i]);
            if (isSome$1(optionB)) {
                out.push(optionB.value);
            }
        }
        return out;
    };
};
var filterMap$3 = function (f) {
    return filterMapWithIndex$2((_2, a) => f(a));
};
const compact$3 = /* @__PURE__ */ filterMap$3(identity$1);
const separate$3 = function (fa) {
    const left2 = [];
    const right2 = [];
    for (let _i = 0, fa_1 = fa; _i < fa_1.length; _i++) {
        const e = fa_1[_i];
        if (e._tag === 'Left') {
            left2.push(e.left);
        } else {
            right2.push(e.right);
        }
    }
    return separated(left2, right2);
};
var filter$3 = function (predicate) {
    return function (as) {
        return as.filter(predicate);
    };
};
var partition$3 = function (predicate) {
    return partitionWithIndex$2((_2, a) => predicate(a));
};
var partitionWithIndex$2 = function (predicateWithIndex) {
    return function (as) {
        const left2 = [];
        const right2 = [];
        for (let i = 0; i < as.length; i++) {
            const b = as[i];
            if (predicateWithIndex(i, b)) {
                right2.push(b);
            } else {
                left2.push(b);
            }
        }
        return separated(left2, right2);
    };
};
var partitionMap$3 = function (f) {
    return partitionMapWithIndex$2((_2, a) => f(a));
};
var partitionMapWithIndex$2 = function (f) {
    return function (fa) {
        const left2 = [];
        const right2 = [];
        for (let i = 0; i < fa.length; i++) {
            const e = f(i, fa[i]);
            if (e._tag === 'Left') {
                left2.push(e.left);
            } else {
                right2.push(e.right);
            }
        }
        return separated(left2, right2);
    };
};
const altW$2 = function (that) {
    return function (fa) {
        return fa.concat(that());
    };
};
var alt$2 = altW$2;
var filterWithIndex$2 = function (predicateWithIndex) {
    return function (as) {
        return as.filter((b, i) => predicateWithIndex(i, b));
    };
};
var extend$3 = function (f) {
    return function (wa) {
        return wa.map((_2, i) => f(wa.slice(i)));
    };
};
const duplicate$2 = /* @__PURE__ */ extend$3(identity$1);
var foldMap$4 = foldMap$5;
var foldMapWithIndex$2 = foldMapWithIndex$3;
var reduce$4 = reduce$5;
var reduceWithIndex$2 = reduceWithIndex$3;
var reduceRight$4 = reduceRight$5;
var reduceRightWithIndex$2 = reduceRightWithIndex$3;
var traverse$4 = function (F) {
    const traverseWithIndexF = traverseWithIndex$2(F);
    return function (f) {
        return traverseWithIndexF((_2, a) => f(a));
    };
};
const sequence$4 = function (F) {
    return function (ta) {
        return _reduce$4(ta, F.of(zero$1()), (fas, fa) => F.ap(F.map(fas, (as) => function (a) {
            return pipe$1(as, append(a));
        }), fa));
    };
};
var traverseWithIndex$2 = function (F) {
    return function (f) {
        return reduceWithIndex$2(F.of(zero$1()), (i, fbs, a) => F.ap(F.map(fbs, (bs) => function (b) {
            return pipe$1(bs, append(b));
        }), f(i, a)));
    };
};
const wither$2 = function (F) {
    const _witherF = _wither$2(F);
    return function (f) {
        return function (fa) {
            return _witherF(fa, f);
        };
    };
};
const wilt$2 = function (F) {
    const _wiltF = _wilt$2(F);
    return function (f) {
        return function (fa) {
            return _wiltF(fa, f);
        };
    };
};
const unfold = function (b, f) {
    const out = [];
    let bb = b;
    while (true) {
        const mt = f(bb);
        if (isSome$1(mt)) {
            const _a = mt.value; const a = _a[0]; const
                b_1 = _a[1];
            out.push(a);
            bb = b_1;
        } else {
            break;
        }
    }
    return out;
};
const URI$3 = 'Array';
const getShow$4 = getShow$5;
const getSemigroup$1 = function () {
    return {
        concat(first2, second) {
            return first2.concat(second);
        },
    };
};
const getMonoid$3 = function () {
    return {
        concat: getSemigroup$1().concat,
        empty: [],
    };
};
const getEq$4 = getEq$5;
const getOrd$1 = getOrd$2;
const getUnionSemigroup$1 = function (E) {
    const unionE = union$3(E);
    return {
        concat(first2, second) {
            return unionE(second)(first2);
        },
    };
};
const getUnionMonoid$1 = function (E) {
    return {
        concat: getUnionSemigroup$1(E).concat,
        empty: [],
    };
};
const getIntersectionSemigroup$1 = function (E) {
    const intersectionE = intersection$3(E);
    return {
        concat(first2, second) {
            return intersectionE(second)(first2);
        },
    };
};
const getDifferenceMagma$1 = function (E) {
    const differenceE = difference$2(E);
    return {
        concat(first2, second) {
            return differenceE(second)(first2);
        },
    };
};
const Functor$3 = {
    URI: URI$3,
    map: _map$4,
};
const flap$3 = /* @__PURE__ */ flap$5(Functor$3);
const Pointed$2 = {
    URI: URI$3,
    of: of$2,
};
const FunctorWithIndex$1 = {
    URI: URI$3,
    map: _map$4,
    mapWithIndex: _mapWithIndex$2,
};
const Apply$2 = {
    URI: URI$3,
    map: _map$4,
    ap: _ap$2,
};
const apFirst$2 = /* @__PURE__ */ apFirst$4(Apply$2);
const apSecond$2 = /* @__PURE__ */ apSecond$4(Apply$2);
const Applicative$2 = {
    URI: URI$3,
    map: _map$4,
    ap: _ap$2,
    of: of$2,
};
const Chain$2 = {
    URI: URI$3,
    map: _map$4,
    ap: _ap$2,
    chain: _chain$2,
};
const chainFirst$2 = /* @__PURE__ */ chainFirst$4(Chain$2);
const Monad$2 = {
    URI: URI$3,
    map: _map$4,
    ap: _ap$2,
    of: of$2,
    chain: _chain$2,
};
const Unfoldable = {
    URI: URI$3,
    unfold,
};
const Alt$2 = {
    URI: URI$3,
    map: _map$4,
    alt: _alt$2,
};
const Zero$1 = {
    URI: URI$3,
    zero: zero$1,
};
const guard$1 = /* @__PURE__ */ guard$2(Zero$1, Pointed$2);
const Alternative$1 = {
    URI: URI$3,
    map: _map$4,
    ap: _ap$2,
    of: of$2,
    alt: _alt$2,
    zero: zero$1,
};
const Extend$2 = {
    URI: URI$3,
    map: _map$4,
    extend: _extend$2,
};
const Compactable$2 = {
    URI: URI$3,
    compact: compact$3,
    separate: separate$3,
};
const Filterable$2 = {
    URI: URI$3,
    map: _map$4,
    compact: compact$3,
    separate: separate$3,
    filter: _filter$3,
    filterMap: _filterMap$3,
    partition: _partition$3,
    partitionMap: _partitionMap$3,
};
const FilterableWithIndex$1 = {
    URI: URI$3,
    map: _map$4,
    mapWithIndex: _mapWithIndex$2,
    compact: compact$3,
    separate: separate$3,
    filter: _filter$3,
    filterMap: _filterMap$3,
    partition: _partition$3,
    partitionMap: _partitionMap$3,
    partitionMapWithIndex: _partitionMapWithIndex$2,
    partitionWithIndex: _partitionWithIndex$2,
    filterMapWithIndex: _filterMapWithIndex$2,
    filterWithIndex: _filterWithIndex$2,
};
const Foldable$3 = {
    URI: URI$3,
    reduce: _reduce$4,
    foldMap: _foldMap$4,
    reduceRight: _reduceRight$4,
};
const FoldableWithIndex$1 = {
    URI: URI$3,
    reduce: _reduce$4,
    foldMap: _foldMap$4,
    reduceRight: _reduceRight$4,
    reduceWithIndex: _reduceWithIndex$2,
    foldMapWithIndex: _foldMapWithIndex$2,
    reduceRightWithIndex: _reduceRightWithIndex$2,
};
const Traversable$3 = {
    URI: URI$3,
    map: _map$4,
    reduce: _reduce$4,
    foldMap: _foldMap$4,
    reduceRight: _reduceRight$4,
    traverse: _traverse$4,
    sequence: sequence$4,
};
const TraversableWithIndex$1 = {
    URI: URI$3,
    map: _map$4,
    mapWithIndex: _mapWithIndex$2,
    reduce: _reduce$4,
    foldMap: _foldMap$4,
    reduceRight: _reduceRight$4,
    reduceWithIndex: _reduceWithIndex$2,
    foldMapWithIndex: _foldMapWithIndex$2,
    reduceRightWithIndex: _reduceRightWithIndex$2,
    traverse: _traverse$4,
    sequence: sequence$4,
    traverseWithIndex: _traverseWithIndex$2,
};
var _wither$2 = /* @__PURE__ */ witherDefault(Traversable$3, Compactable$2);
var _wilt$2 = /* @__PURE__ */ wiltDefault(Traversable$3, Compactable$2);
const Witherable$2 = {
    URI: URI$3,
    map: _map$4,
    compact: compact$3,
    separate: separate$3,
    filter: _filter$3,
    filterMap: _filterMap$3,
    partition: _partition$3,
    partitionMap: _partitionMap$3,
    reduce: _reduce$4,
    foldMap: _foldMap$4,
    reduceRight: _reduceRight$4,
    traverse: _traverse$4,
    sequence: sequence$4,
    wither: _wither$2,
    wilt: _wilt$2,
};
const chainRecDepthFirst = chainRecDepthFirst$1;
const ChainRecDepthFirst = {
    URI: URI$3,
    map: _map$4,
    ap: _ap$2,
    chain: _chain$2,
    chainRec: _chainRecDepthFirst,
};
const chainRecBreadthFirst = chainRecBreadthFirst$1;
const ChainRecBreadthFirst = {
    URI: URI$3,
    map: _map$4,
    ap: _ap$2,
    chain: _chain$2,
    chainRec: _chainRecBreadthFirst,
};
const filterE = /* @__PURE__ */ filterE$1(Witherable$2);
const FromEither$2 = {
    URI: URI$3,
    fromEither: fromEither$1,
};
const fromEitherK$1 = /* @__PURE__ */ fromEitherK$2(FromEither$2);
var unsafeInsertAt = unsafeInsertAt$1;
var unsafeUpdateAt = function (i, a, as) {
    return isNonEmpty$1(as) ? unsafeUpdateAt$1(i, a, as) : [];
};
var unsafeDeleteAt = function (i, as) {
    const xs = as.slice();
    xs.splice(i, 1);
    return xs;
};
const every$2 = every$3;
const some$3 = function (predicate) {
    return function (as) {
        return as.some(predicate);
    };
};
const exists$2 = some$3;
const intercalate = intercalate$1;
const Do$2 = /* @__PURE__ */ of$2(emptyRecord);
const bindTo$2 = /* @__PURE__ */ bindTo$4(Functor$3);
const bind$5 = /* @__PURE__ */ bind$7(Chain$2);
const apS$2 = /* @__PURE__ */ apS$4(Apply$2);
const range = range$1;
const empty$2 = [];
const cons = cons$1;
const snoc = snoc$1;
const prependToAll = prependAll;
const array$1 = {
    URI: URI$3,
    compact: compact$3,
    separate: separate$3,
    map: _map$4,
    ap: _ap$2,
    of: of$2,
    chain: _chain$2,
    filter: _filter$3,
    filterMap: _filterMap$3,
    partition: _partition$3,
    partitionMap: _partitionMap$3,
    mapWithIndex: _mapWithIndex$2,
    partitionMapWithIndex: _partitionMapWithIndex$2,
    partitionWithIndex: _partitionWithIndex$2,
    filterMapWithIndex: _filterMapWithIndex$2,
    filterWithIndex: _filterWithIndex$2,
    alt: _alt$2,
    zero: zero$1,
    unfold,
    reduce: _reduce$4,
    foldMap: _foldMap$4,
    reduceRight: _reduceRight$4,
    traverse: _traverse$4,
    sequence: sequence$4,
    reduceWithIndex: _reduceWithIndex$2,
    foldMapWithIndex: _foldMapWithIndex$2,
    reduceRightWithIndex: _reduceRightWithIndex$2,
    traverseWithIndex: _traverseWithIndex$2,
    extend: _extend$2,
    wither: _wither$2,
    wilt: _wilt$2,
};
const _Array = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    isEmpty: isEmpty$2,
    isNonEmpty: isNonEmpty$1,
    prepend,
    prependW,
    append,
    appendW,
    makeBy,
    replicate,
    fromPredicate: fromPredicate$2,
    fromOption: fromOption$1,
    fromEither: fromEither$1,
    matchW: matchW$2,
    match: match$2,
    matchLeftW,
    matchLeft,
    foldLeft,
    matchRightW,
    matchRight,
    foldRight,
    chainWithIndex,
    scanLeft,
    scanRight,
    size: size$2,
    isOutOfBound,
    lookup: lookup$2,
    head,
    last,
    tail,
    init,
    takeLeft,
    takeRight,
    takeLeftWhile,
    spanLeft,
    dropLeft,
    dropRight,
    dropLeftWhile,
    findIndex,
    findFirst,
    findFirstMap,
    findLast,
    findLastMap,
    findLastIndex,
    copy,
    insertAt: insertAt$1,
    updateAt: updateAt$1,
    deleteAt: deleteAt$1,
    modifyAt: modifyAt$1,
    reverse,
    rights,
    lefts,
    sort,
    zipWith,
    zip,
    unzip,
    prependAll,
    intersperse,
    rotate,
    elem: elem$4,
    uniq,
    sortBy,
    chop,
    splitAt,
    chunksOf,
    fromOptionK: fromOptionK$1,
    comprehension,
    concatW,
    concat,
    union: union$3,
    intersection: intersection$3,
    difference: difference$2,
    of: of$2,
    zero: zero$1,
    map: map$4,
    ap: ap$2,
    chain: chain$2,
    flatten: flatten$2,
    mapWithIndex: mapWithIndex$2,
    filterMapWithIndex: filterMapWithIndex$2,
    filterMap: filterMap$3,
    compact: compact$3,
    separate: separate$3,
    filter: filter$3,
    partition: partition$3,
    partitionWithIndex: partitionWithIndex$2,
    partitionMap: partitionMap$3,
    partitionMapWithIndex: partitionMapWithIndex$2,
    altW: altW$2,
    alt: alt$2,
    filterWithIndex: filterWithIndex$2,
    extend: extend$3,
    duplicate: duplicate$2,
    foldMap: foldMap$4,
    foldMapWithIndex: foldMapWithIndex$2,
    reduce: reduce$4,
    reduceWithIndex: reduceWithIndex$2,
    reduceRight: reduceRight$4,
    reduceRightWithIndex: reduceRightWithIndex$2,
    traverse: traverse$4,
    sequence: sequence$4,
    traverseWithIndex: traverseWithIndex$2,
    wither: wither$2,
    wilt: wilt$2,
    unfold,
    URI: URI$3,
    getShow: getShow$4,
    getSemigroup: getSemigroup$1,
    getMonoid: getMonoid$3,
    getEq: getEq$4,
    getOrd: getOrd$1,
    getUnionSemigroup: getUnionSemigroup$1,
    getUnionMonoid: getUnionMonoid$1,
    getIntersectionSemigroup: getIntersectionSemigroup$1,
    getDifferenceMagma: getDifferenceMagma$1,
    Functor: Functor$3,
    flap: flap$3,
    Pointed: Pointed$2,
    FunctorWithIndex: FunctorWithIndex$1,
    Apply: Apply$2,
    apFirst: apFirst$2,
    apSecond: apSecond$2,
    Applicative: Applicative$2,
    Chain: Chain$2,
    chainFirst: chainFirst$2,
    Monad: Monad$2,
    Unfoldable,
    Alt: Alt$2,
    Zero: Zero$1,
    guard: guard$1,
    Alternative: Alternative$1,
    Extend: Extend$2,
    Compactable: Compactable$2,
    Filterable: Filterable$2,
    FilterableWithIndex: FilterableWithIndex$1,
    Foldable: Foldable$3,
    FoldableWithIndex: FoldableWithIndex$1,
    Traversable: Traversable$3,
    TraversableWithIndex: TraversableWithIndex$1,
    Witherable: Witherable$2,
    chainRecDepthFirst,
    ChainRecDepthFirst,
    chainRecBreadthFirst,
    ChainRecBreadthFirst,
    filterE,
    FromEither: FromEither$2,
    fromEitherK: fromEitherK$1,
    unsafeInsertAt,
    unsafeUpdateAt,
    unsafeDeleteAt,
    every: every$2,
    some: some$3,
    exists: exists$2,
    intercalate,
    Do: Do$2,
    bindTo: bindTo$2,
    bind: bind$5,
    apS: apS$2,
    range,
    empty: empty$2,
    cons,
    snoc,
    prependToAll,
    array: array$1,
}, Symbol.toStringTag, { value: 'Module' }));
const require$$0$1 = /* @__PURE__ */ getAugmentedNamespace(_Array);
function getApplicativeMonoid(F) {
    const f = getApplySemigroup$2(F);
    return function (M) {
        return {
            concat: f(M).concat,
            empty: F.of(M.empty),
        };
    };
}
const tailRec = function (startWith, f) {
    let ab = f(startWith);
    while (ab._tag === 'Left') {
        ab = f(ab.left);
    }
    return ab.right;
};
const left = left$1;
const right = right$1;
const _map$3 = function (fa, f) {
    return pipe$1(fa, map$3(f));
};
const _ap$1 = function (fab, fa) {
    return pipe$1(fab, ap$1(fa));
};
const _chain$1 = function (ma, f) {
    return pipe$1(ma, chain$1(f));
};
const _reduce$3 = function (fa, b, f) {
    return pipe$1(fa, reduce$3(b, f));
};
const _foldMap$3 = function (M) {
    return function (fa, f) {
        const foldMapM = foldMap$3(M);
        return pipe$1(fa, foldMapM(f));
    };
};
const _reduceRight$3 = function (fa, b, f) {
    return pipe$1(fa, reduceRight$3(b, f));
};
const _traverse$3 = function (F) {
    const traverseF = traverse$3(F);
    return function (ta, f) {
        return pipe$1(ta, traverseF(f));
    };
};
const _bimap = function (fa, f, g) {
    return pipe$1(fa, bimap(f, g));
};
const _mapLeft = function (fa, f) {
    return pipe$1(fa, mapLeft(f));
};
const _alt$1 = function (fa, that) {
    return pipe$1(fa, alt$1(that));
};
const _extend$1 = function (wa, f) {
    return pipe$1(wa, extend$2(f));
};
const _chainRec = function (a, f) {
    return tailRec(f(a), (e) => (isLeft(e) ? right(left(e.left)) : isLeft(e.right) ? left(f(e.right.left)) : right(right(e.right.right))));
};
const URI$2 = 'Either';
const getShow$3 = function (SE, SA) {
    return {
        show(ma) {
            return isLeft(ma) ? `left(${SE.show(ma.left)})` : `right(${SA.show(ma.right)})`;
        },
    };
};
const getEq$3 = function (EL, EA) {
    return {
        equals(x, y) {
            return x === y || (isLeft(x) ? isLeft(y) && EL.equals(x.left, y.left) : isRight(y) && EA.equals(x.right, y.right));
        },
    };
};
const getSemigroup = function (S) {
    return {
        concat(x, y) {
            return isLeft(y) ? x : isLeft(x) ? y : right(S.concat(x.right, y.right));
        },
    };
};
const getCompactable = function (M) {
    const empty2 = left(M.empty);
    return {
        URI: URI$2,
        _E: void 0,
        compact(ma) {
            return isLeft(ma) ? ma : ma.right._tag === 'None' ? empty2 : right(ma.right.value);
        },
        separate(ma) {
            return isLeft(ma) ? separated(ma, ma) : isLeft(ma.right) ? separated(right(ma.right.left), empty2) : separated(empty2, right(ma.right.right));
        },
    };
};
const getFilterable = function (M) {
    const empty2 = left(M.empty);
    const _a = getCompactable(M); const compact2 = _a.compact; const
        separate2 = _a.separate;
    const filter2 = function (ma, predicate) {
        return isLeft(ma) ? ma : predicate(ma.right) ? ma : empty2;
    };
    const partition2 = function (ma, p) {
        return isLeft(ma) ? separated(ma, ma) : p(ma.right) ? separated(empty2, right(ma.right)) : separated(right(ma.right), empty2);
    };
    return {
        URI: URI$2,
        _E: void 0,
        map: _map$3,
        compact: compact2,
        separate: separate2,
        filter: filter2,
        filterMap(ma, f) {
            if (isLeft(ma)) {
                return ma;
            }
            const ob = f(ma.right);
            return ob._tag === 'None' ? empty2 : right(ob.value);
        },
        partition: partition2,
        partitionMap(ma, f) {
            if (isLeft(ma)) {
                return separated(ma, ma);
            }
            const e = f(ma.right);
            return isLeft(e) ? separated(right(e.left), empty2) : separated(empty2, right(e.right));
        },
    };
};
const getWitherable$1 = function (M) {
    const F_ = getFilterable(M);
    const C = getCompactable(M);
    return {
        URI: URI$2,
        _E: void 0,
        map: _map$3,
        compact: F_.compact,
        separate: F_.separate,
        filter: F_.filter,
        filterMap: F_.filterMap,
        partition: F_.partition,
        partitionMap: F_.partitionMap,
        traverse: _traverse$3,
        sequence: sequence$3,
        reduce: _reduce$3,
        foldMap: _foldMap$3,
        reduceRight: _reduceRight$3,
        wither: witherDefault(Traversable$2, C),
        wilt: wiltDefault(Traversable$2, C),
    };
};
const getApplicativeValidation = function (SE) {
    return {
        URI: URI$2,
        _E: void 0,
        map: _map$3,
        ap(fab, fa) {
            return isLeft(fab) ? isLeft(fa) ? left(SE.concat(fab.left, fa.left)) : fab : isLeft(fa) ? fa : right(fab.right(fa.right));
        },
        of: of$1,
    };
};
const getAltValidation = function (SE) {
    return {
        URI: URI$2,
        _E: void 0,
        map: _map$3,
        alt(me, that) {
            if (isRight(me)) {
                return me;
            }
            const ea = that();
            return isLeft(ea) ? left(SE.concat(me.left, ea.left)) : ea;
        },
    };
};
var map$3 = function (f) {
    return function (fa) {
        return isLeft(fa) ? fa : right(f(fa.right));
    };
};
const Functor$2 = {
    URI: URI$2,
    map: _map$3,
};
var of$1 = right;
const Pointed$1 = {
    URI: URI$2,
    of: of$1,
};
const apW = function (fa) {
    return function (fab) {
        return isLeft(fab) ? fab : isLeft(fa) ? fa : right(fab.right(fa.right));
    };
};
var ap$1 = apW;
const Apply$1 = {
    URI: URI$2,
    map: _map$3,
    ap: _ap$1,
};
const Applicative$1 = {
    URI: URI$2,
    map: _map$3,
    ap: _ap$1,
    of: of$1,
};
const chainW = function (f) {
    return function (ma) {
        return isLeft(ma) ? ma : f(ma.right);
    };
};
var chain$1 = chainW;
const Chain$1 = {
    URI: URI$2,
    map: _map$3,
    ap: _ap$1,
    chain: _chain$1,
};
const Monad$1 = {
    URI: URI$2,
    map: _map$3,
    ap: _ap$1,
    of: of$1,
    chain: _chain$1,
};
var reduce$3 = function (b, f) {
    return function (fa) {
        return isLeft(fa) ? b : f(b, fa.right);
    };
};
var foldMap$3 = function (M) {
    return function (f) {
        return function (fa) {
            return isLeft(fa) ? M.empty : f(fa.right);
        };
    };
};
var reduceRight$3 = function (b, f) {
    return function (fa) {
        return isLeft(fa) ? b : f(fa.right, b);
    };
};
const Foldable$2 = {
    URI: URI$2,
    reduce: _reduce$3,
    foldMap: _foldMap$3,
    reduceRight: _reduceRight$3,
};
var traverse$3 = function (F) {
    return function (f) {
        return function (ta) {
            return isLeft(ta) ? F.of(left(ta.left)) : F.map(f(ta.right), right);
        };
    };
};
var sequence$3 = function (F) {
    return function (ma) {
        return isLeft(ma) ? F.of(left(ma.left)) : F.map(ma.right, right);
    };
};
var Traversable$2 = {
    URI: URI$2,
    map: _map$3,
    reduce: _reduce$3,
    foldMap: _foldMap$3,
    reduceRight: _reduceRight$3,
    traverse: _traverse$3,
    sequence: sequence$3,
};
var bimap = function (f, g) {
    return function (fa) {
        return isLeft(fa) ? left(f(fa.left)) : right(g(fa.right));
    };
};
var mapLeft = function (f) {
    return function (fa) {
        return isLeft(fa) ? left(f(fa.left)) : fa;
    };
};
const Bifunctor = {
    URI: URI$2,
    bimap: _bimap,
    mapLeft: _mapLeft,
};
const altW$1 = function (that) {
    return function (fa) {
        return isLeft(fa) ? that() : fa;
    };
};
var alt$1 = altW$1;
const Alt$1 = {
    URI: URI$2,
    map: _map$3,
    alt: _alt$1,
};
var extend$2 = function (f) {
    return function (wa) {
        return isLeft(wa) ? wa : right(f(wa));
    };
};
const Extend$1 = {
    URI: URI$2,
    map: _map$3,
    extend: _extend$1,
};
const ChainRec = {
    URI: URI$2,
    map: _map$3,
    ap: _ap$1,
    chain: _chain$1,
    chainRec: _chainRec,
};
const throwError$1 = left;
const MonadThrow$1 = {
    URI: URI$2,
    map: _map$3,
    ap: _ap$1,
    of: of$1,
    chain: _chain$1,
    throwError: throwError$1,
};
const FromEither$1 = {
    URI: URI$2,
    fromEither: identity$1,
};
const fromPredicate$1 = /* @__PURE__ */ fromPredicate$3(FromEither$1);
const fromOption = /* @__PURE__ */ fromOption$2(FromEither$1);
var isLeft = isLeft$1;
var isRight = isRight$1;
const matchW$1 = function (onLeft, onRight) {
    return function (ma) {
        return isLeft(ma) ? onLeft(ma.left) : onRight(ma.right);
    };
};
const foldW$1 = matchW$1;
const match$1 = matchW$1;
const fold$1 = match$1;
const getOrElseW$1 = function (onLeft) {
    return function (ma) {
        return isLeft(ma) ? onLeft(ma.left) : ma.right;
    };
};
const getOrElse$1 = getOrElseW$1;
const flap$2 = /* @__PURE__ */ flap$5(Functor$2);
const apFirst$1 = /* @__PURE__ */ apFirst$4(Apply$1);
const apFirstW = apFirst$1;
const apSecond$1 = /* @__PURE__ */ apSecond$4(Apply$1);
const apSecondW = apSecond$1;
const chainFirst$1 = /* @__PURE__ */ chainFirst$4(Chain$1);
const chainFirstW = chainFirst$1;
const flattenW = /* @__PURE__ */ chainW(identity$1);
const flatten$1 = flattenW;
const duplicate$1 = /* @__PURE__ */ extend$2(identity$1);
const fromOptionK = /* @__PURE__ */ fromOptionK$2(FromEither$1);
const chainOptionK = /* @__PURE__ */ chainOptionK$1(FromEither$1, Chain$1);
const filterOrElse = /* @__PURE__ */ filterOrElse$1(FromEither$1, Chain$1);
const filterOrElseW = filterOrElse;
const swap = function (ma) {
    return isLeft(ma) ? right(ma.left) : left(ma.right);
};
const orElseW = function (onLeft) {
    return function (ma) {
        return isLeft(ma) ? onLeft(ma.left) : ma;
    };
};
const orElse = orElseW;
const fromNullable$1 = function (e) {
    return function (a) {
        return a == null ? left(e) : right(a);
    };
};
const tryCatch$1 = function (f, onThrow) {
    try {
        return right(f());
    } catch (e) {
        return left(onThrow(e));
    }
};
const tryCatchK$1 = function (f, onThrow) {
    return function () {
        const a = [];
        for (let _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return tryCatch$1(() => f.apply(void 0, a), onThrow);
    };
};
const fromNullableK$1 = function (e) {
    const from2 = fromNullable$1(e);
    return function (f) {
        return flow(f, from2);
    };
};
const chainNullableK$1 = function (e) {
    const from2 = fromNullableK$1(e);
    return function (f) {
        return chain$1(from2(f));
    };
};
const toUnion = /* @__PURE__ */ foldW$1(identity$1, identity$1);
function toError(e) {
    return e instanceof Error ? e : new Error(String(e));
}
function elem$3(E) {
    return function (a, ma) {
        if (ma === void 0) {
            const elemE_1 = elem$3(E);
            return function (ma2) {
                return elemE_1(a, ma2);
            };
        }
        return isLeft(ma) ? false : E.equals(a, ma.right);
    };
}
const exists$1 = function (predicate) {
    return function (ma) {
        return isLeft(ma) ? false : predicate(ma.right);
    };
};
const Do$1 = /* @__PURE__ */ of$1(emptyRecord);
const bindTo$1 = /* @__PURE__ */ bindTo$4(Functor$2);
const bind$4 = /* @__PURE__ */ bind$7(Chain$1);
const bindW = bind$4;
const apS$1 = /* @__PURE__ */ apS$4(Apply$1);
const apSW = apS$1;
const ApT$1 = /* @__PURE__ */ of$1(emptyReadonlyArray);
const traverseReadonlyNonEmptyArrayWithIndex$1 = function (f) {
    return function (as) {
        const e = f(0, head$4(as));
        if (isLeft(e)) {
            return e;
        }
        const out = [e.right];
        for (let i = 1; i < as.length; i++) {
            const e_1 = f(i, as[i]);
            if (isLeft(e_1)) {
                return e_1;
            }
            out.push(e_1.right);
        }
        return right(out);
    };
};
const traverseReadonlyArrayWithIndex$1 = function (f) {
    const g = traverseReadonlyNonEmptyArrayWithIndex$1(f);
    return function (as) {
        return isNonEmpty$5(as) ? g(as) : ApT$1;
    };
};
const traverseArrayWithIndex$1 = traverseReadonlyArrayWithIndex$1;
const traverseArray$1 = function (f) {
    return traverseReadonlyArrayWithIndex$1((_2, a) => f(a));
};
const sequenceArray$1 = /* @__PURE__ */ traverseArray$1(identity$1);
function parseJSON(s, onError) {
    return tryCatch$1(() => JSON.parse(s), onError);
}
const stringifyJSON = function (u, onError) {
    return tryCatch$1(() => {
        const s = JSON.stringify(u);
        if (typeof s !== 'string') {
            throw new Error('Converting unsupported structure to JSON');
        }
        return s;
    }, onError);
};
const either = {
    URI: URI$2,
    map: _map$3,
    of: of$1,
    ap: _ap$1,
    chain: _chain$1,
    reduce: _reduce$3,
    foldMap: _foldMap$3,
    reduceRight: _reduceRight$3,
    traverse: _traverse$3,
    sequence: sequence$3,
    bimap: _bimap,
    mapLeft: _mapLeft,
    alt: _alt$1,
    extend: _extend$1,
    chainRec: _chainRec,
    throwError: throwError$1,
};
const getApplySemigroup$1 = /* @__PURE__ */ getApplySemigroup$2(Apply$1);
const getApplyMonoid$1 = /* @__PURE__ */ getApplicativeMonoid(Applicative$1);
const getValidationSemigroup = function (SE, SA) {
    return getApplySemigroup$2(getApplicativeValidation(SE))(SA);
};
const getValidationMonoid = function (SE, MA) {
    return getApplicativeMonoid(getApplicativeValidation(SE))(MA);
};
function getValidation(SE) {
    const ap2 = getApplicativeValidation(SE).ap;
    const alt2 = getAltValidation(SE).alt;
    return {
        URI: URI$2,
        _E: void 0,
        map: _map$3,
        of: of$1,
        chain: _chain$1,
        bimap: _bimap,
        mapLeft: _mapLeft,
        reduce: _reduce$3,
        foldMap: _foldMap$3,
        reduceRight: _reduceRight$3,
        extend: _extend$1,
        traverse: _traverse$3,
        sequence: sequence$3,
        chainRec: _chainRec,
        throwError: throwError$1,
        ap: ap2,
        alt: alt2,
    };
}
const Either = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    left,
    right,
    URI: URI$2,
    getShow: getShow$3,
    getEq: getEq$3,
    getSemigroup,
    getCompactable,
    getFilterable,
    getWitherable: getWitherable$1,
    getApplicativeValidation,
    getAltValidation,
    map: map$3,
    Functor: Functor$2,
    of: of$1,
    Pointed: Pointed$1,
    apW,
    ap: ap$1,
    Apply: Apply$1,
    Applicative: Applicative$1,
    chainW,
    chain: chain$1,
    Chain: Chain$1,
    Monad: Monad$1,
    reduce: reduce$3,
    foldMap: foldMap$3,
    reduceRight: reduceRight$3,
    Foldable: Foldable$2,
    traverse: traverse$3,
    sequence: sequence$3,
    Traversable: Traversable$2,
    bimap,
    mapLeft,
    Bifunctor,
    altW: altW$1,
    alt: alt$1,
    Alt: Alt$1,
    extend: extend$2,
    Extend: Extend$1,
    ChainRec,
    throwError: throwError$1,
    MonadThrow: MonadThrow$1,
    FromEither: FromEither$1,
    fromPredicate: fromPredicate$1,
    fromOption,
    isLeft,
    isRight,
    matchW: matchW$1,
    foldW: foldW$1,
    match: match$1,
    fold: fold$1,
    getOrElseW: getOrElseW$1,
    getOrElse: getOrElse$1,
    flap: flap$2,
    apFirst: apFirst$1,
    apFirstW,
    apSecond: apSecond$1,
    apSecondW,
    chainFirst: chainFirst$1,
    chainFirstW,
    flattenW,
    flatten: flatten$1,
    duplicate: duplicate$1,
    fromOptionK,
    chainOptionK,
    filterOrElse,
    filterOrElseW,
    swap,
    orElseW,
    orElse,
    fromNullable: fromNullable$1,
    tryCatch: tryCatch$1,
    tryCatchK: tryCatchK$1,
    fromNullableK: fromNullableK$1,
    chainNullableK: chainNullableK$1,
    toUnion,
    toError,
    elem: elem$3,
    exists: exists$1,
    Do: Do$1,
    bindTo: bindTo$1,
    bind: bind$4,
    bindW,
    apS: apS$1,
    apSW,
    ApT: ApT$1,
    traverseReadonlyNonEmptyArrayWithIndex: traverseReadonlyNonEmptyArrayWithIndex$1,
    traverseReadonlyArrayWithIndex: traverseReadonlyArrayWithIndex$1,
    traverseArrayWithIndex: traverseArrayWithIndex$1,
    traverseArray: traverseArray$1,
    sequenceArray: sequenceArray$1,
    parseJSON,
    stringifyJSON,
    either,
    getApplySemigroup: getApplySemigroup$1,
    getApplyMonoid: getApplyMonoid$1,
    getValidationSemigroup,
    getValidationMonoid,
    getValidation,
}, Symbol.toStringTag, { value: 'Module' }));
const require$$1 = /* @__PURE__ */ getAugmentedNamespace(Either);
const require$$2 = /* @__PURE__ */ getAugmentedNamespace(NonEmptyArray);
const not = function (predicate) {
    return function (a) {
        return !predicate(a);
    };
};
const none = none$1;
const some$2 = some$4;
function fromPredicate(predicate) {
    return function (a) {
        return predicate(a) ? some$2(a) : none;
    };
}
const getLeft = function (ma) {
    return ma._tag === 'Right' ? none : some$2(ma.left);
};
const getRight = function (ma) {
    return ma._tag === 'Left' ? none : some$2(ma.right);
};
const _map$2 = function (fa, f) {
    return pipe$1(fa, map$2(f));
};
const _ap = function (fab, fa) {
    return pipe$1(fab, ap(fa));
};
const _chain = function (ma, f) {
    return pipe$1(ma, chain(f));
};
const _reduce$2 = function (fa, b, f) {
    return pipe$1(fa, reduce$2(b, f));
};
const _foldMap$2 = function (M) {
    const foldMapM = foldMap$2(M);
    return function (fa, f) {
        return pipe$1(fa, foldMapM(f));
    };
};
const _reduceRight$2 = function (fa, b, f) {
    return pipe$1(fa, reduceRight$2(b, f));
};
const _traverse$2 = function (F) {
    const traverseF = traverse$2(F);
    return function (ta, f) {
        return pipe$1(ta, traverseF(f));
    };
};
const _alt = function (fa, that) {
    return pipe$1(fa, alt(that));
};
const _filter$2 = function (fa, predicate) {
    return pipe$1(fa, filter$2(predicate));
};
const _filterMap$2 = function (fa, f) {
    return pipe$1(fa, filterMap$2(f));
};
const _extend = function (wa, f) {
    return pipe$1(wa, extend$1(f));
};
const _partition$2 = function (fa, predicate) {
    return pipe$1(fa, partition$2(predicate));
};
const _partitionMap$2 = function (fa, f) {
    return pipe$1(fa, partitionMap$2(f));
};
const URI$1 = 'Option';
const getShow$2 = function (S) {
    return {
        show(ma) {
            return isNone(ma) ? 'none' : `some(${S.show(ma.value)})`;
        },
    };
};
const getEq$2 = function (E) {
    return {
        equals(x, y) {
            return x === y || (isNone(x) ? isNone(y) : isNone(y) ? false : E.equals(x.value, y.value));
        },
    };
};
const getOrd = function (O) {
    return {
        equals: getEq$2(O).equals,
        compare(x, y) {
            return x === y ? 0 : isSome(x) ? isSome(y) ? O.compare(x.value, y.value) : 1 : -1;
        },
    };
};
const getMonoid$2 = function (S) {
    return {
        concat(x, y) {
            return isNone(x) ? y : isNone(y) ? x : some$2(S.concat(x.value, y.value));
        },
        empty: none,
    };
};
var map$2 = function (f) {
    return function (fa) {
        return isNone(fa) ? none : some$2(f(fa.value));
    };
};
const Functor$1 = {
    URI: URI$1,
    map: _map$2,
};
const of = some$2;
const Pointed = {
    URI: URI$1,
    of,
};
var ap = function (fa) {
    return function (fab) {
        return isNone(fab) ? none : isNone(fa) ? none : some$2(fab.value(fa.value));
    };
};
const Apply = {
    URI: URI$1,
    map: _map$2,
    ap: _ap,
};
const Applicative = {
    URI: URI$1,
    map: _map$2,
    ap: _ap,
    of,
};
var chain = function (f) {
    return function (ma) {
        return isNone(ma) ? none : f(ma.value);
    };
};
const Chain = {
    URI: URI$1,
    map: _map$2,
    ap: _ap,
    chain: _chain,
};
const Monad = {
    URI: URI$1,
    map: _map$2,
    ap: _ap,
    of,
    chain: _chain,
};
var reduce$2 = function (b, f) {
    return function (fa) {
        return isNone(fa) ? b : f(b, fa.value);
    };
};
var foldMap$2 = function (M) {
    return function (f) {
        return function (fa) {
            return isNone(fa) ? M.empty : f(fa.value);
        };
    };
};
var reduceRight$2 = function (b, f) {
    return function (fa) {
        return isNone(fa) ? b : f(fa.value, b);
    };
};
const Foldable$1 = {
    URI: URI$1,
    reduce: _reduce$2,
    foldMap: _foldMap$2,
    reduceRight: _reduceRight$2,
};
const altW = function (that) {
    return function (fa) {
        return isNone(fa) ? that() : fa;
    };
};
var alt = altW;
const Alt = {
    URI: URI$1,
    map: _map$2,
    alt: _alt,
};
const zero = function () {
    return none;
};
const Zero = {
    URI: URI$1,
    zero,
};
const guard = /* @__PURE__ */ guard$2(Zero, Pointed);
const Alternative = {
    URI: URI$1,
    map: _map$2,
    ap: _ap,
    of,
    alt: _alt,
    zero,
};
var extend$1 = function (f) {
    return function (wa) {
        return isNone(wa) ? none : some$2(f(wa));
    };
};
const Extend = {
    URI: URI$1,
    map: _map$2,
    extend: _extend,
};
const compact$2 = /* @__PURE__ */ chain(identity$1);
const defaultSeparated = /* @__PURE__ */ separated(none, none);
const separate$2 = function (ma) {
    return isNone(ma) ? defaultSeparated : separated(getLeft(ma.value), getRight(ma.value));
};
const Compactable$1 = {
    URI: URI$1,
    compact: compact$2,
    separate: separate$2,
};
var filter$2 = function (predicate) {
    return function (fa) {
        return isNone(fa) ? none : predicate(fa.value) ? fa : none;
    };
};
var filterMap$2 = function (f) {
    return function (fa) {
        return isNone(fa) ? none : f(fa.value);
    };
};
var partition$2 = function (predicate) {
    return function (fa) {
        return separated(_filter$2(fa, not(predicate)), _filter$2(fa, predicate));
    };
};
var partitionMap$2 = function (f) {
    return flow(map$2(f), separate$2);
};
const Filterable$1 = {
    URI: URI$1,
    map: _map$2,
    compact: compact$2,
    separate: separate$2,
    filter: _filter$2,
    filterMap: _filterMap$2,
    partition: _partition$2,
    partitionMap: _partitionMap$2,
};
var traverse$2 = function (F) {
    return function (f) {
        return function (ta) {
            return isNone(ta) ? F.of(none) : F.map(f(ta.value), some$2);
        };
    };
};
const sequence$2 = function (F) {
    return function (ta) {
        return isNone(ta) ? F.of(none) : F.map(ta.value, some$2);
    };
};
const Traversable$1 = {
    URI: URI$1,
    map: _map$2,
    reduce: _reduce$2,
    foldMap: _foldMap$2,
    reduceRight: _reduceRight$2,
    traverse: _traverse$2,
    sequence: sequence$2,
};
const _wither$1 = /* @__PURE__ */ witherDefault(Traversable$1, Compactable$1);
const _wilt$1 = /* @__PURE__ */ wiltDefault(Traversable$1, Compactable$1);
const wither$1 = function (F) {
    const _witherF = _wither$1(F);
    return function (f) {
        return function (fa) {
            return _witherF(fa, f);
        };
    };
};
const wilt$1 = function (F) {
    const _wiltF = _wilt$1(F);
    return function (f) {
        return function (fa) {
            return _wiltF(fa, f);
        };
    };
};
const Witherable$1 = {
    URI: URI$1,
    map: _map$2,
    reduce: _reduce$2,
    foldMap: _foldMap$2,
    reduceRight: _reduceRight$2,
    traverse: _traverse$2,
    sequence: sequence$2,
    compact: compact$2,
    separate: separate$2,
    filter: _filter$2,
    filterMap: _filterMap$2,
    partition: _partition$2,
    partitionMap: _partitionMap$2,
    wither: _wither$1,
    wilt: _wilt$1,
};
const throwError = function () {
    return none;
};
const MonadThrow = {
    URI: URI$1,
    map: _map$2,
    ap: _ap,
    of,
    chain: _chain,
    throwError,
};
const fromEither = getRight;
const FromEither = {
    URI: URI$1,
    fromEither,
};
var isSome = isSome$1;
var isNone = function (fa) {
    return fa._tag === 'None';
};
const matchW = function (onNone, onSome) {
    return function (ma) {
        return isNone(ma) ? onNone() : onSome(ma.value);
    };
};
const foldW = matchW;
const match = matchW;
const fold = match;
const getOrElseW = function (onNone) {
    return function (ma) {
        return isNone(ma) ? onNone() : ma.value;
    };
};
const getOrElse = getOrElseW;
const flap$1 = /* @__PURE__ */ flap$5(Functor$1);
const apFirst = /* @__PURE__ */ apFirst$4(Apply);
const apSecond = /* @__PURE__ */ apSecond$4(Apply);
const flatten = compact$2;
const chainFirst = /* @__PURE__ */ chainFirst$4(Chain);
const duplicate = /* @__PURE__ */ extend$1(identity$1);
const fromEitherK = /* @__PURE__ */ fromEitherK$2(FromEither);
const chainEitherK = /* @__PURE__ */ chainEitherK$1(FromEither, Chain);
const chainFirstEitherK = /* @__PURE__ */ chainFirstEitherK$1(FromEither, Chain);
const fromNullable = function (a) {
    return a == null ? none : some$2(a);
};
const tryCatch = function (f) {
    try {
        return some$2(f());
    } catch (e) {
        return none;
    }
};
const tryCatchK = function (f) {
    return function () {
        const a = [];
        for (let _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return tryCatch(() => f.apply(void 0, a));
    };
};
const fromNullableK = function (f) {
    return flow(f, fromNullable);
};
const chainNullableK = function (f) {
    return function (ma) {
        return isNone(ma) ? none : fromNullable(f(ma.value));
    };
};
const toNullable = /* @__PURE__ */ match(constNull, identity$1);
const toUndefined = /* @__PURE__ */ match(constUndefined, identity$1);
function elem$2(E) {
    return function (a, ma) {
        if (ma === void 0) {
            const elemE_1 = elem$2(E);
            return function (ma2) {
                return elemE_1(a, ma2);
            };
        }
        return isNone(ma) ? false : E.equals(a, ma.value);
    };
}
const exists = function (predicate) {
    return function (ma) {
        return isNone(ma) ? false : predicate(ma.value);
    };
};
const Do = /* @__PURE__ */ of(emptyRecord);
const bindTo = /* @__PURE__ */ bindTo$4(Functor$1);
const bind$3 = /* @__PURE__ */ bind$7(Chain);
const apS = /* @__PURE__ */ apS$4(Apply);
const ApT = /* @__PURE__ */ of(emptyReadonlyArray);
const traverseReadonlyNonEmptyArrayWithIndex = function (f) {
    return function (as) {
        const o = f(0, head$4(as));
        if (isNone(o)) {
            return none;
        }
        const out = [o.value];
        for (let i = 1; i < as.length; i++) {
            const o_1 = f(i, as[i]);
            if (isNone(o_1)) {
                return none;
            }
            out.push(o_1.value);
        }
        return some$2(out);
    };
};
const traverseReadonlyArrayWithIndex = function (f) {
    const g = traverseReadonlyNonEmptyArrayWithIndex(f);
    return function (as) {
        return isNonEmpty$5(as) ? g(as) : ApT;
    };
};
const traverseArrayWithIndex = traverseReadonlyArrayWithIndex;
const traverseArray = function (f) {
    return traverseReadonlyArrayWithIndex((_2, a) => f(a));
};
const sequenceArray = /* @__PURE__ */ traverseArray(identity$1);
function getRefinement(getOption) {
    return function (a) {
        return isSome(getOption(a));
    };
}
const mapNullable = chainNullableK;
const option = {
    URI: URI$1,
    map: _map$2,
    of,
    ap: _ap,
    chain: _chain,
    reduce: _reduce$2,
    foldMap: _foldMap$2,
    reduceRight: _reduceRight$2,
    traverse: _traverse$2,
    sequence: sequence$2,
    zero,
    alt: _alt,
    extend: _extend,
    compact: compact$2,
    separate: separate$2,
    filter: _filter$2,
    filterMap: _filterMap$2,
    partition: _partition$2,
    partitionMap: _partitionMap$2,
    wither: _wither$1,
    wilt: _wilt$1,
    throwError,
};
const getApplySemigroup = /* @__PURE__ */ getApplySemigroup$2(Apply);
const getApplyMonoid = /* @__PURE__ */ getApplicativeMonoid(Applicative);
const getFirstMonoid = function () {
    return getMonoid$2(first());
};
const getLastMonoid = function () {
    return getMonoid$2(last$4());
};
const Option = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    none,
    some: some$2,
    fromPredicate,
    getLeft,
    getRight,
    URI: URI$1,
    getShow: getShow$2,
    getEq: getEq$2,
    getOrd,
    getMonoid: getMonoid$2,
    map: map$2,
    Functor: Functor$1,
    of,
    Pointed,
    ap,
    Apply,
    Applicative,
    chain,
    Chain,
    Monad,
    reduce: reduce$2,
    foldMap: foldMap$2,
    reduceRight: reduceRight$2,
    Foldable: Foldable$1,
    altW,
    alt,
    Alt,
    zero,
    Zero,
    guard,
    Alternative,
    extend: extend$1,
    Extend,
    compact: compact$2,
    separate: separate$2,
    Compactable: Compactable$1,
    filter: filter$2,
    filterMap: filterMap$2,
    partition: partition$2,
    partitionMap: partitionMap$2,
    Filterable: Filterable$1,
    traverse: traverse$2,
    sequence: sequence$2,
    Traversable: Traversable$1,
    wither: wither$1,
    wilt: wilt$1,
    Witherable: Witherable$1,
    throwError,
    MonadThrow,
    fromEither,
    FromEither,
    isSome,
    isNone,
    matchW,
    foldW,
    match,
    fold,
    getOrElseW,
    getOrElse,
    flap: flap$1,
    apFirst,
    apSecond,
    flatten,
    chainFirst,
    duplicate,
    fromEitherK,
    chainEitherK,
    chainFirstEitherK,
    fromNullable,
    tryCatch,
    tryCatchK,
    fromNullableK,
    chainNullableK,
    toNullable,
    toUndefined,
    elem: elem$2,
    exists,
    Do,
    bindTo,
    bind: bind$3,
    apS,
    ApT,
    traverseReadonlyNonEmptyArrayWithIndex,
    traverseReadonlyArrayWithIndex,
    traverseArrayWithIndex,
    traverseArray,
    sequenceArray,
    getRefinement,
    mapNullable,
    option,
    getApplySemigroup,
    getApplyMonoid,
    getFirstMonoid,
    getLastMonoid,
}, Symbol.toStringTag, { value: 'Module' }));
const require$$3 = /* @__PURE__ */ getAugmentedNamespace(Option);
const Eq = {
    equals(first2, second) {
        return first2 === second;
    },
};
const Ord = {
    equals: Eq.equals,
    compare(first2, second) {
        return first2 < second ? -1 : first2 > second ? 1 : 0;
    },
};
const size$1 = function (r) {
    return Object.keys(r).length;
};
const isEmpty$1 = function (r) {
    for (const k in r) {
        if (has$2.call(r, k)) {
            return false;
        }
    }
    return true;
};
const keys_$1 = function (O) {
    return function (r) {
        return Object.keys(r).sort(O.compare);
    };
};
function collect$1(O) {
    if (typeof O === 'function') {
        return collect$1(Ord)(O);
    }
    const keysO = keys_$1(O);
    return function (f) {
        return function (r) {
            const out = [];
            for (let _i = 0, _a = keysO(r); _i < _a.length; _i++) {
                const key = _a[_i];
                out.push(f(key, r[key]));
            }
            return out;
        };
    };
}
const upsertAt$1 = function (k, a) {
    return function (r) {
        if (has$2.call(r, k) && r[k] === a) {
            return r;
        }
        const out = { ...r };
        out[k] = a;
        return out;
    };
};
const has$1 = function (k, r) {
    return has$2.call(r, k);
};
function isSubrecord$1(E) {
    return function (me, that) {
        if (that === void 0) {
            const isSubrecordE_1 = isSubrecord$1(E);
            return function (that2) {
                return isSubrecordE_1(that2, me);
            };
        }
        for (const k in me) {
            if (!has$2.call(that, k) || !E.equals(me[k], that[k])) {
                return false;
            }
        }
        return true;
    };
}
function lookup$1(k, r) {
    if (r === void 0) {
        return function (r2) {
            return lookup$1(k, r2);
        };
    }
    return has$2.call(r, k) ? some$4(r[k]) : none$1;
}
const empty$1 = {};
function mapWithIndex$1(f) {
    return function (r) {
        const out = {};
        for (const k in r) {
            if (has$2.call(r, k)) {
                out[k] = f(k, r[k]);
            }
        }
        return out;
    };
}
function map$1(f) {
    return mapWithIndex$1((_2, a) => f(a));
}
function reduceWithIndex$1() {
    const args = [];
    for (let _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length === 2) {
        return reduceWithIndex$1(Ord).apply(void 0, args);
    }
    const keysO = keys_$1(args[0]);
    return function (b, f) {
        return function (fa) {
            let out = b;
            const ks = keysO(fa);
            const len = ks.length;
            for (let i = 0; i < len; i++) {
                const k = ks[i];
                out = f(k, out, fa[k]);
            }
            return out;
        };
    };
}
function foldMapWithIndex$1(O) {
    if ('compare' in O) {
        const keysO_1 = keys_$1(O);
        return function (M) {
            return function (f) {
                return function (fa) {
                    let out = M.empty;
                    const ks = keysO_1(fa);
                    const len = ks.length;
                    for (let i = 0; i < len; i++) {
                        const k = ks[i];
                        out = M.concat(out, f(k, fa[k]));
                    }
                    return out;
                };
            };
        };
    }
    return foldMapWithIndex$1(Ord)(O);
}
function reduceRightWithIndex$1() {
    const args = [];
    for (let _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length === 2) {
        return reduceRightWithIndex$1(Ord).apply(void 0, args);
    }
    const keysO = keys_$1(args[0]);
    return function (b, f) {
        return function (fa) {
            let out = b;
            const ks = keysO(fa);
            const len = ks.length;
            for (let i = len - 1; i >= 0; i--) {
                const k = ks[i];
                out = f(k, fa[k], out);
            }
            return out;
        };
    };
}
const singleton$1 = function (k, a) {
    let _a;
    return _a = {}, _a[k] = a, _a;
};
function traverseWithIndex$1(F) {
    const traverseWithIndexOF = _traverseWithIndex$1(Ord)(F);
    return function (f) {
        return function (ta) {
            return traverseWithIndexOF(ta, f);
        };
    };
}
function traverse$1(F) {
    const traverseOF = _traverse$1(Ord)(F);
    return function (f) {
        return function (ta) {
            return traverseOF(ta, f);
        };
    };
}
function sequence$1(F) {
    return _sequence$1(Ord)(F);
}
function partitionMapWithIndex$1(f) {
    return function (r) {
        const left2 = {};
        const right2 = {};
        for (const k in r) {
            if (has$2.call(r, k)) {
                const e = f(k, r[k]);
                switch (e._tag) {
                    case 'Left':
                        left2[k] = e.left;
                        break;
                    case 'Right':
                        right2[k] = e.right;
                        break;
                }
            }
        }
        return separated(left2, right2);
    };
}
function partitionWithIndex$1(predicateWithIndex) {
    return function (r) {
        const left2 = {};
        const right2 = {};
        for (const k in r) {
            if (has$2.call(r, k)) {
                const a = r[k];
                if (predicateWithIndex(k, a)) {
                    right2[k] = a;
                } else {
                    left2[k] = a;
                }
            }
        }
        return separated(left2, right2);
    };
}
function filterMapWithIndex$1(f) {
    return function (r) {
        const out = {};
        for (const k in r) {
            if (has$2.call(r, k)) {
                const ob = f(k, r[k]);
                if (isSome$1(ob)) {
                    out[k] = ob.value;
                }
            }
        }
        return out;
    };
}
function filterWithIndex$1(predicateWithIndex) {
    return function (fa) {
        const out = {};
        let changed = false;
        for (const key in fa) {
            if (has$2.call(fa, key)) {
                const a = fa[key];
                if (predicateWithIndex(key, a)) {
                    out[key] = a;
                } else {
                    changed = true;
                }
            }
        }
        return changed ? out : fa;
    };
}
function fromFoldable$1(M, F) {
    const fromFoldableMapM = fromFoldableMap$1(M, F);
    return function (fka) {
        return fromFoldableMapM(fka, identity$1);
    };
}
function fromFoldableMap$1(M, F) {
    return function (ta, f) {
        return F.reduce(ta, {}, (r, a) => {
            const _a = f(a); const k = _a[0]; const
                b = _a[1];
            r[k] = has$2.call(r, k) ? M.concat(r[k], b) : b;
            return r;
        });
    };
}
function every$1(predicate) {
    return function (r) {
        for (const k in r) {
            if (!predicate(r[k])) {
                return false;
            }
        }
        return true;
    };
}
function some$1(predicate) {
    return function (r) {
        for (const k in r) {
            if (predicate(r[k])) {
                return true;
            }
        }
        return false;
    };
}
function elem$1(E) {
    return function (a, fa) {
        if (fa === void 0) {
            const elemE_1 = elem$1(E);
            return function (fa2) {
                return elemE_1(a, fa2);
            };
        }
        for (const k in fa) {
            if (E.equals(fa[k], a)) {
                return true;
            }
        }
        return false;
    };
}
const union$2 = function (M) {
    return function (second) {
        return function (first2) {
            if (isEmpty$1(first2)) {
                return second;
            }
            if (isEmpty$1(second)) {
                return first2;
            }
            const out = {};
            for (var k in first2) {
                if (has$1(k, second)) {
                    out[k] = M.concat(first2[k], second[k]);
                } else {
                    out[k] = first2[k];
                }
            }
            for (var k in second) {
                if (!has$1(k, out)) {
                    out[k] = second[k];
                }
            }
            return out;
        };
    };
};
const intersection$2 = function (M) {
    return function (second) {
        return function (first2) {
            if (isEmpty$1(first2) || isEmpty$1(second)) {
                return empty$1;
            }
            const out = {};
            for (const k in first2) {
                if (has$1(k, second)) {
                    out[k] = M.concat(first2[k], second[k]);
                }
            }
            return out;
        };
    };
};
const difference$1 = function (second) {
    return function (first2) {
        if (isEmpty$1(first2)) {
            return second;
        }
        if (isEmpty$1(second)) {
            return first2;
        }
        const out = {};
        for (var k in first2) {
            if (!has$1(k, second)) {
                out[k] = first2[k];
            }
        }
        for (var k in second) {
            if (!has$1(k, first2)) {
                out[k] = second[k];
            }
        }
        return out;
    };
};
const _map$1 = function (fa, f) {
    return pipe$1(fa, map$1(f));
};
const _mapWithIndex$1 = function (fa, f) {
    return pipe$1(fa, mapWithIndex$1(f));
};
const _reduce$1 = function (O) {
    const reduceO = reduce$1(O);
    return function (fa, b, f) {
        return pipe$1(fa, reduceO(b, f));
    };
};
const _foldMap$1 = function (O) {
    return function (M) {
        const foldMapM = foldMap$1(O)(M);
        return function (fa, f) {
            return pipe$1(fa, foldMapM(f));
        };
    };
};
const _reduceRight$1 = function (O) {
    const reduceRightO = reduceRight$1(O);
    return function (fa, b, f) {
        return pipe$1(fa, reduceRightO(b, f));
    };
};
const _filter$1 = function (fa, predicate) {
    return pipe$1(fa, filter$1(predicate));
};
const _filterMap$1 = function (fa, f) {
    return pipe$1(fa, filterMap$1(f));
};
const _partition$1 = function (fa, predicate) {
    return pipe$1(fa, partition$1(predicate));
};
const _partitionMap$1 = function (fa, f) {
    return pipe$1(fa, partitionMap$1(f));
};
const _reduceWithIndex$1 = function (O) {
    const reduceWithIndexO = reduceWithIndex$1(O);
    return function (fa, b, f) {
        return pipe$1(fa, reduceWithIndexO(b, f));
    };
};
const _foldMapWithIndex$1 = function (O) {
    const foldMapWithIndexO = foldMapWithIndex$1(O);
    return function (M) {
        const foldMapWithIndexM = foldMapWithIndexO(M);
        return function (fa, f) {
            return pipe$1(fa, foldMapWithIndexM(f));
        };
    };
};
const _reduceRightWithIndex$1 = function (O) {
    const reduceRightWithIndexO = reduceRightWithIndex$1(O);
    return function (fa, b, f) {
        return pipe$1(fa, reduceRightWithIndexO(b, f));
    };
};
const _partitionMapWithIndex$1 = function (fa, f) {
    return pipe$1(fa, partitionMapWithIndex$1(f));
};
const _partitionWithIndex$1 = function (fa, predicateWithIndex) {
    return pipe$1(fa, partitionWithIndex$1(predicateWithIndex));
};
const _filterMapWithIndex$1 = function (fa, f) {
    return pipe$1(fa, filterMapWithIndex$1(f));
};
const _filterWithIndex$1 = function (fa, predicateWithIndex) {
    return pipe$1(fa, filterWithIndex$1(predicateWithIndex));
};
var _traverse$1 = function (O) {
    const traverseWithIndexO = _traverseWithIndex$1(O);
    return function (F) {
        const traverseWithIndexOF = traverseWithIndexO(F);
        return function (ta, f) {
            return traverseWithIndexOF(ta, flow(SK, f));
        };
    };
};
var _sequence$1 = function (O) {
    const traverseO = _traverse$1(O);
    return function (F) {
        const traverseOF = traverseO(F);
        return function (ta) {
            return traverseOF(ta, identity$1);
        };
    };
};
var _traverseWithIndex$1 = function (O) {
    return function (F) {
        const keysO = keys_$1(O);
        return function (ta, f) {
            const ks = keysO(ta);
            if (ks.length === 0) {
                return F.of(empty$1);
            }
            let fr = F.of({});
            const _loop_1 = function (key2) {
                fr = F.ap(F.map(fr, (r) => function (b) {
                    let _a;
                    return { ...r, ...(_a = {}, _a[key2] = b, _a) };
                }), f(key2, ta[key2]));
            };
            for (let _i = 0, ks_1 = ks; _i < ks_1.length; _i++) {
                const key = ks_1[_i];
                _loop_1(key);
            }
            return fr;
        };
    };
};
var filter$1 = function (predicate) {
    return filterWithIndex$1((_2, a) => predicate(a));
};
var filterMap$1 = function (f) {
    return filterMapWithIndex$1((_2, a) => f(a));
};
var partition$1 = function (predicate) {
    return partitionWithIndex$1((_2, a) => predicate(a));
};
var partitionMap$1 = function (f) {
    return partitionMapWithIndex$1((_2, a) => f(a));
};
function reduce$1() {
    const args = [];
    for (let _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length === 1) {
        const reduceWithIndexO_1 = reduceWithIndex$1(args[0]);
        return function (b, f) {
            return reduceWithIndexO_1(b, (_2, b2, a) => f(b2, a));
        };
    }
    return reduce$1(Ord).apply(void 0, args);
}
function foldMap$1(O) {
    if ('compare' in O) {
        const foldMapWithIndexO_1 = foldMapWithIndex$1(O);
        return function (M) {
            const foldMapWithIndexM = foldMapWithIndexO_1(M);
            return function (f) {
                return foldMapWithIndexM((_2, a) => f(a));
            };
        };
    }
    return foldMap$1(Ord)(O);
}
function reduceRight$1() {
    const args = [];
    for (let _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length === 1) {
        const reduceRightWithIndexO_1 = reduceRightWithIndex$1(args[0]);
        return function (b, f) {
            return reduceRightWithIndexO_1(b, (_2, b2, a) => f(b2, a));
        };
    }
    return reduceRight$1(Ord).apply(void 0, args);
}
const compact$1 = function (r) {
    const out = {};
    for (const k in r) {
        if (has$2.call(r, k)) {
            const oa = r[k];
            if (isSome$1(oa)) {
                out[k] = oa.value;
            }
        }
    }
    return out;
};
const separate$1 = function (r) {
    const left2 = {};
    const right2 = {};
    for (const k in r) {
        if (has$2.call(r, k)) {
            const e = r[k];
            if (isLeft$1(e)) {
                left2[k] = e.left;
            } else {
                right2[k] = e.right;
            }
        }
    }
    return separated(left2, right2);
};
function getShow$1(O) {
    if ('compare' in O) {
        return function (S) {
            return {
                show(r) {
                    const elements = collect$1(O)((k, a) => `${JSON.stringify(k)}: ${S.show(a)}`)(r).join(', ');
                    return elements === '' ? '{}' : `{ ${elements} }`;
                },
            };
        };
    }
    return getShow$1(Ord)(O);
}
function getEq$1(E) {
    const isSubrecordE = isSubrecord$1(E);
    return fromEquals((x, y) => isSubrecordE(x)(y) && isSubrecordE(y)(x));
}
function getMonoid$1(S) {
    return {
        concat(first2, second) {
            if (isEmpty$1(first2)) {
                return second;
            }
            if (isEmpty$1(second)) {
                return first2;
            }
            const r = { ...first2 };
            for (const k in second) {
                if (has$2.call(second, k)) {
                    r[k] = has$2.call(first2, k) ? S.concat(first2[k], second[k]) : second[k];
                }
            }
            return r;
        },
        empty: empty$1,
    };
}
function hasOwnProperty$2(k, r) {
    return has$2.call(r === void 0 ? this : r, k);
}
var __assign$1 = globalThis && globalThis.__assign || function () {
    __assign$1 = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (const p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign$1.apply(this, arguments);
};
const size = size$1;
const isEmpty = isEmpty$1;
const keys_ = function (O) {
    return function (r) {
        return Object.keys(r).sort(O.compare);
    };
};
const keys = /* @__PURE__ */ keys_(Ord);
function collect(O) {
    if (typeof O === 'function') {
        return collect(Ord)(O);
    }
    const keysO = keys_(O);
    return function (f) {
        return function (r) {
            const out = [];
            for (let _i = 0, _a = keysO(r); _i < _a.length; _i++) {
                const key = _a[_i];
                out.push(f(key, r[key]));
            }
            return out;
        };
    };
}
const toArray$1 = /* @__PURE__ */ collect(Ord)((k, a) => [k, a]);
function toUnfoldable(U) {
    return function (r) {
        const sas = toArray$1(r);
        const len = sas.length;
        return U.unfold(0, (b) => (b < len ? some$4([sas[b], b + 1]) : none$1));
    };
}
const upsertAt = upsertAt$1;
const has = has$1;
function deleteAt(k) {
    return function (r) {
        if (!has$2.call(r, k)) {
            return r;
        }
        const out = { ...r };
        delete out[k];
        return out;
    };
}
const updateAt = function (k, a) {
    return modifyAt(k, () => a);
};
var modifyAt = function (k, f) {
    return function (r) {
        if (!has(k, r)) {
            return none$1;
        }
        const out = { ...r };
        out[k] = f(r[k]);
        return some$4(out);
    };
};
function pop(k) {
    const deleteAtk = deleteAt(k);
    return function (r) {
        const oa = lookup(k, r);
        return isNone$1(oa) ? none$1 : some$4([oa.value, deleteAtk(r)]);
    };
}
const isSubrecord = isSubrecord$1;
var lookup = lookup$1;
const mapWithIndex = mapWithIndex$1;
const map = map$1;
function reduceWithIndex() {
    const args = [];
    for (let _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.length === 1 ? reduceWithIndex$1(args[0]) : reduceWithIndex$1(Ord).apply(void 0, args);
}
function foldMapWithIndex(O) {
    return 'compare' in O ? foldMapWithIndex$1(O) : foldMapWithIndex$1(Ord)(O);
}
function reduceRightWithIndex() {
    const args = [];
    for (let _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.length === 1 ? reduceRightWithIndex$1(args[0]) : reduceRightWithIndex$1(Ord).apply(void 0, args);
}
const singleton = singleton$1;
function traverseWithIndex(F) {
    return traverseWithIndex$1(F);
}
function traverse(F) {
    return traverse$1(F);
}
function sequence(F) {
    return sequence$1(F);
}
const wither = function (F) {
    const traverseF = traverse(F);
    return function (f) {
        return function (fa) {
            return F.map(pipe$1(fa, traverseF(f)), compact);
        };
    };
};
const wilt = function (F) {
    const traverseF = traverse(F);
    return function (f) {
        return function (fa) {
            return F.map(pipe$1(fa, traverseF(f)), separate);
        };
    };
};
const partitionMapWithIndex = partitionMapWithIndex$1;
function partitionWithIndex(predicateWithIndex) {
    return partitionWithIndex$1(predicateWithIndex);
}
const filterMapWithIndex = filterMapWithIndex$1;
function filterWithIndex(predicateWithIndex) {
    return filterWithIndex$1(predicateWithIndex);
}
function fromFoldable(M, F) {
    return fromFoldable$1(M, F);
}
const toEntries = toArray$1;
const fromEntries = function (fa) {
    return fromFoldable(last$4(), Foldable$3)(fa);
};
function fromFoldableMap(M, F) {
    return fromFoldableMap$1(M, F);
}
const every = every$1;
const some = some$1;
const elem = elem$1;
const union$1 = function (M) {
    const unionM = union$2(M);
    return function (second) {
        return function (first2) {
            if (isEmpty(first2)) {
                return { ...second };
            }
            if (isEmpty(second)) {
                return { ...first2 };
            }
            return unionM(second)(first2);
        };
    };
};
const intersection$1 = function (M) {
    return function (second) {
        return function (first2) {
            if (isEmpty(first2) || isEmpty(second)) {
                return {};
            }
            return intersection$2(M)(second)(first2);
        };
    };
};
const difference = function (second) {
    return function (first2) {
        if (isEmpty(first2)) {
            return { ...second };
        }
        if (isEmpty(second)) {
            return { ...first2 };
        }
        return difference$1(second)(first2);
    };
};
const _map = _map$1;
const _mapWithIndex = _mapWithIndex$1;
const _reduce = _reduce$1;
const _foldMap = _foldMap$1;
const _reduceRight = _reduceRight$1;
const _filter = _filter$1;
const _filterMap = _filterMap$1;
const _partition = _partition$1;
const _partitionMap = _partitionMap$1;
const _reduceWithIndex = _reduceWithIndex$1;
const _foldMapWithIndex = _foldMapWithIndex$1;
const _reduceRightWithIndex = _reduceRightWithIndex$1;
const _partitionMapWithIndex = _partitionMapWithIndex$1;
const _partitionWithIndex = _partitionWithIndex$1;
const _filterMapWithIndex = _filterMapWithIndex$1;
const _filterWithIndex = _filterWithIndex$1;
const _traverse = _traverse$1;
const _sequence = _sequence$1;
const _traverseWithIndex = function (O) {
    return function (F) {
        const keysO = keys_(O);
        return function (ta, f) {
            const ks = keysO(ta);
            if (ks.length === 0) {
                return F.of({});
            }
            let fr = F.of({});
            const _loop_1 = function (key2) {
                fr = F.ap(F.map(fr, (r) => function (b) {
                    r[key2] = b;
                    return r;
                }), f(key2, ta[key2]));
            };
            for (let _i = 0, ks_1 = ks; _i < ks_1.length; _i++) {
                const key = ks_1[_i];
                _loop_1(key);
            }
            return fr;
        };
    };
};
const filter = filter$1;
const filterMap = filterMap$1;
const partition = partition$1;
const partitionMap = partitionMap$1;
function reduce() {
    const args = [];
    for (let _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.length === 1 ? reduce$1(args[0]) : reduce$1(Ord).apply(void 0, args);
}
function foldMap(O) {
    return 'compare' in O ? foldMap$1(O) : foldMap$1(Ord)(O);
}
function reduceRight() {
    const args = [];
    for (let _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.length === 1 ? reduceRight$1(args[0]) : reduceRight$1(Ord).apply(void 0, args);
}
var compact = compact$1;
var separate = separate$1;
const URI = 'Record';
function getShow(O) {
    return 'compare' in O ? getShow$1(O) : getShow$1(Ord)(O);
}
const getEq = getEq$1;
const getMonoid = getMonoid$1;
const Functor = {
    URI,
    map: _map,
};
const flap = /* @__PURE__ */ flap$5(Functor);
const FunctorWithIndex = {
    URI,
    map: _map,
    mapWithIndex: _mapWithIndex,
};
const getFoldable = function (O) {
    return {
        URI,
        reduce: _reduce(O),
        foldMap: _foldMap(O),
        reduceRight: _reduceRight(O),
    };
};
const getFoldableWithIndex = function (O) {
    return {
        URI,
        reduce: _reduce(O),
        foldMap: _foldMap(O),
        reduceRight: _reduceRight(O),
        reduceWithIndex: _reduceWithIndex(O),
        foldMapWithIndex: _foldMapWithIndex(O),
        reduceRightWithIndex: _reduceRightWithIndex(O),
    };
};
const Compactable = {
    URI,
    compact,
    separate,
};
const Filterable = {
    URI,
    map: _map,
    compact,
    separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
};
const FilterableWithIndex = {
    URI,
    map: _map,
    mapWithIndex: _mapWithIndex,
    compact,
    separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    filterMapWithIndex: _filterMapWithIndex,
    filterWithIndex: _filterWithIndex,
    partitionMapWithIndex: _partitionMapWithIndex,
    partitionWithIndex: _partitionWithIndex,
};
const getTraversable = function (O) {
    return {
        URI,
        map: _map,
        reduce: _reduce(O),
        foldMap: _foldMap(O),
        reduceRight: _reduceRight(O),
        traverse: _traverse(O),
        sequence: _sequence(O),
    };
};
const getTraversableWithIndex = function (O) {
    return {
        URI,
        map: _map,
        mapWithIndex: _mapWithIndex,
        reduce: _reduce(O),
        foldMap: _foldMap(O),
        reduceRight: _reduceRight(O),
        reduceWithIndex: _reduceWithIndex(O),
        foldMapWithIndex: _foldMapWithIndex(O),
        reduceRightWithIndex: _reduceRightWithIndex(O),
        traverse: _traverse(O),
        sequence: _sequence(O),
        traverseWithIndex: _traverseWithIndex(O),
    };
};
const getWitherable = function (O) {
    const T = getTraversable(O);
    return {
        URI,
        map: _map,
        reduce: _reduce(O),
        foldMap: _foldMap(O),
        reduceRight: _reduceRight(O),
        traverse: T.traverse,
        sequence: T.sequence,
        compact,
        separate,
        filter: _filter,
        filterMap: _filterMap,
        partition: _partition,
        partitionMap: _partitionMap,
        wither: witherDefault(T, Compactable),
        wilt: wiltDefault(T, Compactable),
    };
};
const getUnionSemigroup = function (S) {
    const unionS = union$1(S);
    return {
        concat(first2, second) {
            return unionS(second)(first2);
        },
    };
};
const getUnionMonoid = function (S) {
    return {
        concat: getUnionSemigroup(S).concat,
        empty: {},
    };
};
const getIntersectionSemigroup = function (S) {
    const intersectionS = intersection$1(S);
    return {
        concat(first2, second) {
            return intersectionS(second)(first2);
        },
    };
};
const getDifferenceMagma = function () {
    return {
        concat(first2, second) {
            return difference(second)(first2);
        },
    };
};
const Foldable = {
    URI,
    reduce: /* @__PURE__ */ _reduce(Ord),
    foldMap: /* @__PURE__ */ _foldMap(Ord),
    reduceRight: /* @__PURE__ */ _reduceRight(Ord),
};
const FoldableWithIndex = {
    URI,
    reduce: /* @__PURE__ */ _reduce(Ord),
    foldMap: /* @__PURE__ */ _foldMap(Ord),
    reduceRight: /* @__PURE__ */ _reduceRight(Ord),
    reduceWithIndex: /* @__PURE__ */ _reduceWithIndex(Ord),
    foldMapWithIndex: /* @__PURE__ */ _foldMapWithIndex(Ord),
    reduceRightWithIndex: /* @__PURE__ */ _reduceRightWithIndex(Ord),
};
const Traversable = {
    URI,
    map: _map,
    reduce: /* @__PURE__ */ _reduce(Ord),
    foldMap: /* @__PURE__ */ _foldMap(Ord),
    reduceRight: /* @__PURE__ */ _reduceRight(Ord),
    traverse: /* @__PURE__ */ _traverse(Ord),
    sequence,
};
const TraversableWithIndex = {
    URI,
    map: _map,
    mapWithIndex: _mapWithIndex,
    reduce: /* @__PURE__ */ _reduce(Ord),
    foldMap: /* @__PURE__ */ _foldMap(Ord),
    reduceRight: /* @__PURE__ */ _reduceRight(Ord),
    reduceWithIndex: /* @__PURE__ */ _reduceWithIndex(Ord),
    foldMapWithIndex: /* @__PURE__ */ _foldMapWithIndex(Ord),
    reduceRightWithIndex: /* @__PURE__ */ _reduceRightWithIndex(Ord),
    traverse: /* @__PURE__ */ _traverse(Ord),
    sequence,
    traverseWithIndex: /* @__PURE__ */ _traverseWithIndex(Ord),
};
const _wither = /* @__PURE__ */ witherDefault(Traversable, Compactable);
const _wilt = /* @__PURE__ */ wiltDefault(Traversable, Compactable);
const Witherable = {
    URI,
    map: _map,
    reduce: /* @__PURE__ */ _reduce(Ord),
    foldMap: /* @__PURE__ */ _foldMap(Ord),
    reduceRight: /* @__PURE__ */ _reduceRight(Ord),
    traverse: /* @__PURE__ */ _traverse(Ord),
    sequence,
    compact,
    separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    wither: _wither,
    wilt: _wilt,
};
const empty = {};
const insertAt = upsertAt;
const hasOwnProperty$1 = hasOwnProperty$2;
const record$1 = {
    URI,
    map: _map,
    reduce: /* @__PURE__ */ _reduce(Ord),
    foldMap: /* @__PURE__ */ _foldMap(Ord),
    reduceRight: /* @__PURE__ */ _reduceRight(Ord),
    traverse: /* @__PURE__ */ _traverse(Ord),
    sequence,
    compact,
    separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    mapWithIndex: _mapWithIndex,
    reduceWithIndex: /* @__PURE__ */ _reduceWithIndex(Ord),
    foldMapWithIndex: /* @__PURE__ */ _foldMapWithIndex(Ord),
    reduceRightWithIndex: /* @__PURE__ */ _reduceRightWithIndex(Ord),
    filterMapWithIndex: _filterMapWithIndex,
    filterWithIndex: _filterWithIndex,
    partitionMapWithIndex: _partitionMapWithIndex,
    partitionWithIndex: _partitionWithIndex,
    traverseWithIndex: /* @__PURE__ */ _traverseWithIndex(Ord),
    wither: _wither,
    wilt: _wilt,
};
const Record = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    size,
    isEmpty,
    keys,
    collect,
    toArray: toArray$1,
    toUnfoldable,
    upsertAt,
    has,
    deleteAt,
    updateAt,
    modifyAt,
    pop,
    isSubrecord,
    lookup,
    mapWithIndex,
    map,
    reduceWithIndex,
    foldMapWithIndex,
    reduceRightWithIndex,
    singleton,
    traverseWithIndex,
    traverse,
    sequence,
    wither,
    wilt,
    partitionMapWithIndex,
    partitionWithIndex,
    filterMapWithIndex,
    filterWithIndex,
    fromFoldable,
    toEntries,
    fromEntries,
    fromFoldableMap,
    every,
    some,
    elem,
    union: union$1,
    intersection: intersection$1,
    difference,
    filter,
    filterMap,
    partition,
    partitionMap,
    reduce,
    foldMap,
    reduceRight,
    compact,
    separate,
    URI,
    getShow,
    getEq,
    getMonoid,
    Functor,
    flap,
    FunctorWithIndex,
    getFoldable,
    getFoldableWithIndex,
    Compactable,
    Filterable,
    FilterableWithIndex,
    getTraversable,
    getTraversableWithIndex,
    getWitherable,
    getUnionSemigroup,
    getUnionMonoid,
    getIntersectionSemigroup,
    getDifferenceMagma,
    Foldable,
    FoldableWithIndex,
    Traversable,
    TraversableWithIndex,
    Witherable,
    empty,
    insertAt,
    hasOwnProperty: hasOwnProperty$1,
    record: record$1,
}, Symbol.toStringTag, { value: 'Module' }));
const require$$4 = /* @__PURE__ */ getAugmentedNamespace(Record);
const isFunctor = function (I) {
    return typeof I.map === 'function';
};
const isContravariant = function (I) {
    return typeof I.contramap === 'function';
};
const isFunctorWithIndex = function (I) {
    return typeof I.mapWithIndex === 'function';
};
const isApply = function (I) {
    return typeof I.ap === 'function';
};
const isChain = function (I) {
    return typeof I.chain === 'function';
};
const isBifunctor = function (I) {
    return typeof I.bimap === 'function';
};
const isExtend = function (I) {
    return typeof I.extend === 'function';
};
const isFoldable = function (I) {
    return typeof I.reduce === 'function';
};
const isFoldableWithIndex = function (I) {
    return typeof I.reduceWithIndex === 'function';
};
const isAlt = function (I) {
    return typeof I.alt === 'function';
};
const isCompactable = function (I) {
    return typeof I.compact === 'function';
};
const isFilterable = function (I) {
    return typeof I.filter === 'function';
};
const isFilterableWithIndex = function (I) {
    return typeof I.filterWithIndex === 'function';
};
const isProfunctor = function (I) {
    return typeof I.promap === 'function';
};
const isSemigroupoid = function (I) {
    return typeof I.compose === 'function';
};
const isMonadThrow = function (I) {
    return typeof I.throwError === 'function';
};
function pipeable(I) {
    const r = {};
    if (isFunctor(I)) {
        const map2 = function (f) {
            return function (fa) {
                return I.map(fa, f);
            };
        };
        r.map = map2;
    }
    if (isContravariant(I)) {
        const contramap = function (f) {
            return function (fa) {
                return I.contramap(fa, f);
            };
        };
        r.contramap = contramap;
    }
    if (isFunctorWithIndex(I)) {
        const mapWithIndex2 = function (f) {
            return function (fa) {
                return I.mapWithIndex(fa, f);
            };
        };
        r.mapWithIndex = mapWithIndex2;
    }
    if (isApply(I)) {
        const ap2 = function (fa) {
            return function (fab) {
                return I.ap(fab, fa);
            };
        };
        const apFirst2 = function (fb) {
            return function (fa) {
                return I.ap(I.map(fa, (a) => function () {
                    return a;
                }), fb);
            };
        };
        r.ap = ap2;
        r.apFirst = apFirst2;
        r.apSecond = function (fb) {
            return function (fa) {
                return I.ap(I.map(fa, () => function (b) {
                    return b;
                }), fb);
            };
        };
    }
    if (isChain(I)) {
        const chain2 = function (f) {
            return function (ma) {
                return I.chain(ma, f);
            };
        };
        const chainFirst2 = function (f) {
            return function (ma) {
                return I.chain(ma, (a) => I.map(f(a), () => a));
            };
        };
        const flatten2 = function (mma) {
            return I.chain(mma, identity$1);
        };
        r.chain = chain2;
        r.chainFirst = chainFirst2;
        r.flatten = flatten2;
    }
    if (isBifunctor(I)) {
        const bimap2 = function (f, g) {
            return function (fa) {
                return I.bimap(fa, f, g);
            };
        };
        const mapLeft2 = function (f) {
            return function (fa) {
                return I.mapLeft(fa, f);
            };
        };
        r.bimap = bimap2;
        r.mapLeft = mapLeft2;
    }
    if (isExtend(I)) {
        const extend2 = function (f) {
            return function (wa) {
                return I.extend(wa, f);
            };
        };
        const duplicate2 = function (wa) {
            return I.extend(wa, identity$1);
        };
        r.extend = extend2;
        r.duplicate = duplicate2;
    }
    if (isFoldable(I)) {
        const reduce2 = function (b, f) {
            return function (fa) {
                return I.reduce(fa, b, f);
            };
        };
        const foldMap2 = function (M) {
            const foldMapM = I.foldMap(M);
            return function (f) {
                return function (fa) {
                    return foldMapM(fa, f);
                };
            };
        };
        const reduceRight2 = function (b, f) {
            return function (fa) {
                return I.reduceRight(fa, b, f);
            };
        };
        r.reduce = reduce2;
        r.foldMap = foldMap2;
        r.reduceRight = reduceRight2;
    }
    if (isFoldableWithIndex(I)) {
        const reduceWithIndex2 = function (b, f) {
            return function (fa) {
                return I.reduceWithIndex(fa, b, f);
            };
        };
        const foldMapWithIndex2 = function (M) {
            const foldMapM = I.foldMapWithIndex(M);
            return function (f) {
                return function (fa) {
                    return foldMapM(fa, f);
                };
            };
        };
        const reduceRightWithIndex2 = function (b, f) {
            return function (fa) {
                return I.reduceRightWithIndex(fa, b, f);
            };
        };
        r.reduceWithIndex = reduceWithIndex2;
        r.foldMapWithIndex = foldMapWithIndex2;
        r.reduceRightWithIndex = reduceRightWithIndex2;
    }
    if (isAlt(I)) {
        const alt2 = function (that) {
            return function (fa) {
                return I.alt(fa, that);
            };
        };
        r.alt = alt2;
    }
    if (isCompactable(I)) {
        r.compact = I.compact;
        r.separate = I.separate;
    }
    if (isFilterable(I)) {
        const filter2 = function (predicate) {
            return function (fa) {
                return I.filter(fa, predicate);
            };
        };
        const filterMap2 = function (f) {
            return function (fa) {
                return I.filterMap(fa, f);
            };
        };
        const partition2 = function (predicate) {
            return function (fa) {
                return I.partition(fa, predicate);
            };
        };
        const partitionMap2 = function (f) {
            return function (fa) {
                return I.partitionMap(fa, f);
            };
        };
        r.filter = filter2;
        r.filterMap = filterMap2;
        r.partition = partition2;
        r.partitionMap = partitionMap2;
    }
    if (isFilterableWithIndex(I)) {
        const filterWithIndex2 = function (predicateWithIndex) {
            return function (fa) {
                return I.filterWithIndex(fa, predicateWithIndex);
            };
        };
        const filterMapWithIndex2 = function (f) {
            return function (fa) {
                return I.filterMapWithIndex(fa, f);
            };
        };
        const partitionWithIndex2 = function (predicateWithIndex) {
            return function (fa) {
                return I.partitionWithIndex(fa, predicateWithIndex);
            };
        };
        const partitionMapWithIndex2 = function (f) {
            return function (fa) {
                return I.partitionMapWithIndex(fa, f);
            };
        };
        r.filterWithIndex = filterWithIndex2;
        r.filterMapWithIndex = filterMapWithIndex2;
        r.partitionWithIndex = partitionWithIndex2;
        r.partitionMapWithIndex = partitionMapWithIndex2;
    }
    if (isProfunctor(I)) {
        const promap = function (f, g) {
            return function (fa) {
                return I.promap(fa, f, g);
            };
        };
        r.promap = promap;
    }
    if (isSemigroupoid(I)) {
        const compose = function (that) {
            return function (fa) {
                return I.compose(fa, that);
            };
        };
        r.compose = compose;
    }
    if (isMonadThrow(I)) {
        const fromOption2 = function (onNone) {
            return function (ma) {
                return ma._tag === 'None' ? I.throwError(onNone()) : I.of(ma.value);
            };
        };
        const fromEither2 = function (ma) {
            return ma._tag === 'Left' ? I.throwError(ma.left) : I.of(ma.right);
        };
        const fromPredicate2 = function (predicate, onFalse) {
            return function (a) {
                return predicate(a) ? I.of(a) : I.throwError(onFalse(a));
            };
        };
        const filterOrElse2 = function (predicate, onFalse) {
            return function (ma) {
                return I.chain(ma, (a) => (predicate(a) ? I.of(a) : I.throwError(onFalse(a))));
            };
        };
        r.fromOption = fromOption2;
        r.fromEither = fromEither2;
        r.fromPredicate = fromPredicate2;
        r.filterOrElse = filterOrElse2;
    }
    return r;
}
const pipe = pipe$1;
const pipeable$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    pipeable,
    pipe,
}, Symbol.toStringTag, { value: 'Module' }));
const require$$5 = /* @__PURE__ */ getAugmentedNamespace(pipeable$1);
const __extends = globalThis && globalThis.__extends || (function () {
    let extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d2, b2) {
            d2.__proto__ = b2;
        } || function (d2, b2) {
            for (const p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== 'function' && b !== null) throw new TypeError(`Class extends value ${String(b)} is not a constructor or null`);
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}());
var __assign = globalThis && globalThis.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (const p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
const __spreadArray = globalThis && globalThis.__spreadArray || function (to, from2, pack) {
    if (pack || arguments.length === 2) {
        for (var i = 0, l = from2.length, ar; i < l; i++) {
            if (ar || !(i in from2)) {
                if (!ar) ar = Array.prototype.slice.call(from2, 0, i);
                ar[i] = from2[i];
            }
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from2));
};
const failures = left;
const failure = function (value, context, message2) {
    return failures([{ value, context, message: message2 }]);
};
const success = right;
const Type = (function () {
    function Type2(name, is, validate, encode2) {
        this.name = name;
        this.is = is;
        this.validate = validate;
        this.encode = encode2;
        this.decode = this.decode.bind(this);
    }
    Type2.prototype.pipe = function (ab, name) {
        const _this = this;
        if (name === void 0) {
            name = 'pipe('.concat(this.name, ', ').concat(ab.name, ')');
        }
        return new Type2(name, ab.is, ((i, c) => {
            const e = _this.validate(i, c);
            if (isLeft(e)) {
                return e;
            }
            return ab.validate(e.right, c);
        }), this.encode === identity && ab.encode === identity ? identity : (b) => _this.encode(ab.encode(b)));
    };
    Type2.prototype.asDecoder = function () {
        return this;
    };
    Type2.prototype.asEncoder = function () {
        return this;
    };
    Type2.prototype.decode = function (i) {
        return this.validate(i, [{ key: '', type: this, actual: i }]);
    };
    return Type2;
}());
var identity = function (a) {
    return a;
};
function getFunctionName(f) {
    return f.displayName || f.name || '<function'.concat(f.length, '>');
}
function getContextEntry(key, decoder) {
    return { key, type: decoder };
}
function appendContext(c, key, decoder, actual) {
    const len = c.length;
    const r = Array(len + 1);
    for (let i = 0; i < len; i++) {
        r[i] = c[i];
    }
    r[len] = { key, type: decoder, actual };
    return r;
}
function pushAll(xs, ys) {
    const l = ys.length;
    for (let i = 0; i < l; i++) {
        xs.push(ys[i]);
    }
}
const { hasOwnProperty } = Object.prototype;
function getNameFromProps(props) {
    return Object.keys(props).map((k) => ''.concat(k, ': ').concat(props[k].name)).join(', ');
}
function useIdentity(codecs) {
    for (let i = 0; i < codecs.length; i++) {
        if (codecs[i].encode !== identity) {
            return false;
        }
    }
    return true;
}
function getInterfaceTypeName(props) {
    return '{ '.concat(getNameFromProps(props), ' }');
}
function getPartialTypeName(inner) {
    return 'Partial<'.concat(inner, '>');
}
function enumerableRecord(keys2, domain, codomain, name) {
    if (name === void 0) {
        name = '{ [K in '.concat(domain.name, ']: ').concat(codomain.name, ' }');
    }
    const len = keys2.length;
    return new DictionaryType(name, ((u) => UnknownRecord.is(u) && keys2.every((k) => codomain.is(u[k]))), ((u, c) => {
        const e = UnknownRecord.validate(u, c);
        if (isLeft(e)) {
            return e;
        }
        const o = e.right;
        const a = {};
        const errors = [];
        let changed = false;
        for (let i = 0; i < len; i++) {
            const k = keys2[i];
            const ok = o[k];
            const codomainResult = codomain.validate(ok, appendContext(c, k, codomain, ok));
            if (isLeft(codomainResult)) {
                pushAll(errors, codomainResult.left);
            } else {
                const vok = codomainResult.right;
                changed = changed || vok !== ok;
                a[k] = vok;
            }
        }
        return errors.length > 0 ? failures(errors) : success(changed || Object.keys(o).length !== len ? a : o);
    }), codomain.encode === identity ? identity : (a) => {
        const s = {};
        for (let i = 0; i < len; i++) {
            const k = keys2[i];
            s[k] = codomain.encode(a[k]);
        }
        return s;
    }, domain, codomain);
}
function getDomainKeys(domain) {
    let _a;
    if (isLiteralC(domain)) {
        const literal_1 = domain.value;
        if (string.is(literal_1)) {
            return _a = {}, _a[literal_1] = null, _a;
        }
    } else if (isKeyofC(domain)) {
        return domain.keys;
    } else if (isUnionC(domain)) {
        const keys2 = domain.types.map((type2) => getDomainKeys(type2));
        return keys2.some(undefinedType.is) ? void 0 : Object.assign.apply(Object, __spreadArray([{}], keys2, false));
    }
    return void 0;
}
function nonEnumerableRecord(domain, codomain, name) {
    if (name === void 0) {
        name = '{ [K in '.concat(domain.name, ']: ').concat(codomain.name, ' }');
    }
    return new DictionaryType(name, ((u) => {
        if (UnknownRecord.is(u)) {
            return Object.keys(u).every((k) => domain.is(k) && codomain.is(u[k]));
        }
        return isAnyC(codomain) && Array.isArray(u);
    }), ((u, c) => {
        if (UnknownRecord.is(u)) {
            const a = {};
            const errors = [];
            const keys2 = Object.keys(u);
            const len = keys2.length;
            let changed = false;
            for (let i = 0; i < len; i++) {
                let k = keys2[i];
                const ok = u[k];
                const domainResult = domain.validate(k, appendContext(c, k, domain, k));
                if (isLeft(domainResult)) {
                    pushAll(errors, domainResult.left);
                } else {
                    const vk = domainResult.right;
                    changed = changed || vk !== k;
                    k = vk;
                    const codomainResult = codomain.validate(ok, appendContext(c, k, codomain, ok));
                    if (isLeft(codomainResult)) {
                        pushAll(errors, codomainResult.left);
                    } else {
                        const vok = codomainResult.right;
                        changed = changed || vok !== ok;
                        a[k] = vok;
                    }
                }
            }
            return errors.length > 0 ? failures(errors) : success(changed ? a : u);
        }
        if (isAnyC(codomain) && Array.isArray(u)) {
            return success(u);
        }
        return failure(u, c);
    }), domain.encode === identity && codomain.encode === identity ? identity : (a) => {
        const s = {};
        const keys2 = Object.keys(a);
        const len = keys2.length;
        for (let i = 0; i < len; i++) {
            const k = keys2[i];
            s[String(domain.encode(k))] = codomain.encode(a[k]);
        }
        return s;
    }, domain, codomain);
}
function getUnionName(codecs) {
    return `(${codecs.map((type2) => type2.name).join(' | ')})`;
}
function mergeAll(base2, us) {
    let equal = true;
    let primitive = true;
    const baseIsNotADictionary = !UnknownRecord.is(base2);
    for (let _i = 0, us_1 = us; _i < us_1.length; _i++) {
        var u = us_1[_i];
        if (u !== base2) {
            equal = false;
        }
        if (UnknownRecord.is(u)) {
            primitive = false;
        }
    }
    if (equal) {
        return base2;
    } if (primitive) {
        return us[us.length - 1];
    }
    const r = {};
    for (let _a = 0, us_2 = us; _a < us_2.length; _a++) {
        var u = us_2[_a];
        for (const k in u) {
            if (!r.hasOwnProperty(k) || baseIsNotADictionary || u[k] !== base2[k]) {
                r[k] = u[k];
            }
        }
    }
    return r;
}
function getProps(codec) {
    switch (codec._tag) {
        case 'RefinementType':
        case 'ReadonlyType':
            return getProps(codec.type);
        case 'InterfaceType':
        case 'StrictType':
        case 'PartialType':
            return codec.props;
        case 'IntersectionType':
            return codec.types.reduce((props, type2) => Object.assign(props, getProps(type2)), {});
    }
}
function stripKeys(o, props) {
    const keys2 = Object.getOwnPropertyNames(o);
    let shouldStrip = false;
    const r = {};
    for (let i = 0; i < keys2.length; i++) {
        const key = keys2[i];
        if (!hasOwnProperty.call(props, key)) {
            shouldStrip = true;
        } else {
            r[key] = o[key];
        }
    }
    return shouldStrip ? r : o;
}
function getExactTypeName(codec) {
    if (isTypeC(codec)) {
        return '{| '.concat(getNameFromProps(codec.props), ' |}');
    } if (isPartialC(codec)) {
        return getPartialTypeName('{| '.concat(getNameFromProps(codec.props), ' |}'));
    }
    return 'Exact<'.concat(codec.name, '>');
}
function isNonEmpty(as) {
    return as.length > 0;
}
const emptyTags = {};
function intersect(a, b) {
    const r = [];
    for (let _i = 0, a_1 = a; _i < a_1.length; _i++) {
        const v = a_1[_i];
        if (b.indexOf(v) !== -1) {
            r.push(v);
        }
    }
    return r;
}
function mergeTags(a, b) {
    if (a === emptyTags) {
        return b;
    }
    if (b === emptyTags) {
        return a;
    }
    let r = { ...a };
    for (const k in b) {
        if (a.hasOwnProperty(k)) {
            const intersection_1 = intersect(a[k], b[k]);
            if (isNonEmpty(intersection_1)) {
                r[k] = intersection_1;
            } else {
                r = emptyTags;
                break;
            }
        } else {
            r[k] = b[k];
        }
    }
    return r;
}
function intersectTags(a, b) {
    if (a === emptyTags || b === emptyTags) {
        return emptyTags;
    }
    let r = emptyTags;
    for (const k in a) {
        if (b.hasOwnProperty(k)) {
            const intersection_2 = intersect(a[k], b[k]);
            if (intersection_2.length === 0) {
                if (r === emptyTags) {
                    r = {};
                }
                r[k] = a[k].concat(b[k]);
            }
        }
    }
    return r;
}
function isAnyC(codec) {
    return codec._tag === 'AnyType';
}
function isLiteralC(codec) {
    return codec._tag === 'LiteralType';
}
function isKeyofC(codec) {
    return codec._tag === 'KeyofType';
}
function isTypeC(codec) {
    return codec._tag === 'InterfaceType';
}
function isPartialC(codec) {
    return codec._tag === 'PartialType';
}
function isStrictC(codec) {
    return codec._tag === 'StrictType';
}
function isExactC(codec) {
    return codec._tag === 'ExactType';
}
function isRefinementC(codec) {
    return codec._tag === 'RefinementType';
}
function isIntersectionC(codec) {
    return codec._tag === 'IntersectionType';
}
function isUnionC(codec) {
    return codec._tag === 'UnionType';
}
function isRecursiveC(codec) {
    return codec._tag === 'RecursiveType';
}
const lazyCodecs = [];
function getTags(codec) {
    if (lazyCodecs.indexOf(codec) !== -1) {
        return emptyTags;
    }
    if (isTypeC(codec) || isStrictC(codec)) {
        let index = emptyTags;
        for (const k in codec.props) {
            const prop = codec.props[k];
            if (isLiteralC(prop)) {
                if (index === emptyTags) {
                    index = {};
                }
                index[k] = [prop.value];
            }
        }
        return index;
    } if (isExactC(codec) || isRefinementC(codec)) {
        return getTags(codec.type);
    } if (isIntersectionC(codec)) {
        return codec.types.reduce((tags2, codec2) => mergeTags(tags2, getTags(codec2)), emptyTags);
    } if (isUnionC(codec)) {
        return codec.types.slice(1).reduce((tags2, codec2) => intersectTags(tags2, getTags(codec2)), getTags(codec.types[0]));
    } if (isRecursiveC(codec)) {
        lazyCodecs.push(codec);
        const tags = getTags(codec.type);
        lazyCodecs.pop();
        return tags;
    }
    return emptyTags;
}
function getIndex(codecs) {
    const tags = getTags(codecs[0]);
    const keys2 = Object.keys(tags);
    const len = codecs.length;
    const _loop_1 = function (k2) {
        const all2 = tags[k2].slice();
        const index = [tags[k2]];
        for (let i = 1; i < len; i++) {
            const codec = codecs[i];
            const ctags = getTags(codec);
            const values = ctags[k2];
            if (values === void 0) {
                return 'continue-keys';
            }
            if (values.some((v) => all2.indexOf(v) !== -1)) {
                return 'continue-keys';
            }
            all2.push.apply(all2, values);
            index.push(values);
        }
        return { value: [k2, index] };
    };
    keys:
    for (let _i = 0, keys_1 = keys2; _i < keys_1.length; _i++) {
        const k = keys_1[_i];
        const state_1 = _loop_1(k);
        if (typeof state_1 === 'object') return state_1.value;
        switch (state_1) {
            case 'continue-keys':
                continue keys;
        }
    }
    return void 0;
}
const NullType = (function (_super) {
    __extends(NullType2, _super);
    function NullType2() {
        var _this = _super.call(this, 'null', (u) => u === null, (u, c) => (_this.is(u) ? success(u) : failure(u, c)), identity) || this;
        _this._tag = 'NullType';
        return _this;
    }
    return NullType2;
}(Type));
const nullType = new NullType();
const UndefinedType = (function (_super) {
    __extends(UndefinedType2, _super);
    function UndefinedType2() {
        var _this = _super.call(this, 'undefined', (u) => u === void 0, (u, c) => (_this.is(u) ? success(u) : failure(u, c)), identity) || this;
        _this._tag = 'UndefinedType';
        return _this;
    }
    return UndefinedType2;
}(Type));
var undefinedType = new UndefinedType();
const VoidType = (function (_super) {
    __extends(VoidType2, _super);
    function VoidType2() {
        const _this = _super.call(this, 'void', undefinedType.is, undefinedType.validate, identity) || this;
        _this._tag = 'VoidType';
        return _this;
    }
    return VoidType2;
}(Type));
const voidType = new VoidType();
const UnknownType = (function (_super) {
    __extends(UnknownType2, _super);
    function UnknownType2() {
        const _this = _super.call(this, 'unknown', (_2) => true, success, identity) || this;
        _this._tag = 'UnknownType';
        return _this;
    }
    return UnknownType2;
}(Type));
const unknown = new UnknownType();
const StringType = (function (_super) {
    __extends(StringType2, _super);
    function StringType2() {
        var _this = _super.call(this, 'string', (u) => typeof u === 'string', (u, c) => (_this.is(u) ? success(u) : failure(u, c)), identity) || this;
        _this._tag = 'StringType';
        return _this;
    }
    return StringType2;
}(Type));
var string = new StringType();
const NumberType = (function (_super) {
    __extends(NumberType2, _super);
    function NumberType2() {
        var _this = _super.call(this, 'number', (u) => typeof u === 'number', (u, c) => (_this.is(u) ? success(u) : failure(u, c)), identity) || this;
        _this._tag = 'NumberType';
        return _this;
    }
    return NumberType2;
}(Type));
const number = new NumberType();
const BigIntType = (function (_super) {
    __extends(BigIntType2, _super);
    function BigIntType2() {
        var _this = _super.call(
            this,
            'bigint',
            (u) => typeof u === 'bigint',
            (u, c) => (_this.is(u) ? success(u) : failure(u, c)),
            identity,
        ) || this;
        _this._tag = 'BigIntType';
        return _this;
    }
    return BigIntType2;
}(Type));
const bigint = new BigIntType();
const BooleanType = (function (_super) {
    __extends(BooleanType2, _super);
    function BooleanType2() {
        var _this = _super.call(this, 'boolean', (u) => typeof u === 'boolean', (u, c) => (_this.is(u) ? success(u) : failure(u, c)), identity) || this;
        _this._tag = 'BooleanType';
        return _this;
    }
    return BooleanType2;
}(Type));
const boolean = new BooleanType();
const AnyArrayType = (function (_super) {
    __extends(AnyArrayType2, _super);
    function AnyArrayType2() {
        var _this = _super.call(this, 'UnknownArray', Array.isArray, (u, c) => (_this.is(u) ? success(u) : failure(u, c)), identity) || this;
        _this._tag = 'AnyArrayType';
        return _this;
    }
    return AnyArrayType2;
}(Type));
const UnknownArray = new AnyArrayType();
const AnyDictionaryType = (function (_super) {
    __extends(AnyDictionaryType2, _super);
    function AnyDictionaryType2() {
        var _this = _super.call(this, 'UnknownRecord', (u) => {
            const s = Object.prototype.toString.call(u);
            return s === '[object Object]' || s === '[object Window]';
        }, (u, c) => (_this.is(u) ? success(u) : failure(u, c)), identity) || this;
        _this._tag = 'AnyDictionaryType';
        return _this;
    }
    return AnyDictionaryType2;
}(Type));
var UnknownRecord = new AnyDictionaryType();
const LiteralType = (function (_super) {
    __extends(LiteralType2, _super);
    function LiteralType2(name, is, validate, encode2, value) {
        const _this = _super.call(this, name, is, validate, encode2) || this;
        _this.value = value;
        _this._tag = 'LiteralType';
        return _this;
    }
    return LiteralType2;
}(Type));
function literal(value, name) {
    if (name === void 0) {
        name = JSON.stringify(value);
    }
    const is = function (u) {
        return u === value;
    };
    return new LiteralType(name, is, ((u, c) => (is(u) ? success(value) : failure(u, c))), identity, value);
}
const KeyofType = (function (_super) {
    __extends(KeyofType2, _super);
    function KeyofType2(name, is, validate, encode2, keys2) {
        const _this = _super.call(this, name, is, validate, encode2) || this;
        _this.keys = keys2;
        _this._tag = 'KeyofType';
        return _this;
    }
    return KeyofType2;
}(Type));
function keyof(keys2, name) {
    if (name === void 0) {
        name = Object.keys(keys2).map((k) => JSON.stringify(k)).join(' | ');
    }
    const is = function (u) {
        return string.is(u) && hasOwnProperty.call(keys2, u);
    };
    return new KeyofType(name, is, ((u, c) => (is(u) ? success(u) : failure(u, c))), identity, keys2);
}
const RefinementType = (function (_super) {
    __extends(RefinementType2, _super);
    function RefinementType2(name, is, validate, encode2, type2, predicate) {
        const _this = _super.call(this, name, is, validate, encode2) || this;
        _this.type = type2;
        _this.predicate = predicate;
        _this._tag = 'RefinementType';
        return _this;
    }
    return RefinementType2;
}(Type));
function brand(codec, predicate, name) {
    return refinement(codec, predicate, name);
}
const Int = brand(number, (n) => Number.isInteger(n), 'Int');
const RecursiveType = (function (_super) {
    __extends(RecursiveType2, _super);
    function RecursiveType2(name, is, validate, encode2, runDefinition) {
        const _this = _super.call(this, name, is, validate, encode2) || this;
        _this.runDefinition = runDefinition;
        _this._tag = 'RecursiveType';
        return _this;
    }
    return RecursiveType2;
}(Type));
Object.defineProperty(RecursiveType.prototype, 'type', {
    get() {
        return this.runDefinition();
    },
    enumerable: true,
    configurable: true,
});
function recursion(name, definition) {
    let cache;
    const runDefinition = function () {
        if (!cache) {
            cache = definition(Self);
            cache.name = name;
        }
        return cache;
    };
    var Self = new RecursiveType(name, ((u) => runDefinition().is(u)), ((u, c) => runDefinition().validate(u, c)), ((a) => runDefinition().encode(a)), runDefinition);
    return Self;
}
const ArrayType = (function (_super) {
    __extends(ArrayType2, _super);
    function ArrayType2(name, is, validate, encode2, type2) {
        const _this = _super.call(this, name, is, validate, encode2) || this;
        _this.type = type2;
        _this._tag = 'ArrayType';
        return _this;
    }
    return ArrayType2;
}(Type));
function array(item, name) {
    if (name === void 0) {
        name = 'Array<'.concat(item.name, '>');
    }
    return new ArrayType(name, ((u) => UnknownArray.is(u) && u.every(item.is)), ((u, c) => {
        const e = UnknownArray.validate(u, c);
        if (isLeft(e)) {
            return e;
        }
        const us = e.right;
        const len = us.length;
        let as = us;
        const errors = [];
        for (let i = 0; i < len; i++) {
            const ui = us[i];
            const result = item.validate(ui, appendContext(c, String(i), item, ui));
            if (isLeft(result)) {
                pushAll(errors, result.left);
            } else {
                const ai = result.right;
                if (ai !== ui) {
                    if (as === us) {
                        as = us.slice();
                    }
                    as[i] = ai;
                }
            }
        }
        return errors.length > 0 ? failures(errors) : success(as);
    }), item.encode === identity ? identity : (a) => a.map(item.encode), item);
}
const InterfaceType = (function (_super) {
    __extends(InterfaceType2, _super);
    function InterfaceType2(name, is, validate, encode2, props) {
        const _this = _super.call(this, name, is, validate, encode2) || this;
        _this.props = props;
        _this._tag = 'InterfaceType';
        return _this;
    }
    return InterfaceType2;
}(Type));
function type(props, name) {
    if (name === void 0) {
        name = getInterfaceTypeName(props);
    }
    const keys2 = Object.keys(props);
    const types2 = keys2.map((key) => props[key]);
    const len = keys2.length;
    return new InterfaceType(name, ((u) => {
        if (UnknownRecord.is(u)) {
            for (let i = 0; i < len; i++) {
                const k = keys2[i];
                const uk = u[k];
                if (uk === void 0 && !hasOwnProperty.call(u, k) || !types2[i].is(uk)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }), ((u, c) => {
        const e = UnknownRecord.validate(u, c);
        if (isLeft(e)) {
            return e;
        }
        const o = e.right;
        let a = o;
        const errors = [];
        for (let i = 0; i < len; i++) {
            const k = keys2[i];
            const ak = a[k];
            const type_1 = types2[i];
            const result = type_1.validate(ak, appendContext(c, k, type_1, ak));
            if (isLeft(result)) {
                pushAll(errors, result.left);
            } else {
                const vak = result.right;
                if (vak !== ak || vak === void 0 && !hasOwnProperty.call(a, k)) {
                    if (a === o) {
                        a = { ...o };
                    }
                    a[k] = vak;
                }
            }
        }
        return errors.length > 0 ? failures(errors) : success(a);
    }), useIdentity(types2) ? identity : (a) => {
        const s = { ...a };
        for (let i = 0; i < len; i++) {
            const k = keys2[i];
            const encode2 = types2[i].encode;
            if (encode2 !== identity) {
                s[k] = encode2(a[k]);
            }
        }
        return s;
    }, props);
}
const PartialType = (function (_super) {
    __extends(PartialType2, _super);
    function PartialType2(name, is, validate, encode2, props) {
        const _this = _super.call(this, name, is, validate, encode2) || this;
        _this.props = props;
        _this._tag = 'PartialType';
        return _this;
    }
    return PartialType2;
}(Type));
function partial(props, name) {
    if (name === void 0) {
        name = getPartialTypeName(getInterfaceTypeName(props));
    }
    const keys2 = Object.keys(props);
    const types2 = keys2.map((key) => props[key]);
    const len = keys2.length;
    return new PartialType(name, ((u) => {
        if (UnknownRecord.is(u)) {
            for (let i = 0; i < len; i++) {
                const k = keys2[i];
                const uk = u[k];
                if (uk !== void 0 && !props[k].is(uk)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }), ((u, c) => {
        const e = UnknownRecord.validate(u, c);
        if (isLeft(e)) {
            return e;
        }
        const o = e.right;
        let a = o;
        const errors = [];
        for (let i = 0; i < len; i++) {
            const k = keys2[i];
            const ak = a[k];
            const type_2 = props[k];
            const result = type_2.validate(ak, appendContext(c, k, type_2, ak));
            if (isLeft(result)) {
                if (ak !== void 0) {
                    pushAll(errors, result.left);
                }
            } else {
                const vak = result.right;
                if (vak !== ak) {
                    if (a === o) {
                        a = { ...o };
                    }
                    a[k] = vak;
                }
            }
        }
        return errors.length > 0 ? failures(errors) : success(a);
    }), useIdentity(types2) ? identity : (a) => {
        const s = { ...a };
        for (let i = 0; i < len; i++) {
            const k = keys2[i];
            const ak = a[k];
            if (ak !== void 0) {
                s[k] = types2[i].encode(ak);
            }
        }
        return s;
    }, props);
}
var DictionaryType = (function (_super) {
    __extends(DictionaryType2, _super);
    function DictionaryType2(name, is, validate, encode2, domain, codomain) {
        const _this = _super.call(this, name, is, validate, encode2) || this;
        _this.domain = domain;
        _this.codomain = codomain;
        _this._tag = 'DictionaryType';
        return _this;
    }
    return DictionaryType2;
}(Type));
function record(domain, codomain, name) {
    const keys2 = getDomainKeys(domain);
    return keys2 ? enumerableRecord(Object.keys(keys2), domain, codomain, name) : nonEnumerableRecord(domain, codomain, name);
}
const UnionType = (function (_super) {
    __extends(UnionType2, _super);
    function UnionType2(name, is, validate, encode2, types2) {
        const _this = _super.call(this, name, is, validate, encode2) || this;
        _this.types = types2;
        _this._tag = 'UnionType';
        return _this;
    }
    return UnionType2;
}(Type));
function union(codecs, name) {
    if (name === void 0) {
        name = getUnionName(codecs);
    }
    const index = getIndex(codecs);
    if (index !== void 0 && codecs.length > 0) {
        const tag_1 = index[0]; const
            groups_1 = index[1];
        const len_1 = groups_1.length;
        const find_1 = function (value) {
            for (let i = 0; i < len_1; i++) {
                if (groups_1[i].indexOf(value) !== -1) {
                    return i;
                }
            }
            return void 0;
        };
        return new TaggedUnionType(name, ((u) => {
            if (UnknownRecord.is(u)) {
                const i = find_1(u[tag_1]);
                return i !== void 0 ? codecs[i].is(u) : false;
            }
            return false;
        }), ((u, c) => {
            const e = UnknownRecord.validate(u, c);
            if (isLeft(e)) {
                return e;
            }
            const r = e.right;
            const i = find_1(r[tag_1]);
            if (i === void 0) {
                return failure(u, c);
            }
            const codec = codecs[i];
            return codec.validate(r, appendContext(c, String(i), codec, r));
        }), useIdentity(codecs) ? identity : (a) => {
            const i = find_1(a[tag_1]);
            if (i === void 0) {
                throw new Error('no codec found to encode value in union codec '.concat(name));
            } else {
                return codecs[i].encode(a);
            }
        }, codecs, tag_1);
    }
    return new UnionType(name, ((u) => codecs.some((type2) => type2.is(u))), ((u, c) => {
        const errors = [];
        for (let i = 0; i < codecs.length; i++) {
            const codec = codecs[i];
            const result = codec.validate(u, appendContext(c, String(i), codec, u));
            if (isLeft(result)) {
                pushAll(errors, result.left);
            } else {
                return success(result.right);
            }
        }
        return failures(errors);
    }), useIdentity(codecs) ? identity : (a) => {
        for (let _i = 0, codecs_1 = codecs; _i < codecs_1.length; _i++) {
            const codec = codecs_1[_i];
            if (codec.is(a)) {
                return codec.encode(a);
            }
        }
        throw new Error('no codec found to encode value in union type '.concat(name));
    }, codecs);
}
const IntersectionType = (function (_super) {
    __extends(IntersectionType2, _super);
    function IntersectionType2(name, is, validate, encode2, types2) {
        const _this = _super.call(this, name, is, validate, encode2) || this;
        _this.types = types2;
        _this._tag = 'IntersectionType';
        return _this;
    }
    return IntersectionType2;
}(Type));
function intersection(codecs, name) {
    if (name === void 0) {
        name = '('.concat(codecs.map((type2) => type2.name).join(' & '), ')');
    }
    const len = codecs.length;
    return new IntersectionType(name, ((u) => codecs.every((type2) => type2.is(u))), codecs.length === 0 ? success : (u, c) => {
        const us = [];
        const errors = [];
        for (let i = 0; i < len; i++) {
            const codec = codecs[i];
            const result = codec.validate(u, appendContext(c, String(i), codec, u));
            if (isLeft(result)) {
                pushAll(errors, result.left);
            } else {
                us.push(result.right);
            }
        }
        return errors.length > 0 ? failures(errors) : success(mergeAll(u, us));
    }, codecs.length === 0 ? identity : (a) => mergeAll(a, codecs.map((codec) => codec.encode(a))), codecs);
}
const TupleType = (function (_super) {
    __extends(TupleType2, _super);
    function TupleType2(name, is, validate, encode2, types2) {
        const _this = _super.call(this, name, is, validate, encode2) || this;
        _this.types = types2;
        _this._tag = 'TupleType';
        return _this;
    }
    return TupleType2;
}(Type));
function tuple(codecs, name) {
    if (name === void 0) {
        name = '['.concat(codecs.map((type2) => type2.name).join(', '), ']');
    }
    const len = codecs.length;
    return new TupleType(name, ((u) => UnknownArray.is(u) && u.length === len && codecs.every((type2, i) => type2.is(u[i]))), ((u, c) => {
        const e = UnknownArray.validate(u, c);
        if (isLeft(e)) {
            return e;
        }
        const us = e.right;
        let as = us.length > len ? us.slice(0, len) : us;
        const errors = [];
        for (let i = 0; i < len; i++) {
            const a = us[i];
            const type_3 = codecs[i];
            const result = type_3.validate(a, appendContext(c, String(i), type_3, a));
            if (isLeft(result)) {
                pushAll(errors, result.left);
            } else {
                const va = result.right;
                if (va !== a) {
                    if (as === us) {
                        as = us.slice();
                    }
                    as[i] = va;
                }
            }
        }
        return errors.length > 0 ? failures(errors) : success(as);
    }), useIdentity(codecs) ? identity : (a) => codecs.map((type2, i) => type2.encode(a[i])), codecs);
}
const ReadonlyType = (function (_super) {
    __extends(ReadonlyType2, _super);
    function ReadonlyType2(name, is, validate, encode2, type2) {
        const _this = _super.call(this, name, is, validate, encode2) || this;
        _this.type = type2;
        _this._tag = 'ReadonlyType';
        return _this;
    }
    return ReadonlyType2;
}(Type));
function readonly(codec, name) {
    if (name === void 0) {
        name = 'Readonly<'.concat(codec.name, '>');
    }
    return new ReadonlyType(name, codec.is, codec.validate, codec.encode, codec);
}
const ReadonlyArrayType = (function (_super) {
    __extends(ReadonlyArrayType2, _super);
    function ReadonlyArrayType2(name, is, validate, encode2, type2) {
        const _this = _super.call(this, name, is, validate, encode2) || this;
        _this.type = type2;
        _this._tag = 'ReadonlyArrayType';
        return _this;
    }
    return ReadonlyArrayType2;
}(Type));
function readonlyArray(item, name) {
    if (name === void 0) {
        name = 'ReadonlyArray<'.concat(item.name, '>');
    }
    const codec = array(item);
    return new ReadonlyArrayType(name, codec.is, codec.validate, codec.encode, item);
}
const strict = function (props, name) {
    return exact(type(props), name);
};
const ExactType = (function (_super) {
    __extends(ExactType2, _super);
    function ExactType2(name, is, validate, encode2, type2) {
        const _this = _super.call(this, name, is, validate, encode2) || this;
        _this.type = type2;
        _this._tag = 'ExactType';
        return _this;
    }
    return ExactType2;
}(Type));
function exact(codec, name) {
    if (name === void 0) {
        name = getExactTypeName(codec);
    }
    const props = getProps(codec);
    return new ExactType(name, codec.is, ((u, c) => {
        const e = UnknownRecord.validate(u, c);
        if (isLeft(e)) {
            return e;
        }
        const ce = codec.validate(u, c);
        if (isLeft(ce)) {
            return ce;
        }
        return right(stripKeys(ce.right, props));
    }), ((a) => codec.encode(stripKeys(a, props))), codec);
}
const FunctionType = (function (_super) {
    __extends(FunctionType2, _super);
    function FunctionType2() {
        var _this = _super.call(
            this,
            'Function',
            (u) => typeof u === 'function',
            (u, c) => (_this.is(u) ? success(u) : failure(u, c)),
            identity,
        ) || this;
        _this._tag = 'FunctionType';
        return _this;
    }
    return FunctionType2;
}(Type));
const Function = new FunctionType();
var TaggedUnionType = (function (_super) {
    __extends(TaggedUnionType2, _super);
    function TaggedUnionType2(name, is, validate, encode2, codecs, tag) {
        const _this = _super.call(this, name, is, validate, encode2, codecs) || this;
        _this.tag = tag;
        return _this;
    }
    return TaggedUnionType2;
}(UnionType));
const taggedUnion = function (tag, codecs, name) {
    if (name === void 0) {
        name = getUnionName(codecs);
    }
    const U = union(codecs, name);
    if (U instanceof TaggedUnionType) {
        return U;
    }
    console.warn('[io-ts] Cannot build a tagged union for '.concat(name, ', returning a de-optimized union'));
    return new TaggedUnionType(name, U.is, U.validate, U.encode, codecs, tag);
};
const getValidationError = function (value, context) {
    return {
        value,
        context,
    };
};
const getDefaultContext = function (decoder) {
    return [
        { key: '', type: decoder },
    ];
};
const NeverType = (function (_super) {
    __extends(NeverType2, _super);
    function NeverType2() {
        const _this = _super.call(
            this,
            'never',
            (_2) => false,
            (u, c) => failure(u, c),
            () => {
                throw new Error('cannot encode never');
            },
        ) || this;
        _this._tag = 'NeverType';
        return _this;
    }
    return NeverType2;
}(Type));
const never = new NeverType();
const AnyType = (function (_super) {
    __extends(AnyType2, _super);
    function AnyType2() {
        const _this = _super.call(this, 'any', (_2) => true, success, identity) || this;
        _this._tag = 'AnyType';
        return _this;
    }
    return AnyType2;
}(Type));
const any = new AnyType();
const Dictionary = UnknownRecord;
const ObjectType = (function (_super) {
    __extends(ObjectType2, _super);
    function ObjectType2() {
        var _this = _super.call(this, 'object', (u) => u !== null && typeof u === 'object', (u, c) => (_this.is(u) ? success(u) : failure(u, c)), identity) || this;
        _this._tag = 'ObjectType';
        return _this;
    }
    return ObjectType2;
}(Type));
const object = new ObjectType();
function refinement(codec, predicate, name) {
    if (name === void 0) {
        name = '('.concat(codec.name, ' | ').concat(getFunctionName(predicate), ')');
    }
    return new RefinementType(name, ((u) => codec.is(u) && predicate(u)), ((i, c) => {
        const e = codec.validate(i, c);
        if (isLeft(e)) {
            return e;
        }
        const a = e.right;
        return predicate(a) ? success(a) : failure(a, c);
    }), codec.encode, codec, predicate);
}
const Integer = refinement(number, Number.isInteger, 'Integer');
const dictionary = record;
const StrictType = (function (_super) {
    __extends(StrictType2, _super);
    function StrictType2(name, is, validate, encode2, props) {
        const _this = _super.call(this, name, is, validate, encode2) || this;
        _this.props = props;
        _this._tag = 'StrictType';
        return _this;
    }
    return StrictType2;
}(Type));
function clean(codec) {
    return codec;
}
function alias(codec) {
    return function () {
        return codec;
    };
}
const es6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    failures,
    failure,
    success,
    Type,
    identity,
    getFunctionName,
    getContextEntry,
    appendContext,
    getDomainKeys,
    mergeAll,
    emptyTags,
    getTags,
    getIndex,
    NullType,
    nullType,
    UndefinedType,
    VoidType,
    voidType,
    UnknownType,
    unknown,
    StringType,
    string,
    NumberType,
    number,
    BigIntType,
    bigint,
    BooleanType,
    boolean,
    AnyArrayType,
    UnknownArray,
    AnyDictionaryType,
    UnknownRecord,
    'null': nullType,
    'undefined': undefinedType,
    'void': voidType,
    LiteralType,
    literal,
    KeyofType,
    keyof,
    RefinementType,
    brand,
    Int,
    RecursiveType,
    recursion,
    ArrayType,
    array,
    InterfaceType,
    type,
    PartialType,
    partial,
    DictionaryType,
    record,
    UnionType,
    union,
    IntersectionType,
    intersection,
    TupleType,
    tuple,
    ReadonlyType,
    readonly,
    ReadonlyArrayType,
    readonlyArray,
    strict,
    ExactType,
    exact,
    FunctionType,
    Function,
    TaggedUnionType,
    taggedUnion,
    Array: UnknownArray,
    'interface': type,
    getValidationError,
    getDefaultContext,
    NeverType,
    never,
    AnyType,
    any,
    Dictionary,
    ObjectType,
    object,
    refinement,
    Integer,
    dictionary,
    StrictType,
    clean,
    alias,
}, Symbol.toStringTag, { value: 'Module' }));
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(es6);
const utils$j = {};
Object.defineProperty(utils$j, '__esModule', { value: true });
utils$j.takeUntil = void 0;
const takeUntil = function (predicate) {
    return function (as) {
        const init2 = [];
        for (let i = 0; i < as.length; i++) {
            init2[i] = as[i];
            if (predicate(as[i])) {
                return init2;
            }
        }
        return init2;
    };
};
utils$j.takeUntil = takeUntil;
(function (exports) {
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.reporter = exports.formatValidationErrors = exports.formatValidationError = exports.TYPE_MAX_LEN = void 0;
    const A = require$$0$1;
    const E = require$$1;
    const NEA = require$$2;
    const O = require$$3;
    const R = require$$4;
    const pipeable_1 = require$$5;
    const t = require$$0;
    const utils_12 = utils$j;
    const isUnionType = function (_a) {
        const type2 = _a.type;
        return type2 instanceof t.UnionType;
    };
    const jsToString = function (value) {
        return value === void 0 ? 'undefined' : JSON.stringify(value);
    };
    const keyPath = function (ctx) {
        return ctx.map((c) => c.key).filter(Boolean).join('.');
    };
    const getErrorFromCtx = function (validation) {
        return A.last(validation.context);
    };
    const getValidationContext = function (validation) {
        return validation.context;
    };
    exports.TYPE_MAX_LEN = 160;
    const truncateType = function (type2, options) {
        if (options === void 0) {
            options = {};
        }
        const _a = options.truncateLongTypes; const
            truncateLongTypes = _a === void 0 ? true : _a;
        if (truncateLongTypes && type2.length > exports.TYPE_MAX_LEN) {
            return `${type2.slice(0, exports.TYPE_MAX_LEN - 3)}...`;
        }
        return type2;
    };
    const errorMessageSimple = function (expectedType, path, error, options) {
        return [
            `Expecting ${truncateType(expectedType, options)}`,
            path === '' ? '' : `at ${path}`,
            `but instead got: ${jsToString(error.value)}`,
            error.message ? `(${error.message})` : '',
        ].filter(Boolean).join(' ');
    };
    const errorMessageUnion = function (expectedTypes, path, value, options) {
        return [
            'Expecting one of:\n',
            expectedTypes.map((type2) => `    ${truncateType(type2, options)}`).join('\n'),
            path === '' ? '\n' : `\nat ${path} `,
            `but instead got: ${jsToString(value)}`,
        ].filter(Boolean).join('');
    };
    const findExpectedType = function (ctx) {
        return pipeable_1.pipe(ctx, A.findIndex(isUnionType), O.chain((n) => A.lookup(n + 1, ctx)));
    };
    const formatValidationErrorOfUnion = function (path, errors, options) {
        const expectedTypes = pipeable_1.pipe(errors, A.map(getValidationContext), A.map(findExpectedType), A.compact);
        const value = pipeable_1.pipe(expectedTypes, A.head, O.map((v) => v.actual), O.getOrElse(() => void 0));
        const expected = expectedTypes.map((_a) => {
            const type2 = _a.type;
            return type2.name;
        });
        return expected.length > 0 ? O.some(errorMessageUnion(expected, path, value, options)) : O.none;
    };
    const formatValidationCommonError = function (path, error, options) {
        return pipeable_1.pipe(error, getErrorFromCtx, O.map((errorContext) => errorMessageSimple(errorContext.type.name, path, error, options)));
    };
    const groupByKey = NEA.groupBy((error) => pipeable_1.pipe(error.context, utils_12.takeUntil(isUnionType), keyPath));
    const format = function (path, errors, options) {
        return NEA.tail(errors).length > 0 ? formatValidationErrorOfUnion(path, errors, options) : formatValidationCommonError(path, NEA.head(errors), options);
    };
    const formatValidationError = function (error, options) {
        return formatValidationCommonError(keyPath(error.context), error, options);
    };
    exports.formatValidationError = formatValidationError;
    const formatValidationErrors = function (errors, options) {
        return pipeable_1.pipe(errors, groupByKey, R.mapWithIndex((path, errors2) => format(path, errors2, options)), R.compact, R.toArray, A.map((_a) => {
            _a[0];
            const error = _a[1];
            return error;
        }));
    };
    exports.formatValidationErrors = formatValidationErrors;
    const reporter = function (validation, options) {
        return pipeable_1.pipe(validation, E.mapLeft((errors) => exports.formatValidationErrors(errors, options)), E.fold((errors) => errors, () => []));
    };
    exports.reporter = reporter;
    const prettyReporter = { report: exports.reporter };
    exports.default = prettyReporter;
}(src));
const axios$2 = { exports: {} };
const bind$2 = function bind2(fn, thisArg) {
    return function wrap() {
        const args = new Array(arguments.length);
        for (let i = 0; i < args.length; i++) {
            args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
    };
};
const bind$1 = bind$2;
const { toString } = Object.prototype;
const kindOf = (function (cache) {
    return function (thing) {
        const str = toString.call(thing);
        return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
    };
}(/* @__PURE__ */ Object.create(null)));
function kindOfTest(type2) {
    type2 = type2.toLowerCase();
    return function isKindOf(thing) {
        return kindOf(thing) === type2;
    };
}
function isArray(val) {
    return Array.isArray(val);
}
function isUndefined(val) {
    return typeof val === 'undefined';
}
function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}
const isArrayBuffer = kindOfTest('ArrayBuffer');
function isArrayBufferView(val) {
    let result;
    if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
    } else {
        result = val && val.buffer && isArrayBuffer(val.buffer);
    }
    return result;
}
function isString(val) {
    return typeof val === 'string';
}
function isNumber(val) {
    return typeof val === 'number';
}
function isObject(val) {
    return val !== null && typeof val === 'object';
}
function isPlainObject(val) {
    if (kindOf(val) !== 'object') {
        return false;
    }
    const prototype2 = Object.getPrototypeOf(val);
    return prototype2 === null || prototype2 === Object.prototype;
}
const isDate = kindOfTest('Date');
const isFile = kindOfTest('File');
const isBlob = kindOfTest('Blob');
const isFileList = kindOfTest('FileList');
function isFunction(val) {
    return toString.call(val) === '[object Function]';
}
function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
}
function isFormData(thing) {
    const pattern = '[object FormData]';
    return thing && (typeof FormData === 'function' && thing instanceof FormData || toString.call(thing) === pattern || isFunction(thing.toString) && thing.toString() === pattern);
}
const isURLSearchParams = kindOfTest('URLSearchParams');
function trim(str) {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}
function isStandardBrowserEnv() {
    if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
        return false;
    }
    return typeof window !== 'undefined' && typeof document !== 'undefined';
}
function forEach(obj, fn) {
    if (obj === null || typeof obj === 'undefined') {
        return;
    }
    if (typeof obj !== 'object') {
        obj = [obj];
    }
    if (isArray(obj)) {
        for (let i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj);
        }
    } else {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj);
            }
        }
    }
}
function merge() {
    const result = {};
    function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
            result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
            result[key] = merge({}, val);
        } else if (isArray(val)) {
            result[key] = val.slice();
        } else {
            result[key] = val;
        }
    }
    for (let i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
    }
    return result;
}
function extend(a, b, thisArg) {
    forEach(b, (val, key) => {
        if (thisArg && typeof val === 'function') {
            a[key] = bind$1(val, thisArg);
        } else {
            a[key] = val;
        }
    });
    return a;
}
function stripBOM(content) {
    if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
    }
    return content;
}
function inherits(constructor, superConstructor, props, descriptors2) {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
    constructor.prototype.constructor = constructor;
    props && Object.assign(constructor.prototype, props);
}
function toFlatObject(sourceObj, destObj, filter2) {
    let props;
    let i;
    let prop;
    const merged = {};
    destObj = destObj || {};
    do {
        props = Object.getOwnPropertyNames(sourceObj);
        i = props.length;
        while (i-- > 0) {
            prop = props[i];
            if (!merged[prop]) {
                destObj[prop] = sourceObj[prop];
                merged[prop] = true;
            }
        }
        sourceObj = Object.getPrototypeOf(sourceObj);
    } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
    return destObj;
}
function endsWith(str, searchString, position) {
    str = String(str);
    if (position === void 0 || position > str.length) {
        position = str.length;
    }
    position -= searchString.length;
    const lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
}
function toArray(thing) {
    if (!thing) return null;
    let i = thing.length;
    if (isUndefined(i)) return null;
    const arr = new Array(i);
    while (i-- > 0) {
        arr[i] = thing[i];
    }
    return arr;
}
const isTypedArray = (function (TypedArray) {
    return function (thing) {
        return TypedArray && thing instanceof TypedArray;
    };
}(typeof Uint8Array !== 'undefined' && Object.getPrototypeOf(Uint8Array)));
const utils$i = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isObject,
    isPlainObject,
    isUndefined,
    isDate,
    isFile,
    isBlob,
    isFunction,
    isStream,
    isURLSearchParams,
    isStandardBrowserEnv,
    forEach,
    merge,
    extend,
    trim,
    stripBOM,
    inherits,
    toFlatObject,
    kindOf,
    kindOfTest,
    endsWith,
    toArray,
    isTypedArray,
    isFileList,
};
const utils$h = utils$i;
function encode(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']');
}
const buildURL$2 = function buildURL2(url2, params, paramsSerializer) {
    if (!params) {
        return url2;
    }
    let serializedParams;
    if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
    } else if (utils$h.isURLSearchParams(params)) {
        serializedParams = params.toString();
    } else {
        const parts = [];
        utils$h.forEach(params, (val, key) => {
            if (val === null || typeof val === 'undefined') {
                return;
            }
            if (utils$h.isArray(val)) {
                key = `${key}[]`;
            } else {
                val = [val];
            }
            utils$h.forEach(val, (v) => {
                if (utils$h.isDate(v)) {
                    v = v.toISOString();
                } else if (utils$h.isObject(v)) {
                    v = JSON.stringify(v);
                }
                parts.push(`${encode(key)}=${encode(v)}`);
            });
        });
        serializedParams = parts.join('&');
    }
    if (serializedParams) {
        const hashmarkIndex = url2.indexOf('#');
        if (hashmarkIndex !== -1) {
            url2 = url2.slice(0, hashmarkIndex);
        }
        url2 += (url2.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }
    return url2;
};
const utils$g = utils$i;
function InterceptorManager$1() {
    this.handlers = [];
}
InterceptorManager$1.prototype.use = function use(fulfilled, rejected, options) {
    this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null,
    });
    return this.handlers.length - 1;
};
InterceptorManager$1.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
        this.handlers[id] = null;
    }
};
InterceptorManager$1.prototype.forEach = function forEach2(fn) {
    utils$g.forEach(this.handlers, (h) => {
        if (h !== null) {
            fn(h);
        }
    });
};
const InterceptorManager_1 = InterceptorManager$1;
const utils$f = utils$i;
const normalizeHeaderName$1 = function normalizeHeaderName2(headers, normalizedName) {
    utils$f.forEach(headers, (value, name) => {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
            headers[normalizedName] = value;
            delete headers[name];
        }
    });
};
const utils$e = utils$i;
function AxiosError$5(message2, code, config2, request2, response) {
    Error.call(this);
    this.message = message2;
    this.name = 'AxiosError';
    code && (this.code = code);
    config2 && (this.config = config2);
    request2 && (this.request = request2);
    response && (this.response = response);
}
utils$e.inherits(AxiosError$5, Error, {
    toJSON: function toJSON2() {
        return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: this.config,
            code: this.code,
            status: this.response && this.response.status ? this.response.status : null,
        };
    },
});
const { prototype } = AxiosError$5;
const descriptors = {};
[
    'ERR_BAD_OPTION_VALUE',
    'ERR_BAD_OPTION',
    'ECONNABORTED',
    'ETIMEDOUT',
    'ERR_NETWORK',
    'ERR_FR_TOO_MANY_REDIRECTS',
    'ERR_DEPRECATED',
    'ERR_BAD_RESPONSE',
    'ERR_BAD_REQUEST',
    'ERR_CANCELED',
].forEach((code) => {
    descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError$5, descriptors);
Object.defineProperty(prototype, 'isAxiosError', { value: true });
AxiosError$5.from = function (error, code, config2, request2, response, customProps) {
    const axiosError = Object.create(prototype);
    utils$e.toFlatObject(error, axiosError, (obj) => obj !== Error.prototype);
    AxiosError$5.call(axiosError, error.message, code, config2, request2, response);
    axiosError.name = error.name;
    customProps && Object.assign(axiosError, customProps);
    return axiosError;
};
const AxiosError_1 = AxiosError$5;
const transitional = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false,
};
const utils$d = utils$i;
function toFormData$1(obj, formData) {
    formData = formData || new FormData();
    const stack = [];
    function convertValue(value) {
        if (value === null) return '';
        if (utils$d.isDate(value)) {
            return value.toISOString();
        }
        if (utils$d.isArrayBuffer(value) || utils$d.isTypedArray(value)) {
            return typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
        }
        return value;
    }
    function build(data2, parentKey) {
        if (utils$d.isPlainObject(data2) || utils$d.isArray(data2)) {
            if (stack.indexOf(data2) !== -1) {
                throw Error(`Circular reference detected in ${parentKey}`);
            }
            stack.push(data2);
            utils$d.forEach(data2, (value, key) => {
                if (utils$d.isUndefined(value)) return;
                const fullKey = parentKey ? `${parentKey}.${key}` : key;
                let arr;
                if (value && !parentKey && typeof value === 'object') {
                    if (utils$d.endsWith(key, '{}')) {
                        value = JSON.stringify(value);
                    } else if (utils$d.endsWith(key, '[]') && (arr = utils$d.toArray(value))) {
                        arr.forEach((el) => {
                            !utils$d.isUndefined(el) && formData.append(fullKey, convertValue(el));
                        });
                        return;
                    }
                }
                build(value, fullKey);
            });
            stack.pop();
        } else {
            formData.append(parentKey, convertValue(data2));
        }
    }
    build(obj);
    return formData;
}
const toFormData_1 = toFormData$1;
const AxiosError$4 = AxiosError_1;
const settle$1 = function settle2(resolve, reject, response) {
    const validateStatus2 = response.config.validateStatus;
    if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
        resolve(response);
    } else {
        reject(new AxiosError$4(
            `Request failed with status code ${response.status}`,
            [AxiosError$4.ERR_BAD_REQUEST, AxiosError$4.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
            response.config,
            response.request,
            response,
        ));
    }
};
const utils$c = utils$i;
const cookies$1 = utils$c.isStandardBrowserEnv() ? (function standardBrowserEnv() {
    return {
        write: function write3(name, value, expires, path, domain, secure) {
            const cookie = [];
            cookie.push(`${name}=${encodeURIComponent(value)}`);
            if (utils$c.isNumber(expires)) {
                cookie.push(`expires=${new Date(expires).toGMTString()}`);
            }
            if (utils$c.isString(path)) {
                cookie.push(`path=${path}`);
            }
            if (utils$c.isString(domain)) {
                cookie.push(`domain=${domain}`);
            }
            if (secure === true) {
                cookie.push('secure');
            }
            document.cookie = cookie.join('; ');
        },
        read: function read2(name) {
            const match2 = document.cookie.match(new RegExp(`(^|;\\s*)(${name})=([^;]*)`));
            return match2 ? decodeURIComponent(match2[3]) : null;
        },
        remove: function remove(name) {
            this.write(name, '', Date.now() - 864e5);
        },
    };
}()) : (function nonStandardBrowserEnv() {
    return {
        write: function write3() {
        },
        read: function read2() {
            return null;
        },
        remove: function remove() {
        },
    };
}());
const isAbsoluteURL$1 = function isAbsoluteURL2(url2) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url2);
};
const combineURLs$1 = function combineURLs2(baseURL, relativeURL) {
    return relativeURL ? `${baseURL.replace(/\/+$/, '')}/${relativeURL.replace(/^\/+/, '')}` : baseURL;
};
const isAbsoluteURL = isAbsoluteURL$1;
const combineURLs = combineURLs$1;
const buildFullPath$2 = function buildFullPath2(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
};
const utils$b = utils$i;
const ignoreDuplicateOf = [
    'age',
    'authorization',
    'content-length',
    'content-type',
    'etag',
    'expires',
    'from',
    'host',
    'if-modified-since',
    'if-unmodified-since',
    'last-modified',
    'location',
    'max-forwards',
    'proxy-authorization',
    'referer',
    'retry-after',
    'user-agent',
];
const parseHeaders$1 = function parseHeaders2(headers) {
    const parsed = {};
    let key;
    let val;
    let i;
    if (!headers) {
        return parsed;
    }
    utils$b.forEach(headers.split('\n'), (line) => {
        i = line.indexOf(':');
        key = utils$b.trim(line.substr(0, i)).toLowerCase();
        val = utils$b.trim(line.substr(i + 1));
        if (key) {
            if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
                return;
            }
            if (key === 'set-cookie') {
                parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
            } else {
                parsed[key] = parsed[key] ? `${parsed[key]}, ${val}` : val;
            }
        }
    });
    return parsed;
};
const utils$a = utils$i;
const isURLSameOrigin$1 = utils$a.isStandardBrowserEnv() ? (function standardBrowserEnv2() {
    const msie = /(msie|trident)/i.test(navigator.userAgent);
    const urlParsingNode = document.createElement('a');
    let originURL;
    function resolveURL(url2) {
        let href = url2;
        if (msie) {
            urlParsingNode.setAttribute('href', href);
            href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute('href', href);
        return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : `/${urlParsingNode.pathname}`,
        };
    }
    originURL = resolveURL(window.location.href);
    return function isURLSameOrigin2(requestURL) {
        const parsed = utils$a.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
    };
}()) : (function nonStandardBrowserEnv2() {
    return function isURLSameOrigin2() {
        return true;
    };
}());
const AxiosError$3 = AxiosError_1;
const utils$9 = utils$i;
function CanceledError$3(message2) {
    AxiosError$3.call(this, message2 == null ? 'canceled' : message2, AxiosError$3.ERR_CANCELED);
    this.name = 'CanceledError';
}
utils$9.inherits(CanceledError$3, AxiosError$3, {
    __CANCEL__: true,
});
const CanceledError_1 = CanceledError$3;
const parseProtocol$1 = function parseProtocol2(url2) {
    const match2 = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url2);
    return match2 && match2[1] || '';
};
const utils$8 = utils$i;
const settle = settle$1;
const cookies = cookies$1;
const buildURL$1 = buildURL$2;
const buildFullPath$1 = buildFullPath$2;
const parseHeaders = parseHeaders$1;
const isURLSameOrigin = isURLSameOrigin$1;
const transitionalDefaults$1 = transitional;
const AxiosError$2 = AxiosError_1;
const CanceledError$2 = CanceledError_1;
const parseProtocol = parseProtocol$1;
const xhr = function xhrAdapter(config2) {
    return new Promise((resolve, reject) => {
        let requestData = config2.data;
        const requestHeaders = config2.headers;
        const { responseType } = config2;
        let onCanceled;
        function done() {
            if (config2.cancelToken) {
                config2.cancelToken.unsubscribe(onCanceled);
            }
            if (config2.signal) {
                config2.signal.removeEventListener('abort', onCanceled);
            }
        }
        if (utils$8.isFormData(requestData) && utils$8.isStandardBrowserEnv()) {
            delete requestHeaders['Content-Type'];
        }
        let request2 = new XMLHttpRequest();
        if (config2.auth) {
            const username = config2.auth.username || '';
            const password = config2.auth.password ? unescape(encodeURIComponent(config2.auth.password)) : '';
            requestHeaders.Authorization = `Basic ${btoa(`${username}:${password}`)}`;
        }
        const fullPath = buildFullPath$1(config2.baseURL, config2.url);
        request2.open(config2.method.toUpperCase(), buildURL$1(fullPath, config2.params, config2.paramsSerializer), true);
        request2.timeout = config2.timeout;
        function onloadend() {
            if (!request2) {
                return;
            }
            const responseHeaders = 'getAllResponseHeaders' in request2 ? parseHeaders(request2.getAllResponseHeaders()) : null;
            const responseData = !responseType || responseType === 'text' || responseType === 'json' ? request2.responseText : request2.response;
            const response = {
                data: responseData,
                status: request2.status,
                statusText: request2.statusText,
                headers: responseHeaders,
                config: config2,
                request: request2,
            };
            settle((value) => {
                resolve(value);
                done();
            }, (err) => {
                reject(err);
                done();
            }, response);
            request2 = null;
        }
        if ('onloadend' in request2) {
            request2.onloadend = onloadend;
        } else {
            request2.onreadystatechange = function handleLoad() {
                if (!request2 || request2.readyState !== 4) {
                    return;
                }
                if (request2.status === 0 && !(request2.responseURL && request2.responseURL.indexOf('file:') === 0)) {
                    return;
                }
                setTimeout(onloadend);
            };
        }
        request2.onabort = function handleAbort() {
            if (!request2) {
                return;
            }
            reject(new AxiosError$2('Request aborted', AxiosError$2.ECONNABORTED, config2, request2));
            request2 = null;
        };
        request2.onerror = function handleError() {
            reject(new AxiosError$2('Network Error', AxiosError$2.ERR_NETWORK, config2, request2, request2));
            request2 = null;
        };
        request2.ontimeout = function handleTimeout() {
            let timeoutErrorMessage = config2.timeout ? `timeout of ${config2.timeout}ms exceeded` : 'timeout exceeded';
            const transitional3 = config2.transitional || transitionalDefaults$1;
            if (config2.timeoutErrorMessage) {
                timeoutErrorMessage = config2.timeoutErrorMessage;
            }
            reject(new AxiosError$2(
                timeoutErrorMessage,
                transitional3.clarifyTimeoutError ? AxiosError$2.ETIMEDOUT : AxiosError$2.ECONNABORTED,
                config2,
                request2,
            ));
            request2 = null;
        };
        if (utils$8.isStandardBrowserEnv()) {
            const xsrfValue = (config2.withCredentials || isURLSameOrigin(fullPath)) && config2.xsrfCookieName ? cookies.read(config2.xsrfCookieName) : void 0;
            if (xsrfValue) {
                requestHeaders[config2.xsrfHeaderName] = xsrfValue;
            }
        }
        if ('setRequestHeader' in request2) {
            utils$8.forEach(requestHeaders, (val, key) => {
                if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
                    delete requestHeaders[key];
                } else {
                    request2.setRequestHeader(key, val);
                }
            });
        }
        if (!utils$8.isUndefined(config2.withCredentials)) {
            request2.withCredentials = !!config2.withCredentials;
        }
        if (responseType && responseType !== 'json') {
            request2.responseType = config2.responseType;
        }
        if (typeof config2.onDownloadProgress === 'function') {
            request2.addEventListener('progress', config2.onDownloadProgress);
        }
        if (typeof config2.onUploadProgress === 'function' && request2.upload) {
            request2.upload.addEventListener('progress', config2.onUploadProgress);
        }
        if (config2.cancelToken || config2.signal) {
            onCanceled = function (cancel) {
                if (!request2) {
                    return;
                }
                reject(!cancel || cancel && cancel.type ? new CanceledError$2() : cancel);
                request2.abort();
                request2 = null;
            };
            config2.cancelToken && config2.cancelToken.subscribe(onCanceled);
            if (config2.signal) {
                config2.signal.aborted ? onCanceled() : config2.signal.addEventListener('abort', onCanceled);
            }
        }
        if (!requestData) {
            requestData = null;
        }
        const protocol = parseProtocol(fullPath);
        if (protocol && ['http', 'https', 'file'].indexOf(protocol) === -1) {
            reject(new AxiosError$2(`Unsupported protocol ${protocol}:`, AxiosError$2.ERR_BAD_REQUEST, config2));
            return;
        }
        request2.send(requestData);
    });
};
const _null = null;
const utils$7 = utils$i;
const normalizeHeaderName = normalizeHeaderName$1;
const AxiosError$1 = AxiosError_1;
const transitionalDefaults = transitional;
const toFormData = toFormData_1;
const DEFAULT_CONTENT_TYPE = {
    'Content-Type': 'application/x-www-form-urlencoded',
};
function setContentTypeIfUnset(headers, value) {
    if (!utils$7.isUndefined(headers) && utils$7.isUndefined(headers['Content-Type'])) {
        headers['Content-Type'] = value;
    }
}
function getDefaultAdapter() {
    let adapter;
    if (typeof XMLHttpRequest !== 'undefined') {
        adapter = xhr;
    } else if (typeof browser$1$1 !== 'undefined' && Object.prototype.toString.call(browser$1$1) === '[object process]') {
        adapter = xhr;
    }
    return adapter;
}
function stringifySafely(rawValue, parser, encoder) {
    if (utils$7.isString(rawValue)) {
        try {
            (parser || JSON.parse)(rawValue);
            return utils$7.trim(rawValue);
        } catch (e) {
            if (e.name !== 'SyntaxError') {
                throw e;
            }
        }
    }
    return (encoder || JSON.stringify)(rawValue);
}
var defaults$3 = {
    transitional: transitionalDefaults,
    adapter: getDefaultAdapter(),
    transformRequest: [function transformRequest(data2, headers) {
        normalizeHeaderName(headers, 'Accept');
        normalizeHeaderName(headers, 'Content-Type');
        if (utils$7.isFormData(data2) || utils$7.isArrayBuffer(data2) || utils$7.isBuffer(data2) || utils$7.isStream(data2) || utils$7.isFile(data2) || utils$7.isBlob(data2)) {
            return data2;
        }
        if (utils$7.isArrayBufferView(data2)) {
            return data2.buffer;
        }
        if (utils$7.isURLSearchParams(data2)) {
            setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
            return data2.toString();
        }
        const isObjectPayload = utils$7.isObject(data2);
        const contentType = headers && headers['Content-Type'];
        let isFileList2;
        if ((isFileList2 = utils$7.isFileList(data2)) || isObjectPayload && contentType === 'multipart/form-data') {
            const _FormData = this.env && this.env.FormData;
            return toFormData(isFileList2 ? { 'files[]': data2 } : data2, _FormData && new _FormData());
        } if (isObjectPayload || contentType === 'application/json') {
            setContentTypeIfUnset(headers, 'application/json');
            return stringifySafely(data2);
        }
        return data2;
    }],
    transformResponse: [function transformResponse(data2) {
        const transitional3 = this.transitional || defaults$3.transitional;
        const silentJSONParsing = transitional3 && transitional3.silentJSONParsing;
        const forcedJSONParsing = transitional3 && transitional3.forcedJSONParsing;
        const strictJSONParsing = !silentJSONParsing && this.responseType === 'json';
        if (strictJSONParsing || forcedJSONParsing && utils$7.isString(data2) && data2.length) {
            try {
                return JSON.parse(data2);
            } catch (e) {
                if (strictJSONParsing) {
                    if (e.name === 'SyntaxError') {
                        throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
                    }
                    throw e;
                }
            }
        }
        return data2;
    }],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
        FormData: _null,
    },
    validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
    },
    headers: {
        common: {
            'Accept': 'application/json, text/plain, */*',
        },
    },
};
utils$7.forEach(['delete', 'get', 'head'], (method) => {
    defaults$3.headers[method] = {};
});
utils$7.forEach(['post', 'put', 'patch'], (method) => {
    defaults$3.headers[method] = utils$7.merge(DEFAULT_CONTENT_TYPE);
});
const defaults_1 = defaults$3;
const utils$6 = utils$i;
const defaults$2 = defaults_1;
const transformData$1 = function transformData2(data2, headers, fns) {
    const context = this || defaults$2;
    utils$6.forEach(fns, (fn) => {
        data2 = fn.call(context, data2, headers);
    });
    return data2;
};
const isCancel$1 = function isCancel2(value) {
    return !!(value && value.__CANCEL__);
};
const utils$5 = utils$i;
const transformData = transformData$1;
const isCancel = isCancel$1;
const defaults$1 = defaults_1;
const CanceledError$1 = CanceledError_1;
function throwIfCancellationRequested(config2) {
    if (config2.cancelToken) {
        config2.cancelToken.throwIfRequested();
    }
    if (config2.signal && config2.signal.aborted) {
        throw new CanceledError$1();
    }
}
const dispatchRequest$1 = function dispatchRequest2(config2) {
    throwIfCancellationRequested(config2);
    config2.headers = config2.headers || {};
    config2.data = transformData.call(
        config2,
        config2.data,
        config2.headers,
        config2.transformRequest,
    );
    config2.headers = utils$5.merge(
        config2.headers.common || {},
        config2.headers[config2.method] || {},
        config2.headers,
    );
    utils$5.forEach(
        ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
        (method) => {
            delete config2.headers[method];
        },
    );
    const adapter = config2.adapter || defaults$1.adapter;
    return adapter(config2).then((response) => {
        throwIfCancellationRequested(config2);
        response.data = transformData.call(
            config2,
            response.data,
            response.headers,
            config2.transformResponse,
        );
        return response;
    }, (reason) => {
        if (!isCancel(reason)) {
            throwIfCancellationRequested(config2);
            if (reason && reason.response) {
                reason.response.data = transformData.call(
                    config2,
                    reason.response.data,
                    reason.response.headers,
                    config2.transformResponse,
                );
            }
        }
        return Promise.reject(reason);
    });
};
const utils$4 = utils$i;
const mergeConfig$2 = function mergeConfig2(config1, config2) {
    config2 = config2 || {};
    const config3 = {};
    function getMergedValue(target, source2) {
        if (utils$4.isPlainObject(target) && utils$4.isPlainObject(source2)) {
            return utils$4.merge(target, source2);
        } if (utils$4.isPlainObject(source2)) {
            return utils$4.merge({}, source2);
        } if (utils$4.isArray(source2)) {
            return source2.slice();
        }
        return source2;
    }
    function mergeDeepProperties(prop) {
        if (!utils$4.isUndefined(config2[prop])) {
            return getMergedValue(config1[prop], config2[prop]);
        } if (!utils$4.isUndefined(config1[prop])) {
            return getMergedValue(void 0, config1[prop]);
        }
    }
    function valueFromConfig2(prop) {
        if (!utils$4.isUndefined(config2[prop])) {
            return getMergedValue(void 0, config2[prop]);
        }
    }
    function defaultToConfig2(prop) {
        if (!utils$4.isUndefined(config2[prop])) {
            return getMergedValue(void 0, config2[prop]);
        } if (!utils$4.isUndefined(config1[prop])) {
            return getMergedValue(void 0, config1[prop]);
        }
    }
    function mergeDirectKeys(prop) {
        if (prop in config2) {
            return getMergedValue(config1[prop], config2[prop]);
        } if (prop in config1) {
            return getMergedValue(void 0, config1[prop]);
        }
    }
    const mergeMap = {
        'url': valueFromConfig2,
        'method': valueFromConfig2,
        'data': valueFromConfig2,
        'baseURL': defaultToConfig2,
        'transformRequest': defaultToConfig2,
        'transformResponse': defaultToConfig2,
        'paramsSerializer': defaultToConfig2,
        'timeout': defaultToConfig2,
        'timeoutMessage': defaultToConfig2,
        'withCredentials': defaultToConfig2,
        'adapter': defaultToConfig2,
        'responseType': defaultToConfig2,
        'xsrfCookieName': defaultToConfig2,
        'xsrfHeaderName': defaultToConfig2,
        'onUploadProgress': defaultToConfig2,
        'onDownloadProgress': defaultToConfig2,
        'decompress': defaultToConfig2,
        'maxContentLength': defaultToConfig2,
        'maxBodyLength': defaultToConfig2,
        'beforeRedirect': defaultToConfig2,
        'transport': defaultToConfig2,
        'httpAgent': defaultToConfig2,
        'httpsAgent': defaultToConfig2,
        'cancelToken': defaultToConfig2,
        'socketPath': defaultToConfig2,
        'responseEncoding': defaultToConfig2,
        'validateStatus': mergeDirectKeys,
    };
    utils$4.forEach(Object.keys(config1).concat(Object.keys(config2)), (prop) => {
        const merge2 = mergeMap[prop] || mergeDeepProperties;
        const configValue = merge2(prop);
        utils$4.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config3[prop] = configValue);
    });
    return config3;
};
const data = {
    'version': '0.27.2',
};
const VERSION = data.version;
const AxiosError = AxiosError_1;
const validators$1 = {};
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type2, i) => {
    validators$1[type2] = function validator2(thing) {
        return typeof thing === type2 || `a${i < 1 ? 'n ' : ' '}${type2}`;
    };
});
const deprecatedWarnings = {};
validators$1.transitional = function transitional2(validator2, version2, message2) {
    function formatMessage(opt, desc) {
        return `[Axios v${VERSION}] Transitional option '${opt}'${desc}${message2 ? `. ${message2}` : ''}`;
    }
    return function (value, opt, opts) {
        if (validator2 === false) {
            throw new AxiosError(
                formatMessage(opt, ` has been removed${version2 ? ` in ${version2}` : ''}`),
                AxiosError.ERR_DEPRECATED,
            );
        }
        if (version2 && !deprecatedWarnings[opt]) {
            deprecatedWarnings[opt] = true;
            console.warn(
                formatMessage(
                    opt,
                    ` has been deprecated since v${version2} and will be removed in the near future`,
                ),
            );
        }
        return validator2 ? validator2(value, opt, opts) : true;
    };
};
function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== 'object') {
        throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
    }
    const keys2 = Object.keys(options);
    let i = keys2.length;
    while (i-- > 0) {
        const opt = keys2[i];
        const validator2 = schema[opt];
        if (validator2) {
            const value = options[opt];
            const result = value === void 0 || validator2(value, opt, options);
            if (result !== true) {
                throw new AxiosError(`option ${opt} must be ${result}`, AxiosError.ERR_BAD_OPTION_VALUE);
            }
            continue;
        }
        if (allowUnknown !== true) {
            throw new AxiosError(`Unknown option ${opt}`, AxiosError.ERR_BAD_OPTION);
        }
    }
}
const validator$1 = {
    assertOptions,
    validators: validators$1,
};
const utils$3 = utils$i;
const buildURL = buildURL$2;
const InterceptorManager = InterceptorManager_1;
const dispatchRequest = dispatchRequest$1;
const mergeConfig$1 = mergeConfig$2;
const buildFullPath = buildFullPath$2;
const validator = validator$1;
const { validators } = validator;
function Axios$1(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager(),
    };
}
Axios$1.prototype.request = function request(configOrUrl, config2) {
    if (typeof configOrUrl === 'string') {
        config2 = config2 || {};
        config2.url = configOrUrl;
    } else {
        config2 = configOrUrl || {};
    }
    config2 = mergeConfig$1(this.defaults, config2);
    if (config2.method) {
        config2.method = config2.method.toLowerCase();
    } else if (this.defaults.method) {
        config2.method = this.defaults.method.toLowerCase();
    } else {
        config2.method = 'get';
    }
    const transitional3 = config2.transitional;
    if (transitional3 !== void 0) {
        validator.assertOptions(transitional3, {
            silentJSONParsing: validators.transitional(validators.boolean),
            forcedJSONParsing: validators.transitional(validators.boolean),
            clarifyTimeoutError: validators.transitional(validators.boolean),
        }, false);
    }
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach((interceptor) => {
        if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config2) === false) {
            return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach((interceptor) => {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    if (!synchronousRequestInterceptors) {
        let chain2 = [dispatchRequest, void 0];
        Array.prototype.unshift.apply(chain2, requestInterceptorChain);
        chain2 = chain2.concat(responseInterceptorChain);
        promise = Promise.resolve(config2);
        while (chain2.length) {
            promise = promise.then(chain2.shift(), chain2.shift());
        }
        return promise;
    }
    let newConfig = config2;
    while (requestInterceptorChain.length) {
        const onFulfilled = requestInterceptorChain.shift();
        const onRejected = requestInterceptorChain.shift();
        try {
            newConfig = onFulfilled(newConfig);
        } catch (error) {
            onRejected(error);
            break;
        }
    }
    try {
        promise = dispatchRequest(newConfig);
    } catch (error) {
        return Promise.reject(error);
    }
    while (responseInterceptorChain.length) {
        promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
    }
    return promise;
};
Axios$1.prototype.getUri = function getUri(config2) {
    config2 = mergeConfig$1(this.defaults, config2);
    const fullPath = buildFullPath(config2.baseURL, config2.url);
    return buildURL(fullPath, config2.params, config2.paramsSerializer);
};
utils$3.forEach(['delete', 'get', 'head', 'options'], (method) => {
    Axios$1.prototype[method] = function (url2, config2) {
        return this.request(mergeConfig$1(config2 || {}, {
            method,
            url: url2,
            data: (config2 || {}).data,
        }));
    };
});
utils$3.forEach(['post', 'put', 'patch'], (method) => {
    function generateHTTPMethod(isForm) {
        return function httpMethod(url2, data2, config2) {
            return this.request(mergeConfig$1(config2 || {}, {
                method,
                headers: isForm ? {
                    'Content-Type': 'multipart/form-data',
                } : {},
                url: url2,
                data: data2,
            }));
        };
    }
    Axios$1.prototype[method] = generateHTTPMethod();
    Axios$1.prototype[`${method}Form`] = generateHTTPMethod(true);
});
const Axios_1 = Axios$1;
const CanceledError = CanceledError_1;
function CancelToken(executor) {
    if (typeof executor !== 'function') {
        throw new TypeError('executor must be a function.');
    }
    let resolvePromise;
    this.promise = new Promise((resolve) => {
        resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
        if (!token._listeners) return;
        let i;
        const l = token._listeners.length;
        for (i = 0; i < l; i++) {
            token._listeners[i](cancel);
        }
        token._listeners = null;
    });
    this.promise.then = function (onfulfilled) {
        let _resolve;
        const promise = new Promise((resolve) => {
            token.subscribe(resolve);
            _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
            token.unsubscribe(_resolve);
        };
        return promise;
    };
    executor((message2) => {
        if (token.reason) {
            return;
        }
        token.reason = new CanceledError(message2);
        resolvePromise(token.reason);
    });
}
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
        throw this.reason;
    }
};
CancelToken.prototype.subscribe = function subscribe(listener) {
    if (this.reason) {
        listener(this.reason);
        return;
    }
    if (this._listeners) {
        this._listeners.push(listener);
    } else {
        this._listeners = [listener];
    }
};
CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
    if (!this._listeners) {
        return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
        this._listeners.splice(index, 1);
    }
};
CancelToken.source = function source() {
    let cancel;
    const token = new CancelToken((c) => {
        cancel = c;
    });
    return {
        token,
        cancel,
    };
};
const CancelToken_1 = CancelToken;
const spread = function spread2(callback) {
    return function wrap(arr) {
        return callback.apply(null, arr);
    };
};
const utils$2 = utils$i;
const isAxiosError = function isAxiosError2(payload) {
    return utils$2.isObject(payload) && payload.isAxiosError === true;
};
const utils$1 = utils$i;
const bind = bind$2;
const Axios = Axios_1;
const mergeConfig = mergeConfig$2;
const defaults = defaults_1;
function createInstance(defaultConfig) {
    const context = new Axios(defaultConfig);
    const instance = bind(Axios.prototype.request, context);
    utils$1.extend(instance, Axios.prototype, context);
    utils$1.extend(instance, context);
    instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
    };
    return instance;
}
const axios$1 = createInstance(defaults);
axios$1.Axios = Axios;
axios$1.CanceledError = CanceledError_1;
axios$1.CancelToken = CancelToken_1;
axios$1.isCancel = isCancel$1;
axios$1.VERSION = data.version;
axios$1.toFormData = toFormData_1;
axios$1.AxiosError = AxiosError_1;
axios$1.Cancel = axios$1.CanceledError;
axios$1.all = function all(promises) {
    return Promise.all(promises);
};
axios$1.spread = spread;
axios$1.isAxiosError = isAxiosError;
axios$2.exports = axios$1;
axios$2.exports.default = axios$1;
const axios = axios$2.exports;
const types$1 = {};
(function (exports) {
    const __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        let desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true,
                get() {
                    return m[k];
                } };
        }
        Object.defineProperty(o, k2, desc);
    } : function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
    });
    const __setModuleDefault2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
    } : function (o, v) {
        o['default'] = v;
    });
    const __importStar2 = commonjsGlobal && commonjsGlobal.__importStar || function (mod) {
        if (mod && mod.__esModule) return mod;
        const result = {};
        if (mod != null) {
            for (const k in mod) if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding2(result, mod, k);
        }
        __setModuleDefault2(result, mod);
        return result;
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.getBlockTransactions = exports.blockShortTxt = exports.getShards = exports.getMasterchain = exports.getTransactions = exports.transaction = exports.message = exports.messageData = exports.callGetMethod = exports.feeResponse = exports.bocResponse = exports.addressInformation = exports.blockIdExt = void 0;
    const t = __importStar2(require$$0);
    exports.blockIdExt = t.type({
        '@type': t.literal('ton.blockIdExt'),
        workchain: t.number,
        shard: t.string,
        seqno: t.number,
        root_hash: t.string,
        file_hash: t.string,
    });
    exports.addressInformation = t.type({
        balance: t.union([t.number, t.string]),
        state: t.union([t.literal('active'), t.literal('uninitialized'), t.literal('frozen')]),
        data: t.string,
        code: t.string,
        last_transaction_id: t.type({
            '@type': t.literal('internal.transactionId'),
            lt: t.string,
            hash: t.string,
        }),
        block_id: exports.blockIdExt,
        sync_utime: t.number,
    });
    exports.bocResponse = t.type({
        '@type': t.literal('ok'),
    });
    exports.feeResponse = t.type({
        '@type': t.literal('query.fees'),
        source_fees: t.type({
            '@type': t.literal('fees'),
            in_fwd_fee: t.number,
            storage_fee: t.number,
            gas_fee: t.number,
            fwd_fee: t.number,
        }),
    });
    exports.callGetMethod = t.type({
        gas_used: t.number,
        exit_code: t.number,
        stack: t.array(t.unknown),
    });
    exports.messageData = t.union([
        t.type({
            '@type': t.literal('msg.dataRaw'),
            body: t.string,
        }),
        t.type({
            '@type': t.literal('msg.dataText'),
            text: t.string,
        }),
        t.type({
            '@type': t.literal('msg.dataDecryptedText'),
            text: t.string,
        }),
        t.type({
            '@type': t.literal('msg.dataEncryptedText'),
            text: t.string,
        }),
    ]);
    exports.message = t.type({
        source: t.string,
        destination: t.string,
        value: t.string,
        fwd_fee: t.string,
        ihr_fee: t.string,
        created_lt: t.string,
        body_hash: t.string,
        msg_data: exports.messageData,
    });
    exports.transaction = t.type({
        data: t.string,
        utime: t.number,
        transaction_id: t.type({
            lt: t.string,
            hash: t.string,
        }),
        fee: t.string,
        storage_fee: t.string,
        other_fee: t.string,
        in_msg: t.union([t.undefined, exports.message]),
        out_msgs: t.array(exports.message),
    });
    exports.getTransactions = t.array(exports.transaction);
    exports.getMasterchain = t.type({
        state_root_hash: t.string,
        last: exports.blockIdExt,
        init: exports.blockIdExt,
    });
    exports.getShards = t.type({
        shards: t.array(exports.blockIdExt),
    });
    exports.blockShortTxt = t.type({
        '@type': t.literal('blocks.shortTxId'),
        mode: t.number,
        account: t.string,
        lt: t.string,
        hash: t.string,
    });
    exports.getBlockTransactions = t.type({
        id: exports.blockIdExt,
        req_count: t.number,
        incomplete: t.boolean,
        transactions: t.array(exports.blockShortTxt),
    });
}(types$1));
const Helpers = {};
Object.defineProperty(Helpers, '__esModule', { value: true });
Helpers.loadSnake = Helpers.base64ToHex = void 0;
const helpers_1$5 = helpers;
const ton3_core_1$9 = dist$3;
const base64ToHex = (base64) => (0, helpers_1$5.bytesToHex)((0, helpers_1$5.base64ToBytes)(base64));
Helpers.base64ToHex = base64ToHex;
const loadSnake = (slice3) => {
    const loadPart = (cellSlice, result) => {
        let newResult = new Uint8Array([...result, ...cellSlice.loadBytes(cellSlice.bits.length)]);
        if (cellSlice.refs.length > 0) {
            newResult = loadPart(ton3_core_1$9.Slice.parse(cellSlice.loadRef()), newResult);
        }
        return newResult;
    };
    return loadPart(slice3, new Uint8Array());
};
Helpers.loadSnake = loadSnake;
const __importDefault$7 = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { 'default': mod };
};
Object.defineProperty(HttpApi$1, '__esModule', { value: true });
HttpApi$1.HttpApi = void 0;
const ton3_core_1$8 = dist$3;
const Either_1 = Either$1;
const io_ts_reporters_1 = __importDefault$7(src);
const axios_1$1 = __importDefault$7(axios);
const types_1 = types$1;
const Helpers_1$3 = Helpers;
class HttpApi {
    constructor(endpoint, parameters) {
        this.endpoint = endpoint;
        this.parameters = {
            timeout: parameters?.timeout || 3e4,
            apiKey: parameters?.apiKey,
        };
    }

    getAddressInformation(address2) {
        return this.doCall('getAddressInformation', { address: address2.toString() }, types_1.addressInformation);
    }

    async getTransactions(address2, opts) {
        const { inclusive } = opts;
        delete opts.inclusive;
        let hash2;
        if (opts.hash) {
            hash2 = (0, Helpers_1$3.base64ToHex)(opts.hash);
        }
        let { limit } = opts;
        if (opts.hash && opts.lt && !inclusive) {
            limit++;
        }
        let res = await this.doCall('getTransactions', {
            address: address2.toString(),
            ...opts,
            limit,
            hash: hash2,
        }, types_1.getTransactions);
        if (res.length > limit) {
            res = res.slice(0, limit);
        }
        if (opts.hash && opts.lt && !inclusive) {
            res.shift();
            return res;
        }
        return res;
    }

    async getMasterchainInfo() {
        return this.doCall('getMasterchainInfo', {}, types_1.getMasterchain);
    }

    async getTransaction(address2, lt, hash2) {
        const convHash = (0, Helpers_1$3.base64ToHex)(hash2);
        const res = await this.doCall('getTransactions', {
            address: address2.toString(),
            lt,
            hash: convHash,
            limit: 1,
        }, types_1.getTransactions);
        const ex = res.find((v) => v.transaction_id.lt === lt && v.transaction_id.hash === hash2);
        if (ex) {
            return ex;
        }
        return null;
    }

    async callGetMethod(address2, method, params) {
        return this.doCall('runGetMethod', { address: address2.toString(), method, stack: params }, types_1.callGetMethod);
    }

    async sendBoc(body) {
        await this.doCall('sendBoc', { boc: ton3_core_1$8.BOC.toBase64Standard(body, { has_index: false }) }, types_1.bocResponse);
    }

    async estimateFee(address2, args) {
        return this.doCall('estimateFee', {
            address: address2.toString(),
            body: ton3_core_1$8.BOC.toBase64Standard(args.body, { has_index: false }),
            init_data: args.initData ? ton3_core_1$8.BOC.toBase64Standard(args.initData, { has_index: false }) : '',
            init_code: args.initCode ? ton3_core_1$8.BOC.toBase64Standard(args.initCode, { has_index: false }) : '',
            ignore_chksig: args.ignoreSignature,
        }, types_1.feeResponse);
    }

    async doCall(method, body, codec) {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.parameters.apiKey) {
            headers['X-API-Key'] = this.parameters.apiKey;
        }
        const res = await axios_1$1.default.post(this.endpoint, JSON.stringify({
            id: '1',
            jsonrpc: '2.0',
            method,
            params: body,
        }), {
            headers,
            timeout: this.parameters.timeout,
        });
        if (res.status !== 200 || !res.data.ok) {
            throw Error(`Received error: ${JSON.stringify(res.data)}`);
        }
        const decoded = codec.decode(res.data.result);
        if ((0, Either_1.isRight)(decoded)) {
            return decoded.right;
        }
        throw Error(`Malformed response: ${io_ts_reporters_1.default.report(decoded).join(', ')}`);
    }
}
HttpApi$1.HttpApi = HttpApi;
const GetMethodParser$1 = {};
Object.defineProperty(GetMethodParser$1, '__esModule', { value: true });
const ton3_core_1$7 = dist$3;
class GetMethodParser {
    static parseObject(x) {
        const typeName = x['@type'];
        switch (typeName) {
            case 'tvm.list':
            case 'tvm.tuple':
                return x.elements.map(GetMethodParser.parseObject);
            case 'tvm.cell':
                return ton3_core_1$7.BOC.from(x.bytes)[0];
            case 'tvm.stackEntryCell':
                return GetMethodParser.parseObject(x.cell);
            case 'tvm.stackEntryTuple':
                return GetMethodParser.parseObject(x.tuple);
            case 'tvm.stackEntryNumber':
                return GetMethodParser.parseObject(x.number);
            case 'tvm.numberDecimal':
                return x.number.slice(0, 1) === '-' ? BigInt(0) - BigInt(x.number.slice(1)) : BigInt(x.number);
            default:
                throw new Error(`unknown type ${typeName}`);
        }
    }

    static parseResponseStack(pair) {
        const typeName = pair[0];
        const value = pair[1];
        switch (typeName) {
            case 'num':
                return value.slice(0, 1) === '-' ? BigInt(0) - BigInt(value.slice(1)) : BigInt(value);
            case 'list':
            case 'tuple':
                return GetMethodParser.parseObject(value);
            case 'cell':
                return ton3_core_1$7.BOC.from(value.bytes)[0];
            default:
                throw new Error(`unknown type ${typeName}`);
        }
    }

    static parseRawResult(result) {
        return this.parseStack(result.stack);
    }

    static parseStack(stack) {
        return stack.map(GetMethodParser.parseResponseStack);
    }

    static makeArg(arg) {
        if (arg instanceof BigInt || arg instanceof Number) {
            return ['num', arg];
        }
        throw new Error(`unknown arg type ${arg}`);
    }

    static makeArgs(args) {
        return args.map(this.makeArg);
    }
}
GetMethodParser$1.default = GetMethodParser;
const utils = {};
Object.defineProperty(utils, '__esModule', { value: true });
utils.convertTransaction = utils.convertMessage = void 0;
const ton3_core_1$6 = dist$3;
const helpers_1$4 = helpers;
function convertMessage(t) {
    return {
        source: t.source !== '' ? new ton3_core_1$6.Address(t.source) : null,
        destination: t.destination !== '' ? new ton3_core_1$6.Address(t.destination) : null,
        forwardFee: new ton3_core_1$6.Coins(t.fwd_fee, { isNano: true }),
        ihrFee: new ton3_core_1$6.Coins(t.ihr_fee, { isNano: true }),
        value: new ton3_core_1$6.Coins(t.value, { isNano: true }),
        createdLt: t.created_lt,
        body: t.msg_data['@type'] === 'msg.dataRaw' ? { type: 'data', data: (0, helpers_1$4.base64ToBytes)(t.msg_data.body) } : t.msg_data['@type'] === 'msg.dataText' ? { type: 'text', text: (0, helpers_1$4.bytesToString)((0, helpers_1$4.base64ToBytes)(t.msg_data.text)) } : null,
    };
}
utils.convertMessage = convertMessage;
function convertTransaction(r) {
    return {
        id: { lt: r.transaction_id.lt, hash: r.transaction_id.hash },
        time: r.utime,
        data: r.data,
        storageFee: new ton3_core_1$6.Coins(r.storage_fee, { isNano: true }),
        otherFee: new ton3_core_1$6.Coins(r.other_fee, { isNano: true }),
        fee: new ton3_core_1$6.Coins(r.fee, { isNano: true }),
        inMessage: r.in_msg ? convertMessage(r.in_msg) : null,
        outMessages: r.out_msgs.map(convertMessage),
    };
}
utils.convertTransaction = convertTransaction;
const DNS = {};
const Dns$1 = {};
const DnsUtils = {};
(function (exports) {
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.dnsResolve = exports.domainToBuffer = exports.dnsResolveImpl = exports.parseNextResolverRecord = exports.parseSmartContractAddressRecord = exports.parseSmartContractAddressImpl = exports.createNextResolverRecord = exports.createAdnlAddressRecord = exports.createSmartContractAddressRecord = exports.categoryToBigInt = exports.DNS_CATEGORY_SITE = exports.DNS_CATEGORY_WALLET = exports.DNS_CATEGORY_NEXT_RESOLVER = void 0;
    const hash_12 = hash$1;
    const helpers_12 = helpers;
    const ton3_core_12 = dist$3;
    exports.DNS_CATEGORY_NEXT_RESOLVER = 'dns_next_resolver';
    exports.DNS_CATEGORY_WALLET = 'wallet';
    exports.DNS_CATEGORY_SITE = 'site';
    function categoryToBigInt(category) {
        if (!category) return BigInt(0);
        const categoryBytes = (0, helpers_12.stringToBytes)(category);
        const categoryHash = (0, hash_12.sha256)(categoryBytes);
        return BigInt(`0x${categoryHash}`);
    }
    exports.categoryToBigInt = categoryToBigInt;
    function createSmartContractAddressRecord(smartContractAddress) {
        return new ton3_core_12.Builder().storeUint(40915, 16).storeAddress(smartContractAddress).storeUint(0, 8)
            .cell();
    }
    exports.createSmartContractAddressRecord = createSmartContractAddressRecord;
    function createAdnlAddressRecord(adnlAddress) {
        return new ton3_core_12.Builder().storeUint(44289, 16).storeUint(adnlAddress, 256).storeUint(0, 8)
            .cell();
    }
    exports.createAdnlAddressRecord = createAdnlAddressRecord;
    function createNextResolverRecord(smartContractAddress) {
        return new ton3_core_12.Builder().storeUint(47763, 16).storeAddress(smartContractAddress).cell();
    }
    exports.createNextResolverRecord = createNextResolverRecord;
    function parseSmartContractAddressImpl(cell2, prefix0, prefix1) {
        const ds = ton3_core_12.Slice.parse(cell2);
        if (ds.loadUint(8) !== prefix0 || ds.loadUint(8) !== prefix1) throw new Error('Invalid dns record value prefix');
        return ds.loadAddress();
    }
    exports.parseSmartContractAddressImpl = parseSmartContractAddressImpl;
    function parseSmartContractAddressRecord(cell2) {
        return parseSmartContractAddressImpl(cell2, 159, 211);
    }
    exports.parseSmartContractAddressRecord = parseSmartContractAddressRecord;
    function parseNextResolverRecord(cell2) {
        return parseSmartContractAddressImpl(cell2, 186, 147);
    }
    exports.parseNextResolverRecord = parseNextResolverRecord;
    async function dnsResolveImpl(client, dnsAddress, rawDomainBytes, category, oneStep) {
        const len = rawDomainBytes.length * 8;
        const domainCell = new ton3_core_12.Builder().storeBytes(rawDomainBytes).cell();
        const categoryBigInt = categoryToBigInt(category);
        const { stack } = await client.callGetMethod(dnsAddress, 'dnsresolve', [['tvm.Slice', ton3_core_12.BOC.toBase64Standard(domainCell, { has_index: false })], ['num', categoryBigInt.toString()]]);
        if (stack.length !== 2) {
            throw new Error('Invalid dnsresolve response');
        }
        const resultLen = Number(stack[0]);
        const cell2 = stack[1];
        if (cell2 && !cell2.bits) {
            throw new Error('Invalid dnsresolve response');
        }
        if (resultLen === 0) {
            return null;
        }
        if (resultLen % 8 !== 0) {
            throw new Error('domain split not at a component boundary');
        }
        if (resultLen > len) {
            throw new Error(`invalid response ${resultLen}/${len}`);
        } else if (resultLen === len) {
            if (category === exports.DNS_CATEGORY_NEXT_RESOLVER) {
                return cell2 ? parseNextResolverRecord(cell2) : null;
            }
            if (category === exports.DNS_CATEGORY_WALLET) {
                return cell2 ? parseSmartContractAddressRecord(cell2) : null;
            }
            if (category === exports.DNS_CATEGORY_SITE) {
                return cell2 || null;
            }
            return cell2;
        } else {
            if (!cell2) {
                return null;
            }
            const nextAddress = parseNextResolverRecord(cell2);
            if (oneStep) {
                if (category === exports.DNS_CATEGORY_NEXT_RESOLVER) {
                    return nextAddress;
                }
                return null;
            }
            return dnsResolveImpl(client, nextAddress, rawDomainBytes.slice(resultLen / 8), category, false);
        }
    }
    exports.dnsResolveImpl = dnsResolveImpl;
    function domainToBuffer(domain) {
        if (!domain || !domain.length) {
            throw new Error('empty domain');
        }
        if (domain === '.') {
            return Buffer.from([0]);
        }
        const domainNorm = domain.toLowerCase();
        for (let i = 0; i < domainNorm.length; i++) {
            if (domainNorm.charCodeAt(i) <= 32) {
                throw new Error('bytes in range 0..32 are not allowed in domain names');
            }
        }
        for (let i = 0; i < domainNorm.length; i++) {
            const s = domainNorm.substring(i, i + 1);
            for (let c = 127; c <= 159; c++) {
                if (s === String.fromCharCode(c)) {
                    throw new Error('bytes in range 127..159 are not allowed in domain names');
                }
            }
        }
        const arr = domainNorm.split('.');
        arr.forEach((part) => {
            if (!part.length) {
                throw new Error('domain name cannot have an empty component');
            }
        });
        const rawDomain = `\0${arr.reverse().join('\0')}\0`;
        return Buffer.from(rawDomain, 'utf-8');
    }
    exports.domainToBuffer = domainToBuffer;
    async function dnsResolve(client, rootDnsAddress, domain, category, oneStep) {
        const rawDomainBuffer = domainToBuffer(domain);
        return dnsResolveImpl(client, rootDnsAddress, rawDomainBuffer, category, oneStep);
    }
    exports.dnsResolve = dnsResolve;
}(DnsUtils));
Object.defineProperty(Dns$1, '__esModule', { value: true });
Dns$1.Dns = void 0;
const ton3_core_1$5 = dist$3;
const DnsUtils_1 = DnsUtils;
const testnetRootDnsAddress = 'Ef_v5x0Thgr6pq6ur2NvkWhIf4DxAxsL-Nk5rknT6n99oPKX';
const mainnetRootDnsAddress = 'Ef-OJd0IF0yc0xkhgaAirq12WawqnUoSuE9RYO3S7McG6lDh';
class Dns {
    constructor(client) {
        this.client = client;
    }

    getRootDnsAddress() {
        if (this.client.isTestnet()) {
            return new ton3_core_1$5.Address(testnetRootDnsAddress);
        }
        return new ton3_core_1$5.Address(mainnetRootDnsAddress);
    }

    async resolve(domain, category, oneStep = false) {
        return (0, DnsUtils_1.dnsResolve)(this.client, this.getRootDnsAddress(), domain, category, oneStep);
    }

    getWalletAddress(domain) {
        return this.resolve(domain, DnsUtils_1.DNS_CATEGORY_WALLET);
    }
}
Dns$1.Dns = Dns;
(function (exports) {
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.Dns = void 0;
    const Dns_1 = Dns$1;
    Object.defineProperty(exports, 'Dns', { enumerable: true,
        get() {
            return Dns_1.Dns;
        } });
}(DNS));
const Jetton$2 = {};
const Jetton$1 = {};
const parseMetadata$1 = {};
const constants = {};
Object.defineProperty(constants, '__esModule', { value: true });
constants.IPFS_GATEWAY_PREFIX = constants.JettonMetadataKeys = constants.NFTMetadataKeys = constants.CommonMetadataKeys = constants.DataFormat = constants.ContentLayout = constants.JettonOperation = void 0;
let JettonOperation;
(function (JettonOperation2) {
    JettonOperation2[JettonOperation2['TRANSFER'] = 260734629] = 'TRANSFER';
    JettonOperation2[JettonOperation2['TRANSFER_NOTIFICATION'] = 1935855772] = 'TRANSFER_NOTIFICATION';
    JettonOperation2[JettonOperation2['INTERNAL_TRANSFER'] = 395134233] = 'INTERNAL_TRANSFER';
    JettonOperation2[JettonOperation2['EXCESSES'] = 3576854235] = 'EXCESSES';
    JettonOperation2[JettonOperation2['BURN'] = 1499400124] = 'BURN';
    JettonOperation2[JettonOperation2['BURN_NOTIFICATION'] = 2078119902] = 'BURN_NOTIFICATION';
}(JettonOperation || (JettonOperation = {})));
constants.JettonOperation = JettonOperation;
let ContentLayout;
(function (ContentLayout2) {
    ContentLayout2[ContentLayout2['ONCHAIN'] = 0] = 'ONCHAIN';
    ContentLayout2[ContentLayout2['OFFCHAIN'] = 1] = 'OFFCHAIN';
}(ContentLayout || (ContentLayout = {})));
constants.ContentLayout = ContentLayout;
let DataFormat;
(function (DataFormat2) {
    DataFormat2[DataFormat2['SNAKE'] = 0] = 'SNAKE';
    DataFormat2[DataFormat2['CHUNK'] = 1] = 'CHUNK';
}(DataFormat || (DataFormat = {})));
constants.DataFormat = DataFormat;
const CommonMetadataKeys = {
    uri: BigInt('0x70e5d7b6a29b392f85076fe15ca2f2053c56c2338728c4e33c9e8ddb1ee827cc'),
    name: BigInt('0x82a3537ff0dbce7eec35d69edc3a189ee6f17d82f353a553f9aa96cb0be3ce89'),
    description: BigInt('0xc9046f7a37ad0ea7cee73355984fa5428982f8b37c8f7bcec91f7ac71a7cd104'),
    image: BigInt('0x6105d6cc76af400325e94d588ce511be5bfdbb73b437dc51eca43917d7a43e3d'),
    image_data: BigInt('0xd9a88ccec79eef59c84b671136a20ece4cd00caaad5bc47e2c208829154ee9e4'),
};
constants.CommonMetadataKeys = CommonMetadataKeys;
const NFTMetadataKeys = {
    ...CommonMetadataKeys,
    attributes: BigInt('0xf1b4db36f908e557e2321176b6d345f5a700d4fba979381605327fdc1c8adbf7'),
};
constants.NFTMetadataKeys = NFTMetadataKeys;
const JettonMetadataKeys = {
    ...CommonMetadataKeys,
    symbol: BigInt('0xb76a7ca153c24671658335bbd08946350ffc621fa1c516e7123095d4ffd5c581'),
    decimals: BigInt('0xee80fd2f1e03480e2282363596ee752d7bb27f50776b95086a0279189675923e'),
};
constants.JettonMetadataKeys = JettonMetadataKeys;
const IPFS_GATEWAY_PREFIX = 'https://ipfs.io/ipfs/';
constants.IPFS_GATEWAY_PREFIX = IPFS_GATEWAY_PREFIX;
const __importDefault$6 = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { 'default': mod };
};
Object.defineProperty(parseMetadata$1, '__esModule', { value: true });
parseMetadata$1.parseMetadata = void 0;
const ton3_core_1$4 = dist$3;
const helpers_1$3 = helpers;
const axios_1 = __importDefault$6(axios);
const constants_1$4 = constants;
const Helpers_1$2 = Helpers;
const uriToJson = async (uri) => {
    const res = await axios_1.default.get(uri.replace(/^ipfs:\/\//, constants_1$4.IPFS_GATEWAY_PREFIX), { timeout: 6e4 });
    if (res.status !== 200) {
        throw Error(`Received error: ${JSON.stringify(res.data)}`);
    }
    return res.data;
};
const parseOnchain = async (content, keys2 = constants_1$4.JettonMetadataKeys) => {
    const deserializers = {
        key: (k) => ton3_core_1$4.Slice.parse(new ton3_core_1$4.Builder().storeBits(k).cell()).loadBigUint(256),
        value: (v) => v.refs[0],
    };
    const parsed = [...ton3_core_1$4.Hashmap.parse(256, ton3_core_1$4.Slice.parse(content.refs[0]), { deserializers })];
    const normalize2 = parsed.map((elem2) => {
        const name = Object.keys(keys2).find((key) => keys2[key] === elem2[0]);
        const ds = ton3_core_1$4.Slice.parse(elem2[1]);
        if (ds.bits.length < 8) return [name, ''];
        const prefix = ds.loadUint(8);
        switch (prefix) {
            case constants_1$4.DataFormat.SNAKE:
                return [name, (0, helpers_1$3.bytesToString)((0, Helpers_1$2.loadSnake)(ds))];
            case constants_1$4.DataFormat.CHUNK:
                return [name, ''];
            default:
                return [name, ''];
        }
    });
    const metadata = Object.fromEntries(normalize2);
    return Object.fromEntries(Object.keys(keys2).map((key) => [key, key in metadata ? metadata[key] : '']));
};
const parseOffchain = async (content, keys2 = constants_1$4.JettonMetadataKeys) => {
    const uri = (0, helpers_1$3.bytesToString)((0, Helpers_1$2.loadSnake)(ton3_core_1$4.Slice.parse(content).skip(8)));
    const metadata = await uriToJson(uri);
    return Object.fromEntries(Object.keys(keys2).map((key) => [key, key in metadata ? metadata[key] : '']));
};
const parseMetadata = async (content, keys2 = constants_1$4.JettonMetadataKeys) => {
    const ds = ton3_core_1$4.Slice.parse(content);
    if (ds.bits.length < 8) {
        throw Error('Invalid metadata');
    }
    const contentLayout = ds.loadUint(8);
    switch (contentLayout) {
        case constants_1$4.ContentLayout.ONCHAIN:
            return parseOnchain(content, keys2);
        case constants_1$4.ContentLayout.OFFCHAIN:
            return parseOffchain(content, keys2);
        default:
            throw Error('Invalid metadata prefix');
    }
};
parseMetadata$1.parseMetadata = parseMetadata;
const parseTransferTransaction$1 = {};
Object.defineProperty(parseTransferTransaction$1, '__esModule', { value: true });
parseTransferTransaction$1.parseTransferTransaction = void 0;
const ton3_core_1$3 = dist$3;
const helpers_1$2 = helpers;
const Helpers_1$1 = Helpers;
const constants_1$3 = constants;
function parseTransferTransaction(bodySlice, transaction, decimals) {
    const queryId = bodySlice.loadBigUint(64);
    const amount = bodySlice.loadCoins(decimals);
    const destination = bodySlice.loadAddress();
    bodySlice.loadAddress();
    bodySlice.skipDict();
    const forwardTonAmount = bodySlice.loadCoins();
    const forwardPayload = bodySlice.loadBit() ? ton3_core_1$3.Slice.parse(bodySlice.loadRef()) : bodySlice;
    let comment;
    let data2;
    if (forwardPayload.bits.length > 0) {
        data2 = ton3_core_1$3.BOC.toBase64Standard(new ton3_core_1$3.Builder().storeSlice(bodySlice).cell(), { has_index: false });
    }
    if (forwardPayload.bits.length >= 32) {
        const op = bodySlice.loadUint(32);
        if (op === 0) {
            comment = (0, helpers_1$2.bytesToString)((0, Helpers_1$1.loadSnake)(bodySlice));
        }
    }
    return {
        operation: constants_1$3.JettonOperation.TRANSFER,
        time: transaction.time,
        queryId,
        amount,
        destination,
        comment,
        data: data2,
        forwardTonAmount,
    };
}
parseTransferTransaction$1.parseTransferTransaction = parseTransferTransaction;
const parseInternalTransferTransaction$1 = {};
Object.defineProperty(parseInternalTransferTransaction$1, '__esModule', { value: true });
parseInternalTransferTransaction$1.parseInternalTransferTransaction = void 0;
const ton3_core_1$2 = dist$3;
const helpers_1$1 = helpers;
const Helpers_1 = Helpers;
const constants_1$2 = constants;
function parseInternalTransferTransaction(bodySlice, transaction, decimals) {
    const queryId = bodySlice.loadBigUint(64);
    const amount = bodySlice.loadCoins(decimals);
    const from2 = bodySlice.loadAddress();
    bodySlice.loadAddress();
    const forwardTonAmount = bodySlice.loadCoins();
    const forwardPayload = bodySlice.loadBit() ? ton3_core_1$2.Slice.parse(bodySlice.loadRef()) : bodySlice;
    let comment;
    let data2;
    if (forwardPayload.bits.length > 0) {
        data2 = ton3_core_1$2.BOC.toBase64Standard(new ton3_core_1$2.Builder().storeSlice(bodySlice).cell(), { has_index: false });
    }
    if (forwardPayload.bits.length >= 32) {
        const op = bodySlice.loadUint(32);
        if (op === 0) {
            comment = (0, helpers_1$1.bytesToString)((0, Helpers_1.loadSnake)(bodySlice));
        }
    }
    return {
        operation: constants_1$2.JettonOperation.INTERNAL_TRANSFER,
        time: transaction.time,
        queryId,
        amount,
        from: from2,
        comment,
        data: data2,
        forwardTonAmount,
    };
}
parseInternalTransferTransaction$1.parseInternalTransferTransaction = parseInternalTransferTransaction;
const parseBurnTransaction$1 = {};
Object.defineProperty(parseBurnTransaction$1, '__esModule', { value: true });
parseBurnTransaction$1.parseBurnTransaction = void 0;
const constants_1$1 = constants;
function parseBurnTransaction(bodySlice, transaction, decimals) {
    const queryId = bodySlice.loadBigUint(64);
    const amount = bodySlice.loadCoins(decimals);
    return {
        operation: constants_1$1.JettonOperation.BURN,
        time: transaction.time,
        queryId,
        amount,
    };
}
parseBurnTransaction$1.parseBurnTransaction = parseBurnTransaction;
Object.defineProperty(Jetton$1, '__esModule', { value: true });
Jetton$1.Jetton = void 0;
const ton3_core_1$1 = dist$3;
const parseMetadata_1 = parseMetadata$1;
const constants_1 = constants;
const parseTransferTransaction_1 = parseTransferTransaction$1;
const parseInternalTransferTransaction_1 = parseInternalTransferTransaction$1;
const parseBurnTransaction_1 = parseBurnTransaction$1;
class Jetton {
    constructor(client) {
        this.client = client;
    }

    async getWalletAddress(jettonMasterContract, walletOwner) {
        const ownerAddressCell = new ton3_core_1$1.Builder().storeAddress(walletOwner).cell();
        const { stack } = await this.client.callGetMethod(jettonMasterContract, 'get_wallet_address', [
            [
                'tvm.Slice',
                ton3_core_1$1.BOC.toBase64Standard(ownerAddressCell, { has_index: false }),
            ],
        ]);
        return ton3_core_1$1.Slice.parse(stack[0]).preloadAddress();
    }

    async getData(jettonMasterContract, opts) {
        const { stack } = await this.client.callGetMethod(jettonMasterContract, 'get_jetton_data', []);
        const totalSupply = stack[0];
        const adminAddress = ton3_core_1$1.Slice.parse(stack[2]).loadAddress();
        const contentCell = stack[3];
        const jettonWalletCode = stack[4];
        return {
            totalSupply,
            adminAddress,
            content: await (0, parseMetadata_1.parseMetadata)(contentCell, opts?.metadataKeys),
            jettonWalletCode,
        };
    }

    async getDecimals(jettonMasterContract) {
        const { content } = await this.getData(jettonMasterContract);
        return ~~content.decimals || 9;
    }

    async getDecimalsByWallet(jettonWallet) {
        const { jettonMasterAddress } = await this.getWalletData(jettonWallet);
        return this.getDecimals(jettonMasterAddress);
    }

    async getWalletData(jettonWallet) {
        const { stack, exitCode } = await this.client.callGetMethod(jettonWallet, 'get_wallet_data', []);
        if (exitCode === -13) throw new Error('Jetton wallet is not deployed.');
        if (exitCode !== 0) throw new Error('Cannot retrieve jetton wallet data.');
        const jettonMasterAddress = ton3_core_1$1.Slice.parse(stack[2]).preloadAddress();
        const decimals = await this.getDecimals(jettonMasterAddress);
        const balance = new ton3_core_1$1.Coins(stack[0], { isNano: true, decimals });
        const ownerAddress = ton3_core_1$1.Slice.parse(stack[1]).preloadAddress();
        const jettonWalletCode = stack[3];
        return {
            balance,
            ownerAddress,
            jettonMasterAddress,
            jettonWalletCode,
        };
    }

    async getBalance(jettonWallet) {
        const { balance } = await this.getWalletData(jettonWallet);
        return balance;
    }

    async getTransactions(jettonWallet, limit = 5, decimals) {
        const transactions = await this.client.getTransactions(jettonWallet, { limit });
        const jettonDecimals = decimals ?? await this.getDecimalsByWallet(jettonWallet);
        return transactions.map((transaction) => {
            if (transaction.inMessage?.body?.type !== 'data') {
                return null;
            }
            const bodySlice = ton3_core_1$1.Slice.parse(ton3_core_1$1.BOC.fromStandard(transaction.inMessage.body.data));
            const operation = bodySlice.loadUint(32);
            try {
                switch (operation) {
                    case constants_1.JettonOperation.TRANSFER:
                        return (0, parseTransferTransaction_1.parseTransferTransaction)(bodySlice, transaction, jettonDecimals);
                    case constants_1.JettonOperation.INTERNAL_TRANSFER:
                        return (0, parseInternalTransferTransaction_1.parseInternalTransferTransaction)(bodySlice, transaction, jettonDecimals);
                    case constants_1.JettonOperation.BURN:
                        return (0, parseBurnTransaction_1.parseBurnTransaction)(bodySlice, transaction, jettonDecimals);
                    default:
                        return null;
                }
            } catch {
                return null;
            }
        }).filter((transaction) => !!transaction);
    }
}
Jetton$1.Jetton = Jetton;
(function (exports) {
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.Jetton = void 0;
    const Jetton_12 = Jetton$1;
    Object.defineProperty(exports, 'Jetton', { enumerable: true,
        get() {
            return Jetton_12.Jetton;
        } });
}(Jetton$2));
const __classPrivateFieldSet = commonjsGlobal && commonjsGlobal.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
    if (kind === 'm') throw new TypeError('Private method is not writable');
    if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a setter');
    if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver)) throw new TypeError('Cannot write private member to an object whose class did not declare it');
    return kind === 'a' ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
const __classPrivateFieldGet = commonjsGlobal && commonjsGlobal.__classPrivateFieldGet || function (receiver, state, kind, f) {
    if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a getter');
    if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver)) throw new TypeError('Cannot read private member from an object whose class did not declare it');
    return kind === 'm' ? f : kind === 'a' ? f.call(receiver) : f ? f.value : state.get(receiver);
};
const __importDefault$5 = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { 'default': mod };
};
let _TonClient_api;
Object.defineProperty(Client, '__esModule', { value: true });
Client.TonClient = void 0;
const ton3_core_1 = dist$3;
const helpers_1 = helpers;
const HttpApi_1 = HttpApi$1;
const GetMethodParser_1 = __importDefault$5(GetMethodParser$1);
const utils_1 = utils;
const DNS_1 = DNS;
const Jetton_1 = Jetton$2;
class TonClient {
    constructor(parameters) {
        _TonClient_api.set(this, void 0);
        this.parameters = {
            endpoint: parameters.endpoint,
        };
        __classPrivateFieldSet(this, _TonClient_api, new HttpApi_1.HttpApi(this.parameters.endpoint, {
            timeout: parameters.timeout,
            apiKey: parameters.apiKey,
        }), 'f');
        this.DNS = new DNS_1.Dns(this);
        this.Jetton = new Jetton_1.Jetton(this);
    }

    isTestnet() {
        return __classPrivateFieldGet(this, _TonClient_api, 'f').endpoint.indexOf('testnet') > -1;
    }

    async callGetMethod(address2, name, params = []) {
        const res = await __classPrivateFieldGet(this, _TonClient_api, 'f').callGetMethod(address2, name, params);
        return {
            gasUsed: res.gas_used,
            stack: GetMethodParser_1.default.parseStack(res.stack),
            exitCode: res.exit_code,
        };
    }

    async getTransactions(address2, opts) {
        try {
            const tx = await __classPrivateFieldGet(this, _TonClient_api, 'f').getTransactions(address2, opts);
            const res = [];
            for (const r of tx) {
                res.push((0, utils_1.convertTransaction)(r));
            }
            return res;
        } catch {
            return [];
        }
    }

    async getBalance(address2) {
        return (await this.getContractState(address2)).balance;
    }

    async isContractDeployed(address2) {
        return (await this.getContractState(address2)).state === 'active';
    }

    async getContractState(address2) {
        const info = await __classPrivateFieldGet(this, _TonClient_api, 'f').getAddressInformation(address2);
        const balance = new ton3_core_1.Coins(info.balance, { isNano: true });
        const { state } = info;
        return {
            balance,
            state,
            code: info.code !== '' ? (0, helpers_1.base64ToBytes)(info.code) : null,
            data: info.data !== '' ? (0, helpers_1.base64ToBytes)(info.data) : null,
            lastTransaction: info.last_transaction_id.lt !== '0' ? {
                lt: info.last_transaction_id.lt,
                hash: info.last_transaction_id.hash,
            } : null,
            blockId: {
                workchain: info.block_id.workchain,
                shard: info.block_id.shard,
                seqno: info.block_id.seqno,
            },
            timestamp: info.sync_utime,
        };
    }

    async sendMessage(src2, key) {
        await this.sendBoc(src2.sign(key));
    }

    async sendBoc(src2) {
        await __classPrivateFieldGet(this, _TonClient_api, 'f').sendBoc(src2);
    }

    async getEstimateFee(src2) {
        const msgSlice = ton3_core_1.Slice.parse(src2 instanceof ton3_core_1.Cell ? src2 : src2.sign((0, helpers_1.hexToBytes)('4a41991bb2834030d8587e12dd0e8140c181316db51b289890ccd4f64e41345f4a41991bb2834030d8587e12dd0e8140c181316db51b289890ccd4f64e41345f')));
        msgSlice.skip(2);
        msgSlice.loadAddress();
        const address2 = msgSlice.loadAddress();
        if (!address2) throw Error('Invalid Address (addr_none)');
        msgSlice.loadCoins();
        let body;
        let initCode;
        let initData;
        const parseState = (stateSlice) => {
            let data2;
            let code;
            const maybeDepth = stateSlice.loadBit();
            if (maybeDepth) stateSlice.skip(5);
            const maybeTickTock = stateSlice.loadBit();
            if (maybeTickTock) stateSlice.skip(2);
            const maybeCode = stateSlice.loadBit();
            if (maybeCode) code = stateSlice.loadRef();
            const maybeData = stateSlice.loadBit();
            if (maybeData) data2 = stateSlice.loadRef();
            stateSlice.skipDict();
            return { data: data2, code };
        };
        const maybeState = msgSlice.loadBit();
        if (maybeState) {
            const eitherState = msgSlice.loadBit();
            if (eitherState) {
                const stateSlice = ton3_core_1.Slice.parse(msgSlice.loadRef());
                const { data: data2, code } = parseState(stateSlice);
                initData = data2;
                initCode = code;
            } else {
                const stateSlice = ton3_core_1.Slice.parse(msgSlice.loadRef());
                const { data: data2, code } = parseState(stateSlice);
                initData = data2;
                initCode = code;
            }
        }
        const eitherBody = msgSlice.loadBit();
        if (eitherBody) {
            body = msgSlice.loadRef();
        } else {
            body = new ton3_core_1.Builder().storeSlice(msgSlice).cell();
        }
        const { source_fees: { in_fwd_fee, storage_fee, gas_fee, fwd_fee } } = await __classPrivateFieldGet(this, _TonClient_api, 'f').estimateFee(address2, {
            body,
            initData,
            initCode,
            ignoreSignature: true,
        });
        return {
            inFwdFee: new ton3_core_1.Coins(in_fwd_fee, { isNano: true }),
            storageFee: new ton3_core_1.Coins(storage_fee, { isNano: true }),
            gasFee: new ton3_core_1.Coins(gas_fee, { isNano: true }),
            fwdFee: new ton3_core_1.Coins(fwd_fee, { isNano: true }),
        };
    }
}
Client.TonClient = TonClient;
_TonClient_api = /* @__PURE__ */ new WeakMap();
const types = {};
Object.defineProperty(types, '__esModule', { value: true });
(function (exports) {
    const __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        let desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true,
                get() {
                    return m[k];
                } };
        }
        Object.defineProperty(o, k2, desc);
    } : function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
    });
    const __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function (m, exports2) {
        for (const p in m) if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding2(exports2, m, p);
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    __exportStar(Client, exports);
    __exportStar(types, exports);
    __exportStar(constants, exports);
}(Client$1));
(function (exports) {
    const __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        let desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true,
                get() {
                    return m[k];
                } };
        }
        Object.defineProperty(o, k2, desc);
    } : function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
    });
    const __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function (m, exports2) {
        for (const p in m) if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding2(exports2, m, p);
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    __exportStar(Client$1, exports);
}(dist$1));
const url = 'https://api.tonhold.com/jsonRPC';
const apiKey = 'e6eaf213704bad78af061adcbf153727584277b4149c4b16e3a5809ad7b71671';
const tonClient = new dist$1.TonClient({
    endpoint: url,
    apiKey,
});
const dist = {};
const sha256$3 = {};
const sha = { exports: {} };
(function (module, exports) {
    !(function (n, r) {
        module.exports = r();
    }(commonjsGlobal, () => {
        const n = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        function r(n2, r2, t2, e2) {
            let i2; let o2; let u2; const f2 = r2 || [0]; const w2 = (t2 = t2 || 0) >>> 3; const
                s2 = e2 === -1 ? 3 : 0;
            for (i2 = 0; i2 < n2.length; i2 += 1) o2 = (u2 = i2 + w2) >>> 2, f2.length <= o2 && f2.push(0), f2[o2] |= n2[i2] << 8 * (s2 + e2 * (u2 % 4));
            return { value: f2, binLen: 8 * n2.length + t2 };
        }
        function t(t2, e2, i2) {
            switch (e2) {
                case 'UTF8':
                case 'UTF16BE':
                case 'UTF16LE':
                    break;
                default:
                    throw new Error('encoding must be UTF8, UTF16BE, or UTF16LE');
            }
            switch (t2) {
                case 'HEX':
                    return function (n2, r2, t3) {
                        return (function (n3, r3, t4, e3) {
                            let i3; let o2; let u2; let
                                f2;
                            if (n3.length % 2 != 0) throw new Error('String of HEX type must be in byte increments');
                            const w2 = r3 || [0]; const s2 = (t4 = t4 || 0) >>> 3; const
                                a2 = e3 === -1 ? 3 : 0;
                            for (i3 = 0; i3 < n3.length; i3 += 2) {
                                if (o2 = parseInt(n3.substr(i3, 2), 16), isNaN(o2)) throw new Error('String of HEX type contains invalid characters');
                                for (u2 = (f2 = (i3 >>> 1) + s2) >>> 2; w2.length <= u2;) w2.push(0);
                                w2[u2] |= o2 << 8 * (a2 + e3 * (f2 % 4));
                            }
                            return { value: w2, binLen: 4 * n3.length + t4 };
                        }(n2, r2, t3, i2));
                    };
                case 'TEXT':
                    return function (n2, r2, t3) {
                        return (function (n3, r3, t4, e3, i3) {
                            let o2; let u2; let f2; let w2; let s2; let a2; let h2; let c2; let v2 = 0; const A2 = t4 || [0]; const
                                E2 = (e3 = e3 || 0) >>> 3;
                            if (r3 === 'UTF8') {
                                for (h2 = i3 === -1 ? 3 : 0, f2 = 0; f2 < n3.length; f2 += 1) {
                                    for (u2 = [], (o2 = n3.charCodeAt(f2)) < 128 ? u2.push(o2) : o2 < 2048 ? (u2.push(192 | o2 >>> 6), u2.push(128 | 63 & o2)) : o2 < 55296 || o2 >= 57344 ? u2.push(224 | o2 >>> 12, 128 | o2 >>> 6 & 63, 128 | 63 & o2) : (f2 += 1, o2 = 65536 + ((1023 & o2) << 10 | 1023 & n3.charCodeAt(f2)), u2.push(240 | o2 >>> 18, 128 | o2 >>> 12 & 63, 128 | o2 >>> 6 & 63, 128 | 63 & o2)), w2 = 0; w2 < u2.length; w2 += 1) {
                                        for (s2 = (a2 = v2 + E2) >>> 2; A2.length <= s2;) A2.push(0);
                                        A2[s2] |= u2[w2] << 8 * (h2 + i3 * (a2 % 4)), v2 += 1;
                                    }
                                }
                            } else {
                                for (h2 = i3 === -1 ? 2 : 0, c2 = r3 === 'UTF16LE' && i3 !== 1 || r3 !== 'UTF16LE' && i3 === 1, f2 = 0; f2 < n3.length; f2 += 1) {
                                    for (o2 = n3.charCodeAt(f2), c2 === true && (o2 = (w2 = 255 & o2) << 8 | o2 >>> 8), s2 = (a2 = v2 + E2) >>> 2; A2.length <= s2;) A2.push(0);
                                    A2[s2] |= o2 << 8 * (h2 + i3 * (a2 % 4)), v2 += 2;
                                }
                            }
                            return { value: A2, binLen: 8 * v2 + e3 };
                        }(n2, e2, r2, t3, i2));
                    };
                case 'B64':
                    return function (r2, t3, e3) {
                        return (function (r3, t4, e4, i3) {
                            let o2; let u2; let f2; let w2; let s2; let a2; let h2 = 0; const c2 = t4 || [0]; const v2 = (e4 = e4 || 0) >>> 3; const A2 = i3 === -1 ? 3 : 0; const
                                E2 = r3.indexOf('=');
                            if (r3.search(/^[a-zA-Z0-9=+/]+$/) === -1) throw new Error('Invalid character in base-64 string');
                            if (r3 = r3.replace(/=/g, ''), E2 !== -1 && E2 < r3.length) throw new Error("Invalid '=' found in base-64 string");
                            for (o2 = 0; o2 < r3.length; o2 += 4) {
                                for (w2 = r3.substr(o2, 4), f2 = 0, u2 = 0; u2 < w2.length; u2 += 1) f2 |= n.indexOf(w2.charAt(u2)) << 18 - 6 * u2;
                                for (u2 = 0; u2 < w2.length - 1; u2 += 1) {
                                    for (s2 = (a2 = h2 + v2) >>> 2; c2.length <= s2;) c2.push(0);
                                    c2[s2] |= (f2 >>> 16 - 8 * u2 & 255) << 8 * (A2 + i3 * (a2 % 4)), h2 += 1;
                                }
                            }
                            return { value: c2, binLen: 8 * h2 + e4 };
                        }(r2, t3, e3, i2));
                    };
                case 'BYTES':
                    return function (n2, r2, t3) {
                        return (function (n3, r3, t4, e3) {
                            let i3; let o2; let u2; let f2; const w2 = r3 || [0]; const s2 = (t4 = t4 || 0) >>> 3; const
                                a2 = e3 === -1 ? 3 : 0;
                            for (o2 = 0; o2 < n3.length; o2 += 1) i3 = n3.charCodeAt(o2), u2 = (f2 = o2 + s2) >>> 2, w2.length <= u2 && w2.push(0), w2[u2] |= i3 << 8 * (a2 + e3 * (f2 % 4));
                            return { value: w2, binLen: 8 * n3.length + t4 };
                        }(n2, r2, t3, i2));
                    };
                case 'ARRAYBUFFER':
                    try {
                        new ArrayBuffer(0);
                    } catch (n2) {
                        throw new Error('ARRAYBUFFER not supported by this environment');
                    }
                    return function (n2, t3, e3) {
                        return (function (n3, t4, e4, i3) {
                            return r(new Uint8Array(n3), t4, e4, i3);
                        }(n2, t3, e3, i2));
                    };
                case 'UINT8ARRAY':
                    try {
                        new Uint8Array(0);
                    } catch (n2) {
                        throw new Error('UINT8ARRAY not supported by this environment');
                    }
                    return function (n2, t3, e3) {
                        return r(n2, t3, e3, i2);
                    };
                default:
                    throw new Error('format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY');
            }
        }
        function e(r2, t2, e2, i2) {
            switch (r2) {
                case 'HEX':
                    return function (n2) {
                        return (function (n3, r3, t3, e3) {
                            let i3; let o2; let u2 = ''; const f2 = r3 / 8; const
                                w2 = t3 === -1 ? 3 : 0;
                            for (i3 = 0; i3 < f2; i3 += 1) o2 = n3[i3 >>> 2] >>> 8 * (w2 + t3 * (i3 % 4)), u2 += '0123456789abcdef'.charAt(o2 >>> 4 & 15) + '0123456789abcdef'.charAt(15 & o2);
                            return e3.outputUpper ? u2.toUpperCase() : u2;
                        }(n2, t2, e2, i2));
                    };
                case 'B64':
                    return function (r3) {
                        return (function (r4, t3, e3, i3) {
                            let o2; let u2; let f2; let w2; let s2; let a2 = ''; const h2 = t3 / 8; const
                                c2 = e3 === -1 ? 3 : 0;
                            for (o2 = 0; o2 < h2; o2 += 3) for (w2 = o2 + 1 < h2 ? r4[o2 + 1 >>> 2] : 0, s2 = o2 + 2 < h2 ? r4[o2 + 2 >>> 2] : 0, f2 = (r4[o2 >>> 2] >>> 8 * (c2 + e3 * (o2 % 4)) & 255) << 16 | (w2 >>> 8 * (c2 + e3 * ((o2 + 1) % 4)) & 255) << 8 | s2 >>> 8 * (c2 + e3 * ((o2 + 2) % 4)) & 255, u2 = 0; u2 < 4; u2 += 1) a2 += 8 * o2 + 6 * u2 <= t3 ? n.charAt(f2 >>> 6 * (3 - u2) & 63) : i3.b64Pad;
                            return a2;
                        }(r3, t2, e2, i2));
                    };
                case 'BYTES':
                    return function (n2) {
                        return (function (n3, r3, t3) {
                            let e3; let i3; let o2 = ''; const u2 = r3 / 8; const
                                f2 = t3 === -1 ? 3 : 0;
                            for (e3 = 0; e3 < u2; e3 += 1) i3 = n3[e3 >>> 2] >>> 8 * (f2 + t3 * (e3 % 4)) & 255, o2 += String.fromCharCode(i3);
                            return o2;
                        }(n2, t2, e2));
                    };
                case 'ARRAYBUFFER':
                    try {
                        new ArrayBuffer(0);
                    } catch (n2) {
                        throw new Error('ARRAYBUFFER not supported by this environment');
                    }
                    return function (n2) {
                        return (function (n3, r3, t3) {
                            let e3; const i3 = r3 / 8; const o2 = new ArrayBuffer(i3); const u2 = new Uint8Array(o2); const
                                f2 = t3 === -1 ? 3 : 0;
                            for (e3 = 0; e3 < i3; e3 += 1) u2[e3] = n3[e3 >>> 2] >>> 8 * (f2 + t3 * (e3 % 4)) & 255;
                            return o2;
                        }(n2, t2, e2));
                    };
                case 'UINT8ARRAY':
                    try {
                        new Uint8Array(0);
                    } catch (n2) {
                        throw new Error('UINT8ARRAY not supported by this environment');
                    }
                    return function (n2) {
                        return (function (n3, r3, t3) {
                            let e3; const i3 = r3 / 8; const o2 = t3 === -1 ? 3 : 0; const
                                u2 = new Uint8Array(i3);
                            for (e3 = 0; e3 < i3; e3 += 1) u2[e3] = n3[e3 >>> 2] >>> 8 * (o2 + t3 * (e3 % 4)) & 255;
                            return u2;
                        }(n2, t2, e2));
                    };
                default:
                    throw new Error('format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY');
            }
        }
        const i = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]; const o = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]; const u = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]; const
            f = 'Chosen SHA variant is not supported';
        function w(n2, r2) {
            let t2; let e2; const i2 = n2.binLen >>> 3; const o2 = r2.binLen >>> 3; const u2 = i2 << 3; const
                f2 = 4 - i2 << 3;
            if (i2 % 4 != 0) {
                for (t2 = 0; t2 < o2; t2 += 4) e2 = i2 + t2 >>> 2, n2.value[e2] |= r2.value[t2 >>> 2] << u2, n2.value.push(0), n2.value[e2 + 1] |= r2.value[t2 >>> 2] >>> f2;
                return (n2.value.length << 2) - 4 >= o2 + i2 && n2.value.pop(), { value: n2.value, binLen: n2.binLen + r2.binLen };
            }
            return { value: n2.value.concat(r2.value), binLen: n2.binLen + r2.binLen };
        }
        function s(n2) {
            const r2 = { outputUpper: false, b64Pad: '=', outputLen: -1 }; const t2 = n2 || {}; const
                e2 = 'Output length must be a multiple of 8';
            if (r2.outputUpper = t2.outputUpper || false, t2.b64Pad && (r2.b64Pad = t2.b64Pad), t2.outputLen) {
                if (t2.outputLen % 8 != 0) throw new Error(e2);
                r2.outputLen = t2.outputLen;
            } else if (t2.shakeLen) {
                if (t2.shakeLen % 8 != 0) throw new Error(e2);
                r2.outputLen = t2.shakeLen;
            }
            if (typeof r2.outputUpper !== 'boolean') throw new Error('Invalid outputUpper formatting option');
            if (typeof r2.b64Pad !== 'string') throw new Error('Invalid b64Pad formatting option');
            return r2;
        }
        function a(n2, r2, e2, i2) {
            const o2 = `${n2} must include a value and format`;
            if (!r2) {
                if (!i2) throw new Error(o2);
                return i2;
            }
            if (void 0 === r2.value || !r2.format) throw new Error(o2);
            return t(r2.format, r2.encoding || 'UTF8', e2)(r2.value);
        }
        const h = (function () {
            function n2(n3, r2, t2) {
                const e2 = t2 || {};
                if (this.t = r2, this.i = e2.encoding || 'UTF8', this.numRounds = e2.numRounds || 1, isNaN(this.numRounds) || this.numRounds !== parseInt(this.numRounds, 10) || this.numRounds < 1) throw new Error('numRounds must a integer >= 1');
                this.o = n3, this.u = [], this.s = 0, this.h = false, this.v = 0, this.A = false, this.l = [], this.H = [];
            }
            return n2.prototype.update = function (n3) {
                let r2; let t2 = 0; const e2 = this.S >>> 5; const i2 = this.p(n3, this.u, this.s); const o2 = i2.binLen; const u2 = i2.value; const
                    f2 = o2 >>> 5;
                for (r2 = 0; r2 < f2; r2 += e2) t2 + this.S <= o2 && (this.m = this.R(u2.slice(r2, r2 + e2), this.m), t2 += this.S);
                this.v += t2, this.u = u2.slice(t2 >>> 5), this.s = o2 % this.S, this.h = true;
            }, n2.prototype.getHash = function (n3, r2) {
                let t2; let i2; let o2 = this.U; const
                    u2 = s(r2);
                if (this.T) {
                    if (u2.outputLen === -1) throw new Error('Output length must be specified in options');
                    o2 = u2.outputLen;
                }
                const f2 = e(n3, o2, this.C, u2);
                if (this.A && this.F) return f2(this.F(u2));
                for (i2 = this.K(this.u.slice(), this.s, this.v, this.B(this.m), o2), t2 = 1; t2 < this.numRounds; t2 += 1) this.T && o2 % 32 != 0 && (i2[i2.length - 1] &= 16777215 >>> 24 - o2 % 32), i2 = this.K(i2, o2, 0, this.L(this.o), o2);
                return f2(i2);
            }, n2.prototype.setHMACKey = function (n3, r2, e2) {
                if (!this.g) throw new Error('Variant does not support HMAC');
                if (this.h) throw new Error('Cannot set MAC key after calling update');
                const i2 = t(r2, (e2 || {}).encoding || 'UTF8', this.C);
                this.k(i2(n3));
            }, n2.prototype.k = function (n3) {
                let r2; const t2 = this.S >>> 3; const
                    e2 = t2 / 4 - 1;
                if (this.numRounds !== 1) throw new Error('Cannot set numRounds with MAC');
                if (this.A) throw new Error('MAC key already set');
                for (t2 < n3.binLen / 8 && (n3.value = this.K(n3.value, n3.binLen, 0, this.L(this.o), this.U)); n3.value.length <= e2;) n3.value.push(0);
                for (r2 = 0; r2 <= e2; r2 += 1) this.l[r2] = 909522486 ^ n3.value[r2], this.H[r2] = 1549556828 ^ n3.value[r2];
                this.m = this.R(this.l, this.m), this.v = this.S, this.A = true;
            }, n2.prototype.getHMAC = function (n3, r2) {
                const t2 = s(r2);
                return e(n3, this.U, this.C, t2)(this.Y());
            }, n2.prototype.Y = function () {
                let n3;
                if (!this.A) throw new Error('Cannot call getHMAC without first setting MAC key');
                const r2 = this.K(this.u.slice(), this.s, this.v, this.B(this.m), this.U);
                return n3 = this.R(this.H, this.L(this.o)), n3 = this.K(r2, this.U, this.S, n3, this.U);
            }, n2;
        }());
        let c = function (n2, r2) {
            return (c = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (n3, r3) {
                n3.__proto__ = r3;
            } || function (n3, r3) {
                for (const t2 in r3) Object.prototype.hasOwnProperty.call(r3, t2) && (n3[t2] = r3[t2]);
            })(n2, r2);
        };
        function v(n2, r2) {
            function t2() {
                this.constructor = n2;
            }
            c(n2, r2), n2.prototype = r2 === null ? Object.create(r2) : (t2.prototype = r2.prototype, new t2());
        }
        function A(n2, r2) {
            return n2 << r2 | n2 >>> 32 - r2;
        }
        function E(n2, r2) {
            return n2 >>> r2 | n2 << 32 - r2;
        }
        function l(n2, r2) {
            return n2 >>> r2;
        }
        function b(n2, r2, t2) {
            return n2 ^ r2 ^ t2;
        }
        function H(n2, r2, t2) {
            return n2 & r2 ^ ~n2 & t2;
        }
        function d(n2, r2, t2) {
            return n2 & r2 ^ n2 & t2 ^ r2 & t2;
        }
        function S(n2) {
            return E(n2, 2) ^ E(n2, 13) ^ E(n2, 22);
        }
        function p(n2, r2) {
            const t2 = (65535 & n2) + (65535 & r2);
            return (65535 & (n2 >>> 16) + (r2 >>> 16) + (t2 >>> 16)) << 16 | 65535 & t2;
        }
        function m(n2, r2, t2, e2) {
            const i2 = (65535 & n2) + (65535 & r2) + (65535 & t2) + (65535 & e2);
            return (65535 & (n2 >>> 16) + (r2 >>> 16) + (t2 >>> 16) + (e2 >>> 16) + (i2 >>> 16)) << 16 | 65535 & i2;
        }
        function y(n2, r2, t2, e2, i2) {
            const o2 = (65535 & n2) + (65535 & r2) + (65535 & t2) + (65535 & e2) + (65535 & i2);
            return (65535 & (n2 >>> 16) + (r2 >>> 16) + (t2 >>> 16) + (e2 >>> 16) + (i2 >>> 16) + (o2 >>> 16)) << 16 | 65535 & o2;
        }
        function R(n2) {
            return E(n2, 7) ^ E(n2, 18) ^ l(n2, 3);
        }
        function U(n2) {
            return E(n2, 6) ^ E(n2, 11) ^ E(n2, 25);
        }
        function T(n2) {
            return [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
        }
        function C(n2, r2) {
            let t2; let e2; let i2; let o2; let u2; let f2; let w2; const
                s2 = [];
            for (t2 = r2[0], e2 = r2[1], i2 = r2[2], o2 = r2[3], u2 = r2[4], w2 = 0; w2 < 80; w2 += 1) s2[w2] = w2 < 16 ? n2[w2] : A(s2[w2 - 3] ^ s2[w2 - 8] ^ s2[w2 - 14] ^ s2[w2 - 16], 1), f2 = w2 < 20 ? y(A(t2, 5), H(e2, i2, o2), u2, 1518500249, s2[w2]) : w2 < 40 ? y(A(t2, 5), b(e2, i2, o2), u2, 1859775393, s2[w2]) : w2 < 60 ? y(A(t2, 5), d(e2, i2, o2), u2, 2400959708, s2[w2]) : y(A(t2, 5), b(e2, i2, o2), u2, 3395469782, s2[w2]), u2 = o2, o2 = i2, i2 = A(e2, 30), e2 = t2, t2 = f2;
            return r2[0] = p(t2, r2[0]), r2[1] = p(e2, r2[1]), r2[2] = p(i2, r2[2]), r2[3] = p(o2, r2[3]), r2[4] = p(u2, r2[4]), r2;
        }
        function F(n2, r2, t2, e2) {
            for (var i2, o2 = 15 + (r2 + 65 >>> 9 << 4), u2 = r2 + t2; n2.length <= o2;) n2.push(0);
            for (n2[r2 >>> 5] |= 128 << 24 - r2 % 32, n2[o2] = 4294967295 & u2, n2[o2 - 1] = u2 / 4294967296 | 0, i2 = 0; i2 < n2.length; i2 += 16) e2 = C(n2.slice(i2, i2 + 16), e2);
            return e2;
        }
        const K = (function (n2) {
            function r2(r3, e2, i2) {
                let o2 = this;
                if (r3 !== 'SHA-1') throw new Error(f);
                const u2 = i2 || {};
                return (o2 = n2.call(this, r3, e2, i2) || this).g = true, o2.F = o2.Y, o2.C = -1, o2.p = t(o2.t, o2.i, o2.C), o2.R = C, o2.B = function (n3) {
                    return n3.slice();
                }, o2.L = T, o2.K = F, o2.m = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], o2.S = 512, o2.U = 160, o2.T = false, u2.hmacKey && o2.k(a('hmacKey', u2.hmacKey, o2.C)), o2;
            }
            return v(r2, n2), r2;
        }(h));
        function B(n2) {
            return n2 == 'SHA-224' ? o.slice() : u.slice();
        }
        function L(n2, r2) {
            let t2; let e2; let o2; let u2; let f2; let w2; let s2; let a2; let h2; let c2; let v2; let A2; const
                b2 = [];
            for (t2 = r2[0], e2 = r2[1], o2 = r2[2], u2 = r2[3], f2 = r2[4], w2 = r2[5], s2 = r2[6], a2 = r2[7], v2 = 0; v2 < 64; v2 += 1) b2[v2] = v2 < 16 ? n2[v2] : m(E(A2 = b2[v2 - 2], 17) ^ E(A2, 19) ^ l(A2, 10), b2[v2 - 7], R(b2[v2 - 15]), b2[v2 - 16]), h2 = y(a2, U(f2), H(f2, w2, s2), i[v2], b2[v2]), c2 = p(S(t2), d(t2, e2, o2)), a2 = s2, s2 = w2, w2 = f2, f2 = p(u2, h2), u2 = o2, o2 = e2, e2 = t2, t2 = p(h2, c2);
            return r2[0] = p(t2, r2[0]), r2[1] = p(e2, r2[1]), r2[2] = p(o2, r2[2]), r2[3] = p(u2, r2[3]), r2[4] = p(f2, r2[4]), r2[5] = p(w2, r2[5]), r2[6] = p(s2, r2[6]), r2[7] = p(a2, r2[7]), r2;
        }
        const g = (function (n2) {
            function r2(r3, e2, i2) {
                let o2 = this;
                if (r3 !== 'SHA-224' && r3 !== 'SHA-256') throw new Error(f);
                const u2 = i2 || {};
                return (o2 = n2.call(this, r3, e2, i2) || this).F = o2.Y, o2.g = true, o2.C = -1, o2.p = t(o2.t, o2.i, o2.C), o2.R = L, o2.B = function (n3) {
                    return n3.slice();
                }, o2.L = B, o2.K = function (n3, t2, e3, i3) {
                    return (function (n4, r4, t3, e4, i4) {
                        for (var o3, u3 = 15 + (r4 + 65 >>> 9 << 4), f2 = r4 + t3; n4.length <= u3;) n4.push(0);
                        for (n4[r4 >>> 5] |= 128 << 24 - r4 % 32, n4[u3] = 4294967295 & f2, n4[u3 - 1] = f2 / 4294967296 | 0, o3 = 0; o3 < n4.length; o3 += 16) e4 = L(n4.slice(o3, o3 + 16), e4);
                        return i4 === 'SHA-224' ? [e4[0], e4[1], e4[2], e4[3], e4[4], e4[5], e4[6]] : e4;
                    }(n3, t2, e3, i3, r3));
                }, o2.m = B(r3), o2.S = 512, o2.U = r3 === 'SHA-224' ? 224 : 256, o2.T = false, u2.hmacKey && o2.k(a('hmacKey', u2.hmacKey, o2.C)), o2;
            }
            return v(r2, n2), r2;
        }(h));
        const k = function (n2, r2) {
            this.N = n2, this.I = r2;
        };
        function Y(n2, r2) {
            let t2;
            return r2 > 32 ? (t2 = 64 - r2, new k(n2.I << r2 | n2.N >>> t2, n2.N << r2 | n2.I >>> t2)) : r2 !== 0 ? (t2 = 32 - r2, new k(n2.N << r2 | n2.I >>> t2, n2.I << r2 | n2.N >>> t2)) : n2;
        }
        function N(n2, r2) {
            let t2;
            return r2 < 32 ? (t2 = 32 - r2, new k(n2.N >>> r2 | n2.I << t2, n2.I >>> r2 | n2.N << t2)) : (t2 = 64 - r2, new k(n2.I >>> r2 | n2.N << t2, n2.N >>> r2 | n2.I << t2));
        }
        function I(n2, r2) {
            return new k(n2.N >>> r2, n2.I >>> r2 | n2.N << 32 - r2);
        }
        function M(n2, r2, t2) {
            return new k(n2.N & r2.N ^ ~n2.N & t2.N, n2.I & r2.I ^ ~n2.I & t2.I);
        }
        function X(n2, r2, t2) {
            return new k(n2.N & r2.N ^ n2.N & t2.N ^ r2.N & t2.N, n2.I & r2.I ^ n2.I & t2.I ^ r2.I & t2.I);
        }
        function z(n2) {
            const r2 = N(n2, 28); const t2 = N(n2, 34); const
                e2 = N(n2, 39);
            return new k(r2.N ^ t2.N ^ e2.N, r2.I ^ t2.I ^ e2.I);
        }
        function O(n2, r2) {
            let t2; let
                e2;
            t2 = (65535 & n2.I) + (65535 & r2.I);
            const i2 = (65535 & (e2 = (n2.I >>> 16) + (r2.I >>> 16) + (t2 >>> 16))) << 16 | 65535 & t2;
            return t2 = (65535 & n2.N) + (65535 & r2.N) + (e2 >>> 16), e2 = (n2.N >>> 16) + (r2.N >>> 16) + (t2 >>> 16), new k((65535 & e2) << 16 | 65535 & t2, i2);
        }
        function j(n2, r2, t2, e2) {
            let i2; let
                o2;
            i2 = (65535 & n2.I) + (65535 & r2.I) + (65535 & t2.I) + (65535 & e2.I);
            const u2 = (65535 & (o2 = (n2.I >>> 16) + (r2.I >>> 16) + (t2.I >>> 16) + (e2.I >>> 16) + (i2 >>> 16))) << 16 | 65535 & i2;
            return i2 = (65535 & n2.N) + (65535 & r2.N) + (65535 & t2.N) + (65535 & e2.N) + (o2 >>> 16), o2 = (n2.N >>> 16) + (r2.N >>> 16) + (t2.N >>> 16) + (e2.N >>> 16) + (i2 >>> 16), new k((65535 & o2) << 16 | 65535 & i2, u2);
        }
        function _2(n2, r2, t2, e2, i2) {
            let o2; let
                u2;
            o2 = (65535 & n2.I) + (65535 & r2.I) + (65535 & t2.I) + (65535 & e2.I) + (65535 & i2.I);
            const f2 = (65535 & (u2 = (n2.I >>> 16) + (r2.I >>> 16) + (t2.I >>> 16) + (e2.I >>> 16) + (i2.I >>> 16) + (o2 >>> 16))) << 16 | 65535 & o2;
            return o2 = (65535 & n2.N) + (65535 & r2.N) + (65535 & t2.N) + (65535 & e2.N) + (65535 & i2.N) + (u2 >>> 16), u2 = (n2.N >>> 16) + (r2.N >>> 16) + (t2.N >>> 16) + (e2.N >>> 16) + (i2.N >>> 16) + (o2 >>> 16), new k((65535 & u2) << 16 | 65535 & o2, f2);
        }
        function P(n2, r2) {
            return new k(n2.N ^ r2.N, n2.I ^ r2.I);
        }
        function x(n2) {
            const r2 = N(n2, 1); const t2 = N(n2, 8); const
                e2 = I(n2, 7);
            return new k(r2.N ^ t2.N ^ e2.N, r2.I ^ t2.I ^ e2.I);
        }
        function V(n2) {
            const r2 = N(n2, 14); const t2 = N(n2, 18); const
                e2 = N(n2, 41);
            return new k(r2.N ^ t2.N ^ e2.N, r2.I ^ t2.I ^ e2.I);
        }
        const Z = [new k(i[0], 3609767458), new k(i[1], 602891725), new k(i[2], 3964484399), new k(i[3], 2173295548), new k(i[4], 4081628472), new k(i[5], 3053834265), new k(i[6], 2937671579), new k(i[7], 3664609560), new k(i[8], 2734883394), new k(i[9], 1164996542), new k(i[10], 1323610764), new k(i[11], 3590304994), new k(i[12], 4068182383), new k(i[13], 991336113), new k(i[14], 633803317), new k(i[15], 3479774868), new k(i[16], 2666613458), new k(i[17], 944711139), new k(i[18], 2341262773), new k(i[19], 2007800933), new k(i[20], 1495990901), new k(i[21], 1856431235), new k(i[22], 3175218132), new k(i[23], 2198950837), new k(i[24], 3999719339), new k(i[25], 766784016), new k(i[26], 2566594879), new k(i[27], 3203337956), new k(i[28], 1034457026), new k(i[29], 2466948901), new k(i[30], 3758326383), new k(i[31], 168717936), new k(i[32], 1188179964), new k(i[33], 1546045734), new k(i[34], 1522805485), new k(i[35], 2643833823), new k(i[36], 2343527390), new k(i[37], 1014477480), new k(i[38], 1206759142), new k(i[39], 344077627), new k(i[40], 1290863460), new k(i[41], 3158454273), new k(i[42], 3505952657), new k(i[43], 106217008), new k(i[44], 3606008344), new k(i[45], 1432725776), new k(i[46], 1467031594), new k(i[47], 851169720), new k(i[48], 3100823752), new k(i[49], 1363258195), new k(i[50], 3750685593), new k(i[51], 3785050280), new k(i[52], 3318307427), new k(i[53], 3812723403), new k(i[54], 2003034995), new k(i[55], 3602036899), new k(i[56], 1575990012), new k(i[57], 1125592928), new k(i[58], 2716904306), new k(i[59], 442776044), new k(i[60], 593698344), new k(i[61], 3733110249), new k(i[62], 2999351573), new k(i[63], 3815920427), new k(3391569614, 3928383900), new k(3515267271, 566280711), new k(3940187606, 3454069534), new k(4118630271, 4000239992), new k(116418474, 1914138554), new k(174292421, 2731055270), new k(289380356, 3203993006), new k(460393269, 320620315), new k(685471733, 587496836), new k(852142971, 1086792851), new k(1017036298, 365543100), new k(1126000580, 2618297676), new k(1288033470, 3409855158), new k(1501505948, 4234509866), new k(1607167915, 987167468), new k(1816402316, 1246189591)];
        function q(n2) {
            return n2 === 'SHA-384' ? [new k(3418070365, o[0]), new k(1654270250, o[1]), new k(2438529370, o[2]), new k(355462360, o[3]), new k(1731405415, o[4]), new k(41048885895, o[5]), new k(3675008525, o[6]), new k(1203062813, o[7])] : [new k(u[0], 4089235720), new k(u[1], 2227873595), new k(u[2], 4271175723), new k(u[3], 1595750129), new k(u[4], 2917565137), new k(u[5], 725511199), new k(u[6], 4215389547), new k(u[7], 327033209)];
        }
        function D(n2, r2) {
            let t2; let e2; let i2; let o2; let u2; let f2; let w2; let s2; let a2; let h2; let c2; let v2; let A2; let E2; let l2; let b2; const
                H2 = [];
            for (t2 = r2[0], e2 = r2[1], i2 = r2[2], o2 = r2[3], u2 = r2[4], f2 = r2[5], w2 = r2[6], s2 = r2[7], c2 = 0; c2 < 80; c2 += 1) c2 < 16 ? (v2 = 2 * c2, H2[c2] = new k(n2[v2], n2[v2 + 1])) : H2[c2] = j((A2 = H2[c2 - 2], E2 = void 0, l2 = void 0, b2 = void 0, E2 = N(A2, 19), l2 = N(A2, 61), b2 = I(A2, 6), new k(E2.N ^ l2.N ^ b2.N, E2.I ^ l2.I ^ b2.I)), H2[c2 - 7], x(H2[c2 - 15]), H2[c2 - 16]), a2 = _2(s2, V(u2), M(u2, f2, w2), Z[c2], H2[c2]), h2 = O(z(t2), X(t2, e2, i2)), s2 = w2, w2 = f2, f2 = u2, u2 = O(o2, a2), o2 = i2, i2 = e2, e2 = t2, t2 = O(a2, h2);
            return r2[0] = O(t2, r2[0]), r2[1] = O(e2, r2[1]), r2[2] = O(i2, r2[2]), r2[3] = O(o2, r2[3]), r2[4] = O(u2, r2[4]), r2[5] = O(f2, r2[5]), r2[6] = O(w2, r2[6]), r2[7] = O(s2, r2[7]), r2;
        }
        const G = (function (n2) {
            function r2(r3, e2, i2) {
                let o2 = this;
                if (r3 !== 'SHA-384' && r3 !== 'SHA-512') throw new Error(f);
                const u2 = i2 || {};
                return (o2 = n2.call(this, r3, e2, i2) || this).F = o2.Y, o2.g = true, o2.C = -1, o2.p = t(o2.t, o2.i, o2.C), o2.R = D, o2.B = function (n3) {
                    return n3.slice();
                }, o2.L = q, o2.K = function (n3, t2, e3, i3) {
                    return (function (n4, r4, t3, e4, i4) {
                        for (var o3, u3 = 31 + (r4 + 129 >>> 10 << 5), f2 = r4 + t3; n4.length <= u3;) n4.push(0);
                        for (n4[r4 >>> 5] |= 128 << 24 - r4 % 32, n4[u3] = 4294967295 & f2, n4[u3 - 1] = f2 / 4294967296 | 0, o3 = 0; o3 < n4.length; o3 += 32) e4 = D(n4.slice(o3, o3 + 32), e4);
                        return i4 === 'SHA-384' ? [(e4 = e4)[0].N, e4[0].I, e4[1].N, e4[1].I, e4[2].N, e4[2].I, e4[3].N, e4[3].I, e4[4].N, e4[4].I, e4[5].N, e4[5].I] : [e4[0].N, e4[0].I, e4[1].N, e4[1].I, e4[2].N, e4[2].I, e4[3].N, e4[3].I, e4[4].N, e4[4].I, e4[5].N, e4[5].I, e4[6].N, e4[6].I, e4[7].N, e4[7].I];
                    }(n3, t2, e3, i3, r3));
                }, o2.m = q(r3), o2.S = 1024, o2.U = r3 === 'SHA-384' ? 384 : 512, o2.T = false, u2.hmacKey && o2.k(a('hmacKey', u2.hmacKey, o2.C)), o2;
            }
            return v(r2, n2), r2;
        }(h));
        const J = [new k(0, 1), new k(0, 32898), new k(2147483648, 32906), new k(2147483648, 2147516416), new k(0, 32907), new k(0, 2147483649), new k(2147483648, 2147516545), new k(2147483648, 32777), new k(0, 138), new k(0, 136), new k(0, 2147516425), new k(0, 2147483658), new k(0, 2147516555), new k(2147483648, 139), new k(2147483648, 32905), new k(2147483648, 32771), new k(2147483648, 32770), new k(2147483648, 128), new k(0, 32778), new k(2147483648, 2147483658), new k(2147483648, 2147516545), new k(2147483648, 32896), new k(0, 2147483649), new k(2147483648, 2147516424)];
        const Q = [[0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61], [28, 55, 25, 21, 56], [27, 20, 39, 8, 14]];
        function W(n2) {
            let r2; const
                t2 = [];
            for (r2 = 0; r2 < 5; r2 += 1) t2[r2] = [new k(0, 0), new k(0, 0), new k(0, 0), new k(0, 0), new k(0, 0)];
            return t2;
        }
        function $(n2) {
            let r2; const
                t2 = [];
            for (r2 = 0; r2 < 5; r2 += 1) t2[r2] = n2[r2].slice();
            return t2;
        }
        function nn(n2, r2) {
            let t2; let e2; let i2; let o2; let u2; let f2; let w2; let s2; let a2; const h2 = []; const
                c2 = [];
            if (n2 !== null) for (e2 = 0; e2 < n2.length; e2 += 2) r2[(e2 >>> 1) % 5][(e2 >>> 1) / 5 | 0] = P(r2[(e2 >>> 1) % 5][(e2 >>> 1) / 5 | 0], new k(n2[e2 + 1], n2[e2]));
            for (t2 = 0; t2 < 24; t2 += 1) {
                for (o2 = W(), e2 = 0; e2 < 5; e2 += 1) h2[e2] = (u2 = r2[e2][0], f2 = r2[e2][1], w2 = r2[e2][2], s2 = r2[e2][3], a2 = r2[e2][4], new k(u2.N ^ f2.N ^ w2.N ^ s2.N ^ a2.N, u2.I ^ f2.I ^ w2.I ^ s2.I ^ a2.I));
                for (e2 = 0; e2 < 5; e2 += 1) c2[e2] = P(h2[(e2 + 4) % 5], Y(h2[(e2 + 1) % 5], 1));
                for (e2 = 0; e2 < 5; e2 += 1) for (i2 = 0; i2 < 5; i2 += 1) r2[e2][i2] = P(r2[e2][i2], c2[e2]);
                for (e2 = 0; e2 < 5; e2 += 1) for (i2 = 0; i2 < 5; i2 += 1) o2[i2][(2 * e2 + 3 * i2) % 5] = Y(r2[e2][i2], Q[e2][i2]);
                for (e2 = 0; e2 < 5; e2 += 1) for (i2 = 0; i2 < 5; i2 += 1) r2[e2][i2] = P(o2[e2][i2], new k(~o2[(e2 + 1) % 5][i2].N & o2[(e2 + 2) % 5][i2].N, ~o2[(e2 + 1) % 5][i2].I & o2[(e2 + 2) % 5][i2].I));
                r2[0][0] = P(r2[0][0], J[t2]);
            }
            return r2;
        }
        function rn(n2) {
            let r2; let t2; let e2 = 0; const i2 = [0, 0]; const
                o2 = [4294967295 & n2, n2 / 4294967296 & 2097151];
            for (r2 = 6; r2 >= 0; r2--) (t2 = o2[r2 >> 2] >>> 8 * r2 & 255) === 0 && e2 === 0 || (i2[e2 + 1 >> 2] |= t2 << 8 * (e2 + 1), e2 += 1);
            return e2 = e2 !== 0 ? e2 : 1, i2[0] |= e2, { value: e2 + 1 > 4 ? i2 : [i2[0]], binLen: 8 + 8 * e2 };
        }
        function tn(n2) {
            return w(rn(n2.binLen), n2);
        }
        function en(n2, r2) {
            let t2; let e2 = rn(r2); const i2 = r2 >>> 2; const
                o2 = (i2 - (e2 = w(e2, n2)).value.length % i2) % i2;
            for (t2 = 0; t2 < o2; t2++) e2.value.push(0);
            return e2.value;
        }
        const on2 = (function (n2) {
            function r2(r3, e2, i2) {
                let o2 = this; let u2 = 6; let w2 = 0; const
                    s2 = i2 || {};
                if ((o2 = n2.call(this, r3, e2, i2) || this).numRounds !== 1) {
                    if (s2.kmacKey || s2.hmacKey) throw new Error('Cannot set numRounds with MAC');
                    if (o2.o === 'CSHAKE128' || o2.o === 'CSHAKE256') throw new Error('Cannot set numRounds for CSHAKE variants');
                }
                switch (o2.C = 1, o2.p = t(o2.t, o2.i, o2.C), o2.R = nn, o2.B = $, o2.L = W, o2.m = W(), o2.T = false, r3) {
                    case 'SHA3-224':
                        o2.S = w2 = 1152, o2.U = 224, o2.g = true, o2.F = o2.Y;
                        break;
                    case 'SHA3-256':
                        o2.S = w2 = 1088, o2.U = 256, o2.g = true, o2.F = o2.Y;
                        break;
                    case 'SHA3-384':
                        o2.S = w2 = 832, o2.U = 384, o2.g = true, o2.F = o2.Y;
                        break;
                    case 'SHA3-512':
                        o2.S = w2 = 576, o2.U = 512, o2.g = true, o2.F = o2.Y;
                        break;
                    case 'SHAKE128':
                        u2 = 31, o2.S = w2 = 1344, o2.U = -1, o2.T = true, o2.g = false, o2.F = null;
                        break;
                    case 'SHAKE256':
                        u2 = 31, o2.S = w2 = 1088, o2.U = -1, o2.T = true, o2.g = false, o2.F = null;
                        break;
                    case 'KMAC128':
                        u2 = 4, o2.S = w2 = 1344, o2.M(i2), o2.U = -1, o2.T = true, o2.g = false, o2.F = o2.X;
                        break;
                    case 'KMAC256':
                        u2 = 4, o2.S = w2 = 1088, o2.M(i2), o2.U = -1, o2.T = true, o2.g = false, o2.F = o2.X;
                        break;
                    case 'CSHAKE128':
                        o2.S = w2 = 1344, u2 = o2.O(i2), o2.U = -1, o2.T = true, o2.g = false, o2.F = null;
                        break;
                    case 'CSHAKE256':
                        o2.S = w2 = 1088, u2 = o2.O(i2), o2.U = -1, o2.T = true, o2.g = false, o2.F = null;
                        break;
                    default:
                        throw new Error(f);
                }
                return o2.K = function (n3, r4, t2, e3, i3) {
                    return (function (n4, r5, t3, e4, i4, o3, u3) {
                        let f2; let w3; let s3 = 0; const a2 = []; const h2 = i4 >>> 5; const
                            c2 = r5 >>> 5;
                        for (f2 = 0; f2 < c2 && r5 >= i4; f2 += h2) e4 = nn(n4.slice(f2, f2 + h2), e4), r5 -= i4;
                        for (n4 = n4.slice(f2), r5 %= i4; n4.length < h2;) n4.push(0);
                        for (n4[(f2 = r5 >>> 3) >> 2] ^= o3 << f2 % 4 * 8, n4[h2 - 1] ^= 2147483648, e4 = nn(n4, e4); 32 * a2.length < u3 && (w3 = e4[s3 % 5][s3 / 5 | 0], a2.push(w3.I), !(32 * a2.length >= u3));) a2.push(w3.N), 64 * (s3 += 1) % i4 == 0 && (nn(null, e4), s3 = 0);
                        return a2;
                    }(n3, r4, 0, e3, w2, u2, i3));
                }, s2.hmacKey && o2.k(a('hmacKey', s2.hmacKey, o2.C)), o2;
            }
            return v(r2, n2), r2.prototype.O = function (n3, r3) {
                const t2 = (function (n4) {
                    const r4 = n4 || {};
                    return { funcName: a('funcName', r4.funcName, 1, { value: [], binLen: 0 }), customization: a('Customization', r4.customization, 1, { value: [], binLen: 0 }) };
                }(n3 || {}));
                r3 && (t2.funcName = r3);
                const e2 = w(tn(t2.funcName), tn(t2.customization));
                if (t2.customization.binLen !== 0 || t2.funcName.binLen !== 0) {
                    for (let i2 = en(e2, this.S >>> 3), o2 = 0; o2 < i2.length; o2 += this.S >>> 5) this.m = this.R(i2.slice(o2, o2 + (this.S >>> 5)), this.m), this.v += this.S;
                    return 4;
                }
                return 31;
            }, r2.prototype.M = function (n3) {
                const r3 = (function (n4) {
                    const r4 = n4 || {};
                    return { kmacKey: a('kmacKey', r4.kmacKey, 1), funcName: { value: [1128353099], binLen: 32 }, customization: a('Customization', r4.customization, 1, { value: [], binLen: 0 }) };
                }(n3 || {}));
                this.O(n3, r3.funcName);
                for (let t2 = en(tn(r3.kmacKey), this.S >>> 3), e2 = 0; e2 < t2.length; e2 += this.S >>> 5) this.m = this.R(t2.slice(e2, e2 + (this.S >>> 5)), this.m), this.v += this.S;
                this.A = true;
            }, r2.prototype.X = function (n3) {
                const r3 = w({ value: this.u.slice(), binLen: this.s }, (function (n4) {
                    let r4; let t2; let e2 = 0; const i2 = [0, 0]; const
                        o2 = [4294967295 & n4, n4 / 4294967296 & 2097151];
                    for (r4 = 6; r4 >= 0; r4--) (t2 = o2[r4 >> 2] >>> 8 * r4 & 255) == 0 && e2 === 0 || (i2[e2 >> 2] |= t2 << 8 * e2, e2 += 1);
                    return i2[(e2 = e2 !== 0 ? e2 : 1) >> 2] |= e2 << 8 * e2, { value: e2 + 1 > 4 ? i2 : [i2[0]], binLen: 8 + 8 * e2 };
                }(n3.outputLen)));
                return this.K(r3.value, r3.binLen, this.v, this.B(this.m), n3.outputLen);
            }, r2;
        }(h));
        return (function () {
            function n2(n3, r2, t2) {
                if (n3 == 'SHA-1') this.j = new K(n3, r2, t2);
                else if (n3 == 'SHA-224' || n3 == 'SHA-256') this.j = new g(n3, r2, t2);
                else if (n3 == 'SHA-384' || n3 == 'SHA-512') this.j = new G(n3, r2, t2);
                else {
                    if (n3 != 'SHA3-224' && n3 != 'SHA3-256' && n3 != 'SHA3-384' && n3 != 'SHA3-512' && n3 != 'SHAKE128' && n3 != 'SHAKE256' && n3 != 'CSHAKE128' && n3 != 'CSHAKE256' && n3 != 'KMAC128' && n3 != 'KMAC256') throw new Error(f);
                    this.j = new on2(n3, r2, t2);
                }
            }
            return n2.prototype.update = function (n3) {
                this.j.update(n3);
            }, n2.prototype.getHash = function (n3, r2) {
                return this.j.getHash(n3, r2);
            }, n2.prototype.setHMACKey = function (n3, r2, t2) {
                this.j.setHMACKey(n3, r2, t2);
            }, n2.prototype.getHMAC = function (n3, r2) {
                return this.j.getHMAC(n3, r2);
            }, n2;
        }());
    }));
}(sha));
const browser = {};
const getSecureRandom$1 = {};
Object.defineProperty(getSecureRandom$1, '__esModule', { value: true });
getSecureRandom$1.getSecureRandomWords = getSecureRandom$1.getSecureRandomBytes = void 0;
function getSecureRandomBytes$1(size2) {
    return Buffer.from(window.crypto.getRandomValues(new Uint8Array(size2)));
}
getSecureRandom$1.getSecureRandomBytes = getSecureRandomBytes$1;
function getSecureRandomWords$1(size2) {
    return window.crypto.getRandomValues(new Uint16Array(size2));
}
getSecureRandom$1.getSecureRandomWords = getSecureRandomWords$1;
const hmac_sha512$3 = {};
Object.defineProperty(hmac_sha512$3, '__esModule', { value: true });
hmac_sha512$3.hmac_sha512 = void 0;
async function hmac_sha512$2(key, data2) {
    const keyBuffer = typeof key === 'string' ? Buffer.from(key, 'utf-8') : key;
    const dataBuffer = typeof data2 === 'string' ? Buffer.from(data2, 'utf-8') : data2;
    const hmacAlgo = { name: 'HMAC', hash: 'SHA-512' };
    const hmacKey = await window.crypto.subtle.importKey('raw', keyBuffer, hmacAlgo, false, ['sign']);
    return Buffer.from(await crypto.subtle.sign(hmacAlgo, hmacKey, dataBuffer));
}
hmac_sha512$3.hmac_sha512 = hmac_sha512$2;
const pbkdf2_sha512$3 = {};
Object.defineProperty(pbkdf2_sha512$3, '__esModule', { value: true });
pbkdf2_sha512$3.pbkdf2_sha512 = void 0;
async function pbkdf2_sha512$2(key, salt, iterations, keyLen) {
    const keyBuffer = typeof key === 'string' ? Buffer.from(key, 'utf-8') : key;
    const saltBuffer = typeof salt === 'string' ? Buffer.from(salt, 'utf-8') : salt;
    const pbkdf2_key = await window.crypto.subtle.importKey('raw', keyBuffer, { name: 'PBKDF2' }, false, ['deriveBits']);
    const derivedBits = await window.crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-512', salt: saltBuffer, iterations }, pbkdf2_key, keyLen * 8);
    return Buffer.from(derivedBits);
}
pbkdf2_sha512$3.pbkdf2_sha512 = pbkdf2_sha512$2;
const sha256$2 = {};
Object.defineProperty(sha256$2, '__esModule', { value: true });
sha256$2.sha256 = void 0;
async function sha256$1(source2) {
    if (typeof source2 === 'string') {
        return Buffer.from(await crypto.subtle.digest('SHA-256', Buffer.from(source2, 'utf-8')));
    }
    return Buffer.from(await crypto.subtle.digest('SHA-256', source2));
}
sha256$2.sha256 = sha256$1;
const sha512$3 = {};
Object.defineProperty(sha512$3, '__esModule', { value: true });
sha512$3.sha512 = void 0;
async function sha512$2(source2) {
    if (typeof source2 === 'string') {
        return Buffer.from(await crypto.subtle.digest('SHA-512', Buffer.from(source2, 'utf-8')));
    }
    return Buffer.from(await crypto.subtle.digest('SHA-512', source2));
}
sha512$3.sha512 = sha512$2;
(function (exports) {
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.sha512 = exports.sha256 = exports.pbkdf2_sha512 = exports.hmac_sha512 = exports.getSecureRandomWords = exports.getSecureRandomBytes = void 0;
    const getSecureRandom_12 = getSecureRandom$1;
    Object.defineProperty(exports, 'getSecureRandomBytes', { enumerable: true,
        get() {
            return getSecureRandom_12.getSecureRandomBytes;
        } });
    Object.defineProperty(exports, 'getSecureRandomWords', { enumerable: true,
        get() {
            return getSecureRandom_12.getSecureRandomWords;
        } });
    const hmac_sha512_12 = hmac_sha512$3;
    Object.defineProperty(exports, 'hmac_sha512', { enumerable: true,
        get() {
            return hmac_sha512_12.hmac_sha512;
        } });
    const pbkdf2_sha512_12 = pbkdf2_sha512$3;
    Object.defineProperty(exports, 'pbkdf2_sha512', { enumerable: true,
        get() {
            return pbkdf2_sha512_12.pbkdf2_sha512;
        } });
    const sha256_12 = sha256$2;
    Object.defineProperty(exports, 'sha256', { enumerable: true,
        get() {
            return sha256_12.sha256;
        } });
    const sha512_12 = sha512$3;
    Object.defineProperty(exports, 'sha512', { enumerable: true,
        get() {
            return sha512_12.sha512;
        } });
}(browser));
const __importDefault$4 = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { 'default': mod };
};
Object.defineProperty(sha256$3, '__esModule', { value: true });
sha256$3.sha256 = sha256$3.sha256_fallback = sha256$3.sha256_sync = void 0;
const jssha_1$2 = __importDefault$4(sha.exports);
const ton_crypto_primitives_1$4 = browser;
function sha256_sync(source2) {
    let src2;
    if (typeof source2 === 'string') {
        src2 = Buffer.from(source2, 'utf-8').toString('hex');
    } else {
        src2 = source2.toString('hex');
    }
    const hasher = new jssha_1$2.default('SHA-256', 'HEX');
    hasher.update(src2);
    const res = hasher.getHash('HEX');
    return Buffer.from(res, 'hex');
}
sha256$3.sha256_sync = sha256_sync;
async function sha256_fallback(source2) {
    return sha256_sync(source2);
}
sha256$3.sha256_fallback = sha256_fallback;
function sha256(source2) {
    return (0, ton_crypto_primitives_1$4.sha256)(source2);
}
sha256$3.sha256 = sha256;
const sha512$1 = {};
const __importDefault$3 = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { 'default': mod };
};
Object.defineProperty(sha512$1, '__esModule', { value: true });
sha512$1.sha512 = sha512$1.sha512_fallback = sha512$1.sha512_sync = void 0;
const jssha_1$1 = __importDefault$3(sha.exports);
const ton_crypto_primitives_1$3 = browser;
function sha512_sync(source2) {
    let src2;
    if (typeof source2 === 'string') {
        src2 = Buffer.from(source2, 'utf-8').toString('hex');
    } else {
        src2 = source2.toString('hex');
    }
    const hasher = new jssha_1$1.default('SHA-512', 'HEX');
    hasher.update(src2);
    const res = hasher.getHash('HEX');
    return Buffer.from(res, 'hex');
}
sha512$1.sha512_sync = sha512_sync;
async function sha512_fallback(source2) {
    return sha512_sync(source2);
}
sha512$1.sha512_fallback = sha512_fallback;
async function sha512(source2) {
    return (0, ton_crypto_primitives_1$3.sha512)(source2);
}
sha512$1.sha512 = sha512;
const pbkdf2_sha512$1 = {};
Object.defineProperty(pbkdf2_sha512$1, '__esModule', { value: true });
pbkdf2_sha512$1.pbkdf2_sha512 = void 0;
const ton_crypto_primitives_1$2 = browser;
function pbkdf2_sha512(key, salt, iterations, keyLen) {
    return (0, ton_crypto_primitives_1$2.pbkdf2_sha512)(key, salt, iterations, keyLen);
}
pbkdf2_sha512$1.pbkdf2_sha512 = pbkdf2_sha512;
const hmac_sha512$1 = {};
const __importDefault$2 = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { 'default': mod };
};
Object.defineProperty(hmac_sha512$1, '__esModule', { value: true });
hmac_sha512$1.hmac_sha512 = hmac_sha512$1.hmac_sha512_fallback = void 0;
const jssha_1 = __importDefault$2(sha.exports);
const ton_crypto_primitives_1$1 = browser;
async function hmac_sha512_fallback(key, data2) {
    const keyBuffer = typeof key === 'string' ? Buffer.from(key, 'utf-8') : key;
    const dataBuffer = typeof data2 === 'string' ? Buffer.from(data2, 'utf-8') : data2;
    const shaObj = new jssha_1.default('SHA-512', 'HEX', {
        hmacKey: { value: keyBuffer.toString('hex'), format: 'HEX' },
    });
    shaObj.update(dataBuffer.toString('hex'));
    const hmac2 = shaObj.getHash('HEX');
    return Buffer.from(hmac2, 'hex');
}
hmac_sha512$1.hmac_sha512_fallback = hmac_sha512_fallback;
function hmac_sha512(key, data2) {
    return (0, ton_crypto_primitives_1$1.hmac_sha512)(key, data2);
}
hmac_sha512$1.hmac_sha512 = hmac_sha512;
const getSecureRandom = {};
Object.defineProperty(getSecureRandom, '__esModule', { value: true });
getSecureRandom.getSecureRandomNumber = getSecureRandom.getSecureRandomWords = getSecureRandom.getSecureRandomBytes = void 0;
const ton_crypto_primitives_1 = browser;
async function getSecureRandomBytes(size2) {
    return (0, ton_crypto_primitives_1.getSecureRandomBytes)(size2);
}
getSecureRandom.getSecureRandomBytes = getSecureRandomBytes;
async function getSecureRandomWords(size2) {
    return getSecureRandomWords();
}
getSecureRandom.getSecureRandomWords = getSecureRandomWords;
async function getSecureRandomNumber(min2, max2) {
    const range2 = max2 - min2;
    const bitsNeeded = Math.ceil(Math.log2(range2));
    if (bitsNeeded > 53) {
        throw new Error('Range is too large');
    }
    const bytesNeeded = Math.ceil(bitsNeeded / 8);
    const mask2 = 2 ** bitsNeeded - 1;
    while (true) {
        const res = await getSecureRandomBytes(bitsNeeded);
        let power = (bytesNeeded - 1) * 8;
        let numberValue = 0;
        for (let i = 0; i < bytesNeeded; i++) {
            numberValue += res[i] * 2 ** power;
            power -= 8;
        }
        numberValue &= mask2;
        if (numberValue >= range2) {
            continue;
        }
        return min2 + numberValue;
    }
}
getSecureRandom.getSecureRandomNumber = getSecureRandomNumber;
const newSecureWords$1 = {};
const wordlist$1 = {};
Object.defineProperty(wordlist$1, '__esModule', { value: true });
wordlist$1.wordlist = void 0;
wordlist$1.wordlist = [
    'abacus',
    'abdomen',
    'abdominal',
    'abide',
    'abiding',
    'ability',
    'ablaze',
    'able',
    'abnormal',
    'abrasion',
    'abrasive',
    'abreast',
    'abridge',
    'abroad',
    'abruptly',
    'absence',
    'absentee',
    'absently',
    'absinthe',
    'absolute',
    'absolve',
    'abstain',
    'abstract',
    'absurd',
    'accent',
    'acclaim',
    'acclimate',
    'accompany',
    'account',
    'accuracy',
    'accurate',
    'accustom',
    'acetone',
    'achiness',
    'aching',
    'acid',
    'acorn',
    'acquaint',
    'acquire',
    'acre',
    'acrobat',
    'acronym',
    'acting',
    'action',
    'activate',
    'activator',
    'active',
    'activism',
    'activist',
    'activity',
    'actress',
    'acts',
    'acutely',
    'acuteness',
    'aeration',
    'aerobics',
    'aerosol',
    'aerospace',
    'afar',
    'affair',
    'affected',
    'affecting',
    'affection',
    'affidavit',
    'affiliate',
    'affirm',
    'affix',
    'afflicted',
    'affluent',
    'afford',
    'affront',
    'aflame',
    'afloat',
    'aflutter',
    'afoot',
    'afraid',
    'afterglow',
    'afterlife',
    'aftermath',
    'aftermost',
    'afternoon',
    'aged',
    'ageless',
    'agency',
    'agenda',
    'agent',
    'aggregate',
    'aghast',
    'agile',
    'agility',
    'aging',
    'agnostic',
    'agonize',
    'agonizing',
    'agony',
    'agreeable',
    'agreeably',
    'agreed',
    'agreeing',
    'agreement',
    'aground',
    'ahead',
    'ahoy',
    'aide',
    'aids',
    'aim',
    'ajar',
    'alabaster',
    'alarm',
    'albatross',
    'album',
    'alfalfa',
    'algebra',
    'algorithm',
    'alias',
    'alibi',
    'alienable',
    'alienate',
    'aliens',
    'alike',
    'alive',
    'alkaline',
    'alkalize',
    'almanac',
    'almighty',
    'almost',
    'aloe',
    'aloft',
    'aloha',
    'alone',
    'alongside',
    'aloof',
    'alphabet',
    'alright',
    'although',
    'altitude',
    'alto',
    'aluminum',
    'alumni',
    'always',
    'amaretto',
    'amaze',
    'amazingly',
    'amber',
    'ambiance',
    'ambiguity',
    'ambiguous',
    'ambition',
    'ambitious',
    'ambulance',
    'ambush',
    'amendable',
    'amendment',
    'amends',
    'amenity',
    'amiable',
    'amicably',
    'amid',
    'amigo',
    'amino',
    'amiss',
    'ammonia',
    'ammonium',
    'amnesty',
    'amniotic',
    'among',
    'amount',
    'amperage',
    'ample',
    'amplifier',
    'amplify',
    'amply',
    'amuck',
    'amulet',
    'amusable',
    'amused',
    'amusement',
    'amuser',
    'amusing',
    'anaconda',
    'anaerobic',
    'anagram',
    'anatomist',
    'anatomy',
    'anchor',
    'anchovy',
    'ancient',
    'android',
    'anemia',
    'anemic',
    'aneurism',
    'anew',
    'angelfish',
    'angelic',
    'anger',
    'angled',
    'angler',
    'angles',
    'angling',
    'angrily',
    'angriness',
    'anguished',
    'angular',
    'animal',
    'animate',
    'animating',
    'animation',
    'animator',
    'anime',
    'animosity',
    'ankle',
    'annex',
    'annotate',
    'announcer',
    'annoying',
    'annually',
    'annuity',
    'anointer',
    'another',
    'answering',
    'antacid',
    'antarctic',
    'anteater',
    'antelope',
    'antennae',
    'anthem',
    'anthill',
    'anthology',
    'antibody',
    'antics',
    'antidote',
    'antihero',
    'antiquely',
    'antiques',
    'antiquity',
    'antirust',
    'antitoxic',
    'antitrust',
    'antiviral',
    'antivirus',
    'antler',
    'antonym',
    'antsy',
    'anvil',
    'anybody',
    'anyhow',
    'anymore',
    'anyone',
    'anyplace',
    'anything',
    'anytime',
    'anyway',
    'anywhere',
    'aorta',
    'apache',
    'apostle',
    'appealing',
    'appear',
    'appease',
    'appeasing',
    'appendage',
    'appendix',
    'appetite',
    'appetizer',
    'applaud',
    'applause',
    'apple',
    'appliance',
    'applicant',
    'applied',
    'apply',
    'appointee',
    'appraisal',
    'appraiser',
    'apprehend',
    'approach',
    'approval',
    'approve',
    'apricot',
    'april',
    'apron',
    'aptitude',
    'aptly',
    'aqua',
    'aqueduct',
    'arbitrary',
    'arbitrate',
    'ardently',
    'area',
    'arena',
    'arguable',
    'arguably',
    'argue',
    'arise',
    'armadillo',
    'armband',
    'armchair',
    'armed',
    'armful',
    'armhole',
    'arming',
    'armless',
    'armoire',
    'armored',
    'armory',
    'armrest',
    'army',
    'aroma',
    'arose',
    'around',
    'arousal',
    'arrange',
    'array',
    'arrest',
    'arrival',
    'arrive',
    'arrogance',
    'arrogant',
    'arson',
    'art',
    'ascend',
    'ascension',
    'ascent',
    'ascertain',
    'ashamed',
    'ashen',
    'ashes',
    'ashy',
    'aside',
    'askew',
    'asleep',
    'asparagus',
    'aspect',
    'aspirate',
    'aspire',
    'aspirin',
    'astonish',
    'astound',
    'astride',
    'astrology',
    'astronaut',
    'astronomy',
    'astute',
    'atlantic',
    'atlas',
    'atom',
    'atonable',
    'atop',
    'atrium',
    'atrocious',
    'atrophy',
    'attach',
    'attain',
    'attempt',
    'attendant',
    'attendee',
    'attention',
    'attentive',
    'attest',
    'attic',
    'attire',
    'attitude',
    'attractor',
    'attribute',
    'atypical',
    'auction',
    'audacious',
    'audacity',
    'audible',
    'audibly',
    'audience',
    'audio',
    'audition',
    'augmented',
    'august',
    'authentic',
    'author',
    'autism',
    'autistic',
    'autograph',
    'automaker',
    'automated',
    'automatic',
    'autopilot',
    'available',
    'avalanche',
    'avatar',
    'avenge',
    'avenging',
    'avenue',
    'average',
    'aversion',
    'avert',
    'aviation',
    'aviator',
    'avid',
    'avoid',
    'await',
    'awaken',
    'award',
    'aware',
    'awhile',
    'awkward',
    'awning',
    'awoke',
    'awry',
    'axis',
    'babble',
    'babbling',
    'babied',
    'baboon',
    'backache',
    'backboard',
    'backboned',
    'backdrop',
    'backed',
    'backer',
    'backfield',
    'backfire',
    'backhand',
    'backing',
    'backlands',
    'backlash',
    'backless',
    'backlight',
    'backlit',
    'backlog',
    'backpack',
    'backpedal',
    'backrest',
    'backroom',
    'backshift',
    'backside',
    'backslid',
    'backspace',
    'backspin',
    'backstab',
    'backstage',
    'backtalk',
    'backtrack',
    'backup',
    'backward',
    'backwash',
    'backwater',
    'backyard',
    'bacon',
    'bacteria',
    'bacterium',
    'badass',
    'badge',
    'badland',
    'badly',
    'badness',
    'baffle',
    'baffling',
    'bagel',
    'bagful',
    'baggage',
    'bagged',
    'baggie',
    'bagginess',
    'bagging',
    'baggy',
    'bagpipe',
    'baguette',
    'baked',
    'bakery',
    'bakeshop',
    'baking',
    'balance',
    'balancing',
    'balcony',
    'balmy',
    'balsamic',
    'bamboo',
    'banana',
    'banish',
    'banister',
    'banjo',
    'bankable',
    'bankbook',
    'banked',
    'banker',
    'banking',
    'banknote',
    'bankroll',
    'banner',
    'bannister',
    'banshee',
    'banter',
    'barbecue',
    'barbed',
    'barbell',
    'barber',
    'barcode',
    'barge',
    'bargraph',
    'barista',
    'baritone',
    'barley',
    'barmaid',
    'barman',
    'barn',
    'barometer',
    'barrack',
    'barracuda',
    'barrel',
    'barrette',
    'barricade',
    'barrier',
    'barstool',
    'bartender',
    'barterer',
    'bash',
    'basically',
    'basics',
    'basil',
    'basin',
    'basis',
    'basket',
    'batboy',
    'batch',
    'bath',
    'baton',
    'bats',
    'battalion',
    'battered',
    'battering',
    'battery',
    'batting',
    'battle',
    'bauble',
    'bazooka',
    'blabber',
    'bladder',
    'blade',
    'blah',
    'blame',
    'blaming',
    'blanching',
    'blandness',
    'blank',
    'blaspheme',
    'blasphemy',
    'blast',
    'blatancy',
    'blatantly',
    'blazer',
    'blazing',
    'bleach',
    'bleak',
    'bleep',
    'blemish',
    'blend',
    'bless',
    'blighted',
    'blimp',
    'bling',
    'blinked',
    'blinker',
    'blinking',
    'blinks',
    'blip',
    'blissful',
    'blitz',
    'blizzard',
    'bloated',
    'bloating',
    'blob',
    'blog',
    'bloomers',
    'blooming',
    'blooper',
    'blot',
    'blouse',
    'blubber',
    'bluff',
    'bluish',
    'blunderer',
    'blunt',
    'blurb',
    'blurred',
    'blurry',
    'blurt',
    'blush',
    'blustery',
    'boaster',
    'boastful',
    'boasting',
    'boat',
    'bobbed',
    'bobbing',
    'bobble',
    'bobcat',
    'bobsled',
    'bobtail',
    'bodacious',
    'body',
    'bogged',
    'boggle',
    'bogus',
    'boil',
    'bok',
    'bolster',
    'bolt',
    'bonanza',
    'bonded',
    'bonding',
    'bondless',
    'boned',
    'bonehead',
    'boneless',
    'bonelike',
    'boney',
    'bonfire',
    'bonnet',
    'bonsai',
    'bonus',
    'bony',
    'boogeyman',
    'boogieman',
    'book',
    'boondocks',
    'booted',
    'booth',
    'bootie',
    'booting',
    'bootlace',
    'bootleg',
    'boots',
    'boozy',
    'borax',
    'boring',
    'borough',
    'borrower',
    'borrowing',
    'boss',
    'botanical',
    'botanist',
    'botany',
    'botch',
    'both',
    'bottle',
    'bottling',
    'bottom',
    'bounce',
    'bouncing',
    'bouncy',
    'bounding',
    'boundless',
    'bountiful',
    'bovine',
    'boxcar',
    'boxer',
    'boxing',
    'boxlike',
    'boxy',
    'breach',
    'breath',
    'breeches',
    'breeching',
    'breeder',
    'breeding',
    'breeze',
    'breezy',
    'brethren',
    'brewery',
    'brewing',
    'briar',
    'bribe',
    'brick',
    'bride',
    'bridged',
    'brigade',
    'bright',
    'brilliant',
    'brim',
    'bring',
    'brink',
    'brisket',
    'briskly',
    'briskness',
    'bristle',
    'brittle',
    'broadband',
    'broadcast',
    'broaden',
    'broadly',
    'broadness',
    'broadside',
    'broadways',
    'broiler',
    'broiling',
    'broken',
    'broker',
    'bronchial',
    'bronco',
    'bronze',
    'bronzing',
    'brook',
    'broom',
    'brought',
    'browbeat',
    'brownnose',
    'browse',
    'browsing',
    'bruising',
    'brunch',
    'brunette',
    'brunt',
    'brush',
    'brussels',
    'brute',
    'brutishly',
    'bubble',
    'bubbling',
    'bubbly',
    'buccaneer',
    'bucked',
    'bucket',
    'buckle',
    'buckshot',
    'buckskin',
    'bucktooth',
    'buckwheat',
    'buddhism',
    'buddhist',
    'budding',
    'buddy',
    'budget',
    'buffalo',
    'buffed',
    'buffer',
    'buffing',
    'buffoon',
    'buggy',
    'bulb',
    'bulge',
    'bulginess',
    'bulgur',
    'bulk',
    'bulldog',
    'bulldozer',
    'bullfight',
    'bullfrog',
    'bullhorn',
    'bullion',
    'bullish',
    'bullpen',
    'bullring',
    'bullseye',
    'bullwhip',
    'bully',
    'bunch',
    'bundle',
    'bungee',
    'bunion',
    'bunkbed',
    'bunkhouse',
    'bunkmate',
    'bunny',
    'bunt',
    'busboy',
    'bush',
    'busily',
    'busload',
    'bust',
    'busybody',
    'buzz',
    'cabana',
    'cabbage',
    'cabbie',
    'cabdriver',
    'cable',
    'caboose',
    'cache',
    'cackle',
    'cacti',
    'cactus',
    'caddie',
    'caddy',
    'cadet',
    'cadillac',
    'cadmium',
    'cage',
    'cahoots',
    'cake',
    'calamari',
    'calamity',
    'calcium',
    'calculate',
    'calculus',
    'caliber',
    'calibrate',
    'calm',
    'caloric',
    'calorie',
    'calzone',
    'camcorder',
    'cameo',
    'camera',
    'camisole',
    'camper',
    'campfire',
    'camping',
    'campsite',
    'campus',
    'canal',
    'canary',
    'cancel',
    'candied',
    'candle',
    'candy',
    'cane',
    'canine',
    'canister',
    'cannabis',
    'canned',
    'canning',
    'cannon',
    'cannot',
    'canola',
    'canon',
    'canopener',
    'canopy',
    'canteen',
    'canyon',
    'capable',
    'capably',
    'capacity',
    'cape',
    'capillary',
    'capital',
    'capitol',
    'capped',
    'capricorn',
    'capsize',
    'capsule',
    'caption',
    'captivate',
    'captive',
    'captivity',
    'capture',
    'caramel',
    'carat',
    'caravan',
    'carbon',
    'cardboard',
    'carded',
    'cardiac',
    'cardigan',
    'cardinal',
    'cardstock',
    'carefully',
    'caregiver',
    'careless',
    'caress',
    'caretaker',
    'cargo',
    'caring',
    'carless',
    'carload',
    'carmaker',
    'carnage',
    'carnation',
    'carnival',
    'carnivore',
    'carol',
    'carpenter',
    'carpentry',
    'carpool',
    'carport',
    'carried',
    'carrot',
    'carrousel',
    'carry',
    'cartel',
    'cartload',
    'carton',
    'cartoon',
    'cartridge',
    'cartwheel',
    'carve',
    'carving',
    'carwash',
    'cascade',
    'case',
    'cash',
    'casing',
    'casino',
    'casket',
    'cassette',
    'casually',
    'casualty',
    'catacomb',
    'catalog',
    'catalyst',
    'catalyze',
    'catapult',
    'cataract',
    'catatonic',
    'catcall',
    'catchable',
    'catcher',
    'catching',
    'catchy',
    'caterer',
    'catering',
    'catfight',
    'catfish',
    'cathedral',
    'cathouse',
    'catlike',
    'catnap',
    'catnip',
    'catsup',
    'cattail',
    'cattishly',
    'cattle',
    'catty',
    'catwalk',
    'caucasian',
    'caucus',
    'causal',
    'causation',
    'cause',
    'causing',
    'cauterize',
    'caution',
    'cautious',
    'cavalier',
    'cavalry',
    'caviar',
    'cavity',
    'cedar',
    'celery',
    'celestial',
    'celibacy',
    'celibate',
    'celtic',
    'cement',
    'census',
    'ceramics',
    'ceremony',
    'certainly',
    'certainty',
    'certified',
    'certify',
    'cesarean',
    'cesspool',
    'chafe',
    'chaffing',
    'chain',
    'chair',
    'chalice',
    'challenge',
    'chamber',
    'chamomile',
    'champion',
    'chance',
    'change',
    'channel',
    'chant',
    'chaos',
    'chaperone',
    'chaplain',
    'chapped',
    'chaps',
    'chapter',
    'character',
    'charbroil',
    'charcoal',
    'charger',
    'charging',
    'chariot',
    'charity',
    'charm',
    'charred',
    'charter',
    'charting',
    'chase',
    'chasing',
    'chaste',
    'chastise',
    'chastity',
    'chatroom',
    'chatter',
    'chatting',
    'chatty',
    'cheating',
    'cheddar',
    'cheek',
    'cheer',
    'cheese',
    'cheesy',
    'chef',
    'chemicals',
    'chemist',
    'chemo',
    'cherisher',
    'cherub',
    'chess',
    'chest',
    'chevron',
    'chevy',
    'chewable',
    'chewer',
    'chewing',
    'chewy',
    'chief',
    'chihuahua',
    'childcare',
    'childhood',
    'childish',
    'childless',
    'childlike',
    'chili',
    'chill',
    'chimp',
    'chip',
    'chirping',
    'chirpy',
    'chitchat',
    'chivalry',
    'chive',
    'chloride',
    'chlorine',
    'choice',
    'chokehold',
    'choking',
    'chomp',
    'chooser',
    'choosing',
    'choosy',
    'chop',
    'chosen',
    'chowder',
    'chowtime',
    'chrome',
    'chubby',
    'chuck',
    'chug',
    'chummy',
    'chump',
    'chunk',
    'churn',
    'chute',
    'cider',
    'cilantro',
    'cinch',
    'cinema',
    'cinnamon',
    'circle',
    'circling',
    'circular',
    'circulate',
    'circus',
    'citable',
    'citadel',
    'citation',
    'citizen',
    'citric',
    'citrus',
    'city',
    'civic',
    'civil',
    'clad',
    'claim',
    'clambake',
    'clammy',
    'clamor',
    'clamp',
    'clamshell',
    'clang',
    'clanking',
    'clapped',
    'clapper',
    'clapping',
    'clarify',
    'clarinet',
    'clarity',
    'clash',
    'clasp',
    'class',
    'clatter',
    'clause',
    'clavicle',
    'claw',
    'clay',
    'clean',
    'clear',
    'cleat',
    'cleaver',
    'cleft',
    'clench',
    'clergyman',
    'clerical',
    'clerk',
    'clever',
    'clicker',
    'client',
    'climate',
    'climatic',
    'cling',
    'clinic',
    'clinking',
    'clip',
    'clique',
    'cloak',
    'clobber',
    'clock',
    'clone',
    'cloning',
    'closable',
    'closure',
    'clothes',
    'clothing',
    'cloud',
    'clover',
    'clubbed',
    'clubbing',
    'clubhouse',
    'clump',
    'clumsily',
    'clumsy',
    'clunky',
    'clustered',
    'clutch',
    'clutter',
    'coach',
    'coagulant',
    'coastal',
    'coaster',
    'coasting',
    'coastland',
    'coastline',
    'coat',
    'coauthor',
    'cobalt',
    'cobbler',
    'cobweb',
    'cocoa',
    'coconut',
    'cod',
    'coeditor',
    'coerce',
    'coexist',
    'coffee',
    'cofounder',
    'cognition',
    'cognitive',
    'cogwheel',
    'coherence',
    'coherent',
    'cohesive',
    'coil',
    'coke',
    'cola',
    'cold',
    'coleslaw',
    'coliseum',
    'collage',
    'collapse',
    'collar',
    'collected',
    'collector',
    'collide',
    'collie',
    'collision',
    'colonial',
    'colonist',
    'colonize',
    'colony',
    'colossal',
    'colt',
    'coma',
    'come',
    'comfort',
    'comfy',
    'comic',
    'coming',
    'comma',
    'commence',
    'commend',
    'comment',
    'commerce',
    'commode',
    'commodity',
    'commodore',
    'common',
    'commotion',
    'commute',
    'commuting',
    'compacted',
    'compacter',
    'compactly',
    'compactor',
    'companion',
    'company',
    'compare',
    'compel',
    'compile',
    'comply',
    'component',
    'composed',
    'composer',
    'composite',
    'compost',
    'composure',
    'compound',
    'compress',
    'comprised',
    'computer',
    'computing',
    'comrade',
    'concave',
    'conceal',
    'conceded',
    'concept',
    'concerned',
    'concert',
    'conch',
    'concierge',
    'concise',
    'conclude',
    'concrete',
    'concur',
    'condense',
    'condiment',
    'condition',
    'condone',
    'conducive',
    'conductor',
    'conduit',
    'cone',
    'confess',
    'confetti',
    'confidant',
    'confident',
    'confider',
    'confiding',
    'configure',
    'confined',
    'confining',
    'confirm',
    'conflict',
    'conform',
    'confound',
    'confront',
    'confused',
    'confusing',
    'confusion',
    'congenial',
    'congested',
    'congrats',
    'congress',
    'conical',
    'conjoined',
    'conjure',
    'conjuror',
    'connected',
    'connector',
    'consensus',
    'consent',
    'console',
    'consoling',
    'consonant',
    'constable',
    'constant',
    'constrain',
    'constrict',
    'construct',
    'consult',
    'consumer',
    'consuming',
    'contact',
    'container',
    'contempt',
    'contend',
    'contented',
    'contently',
    'contents',
    'contest',
    'context',
    'contort',
    'contour',
    'contrite',
    'control',
    'contusion',
    'convene',
    'convent',
    'copartner',
    'cope',
    'copied',
    'copier',
    'copilot',
    'coping',
    'copious',
    'copper',
    'copy',
    'coral',
    'cork',
    'cornball',
    'cornbread',
    'corncob',
    'cornea',
    'corned',
    'corner',
    'cornfield',
    'cornflake',
    'cornhusk',
    'cornmeal',
    'cornstalk',
    'corny',
    'coronary',
    'coroner',
    'corporal',
    'corporate',
    'corral',
    'correct',
    'corridor',
    'corrode',
    'corroding',
    'corrosive',
    'corsage',
    'corset',
    'cortex',
    'cosigner',
    'cosmetics',
    'cosmic',
    'cosmos',
    'cosponsor',
    'cost',
    'cottage',
    'cotton',
    'couch',
    'cough',
    'could',
    'countable',
    'countdown',
    'counting',
    'countless',
    'country',
    'county',
    'courier',
    'covenant',
    'cover',
    'coveted',
    'coveting',
    'coyness',
    'cozily',
    'coziness',
    'cozy',
    'crabbing',
    'crabgrass',
    'crablike',
    'crabmeat',
    'cradle',
    'cradling',
    'crafter',
    'craftily',
    'craftsman',
    'craftwork',
    'crafty',
    'cramp',
    'cranberry',
    'crane',
    'cranial',
    'cranium',
    'crank',
    'crate',
    'crave',
    'craving',
    'crawfish',
    'crawlers',
    'crawling',
    'crayfish',
    'crayon',
    'crazed',
    'crazily',
    'craziness',
    'crazy',
    'creamed',
    'creamer',
    'creamlike',
    'crease',
    'creasing',
    'creatable',
    'create',
    'creation',
    'creative',
    'creature',
    'credible',
    'credibly',
    'credit',
    'creed',
    'creme',
    'creole',
    'crepe',
    'crept',
    'crescent',
    'crested',
    'cresting',
    'crestless',
    'crevice',
    'crewless',
    'crewman',
    'crewmate',
    'crib',
    'cricket',
    'cried',
    'crier',
    'crimp',
    'crimson',
    'cringe',
    'cringing',
    'crinkle',
    'crinkly',
    'crisped',
    'crisping',
    'crisply',
    'crispness',
    'crispy',
    'criteria',
    'critter',
    'croak',
    'crock',
    'crook',
    'croon',
    'crop',
    'cross',
    'crouch',
    'crouton',
    'crowbar',
    'crowd',
    'crown',
    'crucial',
    'crudely',
    'crudeness',
    'cruelly',
    'cruelness',
    'cruelty',
    'crumb',
    'crummiest',
    'crummy',
    'crumpet',
    'crumpled',
    'cruncher',
    'crunching',
    'crunchy',
    'crusader',
    'crushable',
    'crushed',
    'crusher',
    'crushing',
    'crust',
    'crux',
    'crying',
    'cryptic',
    'crystal',
    'cubbyhole',
    'cube',
    'cubical',
    'cubicle',
    'cucumber',
    'cuddle',
    'cuddly',
    'cufflink',
    'culinary',
    'culminate',
    'culpable',
    'culprit',
    'cultivate',
    'cultural',
    'culture',
    'cupbearer',
    'cupcake',
    'cupid',
    'cupped',
    'cupping',
    'curable',
    'curator',
    'curdle',
    'cure',
    'curfew',
    'curing',
    'curled',
    'curler',
    'curliness',
    'curling',
    'curly',
    'curry',
    'curse',
    'cursive',
    'cursor',
    'curtain',
    'curtly',
    'curtsy',
    'curvature',
    'curve',
    'curvy',
    'cushy',
    'cusp',
    'cussed',
    'custard',
    'custodian',
    'custody',
    'customary',
    'customer',
    'customize',
    'customs',
    'cut',
    'cycle',
    'cyclic',
    'cycling',
    'cyclist',
    'cylinder',
    'cymbal',
    'cytoplasm',
    'cytoplast',
    'dab',
    'dad',
    'daffodil',
    'dagger',
    'daily',
    'daintily',
    'dainty',
    'dairy',
    'daisy',
    'dallying',
    'dance',
    'dancing',
    'dandelion',
    'dander',
    'dandruff',
    'dandy',
    'danger',
    'dangle',
    'dangling',
    'daredevil',
    'dares',
    'daringly',
    'darkened',
    'darkening',
    'darkish',
    'darkness',
    'darkroom',
    'darling',
    'darn',
    'dart',
    'darwinism',
    'dash',
    'dastardly',
    'data',
    'datebook',
    'dating',
    'daughter',
    'daunting',
    'dawdler',
    'dawn',
    'daybed',
    'daybreak',
    'daycare',
    'daydream',
    'daylight',
    'daylong',
    'dayroom',
    'daytime',
    'dazzler',
    'dazzling',
    'deacon',
    'deafening',
    'deafness',
    'dealer',
    'dealing',
    'dealmaker',
    'dealt',
    'dean',
    'debatable',
    'debate',
    'debating',
    'debit',
    'debrief',
    'debtless',
    'debtor',
    'debug',
    'debunk',
    'decade',
    'decaf',
    'decal',
    'decathlon',
    'decay',
    'deceased',
    'deceit',
    'deceiver',
    'deceiving',
    'december',
    'decency',
    'decent',
    'deception',
    'deceptive',
    'decibel',
    'decidable',
    'decimal',
    'decimeter',
    'decipher',
    'deck',
    'declared',
    'decline',
    'decode',
    'decompose',
    'decorated',
    'decorator',
    'decoy',
    'decrease',
    'decree',
    'dedicate',
    'dedicator',
    'deduce',
    'deduct',
    'deed',
    'deem',
    'deepen',
    'deeply',
    'deepness',
    'deface',
    'defacing',
    'defame',
    'default',
    'defeat',
    'defection',
    'defective',
    'defendant',
    'defender',
    'defense',
    'defensive',
    'deferral',
    'deferred',
    'defiance',
    'defiant',
    'defile',
    'defiling',
    'define',
    'definite',
    'deflate',
    'deflation',
    'deflator',
    'deflected',
    'deflector',
    'defog',
    'deforest',
    'defraud',
    'defrost',
    'deftly',
    'defuse',
    'defy',
    'degraded',
    'degrading',
    'degrease',
    'degree',
    'dehydrate',
    'deity',
    'dejected',
    'delay',
    'delegate',
    'delegator',
    'delete',
    'deletion',
    'delicacy',
    'delicate',
    'delicious',
    'delighted',
    'delirious',
    'delirium',
    'deliverer',
    'delivery',
    'delouse',
    'delta',
    'deluge',
    'delusion',
    'deluxe',
    'demanding',
    'demeaning',
    'demeanor',
    'demise',
    'democracy',
    'democrat',
    'demote',
    'demotion',
    'demystify',
    'denatured',
    'deniable',
    'denial',
    'denim',
    'denote',
    'dense',
    'density',
    'dental',
    'dentist',
    'denture',
    'deny',
    'deodorant',
    'deodorize',
    'departed',
    'departure',
    'depict',
    'deplete',
    'depletion',
    'deplored',
    'deploy',
    'deport',
    'depose',
    'depraved',
    'depravity',
    'deprecate',
    'depress',
    'deprive',
    'depth',
    'deputize',
    'deputy',
    'derail',
    'deranged',
    'derby',
    'derived',
    'desecrate',
    'deserve',
    'deserving',
    'designate',
    'designed',
    'designer',
    'designing',
    'deskbound',
    'desktop',
    'deskwork',
    'desolate',
    'despair',
    'despise',
    'despite',
    'destiny',
    'destitute',
    'destruct',
    'detached',
    'detail',
    'detection',
    'detective',
    'detector',
    'detention',
    'detergent',
    'detest',
    'detonate',
    'detonator',
    'detoxify',
    'detract',
    'deuce',
    'devalue',
    'deviancy',
    'deviant',
    'deviate',
    'deviation',
    'deviator',
    'device',
    'devious',
    'devotedly',
    'devotee',
    'devotion',
    'devourer',
    'devouring',
    'devoutly',
    'dexterity',
    'dexterous',
    'diabetes',
    'diabetic',
    'diabolic',
    'diagnoses',
    'diagnosis',
    'diagram',
    'dial',
    'diameter',
    'diaper',
    'diaphragm',
    'diary',
    'dice',
    'dicing',
    'dictate',
    'dictation',
    'dictator',
    'difficult',
    'diffused',
    'diffuser',
    'diffusion',
    'diffusive',
    'dig',
    'dilation',
    'diligence',
    'diligent',
    'dill',
    'dilute',
    'dime',
    'diminish',
    'dimly',
    'dimmed',
    'dimmer',
    'dimness',
    'dimple',
    'diner',
    'dingbat',
    'dinghy',
    'dinginess',
    'dingo',
    'dingy',
    'dining',
    'dinner',
    'diocese',
    'dioxide',
    'diploma',
    'dipped',
    'dipper',
    'dipping',
    'directed',
    'direction',
    'directive',
    'directly',
    'directory',
    'direness',
    'dirtiness',
    'disabled',
    'disagree',
    'disallow',
    'disarm',
    'disarray',
    'disaster',
    'disband',
    'disbelief',
    'disburse',
    'discard',
    'discern',
    'discharge',
    'disclose',
    'discolor',
    'discount',
    'discourse',
    'discover',
    'discuss',
    'disdain',
    'disengage',
    'disfigure',
    'disgrace',
    'dish',
    'disinfect',
    'disjoin',
    'disk',
    'dislike',
    'disliking',
    'dislocate',
    'dislodge',
    'disloyal',
    'dismantle',
    'dismay',
    'dismiss',
    'dismount',
    'disobey',
    'disorder',
    'disown',
    'disparate',
    'disparity',
    'dispatch',
    'dispense',
    'dispersal',
    'dispersed',
    'disperser',
    'displace',
    'display',
    'displease',
    'disposal',
    'dispose',
    'disprove',
    'dispute',
    'disregard',
    'disrupt',
    'dissuade',
    'distance',
    'distant',
    'distaste',
    'distill',
    'distinct',
    'distort',
    'distract',
    'distress',
    'district',
    'distrust',
    'ditch',
    'ditto',
    'ditzy',
    'dividable',
    'divided',
    'dividend',
    'dividers',
    'dividing',
    'divinely',
    'diving',
    'divinity',
    'divisible',
    'divisibly',
    'division',
    'divisive',
    'divorcee',
    'dizziness',
    'dizzy',
    'doable',
    'docile',
    'dock',
    'doctrine',
    'document',
    'dodge',
    'dodgy',
    'doily',
    'doing',
    'dole',
    'dollar',
    'dollhouse',
    'dollop',
    'dolly',
    'dolphin',
    'domain',
    'domelike',
    'domestic',
    'dominion',
    'dominoes',
    'donated',
    'donation',
    'donator',
    'donor',
    'donut',
    'doodle',
    'doorbell',
    'doorframe',
    'doorknob',
    'doorman',
    'doormat',
    'doornail',
    'doorpost',
    'doorstep',
    'doorstop',
    'doorway',
    'doozy',
    'dork',
    'dormitory',
    'dorsal',
    'dosage',
    'dose',
    'dotted',
    'doubling',
    'douche',
    'dove',
    'down',
    'dowry',
    'doze',
    'drab',
    'dragging',
    'dragonfly',
    'dragonish',
    'dragster',
    'drainable',
    'drainage',
    'drained',
    'drainer',
    'drainpipe',
    'dramatic',
    'dramatize',
    'drank',
    'drapery',
    'drastic',
    'draw',
    'dreaded',
    'dreadful',
    'dreadlock',
    'dreamboat',
    'dreamily',
    'dreamland',
    'dreamless',
    'dreamlike',
    'dreamt',
    'dreamy',
    'drearily',
    'dreary',
    'drench',
    'dress',
    'drew',
    'dribble',
    'dried',
    'drier',
    'drift',
    'driller',
    'drilling',
    'drinkable',
    'drinking',
    'dripping',
    'drippy',
    'drivable',
    'driven',
    'driver',
    'driveway',
    'driving',
    'drizzle',
    'drizzly',
    'drone',
    'drool',
    'droop',
    'drop-down',
    'dropbox',
    'dropkick',
    'droplet',
    'dropout',
    'dropper',
    'drove',
    'drown',
    'drowsily',
    'drudge',
    'drum',
    'dry',
    'dubbed',
    'dubiously',
    'duchess',
    'duckbill',
    'ducking',
    'duckling',
    'ducktail',
    'ducky',
    'duct',
    'dude',
    'duffel',
    'dugout',
    'duh',
    'duke',
    'duller',
    'dullness',
    'duly',
    'dumping',
    'dumpling',
    'dumpster',
    'duo',
    'dupe',
    'duplex',
    'duplicate',
    'duplicity',
    'durable',
    'durably',
    'duration',
    'duress',
    'during',
    'dusk',
    'dust',
    'dutiful',
    'duty',
    'duvet',
    'dwarf',
    'dweeb',
    'dwelled',
    'dweller',
    'dwelling',
    'dwindle',
    'dwindling',
    'dynamic',
    'dynamite',
    'dynasty',
    'dyslexia',
    'dyslexic',
    'each',
    'eagle',
    'earache',
    'eardrum',
    'earflap',
    'earful',
    'earlobe',
    'early',
    'earmark',
    'earmuff',
    'earphone',
    'earpiece',
    'earplugs',
    'earring',
    'earshot',
    'earthen',
    'earthlike',
    'earthling',
    'earthly',
    'earthworm',
    'earthy',
    'earwig',
    'easeful',
    'easel',
    'easiest',
    'easily',
    'easiness',
    'easing',
    'eastbound',
    'eastcoast',
    'easter',
    'eastward',
    'eatable',
    'eaten',
    'eatery',
    'eating',
    'eats',
    'ebay',
    'ebony',
    'ebook',
    'ecard',
    'eccentric',
    'echo',
    'eclair',
    'eclipse',
    'ecologist',
    'ecology',
    'economic',
    'economist',
    'economy',
    'ecosphere',
    'ecosystem',
    'edge',
    'edginess',
    'edging',
    'edgy',
    'edition',
    'editor',
    'educated',
    'education',
    'educator',
    'eel',
    'effective',
    'effects',
    'efficient',
    'effort',
    'eggbeater',
    'egging',
    'eggnog',
    'eggplant',
    'eggshell',
    'egomaniac',
    'egotism',
    'egotistic',
    'either',
    'eject',
    'elaborate',
    'elastic',
    'elated',
    'elbow',
    'eldercare',
    'elderly',
    'eldest',
    'electable',
    'election',
    'elective',
    'elephant',
    'elevate',
    'elevating',
    'elevation',
    'elevator',
    'eleven',
    'elf',
    'eligible',
    'eligibly',
    'eliminate',
    'elite',
    'elitism',
    'elixir',
    'elk',
    'ellipse',
    'elliptic',
    'elm',
    'elongated',
    'elope',
    'eloquence',
    'eloquent',
    'elsewhere',
    'elude',
    'elusive',
    'elves',
    'email',
    'embargo',
    'embark',
    'embassy',
    'embattled',
    'embellish',
    'ember',
    'embezzle',
    'emblaze',
    'emblem',
    'embody',
    'embolism',
    'emboss',
    'embroider',
    'emcee',
    'emerald',
    'emergency',
    'emission',
    'emit',
    'emote',
    'emoticon',
    'emotion',
    'empathic',
    'empathy',
    'emperor',
    'emphases',
    'emphasis',
    'emphasize',
    'emphatic',
    'empirical',
    'employed',
    'employee',
    'employer',
    'emporium',
    'empower',
    'emptier',
    'emptiness',
    'empty',
    'emu',
    'enable',
    'enactment',
    'enamel',
    'enchanted',
    'enchilada',
    'encircle',
    'enclose',
    'enclosure',
    'encode',
    'encore',
    'encounter',
    'encourage',
    'encroach',
    'encrust',
    'encrypt',
    'endanger',
    'endeared',
    'endearing',
    'ended',
    'ending',
    'endless',
    'endnote',
    'endocrine',
    'endorphin',
    'endorse',
    'endowment',
    'endpoint',
    'endurable',
    'endurance',
    'enduring',
    'energetic',
    'energize',
    'energy',
    'enforced',
    'enforcer',
    'engaged',
    'engaging',
    'engine',
    'engorge',
    'engraved',
    'engraver',
    'engraving',
    'engross',
    'engulf',
    'enhance',
    'enigmatic',
    'enjoyable',
    'enjoyably',
    'enjoyer',
    'enjoying',
    'enjoyment',
    'enlarged',
    'enlarging',
    'enlighten',
    'enlisted',
    'enquirer',
    'enrage',
    'enrich',
    'enroll',
    'enslave',
    'ensnare',
    'ensure',
    'entail',
    'entangled',
    'entering',
    'entertain',
    'enticing',
    'entire',
    'entitle',
    'entity',
    'entomb',
    'entourage',
    'entrap',
    'entree',
    'entrench',
    'entrust',
    'entryway',
    'entwine',
    'enunciate',
    'envelope',
    'enviable',
    'enviably',
    'envious',
    'envision',
    'envoy',
    'envy',
    'enzyme',
    'epic',
    'epidemic',
    'epidermal',
    'epidermis',
    'epidural',
    'epilepsy',
    'epileptic',
    'epilogue',
    'epiphany',
    'episode',
    'equal',
    'equate',
    'equation',
    'equator',
    'equinox',
    'equipment',
    'equity',
    'equivocal',
    'eradicate',
    'erasable',
    'erased',
    'eraser',
    'erasure',
    'ergonomic',
    'errand',
    'errant',
    'erratic',
    'error',
    'erupt',
    'escalate',
    'escalator',
    'escapable',
    'escapade',
    'escapist',
    'escargot',
    'eskimo',
    'esophagus',
    'espionage',
    'espresso',
    'esquire',
    'essay',
    'essence',
    'essential',
    'establish',
    'estate',
    'esteemed',
    'estimate',
    'estimator',
    'estranged',
    'estrogen',
    'etching',
    'eternal',
    'eternity',
    'ethanol',
    'ether',
    'ethically',
    'ethics',
    'euphemism',
    'evacuate',
    'evacuee',
    'evade',
    'evaluate',
    'evaluator',
    'evaporate',
    'evasion',
    'evasive',
    'even',
    'everglade',
    'evergreen',
    'everybody',
    'everyday',
    'everyone',
    'evict',
    'evidence',
    'evident',
    'evil',
    'evoke',
    'evolution',
    'evolve',
    'exact',
    'exalted',
    'example',
    'excavate',
    'excavator',
    'exceeding',
    'exception',
    'excess',
    'exchange',
    'excitable',
    'exciting',
    'exclaim',
    'exclude',
    'excluding',
    'exclusion',
    'exclusive',
    'excretion',
    'excretory',
    'excursion',
    'excusable',
    'excusably',
    'excuse',
    'exemplary',
    'exemplify',
    'exemption',
    'exerciser',
    'exert',
    'exes',
    'exfoliate',
    'exhale',
    'exhaust',
    'exhume',
    'exile',
    'existing',
    'exit',
    'exodus',
    'exonerate',
    'exorcism',
    'exorcist',
    'expand',
    'expanse',
    'expansion',
    'expansive',
    'expectant',
    'expedited',
    'expediter',
    'expel',
    'expend',
    'expenses',
    'expensive',
    'expert',
    'expire',
    'expiring',
    'explain',
    'expletive',
    'explicit',
    'explode',
    'exploit',
    'explore',
    'exploring',
    'exponent',
    'exporter',
    'exposable',
    'expose',
    'exposure',
    'express',
    'expulsion',
    'exquisite',
    'extended',
    'extending',
    'extent',
    'extenuate',
    'exterior',
    'external',
    'extinct',
    'extortion',
    'extradite',
    'extras',
    'extrovert',
    'extrude',
    'extruding',
    'exuberant',
    'fable',
    'fabric',
    'fabulous',
    'facebook',
    'facecloth',
    'facedown',
    'faceless',
    'facelift',
    'faceplate',
    'faceted',
    'facial',
    'facility',
    'facing',
    'facsimile',
    'faction',
    'factoid',
    'factor',
    'factsheet',
    'factual',
    'faculty',
    'fade',
    'fading',
    'failing',
    'falcon',
    'fall',
    'false',
    'falsify',
    'fame',
    'familiar',
    'family',
    'famine',
    'famished',
    'fanatic',
    'fancied',
    'fanciness',
    'fancy',
    'fanfare',
    'fang',
    'fanning',
    'fantasize',
    'fantastic',
    'fantasy',
    'fascism',
    'fastball',
    'faster',
    'fasting',
    'fastness',
    'faucet',
    'favorable',
    'favorably',
    'favored',
    'favoring',
    'favorite',
    'fax',
    'feast',
    'federal',
    'fedora',
    'feeble',
    'feed',
    'feel',
    'feisty',
    'feline',
    'felt-tip',
    'feminine',
    'feminism',
    'feminist',
    'feminize',
    'femur',
    'fence',
    'fencing',
    'fender',
    'ferment',
    'fernlike',
    'ferocious',
    'ferocity',
    'ferret',
    'ferris',
    'ferry',
    'fervor',
    'fester',
    'festival',
    'festive',
    'festivity',
    'fetal',
    'fetch',
    'fever',
    'fiber',
    'fiction',
    'fiddle',
    'fiddling',
    'fidelity',
    'fidgeting',
    'fidgety',
    'fifteen',
    'fifth',
    'fiftieth',
    'fifty',
    'figment',
    'figure',
    'figurine',
    'filing',
    'filled',
    'filler',
    'filling',
    'film',
    'filter',
    'filth',
    'filtrate',
    'finale',
    'finalist',
    'finalize',
    'finally',
    'finance',
    'financial',
    'finch',
    'fineness',
    'finer',
    'finicky',
    'finished',
    'finisher',
    'finishing',
    'finite',
    'finless',
    'finlike',
    'fiscally',
    'fit',
    'five',
    'flaccid',
    'flagman',
    'flagpole',
    'flagship',
    'flagstick',
    'flagstone',
    'flail',
    'flakily',
    'flaky',
    'flame',
    'flammable',
    'flanked',
    'flanking',
    'flannels',
    'flap',
    'flaring',
    'flashback',
    'flashbulb',
    'flashcard',
    'flashily',
    'flashing',
    'flashy',
    'flask',
    'flatbed',
    'flatfoot',
    'flatly',
    'flatness',
    'flatten',
    'flattered',
    'flatterer',
    'flattery',
    'flattop',
    'flatware',
    'flatworm',
    'flavored',
    'flavorful',
    'flavoring',
    'flaxseed',
    'fled',
    'fleshed',
    'fleshy',
    'flick',
    'flier',
    'flight',
    'flinch',
    'fling',
    'flint',
    'flip',
    'flirt',
    'float',
    'flock',
    'flogging',
    'flop',
    'floral',
    'florist',
    'floss',
    'flounder',
    'flyable',
    'flyaway',
    'flyer',
    'flying',
    'flyover',
    'flypaper',
    'foam',
    'foe',
    'fog',
    'foil',
    'folic',
    'folk',
    'follicle',
    'follow',
    'fondling',
    'fondly',
    'fondness',
    'fondue',
    'font',
    'food',
    'fool',
    'footage',
    'football',
    'footbath',
    'footboard',
    'footer',
    'footgear',
    'foothill',
    'foothold',
    'footing',
    'footless',
    'footman',
    'footnote',
    'footpad',
    'footpath',
    'footprint',
    'footrest',
    'footsie',
    'footsore',
    'footwear',
    'footwork',
    'fossil',
    'foster',
    'founder',
    'founding',
    'fountain',
    'fox',
    'foyer',
    'fraction',
    'fracture',
    'fragile',
    'fragility',
    'fragment',
    'fragrance',
    'fragrant',
    'frail',
    'frame',
    'framing',
    'frantic',
    'fraternal',
    'frayed',
    'fraying',
    'frays',
    'freckled',
    'freckles',
    'freebase',
    'freebee',
    'freebie',
    'freedom',
    'freefall',
    'freehand',
    'freeing',
    'freeload',
    'freely',
    'freemason',
    'freeness',
    'freestyle',
    'freeware',
    'freeway',
    'freewill',
    'freezable',
    'freezing',
    'freight',
    'french',
    'frenzied',
    'frenzy',
    'frequency',
    'frequent',
    'fresh',
    'fretful',
    'fretted',
    'friction',
    'friday',
    'fridge',
    'fried',
    'friend',
    'frighten',
    'frightful',
    'frigidity',
    'frigidly',
    'frill',
    'fringe',
    'frisbee',
    'frisk',
    'fritter',
    'frivolous',
    'frolic',
    'from',
    'front',
    'frostbite',
    'frosted',
    'frostily',
    'frosting',
    'frostlike',
    'frosty',
    'froth',
    'frown',
    'frozen',
    'fructose',
    'frugality',
    'frugally',
    'fruit',
    'frustrate',
    'frying',
    'gab',
    'gaffe',
    'gag',
    'gainfully',
    'gaining',
    'gains',
    'gala',
    'gallantly',
    'galleria',
    'gallery',
    'galley',
    'gallon',
    'gallows',
    'gallstone',
    'galore',
    'galvanize',
    'gambling',
    'game',
    'gaming',
    'gamma',
    'gander',
    'gangly',
    'gangrene',
    'gangway',
    'gap',
    'garage',
    'garbage',
    'garden',
    'gargle',
    'garland',
    'garlic',
    'garment',
    'garnet',
    'garnish',
    'garter',
    'gas',
    'gatherer',
    'gathering',
    'gating',
    'gauging',
    'gauntlet',
    'gauze',
    'gave',
    'gawk',
    'gazing',
    'gear',
    'gecko',
    'geek',
    'geiger',
    'gem',
    'gender',
    'generic',
    'generous',
    'genetics',
    'genre',
    'gentile',
    'gentleman',
    'gently',
    'gents',
    'geography',
    'geologic',
    'geologist',
    'geology',
    'geometric',
    'geometry',
    'geranium',
    'gerbil',
    'geriatric',
    'germicide',
    'germinate',
    'germless',
    'germproof',
    'gestate',
    'gestation',
    'gesture',
    'getaway',
    'getting',
    'getup',
    'giant',
    'gibberish',
    'giblet',
    'giddily',
    'giddiness',
    'giddy',
    'gift',
    'gigabyte',
    'gigahertz',
    'gigantic',
    'giggle',
    'giggling',
    'giggly',
    'gigolo',
    'gilled',
    'gills',
    'gimmick',
    'girdle',
    'giveaway',
    'given',
    'giver',
    'giving',
    'gizmo',
    'gizzard',
    'glacial',
    'glacier',
    'glade',
    'gladiator',
    'gladly',
    'glamorous',
    'glamour',
    'glance',
    'glancing',
    'glandular',
    'glare',
    'glaring',
    'glass',
    'glaucoma',
    'glazing',
    'gleaming',
    'gleeful',
    'glider',
    'gliding',
    'glimmer',
    'glimpse',
    'glisten',
    'glitch',
    'glitter',
    'glitzy',
    'gloater',
    'gloating',
    'gloomily',
    'gloomy',
    'glorified',
    'glorifier',
    'glorify',
    'glorious',
    'glory',
    'gloss',
    'glove',
    'glowing',
    'glowworm',
    'glucose',
    'glue',
    'gluten',
    'glutinous',
    'glutton',
    'gnarly',
    'gnat',
    'goal',
    'goatskin',
    'goes',
    'goggles',
    'going',
    'goldfish',
    'goldmine',
    'goldsmith',
    'golf',
    'goliath',
    'gonad',
    'gondola',
    'gone',
    'gong',
    'good',
    'gooey',
    'goofball',
    'goofiness',
    'goofy',
    'google',
    'goon',
    'gopher',
    'gore',
    'gorged',
    'gorgeous',
    'gory',
    'gosling',
    'gossip',
    'gothic',
    'gotten',
    'gout',
    'gown',
    'grab',
    'graceful',
    'graceless',
    'gracious',
    'gradation',
    'graded',
    'grader',
    'gradient',
    'grading',
    'gradually',
    'graduate',
    'graffiti',
    'grafted',
    'grafting',
    'grain',
    'granddad',
    'grandkid',
    'grandly',
    'grandma',
    'grandpa',
    'grandson',
    'granite',
    'granny',
    'granola',
    'grant',
    'granular',
    'grape',
    'graph',
    'grapple',
    'grappling',
    'grasp',
    'grass',
    'gratified',
    'gratify',
    'grating',
    'gratitude',
    'gratuity',
    'gravel',
    'graveness',
    'graves',
    'graveyard',
    'gravitate',
    'gravity',
    'gravy',
    'gray',
    'grazing',
    'greasily',
    'greedily',
    'greedless',
    'greedy',
    'green',
    'greeter',
    'greeting',
    'grew',
    'greyhound',
    'grid',
    'grief',
    'grievance',
    'grieving',
    'grievous',
    'grill',
    'grimace',
    'grimacing',
    'grime',
    'griminess',
    'grimy',
    'grinch',
    'grinning',
    'grip',
    'gristle',
    'grit',
    'groggily',
    'groggy',
    'groin',
    'groom',
    'groove',
    'grooving',
    'groovy',
    'grope',
    'ground',
    'grouped',
    'grout',
    'grove',
    'grower',
    'growing',
    'growl',
    'grub',
    'grudge',
    'grudging',
    'grueling',
    'gruffly',
    'grumble',
    'grumbling',
    'grumbly',
    'grumpily',
    'grunge',
    'grunt',
    'guacamole',
    'guidable',
    'guidance',
    'guide',
    'guiding',
    'guileless',
    'guise',
    'gulf',
    'gullible',
    'gully',
    'gulp',
    'gumball',
    'gumdrop',
    'gumminess',
    'gumming',
    'gummy',
    'gurgle',
    'gurgling',
    'guru',
    'gush',
    'gusto',
    'gusty',
    'gutless',
    'guts',
    'gutter',
    'guy',
    'guzzler',
    'gyration',
    'habitable',
    'habitant',
    'habitat',
    'habitual',
    'hacked',
    'hacker',
    'hacking',
    'hacksaw',
    'had',
    'haggler',
    'haiku',
    'half',
    'halogen',
    'halt',
    'halved',
    'halves',
    'hamburger',
    'hamlet',
    'hammock',
    'hamper',
    'hamster',
    'hamstring',
    'handbag',
    'handball',
    'handbook',
    'handbrake',
    'handcart',
    'handclap',
    'handclasp',
    'handcraft',
    'handcuff',
    'handed',
    'handful',
    'handgrip',
    'handgun',
    'handheld',
    'handiness',
    'handiwork',
    'handlebar',
    'handled',
    'handler',
    'handling',
    'handmade',
    'handoff',
    'handpick',
    'handprint',
    'handrail',
    'handsaw',
    'handset',
    'handsfree',
    'handshake',
    'handstand',
    'handwash',
    'handwork',
    'handwoven',
    'handwrite',
    'handyman',
    'hangnail',
    'hangout',
    'hangover',
    'hangup',
    'hankering',
    'hankie',
    'hanky',
    'haphazard',
    'happening',
    'happier',
    'happiest',
    'happily',
    'happiness',
    'happy',
    'harbor',
    'hardcopy',
    'hardcore',
    'hardcover',
    'harddisk',
    'hardened',
    'hardener',
    'hardening',
    'hardhat',
    'hardhead',
    'hardiness',
    'hardly',
    'hardness',
    'hardship',
    'hardware',
    'hardwired',
    'hardwood',
    'hardy',
    'harmful',
    'harmless',
    'harmonica',
    'harmonics',
    'harmonize',
    'harmony',
    'harness',
    'harpist',
    'harsh',
    'harvest',
    'hash',
    'hassle',
    'haste',
    'hastily',
    'hastiness',
    'hasty',
    'hatbox',
    'hatchback',
    'hatchery',
    'hatchet',
    'hatching',
    'hatchling',
    'hate',
    'hatless',
    'hatred',
    'haunt',
    'haven',
    'hazard',
    'hazelnut',
    'hazily',
    'haziness',
    'hazing',
    'hazy',
    'headache',
    'headband',
    'headboard',
    'headcount',
    'headdress',
    'headed',
    'header',
    'headfirst',
    'headgear',
    'heading',
    'headlamp',
    'headless',
    'headlock',
    'headphone',
    'headpiece',
    'headrest',
    'headroom',
    'headscarf',
    'headset',
    'headsman',
    'headstand',
    'headstone',
    'headway',
    'headwear',
    'heap',
    'heat',
    'heave',
    'heavily',
    'heaviness',
    'heaving',
    'hedge',
    'hedging',
    'heftiness',
    'hefty',
    'helium',
    'helmet',
    'helper',
    'helpful',
    'helping',
    'helpless',
    'helpline',
    'hemlock',
    'hemstitch',
    'hence',
    'henchman',
    'henna',
    'herald',
    'herbal',
    'herbicide',
    'herbs',
    'heritage',
    'hermit',
    'heroics',
    'heroism',
    'herring',
    'herself',
    'hertz',
    'hesitancy',
    'hesitant',
    'hesitate',
    'hexagon',
    'hexagram',
    'hubcap',
    'huddle',
    'huddling',
    'huff',
    'hug',
    'hula',
    'hulk',
    'hull',
    'human',
    'humble',
    'humbling',
    'humbly',
    'humid',
    'humiliate',
    'humility',
    'humming',
    'hummus',
    'humongous',
    'humorist',
    'humorless',
    'humorous',
    'humpback',
    'humped',
    'humvee',
    'hunchback',
    'hundredth',
    'hunger',
    'hungrily',
    'hungry',
    'hunk',
    'hunter',
    'hunting',
    'huntress',
    'huntsman',
    'hurdle',
    'hurled',
    'hurler',
    'hurling',
    'hurray',
    'hurricane',
    'hurried',
    'hurry',
    'hurt',
    'husband',
    'hush',
    'husked',
    'huskiness',
    'hut',
    'hybrid',
    'hydrant',
    'hydrated',
    'hydration',
    'hydrogen',
    'hydroxide',
    'hyperlink',
    'hypertext',
    'hyphen',
    'hypnoses',
    'hypnosis',
    'hypnotic',
    'hypnotism',
    'hypnotist',
    'hypnotize',
    'hypocrisy',
    'hypocrite',
    'ibuprofen',
    'ice',
    'iciness',
    'icing',
    'icky',
    'icon',
    'icy',
    'idealism',
    'idealist',
    'idealize',
    'ideally',
    'idealness',
    'identical',
    'identify',
    'identity',
    'ideology',
    'idiocy',
    'idiom',
    'idly',
    'igloo',
    'ignition',
    'ignore',
    'iguana',
    'illicitly',
    'illusion',
    'illusive',
    'image',
    'imaginary',
    'imagines',
    'imaging',
    'imbecile',
    'imitate',
    'imitation',
    'immature',
    'immerse',
    'immersion',
    'imminent',
    'immobile',
    'immodest',
    'immorally',
    'immortal',
    'immovable',
    'immovably',
    'immunity',
    'immunize',
    'impaired',
    'impale',
    'impart',
    'impatient',
    'impeach',
    'impeding',
    'impending',
    'imperfect',
    'imperial',
    'impish',
    'implant',
    'implement',
    'implicate',
    'implicit',
    'implode',
    'implosion',
    'implosive',
    'imply',
    'impolite',
    'important',
    'importer',
    'impose',
    'imposing',
    'impotence',
    'impotency',
    'impotent',
    'impound',
    'imprecise',
    'imprint',
    'imprison',
    'impromptu',
    'improper',
    'improve',
    'improving',
    'improvise',
    'imprudent',
    'impulse',
    'impulsive',
    'impure',
    'impurity',
    'iodine',
    'iodize',
    'ion',
    'ipad',
    'iphone',
    'ipod',
    'irate',
    'irk',
    'iron',
    'irregular',
    'irrigate',
    'irritable',
    'irritably',
    'irritant',
    'irritate',
    'islamic',
    'islamist',
    'isolated',
    'isolating',
    'isolation',
    'isotope',
    'issue',
    'issuing',
    'italicize',
    'italics',
    'item',
    'itinerary',
    'itunes',
    'ivory',
    'ivy',
    'jab',
    'jackal',
    'jacket',
    'jackknife',
    'jackpot',
    'jailbird',
    'jailbreak',
    'jailer',
    'jailhouse',
    'jalapeno',
    'jam',
    'janitor',
    'january',
    'jargon',
    'jarring',
    'jasmine',
    'jaundice',
    'jaunt',
    'java',
    'jawed',
    'jawless',
    'jawline',
    'jaws',
    'jaybird',
    'jaywalker',
    'jazz',
    'jeep',
    'jeeringly',
    'jellied',
    'jelly',
    'jersey',
    'jester',
    'jet',
    'jiffy',
    'jigsaw',
    'jimmy',
    'jingle',
    'jingling',
    'jinx',
    'jitters',
    'jittery',
    'job',
    'jockey',
    'jockstrap',
    'jogger',
    'jogging',
    'john',
    'joining',
    'jokester',
    'jokingly',
    'jolliness',
    'jolly',
    'jolt',
    'jot',
    'jovial',
    'joyfully',
    'joylessly',
    'joyous',
    'joyride',
    'joystick',
    'jubilance',
    'jubilant',
    'judge',
    'judgingly',
    'judicial',
    'judiciary',
    'judo',
    'juggle',
    'juggling',
    'jugular',
    'juice',
    'juiciness',
    'juicy',
    'jujitsu',
    'jukebox',
    'july',
    'jumble',
    'jumbo',
    'jump',
    'junction',
    'juncture',
    'june',
    'junior',
    'juniper',
    'junkie',
    'junkman',
    'junkyard',
    'jurist',
    'juror',
    'jury',
    'justice',
    'justifier',
    'justify',
    'justly',
    'justness',
    'juvenile',
    'kabob',
    'kangaroo',
    'karaoke',
    'karate',
    'karma',
    'kebab',
    'keenly',
    'keenness',
    'keep',
    'keg',
    'kelp',
    'kennel',
    'kept',
    'kerchief',
    'kerosene',
    'kettle',
    'kick',
    'kiln',
    'kilobyte',
    'kilogram',
    'kilometer',
    'kilowatt',
    'kilt',
    'kimono',
    'kindle',
    'kindling',
    'kindly',
    'kindness',
    'kindred',
    'kinetic',
    'kinfolk',
    'king',
    'kinship',
    'kinsman',
    'kinswoman',
    'kissable',
    'kisser',
    'kissing',
    'kitchen',
    'kite',
    'kitten',
    'kitty',
    'kiwi',
    'kleenex',
    'knapsack',
    'knee',
    'knelt',
    'knickers',
    'knoll',
    'koala',
    'kooky',
    'kosher',
    'krypton',
    'kudos',
    'kung',
    'labored',
    'laborer',
    'laboring',
    'laborious',
    'labrador',
    'ladder',
    'ladies',
    'ladle',
    'ladybug',
    'ladylike',
    'lagged',
    'lagging',
    'lagoon',
    'lair',
    'lake',
    'lance',
    'landed',
    'landfall',
    'landfill',
    'landing',
    'landlady',
    'landless',
    'landline',
    'landlord',
    'landmark',
    'landmass',
    'landmine',
    'landowner',
    'landscape',
    'landside',
    'landslide',
    'language',
    'lankiness',
    'lanky',
    'lantern',
    'lapdog',
    'lapel',
    'lapped',
    'lapping',
    'laptop',
    'lard',
    'large',
    'lark',
    'lash',
    'lasso',
    'last',
    'latch',
    'late',
    'lather',
    'latitude',
    'latrine',
    'latter',
    'latticed',
    'launch',
    'launder',
    'laundry',
    'laurel',
    'lavender',
    'lavish',
    'laxative',
    'lazily',
    'laziness',
    'lazy',
    'lecturer',
    'left',
    'legacy',
    'legal',
    'legend',
    'legged',
    'leggings',
    'legible',
    'legibly',
    'legislate',
    'lego',
    'legroom',
    'legume',
    'legwarmer',
    'legwork',
    'lemon',
    'lend',
    'length',
    'lens',
    'lent',
    'leotard',
    'lesser',
    'letdown',
    'lethargic',
    'lethargy',
    'letter',
    'lettuce',
    'level',
    'leverage',
    'levers',
    'levitate',
    'levitator',
    'liability',
    'liable',
    'liberty',
    'librarian',
    'library',
    'licking',
    'licorice',
    'lid',
    'life',
    'lifter',
    'lifting',
    'liftoff',
    'ligament',
    'likely',
    'likeness',
    'likewise',
    'liking',
    'lilac',
    'lilly',
    'lily',
    'limb',
    'limeade',
    'limelight',
    'limes',
    'limit',
    'limping',
    'limpness',
    'line',
    'lingo',
    'linguini',
    'linguist',
    'lining',
    'linked',
    'linoleum',
    'linseed',
    'lint',
    'lion',
    'lip',
    'liquefy',
    'liqueur',
    'liquid',
    'lisp',
    'list',
    'litigate',
    'litigator',
    'litmus',
    'litter',
    'little',
    'livable',
    'lived',
    'lively',
    'liver',
    'livestock',
    'lividly',
    'living',
    'lizard',
    'lubricant',
    'lubricate',
    'lucid',
    'luckily',
    'luckiness',
    'luckless',
    'lucrative',
    'ludicrous',
    'lugged',
    'lukewarm',
    'lullaby',
    'lumber',
    'luminance',
    'luminous',
    'lumpiness',
    'lumping',
    'lumpish',
    'lunacy',
    'lunar',
    'lunchbox',
    'luncheon',
    'lunchroom',
    'lunchtime',
    'lung',
    'lurch',
    'lure',
    'luridness',
    'lurk',
    'lushly',
    'lushness',
    'luster',
    'lustfully',
    'lustily',
    'lustiness',
    'lustrous',
    'lusty',
    'luxurious',
    'luxury',
    'lying',
    'lyrically',
    'lyricism',
    'lyricist',
    'lyrics',
    'macarena',
    'macaroni',
    'macaw',
    'mace',
    'machine',
    'machinist',
    'magazine',
    'magenta',
    'maggot',
    'magical',
    'magician',
    'magma',
    'magnesium',
    'magnetic',
    'magnetism',
    'magnetize',
    'magnifier',
    'magnify',
    'magnitude',
    'magnolia',
    'mahogany',
    'maimed',
    'majestic',
    'majesty',
    'majorette',
    'majority',
    'makeover',
    'maker',
    'makeshift',
    'making',
    'malformed',
    'malt',
    'mama',
    'mammal',
    'mammary',
    'mammogram',
    'manager',
    'managing',
    'manatee',
    'mandarin',
    'mandate',
    'mandatory',
    'mandolin',
    'manger',
    'mangle',
    'mango',
    'mangy',
    'manhandle',
    'manhole',
    'manhood',
    'manhunt',
    'manicotti',
    'manicure',
    'manifesto',
    'manila',
    'mankind',
    'manlike',
    'manliness',
    'manly',
    'manmade',
    'manned',
    'mannish',
    'manor',
    'manpower',
    'mantis',
    'mantra',
    'manual',
    'many',
    'map',
    'marathon',
    'marauding',
    'marbled',
    'marbles',
    'marbling',
    'march',
    'mardi',
    'margarine',
    'margarita',
    'margin',
    'marigold',
    'marina',
    'marine',
    'marital',
    'maritime',
    'marlin',
    'marmalade',
    'maroon',
    'married',
    'marrow',
    'marry',
    'marshland',
    'marshy',
    'marsupial',
    'marvelous',
    'marxism',
    'mascot',
    'masculine',
    'mashed',
    'mashing',
    'massager',
    'masses',
    'massive',
    'mastiff',
    'matador',
    'matchbook',
    'matchbox',
    'matcher',
    'matching',
    'matchless',
    'material',
    'maternal',
    'maternity',
    'math',
    'mating',
    'matriarch',
    'matrimony',
    'matrix',
    'matron',
    'matted',
    'matter',
    'maturely',
    'maturing',
    'maturity',
    'mauve',
    'maverick',
    'maximize',
    'maximum',
    'maybe',
    'mayday',
    'mayflower',
    'moaner',
    'moaning',
    'mobile',
    'mobility',
    'mobilize',
    'mobster',
    'mocha',
    'mocker',
    'mockup',
    'modified',
    'modify',
    'modular',
    'modulator',
    'module',
    'moisten',
    'moistness',
    'moisture',
    'molar',
    'molasses',
    'mold',
    'molecular',
    'molecule',
    'molehill',
    'mollusk',
    'mom',
    'monastery',
    'monday',
    'monetary',
    'monetize',
    'moneybags',
    'moneyless',
    'moneywise',
    'mongoose',
    'mongrel',
    'monitor',
    'monkhood',
    'monogamy',
    'monogram',
    'monologue',
    'monopoly',
    'monorail',
    'monotone',
    'monotype',
    'monoxide',
    'monsieur',
    'monsoon',
    'monstrous',
    'monthly',
    'monument',
    'moocher',
    'moodiness',
    'moody',
    'mooing',
    'moonbeam',
    'mooned',
    'moonlight',
    'moonlike',
    'moonlit',
    'moonrise',
    'moonscape',
    'moonshine',
    'moonstone',
    'moonwalk',
    'mop',
    'morale',
    'morality',
    'morally',
    'morbidity',
    'morbidly',
    'morphine',
    'morphing',
    'morse',
    'mortality',
    'mortally',
    'mortician',
    'mortified',
    'mortify',
    'mortuary',
    'mosaic',
    'mossy',
    'most',
    'mothball',
    'mothproof',
    'motion',
    'motivate',
    'motivator',
    'motive',
    'motocross',
    'motor',
    'motto',
    'mountable',
    'mountain',
    'mounted',
    'mounting',
    'mourner',
    'mournful',
    'mouse',
    'mousiness',
    'moustache',
    'mousy',
    'mouth',
    'movable',
    'move',
    'movie',
    'moving',
    'mower',
    'mowing',
    'much',
    'muck',
    'mud',
    'mug',
    'mulberry',
    'mulch',
    'mule',
    'mulled',
    'mullets',
    'multiple',
    'multiply',
    'multitask',
    'multitude',
    'mumble',
    'mumbling',
    'mumbo',
    'mummified',
    'mummify',
    'mummy',
    'mumps',
    'munchkin',
    'mundane',
    'municipal',
    'muppet',
    'mural',
    'murkiness',
    'murky',
    'murmuring',
    'muscular',
    'museum',
    'mushily',
    'mushiness',
    'mushroom',
    'mushy',
    'music',
    'musket',
    'muskiness',
    'musky',
    'mustang',
    'mustard',
    'muster',
    'mustiness',
    'musty',
    'mutable',
    'mutate',
    'mutation',
    'mute',
    'mutilated',
    'mutilator',
    'mutiny',
    'mutt',
    'mutual',
    'muzzle',
    'myself',
    'myspace',
    'mystified',
    'mystify',
    'myth',
    'nacho',
    'nag',
    'nail',
    'name',
    'naming',
    'nanny',
    'nanometer',
    'nape',
    'napkin',
    'napped',
    'napping',
    'nappy',
    'narrow',
    'nastily',
    'nastiness',
    'national',
    'native',
    'nativity',
    'natural',
    'nature',
    'naturist',
    'nautical',
    'navigate',
    'navigator',
    'navy',
    'nearby',
    'nearest',
    'nearly',
    'nearness',
    'neatly',
    'neatness',
    'nebula',
    'nebulizer',
    'nectar',
    'negate',
    'negation',
    'negative',
    'neglector',
    'negligee',
    'negligent',
    'negotiate',
    'nemeses',
    'nemesis',
    'neon',
    'nephew',
    'nerd',
    'nervous',
    'nervy',
    'nest',
    'net',
    'neurology',
    'neuron',
    'neurosis',
    'neurotic',
    'neuter',
    'neutron',
    'never',
    'next',
    'nibble',
    'nickname',
    'nicotine',
    'niece',
    'nifty',
    'nimble',
    'nimbly',
    'nineteen',
    'ninetieth',
    'ninja',
    'nintendo',
    'ninth',
    'nuclear',
    'nuclei',
    'nucleus',
    'nugget',
    'nullify',
    'number',
    'numbing',
    'numbly',
    'numbness',
    'numeral',
    'numerate',
    'numerator',
    'numeric',
    'numerous',
    'nuptials',
    'nursery',
    'nursing',
    'nurture',
    'nutcase',
    'nutlike',
    'nutmeg',
    'nutrient',
    'nutshell',
    'nuttiness',
    'nutty',
    'nuzzle',
    'nylon',
    'oaf',
    'oak',
    'oasis',
    'oat',
    'obedience',
    'obedient',
    'obituary',
    'object',
    'obligate',
    'obliged',
    'oblivion',
    'oblivious',
    'oblong',
    'obnoxious',
    'oboe',
    'obscure',
    'obscurity',
    'observant',
    'observer',
    'observing',
    'obsessed',
    'obsession',
    'obsessive',
    'obsolete',
    'obstacle',
    'obstinate',
    'obstruct',
    'obtain',
    'obtrusive',
    'obtuse',
    'obvious',
    'occultist',
    'occupancy',
    'occupant',
    'occupier',
    'occupy',
    'ocean',
    'ocelot',
    'octagon',
    'octane',
    'october',
    'octopus',
    'ogle',
    'oil',
    'oink',
    'ointment',
    'okay',
    'old',
    'olive',
    'olympics',
    'omega',
    'omen',
    'ominous',
    'omission',
    'omit',
    'omnivore',
    'onboard',
    'oncoming',
    'ongoing',
    'onion',
    'online',
    'onlooker',
    'only',
    'onscreen',
    'onset',
    'onshore',
    'onslaught',
    'onstage',
    'onto',
    'onward',
    'onyx',
    'oops',
    'ooze',
    'oozy',
    'opacity',
    'opal',
    'open',
    'operable',
    'operate',
    'operating',
    'operation',
    'operative',
    'operator',
    'opium',
    'opossum',
    'opponent',
    'oppose',
    'opposing',
    'opposite',
    'oppressed',
    'oppressor',
    'opt',
    'opulently',
    'osmosis',
    'other',
    'otter',
    'ouch',
    'ought',
    'ounce',
    'outage',
    'outback',
    'outbid',
    'outboard',
    'outbound',
    'outbreak',
    'outburst',
    'outcast',
    'outclass',
    'outcome',
    'outdated',
    'outdoors',
    'outer',
    'outfield',
    'outfit',
    'outflank',
    'outgoing',
    'outgrow',
    'outhouse',
    'outing',
    'outlast',
    'outlet',
    'outline',
    'outlook',
    'outlying',
    'outmatch',
    'outmost',
    'outnumber',
    'outplayed',
    'outpost',
    'outpour',
    'output',
    'outrage',
    'outrank',
    'outreach',
    'outright',
    'outscore',
    'outsell',
    'outshine',
    'outshoot',
    'outsider',
    'outskirts',
    'outsmart',
    'outsource',
    'outspoken',
    'outtakes',
    'outthink',
    'outward',
    'outweigh',
    'outwit',
    'oval',
    'ovary',
    'oven',
    'overact',
    'overall',
    'overarch',
    'overbid',
    'overbill',
    'overbite',
    'overblown',
    'overboard',
    'overbook',
    'overbuilt',
    'overcast',
    'overcoat',
    'overcome',
    'overcook',
    'overcrowd',
    'overdraft',
    'overdrawn',
    'overdress',
    'overdrive',
    'overdue',
    'overeager',
    'overeater',
    'overexert',
    'overfed',
    'overfeed',
    'overfill',
    'overflow',
    'overfull',
    'overgrown',
    'overhand',
    'overhang',
    'overhaul',
    'overhead',
    'overhear',
    'overheat',
    'overhung',
    'overjoyed',
    'overkill',
    'overlabor',
    'overlaid',
    'overlap',
    'overlay',
    'overload',
    'overlook',
    'overlord',
    'overlying',
    'overnight',
    'overpass',
    'overpay',
    'overplant',
    'overplay',
    'overpower',
    'overprice',
    'overrate',
    'overreach',
    'overreact',
    'override',
    'overripe',
    'overrule',
    'overrun',
    'overshoot',
    'overshot',
    'oversight',
    'oversized',
    'oversleep',
    'oversold',
    'overspend',
    'overstate',
    'overstay',
    'overstep',
    'overstock',
    'overstuff',
    'oversweet',
    'overtake',
    'overthrow',
    'overtime',
    'overtly',
    'overtone',
    'overture',
    'overturn',
    'overuse',
    'overvalue',
    'overview',
    'overwrite',
    'owl',
    'oxford',
    'oxidant',
    'oxidation',
    'oxidize',
    'oxidizing',
    'oxygen',
    'oxymoron',
    'oyster',
    'ozone',
    'paced',
    'pacemaker',
    'pacific',
    'pacifier',
    'pacifism',
    'pacifist',
    'pacify',
    'padded',
    'padding',
    'paddle',
    'paddling',
    'padlock',
    'pagan',
    'pager',
    'paging',
    'pajamas',
    'palace',
    'palatable',
    'palm',
    'palpable',
    'palpitate',
    'paltry',
    'pampered',
    'pamperer',
    'pampers',
    'pamphlet',
    'panama',
    'pancake',
    'pancreas',
    'panda',
    'pandemic',
    'pang',
    'panhandle',
    'panic',
    'panning',
    'panorama',
    'panoramic',
    'panther',
    'pantomime',
    'pantry',
    'pants',
    'pantyhose',
    'paparazzi',
    'papaya',
    'paper',
    'paprika',
    'papyrus',
    'parabola',
    'parachute',
    'parade',
    'paradox',
    'paragraph',
    'parakeet',
    'paralegal',
    'paralyses',
    'paralysis',
    'paralyze',
    'paramedic',
    'parameter',
    'paramount',
    'parasail',
    'parasite',
    'parasitic',
    'parcel',
    'parched',
    'parchment',
    'pardon',
    'parish',
    'parka',
    'parking',
    'parkway',
    'parlor',
    'parmesan',
    'parole',
    'parrot',
    'parsley',
    'parsnip',
    'partake',
    'parted',
    'parting',
    'partition',
    'partly',
    'partner',
    'partridge',
    'party',
    'passable',
    'passably',
    'passage',
    'passcode',
    'passenger',
    'passerby',
    'passing',
    'passion',
    'passive',
    'passivism',
    'passover',
    'passport',
    'password',
    'pasta',
    'pasted',
    'pastel',
    'pastime',
    'pastor',
    'pastrami',
    'pasture',
    'pasty',
    'patchwork',
    'patchy',
    'paternal',
    'paternity',
    'path',
    'patience',
    'patient',
    'patio',
    'patriarch',
    'patriot',
    'patrol',
    'patronage',
    'patronize',
    'pauper',
    'pavement',
    'paver',
    'pavestone',
    'pavilion',
    'paving',
    'pawing',
    'payable',
    'payback',
    'paycheck',
    'payday',
    'payee',
    'payer',
    'paying',
    'payment',
    'payphone',
    'payroll',
    'pebble',
    'pebbly',
    'pecan',
    'pectin',
    'peculiar',
    'peddling',
    'pediatric',
    'pedicure',
    'pedigree',
    'pedometer',
    'pegboard',
    'pelican',
    'pellet',
    'pelt',
    'pelvis',
    'penalize',
    'penalty',
    'pencil',
    'pendant',
    'pending',
    'penholder',
    'penknife',
    'pennant',
    'penniless',
    'penny',
    'penpal',
    'pension',
    'pentagon',
    'pentagram',
    'pep',
    'perceive',
    'percent',
    'perch',
    'percolate',
    'perennial',
    'perfected',
    'perfectly',
    'perfume',
    'periscope',
    'perish',
    'perjurer',
    'perjury',
    'perkiness',
    'perky',
    'perm',
    'peroxide',
    'perpetual',
    'perplexed',
    'persecute',
    'persevere',
    'persuaded',
    'persuader',
    'pesky',
    'peso',
    'pessimism',
    'pessimist',
    'pester',
    'pesticide',
    'petal',
    'petite',
    'petition',
    'petri',
    'petroleum',
    'petted',
    'petticoat',
    'pettiness',
    'petty',
    'petunia',
    'phantom',
    'phobia',
    'phoenix',
    'phonebook',
    'phoney',
    'phonics',
    'phoniness',
    'phony',
    'phosphate',
    'photo',
    'phrase',
    'phrasing',
    'placard',
    'placate',
    'placidly',
    'plank',
    'planner',
    'plant',
    'plasma',
    'plaster',
    'plastic',
    'plated',
    'platform',
    'plating',
    'platinum',
    'platonic',
    'platter',
    'platypus',
    'plausible',
    'plausibly',
    'playable',
    'playback',
    'player',
    'playful',
    'playgroup',
    'playhouse',
    'playing',
    'playlist',
    'playmaker',
    'playmate',
    'playoff',
    'playpen',
    'playroom',
    'playset',
    'plaything',
    'playtime',
    'plaza',
    'pleading',
    'pleat',
    'pledge',
    'plentiful',
    'plenty',
    'plethora',
    'plexiglas',
    'pliable',
    'plod',
    'plop',
    'plot',
    'plow',
    'ploy',
    'pluck',
    'plug',
    'plunder',
    'plunging',
    'plural',
    'plus',
    'plutonium',
    'plywood',
    'poach',
    'pod',
    'poem',
    'poet',
    'pogo',
    'pointed',
    'pointer',
    'pointing',
    'pointless',
    'pointy',
    'poise',
    'poison',
    'poker',
    'poking',
    'polar',
    'police',
    'policy',
    'polio',
    'polish',
    'politely',
    'polka',
    'polo',
    'polyester',
    'polygon',
    'polygraph',
    'polymer',
    'poncho',
    'pond',
    'pony',
    'popcorn',
    'pope',
    'poplar',
    'popper',
    'poppy',
    'popsicle',
    'populace',
    'popular',
    'populate',
    'porcupine',
    'pork',
    'porous',
    'porridge',
    'portable',
    'portal',
    'portfolio',
    'porthole',
    'portion',
    'portly',
    'portside',
    'poser',
    'posh',
    'posing',
    'possible',
    'possibly',
    'possum',
    'postage',
    'postal',
    'postbox',
    'postcard',
    'posted',
    'poster',
    'posting',
    'postnasal',
    'posture',
    'postwar',
    'pouch',
    'pounce',
    'pouncing',
    'pound',
    'pouring',
    'pout',
    'powdered',
    'powdering',
    'powdery',
    'power',
    'powwow',
    'pox',
    'praising',
    'prance',
    'prancing',
    'pranker',
    'prankish',
    'prankster',
    'prayer',
    'praying',
    'preacher',
    'preaching',
    'preachy',
    'preamble',
    'precinct',
    'precise',
    'precision',
    'precook',
    'precut',
    'predator',
    'predefine',
    'predict',
    'preface',
    'prefix',
    'preflight',
    'preformed',
    'pregame',
    'pregnancy',
    'pregnant',
    'preheated',
    'prelaunch',
    'prelaw',
    'prelude',
    'premiere',
    'premises',
    'premium',
    'prenatal',
    'preoccupy',
    'preorder',
    'prepaid',
    'prepay',
    'preplan',
    'preppy',
    'preschool',
    'prescribe',
    'preseason',
    'preset',
    'preshow',
    'president',
    'presoak',
    'press',
    'presume',
    'presuming',
    'preteen',
    'pretended',
    'pretender',
    'pretense',
    'pretext',
    'pretty',
    'pretzel',
    'prevail',
    'prevalent',
    'prevent',
    'preview',
    'previous',
    'prewar',
    'prewashed',
    'prideful',
    'pried',
    'primal',
    'primarily',
    'primary',
    'primate',
    'primer',
    'primp',
    'princess',
    'print',
    'prior',
    'prism',
    'prison',
    'prissy',
    'pristine',
    'privacy',
    'private',
    'privatize',
    'prize',
    'proactive',
    'probable',
    'probably',
    'probation',
    'probe',
    'probing',
    'probiotic',
    'problem',
    'procedure',
    'process',
    'proclaim',
    'procreate',
    'procurer',
    'prodigal',
    'prodigy',
    'produce',
    'product',
    'profane',
    'profanity',
    'professed',
    'professor',
    'profile',
    'profound',
    'profusely',
    'progeny',
    'prognosis',
    'program',
    'progress',
    'projector',
    'prologue',
    'prolonged',
    'promenade',
    'prominent',
    'promoter',
    'promotion',
    'prompter',
    'promptly',
    'prone',
    'prong',
    'pronounce',
    'pronto',
    'proofing',
    'proofread',
    'proofs',
    'propeller',
    'properly',
    'property',
    'proponent',
    'proposal',
    'propose',
    'props',
    'prorate',
    'protector',
    'protegee',
    'proton',
    'prototype',
    'protozoan',
    'protract',
    'protrude',
    'proud',
    'provable',
    'proved',
    'proven',
    'provided',
    'provider',
    'providing',
    'province',
    'proving',
    'provoke',
    'provoking',
    'provolone',
    'prowess',
    'prowler',
    'prowling',
    'proximity',
    'proxy',
    'prozac',
    'prude',
    'prudishly',
    'prune',
    'pruning',
    'pry',
    'psychic',
    'public',
    'publisher',
    'pucker',
    'pueblo',
    'pug',
    'pull',
    'pulmonary',
    'pulp',
    'pulsate',
    'pulse',
    'pulverize',
    'puma',
    'pumice',
    'pummel',
    'punch',
    'punctual',
    'punctuate',
    'punctured',
    'pungent',
    'punisher',
    'punk',
    'pupil',
    'puppet',
    'puppy',
    'purchase',
    'pureblood',
    'purebred',
    'purely',
    'pureness',
    'purgatory',
    'purge',
    'purging',
    'purifier',
    'purify',
    'purist',
    'puritan',
    'purity',
    'purple',
    'purplish',
    'purposely',
    'purr',
    'purse',
    'pursuable',
    'pursuant',
    'pursuit',
    'purveyor',
    'pushcart',
    'pushchair',
    'pusher',
    'pushiness',
    'pushing',
    'pushover',
    'pushpin',
    'pushup',
    'pushy',
    'putdown',
    'putt',
    'puzzle',
    'puzzling',
    'pyramid',
    'pyromania',
    'python',
    'quack',
    'quadrant',
    'quail',
    'quaintly',
    'quake',
    'quaking',
    'qualified',
    'qualifier',
    'qualify',
    'quality',
    'qualm',
    'quantum',
    'quarrel',
    'quarry',
    'quartered',
    'quarterly',
    'quarters',
    'quartet',
    'quench',
    'query',
    'quicken',
    'quickly',
    'quickness',
    'quicksand',
    'quickstep',
    'quiet',
    'quill',
    'quilt',
    'quintet',
    'quintuple',
    'quirk',
    'quit',
    'quiver',
    'quizzical',
    'quotable',
    'quotation',
    'quote',
    'rabid',
    'race',
    'racing',
    'racism',
    'rack',
    'racoon',
    'radar',
    'radial',
    'radiance',
    'radiantly',
    'radiated',
    'radiation',
    'radiator',
    'radio',
    'radish',
    'raffle',
    'raft',
    'rage',
    'ragged',
    'raging',
    'ragweed',
    'raider',
    'railcar',
    'railing',
    'railroad',
    'railway',
    'raisin',
    'rake',
    'raking',
    'rally',
    'ramble',
    'rambling',
    'ramp',
    'ramrod',
    'ranch',
    'rancidity',
    'random',
    'ranged',
    'ranger',
    'ranging',
    'ranked',
    'ranking',
    'ransack',
    'ranting',
    'rants',
    'rare',
    'rarity',
    'rascal',
    'rash',
    'rasping',
    'ravage',
    'raven',
    'ravine',
    'raving',
    'ravioli',
    'ravishing',
    'reabsorb',
    'reach',
    'reacquire',
    'reaction',
    'reactive',
    'reactor',
    'reaffirm',
    'ream',
    'reanalyze',
    'reappear',
    'reapply',
    'reappoint',
    'reapprove',
    'rearrange',
    'rearview',
    'reason',
    'reassign',
    'reassure',
    'reattach',
    'reawake',
    'rebalance',
    'rebate',
    'rebel',
    'rebirth',
    'reboot',
    'reborn',
    'rebound',
    'rebuff',
    'rebuild',
    'rebuilt',
    'reburial',
    'rebuttal',
    'recall',
    'recant',
    'recapture',
    'recast',
    'recede',
    'recent',
    'recess',
    'recharger',
    'recipient',
    'recital',
    'recite',
    'reckless',
    'reclaim',
    'recliner',
    'reclining',
    'recluse',
    'reclusive',
    'recognize',
    'recoil',
    'recollect',
    'recolor',
    'reconcile',
    'reconfirm',
    'reconvene',
    'recopy',
    'record',
    'recount',
    'recoup',
    'recovery',
    'recreate',
    'rectal',
    'rectangle',
    'rectified',
    'rectify',
    'recycled',
    'recycler',
    'recycling',
    'reemerge',
    'reenact',
    'reenter',
    'reentry',
    'reexamine',
    'referable',
    'referee',
    'reference',
    'refill',
    'refinance',
    'refined',
    'refinery',
    'refining',
    'refinish',
    'reflected',
    'reflector',
    'reflex',
    'reflux',
    'refocus',
    'refold',
    'reforest',
    'reformat',
    'reformed',
    'reformer',
    'reformist',
    'refract',
    'refrain',
    'refreeze',
    'refresh',
    'refried',
    'refueling',
    'refund',
    'refurbish',
    'refurnish',
    'refusal',
    'refuse',
    'refusing',
    'refutable',
    'refute',
    'regain',
    'regalia',
    'regally',
    'reggae',
    'regime',
    'region',
    'register',
    'registrar',
    'registry',
    'regress',
    'regretful',
    'regroup',
    'regular',
    'regulate',
    'regulator',
    'rehab',
    'reheat',
    'rehire',
    'rehydrate',
    'reimburse',
    'reissue',
    'reiterate',
    'rejoice',
    'rejoicing',
    'rejoin',
    'rekindle',
    'relapse',
    'relapsing',
    'relatable',
    'related',
    'relation',
    'relative',
    'relax',
    'relay',
    'relearn',
    'release',
    'relenting',
    'reliable',
    'reliably',
    'reliance',
    'reliant',
    'relic',
    'relieve',
    'relieving',
    'relight',
    'relish',
    'relive',
    'reload',
    'relocate',
    'relock',
    'reluctant',
    'rely',
    'remake',
    'remark',
    'remarry',
    'rematch',
    'remedial',
    'remedy',
    'remember',
    'reminder',
    'remindful',
    'remission',
    'remix',
    'remnant',
    'remodeler',
    'remold',
    'remorse',
    'remote',
    'removable',
    'removal',
    'removed',
    'remover',
    'removing',
    'rename',
    'renderer',
    'rendering',
    'rendition',
    'renegade',
    'renewable',
    'renewably',
    'renewal',
    'renewed',
    'renounce',
    'renovate',
    'renovator',
    'rentable',
    'rental',
    'rented',
    'renter',
    'reoccupy',
    'reoccur',
    'reopen',
    'reorder',
    'repackage',
    'repacking',
    'repaint',
    'repair',
    'repave',
    'repaying',
    'repayment',
    'repeal',
    'repeated',
    'repeater',
    'repent',
    'rephrase',
    'replace',
    'replay',
    'replica',
    'reply',
    'reporter',
    'repose',
    'repossess',
    'repost',
    'repressed',
    'reprimand',
    'reprint',
    'reprise',
    'reproach',
    'reprocess',
    'reproduce',
    'reprogram',
    'reps',
    'reptile',
    'reptilian',
    'repugnant',
    'repulsion',
    'repulsive',
    'repurpose',
    'reputable',
    'reputably',
    'request',
    'require',
    'requisite',
    'reroute',
    'rerun',
    'resale',
    'resample',
    'rescuer',
    'reseal',
    'research',
    'reselect',
    'reseller',
    'resemble',
    'resend',
    'resent',
    'reset',
    'reshape',
    'reshoot',
    'reshuffle',
    'residence',
    'residency',
    'resident',
    'residual',
    'residue',
    'resigned',
    'resilient',
    'resistant',
    'resisting',
    'resize',
    'resolute',
    'resolved',
    'resonant',
    'resonate',
    'resort',
    'resource',
    'respect',
    'resubmit',
    'result',
    'resume',
    'resupply',
    'resurface',
    'resurrect',
    'retail',
    'retainer',
    'retaining',
    'retake',
    'retaliate',
    'retention',
    'rethink',
    'retinal',
    'retired',
    'retiree',
    'retiring',
    'retold',
    'retool',
    'retorted',
    'retouch',
    'retrace',
    'retract',
    'retrain',
    'retread',
    'retreat',
    'retrial',
    'retrieval',
    'retriever',
    'retry',
    'return',
    'retying',
    'retype',
    'reunion',
    'reunite',
    'reusable',
    'reuse',
    'reveal',
    'reveler',
    'revenge',
    'revenue',
    'reverb',
    'revered',
    'reverence',
    'reverend',
    'reversal',
    'reverse',
    'reversing',
    'reversion',
    'revert',
    'revisable',
    'revise',
    'revision',
    'revisit',
    'revivable',
    'revival',
    'reviver',
    'reviving',
    'revocable',
    'revoke',
    'revolt',
    'revolver',
    'revolving',
    'reward',
    'rewash',
    'rewind',
    'rewire',
    'reword',
    'rework',
    'rewrap',
    'rewrite',
    'rhyme',
    'ribbon',
    'ribcage',
    'rice',
    'riches',
    'richly',
    'richness',
    'rickety',
    'ricotta',
    'riddance',
    'ridden',
    'ride',
    'riding',
    'rifling',
    'rift',
    'rigging',
    'rigid',
    'rigor',
    'rimless',
    'rimmed',
    'rind',
    'rink',
    'rinse',
    'rinsing',
    'riot',
    'ripcord',
    'ripeness',
    'ripening',
    'ripping',
    'ripple',
    'rippling',
    'riptide',
    'rise',
    'rising',
    'risk',
    'risotto',
    'ritalin',
    'ritzy',
    'rival',
    'riverbank',
    'riverbed',
    'riverboat',
    'riverside',
    'riveter',
    'riveting',
    'roamer',
    'roaming',
    'roast',
    'robbing',
    'robe',
    'robin',
    'robotics',
    'robust',
    'rockband',
    'rocker',
    'rocket',
    'rockfish',
    'rockiness',
    'rocking',
    'rocklike',
    'rockslide',
    'rockstar',
    'rocky',
    'rogue',
    'roman',
    'romp',
    'rope',
    'roping',
    'roster',
    'rosy',
    'rotten',
    'rotting',
    'rotunda',
    'roulette',
    'rounding',
    'roundish',
    'roundness',
    'roundup',
    'roundworm',
    'routine',
    'routing',
    'rover',
    'roving',
    'royal',
    'rubbed',
    'rubber',
    'rubbing',
    'rubble',
    'rubdown',
    'ruby',
    'ruckus',
    'rudder',
    'rug',
    'ruined',
    'rule',
    'rumble',
    'rumbling',
    'rummage',
    'rumor',
    'runaround',
    'rundown',
    'runner',
    'running',
    'runny',
    'runt',
    'runway',
    'rupture',
    'rural',
    'ruse',
    'rush',
    'rust',
    'rut',
    'sabbath',
    'sabotage',
    'sacrament',
    'sacred',
    'sacrifice',
    'sadden',
    'saddlebag',
    'saddled',
    'saddling',
    'sadly',
    'sadness',
    'safari',
    'safeguard',
    'safehouse',
    'safely',
    'safeness',
    'saffron',
    'saga',
    'sage',
    'sagging',
    'saggy',
    'said',
    'saint',
    'sake',
    'salad',
    'salami',
    'salaried',
    'salary',
    'saline',
    'salon',
    'saloon',
    'salsa',
    'salt',
    'salutary',
    'salute',
    'salvage',
    'salvaging',
    'salvation',
    'same',
    'sample',
    'sampling',
    'sanction',
    'sanctity',
    'sanctuary',
    'sandal',
    'sandbag',
    'sandbank',
    'sandbar',
    'sandblast',
    'sandbox',
    'sanded',
    'sandfish',
    'sanding',
    'sandlot',
    'sandpaper',
    'sandpit',
    'sandstone',
    'sandstorm',
    'sandworm',
    'sandy',
    'sanitary',
    'sanitizer',
    'sank',
    'santa',
    'sapling',
    'sappiness',
    'sappy',
    'sarcasm',
    'sarcastic',
    'sardine',
    'sash',
    'sasquatch',
    'sassy',
    'satchel',
    'satiable',
    'satin',
    'satirical',
    'satisfied',
    'satisfy',
    'saturate',
    'saturday',
    'sauciness',
    'saucy',
    'sauna',
    'savage',
    'savanna',
    'saved',
    'savings',
    'savior',
    'savor',
    'saxophone',
    'say',
    'scabbed',
    'scabby',
    'scalded',
    'scalding',
    'scale',
    'scaling',
    'scallion',
    'scallop',
    'scalping',
    'scam',
    'scandal',
    'scanner',
    'scanning',
    'scant',
    'scapegoat',
    'scarce',
    'scarcity',
    'scarecrow',
    'scared',
    'scarf',
    'scarily',
    'scariness',
    'scarring',
    'scary',
    'scavenger',
    'scenic',
    'schedule',
    'schematic',
    'scheme',
    'scheming',
    'schilling',
    'schnapps',
    'scholar',
    'science',
    'scientist',
    'scion',
    'scoff',
    'scolding',
    'scone',
    'scoop',
    'scooter',
    'scope',
    'scorch',
    'scorebook',
    'scorecard',
    'scored',
    'scoreless',
    'scorer',
    'scoring',
    'scorn',
    'scorpion',
    'scotch',
    'scoundrel',
    'scoured',
    'scouring',
    'scouting',
    'scouts',
    'scowling',
    'scrabble',
    'scraggly',
    'scrambled',
    'scrambler',
    'scrap',
    'scratch',
    'scrawny',
    'screen',
    'scribble',
    'scribe',
    'scribing',
    'scrimmage',
    'script',
    'scroll',
    'scrooge',
    'scrounger',
    'scrubbed',
    'scrubber',
    'scruffy',
    'scrunch',
    'scrutiny',
    'scuba',
    'scuff',
    'sculptor',
    'sculpture',
    'scurvy',
    'scuttle',
    'secluded',
    'secluding',
    'seclusion',
    'second',
    'secrecy',
    'secret',
    'sectional',
    'sector',
    'secular',
    'securely',
    'security',
    'sedan',
    'sedate',
    'sedation',
    'sedative',
    'sediment',
    'seduce',
    'seducing',
    'segment',
    'seismic',
    'seizing',
    'seldom',
    'selected',
    'selection',
    'selective',
    'selector',
    'self',
    'seltzer',
    'semantic',
    'semester',
    'semicolon',
    'semifinal',
    'seminar',
    'semisoft',
    'semisweet',
    'senate',
    'senator',
    'send',
    'senior',
    'senorita',
    'sensation',
    'sensitive',
    'sensitize',
    'sensually',
    'sensuous',
    'sepia',
    'september',
    'septic',
    'septum',
    'sequel',
    'sequence',
    'sequester',
    'series',
    'sermon',
    'serotonin',
    'serpent',
    'serrated',
    'serve',
    'service',
    'serving',
    'sesame',
    'sessions',
    'setback',
    'setting',
    'settle',
    'settling',
    'setup',
    'sevenfold',
    'seventeen',
    'seventh',
    'seventy',
    'severity',
    'shabby',
    'shack',
    'shaded',
    'shadily',
    'shadiness',
    'shading',
    'shadow',
    'shady',
    'shaft',
    'shakable',
    'shakily',
    'shakiness',
    'shaking',
    'shaky',
    'shale',
    'shallot',
    'shallow',
    'shame',
    'shampoo',
    'shamrock',
    'shank',
    'shanty',
    'shape',
    'shaping',
    'share',
    'sharpener',
    'sharper',
    'sharpie',
    'sharply',
    'sharpness',
    'shawl',
    'sheath',
    'shed',
    'sheep',
    'sheet',
    'shelf',
    'shell',
    'shelter',
    'shelve',
    'shelving',
    'sherry',
    'shield',
    'shifter',
    'shifting',
    'shiftless',
    'shifty',
    'shimmer',
    'shimmy',
    'shindig',
    'shine',
    'shingle',
    'shininess',
    'shining',
    'shiny',
    'ship',
    'shirt',
    'shivering',
    'shock',
    'shone',
    'shoplift',
    'shopper',
    'shopping',
    'shoptalk',
    'shore',
    'shortage',
    'shortcake',
    'shortcut',
    'shorten',
    'shorter',
    'shorthand',
    'shortlist',
    'shortly',
    'shortness',
    'shorts',
    'shortwave',
    'shorty',
    'shout',
    'shove',
    'showbiz',
    'showcase',
    'showdown',
    'shower',
    'showgirl',
    'showing',
    'showman',
    'shown',
    'showoff',
    'showpiece',
    'showplace',
    'showroom',
    'showy',
    'shrank',
    'shrapnel',
    'shredder',
    'shredding',
    'shrewdly',
    'shriek',
    'shrill',
    'shrimp',
    'shrine',
    'shrink',
    'shrivel',
    'shrouded',
    'shrubbery',
    'shrubs',
    'shrug',
    'shrunk',
    'shucking',
    'shudder',
    'shuffle',
    'shuffling',
    'shun',
    'shush',
    'shut',
    'shy',
    'siamese',
    'siberian',
    'sibling',
    'siding',
    'sierra',
    'siesta',
    'sift',
    'sighing',
    'silenced',
    'silencer',
    'silent',
    'silica',
    'silicon',
    'silk',
    'silliness',
    'silly',
    'silo',
    'silt',
    'silver',
    'similarly',
    'simile',
    'simmering',
    'simple',
    'simplify',
    'simply',
    'sincere',
    'sincerity',
    'singer',
    'singing',
    'single',
    'singular',
    'sinister',
    'sinless',
    'sinner',
    'sinuous',
    'sip',
    'siren',
    'sister',
    'sitcom',
    'sitter',
    'sitting',
    'situated',
    'situation',
    'sixfold',
    'sixteen',
    'sixth',
    'sixties',
    'sixtieth',
    'sixtyfold',
    'sizable',
    'sizably',
    'size',
    'sizing',
    'sizzle',
    'sizzling',
    'skater',
    'skating',
    'skedaddle',
    'skeletal',
    'skeleton',
    'skeptic',
    'sketch',
    'skewed',
    'skewer',
    'skid',
    'skied',
    'skier',
    'skies',
    'skiing',
    'skilled',
    'skillet',
    'skillful',
    'skimmed',
    'skimmer',
    'skimming',
    'skimpily',
    'skincare',
    'skinhead',
    'skinless',
    'skinning',
    'skinny',
    'skintight',
    'skipper',
    'skipping',
    'skirmish',
    'skirt',
    'skittle',
    'skydiver',
    'skylight',
    'skyline',
    'skype',
    'skyrocket',
    'skyward',
    'slab',
    'slacked',
    'slacker',
    'slacking',
    'slackness',
    'slacks',
    'slain',
    'slam',
    'slander',
    'slang',
    'slapping',
    'slapstick',
    'slashed',
    'slashing',
    'slate',
    'slather',
    'slaw',
    'sled',
    'sleek',
    'sleep',
    'sleet',
    'sleeve',
    'slept',
    'sliceable',
    'sliced',
    'slicer',
    'slicing',
    'slick',
    'slider',
    'slideshow',
    'sliding',
    'slighted',
    'slighting',
    'slightly',
    'slimness',
    'slimy',
    'slinging',
    'slingshot',
    'slinky',
    'slip',
    'slit',
    'sliver',
    'slobbery',
    'slogan',
    'sloped',
    'sloping',
    'sloppily',
    'sloppy',
    'slot',
    'slouching',
    'slouchy',
    'sludge',
    'slug',
    'slum',
    'slurp',
    'slush',
    'sly',
    'small',
    'smartly',
    'smartness',
    'smasher',
    'smashing',
    'smashup',
    'smell',
    'smelting',
    'smile',
    'smilingly',
    'smirk',
    'smite',
    'smith',
    'smitten',
    'smock',
    'smog',
    'smoked',
    'smokeless',
    'smokiness',
    'smoking',
    'smoky',
    'smolder',
    'smooth',
    'smother',
    'smudge',
    'smudgy',
    'smuggler',
    'smuggling',
    'smugly',
    'smugness',
    'snack',
    'snagged',
    'snaking',
    'snap',
    'snare',
    'snarl',
    'snazzy',
    'sneak',
    'sneer',
    'sneeze',
    'sneezing',
    'snide',
    'sniff',
    'snippet',
    'snipping',
    'snitch',
    'snooper',
    'snooze',
    'snore',
    'snoring',
    'snorkel',
    'snort',
    'snout',
    'snowbird',
    'snowboard',
    'snowbound',
    'snowcap',
    'snowdrift',
    'snowdrop',
    'snowfall',
    'snowfield',
    'snowflake',
    'snowiness',
    'snowless',
    'snowman',
    'snowplow',
    'snowshoe',
    'snowstorm',
    'snowsuit',
    'snowy',
    'snub',
    'snuff',
    'snuggle',
    'snugly',
    'snugness',
    'speak',
    'spearfish',
    'spearhead',
    'spearman',
    'spearmint',
    'species',
    'specimen',
    'specked',
    'speckled',
    'specks',
    'spectacle',
    'spectator',
    'spectrum',
    'speculate',
    'speech',
    'speed',
    'spellbind',
    'speller',
    'spelling',
    'spendable',
    'spender',
    'spending',
    'spent',
    'spew',
    'sphere',
    'spherical',
    'sphinx',
    'spider',
    'spied',
    'spiffy',
    'spill',
    'spilt',
    'spinach',
    'spinal',
    'spindle',
    'spinner',
    'spinning',
    'spinout',
    'spinster',
    'spiny',
    'spiral',
    'spirited',
    'spiritism',
    'spirits',
    'spiritual',
    'splashed',
    'splashing',
    'splashy',
    'splatter',
    'spleen',
    'splendid',
    'splendor',
    'splice',
    'splicing',
    'splinter',
    'splotchy',
    'splurge',
    'spoilage',
    'spoiled',
    'spoiler',
    'spoiling',
    'spoils',
    'spoken',
    'spokesman',
    'sponge',
    'spongy',
    'sponsor',
    'spoof',
    'spookily',
    'spooky',
    'spool',
    'spoon',
    'spore',
    'sporting',
    'sports',
    'sporty',
    'spotless',
    'spotlight',
    'spotted',
    'spotter',
    'spotting',
    'spotty',
    'spousal',
    'spouse',
    'spout',
    'sprain',
    'sprang',
    'sprawl',
    'spray',
    'spree',
    'sprig',
    'spring',
    'sprinkled',
    'sprinkler',
    'sprint',
    'sprite',
    'sprout',
    'spruce',
    'sprung',
    'spry',
    'spud',
    'spur',
    'sputter',
    'spyglass',
    'squabble',
    'squad',
    'squall',
    'squander',
    'squash',
    'squatted',
    'squatter',
    'squatting',
    'squeak',
    'squealer',
    'squealing',
    'squeamish',
    'squeegee',
    'squeeze',
    'squeezing',
    'squid',
    'squiggle',
    'squiggly',
    'squint',
    'squire',
    'squirt',
    'squishier',
    'squishy',
    'stability',
    'stabilize',
    'stable',
    'stack',
    'stadium',
    'staff',
    'stage',
    'staging',
    'stagnant',
    'stagnate',
    'stainable',
    'stained',
    'staining',
    'stainless',
    'stalemate',
    'staleness',
    'stalling',
    'stallion',
    'stamina',
    'stammer',
    'stamp',
    'stand',
    'stank',
    'staple',
    'stapling',
    'starboard',
    'starch',
    'stardom',
    'stardust',
    'starfish',
    'stargazer',
    'staring',
    'stark',
    'starless',
    'starlet',
    'starlight',
    'starlit',
    'starring',
    'starry',
    'starship',
    'starter',
    'starting',
    'startle',
    'startling',
    'startup',
    'starved',
    'starving',
    'stash',
    'state',
    'static',
    'statistic',
    'statue',
    'stature',
    'status',
    'statute',
    'statutory',
    'staunch',
    'stays',
    'steadfast',
    'steadier',
    'steadily',
    'steadying',
    'steam',
    'steed',
    'steep',
    'steerable',
    'steering',
    'steersman',
    'stegosaur',
    'stellar',
    'stem',
    'stench',
    'stencil',
    'step',
    'stereo',
    'sterile',
    'sterility',
    'sterilize',
    'sterling',
    'sternness',
    'sternum',
    'stew',
    'stick',
    'stiffen',
    'stiffly',
    'stiffness',
    'stifle',
    'stifling',
    'stillness',
    'stilt',
    'stimulant',
    'stimulate',
    'stimuli',
    'stimulus',
    'stinger',
    'stingily',
    'stinging',
    'stingray',
    'stingy',
    'stinking',
    'stinky',
    'stipend',
    'stipulate',
    'stir',
    'stitch',
    'stock',
    'stoic',
    'stoke',
    'stole',
    'stomp',
    'stonewall',
    'stoneware',
    'stonework',
    'stoning',
    'stony',
    'stood',
    'stooge',
    'stool',
    'stoop',
    'stoplight',
    'stoppable',
    'stoppage',
    'stopped',
    'stopper',
    'stopping',
    'stopwatch',
    'storable',
    'storage',
    'storeroom',
    'storewide',
    'storm',
    'stout',
    'stove',
    'stowaway',
    'stowing',
    'straddle',
    'straggler',
    'strained',
    'strainer',
    'straining',
    'strangely',
    'stranger',
    'strangle',
    'strategic',
    'strategy',
    'stratus',
    'straw',
    'stray',
    'streak',
    'stream',
    'street',
    'strength',
    'strenuous',
    'strep',
    'stress',
    'stretch',
    'strewn',
    'stricken',
    'strict',
    'stride',
    'strife',
    'strike',
    'striking',
    'strive',
    'striving',
    'strobe',
    'strode',
    'stroller',
    'strongbox',
    'strongly',
    'strongman',
    'struck',
    'structure',
    'strudel',
    'struggle',
    'strum',
    'strung',
    'strut',
    'stubbed',
    'stubble',
    'stubbly',
    'stubborn',
    'stucco',
    'stuck',
    'student',
    'studied',
    'studio',
    'study',
    'stuffed',
    'stuffing',
    'stuffy',
    'stumble',
    'stumbling',
    'stump',
    'stung',
    'stunned',
    'stunner',
    'stunning',
    'stunt',
    'stupor',
    'sturdily',
    'sturdy',
    'styling',
    'stylishly',
    'stylist',
    'stylized',
    'stylus',
    'suave',
    'subarctic',
    'subatomic',
    'subdivide',
    'subdued',
    'subduing',
    'subfloor',
    'subgroup',
    'subheader',
    'subject',
    'sublease',
    'sublet',
    'sublevel',
    'sublime',
    'submarine',
    'submerge',
    'submersed',
    'submitter',
    'subpanel',
    'subpar',
    'subplot',
    'subprime',
    'subscribe',
    'subscript',
    'subsector',
    'subside',
    'subsiding',
    'subsidize',
    'subsidy',
    'subsoil',
    'subsonic',
    'substance',
    'subsystem',
    'subtext',
    'subtitle',
    'subtly',
    'subtotal',
    'subtract',
    'subtype',
    'suburb',
    'subway',
    'subwoofer',
    'subzero',
    'succulent',
    'such',
    'suction',
    'sudden',
    'sudoku',
    'suds',
    'sufferer',
    'suffering',
    'suffice',
    'suffix',
    'suffocate',
    'suffrage',
    'sugar',
    'suggest',
    'suing',
    'suitable',
    'suitably',
    'suitcase',
    'suitor',
    'sulfate',
    'sulfide',
    'sulfite',
    'sulfur',
    'sulk',
    'sullen',
    'sulphate',
    'sulphuric',
    'sultry',
    'superbowl',
    'superglue',
    'superhero',
    'superior',
    'superjet',
    'superman',
    'supermom',
    'supernova',
    'supervise',
    'supper',
    'supplier',
    'supply',
    'support',
    'supremacy',
    'supreme',
    'surcharge',
    'surely',
    'sureness',
    'surface',
    'surfacing',
    'surfboard',
    'surfer',
    'surgery',
    'surgical',
    'surging',
    'surname',
    'surpass',
    'surplus',
    'surprise',
    'surreal',
    'surrender',
    'surrogate',
    'surround',
    'survey',
    'survival',
    'survive',
    'surviving',
    'survivor',
    'sushi',
    'suspect',
    'suspend',
    'suspense',
    'sustained',
    'sustainer',
    'swab',
    'swaddling',
    'swagger',
    'swampland',
    'swan',
    'swapping',
    'swarm',
    'sway',
    'swear',
    'sweat',
    'sweep',
    'swell',
    'swept',
    'swerve',
    'swifter',
    'swiftly',
    'swiftness',
    'swimmable',
    'swimmer',
    'swimming',
    'swimsuit',
    'swimwear',
    'swinger',
    'swinging',
    'swipe',
    'swirl',
    'switch',
    'swivel',
    'swizzle',
    'swooned',
    'swoop',
    'swoosh',
    'swore',
    'sworn',
    'swung',
    'sycamore',
    'sympathy',
    'symphonic',
    'symphony',
    'symptom',
    'synapse',
    'syndrome',
    'synergy',
    'synopses',
    'synopsis',
    'synthesis',
    'synthetic',
    'syrup',
    'system',
    't-shirt',
    'tabasco',
    'tabby',
    'tableful',
    'tables',
    'tablet',
    'tableware',
    'tabloid',
    'tackiness',
    'tacking',
    'tackle',
    'tackling',
    'tacky',
    'taco',
    'tactful',
    'tactical',
    'tactics',
    'tactile',
    'tactless',
    'tadpole',
    'taekwondo',
    'tag',
    'tainted',
    'take',
    'taking',
    'talcum',
    'talisman',
    'tall',
    'talon',
    'tamale',
    'tameness',
    'tamer',
    'tamper',
    'tank',
    'tanned',
    'tannery',
    'tanning',
    'tantrum',
    'tapeless',
    'tapered',
    'tapering',
    'tapestry',
    'tapioca',
    'tapping',
    'taps',
    'tarantula',
    'target',
    'tarmac',
    'tarnish',
    'tarot',
    'tartar',
    'tartly',
    'tartness',
    'task',
    'tassel',
    'taste',
    'tastiness',
    'tasting',
    'tasty',
    'tattered',
    'tattle',
    'tattling',
    'tattoo',
    'taunt',
    'tavern',
    'thank',
    'that',
    'thaw',
    'theater',
    'theatrics',
    'thee',
    'theft',
    'theme',
    'theology',
    'theorize',
    'thermal',
    'thermos',
    'thesaurus',
    'these',
    'thesis',
    'thespian',
    'thicken',
    'thicket',
    'thickness',
    'thieving',
    'thievish',
    'thigh',
    'thimble',
    'thing',
    'think',
    'thinly',
    'thinner',
    'thinness',
    'thinning',
    'thirstily',
    'thirsting',
    'thirsty',
    'thirteen',
    'thirty',
    'thong',
    'thorn',
    'those',
    'thousand',
    'thrash',
    'thread',
    'threaten',
    'threefold',
    'thrift',
    'thrill',
    'thrive',
    'thriving',
    'throat',
    'throbbing',
    'throng',
    'throttle',
    'throwaway',
    'throwback',
    'thrower',
    'throwing',
    'thud',
    'thumb',
    'thumping',
    'thursday',
    'thus',
    'thwarting',
    'thyself',
    'tiara',
    'tibia',
    'tidal',
    'tidbit',
    'tidiness',
    'tidings',
    'tidy',
    'tiger',
    'tighten',
    'tightly',
    'tightness',
    'tightrope',
    'tightwad',
    'tigress',
    'tile',
    'tiling',
    'till',
    'tilt',
    'timid',
    'timing',
    'timothy',
    'tinderbox',
    'tinfoil',
    'tingle',
    'tingling',
    'tingly',
    'tinker',
    'tinkling',
    'tinsel',
    'tinsmith',
    'tint',
    'tinwork',
    'tiny',
    'tipoff',
    'tipped',
    'tipper',
    'tipping',
    'tiptoeing',
    'tiptop',
    'tiring',
    'tissue',
    'trace',
    'tracing',
    'track',
    'traction',
    'tractor',
    'trade',
    'trading',
    'tradition',
    'traffic',
    'tragedy',
    'trailing',
    'trailside',
    'train',
    'traitor',
    'trance',
    'tranquil',
    'transfer',
    'transform',
    'translate',
    'transpire',
    'transport',
    'transpose',
    'trapdoor',
    'trapeze',
    'trapezoid',
    'trapped',
    'trapper',
    'trapping',
    'traps',
    'trash',
    'travel',
    'traverse',
    'travesty',
    'tray',
    'treachery',
    'treading',
    'treadmill',
    'treason',
    'treat',
    'treble',
    'tree',
    'trekker',
    'tremble',
    'trembling',
    'tremor',
    'trench',
    'trend',
    'trespass',
    'triage',
    'trial',
    'triangle',
    'tribesman',
    'tribunal',
    'tribune',
    'tributary',
    'tribute',
    'triceps',
    'trickery',
    'trickily',
    'tricking',
    'trickle',
    'trickster',
    'tricky',
    'tricolor',
    'tricycle',
    'trident',
    'tried',
    'trifle',
    'trifocals',
    'trillion',
    'trilogy',
    'trimester',
    'trimmer',
    'trimming',
    'trimness',
    'trinity',
    'trio',
    'tripod',
    'tripping',
    'triumph',
    'trivial',
    'trodden',
    'trolling',
    'trombone',
    'trophy',
    'tropical',
    'tropics',
    'trouble',
    'troubling',
    'trough',
    'trousers',
    'trout',
    'trowel',
    'truce',
    'truck',
    'truffle',
    'trump',
    'trunks',
    'trustable',
    'trustee',
    'trustful',
    'trusting',
    'trustless',
    'truth',
    'try',
    'tubby',
    'tubeless',
    'tubular',
    'tucking',
    'tuesday',
    'tug',
    'tuition',
    'tulip',
    'tumble',
    'tumbling',
    'tummy',
    'turban',
    'turbine',
    'turbofan',
    'turbojet',
    'turbulent',
    'turf',
    'turkey',
    'turmoil',
    'turret',
    'turtle',
    'tusk',
    'tutor',
    'tutu',
    'tux',
    'tweak',
    'tweed',
    'tweet',
    'tweezers',
    'twelve',
    'twentieth',
    'twenty',
    'twerp',
    'twice',
    'twiddle',
    'twiddling',
    'twig',
    'twilight',
    'twine',
    'twins',
    'twirl',
    'twistable',
    'twisted',
    'twister',
    'twisting',
    'twisty',
    'twitch',
    'twitter',
    'tycoon',
    'tying',
    'tyke',
    'udder',
    'ultimate',
    'ultimatum',
    'ultra',
    'umbilical',
    'umbrella',
    'umpire',
    'unabashed',
    'unable',
    'unadorned',
    'unadvised',
    'unafraid',
    'unaired',
    'unaligned',
    'unaltered',
    'unarmored',
    'unashamed',
    'unaudited',
    'unawake',
    'unaware',
    'unbaked',
    'unbalance',
    'unbeaten',
    'unbend',
    'unbent',
    'unbiased',
    'unbitten',
    'unblended',
    'unblessed',
    'unblock',
    'unbolted',
    'unbounded',
    'unboxed',
    'unbraided',
    'unbridle',
    'unbroken',
    'unbuckled',
    'unbundle',
    'unburned',
    'unbutton',
    'uncanny',
    'uncapped',
    'uncaring',
    'uncertain',
    'unchain',
    'unchanged',
    'uncharted',
    'uncheck',
    'uncivil',
    'unclad',
    'unclaimed',
    'unclamped',
    'unclasp',
    'uncle',
    'unclip',
    'uncloak',
    'unclog',
    'unclothed',
    'uncoated',
    'uncoiled',
    'uncolored',
    'uncombed',
    'uncommon',
    'uncooked',
    'uncork',
    'uncorrupt',
    'uncounted',
    'uncouple',
    'uncouth',
    'uncover',
    'uncross',
    'uncrown',
    'uncrushed',
    'uncured',
    'uncurious',
    'uncurled',
    'uncut',
    'undamaged',
    'undated',
    'undaunted',
    'undead',
    'undecided',
    'undefined',
    'underage',
    'underarm',
    'undercoat',
    'undercook',
    'undercut',
    'underdog',
    'underdone',
    'underfed',
    'underfeed',
    'underfoot',
    'undergo',
    'undergrad',
    'underhand',
    'underline',
    'underling',
    'undermine',
    'undermost',
    'underpaid',
    'underpass',
    'underpay',
    'underrate',
    'undertake',
    'undertone',
    'undertook',
    'undertow',
    'underuse',
    'underwear',
    'underwent',
    'underwire',
    'undesired',
    'undiluted',
    'undivided',
    'undocked',
    'undoing',
    'undone',
    'undrafted',
    'undress',
    'undrilled',
    'undusted',
    'undying',
    'unearned',
    'unearth',
    'unease',
    'uneasily',
    'uneasy',
    'uneatable',
    'uneaten',
    'unedited',
    'unelected',
    'unending',
    'unengaged',
    'unenvied',
    'unequal',
    'unethical',
    'uneven',
    'unexpired',
    'unexposed',
    'unfailing',
    'unfair',
    'unfasten',
    'unfazed',
    'unfeeling',
    'unfiled',
    'unfilled',
    'unfitted',
    'unfitting',
    'unfixable',
    'unfixed',
    'unflawed',
    'unfocused',
    'unfold',
    'unfounded',
    'unframed',
    'unfreeze',
    'unfrosted',
    'unfrozen',
    'unfunded',
    'unglazed',
    'ungloved',
    'unglue',
    'ungodly',
    'ungraded',
    'ungreased',
    'unguarded',
    'unguided',
    'unhappily',
    'unhappy',
    'unharmed',
    'unhealthy',
    'unheard',
    'unhearing',
    'unheated',
    'unhelpful',
    'unhidden',
    'unhinge',
    'unhitched',
    'unholy',
    'unhook',
    'unicorn',
    'unicycle',
    'unified',
    'unifier',
    'uniformed',
    'uniformly',
    'unify',
    'unimpeded',
    'uninjured',
    'uninstall',
    'uninsured',
    'uninvited',
    'union',
    'uniquely',
    'unisexual',
    'unison',
    'unissued',
    'unit',
    'universal',
    'universe',
    'unjustly',
    'unkempt',
    'unkind',
    'unknotted',
    'unknowing',
    'unknown',
    'unlaced',
    'unlatch',
    'unlawful',
    'unleaded',
    'unlearned',
    'unleash',
    'unless',
    'unleveled',
    'unlighted',
    'unlikable',
    'unlimited',
    'unlined',
    'unlinked',
    'unlisted',
    'unlit',
    'unlivable',
    'unloaded',
    'unloader',
    'unlocked',
    'unlocking',
    'unlovable',
    'unloved',
    'unlovely',
    'unloving',
    'unluckily',
    'unlucky',
    'unmade',
    'unmanaged',
    'unmanned',
    'unmapped',
    'unmarked',
    'unmasked',
    'unmasking',
    'unmatched',
    'unmindful',
    'unmixable',
    'unmixed',
    'unmolded',
    'unmoral',
    'unmovable',
    'unmoved',
    'unmoving',
    'unnamable',
    'unnamed',
    'unnatural',
    'unneeded',
    'unnerve',
    'unnerving',
    'unnoticed',
    'unopened',
    'unopposed',
    'unpack',
    'unpadded',
    'unpaid',
    'unpainted',
    'unpaired',
    'unpaved',
    'unpeeled',
    'unpicked',
    'unpiloted',
    'unpinned',
    'unplanned',
    'unplanted',
    'unpleased',
    'unpledged',
    'unplowed',
    'unplug',
    'unpopular',
    'unproven',
    'unquote',
    'unranked',
    'unrated',
    'unraveled',
    'unreached',
    'unread',
    'unreal',
    'unreeling',
    'unrefined',
    'unrelated',
    'unrented',
    'unrest',
    'unretired',
    'unrevised',
    'unrigged',
    'unripe',
    'unrivaled',
    'unroasted',
    'unrobed',
    'unroll',
    'unruffled',
    'unruly',
    'unrushed',
    'unsaddle',
    'unsafe',
    'unsaid',
    'unsalted',
    'unsaved',
    'unsavory',
    'unscathed',
    'unscented',
    'unscrew',
    'unsealed',
    'unseated',
    'unsecured',
    'unseeing',
    'unseemly',
    'unseen',
    'unselect',
    'unselfish',
    'unsent',
    'unsettled',
    'unshackle',
    'unshaken',
    'unshaved',
    'unshaven',
    'unsheathe',
    'unshipped',
    'unsightly',
    'unsigned',
    'unskilled',
    'unsliced',
    'unsmooth',
    'unsnap',
    'unsocial',
    'unsoiled',
    'unsold',
    'unsolved',
    'unsorted',
    'unspoiled',
    'unspoken',
    'unstable',
    'unstaffed',
    'unstamped',
    'unsteady',
    'unsterile',
    'unstirred',
    'unstitch',
    'unstopped',
    'unstuck',
    'unstuffed',
    'unstylish',
    'unsubtle',
    'unsubtly',
    'unsuited',
    'unsure',
    'unsworn',
    'untagged',
    'untainted',
    'untaken',
    'untamed',
    'untangled',
    'untapped',
    'untaxed',
    'unthawed',
    'unthread',
    'untidy',
    'untie',
    'until',
    'untimed',
    'untimely',
    'untitled',
    'untoasted',
    'untold',
    'untouched',
    'untracked',
    'untrained',
    'untreated',
    'untried',
    'untrimmed',
    'untrue',
    'untruth',
    'unturned',
    'untwist',
    'untying',
    'unusable',
    'unused',
    'unusual',
    'unvalued',
    'unvaried',
    'unvarying',
    'unveiled',
    'unveiling',
    'unvented',
    'unviable',
    'unvisited',
    'unvocal',
    'unwanted',
    'unwarlike',
    'unwary',
    'unwashed',
    'unwatched',
    'unweave',
    'unwed',
    'unwelcome',
    'unwell',
    'unwieldy',
    'unwilling',
    'unwind',
    'unwired',
    'unwitting',
    'unwomanly',
    'unworldly',
    'unworn',
    'unworried',
    'unworthy',
    'unwound',
    'unwoven',
    'unwrapped',
    'unwritten',
    'unzip',
    'upbeat',
    'upchuck',
    'upcoming',
    'upcountry',
    'update',
    'upfront',
    'upgrade',
    'upheaval',
    'upheld',
    'uphill',
    'uphold',
    'uplifted',
    'uplifting',
    'upload',
    'upon',
    'upper',
    'upright',
    'uprising',
    'upriver',
    'uproar',
    'uproot',
    'upscale',
    'upside',
    'upstage',
    'upstairs',
    'upstart',
    'upstate',
    'upstream',
    'upstroke',
    'upswing',
    'uptake',
    'uptight',
    'uptown',
    'upturned',
    'upward',
    'upwind',
    'uranium',
    'urban',
    'urchin',
    'urethane',
    'urgency',
    'urgent',
    'urging',
    'urologist',
    'urology',
    'usable',
    'usage',
    'useable',
    'used',
    'uselessly',
    'user',
    'usher',
    'usual',
    'utensil',
    'utility',
    'utilize',
    'utmost',
    'utopia',
    'utter',
    'vacancy',
    'vacant',
    'vacate',
    'vacation',
    'vagabond',
    'vagrancy',
    'vagrantly',
    'vaguely',
    'vagueness',
    'valiant',
    'valid',
    'valium',
    'valley',
    'valuables',
    'value',
    'vanilla',
    'vanish',
    'vanity',
    'vanquish',
    'vantage',
    'vaporizer',
    'variable',
    'variably',
    'varied',
    'variety',
    'various',
    'varmint',
    'varnish',
    'varsity',
    'varying',
    'vascular',
    'vaseline',
    'vastly',
    'vastness',
    'veal',
    'vegan',
    'veggie',
    'vehicular',
    'velcro',
    'velocity',
    'velvet',
    'vendetta',
    'vending',
    'vendor',
    'veneering',
    'vengeful',
    'venomous',
    'ventricle',
    'venture',
    'venue',
    'venus',
    'verbalize',
    'verbally',
    'verbose',
    'verdict',
    'verify',
    'verse',
    'version',
    'versus',
    'vertebrae',
    'vertical',
    'vertigo',
    'very',
    'vessel',
    'vest',
    'veteran',
    'veto',
    'vexingly',
    'viability',
    'viable',
    'vibes',
    'vice',
    'vicinity',
    'victory',
    'video',
    'viewable',
    'viewer',
    'viewing',
    'viewless',
    'viewpoint',
    'vigorous',
    'village',
    'villain',
    'vindicate',
    'vineyard',
    'vintage',
    'violate',
    'violation',
    'violator',
    'violet',
    'violin',
    'viper',
    'viral',
    'virtual',
    'virtuous',
    'virus',
    'visa',
    'viscosity',
    'viscous',
    'viselike',
    'visible',
    'visibly',
    'vision',
    'visiting',
    'visitor',
    'visor',
    'vista',
    'vitality',
    'vitalize',
    'vitally',
    'vitamins',
    'vivacious',
    'vividly',
    'vividness',
    'vixen',
    'vocalist',
    'vocalize',
    'vocally',
    'vocation',
    'voice',
    'voicing',
    'void',
    'volatile',
    'volley',
    'voltage',
    'volumes',
    'voter',
    'voting',
    'voucher',
    'vowed',
    'vowel',
    'voyage',
    'wackiness',
    'wad',
    'wafer',
    'waffle',
    'waged',
    'wager',
    'wages',
    'waggle',
    'wagon',
    'wake',
    'waking',
    'walk',
    'walmart',
    'walnut',
    'walrus',
    'waltz',
    'wand',
    'wannabe',
    'wanted',
    'wanting',
    'wasabi',
    'washable',
    'washbasin',
    'washboard',
    'washbowl',
    'washcloth',
    'washday',
    'washed',
    'washer',
    'washhouse',
    'washing',
    'washout',
    'washroom',
    'washstand',
    'washtub',
    'wasp',
    'wasting',
    'watch',
    'water',
    'waviness',
    'waving',
    'wavy',
    'whacking',
    'whacky',
    'wham',
    'wharf',
    'wheat',
    'whenever',
    'whiff',
    'whimsical',
    'whinny',
    'whiny',
    'whisking',
    'whoever',
    'whole',
    'whomever',
    'whoopee',
    'whooping',
    'whoops',
    'why',
    'wick',
    'widely',
    'widen',
    'widget',
    'widow',
    'width',
    'wieldable',
    'wielder',
    'wife',
    'wifi',
    'wikipedia',
    'wildcard',
    'wildcat',
    'wilder',
    'wildfire',
    'wildfowl',
    'wildland',
    'wildlife',
    'wildly',
    'wildness',
    'willed',
    'willfully',
    'willing',
    'willow',
    'willpower',
    'wilt',
    'wimp',
    'wince',
    'wincing',
    'wind',
    'wing',
    'winking',
    'winner',
    'winnings',
    'winter',
    'wipe',
    'wired',
    'wireless',
    'wiring',
    'wiry',
    'wisdom',
    'wise',
    'wish',
    'wisplike',
    'wispy',
    'wistful',
    'wizard',
    'wobble',
    'wobbling',
    'wobbly',
    'wok',
    'wolf',
    'wolverine',
    'womanhood',
    'womankind',
    'womanless',
    'womanlike',
    'womanly',
    'womb',
    'woof',
    'wooing',
    'wool',
    'woozy',
    'word',
    'work',
    'worried',
    'worrier',
    'worrisome',
    'worry',
    'worsening',
    'worshiper',
    'worst',
    'wound',
    'woven',
    'wow',
    'wrangle',
    'wrath',
    'wreath',
    'wreckage',
    'wrecker',
    'wrecking',
    'wrench',
    'wriggle',
    'wriggly',
    'wrinkle',
    'wrinkly',
    'wrist',
    'writing',
    'written',
    'wrongdoer',
    'wronged',
    'wrongful',
    'wrongly',
    'wrongness',
    'wrought',
    'xbox',
    'xerox',
    'yahoo',
    'yam',
    'yanking',
    'yapping',
    'yard',
    'yarn',
    'yeah',
    'yearbook',
    'yearling',
    'yearly',
    'yearning',
    'yeast',
    'yelling',
    'yelp',
    'yen',
    'yesterday',
    'yiddish',
    'yield',
    'yin',
    'yippee',
    'yo-yo',
    'yodel',
    'yoga',
    'yogurt',
    'yonder',
    'yoyo',
    'yummy',
    'zap',
    'zealous',
    'zebra',
    'zen',
    'zeppelin',
    'zero',
    'zestfully',
    'zesty',
    'zigzagged',
    'zipfile',
    'zipping',
    'zippy',
    'zips',
    'zit',
    'zodiac',
    'zombie',
    'zone',
    'zoning',
    'zookeeper',
    'zoologist',
    'zoology',
    'zoom',
];
Object.defineProperty(newSecureWords$1, '__esModule', { value: true });
newSecureWords$1.newSecureWords = void 0;
const getSecureRandom_1$1 = getSecureRandom;
const wordlist_1$1 = wordlist$1;
async function newSecureWords(size2 = 6) {
    const words = [];
    for (let i = 0; i < size2; i++) {
        words.push(wordlist_1$1.wordlist[await (0, getSecureRandom_1$1.getSecureRandomNumber)(0, wordlist_1$1.wordlist.length)]);
    }
    return words;
}
newSecureWords$1.newSecureWords = newSecureWords;
const newSecurePassphrase$1 = {};
Object.defineProperty(newSecurePassphrase$1, '__esModule', { value: true });
newSecurePassphrase$1.newSecurePassphrase = void 0;
const __1 = dist;
async function newSecurePassphrase(size2 = 6) {
    return (await (0, __1.newSecureWords)(size2)).join('-');
}
newSecurePassphrase$1.newSecurePassphrase = newSecurePassphrase;
const mnemonic = {};
const binary = {};
Object.defineProperty(binary, '__esModule', { value: true });
binary.bitsToBytes = binary.bytesToBits = binary.lpad = void 0;
function lpad(str, padString, length) {
    while (str.length < length) {
        str = padString + str;
    }
    return str;
}
binary.lpad = lpad;
function bytesToBits(bytes2) {
    let res = '';
    for (let i = 0; i < bytes2.length; i++) {
        const x = bytes2.at(i);
        res += lpad(x.toString(2), '0', 8);
    }
    return res;
}
binary.bytesToBits = bytesToBits;
function bitsToBytes(src2) {
    if (src2.length % 8 !== 0) {
        throw Error('Uneven bits');
    }
    const res = [];
    while (src2.length > 0) {
        res.push(parseInt(src2.slice(0, 8), 2));
        src2 = src2.slice(8);
    }
    return Buffer.from(res);
}
binary.bitsToBytes = bitsToBytes;
const wordlist = {};
Object.defineProperty(wordlist, '__esModule', { value: true });
wordlist.wordlist = void 0;
const EN = [
    'abandon',
    'ability',
    'able',
    'about',
    'above',
    'absent',
    'absorb',
    'abstract',
    'absurd',
    'abuse',
    'access',
    'accident',
    'account',
    'accuse',
    'achieve',
    'acid',
    'acoustic',
    'acquire',
    'across',
    'act',
    'action',
    'actor',
    'actress',
    'actual',
    'adapt',
    'add',
    'addict',
    'address',
    'adjust',
    'admit',
    'adult',
    'advance',
    'advice',
    'aerobic',
    'affair',
    'afford',
    'afraid',
    'again',
    'age',
    'agent',
    'agree',
    'ahead',
    'aim',
    'air',
    'airport',
    'aisle',
    'alarm',
    'album',
    'alcohol',
    'alert',
    'alien',
    'all',
    'alley',
    'allow',
    'almost',
    'alone',
    'alpha',
    'already',
    'also',
    'alter',
    'always',
    'amateur',
    'amazing',
    'among',
    'amount',
    'amused',
    'analyst',
    'anchor',
    'ancient',
    'anger',
    'angle',
    'angry',
    'animal',
    'ankle',
    'announce',
    'annual',
    'another',
    'answer',
    'antenna',
    'antique',
    'anxiety',
    'any',
    'apart',
    'apology',
    'appear',
    'apple',
    'approve',
    'april',
    'arch',
    'arctic',
    'area',
    'arena',
    'argue',
    'arm',
    'armed',
    'armor',
    'army',
    'around',
    'arrange',
    'arrest',
    'arrive',
    'arrow',
    'art',
    'artefact',
    'artist',
    'artwork',
    'ask',
    'aspect',
    'assault',
    'asset',
    'assist',
    'assume',
    'asthma',
    'athlete',
    'atom',
    'attack',
    'attend',
    'attitude',
    'attract',
    'auction',
    'audit',
    'august',
    'aunt',
    'author',
    'auto',
    'autumn',
    'average',
    'avocado',
    'avoid',
    'awake',
    'aware',
    'away',
    'awesome',
    'awful',
    'awkward',
    'axis',
    'baby',
    'bachelor',
    'bacon',
    'badge',
    'bag',
    'balance',
    'balcony',
    'ball',
    'bamboo',
    'banana',
    'banner',
    'bar',
    'barely',
    'bargain',
    'barrel',
    'base',
    'basic',
    'basket',
    'battle',
    'beach',
    'bean',
    'beauty',
    'because',
    'become',
    'beef',
    'before',
    'begin',
    'behave',
    'behind',
    'believe',
    'below',
    'belt',
    'bench',
    'benefit',
    'best',
    'betray',
    'better',
    'between',
    'beyond',
    'bicycle',
    'bid',
    'bike',
    'bind',
    'biology',
    'bird',
    'birth',
    'bitter',
    'black',
    'blade',
    'blame',
    'blanket',
    'blast',
    'bleak',
    'bless',
    'blind',
    'blood',
    'blossom',
    'blouse',
    'blue',
    'blur',
    'blush',
    'board',
    'boat',
    'body',
    'boil',
    'bomb',
    'bone',
    'bonus',
    'book',
    'boost',
    'border',
    'boring',
    'borrow',
    'boss',
    'bottom',
    'bounce',
    'box',
    'boy',
    'bracket',
    'brain',
    'brand',
    'brass',
    'brave',
    'bread',
    'breeze',
    'brick',
    'bridge',
    'brief',
    'bright',
    'bring',
    'brisk',
    'broccoli',
    'broken',
    'bronze',
    'broom',
    'brother',
    'brown',
    'brush',
    'bubble',
    'buddy',
    'budget',
    'buffalo',
    'build',
    'bulb',
    'bulk',
    'bullet',
    'bundle',
    'bunker',
    'burden',
    'burger',
    'burst',
    'bus',
    'business',
    'busy',
    'butter',
    'buyer',
    'buzz',
    'cabbage',
    'cabin',
    'cable',
    'cactus',
    'cage',
    'cake',
    'call',
    'calm',
    'camera',
    'camp',
    'can',
    'canal',
    'cancel',
    'candy',
    'cannon',
    'canoe',
    'canvas',
    'canyon',
    'capable',
    'capital',
    'captain',
    'car',
    'carbon',
    'card',
    'cargo',
    'carpet',
    'carry',
    'cart',
    'case',
    'cash',
    'casino',
    'castle',
    'casual',
    'cat',
    'catalog',
    'catch',
    'category',
    'cattle',
    'caught',
    'cause',
    'caution',
    'cave',
    'ceiling',
    'celery',
    'cement',
    'census',
    'century',
    'cereal',
    'certain',
    'chair',
    'chalk',
    'champion',
    'change',
    'chaos',
    'chapter',
    'charge',
    'chase',
    'chat',
    'cheap',
    'check',
    'cheese',
    'chef',
    'cherry',
    'chest',
    'chicken',
    'chief',
    'child',
    'chimney',
    'choice',
    'choose',
    'chronic',
    'chuckle',
    'chunk',
    'churn',
    'cigar',
    'cinnamon',
    'circle',
    'citizen',
    'city',
    'civil',
    'claim',
    'clap',
    'clarify',
    'claw',
    'clay',
    'clean',
    'clerk',
    'clever',
    'click',
    'client',
    'cliff',
    'climb',
    'clinic',
    'clip',
    'clock',
    'clog',
    'close',
    'cloth',
    'cloud',
    'clown',
    'club',
    'clump',
    'cluster',
    'clutch',
    'coach',
    'coast',
    'coconut',
    'code',
    'coffee',
    'coil',
    'coin',
    'collect',
    'color',
    'column',
    'combine',
    'come',
    'comfort',
    'comic',
    'common',
    'company',
    'concert',
    'conduct',
    'confirm',
    'congress',
    'connect',
    'consider',
    'control',
    'convince',
    'cook',
    'cool',
    'copper',
    'copy',
    'coral',
    'core',
    'corn',
    'correct',
    'cost',
    'cotton',
    'couch',
    'country',
    'couple',
    'course',
    'cousin',
    'cover',
    'coyote',
    'crack',
    'cradle',
    'craft',
    'cram',
    'crane',
    'crash',
    'crater',
    'crawl',
    'crazy',
    'cream',
    'credit',
    'creek',
    'crew',
    'cricket',
    'crime',
    'crisp',
    'critic',
    'crop',
    'cross',
    'crouch',
    'crowd',
    'crucial',
    'cruel',
    'cruise',
    'crumble',
    'crunch',
    'crush',
    'cry',
    'crystal',
    'cube',
    'culture',
    'cup',
    'cupboard',
    'curious',
    'current',
    'curtain',
    'curve',
    'cushion',
    'custom',
    'cute',
    'cycle',
    'dad',
    'damage',
    'damp',
    'dance',
    'danger',
    'daring',
    'dash',
    'daughter',
    'dawn',
    'day',
    'deal',
    'debate',
    'debris',
    'decade',
    'december',
    'decide',
    'decline',
    'decorate',
    'decrease',
    'deer',
    'defense',
    'define',
    'defy',
    'degree',
    'delay',
    'deliver',
    'demand',
    'demise',
    'denial',
    'dentist',
    'deny',
    'depart',
    'depend',
    'deposit',
    'depth',
    'deputy',
    'derive',
    'describe',
    'desert',
    'design',
    'desk',
    'despair',
    'destroy',
    'detail',
    'detect',
    'develop',
    'device',
    'devote',
    'diagram',
    'dial',
    'diamond',
    'diary',
    'dice',
    'diesel',
    'diet',
    'differ',
    'digital',
    'dignity',
    'dilemma',
    'dinner',
    'dinosaur',
    'direct',
    'dirt',
    'disagree',
    'discover',
    'disease',
    'dish',
    'dismiss',
    'disorder',
    'display',
    'distance',
    'divert',
    'divide',
    'divorce',
    'dizzy',
    'doctor',
    'document',
    'dog',
    'doll',
    'dolphin',
    'domain',
    'donate',
    'donkey',
    'donor',
    'door',
    'dose',
    'double',
    'dove',
    'draft',
    'dragon',
    'drama',
    'drastic',
    'draw',
    'dream',
    'dress',
    'drift',
    'drill',
    'drink',
    'drip',
    'drive',
    'drop',
    'drum',
    'dry',
    'duck',
    'dumb',
    'dune',
    'during',
    'dust',
    'dutch',
    'duty',
    'dwarf',
    'dynamic',
    'eager',
    'eagle',
    'early',
    'earn',
    'earth',
    'easily',
    'east',
    'easy',
    'echo',
    'ecology',
    'economy',
    'edge',
    'edit',
    'educate',
    'effort',
    'egg',
    'eight',
    'either',
    'elbow',
    'elder',
    'electric',
    'elegant',
    'element',
    'elephant',
    'elevator',
    'elite',
    'else',
    'embark',
    'embody',
    'embrace',
    'emerge',
    'emotion',
    'employ',
    'empower',
    'empty',
    'enable',
    'enact',
    'end',
    'endless',
    'endorse',
    'enemy',
    'energy',
    'enforce',
    'engage',
    'engine',
    'enhance',
    'enjoy',
    'enlist',
    'enough',
    'enrich',
    'enroll',
    'ensure',
    'enter',
    'entire',
    'entry',
    'envelope',
    'episode',
    'equal',
    'equip',
    'era',
    'erase',
    'erode',
    'erosion',
    'error',
    'erupt',
    'escape',
    'essay',
    'essence',
    'estate',
    'eternal',
    'ethics',
    'evidence',
    'evil',
    'evoke',
    'evolve',
    'exact',
    'example',
    'excess',
    'exchange',
    'excite',
    'exclude',
    'excuse',
    'execute',
    'exercise',
    'exhaust',
    'exhibit',
    'exile',
    'exist',
    'exit',
    'exotic',
    'expand',
    'expect',
    'expire',
    'explain',
    'expose',
    'express',
    'extend',
    'extra',
    'eye',
    'eyebrow',
    'fabric',
    'face',
    'faculty',
    'fade',
    'faint',
    'faith',
    'fall',
    'false',
    'fame',
    'family',
    'famous',
    'fan',
    'fancy',
    'fantasy',
    'farm',
    'fashion',
    'fat',
    'fatal',
    'father',
    'fatigue',
    'fault',
    'favorite',
    'feature',
    'february',
    'federal',
    'fee',
    'feed',
    'feel',
    'female',
    'fence',
    'festival',
    'fetch',
    'fever',
    'few',
    'fiber',
    'fiction',
    'field',
    'figure',
    'file',
    'film',
    'filter',
    'final',
    'find',
    'fine',
    'finger',
    'finish',
    'fire',
    'firm',
    'first',
    'fiscal',
    'fish',
    'fit',
    'fitness',
    'fix',
    'flag',
    'flame',
    'flash',
    'flat',
    'flavor',
    'flee',
    'flight',
    'flip',
    'float',
    'flock',
    'floor',
    'flower',
    'fluid',
    'flush',
    'fly',
    'foam',
    'focus',
    'fog',
    'foil',
    'fold',
    'follow',
    'food',
    'foot',
    'force',
    'forest',
    'forget',
    'fork',
    'fortune',
    'forum',
    'forward',
    'fossil',
    'foster',
    'found',
    'fox',
    'fragile',
    'frame',
    'frequent',
    'fresh',
    'friend',
    'fringe',
    'frog',
    'front',
    'frost',
    'frown',
    'frozen',
    'fruit',
    'fuel',
    'fun',
    'funny',
    'furnace',
    'fury',
    'future',
    'gadget',
    'gain',
    'galaxy',
    'gallery',
    'game',
    'gap',
    'garage',
    'garbage',
    'garden',
    'garlic',
    'garment',
    'gas',
    'gasp',
    'gate',
    'gather',
    'gauge',
    'gaze',
    'general',
    'genius',
    'genre',
    'gentle',
    'genuine',
    'gesture',
    'ghost',
    'giant',
    'gift',
    'giggle',
    'ginger',
    'giraffe',
    'girl',
    'give',
    'glad',
    'glance',
    'glare',
    'glass',
    'glide',
    'glimpse',
    'globe',
    'gloom',
    'glory',
    'glove',
    'glow',
    'glue',
    'goat',
    'goddess',
    'gold',
    'good',
    'goose',
    'gorilla',
    'gospel',
    'gossip',
    'govern',
    'gown',
    'grab',
    'grace',
    'grain',
    'grant',
    'grape',
    'grass',
    'gravity',
    'great',
    'green',
    'grid',
    'grief',
    'grit',
    'grocery',
    'group',
    'grow',
    'grunt',
    'guard',
    'guess',
    'guide',
    'guilt',
    'guitar',
    'gun',
    'gym',
    'habit',
    'hair',
    'half',
    'hammer',
    'hamster',
    'hand',
    'happy',
    'harbor',
    'hard',
    'harsh',
    'harvest',
    'hat',
    'have',
    'hawk',
    'hazard',
    'head',
    'health',
    'heart',
    'heavy',
    'hedgehog',
    'height',
    'hello',
    'helmet',
    'help',
    'hen',
    'hero',
    'hidden',
    'high',
    'hill',
    'hint',
    'hip',
    'hire',
    'history',
    'hobby',
    'hockey',
    'hold',
    'hole',
    'holiday',
    'hollow',
    'home',
    'honey',
    'hood',
    'hope',
    'horn',
    'horror',
    'horse',
    'hospital',
    'host',
    'hotel',
    'hour',
    'hover',
    'hub',
    'huge',
    'human',
    'humble',
    'humor',
    'hundred',
    'hungry',
    'hunt',
    'hurdle',
    'hurry',
    'hurt',
    'husband',
    'hybrid',
    'ice',
    'icon',
    'idea',
    'identify',
    'idle',
    'ignore',
    'ill',
    'illegal',
    'illness',
    'image',
    'imitate',
    'immense',
    'immune',
    'impact',
    'impose',
    'improve',
    'impulse',
    'inch',
    'include',
    'income',
    'increase',
    'index',
    'indicate',
    'indoor',
    'industry',
    'infant',
    'inflict',
    'inform',
    'inhale',
    'inherit',
    'initial',
    'inject',
    'injury',
    'inmate',
    'inner',
    'innocent',
    'input',
    'inquiry',
    'insane',
    'insect',
    'inside',
    'inspire',
    'install',
    'intact',
    'interest',
    'into',
    'invest',
    'invite',
    'involve',
    'iron',
    'island',
    'isolate',
    'issue',
    'item',
    'ivory',
    'jacket',
    'jaguar',
    'jar',
    'jazz',
    'jealous',
    'jeans',
    'jelly',
    'jewel',
    'job',
    'join',
    'joke',
    'journey',
    'joy',
    'judge',
    'juice',
    'jump',
    'jungle',
    'junior',
    'junk',
    'just',
    'kangaroo',
    'keen',
    'keep',
    'ketchup',
    'key',
    'kick',
    'kid',
    'kidney',
    'kind',
    'kingdom',
    'kiss',
    'kit',
    'kitchen',
    'kite',
    'kitten',
    'kiwi',
    'knee',
    'knife',
    'knock',
    'know',
    'lab',
    'label',
    'labor',
    'ladder',
    'lady',
    'lake',
    'lamp',
    'language',
    'laptop',
    'large',
    'later',
    'latin',
    'laugh',
    'laundry',
    'lava',
    'law',
    'lawn',
    'lawsuit',
    'layer',
    'lazy',
    'leader',
    'leaf',
    'learn',
    'leave',
    'lecture',
    'left',
    'leg',
    'legal',
    'legend',
    'leisure',
    'lemon',
    'lend',
    'length',
    'lens',
    'leopard',
    'lesson',
    'letter',
    'level',
    'liar',
    'liberty',
    'library',
    'license',
    'life',
    'lift',
    'light',
    'like',
    'limb',
    'limit',
    'link',
    'lion',
    'liquid',
    'list',
    'little',
    'live',
    'lizard',
    'load',
    'loan',
    'lobster',
    'local',
    'lock',
    'logic',
    'lonely',
    'long',
    'loop',
    'lottery',
    'loud',
    'lounge',
    'love',
    'loyal',
    'lucky',
    'luggage',
    'lumber',
    'lunar',
    'lunch',
    'luxury',
    'lyrics',
    'machine',
    'mad',
    'magic',
    'magnet',
    'maid',
    'mail',
    'main',
    'major',
    'make',
    'mammal',
    'man',
    'manage',
    'mandate',
    'mango',
    'mansion',
    'manual',
    'maple',
    'marble',
    'march',
    'margin',
    'marine',
    'market',
    'marriage',
    'mask',
    'mass',
    'master',
    'match',
    'material',
    'math',
    'matrix',
    'matter',
    'maximum',
    'maze',
    'meadow',
    'mean',
    'measure',
    'meat',
    'mechanic',
    'medal',
    'media',
    'melody',
    'melt',
    'member',
    'memory',
    'mention',
    'menu',
    'mercy',
    'merge',
    'merit',
    'merry',
    'mesh',
    'message',
    'metal',
    'method',
    'middle',
    'midnight',
    'milk',
    'million',
    'mimic',
    'mind',
    'minimum',
    'minor',
    'minute',
    'miracle',
    'mirror',
    'misery',
    'miss',
    'mistake',
    'mix',
    'mixed',
    'mixture',
    'mobile',
    'model',
    'modify',
    'mom',
    'moment',
    'monitor',
    'monkey',
    'monster',
    'month',
    'moon',
    'moral',
    'more',
    'morning',
    'mosquito',
    'mother',
    'motion',
    'motor',
    'mountain',
    'mouse',
    'move',
    'movie',
    'much',
    'muffin',
    'mule',
    'multiply',
    'muscle',
    'museum',
    'mushroom',
    'music',
    'must',
    'mutual',
    'myself',
    'mystery',
    'myth',
    'naive',
    'name',
    'napkin',
    'narrow',
    'nasty',
    'nation',
    'nature',
    'near',
    'neck',
    'need',
    'negative',
    'neglect',
    'neither',
    'nephew',
    'nerve',
    'nest',
    'net',
    'network',
    'neutral',
    'never',
    'news',
    'next',
    'nice',
    'night',
    'noble',
    'noise',
    'nominee',
    'noodle',
    'normal',
    'north',
    'nose',
    'notable',
    'note',
    'nothing',
    'notice',
    'novel',
    'now',
    'nuclear',
    'number',
    'nurse',
    'nut',
    'oak',
    'obey',
    'object',
    'oblige',
    'obscure',
    'observe',
    'obtain',
    'obvious',
    'occur',
    'ocean',
    'october',
    'odor',
    'off',
    'offer',
    'office',
    'often',
    'oil',
    'okay',
    'old',
    'olive',
    'olympic',
    'omit',
    'once',
    'one',
    'onion',
    'online',
    'only',
    'open',
    'opera',
    'opinion',
    'oppose',
    'option',
    'orange',
    'orbit',
    'orchard',
    'order',
    'ordinary',
    'organ',
    'orient',
    'original',
    'orphan',
    'ostrich',
    'other',
    'outdoor',
    'outer',
    'output',
    'outside',
    'oval',
    'oven',
    'over',
    'own',
    'owner',
    'oxygen',
    'oyster',
    'ozone',
    'pact',
    'paddle',
    'page',
    'pair',
    'palace',
    'palm',
    'panda',
    'panel',
    'panic',
    'panther',
    'paper',
    'parade',
    'parent',
    'park',
    'parrot',
    'party',
    'pass',
    'patch',
    'path',
    'patient',
    'patrol',
    'pattern',
    'pause',
    'pave',
    'payment',
    'peace',
    'peanut',
    'pear',
    'peasant',
    'pelican',
    'pen',
    'penalty',
    'pencil',
    'people',
    'pepper',
    'perfect',
    'permit',
    'person',
    'pet',
    'phone',
    'photo',
    'phrase',
    'physical',
    'piano',
    'picnic',
    'picture',
    'piece',
    'pig',
    'pigeon',
    'pill',
    'pilot',
    'pink',
    'pioneer',
    'pipe',
    'pistol',
    'pitch',
    'pizza',
    'place',
    'planet',
    'plastic',
    'plate',
    'play',
    'please',
    'pledge',
    'pluck',
    'plug',
    'plunge',
    'poem',
    'poet',
    'point',
    'polar',
    'pole',
    'police',
    'pond',
    'pony',
    'pool',
    'popular',
    'portion',
    'position',
    'possible',
    'post',
    'potato',
    'pottery',
    'poverty',
    'powder',
    'power',
    'practice',
    'praise',
    'predict',
    'prefer',
    'prepare',
    'present',
    'pretty',
    'prevent',
    'price',
    'pride',
    'primary',
    'print',
    'priority',
    'prison',
    'private',
    'prize',
    'problem',
    'process',
    'produce',
    'profit',
    'program',
    'project',
    'promote',
    'proof',
    'property',
    'prosper',
    'protect',
    'proud',
    'provide',
    'public',
    'pudding',
    'pull',
    'pulp',
    'pulse',
    'pumpkin',
    'punch',
    'pupil',
    'puppy',
    'purchase',
    'purity',
    'purpose',
    'purse',
    'push',
    'put',
    'puzzle',
    'pyramid',
    'quality',
    'quantum',
    'quarter',
    'question',
    'quick',
    'quit',
    'quiz',
    'quote',
    'rabbit',
    'raccoon',
    'race',
    'rack',
    'radar',
    'radio',
    'rail',
    'rain',
    'raise',
    'rally',
    'ramp',
    'ranch',
    'random',
    'range',
    'rapid',
    'rare',
    'rate',
    'rather',
    'raven',
    'raw',
    'razor',
    'ready',
    'real',
    'reason',
    'rebel',
    'rebuild',
    'recall',
    'receive',
    'recipe',
    'record',
    'recycle',
    'reduce',
    'reflect',
    'reform',
    'refuse',
    'region',
    'regret',
    'regular',
    'reject',
    'relax',
    'release',
    'relief',
    'rely',
    'remain',
    'remember',
    'remind',
    'remove',
    'render',
    'renew',
    'rent',
    'reopen',
    'repair',
    'repeat',
    'replace',
    'report',
    'require',
    'rescue',
    'resemble',
    'resist',
    'resource',
    'response',
    'result',
    'retire',
    'retreat',
    'return',
    'reunion',
    'reveal',
    'review',
    'reward',
    'rhythm',
    'rib',
    'ribbon',
    'rice',
    'rich',
    'ride',
    'ridge',
    'rifle',
    'right',
    'rigid',
    'ring',
    'riot',
    'ripple',
    'risk',
    'ritual',
    'rival',
    'river',
    'road',
    'roast',
    'robot',
    'robust',
    'rocket',
    'romance',
    'roof',
    'rookie',
    'room',
    'rose',
    'rotate',
    'rough',
    'round',
    'route',
    'royal',
    'rubber',
    'rude',
    'rug',
    'rule',
    'run',
    'runway',
    'rural',
    'sad',
    'saddle',
    'sadness',
    'safe',
    'sail',
    'salad',
    'salmon',
    'salon',
    'salt',
    'salute',
    'same',
    'sample',
    'sand',
    'satisfy',
    'satoshi',
    'sauce',
    'sausage',
    'save',
    'say',
    'scale',
    'scan',
    'scare',
    'scatter',
    'scene',
    'scheme',
    'school',
    'science',
    'scissors',
    'scorpion',
    'scout',
    'scrap',
    'screen',
    'script',
    'scrub',
    'sea',
    'search',
    'season',
    'seat',
    'second',
    'secret',
    'section',
    'security',
    'seed',
    'seek',
    'segment',
    'select',
    'sell',
    'seminar',
    'senior',
    'sense',
    'sentence',
    'series',
    'service',
    'session',
    'settle',
    'setup',
    'seven',
    'shadow',
    'shaft',
    'shallow',
    'share',
    'shed',
    'shell',
    'sheriff',
    'shield',
    'shift',
    'shine',
    'ship',
    'shiver',
    'shock',
    'shoe',
    'shoot',
    'shop',
    'short',
    'shoulder',
    'shove',
    'shrimp',
    'shrug',
    'shuffle',
    'shy',
    'sibling',
    'sick',
    'side',
    'siege',
    'sight',
    'sign',
    'silent',
    'silk',
    'silly',
    'silver',
    'similar',
    'simple',
    'since',
    'sing',
    'siren',
    'sister',
    'situate',
    'six',
    'size',
    'skate',
    'sketch',
    'ski',
    'skill',
    'skin',
    'skirt',
    'skull',
    'slab',
    'slam',
    'sleep',
    'slender',
    'slice',
    'slide',
    'slight',
    'slim',
    'slogan',
    'slot',
    'slow',
    'slush',
    'small',
    'smart',
    'smile',
    'smoke',
    'smooth',
    'snack',
    'snake',
    'snap',
    'sniff',
    'snow',
    'soap',
    'soccer',
    'social',
    'sock',
    'soda',
    'soft',
    'solar',
    'soldier',
    'solid',
    'solution',
    'solve',
    'someone',
    'song',
    'soon',
    'sorry',
    'sort',
    'soul',
    'sound',
    'soup',
    'source',
    'south',
    'space',
    'spare',
    'spatial',
    'spawn',
    'speak',
    'special',
    'speed',
    'spell',
    'spend',
    'sphere',
    'spice',
    'spider',
    'spike',
    'spin',
    'spirit',
    'split',
    'spoil',
    'sponsor',
    'spoon',
    'sport',
    'spot',
    'spray',
    'spread',
    'spring',
    'spy',
    'square',
    'squeeze',
    'squirrel',
    'stable',
    'stadium',
    'staff',
    'stage',
    'stairs',
    'stamp',
    'stand',
    'start',
    'state',
    'stay',
    'steak',
    'steel',
    'stem',
    'step',
    'stereo',
    'stick',
    'still',
    'sting',
    'stock',
    'stomach',
    'stone',
    'stool',
    'story',
    'stove',
    'strategy',
    'street',
    'strike',
    'strong',
    'struggle',
    'student',
    'stuff',
    'stumble',
    'style',
    'subject',
    'submit',
    'subway',
    'success',
    'such',
    'sudden',
    'suffer',
    'sugar',
    'suggest',
    'suit',
    'summer',
    'sun',
    'sunny',
    'sunset',
    'super',
    'supply',
    'supreme',
    'sure',
    'surface',
    'surge',
    'surprise',
    'surround',
    'survey',
    'suspect',
    'sustain',
    'swallow',
    'swamp',
    'swap',
    'swarm',
    'swear',
    'sweet',
    'swift',
    'swim',
    'swing',
    'switch',
    'sword',
    'symbol',
    'symptom',
    'syrup',
    'system',
    'table',
    'tackle',
    'tag',
    'tail',
    'talent',
    'talk',
    'tank',
    'tape',
    'target',
    'task',
    'taste',
    'tattoo',
    'taxi',
    'teach',
    'team',
    'tell',
    'ten',
    'tenant',
    'tennis',
    'tent',
    'term',
    'test',
    'text',
    'thank',
    'that',
    'theme',
    'then',
    'theory',
    'there',
    'they',
    'thing',
    'this',
    'thought',
    'three',
    'thrive',
    'throw',
    'thumb',
    'thunder',
    'ticket',
    'tide',
    'tiger',
    'tilt',
    'timber',
    'time',
    'tiny',
    'tip',
    'tired',
    'tissue',
    'title',
    'toast',
    'tobacco',
    'today',
    'toddler',
    'toe',
    'together',
    'toilet',
    'token',
    'tomato',
    'tomorrow',
    'tone',
    'tongue',
    'tonight',
    'tool',
    'tooth',
    'top',
    'topic',
    'topple',
    'torch',
    'tornado',
    'tortoise',
    'toss',
    'total',
    'tourist',
    'toward',
    'tower',
    'town',
    'toy',
    'track',
    'trade',
    'traffic',
    'tragic',
    'train',
    'transfer',
    'trap',
    'trash',
    'travel',
    'tray',
    'treat',
    'tree',
    'trend',
    'trial',
    'tribe',
    'trick',
    'trigger',
    'trim',
    'trip',
    'trophy',
    'trouble',
    'truck',
    'true',
    'truly',
    'trumpet',
    'trust',
    'truth',
    'try',
    'tube',
    'tuition',
    'tumble',
    'tuna',
    'tunnel',
    'turkey',
    'turn',
    'turtle',
    'twelve',
    'twenty',
    'twice',
    'twin',
    'twist',
    'two',
    'type',
    'typical',
    'ugly',
    'umbrella',
    'unable',
    'unaware',
    'uncle',
    'uncover',
    'under',
    'undo',
    'unfair',
    'unfold',
    'unhappy',
    'uniform',
    'unique',
    'unit',
    'universe',
    'unknown',
    'unlock',
    'until',
    'unusual',
    'unveil',
    'update',
    'upgrade',
    'uphold',
    'upon',
    'upper',
    'upset',
    'urban',
    'urge',
    'usage',
    'use',
    'used',
    'useful',
    'useless',
    'usual',
    'utility',
    'vacant',
    'vacuum',
    'vague',
    'valid',
    'valley',
    'valve',
    'van',
    'vanish',
    'vapor',
    'various',
    'vast',
    'vault',
    'vehicle',
    'velvet',
    'vendor',
    'venture',
    'venue',
    'verb',
    'verify',
    'version',
    'very',
    'vessel',
    'veteran',
    'viable',
    'vibrant',
    'vicious',
    'victory',
    'video',
    'view',
    'village',
    'vintage',
    'violin',
    'virtual',
    'virus',
    'visa',
    'visit',
    'visual',
    'vital',
    'vivid',
    'vocal',
    'voice',
    'void',
    'volcano',
    'volume',
    'vote',
    'voyage',
    'wage',
    'wagon',
    'wait',
    'walk',
    'wall',
    'walnut',
    'want',
    'warfare',
    'warm',
    'warrior',
    'wash',
    'wasp',
    'waste',
    'water',
    'wave',
    'way',
    'wealth',
    'weapon',
    'wear',
    'weasel',
    'weather',
    'web',
    'wedding',
    'weekend',
    'weird',
    'welcome',
    'west',
    'wet',
    'whale',
    'what',
    'wheat',
    'wheel',
    'when',
    'where',
    'whip',
    'whisper',
    'wide',
    'width',
    'wife',
    'wild',
    'will',
    'win',
    'window',
    'wine',
    'wing',
    'wink',
    'winner',
    'winter',
    'wire',
    'wisdom',
    'wise',
    'wish',
    'witness',
    'wolf',
    'woman',
    'wonder',
    'wood',
    'wool',
    'word',
    'work',
    'world',
    'worry',
    'worth',
    'wrap',
    'wreck',
    'wrestle',
    'wrist',
    'write',
    'wrong',
    'yard',
    'year',
    'yellow',
    'you',
    'young',
    'youth',
    'zebra',
    'zero',
    'zone',
    'zoo',
];
wordlist.wordlist = EN;
const __importDefault$1 = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { 'default': mod };
};
Object.defineProperty(mnemonic, '__esModule', { value: true });
mnemonic.mnemonicFromRandomSeed = mnemonic.mnemonicIndexesToBytes = mnemonic.bytesToMnemonics = mnemonic.bytesToMnemonicIndexes = mnemonic.mnemonicNew = mnemonic.mnemonicValidate = mnemonic.mnemonicToHDSeed = mnemonic.mnemonicToWalletKey = mnemonic.mnemonicToPrivateKey = mnemonic.mnemonicToSeed = mnemonic.mnemonicToEntropy = void 0;
const tweetnacl_1$1 = __importDefault$1(naclFast.exports);
const getSecureRandom_1 = getSecureRandom;
const hmac_sha512_1$3 = hmac_sha512$1;
const pbkdf2_sha512_1 = pbkdf2_sha512$1;
const binary_1 = binary;
const wordlist_1 = wordlist;
const PBKDF_ITERATIONS = 1e5;
async function isPasswordNeeded(mnemonicArray) {
    const passlessEntropy = await mnemonicToEntropy(mnemonicArray);
    return await isPasswordSeed(passlessEntropy) && !await isBasicSeed(passlessEntropy);
}
function normalizeMnemonic(src2) {
    return src2.map((v) => v.toLowerCase().trim());
}
async function isBasicSeed(entropy) {
    const seed = await (0, pbkdf2_sha512_1.pbkdf2_sha512)(entropy, 'TON seed version', Math.max(1, Math.floor(PBKDF_ITERATIONS / 256)), 64);
    return seed[0] == 0;
}
async function isPasswordSeed(entropy) {
    const seed = await (0, pbkdf2_sha512_1.pbkdf2_sha512)(entropy, 'TON fast seed version', 1, 64);
    return seed[0] == 1;
}
async function mnemonicToEntropy(mnemonicArray, password) {
    return await (0, hmac_sha512_1$3.hmac_sha512)(mnemonicArray.join(' '), password && password.length > 0 ? password : '');
}
mnemonic.mnemonicToEntropy = mnemonicToEntropy;
async function mnemonicToSeed(mnemonicArray, seed, password) {
    const entropy = await mnemonicToEntropy(mnemonicArray, password);
    return await (0, pbkdf2_sha512_1.pbkdf2_sha512)(entropy, seed, PBKDF_ITERATIONS, 64);
}
mnemonic.mnemonicToSeed = mnemonicToSeed;
async function mnemonicToPrivateKey(mnemonicArray, password) {
    mnemonicArray = normalizeMnemonic(mnemonicArray);
    const seed = await mnemonicToSeed(mnemonicArray, 'TON default seed', password);
    const keyPair = tweetnacl_1$1.default.sign.keyPair.fromSeed(seed.slice(0, 32));
    return {
        publicKey: Buffer.from(keyPair.publicKey),
        secretKey: Buffer.from(keyPair.secretKey),
    };
}
mnemonic.mnemonicToPrivateKey = mnemonicToPrivateKey;
async function mnemonicToWalletKey(mnemonicArray, password) {
    const seedPk = await mnemonicToPrivateKey(mnemonicArray, password);
    const seedSecret = seedPk.secretKey.slice(0, 32);
    const keyPair = tweetnacl_1$1.default.sign.keyPair.fromSeed(seedSecret);
    return {
        publicKey: Buffer.from(keyPair.publicKey),
        secretKey: Buffer.from(keyPair.secretKey),
    };
}
mnemonic.mnemonicToWalletKey = mnemonicToWalletKey;
async function mnemonicToHDSeed(mnemonicArray, password) {
    mnemonicArray = normalizeMnemonic(mnemonicArray);
    return await mnemonicToSeed(mnemonicArray, 'TON HD Keys seed', password);
}
mnemonic.mnemonicToHDSeed = mnemonicToHDSeed;
async function mnemonicValidate(mnemonicArray, password) {
    mnemonicArray = normalizeMnemonic(mnemonicArray);
    for (const word of mnemonicArray) {
        if (wordlist_1.wordlist.indexOf(word) < 0) {
            return false;
        }
    }
    if (password && password.length > 0) {
        if (!await isPasswordNeeded(mnemonicArray)) {
            return false;
        }
    }
    return await isBasicSeed(await mnemonicToEntropy(mnemonicArray, password));
}
mnemonic.mnemonicValidate = mnemonicValidate;
async function mnemonicNew(wordsCount = 24, password) {
    let mnemonicArray = [];
    while (true) {
        mnemonicArray = [];
        for (let i = 0; i < wordsCount; i++) {
            const ind = await (0, getSecureRandom_1.getSecureRandomNumber)(0, wordlist_1.wordlist.length);
            mnemonicArray.push(wordlist_1.wordlist[ind]);
        }
        if (password && password.length > 0) {
            if (!await isPasswordNeeded(mnemonicArray)) {
                continue;
            }
        }
        if (!await isBasicSeed(await mnemonicToEntropy(mnemonicArray, password))) {
            continue;
        }
        break;
    }
    return mnemonicArray;
}
mnemonic.mnemonicNew = mnemonicNew;
function bytesToMnemonicIndexes(src2, wordsCount) {
    const bits2 = (0, binary_1.bytesToBits)(src2);
    const indexes = [];
    for (let i = 0; i < wordsCount; i++) {
        const sl = bits2.slice(i * 11, i * 11 + 11);
        indexes.push(parseInt(sl, 2));
    }
    return indexes;
}
mnemonic.bytesToMnemonicIndexes = bytesToMnemonicIndexes;
function bytesToMnemonics(src2, wordsCount) {
    const mnemonics2 = bytesToMnemonicIndexes(src2, wordsCount);
    const res = [];
    for (const m of mnemonics2) {
        res.push(wordlist_1.wordlist[m]);
    }
    return res;
}
mnemonic.bytesToMnemonics = bytesToMnemonics;
function mnemonicIndexesToBytes(src2) {
    let res = '';
    for (const s of src2) {
        if (!Number.isSafeInteger(s)) {
            throw Error('Invalid input');
        }
        if (s < 0 || s >= 2028) {
            throw Error('Invalid input');
        }
        res += (0, binary_1.lpad)(s.toString(2), '0', 11);
    }
    while (res.length % 8 !== 0) {
        res = `${res}0`;
    }
    return (0, binary_1.bitsToBytes)(res);
}
mnemonic.mnemonicIndexesToBytes = mnemonicIndexesToBytes;
async function mnemonicFromRandomSeed(seed, wordsCount = 24, password) {
    const bytesLength = Math.ceil(wordsCount * 11 / 8);
    let currentSeed = seed;
    while (true) {
        const entropy = await (0, pbkdf2_sha512_1.pbkdf2_sha512)(currentSeed, 'TON mnemonic seed', Math.max(1, Math.floor(PBKDF_ITERATIONS / 256)), bytesLength);
        const mnemonics2 = bytesToMnemonics(entropy, wordsCount);
        if (await mnemonicValidate(mnemonics2, password)) {
            return mnemonics2;
        }
        currentSeed = entropy;
    }
}
mnemonic.mnemonicFromRandomSeed = mnemonicFromRandomSeed;
const nacl = {};
const __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { 'default': mod };
};
Object.defineProperty(nacl, '__esModule', { value: true });
nacl.openBox = nacl.sealBox = nacl.signVerify = nacl.sign = nacl.keyPairFromSeed = nacl.keyPairFromSecretKey = void 0;
const tweetnacl_1 = __importDefault(naclFast.exports);
function keyPairFromSecretKey(secretKey) {
    const res = tweetnacl_1.default.sign.keyPair.fromSecretKey(new Uint8Array(secretKey));
    return {
        publicKey: Buffer.from(res.publicKey),
        secretKey: Buffer.from(res.secretKey),
    };
}
nacl.keyPairFromSecretKey = keyPairFromSecretKey;
function keyPairFromSeed(secretKey) {
    const res = tweetnacl_1.default.sign.keyPair.fromSeed(new Uint8Array(secretKey));
    return {
        publicKey: Buffer.from(res.publicKey),
        secretKey: Buffer.from(res.secretKey),
    };
}
nacl.keyPairFromSeed = keyPairFromSeed;
function sign(data2, secretKey) {
    return Buffer.from(tweetnacl_1.default.sign.detached(new Uint8Array(data2), new Uint8Array(secretKey)));
}
nacl.sign = sign;
function signVerify(data2, signature, publicKey) {
    return tweetnacl_1.default.sign.detached.verify(new Uint8Array(data2), new Uint8Array(signature), new Uint8Array(publicKey));
}
nacl.signVerify = signVerify;
function sealBox(data2, nonce, key) {
    return Buffer.from(tweetnacl_1.default.secretbox(data2, nonce, key));
}
nacl.sealBox = sealBox;
function openBox(data2, nonce, key) {
    const res = tweetnacl_1.default.secretbox.open(data2, nonce, key);
    if (!res) {
        return null;
    }
    return Buffer.from(res);
}
nacl.openBox = openBox;
const ed25519 = {};
Object.defineProperty(ed25519, '__esModule', { value: true });
ed25519.deriveEd25519Path = ed25519.deriveED25519HardenedKey = ed25519.getED25519MasterKeyFromSeed = void 0;
const hmac_sha512_1$2 = hmac_sha512$1;
const ED25519_CURVE = 'ed25519 seed';
const HARDENED_OFFSET$1 = 2147483648;
async function getED25519MasterKeyFromSeed(seed) {
    const I = await (0, hmac_sha512_1$2.hmac_sha512)(ED25519_CURVE, seed);
    const IL = I.slice(0, 32);
    const IR = I.slice(32);
    return {
        key: IL,
        chainCode: IR,
    };
}
ed25519.getED25519MasterKeyFromSeed = getED25519MasterKeyFromSeed;
async function deriveED25519HardenedKey(parent, index) {
    if (index >= HARDENED_OFFSET$1) {
        throw Error('Key index must be less than offset');
    }
    const indexBuffer = Buffer.alloc(4);
    indexBuffer.writeUInt32BE(index + HARDENED_OFFSET$1, 0);
    const data2 = Buffer.concat([Buffer.alloc(1, 0), parent.key, indexBuffer]);
    const I = await (0, hmac_sha512_1$2.hmac_sha512)(parent.chainCode, data2);
    const IL = I.slice(0, 32);
    const IR = I.slice(32);
    return {
        key: IL,
        chainCode: IR,
    };
}
ed25519.deriveED25519HardenedKey = deriveED25519HardenedKey;
async function deriveEd25519Path(seed, path) {
    let state = await getED25519MasterKeyFromSeed(seed);
    let remaining = [...path];
    while (remaining.length > 0) {
        const index = remaining[0];
        remaining = remaining.slice(1);
        state = await deriveED25519HardenedKey(state, index);
    }
    return state.key;
}
ed25519.deriveEd25519Path = deriveEd25519Path;
const symmetric = {};
Object.defineProperty(symmetric, '__esModule', { value: true });
symmetric.deriveSymmetricPath = symmetric.deriveSymmetricHardenedKey = symmetric.getSymmetricMasterKeyFromSeed = void 0;
const hmac_sha512_1$1 = hmac_sha512$1;
const SYMMETRIC_SEED = 'Symmetric key seed';
async function getSymmetricMasterKeyFromSeed(seed) {
    const I = await (0, hmac_sha512_1$1.hmac_sha512)(SYMMETRIC_SEED, seed);
    const IL = I.slice(32);
    const IR = I.slice(0, 32);
    return {
        key: IL,
        chainCode: IR,
    };
}
symmetric.getSymmetricMasterKeyFromSeed = getSymmetricMasterKeyFromSeed;
async function deriveSymmetricHardenedKey(parent, offset) {
    const data2 = Buffer.concat([Buffer.alloc(1, 0), Buffer.from(offset)]);
    const I = await (0, hmac_sha512_1$1.hmac_sha512)(parent.chainCode, data2);
    const IL = I.slice(32);
    const IR = I.slice(0, 32);
    return {
        key: IL,
        chainCode: IR,
    };
}
symmetric.deriveSymmetricHardenedKey = deriveSymmetricHardenedKey;
async function deriveSymmetricPath(seed, path) {
    let state = await getSymmetricMasterKeyFromSeed(seed);
    let remaining = [...path];
    while (remaining.length > 0) {
        const index = remaining[0];
        remaining = remaining.slice(1);
        state = await deriveSymmetricHardenedKey(state, index);
    }
    return state.key;
}
symmetric.deriveSymmetricPath = deriveSymmetricPath;
const mnemonics = {};
Object.defineProperty(mnemonics, '__esModule', { value: true });
mnemonics.deriveMnemonicsPath = mnemonics.deriveMnemonicHardenedKey = mnemonics.getMnemonicsMasterKeyFromSeed = void 0;
const mnemonic_1 = mnemonic;
const hmac_sha512_1 = hmac_sha512$1;
const HARDENED_OFFSET = 2147483648;
const MNEMONICS_SEED = 'TON Mnemonics HD seed';
async function getMnemonicsMasterKeyFromSeed(seed) {
    const I = await (0, hmac_sha512_1.hmac_sha512)(MNEMONICS_SEED, seed);
    const IL = I.slice(0, 32);
    const IR = I.slice(32);
    return {
        key: IL,
        chainCode: IR,
    };
}
mnemonics.getMnemonicsMasterKeyFromSeed = getMnemonicsMasterKeyFromSeed;
async function deriveMnemonicHardenedKey(parent, index) {
    if (index >= HARDENED_OFFSET) {
        throw Error('Key index must be less than offset');
    }
    const indexBuffer = Buffer.alloc(4);
    indexBuffer.writeUInt32BE(index + HARDENED_OFFSET, 0);
    const data2 = Buffer.concat([Buffer.alloc(1, 0), parent.key, indexBuffer]);
    const I = await (0, hmac_sha512_1.hmac_sha512)(parent.chainCode, data2);
    const IL = I.slice(0, 32);
    const IR = I.slice(32);
    return {
        key: IL,
        chainCode: IR,
    };
}
mnemonics.deriveMnemonicHardenedKey = deriveMnemonicHardenedKey;
async function deriveMnemonicsPath(seed, path, wordsCount = 24, password) {
    let state = await getMnemonicsMasterKeyFromSeed(seed);
    let remaining = [...path];
    while (remaining.length > 0) {
        const index = remaining[0];
        remaining = remaining.slice(1);
        state = await deriveMnemonicHardenedKey(state, index);
    }
    return await (0, mnemonic_1.mnemonicFromRandomSeed)(state.key, wordsCount, password);
}
mnemonics.deriveMnemonicsPath = deriveMnemonicsPath;
(function (exports) {
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.getMnemonicsMasterKeyFromSeed = exports.deriveMnemonicHardenedKey = exports.deriveMnemonicsPath = exports.deriveSymmetricPath = exports.deriveSymmetricHardenedKey = exports.getSymmetricMasterKeyFromSeed = exports.deriveEd25519Path = exports.deriveED25519HardenedKey = exports.getED25519MasterKeyFromSeed = exports.signVerify = exports.sign = exports.keyPairFromSecretKey = exports.keyPairFromSeed = exports.openBox = exports.sealBox = exports.mnemonicWordList = exports.mnemonicToHDSeed = exports.mnemonicToSeed = exports.mnemonicToWalletKey = exports.mnemonicToPrivateKey = exports.mnemonicValidate = exports.mnemonicNew = exports.newSecurePassphrase = exports.newSecureWords = exports.getSecureRandomNumber = exports.getSecureRandomWords = exports.getSecureRandomBytes = exports.hmac_sha512 = exports.pbkdf2_sha512 = exports.sha512_sync = exports.sha512 = exports.sha256_sync = exports.sha256 = void 0;
    const sha256_12 = sha256$3;
    Object.defineProperty(exports, 'sha256', { enumerable: true,
        get() {
            return sha256_12.sha256;
        } });
    Object.defineProperty(exports, 'sha256_sync', { enumerable: true,
        get() {
            return sha256_12.sha256_sync;
        } });
    const sha512_12 = sha512$1;
    Object.defineProperty(exports, 'sha512', { enumerable: true,
        get() {
            return sha512_12.sha512;
        } });
    Object.defineProperty(exports, 'sha512_sync', { enumerable: true,
        get() {
            return sha512_12.sha512_sync;
        } });
    const pbkdf2_sha512_12 = pbkdf2_sha512$1;
    Object.defineProperty(exports, 'pbkdf2_sha512', { enumerable: true,
        get() {
            return pbkdf2_sha512_12.pbkdf2_sha512;
        } });
    const hmac_sha512_12 = hmac_sha512$1;
    Object.defineProperty(exports, 'hmac_sha512', { enumerable: true,
        get() {
            return hmac_sha512_12.hmac_sha512;
        } });
    const getSecureRandom_12 = getSecureRandom;
    Object.defineProperty(exports, 'getSecureRandomBytes', { enumerable: true,
        get() {
            return getSecureRandom_12.getSecureRandomBytes;
        } });
    Object.defineProperty(exports, 'getSecureRandomWords', { enumerable: true,
        get() {
            return getSecureRandom_12.getSecureRandomWords;
        } });
    Object.defineProperty(exports, 'getSecureRandomNumber', { enumerable: true,
        get() {
            return getSecureRandom_12.getSecureRandomNumber;
        } });
    const newSecureWords_1 = newSecureWords$1;
    Object.defineProperty(exports, 'newSecureWords', { enumerable: true,
        get() {
            return newSecureWords_1.newSecureWords;
        } });
    const newSecurePassphrase_1 = newSecurePassphrase$1;
    Object.defineProperty(exports, 'newSecurePassphrase', { enumerable: true,
        get() {
            return newSecurePassphrase_1.newSecurePassphrase;
        } });
    const mnemonic_12 = mnemonic;
    Object.defineProperty(exports, 'mnemonicNew', { enumerable: true,
        get() {
            return mnemonic_12.mnemonicNew;
        } });
    Object.defineProperty(exports, 'mnemonicValidate', { enumerable: true,
        get() {
            return mnemonic_12.mnemonicValidate;
        } });
    Object.defineProperty(exports, 'mnemonicToPrivateKey', { enumerable: true,
        get() {
            return mnemonic_12.mnemonicToPrivateKey;
        } });
    Object.defineProperty(exports, 'mnemonicToWalletKey', { enumerable: true,
        get() {
            return mnemonic_12.mnemonicToWalletKey;
        } });
    Object.defineProperty(exports, 'mnemonicToSeed', { enumerable: true,
        get() {
            return mnemonic_12.mnemonicToSeed;
        } });
    Object.defineProperty(exports, 'mnemonicToHDSeed', { enumerable: true,
        get() {
            return mnemonic_12.mnemonicToHDSeed;
        } });
    const wordlist_12 = wordlist;
    Object.defineProperty(exports, 'mnemonicWordList', { enumerable: true,
        get() {
            return wordlist_12.wordlist;
        } });
    const nacl_1 = nacl;
    Object.defineProperty(exports, 'sealBox', { enumerable: true,
        get() {
            return nacl_1.sealBox;
        } });
    Object.defineProperty(exports, 'openBox', { enumerable: true,
        get() {
            return nacl_1.openBox;
        } });
    const nacl_2 = nacl;
    Object.defineProperty(exports, 'keyPairFromSeed', { enumerable: true,
        get() {
            return nacl_2.keyPairFromSeed;
        } });
    Object.defineProperty(exports, 'keyPairFromSecretKey', { enumerable: true,
        get() {
            return nacl_2.keyPairFromSecretKey;
        } });
    Object.defineProperty(exports, 'sign', { enumerable: true,
        get() {
            return nacl_2.sign;
        } });
    Object.defineProperty(exports, 'signVerify', { enumerable: true,
        get() {
            return nacl_2.signVerify;
        } });
    const ed25519_1 = ed25519;
    Object.defineProperty(exports, 'getED25519MasterKeyFromSeed', { enumerable: true,
        get() {
            return ed25519_1.getED25519MasterKeyFromSeed;
        } });
    Object.defineProperty(exports, 'deriveED25519HardenedKey', { enumerable: true,
        get() {
            return ed25519_1.deriveED25519HardenedKey;
        } });
    Object.defineProperty(exports, 'deriveEd25519Path', { enumerable: true,
        get() {
            return ed25519_1.deriveEd25519Path;
        } });
    const symmetric_1 = symmetric;
    Object.defineProperty(exports, 'getSymmetricMasterKeyFromSeed', { enumerable: true,
        get() {
            return symmetric_1.getSymmetricMasterKeyFromSeed;
        } });
    Object.defineProperty(exports, 'deriveSymmetricHardenedKey', { enumerable: true,
        get() {
            return symmetric_1.deriveSymmetricHardenedKey;
        } });
    Object.defineProperty(exports, 'deriveSymmetricPath', { enumerable: true,
        get() {
            return symmetric_1.deriveSymmetricPath;
        } });
    const mnemonics_1 = mnemonics;
    Object.defineProperty(exports, 'deriveMnemonicsPath', { enumerable: true,
        get() {
            return mnemonics_1.deriveMnemonicsPath;
        } });
    Object.defineProperty(exports, 'deriveMnemonicHardenedKey', { enumerable: true,
        get() {
            return mnemonics_1.deriveMnemonicHardenedKey;
        } });
    Object.defineProperty(exports, 'getMnemonicsMasterKeyFromSeed', { enumerable: true,
        get() {
            return mnemonics_1.getMnemonicsMasterKeyFromSeed;
        } });
}(dist));
const storage = self.chrome && chrome.storage ? {
    setItem(key, value) {
        return chrome.storage.local.set({ [key]: value });
    },
    getItem(key) {
        return chrome.storage.local.get(key).then(({ [key]: value }) => value);
    },
    removeItem(key) {
        return chrome.storage.local.remove(key);
    },
    clear() {
        return chrome.storage.local.clear();
    },
} : self.localStorage;
async function getWallet(walletType) {
    const publicKey = await getPubKey();
    return dist$2.Wallet.openByPubKey({
        publicKey,
        version: walletTypeNorm(walletType ?? await getWalletType()),
    });
}
function walletTypeNorm(walletType) {
    switch (walletType) {
        case 'v3R2':
            return 'org.ton.wallets.v3.r2';
        case 'v4R2':
            return 'org.ton.wallets.v4.r2';
        default:
            throw Error(`Unknown wallet type: ${walletType}`);
    }
}
async function setWalletType(walletType = 'v3R2') {
    await storage.setItem('wallet_type', walletType);
    return walletType;
}
async function getWalletType() {
    const walletType = await storage.getItem('wallet_type');
    if (walletType) {
        switch (walletType) {
            case 'v3r2':
                return setWalletType('v3R2');
            case 'v4r2':
                return setWalletType('v4R2');
            default:
                return walletType;
        }
    }
    return setWalletType();
}
async function getBalance(address2) {
    if (!address2) return new dist$3.Coins(0);
    const balance = await tonClient.getBalance(new dist$3.Address(address2));
    return balance || new dist$3.Coins(0);
}
async function getPubKey() {
    const pubKey = await storage.getItem('public_key');
    return hexToBytes_1(pubKey || '0');
}
async function getAddress(walletType = 'v3R2') {
    const wallet = await getWallet(walletType);
    return wallet.address.toString('base64', {
        bounceable: true,
        testOnly: false,
    });
}
class Controller {
    constructor() {
        __publicField(this, '_extensionWindowId');
        __publicField(this, '_activeTask');
        __publicField(this, '_publicKey');
        __publicField(this, '_address');
        __publicField(this, '_walletVersion');
        this._extensionWindowId = -1;
        this._activeTask = null;
        this._publicKey = '';
        this._address = '';
        this._walletVersion = '';
    }

    get extensionWindowId() {
        return this._extensionWindowId;
    }

    set extensionWindowId(x) {
        this._extensionWindowId = x;
    }

    get activeTask() {
        return this._activeTask;
    }

    set activeTask(x) {
        if (x) {
            this._activeTask = {
                ...x,
                resolve: async (r) => {
                    x.resolve(r);
                    this.activeTask = null;
                    await storage.removeItem('activeTask');
                    await this.closeExtensionWindow();
                },
                reject: async () => {
                    x.resolve(false);
                    this.activeTask = null;
                    await storage.removeItem('activeTask');
                    await this.closeExtensionWindow();
                },
            };
        } else {
            this._activeTask = x;
        }
    }

    get publicKey() {
        return this._publicKey;
    }

    set publicKey(x) {
        this._publicKey = x;
    }

    get address() {
        return this._address;
    }

    set address(x) {
        this._address = x;
    }

    get walletVersion() {
        return this._walletVersion;
    }

    set walletVersion(x) {
        this._walletVersion = x;
    }

    async initDapp() {
        this.publicKey = await storage.getItem('public_key');
        if (this.publicKey) {
            this.walletVersion = await getWalletType();
            this.address = await getAddress(this.walletVersion);
            this.sendToDapp('ton_accounts', [this.address]);
        }
    }

    sendToDapp(method, params) {
        contentScriptPorts.forEach((port) => {
            port.postMessage(JSON.stringify({
                type: 'TONHoldAPI',
                message: {
                    jsonrpc: '2.0',
                    method,
                    params,
                },
            }));
        });
    }

    showExtensionWindow() {
        return new Promise(async (resolve) => {
            await this.closeExtensionWindow();
            const windowState = {
                height: 800,
                width: 480,
            };
            chrome.windows.create(Object.assign(windowState, {
                url: 'index.html',
                type: 'popup',
                focused: true,
            }), (window2) => {
                this.extensionWindowId = window2?.id || -1;
                return resolve(this.extensionWindowId);
            });
        });
    }

    closeExtensionWindow() {
        return new Promise(async (resolve) => {
            if (this.extensionWindowId > -1) {
                try {
                    await chrome.windows.remove(this.extensionWindowId);
                } catch {
                }
            }
            return resolve(true);
        });
    }

    async createTask(id, method, params) {
        return new Promise(async (resolve, reject) => {
            await this._activeTask?.reject();
            this.activeTask = {
                id,
                resolve,
                reject,
            };
            const windowId = await this.showExtensionWindow();
            await storage.setItem('activeTask', JSON.stringify({
                id,
                windowId,
                method,
                params,
            }));
        });
    }

    async resolveTask(id, v) {
        if (this._activeTask && this._activeTask.id === id) {
            this._activeTask.resolve(v);
        }
    }

    async rejectTask(id) {
        if (this._activeTask && this._activeTask.id === id) {
            this._activeTask.reject();
        }
    }

    async resolver(result) {
        const id = result[0];
        const resolve = result[1];
        const v = result[2];
        if (resolve) {
            await this.resolveTask(id, v);
        } else {
            await this.rejectTask(id);
        }
    }

    async onDappMessage(id, method, params) {
        await this.initDapp();
        switch (method) {
            case 'ton_requestAccounts':
                if (!this.publicKey) return [];
                return [await getAddress(await getWalletType())];
            case 'ton_requestWallets':
                if (!this.publicKey) return [];
                return [{
                    address: this.address,
                    publicKey: this.publicKey,
                    walletVersion: this.walletVersion,
                }];
            case 'ton_getBalance':
                if (!this.publicKey) return 0;
                return (await getBalance(await getAddress(await getWalletType()))).toString();
            case 'ton_sendTransaction':
                if (!this.publicKey) return false;
                const trans = params[0];
                return this.createTask(id, method, trans);
            case 'ton_rawSign':
                if (!this.publicKey) return false;
                const signParam = params[0];
                return this.createTask(id, method, signParam.data);
        }
    }
}
const IS_EXTENSION = !!(self.chrome && chrome.runtime && chrome.runtime.onConnect);
const controller = new Controller();
const contentScriptPorts = /* @__PURE__ */ new Set();
if (IS_EXTENSION) {
    chrome.runtime.onConnect.addListener((port) => {
        if (port.name === 'TONHoldContentScript') {
            contentScriptPorts.add(port);
            port.onMessage.addListener(async (msg, port2) => {
                if (msg.type === 'TONHoldAPI_ton_provider_connect') {
                    await controller.initDapp();
                } else if (msg.type === 'TONHoldAPI_ton_provider_write') {
                    if (!msg.message) return;
                    const result = await controller.onDappMessage(msg.message.id, msg.message.method, msg.message.params);
                    if (port2) {
                        port2.postMessage(JSON.stringify({
                            type: 'TONHoldAPI',
                            message: {
                                jsonrpc: '2.0',
                                id: msg.message.id,
                                method: msg.message.method,
                                result,
                            },
                        }));
                    }
                }
            });
            port.onDisconnect.addListener((port2) => {
                contentScriptPorts.delete(port2);
            });
        } else if (port.name === 'TONHoldPopup') {
            port.onMessage.addListener(async (msg) => {
                if (msg.type === 'TONHoldAPI_ton_wallet_response') {
                    if (!msg.message) return;
                    await controller.resolver(msg.message.result);
                } else if (msg.type === 'TONHoldAPI_ton_wallet_update') {
                    await controller.initDapp();
                }
            });
        }
    });
    chrome.windows.onRemoved.addListener((removedWindowId) => {
        if (removedWindowId !== controller.extensionWindowId) return;
        controller.extensionWindowId = -1;
    });
}

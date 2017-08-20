/**
 *  Name : aggregator.js
 *  Explain : 
 * 
 */
var Locales = require('./locales'),
    Lib = require('./lib');


var Aggregator = module.exports = {
    makeLocaleAggregator: makeLocaleAggregator,
    count: count,
    uniques: uniques,
    sum: sum,
    extremes: extremes,
    quantile: quantile,
    runningStat: runningStat,
    sumOverSum: sumOverSum,
    sumOverSumBound80: sumOverSumBound80,
    fractionOf: fractionOf,
    countUnique: countUnique,
    listUnique: listUnique,
    max: max,
    min: min,
    first: first,
    last: last,
    median: median,
    average: average,
    var: varStat,
    stdev: stdev
};


var usFmt = Lib.numberFormat(),
    usFmtInt = Lib.numberFormat({
        digitsAfterDecimal: 0
    }),
    usFmtPct = Lib.numberFormat({
        digitsAfterDecimal: 1,
        scaler: 100,
        suffix: "%"
    });

var BaseAggregator = {
    count: Aggregator.count(usFmtInt),
    countUniqueValues: Aggregator.countUnique(usFmtInt),
    listUniqueValues: Aggregator.listUnique(", "),
    sum: Aggregator.sum(usFmt),
    integerSum: Aggregator.sum(usFmtInt),
    average: Aggregator.average(usFmt),
    median: Aggregator.median(usFmt),
    sampleVariance: Aggregator["var"](1, usFmt),
    sampleStandardDeviation: Aggregator.stdev(1, usFmt),
    minimum: Aggregator.min(usFmt),
    maximum: Aggregator.max(usFmt),
    first: Aggregator.first(usFmt),
    last: Aggregator.last(usFmt),
    sumOverSum: Aggregator.sumOverSum(usFmt),
    etyPerUpperBound: Aggregator.sumOverSumBound80(true, usFmt),
    etyPerLowerBound: Aggregator.sumOverSumBound80(false, usFmt),
    sumFractionTotal: Aggregator.fractionOf(Aggregator.sum(), "total", usFmtPct),
    sumFractionRows: Aggregator.fractionOf(Aggregator.sum(), "row", usFmtPct),
    sumFractionColumns: Aggregator.fractionOf(Aggregator.sum(), "col", usFmtPct),
    countFractionTotal: Aggregator.fractionOf(Aggregator.count(), "total", usFmtPct),
    countFractionRows: Aggregator.fractionOf(Aggregator.count(), "row", usFmtPct),
    countFractionColumns: Aggregator.fractionOf(Aggregator.count(), "col", usFmtPct)
};

/**
 * makeLocaleAggregator
 * locale에 따라 이름을 적용한 오브젝트를 반환
 * 
 * @param {*} locale 
 */
function makeLocaleAggregator(locale){
    var localeTextEn = Locales.en.aggregators,
        localeTextUser = Locales[locale].aggregators,
        localeAggregator = {};

    for(var key in BaseAggregator){
        localeAggregator[key] = {
            fn: BaseAggregator[key],
            name: localeTextUser[key] || localeTextEn[key]
        }
    }

    return localeAggregator;
}

/**
 * count
 * 
 * @param {*} formatter 
 */
function count(formatter) {
    if (formatter == null) {
        formatter = usFmtInt;
    }
    return function() {
        return function(data, rowKey, colKey) {
            return {
                count: 0,
                push: function() {
                    return this.count++;
                },
                value: function() {
                    return this.count;
                },
                format: formatter
            };
        };
    }
};

/**
 * uniques
 * 
 * @param {*} fn 
 * @param {*} formatter 
 */
function uniques(fn, formatter) {
    if (formatter == null) {
        formatter = usFmtInt;
    }
    return function(arg) {
        var attr;
        attr = arg[0];
        return function(data, rowKey, colKey) {
            return {
                uniq: [],
                push: function(record) {
                    var ref;
                    if (ref = record[attr], Lib.indexOf.call(this.uniq, ref) < 0) {
                        return this.uniq.push(record[attr]);
                    }
                },
                value: function() {
                    return fn(this.uniq);
                },
                format: formatter,
                numInputs: attr != null ? 0 : 1
            };
        };
    };
};

/**
 * sum
 * 
 * @param {*} formatter 
 */
function sum(formatter) {
    if (formatter == null) {
        formatter = usFmt;
    }
    return function(arg) {
        var attr;
        attr = arg[0];
        return function(data, rowKey, colKey) {
            return {
                sum: 0,
                push: function(record) {
                    if (!isNaN(parseFloat(record[attr]))) {
                        return this.sum += parseFloat(record[attr]);
                    }
                },
                value: function() {
                    return this.sum;
                },
                format: formatter,
                numInputs: attr != null ? 0 : 1
            };
        };
    };
}

/**
 * extremes
 * 
 * @param {*} mode 
 * @param {*} formatter 
 */
function extremes(mode, formatter) {
    if (formatter == null) {
        formatter = usFmt;
    }
    return function(arg) {
        var attr;
        attr = arg[0];
        return function(data, rowKey, colKey) {
            return {
                val: null,
                sorter: Lib.getSort(data != null ? data.sorters : void 0, attr),
                push: function(record) {
                    var ref, ref1, ref2, x;
                    x = record[attr];
                    if (mode === "min" || mode === "max") {
                        x = parseFloat(x);
                        if (!isNaN(x)) {
                        this.val = Math[mode](x, (ref = this.val) != null ? ref : x);
                        }
                    }
                    if (mode === "first") {
                        if (this.sorter(x, (ref1 = this.val) != null ? ref1 : x) <= 0) {
                        this.val = x;
                        }
                    }
                    if (mode === "last") {
                        if (this.sorter(x, (ref2 = this.val) != null ? ref2 : x) >= 0) {
                        return this.val = x;
                        }
                    }
                },
                value: function() {
                    return this.val;
                },
                format: function(x) {
                    if (isNaN(x)) {
                        return x;
                    } else {
                        return formatter(x);
                    }
                },
                numInputs: attr != null ? 0 : 1
            };
        };
    };
};

/**
 * quantile
 * 
 * @param {*} q 
 * @param {*} formatter 
 */
function quantile(q, formatter) {
    if (formatter == null) {
        formatter = usFmt;
    }
    return function(arg) {
        var attr;
        attr = arg[0];
        return function(data, rowKey, colKey) {
            return {
                vals: [],
                push: function(record) {
                    var x;
                    x = parseFloat(record[attr]);
                    if (!isNaN(x)) {
                        return this.vals.push(x);
                    }
                },
                value: function() {
                    var i;
                    if (this.vals.length === 0) {
                        return null;
                    }
                    this.vals.sort(function(a, b) {
                        return a - b;
                    });
                    i = (this.vals.length - 1) * q;
                    return (this.vals[Math.floor(i)] + this.vals[Math.ceil(i)]) / 2.0;
                },
                format: formatter,
                numInputs: attr != null ? 0 : 1
            };
        };
    };
}

/**
 * runningStat
 * 
 * @param {*} mode 
 * @param {*} ddof 
 * @param {*} formatter 
 */
function runningStat(mode, ddof, formatter) {
    if (mode == null) {
        mode = "mean";
    }
    if (ddof == null) {
        ddof = 1;
    }
    if (formatter == null) {
        formatter = usFmt;
    }
    return function(arg) {
        var attr;
        attr = arg[0];
        return function(data, rowKey, colKey) {
            return {
                n: 0.0,
                m: 0.0,
                s: 0.0,
                push: function(record) {
                    var m_new, x;
                    x = parseFloat(record[attr]);
                    if (isNaN(x)) {
                        return;
                    }
                    this.n += 1.0;
                    if (this.n === 1.0) {
                        return this.m = x;
                    } else {
                        m_new = this.m + (x - this.m) / this.n;
                        this.s = this.s + (x - this.m) * (x - m_new);
                        return this.m = m_new;
                    }
                },
                value: function() {
                if (mode === "mean") {
                    if (this.n === 0) {
                        return 0 / 0;
                    } else {
                        return this.m;
                    }
                }
                if (this.n <= ddof) {
                    return 0;
                }
                switch (mode) {
                    case "var":
                        return this.s / (this.n - ddof);
                    case "stdev":
                        return Math.sqrt(this.s / (this.n - ddof));
                }
                },
                format: formatter,
                numInputs: attr != null ? 0 : 1
            };
        };
    };
}

/**
 * sumOverSum
 * 
 * @param {*} formatter 
 */
function sumOverSum(formatter) {
    if (formatter == null) {
        formatter = usFmt;
    }
    return function(arg) {
        var denom, num;
        num = arg[0], denom = arg[1];
        return function(data, rowKey, colKey) {
            return {
                sumNum: 0,
                sumDenom: 0,
                push: function(record) {
                if (!isNaN(parseFloat(record[num]))) {
                    this.sumNum += parseFloat(record[num]);
                }
                if (!isNaN(parseFloat(record[denom]))) {
                    return this.sumDenom += parseFloat(record[denom]);
                }
                },
                value: function() {
                    return this.sumNum / this.sumDenom;
                },
                format: formatter,
                numInputs: (num != null) && (denom != null) ? 0 : 2
            };
        };
    };
};

/**
 * sumOverSumBound80
 * 
 * @param {*} upper 
 * @param {*} formatter 
 */
function sumOverSumBound80(upper, formatter) {
    if (upper == null) {
        upper = true;
    }
    if (formatter == null) {
        formatter = usFmt;
    }
    return function(arg) {
        var denom, num;
        num = arg[0], denom = arg[1];
        return function(data, rowKey, colKey) {
            return {
                sumNum: 0,
                sumDenom: 0,
                push: function(record) {
                if (!isNaN(parseFloat(record[num]))) {
                    this.sumNum += parseFloat(record[num]);
                }
                if (!isNaN(parseFloat(record[denom]))) {
                    return this.sumDenom += parseFloat(record[denom]);
                }
                },
                value: function() {
                var sign;
                sign = upper ? 1 : -1;
                return (0.821187207574908 / this.sumDenom + this.sumNum / this.sumDenom + 1.2815515655446004 * sign * Math.sqrt(0.410593603787454 / (this.sumDenom * this.sumDenom) + (this.sumNum * (1 - this.sumNum / this.sumDenom)) / (this.sumDenom * this.sumDenom))) / (1 + 1.642374415149816 / this.sumDenom);
                },
                format: formatter,
                numInputs: (num != null) && (denom != null) ? 0 : 2
            };
        };
    };
}

/**
 * fractionOf
 * 
 * @param {*} wrapped 
 * @param {*} type 
 * @param {*} formatter 
 */
function fractionOf(wrapped, type, formatter) {
    if (type == null) {
        type = "total";
    }
    if (formatter == null) {
        formatter = usFmtPct;
    }
    return function() {
        var x;
        x = 1 <= arguments.length ? Lib.slice.call(arguments, 0) : [];
        return function(data, rowKey, colKey) {
            return {
                selector: {
                    total: [[], []],
                    row: [rowKey, []],
                    col: [[], colKey]
                }[type],
                inner: wrapped.apply(null, x)(data, rowKey, colKey),
                push: function(record) {
                    return this.inner.push(record);
                },
                format: formatter,
                value: function() {
                    return this.inner.value() / data.getAggregator.apply(data, this.selector).inner.value();
                },
                numInputs: wrapped.apply(null, x)().numInputs
            };
        };
    };
}

/**
 * countUnique
 * 
 * @param {*} f 
 */
function countUnique(f) {
    return Aggregator.uniques((function(x) {
        return x.length;
    }), f);
};

/**
 * listUnique
 * 
 * @param {*} s 
 */
function listUnique(s) {
    return Aggregator.uniques((function(x) {
        return x.join(s);
    }), (function(x) {
        return x;
    }));
};

/**
 * max
 * 
 * @param {*} f 
 */
function max(f) {
    return Aggregator.extremes('max', f);
};

/**
 * min
 * 
 * @param {*} f 
 */
function min(f) {
    return Aggregator.extremes('min', f);
};

/**
 * first
 * 
 * @param {*} f 
 */
function first(f) {
    return Aggregator.extremes('first', f);
};

/**
 * last
 * 
 * @param {*} f 
 */
function last(f) {
    return Aggregator.extremes('last', f);
};

/**
 * median
 * 
 * @param {*} f 
 */
function median(f) {
    return Aggregator.quantile(0.5, f);
};

/**
 * average
 * 
 * @param {*} f 
 */
function average(f) {
    return Aggregator.runningStat("mean", 1, f);
};

/**
 * varStat
 * 
 * @param {*} ddof 
 * @param {*} f 
 */
function varStat(ddof, f) {
    return Aggregator.runningStat("var", ddof, f);
};

/**
 * stdev
 * 
 * @param {*} ddof 
 * @param {*} f 
 */
function stdev(ddof, f) {
    return Aggregator.runningStat("stdev", ddof, f);
};
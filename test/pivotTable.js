window["Pivot"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 *  Name : lib.js
 *  Explain : 
 * 
 */

var Lib = module.exports = {};

//--------------- 필요한 함수들 prototpye에 작성 Start---------------

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

if(!Element.prototype.setText){    
    Element.prototype.setText = function(string){ 
        if(typeof string === 'string'){
            if(this.textContent !== undefined){
                this.textContent = string;
            } else {
                this.innerText = string;
            }
            return this;
        }
    }
}

if(!Element.prototype.getText){    
    Element.prototype.getText = function(){ 
        return this.text || this.textContent || this.innerText;
    }
}

var ClassCheck = function(className){
    return new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi');
}

if (!Element.prototype.addClass) {
    Element.prototype.addClass = function(className){
        if(typeof name === 'string'){
            if(this.className){
                if(!(ClassCheck(className).test(this.className))){
                    this.className += ' ' + className;
                }
            }else{
                this.className = className;
            }
        }
        
        return this;
    }
}

if (!Element.prototype.removeClass) {
    Element.prototype.removeClass = function(className){
        if(typeof name === 'string'){
            if (this.classList)
                this.classList.remove(className);
            else
                this.className = this.className.replace(
                    ClassCheck(className),
                    ' '
                );
        }
        
        return this;
    }
}

if(!Element.prototype.toggleClass){
    Element.prototype.toggleClass = function(className){ 
        if (this.classList) {
                this.classList.toggle(className);
        } else {
            var classes = this.className.split(' ');
            var existingIndex = -1;
            for (var i = classes.length; i--;) {
                if (classes[i] === className)
                    existingIndex = i;
            }

            if (existingIndex >= 0)
                classes.splice(existingIndex, 1);
            else
                classes.push(className);

            this.className = classes.join(' ');
        }

        return this;
    }
}


if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position){
      position = position || 0;
      return this.substr(position, searchString.length) === searchString;
  };
}

if (!Math.sign) {
  Math.sign = function(x) {
    // If x is NaN, the result is NaN.
    // If x is -0, the result is -0.
    // If x is +0, the result is +0.
    // If x is negative and not -0, the result is -1.
    // If x is positive and not +0, the result is +1.
    return ((x > 0) - (x < 0)) || +x;
    // A more aesthetical persuado-representation is shown below
    //
    // ( (x > 0) ? 0 : 1 )  // if x is negative then negative one
    //          +           // else (because you cant be both - and +)
    // ( (x < 0) ? 0 : -1 ) // if x is positive then positive one
    //         ||           // if x is 0, -0, or NaN, or not a number,
    //         +x           // Then the result will be x, (or) if x is
    //                      // not a number, then x converts to number
  };
}

//--------------- 필요한 함수들 prototpye에 작성 End ---------------


Lib.hasProp = {}.hasOwnProperty;
Lib.slice = [].slice,
Lib.indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Lib.filterInt = function (value) {
  if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
    return Number(value);
  return NaN;
}

Lib.deepExtend = function deepExtend(out){
    out = out || {};

    if(typeof out != "object"){
        out = {};
    }

    for (var i = 1; i < arguments.length; i++) {
        var obj = arguments[i];

        if (!obj) continue;

        for (var key in obj) {
            if (obj[key] != null && typeof obj[key] === 'object'){
                if(obj[key].constructor === Array){
                    if(!Array.isArray(out[key])) out[key]=[];
                    deepExtend(out[key], obj[key]);
                }else if(obj[key].constructor === Date) out[key] = new Date(obj[key].getTime());
                else out[key] = deepExtend(out[key], obj[key]);
            }else{
                out[key] = obj[key];
            }
        }
    }

    return out;
};

Lib.isEmptyObject = function(obj){
    if(obj && obj instanceof Object){
        if(Object.keys(obj).length){
            return false;
        }
    }
    
    return true;
}

Lib.isFunction = function(func){
    if(func && func instanceof Function){
        return true;
    }
    return false;
}

Lib.isArray = function(arr){
    if(arr && arr instanceof Array){
        return true;
    }
    return false;
}

/*
 * Natural Sort algorithm for Javascript - Version 0.8.1 - Released under MIT license
 * Author: Jim Palmer (based on chunking idea from Dave Koelle)
 */

Lib.naturalSort = function naturalSort (a, b) {
    var re = /(^([+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|^0x[\da-fA-F]+$|\d+)/g,
        sre = /^\s+|\s+$/g,   // trim pre-post whitespace
        snre = /\s+/g,        // normalize all whitespace to single ' ' character
        dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
        hre = /^0x[0-9a-f]+$/i,
        ore = /^0/,
        i = function(s) {
            return (naturalSort.insensitive && ('' + s).toLowerCase() || '' + s).replace(sre, '');
        },
        // convert all to strings strip whitespace
        x = i(a),
        y = i(b),
        // chunk/tokenize
        xN = x.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
        yN = y.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
        // numeric, hex or date detection
        xD = parseInt(x.match(hre), 16) || (xN.length !== 1 && Date.parse(x)),
        yD = parseInt(y.match(hre), 16) || xD && y.match(dre) && Date.parse(y) || null,
        normChunk = function(s, l) {
            // normalize spaces; find floats not starting with '0', string or 0 if not defined (Clint Priest)
            return (!s.match(ore) || l == 1) && parseFloat(s) || s.replace(snre, ' ').replace(sre, '') || 0;
        },
        oFxNcL, oFyNcL;
    // first try and sort Hex codes or Dates
    if (yD) {
        if (xD < yD) { return -1; }
        else if (xD > yD) { return 1; }
    }
    // natural sorting through split numeric strings and default strings
    for(var cLoc = 0, xNl = xN.length, yNl = yN.length, numS = Math.max(xNl, yNl); cLoc < numS; cLoc++) {
        oFxNcL = normChunk(xN[cLoc] || '', xNl);
        oFyNcL = normChunk(yN[cLoc] || '', yNl);
        // handle numeric vs string comparison - number < string - (Kyle Adams)
        if (isNaN(oFxNcL) !== isNaN(oFyNcL)) {
            return isNaN(oFxNcL) ? 1 : -1;
        }
        // if unicode use locale comparison
        if (/[^\x00-\x80]/.test(oFxNcL + oFyNcL) && oFxNcL.localeCompare) {
            var comp = oFxNcL.localeCompare(oFyNcL);
            return comp / Math.abs(comp);
        }
        if (oFxNcL < oFyNcL) { return -1; }
        else if (oFxNcL > oFyNcL) { return 1; }
    }
}

Lib.getSort = function(sorters, attr) {
    var sort;

    if (sorters != null) {
        if (Lib.isFunction(sorters)) {
            sort = sorters(attr);
            if (Lib.isFunction(sort)) {
                return sort;
            }
        } else if (sorters[attr] != null) {
            return sorters[attr];
        }
    }
    
    return Lib.naturalSort;
};

Lib.addSeparators = function(nStr, thousandsSep, decimalSep) {
    var rgx, x, x1, x2;
    
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? decimalSep + x[1] : '';
    rgx = /(\d+)(\d{3})/;
    
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + thousandsSep + '$2');
    }
    
    return x1 + x2;
};

Lib.numberFormat = function numberFormat(opts) {
    var defaults;
    
    defaults = {
        digitsAfterDecimal: 2,
        scaler: 1,
        thousandsSep: ",",
        decimalSep: ".",
        prefix: "",
        suffix: ""
    };
    
    opts = Lib.deepExtend({}, defaults, opts);
    
    return function(x) {
        var result;
        
        if (isNaN(x) || !isFinite(x)) {
            return "";
        }
        
        result = Lib.addSeparators((opts.scaler * x).toFixed(opts.digitsAfterDecimal), opts.thousandsSep, opts.decimalSep);
        
        return "" + opts.prefix + result + opts.suffix;
    };
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 *  Name : locales.js
 *  Explain : 
 * 
 */

var Locales = module.exports = {};


Locales.eng = Locales.en = {
    aggregators: {
        count: "Count",
        countUniqueValues: "Count Unique Values",
        listUniqueValues: "List Unique Values",
        sum : "Sum",
        integerSum : "Integer Sum",
        average: "Average",
        median: "Median",
        sampleVariance: "Sample Variance",
        sampleStandardDeviation: "Sample Standard Deviation",
        minimum: "Minimum",
        maximum: "Maximum",
        first: "First",
        last: "Last",
        sumOverSum: "Sum over Sum",
        etyPerUpperBound: "80% Upper Bound",
        etyPerLowerBound: "80% Lower Bound",
        sumFractionTotal: "Sum as Fraction of Total",
        sumFractionRows: "Sum as Fraction of Rows",
        sumFractionColumns: "Sum as Fraction of Columns",
        countFractionTotal: "Count as Fraction of Total",
        countFractionRows: "Count as Fraction of Rows",
        countFractionColumns: "Count as Fraction of Columns"
    },
    renderers:{
        table: "Table",
        tableBar: "Table Barchart",
        heatmap: "Heatmap",
        rowHeatmap: "Row Heatmap",
        colHeatmap: "Col Heatmap",
        barChart: "Bar Chart",
        lineChart: "Line Chart"
    },
    localeStrings: {
        renderError: "An error occurred rendering the PivotTable results.",
        computeError: "An error occurred computing the PivotTable results.",
        uiRenderError: "An error occurred rendering the PivotTable UI.",
        selectAll: "Select All",
        selectNone: "Select None",
        optionSelect: "Select Option",
        tooMany: "(too many to list)",
        filterResults: "Filter values",
        apply: "Apply",
        cancel: "Cancel",
        totals: "Totals",
        vs: "vs",
        by: "by"
    }
}

Locales.kor = Locales.kr = {
    aggregators: {
        count: "갯수",
        countUniqueValues: "중복이 아닌 값 갯수",
        listUniqueValues: "중복이 아닌 리스트",
        sum : "합계",
        integerSum : "정수 합계",
        average: "평균",
        median: "중간값",
        sampleVariance: "Sample Variance",
        sampleStandardDeviation: "Sample Standard Deviation",
        minimum: "최대",
        maximum: "최소",
        first: "첫번째 값",
        last: "마지막 값",
        sumOverSum: "다중 합계",
        etyPerUpperBound: "80% 이상",
        etyPerLowerBound: "80% 이하",
        sumFractionTotal: "전체 합에 대한 지수",
        sumFractionRows: "각 열의 합에 대한 지수",
        sumFractionColumns: "각 행의 합에 대한 지수",
        countFractionTotal: "전체 갯수에 대한 지수",
        countFractionRows: "각 열의 갯수에 대한 지수",
        countFractionColumns: "각 행의 갯수에 대한 지수"
    },
    renderers: {
        table: "표",
        tableBar: "표 막대그래프",
        heatmap: "Heatmap",
        rowHeatmap: "열 Heatmap",
        colHeatmap: "행 Heatmap",
        barChart: "막대 차트",
        lineChart: "선 차트"
    },
    localeStrings: {
        renderError: "결과에 대한 그리기에 실패 하였습니다.",
        computeError: "결과에 대한 계산에 실패 하였습니다.",
        uiRenderError: "테이블 그리기에 실패 하였습니다.",
        selectAll: "전체 선택",
        selectNone: "전체 선택 해제",
        optionSelect: "옵션 선택",
        tooMany: "(너무 목록이 많습니다.)",
        filterResults: "필터 값",
        apply: "적용",
        cancel: "취소",
        totals: "전체",
        vs: "vs",
        by: "by"
    }
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/**
 *  Name : aggregator.js
 *  Explain : 
 * 
 */
var Locales = __webpack_require__(1),
    Lib = __webpack_require__(0);


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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/**
 *  Name : renderer.index.js
 *  Explain : 
 * 
 */

var Locales = __webpack_require__(1),
    Lib = __webpack_require__(0);

var Renderer = module.exports = {
    makeLocaleRenderer : makeLocaleRenderer,
    addRenderer : addRenderer,
}

var Local = {
    renderers : {}
}

/**
 * addRenderer
 */

function addRenderer(renderer){
    if(renderer instanceof Array){
        for(var i in renderer){
            Lib.deepExtend(Local.renderers, renderer[i]);
        }
    }else{
        Lib.deepExtend(Local.renderers, renderer); 
    }
}

/**
 * makeLocaleRenderer
 * locale에 따라 이름을 적용한 오브젝트를 반환
 * 
 * @param {*} locale 
 */
function makeLocaleRenderer(locale){
    var renderers = Local.renderers,
        localeTextEn = Locales.en.renderers,
        localeTextUser = Locales[locale].renderers,
        localeRenderer = {};

    for(var key in renderers){
        localeRenderer[key] = {
            fn: renderers[key],
            name: localeTextUser[key] || localeTextEn[key] 
                  || renderers[key].locale || key 
        }
    }

    return localeRenderer;
}


(function Init(){
    addRenderer([
        __webpack_require__(8),
        __webpack_require__(9)
    ]);
})()

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/**
 *  Name : pivotData.js
 *  Explain : 
 * 
 */
var Aggregator = __webpack_require__(2),
    Lib = __webpack_require__(0),
    Renderer = __webpack_require__(3);

var PivotData = module.exports = function PivotData(input, opts) {
    var ref0, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9;

    if (opts == null) {
        opts = {};
    }
    
    this.input = input;
    this.aggregator = (ref0 = opts.aggregator) != null ? ref0 : Aggregator.count()();
    this.aggregatorName = (ref1 = opts.aggregatorName) != null ? ref1 : "Count";
    this.colAttrs = (ref2 = opts.cols) != null ? ref2 : [];
    this.rowAttrs = (ref3 = opts.rows) != null ? ref3 : [];
    this.valAttrs = (ref4 = opts.vals) != null ? ref4 : [];
    this.sorters = (ref5 = opts.sorters) != null ? ref5 : {};
    this.rowOrder = (ref6 = opts.rowOrder) != null ? ref6 : "key_a_to_z";
    this.colOrder = (ref7 = opts.colOrder) != null ? ref7 : "key_a_to_z";
    this.derivedAttributes = (ref8 = opts.derivedAttributes) != null ? ref8 : {};
    this.filter = (ref9 = opts.filter) != null ? ref9 : (function() {
        return true;
    });
    this.tree = {};
    this.rowKeys = [];
    this.colKeys = [];
    this.rowTotals = {};
    this.colTotals = {};
    this.allTotal = this.aggregator(this, [], []);
    this.sorted = false;

    PivotData.forEachRecord({
            input: this.input, 
            derivedAttributes: this.derivedAttributes
        }, 
        (function(_this) {
            return function(record) {
                if (_this.filter(record)) {
                    return _this.processRecord(record);
                }
            };
        })(this)
    );
}

PivotData.forEachRecord = function(options, callback) {
    options = options || {};

    var input = options.input, 
        name = options.name,
        derivedAttributes = options.derivedAttributes,
        addRecord, compactRecord, 
        i, j, k, l, 
        len1, record, ref, results, tblCols;

    if(!input){
        throw new Error("unknown input (Empty)");
    }

    if (Lib.isEmptyObject(derivedAttributes)) {
        addRecord = callback;
    } else {
        addRecord = function(record, name) {
            var k, ref, v;
            for (k in derivedAttributes) {
                v = derivedAttributes[k];

                if(v instanceof Function){
                    record[k] = (ref = v(record)) != null ? ref : record[k];
                }else if(k === '__delete__'){
                    for(var i in v){
                        delete record[v[i]];
                    }
                }
            }
            return callback(record, name);
        };
    }

    if (Lib.isFunction(input)) {
        return input(addRecord);
    } else if (Lib.isArray(input)) {
        results = [];

        if (Lib.isArray(input[0])) {
            for (i in input) {
                if (!Lib.hasProp.call(input, i)) continue;
                
                compactRecord = input[i];
                
                if (!(i > 0)) {
                    continue;
                }
                
                record = {};
                ref = input[0];
                
                for (j in ref) {
                    if (!Lib.hasProp.call(ref, j)) continue;
                    k = ref[j];
                    record[k] = compactRecord[j];
                }
                results.push(addRecord(record, name));
            }
        } else if(input[0].name && input[0].data){
            for (i in input) {
                results.push(
                    this.forEachRecord({
                        input: input[i].data,
                        name: input[i].name
                    },addRecord)
                );
            }
        } else{
            for (l = 0, len1 = input.length; l < len1; l++) {
                record = input[l];
                results.push(addRecord(record, name));
            }
        }

        return results;
    }else{
        throw new Error("unknown input format");
    }
};

PivotData.prototype.forEachMatchingRecord = function(criteria, callback) {
    return PivotData.forEachRecord({
            input: this.input, 
            derivedAttributes: this.derivedAttributes
        }, (function(_this) {
            return function(record) {
                var k, ref, v;
                if (!_this.filter(record)) {
                    return;
                }
                for (k in criteria) {
                    v = criteria[k];
                    if (v !== ((ref = record[k]) != null ? ref : "null")) {
                        return;
                    }
                }
                return callback(record);
            };
        })(this)
    );
};

PivotData.prototype.arrSort = function(attrs) {
    var a, sortersArr;
    sortersArr = (function() {
        var l, len1, results;
        results = [];
        for (l = 0, len1 = attrs.length; l < len1; l++) {
            a = attrs[l];
            results.push(Lib.getSort(this.sorters, a));
        }
        return results;
    }).call(this);
    return function(a, b) {
        var comparison, i, sorter;
        for (i in sortersArr) {
            if (!Lib.hasProp.call(sortersArr, i)) continue;
            sorter = sortersArr[i];
            comparison = sorter(a[i], b[i]);
            if (comparison !== 0) {
                return comparison;
            }
        }
        return 0;
    };
};

PivotData.prototype.sortKeys = function() {
    var v;
    if (!this.sorted) {
        this.sorted = true;
        v = (function(_this) {
            return function(r, c) {
                return _this.getAggregator(r, c).value();
            };
        })(this);
        
        switch (this.rowOrder) {
            case "value_a_to_z":
                this.rowKeys.sort((function(_this) {
                    return function(a, b) {
                        return Lib.naturalSort(v(a, []), v(b, []));
                    };
                })(this));
                break;
            case "value_z_to_a":
                this.rowKeys.sort((function(_this) {
                    return function(a, b) {
                        return -Lib.naturalSort(v(a, []), v(b, []));
                    };
                })(this));
                break;
            default:
                this.rowKeys.sort(this.arrSort(this.rowAttrs));
        }

        switch (this.colOrder) {
            case "value_a_to_z":
                return this.colKeys.sort((function(_this) {
                    return function(a, b) {
                        return Lib.naturalSort(v([], a), v([], b));
                    };
                })(this));
            case "value_z_to_a":
                return this.colKeys.sort((function(_this) {
                    return function(a, b) {
                        return -Lib.naturalSort(v([], a), v([], b));
                    };
                })(this));
            default:
                return this.colKeys.sort(this.arrSort(this.colAttrs));
        }
    }
};

PivotData.prototype.getColKeys = function() {
    this.sortKeys();
    return this.colKeys;
};

PivotData.prototype.getRowKeys = function() {
    this.sortKeys();
    return this.rowKeys;
};

PivotData.prototype.processRecord = function(record) {
    var colKey, flatColKey, flatRowKey, 
        l, len1, len2, n, 
        ref, ref1, ref2, ref3, 
        rowKey, x;

    colKey = [];
    rowKey = [];

    ref = this.colAttrs;

    for (l = 0, len1 = ref.length; l < len1; l++) {
        x = ref[l];
        colKey.push((ref1 = record[x]) != null ? ref1 : "null");
    }

    ref2 = this.rowAttrs;

    for (n = 0, len2 = ref2.length; n < len2; n++) {
        x = ref2[n];
        rowKey.push((ref3 = record[x]) != null ? ref3 : "null");
    }

    flatRowKey = rowKey.join(String.fromCharCode(0));
    flatColKey = colKey.join(String.fromCharCode(0));

    this.allTotal.push(record);

    if (rowKey.length !== 0) {
        if (!this.rowTotals[flatRowKey]) {
            this.rowKeys.push(rowKey);
            this.rowTotals[flatRowKey] = this.aggregator(this, rowKey, []);
        }
        this.rowTotals[flatRowKey].push(record);
    }
    if (colKey.length !== 0) {
        if (!this.colTotals[flatColKey]) {
            this.colKeys.push(colKey);
            this.colTotals[flatColKey] = this.aggregator(this, [], colKey);
        }
        this.colTotals[flatColKey].push(record);
    }
    if (colKey.length !== 0 && rowKey.length !== 0) {
        if (!this.tree[flatRowKey]) {
            this.tree[flatRowKey] = {};
        }
        if (!this.tree[flatRowKey][flatColKey]) {
            this.tree[flatRowKey][flatColKey] = this.aggregator(this, rowKey, colKey);
        }
        return this.tree[flatRowKey][flatColKey].push(record);
    }
};

PivotData.prototype.getAggregator = function(rowKey, colKey) {
    var agg, flatColKey, flatRowKey;
    
    flatRowKey = rowKey.join(String.fromCharCode(0));
    flatColKey = colKey.join(String.fromCharCode(0));
    
    if (rowKey.length === 0 && colKey.length === 0) {
        agg = this.allTotal;
    } else if (rowKey.length === 0) {
        agg = this.colTotals[flatColKey];
    } else if (colKey.length === 0) {
        agg = this.rowTotals[flatRowKey];
    } else {
        agg = this.tree[flatRowKey][flatColKey];
    }

    return agg != null ? agg : {
        value: (function() {
            return null;
        }),
        format: function() {
            return "";
        }
    };
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/**
 *  Name : index.js
 *  Explain : 
 * 
 */

var Pivot = __webpack_require__(6);

exports.pivotUI = Pivot.pivotUI;
exports.pivot = Pivot.pivot;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/**
 *  Name : core.js
 *  Explain : 
 * 
 */

var Default = __webpack_require__(7),
    Lib = __webpack_require__(0),
    Locales = __webpack_require__(1),
    PivotData = __webpack_require__(4),
    Sortable = __webpack_require__(10);

var Pivot = module.exports = {};

/**
 * pivot()
 * 피봇을 작성합니다.
 *
 * @type {Function}
 * 
 * @param {Object} options {
 *      target: 타켓 엘리먼트
 *      input: 데이터,
 *      inputOpts: 데이터 옵션,
 *      locale: 언어
 * }
 * 
 * @return {Element}
 */
Pivot.pivot = function pivot(options) {
    options = options || {};
    
    var target = options.target,
        input = options.input,
        inputOpts = options.inputOpts,
        locale = options.locale,
        container;

    if(!target && !(target instanceof Element)){
        console.error('올바르지 않은 타켓입니다.');
        return;
    }else{
        if(!target.__pivotContainer__){
            container = target.__pivotContainer__ = {};
        }else{
            container = target.__pivotContainer__;
        }
    }

    if((typeof(locale) !== 'string') 
        || !Locales[locale.toLowerCase()]){
        container.locale = 'kr';
    } else {
        container.locale = locale;
    }

    inputOpts = container.inputOpts = Lib.deepExtend(
        {}, 
        Default.localeOpts(container.locale), 
        Default.inputOpts(container.locale),
        inputOpts || {}
    );

    var result = null;
    
    try {
        var pivotData = new inputOpts.dataClass(input, inputOpts);
        
        try {
            result = inputOpts.renderer({
                pivotData : pivotData, 
                rendererOpts : inputOpts.rendererOpts
            });
        } catch (_error) {
            var e = _error;
            if (typeof console !== "undefined" && console !== null) {
                console.error(e.stack);
            }

            var _span5 = document.createElement('span');
            
            result = _span5.innerHTML = inputOpts.localeStrings.renderError;
        }
    } catch (_error) {
        var e = _error;
        if (typeof console !== "undefined" && console !== null) {
            console.error(e.stack);
        }

        var _span6 = document.createElement('span');
        
        result = _span5.innerHTML = inputOpts.localeStrings.computeError;
    }

    while (target.hasChildNodes()) {
        target.removeChild(target.lastChild);
    }

    return target.appendChild(result);
};

/**
 * pivotUI()
 * 피봇을 작성합니다.
 *
 * @type {Function}
 * 
 * @param {Object} options {
 *      target: 타켓 엘리먼트
 *      input: 데이터,
 *      inputOpts: 데이터 옵션,
 *      overwrite: 덮어쓰기,
 *      locale: 언어
 * }
 * 
 * @return {Element}
 */

Pivot.pivotUI = function pivotUI(options) {
    options = options || {};

    var target = options.target,
        input = options.input,
        inputOpts = options.inputOpts,
        overwrite = options.overwrite,
        locale = options.locale,
        container;

    if(!target && !(target instanceof Element)){
        console.error('올바르지 않은 타켓입니다.');
        return;
    }else{
        if(!target.__pivotUIContainer__){
            container = target.__pivotUIContainer__ = {};
        }else{
            container = target.__pivotUIContainer__;
        }
    }

    if((typeof(locale) !== 'string') 
         || !Locales[locale.toLowerCase()]){
        container.locale = 'kr';
    } else {
        container.locale = locale;
    }

    inputOpts = container.inputOpts = Lib.deepExtend(
        {},
        Default.localeOpts(container.locale),
        Default.inputOpts(container.locale, true),
        container.inputOpts  || {},
        inputOpts || {}
    )

    container.__pivotInput__ = options;

    try {
        var materializedInput =  [/*
                {
                    name: <string> tablename,
                    data: <array> tabledata,
                    attrValues: <object> tableAttrValues
                }
            */],
            materializedCheckName = [],
            recordsProcessed = 0,
            refreshFunc = {};

        PivotData.forEachRecord({
                input: input, 
                name: inputOpts.name,
                derivedAttributes: inputOpts.derivedAttributes
            },
            function(record, name) {
                var base, _ref0, value, targetInput;
                
                if (!inputOpts.filter(record)) {
                    return;
                }

                var inputIdx = materializedCheckName.indexOf(name);
                
                if(inputIdx === -1){
                    inputIdx = materializedCheckName.push(name) - 1;
                    materializedInput[inputIdx] = {
                        name: name,
                        data: [],
                        attrValues: {}
                    }
                }
                
                (targetInput = materializedInput[inputIdx]).data.push(record);
                
                for(var attr in record) {
                    if (!Lib.hasProp.call(record, attr)) continue;
                    if (targetInput.attrValues[attr] == null) {
                        targetInput.attrValues[attr] = {};
                        if (recordsProcessed > 0) {
                            targetInput.attrValues[attr]["null"] = recordsProcessed;
                        }
                    }
                }
                for(var attr in targetInput.attrValues) {
                    value = (_ref0 = record[attr]) != null ? _ref0 : "null";
                    if ((base = targetInput.attrValues[attr])[value] == null) {
                        base[value] = 0;
                    }
                    targetInput.attrValues[attr][value]++;
                }

                return recordsProcessed++;
            }
        );

        drawUI(0, {
            target: target,
            input: materializedInput,
            inputOpts: inputOpts,
            names: materializedCheckName,
        });
    } catch (_error) {
        e = _error;
        if (typeof console !== "undefined" && console !== null) {
            console.error(e.stack);
        }
        target.innerHTML = inputOpts.localeStrings.uiRenderError;
    }
}

/**
 * drawUI
 * 
 * @param {*} options {
 *           target: target(Element),
 *           inputs: 입력값(Array),
 *           names: 이름(Array)
 *         } 
 */
var refreshFunc = {};

function drawUI(inputIdx, options){
    options = options || {};

    var target = options.target,
        inputOpts = options.inputOpts,
        input = options.input[inputIdx],
        names = options.names;

    var uiTable = target.querySelector('.pvtUi');

    if(!uiTable){
        uiTable = document.createElement('table')
                            .addClass('pvtUi');

        target.appendChild(uiTable);
    }

    var rendererControl = uiTable.querySelector('.rendererControl'),
        renderer = uiTable.querySelector('.pvtRenderer'),
        tableSelect = uiTable.querySelector('.tableSelect');
    
    if(!rendererControl){
        rendererControl = document.createElement('td')
                                .addClass('rendererControl');
        renderer = document.createElement('select')
                        .addClass('pvtRenderer');

        rendererControl.appendChild(renderer);
    }

    if(!renderer){
        renderer = document.createElement('select')
                .addClass('pvtRenderer');

        rendererControl.appendChild(renderer);
    }

    renderer.innerHTML = '';
    
    renderer.onchange = function(){
        return refreshFunc.refresh();
    };

    var _ref1 = inputOpts.renderers;

    for (var x in _ref1) {
        if (!Lib.hasProp.call(_ref1, x)) continue;
        var _renderOption = document.createElement("option")
                                    .setText(_ref1[x].name);
    
        _renderOption.value = x;

        renderer.appendChild(_renderOption);
    }

    if(names.length > 1){
        if(!tableSelect){
            tableSelect = document.createElement('select')
                .addClass('tableSelect');

            rendererControl.appendChild(tableSelect);
        }

        tableSelect.innerHTML = '';

        for(var x in names){
            var _tableOption = document.createElement("option")
                                        .setText(names[x]);

            _tableOption.value = x;
            
            tableSelect.appendChild(_tableOption);
        }

        tableSelect.value = inputIdx;

        tableSelect.onchange = function(){
            return drawUI(this.value, options);
        }
    }else{
        if(tableSelect){
            rendererControl.removeChild(tableSelect);
        }
    }

    var unused = uiTable.querySelector('.pvtAxisContainer.pvtUnused');

    if(!unused){
        unused = document.createElement('td')
                        .addClass('pvtAxisContainer pvtUnused');

    }else{
        Sortable.create(unused).destroy();
        unused.innerHTML = '';
    }

    var aggregator = uiTable.querySelector('.pvtAggregator');
    
    if(!aggregator){
        aggregator = document.createElement('select')
                            .addClass('pvtAggregator');

        var _ref4 = inputOpts.aggregators;

        for(var x in _ref4) {
            if (!Lib.hasProp.call(_ref4, x)) continue;

            var _option1 = document.createElement('option')
                                .setText(_ref4[x].name);

            _option1.value = x;

            aggregator.appendChild(_option1);
        }
    }

    aggregator.onchange = function() {
        return refreshFunc.refresh();
    };

    uiTable.innerHTML = '';
    
    var attrValues = input.attrValues,
        shownAttributes = (function() {
            var results;
            results = [];
            for (var a in attrValues) {
                if (Lib.indexOf.call(inputOpts.hiddenAttributes, a) < 0) {
                    results.push(a);
                }
            }
            return results;
        })(),
        unusedAttrsVerticalAutoOverride = false;

    if (inputOpts.unusedAttrsVertical === "auto") {
        unusedAttrsVerticalAutoCutoff = 120;
    } else {
        unusedAttrsVerticalAutoCutoff = parseInt(inputOpts.unusedAttrsVertical);
    }
    
    if (!isNaN(unusedAttrsVerticalAutoCutoff)) {
        var attrLength = 0;
        
        for(var l = 0, len1 = shownAttributes.length; l < len1; l++) {
            var a = shownAttributes[l];
            attrLength += a.length;
        }
        
        unusedAttrsVerticalAutoOverride = attrLength > unusedAttrsVerticalAutoCutoff;
    }
    
    if (inputOpts.unusedAttrsVertical === true || unusedAttrsVerticalAutoOverride) {
        unused.addClass('pvtVertList');
        unused.removeClass('pvtHorizList');
    } else {
        unused.addClass('pvtHorizList');
        unused.removeClass('pvtVertList');
    }

    var checkAttr = function(attr, i) {
        var values = (function() {
                var results = [];

                for (v in attrValues[attr]) {
                    results.push(v);
                }

                return results;
            })();

        var hasExcludedItem = false;

        var valueList = document.createElement('div')
                                .addClass('pvtFilterBox');
        
        valueList.style.display = 'none';
        
        var _h0 = document.createElement('h4'),
            _span0 = document.createElement('span'),
            _span1 = document.createElement('span')
                            .addClass('count');

        _span0.setText(attr);
        _span1.setText(["(",values.length,")"].join(''));

        _h0.appendChild(_span0);
        _h0.appendChild(_span1);
        
        valueList.appendChild(_h0);
        
        if (values.length > inputOpts.menuLimit) {
            var _p0 = document.createElement('p');

            _p0.innerHTML = inputOpts.localeStrings.tooMany;

            valueList.appendChild(_p0);
        } else {
            if (values.length > 5) {
                var controls = document.createElement('p');
                    sorter = Lib.getSort(inputOpts.sorters, attr);
                    placeholder = inputOpts.localeStrings.filterResults;

                valueList.appendChild(controls);

                var _searchInput = document.createElement('input')
                                    .addClass('pvtSearch');

                _searchInput.type = 'text';
                _searchInput.setAttribute('placeholder', placeholder);

                _searchInput.onkeyup = function(){
                    var accept, 
                        accept_gen, 
                        filter = this.value.toLowerCase().trim();
                    
                    accept_gen = function(prefix, accepted) {
                        return function(v) {
                            var _ref2,
                                real_filter = filter.substring(prefix.length).trim();
                            
                            if (real_filter.length === 0) {
                                return true;
                            }
                            
                            _ref2 = Math.sign(sorter(v.toLowerCase(), real_filter))

                            return Lib.indexOf.call(accepted, _ref2) >= 0;
                        };
                    };

                    accept = filter.startsWith(">=") ? 
                                accept_gen(">=", [1, 0]) : 
                                filter.startsWith("<=") ? 
                                    accept_gen("<=", [-1, 0]) : 
                                    filter.startsWith(">") ? 
                                        accept_gen(">", [1]) : 
                                        filter.startsWith("<") ? 
                                            accept_gen("<", [-1]) : 
                                            filter.startsWith("~") ? 
                                                function(v) {
                                                    if (filter.substring(1).trim().length === 0) {
                                                        return true;
                                                    }
                                                    return v.toLowerCase().match(filter.substring(1));
                                                } : 
                                                function(v) {
                                                    return v.toLowerCase().indexOf(filter) !== -1;
                                                };

                    valueList.querySelectorAll('.pvtCheckContainer p label span.value')
                            .forEach(function(node) {
                                if (accept(node.getText())) {
                                    return node.parentNode.parentNode.style.display='';
                                } else {
                                    return node.parentNode.parentNode.style.display='none';
                                }
                            });
                }

                controls.appendChild(_searchInput);

                var _br0 = document.createElement('br');

                controls.appendChild(_br0);

                var _selectAllButton = document.createElement('button'),
                    _selectNoneButton = document.createElement('button');

                _selectAllButton.type = _selectNoneButton.type = 'button';

                _selectAllButton.innerHTML = inputOpts.localeStrings.selectAll;
                _selectAllButton.onclick = function() {
                    valueList.querySelectorAll('input:not(:checked)')
                            .forEach(function(node){
                                if(node.style.display !== 'none'){ 
                                    node.checked = true;
                                    node.toggleClass('changed');
                                }
                            });
                };

                _selectNoneButton.innerHTML = inputOpts.localeStrings.selectNone;
                _selectNoneButton.onclick = function() {
                    valueList.querySelectorAll('input:checked')
                            .forEach(function(node){
                                if(node.style.display !== 'none'){
                                    node.checked = false;
                                    node.toggleClass('changed');
                                }
                            });
                };

                controls.appendChild(_selectAllButton);
                controls.appendChild(_selectNoneButton);
            }

            var checkContainer = document.createElement('div')
                                        .addClass("pvtCheckContainer");

            valueList.appendChild(checkContainer);

            var _ref3 = values.sort(Lib.getSort(inputOpts.sorters, attr));

            for (var n = 0, len2 = _ref3.length; n < len2; n++) {
                var value = _ref3[n],
                    valueCount = attrValues[attr][value],
                    filterItem = document.createElement('label'),
                    filterItemExcluded = false;
                
                if (inputOpts.inclusions[attr]) {
                    filterItemExcluded = (Lib.indexOf.call(inputOpts.inclusions[attr], value) < 0);
                } else if (inputOpts.exclusions[attr]) {
                    filterItemExcluded = (Lib.indexOf.call(inputOpts.exclusions[attr], value) >= 0);
                }

                hasExcludedItem || (hasExcludedItem = filterItemExcluded);
                
                var _filterInput = document.createElement('input')
                                    .addClass('pvtFilter')
                
                _filterInput.type = 'checkbox';
                _filterInput.setAttribute('checked', !filterItemExcluded);
                _filterInput.setAttribute('data-filterAttr', attr);
                _filterInput.setAttribute('data-filterValue', value);

                _filterInput.onchange = function(){
                    return this.toggleClass("changed");
                }

                filterItem.appendChild(_filterInput);
                
                var _span2 = document.createElement('span')
                                    .addClass('value')
                                    .setText(value),
                    _span3 = document.createElement('span')
                                    .addClass('count')
                                    .setText(["(",valueCount,")"].join(''));
                
                filterItem.appendChild(_span2);
                filterItem.appendChild(_span3);

                var _p1 = document.createElement('p');

                _p1.appendChild(filterItem);
                checkContainer.appendChild(_p1);
            }
        }

        var triangleLink = document.createElement('span')
                                .addClass('pvtTriangle');

        triangleLink.innerHTML = " &#x25BE;";

        triangleLink.onclick = function(e){
            var left = e.currentTarget.offsetLeft,
                top = e.currentTarget.offsetTop;
            

            valueList.style.left = left + 10;
            valueList.style.top = top + 10;
            valueList.style.display = '';

            return false;
        }

        var attrElem = document.createElement('li')
                            .addClass("axis_" + i); 
            _span4 = document.createElement('span')
                            .addClass('pvtAttr')
                            .setText(attr);
                            
        _span4.setAttribute('data-attrName', attr);

        _span4.appendChild(triangleLink);
        attrElem.appendChild(_span4);

        if (hasExcludedItem) {
            attrElem.addClass('pvtFilteredAttribute');
        }

        var closeFilterBox = function() {
            var _checkBox = valueList.querySelectorAll("[type='checkbox']"),
                _checked = valueList.querySelectorAll("[type='checkbox']:checked"),
                _pvtSearch = valueList.querySelectorAll(".pvtSearch"),
                _pvtCheckContainer = valueList.querySelectorAll(".pvtCheckContainer p");

            if (_checkBox.length > _checked.length) {
                attrElem.addClass("pvtFilteredAttribute");
            } else {
                attrElem.removeClass("pvtFilteredAttribute");
            }

            _pvtSearch.forEach(function(node){
                node.value = '';
            });
            _pvtCheckContainer.forEach(function(node){
                node.style.display = '';
            });

            valueList.style.display = 'none';
        };

        var finalButtons = document.createElement('p');

        valueList.appendChild(finalButtons);

        if (values.length <= inputOpts.menuLimit) {
            var _applyButton = document.createElement('button')
                                .setText(inputOpts.localeStrings.apply);

            _applyButton.type = 'button';
            _applyButton.onclick = function(){
                var _changed = valueList.querySelectorAll(".changed");

                _changed.forEach(function(node){
                    node.removeClass('changed');
                })

                if (_changed.length) {
                    refreshFunc.refresh();
                }

                return closeFilterBox();
            }

            finalButtons.appendChild(_applyButton);
        }

        var _cancelButton = document.createElement('button')
                            .setText(inputOpts.localeStrings.cancel);

        _cancelButton.type = 'button';
        _cancelButton.onclick = function(){
            var _checked = valueList.querySelectorAll(".changed:checked"),
                _notChecked = valueList.querySelectorAll(".changed:not(:checked)");

            _checked.forEach(function(node){
                node.removeClass('changed');
                node.checked = false;
            });

            _notChecked.forEach(function(node){
                node.removeClass('changed');
                node.checked = true;
            });

            return closeFilterBox();
        }

        finalButtons.appendChild(_cancelButton);

        unused.appendChild(attrElem);
        unused.appendChild(valueList);
    };

    for(var i in shownAttributes) {
        if (!Lib.hasProp.call(shownAttributes, i)) continue;
        checkAttr(shownAttributes[i], i);
    }

    var tr1 = document.createElement('tr');
    
    uiTable.appendChild(tr1);

    ordering = {
        key_a_to_z: {
            rowSymbol: "&varr;",
            colSymbol: "&harr;",
            next: "value_a_to_z"
        },
        value_a_to_z: {
            rowSymbol: "&darr;",
            colSymbol: "&rarr;",
            next: "value_z_to_a"
        },
        value_z_to_a: {
            rowSymbol: "&uarr;",
            colSymbol: "&larr;",
            next: "key_a_to_z"
        }
    };

    var rowOrderArrow = document.createElement('a')
                                .addClass('pvtRowOrder');
    
    rowOrderArrow.setAttribute('role','button');
    rowOrderArrow.setAttribute('data-order',inputOpts.rowOrder);
    rowOrderArrow.innerHTML = ordering[inputOpts.rowOrder].rowSymbol;
    rowOrderArrow.onclick = function(){
        this.setAttribute('data-order', ordering[this.getAttribute("data-order")].next);
        this.innerHTML = ordering[this.getAttribute("data-order")].rowSymbol;
        
        return refreshFunc.refresh();
    }

    var colOrderArrow = document.createElement('a')
                                .addClass('pvtColOrder');
    
    colOrderArrow.setAttribute('role','button');
    colOrderArrow.setAttribute('data-order',inputOpts.colOrder);
    colOrderArrow.innerHTML = ordering[inputOpts.colOrder].colSymbol;
    colOrderArrow.onclick = function(){
        this.setAttribute('data-order', ordering[this.getAttribute("data-order")].next);
        this.innerHTML = ordering[this.getAttribute("data-order")].colSymbol;
        
        return refreshFunc.refresh();
    }

    var _td0 = document.createElement('td')
                    .addClass('pvtVals'),
        _td1 = document.createElement('td')
                    .addClass('pvtAxisContainer pvtHorizList pvtCols'),
        _br1 = document.createElement('br');

    _td0.appendChild(aggregator);
    _td0.appendChild(rowOrderArrow);
    _td0.appendChild(colOrderArrow);
    _td0.appendChild(_br1);

    tr1.appendChild(_td0);
    tr1.appendChild(_td1);
    
    var tr2 = document.createElement('tr');

    uiTable.appendChild(tr2);

    var _td2 = document.createElement('td')
                        .addClass('pvtAxisContainer pvtRows'),
        pivotTable = document.createElement('td')
                        .addClass('pvtRendererArea');

    _td2.setAttribute("valign", "top");
    pivotTable.setAttribute("valign", "top");

    tr2.appendChild(_td2);
    tr2.appendChild(pivotTable);

    if (inputOpts.unusedAttrsVertical === true || unusedAttrsVerticalAutoOverride) {
        var _child1 = uiTable.querySelector('tr:nth-child(1)'),
            _child2 = uiTable.querySelector('tr:nth-child(2)');
    
        _child1.insertBefore(rendererControl, _child1.firstChild);
        _child2.insertBefore(rendererControl, _child2.firstChild);
    } else {
        var _tr0 = document.createElement('tr');

        _tr0.appendChild(rendererControl);
        _tr0.appendChild(unused);

        uiTable.insertBefore(_tr0, uiTable.firstChild);
    }
    
    var _ref5 = inputOpts.cols,
        _pvtCols = target.querySelector(".pvtCols");

    for(var n = 0, len2 = _ref5.length; n < len2; n++) {
        var x = _ref5[n],
            _axis = target.querySelector(".axis_" + shownAttributes.indexOf(x));
        
        _pvtCols.appendChild(_axis);
    }
    
    var _ref6 = inputOpts.rows,
        _pvtRows = target.querySelector(".pvtRows");
    
    for(var o = 0, len3 = _ref6.length; o < len3; o++) {
        var x = _ref6[o],
            _axis = target.querySelector(".axis_" + shownAttributes.indexOf(x));
    }
    
    if (inputOpts.aggregatorName != null) {
        var _pvtAggregator = target.querySelector(".pvtAggregator");
        
        _pvtAggregator.value = inputOpts.aggregatorName;
    }

    if (inputOpts.rendererName != null) {
        var _pvtRenderer = target.querySelector(".pvtRenderer");
        
        _pvtRenderer.value = inputOpts.rendererName;
    }

    var initialRender = true;
    
    refreshFunc.refreshDelayed = function() {
            var _ref7;
            
            var subopts = {
                    derivedAttributes: inputOpts.derivedAttributes,
                    localeStrings: inputOpts.localeStrings,
                    rendererOpts: inputOpts.rendererOpts,
                    sorters: inputOpts.sorters,
                    cols: [],
                    rows: [],
                    dataClass: inputOpts.dataClass
                },
                numInputsToProcess = (_ref7 = inputOpts.aggregators[aggregator.value].fn([])().numInputs) != null ? _ref7 : 0,
                vals = [];


            target.querySelectorAll('.pvtRows li span.pvtAttr')
                .forEach(function(node){
                    if(node.parentNode.style.display !== 'none' && node.style.display !== 'none'){
                        return subopts.rows.push(node.getAttribute("data-attrName"));
                    }
                });

            target.querySelectorAll('.pvtCols li span.pvtAttr')
                .forEach(function(node){
                    if(node.parentNode.style.display !== 'none' && node.style.display !== 'none'){
                        return subopts.cols.push(node.getAttribute("data-attrName"));
                    }
                });     

            target.querySelectorAll('.pvtVals select.pvtAttrDropdown')
                .forEach(function(node){
                    if (numInputsToProcess === 0) {
                        return node.parentNode.removeChild(node);
                    } else {
                        numInputsToProcess--;
                        if (node.value !== "") {
                            return vals.push(node.value);
                        }
                    }
                });

            if (numInputsToProcess !== 0) {
                var pvtVals = target.querySelector(".pvtVals");


                for (var x = 0, t = 0, _ref8 = numInputsToProcess; 0 <= _ref8 ? t < _ref8 : t > _ref8; x = 0 <= _ref8 ? ++t : --t) {
                    var newDropdown = document.createElement('select')
                                            .addClass('pvtAttrDropdown'),
                        _selectOption = document.createElement('option')
                                        .setText(inputOpts.localeStrings.optionSelect);

                    
                    newDropdown.appendChild(_selectOption);
                    newDropdown.onchange = function(){
                        return refreshFunc.refresh();
                    };

                    for (var u = 0, len4 = shownAttributes.length; u < len4; u++) {
                        var attr = shownAttributes[u],
                            _attrOption = document.createElement('option')
                                            .setText(attr);

                        _attrOption.value = attr;

                        newDropdown.appendChild(_attrOption);
                    }

                    pvtVals.appendChild(newDropdown);
                }
            }

            if (initialRender) {
                var i = 0;

                vals = inputOpts.vals;
                
                target.querySelectorAll(".pvtVals select.pvtAttrDropdown")
                    .forEach(function(node) {
                        node.value = vals[i];
                        return i++;
                    });

                initialRender = false;
            }
            
            subopts.aggregatorName = aggregator.value;
            subopts.vals = vals;
            subopts.aggregator = inputOpts.aggregators[aggregator.value].fn(vals);
            subopts.renderer = inputOpts.renderers[renderer.value].fn;
            subopts.rowOrder = rowOrderArrow.getAttribute("data-order");
            subopts.colOrder = colOrderArrow.getAttribute("data-order");
            
            var exclusions = {};
            
            target.querySelectorAll('input.pvtFilter')
                .forEach(function(node) {
                    if(!node.checked){
                        var filter = [
                            node.getAttribute('data-filterAttr'),
                            node.getAttribute('data-filterValue')
                        ];

                        if (exclusions[filter[0]] != null) {
                            return exclusions[filter[0]].push(filter[1]);
                        } else {
                            return exclusions[filter[0]] = [filter[1]];
                        }
                    }
                });

            var inclusions = {};
            
            target.querySelectorAll('input.pvtFilter:checked')
                .forEach(function(node) {
                    var filter = [
                        node.getAttribute('data-filterAttr'),
                        node.getAttribute('data-filterValue')
                    ];
                    
                    if (exclusions[filter[0]] != null) {
                        if (inclusions[filter[0]] != null) {
                            return inclusions[filter[0]].push(filter[1]);
                        } else {
                            return inclusions[filter[0]] = [filter[1]];
                        }
                    }
                });

            subopts.filter = function(record) {
                var _ref9, _ref10;
                
                if (!inputOpts.filter(record)) {
                    return false;
                }

                for (var k in exclusions) {
                    var excludedItems = exclusions[k];
                    
                    _ref9 = "" + ((_ref10 = record[k]) != null ?  _ref10 : 'null')

                    if (Lib.indexOf.call(excludedItems, _ref9) >= 0) {
                        return false;
                    }
                }
                return true;
            };
            
            Pivot.pivot({
                target: pivotTable,
                input: input.data, 
                inputOpts: subopts
            });
            
            pivotUIOptions = Lib.deepExtend({}, inputOpts, {
                cols: subopts.cols,
                rows: subopts.rows,
                colOrder: subopts.colOrder,
                rowOrder: subopts.rowOrder,
                vals: vals,
                exclusions: exclusions,
                inclusions: inclusions,
                inclusionsInfo: inclusions,
                aggregatorName: aggregator.value,
                rendererName: renderer.value
            });

            target.__pivotUIContainer__.inputOpts = pivotUIOptions;
            
            if (inputOpts.autoSortUnusedAttrs) {
                unusedAttrsContainer = target.querySelector("td.pvtUnused.pvtAxisContainer");
                var _liArr = unusedAttrsContainer.querySelectorAll("li");
                
                
                Array.prototype.sort.call(_liArr, function(a, b) {
                    return Lib.naturalSort(a.getText(), b.getText());
                })
                
                _liArr.forEach(function(node){
                    unusedAttrsContainer.appendChild(node);
                });
            }

            pivotTable.style.opacity = 1;

            if (inputOpts.onRefresh != null) {
                return inputOpts.onRefresh(pivotUIOptions);
            }
        };

    refreshFunc.refresh = function() {
        pivotTable.style.opacity = 0.5;
        return setTimeout(refreshFunc.refreshDelayed, 10);
    };

    refreshFunc.refresh();
    
    var _axisContainer = target.querySelectorAll('.pvtAxisContainer')
                                .forEach(function(node){
                                        new Sortable(node,{
                                            group: 'axis',
                                            onEnd: refreshFunc.refresh
                                        });
                                });
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/**
 *  Name : default.js
 *  Explain : 
 * 
 */
var Aggregator = __webpack_require__(2),
    Lib = __webpack_require__(0),
    Locales = __webpack_require__(1),
    Renderer = __webpack_require__(3),
    PivotData = __webpack_require__(4);
    
var Default = module.exports = {};

Default.inputOpts = function(locale, uiFlag){
    if(uiFlag){
        return {
            name:'unknwon table',
            derivedAttributes: {},
            aggregators: Aggregator.makeLocaleAggregator(locale),
            renderers: Renderer.makeLocaleRenderer(locale),
            hiddenAttributes: [],
            menuLimit: 500,
            cols: [],
            rows: [],
            vals: [],
            rowOrder: "key_a_to_z",
            colOrder: "key_a_to_z",
            dataClass: PivotData,
            exclusions: {},
            inclusions: {},
            unusedAttrsVertical: 85,
            autoSortUnusedAttrs: false,
            onRefresh: null,
            filter: function() {
                return true;
            },
            sorters: {},
            multipleTable: false
        }
    }else{
        return {
            name:'unknwon table',
            cols: [],
            rows: [],
            vals: [],
            rowOrder: "key_a_to_z",
            colOrder: "key_a_to_z",
            dataClass: PivotData,
            filter: function() {
                return true;
            },
            aggregator: Aggregator.count()(),
            aggregatorName: "Count",
            sorters: {},
            derivedAttributes: {},
            renderer: Renderer.pivotTableRenderer
        }
    }
};

Default.localeOpts = function(locale){
    var localeStrings = Lib.deepExtend(
        {},
        Locales.en.localeStrings,
        Locales[locale].localeStrings 
    );

    return {
        rendererOpts: {
            localeStrings: localeStrings
        },
        localeStrings: localeStrings
    }
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/**
 *  Name : renderer.basic.js
 *  Explain : 
 * 
 */

var Locales = __webpack_require__(1),
    Lib = __webpack_require__(0);

module.exports = {
    table: function _table(options) {
        options = options || {};

        return pivotTableRenderer({
            pivotData : options.pivotData,
            rendererOpts: options.rendererOpts
        });
    },
    tableBar: function _tableBar(options) {
        options = options || {};

        return tableBar({
            target : pivotTableRenderer({
                pivotData : options.pivotData,
                rendererOpts: options.rendererOpts
            })
        });
    },
    heatmap: function _heatmap(options) {
        options = options || {}; 
        
        return heatmap({
            target : pivotTableRenderer({
                pivotData : options.pivotData,
                rendererOpts: options.rendererOpts
            }),
            type: 'heatmap',
            rendererOpts: options.rendererOpts
        });
    },
    rowHeatmap: function _rowHeatmap(options) {
        options = options || {}; 

        return heatmap({
            target : pivotTableRenderer({
                pivotData : options.pivotData,
                rendererOpts: options.rendererOpts
            }),
            type: 'rowheatmap',
            rendererOpts: options.rendererOpts
        });
    },
    colHeatmap: function _colHeatmap(options) {
        options = options || {}; 

        return heatmap({
            target : pivotTableRenderer({
                pivotData : options.pivotData,
                rendererOpts: options.rendererOpts
            }),
            type: 'colheatmap',
            rendererOpts: options.rendererOpts
        });
    }
};

/**
 * pivotTableRenderer
 * 
 * @param {*} pivotData 
 * @param {*} opts 
 */

function pivotTableRenderer(options) {
    options = options || {};
    
    var pivotData = options.pivotData,
        opts = options.opts,
        aggregator, 
        c, colAttrs, colKey, colKeys, 
        defaults, 
        getClickHandler, 
        i, j, r, result, 
        rowAttrs, rowKey, rowKeys, 
        spanSize, tbody, td, th, thead, 
        totalAggregator, tr, txt, val, x;
    
    opts = Lib.deepExtend({}, {
        table: {
            clickCallback: null
        },
        localeStrings: {
            totals: Locales.en.localeStrings.totals
        }
    }, opts);
    
    colAttrs = pivotData.colAttrs;
    rowAttrs = pivotData.rowAttrs;
    rowKeys = pivotData.getRowKeys();
    colKeys = pivotData.getColKeys();
    
    if (opts.table.clickCallback) {
        getClickHandler = function(value, rowValues, colValues) {
            var attr, filters, i;
            
            filters = {};
            
            for (i in colAttrs) {
                if (!Lib.hasProp.call(colAttrs, i)) continue;
                attr = colAttrs[i];
                if (colValues[i] != null) {
                    filters[attr] = colValues[i];
                }
            }
            for (i in rowAttrs) {
                if (!Lib.hasProp.call(rowAttrs, i)) continue;
                attr = rowAttrs[i];
                if (rowValues[i] != null) {
                    filters[attr] = rowValues[i];
                }
            }

            return function(e) {
                return opts.table.clickCallback(e, value, filters, pivotData);
            };
        };
    }
    
    result = document.createElement("table");
    result.className = "pvtTable";
    
    spanSize = function(arr, i, j) {
        var l, len, n, noDraw, ref, ref1, stop, x;
        if (i !== 0) {
            noDraw = true;
            for (x = l = 0, ref = j; 0 <= ref ? l <= ref : l >= ref; x = 0 <= ref ? ++l : --l) {
                if (arr[i - 1][x] !== arr[i][x]) {
                    noDraw = false;
                }
            }
            if (noDraw) {
                return -1;
            }
        }
        len = 0;
        while (i + len < arr.length) {
            stop = false;
            for (x = n = 0, ref1 = j; 0 <= ref1 ? n <= ref1 : n >= ref1; x = 0 <= ref1 ? ++n : --n) {
                if (arr[i][x] !== arr[i + len][x]) {
                    stop = true;
                }
            }
            if (stop) {
                break;
            }
            len++;
        }
        return len;
    };

    thead = document.createElement("thead");
    
    for (j in colAttrs) {
        if (!Lib.hasProp.call(colAttrs, j)) continue;
        
        c = colAttrs[j];
        tr = document.createElement("tr");
        
        if (parseInt(j) === 0 && rowAttrs.length !== 0) {
            th = document.createElement("th");
            th.setAttribute("colspan", rowAttrs.length);
            th.setAttribute("rowspan", colAttrs.length);
            tr.appendChild(th);
        }

        th = document.createElement("th");
        th.className = "pvtAxisLabel";
        th.textContent = c;
        tr.appendChild(th);

        for (i in colKeys) {
            if (!Lib.hasProp.call(colKeys, i)) continue;
            colKey = colKeys[i];
            x = spanSize(colKeys, parseInt(i), parseInt(j));
            if (x !== -1) {
                th = document.createElement("th");
                th.className = "pvtColLabel";
                th.textContent = colKey[j];
                th.setAttribute("colspan", x);
                if (parseInt(j) === colAttrs.length - 1 && rowAttrs.length !== 0) {
                    th.setAttribute("rowspan", 2);
                }
                tr.appendChild(th);
            }
        }
        if (parseInt(j) === 0) {
            th = document.createElement("th");
            th.className = "pvtTotalLabel";
            th.innerHTML = opts.localeStrings.totals;
            th.setAttribute("rowspan", colAttrs.length + (rowAttrs.length === 0 ? 0 : 1));
            tr.appendChild(th);
        }
        thead.appendChild(tr);
    }

    if (rowAttrs.length !== 0) {
        tr = document.createElement("tr");
        for (i in rowAttrs) {
            if (!Lib.hasProp.call(rowAttrs, i)) continue;
            r = rowAttrs[i];
            th = document.createElement("th");
            th.className = "pvtAxisLabel";
            th.textContent = r;
            tr.appendChild(th);
        }

        th = document.createElement("th");
       
        if (colAttrs.length === 0) {
            th.className = "pvtTotalLabel";
            th.innerHTML = opts.localeStrings.totals;
        }

        tr.appendChild(th);
        thead.appendChild(tr);
    }

    result.appendChild(thead);
    tbody = document.createElement("tbody");

    for (i in rowKeys) {
        if (!Lib.hasProp.call(rowKeys, i)) continue;
        
        rowKey = rowKeys[i];
        tr = document.createElement("tr");
       
        for (j in rowKey) {
            if (!Lib.hasProp.call(rowKey, j)) continue;
            txt = rowKey[j];
            x = spanSize(rowKeys, parseInt(i), parseInt(j));
            if (x !== -1) {
                th = document.createElement("th");
                th.className = "pvtRowLabel";
                th.textContent = txt;
                th.setAttribute("rowspan", x);
                if (parseInt(j) === rowAttrs.length - 1 && colAttrs.length !== 0) {
                    th.setAttribute("colspan", 2);
                }
                tr.appendChild(th);
            }
        }
        for (j in colKeys) {
            if (!Lib.hasProp.call(colKeys, j)) continue;
            colKey = colKeys[j];
            aggregator = pivotData.getAggregator(rowKey, colKey);
            val = aggregator.value();
            td = document.createElement("td");
            td.className = "pvtVal row" + i + " col" + j;
            td.textContent = aggregator.format(val);
            td.setAttribute("data-value", val);
            if (getClickHandler != null) {
                td.onclick = getClickHandler(val, rowKey, colKey);
            }
            tr.appendChild(td);
        }
        totalAggregator = pivotData.getAggregator(rowKey, []);
        val = totalAggregator.value();
        td = document.createElement("td");
        td.className = "pvtTotal rowTotal";
        td.textContent = totalAggregator.format(val);
        td.setAttribute("data-value", val);
        if (getClickHandler != null) {
            td.onclick = getClickHandler(val, rowKey, []);
        }
        td.setAttribute("data-for", "row" + i);
        tr.appendChild(td);
        tbody.appendChild(tr);
    }

    tr = document.createElement("tr");
    th = document.createElement("th");
    th.className = "pvtTotalLabel";
    th.innerHTML = opts.localeStrings.totals;
    th.setAttribute("colspan", rowAttrs.length + (colAttrs.length === 0 ? 0 : 1));
    tr.appendChild(th);
   
    for (j in colKeys) {
        if (!Lib.hasProp.call(colKeys, j)) continue;
        colKey = colKeys[j];
        totalAggregator = pivotData.getAggregator([], colKey);
        val = totalAggregator.value();
        td = document.createElement("td");
        td.className = "pvtTotal colTotal";
        td.textContent = totalAggregator.format(val);
        td.setAttribute("data-value", val);
        if (getClickHandler != null) {
            td.onclick = getClickHandler(val, [], colKey);
        }
        td.setAttribute("data-for", "col" + j);
        tr.appendChild(td);
    }

    totalAggregator = pivotData.getAggregator([], []);
    val = totalAggregator.value();
    td = document.createElement("td");
    td.className = "pvtGrandTotal";
    td.textContent = totalAggregator.format(val);
    td.setAttribute("data-value", val);
    
    if (getClickHandler != null) {
        td.onclick = getClickHandler(val, [], []);
    }
    
    tr.appendChild(td);
    tbody.appendChild(tr);
    result.appendChild(tbody);
    result.setAttribute("data-numrows", rowKeys.length);
    result.setAttribute("data-numcols", colKeys.length);
    
    return result;
};

function tableBar(options){
    options = options || {};

    var target = options.target,
        tableBarMaker, i, l, numCols, numRows, ref;

    if(!target && !(target instanceof Element)){
        console.error('올바르지 않은 타켓입니다.');
        return target;
    }
    
    numRows = parseInt(target.getAttribute('data-numrows'));
    numCols = parseInt(target.getAttribute('data-numcols'));

    tableBarMaker = (function(_this) {
        return function(scope) {
            var forEachCell, max, scaler, values;
            
            forEachCell = function(f) {
                return _this.querySelectorAll(scope)
                            .forEach(function(node) {
                                var x = node.getAttribute('data-value');

                                if ((x != null) && isFinite(x)) {
                                    return f(x, node);
                                }
                             });
            };

            values = [];

            forEachCell(function(x) {
                return values.push(x);
            });

            max = Math.max.apply(Math, values);
            
            scaler = function(x) {
                return 100 * x / (1.4 * max);
            };

            return forEachCell(function(x, elem) {
                var text, wrapper;
                
                text = elem.getText();
                
                wrapper = document.createElement('div');

                wrapper.style.position = 'relative';
                wrapper.style.height = '55px';

                var _div0 = document.createElement('div'),
                    _div1 = document.createElement('div')
                                    .setText(text);

                _div0.style.position = 'absolute';
                _div0.style.bottom = 0;
                _div0.style.left = 0;
                _div0.style.right = 0;
                _div0.style.height = scaler(x) + '%';
                _div0.style.backgroundColor = 'gray';

                _div1.style.position = 'relative';
                _div1.style.paddingLeft = '5px';
                _div1.style.paddingRight = '5px';

                wrapper.appendChild(_div0);
                wrapper.appendChild(_div1);

                elem.style.padding = 0;
                elem.style.paddingTop = '5px';
                elem.style.textAlign = 'center';

                elem.innerHTML = wrapper.outerHTML;
            });
        };
    })(target);

    for (i = l = 0, ref = numRows; 0 <= ref ? l < ref : l > ref; i = 0 <= ref ? ++l : --l) {
        tableBarMaker(".pvtVal.row" + i);
    }
    
    tableBarMaker(".pvtTotal.colTotal");
    
    return target;
  };

function heatmap(options) {
    options = options || {};
    
    var target = options.target,
        type = options.type,
        opts= options.opts,
        colorScaleGenerator, heatmapper, i, j, l, n, numCols, numRows, ref, ref1, ref2;
    
    if(!target && !(target instanceof Element)){
        console.error('올바르지 않은 타켓입니다.');
        return target;
    }

    if (type == null) {
        type = "heatmap";
    }

    numRows = parseInt(target.getAttribute('data-numrows'));
    numCols = parseInt(target.getAttribute('data-numcols'));
    
    colorScaleGenerator = opts != null ? (ref = opts.heatmap) != null ? ref.colorScaleGenerator : void 0 : void 0;
    
    if (colorScaleGenerator == null) {
        colorScaleGenerator = function(values) {
            var max, min;
            min = Math.min.apply(Math, values);
            max = Math.max.apply(Math, values);
            return function(x) {
                var nonRed;
                nonRed = 255 - Math.round(255 * (x - min) / (max - min));
                return "rgb(255," + nonRed + "," + nonRed + ")";
            };
        };
    }

    heatmapper = (function(_this) {
        return function(scope) {
            var colorScale, forEachCell, values;
            forEachCell = function(f) {
                return _this.querySelectorAll(scope)
                            .forEach(function(node) {
                                var x = node.getAttribute('data-value');
                                if ((x != null) && isFinite(x)) {
                                    return f(x, node);
                                }
                            });
            };

            values = [];

            forEachCell(function(x) {
                return values.push(x);
            });
            
            colorScale = colorScaleGenerator(values);
            
            return forEachCell(function(x, elem) {
                return elem.style.backgroundColor = colorScale(x);
            });
        };
    })(target);

    switch (type) {
        case "heatmap":
            heatmapper(".pvtVal");
            break;
        case "rowheatmap":
            for (i = l = 0, ref1 = numRows; 0 <= ref1 ? l < ref1 : l > ref1; i = 0 <= ref1 ? ++l : --l) {
                heatmapper(".pvtVal.row" + i);
            }
            break;
        case "colheatmap":
            for (j = n = 0, ref2 = numCols; 0 <= ref2 ? n < ref2 : n > ref2; j = 0 <= ref2 ? ++n : --n) {
                heatmapper(".pvtVal.col" + j);
            }
            break;
    }

    heatmapper(".pvtTotal.rowTotal");
    heatmapper(".pvtTotal.colTotal");
    
    return target;
  };

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/**
 *  Name : renderer.chart.js
 *  Explain : 
 * 
 */

var Lib = __webpack_require__(0);

module.exports = {
    barChart: function _barChart(options) {
        options = options || {}; 
        
        return barChart({
            pivotData : options.pivotData,
            rendererOpts: options.rendererOpts,
            chartOpts: Lib.deepExtend(
                {},
                (options.rendererOpts || {}).chartOpts,
                {type:'bar'}
            )
        });
    },
    lineChart: function _lineChart(options) {
        options = options || {}; 
        
        return barChart({
            pivotData : options.pivotData,
            rendererOpts: options.rendererOpts,
            chartOpts: Lib.deepExtend(
                {},
                (options.rendererOpts || {}).chartOpts,
                {type:'scatter'}
            )
        });
    }
}

var barChart = function(options){
    options = options || {};
    
    var pivotData = options.pivotData,
        rendererOpts = options.rendererOpts,
        chartOpts = options.chartOpts || {},
        colAttrs = pivotData.colAttrs,
        rowAttrs = pivotData.rowAttrs,
        rowKeys = pivotData.getRowKeys(),
        colKeys = pivotData.getColKeys(),
        fullAggName = pivotData.aggregatorName,
        graphWraper,userPlot;
    
    if(rowKeys.length && colKeys.length){
        graphWraper = document.createElement('div');
        userPlot = new ZSJPlot.API(graphWraper, chartOpts)

        if (pivotData.valAttrs.length) {
            fullAggName += "(" + (pivotData.valAttrs.join(", ")) + ")";
        }

        for (var i = 0, len = rowKeys.length; i < len; i++) {
            var rowKey = rowKeys[i],
                rowTitle = rowKey.join("-"),
                chartData = {x:[], y:[]};

            for (var j = 0, len1 = colKeys.length; j < len1; j++) {
                var colKey = colKeys[j],
                    agg = pivotData.getAggregator(rowKey, colKey);

                if (agg.value() != null) {
                    var colTitle = colKey.join("-");

                    var idx = chartData.x.push(colTitle) - 1;
                    chartData.y[idx] = agg.value();
                }
            }

            userPlot.insertPlot(chartData,{name:rowTitle, type:chartOpts.type, mode: 'lines+markers'});
        }

        return graphWraper;
    }else{
        return pivotTableRenderer({
            pivotData : pivotData,
            rendererOpts: rendererOpts
        });
    }
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @license MIT
 */

(function sortableModule(factory) {
	"use strict";

	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	else if (typeof module != "undefined" && typeof module.exports != "undefined") {
		module.exports = factory();
	}
	else {
		/* jshint sub:true */
		window["Sortable"] = factory();
	}
})(function sortableFactory() {
	"use strict";

	if (typeof window == "undefined" || !window.document) {
		return function sortableError() {
			throw new Error("Sortable.js requires a window with a document");
		};
	}

	var dragEl,
		parentEl,
		ghostEl,
		cloneEl,
		rootEl,
		nextEl,
		lastDownEl,

		scrollEl,
		scrollParentEl,
		scrollCustomFn,

		lastEl,
		lastCSS,
		lastParentCSS,

		oldIndex,
		newIndex,

		activeGroup,
		putSortable,

		autoScroll = {},

		tapEvt,
		touchEvt,

		moved,

		/** @const */
		R_SPACE = /\s+/g,
		R_FLOAT = /left|right|inline/,

		expando = 'Sortable' + (new Date).getTime(),

		win = window,
		document = win.document,
		parseInt = win.parseInt,

		$ = win.jQuery || win.Zepto,
		Polymer = win.Polymer,

		captureMode = false,

		supportDraggable = !!('draggable' in document.createElement('div')),
		supportCssPointerEvents = (function (el) {
			// false when IE11
			if (!!navigator.userAgent.match(/Trident.*rv[ :]?11\./)) {
				return false;
			}
			el = document.createElement('x');
			el.style.cssText = 'pointer-events:auto';
			return el.style.pointerEvents === 'auto';
		})(),

		_silent = false,

		abs = Math.abs,
		min = Math.min,

		savedInputChecked = [],
		touchDragOverListeners = [],

		_autoScroll = _throttle(function (/**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl) {
			// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
			if (rootEl && options.scroll) {
				var _this = rootEl[expando],
					el,
					rect,
					sens = options.scrollSensitivity,
					speed = options.scrollSpeed,

					x = evt.clientX,
					y = evt.clientY,

					winWidth = window.innerWidth,
					winHeight = window.innerHeight,

					vx,
					vy,

					scrollOffsetX,
					scrollOffsetY
				;

				// Delect scrollEl
				if (scrollParentEl !== rootEl) {
					scrollEl = options.scroll;
					scrollParentEl = rootEl;
					scrollCustomFn = options.scrollFn;

					if (scrollEl === true) {
						scrollEl = rootEl;

						do {
							if ((scrollEl.offsetWidth < scrollEl.scrollWidth) ||
								(scrollEl.offsetHeight < scrollEl.scrollHeight)
							) {
								break;
							}
							/* jshint boss:true */
						} while (scrollEl = scrollEl.parentNode);
					}
				}

				if (scrollEl) {
					el = scrollEl;
					rect = scrollEl.getBoundingClientRect();
					vx = (abs(rect.right - x) <= sens) - (abs(rect.left - x) <= sens);
					vy = (abs(rect.bottom - y) <= sens) - (abs(rect.top - y) <= sens);
				}


				if (!(vx || vy)) {
					vx = (winWidth - x <= sens) - (x <= sens);
					vy = (winHeight - y <= sens) - (y <= sens);

					/* jshint expr:true */
					(vx || vy) && (el = win);
				}


				if (autoScroll.vx !== vx || autoScroll.vy !== vy || autoScroll.el !== el) {
					autoScroll.el = el;
					autoScroll.vx = vx;
					autoScroll.vy = vy;

					clearInterval(autoScroll.pid);

					if (el) {
						autoScroll.pid = setInterval(function () {
							scrollOffsetY = vy ? vy * speed : 0;
							scrollOffsetX = vx ? vx * speed : 0;

							if ('function' === typeof(scrollCustomFn)) {
								return scrollCustomFn.call(_this, scrollOffsetX, scrollOffsetY, evt);
							}

							if (el === win) {
								win.scrollTo(win.pageXOffset + scrollOffsetX, win.pageYOffset + scrollOffsetY);
							} else {
								el.scrollTop += scrollOffsetY;
								el.scrollLeft += scrollOffsetX;
							}
						}, 24);
					}
				}
			}
		}, 30),

		_prepareGroup = function (options) {
			function toFn(value, pull) {
				if (value === void 0 || value === true) {
					value = group.name;
				}

				if (typeof value === 'function') {
					return value;
				} else {
					return function (to, from) {
						var fromGroup = from.options.group.name;

						return pull
							? value
							: value && (value.join
								? value.indexOf(fromGroup) > -1
								: (fromGroup == value)
							);
					};
				}
			}

			var group = {};
			var originalGroup = options.group;

			if (!originalGroup || typeof originalGroup != 'object') {
				originalGroup = {name: originalGroup};
			}

			group.name = originalGroup.name;
			group.checkPull = toFn(originalGroup.pull, true);
			group.checkPut = toFn(originalGroup.put);
			group.revertClone = originalGroup.revertClone;

			options.group = group;
		}
	;


	/**
	 * @class  Sortable
	 * @param  {HTMLElement}  el
	 * @param  {Object}       [options]
	 */
	function Sortable(el, options) {
		if (!(el && el.nodeType && el.nodeType === 1)) {
			throw 'Sortable: `el` must be HTMLElement, and not ' + {}.toString.call(el);
		}

		this.el = el; // root element
		this.options = options = _extend({}, options);


		// Export instance
		el[expando] = this;

		// Default options
		var defaults = {
			group: Math.random(),
			sort: true,
			disabled: false,
			store: null,
			handle: null,
			scroll: true,
			scrollSensitivity: 30,
			scrollSpeed: 10,
			draggable: /[uo]l/i.test(el.nodeName) ? 'li' : '>*',
			ghostClass: 'sortable-ghost',
			chosenClass: 'sortable-chosen',
			dragClass: 'sortable-drag',
			ignore: 'a, img',
			filter: null,
			preventOnFilter: true,
			animation: 0,
			setData: function (dataTransfer, dragEl) {
				dataTransfer.setData('Text', dragEl.textContent);
			},
			dropBubble: false,
			dragoverBubble: false,
			dataIdAttr: 'data-id',
			delay: 0,
			forceFallback: false,
			fallbackClass: 'sortable-fallback',
			fallbackOnBody: false,
			fallbackTolerance: 0,
			fallbackOffset: {x: 0, y: 0}
		};


		// Set default options
		for (var name in defaults) {
			!(name in options) && (options[name] = defaults[name]);
		}

		_prepareGroup(options);

		// Bind all private methods
		for (var fn in this) {
			if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
				this[fn] = this[fn].bind(this);
			}
		}

		// Setup drag mode
		this.nativeDraggable = options.forceFallback ? false : supportDraggable;

		// Bind events
		_on(el, 'mousedown', this._onTapStart);
		_on(el, 'touchstart', this._onTapStart);
		_on(el, 'pointerdown', this._onTapStart);

		if (this.nativeDraggable) {
			_on(el, 'dragover', this);
			_on(el, 'dragenter', this);
		}

		touchDragOverListeners.push(this._onDragOver);

		// Restore sorting
		options.store && this.sort(options.store.get(this));
	}


	Sortable.prototype = /** @lends Sortable.prototype */ {
		constructor: Sortable,

		_onTapStart: function (/** Event|TouchEvent */evt) {
			var _this = this,
				el = this.el,
				options = this.options,
				preventOnFilter = options.preventOnFilter,
				type = evt.type,
				touch = evt.touches && evt.touches[0],
				target = (touch || evt).target,
				originalTarget = evt.target.shadowRoot && evt.path[0] || target,
				filter = options.filter,
				startIndex;

			_saveInputCheckedState(el);


			// Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.
			if (dragEl) {
				return;
			}

			if (type === 'mousedown' && evt.button !== 0 || options.disabled) {
				return; // only left button or enabled
			}


			target = _closest(target, options.draggable, el);

			if (!target) {
				return;
			}

			if (lastDownEl === target) {
				// Ignoring duplicate `down`
				return;
			}

			// Get the index of the dragged element within its parent
			startIndex = _index(target, options.draggable);

			// Check filter
			if (typeof filter === 'function') {
				if (filter.call(this, evt, target, this)) {
					_dispatchEvent(_this, originalTarget, 'filter', target, el, startIndex);
					preventOnFilter && evt.preventDefault();
					return; // cancel dnd
				}
			}
			else if (filter) {
				filter = filter.split(',').some(function (criteria) {
					criteria = _closest(originalTarget, criteria.trim(), el);

					if (criteria) {
						_dispatchEvent(_this, criteria, 'filter', target, el, startIndex);
						return true;
					}
				});

				if (filter) {
					preventOnFilter && evt.preventDefault();
					return; // cancel dnd
				}
			}

			if (options.handle && !_closest(originalTarget, options.handle, el)) {
				return;
			}

			// Prepare `dragstart`
			this._prepareDragStart(evt, touch, target, startIndex);
		},

		_prepareDragStart: function (/** Event */evt, /** Touch */touch, /** HTMLElement */target, /** Number */startIndex) {
			var _this = this,
				el = _this.el,
				options = _this.options,
				ownerDocument = el.ownerDocument,
				dragStartFn;

			if (target && !dragEl && (target.parentNode === el)) {
				tapEvt = evt;

				rootEl = el;
				dragEl = target;
				parentEl = dragEl.parentNode;
				nextEl = dragEl.nextSibling;
				lastDownEl = target;
				activeGroup = options.group;
				oldIndex = startIndex;

				this._lastX = (touch || evt).clientX;
				this._lastY = (touch || evt).clientY;

				dragEl.style['will-change'] = 'transform';

				dragStartFn = function () {
					// Delayed drag has been triggered
					// we can re-enable the events: touchmove/mousemove
					_this._disableDelayedDrag();

					// Make the element draggable
					dragEl.draggable = _this.nativeDraggable;

					// Chosen item
					_toggleClass(dragEl, options.chosenClass, true);

					// Bind the events: dragstart/dragend
					_this._triggerDragStart(evt, touch);

					// Drag start event
					_dispatchEvent(_this, rootEl, 'choose', dragEl, rootEl, oldIndex);
				};

				// Disable "draggable"
				options.ignore.split(',').forEach(function (criteria) {
					_find(dragEl, criteria.trim(), _disableDraggable);
				});

				_on(ownerDocument, 'mouseup', _this._onDrop);
				_on(ownerDocument, 'touchend', _this._onDrop);
				_on(ownerDocument, 'touchcancel', _this._onDrop);
				_on(ownerDocument, 'pointercancel', _this._onDrop);
				_on(ownerDocument, 'selectstart', _this);

				if (options.delay) {
					// If the user moves the pointer or let go the click or touch
					// before the delay has been reached:
					// disable the delayed drag
					_on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchend', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
					_on(ownerDocument, 'mousemove', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchmove', _this._disableDelayedDrag);
					_on(ownerDocument, 'pointermove', _this._disableDelayedDrag);

					_this._dragStartTimer = setTimeout(dragStartFn, options.delay);
				} else {
					dragStartFn();
				}


			}
		},

		_disableDelayedDrag: function () {
			var ownerDocument = this.el.ownerDocument;

			clearTimeout(this._dragStartTimer);
			_off(ownerDocument, 'mouseup', this._disableDelayedDrag);
			_off(ownerDocument, 'touchend', this._disableDelayedDrag);
			_off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
			_off(ownerDocument, 'mousemove', this._disableDelayedDrag);
			_off(ownerDocument, 'touchmove', this._disableDelayedDrag);
			_off(ownerDocument, 'pointermove', this._disableDelayedDrag);
		},

		_triggerDragStart: function (/** Event */evt, /** Touch */touch) {
			touch = touch || (evt.pointerType == 'touch' ? evt : null);

			if (touch) {
				// Touch device support
				tapEvt = {
					target: dragEl,
					clientX: touch.clientX,
					clientY: touch.clientY
				};

				this._onDragStart(tapEvt, 'touch');
			}
			else if (!this.nativeDraggable) {
				this._onDragStart(tapEvt, true);
			}
			else {
				_on(dragEl, 'dragend', this);
				_on(rootEl, 'dragstart', this._onDragStart);
			}

			try {
				if (document.selection) {
					// Timeout neccessary for IE9
					setTimeout(function () {
						document.selection.empty();
					});
				} else {
					window.getSelection().removeAllRanges();
				}
			} catch (err) {
			}
		},

		_dragStarted: function () {
			if (rootEl && dragEl) {
				var options = this.options;

				// Apply effect
				_toggleClass(dragEl, options.ghostClass, true);
				_toggleClass(dragEl, options.dragClass, false);

				Sortable.active = this;

				// Drag start event
				_dispatchEvent(this, rootEl, 'start', dragEl, rootEl, oldIndex);
			} else {
				this._nulling();
			}
		},

		_emulateDragOver: function () {
			if (touchEvt) {
				if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY) {
					return;
				}

				this._lastX = touchEvt.clientX;
				this._lastY = touchEvt.clientY;

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', 'none');
				}

				var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY),
					parent = target,
					i = touchDragOverListeners.length;

				if (parent) {
					do {
						if (parent[expando]) {
							while (i--) {
								touchDragOverListeners[i]({
									clientX: touchEvt.clientX,
									clientY: touchEvt.clientY,
									target: target,
									rootEl: parent
								});
							}

							break;
						}

						target = parent; // store last element
					}
					/* jshint boss:true */
					while (parent = parent.parentNode);
				}

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', '');
				}
			}
		},


		_onTouchMove: function (/**TouchEvent*/evt) {
			if (tapEvt) {
				var	options = this.options,
					fallbackTolerance = options.fallbackTolerance,
					fallbackOffset = options.fallbackOffset,
					touch = evt.touches ? evt.touches[0] : evt,
					dx = (touch.clientX - tapEvt.clientX) + fallbackOffset.x,
					dy = (touch.clientY - tapEvt.clientY) + fallbackOffset.y,
					translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';

				// only set the status to dragging, when we are actually dragging
				if (!Sortable.active) {
					if (fallbackTolerance &&
						min(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY)) < fallbackTolerance
					) {
						return;
					}

					this._dragStarted();
				}

				// as well as creating the ghost element on the document body
				this._appendGhost();

				moved = true;
				touchEvt = touch;

				_css(ghostEl, 'webkitTransform', translate3d);
				_css(ghostEl, 'mozTransform', translate3d);
				_css(ghostEl, 'msTransform', translate3d);
				_css(ghostEl, 'transform', translate3d);

				evt.preventDefault();
			}
		},

		_appendGhost: function () {
			if (!ghostEl) {
				var rect = dragEl.getBoundingClientRect(),
					css = _css(dragEl),
					options = this.options,
					ghostRect;

				ghostEl = dragEl.cloneNode(true);

				_toggleClass(ghostEl, options.ghostClass, false);
				_toggleClass(ghostEl, options.fallbackClass, true);
				_toggleClass(ghostEl, options.dragClass, true);

				_css(ghostEl, 'top', rect.top - parseInt(css.marginTop, 10));
				_css(ghostEl, 'left', rect.left - parseInt(css.marginLeft, 10));
				_css(ghostEl, 'width', rect.width);
				_css(ghostEl, 'height', rect.height);
				_css(ghostEl, 'opacity', '0.8');
				_css(ghostEl, 'position', 'fixed');
				_css(ghostEl, 'zIndex', '100000');
				_css(ghostEl, 'pointerEvents', 'none');

				options.fallbackOnBody && document.body.appendChild(ghostEl) || rootEl.appendChild(ghostEl);

				// Fixing dimensions.
				ghostRect = ghostEl.getBoundingClientRect();
				_css(ghostEl, 'width', rect.width * 2 - ghostRect.width);
				_css(ghostEl, 'height', rect.height * 2 - ghostRect.height);
			}
		},

		_onDragStart: function (/**Event*/evt, /**boolean*/useFallback) {
			var dataTransfer = evt.dataTransfer,
				options = this.options;

			this._offUpEvents();

			if (activeGroup.checkPull(this, this, dragEl, evt)) {
				cloneEl = _clone(dragEl);

				cloneEl.draggable = false;
				cloneEl.style['will-change'] = '';

				_css(cloneEl, 'display', 'none');
				_toggleClass(cloneEl, this.options.chosenClass, false);

				rootEl.insertBefore(cloneEl, dragEl);
				_dispatchEvent(this, rootEl, 'clone', dragEl);
			}

			_toggleClass(dragEl, options.dragClass, true);

			if (useFallback) {
				if (useFallback === 'touch') {
					// Bind touch events
					_on(document, 'touchmove', this._onTouchMove);
					_on(document, 'touchend', this._onDrop);
					_on(document, 'touchcancel', this._onDrop);
					_on(document, 'pointermove', this._onTouchMove);
					_on(document, 'pointerup', this._onDrop);
				} else {
					// Old brwoser
					_on(document, 'mousemove', this._onTouchMove);
					_on(document, 'mouseup', this._onDrop);
				}

				this._loopId = setInterval(this._emulateDragOver, 50);
			}
			else {
				if (dataTransfer) {
					dataTransfer.effectAllowed = 'move';
					options.setData && options.setData.call(this, dataTransfer, dragEl);
				}

				_on(document, 'drop', this);
				setTimeout(this._dragStarted, 0);
			}
		},

		_onDragOver: function (/**Event*/evt) {
			var el = this.el,
				target,
				dragRect,
				targetRect,
				revert,
				options = this.options,
				group = options.group,
				activeSortable = Sortable.active,
				isOwner = (activeGroup === group),
				isMovingBetweenSortable = false,
				canSort = options.sort;

			if (evt.preventDefault !== void 0) {
				evt.preventDefault();
				!options.dragoverBubble && evt.stopPropagation();
			}

			if (dragEl.animated) {
				return;
			}

			moved = true;

			if (activeSortable && !options.disabled &&
				(isOwner
					? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
					: (
						putSortable === this ||
						(
							(activeSortable.lastPullMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) &&
							group.checkPut(this, activeSortable, dragEl, evt)
						)
					)
				) &&
				(evt.rootEl === void 0 || evt.rootEl === this.el) // touch fallback
			) {
				// Smart auto-scrolling
				_autoScroll(evt, options, this.el);

				if (_silent) {
					return;
				}

				target = _closest(evt.target, options.draggable, el);
				dragRect = dragEl.getBoundingClientRect();

				if (putSortable !== this) {
					putSortable = this;
					isMovingBetweenSortable = true;
				}

				if (revert) {
					_cloneHide(activeSortable, true);
					parentEl = rootEl; // actualization

					if (cloneEl || nextEl) {
						rootEl.insertBefore(dragEl, cloneEl || nextEl);
					}
					else if (!canSort) {
						rootEl.appendChild(dragEl);
					}

					return;
				}


				if ((el.children.length === 0) || (el.children[0] === ghostEl) ||
					(el === evt.target) && (_ghostIsLast(el, evt))
				) {
					//assign target only if condition is true
					if (el.children.length !== 0 && el.children[0] !== ghostEl && el === evt.target) {
						target = el.lastElementChild;
					}

					if (target) {
						if (target.animated) {
							return;
						}

						targetRect = target.getBoundingClientRect();
					}

					_cloneHide(activeSortable, isOwner);

					if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt) !== false) {
						if (!dragEl.contains(el)) {
							el.appendChild(dragEl);
							parentEl = el; // actualization
						}

						this._animate(dragRect, dragEl);
						target && this._animate(targetRect, target);
					}
				}
				else if (target && !target.animated && target !== dragEl && (target.parentNode[expando] !== void 0)) {
					if (lastEl !== target) {
						lastEl = target;
						lastCSS = _css(target);
						lastParentCSS = _css(target.parentNode);
					}

					targetRect = target.getBoundingClientRect();

					var width = targetRect.right - targetRect.left,
						height = targetRect.bottom - targetRect.top,
						floating = R_FLOAT.test(lastCSS.cssFloat + lastCSS.display)
							|| (lastParentCSS.display == 'flex' && lastParentCSS['flex-direction'].indexOf('row') === 0),
						isWide = (target.offsetWidth > dragEl.offsetWidth),
						isLong = (target.offsetHeight > dragEl.offsetHeight),
						halfway = (floating ? (evt.clientX - targetRect.left) / width : (evt.clientY - targetRect.top) / height) > 0.5,
						nextSibling = target.nextElementSibling,
						after = false
					;

					if (floating) {
						var elTop = dragEl.offsetTop,
							tgTop = target.offsetTop;

						if (elTop === tgTop) {
							after = (target.previousElementSibling === dragEl) && !isWide || halfway && isWide;
						}
						else if (target.previousElementSibling === dragEl || dragEl.previousElementSibling === target) {
							after = (evt.clientY - targetRect.top) / height > 0.5;
						} else {
							after = tgTop > elTop;
						}
						} else if (!isMovingBetweenSortable) {
						after = (nextSibling !== dragEl) && !isLong || halfway && isLong;
					}

					var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

					if (moveVector !== false) {
						if (moveVector === 1 || moveVector === -1) {
							after = (moveVector === 1);
						}

						_silent = true;
						setTimeout(_unsilent, 30);

						_cloneHide(activeSortable, isOwner);

						if (!dragEl.contains(el)) {
							if (after && !nextSibling) {
								el.appendChild(dragEl);
							} else {
								target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
							}
						}

						parentEl = dragEl.parentNode; // actualization

						this._animate(dragRect, dragEl);
						this._animate(targetRect, target);
					}
				}
			}
		},

		_animate: function (prevRect, target) {
			var ms = this.options.animation;

			if (ms) {
				var currentRect = target.getBoundingClientRect();

				if (prevRect.nodeType === 1) {
					prevRect = prevRect.getBoundingClientRect();
				}

				_css(target, 'transition', 'none');
				_css(target, 'transform', 'translate3d('
					+ (prevRect.left - currentRect.left) + 'px,'
					+ (prevRect.top - currentRect.top) + 'px,0)'
				);

				target.offsetWidth; // repaint

				_css(target, 'transition', 'all ' + ms + 'ms');
				_css(target, 'transform', 'translate3d(0,0,0)');

				clearTimeout(target.animated);
				target.animated = setTimeout(function () {
					_css(target, 'transition', '');
					_css(target, 'transform', '');
					target.animated = false;
				}, ms);
			}
		},

		_offUpEvents: function () {
			var ownerDocument = this.el.ownerDocument;

			_off(document, 'touchmove', this._onTouchMove);
			_off(document, 'pointermove', this._onTouchMove);
			_off(ownerDocument, 'mouseup', this._onDrop);
			_off(ownerDocument, 'touchend', this._onDrop);
			_off(ownerDocument, 'pointerup', this._onDrop);
			_off(ownerDocument, 'touchcancel', this._onDrop);
			_off(ownerDocument, 'pointercancel', this._onDrop);
			_off(ownerDocument, 'selectstart', this);
		},

		_onDrop: function (/**Event*/evt) {
			var el = this.el,
				options = this.options;

			clearInterval(this._loopId);
			clearInterval(autoScroll.pid);
			clearTimeout(this._dragStartTimer);

			// Unbind events
			_off(document, 'mousemove', this._onTouchMove);

			if (this.nativeDraggable) {
				_off(document, 'drop', this);
				_off(el, 'dragstart', this._onDragStart);
			}

			this._offUpEvents();

			if (evt) {
				if (moved) {
					evt.preventDefault();
					!options.dropBubble && evt.stopPropagation();
				}

				ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

				if (rootEl === parentEl || Sortable.active.lastPullMode !== 'clone') {
					// Remove clone
					cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
				}

				if (dragEl) {
					if (this.nativeDraggable) {
						_off(dragEl, 'dragend', this);
					}

					_disableDraggable(dragEl);
					dragEl.style['will-change'] = '';

					// Remove class's
					_toggleClass(dragEl, this.options.ghostClass, false);
					_toggleClass(dragEl, this.options.chosenClass, false);

					// Drag stop event
					_dispatchEvent(this, rootEl, 'unchoose', dragEl, rootEl, oldIndex);

					if (rootEl !== parentEl) {
						newIndex = _index(dragEl, options.draggable);

						if (newIndex >= 0) {
							// Add event
							_dispatchEvent(null, parentEl, 'add', dragEl, rootEl, oldIndex, newIndex);

							// Remove event
							_dispatchEvent(this, rootEl, 'remove', dragEl, rootEl, oldIndex, newIndex);

							// drag from one list and drop into another
							_dispatchEvent(null, parentEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
							_dispatchEvent(this, rootEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
						}
					}
					else {
						if (dragEl.nextSibling !== nextEl) {
							// Get the index of the dragged element within its parent
							newIndex = _index(dragEl, options.draggable);

							if (newIndex >= 0) {
								// drag & drop within the same list
								_dispatchEvent(this, rootEl, 'update', dragEl, rootEl, oldIndex, newIndex);
								_dispatchEvent(this, rootEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
							}
						}
					}

					if (Sortable.active) {
						/* jshint eqnull:true */
						if (newIndex == null || newIndex === -1) {
							newIndex = oldIndex;
						}

						_dispatchEvent(this, rootEl, 'end', dragEl, rootEl, oldIndex, newIndex);

						// Save sorting
						this.save();
					}
				}

			}

			this._nulling();
		},

		_nulling: function() {
			rootEl =
			dragEl =
			parentEl =
			ghostEl =
			nextEl =
			cloneEl =
			lastDownEl =

			scrollEl =
			scrollParentEl =

			tapEvt =
			touchEvt =

			moved =
			newIndex =

			lastEl =
			lastCSS =

			putSortable =
			activeGroup =
			Sortable.active = null;

			savedInputChecked.forEach(function (el) {
				el.checked = true;
			});
			savedInputChecked.length = 0;
		},

		handleEvent: function (/**Event*/evt) {
			switch (evt.type) {
				case 'drop':
				case 'dragend':
					this._onDrop(evt);
					break;

				case 'dragover':
				case 'dragenter':
					if (dragEl) {
						this._onDragOver(evt);
						_globalDragOver(evt);
					}
					break;

				case 'selectstart':
					evt.preventDefault();
					break;
			}
		},


		/**
		 * Serializes the item into an array of string.
		 * @returns {String[]}
		 */
		toArray: function () {
			var order = [],
				el,
				children = this.el.children,
				i = 0,
				n = children.length,
				options = this.options;

			for (; i < n; i++) {
				el = children[i];
				if (_closest(el, options.draggable, this.el)) {
					order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
				}
			}

			return order;
		},


		/**
		 * Sorts the elements according to the array.
		 * @param  {String[]}  order  order of the items
		 */
		sort: function (order) {
			var items = {}, rootEl = this.el;

			this.toArray().forEach(function (id, i) {
				var el = rootEl.children[i];

				if (_closest(el, this.options.draggable, rootEl)) {
					items[id] = el;
				}
			}, this);

			order.forEach(function (id) {
				if (items[id]) {
					rootEl.removeChild(items[id]);
					rootEl.appendChild(items[id]);
				}
			});
		},


		/**
		 * Save the current sorting
		 */
		save: function () {
			var store = this.options.store;
			store && store.set(this);
		},


		/**
		 * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
		 * @param   {HTMLElement}  el
		 * @param   {String}       [selector]  default: `options.draggable`
		 * @returns {HTMLElement|null}
		 */
		closest: function (el, selector) {
			return _closest(el, selector || this.options.draggable, this.el);
		},


		/**
		 * Set/get option
		 * @param   {string} name
		 * @param   {*}      [value]
		 * @returns {*}
		 */
		option: function (name, value) {
			var options = this.options;

			if (value === void 0) {
				return options[name];
			} else {
				options[name] = value;

				if (name === 'group') {
					_prepareGroup(options);
				}
			}
		},


		/**
		 * Destroy
		 */
		destroy: function () {
			var el = this.el;

			el[expando] = null;

			_off(el, 'mousedown', this._onTapStart);
			_off(el, 'touchstart', this._onTapStart);
			_off(el, 'pointerdown', this._onTapStart);

			if (this.nativeDraggable) {
				_off(el, 'dragover', this);
				_off(el, 'dragenter', this);
			}

			// Remove draggable attributes
			Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
				el.removeAttribute('draggable');
			});

			touchDragOverListeners.splice(touchDragOverListeners.indexOf(this._onDragOver), 1);

			this._onDrop();

			this.el = el = null;
		}
	};


	function _cloneHide(sortable, state) {
		if (sortable.lastPullMode !== 'clone') {
			state = true;
		}

		if (cloneEl && (cloneEl.state !== state)) {
			_css(cloneEl, 'display', state ? 'none' : '');

			if (!state) {
				if (cloneEl.state) {
					if (sortable.options.group.revertClone) {
						rootEl.insertBefore(cloneEl, nextEl);
						sortable._animate(dragEl, cloneEl);
					} else {
						rootEl.insertBefore(cloneEl, dragEl);
					}
				}
			}

			cloneEl.state = state;
		}
	}


	function _closest(/**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx) {
		if (el) {
			ctx = ctx || document;

			do {
				if ((selector === '>*' && el.parentNode === ctx) || _matches(el, selector)) {
					return el;
				}
				/* jshint boss:true */
			} while (el = _getParentOrHost(el));
		}

		return null;
	}


	function _getParentOrHost(el) {
		var parent = el.host;

		return (parent && parent.nodeType) ? parent : el.parentNode;
	}


	function _globalDragOver(/**Event*/evt) {
		if (evt.dataTransfer) {
			evt.dataTransfer.dropEffect = 'move';
		}
		evt.preventDefault();
	}


	function _on(el, event, fn) {
		el.addEventListener(event, fn, captureMode);
	}


	function _off(el, event, fn) {
		el.removeEventListener(event, fn, captureMode);
	}


	function _toggleClass(el, name, state) {
		if (el) {
			if (el.classList) {
				el.classList[state ? 'add' : 'remove'](name);
			}
			else {
				var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
				el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
			}
		}
	}


	function _css(el, prop, val) {
		var style = el && el.style;

		if (style) {
			if (val === void 0) {
				if (document.defaultView && document.defaultView.getComputedStyle) {
					val = document.defaultView.getComputedStyle(el, '');
				}
				else if (el.currentStyle) {
					val = el.currentStyle;
				}

				return prop === void 0 ? val : val[prop];
			}
			else {
				if (!(prop in style)) {
					prop = '-webkit-' + prop;
				}

				style[prop] = val + (typeof val === 'string' ? '' : 'px');
			}
		}
	}


	function _find(ctx, tagName, iterator) {
		if (ctx) {
			var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;

			if (iterator) {
				for (; i < n; i++) {
					iterator(list[i], i);
				}
			}

			return list;
		}

		return [];
	}



	function _dispatchEvent(sortable, rootEl, name, targetEl, fromEl, startIndex, newIndex) {
		sortable = (sortable || rootEl[expando]);

		var evt = document.createEvent('Event'),
			options = sortable.options,
			onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);

		evt.initEvent(name, true, true);

		evt.to = rootEl;
		evt.from = fromEl || rootEl;
		evt.item = targetEl || rootEl;
		evt.clone = cloneEl;

		evt.oldIndex = startIndex;
		evt.newIndex = newIndex;

		rootEl.dispatchEvent(evt);

		if (options[onName]) {
			options[onName].call(sortable, evt);
		}
	}


	function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvt, willInsertAfter) {
		var evt,
			sortable = fromEl[expando],
			onMoveFn = sortable.options.onMove,
			retVal;

		evt = document.createEvent('Event');
		evt.initEvent('move', true, true);

		evt.to = toEl;
		evt.from = fromEl;
		evt.dragged = dragEl;
		evt.draggedRect = dragRect;
		evt.related = targetEl || toEl;
		evt.relatedRect = targetRect || toEl.getBoundingClientRect();
		evt.willInsertAfter = willInsertAfter;

		fromEl.dispatchEvent(evt);

		if (onMoveFn) {
			retVal = onMoveFn.call(sortable, evt, originalEvt);
		}

		return retVal;
	}


	function _disableDraggable(el) {
		el.draggable = false;
	}


	function _unsilent() {
		_silent = false;
	}


	/** @returns {HTMLElement|false} */
	function _ghostIsLast(el, evt) {
		var lastEl = el.lastElementChild,
			rect = lastEl.getBoundingClientRect();

		// 5 — min delta
		// abs — нельзя добавлять, а то глюки при наведении сверху
		return (evt.clientY - (rect.top + rect.height) > 5) ||
			(evt.clientX - (rect.left + rect.width) > 5);
	}


	/**
	 * Generate id
	 * @param   {HTMLElement} el
	 * @returns {String}
	 * @private
	 */
	function _generateId(el) {
		var str = el.tagName + el.className + el.src + el.href + el.textContent,
			i = str.length,
			sum = 0;

		while (i--) {
			sum += str.charCodeAt(i);
		}

		return sum.toString(36);
	}

	/**
	 * Returns the index of an element within its parent for a selected set of
	 * elements
	 * @param  {HTMLElement} el
	 * @param  {selector} selector
	 * @return {number}
	 */
	function _index(el, selector) {
		var index = 0;

		if (!el || !el.parentNode) {
			return -1;
		}

		while (el && (el = el.previousElementSibling)) {
			if ((el.nodeName.toUpperCase() !== 'TEMPLATE') && (selector === '>*' || _matches(el, selector))) {
				index++;
			}
		}

		return index;
	}

	function _matches(/**HTMLElement*/el, /**String*/selector) {
		if (el) {
			selector = selector.split('.');

			var tag = selector.shift().toUpperCase(),
				re = new RegExp('\\s(' + selector.join('|') + ')(?=\\s)', 'g');

			return (
				(tag === '' || el.nodeName.toUpperCase() == tag) &&
				(!selector.length || ((' ' + el.className + ' ').match(re) || []).length == selector.length)
			);
		}

		return false;
	}

	function _throttle(callback, ms) {
		var args, _this;

		return function () {
			if (args === void 0) {
				args = arguments;
				_this = this;

				setTimeout(function () {
					if (args.length === 1) {
						callback.call(_this, args[0]);
					} else {
						callback.apply(_this, args);
					}

					args = void 0;
				}, ms);
			}
		};
	}

	function _extend(dst, src) {
		if (dst && src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) {
					dst[key] = src[key];
				}
			}
		}

		return dst;
	}

	function _clone(el) {
		return $
			? $(el).clone(true)[0]
			: (Polymer && Polymer.dom
				? Polymer.dom(el).cloneNode(true)
				: el.cloneNode(true)
			);
	}

	function _saveInputCheckedState(root) {
		var inputs = root.getElementsByTagName('input');
		var idx = inputs.length;

		while (idx--) {
			var el = inputs[idx];
			el.checked && savedInputChecked.push(el);
		}
	}

	// Fixed #973: 
	_on(document, 'touchmove', function (evt) {
		if (Sortable.active) {
			evt.preventDefault();
		}
	});

	try {
		window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
			get: function () {
				captureMode = {
					capture: false,
					passive: false
				};
			}
		}));
	} catch (err) {}

	// Export utils
	Sortable.utils = {
		on: _on,
		off: _off,
		css: _css,
		find: _find,
		is: function (el, selector) {
			return !!_closest(el, selector, el);
		},
		extend: _extend,
		throttle: _throttle,
		closest: _closest,
		toggleClass: _toggleClass,
		clone: _clone,
		index: _index
	};


	/**
	 * Create sortable instance
	 * @param {HTMLElement}  el
	 * @param {Object}      [options]
	 */
	Sortable.create = function (el, options) {
		return new Sortable(el, options);
	};


	// Export
	Sortable.version = '1.6.0';
	return Sortable;
});


/***/ })
/******/ ]);
/**
 *  Name : pivotData.js
 *  Explain : 
 * 
 */
var Aggregator = require('./aggregator'),
    Lib = require('./lib'),
    Renderer = require('./renderer');


var PivotData = module.exports = function PivotData(input, opts) {
    var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9;

    if (opts == null) {
        opts = {};
    }
    
    this.getAggregator = bind(this.getAggregator, this);
    this.getRowKeys = bind(this.getRowKeys, this);
    this.getColKeys = bind(this.getColKeys, this);
    this.sortKeys = bind(this.sortKeys, this);
    this.arrSort = bind(this.arrSort, this);
    this.input = input;
    this.aggregator = (ref = opts.aggregator) != null ? ref : Aggregator.count()();
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

    PivotData.forEachRecord(this.input, this.derivedAttributes, (function(_this) {
        return function(record) {
            if (_this.filter(record)) {
                return _this.processRecord(record);
            }
        };
    })(this));
}

PivotData.forEachRecord = function(input, derivedAttributes, f) {
    var addRecord, compactRecord, 
        i, j, k, l, 
        len1, record, ref, results, results1, tblCols;

    if (Lib.isEmptyObject(derivedAttributes)) {
        addRecord = f;
    } else {
        addRecord = function(record) {
            var k, ref, v;
            for (k in derivedAttributes) {
                v = derivedAttributes[k];
                record[k] = (ref = v(record)) != null ? ref : record[k];
            }
            return f(record);
        };
    }
    if (Lib.isFunction(input)) {
        return input(addRecord);
    } else if (Lib.isArray(input)) {
        if (Lib.isArray(input[0])) {
            results = [];
            for (i in input) {
                if (!hasProp.call(input, i)) continue;
                
                compactRecord = input[i];
                
                if (!(i > 0)) {
                    continue;
                }
                
                record = {};
                ref = input[0];
                
                for (j in ref) {
                    if (!hasProp.call(ref, j)) continue;
                    k = ref[j];
                    record[k] = compactRecord[j];
                }
                results.push(addRecord(record));
            }
            return results;
        } else {
            results1 = [];
            
            for (l = 0, len1 = input.length; l < len1; l++) {
                record = input[l];
                results1.push(addRecord(record));
            }

            return results1;
        }
    } else {
        throw new Error("unknown input format");
    }
};

PivotData.prototype.forEachMatchingRecord = function(criteria, callback) {
    return PivotData.forEachRecord(this.input, this.derivedAttributes, (function(_this) {
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
    })(this));
};

PivotData.prototype.arrSort = function(attrs) {
    var a, sortersArr;
    sortersArr = (function() {
        var l, len1, results;
        results = [];
        for (l = 0, len1 = attrs.length; l < len1; l++) {
            a = attrs[l];
            results.push(getSort(this.sorters, a));
        }
        return results;
    }).call(this);
    return function(a, b) {
        var comparison, i, sorter;
        for (i in sortersArr) {
            if (!hasProp.call(sortersArr, i)) continue;
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
                        return naturalSort(v(a, []), v(b, []));
                    };
                })(this));
                break;
            case "value_z_to_a":
                this.rowKeys.sort((function(_this) {
                    return function(a, b) {
                        return -naturalSort(v(a, []), v(b, []));
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
                        return naturalSort(v([], a), v([], b));
                    };
                })(this));
            case "value_z_to_a":
                return this.colKeys.sort((function(_this) {
                    return function(a, b) {
                        return -naturalSort(v([], a), v([], b));
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
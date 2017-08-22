/**
 *  Name : renderer.basic.js
 *  Explain : 
 * 
 */

var Locales = require('../locales'),
    Lib = require('../lib');

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
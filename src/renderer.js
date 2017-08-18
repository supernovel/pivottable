/**
 *  Name : renderer.js
 *  Explain : 
 * 
 */

var Default = require('./default'),
    Locales = require('./locales'),
    Lib = require('./lib');

var Renderer = module.exports = {
    makeLocaleRenderer: makeLocaleRenderer
}

var BaseRenderer =  {
    table: function(data, opts) {
        return pivotTableRenderer(data, opts);
    }
    /*tableBar: function(data, opts) {
        return $(pivotTableRenderer(data, opts)).barchart();
    },
    heatmap: function(data, opts) {
        return $(pivotTableRenderer(data, opts)).heatmap("heatmap", opts);
    },
    rowHeatmap: function(data, opts) {
        return $(pivotTableRenderer(data, opts)).heatmap("rowheatmap", opts);
    },
    colHeatmap: function(data, opts) {
        return $(pivotTableRenderer(data, opts)).heatmap("colheatmap", opts);
    }
    */
};

/**
 * makeLocaleRenderer
 * locale에 따라 이름을 적용한 오브젝트를 반환
 * 
 * @param {*} locale 
 */
function makeLocaleRenderer(locale){
    var localeTextEn = Locales.en.renderers,
        localeTextUser = Locales[locale].renderers,
        localeRenderer = {};

    for(var key in BaseRenderer){
        localeRenderer[key] = {
            fn: BaseRenderer[key],
            name: localeTextUser[key] || localeTextEn[key]
        }
    }

    return localeRenderer;
}

/**
 * pivotTableRenderer
 * 
 * @param {*} pivotData 
 * @param {*} opts 
 */

function pivotTableRenderer(pivotData, opts) {
    var aggregator, 
        c, colAttrs, colKey, colKeys, 
        defaults, 
        getClickHandler, 
        i, j, r, result, 
        rowAttrs, rowKey, rowKeys, 
        spanSize, tbody, td, th, thead, 
        totalAggregator, tr, txt, val, x;
    
    opts = Lib.deepExtend({}, Default.PivotTableRendererOpts, opts);
    
    colAttrs = pivotData.colAttrs;
    rowAttrs = pivotData.rowAttrs;
    rowKeys = pivotData.getRowKeys();
    colKeys = pivotData.getColKeys();
    
    if (opts.table.clickCallback) {
        getClickHandler = function(value, rowValues, colValues) {
            var attr, filters, i;
            
            filters = {};
            
            for (i in colAttrs) {
                if (!hasProp.call(colAttrs, i)) continue;
                attr = colAttrs[i];
                if (colValues[i] != null) {
                    filters[attr] = colValues[i];
                }
            }
            for (i in rowAttrs) {
                if (!hasProp.call(rowAttrs, i)) continue;
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
        if (!hasProp.call(colAttrs, j)) continue;
        
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
            if (!hasProp.call(colKeys, i)) continue;
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
            if (!hasProp.call(rowAttrs, i)) continue;
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
        if (!hasProp.call(rowKeys, i)) continue;
        
        rowKey = rowKeys[i];
        tr = document.createElement("tr");
       
        for (j in rowKey) {
            if (!hasProp.call(rowKey, j)) continue;
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
            if (!hasProp.call(colKeys, j)) continue;
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
        if (!hasProp.call(colKeys, j)) continue;
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
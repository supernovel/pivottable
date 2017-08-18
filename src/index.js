/**
 *  Name : index.js
 *  Explain : 
 * 
 */

var Default = require('./default'),
    Lib = require('./lib'),
    Locales = require('./locales'),
    PivotData = require('./pivotData');

var Pivot = module.export = {};


var hasProp = {}.hasOwnProperty;

/**
 * makePivot()
 * 피봇을 작성합니다.
 *
 * @type {Function}
 * 
 * @param {Object} options {
 *      target: 타켓 엘리먼트
 *      data: 데이터,
 *      dataOpts: 데이터 옵션,
 *      overwrite: 덮어쓰기,
 *      locale: 언어
 * }
 * 
 * @return {Element}
 */

Pivot.makePivot = function makePivot(options) {
    options = options || {};

    var target = options.target,
        data = options.data,
        dataOpts = options.dataOpts,
        overwrite = options.overwrite,
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
        container.locale = 'en';
    } else {
        container.locale = locale;
    }

    dataOpts = container.dataOpts = container.dataOpts || Lib.deepExtend(
        {},
        localeOpts(container.locale),
        Default.dataOpts(container.locale),
        dataOpts
    )

    container.__pivotInput__ = options;

    try {
        var attrValues = {},
            materializedInput = [],
            recordsProcessed = 0;

        PivotData.forEachRecord(data, dataOpts.derivedAttributes, function(record) {
            var base, ref, value;
            
            if (!options.filter(record)) {
                return;
            }
            
            materializedInput.push(record);
            
            for(var attr in record) {
                if (!hasProp.call(record, attr)) continue;
                if (attrValues[attr] == null) {
                    attrValues[attr] = {};
                    if (recordsProcessed > 0) {
                        attrValues[attr]["null"] = recordsProcessed;
                    }
                }
            }
            for(var attr in attrValues) {
                value = (ref = record[attr]) != null ? ref : "null";
                if ((base = attrValues[attr])[value] == null) {
                    base[value] = 0;
                }
                attrValues[attr][value]++;
            }

            return recordsProcessed++;
        });

        //테이블 그리기

        
        var refresh; /*= (function(_this) {            line:696
            return function() {
                pivotTable.css("opacity", 0.5);
                return setTimeout(refreshDelayed, 10);
            };
        })(this);*/

        var uiTable = document.createElement("table")
                              .addClass('pvtUi');

        target.appendChild(uiTable);

        var rendererControl = document.createElement("td");
            renderer = document.createElement("select")
                               .addClass('pvtRenderer');
            
        rendererControl.appendChild(renderer);
        
        renderer.onchange = function(){
            return refresh();
        };


        var ref = dataOpts.renderers;

        for (var x in ref) {
            if (!hasProp.call(ref, x)) continue;
            var options = document.createElement("option");

            options.value = x;
            options.innerHTML = x;

            renderer.appendChild();
        }

        var unused = document.createElement('td').addClass('pvtAxisContainer pvtUnused');
       
        var shownAttributes = (function() {
            var results;
            results = [];
            for (var a in attrValues) {
                if (indexOf.call(dataOpts.hiddenAttributes, a) < 0) {
                    results.push(a);
                }
            }
            return results;
        })();

        var unusedAttrsVerticalAutoOverride = false;

        if (dataOpts.unusedAttrsVertical === "auto") {
            unusedAttrsVerticalAutoCutoff = 120;
        } else {
            unusedAttrsVerticalAutoCutoff = parseInt(dataOpts.unusedAttrsVertical);
        }
        
        if (!isNaN(unusedAttrsVerticalAutoCutoff)) {
            var attrLength = 0;
            
            for(var l = 0, len1 = shownAttributes.length; l < len1; l++) {
                var a = shownAttributes[l];
                attrLength += a.length;
            }
            
            unusedAttrsVerticalAutoOverride = attrLength > unusedAttrsVerticalAutoCutoff;
        }
        
        if (dataOpts.unusedAttrsVertical === true || unusedAttrsVerticalAutoOverride) {
            unused.addClass('pvtVertList');
        } else {
            unused.addClass('pvtHorizList');
        }

        var fn1 = function(attr, i) {
            var values = (function() {
                var results;
                results = [];
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

            _span0.text(attr);
            _span1.text(["(",values.length,")"].join(''));

            _h0.appendChild(_span0);
            _h0.appendChild(_span1);
            
            valueList.appendChild(_h0);
            
            if (values.length > dataOpts.menuLimit) {
                var _p0 = document.createElement('p');

                _p0.innerHTML = dataOpts.localeStrings.tooMany;

                valueList.appendChild(_p0);
            } else {
                if (values.length > 5) {
                    var controls = document.createElement('p');
                        sorter = getSort(dataOpts.sorters, attr);
                        placeholder = dataOpts.localeStrings.filterResults;

                    valueList.appendChild(controls);

                    var _input0 = document.createElement('input')
                                          .addClass('pvtSearch');

                    _input0.type = 'text';
                    _input0.setAttribute('placeholder', placeholder);

                    _input0.onkeyup = function(){
                        var accept, accept_gen, filter;

                        filter = this.value.toLowerCase().trim();
                        
                        accept_gen = function(prefix, accepted) {
                            return function(v) {
                                var real_filter, ref1;
                                real_filter = filter.substring(prefix.length).trim();
                                if (real_filter.length === 0) {
                                    return true;
                                }
                                return ref1 = Math.sign(sorter(v.toLowerCase(), real_filter)), indexOf.call(accepted, ref1) >= 0;
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
                                     if (accept(node.text())) {
                                         return node.parentNode.parentNode.style.display='';
                                     } else {
                                         return node.parentNode.parentNode.style.display='none';
                                     }
                                 });

                        return false;
                    }

                    controls.appendChild(_input0);

                    var _br0 = document.createElement('br');

                    controls.appendChild(_br0);

                    var _button0 = document.createElement('button'),
                        _button1 = document.createElement('button');

                    _button0.type = _button1.type = 'button';

                    _button0.innerHTML = dataOpts.localeStrings.selectAll;
                    _button0.onclick = function() {
                        valueList.querySelectorAll("input:visible:not(:checked)")
                                 .forEach(function(node){
                                     node.checked = true;
                                     node.toggleClass('changed');
                                 });
                        return false;
                    };

                    _button1.innerHTML = dataOpts.localeStrings.selectNone;
                    _button1.onclick = function() {
                        valueList.querySelectorAll("input:visible:checked").forEach(function(node){
                            node.checked = false;
                            node.toggleClass('changed');
                        });
                        return false;
                    };

                    controls.appendChild(_button0);
                    controls.appendChild(_button1);
                }

                var checkContainer = document.createElement('div')
                                             .addClass("pvtCheckContainer");

                valueList.appendChild(checkContainer);

                var ref1 = values.sort(getSort(dataOpts.sorters, attr));

                for (var n = 0, len2 = ref1.length; n < len2; n++) {
                    var value = ref1[n],
                        valueCount = attrValues[attr][value],
                        filterItem = document.createElement('label'),
                        filterItemExcluded = false;
                    
                    if (dataOpts.inclusions[attr]) {
                        filterItemExcluded = (indexOf.call(dataOpts.inclusions[attr], value) < 0);
                    } else if (dataOpts.exclusions[attr]) {
                        filterItemExcluded = (indexOf.call(dataOpts.exclusions[attr], value) >= 0);
                    }

                    hasExcludedItem || (hasExcludedItem = filterItemExcluded);
                    
                    var _input1 = document.createElement('input')
                                          .addClass('pvtFilter')
                    
                    _input1.type = 'checkbox';
                    _input1.setAttribute('checked', !filterItemExcluded);
                    _input1.setAttribute('data-filter', [attr, value]);

                    _input1.onchange = function(){
                        return this.toggleClass("changed");
                    }

                    filterItem.appendChild(_input1);
                    
                    var _span2 = document.createElement('span')
                                         .addClass('value')
                                         .text(value),
                        _span3 = document.createElement('span')
                                         .addClass('count')
                                         .text(["(",valueCount,")"].join(''));
                    
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
                                 .text(attr);
                                 
            _span4.setAttribute('data-attrName', attr);

            _span4.appendChild(triangleLink);
            attrElem.appendChild(_span4);

            if (hasExcludedItem) {
                attrElem.addClass('pvtFilteredAttribute');
            }

            var closeFilterBox = function() {
                var _notChecked = valueList.querySelectorAll("[type='checkbox']"),
                    _checked = valueList.querySelectorAll("[type='checkbox']:checked"),
                    _pvtSearch = valueList.querySelectorAll(".pvtSearch"),
                    _pvtCheckContainer = valueList.querySelectorAll(".pvtCheckContainer p");



                if (_notChecked.length > _checked.length) {
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

            if (values.length <= dataOpts.menuLimit) {
                var _button2 = document.createElement('button')
                                       .text(dataOpts.localeStrings.apply);

                _button2.type = 'button';
                _button2.onclick = function(){
                    var _changed = valueList.querySelectorAll(".changed");

                    _changed.forEach(function(node){
                        node.removeClass('changed');
                    })

                    if (_changed.length) {
                        refresh();
                    }

                    return closeFilterBox();
                }

                finalButtons.appendChild(_button2);
            }

            var _button3 = document.createElement('button')
                                   .text(dataOpts.localeStrings.cancel);

            _button3.type = 'button';
            _button3.onclick = function(){
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

            unused.appendChild(attrElem);
            unused.appendChild(valueList);
        };

        for(var i in shownAttributes) {
            if (!hasProp.call(shownAttributes, i)) continue;
            fn1(shownAttributes[i], i);
        }

        var tr1 = document.createElement('tr');
        
        uiTable.appendChild(tr1);

        var aggregator = document.createElement('select')
                                 .addClass('pvtAggregator');
        
        aggregator.onchange = function() {
            return refresh();
        };

        var ref1 = dataOpts.aggregators;


        for(var x in ref1) {
            if (!hasProp.call(ref1, x)) continue;

            var _option0 = document.createElement('option');

            _option0.value = _option0.innerHTML = x;

            aggregator.appendChild(_option0);
        }

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
        rowOrderArrow.setAttribute('data-order',dataOpts.rowOrder);
        rowOrderArrow.innerHTML = ordering[dataOpts.rowOrder].rowSymbol;
        rowOrderArrow.onclick = function(){
            this.setAttribute('data-order', ordering[$(this).data("order")].next);
            this.innerHTML = ordering[$(this).data("order")].rowSymbol;
            
            return refresh();
        }

        var colOrderArrow = document.createElement('a')
                                    .addClass('pvtColOrder');
        
        colOrderArrow.setAttribute('role','button');
        colOrderArrow.setAttribute('data-order',dataOpts.colOrder);
        colOrderArrow.innerHTML = ordering[dataOpts.colOrder].colSymbol;
        colOrderArrow.onclick = function(){
            this.setAttribute('data-order', ordering[$(this).data("order")].next);
            this.innerHTML = ordering[$(this).data("order")].colSymbol;
            
            return refresh();
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        tr2.append($("<td>").addClass('pvtAxisContainer pvtRows').attr("valign", "top"));
        
        var pivotTable = $("<td>").attr("valign", "top").addClass('pvtRendererArea').appendTo(tr2);
        
        if (dataOpts.unusedAttrsVertical === true || unusedAttrsVerticalAutoOverride) {
            uiTable.find('tr:nth-child(1)').prepend(rendererControl);
            uiTable.find('tr:nth-child(2)').prepend(unused);
        } else {
            uiTable.prepend($("<tr>").append(rendererControl).append(unused));
        }
        
        this.html(uiTable);
        
        var ref2 = dataOpts.cols;
        
        for (n = 0, len2 = ref2.length; n < len2; n++) {
            x = ref2[n];
            this.find(".pvtCols").append(this.find(".axis_" + ($.inArray(x, shownAttributes))));
        }
        
        var ref3 = dataOpts.rows;
        
        for (o = 0, len3 = ref3.length; o < len3; o++) {
            x = ref3[o];
            this.find(".pvtRows").append(this.find(".axis_" + ($.inArray(x, shownAttributes))));
        }
        
        if (dataOpts.aggregatorName != null) {
            this.find(".pvtAggregator").val(dataOpts.aggregatorName);
        }

        if (dataOpts.rendererName != null) {
            this.find(".pvtRenderer").val(dataOpts.rendererName);
        }

        var initialRender = true;
        var refreshDelayed = (function(_this) {
            return function() {
                var exclusions, inclusions, len4, newDropdown, numInputsToProcess, pivotUIOptions, pvtVals, ref4, ref5, subopts, t, u, unusedAttrsContainer, vals;
                subopts = {
                derivedAttributes: dataOpts.derivedAttributes,
                localeStrings: dataOpts.localeStrings,
                rendererOptions: dataOpts.rendererOptions,
                sorters: dataOpts.sorters,
                cols: [],
                rows: [],
                dataClass: dataOpts.dataClass
                };
                numInputsToProcess = (ref4 = dataOpts.aggregators[aggregator.val()]([])().numInputs) != null ? ref4 : 0;
                vals = [];
                _this.find(".pvtRows li span.pvtAttr").each(function() {
                return subopts.rows.push($(this).data("attrName"));
                });
                _this.find(".pvtCols li span.pvtAttr").each(function() {
                return subopts.cols.push($(this).data("attrName"));
                });
                _this.find(".pvtVals select.pvtAttrDropdown").each(function() {
                if (numInputsToProcess === 0) {
                    return $(this).remove();
                } else {
                    numInputsToProcess--;
                    if ($(this).val() !== "") {
                    return vals.push($(this).val());
                    }
                }
                });
                if (numInputsToProcess !== 0) {
                pvtVals = _this.find(".pvtVals");
                for (x = t = 0, ref5 = numInputsToProcess; 0 <= ref5 ? t < ref5 : t > ref5; x = 0 <= ref5 ? ++t : --t) {
                    newDropdown = $("<select>").addClass('pvtAttrDropdown').append($("<option>")).bind("change", function() {
                    return refresh();
                    });
                    for (u = 0, len4 = shownAttributes.length; u < len4; u++) {
                    attr = shownAttributes[u];
                    newDropdown.append($("<option>").val(attr).text(attr));
                    }
                    pvtVals.append(newDropdown);
                }
                }
                if (initialRender) {
                vals = dataOpts.vals;
                i = 0;
                _this.find(".pvtVals select.pvtAttrDropdown").each(function() {
                    $(this).val(vals[i]);
                    return i++;
                });
                initialRender = false;
                }
                subopts.aggregatorName = aggregator.val();
                subopts.vals = vals;
                subopts.aggregator = dataOpts.aggregators[aggregator.val()](vals);
                subopts.renderer = dataOpts.renderers[renderer.val()];
                subopts.rowOrder = rowOrderArrow.data("order");
                subopts.colOrder = colOrderArrow.data("order");
                exclusions = {};
                _this.find('input.pvtFilter').not(':checked').each(function() {
                var filter;
                filter = $(this).data("filter");
                if (exclusions[filter[0]] != null) {
                    return exclusions[filter[0]].push(filter[1]);
                } else {
                    return exclusions[filter[0]] = [filter[1]];
                }
                });
                inclusions = {};
                _this.find('input.pvtFilter:checked').each(function() {
                var filter;
                filter = $(this).data("filter");
                if (exclusions[filter[0]] != null) {
                    if (inclusions[filter[0]] != null) {
                    return inclusions[filter[0]].push(filter[1]);
                    } else {
                    return inclusions[filter[0]] = [filter[1]];
                    }
                }
                });
                subopts.filter = function(record) {
                var excludedItems, k, ref6, ref7;
                if (!dataOpts.filter(record)) {
                    return false;
                }
                for (k in exclusions) {
                    excludedItems = exclusions[k];
                    if (ref6 = "" + ((ref7 = record[k]) != null ? ref7 : 'null'), indexOf.call(excludedItems, ref6) >= 0) {
                    return false;
                    }
                }
                return true;
                };
                pivotTable.pivot(materializedInput, subopts);
                pivotUIOptions = $.extend({}, dataOpts, {
                cols: subopts.cols,
                rows: subopts.rows,
                colOrder: subopts.colOrder,
                rowOrder: subopts.rowOrder,
                vals: vals,
                exclusions: exclusions,
                inclusions: inclusions,
                inclusionsInfo: inclusions,
                aggregatorName: aggregator.val(),
                rendererName: renderer.val()
                });
                _this.data("pivotUIOptions", pivotUIOptions);
                if (dataOpts.autoSortUnusedAttrs) {
                unusedAttrsContainer = _this.find("td.pvtUnused.pvtAxisContainer");
                $(unusedAttrsContainer).children("li").sort(function(a, b) {
                    return naturalSort($(a).text(), $(b).text());
                }).appendTo(unusedAttrsContainer);
                }
                pivotTable.css("opacity", 1);
                if (dataOpts.onRefresh != null) {
                return dataOpts.onRefresh(pivotUIOptions);
                }
            };
        })(this);
       
        refresh = (function(_this) {
            return function() {
                pivotTable.css("opacity", 0.5);
                return setTimeout(refreshDelayed, 10);
            };
        })(this);

        refresh();
        
        this.find(".pvtAxisContainer").sortable({
            update: function(e, ui) {
                if (ui.sender == null) {
                    return refresh();
                }
            },
            connectWith: this.find(".pvtAxisContainer"),
            items: 'li',
            placeholder: 'pvtPlaceholder'
        });
    } catch (_error) {
        e = _error;
        if (typeof console !== "undefined" && console !== null) {
            console.error(e.stack);
        }
        this.html(dataOpts.localeStrings.uiRenderError);
    }
}
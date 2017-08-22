/**
 *  Name : core.js
 *  Explain : 
 * 
 */

var Default = require('./default'),
    Lib = require('./lib'),
    Locales = require('./locales'),
    PivotData = require('./pivotData'),
    Sortable = require('sortablejs');

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
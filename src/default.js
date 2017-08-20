/**
 *  Name : default.js
 *  Explain : 
 * 
 */
var Aggregator = require('./aggregator'),
    Lib = require('./lib'),
    Locales = require('./locales'),
    Renderer = require('./renderer'),
    PivotData = require('./pivotData');
    

var Default = module.exports = {};


Default.dataOpts = function(locale, uiFlag){
    if(uiFlag){
        return {
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
            sorters: {}
        }
    }else{
        return {
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
        rendererOptions: {
            localeStrings: localeStrings
        },
        localeStrings: localeStrings
    }
};
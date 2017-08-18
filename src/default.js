/**
 *  Name : default.js
 *  Explain : 
 * 
 */
var Aggregator = require('./aggregator'),
    Lib = require('./lib'),
    Locales = require('./locales'),
    Renderer = require('./renderer');
    

var Default = module.exports = {};


Default.dataOpts = function(locale){
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
}

Default.localeOpts = function(locale){
    var localeStrings = Lib.deepExtend(
        {},
        Locales[locale].localeStrings, 
        Locales.en.localeStrings
    );

    return {
        rendererOptions: {
            localeStrings: localeStrings
        },
        localeStrings: localeStrings
    }
}

Default.PivotTableRendererOpts = {
    table: {
        clickCallback: null
    },
    localeStrings: {
        totals: Locales.en.localeStrings.totals
    }
}
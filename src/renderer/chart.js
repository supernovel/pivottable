/**
 *  Name : renderer.chart.js
 *  Explain : 
 * 
 */

var Lib = require('../lib');

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
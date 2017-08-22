/*
            FN  : Frontend.Cockpit.Graph.js
            DS  : ZSJApplication 에서의 Plot.ly 라이브러리 사용을 위한 래핑 모듈을 제공합니다.
            N   : 0.0.2
            A   : supernovel(barmherzig@mkpowered.pro),
                    Moonkak Lee(bramherzig@mkpowered.pro)
            L   : 모든 권한은 supernovel(supernovel@gmail.com)에 있습니다.
        */(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var plotlyAbs = require("./lib/plotlyAbs"),
    Constants = require("./lib/plotlyConstant"),
    Animation = require("./lib/plotlyAnimation");

window.ZSJPlot = module.exports = {
    Const : Constants.PLOT_DALT,
    Init : Init,
    API : plotlyAbs
}

function Init() {
    if (!window.Plotly) {
        console.log("plotly js가 먼저 선언되거나 존재 해야 합니다.");
        setTimeout(Init,1000);
        return;
    }

    Plotly.d3.selection.prototype.first = function() {
        return Plotly.d3.select(this[0][0]);
    };
    Plotly.d3.selection.prototype.last = function() {
        var last = this.size() - 1;
        return Plotly.d3.select(this[0][last]);
    };
    
    //Plotly.d3.customAnimation = Animation.customAnimation;
}
},{"./lib/plotlyAbs":2,"./lib/plotlyAnimation":3,"./lib/plotlyConstant":4}],2:[function(require,module,exports){
var Lib = require("./util"),
    Defaults = require("./plotlyDefault"),
    Constants = require("./plotlyConstant"),
    Animations = require("./plotlyAnimation"),
    Events = require("./plotlyEvent"),
    Utils = require("./plotlyUtil"),
    Datas = require("./plotlyData");

var plotlyAbs = function (parent, _options) {

    _options = _options || {};

    var self = this,
        axisCount = [0, 0];

    Lib.deepExtend(this,{
        plots : null,
        plotOption : {},
        redrawTimeout : null,
        resizeTimout : null,
        afterTimeout : null,
        insertTimes : 0,
        traceCount : 0,
        _animate : true,
        defaultAxis : {
            xaxis: {},
            yaxis: {}
        }
    });

    this.getAxisCount = function () {
        return axisCount;
    }
    this.setAxisCount = function (newAxisCount) {
        axisCount = newAxisCount;
    }

    //해당객체 관련 초기화 함수들 
    Lib.deepExtend(self.plotOption, Constants.PLOT_DALT, _options);

    self.plotOption.parent = parent;
};

//pltlyAbs.prototpye
plotlyAbs.prototype.setDefaltPlotEvent = Events.setDefaltPlotEvent;

plotlyAbs.prototype.setDefaltPlotCreate = Defaults.setDefaltPlotCreate;
plotlyAbs.prototype.setDefaltSubLayout = Defaults.setDefaltSubLayout;

plotlyAbs.prototype.setAnnotation = Utils.setAnnotation;
plotlyAbs.prototype.getXY = Utils.getXY;

plotlyAbs.prototype.insertPlot = Datas.insertPlot;
plotlyAbs.prototype.checkDuplicate = Datas.checkDuplicate;
plotlyAbs.prototype.prepData = Datas.prepData; 


plotlyAbs.prototype.getTraceCount = function () {
    return this.traceCount;
}

plotlyAbs.prototype.getGraphJson = function () {
    return Plotly.graphJson(this.plots);
}


plotlyAbs.prototype.resizePlot = function () {
    var plots = this.plots;

    if (plots) {
        Plotly.Plots.resize(plots);
    }
}

plotlyAbs.prototype.rangePlot = function (xRange, yRange) {
    var plots = this.plots,
        rangeOption = {};

    if(plots){
        var fullLayout = plots._fullLayout;

        for(key in fullLayout){
            if(key.match(/xaxis.*/)){
                var num = key.replace(/[^\d]/g,"");

                if (xRange && xRange.constructor == Array) {
                    rangeOption['xaxis'+ num +'.range'] = xRange;
                }
            }else if(key.match(/yaxis.*/)){
                var num = key.replace(/[^\d]/g,"");

                if (yRange && yRange.constructor == Array) {
                    rangeOption['yaxis'+ num +'.range'] = yRange;
                }
            }
        }

        Plotly.relayout(plots, rangeOption);
    }
}

plotlyAbs.prototype.addTraces = function (data) {
    if(data instanceof Object){
        if(data.name){
            var idx = this.checkDuplicate(data.name);
            if(idx === -1) Plotly.addTraces(this.plots, data);
        }
    }
}

plotlyAbs.prototype.deleteTraces = function (idx) {
    if(typeof idx === "string"){
        idx = this.checkDuplicate(idx);
    }

    if(idx > -1 && idx !== null && idx !== undefined){
        Plotly.deleteTraces(this.plots, idx)
    };
}

plotlyAbs.prototype.deleteAllTraces = function () {
    var plots = this.plots;

    plots.data = [];
    Plotly.redraw(plots);

    plots.emit('plotly_allerase');
}

plotlyAbs.prototype.extendTraces = function (idx,data) {
    if(typeof idx === "string"){
        idx = this.checkDuplicate(idx);
    }
    
    if(data instanceof Object && 
       idx > -1 && idx !== null && idx !== undefined){
        Plotly.extendTraces(this.plots, data, idx);
    }
}

plotlyAbs.prototype.prependTraces = function (idx,data) {
    if(typeof idx === "string"){
        idx = this.checkDuplicate(idx);
    }
    
    if(data instanceof Object && 
       idx > -1 && idx !== null && idx !== undefined){
        Plotly.prependTraces(this.plots, data, idx);
    }
}

plotlyAbs.prototype.setTitle = function (title) {
    var plots = this.plots;

    Plotly.relayout(this.plots,{title:title});
}

plotlyAbs.prototype.handlePlots = function (atsr, val) { //[atsr:val] : ["zoom" : "in" or "out" or "auto"],["fixedrange": "x" or "y"] 
    var plots = this.plots;
    var event = {
        currentTarget: {
            "getAttribute": function (string) {
                if (string == "data-attr") return atsr;
                else if (string == "data-val") return val;
            }
        }
    };

    Plotly.handleCartesian(plots, event);
}

plotlyAbs.prototype.relayoutPlot = function (options) {
    var plots = this.plots;
    Plotly.relayout(plots, options);
}

plotlyAbs.prototype.toggleEditable = function(){
    var plots = this.plots;

    plots._context.editable = !plots._context.editable;
    Plotly.redraw(plots);
};

plotlyAbs.prototype.toggleAnimation = function(){
    this._animate = !this._animate;
};

module.exports = plotlyAbs;
},{"./plotlyAnimation":3,"./plotlyConstant":4,"./plotlyData":5,"./plotlyDefault":6,"./plotlyEvent":7,"./plotlyUtil":9,"./util":10}],3:[function(require,module,exports){
var Constants = require("./plotlyConstant");

module.exports = {
    hoverPlotAnimate : hoverPlotAnimate,
    hoverAxisAnimate : hoverAxisAnimate,
    unhoverPlotAnimate : unhoverPlotAnimate,
    unhoverAxisAnimate : unhoverAxisAnimate,
    customAnimation : customAnimation
}

function hoverPlotAnimate(opts, fullData, parent) {
    if (opts.points[0].cxFinal) return;

    var baseX = opts.xvals[0];
    var translateVal = ["translate(-10,0)", "translate(10,0)"];

    for (var idx = 0; idx < opts.points.length; idx++) {
        var point = opts.points[idx];
        if (fullData[point.curveNumber].type == "scatter") {
            if (point.htx == undefined) continue;
            Plotly.d3.select(parent)
                .select(".main-svg")
                .append("circle")
                .attr("id", "lHvCircle")
                .attr("r", "3")
                .attr("fill", Plotly.customLib.tinycolor(fullData[point.curveNumber].line.color).darken(20).toString())
                .attr("transform", "translate(" + point.htx + "," + point.hty + ")")
                .transition("big").attr("r", "6").transition("small").attr("r", "3");
        } else if (fullData[point.curveNumber].type == "bar") {
            var bars = fullData[point.curveNumber]._DOM;
            if(bars[point.pointNumber]){
                bars[point.pointNumber].transition("barH").style("opacity", 0.5);
            }
        }
    }
}

function hoverAxisAnimate(opts){
    if(!opts.points || (opts.points.length == 0) || !opts.points[0].xaxis) return;
        
    var fontsize = opts.points["0"].xaxis.tickfont || "16px",
        point = opts.points[0];
        xa = opts.points[0].xaxis,
        ya = opts.points[0].yaxis;



    if(xa._tickLabels){
        xa._tickLabels.each(function(dt){
            var format = xa.type != "date" ? 
                Plotly.d3.format(xa.tickformat)(point.x) :
                Plotly.formatDate(xa.d2c(point.x),xa.tickformat)


            if(format == dt.text){
                Plotly.d3.select(this)
                            .select("text")
                            .transition()
                            .style("font-size", fontsize + 4)
                            .attr("filter","url(#solid)");
            }
        });
    }

    if(ya._tickLabels){
        ya._tickLabels.each(function(dt){
            if(Plotly.d3.format(ya.tickformat)(point.y) == dt.text){
                Plotly.d3.select(this)
                            .select("text")
                            .transition()
                            .style("font-size", fontsize + 4)
                            .attr("filter","url(#solid)");
            }
        });
    }
}

function unhoverPlotAnimate(opts, fullData) {
    if (opts.points[0].cxFinal) return;

    Plotly.d3.selectAll("#lHvCircle").remove();

    for (var idx = 0; idx < opts.points.length; idx++) {
        var point = opts.points[idx];
        if (fullData[point.curveNumber].type == "bar") {
            var bars = fullData[point.curveNumber]._DOM;
            if(bars[point.pointNumber]){
                bars[point.pointNumber].transition("barUH").style("opacity", 1);
            }
        }
    }
}

function unhoverAxisAnimate(opts){
    if(!opts.points || (opts.points.length == 0) || !opts.points[0].xaxis) return;

        var fontsize = opts.points["0"].xaxis.tickfont || "16px",
            xa = opts.points[0].xaxis,
            ya = opts.points[0].yaxis;

        if(xa._tickLabels){
            xa._tickLabels.each(function(dt){
                 var text = Plotly.d3.select(this)
                                     .select("text")
                                     .transition()
                                     .style("font-size", fontsize)
                                     .attr("filter",null);
            });
        }

        if(ya._tickLabels){
            ya._tickLabels.each(function(dt){
                 var text = Plotly.d3.select(this)
                                     .select("text")
                                     .transition()
                                     .style("font-size", fontsize)
                                     .attr("filter",null);
            });
        }
}

function initDrawTransition(node) {
    return node.transition("init")
        .duration(Constants.INIT_DELAY);
}

function customAnimation(element, value, options) {
    var type = options ? options.type || 'none' : 'none';

    switch (type) {
        case 'bar':
            var bar = element.append('path');
            if(options.orientation == "h"){ //x0,y0,x1,y1
                bar.attr('d', 'M' + value[0] + ',' + value[1] + 'V' + value[3] + 'H' + value[0] + 'V' + value[1] + 'Z');
            }else{
                bar.attr('d', 'M' + value[0] + ',' + value[1] + 'V' + value[1] + 'H' + value[2] + 'V' + value[1] + 'Z');
            }

            initDrawTransition(bar).attr('d', 'M' + value[0] + ',' + value[1] + 'V' + value[3] + 'H' + value[2] + 'V' + value[1] + 'Z');

            return true;
            break;
        case 'line':
            element.attr("d", value);

            var totalLength = element.node().getTotalLength();

            element.style('opacity', 0);

            initDrawTransition(element).style('opacity', 1);

            return true;
            break;
        default:
            break;
    }

    return false;
}
},{"./plotlyConstant":4}],4:[function(require,module,exports){
var defaultOption = {
    parent: "body",
    layout: {
        title: "untitle",
        titlevisible:false,
        titlefont: {
            color: "rgba(255,255,255,0)",
        },
        font:{
            family: "",
            size:12
        },
        bargroupaxis: false,
        barmode: "gruop",
        paper_bgcolor: "#FFFFFF",
        plot_bgcolor: "#FFFFFF",
        showlegend: true,
        hovermode:"x",
        hoverplace: "basic",
        hoverlabelvisible : false,
        dragmode: "pan",
        margin : {
            l: 50,
            r: 20,
            t: 20,
            b: 80,
            pad: 5,
        },
        xaxis: {
            title : "",
            titlevisible:false,
            showgrid: true,
            rangemode:"tozero",
            fixedrange: false,
            showticklabels: true,
            exponentformat : "KO"
        },
        yaxis: {
            title : "",
            titlevisible:false,
            showgrid: true,
            fixedrange: true,
            rangemode:"tozero",
            showticklabels: false,
            exponentformat : "KO"
        }
    },
    plotOpts: {
        editable: false,
        showTips: false,
        scrollZoom: true,
        displaylogo: false,
        modeBarButtonsToRemove: ["toImage", "sendDataToCloud", "zoom2d", /*"toggleSpikelines","hoverClosestCartesian", "hoverCompareCartesian",*/ "autoScale2d"],
    }
};

var Constants = module.exports = {
    //최상위 DOM
    TOP_DOM: "body",
    //init Animation options
    INIT_DELAY : 300,
    //init filter color
    FILTER_COLOR : "#000000",
    //ContextMenu options
    CONTEXTMENU:{
        WIDTH : 100,
        HEIGHT : 20,
        NUMS : 2,
        DFLT_ATTR : {
            get RECT(){
                return {
                    "x": "0",
                    "width": Constants.CONTEXTMENU.WIDTH,
                    "height": Constants.CONTEXTMENU.THEIGHT,
                    "stroke": "#000000",
                    "stroke-width": "1px",
                    "fill": "#FFFFFF"
                };
            },
            get TEXT(){
                return {
                    "x": Constants.CONTEXTMENU.WIDTH * 0.5,
                    "text-anchor": "middle",
                    "alignment-baseline":"central",
                    "height": Constants.CONTEXTMENU.HEIGHT,
                    "fill": "#000000"
                };
            }
        } 
    },
    PLOT_DALT : defaultOption
}
},{}],5:[function(require,module,exports){
var Lib = require("./util"),
    Types = require("./plotlyType");

module.exports = {
    insertPlot : insertPlot,
    checkDuplicate : checkDuplicate,
    prepData : prepData
}

function insertPlot(newDatas, options) {
    var plots = this.plots,
        timeout = 100;

    options = options || {};

    if (!newDatas) {
        console.log("데이터가 없습니다.");
        return;
    }

    if (newDatas.constructor != Array) {
        newDatas = [newDatas];
    }

    newDatas.forEach(function(newData) {
        newData = this.prepData(newData, options);

        if (newData.name) {
            if (!plots) {
                this.setDefaltPlotCreate(newData);
                this.setDefaltPlotEvent();
            } else {
                if (this.checkDuplicate(newData.name) == -1) {
                    if (["pie", "radar"].indexOf(newData.type) == -1) {
                        this.setDefaltSubLayout([newData.xaxis, newData.yaxis]);
                    }

                    var now = (new Date()).getTime();

                    if(this.insertTimes != 0){
                        timeout = this.insertTimes - now + 100;
                    }

                    this.insertTimes = now + timeout; 

                    this.traceCount++;

                    setTimeout(function(){
                        Plotly.addTraces(plots, newData);
                    },timeout);
                } else {
                    console.log("중복된 이름의 데이터는 무시됩니다. 주의하세요.");
                }
            }
        } else {
            console.log("데이터가 없거나 이름을 정하지 않았습니다.");
        }
    }, this);
};

function checkDuplicate(name) {
    var data = this.plots ? this.plots.data || [] : [];

    for (var idx = 0; idx < data.length; idx++) {
        if (data[idx].name == name) return idx;
    }
    return -1;
}

function prepData(rawData, options) {
    options = options || {};

    var plotAxis = this.getAxisCount(),
        plotDataLen = this.plots ? (this.plots.data || {
            length: 0
        }).length : 0,
        baseColor = Plotly.customLib.randomColor(.9);

    if (!rawData) {
        console.log("데이터가 없습니다.");
        return {};
    } else {
        var retData = new Types.PlotData();

        if (rawData.constructor == Object && (rawData.x || rawData.labels) && (rawData.y || rawData.values)) {
            Lib.deepExtend(retData,{
                    name: "noname" + (plotDataLen + 1),
                    marker : {
                        color : baseColor
                    }
                },
                rawData,
                options
            );

            if (retData.text && (retData.text.length > 0)){
                retData.textposition = (retData.type == "scatter") ? "top" : "auto";
                retData.mode = retData.mode + "+text";
            }
        } else {
            console.log(["데이터타입 및 데이터 내용을 확인해 주세요.",
                "아래 처럼 객체나 해당 객체의 배열로 해주세요.",
                "ex) {x:xdata,y:ydata} or {labels : ldata, values : vdata}",
                " or [{x:xdata,y:ydata},{x:xdata1,y:ydata2}...]."
            ].join("\n"));
            return {};
        }

        switch (retData.type) {
            case "pie":
                retData.textinfo = "label+percent";
            case "radar":
                break;
            case "scatter":
                retData = Lib.deepExtend({
                    //fill : "tozeroy",
                    //areacolor : Lib.svgGradationColor("#filterSVG", baseColor),
                    line : {
                        width : 1,
                        shape : "",
                        color : baseColor
                    }
                },
                retData);
                break;
            default:
                break;
        }

        if (!plotAxis[0]) {
            retData.xaxis = 'x';
            retData.yaxis = 'y';
            plotAxis[0] = 1;
            plotAxis[1] = 1;
        }

        if(retData.xaxis){
            if (retData.xaxis == "auto"){
                retData.xaxis = 'x' + (++(plotAxis[0]));
            }else if(retData.xaxis == "last"){
                 retData.xaxis = 'y' + plotAxis[0];
            }else if(plotAxis[0] < retData.xaxis[1]){
                plotAxis[0] = retData.xaxis[1];
            }else{
                retData.xaxis = retData.xaxis || 'x';
            }
        }else{
            retData.xaxis = 'x';
        }

        if(retData.yaxis){
            if (retData.yaxis == "auto") {
                retData.yaxis = 'y' + (++(plotAxis[1]));
            }else if (retData.yaxis == "last") {
                retData.yaxis = 'y' + plotAxis[1];
            }else if(plotAxis[1] < retData.yaxis[1]){
                plotAxis[1] = retData.yaxis[1];
            }else{
                retData.yaxis = retData.yaxis || 'y';
            }
        }else{
            retData.yaxis = 'y';
        }

        this.setAxisCount(plotAxis);

        return retData;
    }
};
},{"./plotlyType":8,"./util":10}],6:[function(require,module,exports){
var Lib = require("./util"),
    Utils = require("./plotlyUtil");

module.exports = {
    setDefaltPlotCreate : setDefaltPlotCreate,
    setDefaltSubLayout : setDefaltSubLayout,
}

function setDefaltPlotCreate(data) {
    this.plots = Plotly.d3.select(this.plotOption.parent)
        .append("div")
        .attr("id", this.plotOption.layout.title);

    this.plots = this.plots.node();

    if (["pie", "radar"].indexOf(data.type) != -1) {
        Lib.deepExtend(this.defaultAxis.xaxis, this.plotOption.layout.xaxis);
        Lib.deepExtend(this.defaultAxis.yaxis, this.plotOption.layout.yaxis);
        delete this.plotOption.layout.xaxis;
        delete this.plotOption.layout.yaxis;
    }

    if(data.orientation == "h") this.plotOption.layout.hovermode = "y";

    Plotly.newPlot(this.plots, [data], this.plotOption.layout, this.plotOption.plotOpts);
    this.plots._initDrawAnimate = this._animate;
    this.plots.setAnnotation = Utils.setAnnotation;
    this.plots.getXY = Utils.getXY;
}

function setDefaltSubLayout(axes) {
    var plots = this.plots;
    var idx = [axes[0].replace(/[^0-9]/g, ""), axes[1].replace(/[^0-9]/g, "")];

    if (idx[0]) {
        var xlayout = plots.layout["xaxis" + idx[0]] = {};
        var subxlayout = {
            showgrid : false,
            anchor: 'y' + idx[1],
            showticklabels: false,
            overlaying: 'x',
            rangeslider : null
        };
        Lib.deepExtend(xlayout, plots.layout.xaxis, subxlayout);
    }

    if (idx[1]) {
        var ylayout = plots.layout["yaxis" + idx[1]] = {};
        var subylayout = {
            showgrid : false,
            anchor: 'x' + idx[0],
            showticklabels: false,
            overlaying: 'y',
            rangeslider : null
        };
        Lib.deepExtend(ylayout, plots.layout.yaxis, subylayout);
    }

    if (!idx[0] && !idx[1]) {
        if (!plots.layout.xaxis) {
            plots.layout.xaxis = {};
            Lib.deepExtend(plots.layout.xaxis, this.defaultAxis.xaxis);
        }
        if (!plots.layout.yaxis) {
            plots.layout.yaxis = {};
            Lib.deepExtend(plots.layout.yaxis, this.defaultAxis.yaxis);
        }
    }
};

},{"./plotlyUtil":9,"./util":10}],7:[function(require,module,exports){
var Animations = require("./plotlyAnimation");

module.exports = {
    setDefaltPlotEvent : setDefaltPlotEvent
}

function setDefaltPlotEvent() {
    var plotNode = this,
        plots = this.plots;

    plots.on('plotly_click',function (opts) {
        if(opts.event.shiftKey) drawSubPie(opts);
    });

    plots.on('plotly_addlegend', function (opts) {
    });

    plots.on('plotly_legendclick', function (opts) {
    });

    plots.on('plotly_beforeplot', function (opts) {
        if(!plots.layout) return;

        var layout = plots.layout,
            data = plots.data,
            showIdx = []; 

        for(var idx = 0; idx < data.length; idx++){
            if(data[idx].visible === undefined || data[idx].visible === true){
                showIdx.push(idx);
            }
        }

        if(showIdx.length < 1) return;

        var isH = (layout["hovermode"] == "y");

        var yaxisNum = data[showIdx[0]]["yaxis"].replace(/[^\d]/g,""),
            xaxisNum = data[showIdx[0]]["xaxis"].replace(/[^\d]/g,"");
            
        for(var attr in layout){
            var isY = (attr.indexOf("yaxis") !== -1),
                isX = (attr.indexOf("xaxis") !== -1);
            if(isY || isX){
                if(attr == ("yaxis" + yaxisNum) || attr == ("xaxis" + xaxisNum)){
                    if(showIdx.length == 1){
                        layout[attr].showticklabels = layout[attr].showgrid = true;
                    }else{
                        layout[attr].showticklabels = layout[attr].showgrid = isX ? !isH : isH;
                    }
                    layout[attr].autorange = layout[attr].zeroline = true;
                }else{
                    layout[attr].showticklabels = layout[attr].zeroline = layout[attr].showgrid = false;
                    layout[attr].autorange = true;
                }
            }
        }
    });

    plots.on('plotly_afterplot', function (opts) {
        if(plotNode.afterTimeout) clearTimeout(plotNode.afterTimeout);

        plotNode.afterTimeout = setTimeout(function(){
            plotNode.insertTimes = 0;
        },120);
    });

    plots.on('plotly_hover', function (opts) {
        if (plotNode._animate){
            Animations.hoverPlotAnimate(opts, plots._fullData, plotNode.plotOption.parent);
            Animations.hoverAxisAnimate(opts);
        }
    });

    plots.on('plotly_unhover', function (opts) {
        if (plotNode._animate){
            Animations.unhoverPlotAnimate(opts, plots._fullData, plotNode.plotOption.parent);
            Animations.unhoverAxisAnimate(opts);
        }
    });

    plots.on('plotly_dragstart', function (opts) {
        Plotly.d3.selectAll("#lHvCircle").remove();
    });

    plots.on('plotly_zoomstart', function (opts) {
        Plotly.d3.selectAll("#lHvCircle").remove();
    });

    plots.on('plotly_dragmove', function (opts) {
    });

    plots.on('plotly_dragend', function (opts) {
    });

    plots.on('plotly_dragtail', function (opts) {
    });

    plots.on('plotly_allerase',function(){
        plotNode.setAxisCount([0,0]);
        plotNode.traceCount = 0;
    });

    plots.on('plotly_deleteTrace',function(){
        plotNode.traceCount = Math.max(plotNode.traceCount-1,0);
    });

    function drawSubPie(opts){
        var plotData = plots.data;
        
        if(plotData.length > 0){
            var datas = {name : "",labels:[],values:[],hole:"0",marker:{colors:[]}},
                isHorizen = false;
                points = opts.points,
                SubData = null;

            if(points.length){
                for(var idx=0;idx < points.length;idx++){
                    if(points[idx].fullData && ["bar","scatter"].indexOf(points[idx].fullData.type) != -1){
                        datas.labels.push(points[idx].fullData.name +"(pie)");
                        if(points[idx].fullData.line){
                            datas.marker.colors.push(points[idx].fullData.line.color);
                        }else{
                            datas.marker.colors.push(points[idx].fullData.marker.color);
                        }
                        if(points[idx].fullData.orientation == "h"){
                            datas.values.push(points[idx].x);
                            isHorizen = isHorizen || true;
                        }else{
                            datas.values.push(points[idx].y);
                            isHorizen = isHorizen || false;
                        }
                    }
                }

                if(datas.labels.length){
                    for(var idx=0;idx<plotData.length;idx++){
                        if(plotData[idx]._sub){
                            SubData = plotData[idx];
                        }
                    }

                    if(!SubData){
                        datas.type = "pie";
                        if(isHorizen){
                            datas.name = points[0].y;
                            datas.domain = {x:[0.5,1],y:[0.3,0.8]};
                        }else{
                            datas.name = points[0].x;
                            datas.domain = {x:[0,0.3],y:[0.3,0.8]};
                        }
                        datas._sub = true;
                        datas.textinfo = "label+percent";
                        plotData.push(datas);
                    }else{
                        if(isHorizen){
                            SubData.name = points[0].y;
                        }else{
                            SubData.name = points[0].x;
                        }
                        SubData.labels = datas.labels;
                        SubData.values = datas.values;
                        SubData.marker.colors = datas.marker.colors;
                    }

                    Plotly.redraw(plots);
                }
            }
        }
    }
}
},{"./plotlyAnimation":3}],8:[function(require,module,exports){
exports.PlotData = function(){
    return {
        name: "noname",
        type: "bar",
        mode: "lines",
        xaxis: "x",
        yaxis: "y",
        marker: {},
        x: ["데이터없음"],
        y: [0],
        labels: ["데이터없음"],
        values: [0]
    };
}

},{}],9:[function(require,module,exports){
module.exports = {
    setAnnotation: setAnnotation,
    getXY : getXY
}

function setAnnotation(newAnnotation) {
    var plots = this.plots || this;

    if (newAnnotation.constructor != Array) {
        newAnnotation = [newAnnotation];
    }

    plots.layout.annotations = (plots.layout.annotations || []).concat(newAnnotation);

    Plotly.redraw(plots);
}

function getXY(offsetX,offsetY,flag){ // flag > 0:axis , 1:paper nomalize 0-1 , else : paper
    var plots = this.plots || this,
        resultx = offsetX,resulty = offsetY,
        flag = flag || 0;
    
    switch(flag){
        case 0:
            if(!plots._fullLayout.xaxis) break;

            var layout = plots._fullLayout._bgLayer.node().getBoundingClientRect();

            var xaxis = plots._fullLayout.xaxis,
                yaxis = plots._fullLayout.yaxis,
                rangex = [xaxis.r2l(xaxis.range[0]),xaxis.r2l(xaxis.range[1])],
                rangey = [yaxis.r2l(yaxis.range[0]),yaxis.r2l(yaxis.range[1])],
                mousex = offsetX - layout.left,
                mousey = layout.height - offsetY + layout.top;

            if(mousex > layout.width || mousex < 0) mousex = layout.width/2;
            if(mousey > layout.height || mousey < 0) mousey = layout.height/2;

            resultx = rangex[0] + (rangex[1] - rangex[0])*(mousex / layout.width),
            resulty = rangey[0] + (rangey[1] - rangey[0])*(mousey / layout.height);
            break;
        case 1:
            var layout = Plotly.d3.select(plots).selectAll(".main-svg").last().node().getBoundingClientRect();

            resultx = resultx / layout.width;
            resulty = 1 - (resulty / layout.height);

            return [resultx,resulty];
        default:
            break;
    }

    return [resultx,resulty];
}

},{}],10:[function(require,module,exports){
function svgGradationColor(selector,color){
    if(!(d3 || Plotly.d3)){
        console.log("d3가 없으므로 사용 불가");
        return;
    }
    var d3 = d3 || Plotly.d3;

    var main = d3.select(selector);
    
    if(main.empty()){
        main = d3.select("body").append(selector);
    }

    var defs = main.select("defs");
    
    if(defs.empty()){
        defs = d3.select("body").append(selector);
    }

    var uid = "linear-" + (new Date().getTime()).toString(36);

    var linearGradient = defs.append("linearGradient")
                             .attr("id", uid)
                             .attr("x1", "0%")
                             .attr("y1", "0%")
                             .attr("x2", "0%")
                             .attr("y2", "100%");
    linearGradient.append("stop") 
                  .attr("offset", "0%")   
                  .attr("stop-color", color)
    
    linearGradient.append("stop") 
                  .attr("offset", "100%")   
                  .attr("stop-color", Plotly.customLib.tinycolor(color).setAlpha(.1).lighten(20).toString());

    return "url('#" + uid + "')";
}


function deepExtend(out){
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

module.exports = {
    deepExtend : deepExtend,
    svgGradationColor : svgGradationColor
}
},{}]},{},[1]);

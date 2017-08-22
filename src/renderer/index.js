/**
 *  Name : renderer.index.js
 *  Explain : 
 * 
 */

var Locales = require('../locales'),
    Lib = require('../lib');

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
        require('./basic'),
        require('./chart')
    ]);
})()
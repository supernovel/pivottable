/**
 *  Name : lib.js
 *  Explain : 
 * 
 */

var Lib = module.exports = {};

//--------------- 필요한 함수들 prototpye에 작성 Start---------------

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

if(!Element.prototype.text){
    Element.prototype.text = function(string){ 
        if(typeof(string) === 'string'){
            if (this.textContent !== undefined)
                this.textContent = string;
            else
                this.innerText = string;
            
            return this;
        }else{
            return this.textContent || this.innerText;
        }
    }
}

if (!Element.prototype.addClass) {
    Element.prototype.addClass = function(className){
        if(typeof name === 'string'){
            if (this.classList)
                this.classList.add(className);
            else
                this.className += ' ' + className;
        }
        
        return this;
    }
}

if (!Element.prototype.removeClass) {
    Element.prototype.removeClass = function(className){
        if(typeof name === 'string'){
            if (this.classList)
                this.classList.remove(className);
            else
                this.className = this.className.replace(
                    new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
                    ' '
                );
        }
        
        return this;
    }
}

if(!Element.prototype.toggleClass){
    Element.prototype.toggleClass = function(className){ 
        if (this.classList) {
                this.classList.toggle(className);
        } else {
            var classes = this.className.split(' ');
            var existingIndex = -1;
            for (var i = classes.length; i--;) {
                if (classes[i] === className)
                    existingIndex = i;
            }

            if (existingIndex >= 0)
                classes.splice(existingIndex, 1);
            else
                classes.push(className);

            this.className = classes.join(' ');
        }

        return this;
    }
}


if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position){
      position = position || 0;
      return this.substr(position, searchString.length) === searchString;
  };
}

if (!Math.sign) {
  Math.sign = function(x) {
    // If x is NaN, the result is NaN.
    // If x is -0, the result is -0.
    // If x is +0, the result is +0.
    // If x is negative and not -0, the result is -1.
    // If x is positive and not +0, the result is +1.
    return ((x > 0) - (x < 0)) || +x;
    // A more aesthetical persuado-representation is shown below
    //
    // ( (x > 0) ? 0 : 1 )  // if x is negative then negative one
    //          +           // else (because you cant be both - and +)
    // ( (x < 0) ? 0 : -1 ) // if x is positive then positive one
    //         ||           // if x is 0, -0, or NaN, or not a number,
    //         +x           // Then the result will be x, (or) if x is
    //                      // not a number, then x converts to number
  };
}

//--------------- 필요한 함수들 prototpye에 작성 End ---------------

Lib.deepExtend = function deepExtend(out){
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

Lib.isEmptyObject = function(obj){
    if(obj && obj instanceof Object){
        if(Object.keys(obj).length){
            return false;
        }
    }
    
    return true;
}

Lib.isFunction = function(func){
    if(obj && obj instanceof Function){
        return true;
    }
    return false;
}

Lib.isArray = function(arr){
    if(obj && obj instanceof Array){
        return true;
    }
    return false;
}

Lib.addSeparators = function(nStr, thousandsSep, decimalSep) {
    var rgx, x, x1, x2;
    
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? decimalSep + x[1] : '';
    rgx = /(\d+)(\d{3})/;
    
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + thousandsSep + '$2');
    }
    
    return x1 + x2;
};

Lib.numberFormat = function numberFormat(opts) {
    var defaults;
    
    defaults = {
        digitsAfterDecimal: 2,
        scaler: 1,
        thousandsSep: ",",
        decimalSep: ".",
        prefix: "",
        suffix: ""
    };
    
    opts = Lib.deepExtend({}, defaults, opts);
    
    return function(x) {
        var result;
        
        if (isNaN(x) || !isFinite(x)) {
            return "";
        }
        
        result = Lib.addSeparators((opts.scaler * x).toFixed(opts.digitsAfterDecimal), opts.thousandsSep, opts.decimalSep);
        
        return "" + opts.prefix + result + opts.suffix;
    };
};
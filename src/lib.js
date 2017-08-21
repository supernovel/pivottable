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

if(!Element.prototype.setText){    
    Element.prototype.setText = function(string){ 
        if(typeof string === 'string'){
            if(this.textContent !== undefined){
                this.textContent = string;
            } else {
                this.innerText = string;
            }
            return this;
        }
    }
}

if(!Element.prototype.getText){    
    Element.prototype.getText = function(){ 
        return this.text || this.textContent || this.innerText;
    }
}

var ClassCheck = function(className){
    return new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi');
}

if (!Element.prototype.addClass) {
    Element.prototype.addClass = function(className){
        if(typeof name === 'string'){
            if(this.className){
                if(!(ClassCheck(className).test(this.className))){
                    this.className += ' ' + className;
                }
            }else{
                this.className = className;
            }
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
                    ClassCheck(className),
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


Lib.hasProp = {}.hasOwnProperty;
Lib.slice = [].slice,
Lib.indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Lib.filterInt = function (value) {
  if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
    return Number(value);
  return NaN;
}

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
    if(func && func instanceof Function){
        return true;
    }
    return false;
}

Lib.isArray = function(arr){
    if(arr && arr instanceof Array){
        return true;
    }
    return false;
}

/*
 * Natural Sort algorithm for Javascript - Version 0.8.1 - Released under MIT license
 * Author: Jim Palmer (based on chunking idea from Dave Koelle)
 */

Lib.naturalSort = function naturalSort (a, b) {
    var re = /(^([+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|^0x[\da-fA-F]+$|\d+)/g,
        sre = /^\s+|\s+$/g,   // trim pre-post whitespace
        snre = /\s+/g,        // normalize all whitespace to single ' ' character
        dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
        hre = /^0x[0-9a-f]+$/i,
        ore = /^0/,
        i = function(s) {
            return (naturalSort.insensitive && ('' + s).toLowerCase() || '' + s).replace(sre, '');
        },
        // convert all to strings strip whitespace
        x = i(a),
        y = i(b),
        // chunk/tokenize
        xN = x.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
        yN = y.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
        // numeric, hex or date detection
        xD = parseInt(x.match(hre), 16) || (xN.length !== 1 && Date.parse(x)),
        yD = parseInt(y.match(hre), 16) || xD && y.match(dre) && Date.parse(y) || null,
        normChunk = function(s, l) {
            // normalize spaces; find floats not starting with '0', string or 0 if not defined (Clint Priest)
            return (!s.match(ore) || l == 1) && parseFloat(s) || s.replace(snre, ' ').replace(sre, '') || 0;
        },
        oFxNcL, oFyNcL;
    // first try and sort Hex codes or Dates
    if (yD) {
        if (xD < yD) { return -1; }
        else if (xD > yD) { return 1; }
    }
    // natural sorting through split numeric strings and default strings
    for(var cLoc = 0, xNl = xN.length, yNl = yN.length, numS = Math.max(xNl, yNl); cLoc < numS; cLoc++) {
        oFxNcL = normChunk(xN[cLoc] || '', xNl);
        oFyNcL = normChunk(yN[cLoc] || '', yNl);
        // handle numeric vs string comparison - number < string - (Kyle Adams)
        if (isNaN(oFxNcL) !== isNaN(oFyNcL)) {
            return isNaN(oFxNcL) ? 1 : -1;
        }
        // if unicode use locale comparison
        if (/[^\x00-\x80]/.test(oFxNcL + oFyNcL) && oFxNcL.localeCompare) {
            var comp = oFxNcL.localeCompare(oFyNcL);
            return comp / Math.abs(comp);
        }
        if (oFxNcL < oFyNcL) { return -1; }
        else if (oFxNcL > oFyNcL) { return 1; }
    }
}

Lib.getSort = function(sorters, attr) {
    var sort;

    if (sorters != null) {
        if (Lib.isFunction(sorters)) {
            sort = sorters(attr);
            if (Lib.isFunction(sort)) {
                return sort;
            }
        } else if (sorters[attr] != null) {
            return sorters[attr];
        }
    }
    
    return Lib.naturalSort;
};

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
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
            if (this.text !== undefined)
                this.text = string;
            else if(this.textContent !== undefined){
                this.textContent = string;
            } else
                this.innerText = string;
            
            return this;
        }
    }
}

if(!Element.prototype.getText){    
    Element.prototype.getText = function(){ 
        return this.text || this.textContent || this.innerText;
    }
}

if (!Element.prototype.addClass) {
    Element.prototype.addClass = function(className){
        if(typeof name === 'string'){
            if(this.className){
                this.className += ' ' + className;
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


Lib.hasProp = {}.hasOwnProperty;
Lib.slice = [].slice,
Lib.indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };


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

var rx = /(\d+)|(\D+)/g,
    rd = /\d/,
    rz = /^0/;

Lib.naturalSort = (function() {
  return function(as, bs) {
    var a, a1, b, b1, nas, nbs;
    
    if ((bs != null) && (as == null)) {
      return -1;
    }

    if ((as != null) && (bs == null)) {
      return 1;
    }

    if (typeof as === "number" && isNaN(as)) {
      return -1;
    }
    
    if (typeof bs === "number" && isNaN(bs)) {
      return 1;
    }

    nas = +as;
    nbs = +bs;

    if (nas < nbs) {
      return -1;
    }

    if (nas > nbs) {
      return 1;
    }

    if (typeof as === "number" && typeof bs !== "number") {
      return -1;
    }

    if (typeof bs === "number" && typeof as !== "number") {
      return 1;
    }

    if (typeof as === "number" && typeof bs === "number") {
      return 0;
    }

    if (isNaN(nbs) && !isNaN(nas)) {
      return -1;
    }

    if (isNaN(nas) && !isNaN(nbs)) {
      return 1;
    }

    a = String(as);
    b = String(bs);

    if (a === b) {
      return 0;
    }

    if (!(rd.test(a) && rd.test(b))) {
      return (a > b ? 1 : -1);
    }

    a = a.match(rx);
    b = b.match(rx);

    while (a.length && b.length) {
        a1 = a.shift();
        b1 = b.shift();
        if (a1 !== b1) {
            if (rd.test(a1) && rd.test(b1)) {
                return a1.replace(rz, ".0") - b1.replace(rz, ".0");
            } else {
                return (a1 > b1 ? 1 : -1);
            }
        }
    }
    return a.length - b.length;
  };
})();

Lib.sortAs = function(order) {
  var i, l_mapping, mapping, x;
  mapping = {};
  l_mapping = {};
  for (i in order) {
    x = order[i];
    mapping[x] = i;
    if (typeof x === "string") {
      l_mapping[x.toLowerCase()] = i;
    }
  }
  return function(a, b) {
    if ((mapping[a] != null) && (mapping[b] != null)) {
      return mapping[a] - mapping[b];
    } else if (mapping[a] != null) {
      return -1;
    } else if (mapping[b] != null) {
      return 1;
    } else if ((l_mapping[a] != null) && (l_mapping[b] != null)) {
      return l_mapping[a] - l_mapping[b];
    } else if (l_mapping[a] != null) {
      return -1;
    } else if (l_mapping[b] != null) {
      return 1;
    } else {
      return Lib.naturalSort(a, b);
    }
  };
};

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
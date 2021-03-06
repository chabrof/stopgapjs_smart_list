(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./samples/simpleSample.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./samples/simpleSample.js":
/*!*********************************!*\
  !*** ./samples/simpleSample.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_SidePrefetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/SidePrefetch */ "./src/SidePrefetch.js");


let containerDomElt; // the container div
let cacheViewDomElt; // this div to view the cache in action
let nbItems = 14;

let nbSimulatedRessources = 5;
let simulatedRessources = [];
let cache = new Array(nbSimulatedRessources); // Cache with 5 free spaces (5 ressources of computing)

/**
 * Create our implementation of SidePrefetch class
 */
function _createItem(idx) {
  let item = document.createElement('div');
  item.setAttribute('id', `div_${idx}`);
  item.setAttribute('class', `item`);
  item.setAttribute('data-idx', idx);
  item.style.backgroundColor = "darkGrey";
  item.addEventListener('mouseover', mouseOverItem);
  item.innerHTML = `item <b>${idx}<br/>:|</b>`;
  return item;
}

let asyncaTest = new _src_SidePrefetch__WEBPACK_IMPORTED_MODULE_0__["SidePrefetch"]().cache(cache).leftPrefetchSideSize(2).rightPrefetchSideSize(2).cyclic(true).alloc((itemIdx, item) => {
  item.toBeComputed = true;
  if (simulatedRessources.length > nbSimulatedRessources - 1) {
    simulatedRessources.shift();
  }
  let upperResolve;

  let promise = new Promise((resolve, reject) => {
    upperResolve = resolve;
  });
  console.info(`Alloc called for ${itemIdx}`, item);
  simulatedRessources.push(window.setTimeout(() => {
    if (!item.toBeComputed) return upperResolve(); // ==>

    item.style.backgroundColor = "darkGreen";
    item.innerHTML = `item <b>${itemIdx}<br>:)</b>`;
    console.info(`Alloc Finished ! : ${itemIdx}`);
    upperResolve();
  }, 300));
  return promise;
}).free((itemIdx, item) => {
  item.toBeComputed = false;
  console.info(`Free called for ${itemIdx}`);
  let async = (resolve, reject) => {
    window.setTimeout(() => {
      if (item.toBeComputed) return resolve(); // ==>
      console.info(`Free Finished ! : ${itemIdx}`);
      item.style.backgroundColor = "darkRed";
      item.innerHTML = `item <b>${itemIdx}<br/>:(</b>`;
      resolve();
    }, 100);
  };
  return new Promise(async);
});

for (let idx = 0; idx < nbItems; idx++) {
  let item = _createItem(idx);
  console.log('item', item);
  asyncaTest.push(item);
}

console.log('Asyncatest', asyncaTest);

function mouseOverItem(e) {
  let domElem = e.target;
  while (domElem.getAttribute('data-idx') === null) {
    domElem = domElem.parentNode;
  }
  let itemIdxToGet = domElem.getAttribute('data-idx') * 1;
  asyncaTest.get(itemIdxToGet);
  _displayCache();
}

function _displayCache() {
  cacheViewDomElt.innerHTML = cache.reduce((acc, divItem) => acc.concat((divItem ? divItem.getAttribute('data-idx') : '--') + ' '), 'Items in cache : ');
}

function _add3Items() {
  for (let ct = 0; ct < 3; ct++) {
    nbItems++;
    let idxToAdd = nbItems - 1;
    let item = _createItem(idxToAdd);
    asyncaTest.push(item);
    containerDomElt.appendChild(asyncaTest.get(idxToAdd));
  }
}

function init() {
  containerDomElt = document.getElementById('container');
  cacheViewDomElt = document.getElementById('cacheView');

  document.getElementById('btnAdd').addEventListener('click', _add3Items);

  asyncaTest.forEach((item, idx) => containerDomElt.appendChild(asyncaTest.get(idx)));
}

window.addEventListener('load', init);

/***/ }),

/***/ "./src/Abstract.js":
/*!*************************!*\
  !*** ./src/Abstract.js ***!
  \*************************/
/*! exports provided: Abstract */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Abstract", function() { return Abstract; });
class Abstract {

  constructor() {
    this.init();
  }

  init() {
    this._items = this._items || [];
    this._prefixLog = "asynca : ";

    this._history = [];
    this._itemIdxToCacheIdx = [];
    this._prefetching = true;
  }

  /**
   * meta method
   * use a Fifo unallocStrategy
   * [itemIdx] is the index of the iten in the items array
   */
  async _manageCache(itemIdx) {
    let oldItemIdx;
    let oldCacheIdx;
    let cacheIdx;
    let unallocPromise;

    if (this._history.length >= this._cache.length) {
      //
      // No more space in cache => unalloc one elem
      //

      // search in history withe uallocStrategie
      let historyIdx = this.unallocStrategie(this._curItemIdx, this._items[this._curItemIdx], itemIdx, this._items[itemIdx]);
      oldItemIdx = this._history[historyIdx].itemIdx;
      oldCacheIdx = this._history[historyIdx].cacheIdx;

      // unalloc the "good cache elt"
      console.log(this._prefixLog, ` get cacheIdx to recycle : ${oldCacheIdx}  => free item : ${oldItemIdx}`);
      this._cache[oldCacheIdx] = undefined;
      this._itemIdxToCacheIdx[oldItemIdx] = undefined;
      this._history.splice(historyIdx, 1);
      unallocPromise = this._free(oldItemIdx, this._items[oldItemIdx]);

      // use the old cache idx as a new one for new item caching
      cacheIdx = oldCacheIdx;
    } else {
      // get the cache Idx (the history tab is not full for the moment historyIdx and cacheIdx are the same)
      cacheIdx = this._history.length; // == historyIdx
    }

    // Put in cache
    this._history.push({ "itemIdx": itemIdx, "cacheIdx": cacheIdx });
    const item = this._items[itemIdx];
    this._cache[cacheIdx] = item;
    this._itemIdxToCacheIdx[itemIdx] = cacheIdx;
    console.log(this._prefixLog, ` use cacheIdx : ${cacheIdx}  => alloc item : ${itemIdx}`);
    return unallocPromise ? unallocPromise.then(() => this._itemIdxToCacheIdx[itemIdx] !== undefined ? this._alloc(itemIdx, item) : null) : this._alloc(itemIdx, item);
  }

  /**
   * Defines the strategy for unallocate item in cache
   * [curItemIdx] the index of the current item (that is wished by user)
   * [curItem] The item which is whished by user
   * [allocItemIdx] the index of the item which will be allocated now (and which needs an unalloc process to free a space for its future allocation)
   * [allocItem] the item which will be allocated now (and which needs an unalloc process to free a space for its future allocation)
   * @return {number} index in the [_history]
   */
  unallocStrategie(curItemIdx, curItem, allocItemIdx, allocItem) {
    console.assert(false, 'This method must be overriden');
  }

  /**
   * @abstract
   * [itemIdx] is the index in the list of items which must be computed
   */
  _alloc(itemIdx, item) {
    console.assert(false, "This method must be overriden : you must call the 'alloc' setter/getter");
  }

  /**
   * @abstract
   * [itemIdx] is the index in the list of items which must be free (un-computed)
   */
  _free(itemIdx, item) {
    console.assert(false, "This method must be overriden : you must call the 'free' setter/getter");
  }

  /**
   * Get a Promise to the wished item
   * it uses precomputed item in cache (if available) or ask for a computation
   */
  getAsync(itemIdx) {
    this._curItemIdx = itemIdx;
    return this._getAsync(itemIdx);
  }

  _getAsync(itemIdx) {
    if (this._itemIdxToCacheIdx[itemIdx] === undefined) {
      console.log(this._prefixLog, 'item(' + itemIdx + ') not cached => compute it');
      return this._manageCache(itemIdx);
    } else {
      console.log(this._prefixLog, 'item(' + itemIdx + ') already in cache => get it');
      return Promise.resolve(this._items[itemIdx]);
    }
  }

  /**
   * Get Item which has been computed or .. not !
   * uses precomputed item in cache (if available) or ask for a computation
   */
  get(itemIdx) {
    this._curItemIdx = itemIdx;
    return this._get(itemIdx);
  }

  _get(itemIdx) {
    // First of all, call the whole machinery
    this._getAsync(itemIdx);
    // ... and simply return the item
    return this._items[itemIdx];
  }

  /**
   * Push one item in list of items
   */
  push(value) {
    console.assert(this._items, 'items is not initialised');

    this._items.push(value);
    return this;
  }

  forEach(cbk) {
    this._items.forEach(cbk);
    return this;
  }

  map(cbk) {
    return this._items.map(cbk);
  }

  reduce(cbk) {
    return this._items.reduce(cbk);
  }

  //
  // Getters/Setters
  //

  cache(value = undefined) {
    value = typeof value === 'number' ? new Array(value) : value;
    return this._manageSetGet('_cache', value);
  }

  items(value = undefined) {
    if (value === undefined) return this._items;

    // pre
    console.assert(value && value.length, 'items must be an array');

    value.forEach(item => this.push(item));

    return this;
  }

  alloc(value) {
    return this._manageSetGet('_alloc', value);
  }

  free(value) {
    return this._manageSetGet('_free', value);
  }

  prefetching(value) {
    return this._manageSetGet('_prefetching', value);
  }

  _manageSetGet(attrib, value) {
    if (value === undefined) return this[attrib];

    this[attrib] = value;

    this.init();

    return this;
  }
}

/***/ }),

/***/ "./src/FifoCache.js":
/*!**************************!*\
  !*** ./src/FifoCache.js ***!
  \**************************/
/*! exports provided: FifoCache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FifoCache", function() { return FifoCache; });
/* harmony import */ var _Abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Abstract */ "./src/Abstract.js");


class FifoCache extends _Abstract__WEBPACK_IMPORTED_MODULE_0__["Abstract"] {

  /**
   * Defines the strategy for unallocate item in cache
   * We implement a very very hard to understand complex strategy
   *   => we choose to unallocate the oldest computed item (first item idx in the history : 0)
   * [itemIdx] is the index of the item
   * @return {number} index in the [_history]
   */
  unallocStrategie(curItems, allocItemIdx) {
    return 0;
  }
}

/***/ }),

/***/ "./src/SidePrefetch.js":
/*!*****************************!*\
  !*** ./src/SidePrefetch.js ***!
  \*****************************/
/*! exports provided: SidePrefetch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidePrefetch", function() { return SidePrefetch; });
/* harmony import */ var _SidePrefetchAbstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SidePrefetchAbstract */ "./src/SidePrefetchAbstract.js");


class SidePrefetch extends _SidePrefetchAbstract__WEBPACK_IMPORTED_MODULE_0__["SidePrefetchAbstract"] {

  _init() {
    super._init();

    this._cyclic = this._cyclic || false;
    this._leftPrefetchSideSize = this._leftPrefetchSideSize !== undefined ? this._leftPrefetchSideSize : this._leftPrefetchSideSize;
    this._sidePrefetchOffOnce = false;
  }

  /**
   * See meta method for documentation
   */
  unallocStrategie(curItemIdx, curItem, allocItemIdx, allocItem) {
    console.warn('itemIdx', allocItemIdx, 'curItemIdx', curItemIdx);

    let nbItems = this._items.length;
    //  We do NOT use the arg [itemIdx] but _curItemIdx (which represents the "wished" item and not the right or left precomputed items)
    for (let ct = 0; ct < this._history.length; ct++) {
      let distance = this.getSignedMinDistance(curItemIdx, this._history[ct].itemIdx, nbItems, this._cyclic);

      if (distance > this._rightPrefetchSideSize || 0 - distance > this._leftPrefetchSideSize) {
        return ct;
      }
    }

    // By default, we use the FifoCache method, wich unallocate the "oldest" cached item
    return super.unallocStrategie(curItemIdx, curItem, allocItemIdx, allocItem);
  }

  /**
   * See meta method for documentation
   */
  _get(itemIdx) {
    // Current item
    console.group(this._prefixLog, 'Get current : ', itemIdx);

    let ret = super._get(itemIdx);

    // Prefetch
    console.log('Prefetching :', this._prefetching);
    if (this._prefetching) {
      // Left items
      for (let tmpItemIdx = itemIdx - this._leftPrefetchSideSize; tmpItemIdx <= itemIdx - 1; tmpItemIdx++) {
        if (tmpItemIdx < 0) {
          if (this._cyclic) {
            let modTmpItemIdx = this._items.length + tmpItemIdx;
            console.log(this._prefixLog, '/////////////////');
            console.log(this._prefixLog, 'Prefetch left : ', modTmpItemIdx);
            super._get(modTmpItemIdx);
          }
        } else {
          console.log(this._prefixLog, '/////////////////');
          console.log(this._prefixLog, 'Prefetch left : ', tmpItemIdx);
          super._get(tmpItemIdx);
        }
      }
      // Right items
      console.log('right : ', this._rightPrefetchSideSize);
      for (let tmpItemIdx = itemIdx + 1, ct = 0; ct < this._rightPrefetchSideSize; tmpItemIdx++, ct++) {
        if (tmpItemIdx >= this._items.length) {
          if (this._cyclic) {
            let modTmpItemIdx = tmpItemIdx - this._items.length;
            console.log(this._prefixLog, '/////////////////');
            console.log(this._prefixLog, 'Prefetch right :', modTmpItemIdx);
            super._get(modTmpItemIdx);
          }
        } else {
          console.log(this._prefixLog, '/////////////////');
          console.log(this._prefixLog, 'Prefetch right :', tmpItemIdx);
          super._get(tmpItemIdx);
        }
      }
    }
    console.groupEnd();

    return ret;
  }

  prefetchSideSize(value) {
    return this._manageSetGet('_leftPrefetchSideSize', value);
  }

  leftPrefetchSideSize(value) {
    return this._manageSetGet('_leftPrefetchSideSize', value);
  }

  rightPrefetchSideSize(value) {
    return this._manageSetGet('_rightPrefetchSideSize', value);
  }

  cyclic(value) {
    return this._manageSetGet('_cyclic', value);
  }
}

/***/ }),

/***/ "./src/SidePrefetchAbstract.js":
/*!*************************************!*\
  !*** ./src/SidePrefetchAbstract.js ***!
  \*************************************/
/*! exports provided: SidePrefetchAbstract */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidePrefetchAbstract", function() { return SidePrefetchAbstract; });
/* harmony import */ var _FifoCache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FifoCache */ "./src/FifoCache.js");


class SidePrefetchAbstract extends _FifoCache__WEBPACK_IMPORTED_MODULE_0__["FifoCache"] {

  /**
   * Get distance between items
   * distance > 0 distance to the right
   * distance < 0 distance to the left
   */
  getSignedMinDistance(itemOrigIdx, itemDestIdx, nbItems, cyclic = false) {
    let distance = itemDestIdx - itemOrigIdx;

    if (cyclic) {
      if (distance > 0) {
        // We found a "left distance" ..accross 0 index
        if (nbItems - distance < distance) return -(nbItems - distance);
      } else {
        // We found a "right distance" ..accross last index
        if (nbItems + distance < -distance) return nbItems + distance;
      }
    }

    return distance;
  }
}

/***/ })

/******/ });
});
//# sourceMappingURL=simpleSample.js.map
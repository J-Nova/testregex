(() => {
    "use strict";
    var __webpack_modules__ = {
            992: (e, _, t) => {
                function r(e) {
                    if (null == e) 
                        return "";
                    
                    let _ = 0,
                        t = "";
                    for (let r = 0, s = e.length; r < s; r++) {
                        const s = e.charAt(r);
                        "'" === s && _ % 2 == 0 ? (t += "\\" + s, _ = 0) : (t += s, "\\" === s ? _++ : _ = 0)
                    }
                    return t
                }
                t.d(_, {
                    U: () => r
                })
            },
            781: (e, _, t) => {
                t.d(_, {
                    w: () => r
                });
                const r = e => {
                    null == e.performance && (e.performance =
                        {}),
                    null == e.performance.now && (e.performance.now =() => Date.now())
                }
            }
        },
        __webpack_module_cache__ = {};
    function __webpack_require__(e) {
        var _ = __webpack_module_cache__[e];
        if (void 0 !== _) 
            return _.exports;
        
        var t = __webpack_module_cache__[e] = {
            exports: {}
        };
        return __webpack_modules__[e](t, t.exports, __webpack_require__),
        t.exports
    }
    __webpack_require__.d = (e, _) => {
        for (var t in _) 
            __webpack_require__.o(_, t) && ! __webpack_require__.o(e, t) && Object.defineProperty(e, t, {
                enumerable: !0,
                get: _[t]
            })
        
    },
    __webpack_require__.o = (e, _) => Object.prototype.hasOwnProperty.call(e, _);
    var __webpack_exports__ = {};
    (() => {
        var js_workers_utils_javascript__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(992),
            js_workers_utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(781);
        (0, js_workers_utils_utils__WEBPACK_IMPORTED_MODULE_0__.w)(self);
        const LIST_RESULT_SEPARATOR = "\x01re101\x01",
            listResultRegex = new RegExp(`${LIST_RESULT_SEPARATOR}(?:(?!${LIST_RESULT_SEPARATOR})[\\s\\S])*${LIST_RESULT_SEPARATOR}`, "g");
        self.onmessage = function (event) {
            try {
                const startTime = performance.now(), {
                        regex: regex,
                        flags: flags,
                        testString: testString,
                        substString: substString,
                        listMode: listMode
                    } = event.data,
                    jsRegex = new RegExp(regex, flags),
                    safeSubstString = (0, js_workers_utils_javascript__WEBPACK_IMPORTED_MODULE_1__.U)(substString);
                let resultString = "";
                if (listMode) {
                    const tempResult = testString.replace(jsRegex, eval(`'${
                        LIST_RESULT_SEPARATOR + safeSubstString + LIST_RESULT_SEPARATOR
                    }'`));
                    resultString = (tempResult.match(listResultRegex) || []).reduce(((e, _) => e + _.slice(LIST_RESULT_SEPARATOR.length, -1 * LIST_RESULT_SEPARATOR.length)), "")
                } else 
                    resultString = testString.replace(jsRegex, eval(`'${safeSubstString}'`));
                
                self.postMessage({
                    result: resultString,
                    time: performance.now() - startTime
                })
            } catch (e) {
                self.postMessage({error: e.message})
            }
        },
        self.postMessage("onload")
    })()
})();

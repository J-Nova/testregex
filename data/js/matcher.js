function updateRegex(explain) {
    console.log("Updating regex");
    console.log(explain);
    var current_flavour = getFlavor(),
        test_data = {
            regex: $("#regex").val(),
            options: $("#options").val(),
            regexText: test_area.value,
            isSub: sub_enabled(),
            sub: $("#sub").val(),
            delimiter: $("#delimiter_selector").text(),
            flavor: current_flavour
        };
    console.log(test_data);
    if (current_flavour === FLAVOR.PYTHON && (test_data.regex = sanitizePython(test_data.regex)), 0 === test_data.regex.length) {
        var o = white_space(escapeHtml(test_area.value));
        test_color_element = replaceHtml(test_color_element, o),
        replaceHtml("treeview", "An explanation of your regex will be automatically generated as you type."),
        replaceHtml("match_info", "Detailed match information will be displayed here automatically."),
        replaceHtml("subst_result", o),
        display_info("no match", "no_match"),
        clearTimeout(matchTimer),
        clearTimeout(treeview_timer),
        $("#debugger_menu, #sample_menu, #permalink_menu, #community_submit, #format_regex").removeClass("active").addClass("disabled"),
        $("#permalink_data").hide(),
        stopUnitTests(),
        updateTooltipData()
    } else {
    
        if (current_flavour == FLAVOR.PCRE){
            updatePCRE(test_data)
            console.log(test_data);
        } 

        // TODO handle other languages like Javascript and python...

        
        switch (test_data.regexText.length > 0, current_flavour) {
            case FLAVOR.JS: updateJavascript(test_data);
                break;
            case FLAVOR.PYTHON:
        // }

        if (explain) {
            if (!Regex101Colorizer.justParsed()) 
                return;
            

            treeview_timer && clearTimeout(treeview_timer),
            treeview_timer = setTimeout(function () {
                replaceHtml("treeview", Regex101Explainer.explain(test_data))
            }, treeview_match_timeout)
        }
    }
    return !1
}
function showError(e, r) {
    if (! r) {
        $("#debugger_menu").removeClass("active"),
        $("#debugger_menu").addClass("disabled");
        var r = "error"
    }
    setTimeout(function () {
        test_color_element = replaceHtml(test_color_element, white_space(escapeHtml(test_area.value))),
        sub_enabled() && replaceHtml("subst_result", white_space(escapeHtml(test_area.value)))
    }, 0),
    matchTimer && clearTimeout(matchTimer),
    matchTimer = setTimeout(function () {
        $("#match_info").html(e || "Your expression contains an error, please see the treeview above."),
        display_info(r, "error")
    }, treeview_match_timeout),
    updateTooltipData()
}
function display_info(e, r) {
    infoTimeout && clearTimeout(infoTimeout),
    infoTimeout = setTimeout(function () {
        $("#result_indicator").removeClass("no_match error found_match").addClass(r).text(e)
    }, 250)
}
function compute_matches(e) {
    for (var r = "<table>", t = 1, o = 0, o = 0, a = 0; a < e.length; a++) {
        var i = e[a].length;
        if (i > 1) {
            for (var s =! 1, n = "<tr " + (
            a > 0 ? 'class="bottom_match_space"' : ""
        ) + '><td colspan="2" class="match_num">MATCH ' + t + "</td></tr>", u = 1; i > u; u++) {
                var c,
                    l = e[a][u],
                    m = void 0 !== l.name ? l.name : u + ".",
                    g = void 0 !== l.start;
                if (void 0 !== l.content && -1 !== l.start) {
                    var d = "match" + o + "_group" + u;
                    c = "`" + white_space(escapeHtml(l.content), !1) + "`",
                    n += '<tr id="' + d + '"><td class="match_group_name"><span class="match' + (
                        u % PAREN_COUNT || PAREN_COUNT
                    ) + '">' + m + "</span></td>",
                    g && (n += '<td class="match_group_pos">[' + l.start + "-" + l.end + "]</td>")
                } else {
                    if (!displayNonParticipatingGroups()) 
                        continue;
                    

                    c = "group did not participate in match",
                    n += '<tr class="treeview_regex_warning"><td class="match_group_name"><span class="match' + (
                        u % PAREN_COUNT || PAREN_COUNT
                    ) + '">' + m + "</span></td>",
                    g && (n += '<td class="match_group_pos">n/a</td>')
                } n += '<td class="hard_break match_group_data">' + c + "</td>",
                s = !0
            }
            n += "</tr>",
            s && (r += n),
            t ++
        }
        o++
    }
    r += "</tbody></table>",
    r.length < 40 ? r = e.length > 0 ? '<div class="regex_colorizer">No match groups were extracted.<br /><br />This means that your pattern matches but there were no <b class="g1">(</b>capturing <b class="g2">(</b>groups<b class="g2">)</b><b class="g1">)</b> in it that matched anything in the subject string.</div>' : '<div>Your pattern does <strong class="errorize_text">not</strong> match the subject string.</div>' : r += '<i title="Export matches..." class="export_matches fa fa-external-link-square"></i>',
    replaceHtml("match_info", r)
}
function updateMatchResult(e, r) {
    var t = "";
    if (r && (t = " - " + r + (r > 1 ? " steps" : " step")), e) {
        var o = e + (e > 1 ? " matches" : " match") + t;
        display_info(o, "found_match")
    } else 
        display_info("no match" + t, "no_match")

    

}
function timeoutError() {
    $("#debugger_menu").addClass("disabled"),
    matcherError('<strong class="errorize_text">Your expression took too long to evaluate.</strong><br><br>The script has halted execution as it exceeded a maximum execution time of ' + maxWorkerTimeout / 1e3 + 's. This would likely occur when your expression results in what is known as <a target="_blank" href="http://www.regular-expressions.info/catastrophic.html">catastrophic backtracking</a>. I have halted the execution for you and will resume it after you have modified your expression or match string.<br><br>You can always increase this timeout and let the match continue, in order to gather enough data for the debugger.', "timeout")
}
function matcherError(e, r) {
    test_color_element = replaceHtml(test_color_element, ""),
    showError(e, r)
}
function runDebugger(e) {
    function r(e, r) {
        return r.running = !1,
        void 0 !== e.error ? (debugData = debugHtml = void 0, matcherError('<strong class="errorize_text">An unhandled error occured:</strong><br/>' + e.error + "<br><br>If this error seems out of order, feel free to report it <a href='https://github.com/firasdib/Regex101/issues'>here</a>.", "error"), $("#debugger_menu").addClass("disabled"), void(isDebugging() && $("#debuger_menu").click())) : (debugData = e.callout_data, debugHtml = e.callout_html, e.catastrophic && (debugTimeout && clearTimeout(debugTimeout), debugWorker.worker.terminate(), debugWorker =
            {}), void updateDebugger())
    }
    debugWorker.running && (clearTimeout(debugTimeout), debugWorker.worker.terminate(), debugWorker =
        {}),
    debugWorker.worker || (debugWorker.worker = new Worker("./js/pcre.regex101.js"), debugWorker.worker.onmessage = function (e) {
        "onload" === e.data ? (debugWorker.running =! 0, debugTimeout && clearTimeout(debugTimeout), debugTimeout = setTimeout(function () {
            debugWorker.worker.terminate(),
            debugWorker.timeout(),
            debugWorker = {}
        }, maxWorkerTimeout)) : (clearTimeout(debugTimeout), debugWorker.callback(e.data, debugWorker))
    }),
    debugWorker.callback = r,
    debugWorker.timeout = timeoutError,
    debugWorker.running = !1,
    debugWorker.worker.postMessage(e)
}
function cancelMatching(e) {
    // Stop all workers immidiately.
    jsTimeout && clearTimeout(jsTimeout),
    pcreTimeout && clearTimeout(pcreTimeout),
    jsWorker.worker && jsWorker.worker.terminate(),
    pcreWorker.worker && pcreWorker.worker.terminate(),
    jsWorker = pcreWorker = {},
    e && (test_color_element = replaceHtml(test_color_element, ""))
}

function updatePCRE(test_data) {
    console.log("Doing PCRE expression")
    function PCRECallback(event_data, worker) {
        console.log("Executing PCRE Expression callback");
        worker.running = false;
        if (event_data.error) {
            //TODO Eigen error handling maken hier
            matcherError('<strong class="errorize_text">Your pattern contains one or more errors, please see the explanation section above.</strong>', "error");
        }
        else if (event_data.catastrophic) {
            //TODO eigen catastrophic error handling maken hier.
            cancelMatching(!1);
            matcherError("<strong class=\"errorize_text\">Catastrophic backtracking</strong><br/>Catastrophic backtracking has been detected and the execution of your expression has been halted.", "error")
        } else {
            // Expression is successfully executed.
            updateMatchResult(event_data.result.length, event_data.steps), highlightMatchResult(test_data, event_data.highlighter), 
            handleSubResult(test_data, event_data.sub, event_data.result), 
            matchTimer && clearTimeout(matchTimer), 
            matchTimer = setTimeout(function () {compute_matches(event_data.result)}, treeview_match_timeout), 
            updateTooltipData()
        }
    }
    // If worker is running then terminate the worker then clear the worker.
    pcreWorker.running && clearTimeout(pcreTimeout)
    pcreWorker.worker && pcreWorker.worker.terminate(),
    pcreWorker = {};
    // Create a new worker instance
    pcreWorker.worker = new Worker("./js/pcreWorker.js");

    pcreWorker.worker.onmessage = function (event) {
        // Check if the event is still onload or if its done.
        if (event.data === "onload") {
            //TODO Eigen manier implementeren om te laten zien dat de user input geprocessed word.
            display_info("processing...", "no_match"),
            // Stop and clear the worker.
            pcreWorker.running =! 0, pcreTimeout && clearTimeout(pcreTimeout)
            pcreTimeout = setTimeout(function () {
                pcreWorker.worker.terminate(),
                pcreWorker.timeout(),
                pcreWorker = {}
                }, maxWorkerTimeout)
        } else {
            clearTimeout(pcreTimeout), // Clear the timeout and call the callback as the worker is done evaluating the regex expression.
            pcreWorker.callback(event.data, pcreWorker)
        }
    }

    pcreWorker.callback = PCRECallback;
    pcreWorker.timeout = timeoutError;
    pcreWorker.running = !1;
    pcreWorker.worker.postMessage(test_data);
}
function sanitizePython(e) {
    var r = e;
    return r = r.replace(/(\\[^ckgGXCKPpuzVhHRLlUNQE])|\\([ckgGXCKPpuzVhHRLlUNQE])/g, "$1$2"),
    r = r.replace(/\\.|\[:(.*?):\]/g, function (e, r) {
        return "\\" === e.charAt(0) ? e : "[\\:" + r + "\\:]"
    })
}

function updateJavascript(e) {
    function r(r, t) {
        t.running = !1,
        updateMatchResult(r.result.length),
        highlightMatchResult(e, r.hl);
        var o = "";
        if (e.isSub) {
            var a = [Math.random().toString(36).substring(7), Math.random().toString(36).substring(7), Math.random().toString(36).substring(7)];
            e.sub = e.sub.replace(/\\./g, whitespaceCallback);
            var i = white_space(escapeHtml(e.regexText.replace(new RegExp(e.regex, e.options), a[0] + e.sub + a[1])));
            o = i.replace(new RegExp(a[0], "g"), '<span class="match0">').replace(new RegExp(a[1], "g"), "</span>")
        }
        replaceHtml("subst_result", o),
        matchTimer && clearTimeout(matchTimer),
        matchTimer = setTimeout(function () {
            compute_matches(r.result)
        }, treeview_match_timeout),
        updateTooltipData()
    }

    jsWorker.running && (clearTimeout(jsTimeout), jsWorker.worker.terminate(), jsWorker =
        {}),
    jsWorker.worker || (jsWorker.worker = new Worker("/js/javascript.regex101.js"), 
    
    jsWorker.worker.onmessage = function (e) {
        "onload" === e.data ? (
            jsWorker.running =! 0, 
            jsTimeout = setTimeout(function () {
                jsWorker.worker.terminate(),
                jsWorker.timeout(),
                jsWorker = {}
            }, maxWorkerTimeout), 

        display_info("processing...", "no_match")) : (clearTimeout(jsTimeout), jsWorker.callback(e.data, jsWorker))
    }),
    jsWorker.callback = r,
    jsWorker.timeout = timeoutError,
    jsWorker.running = !1,
    jsWorker.worker.postMessage(e)
}

function whitespaceCallback(e) {
    return "\\n" === e ? String.fromCharCode(10) : "\\r" === e ? String.fromCharCode(13) : "\\f" === e ? String.fromCharCode(14) : "\\t" === e ? String.fromCharCode(9) : e
}
function highlightMatchResult(e, r) {
    textHighlightTimeout && clearTimeout(textHighlightTimeout);
    var t = "",
        o = e.regexText.length;
    Object.keys(r).sort(function (e, r) {
        return e - r
    }).reverse().forEach(function (a) {
        t = r[a] + white_space(escapeHtml(e.regexText.substring(a, o))) + t,
        o = Math.floor(a)
    }),
    test_color_element = replaceHtml(test_color_element, white_space(escapeHtml(e.regexText.substring(0, o))) + t)
}
function handleSubResult(e, r, t) {
    if (e.isSub) {
        for (var o = Regex101Colorizer.getCaptureData(), a =! 1, i = e.sub, s = "", n = 0, u = 0, c = r.length; c > u; u++) {
            var l = i.replace(subRegex.PCRE, function (e) {
                var r = parseSub(e, o, !0, t[u]);
                return r === !1 && (a =! 0),
                r
            });
            if (a) 
                break;
            

            var m = r[u];
            s += white_space(escapeHtml(e.regexText.substring(n, m.start))) + m.tag + white_space(escapeHtml(l)) + "</span>",
            n = m.end
        }
        a ? replaceHtml("subst_result", white_space(escapeHtml(e.regexText)) + "\n") : (s += white_space(escapeHtml(e.regexText.substring(n, e.regexText.length))), replaceHtml("subst_result", s + "\n"))
    }
}

function cancelUnitTest() {
    unitTimeout && clearTimeout(unitTimeout),
    unitWorker.worker && unitWorker.worker.terminate(),
    unitWorker = {}
}

function runUnitTests(e, r, t) {
    unitWorker.running && cancelUnitTest(),
    unitWorker.worker || (unitWorker.worker = new Worker(getFlavor() === FLAVOR.JS ? "/js/javascript.regex101.js" : "./js/pcre.regex101.js"), unitWorker.worker.onmessage = function (e) {
        "onload" === e.data ? (unitWorker.running =! 0, unitTimeout && clearTimeout(unitTimeout), unitTimeout = setTimeout(function () {
            unitWorker.worker.terminate();
            var e = unitWorker.timeout;
            unitWorker = {},
            e()
        }, maxWorkerTimeout)) : (clearTimeout(unitTimeout), unitWorker.callback(e.data, unitWorker))
    },
    unitWorker.callback = r,
    unitWorker.timeout = t,
    unitWorker.running =! 1,
    unitWorker.worker.postMessage(e))
}

var treeview_match_timeout = 500,
    treeview_timer,
    maxWorkerTimeout,
    matchTimer,
    textHighlightTimeout,
    infoTimeout,
    debugWorker = {},
    debugTimeout,
    pcreWorker = {},
    pcreTimeout,
    jsWorker = {},
    jsTimeout,
    unitTimeout,
    unitWorker = {};

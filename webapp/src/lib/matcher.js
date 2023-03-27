// @ts-nocheck
import {explainRegex} from "$lib/handler.js"

export function updateRegex(expression, flags, test_string, substitution_enabled, substitution_value="", delimiter, flavor, errorCallback, successCallback, timeoutCallback, explain, explainCallback) {
    var callbacks = {
        success: successCallback,
        error: errorCallback,
        catastrophic: errorCallback,
        timeout: timeoutCallback,
        explain: explainCallback
    }
    var test_data = {
            regex: expression,
            options: flags,
            regexText: test_string,
            isSub: substitution_enabled,
            sub: substitution_value,
            delimiter: delimiter,
            flavor: flavor,
        };
    
    if (test_data.flavor == "PCRE"){
            updatePCRE(test_data, callbacks)
    }
    if (explain) {
        treeview_timer && clearTimeout(treeview_timer),
        treeview_timer = setTimeout(function () {
            let explanation = explainRegex(test_data);
            if (explanation) explainCallback(explanation);
        }, treeview_match_timeout)
    }

    // if (test_data.flavor === FLAVOR.PYTHON && (test_data.regex = sanitizePython(test_data.regex)), 0 === test_data.regex.length) {
    //     var o = white_space(escapeHtml(test_area.value));
    //     test_color_element = replaceHtml(test_color_element, o),
    //     replaceHtml("treeview", "An explanation of your regex will be automatically generated as you type."),
    //     replaceHtml("match_info", "Detailed match information will be displayed here automatically."),
    //     replaceHtml("subst_result", o),
    //     display_info("no match", "no_match"),
    //     clearTimeout(matchTimer),
    //     clearTimeout(treeview_timer),
    //     $("#debugger_menu, #sample_menu, #permalink_menu, #community_submit, #format_regex").removeClass("active").addClass("disabled"),
    //     $("#permalink_data").hide(),
    //     stopUnitTests(),
    //     updateTooltipData()
    // } else {

    //     // TODO handle other languages like Javascript and python...

        
    //     // switch (test_data.regexText.length > 0, current_flavour) {
    //     //     case FLAVOR.JS: updateJavascript(test_data);
    //     //         break;
    //     //     case FLAVOR.PYTHON:
    //     // }
    // }
}



function cancelMatching() {
    // Stop all workers immidiately.
    jsTimeout && clearTimeout(jsTimeout),
    pcreTimeout && clearTimeout(pcreTimeout),
    jsWorker.worker && jsWorker.worker.terminate(),
    pcreWorker.worker && pcreWorker.worker.terminate(),
    jsWorker = pcreWorker = {}
}

function updatePCRE(test_data, callbacks) {
    function PCRECallback(event_data, worker) {
        worker.running = false;
        if (event_data.error) {
            cancelMatching();
            callbacks.error(event_data.error);
        }
        else if (event_data.catastrophic) {
            cancelMatching();
            callbacks.catastrophic(event_data.catastrophic);
        } else {
            callbacks.success(event_data);
        }
    }
    
    // If worker is running then terminate the worker then clear the worker.
    pcreWorker.running && clearTimeout(pcreTimeout), pcreWorker.worker && pcreWorker.worker.terminate(),
    pcreWorker = {};
    // Create a new worker instance
    pcreWorker.worker = new Worker("/pcreWorker.js");

    // Create the onmessage handler for the worker.
    pcreWorker.worker.onmessage = function (event) {
        // Check if the event is still onload or if its done.
        if (event.data === "onload") {
            // Stop and clear the worker.
            pcreWorker.running =! 0, pcreTimeout && clearTimeout(pcreTimeout)
            pcreTimeout = setTimeout(function () {
                pcreWorker.worker.terminate(),
                // shit took too long
                callbacks.timeout();
                pcreWorker = {}
            }, maxWorkerTimeout)

        } else {
            clearTimeout(pcreTimeout); // Clear the timeout and call the callback as the worker is done evaluating the regex expression.
            pcreWorker.callback(event.data, pcreWorker);
        }
    }

    pcreWorker.callback = PCRECallback;
    pcreWorker.running = !1;
    pcreWorker.worker.postMessage(test_data);
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


var treeview_match_timeout = 500,
    treeview_timer,
    maxWorkerTimeout = 2000,
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

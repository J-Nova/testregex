// @ts-nocheck
import {explain_regex} from "$lib/explainer.js"

export function updateRegex(expression, flags, test_string, delimiter, flavor, errorCallback, successCallback, timeoutCallback, explain, explainCallback, explain_timeout, match_timeout) {
    maxWorkerTimeout = match_timeout;

    var callbacks = {
        success: successCallback,
        error: errorCallback,
        catastrophic: errorCallback,
        timeout: timeoutCallback,
        explain: explainCallback
    }
    
    var test_data = {
            regex: expression, // The regular expression
            options: flags, // The expression flags
            regexText: test_string, // The text to test the regex against.
            delimiter: delimiter,
            flavor: flavor,
        };
    
    if (test_data.flavor == "PCRE"){
        runExpression(test_data, callbacks, "pcreWorker.js")
    } else if (test_data.flavor == "JAVASCRIPT") {
        runExpression(test_data, callbacks, "jsWorker.js");
    } else if (test_data.flavor == "JAVA") {
        runExpression(test_data, callbacks, "javaWorker.js");
    } else if (test_data.flavor == "PYTHON") {
        test_data.regex = sanitizePython(test_data.regex);
        runExpression(test_data, callbacks, "pcreWorker.js");
    }

    if (explain) { // Explain the expression that has been given.
        explain_regex(test_data, explainCallback);
    }
}

function sanitizePython(expression) {
    var new_expression = expression;
    return new_expression = new_expression.replace(/(\\[^ckgGXCKPpuzVhHRLlUNQE])|\\([ckgGXCKPpuzVhHRLlUNQE])/g, "$1$2"),
    new_expression = new_expression.replace(/\\.|\[:(.*?):\]/g, function (e, r) {
        return "\\" === e.charAt(0) ? e : "[\\:" + r + "\\:]"
    })
}

function cancelMatching() {
    // Stop all workers immidiately.
    workerTimeout && clearTimeout(workerTimeout),
    workerObj.worker && workerObj.worker.terminate(),
    workerObj = {}
}

function timeoutWorker(){
    workerObj.running =! 0, workerTimeout && clearTimeout(workerTimeout)
    workerTimeout = setTimeout(function () {
        workerObj.worker.terminate(),
        // shit took too long
        callbacks.timeout();
        workerObj = {}
    }, maxWorkerTimeout)
}

function workerCallback(event_data, worker){
    worker.running = false;
    if (event_data.error) {
        cancelMatching();
        worker.callbacks.error(event_data.error);
    }
    else if (event_data.catastrophic) {
        cancelMatching();
        worker.callbacks.catastrophic(event_data.catastrophic);
    } else {
        worker.callbacks.success(event_data);
    }
}

function runExpression(test_data, callbacks, worker_script) {
    // If worker is running then terminate the worker then clear the worker.
    workerObj.running && clearTimeout(workerTimeout), workerObj.worker && workerObj.worker.terminate(),
    workerObj = {};
    // Create a new worker instance
    workerObj.worker = new Worker("/workers/"+worker_script);

    // Create the onmessage handler for the worker.
    workerObj.worker.onmessage = function (event) {
        if (event.data === "onload") {
            timeoutWorker(); // Took too long, timeout the worker
        } else {
            clearTimeout(workerTimeout); // Clear the timeout and call the callback as the worker is done evaluating the regex expression.
            workerObj.callback(event.data, workerObj);
        }
    }

    workerObj.callback = workerCallback;
    workerObj.running = false;
    workerObj.callbacks = callbacks;
    workerObj.worker.postMessage(test_data);
}


var maxWorkerTimeout = 2000,
    workerObj = {},
    workerTimeout;

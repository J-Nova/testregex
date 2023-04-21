// @ts-nocheck
import {explainRegex} from "$lib/explainer.js";
import {generateTooltips} from "$lib/expression.js";

export function updateRegex(test, errorCallback, successCallback, timeoutCallback, explainCallback, explain_expression) {

    let callbacks = {
        success: successCallback,
        error: errorCallback,
        catastrophic: errorCallback,
        timeout: timeoutCallback,
    }
    
    let test_data = {
            regex: test.expression, // The regular expression
            options: test.getFlags(), // The expression flags
            regexText: test.test_string, // The text to test the regex against.
            delimiter: test.delimiter,
            flavor: test.flavor,
        };

    if (explain_expression) { // Explain the expression that has been given.
        console.log(explainRegex(test_data, true).body);
        let temp = explainRegex(test_data, true)
        let explanation_data = {
                    explanation: explainRegex(test_data, false),
                    tooltip_data: generateTooltips(temp, test_data.regex)
                    }
        explainCallback(explanation_data);
    }

    // Run expression against the regex worker.
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

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
            regex: expression,
            options: flags,
            regexText: test_string,
            delimiter: delimiter,
            flavor: flavor,
        };
    
    if (test_data.flavor == "PCRE"){
            updatePCRE(test_data, callbacks)
    }// Handle other flavours here aswell

    if (explain) { // Explain the expression that has been given.
        explain_regex(test_data, explainCallback);
    }
}



function cancelMatching() {
    // Stop all workers immidiately.
    workerTimeout && clearTimeout(workerTimeout),
    workerObj.worker && workerObj.worker.terminate(),
    workerObj = {}
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
    workerObj.running && clearTimeout(workerTimeout), workerObj.worker && workerObj.worker.terminate(),
    workerObj = {};
    // Create a new worker instance
    workerObj.worker = new Worker("/pcreWorker.js");

    // Create the onmessage handler for the worker.
    workerObj.worker.onmessage = function (event) {
        // Check if the event is still onload or if its done.
        if (event.data === "onload") {
            // Stop and clear the worker.
            workerObj.running =! 0, workerTimeout && clearTimeout(workerTimeout)
            workerTimeout = setTimeout(function () {
                workerObj.worker.terminate(),
                // shit took too long
                callbacks.timeout();
                workerObj = {}
            }, maxWorkerTimeout)

        } else {
            clearTimeout(workerTimeout); // Clear the timeout and call the callback as the worker is done evaluating the regex expression.
            workerObj.callback(event.data, workerObj);
        }
    }

    workerObj.callback = PCRECallback;
    workerObj.running = false;
    workerObj.worker.postMessage(test_data);
}


var maxWorkerTimeout = 2000,
    workerObj = {},
    workerTimeout;

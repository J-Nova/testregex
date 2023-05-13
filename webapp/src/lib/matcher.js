// @ts-nocheck
import { explainRegex } from "$lib/explainer.js";
import { generateTooltips } from "$lib/expression.js";

export function updateRegex(
	test,
	errorCallback,
	successCallback,
	timeoutCallback,
	explainCallback,
	explainExpression
) {
	let callbacks = {
		success: successCallback,
		error: errorCallback,
		catastrophic: errorCallback,
		timeout: timeoutCallback,
	};

	let testData = {
		regex: test.expression, // The regular expression
		options: test.getFlags(), // The expression flags
		regexText: test.testString, // The text to test the regex against.
		delimiter: test.delimiter,
		flavor: test.flavor,
	};

	if (explainExpression) {
		// Explain the expression that has been given.
		let explainTree = explainRegex(testData, true);
		let explanationData = {
			explanation: explainRegex(testData, false),
			tooltipData: generateTooltips(
				explainTree.body.expressions || [explainTree.body],
				testData.regex
			),
		};
		explainCallback(explanationData);
	}

	// Run expression against the regex worker.
	if (testData.flavor == "PCRE") {
		runExpression(testData, callbacks, "pcreWorker.js");
	} else if (testData.flavor == "JAVASCRIPT") {
		runExpression(testData, callbacks, "jsWorker.js");
	} else if (testData.flavor == "JAVA") {
		runExpression(testData, callbacks, "javaWorker.js");
	} else if (testData.flavor == "PYTHON") {
		testData.regex = sanitizePython(testData.regex);
		runExpression(testData, callbacks, "pcreWorker.js");
	}
}

function sanitizePython(expression) {
	var newExpression = expression;
	return (
		(newExpression = newExpression.replace(
			/(\\[^ckgGXCKPpuzVhHRLlUNQE])|\\([ckgGXCKPpuzVhHRLlUNQE])/g,
			"$1$2"
		)),
		(newExpression = newExpression.replace(/\\.|\[:(.*?):\]/g, function (e, r) {
			return "\\" === e.charAt(0) ? e : "[\\:" + r + "\\:]";
		}))
	);
}

function cancelMatching() {
	// Stop all workers immidiately.
	workerTimeout && clearTimeout(workerTimeout),
		workerObj.worker && workerObj.worker.terminate(),
		(workerObj = {});
}

function timeoutWorker() {
	(workerObj.running = !0), workerTimeout && clearTimeout(workerTimeout);
	workerTimeout = setTimeout(function () {
		workerObj.worker.terminate(), callbacks.timeout();
		workerObj = {};
	}, maxWorkerTimeout);
}

function workerCallback(event_data, worker) {
	worker.running = false;
	if (event_data.error) {
		cancelMatching();
		worker.callbacks.error(event_data.error);
	} else if (event_data.catastrophic) {
		cancelMatching();
		worker.callbacks.catastrophic(event_data.catastrophic);
	} else {
		worker.callbacks.success(event_data);
	}
}

function runExpression(test_data, callbacks, workerScript) {
	// If worker is running then terminate the worker then clear the worker.
	workerObj.running && clearTimeout(workerTimeout),
		workerObj.worker && workerObj.worker.terminate(),
		(workerObj = {});
	// Create a new worker instance
	workerObj.worker = new Worker("/workers/" + workerScript);

	// Create the onmessage handler for the worker.
	workerObj.worker.onmessage = function (event) {
		if (event.data === "onload") {
			timeoutWorker(); // Took too long, timeout the worker
		} else {
			clearTimeout(workerTimeout); // Clear the timeout and call the callback as the worker is done evaluating the regex expression.
			workerObj.callback(event.data, workerObj);
		}
	};

	workerObj.callback = workerCallback;
	workerObj.running = false;
	workerObj.callbacks = callbacks;
	workerObj.worker.postMessage(test_data);
}

var maxWorkerTimeout = 2000,
	workerObj = {},
	workerTimeout;

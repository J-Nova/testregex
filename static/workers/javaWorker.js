importScripts("/workers/libs/javalib.js");
importScripts('/workers/classes.js');
main(); // Run function to initialize java library.

const error_messages = ["out of stack space", "too much recursion", "maximum call stack size exceeded"];
function getError(error) {
    if (null != error.message) {
        let error = error.message.toLowerCase().trim().replace(/\s+/g, " ").replace(/[^a-z ]/i, "");
        if (error_messages.includes(error)) 
            return "JAVA_STACK_ERROR"
    }
    return error.message || "Unknown internal Java matcher error"
}

function parseFlags(flags){
    let t = 0;
    for (let index = 0; index < flags.length; index++) {
        let flagCharacter = flags.charAt(index);
        switch (flagCharacter) {
            case "g":
                continue;
            case "m": t |= 8;
                break;
            case "i": t |= 2;
                break;
            case "s": t |= 32;
                break;
            case "x": t |= 4;
                break;
            case "d": t |= 1;
                break;
            case "u": t |= 64;
                break;
            case "U": t |= 256;
                break;
            default:
                throw new Error(`Unknown java flag ${flagCharacter}`)
        }
    }
    return t
}


function executeExpression(expression, testString, flags) {
    let startTime = performance.now();
    try {
        let isGlobal = flags.includes("g");
        let [matchResult, error] = self.javaMatches(expression, testString, parseFlags(flags), isGlobal);
        
        if (error != null) {
            let [[[, errorMessage,, index]]] = error;
            return new MatchError(errorMessage + " near index " + index);
        }
        let result = [];
        for (let index = 0; index < matchResult.length; index++) {
            let targetMatch = matchResult[index];
            if (targetMatch === null) 
                break;
            let match = targetMatch.map((value => {
                let [r, a, n] = value;
                let content = r || "";
                let startIndex = parseInt(a, 10);
                let endIndex = startIndex + content.length;
                return new Match(content, parseInt(n, 10), undefined, startIndex, endIndex);
            }));
            result.push(match);
        }
        let endTime = performance.now() - startTime;
        return new Result(result, endTime, undefined, undefined);
    } catch (e) {
        return new MatchError(getError(e));
    }
}

self.onmessage = function (testData) {
    self.postMessage("onload")
    let result = executeExpression(testData.data.regex, testData.data.regexText, testData.data.options);
    debug && console.log(result);
    self.postMessage(result);
}

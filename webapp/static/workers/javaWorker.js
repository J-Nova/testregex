importScripts("./libs/javalib.js");
importScripts('./classes.js');
main();

const error_messages = ["out of stack space", "too much recursion", "maximum call stack size exceeded"];
function getError(t) {
    if (null != t.message) {
        let error = t.message.toLowerCase().trim().replace(/\s+/g, " ").replace(/[^a-z ]/i, "");
        if (error_messages.includes(error)) 
            return "JAVA_STACK_ERROR"
    }
    return t.message || "Unknown internal Java matcher error"
}

function parseFlags(flags){
    let t = 0;
    for (let index = 0; index < flags.length; index++) {
        let flag_char = flags.charAt(index);
        switch (flag_char) {
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
                throw new Error(`Unknown java flag ${flag_char}`)
        }
    }
    return t
}


function executeExpression(expression, test_string, flags) {
    let time = performance.now();
    try {
        let isGlobal = flags.includes("g");
        let [match_result, error] = self.javaMatches(expression, test_string, parseFlags(flags), isGlobal);
        
        if (error != null) {
            const [[[, error_message,, index]]] = error;
            return new MatchError(error_message + " near index " + index)
        }
        let result = [];
        for (let index = 0; index < match_result.length; index++) {
            let target_match = match_result[index];
            if (target_match == null) 
                break;
            let match = target_match.map((value => {
                let [r, a, n] = value;
                    let content = r || "";
                    let start_index = parseInt(a, 10);
                return new Match(content, parseInt(n, 10), undefined, start_index, start_index + content.length)
            }));
            result.push(match)
        }
        return new Result(result, performance.now() - time, undefined, undefined);
    } catch (e) {
        return new MatchError(getError(e));
    }
}

self.onmessage = function (test_data) {
    self.postMessage("onload")
    let result = executeExpression(test_data.data.regex, test_data.data.regexText, test_data.data.options);
    debug && console.log(result);
    self.postMessage(result);
}
